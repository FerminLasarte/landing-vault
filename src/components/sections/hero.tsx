import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { DownloadBlock } from "@/components/download";
import { AppShot } from "@/components/ui/app-shot";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getLatestRelease } from "@/lib/release";
import { revealDelay, REVEAL_STEP_HERO as STEP } from "@/lib/reveal";

// Set as three fixed lines rather than left to wrap. At display size the line
// breaks are a typographic decision, not a side effect of the viewport — and
// each line needs to be its own element anyway, because the entrance slides it
// up from behind the line above.
const HEADLINE = ["Tus finanzas", "no salen de tu", "computadora."] as const;

// The hero is above the fold, so its reveals fire on load rather than on
// scroll: the observer reports it intersecting straight away. The stagger is
// the page introducing itself line by line, which only works once — hence the
// wider step here than in the sections below.
export async function Hero() {
  const release = await getLatestRelease();

  // La cabecera es sticky, no fixed: ocupa sus 5rem en el flujo en vez de
  // superponerse, así que el padding de acá se suma a ellos en lugar de
  // absorberlos. Con 8rem quedaba un hueco de doscientos y pico de píxeles
  // entre la barra y la primera línea — el pliegue gastado en nada.
  return (
    <section className="pb-16 pt-16 sm:pb-24 sm:pt-24">
      <Container>
        <div className="flex items-baseline justify-between gap-6">
          <Reveal as="p" index={0} step={STEP} className="eyebrow">
            App de escritorio para macOS y Windows
          </Reveal>
          {release.version ? (
            <Reveal
              as="p"
              index={0}
              step={STEP}
              className="hidden text-sm tabular-nums text-muted-foreground sm:block"
            >
              {release.version}
            </Reveal>
          ) : null}
        </div>

        <h1 className="mt-7 text-display font-semibold sm:mt-8">
          {HEADLINE.map((line, index) => (
            <Reveal key={line} as="span" variant="line" index={index + 1} step={STEP}>
              {line}
            </Reveal>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-x-8">
          <Reveal
            as="p"
            index={4}
            step={STEP}
            className="text-lead text-muted-foreground text-pretty lg:col-span-5"
          >
            Vault registra tus gastos, controla tus presupuestos y sigue tus
            ahorros. Todo se guarda en un archivo, en tu disco. Sin servidor,
            sin cuenta, sin nube.
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <DownloadBlock revealStyle={revealDelay(5, STEP)} detail="brief" size="lg" />

            <Reveal index={6} step={STEP} className="mt-8">
              <Link
                href="#producto"
                className="link inline-flex items-center gap-2.5 text-sm"
              >
                Ver qué hace
                <ArrowDown className="size-3.5 animate-bob" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* The capture breaks out of the reading measure on purpose: it is the
          subject of the fold, and it grows into place as the page scrolls
          rather than simply being there. */}
      <Container width="wide" className="mt-16 sm:mt-20">
        <AppShot
          name="estadisticas"
          alt="Estadísticas de Vault: gastos por categoría e ingresos contra gastos, mes a mes"
          priority
          sizes="100vw"
        />
      </Container>
    </section>
  );
}
