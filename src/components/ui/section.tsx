import { Container } from "@/components/ui/container";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("border-t border-border py-24 sm:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}

// Eyebrow + heading + optional lead, in the one arrangement the site uses.
// Having it in a single place is what keeps the sections looking like a set —
// including the order in which the three lines arrive.
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p
          data-reveal
          style={revealDelay(0)}
          className="text-sm font-medium text-muted-foreground"
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        data-reveal
        style={revealDelay(1)}
        className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {lead ? (
        <p
          data-reveal
          style={revealDelay(2)}
          className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty"
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
