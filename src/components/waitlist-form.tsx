"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { Check } from "lucide-react";

import { initialWaitlistState, joinWaitlist } from "@/app/actions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={buttonVariants.primary}>
      {pending ? "Anotando..." : label}
    </button>
  );
}

interface WaitlistFormProps {
  label?: string;
  className?: string;
  revealStyle?: React.CSSProperties;
  // The note under the field. Passed in because the hero and the closing
  // section want to promise the same thing in different words.
  note?: string;
}

export function WaitlistForm({
  label = "Avisame cuando salga",
  className,
  note,
  revealStyle,
}: WaitlistFormProps) {
  const [state, formAction] = useActionState(joinWaitlist, initialWaitlistState);
  const fieldId = useId();

  if (state.status === "success") {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-sm font-medium text-foreground",
          className,
        )}
      >
        <Check className="size-4" />
        {state.message}
      </p>
    );
  }

  return (
    <div data-reveal={revealStyle ? "" : undefined} style={revealStyle} className={className}>
      <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={fieldId} className="sr-only">
          Tu correo electrónico
        </label>
        <input
          id={fieldId}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="tu@mail.com"
          aria-describedby={state.status === "error" ? `${fieldId}-error` : undefined}
          className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:max-w-xs"
        />
        <SubmitButton label={label} />
      </form>

      {state.status === "error" ? (
        <p id={`${fieldId}-error`} role="alert" className="mt-2 text-sm text-destructive">
          {state.message}
        </p>
      ) : note ? (
        <p className="mt-3 text-sm text-muted-foreground">{note}</p>
      ) : null}
    </div>
  );
}
