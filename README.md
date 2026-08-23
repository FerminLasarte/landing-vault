# landing-vault

Marketing site for **Vault**, a local-first personal finance desktop app. The
site's job is to explain the local-first argument and collect waitlist emails —
the app is not downloadable yet.

The app itself lives in a separate repository:
[`vault-ai`](https://github.com/FerminLasarte/vault-ai).

## Tech stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, with the design tokens of the desktop app
- **Fonts**: Geist and Geist Mono via `next/font`
- **Icons**: [lucide-react](https://lucide.dev/), the same set the app uses
- **Waitlist**: [Resend](https://resend.com/) audiences, called from a Server
  Action

No animation, form or state library: the reveal transitions, the theme toggle
and the waitlist submission are each a few lines of platform API. See
[Conventions](#conventions).

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ and npm

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000. Everything renders without any
configuration — only the waitlist form needs environment variables.

## Environment variables

Copy `.env.example` to `.env.local` and fill it in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key with contacts write access |
| `RESEND_AUDIENCE_ID` | Audience the addresses are added to |

Without them the form renders and validates as usual, but submitting returns a
"try again later" message and logs the missing configuration on the server. The
values are only ever read server-side, inside the Server Action — no key is
exposed to the browser.

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
    layout.tsx        Root layout, metadata, theme boot script
    page.tsx          Composes the sections, in page order
    actions.ts        Server Action behind the waitlist form
    globals.css       Design tokens, motion system
  components/
    sections/         One file per section of the page
    ui/               Shared primitives (container, section, button, app-shot)
    site-header.tsx   Sticky header
    site-footer.tsx   Footer
    theme-toggle.tsx  Light/dark switch
    motion-runtime.tsx  Scroll reveals and header state, one mount for the page
    waitlist-form.tsx   The email field, used twice on the page
  lib/
    site.ts           Product name, domain, nav, contact — edit here, not inline
    waitlist.ts       Where addresses go; swapping providers is this file only
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

A standard Next.js app — the page is fully static apart from the Server Action.
Set the two environment variables in the hosting provider before the waitlist
will accept submissions.
