"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

type SortOrder = "catalogue" | "oldest" | "newest" | "title" | "repository";

type MenuOption = {
  value: string;
  label: string;
  note?: string;
};

const sortOptions: MenuOption[] = [
  { value: "catalogue", label: "Catalogue order" },
  { value: "oldest", label: "Oldest first" },
  { value: "newest", label: "Newest first" },
  { value: "title", label: "Title A–Z" },
  { value: "repository", label: "Repository A–Z" },
];

const categoryCoverNames: Record<string, string> = {
  "Liturgy & Prayer": "liturgy",
  Scripture: "scripture",
  "Saints & Martyrs": "saints",
  "Homilies & Poetry": "homilies",
  "Theology & Spirituality": "theology",
  "History & Canon Law": "history",
  "Language & Learning": "learning",
  "Other Collections": "other",
};

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

function dateValue(record: ManuscriptRecord) {
  return record.date.start ?? record.date.end ?? null;
}

function recordTitle(record: ManuscriptRecord) {
  return record.titles[0] || record.shelfmark;
}

function CatalogMenu({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: MenuOption[];
  onChange: (value: string) => void;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!detailsRef.current?.contains(event.target as Node)) {
        detailsRef.current?.removeAttribute("open");
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && detailsRef.current?.open) {
        detailsRef.current.removeAttribute("open");
        detailsRef.current.querySelector("summary")?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <details className="catalog-menu" ref={detailsRef}>
      <summary>
        <span>
          <small>{label}</small>
          <strong>{selected.label}</strong>
        </span>
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path d="m3 6 5 5 5-5" fill="none" stroke="currentColor" />
        </svg>
      </summary>
      <div className="catalog-menu__options" role="listbox" aria-label={label}>
        {options.map((option) => (
          <button
            type="button"
            role="option"
            aria-selected={option.value === value}
            key={option.value}
            onClick={() => {
              onChange(option.value);
              detailsRef.current?.removeAttribute("open");
            }}
          >
            <span>{option.label}</span>
            {option.note ? <small>{option.note}</small> : null}
          </button>
        ))}
      </div>
    </details>
  );
}

export function ManuscriptCatalog() {
  const [catalog, setCatalog] = useState<CatalogPayload | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("catalogue");
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
    const matches = catalog.records.filter((record) => {
      if (category !== "All" && record.category !== category) return false;
      if (country !== "All" && record.country !== country) return false;
      return search.length === 0 || recordText(record).includes(search);
    });

    if (sortOrder === "catalogue") return matches;

    return [...matches].sort((left, right) => {
      if (sortOrder === "title") {
        return recordTitle(left).localeCompare(recordTitle(right));
      }
      if (sortOrder === "repository") {
        return left.repository.localeCompare(right.repository);
      }

      const leftDate = dateValue(left);
      const rightDate = dateValue(right);
      if (leftDate === null) return 1;
      if (rightDate === null) return -1;
      return sortOrder === "oldest"
        ? leftDate - rightDate
        : rightDate - leftDate;
    });
  }, [catalog, category, country, deferredQuery, sortOrder]);

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
        <CatalogMenu
          label="Holding country"
          value={country}
          options={[
            { value: "All", label: "All countries" },
            ...countries.map(([name, count]) => ({
              value: name,
              label: name,
              note: count.toLocaleString("en-US"),
            })),
          ]}
          onChange={(value) => {
            setCountry(value);
            setVisibleCount(initialVisibleCount);
          }}
        />
        <CatalogMenu
          label="Sort by"
          value={sortOrder}
          options={sortOptions}
          onChange={(value) => {
            setSortOrder(value as SortOrder);
            setVisibleCount(initialVisibleCount);
          }}
        />
        <p aria-live="polite">
          <strong>{filteredRecords.length.toLocaleString("en-US")}</strong>
          {filteredRecords.length === 1 ? " record" : " records"}
        </p>
      </div>

      {visibleRecords.length > 0 ? (
        <ol className="catalog-results">
          {visibleRecords.map((record) => (
            <li key={record.id}>
              <a
                className="catalog-result"
                href={`${basePath}/manuscripts/details/?id=${record.id}`}
                aria-label={`View the manuscript: ${recordTitle(record)}`}
              >
                <div
                  className={`catalog-cover catalog-cover--${
                    categoryCoverNames[record.category] ?? "other"
                  }`}
                >
                  <span className="catalog-cover__category">
                    {record.category}
                  </span>
                  <strong data-no-translate>{recordTitle(record)}</strong>
                  <div className="catalog-cover__facts">
                    <span>{record.date.label}</span>
                    <span data-no-translate>
                      {record.authors[0] || record.shelfmark}
                    </span>
                  </div>
                </div>
                <div className="catalog-result__identity">
                  <small data-no-translate>
                    {record.repository}
                    {record.city ? ` · ${record.city}` : ""}
                    {record.country ? ` · ${record.country}` : ""}
                  </small>
                  <h3 data-no-translate>{recordTitle(record)}</h3>
                  {record.titles[0] ? (
                    <p data-no-translate>{record.shelfmark}</p>
                  ) : null}
                  <ul aria-label="Record details">
                    {record.genres.slice(0, 2).map((genre) => (
                      <li key={genre} data-no-translate>{genre}</li>
                    ))}
                    {record.supports.slice(0, 1).map((support) => (
                      <li key={support} data-no-translate>{support}</li>
                    ))}
                  </ul>
                </div>
                <span className="catalog-result__action">
                  View the manuscript
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
              setSortOrder("catalogue");
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
