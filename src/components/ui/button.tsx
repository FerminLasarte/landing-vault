import Link from "next/link";

import { cn } from "@/lib/utils";

// Two weights, both links. The styling lives in globals.css under `.btn`.
export const buttonVariants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

// In-page anchors go through the router; anything leaving the site is a plain
// anchor. The release assets come back as attachments, so there is nothing for
// the router to navigate to.
export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(buttonVariants[variant], className);

  if (href.startsWith("#") || href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
