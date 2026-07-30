"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { archiveBooks, bookCategories } from "../data/books";
import { Arrow } from "./site-chrome";

export function BooksArchive() {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleBooks =
    activeCategory === "All"
      ? archiveBooks
      : archiveBooks.filter((book) => book.category === activeCategory);

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
          <b>{archiveBooks.length}</b>
        </button>
        {bookCategories.map((category) => {
          const count = archiveBooks.filter(
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
          <article className="archive-book" key={book.title}>
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
                <h2>{book.title}</h2>
                <span lang="syr" dir="rtl">
                  {book.syriac}
                </span>
              </div>
              <div className="archive-book__titles archive-book__titles--arabic">
                <h2 lang="syr" dir="rtl">
                  {book.syriac}
                </h2>
                <p>
                  <span>{book.title}</span>
                  <span aria-hidden="true"> — </span>
                  <span lang="en" dir="ltr" data-no-translate>
                    {book.title}
                  </span>
                </p>
              </div>
              <small>
                {book.year} · {book.creator}
              </small>
              <p>{book.description}</p>
              <div className="archive-book__actions">
                {book.internal ? (
                  <Link href={book.sourceHref}>
                    {book.sourceLabel}
                    <Arrow />
                  </Link>
                ) : (
                  <a href={book.sourceHref} target="_blank" rel="noreferrer">
                    {book.sourceLabel}
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
