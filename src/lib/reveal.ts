import type { CSSProperties } from "react";

// Stagger between siblings in the same group. Long enough to read as a
// sequence, short enough that the last item is not still arriving after the
// eye has moved on.
export const REVEAL_STEP = 80;

// `--reveal-delay` is read by the transition in globals.css.
export function revealDelay(index: number, step = REVEAL_STEP): CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties;
}
