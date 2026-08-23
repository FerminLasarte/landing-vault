import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MotionRuntime } from "@/components/motion-runtime";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.fullName,
    template: `%s — ${site.name}`,
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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Runs before first paint so a visitor who prefers dark mode never sees a
// white flash. Kept as a raw string on purpose: React would otherwise defer it
// to hydration, which is exactly too late.
const bootScript = `
(function () {
  var root = document.documentElement;
  // Marks that scripting is available. The reveal styles hang off this class,
  // so a visitor without JavaScript gets the page fully visible rather than a
  // column of elements stuck at opacity 0.
  root.classList.add("js");
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) root.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <MotionRuntime />
      </body>
    </html>
  );
}
