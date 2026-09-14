import { existsSync, openSync, readSync, closeSync, readdirSync } from "node:fs";
import path from "node:path";

import { cache } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

// Captures live in public/screenshots, one pair per screen. Both halves are
// required: the site follows the visitor's theme, and a light screenshot on a
// dark page reads as a bug. They are captures of the real macOS window, taken
// at 2880px wide. See tools/screenshots.

// Reads width and height out of the PNG header (IHDR is always the first chunk,
// so the first 24 bytes are enough). The captures are trimmed to their content
// and do not share one aspect ratio.
function readPngSize(file: string): { width: number; height: number } | null {
  const buffer = Buffer.alloc(24);
  let fd: number | undefined;

  try {
    fd = openSync(file, "r");
    if (readSync(fd, buffer, 0, 24, 0) < 24) return null;
    if (buffer.toString("ascii", 1, 4) !== "PNG") return null;

    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  } catch {
    return null;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}

// Capture files carry a hash of their own contents
// ("estadisticas-light.a1b2c3d4.png"), so replacing one changes its URL and no
// cache can keep serving the old bytes. The hash is put there by
// tools/screenshots/import.sh; the directory is read here so the component
// never has to be told what it is.
const SHOT_PATTERN = /^(.+?)-(light|dark)(?:\.[0-9a-f]{6,})?\.png$/;

// One `readdir` for the whole render. The page is static, so this happens at
// build time.
const readShotIndex = cache((): Map<string, string> => {
  const index = new Map<string, string>();
  const dir = path.join(process.cwd(), "public", "screenshots");
  if (!existsSync(dir)) return index;

  for (const file of readdirSync(dir)) {
    const match = SHOT_PATTERN.exec(file);
    if (match) index.set(`${match[1]}-${match[2]}`, file);
  }
  return index;
});

function findShot(name: string) {
  const index = readShotIndex();
  const lightFile = index.get(`${name}-light`);
  const darkFile = index.get(`${name}-dark`);
  if (!lightFile || !darkFile) return null;

  const size = readPngSize(path.join(process.cwd(), "public", "screenshots", lightFile));
  if (!size) return null;

  return {
    light: `/screenshots/${lightFile}`,
    dark: `/screenshots/${darkFile}`,
    ...size,
  };
}

// A window-shaped frame for captures of the desktop app.
//
// `important` raises the fetch priority but does not preload. A preload would
// fetch both themes up front, two 2880px images for one that is shown; left
// lazy, the variant hidden by `display: none` is never requested at all.
//
// `zoomOnPhone` crops a phone-width frame to the top of the window at nearly
// twice the scale: a whole 2880px window at 342px leaves the interface
// unreadable, while its header and first rows at this size can be read. The
// shift skips the app's sidebar (the left 17% of every capture), which puts the
// right edge in the gutter between the second and third summary cards instead
// of through an amount.
export function AppShot({
  name,
  alt,
  important = false,
  zoomOnPhone = false,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  name: string;
  alt: string;
  important?: boolean;
  zoomOnPhone?: boolean;
  className?: string;
  sizes?: string;
}) {
  const shot = findShot(name);
  // The captures include the real macOS window, whose corners are transparent
  // and rounder than this frame. The sliver between the two arcs shows this
  // colour, so it matches the app's own window background in each theme.
  const frame = cn(
    "overflow-hidden rounded-xl border border-rule bg-white dark:bg-[#0a0a0a]",
    zoomOnPhone && "max-sm:aspect-[4/3]",
    className,
  );
  const zoom = zoomOnPhone && "max-sm:-ml-[31%] max-sm:w-[185%] max-sm:max-w-none";

  if (!shot) {
    return (
      <div className={cn(frame, "border-dashed bg-paper dark:bg-paper")}>
        <div className="flex items-center justify-center" style={{ aspectRatio: "2880 / 1784" }}>
          <p className="px-6 text-center text-sm text-fade">
            {alt}
            <br />
            <span className="font-mono text-xs">
              {name}-light / {name}-dark
            </span>
          </p>
        </div>
      </div>
    );
  }

  // `alt` stays on each element rather than in the shared object, so the a11y
  // lint rule can see it.
  const image = {
    width: shot.width,
    height: shot.height,
    sizes,
    fetchPriority: important ? ("high" as const) : undefined,
  };

  return (
    <div className={frame}>
      <Image
        {...image}
        alt={alt}
        src={shot.light}
        className={cn("h-auto w-full dark:hidden", zoom)}
      />
      <Image
        {...image}
        alt={alt}
        src={shot.dark}
        className={cn("hidden h-auto w-full dark:block", zoom)}
      />
    </div>
  );
}
