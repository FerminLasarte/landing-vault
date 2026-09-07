import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

// The hook between the hero and the argument. Four claims a visitor can take in
// without reading, each one expanded further down the page — this is the
// summary, not the case.
const PILLARS = [
  {
    title: "Sin cuenta",
    body: "No hay registro, ni mail, ni contraseña que recordar.",
  },
  {
    title: "Sin servidor",
    body: "Nada de lo que cargás sale de tu computadora.",
  },
  {
    title: "Un solo archivo",
    body: "SQLite, en tu carpeta de usuario. Copiable y portable.",
  },
  {
    title: "Sin conexión",
    body: "Funciona igual con internet o sin él.",
  },
] as const;

export function Pillars() {
  return (
    <section className="pb-8 pt-4 sm:pb-16">
      <Container>
        <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} index={index}>
              <dt className="text-subtitle font-semibold">{pillar.title}</dt>
              <dd className="mt-2.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                {pillar.body}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
