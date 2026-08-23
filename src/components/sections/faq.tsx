import { Section, SectionHeading } from "@/components/ui/section";
import { revealDelay } from "@/lib/reveal";

// Native <details>: the accordion behaviour comes free, it works before
// hydration, and the browser finds the text with ctrl+F even while collapsed.
const QUESTIONS = [
  {
    q: "¿Cuándo se puede descargar?",
    a: "Todavía no hay fecha. Está en desarrollo activo, y la lista de espera es la forma de enterarte el día que salga.",
  },
  {
    q: "¿Para qué sistemas operativos?",
    a: "Está hecha con Tauri, que compila para macOS, Windows y Linux. Cuál sale primero se define más cerca del lanzamiento.",
  },
  {
    q: "¿Va a ser paga?",
    a: "Todavía no está definido. Lo que sí está definido es que no va a haber suscripción para acceder a tus propios datos.",
  },
  {
    q: "¿Sincroniza entre varios dispositivos?",
    a: "No, y es la contracara de no tener servidor. Podés llevar el archivo a mano, o dejarlo en una carpeta que ya sincronices por tu cuenta.",
  },
  {
    q: "¿Qué pasa si pierdo la computadora?",
    a: "Los datos se pierden con ella, igual que cualquier archivo tuyo. Por eso la app insiste con las copias de seguridad: guardalas en un disco externo o donde tengas tus respaldos.",
  },
  {
    q: "¿Y la parte de IA?",
    a: "Está en el plan, no en la app. Cuando llegue va a ser opcional y explícita: nada se procesa afuera sin que lo pidas.",
  },
] as const;

export function Faq() {
  return (
    <Section id="preguntas">
      <SectionHeading eyebrow="Preguntas" title="Preguntas frecuentes" />

      <div className="mt-12 border-t border-border">
        {QUESTIONS.map((item, index) => (
          <details
            key={item.q}
            data-reveal
            style={revealDelay(index, 60)}
            className="group border-b border-border"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-medium transition-colors hover:text-muted-foreground">
              {item.q}
              <span
                aria-hidden
                className="text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground text-pretty sm:max-w-2xl">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
