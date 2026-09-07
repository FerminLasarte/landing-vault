import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const DETAILS = [
  {
    label: "El archivo",
    title: "Un archivo, y nada más",
    body: "Toda tu información vive en un único archivo SQLite en tu carpeta de usuario. Podés copiarlo, moverlo, o abrirlo con cualquier herramienta que lea SQLite. No es un formato nuestro.",
  },
  {
    label: "Las copias",
    title: "Las copias las hacés vos",
    body: "Un botón guarda una copia completa donde vos elijas. Si pasaron más de dos semanas desde la última, la app te lo recuerda.",
  },
  {
    label: "La red",
    title: "La única conexión que hace",
    body: "La app consulta la cotización del dólar MEP a una API pública. Es un pedido de solo lectura: no viaja nada tuyo en él. Sin internet, usa la última cotización que guardó.",
  },
] as const;

// The section that keeps the previous one from being a slogan: concrete claims
// a sceptical reader can check, including the one outbound request the app
// actually makes — saying it out loud is worth more than the claim it costs.
//
// Deliberately a different rhythm from the three-column grid above it. Same
// tone, no rule between them, so the two read as one movement continuing rather
// than as a new section starting.
export function DataDetail() {
  return (
    <Section className="pt-0">
      <div className="mt-4 flex flex-col">
        {DETAILS.map((detail, index) => (
          <Reveal
            key={detail.title}
            as="article"
            index={index}
            className="grid gap-4 py-12 first:pt-0 sm:grid-cols-12 sm:gap-x-8"
          >
            <p className="eyebrow sm:col-span-3">{detail.label}</p>
            <div className="sm:col-span-9 sm:max-w-2xl">
              <h3 className="text-subtitle font-semibold text-balance">
                {detail.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
                {detail.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
