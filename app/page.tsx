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

export default function Home() {
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
            <img
              src="/images/mar-narsai-hero.webp"
              alt="Manuscript-inspired illustration of Mar Narsai holding a book"
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
          <span className="pathway__number">01</span>
          <span>
            <strong>Martyrs</strong>
            <small>Witness under trial</small>
          </span>
          <Arrow />
        </a>
        <a href="#stories" className="pathway">
          <span className="pathway__number">02</span>
          <span>
            <strong>Teachers</strong>
            <small>Wisdom across centuries</small>
          </span>
          <Arrow />
        </a>
        <a href="#stories" className="pathway">
          <span className="pathway__number">03</span>
          <span>
            <strong>Missionaries</strong>
            <small>The faith moving east</small>
          </span>
          <Arrow />
        </a>
      </section>
    </main>
  );
}
