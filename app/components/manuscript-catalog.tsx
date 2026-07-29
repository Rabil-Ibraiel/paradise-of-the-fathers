"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Arrow } from "./site-chrome";

type ManuscriptRecord = {
  id: number;
  purl: string;
  shelfmark: string;
  projectNumber: string;
  repository: string;
  city: string;
  country: string;
  date: {
    start?: number;
    end?: number;
    label: string;
  };
  category: string;
  genres: string[];
  titles: string[];
  authors: string[];
  languages: string[];
  supports: string[];
  access: string;
  viewableOnline: boolean;
};

type CatalogPayload = {
  generatedAt: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  total: number;
  categoryOrder: string[];
  categoryCounts: Record<string, number>;
  records: ManuscriptRecord[];
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const initialVisibleCount = 24;
const pageSize = 24;

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

function recordText(record: ManuscriptRecord) {
  return normalize(
    [
      record.shelfmark,
      record.projectNumber,
      record.repository,
      record.city,
      record.country,
      record.category,
      ...record.genres,
      ...record.titles,
      ...record.authors,
    ].join(" "),
  );
}

export function ManuscriptCatalog() {
  const [catalog, setCatalog] = useState<CatalogPayload | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${basePath}/data/hmml-syriac-index.json`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("The catalogue file could not be opened.");
        }
        return response.json() as Promise<CatalogPayload>;
      })
      .then(setCatalog)
      .catch((fetchError: unknown) => {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "The catalogue could not be opened.",
        );
      });

    return () => controller.abort();
  }, []);

  const countries = useMemo(() => {
    if (!catalog) return [];

    const counts = new Map<string, number>();
    catalog.records.forEach((record) => {
      counts.set(record.country, (counts.get(record.country) ?? 0) + 1);
    });

    return [...counts.entries()].sort((left, right) => right[1] - left[1]);
  }, [catalog]);

  const filteredRecords = useMemo(() => {
    if (!catalog) return [];

    const search = normalize(deferredQuery);
    return catalog.records.filter((record) => {
      if (category !== "All" && record.category !== category) return false;
      if (country !== "All" && record.country !== country) return false;
      return search.length === 0 || recordText(record).includes(search);
    });
  }, [catalog, category, country, deferredQuery]);

  if (error) {
    return (
      <div className="catalog-state catalog-state--error" role="alert">
        <p>{error}</p>
        <a href="https://www.vhmml.org/dataPortal" target="_blank" rel="noreferrer">
          Search directly in HMML Data Portal
          <Arrow />
        </a>
      </div>
    );
  }

  if (!catalog) {
    return (
      <div className="catalog-state" role="status" aria-live="polite">
        <span className="catalog-state__line" aria-hidden="true" />
        <p>Opening the Syriac manuscript index…</p>
      </div>
    );
  }

  const visibleRecords = filteredRecords.slice(0, visibleCount);

  return (
    <div className="catalog-browser">
      <header className="catalog-browser__header">
        <div>
          <p className="catalog-kicker">HMML Reading Room · CC BY 4.0</p>
          <h2>{catalog.total.toLocaleString("en-US")} Syriac witnesses.</h2>
        </div>
        <p>
          Search real manuscript metadata by title, shelfmark, repository,
          country, author, or subject. Every result returns to its permanent
          holding-library record.
        </p>
      </header>

      <div className="catalog-categories" aria-label="Manuscript categories">
        <button
          className={category === "All" ? "is-active" : ""}
          type="button"
          onClick={() => {
            setCategory("All");
            setVisibleCount(initialVisibleCount);
          }}
        >
          <span>All witnesses</span>
          <strong>{catalog.total.toLocaleString("en-US")}</strong>
        </button>
        {catalog.categoryOrder.map((item) => (
          <button
            className={category === item ? "is-active" : ""}
            key={item}
            type="button"
            onClick={() => {
              setCategory(item);
              setVisibleCount(initialVisibleCount);
            }}
          >
            <span>{item}</span>
            <strong>{catalog.categoryCounts[item].toLocaleString("en-US")}</strong>
          </button>
        ))}
      </div>

      <div className="catalog-controls">
        <label>
          <span>Search the records</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(initialVisibleCount);
            }}
            placeholder="Try Narsai, Gospel, Alqosh, or a shelfmark"
          />
        </label>
        <label>
          <span>Holding country</span>
          <select
            value={country}
            onChange={(event) => {
              setCountry(event.target.value);
              setVisibleCount(initialVisibleCount);
            }}
          >
            <option value="All">All countries</option>
            {countries.map(([name, count]) => (
              <option value={name} key={name}>
                {name} · {count.toLocaleString("en-US")}
              </option>
            ))}
          </select>
        </label>
        <p aria-live="polite">
          <strong>{filteredRecords.length.toLocaleString("en-US")}</strong>
          {filteredRecords.length === 1 ? " record" : " records"}
        </p>
      </div>

      {visibleRecords.length > 0 ? (
        <ol className="catalog-results">
          {visibleRecords.map((record) => (
            <li key={record.id}>
              <a href={record.purl} target="_blank" rel="noreferrer">
                <div className="catalog-result__date">
                  <strong>{record.date.label}</strong>
                  <span>{record.category}</span>
                </div>
                <div className="catalog-result__identity">
                  <small>
                    {record.repository}
                    {record.city ? ` · ${record.city}` : ""}
                    {record.country ? ` · ${record.country}` : ""}
                  </small>
                  <h3>{record.titles[0] || record.shelfmark}</h3>
                  {record.titles[0] ? <p>{record.shelfmark}</p> : null}
                  <ul aria-label="Record details">
                    {record.genres.slice(0, 2).map((genre) => (
                      <li key={genre}>{genre}</li>
                    ))}
                    {record.supports.slice(0, 1).map((support) => (
                      <li key={support}>{support}</li>
                    ))}
                    <li>{record.access}</li>
                  </ul>
                </div>
                <span className="catalog-result__action">
                  Open record
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <div className="catalog-empty">
          <p>No manuscripts match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setCountry("All");
            }}
          >
            Clear the search
          </button>
        </div>
      )}

      {visibleCount < filteredRecords.length ? (
        <button
          className="catalog-load-more"
          type="button"
          onClick={() =>
            setVisibleCount((currentCount) => currentCount + pageSize)
          }
        >
          Show the next {Math.min(pageSize, filteredRecords.length - visibleCount)}
          <span>
            {visibleCount.toLocaleString("en-US")} of{" "}
            {filteredRecords.length.toLocaleString("en-US")}
          </span>
        </button>
      ) : null}

      <footer className="catalog-browser__footer">
        <p>
          Metadata: HMML Reading Room weekly dataset, updated{" "}
          <time dateTime={catalog.generatedAt}>{catalog.generatedAt}</time>.
          Manuscript images remain governed by each holding repository.
        </p>
        <div>
          <a href={catalog.sourceUrl} target="_blank" rel="noreferrer">
            Dataset &amp; schema
          </a>
          <a href={catalog.licenseUrl} target="_blank" rel="noreferrer">
            {catalog.license}
          </a>
          <a href="https://syri.ac/digimss" target="_blank" rel="noreferrer">
            Syri.ac discovery gateway
          </a>
        </div>
      </footer>
    </div>
  );
}
