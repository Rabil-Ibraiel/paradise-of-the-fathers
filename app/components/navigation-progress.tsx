"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const begin = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.getAttribute("href")?.startsWith("#")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.href === window.location.href
      ) {
        return;
      }

      setVisible(true);
      visibleRef.current = true;
      setProgress(16);
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
      timerRef.current = window.setInterval(() => {
        setProgress((current) => {
          if (current >= 88) return current;
          return current + Math.max(1, Math.round((88 - current) * 0.12));
        });
      }, 140);
    };

    document.addEventListener("click", begin, true);
    return () => document.removeEventListener("click", begin, true);
  }, []);

  useEffect(() => {
    if (!visibleRef.current) return;

    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setProgress(100);
    const completionTimer = window.setTimeout(() => {
      visibleRef.current = false;
      setVisible(false);
      setProgress(0);
    }, 260);

    return () => window.clearTimeout(completionTimer);
  }, [pathname, searchParams]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    },
    [],
  );

  return (
    <div
      className={`navigation-progress${visible ? " is-visible" : ""}`}
      aria-hidden="true"
    >
      <span style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressInner />
    </Suspense>
  );
}
