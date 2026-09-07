import { existsSync, openSync, readSync, closeSync, readdirSync } from "node:fs";
import path from "node:path";

import { cache } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

// Captures live in public/screenshots, one pair per screen. Both halves are
// required: the site follows the visitor's theme, and a light
// screenshot on a dark page reads as a bug.
//
// They are captures of the real macOS window — traffic lights and all — taken
// at 2880px wide so the hero, which displays one at up to 1376 CSS px, still
// has two device pixels per CSS pixel to work with. See tools/screenshots.

// Reads width and height out of the PNG header (IHDR is always the first
// chunk, so the first 24 bytes are enough). The captures are trimmed to their
// content and therefore no longer share one aspect ratio — hardcoding a size
// here would squash whichever ones did not match.
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

// Capture files carry a hash of their own contents: "estadisticas-light.a1b2c3d4.png".
//
// Without it, replacing a screenshot leaves the URL untouched, and every cache
// that already answered for that URL keeps answering with the old bytes —
// the browser's, and in production the CDN's, which is the one that matters:
// deploying a new screenshot would show the previous one to visitors until an
// edge decided to revalidate. Deleting the old file changes nothing, because
// the stale copy does not live on disk. A different name is a different URL,
// and a URL nobody has seen cannot be stale.
//
// The hash is put there by tools/screenshots/import.sh; the directory is read
// here so the component never has to be told what it is.
const SHOT_PATTERN = /^(.+?)-(light|dark)(?:\.[0-9a-f]{6,})?\.png$/;

// One `readdir` for the whole render rather than one per capture. This is a
// Server Component and the page is static, so it happens at build time.
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

// A slot with no capture yet falls back to a labelled placeholder instead of a
// broken <img>. This is a Server Component, so the disk access costs nothing at
// runtime — and it can come out once every screenshot exists.
function findShot(name: string) {
  const index = readShotIndex();
  const lightFile = index.get(`${name}-light`);
  const darkFile = index.get(`${name}-dark`);
  if (!lightFile || !darkFile) return null;

  const publicDir = path.join(process.cwd(), "public", "screenshots");
  const size = readPngSize(path.join(publicDir, lightFile));
  if (!size) return null;

  return {
    light: `/screenshots/${lightFile}`,
    dark: `/screenshots/${darkFile}`,
    ...size,
  };
}

interface AppShotProps {
  name: string;
  alt: string;
  priority?: boolean;
  className?: string;
  // Opt into the scroll-linked growth. Off for anything that is already at rest
  // when it appears.
  rise?: boolean;
  sizes?: string;
}

// A window-shaped frame for captures of the desktop app. The hairline border
// and the radius come from the app's own token set, so the screenshot reads as
// a continuation of the page rather than an image pasted onto it.
export function AppShot({
  name,
  alt,
  priority = false,
  className,
  rise = true,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: AppShotProps) {
  const shot = findShot(name);
  const motion = rise ? { "data-rise": "" } : {};
  // `bg-background` rather than `bg-card`: the captures include the real macOS
  // window, whose corners are transparent and rounded tighter than this frame.
  // The sliver between the two arcs shows this colour, and the app's own window
  // background is the page background in both themes — so it disappears.
  const frame = cn(
    "overflow-hidden rounded-2xl border border-border bg-background",
    className,
  );

  if (!shot) {
    return (
      <div {...motion} className={cn(frame, "border-dashed bg-surface")}>
        <div
          className="flex items-center justify-center"
          style={{ aspectRatio: "2880 / 1784" }}
        >
          <p className="px-6 text-center text-sm text-muted-foreground">
            {alt}
            <br />
            <span className="text-xs tabular-nums">
              {name}-light · {name}-dark
            </span>
          </p>
        </div>
      </div>
    );
  }

  // `alt` stays out of the shared object and on each element: spreading it
  // works, but it hides the attribute from the a11y lint rule that exists to
  // catch a missing one.
  const image = {
    width: shot.width,
    height: shot.height,
    sizes,
    priority,
  };

  return (
    <div {...motion} className={frame}>
      <Image {...image} alt={alt} src={shot.light} className="h-auto w-full dark:hidden" />
      <Image
        {...image}
        alt={alt}
        src={shot.dark}
        className="hidden h-auto w-full dark:block"
      />
    </div>
  );
}
