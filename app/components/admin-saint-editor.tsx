"use client";

import {
  emptyLocalizedText,
  type EditorialParagraph,
  type EditorialSaint,
  type EditorialSource,
  type LocalizedText,
} from "../../shared/editorial";
import {
  AddButton,
  Field,
  LocalizedField,
  MediaUpload,
  RemoveButton,
  Section,
  SelectField,
} from "./admin-editor-fields";
import styles from "../admin/admin.module.css";

const categories = ["Missionaries", "Teachers", "Monastics", "Martyrs", "Bishops"] as const;
const tones = ["green", "red", "blue", "gold"] as const;

const emptyParagraph = (): EditorialParagraph => ({ text: emptyLocalizedText(), sourceIndexes: [] });
const emptySource = (): EditorialSource => ({ label: "", publisher: "", url: "" });

export function AdminSaintEditor({
  value,
  onChange,
  onUpload,
}: {
  value: EditorialSaint;
  onChange: (value: EditorialSaint) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const patch = <K extends keyof EditorialSaint>(key: K, next: EditorialSaint[K]) => {
    onChange({ ...value, [key]: next });
  };

  const updateParagraph = (index: number, paragraph: EditorialParagraph) => {
    const next = [...value.historicalContext];
    next[index] = paragraph;
    patch("historicalContext", next);
  };

  const removeSource = (sourceIndex: number) => {
    if (!window.confirm("Remove this source and every footnote that points to it?")) return;
    const reindex = (indexes: number[]) => indexes
      .filter((index) => index !== sourceIndex)
      .map((index) => index > sourceIndex ? index - 1 : index);
    onChange({
      ...value,
      sources: value.sources.filter((_, index) => index !== sourceIndex),
      historicalContext: value.historicalContext.map((paragraph) => ({
        ...paragraph,
        sourceIndexes: reindex(paragraph.sourceIndexes),
      })),
      lifeChapters: value.lifeChapters.map((chapter) => ({
        ...chapter,
        paragraphs: chapter.paragraphs.map((paragraph) => ({
          ...paragraph,
          sourceIndexes: reindex(paragraph.sourceIndexes),
        })),
      })),
    });
  };

  return (
    <form className={styles.editorForm} onSubmit={(event) => event.preventDefault()}>
      <nav className={styles.sectionIndex} aria-label="Saint editor sections">
        <a href="#saint-identity">Identity</a>
        <a href="#saint-image">Image</a>
        <a href="#saint-life">Life</a>
        <a href="#saint-chapters">Full life</a>
        <a href="#saint-sources">Sources</a>
      </nav>

      <Section id="saint-identity" number="01" title="Identity and remembrance" description="Names, vocation, place, and the concise invitation shown in the archive.">
        <Field label="URL slug" value={value.slug} required hint="Lowercase English letters and hyphens, for example mar-abraham." onChange={(slug) => patch("slug", slug.toLocaleLowerCase().replace(/[^a-z0-9-]/g, "-"))} />
        <LocalizedField label="Name" value={value.name} required onChange={(name) => patch("name", name)} />
        <Field label="Syriac name" value={value.syriacName} required dir="rtl" lang="syr" onChange={(syriacName) => patch("syriacName", syriacName)} />
        <div className={styles.fieldGrid}>
          <SelectField label="Vocation" value={value.category} options={categories} onChange={(category) => patch("category", category as EditorialSaint["category"])} />
          <SelectField label="Visual tone" value={value.tone} options={tones} onChange={(tone) => patch("tone", tone as EditorialSaint["tone"])} />
        </div>
        <LocalizedField label="Profile title" value={value.title} required onChange={(title) => patch("title", title)} />
        <div className={styles.fieldGrid}>
          <LocalizedField label="Period" value={value.era} onChange={(era) => patch("era", era)} />
          <LocalizedField label="Remembered place" value={value.place} onChange={(place) => patch("place", place)} />
        </div>
        <LocalizedField label="Archive summary" value={value.summary} textarea required rows={4} onChange={(summary) => patch("summary", summary)} />
      </Section>

      <Section id="saint-image" number="02" title="Documented image" description="Use a verified historical or devotional image. If none is available, leave it empty and the archive will use a Syriac monogram.">
        <MediaUpload currentUrl={value.image} onUpload={onUpload} onUploaded={(image) => patch("image", image)} />
        <Field label="Image URL" value={value.image} type="url" onChange={(image) => patch("image", image)} />
        <LocalizedField label="Alternative text" value={value.imageAlt} onChange={(imageAlt) => patch("imageAlt", imageAlt)} />
        <LocalizedField label="Visible caption" value={value.imageCaption} onChange={(imageCaption) => patch("imageCaption", imageCaption)} />
        <div className={styles.fieldGrid}>
          <Field label="Source page" value={value.imageSourceUrl} type="url" onChange={(imageSourceUrl) => patch("imageSourceUrl", imageSourceUrl)} />
          <Field label="License" value={value.imageLicense} hint="For example: Public domain, CC0, or CC BY 4.0." onChange={(imageLicense) => patch("imageLicense", imageLicense)} />
        </div>
        <Field label="Image position" value={value.imagePosition} hint="CSS position such as center, 35% center, or top." onChange={(imagePosition) => patch("imagePosition", imagePosition)} />
      </Section>

      <Section id="saint-life" number="03" title="Life and spiritual invitation" description="Keep received tradition and documented history clearly distinguished.">
        <LocalizedField label="Devotional introduction" value={value.devotionalIntroduction} textarea required rows={7} onChange={(devotionalIntroduction) => patch("devotionalIntroduction", devotionalIntroduction)} />
        <LocalizedField label="Question for reflection" value={value.reflection} textarea rows={3} onChange={(reflection) => patch("reflection", reflection)} />

        <div className={styles.repeaterHeading}>
          <div><h4>Historical narrative</h4><p>Footnote numbers refer to the source list below.</p></div>
          <AddButton onClick={() => patch("historicalContext", [...value.historicalContext, emptyParagraph()])}>Add paragraph</AddButton>
        </div>
        {value.historicalContext.map((paragraph, index) => (
          <div className={styles.repeaterRow} key={`history-${index}`}>
            <div className={styles.repeaterLabel}><span>{String(index + 1).padStart(2, "0")}</span><RemoveButton onClick={() => patch("historicalContext", value.historicalContext.filter((_, itemIndex) => itemIndex !== index))} /></div>
            <LocalizedField label="Paragraph" value={paragraph.text} textarea rows={6} onChange={(text) => updateParagraph(index, { ...paragraph, text })} />
            <Field label="Source numbers" value={paragraph.sourceIndexes.map((sourceIndex) => sourceIndex + 1).join(", ")} hint="Comma-separated, for example 1, 3." onChange={(sourceNumbers) => updateParagraph(index, { ...paragraph, sourceIndexes: sourceNumbers.split(",").map((item) => Number.parseInt(item.trim(), 10) - 1).filter((item) => Number.isInteger(item) && item >= 0) })} />
          </div>
        ))}

        <div className={styles.repeaterHeading}>
          <div><h4>Themes</h4><p>Short spiritual threads displayed beside the life.</p></div>
          <AddButton onClick={() => patch("themes", [...value.themes, emptyLocalizedText()])}>Add theme</AddButton>
        </div>
        {value.themes.map((theme, index) => (
          <div className={styles.inlineRepeater} key={`theme-${index}`}>
            <LocalizedField label={`Theme ${index + 1}`} value={theme} onChange={(nextTheme) => { const next = [...value.themes]; next[index] = nextTheme; patch("themes", next); }} />
            <RemoveButton onClick={() => patch("themes", value.themes.filter((_, itemIndex) => itemIndex !== index))} />
          </div>
        ))}
      </Section>

      <Section id="saint-chapters" number="04" title="Full life chapters" description="Longer chapters give the reader context without turning the opening profile into a wall of text.">
        <div className={styles.repeaterHeading}>
          <div><h4>Chapters</h4><p>Each chapter can contain several sourced paragraphs.</p></div>
          <AddButton onClick={() => patch("lifeChapters", [...value.lifeChapters, { title: emptyLocalizedText(), paragraphs: [emptyParagraph()] }])}>Add chapter</AddButton>
        </div>
        {value.lifeChapters.map((chapter, chapterIndex) => (
          <div className={styles.chapter} key={`chapter-${chapterIndex}`}>
            <div className={styles.repeaterLabel}><span>Chapter {String(chapterIndex + 1).padStart(2, "0")}</span><RemoveButton onClick={() => patch("lifeChapters", value.lifeChapters.filter((_, index) => index !== chapterIndex))} /></div>
            <LocalizedField label="Chapter title" value={chapter.title} onChange={(title) => { const next = [...value.lifeChapters]; next[chapterIndex] = { ...chapter, title }; patch("lifeChapters", next); }} />
            {chapter.paragraphs.map((paragraph, paragraphIndex) => (
              <div className={styles.chapterParagraph} key={`chapter-${chapterIndex}-paragraph-${paragraphIndex}`}>
                <LocalizedField label={`Paragraph ${paragraphIndex + 1}`} value={paragraph.text} textarea rows={6} onChange={(text: LocalizedText) => { const chapters = [...value.lifeChapters]; const paragraphs = [...chapter.paragraphs]; paragraphs[paragraphIndex] = { ...paragraph, text }; chapters[chapterIndex] = { ...chapter, paragraphs }; patch("lifeChapters", chapters); }} />
                <Field label="Source numbers" value={paragraph.sourceIndexes.map((sourceIndex) => sourceIndex + 1).join(", ")} onChange={(sourceNumbers) => { const chapters = [...value.lifeChapters]; const paragraphs = [...chapter.paragraphs]; paragraphs[paragraphIndex] = { ...paragraph, sourceIndexes: sourceNumbers.split(",").map((item) => Number.parseInt(item.trim(), 10) - 1).filter((item) => Number.isInteger(item) && item >= 0) }; chapters[chapterIndex] = { ...chapter, paragraphs }; patch("lifeChapters", chapters); }} />
                <RemoveButton label="Remove paragraph" onClick={() => { const chapters = [...value.lifeChapters]; chapters[chapterIndex] = { ...chapter, paragraphs: chapter.paragraphs.filter((_, index) => index !== paragraphIndex) }; patch("lifeChapters", chapters); }} />
              </div>
            ))}
            <AddButton onClick={() => { const chapters = [...value.lifeChapters]; chapters[chapterIndex] = { ...chapter, paragraphs: [...chapter.paragraphs, emptyParagraph()] }; patch("lifeChapters", chapters); }}>Add chapter paragraph</AddButton>
          </div>
        ))}
      </Section>

      <Section id="saint-sources" number="05" title="Sources and further reading" description="Every historical claim should point readers toward a named, durable source.">
        <div className={styles.repeaterHeading}>
          <div><h4>Source register</h4><p>The order here determines the footnote numbers above.</p></div>
          <AddButton onClick={() => patch("sources", [...value.sources, emptySource()])}>Add source</AddButton>
        </div>
        {value.sources.map((source, index) => (
          <div className={styles.sourceRow} key={`source-${index}`}>
            <span>{index + 1}</span>
            <Field label="Source title" value={source.label} onChange={(label) => { const next = [...value.sources]; next[index] = { ...source, label }; patch("sources", next); }} />
            <Field label="Publisher or website" value={source.publisher} onChange={(publisher) => { const next = [...value.sources]; next[index] = { ...source, publisher }; patch("sources", next); }} />
            <Field label="Permanent URL" value={source.url} type="url" onChange={(url) => { const next = [...value.sources]; next[index] = { ...source, url }; patch("sources", next); }} />
            <RemoveButton onClick={() => removeSource(index)} />
          </div>
        ))}
      </Section>
    </form>
  );
}
