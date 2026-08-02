"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";
import type { LocalizedText } from "../../shared/editorial";
import styles from "../admin/admin.module.css";

export function Field({
  label,
  value,
  onChange,
  hint,
  type = "text",
  required = false,
  dir,
  lang,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  type?: "text" | "url";
  required?: boolean;
  dir?: "rtl" | "ltr";
  lang?: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}{required ? " *" : ""}</span>
      <input
        type={type}
        value={value}
        required={required}
        dir={dir}
        lang={lang}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  hint,
  required = false,
  rows = 5,
  dir,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  rows?: number;
  dir?: "rtl" | "ltr";
}) {
  return (
    <label className={styles.field}>
      <span>{label}{required ? " *" : ""}</span>
      <textarea
        value={value}
        required={required}
        rows={rows}
        dir={dir}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

export function LocalizedField({
  label,
  value,
  onChange,
  textarea = false,
  required = false,
  rows = 5,
}: {
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
  textarea?: boolean;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className={styles.localizedField}>
      <div>
        {textarea ? (
          <TextAreaField
            label={`${label} · English`}
            value={value.en}
            required={required}
            rows={rows}
            onChange={(en) => onChange({ ...value, en })}
          />
        ) : (
          <Field
            label={`${label} · English`}
            value={value.en}
            required={required}
            onChange={(en) => onChange({ ...value, en })}
          />
        )}
      </div>
      <div lang="ar" dir="rtl">
        {textarea ? (
          <TextAreaField
            label={`${label} · العربية`}
            value={value.ar}
            required={required}
            rows={rows}
            dir="rtl"
            onChange={(ar) => onChange({ ...value, ar })}
          />
        ) : (
          <Field
            label={`${label} · العربية`}
            value={value.ar}
            required={required}
            dir="rtl"
            onChange={(ar) => onChange({ ...value, ar })}
          />
        )}
      </div>
    </div>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function Section({
  id,
  number,
  title,
  description,
  children,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.formSection} id={id}>
      <header>
        <span>{number}</span>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </header>
      <div className={styles.formSectionBody}>{children}</div>
    </section>
  );
}

export function RemoveButton({ onClick, label = "Remove" }: { onClick: () => void; label?: string }) {
  return <button className={styles.removeButton} type="button" onClick={onClick}>{label}</button>;
}

export function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return <button className={styles.addButton} type="button" onClick={onClick}><span aria-hidden="true">＋</span>{children}</button>;
}

export function MediaUpload({
  currentUrl,
  onUploaded,
  onUpload,
}: {
  currentUrl: string;
  onUploaded: (url: string) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await onUpload(file);
      onUploaded(url);
      event.target.value = "";
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "The image could not be uploaded.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.mediaUpload}>
      <div>
        {/* The editor accepts same-origin R2 previews whose dimensions are unknown until upload. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {currentUrl ? <img src={currentUrl} alt="Current editorial upload" /> : <span>No image uploaded</span>}
      </div>
      <label>
        <span>{uploading ? "Uploading…" : currentUrl ? "Replace image" : "Upload image"}</span>
        <input disabled={uploading} type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void upload(event)} />
      </label>
      <small>JPG, PNG, or WebP · maximum 8 MB</small>
      {uploadError ? <small role="alert" className={styles.uploadError}>{uploadError}</small> : null}
    </div>
  );
}
