import { cn } from "@/lib/utils";

// One max-width for the whole site. Sections set their own vertical rhythm;
// this only owns the horizontal gutter.
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>
      {children}
    </div>
  );
}
