import type { Metadata } from "next";
import { PageTransition } from "../components/page-transition";
import { Arrow, SiteFooter, SiteHeader } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Manuscripts | The Paradise of the Fathers",
  description:
    "A small, carefully catalogued selection of East Syriac manuscript witnesses.",
};

const manuscripts = [
  {
    date: "899",
    shelfmark: "Add MS 12138",
    title: "Peshitta readings",
    place: "Written at Harran",
    description:
      "A Syriac biblical manuscript whose catalog record notes East Syriac diacritical dots—a modest but valuable witness to the scribal tradition.",
    url: "https://searcharchives.bl.uk/catalog/032-003470083",
  },
  {
    date: "1203",
    shelfmark: "Add MS 7154",
    title: "Church of the East Psalter",
    place: "East Syriac tradition",
    description:
      "A Psalter with Eastern Syriac vocalization and line illustrations. The catalogue preserves its identity even where digital folios are not currently available.",
    url: "https://searcharchives.bl.uk/catalog/032-003474562",
  },
  {
    date: "1499",
    shelfmark: "Add MS 7174",
    title: "Gospel Lectionary",
    place: "Church of the East",
    description:
      "A liturgical Gospel book noted for intricate geometric illumination—evidence that the East Syriac page could be both disciplined and richly adorned.",
    url: "https://searcharchives.bl.uk/catalog/032-003474582",
  },
];

export default function ManuscriptsPage() {
  return (
    <PageTransition name="manuscripts-page">
      <main className="collection-page">
        <a className="skip-link" href="#manuscript-list">
          Skip to manuscripts
        </a>
        <SiteHeader active="manuscripts" />
        <header className="collection-hero collection-hero--split">
          <div>
            <p className="eyebrow">Written by hand</p>
            <h1>Manuscripts.</h1>
          </div>
          <p>
            This room begins with catalogued witnesses. It names shelfmarks,
            dates, and limits openly, so that beauty never comes at the cost of
            historical clarity.
          </p>
        </header>
        <section className="record-list" id="manuscript-list">
          {manuscripts.map((manuscript, index) => (
            <article className="record-row" key={manuscript.shelfmark}>
              <span className="record-row__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="record-row__date">
                <strong>{manuscript.date}</strong>
                <small>{manuscript.shelfmark}</small>
              </div>
              <div className="record-row__copy">
                <p>{manuscript.place}</p>
                <h2>{manuscript.title}</h2>
                <p>{manuscript.description}</p>
              </div>
              <a href={manuscript.url} target="_blank" rel="noreferrer">
                Catalogue record
                <Arrow />
              </a>
            </article>
          ))}
        </section>
        <aside className="source-note">
          <span aria-hidden="true">✦</span>
          <div>
            <p className="eyebrow">A note on access</p>
            <h2>Catalogued does not always mean digitised.</h2>
            <p>
              Where a holding library does not publish manuscript images, this
              project links the authoritative record instead of inventing a
              visual substitute.
            </p>
          </div>
        </aside>
        <SiteFooter />
      </main>
    </PageTransition>
  );
}
