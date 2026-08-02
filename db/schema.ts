import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const editorialRecords = sqliteTable("editorial_records", {
  id: text("id").primaryKey(),
  type: text("type", { enum: ["saint", "book"] }).notNull(),
  slug: text("slug").notNull().unique(),
  status: text("status", { enum: ["draft", "published"] })
    .notNull()
    .default("draft"),
  title: text("title").notNull(),
  payload: text("payload").notNull(),
  publishedPayload: text("published_payload"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  publishedAt: text("published_at"),
});

export const editorialEvents = sqliteTable("editorial_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  recordId: text("record_id"),
  action: text("action").notNull(),
  actorId: text("actor_id").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const adminSettings = sqliteTable("admin_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
