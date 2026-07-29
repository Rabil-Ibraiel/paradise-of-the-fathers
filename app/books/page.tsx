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
        <SiteFooter />
      </main>
    </PageTransition>
  );
}
