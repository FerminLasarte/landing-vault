import { existsSync, openSync, readSync, closeSync } from "node:fs";
import path from "node:path";

import Image from "next/image";

import { cn } from "@/lib/utils";

// Captures live in public/screenshots as "<name>-light.png" / "<name>-dark.png".
// Both are required: the site follows the visitor's theme, and a light
// screenshot on a dark page reads as a bug.

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
  // Opt into the reveal transition, and let the caller place it in a stagger.
  reveal?: "shot" | false;
  revealStyle?: React.CSSProperties;
}

// A window-shaped frame for captures of the desktop app. The hairline border
// and the radius come from the app's own token set, so the screenshot reads as
// a continuation of the page rather than an image pasted onto it.
export function AppShot({
  name,
  alt,
  priority = false,
  className,
  reveal = "shot",
  revealStyle,
}: AppShotProps) {
  const shot = findShot(name);
  const frame = cn(
    "overflow-hidden rounded-xl border border-border bg-muted",
    className,
  );
  const motion = reveal ? { "data-reveal": reveal, style: revealStyle } : {};

  if (!shot) {
    return (
      <div
        {...motion}
        className={cn(frame, "flex items-center justify-center border-dashed")}
        style={{ aspectRatio: "2048 / 1285", ...revealStyle }}
      >
        <p className="px-6 text-center text-sm text-muted-foreground">
          {alt}
          <br />
          <span className="font-mono text-xs">
            {name}-light.png · {name}-dark.png
          </span>
        </p>
      </div>
    );
  }

  return (
    <div {...motion} className={frame}>
      <Image
        src={shot.light}
        alt={alt}
        width={shot.width}
        height={shot.height}
        className="h-auto w-full dark:hidden"
        priority={priority}
      />
      <Image
        src={shot.dark}
        alt={alt}
        width={shot.width}
        height={shot.height}
        className="hidden h-auto w-full dark:block"
        priority={priority}
      />
    </div>
  );
}
