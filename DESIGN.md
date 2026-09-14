---
name: Vault
description: The landing page of a local-first personal finance app, printed as a strip of thermal paper you keep.
colors:
  stamp-ink: "#c92a62"
  stamp-ink-night: "#f0689a"
  stamp-ink-dimmed: "#9e1d4b"
  desk-grey: "#eeefec"
  thermal-paper: "#fbfbfa"
  thermal-ink: "#1e1f22"
  faded-ink: "#62646a"
  hairline: "#d5d7d3"
  night-desk: "#111213"
  night-sheet: "#1b1c1e"
  night-ink: "#ecedea"
  night-fade: "#9b9da2"
  night-hairline: "#2e3033"
  dimmed-paper: "#c9cac6"
  dimmed-fade: "#4a4c51"
  dimmed-hairline: "#a3a5a1"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.1rem + 4.2vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 118"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.25rem + 2vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
    fontVariation: "\"wdth\" 118"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 118"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  button:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
  receipt-heading:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.025em"
    fontVariation: "\"wdth\" 118"
  data:
    fontFamily: "\"Martian Mono\", ui-monospace, \"SF Mono\", Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.75
    fontFeature: "\"tnum\" 1"
    fontVariation: "\"wdth\" 87.5"
rounded:
  paper: "0px"
  control: "10px"
  capture: "12px"
spacing:
  tooth: "14px"
  gutter: "24px"
  gutter-wide: "32px"
  column-gap: "40px"
  stack: "24px"
  block: "64px"
  section: "96px"
  section-md: "128px"
  section-lg: "160px"
components:
  button-primary:
    backgroundColor: "{colors.thermal-ink}"
    textColor: "{colors.thermal-paper}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-primary-small:
    backgroundColor: "{colors.thermal-ink}"
    textColor: "{colors.thermal-paper}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  button-secondary:
    textColor: "{colors.thermal-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.thermal-paper}"
  icon-button:
    textColor: "{colors.faded-ink}"
    rounded: "{rounded.control}"
    size: "36px"
  nav-link:
    textColor: "{colors.faded-ink}"
    typography: "{typography.label}"
  receipt:
    backgroundColor: "{colors.thermal-paper}"
    textColor: "{colors.thermal-ink}"
    typography: "{typography.data}"
    rounded: "{rounded.paper}"
    padding: "24px 20px 36px"
  receipt-night:
    backgroundColor: "{colors.dimmed-paper}"
    textColor: "{colors.thermal-ink}"
    rounded: "{rounded.paper}"
  stub:
    backgroundColor: "{colors.thermal-paper}"
    textColor: "{colors.thermal-ink}"
    rounded: "{rounded.paper}"
    padding: "56px 24px 40px"
  capture-frame:
    rounded: "{rounded.capture}"
  warning-notice:
    textColor: "{colors.thermal-ink}"
    rounded: "{rounded.control}"
    padding: "20px"
---

# Design System: Vault

## Overview

**Creative North Star: "El comprobante en mano"**

Every movement leaves a receipt, and you keep it. The page is a cool grey desk with thermal-paper objects lying on it: tickets printed in near-black ink that fades to grey on secondary lines, torn along a serrated edge, itemised with dotted leaders between what a thing is and what it came to. The receipt is the proof device. It states the claim ("Guardado en: tu computadora") the way a ticket states a total, and the real app captures hang from it as attachments. Nothing on the desk performs except the paper, which feeds out of the printer a line at a time.

Density is low and deliberate. Prose sits in Archivo at normal width; every heading is set at the printer's double width (Archivo's width axis at 118%); Martian Mono appears only where a receipt would print data. The palette is a narrow band of cool neutrals plus one pink, the stripe at the end of a thermal roll, called Tinta de sello and spent at most once per screen. In the dark the desk goes dark and the paper dims, but it stays paper.

The feel of every control is "Cotidiano y confiable": the everyday objects of a shop counter and a bank slip, familiar enough that a non-technical visitor trusts them, with no decoration a ticket would not carry.

**Key Characteristics:**
- Thermal paper objects (receipts, a closing stub) on one flat grey ground; the paper is the only thing with depth.
- Square paper with a 14px serrated edge; soft 10px controls; 12px capture frames.
- Expanded-width Archivo for headers, normal Archivo for prose, Martian Mono only for amounts and data lines.
- One accent, Tinta de sello, printed as a single value on a receipt, never as UI chrome.
- Dark mode dims the paper to a grey sheet with dark ink; it never inverts it.
- One motion gesture: paper prints downward, in steps, on load or on a scroll timeline.

## Colors

A narrow band of cool, faintly green-grey neutrals, a near-black ink that fades rather than changes hue, and one roll-end pink.

### Primary
- **Tinta de sello** (#c92a62): the stamp ink. Colours exactly one printed value per screen, always a data value on a receipt line (the hero's "tu computadora", the features ticket's "0,00 ARS"). It is never a button, link, border, background or icon colour. On the dark page it lifts to **Tinta de sello, noche** (#f0689a); on the dimmed dark-mode paper it deepens to **Tinta de sello, papel atenuado** (#9e1d4b) so it holds 4.5:1 on the grey sheet.

### Neutral
- **Desk Grey** (#eeefec): the page ground, the sticky header, and the mobile menu sheet. Also the browser theme colour.
- **Thermal Paper** (#fbfbfa): receipts and the closing stub; text on the primary button; hover fill of secondary and icon buttons.
- **Thermal Ink** (#1e1f22): all primary text, the primary button fill, the focus outline, the warning notice border, and the selection background (with paper as its text).
- **Faded Ink** (#62646a): the ink a receipt loses with time. Leads, captions, nav links, secondary receipt lines, metadata. Held above 4.5:1 on both ground and paper.
- **Hairline** (#d5d7d3): the default border colour of every element, list rules, the header rule, the capture frame edge, the secondary button ring.
- **Night Desk** (#111213), **Night Sheet** (#1b1c1e), **Night Ink** (#ecedea), **Night Fade** (#9b9da2), **Night Hairline** (#2e3033): the same five roles on the dark page.
- **Dimmed Paper** (#c9cac6), with **Dimmed Fade** (#4a4c51) and **Dimmed Hairline** (#a3a5a1): the paper tokens re-scoped inside receipts and the stub in dark mode. Ink on dimmed paper stays Thermal Ink (#1e1f22).

### Named Rules
**The Tinta de sello Rule.** The accent is spent at most once per screen, and only as a printed value on paper. If two stamped values can share a viewport, one of them loses the stamp. A second accent colour, or the accent on a control, breaks the system.

**The Dimmed Paper Rule.** Dark mode dims the sheet, it never inverts it: dark ink on a grey sheet on a dark desk. Paper tokens are redefined on the receipt and stub themselves, and those elements set their text colour explicitly, because inherited body colour would stay light on the dimmed sheet.

**The Faded Ink Rule.** Secondary information is carried by fading the ink, not by a new hue or a smaller weight. A whole ticket printed in faded ink (the cloud-app comparison) reads as the receipt you did not keep.

## Typography

**Display Font:** Archivo, variable with the `wdth` axis (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Archivo at normal width (same stack)
**Label/Mono Font:** Martian Mono, variable width (with ui-monospace, SF Mono, Menlo, monospace)

**Character:** A grotesque that can stretch to the double-width line a receipt printer puts at the top of a ticket, paired with a compact monospace that prints the figures. The pairing reads as a till, not a brochure.

### Hierarchy
- **Display** (600, clamp(2.5rem, 1.1rem + 4.2vw, 4.75rem), 1.02, -0.03em, 118% width): the single hero headline, two lines on desktop.
- **Headline** (600, clamp(1.875rem, 1.25rem + 2vw, 3rem), 1.08, -0.025em, 118% width): section headings and the stub heading, balanced, max 48rem measure.
- **Title** (600, clamp(1.375rem, 1.15rem + 0.8vw, 1.75rem), 1.2, -0.015em, 118% width): statements in a ruled list (the verifiable facts).
- **Lead** (400, clamp(1.0625rem, 1rem + 0.3vw, 1.25rem), 1.55): the sentence under a heading, in Faded Ink, max 42rem. FAQ questions use this size at 500.
- **Body** (400, 1rem, 1.625): answers and fact bodies, in Faded Ink, max 32 to 42rem.
- **Label** (400, 0.875rem): nav, captions, footer links, download alternatives. Button text is 0.9375rem at 600.
- **Receipt heading** (600, 0.875rem, 118% width, uppercase, 0.025em): the mark line at the top of a ticket, and a ticket's own totals.
- **Data** (400, Martian Mono at 87.5% width, 0.75rem rising to 0.8125rem from 40rem, 1.75, tabular figures): every line inside a receipt, plus version and file-size metadata beside a download button.

### Named Rules
**The Double-Width Rule.** Every heading, from the hero to a ticket header and the logo wordmark, is Archivo at 118% width and weight 600. Prose never stretches.

**The Printer Mono Rule.** Martian Mono is for amounts, dates, rates and data lines, the things a till prints. It never sets a heading, a sentence of prose, or a button.

**The Two Weights Rule.** Regular (400) and semibold (600) carry the page; medium (500) is reserved for FAQ questions and small sub-labels. Nothing goes bolder than 600.

## Layout

A 12-column grid inside a 1280px container (24px gutters, 32px from 640px), with a 40px column gap on wide screens. A second, wider container (1600px) exists only for the hero capture, which breaks out of the reading measure. Sections share one vertical rhythm: 96px of padding, 128px from 640px, 160px from 1024px. A heading sits 24px above its lead; the content block starts 64px (80px from 640px) below the heading.

Compositions are asymmetric and each section has its own: headline left over 7 columns with the receipt right over 4 or 5; a sticky itemised receipt over 4 columns while captures scroll past over 8; two tickets side by side with the faded one dropped 80px; a ruled list whose statements and bodies split 6 and 5 columns; a sticky heading beside a disclosure list. Sticky elements pin at 96px from the top so they clear the 64px header.

Below 1024px everything restacks to one column. A receipt never scales its contents to fit: it keeps its type and caps its width (24rem in the hero, 28rem in features) while the surroundings restack. Phone captures crop to the top of the window at nearly twice the scale so the interface stays readable.

**The One Ground Rule.** Sections are separated by composition and whitespace, never by a band of colour or a divider between them. Hairlines appear only inside a list (facts, questions) and above the footer.

## Elevation & Depth

The system is flat, with one exception that is part of the world: paper lies on the desk, so receipts and the stub carry a soft two-layer drop shadow. Everything else, including buttons, captures and the header, is flat and distinguished by hairlines. The shadow is drawn with `filter: drop-shadow` on a wrapper, because the serrated mask on the paper itself would clip a shadow drawn on the same element.

### Shadow Vocabulary
- **Paper lift** (`filter: drop-shadow(0 1px 1px rgb(30 31 34 / 0.06)) drop-shadow(0 14px 28px rgb(30 31 34 / 0.08))`): receipts and the stub, on the light desk.
- **Paper lift, night** (`filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.6)) drop-shadow(0 18px 36px rgb(0 0 0 / 0.55))`): the same objects on the dark desk.
- **Header rule** (`box-shadow: 0 1px 0 var(--rule)`): the 1px hairline under the sticky header and the mobile menu sheet; on the header it fades in over the first 4rem of scroll.
- **Control ring** (`box-shadow: inset 0 0 0 1px var(--rule)`): the secondary button's outline, drawn inside so it never shifts layout.

**The Only Paper Lifts Rule.** A shadow means "this is a sheet of paper". Cards, captures, buttons and panels never get one.

## Shapes

**The Square Paper Rule.** Paper has square corners and a torn edge; controls are 10px; captures are 12px. The three radii never swap roles.

The torn edge is a CSS mask: a conic gradient repeated every 14px keeps an upward wedge per tile and drops the corners, leaving a row of teeth. A receipt is torn along its bottom; the closing stub is the same teeth turned over, torn along its top. Controls (buttons, icon buttons, the warning notice) use a soft 10px corner, never a pill. Captures of the app sit in a 12px frame with a 1px hairline, whose fill matches the app window's own background in each theme so the sliver between the two corner arcs never shows. Inside receipts, rules are 1px dashed ink at 35%, and leaders are 1px dotted ink at 45%.

## Components

### Buttons
Everyday and trustworthy: a solid ink slab and an outlined sibling, nothing else.
- **Shape:** soft corners (10px); 13px by 20px padding, 0.9375rem semibold text, 10px gap to a 16px icon.
- **Primary:** Thermal Ink fill with Thermal Paper text. Downloads and the header's "Descargar".
- **Hover / Focus:** primary mixes 16% paper into the ink (pointer devices only, 150ms); secondary gains a paper fill. Press scales to 0.97 over 160ms on the ease-out curve. Focus is a 2px ink outline at 3px offset, site-wide.
- **Secondary:** transparent with an inset 1px hairline ring and ink text; the second platform download and "Ver el código en GitHub".
- **Small:** 8px by 14px padding, 0.875rem, in the header.
- **Icon button:** 36px square, 10px corners, Faded Ink icon turning to ink on a paper fill on hover (theme toggle, mobile menu).

### Links
- **Style:** text in the current colour with a 1px Hairline underline at 0.25em offset; on hover the underline takes the text colour. Nav and footer links are underline-free Faded Ink that turns to ink.

### Receipt (signature component)
- **Paper:** Thermal Paper (Dimmed Paper in dark mode), square, torn bottom edge, paper-lift shadow on a wrapper. Padding 24px 20px 36px, 28px 28px 40px from 640px.
- **Content:** Data type throughout. A receipt-heading line at the top (the logo mark plus the name at double width), dashed rules between groups, and item lines built as a term, a flexible dotted leader, and a right-aligned tabular value. Every figure carries its origin on the line below in Faded Ink ("Origen: API pública, solo lectura"), and sample data is labelled as such on the ticket.
- **Stamp:** at most one value per screen may be printed in Tinta de sello.
- **Motion:** see The Paper Feed Rule.

### Stub
The closing section is a torn-off stub: the receipt's paper and shadow, full container width, torn along its top, square corners, 56px top and 40px bottom padding (80px and 56px from 640px), 24px sides growing to 48px and 64px. It holds a headline and lead on the left and the full download block on the right.

### Capture frame
Real app screenshots, paired light and dark and swapped with the theme, inside a 12px frame with a 1px hairline. Never a stock photo, never a device mockup, never a light capture on the dark page.

### Warning notice
The unsigned-app warning is a designed state, not fine print: a 1px Thermal Ink border, 10px corners, 20px padding, the consequence as one semibold sentence first, then the reason in Faded Ink, numbered steps, and a closing reassurance. In the hero it shrinks to one Faded Ink line with a link to the full procedure.

### Navigation
A sticky 64px header on the Desk Grey ground: the logo mark with the name at double width on the left, three Faded Ink label links in the centre (hidden below 768px), and the theme toggle plus the small primary button on the right. Below 768px a native disclosure opens a full-width sheet of lead-size links on the ground, closed by a 1px hairline.

### Disclosure list
Questions are native disclosures between hairlines: a lead-size question at 500 with a 16px plus icon in Faded Ink that rotates 45 degrees when open (200ms), and the answer in Faded Ink body type. Where the browser can interpolate to `auto`, the answer unfolds over 300ms on the ease-out curve.

### Named Rules
**The Paper Feed Rule.** The page has one gesture: paper printing downward, revealed by a stepped `clip-path` inset from the top. The hero receipt prints on load (1.4s, 22 steps, 250ms delay); every other receipt prints on a `view()` scroll timeline (14 steps) whose range ends at `entry 100%`, so a sticky receipt is fully printed before it pins. No JavaScript scroll listeners. Everything is authored in its final state and the animation only runs under `prefers-reduced-motion: no-preference` and where the browser supports it, so nothing is ever left hidden.

## Do's and Don'ts

### Do:
- **Do** put claims on paper: item, dotted leader, value, with the origin of any figure printed beneath it in Faded Ink.
- **Do** set every heading in Archivo at 118% width, weight 600, and keep prose at normal width.
- **Do** reserve Martian Mono (87.5% width, tabular figures) for amounts, dates, rates, data lines and version metadata.
- **Do** spend Tinta de sello (#c92a62) on one printed value per screen, and swap to #f0689a on the dark page and #9e1d4b on dimmed paper.
- **Do** dim the paper to #c9cac6 with #1e1f22 ink in dark mode, redefining the paper tokens on the receipt itself.
- **Do** keep paper square with the 14px torn edge, controls at 10px and capture frames at 12px.
- **Do** separate sections with composition and whitespace on one shared ground.
- **Do** show the real app, light and dark captures paired, cropped to a readable scale on phones.
- **Do** animate only the paper feed, from a final-state default, on load or a CSS scroll timeline ending at entry 100%.

### Don't:
- **Don't** invert receipts in dark mode; a light-on-dark receipt is one more dark card.
- **Don't** use the accent on buttons, links, borders, icons or backgrounds, and don't introduce a second accent or a brand gradient.
- **Don't** give anything but paper a shadow, and don't use gradients as fills (the conic gradient exists only as the mask that cuts the teeth).
- **Don't** round the paper or turn controls into pills.
- **Don't** set headings, prose or buttons in Martian Mono, or go bolder than 600.
- **Don't** put a label, kicker or number above a heading; the heading carries its own weight.
- **Don't** separate sections with background bands or full-width dividers.
- **Don't** drive motion with JavaScript scroll listeners, start content hidden, or end a scroll-driven range after entry 100% on a sticky element.
- **Don't** use stock photography, device mockups, or a light capture on the dark page.
