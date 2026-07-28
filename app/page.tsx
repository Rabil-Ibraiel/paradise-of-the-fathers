"use client";

import Image from "next/image";
import { useState } from "react";

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const CrossMark = () => (
  <span className="cross-mark" aria-hidden="true">
    <span className="cross-mark__ring" />
    <span className="cross-mark__stem" />
    <span className="cross-mark__arms" />
  </span>
);

type Saint = {
  name: string;
  title: string;
  era: string;
  place: string;
  category: "Missionaries" | "Teachers" | "Monastics" | "Martyrs";
  summary: string;
  image?: string;
  tone: "green" | "red" | "blue" | "gold";
};

const saints: Saint[] = [
  {
    name: "Mar Addai",
    title: "The apostle of Edessa",
    era: "1st century",
    place: "Edessa",
    category: "Missionaries",
    summary:
      "An apostolic missionary at the heart of the early Syriac Christian memory and the tradition of Edessa.",
    image: "/images/mar-addai.webp",
    tone: "red",
  },
  {
    name: "Mar Mari",
    title: "The road into Mesopotamia",
    era: "1st century",
    place: "Mesopotamia",
    category: "Missionaries",
    summary:
      "Remembered with Addai in the apostolic and liturgical life of the Church, carrying the Gospel farther east.",
    tone: "gold",
  },
  {
    name: "Mar Narsai",
    title: "Poet and teacher",
    era: "c. 399–502",
    place: "Edessa · Nisibis",
    category: "Teachers",
    summary:
      "A formative poet-theologian and teacher associated with the celebrated schools of Edessa and Nisibis.",
    image: "/images/mar-narsai-hero.webp",
    tone: "blue",
  },
  {
    name: "Mar Babai the Great",
    title: "Abbot and theologian",
    era: "c. 551–628",
    place: "Mount Izla",
    category: "Teachers",
    summary:
      "A monastic reformer and theologian whose work helped shape the Church’s language of faith.",
    tone: "green",
  },
  {
    name: "Mar Isaac of Nineveh",
    title: "Writer of the inner life",
    era: "7th century",
    place: "Beth Qatraye · Nineveh",
    category: "Monastics",
    summary:
      "A bishop and spiritual writer whose teaching on mercy, prayer, and stillness crossed every ecclesial border.",
    image: "/images/mar-isaac.webp",
    tone: "green",
  },
  {
    name: "Mar Qardagh",
    title: "The witness of Adiabene",
    era: "Late Antiquity",
    place: "Adiabene",
    category: "Martyrs",
    summary:
      "A martyr remembered through a powerful East Syriac narrative of conversion, courage, and costly witness.",
    tone: "red",
  },
];

const filters = ["All", "Missionaries", "Teachers", "Monastics", "Martyrs"] as const;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const assetPath = (path: string) => `${basePath}${path}`;

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const visibleSaints =
    activeFilter === "All"
      ? saints
      : saints.filter((saint) => saint.category === activeFilter);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="The Paradise of the Fathers, home">
          <CrossMark />
          <span className="brand__text">
            <span className="brand__name">The Paradise of the Fathers</span>
            <span className="brand__syriac" lang="syr" dir="rtl">
              ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ
            </span>
          </span>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          <a className="is-active" href="#top">Home</a>
          <a href="#stories">Saints</a>
          <a href="#journey">Journey</a>
          <a href="#about">The Book</a>
        </nav>

        <a className="header-link" href="#stories">
          Browse the archive
          <Arrow />
        </a>
      </header>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#top">Home</a>
        <a href="#stories">Saints</a>
        <a href="#journey">Journey</a>
        <a href="#about">The Book</a>
      </nav>

      <section className="hero" id="top">
        <div className="map-lines" aria-hidden="true">
          <span className="map-lines__route route-one" />
          <span className="map-lines__route route-two" />
          <span className="map-lines__dot dot-one" />
          <span className="map-lines__dot dot-two" />
          <span className="map-lines__dot dot-three" />
        </div>

        <div className="hero__copy">
          <p className="eyebrow">
            <span>Lives of the Church of the East</span>
          </p>
          <h1>
            Lives that carried
            <br />
            the light <em>eastward.</em>
          </h1>
          <p className="hero__intro">
            Discover the saints, martyrs, teachers, and missionaries whose
            faith crossed deserts, kingdoms, languages, and generations.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#stories">
              Explore their lives
              <Arrow />
            </a>
            <a className="text-link" href="#about">
              Why “Paradise”?
            </a>
          </div>
          <div className="hero__note">
            <span className="hero__note-line" />
            <p>
              A living archive of holiness,
              <br />
              memory, and the Syriac Christian East.
            </p>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-frame">
            <Image
              src={assetPath("/images/mar-narsai-hero.webp")}
              alt="Manuscript-inspired illustration of Mar Narsai holding a book"
              fill
              priority
              sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1050px) 44vw, 590px"
            />
            <span className="image-index">POTF · 001</span>
          </div>
          <div className="featured-card">
            <span className="featured-card__ornament">✦</span>
            <span className="featured-card__rule" />
            <span>
              <small>Featured father</small>
              <strong>Mar Narsai</strong>
              <span>Poet · Teacher · Theologian</span>
            </span>
          </div>
        </div>
      </section>

      <section className="pathways" aria-label="Ways to explore">
        <a href="#stories" className="pathway">
          <span className="pathway__number" aria-hidden="true">✦</span>
          <span>
            <strong>Martyrs</strong>
            <small>Witness under trial</small>
          </span>
          <Arrow />
        </a>
        <a href="#stories" className="pathway">
          <span className="pathway__number" aria-hidden="true">✦</span>
          <span>
            <strong>Teachers</strong>
            <small>Wisdom across centuries</small>
          </span>
          <Arrow />
        </a>
        <a href="#stories" className="pathway">
          <span className="pathway__number" aria-hidden="true">✦</span>
          <span>
            <strong>Missionaries</strong>
            <small>The faith moving east</small>
          </span>
          <Arrow />
        </a>
      </section>

      <section className="archive-section" id="stories">
        <div className="section-heading">
          <p className="eyebrow">Enter the archive</p>
          <div className="section-heading__row">
            <h2>A constellation of lives.</h2>
            <p>
              Not distant figures under glass, but people who prayed, taught,
              traveled, suffered, and gave the Church a living memory.
            </p>
          </div>
        </div>

        <div className="filters" aria-label="Filter saints by vocation">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "is-active" : ""}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="saint-grid" aria-live="polite">
          {visibleSaints.map((saint, index) => (
            <article className={`saint-card tone-${saint.tone}`} key={saint.name}>
              {saint.image ? (
                <div className="saint-card__image">
                  <Image
                    src={assetPath(saint.image)}
                    alt=""
                    fill
                    sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1050px) 46vw, 430px"
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
              ) : (
                <div className="saint-card__field" aria-hidden="true">
                  <span className="saint-card__monogram">
                    {saint.name
                      .replace("Mar ", "")
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="saint-card__star">✦</span>
                  <span className="saint-card__orbit" />
                </div>
              )}
              <div className="saint-card__body">
                <div className="saint-card__meta">
                  <span>{saint.category}</span>
                  <span>{saint.era}</span>
                </div>
                <h3>{saint.name}</h3>
                <p className="saint-card__title">{saint.title}</p>
                <p className="saint-card__summary">{saint.summary}</p>
                <div className="saint-card__footer">
                  <span>{saint.place}</span>
                  <span>{saint.category}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-intro">
          <p className="eyebrow">A faith on the move</p>
          <h2>
            From a room in Edessa
            <br />
            to the roads of the East.
          </h2>
          <p>
            These lives belong to places. Follow the schools, cities, and
            monasteries that formed a tradition stretching far beyond its
            birthplace.
          </p>
        </div>

        <div className="journey-map">
          <div className="journey-map__route" aria-hidden="true" />
          <article className="journey-stop stop-1">
            <span>01</span>
            <small>Edessa</small>
            <strong>Apostolic memory</strong>
          </article>
          <article className="journey-stop stop-2">
            <span>02</span>
            <small>Seleucia-Ctesiphon</small>
            <strong>A Church takes root</strong>
          </article>
          <article className="journey-stop stop-3">
            <span>03</span>
            <small>Nisibis</small>
            <strong>A school of teachers</strong>
          </article>
          <article className="journey-stop stop-4">
            <span>04</span>
            <small>Nineveh · Beth Abhe</small>
            <strong>The monastic heart</strong>
          </article>
          <div className="journey-map__east">
            <span>and farther east</span>
            <Arrow />
          </div>
        </div>
      </section>

      <section className="book-section" id="about">
        <div className="book-object" aria-hidden="true">
          <div className="book-object__cover">
            <span className="book-object__syriac" lang="syr" dir="rtl">
              ܦܪܕܝܣܐ
              <br />
              ܕܐܒܗ̈ܬܐ
            </span>
            <CrossMark />
            <span className="book-object__edition">A LIVING ARCHIVE · I</span>
          </div>
          <div className="book-object__pages" />
        </div>

        <div className="book-copy">
          <p className="eyebrow">The name behind the archive</p>
          <h2>
            Not an address.
            <br />
            A garden of memory.
          </h2>
          <p className="book-copy__lead">
            <em>The Paradise of the Fathers</em> is the established English
            title of <span lang="syr" dir="rtl">ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ</span>, a
            classic Syriac collection of the lives and wisdom of the early
            monastic fathers.
          </p>
          <p>
            We borrow its name with care. This archive gathers the saints of
            the Church of the East as one enters a garden—slowly, attentively,
            and ready to be changed by every life encountered.
          </p>
          <p className="book-copy__note">
            This is an independent educational project, not an official
            publication of a Church jurisdiction. Historical summaries should
            be reviewed by a qualified Church or Syriac-studies authority as
            the archive grows.
          </p>
          <div className="source-links">
            <a
              href="https://gedsh.bethmardutho.org/Paradise-of-the-Fathers-Book-of"
              target="_blank"
              rel="noreferrer"
            >
              About the Syriac book <span>↗</span>
            </a>
            <a
              href="https://syriaca.org/work/403"
              target="_blank"
              rel="noreferrer"
            >
              Syriaca.org record <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <span className="closing-section__star">✦</span>
        <p>One life at a time</p>
        <h2>The past becomes a mirror.</h2>
        <p className="closing-section__copy">
          Begin with a single saint. Stay long enough to notice what their life
          asks of yours.
        </p>
        <a className="button button--light" href="#stories">
          Choose a life
          <Arrow />
        </a>
      </section>

      <footer>
        <a className="brand brand--footer" href="#top">
          <CrossMark />
          <span className="brand__text">
            <span className="brand__name">The Paradise of the Fathers</span>
            <span className="brand__syriac" lang="syr" dir="rtl">
              ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ
            </span>
          </span>
        </a>
        <p>
          A living archive dedicated to the saints and spiritual heritage of
          the Church of the East.
        </p>
        <div className="footer-links">
          <a href="#stories">Saints</a>
          <a href="#journey">Journey</a>
          <a href="#about">The Book</a>
        </div>
        <span className="footer-note">
          An independent educational archive · Made for remembrance · 2026
        </span>
      </footer>
    </main>
  );
}
