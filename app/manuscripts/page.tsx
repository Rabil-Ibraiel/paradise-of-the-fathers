import type { Metadata } from "next";
import { ManuscriptCatalog } from "../components/manuscript-catalog";
import { PageTransition } from "../components/page-transition";
import { Arrow, SiteFooter, SiteHeader } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Manuscripts | The Paradise of the Fathers",
  description:
    "Search 11,590 Syriac manuscript records and explore a carefully explained selection of East Syriac witnesses.",
};

const manuscripts = [
  {
    slug: "add-ms-12138",
    date: "899",
    shelfmark: "Add MS 12138",
    title: "Peshitta readings",
    place: "Written at Harran",
    description:
      "A Syriac biblical manuscript whose catalog record notes East Syriac diacritical dots—a modest but valuable witness to the scribal tradition.",
    url: "https://searcharchives.bl.uk/catalog/032-003470083",
  },
  {
    slug: "add-ms-7154",
    date: "1203",
    shelfmark: "Add MS 7154",
    title: "Church of the East Psalter",
    place: "East Syriac tradition",
    description:
      "A Psalter with Eastern Syriac vocalization and line illustrations, preserving the visual discipline of an East Syriac sacred book.",
    url: "https://searcharchives.bl.uk/catalog/032-003474562",
  },
  {
    slug: "add-ms-7174",
    date: "1499",
    shelfmark: "Add MS 7174",
    title: "Gospel Lectionary",
    place: "Church of the East",
    description:
      "A liturgical Gospel book noted for intricate geometric illumination—evidence that the East Syriac page could be both disciplined and richly adorned.",
    url: "https://searcharchives.bl.uk/catalog/032-003474582",
  },
];

const manuscriptGenres = [
  {
    name: "Bible & Apocrypha",
    syriac: "ܟܬܒܐ ܩܕܝܫܐ",
    description: "Biblical books, lectionaries, commentaries, and related texts.",
  },
  {
    name: "Liturgy",
    syriac: "ܬܫܡܫܬܐ",
    description: "Ḥudrā, anaphoras, prayers, canons, and offices for feasts.",
  },
  {
    name: "Saints’ Lives",
    syriac: "ܬܫܥܝܬܐ ܕܩܕܝܫ̈ܐ",
    description: "Lives, martyr narratives, and monastic memory.",
  },
  {
    name: "Homilies",
    syriac: "ܡܐܡܪ̈ܐ",
    description: "Verse and prose teaching for study, worship, and formation.",
  },
  {
    name: "Lexica & Glossaries",
    syriac: "ܠܟܣܝܩܘܢ",
    description: "Tools for language, interpretation, and learned reading.",
  },
];

const digitizedWitnesses = [
  {
    date: "c. 700",
    shelfmark: "Harvard MS Syr 93",
    title: "A fragment of the Doctrine of Addai",
    collection: "Harvard University Library",
    description:
      "A composite Syriac manuscript preserving a fragment of the Doctrine of Addai alongside apocalypses, canons, and other short works.",
    url: "https://syri.ac/harvard-ms-syr-93",
  },
  {
    date: "1830",
    shelfmark: "CCM 00136",
    title: "Ḥudrā and the Anaphora of Addai and Mari",
    collection: "Chaldean Cathedral, Mardin",
    description:
      "A liturgical manuscript containing prayers, the Ḥudrā, anaphoras, feast-day canons, and a Kaškūl.",
    url: "https://syri.ac/mardin-turkey-chaldean-cathedral-ccm-00136",
  },
  {
    date: "1881",
    shelfmark: "ACK 00078",
    title: "Twenty-nine liturgical homilies of Narsai",
    collection: "Chaldean Archdiocese of Kirkuk",
    description:
      "A Syriac witness to twenty-nine homilies attributed to Narsai and appointed for reading in the liturgy.",
    url: "https://syri.ac/kirkuk-iraq-chaldean-archdiocese-kirkuk-78-ack-00078",
  },
  {
    date: "Undated",
    shelfmark: "ACK 00045",
    title: "Isaac and the Rogation of the Ninevites",
    collection: "Chaldean Archdiocese of Kirkuk",
    description:
      "A manuscript record for homilies of Isaac of Nineveh associated with the Rogation of the Ninevites.",
    url: "https://syri.ac/kirkuk-iraq-chaldean-archdiocese-kirkuk-45-ack-00045",
  },
];

const researchGateways = [
  {
    title: "Search digitised manuscripts",
    description:
      "Search freely available Syriac and Garshuni witnesses by shelfmark, language, date, author, genre, and contents.",
    url: "https://syri.ac/digimss/faceted",
  },
  {
    title: "Find manuscript catalogues",
    description:
      "Move from a known author or library to historic catalogues from London, Rome, Birmingham, Paris, Sinai, and beyond.",
    url: "https://syri.ac/manuscripts",
  },
  {
    title: "Learn the manuscript world",
    description:
      "Begin with bibliography on dated and illuminated manuscripts, script, cataloguing, and the work of the scribe.",
    url: "https://syri.ac/brock/manuscripts",
  },
];

const scribalTerms = [
  { syriac: "ܕܦܐ", transliteration: "dappā", meaning: "page" },
  { syriac: "ܟܘܪܣܐ", transliteration: "kurrāsā", meaning: "quire or gathering" },
  { syriac: "ܢܘܟܣܐ", transliteration: "nuskā", meaning: "manuscript" },
  { syriac: "ܦܬܚܐ", transliteration: "ptāḥā", meaning: "opening" },
  {
    syriac: "ܨܚܚܐ",
    transliteration: "ṣḥāḥā",
    meaning: "manuscript or textual division",
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

        <section className="catalog-section" aria-label="Search Syriac manuscripts">
          <ManuscriptCatalog />
        </section>

        <section className="genre-section" aria-labelledby="genres-heading">
          <div className="genre-section__heading">
            <p>Ways into a manuscript collection</p>
            <h2 id="genres-heading">Explore by what a book carries.</h2>
            <a
              href="https://syri.ac/digimss/faceted"
              target="_blank"
              rel="noreferrer"
            >
              Open Syri.ac’s faceted search
              <Arrow />
            </a>
          </div>
          <ul className="genre-index">
            {manuscriptGenres.map((genre) => (
              <li key={genre.name}>
                <span lang="syr" dir="rtl">{genre.syriac}</span>
                <div>
                  <h3>{genre.name}</h3>
                  <p>{genre.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="collection-subheading">
          <p className="eyebrow">Three early witnesses</p>
          <h2>Catalogued manuscripts.</h2>
          <p>
            These records remain anchored in the catalogues of their holding
            libraries.
          </p>
        </div>

        <section className="record-list" id="manuscript-list">
          {manuscripts.map((manuscript, index) => (
            <article
              className="record-row"
              id={`manuscript-${manuscript.slug}`}
              key={manuscript.shelfmark}
            >
              <span className="record-row__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="record-row__date">
                <strong>{manuscript.date}</strong>
                <small>{manuscript.shelfmark}</small>
              </div>
              <div className="record-row__copy">
                <p>{manuscript.place}</p>
                <h2 lang="en" dir="ltr" data-no-translate>
                  {manuscript.title}
                </h2>
                <p>{manuscript.description}</p>
              </div>
              <a href={manuscript.url} target="_blank" rel="noreferrer">
                Catalogue record
                <Arrow />
              </a>
            </article>
          ))}
        </section>

        <section className="digitized-section" aria-labelledby="digitized-heading">
          <div className="digitized-section__heading">
            <div>
              <p className="eyebrow">Open a witness</p>
              <h2 id="digitized-heading">Manuscripts connected to these lives.</h2>
            </div>
            <p>
              Syri.ac brings dispersed catalogue data into one searchable
              gateway. These four records are especially close to the saints
              and liturgical memory gathered in this archive.
            </p>
          </div>
          <div className="digitized-list">
            {digitizedWitnesses.map((manuscript) => (
              <a
                className="digitized-row"
                href={manuscript.url}
                key={manuscript.shelfmark}
                target="_blank"
                rel="noreferrer"
              >
                <span>{manuscript.date}</span>
                <div>
                  <small>{manuscript.shelfmark} · {manuscript.collection}</small>
                  <h3 lang="en" dir="ltr" data-no-translate>
                    {manuscript.title}
                  </h3>
                  <p>{manuscript.description}</p>
                </div>
                <span className="digitized-row__action">
                  View record
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="research-gateways" aria-labelledby="gateway-heading">
          <div className="research-gateways__heading">
            <p className="eyebrow">Continue your research</p>
            <h2 id="gateway-heading">Three doors into Syri.ac.</h2>
            <p>
              Syri.ac is an annotated bibliography of open-access resources
              hosted by the University of Oklahoma. We point into it rather
              than reproduce its database.
            </p>
          </div>
          <div className="research-gateways__list">
            {researchGateways.map((gateway, index) => (
              <a
                href={gateway.url}
                key={gateway.title}
                target="_blank"
                rel="noreferrer"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{gateway.title}</h3>
                  <p>{gateway.description}</p>
                </div>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        <section className="scribal-terms" aria-labelledby="terms-heading">
          <div>
            <p className="eyebrow">Words of the scribe</p>
            <h2 id="terms-heading">Five small words for entering the page.</h2>
          </div>
          <dl>
            {scribalTerms.map((term) => (
              <div key={term.syriac}>
                <dt lang="syr" dir="rtl">{term.syriac}</dt>
                <dd>
                  <strong>{term.transliteration}</strong>
                  <span>{term.meaning}</span>
                </dd>
              </div>
            ))}
          </dl>
          <a
            href="https://syri.ac/brock/manuscripts"
            target="_blank"
            rel="noreferrer"
          >
            Terminology source: Syri.ac
            <Arrow />
          </a>
        </section>

        <SiteFooter />
      </main>
    </PageTransition>
  );
}
