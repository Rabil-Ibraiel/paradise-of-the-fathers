import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageTransition } from "../../components/page-transition";
import {
  Arrow,
  SiteFooter,
  SiteHeader,
} from "../../components/site-chrome";
import { findSaintBiography } from "../../data/saint-biographies";
import { findSaint, saints } from "../../data/saints";

export const dynamicParams = false;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;
const pagePath = (path: string) => `${basePath}${path}/`;

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
  const lifeChapters = findSaintBiography(slug);
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
      <SiteHeader active="saints" />

      <article id="profile-content">
        <header className="profile-hero">
          <div className="profile-hero__copy">
            <a
              className="profile-back-link"
              href={pagePath("/saints")}
            >
              <Arrow direction="left" />
              Back to the archive
            </a>
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

          <div className="profile-portrait">
            {saint.image ? (
              <Image
                src={assetPath(saint.image)}
                alt={saint.imageAlt ?? ""}
                fill
                priority
                sizes="(max-width: 820px) calc(100vw - 44px), 42vw"
                style={{ objectPosition: saint.imagePosition }}
              />
            ) : (
              <div className="profile-portrait__monogram" aria-hidden="true">
                <span>{initials}</span>
                <small lang="syr" dir="rtl">
                  {saint.syriacName}
                </small>
              </div>
            )}
            {saint.imageCaption ? (
              saint.imageSourceUrl ? (
                <a
                  className="profile-portrait__caption"
                  href={saint.imageSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {saint.imageCaption} ↗
                </a>
              ) : (
                <span className="profile-portrait__caption">
                  {saint.imageCaption}
                </span>
              )
            ) : (
              <span className="profile-portrait__caption">
                Symbolic monogram · no verified historical likeness used
              </span>
            )}
          </div>
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

        {lifeChapters.length > 0 ? (
          <section
            className="profile-full-life"
            aria-labelledby="full-life-heading"
          >
            <header>
              <div>
                <p className="profile-section-label">A fuller life</p>
                <h2 id="full-life-heading">The person, the memory, the legacy.</h2>
              </div>
              <p>
                These chapters bring the historical record and the received
                tradition into a longer narrative. Where the surviving evidence
                is hagiographical or uncertain, the language says so directly.
              </p>
            </header>
            <div className="profile-life-chapters">
              {lifeChapters.map((chapter, chapterIndex) => (
                <article key={chapter.title}>
                  <span aria-hidden="true">
                    {String(chapterIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{chapter.title}</h3>
                    {chapter.paragraphs.map((paragraph) => (
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
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

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
          <a
            href={pagePath(`/saints/${previousSaint.slug}`)}
          >
            <span>
              <Arrow direction="left" />
              Previous life
            </span>
            <strong>{previousSaint.name}</strong>
          </a>
          <a
            href={pagePath(`/saints/${nextSaint.slug}`)}
          >
            <span>
              Next life
              <Arrow />
            </span>
            <strong>{nextSaint.name}</strong>
          </a>
        </nav>
      </article>

      <SiteFooter />
    </main>
    </PageTransition>
  );
}
