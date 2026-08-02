"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Saint } from "../data/saints";
import {
  findEditorialRecord,
  loadEditorialContent,
  mapEditorialSaint,
} from "../lib/editorial-client";
import { PageTransition } from "./page-transition";
import { Arrow, SiteFooter, SiteHeader } from "./site-chrome";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function Localized({ en, ar }: { en: string; ar?: string }) {
  return <span data-arabic-text={ar}>{en}</span>;
}

function CitationLinks({ saint, indexes }: { saint: Saint; indexes: number[] }) {
  return (
    <sup className="profile-citations">
      {indexes.filter((index) => saint.sources[index]).map((index) => (
        <a href={`#source-${index + 1}`} key={index} aria-label={`Source ${index + 1}`}>
          {index + 1}
        </a>
      ))}
    </sup>
  );
}

export function EditorialSaintProfile() {
  const slug = useSearchParams().get("slug") ?? "";
  const [saint, setSaint] = useState<Saint | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    void loadEditorialContent()
      .then((response) => {
        if (!active) return;
        const record = findEditorialRecord(response, "saint", slug);
        if (!record) {
          setFailed(true);
          return;
        }
        setSaint(mapEditorialSaint(record as Parameters<typeof mapEditorialSaint>[0]));
      })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [slug]);

  if (!saint && !failed) {
    return <div className="editorial-loading" role="status"><span />Opening the remembered life…</div>;
  }

  if (!saint) {
    return (
      <main className="profile-page">
        <SiteHeader active="saints" />
        <section className="editorial-missing">
          <p>Archive notice</p>
          <h1>This saint’s profile could not be opened.</h1>
          <a href={`${basePath}/saints/`}><Arrow direction="left" /> Return to the saints</a>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const initials = saint.name.replace("Mar ", "").split(" ").map((part) => part[0]).join("").slice(0, 2);

  return (
    <PageTransition name="saint-profile-page" transitionKey={saint.slug}>
      <main className={`profile-page tone-${saint.tone}`}>
        <a className="skip-link" href="#profile-content">Skip to profile</a>
        <SiteHeader active="saints" />
        <article id="profile-content">
          <header className="profile-hero">
            <div className="profile-hero__copy">
              <a className="profile-back-link" href={`${basePath}/saints/`}><Arrow direction="left" /> Back to the archive</a>
              <p className="profile-kicker">{saint.category} <span aria-hidden="true">·</span> <Localized en={saint.era} ar={saint.arabic?.era} /></p>
              <h1><Localized en={saint.name} ar={saint.arabic?.name} /></h1>
              <p className="profile-syriac" lang="syr" dir="rtl">{saint.syriacName}</p>
              <p className="profile-title"><Localized en={saint.title} ar={saint.arabic?.title} /></p>
              <p className="profile-lead"><Localized en={saint.devotionalIntroduction} ar={saint.arabic?.devotionalIntroduction} /></p>
              <dl className="profile-facts">
                <div><dt>Remembered in</dt><dd><Localized en={saint.place} ar={saint.arabic?.place} /></dd></div>
                <div><dt>Vocation</dt><dd>{saint.category}</dd></div>
                <div><dt>Period</dt><dd><Localized en={saint.era} ar={saint.arabic?.era} /></dd></div>
              </dl>
            </div>
            <div className="profile-portrait">
              {saint.image ? (
                <Image src={saint.image} alt={saint.imageAlt ?? ""} data-arabic-text={saint.arabic?.imageAlt} fill priority sizes="(max-width: 820px) calc(100vw - 44px), 42vw" style={{ objectPosition: saint.imagePosition }} />
              ) : (
                <div className="profile-portrait__monogram" aria-hidden="true"><span>{initials}</span><small lang="syr" dir="rtl">{saint.syriacName}</small></div>
              )}
              {saint.imageCaption ? (
                saint.imageSourceUrl ? <a className="profile-portrait__caption" href={saint.imageSourceUrl} target="_blank" rel="noreferrer"><Localized en={saint.imageCaption} ar={saint.arabic?.imageCaption} />{saint.imageLicense ? <small data-no-translate> · {saint.imageLicense}</small> : null} ↗</a>
                  : <span className="profile-portrait__caption"><Localized en={saint.imageCaption} ar={saint.arabic?.imageCaption} />{saint.imageLicense ? <small data-no-translate> · {saint.imageLicense}</small> : null}</span>
              ) : <span className="profile-portrait__caption">Symbolic monogram · no verified historical likeness used</span>}
            </div>
          </header>

          <div className="profile-reading">
            <section className="profile-narrative" aria-labelledby="life-heading">
              <p className="profile-section-label">Life &amp; memory</p>
              <h2 id="life-heading">The life remembered.</h2>
              {saint.historicalContext.map((paragraph, index) => (
                <p key={`${paragraph.text}-${index}`}><span data-arabic-text={paragraph.arabicText}>{paragraph.text}</span><CitationLinks saint={saint} indexes={paragraph.sourceIndexes} /></p>
              ))}
            </section>
            <aside className="profile-reflection" aria-labelledby="reflection-heading">
              <span className="profile-reflection__star" aria-hidden="true">✦</span>
              <p id="reflection-heading">For reflection</p>
              <h2><Localized en={saint.reflection} ar={saint.arabic?.reflection} /></h2>
              <div className="profile-themes"><p>Threads in this life</p><ul>{saint.themes.map((theme, index) => <li key={`${theme}-${index}`} data-arabic-text={saint.arabic?.themes[index]}>{theme}</li>)}</ul></div>
            </aside>
          </div>

          {saint.lifeChapters?.length ? (
            <section className="profile-full-life" aria-labelledby="full-life-heading">
              <header><div><p className="profile-section-label">A fuller life</p><h2 id="full-life-heading">The person, the memory, the legacy.</h2></div><p>These chapters bring the historical record and received tradition into a longer, sourced narrative.</p></header>
              <div className="profile-life-chapters">
                {saint.lifeChapters.map((chapter, chapterIndex) => (
                  <article key={`${chapter.title}-${chapterIndex}`}><span aria-hidden="true">{String(chapterIndex + 1).padStart(2, "0")}</span><div><h3 data-arabic-text={chapter.arabicTitle}>{chapter.title}</h3>{chapter.paragraphs.map((paragraph, index) => <p key={`${paragraph.text}-${index}`}><span data-arabic-text={paragraph.arabicText}>{paragraph.text}</span><CitationLinks saint={saint} indexes={paragraph.sourceIndexes} /></p>)}</div></article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="profile-sources" aria-labelledby="sources-heading">
            <div><p className="profile-section-label">Study further</p><h2 id="sources-heading">Sources &amp; further reading.</h2><p>Each source opens in its original website so names, records, and citations remain intact.</p></div>
            <ul>{saint.sources.map((source, index) => <li id={`source-${index + 1}`} key={`${source.url}-${index}`}><a href={source.url} target="_blank" rel="noreferrer" data-no-translate><span className="profile-source-number" aria-hidden="true">{index + 1}</span><span><strong>{source.label}</strong><small>{source.publisher}</small></span><span aria-hidden="true">↗</span></a></li>)}</ul>
          </section>
          <nav className="profile-pagination editorial-profile-return" aria-label="Return to saint profiles"><a href={`${basePath}/saints/`}><span><Arrow direction="left" />All saints</span><strong>Return to the archive</strong></a></nav>
        </article>
        <SiteFooter />
      </main>
    </PageTransition>
  );
}
