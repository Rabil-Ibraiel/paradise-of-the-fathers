# The Paradise of the Fathers

A manuscript-inspired digital archive devoted to the saints, martyrs, teachers,
missionaries, and spiritual heritage of the Church of the East.

**Live website:**  
https://aceya-saints.rabilibraiel.chatgpt.site

## About the project

The name comes from the established English title of the Syriac work
**ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ**—*The Paradise of the Fathers*. The visual direction
combines the warmth of illuminated Syriac manuscripts with the clarity of a
modern museum archive.

The current experience includes:

- A fully responsive editorial homepage
- Manuscript-inspired original saint illustrations
- Interactive filters for missionaries, teachers, monastics, and martyrs
- Profiles for six saints of the Church of the East
- A historical journey through Edessa, Seleucia-Ctesiphon, Nisibis, Nineveh,
  and Beth Abhe
- A section explaining the Syriac book behind the project name
- Keyboard-friendly navigation and reduced-motion support

## Technology

- React 19
- Next.js 16
- Vinext and Vite
- TypeScript
- Tailwind CSS 4
- Cloudflare-compatible Worker output

## Run locally

### Requirements

- Node.js 22.13 or newer
- npm
- On Windows, use Git Bash or WSL for the included shell-based build scripts

### Development

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal.

### Production build

```bash
npm run build
```

The build creates a validated Cloudflare-compatible artifact under `dist/`.

## Important folders

```text
app/             Website components, content, and styling
public/images/   Original editorial saint illustrations
public/          Favicon and public assets
scripts/         Installation and build validation scripts
tests/           Rendered HTML validation
```

## Content notes

The saint portraits are respectful editorial interpretations, not claims of
historically verified likenesses. Historical summaries should be reviewed by a
Church authority before the archive is expanded or publicly presented as an
official ecclesial resource.

## Repository status

This repository contains the clean source of the deployed version. Dependency
folders, local caches, generated builds, credentials, and source-control history
are intentionally excluded.

