"use client";

import { useState } from "react";
import { saints } from "../data/saints";
import { SaintCard } from "./saint-card";

const filters = [
  "All",
  "Missionaries",
  "Teachers",
  "Monastics",
  "Martyrs",
] as const;

export function SaintsArchive() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const visibleSaints =
    activeFilter === "All"
      ? saints
      : saints.filter((saint) => saint.category === activeFilter);

  return (
    <>
      <div className="filters" aria-label="Filter saints by vocation">
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "is-active" : ""}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="saint-grid" aria-live="polite">
        {visibleSaints.map((saint) => (
          <SaintCard
            saint={saint}
            index={saints.indexOf(saint)}
            key={saint.slug}
          />
        ))}
      </div>
    </>
  );
}
