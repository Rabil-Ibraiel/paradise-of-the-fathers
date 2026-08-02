import type { Metadata } from "next";
import { Suspense } from "react";
import { EditorialSaintProfile } from "../../components/editorial-saint-profile";

export const metadata: Metadata = {
  title: "Saint profile | The Paradise of the Fathers",
  robots: { index: true, follow: true },
};

export default function EditorialSaintPage() {
  return (
    <Suspense fallback={<div className="editorial-loading"><span />Opening the remembered life…</div>}>
      <EditorialSaintProfile />
    </Suspense>
  );
}
