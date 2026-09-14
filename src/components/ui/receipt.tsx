import { cn } from "@/lib/utils";

// How the paper arrives. `load` prints once when the page opens (the hero),
// `scroll` prints as the receipt crosses the viewport, `none` is already there.
// All of it is CSS, see "motion" in globals.css.
type Print = "load" | "scroll" | "none";

export function Receipt({
  print = "scroll",
  className,
  paperClassName,
  children,
}: {
  print?: Print;
  className?: string;
  paperClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("receipt-shadow", className)}>
      <div
        data-print={print === "none" ? undefined : print}
        className={cn("receipt", paperClassName)}
      >
        {children}
      </div>
    </div>
  );
}

export interface ReceiptRow {
  label: string;
  value: string;
  accent?: boolean;
}

// Item, dotted leader, value. A <dl> because that is what a receipt line is: a
// term and what it came to.
export function Leaders({
  rows,
  className,
}: {
  rows: readonly ReceiptRow[];
  className?: string;
}) {
  return (
    <dl className={cn("leaders", className)}>
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          {/* `stamp` only animates inside a receipt that prints on load. */}
          <dd className={row.accent ? "stamp text-accent" : undefined}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// The header a receipt printer puts at the top: the mark at double width.
export function ReceiptHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans font-wide text-sm font-semibold uppercase tracking-wide">
      {children}
    </p>
  );
}
