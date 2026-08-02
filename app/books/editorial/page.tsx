import type { Metadata } from "next";
import { Suspense } from "react";
import { EditorialBookProfile } from "../../components/editorial-book-profile";

export const metadata: Metadata = {
  title: "Book record | The Paradise of the Fathers",
};

export default function EditorialBookPage() {
  return (
    <Suspense fallback={<div className="editorial-loading"><span />Opening the book record…</div>}>
      <EditorialBookProfile />
    </Suspense>
  );
}
