import { createReadStream, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const sourcePath = process.argv[2];
const outputPath = resolve(
  process.argv[3] ?? "public/data/hmml-syriac-index.json",
);
const detailsDirectory = resolve(
  process.argv[4] ?? "public/data/hmml-syriac-details",
);
const detailShardCount = 128;

if (!sourcePath) {
  throw new Error(
    "Usage: node scripts/extract-hmml-syriac.mjs <vhmml_rr_fulldata.json> [output]",
  );
}

const categoryOrder = [
  "Liturgy & Prayer",
  "Scripture",
  "Saints & Martyrs",
  "Homilies & Poetry",
  "Theology & Spirituality",
  "History & Canon Law",
  "Language & Learning",
  "Other Collections",
];

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function plainText(value) {
  if (typeof value !== "string") return "";

  const namedEntities = {
    amp: "&",
    apos: "'",
    quot: '"',
    lt: "<",
    gt: ">",
    nbsp: " ",
    ndash: "–",
    mdash: "—",
    hellip: "…",
    lsquo: "‘",
    rsquo: "’",
    ldquo: "“",
    rdquo: "”",
    Auml: "Ä",
    Ouml: "Ö",
    Uuml: "Ü",
    auml: "ä",
    ouml: "ö",
    uuml: "ü",
    eacute: "é",
    Eacute: "É",
  };

  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(
      /&([a-z]+);/gi,
      (entity, name) => namedEntities[name] ?? entity,
    )
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function contributorName(item) {
  return (
    item?.contributor?.displayName ||
    item?.contributor?.name ||
    item?.nameNs ||
    ""
  );
}

function contributors(items = []) {
  return items
    .map((item) => ({
      role: item.type || "Contributor",
      name: contributorName(item),
    }))
    .filter((item) => item.name);
}

function hasSyriac(record) {
  if ((record.writingSystem ?? "").toLowerCase().includes("syriac")) {
    return true;
  }

  for (const part of record.parts ?? []) {
    if ((part.writingSystem ?? "").toLowerCase().includes("syriac")) {
      return true;
    }

    for (const content of part.contents ?? []) {
      if (
        (content.languages ?? []).some(
          (language) => language.name === "Syriac",
        )
      ) {
        return true;
      }
    }
  }

  for (const content of record.contents ?? []) {
    if (
      (content.languages ?? []).some(
        (language) => language.name === "Syriac",
      )
    ) {
      return true;
    }
  }

  return false;
}

function getContents(record) {
  return [
    ...(record.contents ?? []),
    ...(record.parts ?? []).flatMap((part) => part.contents ?? []),
  ];
}

function getCategory(genres, titles) {
  const haystack = [...genres, ...titles].join(" ").toLowerCase();

  const rules = [
    [
      "Liturgy & Prayer",
      /litur|prayer|anaphora|missal|ritual|hymn|sacrament|office|breviary|ḥudr|hudr/,
    ],
    [
      "Scripture",
      /bible|gospel|psalt|scripture|lection|testament|pentateuch|prophet/,
    ],
    [
      "Saints & Martyrs",
      /hagiograph|martyr|saint|vita|holy (?:man|woman)|lives of/,
    ],
    ["Homilies & Poetry", /sermon|homil|poem|memr|mēmr|verse/],
    [
      "Theology & Spirituality",
      /commentar|theolog|doctr|ascetic|mystic|spiritual|christolog/,
    ],
    [
      "History & Canon Law",
      /histor|chronicle|canon|synod|council|ecclesiastical law/,
    ],
    [
      "Language & Learning",
      /grammar|dictionar|lexic|gloss|school|scientific|medicine|astron/,
    ],
  ];

  return (
    rules.find(([, pattern]) => pattern.test(haystack))?.[0] ??
    "Other Collections"
  );
}

function getDate(record) {
  const parts = record.parts ?? [];
  const begins = parts
    .map((part) => Number(part.beginDate))
    .filter((date) => Number.isFinite(date) && date > 0);
  const ends = parts
    .map((part) => Number(part.endDate))
    .filter((date) => Number.isFinite(date) && date > 0);

  if (begins.length > 0 || ends.length > 0) {
    const start = Math.min(...(begins.length > 0 ? begins : ends));
    const end = Math.max(...(ends.length > 0 ? ends : begins));

    return {
      start,
      end,
      label: start === end ? String(start) : `${start}–${end}`,
    };
  }

  const century = unique(
    parts.flatMap((part) =>
      part.centuryImported
        ? [part.centuryImported]
        : (part.centuries ?? []).map((value) => `${value}th century`),
    ),
  )[0];

  return { label: century || "Date not recorded" };
}

function compactRecord(record) {
  const contents = getContents(record);
  const titles = unique(
    contents.flatMap((content) => [
      content.provisionalTitle,
      content.uniformTitle?.name,
      ...(content.alternateTitles ?? []),
    ]),
  ).slice(0, 3);
  const genres = unique((record.genres ?? []).map((genre) => genre.name)).slice(
    0,
    4,
  );
  const languages = unique(
    contents.flatMap((content) =>
      (content.languages ?? []).map((language) => language.name),
    ),
  ).slice(0, 4);
  const authors = unique(
    contents.flatMap((content) =>
      (content.contentContributors ?? [])
        .filter((item) => item.type === "Author")
        .map(
          (item) =>
            item.contributor?.displayName || item.contributor?.name || "",
        ),
    ),
  ).slice(0, 2);
  const supports = unique(
    [
      record.support,
      ...(record.parts ?? []).flatMap((part) => [
        part.support,
        part.supportImported,
      ]),
    ].filter(Boolean),
  ).slice(0, 2);

  return {
    id: record.id,
    purl: record.PURL,
    shelfmark:
      record.shelfMark || record.hmmlProjectNumber || `HMML ${record.id}`,
    projectNumber: record.hmmlProjectNumber || "",
    repository: record.repository?.name || "Repository not recorded",
    city: record.city?.name || "",
    country: record.country?.name || "Location not recorded",
    date: getDate(record),
    category: getCategory(genres, titles),
    genres,
    titles,
    authors,
    languages,
    supports,
    access: record.accessRestriction || "See holding repository",
    viewableOnline: Boolean(record.viewableOnline),
  };
}

function partDate(part) {
  if (part.datePreciseYear) {
    return [
      part.datePreciseYear,
      part.datePreciseMonth,
      part.datePreciseDay,
    ]
      .filter(Boolean)
      .join("-");
  }

  if (part.beginDate || part.endDate) {
    const start = part.beginDate || part.endDate;
    const end = part.endDate || part.beginDate;
    return start === end ? String(start) : `${start}–${end}`;
  }

  return (
    plainText(part.ymdDateImported) ||
    plainText(part.centuryImported) ||
    unique((part.centuries ?? []).map((century) => `${century}th century`)).join(
      ", ",
    )
  );
}

function compactContent(content, partNumber) {
  return {
    id: content.id,
    partNumber,
    itemNumber: content.itemNumber ?? null,
    location: plainText(content.itemLocation),
    title:
      plainText(content.provisionalTitle) ||
      plainText(content.uniformTitle?.name) ||
      "Untitled item",
    titleSyriac: plainText(content.titleNs),
    uniformTitle: plainText(content.uniformTitle?.name),
    alternateTitles: unique(
      (content.alternateTitles ?? []).map((title) => plainText(title)),
    ),
    languages: unique(
      (content.languages ?? []).map((language) => language.name),
    ),
    contributors: contributors(content.contentContributors),
    rubric: plainText(content.rubric),
    incipit: plainText(content.incipit),
    explicit: plainText(content.explicit),
    contents: plainText(content.contentsDetail),
    notes: plainText(content.itemNotes),
    pagination: plainText(content.paginationStatement),
  };
}

function compactPart(part, partIndex) {
  return {
    id: part.id,
    number: part.partNumber ?? partIndex + 1,
    type: plainText(part.type),
    location: plainText(part.partLocation),
    date: partDate(part),
    origin: {
      country: plainText(part.countryOfOrigin),
      region: plainText(part.regionOfOrigin),
      city: plainText(part.cityOfOrigin),
    },
    supports: unique(
      [part.support, part.supportImported].map((value) => plainText(value)),
    ),
    dimensions: {
      width: part.supportDimensionsWidth ?? null,
      height: part.supportDimensionsHeight ?? null,
      imported: plainText(part.supportDimensionsImported),
    },
    writingSpace: {
      width: part.writingSpaceWidth ?? null,
      height: part.writingSpaceHeight ?? null,
      imported: plainText(part.writingSpaceImported),
    },
    writingSystems: unique(
      [part.writingSystem, part.writingSystemImported].map((value) =>
        plainText(value),
      ),
    ),
    scripts: unique(
      [part.script, part.scriptImported].map((value) => plainText(value)),
    ),
    contributors: contributors(part.partContributors),
    scribe: plainText(part.scribe),
    artist: plainText(part.artist),
    layout: plainText(part.layout),
    decoration: plainText(part.decoration),
    colophon: plainText(part.colophonPart),
    notes: plainText(part.partNotes),
    contents: (part.contents ?? []).map((content) =>
      compactContent(content, part.partNumber ?? partIndex + 1),
    ),
  };
}

function detailedRecord(record) {
  const parts = (record.parts ?? []).map(compactPart);
  const standaloneContents = (record.contents ?? []).map((content) =>
    compactContent(content, null),
  );
  const contents = getContents(record);
  const titles = unique(
    contents.flatMap((content) => [
      plainText(content.provisionalTitle),
      plainText(content.uniformTitle?.name),
      ...(content.alternateTitles ?? []).map((title) => plainText(title)),
    ]),
  );
  const genres = unique((record.genres ?? []).map((genre) => genre.name));

  return {
    id: record.id,
    purl: record.PURL,
    rights: record.rights || "https://www.vhmml.org/terms",
    shelfmark:
      record.shelfMark || record.hmmlProjectNumber || `HMML ${record.id}`,
    projectNumber: record.hmmlProjectNumber || "",
    commonName: plainText(record.commonName),
    summary: plainText(record.summary),
    objectType: plainText(record.objectType),
    processedBy: plainText(record.processedBy),
    repository: record.repository?.name || "Repository not recorded",
    holdingInstitution: record.holdingInstitution?.name || "",
    city: record.city?.name || "",
    country: record.country?.name || "Location not recorded",
    collection: plainText(record.collection),
    date: getDate(record),
    category: getCategory(genres, titles),
    titles,
    captureDate: plainText(record.captureDateDisplay),
    lastUpdated: plainText(record.lastUpdateDisplay),
    currentStatus: plainText(record.currentStatus),
    access: record.accessRestriction || "See holding repository",
    viewableOnline: Boolean(record.viewableOnline),
    downloadOption: plainText(record.downloadOption) || "No",
    surrogateFormat: plainText(record.surrogateFormat?.name),
    acknowledgments: plainText(record.acknowledgments),
    description: {
      notes: plainText(record.notes),
      condition: plainText(record.conditionNotes),
      collation: plainText(record.collation),
      binding: plainText(record.binding),
      provenance: plainText(record.provenance),
      bibliography: plainText(record.bibliography),
      colophon: plainText(record.colophon),
      reproduction: plainText(record.reproductionNotes),
    },
    physical: {
      support: plainText(record.support),
      medium: plainText(record.medium),
      foliation: plainText(record.foliation),
      bindingDimensions: {
        width: record.bindingWidth ?? null,
        height: record.bindingHeight ?? null,
        depth: record.bindingDepth ?? null,
        imported: plainText(record.bindingDimensionsImported),
      },
      extents: (record.extents ?? []).map((extent) => ({
        count: extent.count ?? null,
        unit: plainText(extent.displayName),
        imported: plainText(extent.folioImported),
      })),
      features: unique(
        (record.features ?? []).flatMap((feature) => [
          plainText(feature.name),
          plainText(feature.featuresImported),
        ]),
      ),
    },
    genres,
    subjects: unique((record.subjects ?? []).map((subject) => subject.name)),
    formerOwners: contributors(record.objectContributors),
    bibliographyLinks: (record.externalBibliographyUrls ?? [])
      .map((item) => ({
        url: item.url,
        label: plainText(item.linkText) || "External bibliography",
      }))
      .filter((item) => item.url),
    facsimiles: (record.externalFacsimileUrls ?? [])
      .map((item) => item.url)
      .filter(Boolean),
    parts,
    standaloneContents,
  };
}

const records = [];
const detailShards = Array.from({ length: detailShardCount }, () => ({}));
let objectDepth = 0;
let inString = false;
let escaped = false;
let currentObject = "";

for await (const chunk of createReadStream(sourcePath, {
  encoding: "utf8",
  highWaterMark: 1024 * 1024,
})) {
  let segmentStart = objectDepth > 0 ? 0 : -1;

  for (let index = 0; index < chunk.length; index += 1) {
    const character = chunk[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"' && objectDepth > 0) {
      inString = true;
      continue;
    }

    if (character === "{") {
      if (objectDepth === 0) {
        segmentStart = index;
      }
      objectDepth += 1;
      continue;
    }

    if (character === "}" && objectDepth > 0) {
      objectDepth -= 1;

      if (objectDepth === 0) {
        currentObject += chunk.slice(segmentStart, index + 1);
        const parsed = JSON.parse(currentObject);
        if (hasSyriac(parsed)) {
          records.push(compactRecord(parsed));
          const shard = Number(parsed.id) % detailShardCount;
          detailShards[shard][parsed.id] = detailedRecord(parsed);
        }
        currentObject = "";
        segmentStart = -1;
      }
    }
  }

  if (objectDepth > 0 && segmentStart >= 0) {
    currentObject += chunk.slice(segmentStart);
  }
}

records.sort((left, right) => {
  const categoryDifference =
    categoryOrder.indexOf(left.category) - categoryOrder.indexOf(right.category);
  if (categoryDifference !== 0) return categoryDifference;

  const leftDate = left.date.start ?? Number.MAX_SAFE_INTEGER;
  const rightDate = right.date.start ?? Number.MAX_SAFE_INTEGER;
  if (leftDate !== rightDate) return leftDate - rightDate;

  return left.shelfmark.localeCompare(right.shelfmark);
});

const categoryCounts = Object.fromEntries(
  categoryOrder.map((category) => [
    category,
    records.filter((record) => record.category === category).length,
  ]),
);

const payload = {
  generatedFrom: "HMML Reading Room weekly dataset",
  generatedAt: "2026-07-26",
  sourceUrl: "https://www.vhmml.org/dataPortal/dataset",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  total: records.length,
  categoryOrder,
  categoryCounts,
  records,
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(payload)}\n`, "utf8");
mkdirSync(detailsDirectory, { recursive: true });
detailShards.forEach((recordsById, shard) => {
  writeFileSync(
    resolve(detailsDirectory, `${String(shard).padStart(3, "0")}.json`),
    `${JSON.stringify({
      generatedAt: payload.generatedAt,
      sourceUrl: payload.sourceUrl,
      license: payload.license,
      licenseUrl: payload.licenseUrl,
      records: recordsById,
    })}\n`,
    "utf8",
  );
});

console.log(
  `Wrote ${records.length.toLocaleString("en-US")} Syriac records to ${outputPath} and ${detailShardCount} detail shards to ${detailsDirectory}`,
);
