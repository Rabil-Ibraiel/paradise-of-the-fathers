"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const OPENING_DURATION_MS = 1700;

export function SiteLoader() {
  const pathname = usePathname();
  const [isOpening, setIsOpening] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressStatusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setIsOpening(false),
      OPENING_DURATION_MS,
    );

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const clearProgress = () => {
      progressRef.current?.classList.remove("is-active");

      if (progressStatusRef.current) {
        progressStatusRef.current.textContent = "";
      }
    };

    const handleInternalNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>("a[href]");

      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const destination = new URL(link.href, window.location.href);

      if (
        destination.origin === window.location.origin &&
        destination.pathname !== window.location.pathname
      ) {
        progressRef.current?.classList.add("is-active");

        if (progressStatusRef.current) {
          progressStatusRef.current.textContent = "Opening the selected life";
        }
      }
    };

    document.addEventListener("click", handleInternalNavigation, true);
    window.addEventListener("popstate", clearProgress);

    return () => {
      document.removeEventListener("click", handleInternalNavigation, true);
      window.removeEventListener("popstate", clearProgress);
    };
  }, [pathname]);

  useEffect(() => {
    progressRef.current?.classList.remove("is-active");

    if (progressStatusRef.current) {
      progressStatusRef.current.textContent = "";
    }
  }, [pathname]);

  return (
    <>
      {isOpening ? (
        <div
          className="site-loader"
          role="status"
          aria-label="Opening The Paradise of the Fathers"
        >
          <span className="site-loader__leaf site-loader__leaf--left" aria-hidden="true" />
          <span className="site-loader__leaf site-loader__leaf--right" aria-hidden="true" />

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
      ) : null}

      <div
        ref={progressRef}
        className="route-progress"
        role="status"
        aria-live="polite"
      >
        <span className="route-progress__thread" aria-hidden="true" />
        <span ref={progressStatusRef} className="sr-only" />
      </div>
    </>
  );
}
