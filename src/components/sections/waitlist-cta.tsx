import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";
import { revealDelay } from "@/lib/reveal";

export function WaitlistCta() {
  return (
    <section id="lista-de-espera" className="border-t border-border py-24 sm:py-32">
      <Container>
        <p
          data-reveal
          style={revealDelay(0)}
          className="text-sm font-medium text-muted-foreground"
        >
          Próximamente
        </p>

        <h2
          data-reveal
          style={revealDelay(1)}
          className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          Todavía no se puede descargar.
        </h2>

        <p
          data-reveal
          style={revealDelay(2)}
          className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
        >
          Vault está en desarrollo. Dejanos tu mail y te escribimos el día que
          esté lista para bajar.
        </p>

        <WaitlistForm
          className="mt-10"
          label="Anotarme"
          note="Un solo mail, el del lanzamiento. Te podés dar de baja desde ahí mismo."
          revealStyle={revealDelay(3)}
        />
      </Container>
    </section>
  );
}
