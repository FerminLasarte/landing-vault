import { Section, SectionHeading } from "@/components/ui/section";
import { revealDelay } from "@/lib/reveal";

// Native <details>: the accordion behaviour comes free, it works before
// hydration, and the browser finds the text with ctrl+F even while collapsed.
const QUESTIONS = [
  {
    q: "¿Para qué sistemas operativos?",
    a: "macOS y Windows. El .dmg es universal, así que corre igual en Apple Silicon y en Intel; el instalador de Windows es de 64 bits, para 10 u 11. Linux todavía no, aunque Tauri compile para ahí también.",
  },
  {
    q: "¿Por qué me avisa que la app no es segura?",
    a: "Porque no está firmada con certificados de Apple ni de Microsoft. El aviso no dice que la app tenga algo raro: dice que el sistema no puede verificar quién la publicó. En macOS se destraba desde Ajustes del Sistema → Privacidad y seguridad → «Abrir igualmente». En Windows, con «Más información» → «Ejecutar de todas formas». Es sólo la primera vez.",
  },
  {
    q: "¿Cómo se actualiza?",
    a: "Sola. La app revisa si hay una versión nueva, te muestra qué trae y la instala. No hay que volver a bajar nada del sitio ni repetir el permiso de la primera vez.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Hoy nada: se baja y se usa. Si más adelante hay una versión paga, lo que sí está definido es que no va a haber suscripción para acceder a tus propios datos.",
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
