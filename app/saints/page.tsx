import type { Metadata } from "next";
import { PageTransition } from "../components/page-transition";
import { SaintsArchive } from "../components/saints-archive";
import { SiteFooter, SiteHeader } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Saints | The Paradise of the Fathers",
  description:
    "Fifteen concise, sourced profiles of saints and spiritual figures associated with the Church of the East.",
};

export default function SaintsPage() {
  return (
    <PageTransition name="saints-page">
      <main className="collection-page">
        <a className="skip-link" href="#saints-archive">
          Skip to saints
        </a>
        <SiteHeader active="saints" />
        <header className="collection-hero" id="saints-archive">
          <p className="eyebrow">The lives</p>
          <h1>Saints of the East.</h1>
          <p>
            Apostles, poets, monks, theologians, and martyrs—each profile
            distinguishes devotional memory from the history we can document.
            This sourced directory begins with fifteen lives and will continue
            to grow without pretending that one list can exhaust the Church’s
            calendar or memory.
          </p>
        </header>
        <section className="archive-section archive-section--page">
          <SaintsArchive />
        </section>
        <SiteFooter />
      </main>
    </PageTransition>
  );
}
