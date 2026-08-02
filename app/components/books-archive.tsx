"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { archiveBooks, bookCategories, bookSlug, type ArchiveBook } from "../data/books";
import { loadEditorialContent, mapEditorialBook } from "../lib/editorial-client";
import { Arrow } from "./site-chrome";

export function BooksArchive() {
  const [editorialBooks, setEditorialBooks] = useState<ArchiveBook[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  useEffect(() => {
    let active = true;
    void loadEditorialContent()
      .then((response) => {
        if (!active) return;
        setEditorialBooks(
          response.records
            .filter((record) => record.type === "book")
            .map((record) => mapEditorialBook(record as Parameters<typeof mapEditorialBook>[0])),
        );
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  const allBooks = useMemo(() => {
    const editorialSlugs = new Set(editorialBooks.map(bookSlug));
    return [...editorialBooks, ...archiveBooks.filter((book) => !editorialSlugs.has(bookSlug(book)))];
  }, [editorialBooks]);
  const visibleBooks =
    activeCategory === "All"
      ? allBooks
      : allBooks.filter((book) => book.category === activeCategory);

  return (
    <div className="books-archive">
      <div className="book-categories" aria-label="Book categories">
        <button
          type="button"
          className={activeCategory === "All" ? "is-active" : ""}
          onClick={() => setActiveCategory("All")}
        >
          <span>
            <strong>The whole shelf</strong>
            <small>Move between texts, lives, worship, and history.</small>
          </span>
          <b>{allBooks.length}</b>
        </button>
        {bookCategories.map((category) => {
          const count = allBooks.filter(
            (book) => book.category === category.name,
          ).length;
          return (
            <button
              type="button"
              className={activeCategory === category.name ? "is-active" : ""}
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
            >
              <span>
                <strong>{category.name}</strong>
                <small>{category.description}</small>
              </span>
              <b>{count}</b>
            </button>
          );
        })}
      </div>

      <div className="book-shelf" aria-live="polite">
        {visibleBooks.map((book) => (
          <article className="archive-book" key={bookSlug(book)}>
            <div className="archive-book__cover">
              {book.cover ? (
                <Image
                  src={book.cover}
                  alt={`Digitized cover of ${book.title}`}
                  fill
                  sizes="(max-width: 760px) 38vw, 180px"
                  unoptimized
                />
              ) : (
                <div>
                  <span lang="syr" dir="rtl">
                    {book.syriac}
                  </span>
                  <strong>{book.title}</strong>
                </div>
              )}
            </div>
            <div className="archive-book__copy">
              <p>
                {book.category} · {book.kind}
              </p>
              <div className="archive-book__titles archive-book__titles--english">
                <h2 data-arabic-text={book.arabic?.title}>{book.title}</h2>
                <span lang="syr" dir="rtl">
                  {book.syriac}
                </span>
              </div>
              <div className="archive-book__titles archive-book__titles--arabic">
                <h2 lang="syr" dir="rtl">
                  {book.syriac}
                </h2>
                <p>
                  <span data-arabic-text={book.arabic?.title}>{book.title}</span>
                  <span aria-hidden="true"> — </span>
                  <span lang="en" dir="ltr" data-no-translate>
                    {book.title}
                  </span>
                </p>
              </div>
              <small>
                {book.year} · <span lang="en" dir="ltr" data-no-translate>{book.creator}</span>
              </small>
              <p data-arabic-text={book.arabic?.description}>{book.description}</p>
              <div className="archive-book__actions">
                {book.isEditorial && book.slug ? (
                  <Link href={`/books/editorial/?slug=${encodeURIComponent(book.slug)}`}>
                    View full record
                    <Arrow />
                  </Link>
                ) : null}
                {book.internal ? (
                  <Link href={book.sourceHref}>
                    <span data-arabic-text={book.arabic?.sourceLabel}>{book.sourceLabel}</span>
                    <Arrow />
                  </Link>
                ) : (
                  <a href={book.sourceHref} target="_blank" rel="noreferrer">
                    <span data-arabic-text={book.arabic?.sourceLabel}>{book.sourceLabel}</span>
                    <Arrow />
                  </a>
                )}
                {book.readingHref ? (
                  <a href={book.readingHref} target="_blank" rel="noreferrer">
                    Read at Internet Archive
                    <Arrow />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="book-cover-credit">
        Digitized-book covers are displayed from Internet Archive. Bibliographic
        pathways are checked against Syri.ac and Syriaca.org.
      </p>
    </div>
  );
}
