"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { ArchiveBook } from "../data/books";
import { findEditorialRecord, loadEditorialContent, mapEditorialBook } from "../lib/editorial-client";
import { PageTransition } from "./page-transition";
import { Arrow, SiteFooter, SiteHeader } from "./site-chrome";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function EditorialBookProfile() {
  const slug = useSearchParams().get("slug") ?? "";
  const [book, setBook] = useState<ArchiveBook | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    void loadEditorialContent()
      .then((response) => {
        if (!active) return;
        const record = findEditorialRecord(response, "book", slug);
        if (!record) return setFailed(true);
        setBook(mapEditorialBook(record as Parameters<typeof mapEditorialBook>[0]));
      })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [slug]);

  if (!book && !failed) return <div className="editorial-loading" role="status"><span />Opening the book record…</div>;
  if (!book) {
    return <main><SiteHeader active="books" /><section className="editorial-missing"><p>Library notice</p><h1>This book record could not be opened.</h1><a href={`${basePath}/books/`}><Arrow direction="left" /> Return to the books</a></section><SiteFooter /></main>;
  }

  const facts = [
    ["Creator", book.creator],
    ["Date", book.year],
    ["Publisher", book.publisher],
    ["Edition", book.edition],
    ["Publication place", book.publicationPlace],
    ["Languages", book.languages?.join(", ")],
  ].filter((fact) => fact[1]);

  return (
    <PageTransition name="book-profile-page" transitionKey={book.slug ?? book.title}>
      <main className="editorial-book-page">
        <a className="skip-link" href="#book-record">Skip to book record</a>
        <SiteHeader active="books" />
        <article id="book-record" className="editorial-book-record">
          <header>
            <div className="editorial-book-record__copy">
              <a className="profile-back-link" href={`${basePath}/books/`}><Arrow direction="left" /> Back to the library</a>
              <p className="profile-kicker">{book.category} <span aria-hidden="true">·</span> <span data-arabic-text={book.arabic?.kind}>{book.kind}</span></p>
              <p className="editorial-book-record__syriac" lang="syr" dir="rtl">{book.syriac}</p>
              <h1 data-arabic-text={book.arabic?.title}>{book.title}</h1>
              <p className="editorial-book-record__lead" data-arabic-text={book.arabic?.description}>{book.description}</p>
              <div className="editorial-book-record__actions">
                <a href={book.sourceHref} target="_blank" rel="noreferrer"><span data-arabic-text={book.arabic?.sourceLabel}>{book.sourceLabel}</span><Arrow /></a>
                {book.readingHref ? <a href={book.readingHref} target="_blank" rel="noreferrer"><span data-arabic-text="قراءة الكتاب الرقمي">Read the digitized book</span><Arrow /></a> : null}
              </div>
            </div>
            <div className="editorial-book-record__cover">
              {book.cover ? <><Image src={book.cover} alt={`Cover of ${book.title}`} data-arabic-text={book.arabic?.title ? `غلاف ${book.arabic.title}` : undefined} fill priority sizes="(max-width: 800px) 70vw, 380px" unoptimized />{book.coverSourceUrl ? <a className="editorial-book-record__cover-credit" href={book.coverSourceUrl} target="_blank" rel="noreferrer" data-no-translate>Image source{book.coverLicense ? ` · ${book.coverLicense}` : ""} ↗</a> : null}</> : <div><span lang="syr" dir="rtl">{book.syriac}</span><strong>{book.title}</strong><small>{book.year}</small></div>}
            </div>
          </header>
          <section className="editorial-book-record__details">
            <div><p className="profile-section-label">Bibliographic record</p><h2>The book at a glance.</h2><dl>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd lang="en" dir="ltr" data-no-translate>{value}</dd></div>)}</dl></div>
            <aside><p className="profile-section-label">Cataloguer’s note</p><p data-arabic-text={book.arabic?.notes || "لم تضاف ملاحظة أخرى إلى هذا السجل."}>{book.notes || "No additional note has been supplied for this record."}</p>{book.subjects?.length ? <ul>{book.subjects.map((subject) => <li key={subject} lang="en" dir="ltr" data-no-translate>{subject}</li>)}</ul> : null}</aside>
          </section>
        </article>
        <SiteFooter />
      </main>
    </PageTransition>
  );
}
