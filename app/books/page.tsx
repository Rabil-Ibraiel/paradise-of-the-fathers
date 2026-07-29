import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "../components/page-transition";
import { Arrow, SiteFooter, SiteHeader } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Books | The Paradise of the Fathers",
  description:
    "Classic Syriac works and modern scholarly records behind the illustrated archive.",
};

const books = [
  {
    number: "I",
    kind: "Classic collection",
    title: "The Paradise of the Fathers",
    syriac: "ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ",
    description:
      "The established English title for a Syriac collection of monastic lives and sayings—the historical work from which this new project borrows its name.",
    href: "/paradise-of-the-fathers",
    internal: true,
  },
  {
    number: "II",
    kind: "Apostolic narrative",
    title: "The Teaching of Addai",
    syriac: "ܡܠܦܢܘܬܐ ܕܐܕܝ",
    description:
      "The Syriac narrative through which Edessene Christians remembered Addai, King Abgar, and the beginnings of their Christian city.",
    href: "https://syriaca.org/work/921",
  },
  {
    number: "III",
    kind: "Spiritual writings",
    title: "Isaac of Nineveh",
    syriac: "ܐܝܣܚܩ ܕܢܝܢܘܐ",
    description:
      "Ascetical teachings on mercy, stillness, prayer, and the healing of the heart, preserved in Syriac and carried into many Christian languages.",
    href: "https://syriaca.org/person/550",
  },
  {
    number: "IV",
    kind: "Martyr narrative",
    title: "The Story of Mar Qardagh",
    syriac: "ܣܗܕܘܬܐ ܕܩܪܕܓ",
    description:
      "An East Syriac account of conversion and witness set in the Sasanian world and closely associated with the Christian memory of Adiabene.",
    href: "https://syriaca.org/work/287",
  },
  {
    number: "V",
    kind: "Monastic history",
    title: "The Book of Governors",
    syriac: "ܟܬܒܐ ܕܪ̈ܫܢܐ",
    description:
      "Thomas of Marga’s ninth-century history of the monasteries and holy people of the Church of the East, especially the community of Beth ʿAbhe.",
    href: "https://syri.ac/thomasofmarga",
  },
  {
    number: "VI",
    kind: "Synods and canons",
    title: "Synodicon Orientale",
    syriac: "ܟܬܒܐ ܕܣܘܢܗܕܘ",
    description:
      "A documentary collection for the synods and canons of the Church of the East from the early fifth through the later eighth century.",
    href: "https://syri.ac/synodiconorientale",
  },
  {
    number: "VII",
    kind: "Ecclesiastical history",
    title: "The Chronicle of Seert",
    syriac: "ܡܟܬܒܢܘܬܐ ܕܣܥܪܕ",
    description:
      "An Arabic Christian chronicle drawing on older East Syriac materials and preserving valuable memory of bishops, teachers, and communities.",
    href: "https://syri.ac/chronicleofseert",
  },
];

const openReadings = [
  {
    year: "1876",
    title: "The Doctrine of Addai",
    editor: "George Phillips · Syriac text and English translation",
    description:
      "An early printed edition of the complete Syriac narrative, with an English translation and notes.",
    href: "https://syri.ac/bibliography/967999565",
  },
  {
    year: "1909",
    title: "The Liturgical Homilies of Narsai",
    editor: "R. H. Connolly · English translation and introduction",
    description:
      "A public-domain introduction to Narsai’s teaching on liturgy, baptism, the Eucharist, and the life of the Church.",
    href: "https://www.syri.ac/bibliography/1444246541",
  },
  {
    year: "1946",
    title: "An Album of Dated Syriac Manuscripts",
    editor: "William H. P. Hatch · palaeographical plates",
    description:
      "A classic visual reference for dated Syriac scripts and manuscripts, linked by Syri.ac to an open digital copy.",
    href: "https://syri.ac/bibliography/1602586056",
  },
];

export default function BooksPage() {
  return (
    <PageTransition name="books-page">
      <main className="collection-page">
        <a className="skip-link" href="#book-list">
          Skip to books
        </a>
        <SiteHeader active="books" />
        <header className="collection-hero collection-hero--split">
          <div>
            <p className="eyebrow">Texts behind the lives</p>
            <h1>Books.</h1>
          </div>
          <p>
            Not a shop and not a shelf of anonymous covers: this is a reading
            room of works and scholarly records that ground the archive.
          </p>
        </header>
        <section className="book-list" id="book-list">
          {books.map((book) => {
            const content = (
              <>
                <span className="book-entry__number">{book.number}</span>
                <div className="book-entry__title">
                  <p>{book.kind}</p>
                  <h2>{book.title}</h2>
                  <span lang="syr" dir="rtl">{book.syriac}</span>
                </div>
                <p className="book-entry__description">{book.description}</p>
                <span className="book-entry__action">
                  Open record
                  <Arrow />
                </span>
              </>
            );

            return book.internal ? (
              <Link className="book-entry" href={book.href} key={book.title}>
                {content}
              </Link>
            ) : (
              <a
                className="book-entry"
                href={book.href}
                key={book.title}
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </a>
            );
          })}
        </section>

        <section className="open-reading-section" aria-labelledby="open-reading-heading">
          <header>
            <div>
              <p className="eyebrow">Open-access shelf</p>
              <h2 id="open-reading-heading">Three classics you can read now.</h2>
            </div>
            <p>
              Syri.ac links these older, out-of-copyright studies to complete
              digital copies. Each title opens first to its bibliographic
              record, where the edition and source can be checked.
            </p>
          </header>
          <div className="open-reading-list">
            {openReadings.map((reading) => (
              <a
                href={reading.href}
                key={reading.title}
                target="_blank"
                rel="noreferrer"
              >
                <span>{reading.year}</span>
                <div>
                  <small>{reading.editor}</small>
                  <h3>{reading.title}</h3>
                  <p>{reading.description}</p>
                </div>
                <span className="open-reading-list__action">
                  Open on Syri.ac
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="syriac-resource-note">
          <div lang="syr" dir="rtl">ܝܘܠܦܢܐ ܘܥܘܗܕܢܐ</div>
          <div>
            <p className="eyebrow">How Syri.ac helps this archive</p>
            <h2>From a remembered life to the texts that preserve it.</h2>
            <p>
              The saint profiles remain short and welcoming. Syri.ac supplies
              the next step: manuscript witnesses, historic editions,
              translations, bibliographies, and the scholarly paths between
              them.
            </p>
          </div>
          <a href="https://syri.ac/about" target="_blank" rel="noreferrer">
            About the Syri.ac project
            <Arrow />
          </a>
        </section>

        <SiteFooter />
      </main>
    </PageTransition>
  );
}
