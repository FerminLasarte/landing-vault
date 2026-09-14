"use client";

import Link from "next/link";
import { useRef } from "react";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/ui/container";
import { nav } from "@/lib/site";

// A native <details>, so the menu opens before any JavaScript has run. The one
// scripted part is closing it after a link is followed: an anchor scrolls the
// page without unmounting anything, and a menu left open over the section it
// just jumped to reads as broken.
export function MobileMenu() {
  const menu = useRef<HTMLDetailsElement>(null);

  function close() {
    if (menu.current) menu.current.open = false;
  }

  return (
    <details ref={menu} className="group md:hidden">
      <summary
        aria-label="Menú"
        className="flex size-9 cursor-pointer list-none items-center justify-center rounded-[10px] text-fade transition-colors duration-150 hover:bg-paper hover:text-ink [&::-webkit-details-marker]:hidden"
      >
        <Menu className="size-5 group-open:hidden" aria-hidden />
        <X className="hidden size-5 group-open:block" aria-hidden />
      </summary>

      <nav
        aria-label="Principal"
        className="absolute inset-x-0 top-full bg-ground shadow-[0_1px_0_var(--rule)]"
      >
        <Container className="flex flex-col items-start gap-5 pb-8 pt-4">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close} className="text-lead">
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>
    </details>
  );
}
