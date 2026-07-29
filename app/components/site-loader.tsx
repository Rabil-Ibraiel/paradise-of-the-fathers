"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const OPENING_DURATION_MS = 1700;

export function SiteLoader() {
  const pathname = usePathname();
  const [isOpening, setIsOpening] = useState(true);
  const [navigationFrom, setNavigationFrom] = useState<string | null>(null);
  const isNavigating = navigationFrom === pathname;

  useEffect(() => {
    const timer = window.setTimeout(
      () => setIsOpening(false),
      OPENING_DURATION_MS,
    );

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
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
        queueMicrotask(() => setNavigationFrom(pathname));
      }
    };

    const handleHistoryNavigation = () => setNavigationFrom(null);

    document.addEventListener("click", handleInternalNavigation, true);
    window.addEventListener("popstate", handleHistoryNavigation);

    return () => {
      document.removeEventListener("click", handleInternalNavigation, true);
      window.removeEventListener("popstate", handleHistoryNavigation);
    };
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
        className={`route-progress${isNavigating ? " is-active" : ""}`}
        role="status"
        aria-live="polite"
      >
        <span className="route-progress__thread" aria-hidden="true" />
        <span className="sr-only">
          {isNavigating ? "Opening the selected life" : ""}
        </span>
      </div>
    </>
  );
}
