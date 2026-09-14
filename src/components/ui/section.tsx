import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

// Sections share one ground and one vertical rhythm. What separates them is
// composition, never a rule or a change of background.
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-24 sm:py-32 lg:py-40", className)}>
      <Container>{children}</Container>
    </section>
  );
}

// Heading and lead, stacked. No label above the heading: the heading carries
// its own weight.
export function SectionHeading({
  title,
  lead,
  className,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2 className="font-wide text-title font-semibold text-balance">{title}</h2>
      {lead ? (
        <p className="mt-6 max-w-2xl text-lead text-fade text-pretty">{lead}</p>
      ) : null}
    </div>
  );
}
