export type BookCategory =
  | "Origins & Apostles"
  | "Spiritual Life"
  | "Lives & Witness"
  | "Church & History"
  | "Manuscript Study";

export type ArchiveBook = {
  title: string;
  syriac: string;
  category: BookCategory;
  kind: string;
  year: string;
  creator: string;
  description: string;
  sourceHref: string;
  sourceLabel: string;
  readingHref?: string;
  cover?: string;
  internal?: boolean;
};

export const bookCategories: {
  name: BookCategory;
  description: string;
}[] = [
  {
    name: "Origins & Apostles",
    description: "How Syriac churches remembered beginnings, teachers, and mission.",
  },
  {
    name: "Spiritual Life",
    description: "Prayer, mercy, liturgy, and the long schooling of the heart.",
  },
  {
    name: "Lives & Witness",
    description: "Monastic memory and stories shaped around faithful lives.",
  },
  {
    name: "Church & History",
    description: "Synods, chronicles, institutions, and communities across centuries.",
  },
  {
    name: "Manuscript Study",
    description: "Tools for seeing scripts, dates, pages, and the hands behind them.",
  },
];

export const archiveBooks: ArchiveBook[] = [
  {
    title: "The Paradise of the Fathers",
    syriac: "ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ",
    category: "Lives & Witness",
    kind: "Classic collection",
    year: "1907",
    creator: "E. A. Wallis Budge · translator",
    description:
      "The established English title for a Syriac collection of monastic lives and sayings—the historical work from which this project borrows its name.",
    sourceHref: "/paradise-of-the-fathers",
    sourceLabel: "Our introduction",
    readingHref: "https://archive.org/details/paradiseorgarden02ann",
    cover: "https://archive.org/services/img/paradiseorgarden02ann",
    internal: true,
  },
  {
    title: "The Doctrine of Addai",
    syriac: "ܡܠܦܢܘܬܐ ܕܐܕܝ",
    category: "Origins & Apostles",
    kind: "Apostolic narrative",
    year: "1876",
    creator: "George Phillips · editor and translator",
    description:
      "The Syriac narrative through which Edessene Christians remembered Addai, King Abgar, and the beginnings of their Christian city.",
    sourceHref: "https://syriaca.org/work/921",
    sourceLabel: "Syriaca.org work record",
    readingHref: "https://archive.org/details/doctrineofaddaia00phil",
    cover: "https://archive.org/services/img/doctrineofaddaia00phil",
  },
  {
    title: "Mystic Treatises of Isaac of Nineveh",
    syriac: "ܡܐܡܪ̈ܐ ܕܐܝܣܚܩ ܕܢܝܢܘܐ",
    category: "Spiritual Life",
    kind: "Ascetical teaching",
    year: "1923",
    creator: "A. J. Wensinck · translator",
    description:
      "Teachings on mercy, stillness, prayer, and the healing of the heart that carried Isaac’s East Syriac voice into a global readership.",
    sourceHref: "https://syri.ac/brock/isaac",
    sourceLabel: "Syri.ac research guide",
    readingHref: "https://archive.org/details/IsaacOfNinevehMysticTreatises",
    cover: "https://archive.org/services/img/IsaacOfNinevehMysticTreatises",
  },
  {
    title: "The Story of Mar Qardagh",
    syriac: "ܣܗܕܘܬܐ ܕܩܪܕܓ",
    category: "Lives & Witness",
    kind: "Martyr narrative",
    year: "Late Antique tradition",
    creator: "Anonymous East Syriac author",
    description:
      "An East Syriac account of conversion and witness set in the Sasanian world and closely associated with the Christian memory of Adiabene.",
    sourceHref: "https://syriaca.org/work/287",
    sourceLabel: "Syriaca.org work record",
  },
  {
    title: "The Book of Governors",
    syriac: "ܟܬܒܐ ܕܪ̈ܝܫܢܐ",
    category: "Lives & Witness",
    kind: "Monastic history",
    year: "1893",
    creator: "Thomas of Marga · E. A. Wallis Budge",
    description:
      "A ninth-century history of monasteries and holy people of the Church of the East, especially the community of Beth ʿAbhe.",
    sourceHref: "https://syri.ac/thomasofmarga",
    sourceLabel: "Syri.ac research guide",
    readingHref: "https://archive.org/details/bookofgovernorsh01thom",
    cover: "https://archive.org/services/img/bookofgovernorsh01thom",
  },
  {
    title: "Synodicon Orientale",
    syriac: "ܟܬܒܐ ܕܣܘܢܗܕܘ",
    category: "Church & History",
    kind: "Synods and canons",
    year: "1902",
    creator: "J.-B. Chabot · editor",
    description:
      "A documentary collection for the synods and canons of the Church of the East from the early fifth through the later eighth century.",
    sourceHref: "https://syri.ac/synodiconorientale",
    sourceLabel: "Syri.ac research guide",
    readingHref: "https://archive.org/details/ChabotSynodiconOrientale",
    cover: "https://archive.org/services/img/ChabotSynodiconOrientale",
  },
  {
    title: "The Chronicle of Seert",
    syriac: "ܡܟܬܒܢܘܬܐ ܕܣܥܪܕ",
    category: "Church & History",
    kind: "Ecclesiastical history",
    year: "1919",
    creator: "Addai Scher and collaborators · editors",
    description:
      "An Arabic Christian chronicle drawing on older East Syriac materials and preserving memory of bishops, teachers, rulers, and communities.",
    sourceHref: "https://syri.ac/chronicleofseert",
    sourceLabel: "Syri.ac research guide",
    readingHref: "https://archive.org/details/ChroniqueDeSeertComplet",
    cover: "https://archive.org/services/img/ChroniqueDeSeertComplet",
  },
  {
    title: "The Liturgical Homilies of Narsai",
    syriac: "ܡܐܡܪ̈ܐ ܕܢܪܣܝ",
    category: "Spiritual Life",
    kind: "Poetry and liturgy",
    year: "1909",
    creator: "R. H. Connolly · translator",
    description:
      "Narsai’s teaching on baptism, Eucharist, worship, and the Church, introduced through an influential public-domain English translation.",
    sourceHref: "https://www.syri.ac/narsai",
    sourceLabel: "Syri.ac research guide",
    readingHref: "https://archive.org/details/liturgicalhomili00narsuoft",
    cover: "https://archive.org/services/img/liturgicalhomili00narsuoft",
  },
  {
    title: "An Album of Dated Syriac Manuscripts",
    syriac: "ܠܘܚ̈ܐ ܕܟܬܒܝܕ̈ܐ ܣܘܪ̈ܝܝܐ",
    category: "Manuscript Study",
    kind: "Palaeographical plates",
    year: "1946",
    creator: "William H. P. Hatch",
    description:
      "A visual reference for dated Syriac scripts and manuscripts, allowing readers to compare forms of writing across centuries.",
    sourceHref: "https://syri.ac/bibliography/1602586056",
    sourceLabel: "Syri.ac bibliography",
    readingHref:
      "https://archive.org/details/AnAlbumOfDatedSyriacManuscripts",
    cover:
      "https://archive.org/services/img/AnAlbumOfDatedSyriacManuscripts",
  },
];
