import { Plus } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";

// Native <details>: the accordion comes free, works before hydration, and the
// browser finds the text with ctrl+F even while it is collapsed.
const QUESTIONS = [
  {
    q: "¿Para qué sistemas operativos?",
    a: "macOS y Windows. El .dmg es universal, así que corre igual en Apple Silicon y en Intel; el instalador de Windows es de 64 bits, para 10 u 11. Linux todavía no.",
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
] as const;

export function Faq() {
  return (
    <Section id="preguntas">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <SectionHeading
          title="Lo que suelen preguntar."
          className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start"
        />

        <div className="border-t lg:col-span-7 lg:col-start-6">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-lead font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  aria-hidden
                  className="size-4 shrink-0 text-fade transition-[transform,color] duration-200 ease-out group-open:rotate-45 group-hover:text-ink"
                />
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-fade text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
