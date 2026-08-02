"use client";

import { type EditorialBook } from "../../shared/editorial";
import {
  Field,
  LocalizedField,
  MediaUpload,
  Section,
  SelectField,
  TextAreaField,
} from "./admin-editor-fields";
import styles from "../admin/admin.module.css";

const categories = [
  "Origins & Apostles",
  "Spiritual Life",
  "Lives & Witness",
  "Church & History",
  "Manuscript Study",
] as const;

export function AdminBookEditor({
  value,
  onChange,
  onUpload,
}: {
  value: EditorialBook;
  onChange: (value: EditorialBook) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const patch = <K extends keyof EditorialBook>(key: K, next: EditorialBook[K]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <form className={styles.editorForm} onSubmit={(event) => event.preventDefault()}>
      <nav className={styles.sectionIndex} aria-label="Book editor sections">
        <a href="#book-identity">Identity</a>
        <a href="#book-edition">Edition</a>
        <a href="#book-description">Description</a>
        <a href="#book-cover">Cover</a>
        <a href="#book-access">Access</a>
      </nav>

      <Section id="book-identity" number="01" title="Work identity" description="The Syriac title remains primary in Arabic mode; English and verified Arabic titles sit beneath it.">
        <Field label="URL slug" value={value.slug} required hint="Lowercase English letters and hyphens." onChange={(slug) => patch("slug", slug.toLocaleLowerCase().replace(/[^a-z0-9-]/g, "-"))} />
        <LocalizedField label="Title" value={value.title} required onChange={(title) => patch("title", title)} />
        <Field label="Syriac title" value={value.syriac} required dir="rtl" lang="syr" onChange={(syriac) => patch("syriac", syriac)} />
        <div className={styles.fieldGrid}>
          <SelectField label="Category" value={value.category} options={categories} onChange={(category) => patch("category", category as EditorialBook["category"])} />
          <LocalizedField label="Kind of work" value={value.kind} onChange={(kind) => patch("kind", kind)} />
        </div>
      </Section>

      <Section id="book-edition" number="02" title="Edition and responsibility" description="Record the edition readers will encounter rather than flattening the ancient work and modern publication together.">
        <div className={styles.fieldGrid}>
          <Field label="Author, editor, or translator" value={value.creator} required onChange={(creator) => patch("creator", creator)} />
          <Field label="Year or period" value={value.year} required onChange={(year) => patch("year", year)} />
          <Field label="Publisher" value={value.publisher} onChange={(publisher) => patch("publisher", publisher)} />
          <Field label="Publication place" value={value.publicationPlace} onChange={(publicationPlace) => patch("publicationPlace", publicationPlace)} />
        </div>
        <Field label="Edition statement" value={value.edition} hint="For example: First English translation, critical edition, or reprint." onChange={(edition) => patch("edition", edition)} />
        <div className={styles.fieldGrid}>
          <TextAreaField label="Languages" value={value.languages.join("\n")} rows={4} hint="One language per line." onChange={(languages) => patch("languages", languages.split("\n").map((item) => item.trim()).filter(Boolean))} />
          <TextAreaField label="Subjects" value={value.subjects.join("\n")} rows={4} hint="One subject per line." onChange={(subjects) => patch("subjects", subjects.split("\n").map((item) => item.trim()).filter(Boolean))} />
        </div>
      </Section>

      <Section id="book-description" number="03" title="Reader’s description" description="Explain why this particular work or edition belongs in the archive.">
        <LocalizedField label="Description" value={value.description} textarea required rows={7} onChange={(description) => patch("description", description)} />
        <LocalizedField label="Editorial notes" value={value.notes} textarea rows={5} onChange={(notes) => patch("notes", notes)} />
      </Section>

      <Section id="book-cover" number="04" title="Cover and provenance" description="Uploaded or remote covers must name their source and reuse permission.">
        <MediaUpload currentUrl={value.cover} onUpload={onUpload} onUploaded={(cover) => patch("cover", cover)} />
        <Field label="Cover URL" value={value.cover} type="url" onChange={(cover) => patch("cover", cover)} />
        <div className={styles.fieldGrid}>
          <Field label="Cover source page" value={value.coverSourceUrl} type="url" onChange={(coverSourceUrl) => patch("coverSourceUrl", coverSourceUrl)} />
          <Field label="Cover license" value={value.coverLicense} onChange={(coverLicense) => patch("coverLicense", coverLicense)} />
        </div>
      </Section>

      <Section id="book-access" number="05" title="Catalogues and reading access" description="Use stable records and lawful open copies. Website names remain in their original language.">
        <Field label="Catalogue or source URL" value={value.sourceHref} type="url" required onChange={(sourceHref) => patch("sourceHref", sourceHref)} />
        <LocalizedField label="Source action label" value={value.sourceLabel} onChange={(sourceLabel) => patch("sourceLabel", sourceLabel)} />
        <Field label="Open reading URL" value={value.readingHref} type="url" hint="Internet Archive, institutional repository, or another lawful full text." onChange={(readingHref) => patch("readingHref", readingHref)} />
      </Section>
    </form>
  );
}
