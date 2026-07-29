"use client";

import { useEffect, useState } from "react";

const OPENING_DURATION_MS = 1700;

export function SiteLoader() {
  const [isOpening, setIsOpening] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setIsOpening(false),
      OPENING_DURATION_MS,
    );

    return () => window.clearTimeout(timer);
  }, []);

  if (!isOpening) {
    return null;
  }

  return (
    <div
      className="site-loader"
      role="status"
      aria-label="Opening The Paradise of the Fathers"
    >
      <span
        className="site-loader__leaf site-loader__leaf--left"
        aria-hidden="true"
      />
      <span
        className="site-loader__leaf site-loader__leaf--right"
        aria-hidden="true"
      />

      <div className="site-loader__seal" aria-hidden="true">
        <span className="site-loader__halo" />
        <span className="site-loader__cross">
          <span />
        </span>
        <p lang="syr" dir="rtl">
          ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ
        </p>
        <strong>The Paradise of the Fathers</strong>
        <span className="site-loader__thread" />
      </div>

      <span className="sr-only">Opening The Paradise of the Fathers</span>
    </div>
  );
}
