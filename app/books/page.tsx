import type { Metadata } from "next";
import { BooksArchive } from "../components/books-archive";
import { PageTransition } from "../components/page-transition";
import { Arrow, SiteFooter, SiteHeader } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Books | The Paradise of the Fathers",
  description:
    "A categorized reading room of Syriac works, open digital editions, and sources behind the illustrated archive.",
};

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
            A reading room rather than a shop: original works, historic
            editions, and open digital copies arranged by the questions they
            help us ask.
          </p>
        </header>

        <section className="book-archive-section" id="book-list">
          <BooksArchive />
        </section>

        <section className="library-partners" aria-labelledby="partners-heading">
          <div>
            <p className="eyebrow">Open-library pathways</p>
            <h2 id="partners-heading">The shelf continues elsewhere.</h2>
          </div>
          <div>
            <p>
              Internet Archive supplies the complete digitized editions and
              cover previews used here. Open Library provides searchable
              bibliographic records and cover services for readers who want to
              compare editions.
            </p>
            <nav aria-label="Digital library partners">
              <a href="https://archive.org/" target="_blank" rel="noreferrer">
                Internet Archive
                <Arrow />
              </a>
              <a href="https://openlibrary.org/" target="_blank" rel="noreferrer">
                Open Library
                <Arrow />
              </a>
              <a href="https://syri.ac/about" target="_blank" rel="noreferrer">
                Syri.ac bibliography
                <Arrow />
              </a>
            </nav>
          </div>
        </section>

        <section className="syriac-resource-note">
          <div lang="syr" dir="rtl">
            ܝܘܠܦܢܐ ܘܥܘܗܕܢܐ
          </div>
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
