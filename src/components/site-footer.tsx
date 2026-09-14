import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { assetHref, getLatestRelease, RELEASES_PAGE } from "@/lib/release";
import { site } from "@/lib/site";

const linkClass = "text-fade transition-colors duration-150 hover:text-ink";

// In-page anchors go through the router; anything leaving the site, the
// installers above all, is a plain anchor.
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("#")) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={linkClass}>
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
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-5 flex flex-col items-start gap-3.5 text-sm">
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
  // Memoised: the download blocks already asked for this on the same render.
  const release = await getLatestRelease();

  const notes = release.version
    ? `${site.repo}/releases/tag/${release.version}`
    : RELEASES_PAGE;

  return (
    <footer className="border-t">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 font-wide text-base font-semibold">
              <Logo className="h-5 w-auto" />
              {site.name}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-fade text-pretty">{site.tagline}</p>
          </div>

          <Column
            title="Producto"
            links={[
              { href: "#producto", label: "Qué hace" },
              { href: "#local-first", label: "Dónde quedan tus datos" },
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
              { href: site.repo, label: "Código fuente" },
              { href: `${site.repo}/releases`, label: "Todas las versiones" },
              { href: notes, label: "Notas de la versión" },
              { href: `${site.repo}/issues`, label: "Reportar un problema" },
            ]}
          />
        </div>

        <p className="mt-16 text-sm text-fade">
          © {new Date().getFullYear()} {site.name}. Para macOS y Windows.
        </p>
      </Container>
    </footer>
  );
}
