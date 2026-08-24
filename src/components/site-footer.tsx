import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { assetHref, getLatestRelease, RELEASES_PAGE } from "@/lib/release";
import { site } from "@/lib/site";

// In-page anchors go through the router; anything leaving the site — the repo,
// and above all the installers — is a plain anchor. Same rule as the download
// buttons: the assets come back as attachments, so there is nothing to navigate
// to and no reason to involve the client router in it.
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className = "transition-colors hover:text-foreground";

  if (href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function Column({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-medium text-foreground">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function SiteFooter() {
  // Free: the hero already asked for this on the same render, and the call is
  // memoised. It buys the footer a direct download for each platform instead of
  // a link that only promises one.
  const release = await getLatestRelease();

  const notes = release.version
    ? `${site.repo}/releases/tag/${release.version}`
    : RELEASES_PAGE;

  return (
    <footer className="border-t border-border">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <Logo className="h-6 w-auto" />
              {site.name}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
              {site.tagline}
            </p>
          </div>

          <Column
            title="Producto"
            links={[
              { href: "#producto", label: "Qué hace" },
              { href: "#local-first", label: "Por qué local-first" },
              { href: "#preguntas", label: "Preguntas" },
              { href: "#descargar", label: "Descargar" },
            ]}
          />

          <Column
            title="Descargas"
            links={[
              { href: assetHref(release.mac), label: "macOS (.dmg)" },
              { href: assetHref(release.windows), label: "Windows (.exe)" },
              { href: assetHref(release.windowsMsi), label: "Windows (.msi)" },
            ]}
          />

          <Column
            title="Proyecto"
            links={[
              { href: site.repo, label: "Código" },
              { href: `${site.repo}/releases`, label: "Todas las versiones" },
              { href: notes, label: "Notas de la versión" },
              { href: `${site.repo}/issues`, label: "Reportar un problema" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>
            {release.version ? `${release.version} · ` : ""}macOS y Windows
          </p>
        </div>
      </Container>
    </footer>
  );
}
