# Design brief — marketing website

Reference for building the marketing site in a separate repository, based on the design system of the desktop app `vault-ai`.

## Product one-liner

A local-first personal finance app. Desktop (Tauri), no backend server, all data stored on-device in SQLite. Privacy and ownership of your data are core to the pitch. AI-assisted features are on the roadmap but not yet shipped — don't oversell "AI" as a current capability.

## Design philosophy

Minimalist, elegant, high-end — in the spirit of Notion's clean, content-first UI.

- Clean, uncluttered layouts, generous whitespace over dense ones.
- Restrained, neutral color palette and typography over decorative flourishes.
- Motion and visual effects: subtle and purposeful, never gratuitous.
- When in doubt, remove an element rather than add one.
- No gradients, drop shadows, glow/neon effects, or mesh/noise textures. Flat surfaces.

## Color palette

Grayscale-first. The app defines colors in OKLCH with zero chroma (pure neutrals) except for the destructive/error state. Light and dark mode both supported.

Light mode:
```
background:        oklch(1 0 0)        /* white */
foreground:         oklch(0.145 0 0)    /* near-black text */
primary:             oklch(0.205 0 0)    /* near-black */
primary-foreground: oklch(0.985 0 0)    /* near-white */
secondary / muted / accent: oklch(0.97 0 0)  /* very light gray */
muted-foreground:   oklch(0.556 0 0)    /* mid gray */
border / input:      oklch(0.922 0 0)    /* light gray hairline */
destructive (error): oklch(0.577 0.245 27.325)  /* the one non-neutral color, a red */
```

Dark mode inverts the same scale (background `oklch(0.145 0 0)`, foreground `oklch(0.985 0 0)`, etc.) — see `src/index.css` in the app repo for the full token set if you need exact parity.

**Guidance for the site**: don't introduce a "brand color." The product itself doesn't use one — its restraint *is* the brand. If the site needs one accent for CTAs/links, pick a single muted, low-saturation color and use it sparingly (links, primary button) rather than a vivid gradient or multi-color scheme.

## Typography

- Font: **Geist Variable** (`@fontsource-variable/geist`), sans-serif fallback.
- No decorative or display fonts.
- Keep weight variation minimal — the app uses standard weights, nothing beyond medium/semibold for emphasis.

## Shape and spacing

- Base corner radius: `0.625rem` (~10px), scaled up for larger elements (`radius-xl`, `radius-2xl`, etc. are multiples of the base). Corners are soft but not pill-shaped by default.
- Component library: shadcn/ui primitives (buttons, cards, inputs, dialogs). If replicating any app UI on the site (screenshots, embedded mockups), match this component language rather than inventing new button/card styles.

## Voice and copy

- All end-user-facing copy on the site should be in **Spanish** (the app's target audience), matching the app's own UI language policy.
- Tone: direct, confident, understated — avoid hype language ("revolutionary," "game-changing"), avoid AI buzzword-stacking. Let the privacy/local-first angle and the clean product experience do the persuading.

## What to avoid

- Gradients, glassmorphism, neon/glow effects, dense marketing-site clichés (giant hero gradients, particle backgrounds).
- Stock-photo people/hands-holding-phone imagery — prefer product screenshots or clean abstract graphics.
- Multiple accent colors or a "colorful SaaS" palette — the product's identity is restraint, not vibrancy.
