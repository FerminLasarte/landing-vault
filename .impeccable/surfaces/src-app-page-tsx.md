---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/sections"]
---

## Scope

The whole landing page (`src/app/page.tsx` and its sections). Mode: Persuade. Build path: code-led (no image generation available).

## Audience and job

Argentinians who keep their money in a spreadsheet or notebook. They must understand what Vault is, believe their data stays on their computer, and download the right installer. Proof: real app screenshots (fictional data), the public source code, and the stated trade-offs.

## Direction contract

THESIS: Every movement leaves a receipt, and you keep it. The page is a strip of thermal paper that prints as you scroll: proof in your hand, not in someone's cloud. It refuses the category default of a centered SaaS hero over a floating dashboard and grids of equal feature cards.

OWN-WORLD: Cool thermal white paper objects on a cool light-grey ground; thermal black ink that fades to grey for secondary lines; torn serrated edges; dotted leaders between item and value; a single roll-end pink accent spent once per screen. Archivo at expanded width for headers (the printer's double-width line), Archivo normal for prose, Martian Mono only for amounts, dates and data lines. Dark mode dims the paper instead of inverting it.

STORY: The visitor recognizes their monthly expenses as a familiar ticket, sees the real app behind it, understands that the file never leaves their computer (compared ticket to ticket against cloud apps), gets straight answers to the objections, and tears off the stub: the download.

FIRST VIEWPORT: Left, a two-line expanded headline and a sentence of under 20 words, with the platform download button below. Right, a Vault receipt printing line by line on load: September's expenses by category (labelled sample data), the MEP rate with its origin printed beside it, the total, and where the file is stored, ending in a torn edge. The real app capture starts right below, attached to the ticket.

FORM: El comprobante, position 5 on the ordered list (1 planilla, 2 cuaderno Rivadavia, 3 pizarra de cotizaciones, 4 sobres del mes, 5 comprobante térmico, 6 el archivo en tu escritorio, 7 bóveda). Seed key 7d905ecd. Raises: no two sections share a composition (bolted book); the accent appears once per screen (civic prospectus); every figure carries its printed origin (moon bazaar); the unsigned-app warning is a designed warning state on the ticket (chromatophore); the receipt stays whole at every size while surroundings restack (minihompy). Signature interaction: the thermal print feed of the hero receipt; motion grammar: paper feeds downward, nothing else performs.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Constraints

Functional constraints in CLAUDE.md (release feed, plain `<a href>` downloads, unsigned-app warning, platform chosen before first paint, light and dark captures). Copy in rioplatense Spanish, no em-dashes, no invented claims.
