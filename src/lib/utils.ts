import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Same helper the desktop app uses, so component code can be moved between the
// two repos without rewriting className logic.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
