# landing-vault

Marketing website for `vault-ai`, a local-first personal finance desktop app (Tauri + React, SQLite, no backend server). This repo is separate from the app's codebase.

## Product

A local-first personal finance app. Desktop (Tauri), no backend server, all data stored on-device in SQLite. Privacy and ownership of your data are core to the pitch. AI-assisted features are on the roadmap but not yet shipped — don't present "AI" as a current capability.

## Design

The site is being redesigned from scratch. There is no inherited visual identity: design direction comes from the installed design skills (`design-taste-frontend`, `impeccable`, `emil-design-eng`), not from earlier decisions in this repo. Existing styles, tokens and components are not constraints — keep, change or remove them on their merits.

## Copy

- All end-user-facing copy is in **Spanish** (rioplatense), matching the app's own UI language policy.
- Code and comments are in English.

## Engineering priorities

Good practices and efficient code come first; a visual effect is never a reason to compromise them.

- Server Components by default. Client components only where interaction requires it, kept small and at the leaves.
- Ship as little JavaScript as possible. Prefer CSS and platform APIs over libraries; add a dependency only when it clearly earns its weight.
- One source of truth per concern: shared primitives in `src/components/ui`, content and config in `src/lib/site.ts`. No duplicated markup or magic values scattered inline.
- Semantic HTML and accessibility are requirements: keyboard navigation, visible focus, sufficient contrast, `prefers-reduced-motion` respected.
- Performance budget: static rendering, optimized images, no layout shift, fonts via `next/font`.
- Remove dead code, unused styles and unused assets rather than leaving them behind.
- `npm run lint` and `npm run build` must pass before any commit.

## Functional constraints

These are behavior, not design, and survive any redesign. Details and rationale in [README.md](README.md#downloads):

- Download links come from `lib/release.ts` (GitHub Releases API); never hardcode asset URLs.
- Download buttons are plain `<a href>`, never `target="_blank"`, and the file is never fetched from JavaScript.
- The unsigned-app warning next to the download buttons is required copy.
- The leading platform is chosen before first paint (boot script in `layout.tsx` + CSS), not in an effect.
- Screenshots must exist in both light and dark variants and use fictional data only.
