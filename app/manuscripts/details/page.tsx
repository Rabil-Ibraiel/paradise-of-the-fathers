import type { Metadata } from "next";
import { ManuscriptDetails } from "../../components/manuscript-details";
import { PageTransition } from "../../components/page-transition";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";

export const metadata: Metadata = {
  title: "Manuscript record | The Paradise of the Fathers",
  description:
    "Read the complete reusable HMML catalogue description for a Syriac manuscript witness.",
};

export default function ManuscriptDetailsPage() {
  return (
    <PageTransition name="manuscript-details-page">
      <main className="manuscript-details-page">
        <a className="skip-link" href="#manuscript-record">
          Skip to manuscript details
        </a>
        <SiteHeader active="manuscripts" />
        <ManuscriptDetails />
        <SiteFooter />
      </main>
    </PageTransition>
  );
}
