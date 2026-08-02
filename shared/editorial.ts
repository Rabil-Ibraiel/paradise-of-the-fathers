export type EditorialStatus = "draft" | "published";
export type EditorialType = "saint" | "book";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type EditorialSource = {
  label: string;
  publisher: string;
  url: string;
};

export type EditorialParagraph = {
  text: LocalizedText;
  sourceIndexes: number[];
};

export type EditorialLifeChapter = {
  title: LocalizedText;
  paragraphs: EditorialParagraph[];
};

export type EditorialSaint = {
  slug: string;
  name: LocalizedText;
  syriacName: string;
  title: LocalizedText;
  era: LocalizedText;
  place: LocalizedText;
  category: "Missionaries" | "Teachers" | "Monastics" | "Martyrs" | "Bishops";
  summary: LocalizedText;
  tone: "green" | "red" | "blue" | "gold";
  image: string;
  imageAlt: LocalizedText;
  imageCaption: LocalizedText;
  imageSourceUrl: string;
  imageLicense: string;
  imagePosition: string;
  devotionalIntroduction: LocalizedText;
  reflection: LocalizedText;
  historicalContext: EditorialParagraph[];
  lifeChapters: EditorialLifeChapter[];
  themes: Array<LocalizedText>;
  sources: EditorialSource[];
};

export type EditorialBook = {
  slug: string;
  title: LocalizedText;
  syriac: string;
  category:
    | "Origins & Apostles"
    | "Spiritual Life"
    | "Lives & Witness"
    | "Church & History"
    | "Manuscript Study";
  kind: LocalizedText;
  year: string;
  creator: string;
  publisher: string;
  edition: string;
  publicationPlace: string;
  languages: string[];
  subjects: string[];
  description: LocalizedText;
  notes: LocalizedText;
  sourceHref: string;
  sourceLabel: LocalizedText;
  readingHref: string;
  cover: string;
  coverSourceUrl: string;
  coverLicense: string;
};

export type EditorialPayload = EditorialSaint | EditorialBook;

export type EditorialRecord<T extends EditorialPayload = EditorialPayload> = {
  id: string;
  type: EditorialType;
  slug: string;
  status: EditorialStatus;
  title: string;
  payload: T;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  isLegacy?: boolean;
};

export type EditorialContentResponse = {
  records: EditorialRecord[];
  updatedAt: string | null;
};

export type EditorialCheck = {
  label: string;
  complete: boolean;
};

const hasLocalizedText = (value: LocalizedText) => Boolean(value.en.trim() && value.ar.trim());

export function editorialChecks(type: EditorialType, payload: EditorialPayload): EditorialCheck[] {
  if (type === "saint") {
    const saint = payload as EditorialSaint;
    const sourcesComplete = saint.sources.length > 0 && saint.sources.every(
      (source) => Boolean(source.label.trim() && source.publisher.trim() && source.url.trim()),
    );
    const paragraphComplete = (paragraph: EditorialParagraph) =>
      hasLocalizedText(paragraph.text)
      && paragraph.sourceIndexes.length > 0
      && paragraph.sourceIndexes.every((index) => index >= 0 && index < saint.sources.length);
    const narrativeComplete = saint.historicalContext.length > 0
      && saint.historicalContext.every(paragraphComplete)
      && saint.lifeChapters.every(
        (chapter) => hasLocalizedText(chapter.title)
          && chapter.paragraphs.length > 0
          && chapter.paragraphs.every(paragraphComplete),
      );
    return [
      { label: "English and Arabic identity", complete: hasLocalizedText(saint.name) && hasLocalizedText(saint.title) && hasLocalizedText(saint.summary) },
      { label: "Syriac name", complete: Boolean(saint.syriacName.trim()) },
      { label: "Spiritual introduction", complete: hasLocalizedText(saint.devotionalIntroduction) && hasLocalizedText(saint.reflection) },
      { label: "Sourced life narrative", complete: narrativeComplete },
      { label: "Complete sources", complete: sourcesComplete },
      {
        label: "Image provenance",
        complete: !saint.image || Boolean(
          hasLocalizedText(saint.imageAlt)
          && hasLocalizedText(saint.imageCaption)
          && saint.imageSourceUrl.trim()
          && saint.imageLicense.trim(),
        ),
      },
    ];
  }

  const book = payload as EditorialBook;
  return [
    { label: "English and Arabic title", complete: hasLocalizedText(book.title) },
    { label: "Syriac title", complete: Boolean(book.syriac.trim()) },
    { label: "Work description", complete: hasLocalizedText(book.kind) && hasLocalizedText(book.description) },
    { label: "Bibliographic details", complete: Boolean(book.creator.trim() && book.year.trim()) },
    { label: "Source link", complete: Boolean(book.sourceHref.trim() && book.sourceLabel.en.trim() && book.sourceLabel.ar.trim()) },
    {
      label: "Cover provenance",
      complete: !book.cover || Boolean(book.coverSourceUrl.trim() && book.coverLicense.trim()),
    },
  ];
}

export const emptyLocalizedText = (): LocalizedText => ({ en: "", ar: "" });

export function createEmptySaint(): EditorialSaint {
  return {
    slug: "",
    name: emptyLocalizedText(),
    syriacName: "",
    title: emptyLocalizedText(),
    era: emptyLocalizedText(),
    place: emptyLocalizedText(),
    category: "Monastics",
    summary: emptyLocalizedText(),
    tone: "green",
    image: "",
    imageAlt: emptyLocalizedText(),
    imageCaption: emptyLocalizedText(),
    imageSourceUrl: "",
    imageLicense: "",
    imagePosition: "center",
    devotionalIntroduction: emptyLocalizedText(),
    reflection: emptyLocalizedText(),
    historicalContext: [],
    lifeChapters: [],
    themes: [],
    sources: [],
  };
}

export function createEmptyBook(): EditorialBook {
  return {
    slug: "",
    title: emptyLocalizedText(),
    syriac: "",
    category: "Lives & Witness",
    kind: emptyLocalizedText(),
    year: "",
    creator: "",
    publisher: "",
    edition: "",
    publicationPlace: "",
    languages: [],
    subjects: [],
    description: emptyLocalizedText(),
    notes: emptyLocalizedText(),
    sourceHref: "",
    sourceLabel: emptyLocalizedText(),
    readingHref: "",
    cover: "",
    coverSourceUrl: "",
    coverLicense: "",
  };
}
