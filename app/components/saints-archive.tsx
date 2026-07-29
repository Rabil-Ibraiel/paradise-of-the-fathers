"use client";

import { useState } from "react";
import { saints } from "../data/saints";
import { SaintCard } from "./saint-card";

const filters = [
  {
    name: "All",
    title: "The whole communion",
    description: "Every life currently gathered in the archive.",
  },
  {
    name: "Missionaries",
    title: "Apostles & missionaries",
    description: "Lives remembered through movement, hospitality, and beginnings.",
  },
  {
    name: "Teachers",
    title: "Teachers & poets",
    description: "Scripture, theology, poetry, and the schooling of attention.",
  },
  {
    name: "Monastics",
    title: "Monastic fathers",
    description: "Stillness, community, reform, and places shaped by prayer.",
  },
  {
    name: "Martyrs",
    title: "Martyrs & witnesses",
    description: "Lives remembered where faith, power, and courage meet.",
  },
  {
    name: "Bishops",
    title: "Bishops & patriarchs",
    description: "Pastoral responsibility across cities, regions, and generations.",
  },
] as const;

export function SaintsArchive() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]["name"]>("All");
  const visibleSaints =
    activeFilter === "All"
      ? saints
      : saints.filter((saint) => saint.category === activeFilter);

  return (
    <>
      <div className="filters" aria-label="Filter saints by vocation">
        {filters.map((filter) => (
          <button
            key={filter.name}
            className={activeFilter === filter.name ? "is-active" : ""}
            type="button"
            aria-pressed={activeFilter === filter.name}
            onClick={() => setActiveFilter(filter.name)}
          >
            <span>
              <strong>{filter.title}</strong>
              <small>{filter.description}</small>
            </span>
            <b>
              {filter.name === "All"
                ? saints.length
                : saints.filter((saint) => saint.category === filter.name).length}
            </b>
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
