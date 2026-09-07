import Link from "next/link";

import { DownloadBlock } from "@/components/download";
import { AppShot } from "@/components/ui/app-shot";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getLatestRelease } from "@/lib/release";
import { revealDelay, REVEAL_STEP_HERO as STEP } from "@/lib/reveal";

// Set as three fixed lines rather than left to wrap. At display size the line
// breaks are a typographic decision, not a side effect of the viewport — and
// each line needs to be its own element anyway, because the entrance slides it
// up from behind the one above.
const HEADLINE = ["Tus finanzas", "no salen de tu", "computadora."] as const;

// The fold has one job: make someone want to keep going. Three decisions carry
// it.
//
// The composition is asymmetric and bottom-aligned. The headline holds the left
// seven columns at a size that fills them; the pitch and the download sit in the
// last four, aligned to the headline's baseline rather than its top. Stacking
// them instead — which is what this was — left the right half of the fold empty
// and the two blocks reading as an afterthought under a banner.
//
// The height is spent, not filled. Everything above the capture is compact
// enough that the window itself clears the fold by a third of the screen: the
// visitor sees the product has more to show without being told.
//
// And three things move: the headline arrives line by line, the whole text
// block lifts and dims as the page scrolls under it, and the capture follows
// the pointer. The first happens once, the second answers the scroll, the third
// answers the visitor — between them the fold is never still.
export async function Hero() {
  const release = await getLatestRelease();

  return (
    <section className="pt-14 sm:pt-20">
      <Container>
        <div data-hero-lift>
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

          <div className="mt-10 grid gap-y-12 sm:mt-12 xl:grid-cols-12 xl:items-end xl:gap-x-8">
            <h1 className="text-display font-semibold xl:col-span-7">
              {HEADLINE.map((line, index) => (
                <Reveal
                  key={line}
                  as="span"
                  variant="line"
                  index={index + 1}
                  step={STEP}
                >
                  {line}
                </Reveal>
              ))}
            </h1>

            {/* `pb-2` alinea la última línea de la bajada con la base del titular
              en vez de con su caja, que es lo que hace que las dos columnas se
              lean como una sola composición. */}
            <div className="xl:col-span-4 xl:col-start-9 xl:pb-2">
              <Reveal
                as="p"
                index={4}
                step={STEP}
                className="max-w-md text-lead text-muted-foreground text-pretty"
              >
                Vault registra tus gastos, controla tus presupuestos y sigue tus
                ahorros. Todo se guarda en un archivo, en tu disco. Sin
                servidor, sin cuenta, sin nube.
              </Reveal>

              <DownloadBlock
                className="mt-8"
                revealStyle={revealDelay(5, STEP)}
                detail="brief"
                size="lg"
              />
            </div>
          </div>

          <Reveal index={6} step={STEP} className="mt-14 sm:mt-16">
            <Link
              href="#producto"
              className="group inline-flex items-end gap-4 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <span className="cue-track" aria-hidden />
              <span className="pb-0.5">Ver qué hace</span>
            </Link>
          </Reveal>
        </div>
      </Container>

      {/* La captura rompe la medida de lectura porque es el sujeto del pliegue,
          y asoma un tercio de pantalla: lo suficiente para que se entienda que
          hay producto abajo, no tanto como para gastar el hallazgo. */}
      <Container width="wide" className="tilt-stage mt-14 sm:mt-16">
        <div data-tilt>
          <AppShot
            name="estadisticas"
            alt="Estadísticas de Vault: gastos por categoría e ingresos contra gastos, mes a mes"
            priority
            sizes="100vw"
          />
        </div>
      </Container>
    </section>
  );
}
