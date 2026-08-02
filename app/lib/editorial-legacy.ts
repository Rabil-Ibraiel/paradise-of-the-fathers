import type {
  EditorialBook,
  EditorialRecord,
  EditorialSaint,
  LocalizedText,
} from "../../shared/editorial";
import { arabicEditorialText } from "../data/arabic-translations";
import { archiveBooks, bookSlug } from "../data/books";
import { findSaintBiography } from "../data/saint-biographies";
import { saints } from "../data/saints";

const stripArabicMarks = (value: string) => value
  .normalize("NFKC")
  .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
  .replace(/ـ/g, "");

const localized = (english: string): LocalizedText => ({
  en: english,
  ar: arabicEditorialText[english]
    ? stripArabicMarks(arabicEditorialText[english])
    : "",
});

const licenseFromCaption = (caption?: string) =>
  caption?.match(/(?:public domain|CC0|CC BY(?:-SA)? [0-9.]+)/i)?.[0] ?? "";

export const legacyEditorialRecords: EditorialRecord[] = [
  ...saints.map((saint): EditorialRecord<EditorialSaint> => ({
    id: `legacy-saint-${saint.slug}`,
    type: "saint",
    slug: saint.slug,
    status: "draft",
    title: saint.name,
    payload: {
      slug: saint.slug,
      name: localized(saint.name),
      syriacName: saint.syriacName,
      title: localized(saint.title),
      era: localized(saint.era),
      place: localized(saint.place),
      category: saint.category,
      summary: localized(saint.summary),
      tone: saint.tone,
      image: saint.image ?? "",
      imageAlt: localized(saint.imageAlt ?? ""),
      imageCaption: localized(saint.imageCaption ?? ""),
      imageSourceUrl: saint.imageSourceUrl ?? "",
      imageLicense: licenseFromCaption(saint.imageCaption),
      imagePosition: saint.imagePosition ?? "center",
      devotionalIntroduction: localized(saint.devotionalIntroduction),
      reflection: localized(saint.reflection),
      historicalContext: saint.historicalContext.map((paragraph) => ({
        text: localized(paragraph.text),
        sourceIndexes: paragraph.sourceIndexes,
      })),
      lifeChapters: findSaintBiography(saint.slug).map((chapter) => ({
        title: localized(chapter.title),
        paragraphs: chapter.paragraphs.map((paragraph) => ({
          text: localized(paragraph.text),
          sourceIndexes: paragraph.sourceIndexes,
        })),
      })),
      themes: saint.themes.map(localized),
      sources: saint.sources,
    },
    createdAt: "",
    updatedAt: "",
    publishedAt: null,
    isLegacy: true,
  })),
  ...archiveBooks.map((book): EditorialRecord<EditorialBook> => ({
    id: `legacy-book-${bookSlug(book)}`,
    type: "book",
    slug: bookSlug(book),
    status: "draft",
    title: book.title,
    payload: {
      slug: bookSlug(book),
      title: localized(book.title),
      syriac: book.syriac,
      category: book.category,
      kind: localized(book.kind),
      year: book.year,
      creator: book.creator,
      publisher: "",
      edition: "",
      publicationPlace: "",
      languages: [],
      subjects: [],
      description: localized(book.description),
      notes: { en: "", ar: "" },
      sourceHref: book.sourceHref,
      sourceLabel: localized(book.sourceLabel),
      readingHref: book.readingHref ?? "",
      cover: book.cover ?? "",
      coverSourceUrl: book.cover ? book.readingHref ?? "" : "",
      coverLicense: "",
    },
    createdAt: "",
    updatedAt: "",
    publishedAt: null,
    isLegacy: true,
  })),
];
