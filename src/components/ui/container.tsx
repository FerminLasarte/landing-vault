import { cn } from "@/lib/utils";

// Two widths for the whole site. `default` is the reading measure everything
// sits in; `wide` is for the pieces that are meant to break out of it — the
// hero capture, above all. Sections own their vertical rhythm; this only owns
// the horizontal gutter.
const widths = {
  default: "max-w-7xl",
  wide: "max-w-[100rem]",
} as const;

export function Container({
  width = "default",
  className,
  children,
}: {
  width?: keyof typeof widths;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", widths[width], className)}>
      {children}
    </div>
  );
}
