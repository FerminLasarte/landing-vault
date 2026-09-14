"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// The class on <html> is already correct before this mounts (see the inline
// script in the root layout), so the DOM — not React state — is the source of
// truth. Subscribing to it keeps the icon right even if something else flips
// the class, and the null server snapshot means the first (hydrating) render
// commits no icon at all rather than guessing wrong.
function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): boolean | null {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot(): boolean | null {
  return null;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function apply() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private browsing with storage disabled: the toggle still works for
      // this page view, it just will not be remembered.
    }
  }

  // A view transition crossfades the two themes (timing in globals.css).
  // Without the API, or with reduced motion, the theme simply switches.
  function toggle() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("startViewTransition" in document)) {
      apply();
      return;
    }
    // The browser skips the animation (a hidden tab, a second click mid-way)
    // by rejecting `ready`; the theme has changed either way, so there is
    // nothing to report.
    document.startViewTransition(apply).ready.catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="press inline-flex size-9 items-center justify-center rounded-[10px] text-fade hover:bg-paper hover:text-ink"
    >
      {isDark === null ? (
        <span className="size-4" />
      ) : isDark ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}
