"use client";

import { useEffect } from "react";

// Reveals start below the fold once they are this far into the viewport, so the
// movement finishes before the element is properly being read.
const TRIGGER_RATIO = 0.88;

// How much of the viewport a [data-rise] element travels through before it is
// fully grown, in the fallback path. Mirrors the `entry 5% cover 42%` range the
// CSS scroll timeline uses, closely enough that neither looks like the odd one
// out on a machine with two browsers open.
const RISE_TRAVEL = 0.62;

function clamp(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

// Everything motion-related that needs the DOM, in one mount.
//
// The reveal effect deliberately does not live in a per-element component:
// sections stay Server Components and only carry a `data-reveal` attribute,
// while a single runtime here wires all of them. One observer for the page
// instead of one per element, and no client bundle for the content itself.
//
// The failure mode matters more than the effect: an element that is never
// revealed stays at opacity 0 forever, which turns a decorative animation into
// a blank page. So the geometry check is the primary mechanism and runs
// synchronously on mount and on every scroll frame; IntersectionObserver is an
// optimisation layered on top, not the thing the content depends on.
export function MotionRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    const pending = new Set(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The scroll-linked growth of the captures is a CSS animation driven by a
    // view timeline, which runs on the compositor and cannot be starved by work
    // on the main thread. This runtime only steps in where that does not exist
    // yet — and then it is writing one custom property per capture per frame,
    // not running the effect.
    const nativeTimeline =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline", "view()");

    const rising =
      reduced || nativeTimeline
        ? []
        : [...document.querySelectorAll<HTMLElement>("[data-rise]")];

    // Declared before `reveal` uses it: with reduced motion the reveal pass
    // runs before the observer is ever created, and a `let` read from inside
    // its temporal dead zone would throw.
    let observer: IntersectionObserver | undefined;

    function reveal(node: Element) {
      node.classList.add("is-visible");
      pending.delete(node as HTMLElement);
      observer?.unobserve(node);
    }

    // No motion preference: everything is simply already in place.
    if (reduced) {
      pending.forEach(reveal);
    }

    if (!reduced && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) reveal(entry.target);
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
      );
      pending.forEach((node) => observer?.observe(node));
    }

    function flush() {
      if (!pending.size) return;

      // A viewport that measures zero — a collapsed frame, a headless render,
      // a browser that has not laid out yet — would otherwise put every
      // element permanently below the trigger line and leave the page blank.
      // In that case there is no "below the fold" to speak of: reveal
      // everything and let the content be readable.
      const viewport = window.innerHeight;
      const limit = viewport > 0 ? viewport * TRIGGER_RATIO : Infinity;

      for (const node of [...pending]) {
        if (node.getBoundingClientRect().top < limit) reveal(node);
      }
    }

    // `--p` runs 0 → 1 as the element crosses the screen; globals.css derives
    // scale, lift and tilt from it. Elements that are off screen are skipped
    // rather than pinned, so a long page costs a handful of reads per frame.
    function stepRise() {
      if (!rising.length) return;
      const viewport = window.innerHeight;
      if (viewport <= 0) return;

      for (const node of rising) {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) continue;

        const travelled = (viewport - rect.top) / (viewport * RISE_TRAVEL);
        node.style.setProperty("--p", clamp(travelled).toFixed(3));
      }
    }

    let frame = 0;

    function sync() {
      frame = 0;
      // 8px rather than 0: a trackpad resting against the top edge should not
      // be able to flicker the header border on and off.
      root.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
      flush();
      stepRise();
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    }

    // The mobile menu is a native <details>, so opening it needs no script at
    // all. Closing it after a link is followed does, because the anchor scrolls
    // the page without unmounting anything — and a menu left open over the
    // section it just jumped to is the kind of detail that reads as broken.
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a");
      const menu = link?.closest("[data-menu]");
      if (menu instanceof HTMLDetailsElement) menu.open = false;
    }

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClick);
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return null;
}
