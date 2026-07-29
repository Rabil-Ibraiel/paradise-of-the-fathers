import { createReadStream, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const sourcePath = process.argv[2];
const outputPath = resolve(
  process.argv[3] ?? "public/data/hmml-syriac-index.json",
);

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

const records = [];
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

console.log(
  `Wrote ${records.length.toLocaleString("en-US")} Syriac records to ${outputPath}`,
);
