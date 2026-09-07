import Link from "next/link";
import { isValidElement, cloneElement, type ReactElement } from "react";

import { cn } from "@/lib/utils";

// Deliberately not the full shadcn Button: the site only ever needs two
// weights, and both are links. The behaviour — fill sweep, label roll, icon
// roll — lives in globals.css under `.btn`; what the component owns is the
// duplication those rolls need, and keeping the copy out of the accessibility
// tree.
export const buttonVariants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
} as const;

type Variant = keyof typeof buttonVariants;

interface ButtonContentProps {
  icon?: ReactElement<{ "aria-hidden"?: boolean }>;
  children: React.ReactNode;
}

// Both copies are rendered by the same component so the two can never drift
// apart, and the duplicate is hidden from screen readers — a rolling label
// that is announced twice is a regression dressed as a flourish.
export function ButtonContent({ icon, children }: ButtonContentProps) {
  return (
    <>
      {isValidElement(icon) ? (
        <span className="btn-roll" aria-hidden>
          {icon}
          {cloneElement(icon)}
        </span>
      ) : null}
      <span className="btn-roll">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </>
  );
}

// One entry point for both kinds of destination. In-page anchors go through the
// router; anything leaving the site is a plain anchor — the release assets come
// back as attachments, so there is nothing for the router to navigate to.
export function ButtonLink({
  href,
  variant = "primary",
  icon,
  className,
  children,
}: ButtonContentProps & {
  href: string;
  variant?: Variant;
  className?: string;
}) {
  const classes = cn(buttonVariants[variant], className);
  const content = <ButtonContent icon={icon}>{children}</ButtonContent>;

  if (href.startsWith("#") || href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
