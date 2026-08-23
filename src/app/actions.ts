"use server";

import { addToWaitlist } from "@/lib/waitlist";

export interface WaitlistState {
  status: "idle" | "success" | "error";
  message: string;
}

export const initialWaitlistState: WaitlistState = {
  status: "idle",
  message: "",
};

const MESSAGES = {
  invalid: "Revisá el mail, parece que le falta algo.",
  unavailable: "No podemos anotarte ahora mismo. Probá en un rato.",
  failed: "Algo falló de nuestro lado. Probá de nuevo.",
} as const;

export async function joinWaitlist(
  _previous: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim();

  const result = await addToWaitlist(email);

  if (result.ok) {
    return { status: "success", message: "Listo. Te escribimos cuando salga." };
  }

  return { status: "error", message: MESSAGES[result.reason] };
}
