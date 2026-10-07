import { ImageResponse } from "next/og";

import { LOGO_BODY, LOGO_CUTS, LOGO_VIEWBOX } from "@/components/ui/logo";
import { site } from "@/lib/site";

// The link preview: the site's receipt hanging from the top edge of the card,
// with the mark, the tagline and one printed line. Rendered once at build
// time; Next wires it into og:image and twitter:image on its own.

export const alt = site.fullName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Light theme values from globals.css. Satori cannot read CSS variables.
const color = {
  ground: "#eeefec",
  paper: "#fbfbfa",
  ink: "#1e1f22",
  fade: "#62646a",
  // `.receipt hr` and the leaders mix ink with transparency.
  dash: "rgb(30 31 34 / 0.35)",
  dot: "rgb(30 31 34 / 0.45)",
  accent: "#c92a62",
};

const PLATFORMS = { label: "Para", value: "macOS y Windows" };
const LEADER = ".".repeat(80);

// Satori takes static TTF/OTF only, not the variable files next/font serves.
// Google instances the font server-side and `text` trims it to the glyphs the
// card prints. 112.5 is the named width closest to the site's `font-wide`.
async function googleFont(family: string, axes: string, text: string) {
  const query = `family=${family}:${axes}&text=${encodeURIComponent(text)}`;
  const css = await fetch(`https://fonts.googleapis.com/css2?${query}`, {
    cache: "force-cache",
  }).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`No static font file for ${family}`);
  return fetch(url, { cache: "force-cache" }).then((res) => res.arrayBuffer());
}

// The serrated bottom edge of `.receipt` in globals.css: square-cornered teeth,
// half as deep as they are wide. TOOTH has to divide SHEET_WIDTH.
const TOOTH = 20;
const SHEET_WIDTH = 1040;
const teeth = Array.from(
  { length: SHEET_WIDTH / TOOTH },
  (_, i) => `${i * TOOTH},0 ${i * TOOTH + TOOTH / 2},${TOOTH / 2} ${(i + 1) * TOOTH},0`,
).join(" ");

export default async function Image() {
  // The header is set in capitals, and the subset has to carry those glyphs.
  const wideText = `${site.name.toUpperCase()}${site.tagline}`;
  const monoText = `${PLATFORMS.label}${PLATFORMS.value}.`;
  const sentences = site.tagline.split(/(?<=\.) /);
  const [archivo, martian] = await Promise.all([
    googleFont("Archivo", "wdth,wght@112.5,600", wideText),
    googleFont("Martian+Mono", "wght@400", monoText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          background: color.ground,
          fontFamily: "Archivo",
          color: color.ink,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: SHEET_WIDTH }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: color.paper,
              padding: "80px 72px 72px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <svg width={40} height={39} viewBox={LOGO_VIEWBOX}>
                <path fill={color.ink} d={LOGO_BODY} />
                {LOGO_CUTS.map((d) => (
                  <path key={d} fill={color.paper} d={d} />
                ))}
              </svg>
              <span style={{ fontSize: 30, letterSpacing: "0.04em" }}>
                {site.name.toUpperCase()}
              </span>
            </div>

            {/* One sentence per line: satori has no `text-wrap: balance`, and
                left to itself it strands a word of the second sentence at the
                end of the first. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 48,
                fontSize: 66,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              {sentences.map((sentence, i) => (
                <span key={sentence} style={{ color: i === 0 ? color.ink : color.fade }}>
                  {sentence}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                marginTop: 48,
                paddingTop: 32,
                borderTop: `2px dashed ${color.dash}`,
                fontFamily: "Martian Mono",
                fontSize: 24,
              }}
            >
              <span style={{ flexShrink: 0, color: color.fade }}>{PLATFORMS.label}</span>
              {/* Satori has no dotted borders, nor repeating backgrounds: the
                  leader is a run of periods, clipped to whatever room is left. */}
              <span
                style={{
                  flexGrow: 1,
                  flexBasis: 0,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.1em",
                  color: color.dot,
                }}
              >
                {LEADER}
              </span>
              <span style={{ flexShrink: 0, color: color.accent }}>{PLATFORMS.value}</span>
            </div>
          </div>
          <svg width={SHEET_WIDTH} height={TOOTH / 2} viewBox={`0 0 ${SHEET_WIDTH} ${TOOTH / 2}`}>
            <polygon fill={color.paper} points={teeth} />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 600, style: "normal" },
        { name: "Martian Mono", data: martian, weight: 400, style: "normal" },
      ],
    },
  );
}
