import Link from "next/link";

import { cn } from "@/lib/utils";

// Deliberately not the full shadcn Button: the site only ever needs two
// weights of button, and both are links. Adding variants it does not use would
// be inventing a component language the app does not have.
const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-[background-color,color,transform] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

export const buttonVariants = {
  primary: cn(base, "bg-primary text-primary-foreground hover:bg-primary/90"),
  secondary: cn(
    base,
    "border border-border bg-background text-foreground hover:bg-accent",
  ),
} as const;

type Variant = keyof typeof buttonVariants;

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(buttonVariants[variant], className)}>
      {children}
    </Link>
  );
}
