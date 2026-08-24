import { DownloadBlock } from "@/components/download";
import { Section, SectionHeading } from "@/components/ui/section";
import { revealDelay } from "@/lib/reveal";

// The closing block, and the target of the header button. It repeats the hero's
// download rather than sending the visitor back up: whoever read the whole page
// is exactly the person ready to install it.
export function DownloadCta() {
  return (
    <Section id="descargar">
      <SectionHeading
        eyebrow="Descargar"
        title="Bajala y abrila. No hay más."
        lead="Sin cuenta, sin registro, sin conexión. Se instala en tu computadora y los datos se quedan ahí."
      />

      <DownloadBlock className="mt-10" revealStyle={revealDelay(3)} />
    </Section>
  );
}
