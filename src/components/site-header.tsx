import Link from "next/link";

import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { nav, site } from "@/lib/site";

// The hairline under the header appears once something scrolls beneath it,
// driven by a scroll timeline in globals.css rather than a scroll listener.
export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-wide text-base font-semibold">
          <Logo className="h-5 w-auto" />
          {site.name}
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-fade transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <ButtonLink href="#descargar" className="btn-sm">
            Descargar
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
