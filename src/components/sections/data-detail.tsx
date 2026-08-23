import { Section, SectionHeading } from "@/components/ui/section";
import { revealDelay } from "@/lib/reveal";

const DETAILS = [
  {
    title: "Un archivo, y nada más",
    body: "Toda tu información vive en un único archivo SQLite en tu carpeta de usuario. Podés copiarlo, moverlo, o abrirlo con cualquier herramienta que lea SQLite. No es un formato nuestro.",
  },
  {
    title: "Las copias las hacés vos",
    body: "Un botón guarda una copia completa donde vos elijas. Si pasaron más de dos semanas desde la última, la app te lo recuerda.",
  },
  {
    title: "La única conexión que hace",
    body: "La app consulta la cotización del dólar MEP a una API pública. Es un pedido de solo lectura: no viaja nada tuyo en él. Sin internet, usa la última cotización que guardó.",
  },
] as const;

// The section that keeps the previous one from being a slogan. Concrete claims
// a sceptical reader can check, including the one outbound request the app
// actually makes — saying it out loud is worth more than the claim it costs.
export function DataDetail() {
  return (
    <Section>
      <SectionHeading
        eyebrow="En concreto"
        title="Qué quiere decir, exactamente"
        lead="«Local-first» es fácil de decir. Esto es lo que significa cuando abrís la app."
      />

      <dl className="mt-14 grid gap-10 sm:grid-cols-3">
        {DETAILS.map((detail, index) => (
          <div key={detail.title} data-reveal style={revealDelay(index)}>
            <dt className="font-semibold tracking-tight">{detail.title}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
              {detail.body}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
