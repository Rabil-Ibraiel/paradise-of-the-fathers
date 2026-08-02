---
version: 1
slug: "app-admin-page-tsx"
primary_target: "app/admin/page.tsx"
related_targets: ["app/components/admin-dashboard.tsx"]
---

## Surface
Private editorial desk for The Paradise of the Fathers.

## Intent
Operate, verify, and deliberately publish researched saint lives and book records without exposing drafts.

## User
One trusted owner-editor working on desktop most of the time, with occasional tablet access. The editor needs clear provenance prompts and must never confuse saving with publishing.

## Structure
A three-pane editorial register: collection ledger on the left, active folio form in the center, persistent publication rail on the right. On narrower screens, the ledger becomes a horizontal opening section and the publication rail becomes an anchored closing panel.

## Core tasks
Choose or create a saint or book; enter English, Arabic, and Assyrian Alqosh Syriac text; upload a properly attributed image; build sourced narrative chapters; save a private draft; inspect completeness; publish, unpublish, or delete deliberately.

## Data and behavior
D1 stores records, publication snapshots, events, and the optional network lock. R2 stores uploaded JPG, PNG, and WebP media. Saving a published record creates a new draft while the last published snapshot remains public. Publishing replaces that snapshot. The dashboard uses owner authentication and has no analytics.

## Visual direction
An East Syriac working register, not a generic SaaS dashboard: deep church green, paper and parchment fields, oxblood actions, lapis status accents, ruled separators, directory numbering, display serif for editorial hierarchy, workhorse sans for controls, and Assyria Alqosh only for Syriac.

## Accessibility
Visible labels, generous fields, keyboard focus rings, no color-only status, minimum practical touch targets, responsive reflow, and reduced-motion support.
