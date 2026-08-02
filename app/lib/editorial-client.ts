import type {
  EditorialBook,
  EditorialContentResponse,
  EditorialRecord,
  EditorialSaint,
} from "../../shared/editorial";
import type { ArchiveBook } from "../data/books";
import type { Saint } from "../data/saints";

const apiBase = process.env.NEXT_PUBLIC_EDITORIAL_API_URL ?? "";
let contentRequest: Promise<EditorialContentResponse> | null = null;

export function loadEditorialContent() {
  if (!apiBase) return Promise.resolve({ records: [], updatedAt: null });
  if (!contentRequest) {
    const controller = new AbortController();
    const timeout = globalThis.setTimeout(() => controller.abort(), 12_000);
    contentRequest = fetch(`${apiBase}/content`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Editorial content is temporarily unavailable.");
        return response.json() as Promise<EditorialContentResponse>;
      })
      .catch((error) => {
        contentRequest = null;
        throw error;
      })
      .finally(() => globalThis.clearTimeout(timeout));
  }
  return contentRequest;
}

export function findEditorialRecord<T extends EditorialSaint | EditorialBook>(
  response: EditorialContentResponse,
  type: "saint" | "book",
  slug: string,
) {
  return response.records.find(
    (record) => record.type === type && record.slug === slug,
  ) as EditorialRecord<T> | undefined;
}

export function mapEditorialSaint(record: EditorialRecord<EditorialSaint>): Saint {
  const saint = record.payload;
  return {
    slug: saint.slug,
    name: saint.name.en,
    syriacName: saint.syriacName,
    title: saint.title.en,
    era: saint.era.en,
    place: saint.place.en,
    category: saint.category,
    summary: saint.summary.en,
    image: saint.image || undefined,
    imageAlt: saint.imageAlt.en,
    imageCaption: saint.imageCaption.en,
    imageSourceUrl: saint.imageSourceUrl,
    imagePosition: saint.imagePosition,
    imageLicense: saint.imageLicense,
    tone: saint.tone,
    devotionalIntroduction: saint.devotionalIntroduction.en,
    reflection: saint.reflection.en,
    historicalContext: saint.historicalContext.map((paragraph) => ({
      text: paragraph.text.en,
      arabicText: paragraph.text.ar,
      sourceIndexes: paragraph.sourceIndexes,
    })),
    themes: saint.themes.map((theme) => theme.en),
    sources: saint.sources,
    lifeChapters: saint.lifeChapters.map((chapter) => ({
      title: chapter.title.en,
      arabicTitle: chapter.title.ar,
      paragraphs: chapter.paragraphs.map((paragraph) => ({
        text: paragraph.text.en,
        arabicText: paragraph.text.ar,
        sourceIndexes: paragraph.sourceIndexes,
      })),
    })),
    arabic: {
      name: saint.name.ar,
      title: saint.title.ar,
      era: saint.era.ar,
      place: saint.place.ar,
      summary: saint.summary.ar,
      imageAlt: saint.imageAlt.ar,
      imageCaption: saint.imageCaption.ar,
      devotionalIntroduction: saint.devotionalIntroduction.ar,
      reflection: saint.reflection.ar,
      themes: saint.themes.map((theme) => theme.ar),
    },
    isEditorial: true,
  };
}

export function mapEditorialBook(record: EditorialRecord<EditorialBook>): ArchiveBook {
  const book = record.payload;
  return {
    slug: book.slug,
    title: book.title.en,
    syriac: book.syriac,
    category: book.category,
    kind: book.kind.en,
    year: book.year,
    creator: book.creator,
    publisher: book.publisher,
    edition: book.edition,
    publicationPlace: book.publicationPlace,
    languages: book.languages,
    subjects: book.subjects,
    description: book.description.en,
    notes: book.notes.en,
    sourceHref: book.sourceHref,
    sourceLabel: book.sourceLabel.en,
    readingHref: book.readingHref || undefined,
    cover: book.cover || undefined,
    coverSourceUrl: book.coverSourceUrl,
    coverLicense: book.coverLicense,
    arabic: {
      title: book.title.ar,
      kind: book.kind.ar,
      description: book.description.ar,
      notes: book.notes.ar,
      sourceLabel: book.sourceLabel.ar,
    },
    isEditorial: true,
  };
}
