import { ArrowDownToLine } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  assetHref,
  getLatestRelease,
  type Asset,
  type Release,
} from "@/lib/release";

// The first-run warning is not fine print. The app ships unsigned, so the very
// first launch is a dialog that says, in as many words, that the file may be
// malware. Explaining it next to the button — before the download, not after —
// is the difference between two extra clicks and an app that "does not open".
const BLOCKED = {
  mac: "La app no está firmada con un certificado de Apple, así que la primera vez macOS la bloquea: entrá a Ajustes del Sistema → Privacidad y seguridad y elegí «Abrir igualmente».",
  windows:
    "La app no está firmada con un certificado de Microsoft, así que la primera vez Windows la bloquea: hacé clic en «Más información» → «Ejecutar de todas formas».",
  both: "La app no está firmada, así que la primera vez el sistema la bloquea. En macOS: Ajustes del Sistema → Privacidad y seguridad → «Abrir igualmente». En Windows: «Más información» → «Ejecutar de todas formas».",
} as const;

const UPDATES = "Se hace una sola vez: de ahí en adelante se actualiza sola.";

// A plain anchor, deliberately, and two things that must not be added to it:
//
//   - No `target="_blank"`. GitHub serves the assets as
//     `content-disposition: attachment`, so the browser downloads without
//     navigating anywhere — the new tab would open empty and close itself,
//     which looks like a glitch.
//   - No fetching the file from JavaScript. The API is used to learn the URL,
//     nothing else. Pulling 13 MB through script means fighting CORS and
//     throwing away the browser's own download progress.

function DownloadButton({
  asset,
  variant = "primary",
  children,
}: {
  asset: Asset | null;
  variant?: keyof typeof buttonVariants;
  children: React.ReactNode;
}) {
  return (
    <a href={assetHref(asset)} className={buttonVariants[variant]}>
      <ArrowDownToLine className="size-4" aria-hidden />
      {children}
    </a>
  );
}

// Version and weight, next to the button. Both are omitted rather than faked
// when the feed could not be read.
function Meta({ version, asset }: { version: string | null; asset?: Asset | null }) {
  const parts = [version, asset?.size].filter(Boolean);
  if (parts.length === 0) return null;

  return <p className="text-sm text-muted-foreground">{parts.join(" · ")}</p>;
}

function AltLink({ asset, children }: { asset: Asset | null; children: React.ReactNode }) {
  return (
    <a
      href={assetHref(asset)}
      className="underline underline-offset-4 transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground text-pretty">
      {children}
    </p>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-4 gap-y-3">{children}</div>;
}

function Alternatives({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm text-muted-foreground">{children}</p>;
}

// Which of the three blocks a visitor sees is decided by the class the layout's
// boot script puts on <html>, and applied by CSS in globals.css — not by an
// effect. That way the right button is on screen in the first paint instead of
// swapping under the cursor after hydration, and a visitor with JavaScript off
// still gets the neutral block with both platforms.
export async function DownloadBlock({
  className,
  revealStyle,
}: {
  className?: string;
  revealStyle?: React.CSSProperties;
}) {
  const release: Release = await getLatestRelease();

  return (
    <div
      data-reveal={revealStyle ? "" : undefined}
      style={revealStyle}
      className={className}
    >
      <div data-os="mac">
        <Row>
          <DownloadButton asset={release.mac}>Descargar para macOS</DownloadButton>
          <Meta version={release.version} asset={release.mac} />
        </Row>
        <Alternatives>
          ¿Estás en Windows?{" "}
          <AltLink asset={release.windows}>Bajar el instalador</AltLink> ·{" "}
          <AltLink asset={release.windowsMsi}>.msi</AltLink>
        </Alternatives>
        <Note>
          {BLOCKED.mac} {UPDATES}
        </Note>
      </div>

      <div data-os="win">
        <Row>
          <DownloadButton asset={release.windows}>Descargar para Windows</DownloadButton>
          <Meta version={release.version} asset={release.windows} />
        </Row>
        <Alternatives>
          También como <AltLink asset={release.windowsMsi}>.msi</AltLink> · ¿Estás en
          macOS? <AltLink asset={release.mac}>Bajar el .dmg</AltLink>
        </Alternatives>
        <Note>
          {BLOCKED.windows} {UPDATES}
        </Note>
      </div>

      {/* Linux, phones, and anyone with JavaScript off. The release only
          builds macOS and Windows, so both are offered as equals rather than
          guessing one for a platform that has neither. */}
      <div data-os="other">
        <Row>
          <DownloadButton asset={release.mac}>Descargar para macOS</DownloadButton>
          <DownloadButton asset={release.windows} variant="secondary">
            Descargar para Windows
          </DownloadButton>
          <Meta version={release.version} />
        </Row>
        <Alternatives>
          El instalador de Windows también está como{" "}
          <AltLink asset={release.windowsMsi}>.msi</AltLink>
        </Alternatives>
        <Note>
          {BLOCKED.both} {UPDATES}
        </Note>
      </div>
    </div>
  );
}
