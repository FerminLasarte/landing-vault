import Link from "next/link";

import { DownloadBlock } from "@/components/download";
import { AppShot } from "@/components/ui/app-shot";
import { Container } from "@/components/ui/container";
import { revealDelay } from "@/lib/reveal";

// The hero is above the fold, so its reveals fire on load rather than on
// scroll: the observer reports it intersecting straight away. The stagger is
// the page introducing itself line by line, which only works once — hence the
// slightly wider spacing here than in the sections below.
export async function Hero() {
  return (
    <section className="pt-20 pb-16 sm:pt-28">
      <Container>
        <p
          data-reveal
          style={revealDelay(0, 100)}
          className="text-sm font-medium text-muted-foreground"
        >
          App de escritorio · macOS y Windows
        </p>

        <h1
          data-reveal
          style={revealDelay(1, 100)}
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
        >
          Tus finanzas personales no salen de tu computadora.
        </h1>

        <p
          data-reveal
          style={revealDelay(2, 100)}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
        >
          Vault es una app para registrar tus gastos, controlar presupuestos y
          seguir tus ahorros. Todo se guarda en un archivo, en tu disco. Sin
          servidor, sin cuenta, sin nube.
        </p>

        <div data-reveal style={revealDelay(3, 100)} className="mt-10">
          <DownloadBlock />
          <Link
            href="#producto"
            className="mt-6 inline-block text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Ver qué hace
          </Link>
        </div>

        <AppShot
          name="estadisticas"
          alt="Panel de estadísticas de Vault"
          priority
          reveal="shot"
          revealStyle={revealDelay(4, 100)}
          className="mt-16 sm:mt-20"
        />
      </Container>
    </section>
  );
}
