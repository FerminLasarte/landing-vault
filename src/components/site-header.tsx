import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <Logo className="h-5 w-auto" />
          {site.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="#descargar" className={buttonVariants.primary}>
            Descargar
          </Link>
        </div>
      </Container>
    </header>
  );
}
