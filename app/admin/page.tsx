import type { Metadata } from "next";
import { AdminDashboard } from "../components/admin-dashboard";

/*
THESIS: The editorial desk is a working register, not a generic analytics dashboard.
OWN-WORLD: East Syriac green, paper, oxblood, lapis, ruled ledgers, and compact workhorse type.
STORY: Choose a record, complete its evidence and translations, preview its readiness, then publish deliberately.
FIRST VIEWPORT: A collection ledger at left, the active folio editor in the center, and a persistent publication rail at right.
FORM: The fifth grounded structure—three-pane editorial register—staged as a numbered directory with ambient section position. Seed 8579a05f.
*/

export const metadata: Metadata = {
  title: "Editorial Desk | The Paradise of the Fathers",
  description: "Private editorial tools for The Paradise of the Fathers.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
