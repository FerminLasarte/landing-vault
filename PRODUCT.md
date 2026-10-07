# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in Argentina who already keep track of their money by hand, mostly in a spreadsheet (Excel, Google Sheets) or a notebook, and want something more capable without handing their data to a company. They think in pesos and dollars at the same time (dólar MEP), pay in cuotas, and juggle bank accounts, cash and virtual wallets. Not necessarily technical: the site must not assume the visitor knows what SQLite or local-first means.

## Product Purpose

Vault is a desktop app (macOS and Windows) for personal finances: record income, expenses and transfers, see where the money goes, set budgets, plan recurring payments, installments and savings goals. The site's job is to make that offer clear, make the local-first argument in plain language, and hand the visitor the right installer for their platform. Success is a download.

## Positioning

Your finances live in one file on your own computer. No account, no server, no bank credentials, works offline, and the file is yours (standard SQLite, exportable to CSV). A cloud finance app cannot truthfully make this claim. The app's source code is public on GitHub, so the privacy claims can be checked.

## Operating Context

- Visitors compare it, implicitly, against their current spreadsheet and against cloud finance apps.
- Downloads come from the latest GitHub release of `FerminLasarte/vault`; asset names carry the version.
- The app is unsigned on both platforms: the first launch is blocked by the OS and needs a manual override. It updates itself afterwards.

## Capabilities and Constraints

- Shipped: accounts and payment methods; categories with auto-classification rules; tags and attached receipts; CSV import/export; monthly summary and statistics; budgets (monthly or yearly); multiple currencies with the dólar MEP rate; recurring payments that wait for confirmation; installments; savings goals with projection; manual full backups with a reminder after two weeks.
- The only network request the app makes is reading the dólar MEP rate from a public API.
- No sync between devices. Losing the computer without a backup loses the data.
- Free today. If a paid version ever exists, there will be no subscription to access your own data.
- AI-assisted features are on the roadmap, not shipped: never present AI as a current capability.
- Linux is not supported yet.
- Open decision: the repository is public but has no license file. Until one is added, say "el código es público", not "open source".

## Brand Commitments

- Name: Vault. Mark: `src/components/ui/logo.tsx`, the app's own logo.
- Copy in Spanish, rioplatense voseo. Direct and plain; no hype, no AI buzzwords.
- Must not read as a generic SaaS landing, as cold or intimidating to a non-technical visitor, or as a touch-up of the previous site.

## Evidence on Hand

- Real app screenshots, light and dark, with fictional data: `public/screenshots/` (resumen, estadisticas, transacciones, compromisos).
- Public source code: https://github.com/FerminLasarte/vault
- No testimonials, user counts, press or benchmarks exist. Do not invent any.

## Product Principles

- Show the product working; claims come second.
- Honesty over persuasion: state the trade-offs (no sync, unsigned app, backups are on you).
- Plain language first; technical detail is available but never required.
- Downloading must be effortless and correct for the visitor's platform.
