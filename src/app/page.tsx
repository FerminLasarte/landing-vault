import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

// Provisional shell: the sections below are placeholders that fix the page
// order and the anchors the header links to. Real content lands section by
// section once the outline is signed off.
function Placeholder({ note }: { note: string }) {
  return (
    <p className="mt-8 rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
      {note}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <Container>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Hero
            </h1>
            <Placeholder note="Propuesta de valor, dos CTA y captura del producto." />
          </Container>
        </section>

        <Section id="producto">
          <SectionHeading eyebrow="Producto" title="Qué hace Vault" />
          <Placeholder note="Recorrido por las funciones con capturas de la app." />
        </Section>

        <Section id="local-first">
          <SectionHeading eyebrow="Local-first" title="Por qué local-first" />
          <Placeholder note="Comparación con las apps de finanzas que suben tus datos a la nube." />
        </Section>

        <Section id="preguntas">
          <SectionHeading eyebrow="Preguntas" title="Preguntas frecuentes" />
          <Placeholder note="Backups, sincronización, plataformas, precio, IA." />
        </Section>

        <Section id="lista-de-espera">
          <SectionHeading eyebrow="Próximamente" title="Lista de espera" />
          <Placeholder note="Formulario de captura de mail." />
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
