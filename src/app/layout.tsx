import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";

import { site } from "@/lib/site";
import "./globals.css";

// Archivo carries the page; its width axis gives the headers the double-width
// look of a receipt printer. Martian Mono is for amounts and data lines only.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.fullName,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.fullName,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: site.fullName,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eeefec" },
    { media: "(prefers-color-scheme: dark)", color: "#111213" },
  ],
};

// Runs before first paint so a visitor who prefers dark mode never sees a
// light flash, and so the download block leads with the right platform instead
// of swapping under the cursor. Kept as a raw string on purpose: React would
// otherwise defer it to hydration, which is exactly too late.
const bootScript = `
(function () {
  var root = document.documentElement;
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) root.classList.add("dark");
  } catch (e) {}

  // Which download to lead with. Only the two platforms the release builds for
  // get a class; Linux and phones fall through to the block that offers both.
  try {
    // The user agent goes last and is not a luxury: navigator.platform is
    // deprecated and an up-to-date Safari on macOS returns an empty string.
    var platform =
      (navigator.userAgentData && navigator.userAgentData.platform) ||
      navigator.platform ||
      navigator.userAgent ||
      "";
    if (/win/i.test(platform)) {
      root.classList.add("os-win");
    } else if (/mac/i.test(platform) && (navigator.maxTouchPoints || 0) <= 1) {
      // An iPad reports "MacIntel" too; touch points tell them apart, and a
      // tablet has nowhere to put a .dmg.
      root.classList.add("os-mac");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${archivo.variable} ${martian.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
