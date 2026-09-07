import Link from "next/link";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { nav, site } from "@/lib/site";

// Native <details> rather than a client component: the menu opens before any
// JavaScript has run, needs no state, and keeps the header a Server Component.
// The only scripted part is closing it after a link is followed, which the
// motion runtime picks up by delegation — see `data-menu` there.
function MobileMenu() {
  return (
    <details data-menu className="group md:hidden">
      <summary
        aria-label="Abrir el menú"
        className="flex size-9 cursor-pointer list-none items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Menu className="size-5 group-open:hidden" aria-hidden />
        <X className="hidden size-5 group-open:block" aria-hidden />
      </summary>

      <nav className="absolute inset-x-0 top-full bg-background shadow-[0_1px_0_0_var(--border)]">
        <Container className="flex flex-col items-start gap-6 pb-8 pt-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="link text-lead">
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>
    </details>
  );
}

// Transparent over the hero, solid and shorter once anything has scrolled under
// it. Both transitions hang off `data-scrolled` on <html>, written by the motion
// runtime — see globals.css. No blur: the brief rules out frosted glass.
export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50">
      <Container className="site-header-inner flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight"
        >
          <Logo className="h-5 w-auto" />
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="link text-sm">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <ButtonLink href="#descargar" className="px-4 py-2 text-sm">
            Descargar
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
