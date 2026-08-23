// The one place that knows where waitlist emails go. Swapping Resend for
// another provider (or a database) is a change to this file and nothing else.
//
// Resend is reached over plain fetch rather than its SDK on purpose: it is a
// single POST, and a landing page that argues about data ownership should not
// grow a dependency tree to collect an email address.

const RESEND_ENDPOINT = "https://api.resend.com/audiences";

export type WaitlistResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unavailable" | "failed" };

// Deliberately loose. Anything stricter rejects valid addresses, and the only
// thing a stricter check would buy is catching typos we cannot catch anyway.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}

export async function addToWaitlist(email: string): Promise<WaitlistResult> {
  if (!isValidEmail(email)) return { ok: false, reason: "invalid" };

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Missing configuration is a deployment mistake, not something to show the
  // visitor as their fault — log it loudly and tell them to try later.
  if (!apiKey || !audienceId) {
    console.error(
      "Waitlist is not configured: set RESEND_API_KEY and RESEND_AUDIENCE_ID.",
    );
    return { ok: false, reason: "unavailable" };
  }

  try {
    const response = await fetch(`${RESEND_ENDPOINT}/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
      signal: AbortSignal.timeout(10_000),
    });

    // Resend treats a repeat address as a successful upsert, so there is no
    // "already subscribed" case to handle — and telling someone whether an
    // address is already on the list would leak who signed up.
    if (!response.ok) {
      console.error(`Resend responded ${response.status}`, await response.text());
      return { ok: false, reason: "failed" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Waitlist request failed", error);
    return { ok: false, reason: "failed" };
  }
}
