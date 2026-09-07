import { existsSync, openSync, readSync, closeSync } from "node:fs";
import path from "node:path";

import Image from "next/image";

import { cn } from "@/lib/utils";

// Captures live in public/screenshots as "<name>-light.png" / "<name>-dark.png".
// Both are required: the site follows the visitor's theme, and a light
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

// A slot with no capture yet falls back to a labelled placeholder instead of a
// broken <img>. This is a Server Component, so the disk access costs nothing at
// runtime — and it can come out once every screenshot exists.
function findShot(name: string) {
  const light = `/screenshots/${name}-light.png`;
  const dark = `/screenshots/${name}-dark.png`;
  const publicDir = path.join(process.cwd(), "public");

  if (!existsSync(path.join(publicDir, dark))) return null;

  const size = readPngSize(path.join(publicDir, light));
  return size ? { light, dark, ...size } : null;
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
            <span className="font-mono text-xs">
              {name}-light.png · {name}-dark.png
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
