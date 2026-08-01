"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Arrow } from "./site-chrome";

type Contributor = {
  role: string;
  name: string;
};

type ContentItem = {
  id: number;
  partNumber: number | null;
  itemNumber: number | null;
  location: string;
  title: string;
  titleSyriac: string;
  uniformTitle: string;
  alternateTitles: string[];
  languages: string[];
  contributors: Contributor[];
  rubric: string;
  incipit: string;
  explicit: string;
  contents: string;
  notes: string;
  pagination: string;
};

type ManuscriptPart = {
  id: number;
  number: number;
  type: string;
  location: string;
  date: string;
  origin: {
    country: string;
    region: string;
    city: string;
  };
  supports: string[];
  dimensions: {
    width: number | null;
    height: number | null;
    imported: string;
  };
  writingSpace: {
    width: number | null;
    height: number | null;
    imported: string;
  };
  writingSystems: string[];
  scripts: string[];
  contributors: Contributor[];
  scribe: string;
  artist: string;
  layout: string;
  decoration: string;
  colophon: string;
  notes: string;
  contents: ContentItem[];
};

type ManuscriptRecord = {
  id: number;
  purl: string;
  rights: string;
  shelfmark: string;
  projectNumber: string;
  commonName: string;
  summary: string;
  objectType: string;
  processedBy: string;
  repository: string;
  holdingInstitution: string;
  city: string;
  country: string;
  collection: string;
  date: { label: string };
  category: string;
  titles: string[];
  captureDate: string;
  lastUpdated: string;
  currentStatus: string;
  access: string;
  viewableOnline: boolean;
  downloadOption: string;
  surrogateFormat: string;
  acknowledgments: string;
  description: {
    notes: string;
    condition: string;
    collation: string;
    binding: string;
    provenance: string;
    bibliography: string;
    colophon: string;
    reproduction: string;
  };
  physical: {
    support: string;
    medium: string;
    foliation: string;
    bindingDimensions: {
      width: number | null;
      height: number | null;
      depth: number | null;
      imported: string;
    };
    extents: Array<{
      count: number | null;
      unit: string;
      imported: string;
    }>;
    features: string[];
  };
  genres: string[];
  subjects: string[];
  formerOwners: Contributor[];
  bibliographyLinks: Array<{ url: string; label: string }>;
  facsimiles: string[];
  parts: ManuscriptPart[];
  standaloneContents: ContentItem[];
};

type DetailPayload = {
  generatedAt: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  records: Record<string, ManuscriptRecord>;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const detailShardCount = 128;

function dimensions(
  value: { width: number | null; height: number | null; imported: string },
  depth?: number | null,
) {
  if (value.height && value.width) {
    return `${value.height} × ${value.width}${depth ? ` × ${depth}` : ""} cm`;
  }
  return value.imported;
}

function place(record: ManuscriptRecord) {
  return [record.city, record.country].filter(Boolean).join(", ");
}

function origin(part: ManuscriptPart) {
  return [part.origin.city, part.origin.region, part.origin.country]
    .filter(Boolean)
    .join(", ");
}

function contributorsText(items: Contributor[]) {
  return items.map((item) => `${item.name} (${item.role.toLowerCase()})`).join("; ");
}

function DetailFact({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ProseField({
  label,
  value,
  dir,
}: {
  label: string;
  value: string;
  dir?: "auto";
}) {
  if (!value) return null;
  return (
    <div className="manuscript-prose-field">
      <h3>{label}</h3>
      <p dir={dir}>{value}</p>
    </div>
  );
}

function ContentEntry({
  content,
  sequence,
}: {
  content: ContentItem;
  sequence: number;
}) {
  return (
    <article className="manuscript-content-entry">
      <header>
        <span>{String(sequence).padStart(2, "0")}</span>
        <div>
          <p>
            {content.location ? (
              <span data-no-translate>{content.location}</span>
            ) : null}
            {content.location && content.languages.length > 0 ? " · " : ""}
            {content.languages.join(", ")}
          </p>
          <h3 lang="en" dir="ltr" data-no-translate>
            {content.title}
          </h3>
          {content.titleSyriac ? (
            <p className="manuscript-content-entry__syriac" lang="syr" dir="rtl">
              {content.titleSyriac}
            </p>
          ) : null}
        </div>
      </header>
      <dl>
        <DetailFact label="Uniform title" value={content.uniformTitle} />
        <DetailFact
          label="Alternate titles"
          value={content.alternateTitles.join("; ")}
        />
        <DetailFact
          label="Contributors"
          value={contributorsText(content.contributors)}
        />
        <DetailFact label="Pagination" value={content.pagination} />
      </dl>
      <div className="manuscript-content-entry__texts">
        <ProseField label="Contents" value={content.contents} />
        <ProseField label="Rubric" value={content.rubric} dir="auto" />
        <ProseField label="Incipit" value={content.incipit} dir="auto" />
        <ProseField label="Explicit" value={content.explicit} dir="auto" />
        <ProseField label="Cataloguer’s notes" value={content.notes} />
      </div>
    </article>
  );
}

function RecordState({
  title,
  message,
  error = false,
}: {
  title: string;
  message: string;
  error?: boolean;
}) {
  return (
    <section
      className={`manuscript-detail-state${error ? " manuscript-detail-state--error" : ""}`}
      role={error ? "alert" : "status"}
    >
      <span className="catalog-state__line" aria-hidden="true" />
      <h1>{title}</h1>
      <p>{message}</p>
      {error ? (
        <a href={`${basePath}/manuscripts/`}>
          Return to manuscript search
          <Arrow />
        </a>
      ) : null}
    </section>
  );
}

function ManuscriptDetailsInner() {
  const searchParams = useSearchParams();
  const recordId = searchParams.get("id") ?? "";
  const [record, setRecord] = useState<ManuscriptRecord | null>(null);
  const [payload, setPayload] = useState<DetailPayload | null>(null);
  const [error, setError] = useState("");
  const validRecordId = /^\d+$/.test(recordId);

  useEffect(() => {
    if (!validRecordId) return;

    const controller = new AbortController();
    const shard = String(Number(recordId) % detailShardCount).padStart(3, "0");

    fetch(`${basePath}/data/hmml-syriac-details/${shard}.json`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("The manuscript detail file could not be opened.");
        }
        return response.json() as Promise<DetailPayload>;
      })
      .then((nextPayload) => {
        const nextRecord = nextPayload.records[recordId];
        if (!nextRecord) {
          throw new Error("This manuscript is not present in the Syriac index.");
        }
        setPayload(nextPayload);
        setRecord(nextRecord);
        document.title = `${nextRecord.titles[0] || nextRecord.shelfmark} | The Paradise of the Fathers`;
      })
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
            : "The manuscript details could not be opened.",
        );
      });

    return () => controller.abort();
  }, [recordId, validRecordId]);

  if (!validRecordId) {
    return (
      <RecordState
        title="Record unavailable."
        message="This address does not contain a valid HMML record number."
        error
      />
    );
  }

  if (error) {
    return (
      <RecordState
        title="Record unavailable."
        message={error}
        error
      />
    );
  }

  if (!record || !payload) {
    return (
      <RecordState
        title="Opening the catalogue leaf."
        message="Loading the complete reusable HMML description…"
      />
    );
  }

  const title = record.commonName || record.titles[0] || record.shelfmark;
  const objectDescription = Object.values(record.description).some(Boolean);
  const bindingDimensions = dimensions(
    record.physical.bindingDimensions,
    record.physical.bindingDimensions.depth,
  );

  return (
    <article id="manuscript-record" className="manuscript-record">
      <header className="manuscript-record__hero">
        <div className="manuscript-record__heading">
          <a className="profile-back-link" href={`${basePath}/manuscripts/`}>
            <Arrow direction="left" />
            Back to manuscript search
          </a>
          <p className="catalog-kicker">
            {record.category} · HMML {record.id}
          </p>
          <h1 lang="en" dir="ltr" data-no-translate>
            {title}
          </h1>
          {record.commonName && record.titles[0] ? (
            <p
              className="manuscript-record__subtitle"
              lang="en"
              dir="ltr"
              data-no-translate
            >
              {record.titles[0]}
            </p>
          ) : null}
          <p className="manuscript-record__shelfmark" data-no-translate>
            {record.shelfmark}
          </p>
        </div>
        <div className="manuscript-record__repository">
          <p>Held by</p>
          <h2 lang="en" dir="ltr" data-no-translate>
            {record.repository}
          </h2>
          <span>{place(record)}</span>
          <a href={record.purl} target="_blank" rel="noreferrer">
            View the manuscript
            <Arrow />
          </a>
        </div>
      </header>

      <dl className="manuscript-record__facts">
        <DetailFact label="Date" value={record.date.label} />
        <DetailFact label="HMML project" value={record.projectNumber} />
        <DetailFact label="Object" value={record.objectType} />
        <DetailFact label="Collection" value={record.collection} />
        <DetailFact label="Status" value={record.currentStatus} />
        <DetailFact label="Digital surrogate" value={record.surrogateFormat} />
      </dl>

      {record.summary ? (
        <section className="manuscript-record__summary">
          <p>Catalogue summary</p>
          <h2>{record.summary}</h2>
        </section>
      ) : null}

      {objectDescription ? (
        <section className="manuscript-description">
          <header>
            <p>Object description</p>
            <h2>The book as catalogued.</h2>
          </header>
          <div>
            <ProseField label="General notes" value={record.description.notes} />
            <ProseField label="Condition" value={record.description.condition} />
            <ProseField label="Collation" value={record.description.collation} />
            <ProseField label="Binding" value={record.description.binding} />
            <ProseField label="Provenance" value={record.description.provenance} />
            <ProseField
              label="Object colophon"
              value={record.description.colophon}
              dir="auto"
            />
            <ProseField
              label="Bibliography"
              value={record.description.bibliography}
            />
            <ProseField
              label="Reproduction notes"
              value={record.description.reproduction}
            />
          </div>
        </section>
      ) : null}

      <section className="manuscript-physical">
        <header>
          <p>Physical description</p>
          <h2>Material, extent, and form.</h2>
        </header>
        <dl>
          <DetailFact label="Support" value={record.physical.support} />
          <DetailFact label="Medium" value={record.physical.medium} />
          <DetailFact label="Foliation" value={record.physical.foliation} />
          <DetailFact label="Binding dimensions" value={bindingDimensions} />
          <DetailFact
            label="Extent"
            value={record.physical.extents
              .map((extent) =>
                extent.count && extent.unit
                  ? `${extent.count} ${extent.unit}`
                  : extent.imported,
              )
              .filter(Boolean)
              .join("; ")}
          />
          <DetailFact
            label="Features"
            value={record.physical.features.join("; ")}
          />
          <DetailFact label="Genres" value={record.genres.join("; ")} />
          <DetailFact label="Subjects" value={record.subjects.join("; ")} />
          <DetailFact
            label="Former owners"
            value={contributorsText(record.formerOwners)}
          />
        </dl>
      </section>

      {record.parts.map((part) => {
        const supportDimensions = dimensions(part.dimensions);
        const writingSpace = dimensions(part.writingSpace);

        return (
          <section className="manuscript-part" key={part.id}>
            <header>
              <span>Part {part.number}</span>
              <div>
                <p>
                  {part.location ? (
                    <span data-no-translate>{part.location}</span>
                  ) : null}
                  {part.location && part.date ? " · " : ""}
                  {part.date}
                </p>
                <h2>
                  {part.type || "Manuscript unit"}
                  {origin(part) ? ` from ${origin(part)}` : ""}
                </h2>
              </div>
            </header>
            <dl className="manuscript-part__facts">
              <DetailFact label="Support" value={part.supports.join("; ")} />
              <DetailFact
                label="Writing system"
                value={part.writingSystems.join("; ")}
              />
              <DetailFact label="Script" value={part.scripts.join("; ")} />
              <DetailFact label="Dimensions" value={supportDimensions} />
              <DetailFact label="Writing space" value={writingSpace} />
              <DetailFact label="Layout" value={part.layout} />
              <DetailFact
                label="Contributors"
                value={contributorsText(part.contributors)}
              />
              <DetailFact label="Scribe" value={part.scribe} />
              <DetailFact label="Artist" value={part.artist} />
            </dl>
            <div className="manuscript-part__notes">
              <ProseField label="Decoration" value={part.decoration} />
              <ProseField label="Colophon" value={part.colophon} dir="auto" />
              <ProseField label="Part notes" value={part.notes} />
            </div>
            {part.contents.length > 0 ? (
              <div className="manuscript-contents">
                <header>
                  <p>Texts in this part</p>
                  <span>
                    {part.contents.length}{" "}
                    {part.contents.length === 1 ? "item" : "items"}
                  </span>
                </header>
                {part.contents.map((content, index) => (
                  <ContentEntry
                    content={content}
                    sequence={index + 1}
                    key={content.id}
                  />
                ))}
              </div>
            ) : null}
          </section>
        );
      })}

      {record.standaloneContents.length > 0 ? (
        <section className="manuscript-contents manuscript-contents--standalone">
          <header>
            <p>Catalogued contents</p>
            <span>{record.standaloneContents.length} items</span>
          </header>
          {record.standaloneContents.map((content, index) => (
            <ContentEntry
              content={content}
              sequence={index + 1}
              key={content.id}
            />
          ))}
        </section>
      ) : null}

      <section className="manuscript-record__credits">
        <div>
          <p>Metadata care</p>
          <h2>{record.processedBy || "HMML"}</h2>
          {record.acknowledgments ? <p>{record.acknowledgments}</p> : null}
        </div>
        <div>
          <p>
            Dataset updated <time dateTime={payload.generatedAt}>{payload.generatedAt}</time>
            {record.lastUpdated ? ` · record updated ${record.lastUpdated}` : ""}.
          </p>
          <nav aria-label="Manuscript metadata sources">
            <a href={record.purl} target="_blank" rel="noreferrer">
              Permanent record
            </a>
            <a href={payload.sourceUrl} target="_blank" rel="noreferrer">
              HMML schema
            </a>
            <a href={payload.licenseUrl} target="_blank" rel="noreferrer">
              {payload.license}
            </a>
            {record.bibliographyLinks.map((link) => (
              <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>
    </article>
  );
}

export function ManuscriptDetails() {
  return (
    <Suspense
      fallback={
        <RecordState
          title="Opening the catalogue leaf."
          message="Preparing the manuscript address…"
        />
      }
    >
      <ManuscriptDetailsInner />
    </Suspense>
  );
}
