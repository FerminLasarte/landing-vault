import type { CSSProperties } from "react";

// Stagger between siblings in the same group. Long enough to read as a
// sequence, short enough that the last item is not still arriving after the
// eye has moved on.
export const REVEAL_STEP = 80;

// The hero introduces the page one line at a time, and that only happens once —
// so it gets a wider step than the sections below, where the stagger is meant
// to be felt rather than watched.
export const REVEAL_STEP_HERO = 110;

// `--reveal-delay` is read by the transitions in globals.css.
export function revealDelay(index: number, step = REVEAL_STEP): CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties;
}
