import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

// How a section separates itself from the one above it. There is no rule
// between sections anywhere on the site: `raised` is a sub-2% step in
// luminance, which the eye reads as a new surface without registering an edge,
// and `invert` flips the token set for the closing panel.
type Tone = "base" | "raised" | "invert";

export function Section({
  id,
  tone = "base",
  width,
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  width?: "default" | "wide";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-tone={tone} className={cn("section", className)}>
      <Container width={width}>{children}</Container>
    </section>
  );
}

// Eyebrow, heading and lead, in the one arrangement the site uses. Having it in
// a single place is what keeps the sections looking like a set — including the
// order in which the three lines arrive.
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  className,
}: {
  eyebrow?: string;
  // Two digits, so the sections read as an ordered set rather than as four
  // unrelated labels. Omitted where the section is not part of that sequence.
  index?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <Reveal index={0} className="eyebrow">
          {index ? <span className="eyebrow-index">{index}</span> : null}
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal
        as="h2"
        variant="line"
        index={1}
        className="mt-5 text-title font-semibold text-balance"
      >
        {title}
      </Reveal>
      {lead ? (
        <Reveal
          as="p"
          index={2}
          className="mt-6 max-w-2xl text-lead text-muted-foreground text-pretty"
        >
          {lead}
        </Reveal>
      ) : null}
    </div>
  );
}
