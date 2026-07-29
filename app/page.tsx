import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "./components/page-transition";
import { SaintCard } from "./components/saint-card";
import { Arrow, CrossMark, SiteFooter, SiteHeader } from "./components/site-chrome";
import { saints } from "./data/saints";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

export default function Home() {
  const featuredSaints = [
    saints.find((saint) => saint.slug === "mar-addai"),
    saints.find((saint) => saint.slug === "mar-narsai"),
    saints.find((saint) => saint.slug === "mar-isaac-of-nineveh"),
  ].filter((saint): saint is (typeof saints)[number] => Boolean(saint));

  return (
    <PageTransition name="home-page">
      <main>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader active="home" />

        <section className="hero" id="main-content">
          <div className="map-lines" aria-hidden="true">
            <span className="map-lines__route route-one" />
            <span className="map-lines__route route-two" />
            <span className="map-lines__dot dot-one" />
            <span className="map-lines__dot dot-two" />
            <span className="map-lines__dot dot-three" />
          </div>

          <div className="hero__copy">
            <p className="eyebrow">
              <span>A new illustrated archive</span>
            </p>
            <h1>
              Lives that carried
              <br />
              the light <em>eastward.</em>
            </h1>
            <p className="hero__intro">
              Meet the principal saints, teachers, martyrs, and missionaries
              of the Church of the East through concise, carefully sourced
              lives.
            </p>
            <div className="hero__actions">
              <Link
                className="button button--primary"
                href="/saints"
              >
                Explore their lives
                <Arrow />
              </Link>
              <Link
                className="text-link"
                href="/paradise-of-the-fathers"
              >
                Why “Paradise”?
              </Link>
            </div>
            <div className="hero__note">
              <span className="hero__note-line" />
              <p>
                An old and beloved name,
                <br />
                carried into a new work of remembrance.
              </p>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-frame hero__image-frame--historical">
              <Image
                src={assetPath("/images/addai-mari-icon.jpg")}
                alt="Devotional icon of Saints Addai and Mari beneath Christ"
                fill
                priority
                sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1050px) 44vw, 590px"
              />
              <span className="image-index">DOCUMENTED DEVOTIONAL IMAGE · CC0</span>
            </div>
            <div className="featured-card">
              <span className="featured-card__ornament">✦</span>
              <span className="featured-card__rule" />
              <span>
                <small>Apostles of the East</small>
                <strong>Mar Addai &amp; Mar Mari</strong>
                <span>Mission · Memory · Liturgy</span>
              </span>
            </div>
          </div>
        </section>

        <section className="pathways" aria-label="Explore the collection">
          <Link href="/saints" className="pathway">
            <span className="pathway__number" aria-hidden="true">01</span>
            <span>
              <strong>Saints</strong>
              <small>Lives, places, and sources</small>
            </span>
            <Arrow />
          </Link>
          <Link href="/manuscripts" className="pathway">
            <span className="pathway__number" aria-hidden="true">02</span>
            <span>
              <strong>Manuscripts</strong>
              <small>Witnesses written by hand</small>
            </span>
            <Arrow />
          </Link>
          <Link href="/books" className="pathway">
            <span className="pathway__number" aria-hidden="true">03</span>
            <span>
              <strong>Books</strong>
              <small>Texts behind the archive</small>
            </span>
            <Arrow />
          </Link>
        </section>

        <section className="archive-section featured-section">
          <div className="section-heading">
            <p className="eyebrow">Featured lives</p>
            <div className="section-heading__row">
              <h2>A constellation of lives.</h2>
              <p>
                Begin with three voices: an apostolic missionary, a poet of
                sacred learning, and a master of mercy and stillness.
              </p>
            </div>
          </div>
          <div className="saint-grid saint-grid--featured">
            {featuredSaints.map((saint) => (
              <SaintCard
                saint={saint}
                index={saints.indexOf(saint)}
                key={saint.slug}
              />
            ))}
          </div>
          <div className="section-action">
            <Link className="text-link" href="/saints">
              View all saint profiles <Arrow />
            </Link>
          </div>
        </section>

        <section className="home-feature-band">
          <div className="home-feature-band__intro">
            <p className="eyebrow">Featured manuscripts</p>
            <h2>Faith preserved in ink, parchment, and memory.</h2>
            <p>
              Three catalogued witnesses introduce the East Syriac scribal
              world without pretending that every manuscript is available
              online.
            </p>
            <Link href="/manuscripts" className="text-link">
              Enter the manuscript room <Arrow />
            </Link>
          </div>
          <div className="home-records">
            <article>
              <span>1203</span>
              <h3>Church of the East Psalter</h3>
              <p>Eastern Syriac vocalization and line illustrations.</p>
              <small>British Library · Add MS 7154</small>
            </article>
            <article>
              <span>1499</span>
              <h3>Gospel Lectionary</h3>
              <p>Geometric illumination within an East Syriac book.</p>
              <small>British Library · Add MS 7174</small>
            </article>
          </div>
        </section>

        <section className="book-section book-section--home">
          <div className="book-object" aria-hidden="true">
            <div className="book-object__cover">
              <span className="book-object__syriac" lang="syr" dir="rtl">
                ܦܪܕܝܣܐ
                <br />
                ܕܐܒܗ̈ܬܐ
              </span>
              <CrossMark />
              <span className="book-object__edition">A NEW ILLUSTRATED ARCHIVE · I</span>
            </div>
            <div className="book-object__pages" />
          </div>
          <div className="book-copy">
            <p className="eyebrow">The name behind the project</p>
            <h2>
              An old name.
              <br />
              A new collection.
            </h2>
            <p className="book-copy__lead">
              <em>The Paradise of the Fathers</em> is the familiar English
              name of a classic Syriac collection. This website is a new,
              independent illustrated series about saints of the Church of the
              East.
            </p>
            <p>
              It respectfully borrows the name; it does not claim to be a new
              edition or translation of the ancient book.
            </p>
            <Link className="button button--primary" href="/paradise-of-the-fathers">
              Read the full story
              <Arrow />
            </Link>
          </div>
        </section>

        <section className="closing-section">
          <span className="closing-section__star">✦</span>
          <p>One life at a time</p>
          <h2>The past becomes a mirror.</h2>
          <p className="closing-section__copy">
            Begin with a single saint. Stay long enough to notice what their
            life asks of yours.
          </p>
          <Link className="button button--light" href="/saints">
            Choose a life
            <Arrow />
          </Link>
        </section>

        <SiteFooter />
      </main>
    </PageTransition>
  );
}
