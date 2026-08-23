import Link from "next/link";
import { Wallet } from "lucide-react";

import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Wallet className="size-4" />
          {site.name}
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="#local-first" className="transition-colors hover:text-foreground">
            Privacidad
          </Link>
          <Link href={site.repo} className="transition-colors hover:text-foreground">
            Código
          </Link>
          <Link
            href={`mailto:${site.contactEmail}`}
            className="transition-colors hover:text-foreground"
          >
            Contacto
          </Link>
        </nav>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
