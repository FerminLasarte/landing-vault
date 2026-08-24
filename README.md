# landing-vault

Marketing site for **Vault**, a local-first personal finance desktop app. The
site's job is to explain the local-first argument and hand the visitor the
right installer for their platform.

The app itself lives in a separate repository:
[`vault-ai`](https://github.com/FerminLasarte/vault-ai).

## Tech stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, with the design tokens of the desktop app
- **Fonts**: Geist and Geist Mono via `next/font`
- **Icons**: [lucide-react](https://lucide.dev/), the same set the app uses
- **Downloads**: the GitHub Releases API of
  [`vault-ai`](https://github.com/FerminLasarte/vault-ai), read at build time
  and revalidated hourly

No animation, form or state library: the reveal transitions, the theme toggle
and the platform detection are each a few lines of platform API. See
[Conventions](#conventions).

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000 and needs no configuration: the release
feed it reads is public and unauthenticated.

## Environment variables

None. The only external call the site makes is to the public release feed, and
that needs no key.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```
src/
  app/
    layout.tsx        Root layout, metadata, theme and platform boot script
    page.tsx          Composes the sections, in page order
    globals.css       Design tokens, motion system, platform blocks
    icon.svg          Favicon, with its own dark-mode palette
    favicon.ico       Raster fallback, 16/32/48
    apple-icon.png    Home-screen icon, 180x180
  components/
    sections/         One file per section of the page
    ui/               Shared primitives (container, section, button, app-shot, logo)
    site-header.tsx   Sticky header
    site-footer.tsx   Footer
    theme-toggle.tsx  Light/dark switch
    motion-runtime.tsx  Scroll reveals and header state, one mount for the page
    download.tsx      The download buttons, used in the hero and the closing CTA
  lib/
    site.ts           Product name, domain, repo, nav — edit here, not inline
    release.ts        Reads the latest release off the GitHub API
    reveal.ts         Stagger helper
    utils.ts          `cn`
public/
  screenshots/        App captures, light and dark
```

## Conventions

### Design

The palette, radii and typography mirror the desktop app's token set
(`src/index.css` in `vault-ai`): pure neutrals in OKLCH, red reserved for
errors, `0.625rem` base radius. There is no brand colour, deliberately — the
product's restraint is its identity. No gradients, shadows, or glass effects.

Interface copy is in Spanish (rioplatense), matching the app's own language
policy. Code and comments are in English, matching the app's codebase.

### The logo

`ui/logo.tsx` is the app's own mark, inlined as a component. It is two-tone by
construction: the body is `currentColor`, so it takes the colour of the text it
sits beside, and the cut-outs are filled with `var(--background)` rather than a
hardcoded white. That is what lets one copy of the markup read correctly in
both themes — do not fork it into a light and a dark file.

The icons under `app/` are generated from the same source, and they cannot use
custom properties: `icon.svg` carries its own `prefers-color-scheme` block so
the mark stays visible in a dark browser chrome, and the raster fallbacks ship
the light-mode look, which is what a bookmark bar or an iOS home screen renders
it against.

All of them sit on a **square** canvas, which the mark itself is not — it is
299.54 × 288.8, so it gets centred on a 320 box (370 for the Apple icon, whose
corners iOS masks off). Square matters beyond taste: Google Search wants a 1:1
favicon and resizes it to 48px, so a rectangular one is at the mercy of its
crop. Regenerating them means redoing that padding, not just re-exporting.

### Downloads

Asset URLs are never written into the site. Every file name carries the version
(`Vault_1.0.2_universal.dmg`), so a hardcoded link is a 404 waiting for the next
release. `lib/release.ts` reads
`/repos/FerminLasarte/vault-ai/releases/latest` instead and matches by suffix —
`.dmg` for macOS, `-setup.exe` for Windows with the `.msi` as the alternative —
skipping `latest.json`, the `.sig` files and `.app.tar.gz`, which belong to the
app's own updater rather than to a person.

The call is a cached `fetch` with `revalidate: 3600`, so the page stays fully
static: a new release appears on the site within the hour, and the
unauthenticated GitHub rate limit is never in play no matter the traffic. When
the lookup fails, every link falls back to the release page — one extra click,
never a wrong file.

Which platform leads is decided by the boot script in `layout.tsx`, which tags
`<html>` with `os-mac` or `os-win` before first paint; `globals.css` shows the
matching block. Doing it in CSS rather than in an effect keeps the right button
on screen in the first frame. Linux, phones and JavaScript-less visitors fall
through to a block offering both platforms, since the release builds for
neither of theirs.

The unsigned-app warning under the buttons is required copy, not decoration:
the app ships without Apple or Microsoft certificates, so the first launch is
blocked on both platforms. Removing that paragraph turns a two-click detour
into a bug report.

Two rules about the buttons themselves, both easy to "improve" back into a bug:

- **A plain `<a href>`, never `target="_blank"`.** The assets are served with
  `content-disposition: attachment`, so the browser downloads without
  navigating — a new tab would open empty and close itself, which reads as a
  glitch.
- **The file is never fetched from JavaScript.** The API is only used to learn
  the URL and put it in the `href`. Downloading it by script means fighting
  CORS and losing the browser's own progress bar for a 13 MB file.

The site collected waitlist emails before the app shipped; that whole path —
the form, its Server Action and the Resend client — was removed when the first
release went out. If a release-announcement list is ever wanted, it starts from
scratch rather than from "coming soon" copy on a page that offers a download.

### Motion

Sections stay Server Components and only carry a `data-reveal` attribute;
`motion-runtime.tsx` wires all of them from a single mount. Three variants,
defined in `globals.css`: the default rise-and-fade, `shot` for screenshots, and
`row` for table rows.

The reveal styles hang off a `js` class set before first paint, and the runtime
falls back to a geometry check rather than depending on `IntersectionObserver`
alone — an element that never gets revealed would stay invisible, so the failure
mode is content-first by construction.

### Screenshots

`AppShot` resolves `public/screenshots/<name>-light.png` and `<name>-dark.png`,
reads the dimensions out of the PNG header, and falls back to a labelled
placeholder when a capture is missing. Both themes are required: the site
follows the visitor's theme, and a mismatched capture reads as a broken image.

Captures are taken against a throwaway database seeded with fictional data, so
no real financial information is ever on screen. The app resolves its data
directory from the `identifier` in `src-tauri/tauri.conf.json`, so pointing that
at a different value opens the app against an empty database without touching
the real one.

## Deployment

A standard Next.js app, and the page is fully static with an hourly
revalidation. Nothing to configure: no environment variables, no secrets, and
the only external call is the public release feed.
