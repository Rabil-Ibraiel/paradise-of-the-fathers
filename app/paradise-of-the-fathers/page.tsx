import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "../components/page-transition";
import { Arrow, CrossMark, SiteFooter, SiteHeader } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Paradise of the Fathers | About the Project",
  description:
    "The old Syriac book behind the name, and the purpose of this new illustrated Church of the East archive.",
};

export default function ParadisePage() {
  return (
    <PageTransition name="paradise-page">
      <main className="collection-page">
        <a className="skip-link" href="#paradise-story">
          Skip to the story
        </a>
        <SiteHeader active="paradise" />
        <header className="paradise-hero" id="paradise-story">
          <div className="paradise-hero__book" aria-hidden="true">
            <CrossMark />
            <span lang="syr" dir="rtl">
              ܦܪܕܝܣܐ
              <br />
              ܕܐܒܗ̈ܬܐ
            </span>
            <small>THE PARADISE OF THE FATHERS</small>
          </div>
          <div className="paradise-hero__copy">
            <p className="eyebrow">An old name, a new work</p>
            <h1>A garden of remembered lives.</h1>
            <p className="paradise-hero__lead">
              <em>The Paradise of the Fathers</em> is the famous English name
              of a classic Syriac collection of the lives and wisdom of early
              monastic fathers.
            </p>
            <p>
              This website is not a new edition, translation, or replacement
              for that ancient book. It respectfully borrows the beloved name
              for a new, simple, illustrated collection focused on principal
              saints in the Church of the East.
            </p>
          </div>
        </header>

        <section className="paradise-principles">
          <article>
            <span>01</span>
            <h2>Simple, not shallow.</h2>
            <p>
              Each life is concise enough to enter easily, while citations
              keep the path open for deeper study.
            </p>
          </article>
          <article>
            <span>02</span>
            <h2>Illustrated, not invented.</h2>
            <p>
              Documented icons and manuscript images are identified. Where no
              responsible likeness is available, the design uses a symbolic
              Syriac monogram rather than a fictional portrait.
            </p>
          </article>
          <article>
            <span>03</span>
            <h2>Devotional and careful.</h2>
            <p>
              Sacred memory is treated with reverence, while later tradition
              and recoverable history are distinguished clearly.
            </p>
          </article>
        </section>

        <section className="paradise-sources">
          <div>
            <p className="eyebrow">The historical book</p>
            <h2>Follow the name to its source.</h2>
          </div>
          <div className="source-links">
            <a
              href="https://gedsh.bethmardutho.org/Paradise-of-the-Fathers-Book-of"
              target="_blank"
              rel="noreferrer"
            >
              Encyclopedic introduction <span>↗</span>
            </a>
            <a
              href="https://syriaca.org/work/403"
              target="_blank"
              rel="noreferrer"
            >
              Syriaca.org work record <span>↗</span>
            </a>
          </div>
        </section>

        <section className="closing-section closing-section--paradise">
          <span className="closing-section__star">✦</span>
          <p>Enter the new collection</p>
          <h2>Begin with one remembered life.</h2>
          <Link className="button button--light" href="/saints">
            Browse the saints
            <Arrow />
          </Link>
        </section>
        <SiteFooter />
      </main>
    </PageTransition>
  );
}
