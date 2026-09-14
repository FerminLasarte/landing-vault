import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";

import { buttonVariants, type ButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { assetHref, getLatestRelease, type Asset } from "@/lib/release";

// The first-run warning is not fine print. The app ships unsigned, so the very
// first launch is a dialog that says the file may be malware. Explaining it
// next to the button, before the download, is the difference between two extra
// clicks and an app that "does not open".
const UNSIGNED = {
  mac: "No está firmada con un certificado de Apple. Para abrirla:",
  windows: "No está firmada con un certificado de Microsoft. Para abrirla:",
  both: "No está firmada con certificados de Apple ni de Microsoft. Para abrirla:",
} as const;

const STEPS = {
  mac: ["Entrá a Ajustes del Sistema → Privacidad y seguridad.", "Elegí «Abrir igualmente»."],
  windows: ["Hacé clic en «Más información».", "Elegí «Ejecutar de todas formas»."],
} as const;

// The hero gets the consequence in one line and the procedure one click away,
// in the questions, so the warning never outweighs the button.
const BLOCKED_SHORT = {
  mac: "La primera vez, macOS pide autorizarla a mano.",
  windows: "La primera vez, Windows pide confirmarla a mano.",
  both: "La primera vez, el sistema pide autorizarla a mano.",
} as const;

const FIRST_TIME = {
  mac: "La primera vez, macOS la va a bloquear.",
  windows: "La primera vez, Windows la va a bloquear.",
  both: "La primera vez, el sistema la va a bloquear.",
} as const;

const UPDATES = "Se hace una sola vez: después se actualiza sola.";

type Platform = keyof typeof UNSIGNED;

function Steps({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-fade">
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}

// A plain anchor, deliberately, and two things that must not be added to it:
//
//   - No `target="_blank"`. GitHub serves the assets as
//     `content-disposition: attachment`, so the browser downloads without
//     navigating; a new tab would open empty and close itself.
//   - No fetching the file from JavaScript. The API is used to learn the URL,
//     nothing else. Pulling 13 MB through script means fighting CORS and
//     losing the browser's own download progress.
function DownloadButton({
  asset,
  variant = "primary",
  children,
}: {
  asset: Asset | null;
  variant?: ButtonVariant;
  children: React.ReactNode;
}) {
  return (
    <a href={assetHref(asset)} className={buttonVariants[variant]}>
      <ArrowDownToLine className="size-4" aria-hidden />
      {children}
    </a>
  );
}

// Version and weight, next to the button. Omitted rather than faked when the
// feed could not be read.
function Meta({ version, asset }: { version: string | null; asset?: Asset | null }) {
  const parts = [version, asset?.size].filter(Boolean);
  if (parts.length === 0) return null;

  return <p className="font-mono text-xs text-fade tabular-nums">{parts.join(" · ")}</p>;
}

function AltLink({ asset, children }: { asset: Asset | null; children: React.ReactNode }) {
  return (
    <a href={assetHref(asset)} className="link">
      {children}
    </a>
  );
}

function Warning({ platform, detail }: { platform: Platform; detail: "brief" | "full" }) {
  if (detail === "brief") {
    return (
      <p className="mt-5 text-sm text-fade">
        {BLOCKED_SHORT[platform]}{" "}
        <Link href="#preguntas" className="link">
          Cómo se hace
        </Link>
      </p>
    );
  }

  // The warning as a state of its own: a framed notice with the consequence in
  // plain words first, then the steps, not a label over grey fine print.
  return (
    <div className="mt-8 max-w-lg rounded-[10px] border border-ink p-5">
      <p className="font-semibold">{FIRST_TIME[platform]}</p>
      <p className="mt-1 text-sm text-fade">{UNSIGNED[platform]}</p>
      {platform === "both" ? (
        <>
          <p className="mt-3 text-sm font-medium">En macOS</p>
          <Steps steps={STEPS.mac} />
          <p className="mt-3 text-sm font-medium">En Windows</p>
          <Steps steps={STEPS.windows} />
        </>
      ) : (
        <Steps steps={STEPS[platform]} />
      )}
      <p className="mt-3 text-sm text-fade">{UPDATES}</p>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-5 gap-y-3">{children}</div>;
}

function Alternatives({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-sm text-fade">{children}</p>;
}

// Which of the three blocks a visitor sees is decided by the class the boot
// script puts on <html>, applied by CSS in globals.css, not by an effect: the
// right button is there in the first paint, and a visitor with JavaScript off
// still gets the neutral block with both platforms.
export async function DownloadBlock({
  className,
  detail = "full",
}: {
  className?: string;
  // "brief" in the hero, where the warning competes with the button; "full"
  // in the closing section, which has room to explain it.
  detail?: "brief" | "full";
}) {
  const release = await getLatestRelease();

  return (
    <div className={cn(className)}>
      <div data-os="mac">
        <Row>
          <DownloadButton asset={release.mac}>Descargar para macOS</DownloadButton>
          <Meta version={release.version} asset={release.mac} />
        </Row>
        <Alternatives>
          ¿Estás en Windows? <AltLink asset={release.windows}>Bajá el instalador</AltLink> o
          el <AltLink asset={release.windowsMsi}>.msi</AltLink>
        </Alternatives>
        <Warning platform="mac" detail={detail} />
      </div>

      <div data-os="win">
        <Row>
          <DownloadButton asset={release.windows}>Descargar para Windows</DownloadButton>
          <Meta version={release.version} asset={release.windows} />
        </Row>
        <Alternatives>
          También como <AltLink asset={release.windowsMsi}>.msi</AltLink>. ¿Estás en macOS?{" "}
          <AltLink asset={release.mac}>Bajá el .dmg</AltLink>
        </Alternatives>
        <Warning platform="windows" detail={detail} />
      </div>

      {/* Linux, phones, and anyone with JavaScript off. The release only
          builds macOS and Windows, so both are offered as equals. */}
      <div data-os="other">
        <Row>
          <DownloadButton asset={release.mac}>Descargar para macOS</DownloadButton>
          <DownloadButton asset={release.windows} variant="secondary">
            Descargar para Windows
          </DownloadButton>
        </Row>
        <Alternatives>
          El instalador de Windows también está como{" "}
          <AltLink asset={release.windowsMsi}>.msi</AltLink>
        </Alternatives>
        <Warning platform="both" detail={detail} />
      </div>
    </div>
  );
}
