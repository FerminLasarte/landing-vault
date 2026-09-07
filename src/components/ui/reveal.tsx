import { revealDelay, REVEAL_STEP } from "@/lib/reveal";

// The three entrance gestures the site has, and no more:
//
//   fade — the default. Rises 14px with a fade.
//   line — for headline lines. Clips the element and slides the line up from
//          under its own baseline, which needs an inner element (added here).
//   row  — fade only, for table rows, where transform support is uneven.
export type RevealVariant = "fade" | "line" | "row";

// `data-reveal` is all a section needs to opt in: the styling lives in
// globals.css and a single observer in MotionRuntime flips `.is-visible`.
// Sections therefore stay Server Components and ship no JavaScript of their own.
export function Reveal({
  as: Tag = "div",
  variant = "fade",
  index = 0,
  step = REVEAL_STEP,
  className,
  children,
}: {
  as?: React.ElementType;
  variant?: RevealVariant;
  index?: number;
  step?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      data-reveal={variant === "fade" ? "" : variant}
      style={revealDelay(index, step)}
      className={className}
    >
      {variant === "line" ? <span>{children}</span> : children}
    </Tag>
  );
}
