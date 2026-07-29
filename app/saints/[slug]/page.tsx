import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageTransition } from "../../components/page-transition";
import { findSaint, saints } from "../../data/saints";

export const dynamicParams = false;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

const Arrow = ({ direction = "right" }: { direction?: "left" | "right" }) => (
  <svg
    aria-hidden="true"
    className={direction === "left" ? "is-reversed" : undefined}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M5 12h13M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const CrossMark = () => (
  <span className="cross-mark" aria-hidden="true">
    <span className="cross-mark__ring" />
    <span className="cross-mark__stem" />
    <span className="cross-mark__arms" />
  </span>
);

export function generateStaticParams() {
  return saints.map((saint) => ({ slug: saint.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const saint = findSaint(slug);

  if (!saint) {
    return {};
  }

  return {
    title: `${saint.name} | The Paradise of the Fathers`,
    description: saint.summary,
    openGraph: {
      title: `${saint.name} — ${saint.title}`,
      description: saint.summary,
      type: "article",
    },
  };
}

export default async function SaintProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const saint = findSaint(slug);

  if (!saint) {
    notFound();
  }

  const currentIndex = saints.findIndex((item) => item.slug === saint.slug);
  const previousSaint = saints[(currentIndex - 1 + saints.length) % saints.length];
  const nextSaint = saints[(currentIndex + 1) % saints.length];
  const initials = saint.name
    .replace("Mar ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <PageTransition name="saint-profile-page" transitionKey={slug}>
    <main className={`profile-page tone-${saint.tone}`}>
      <a className="skip-link" href="#profile-content">
        Skip to profile
      </a>
      <header className="site-header profile-header persistent-header">
        <Link
          className="brand"
          href="/"
          aria-label="The Paradise of the Fathers, home"
          transitionTypes={["nav-back"]}
        >
          <CrossMark />
          <span className="brand__text">
            <span className="brand__name">The Paradise of the Fathers</span>
            <span className="brand__syriac" lang="syr" dir="rtl">
              ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ
            </span>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="Primary navigation">
          <Link href="/" transitionTypes={["nav-back"]}>Home</Link>
          <Link
            className="is-active"
            href="/#stories"
            transitionTypes={["nav-back"]}
          >
            Saints
          </Link>
          <Link href="/#journey" transitionTypes={["nav-back"]}>Journey</Link>
          <Link href="/#about" transitionTypes={["nav-back"]}>The Book</Link>
        </nav>

        <Link
          className="header-link"
          href="/#stories"
          transitionTypes={["nav-back"]}
        >
          All saints
          <Arrow />
        </Link>
      </header>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <Link href="/" transitionTypes={["nav-back"]}>Home</Link>
        <Link href="/#stories" transitionTypes={["nav-back"]}>Saints</Link>
        <Link href="/#journey" transitionTypes={["nav-back"]}>Journey</Link>
        <Link href="/#about" transitionTypes={["nav-back"]}>The Book</Link>
      </nav>

      <article id="profile-content">
        <header className="profile-hero">
          <div className="profile-hero__copy">
            <Link
              className="profile-back-link"
              href="/#stories"
              transitionTypes={["nav-back"]}
            >
              <Arrow direction="left" />
              Back to the archive
            </Link>
            <p className="profile-kicker">
              {saint.category} <span aria-hidden="true">·</span> {saint.era}
            </p>
            <h1>{saint.name}</h1>
            <p className="profile-syriac" lang="syr" dir="rtl">
              {saint.syriacName}
            </p>
            <p className="profile-title">{saint.title}</p>
            <p className="profile-lead">{saint.devotionalIntroduction}</p>

            <dl className="profile-facts">
              <div>
                <dt>Remembered in</dt>
                <dd>{saint.place}</dd>
              </div>
              <div>
                <dt>Vocation</dt>
                <dd>{saint.category}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{saint.era}</dd>
              </div>
            </dl>
          </div>

          <ViewTransition
            name={`saint-${saint.slug}-portrait`}
            share="morph"
            default="none"
          >
          <div className="profile-portrait">
            {saint.image ? (
              <Image
                src={assetPath(saint.image)}
                alt={`Editorial interpretation of ${saint.name}`}
                fill
                priority
                sizes="(max-width: 820px) calc(100vw - 44px), 42vw"
              />
            ) : (
              <div className="profile-portrait__monogram" aria-hidden="true">
                <span>{initials}</span>
                <small lang="syr" dir="rtl">
                  {saint.syriacName}
                </small>
              </div>
            )}
            <span className="profile-portrait__caption">
              Editorial interpretation · not a verified likeness
            </span>
          </div>
          </ViewTransition>
        </header>

        <div className="profile-reading">
          <section className="profile-narrative" aria-labelledby="life-heading">
            <p className="profile-section-label">Life &amp; memory</p>
            <h2 id="life-heading">The life remembered.</h2>
            {saint.historicalContext.map((paragraph) => (
              <p key={paragraph.text}>
                {paragraph.text}
                <sup className="profile-citations">
                  {paragraph.sourceIndexes.map((sourceIndex) => (
                    <a
                      href={`#source-${sourceIndex + 1}`}
                      key={sourceIndex}
                      aria-label={`Source ${sourceIndex + 1}: ${saint.sources[sourceIndex].label}`}
                    >
                      {sourceIndex + 1}
                    </a>
                  ))}
                </sup>
              </p>
            ))}
          </section>

          <aside className="profile-reflection" aria-labelledby="reflection-heading">
            <span className="profile-reflection__star" aria-hidden="true">
              ✦
            </span>
            <p id="reflection-heading">For reflection</p>
            <h2>{saint.reflection}</h2>
            <div className="profile-themes">
              <p>Threads in this life</p>
              <ul>
                {saint.themes.map((theme) => (
                  <li key={theme}>{theme}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="profile-sources" aria-labelledby="sources-heading">
          <div>
            <p className="profile-section-label">Study further</p>
            <h2 id="sources-heading">Sources &amp; further reading.</h2>
            <p>
              These records provide historical orientation and bibliography.
              Hagiographical tradition and documented chronology are identified
              separately throughout this profile.
            </p>
          </div>
          <ul>
            {saint.sources.map((source, sourceIndex) => (
              <li id={`source-${sourceIndex + 1}`} key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  <span className="profile-source-number" aria-hidden="true">
                    {sourceIndex + 1}
                  </span>
                  <span>
                    <strong>{source.label}</strong>
                    <small>{source.publisher}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <nav className="profile-pagination" aria-label="Browse saint profiles">
          <Link
            href={`/saints/${previousSaint.slug}`}
            transitionTypes={["nav-back"]}
          >
            <span>
              <Arrow direction="left" />
              Previous life
            </span>
            <strong>{previousSaint.name}</strong>
          </Link>
          <Link
            href={`/saints/${nextSaint.slug}`}
            transitionTypes={["nav-forward"]}
          >
            <span>
              Next life
              <Arrow />
            </span>
            <strong>{nextSaint.name}</strong>
          </Link>
        </nav>
      </article>

      <footer className="profile-footer">
        <Link
          className="brand brand--footer"
          href="/"
          transitionTypes={["nav-back"]}
        >
          <CrossMark />
          <span className="brand__text">
            <span className="brand__name">The Paradise of the Fathers</span>
            <span className="brand__syriac" lang="syr" dir="rtl">
              ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ
            </span>
          </span>
        </Link>
        <p>
          An independent educational archive of the saints and spiritual
          heritage of the Church of the East.
        </p>
        <Link
          className="footer-return"
          href="/#stories"
          transitionTypes={["nav-back"]}
        >
          Return to all saints
          <Arrow />
        </Link>
      </footer>
    </main>
    </PageTransition>
  );
}
