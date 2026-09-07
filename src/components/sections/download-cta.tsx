import { DownloadBlock } from "@/components/download";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { revealDelay } from "@/lib/reveal";

const HEADLINE = ["Bajala y abrila.", "No hay más."] as const;

// The closing block, and the target of the header button. It repeats the hero's
// download rather than sending the visitor back up: whoever read the whole page
// is exactly the person ready to install it.
//
// The one inverted panel on the site. It works by redefining the tokens rather
// than restyling anything, so the download block — buttons, muted notes, links
// — drops in unchanged and comes out inverted.
export function DownloadCta() {
  return (
    <Section id="descargar" tone="invert">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <Reveal as="p" index={0} className="eyebrow">
            <span className="eyebrow-index">04</span>
            Descargar
          </Reveal>
          <h2 className="mt-6 text-title font-semibold">
            {HEADLINE.map((line, index) => (
              <Reveal key={line} as="span" variant="line" index={index + 1}>
                {line}
              </Reveal>
            ))}
          </h2>
          <Reveal
            as="p"
            index={3}
            className="mt-6 max-w-md text-lead text-muted-foreground text-pretty"
          >
            Sin cuenta, sin registro, sin conexión. Se instala en tu computadora
            y los datos se quedan ahí.
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
          <DownloadBlock revealStyle={revealDelay(4)} />
        </div>
      </div>
    </Section>
  );
}
