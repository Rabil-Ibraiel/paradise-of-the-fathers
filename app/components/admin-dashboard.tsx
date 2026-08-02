"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createEmptyBook,
  createEmptySaint,
  editorialChecks,
  type EditorialBook,
  type EditorialPayload,
  type EditorialRecord,
  type EditorialSaint,
  type EditorialType,
} from "../../shared/editorial";
import { AdminBookEditor } from "./admin-book-editor";
import { AdminSaintEditor } from "./admin-saint-editor";
import { legacyEditorialRecords } from "../lib/editorial-legacy";
import styles from "../admin/admin.module.css";

type AdminSession = {
  authenticated: true;
  email: string;
};

function newRecord(type: EditorialType): EditorialRecord {
  const now = new Date().toISOString();
  return {
    id: "",
    type,
    slug: "",
    status: "draft",
    title: "",
    payload: type === "saint" ? createEmptySaint() : createEmptyBook(),
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
  };
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(init?.headers ?? {}),
    },
  });
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  if (!response.ok) {
    const body = isJson
      ? ((await response.json().catch(() => ({}))) as { error?: string })
      : {};
    if (response.status === 401 || response.status === 403 || response.redirected) {
      throw new Error(
        body.error
        || "Your sign-in session could not be verified. Sign in again with rabilabrail@gmail.com.",
      );
    }
    throw new Error(
      body.error || `The editorial service returned an error (${response.status}).`,
    );
  }
  if (response.status === 204) return undefined as T;
  if (!isJson) {
    throw new Error(
      "Your sign-in session expired. Sign in again with rabilabrail@gmail.com, then retry.",
    );
  }
  return response.json() as Promise<T>;
}

export function AdminDashboard() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [records, setRecords] = useState<EditorialRecord[]>([]);
  const [activeType, setActiveType] = useState<EditorialType>("saint");
  const [draft, setDraft] = useState<EditorialRecord | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void Promise.all([
        api<AdminSession>("/api/admin/session"),
        api<{ records: EditorialRecord[] }>("/api/admin/records"),
      ])
      .then(([sessionResponse, recordsResponse]) => {
      if (!active) return;
      setSession(sessionResponse);
      setRecords(recordsResponse.records);
      setDraft((current) => {
        if (current?.id) {
          return recordsResponse.records.find((record) => record.id === current.id) ?? null;
        }
        return current;
      });
      })
      .catch((loadError: unknown) => {
      if (!active) return;
      setError(loadError instanceof Error ? loadError.message : "The desk could not be opened.");
      })
      .finally(() => {
      if (!active) return;
      setLoading(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const protectDraft = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", protectDraft);
    return () => window.removeEventListener("beforeunload", protectDraft);
  }, [dirty]);

  const legacyKeys = useMemo(
    () => new Set(legacyEditorialRecords.map((record) => `${record.type}:${record.slug}`)),
    [],
  );
  const allDeskRecords = useMemo(() => {
    const managedKeys = new Set(records.map((record) => `${record.type}:${record.slug}`));
    return [...records, ...legacyEditorialRecords.filter((record) => !managedKeys.has(`${record.type}:${record.slug}`))];
  }, [records]);
  const visibleRecords = useMemo(
    () => allDeskRecords.filter((record) => record.type === activeType),
    [activeType, allDeskRecords],
  );

  const publishedCount = legacyEditorialRecords.length + records.filter(
    (record) => Boolean(record.publishedAt) && !legacyKeys.has(`${record.type}:${record.slug}`),
  ).length;
  const completion = useMemo(
    () => draft ? editorialChecks(draft.type, draft.payload) : [],
    [draft],
  );

  const selectRecord = (record: EditorialRecord) => {
    if (dirty && !window.confirm("Discard the unsaved changes to this record?")) return;
    setDraft(structuredClone(record));
    setActiveType(record.type);
    setDirty(false);
    setNotice("");
    setError("");
  };

  const startRecord = (type: EditorialType) => {
    if (dirty && !window.confirm("Discard the unsaved changes to this record?")) return;
    setActiveType(type);
    setDraft(newRecord(type));
    setDirty(false);
    setNotice("");
    setError("");
  };

  const updatePayload = (payload: EditorialPayload) => {
    setDraft((current) =>
      current
        ? {
            ...current,
            slug: payload.slug,
            title: payload.title.en,
            payload,
          }
        : current,
    );
    setDirty(true);
  };

  const saveDraft = async () => {
    if (!draft) return null;
    setBusy("save");
    setError("");
    setNotice("");
    try {
      const result = await api<{ record: EditorialRecord }>("/api/admin/records", {
        method: "POST",
        body: JSON.stringify({
          id: draft.isLegacy ? undefined : draft.id || undefined,
          type: draft.type,
          slug: draft.slug,
          title: draft.title,
          payload: draft.payload,
        }),
      });
      setDraft(result.record);
      setRecords((current) => {
        const remaining = current.filter((record) => record.id !== result.record.id);
        return [result.record, ...remaining];
      });
      setDirty(false);
      setNotice("Draft saved. The public archive has not changed.");
      return result.record;
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "The draft could not be saved.");
      return null;
    } finally {
      setBusy("");
    }
  };

  const changePublication = async (action: "publish" | "unpublish") => {
    if (!draft) return;
    let target = draft;
    if (action === "publish" && (dirty || draft.isLegacy || !draft.id)) {
      const saved = await saveDraft();
      if (!saved) return;
      target = saved;
    }
    if (!target.id) return;
    setBusy(action);
    setError("");
    setNotice("");
    try {
      const result = await api<{ record: EditorialRecord }>(
        `/api/admin/records/${target.id}/${action}`,
        { method: "POST", body: "{}" },
      );
      setDraft(result.record);
      setRecords((current) =>
        current.map((record) => (record.id === result.record.id ? result.record : record)),
      );
      setNotice(
        action === "publish"
          ? "Published. The record is now available to the public archive."
          : "Removed from the public archive. The draft remains here.",
      );
    } catch (publicationError) {
      setError(
        publicationError instanceof Error
          ? publicationError.message
          : "The publication state could not be changed.",
      );
    } finally {
      setBusy("");
    }
  };

  const removeRecord = async () => {
    if (!draft?.id) return;
    if (!window.confirm(`Permanently delete “${draft.title}”? This cannot be undone.`)) return;
    setBusy("delete");
    try {
      await api<void>(`/api/admin/records/${draft.id}`, { method: "DELETE" });
      setRecords((current) => current.filter((record) => record.id !== draft.id));
      setDraft(null);
      setDirty(false);
      setNotice("The record was deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "The record could not be deleted.");
    } finally {
      setBusy("");
    }
  };

  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const result = await api<{ url: string }>("/api/admin/media", {
      method: "POST",
      body: form,
    });
    return result.url;
  };

  if (loading) {
    return (
      <main className={styles.loading} lang="en" dir="ltr" data-no-translate>
        <span>ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ</span>
        <p>Opening the editorial register…</p>
      </main>
    );
  }

  return (
    <main className={styles.shell} lang="en" dir="ltr" data-no-translate>
      <header className={styles.topbar}>
        <div>
          <span className={styles.mark} lang="syr" dir="rtl">ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ</span>
          <div>
            <p>The Paradise of the Fathers</p>
            <h1>Editorial desk</h1>
          </div>
        </div>
        <div className={styles.topbarActions}>
          <span className={styles.securityState}>
            {session?.email || "Authorized account"}
          </span>
          <a href="https://rabil-ibraiel.github.io/paradise-of-the-fathers/" target="_blank" rel="noreferrer">
            View public archive ↗
          </a>
        </div>
      </header>

      <div className={styles.workspace}>
        <aside className={styles.ledger} aria-label="Editorial records">
          <div className={styles.ledgerIntro}>
            <p>Collection register</p>
            <strong>{allDeskRecords.length}</strong>
            <span>{publishedCount} published</span>
          </div>
          <div className={styles.typeSwitch} role="group" aria-label="Record type">
            <button className={activeType === "saint" ? styles.active : ""} type="button" onClick={() => setActiveType("saint")}>Saints</button>
            <button className={activeType === "book" ? styles.active : ""} type="button" onClick={() => setActiveType("book")}>Books</button>
          </div>
          <button className={styles.newRecord} type="button" onClick={() => startRecord(activeType)}>
            <span aria-hidden="true">＋</span> Add {activeType}
          </button>
          <nav className={styles.recordList} aria-label={`${activeType} drafts and publications`}>
            {visibleRecords.length ? (
              visibleRecords.map((record, index) => (
                <button
                  className={draft?.id === record.id ? styles.selectedRecord : ""}
                  type="button"
                  onClick={() => selectRecord(record)}
                  key={record.id}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{record.title}</strong>
                  <small>{record.isLegacy ? "existing site" : record.status === "draft" && (record.publishedAt || legacyKeys.has(`${record.type}:${record.slug}`)) ? "draft · public version" : record.status}</small>
                </button>
              ))
            ) : (
              <p className={styles.emptyList}>No {activeType}s have been added through the desk yet.</p>
            )}
          </nav>
        </aside>

        <section className={styles.editor}>
          {error ? <div className={styles.error} role="alert">{error}</div> : null}
          {notice ? <div className={styles.notice} role="status">{notice}</div> : null}
          {draft ? (
            <>
              <header className={styles.editorHeader}>
                <div>
                  <p>{draft.type === "saint" ? "Saint record" : "Book record"}</p>
                  <h2>{draft.title || `Untitled ${draft.type}`}</h2>
                  <span>{draft.isLegacy ? "Existing website record · save to import it" : draft.id ? `Last saved ${new Date(draft.updatedAt).toLocaleString()}` : "New unsaved record"}</span>
                </div>
                <button type="button" disabled={!dirty || busy === "save"} onClick={() => void saveDraft()}>
                  {busy === "save" ? "Saving…" : dirty ? "Save draft" : "Draft saved"}
                </button>
              </header>
              {draft.type === "saint" ? (
                <AdminSaintEditor
                  value={draft.payload as EditorialSaint}
                  onChange={updatePayload}
                  onUpload={uploadImage}
                />
              ) : (
                <AdminBookEditor
                  value={draft.payload as EditorialBook}
                  onChange={updatePayload}
                  onUpload={uploadImage}
                />
              )}
            </>
          ) : (
            <div className={styles.welcome}>
              <span lang="syr" dir="rtl">ܟܬܒ ܠܕܘܟܪܢܐ</span>
              <p>Write for remembrance</p>
              <h2>Choose a record—or begin a new life or book.</h2>
              <div>
                <button type="button" onClick={() => startRecord("saint")}>Add a saint</button>
                <button type="button" onClick={() => startRecord("book")}>Add a book</button>
              </div>
            </div>
          )}
        </section>

        <aside className={styles.publishRail} aria-label="Publication readiness">
          <p>Publication folio</p>
          {draft ? (
            <>
              <div className={styles.statusSeal} data-status={draft.status}>
                <span>{draft.isLegacy ? "existing record" : draft.status === "draft" && (draft.publishedAt || legacyKeys.has(`${draft.type}:${draft.slug}`)) ? "draft revision" : draft.status}</span>
                <strong>{draft.isLegacy ? "Import this record to edit it" : draft.publishedAt ? "A public snapshot is visible" : legacyKeys.has(`${draft.type}:${draft.slug}`) ? "The existing site version remains visible" : "Private working copy"}</strong>
              </div>
              <div className={styles.checklist}>
                {completion.map(({ label, complete }) => (
                  <div data-complete={complete} key={label}>
                    <span aria-hidden="true">{complete ? "✓" : "—"}</span>
                    <p>{label}<span className={styles.srOnly}> — {complete ? "Complete" : "Incomplete"}</span></p>
                  </div>
                ))}
              </div>
              <div className={styles.publishActions}>
                {draft.publishedAt ? (
                  <button type="button" disabled={dirty || busy === "unpublish"} onClick={() => void changePublication("unpublish")}>
                    Remove from archive
                  </button>
                ) : null}
                {draft.status !== "published" ? (
                  <button
                    className={styles.publishButton}
                    type="button"
                    disabled={Boolean(busy)}
                    onClick={() => void changePublication("publish")}
                  >
                    {busy === "publish" ? "Publishing…" : dirty || draft.isLegacy || !draft.id ? "Save & publish" : "Publish to archive"}
                  </button>
                ) : null}
                <button className={styles.deleteButton} type="button" disabled={!draft.id || draft.isLegacy || busy === "delete"} onClick={() => void removeRecord()}>
                  Delete record
                </button>
              </div>
              {dirty ? <small>Save the current changes before publishing.</small> : null}
              {completion.some((check) => !check.complete) ? <small>The checklist is editorial guidance; it does not block publication.</small> : null}
            </>
          ) : (
            <p className={styles.railEmpty}>Publication checks appear when a record is open.</p>
          )}
        </aside>
      </div>
    </main>
  );
}
