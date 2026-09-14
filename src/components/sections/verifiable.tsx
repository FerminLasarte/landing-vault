import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { site } from "@/lib/site";

// What keeps the comparison above from being a slogan: concrete claims a
// sceptical reader can check, including the one request the app does make.
// Saying it out loud is worth more than the claim it costs. The public code
// leads, because it is what makes the other three checkable.
const FACTS = [
  {
    title: "Un archivo SQLite, en tu carpeta de usuario.",
    body: "Toda tu información vive ahí. Podés copiarlo, moverlo o abrirlo con cualquier programa que lea SQLite. No es un formato nuestro.",
  },
  {
    title: "Las copias las hacés vos.",
    body: "Un botón guarda una copia completa donde elijas. Si pasaron más de dos semanas desde la última, la app te lo recuerda.",
  },
  {
    title: "Una sola conexión: la cotización del dólar.",
    body: "Vault consulta el dólar MEP a una API pública. Es un pedido de solo lectura, no viaja nada tuyo. Sin internet, usa la última cotización que guardó.",
  },
] as const;

export function Verifiable() {
  return (
    <Section className="pt-0 sm:pt-0 lg:pt-0">
      <SectionHeading
        title="Lo que podés comprobar vos."
        lead="El código de Vault es público: cualquiera puede leer qué hace la app y verificar cada una de estas cosas."
      />
      <ButtonLink href={site.repo} variant="secondary" className="mt-8">
        Ver el código en GitHub
      </ButtonLink>

      <dl className="mt-16 border-t">
        {FACTS.map((fact) => (
          <div
            key={fact.title}
            className="grid gap-3 border-b py-10 lg:grid-cols-12 lg:gap-x-10"
          >
            <dt className="font-wide text-statement font-semibold text-balance lg:col-span-6">
              {fact.title}
            </dt>
            <dd className="max-w-lg leading-relaxed text-fade text-pretty lg:col-span-5 lg:col-start-8">
              {fact.body}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
