import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Saint } from "../data/saints";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

export function SaintCard({
  saint,
  index,
}: {
  saint: Saint;
  index: number;
}) {
  const initials = saint.name
    .replace("Mar ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <Link
      className="saint-card-link"
      href={`/saints/${saint.slug}`}
      aria-label={`Read the profile of ${saint.name}`}
      prefetch
      transitionTypes={["nav-forward"]}
    >
      <article className={`saint-card tone-${saint.tone}`}>
        <ViewTransition
          name={`saint-${saint.slug}-portrait`}
          share="morph"
          default="none"
        >
          {saint.image ? (
            <div className="saint-card__image">
              <Image
                src={assetPath(saint.image)}
                alt=""
                fill
                sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1050px) 46vw, 430px"
                style={{ objectPosition: saint.imagePosition }}
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
          ) : (
            <div className="saint-card__field" aria-hidden="true">
              <span className="saint-card__monogram">{initials}</span>
              <span className="saint-card__syriac" lang="syr" dir="rtl">
                {saint.syriacName}
              </span>
              <span className="saint-card__star">✦</span>
              <span className="saint-card__orbit" />
            </div>
          )}
        </ViewTransition>
        <div className="saint-card__body">
          <div className="saint-card__meta">
            <span>{saint.category}</span>
            <span>{saint.era}</span>
          </div>
          <h3>{saint.name}</h3>
          <p className="saint-card__title">{saint.title}</p>
          <p className="saint-card__summary">{saint.summary}</p>
          <div className="saint-card__footer">
            <span>{saint.place}</span>
            <span>Read profile ↗</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
