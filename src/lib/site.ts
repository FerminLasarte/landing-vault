// Single source of truth for the handful of strings that show up in metadata,
// the header and the footer. Keeping them here means renaming the product or
// moving the domain is one edit, not a grep.
export const site = {
  name: "Vault",
  // Used in <title> and anywhere the product needs its full name.
  fullName: "Vault — Finanzas personales, en tu dispositivo",
  tagline: "Tus finanzas personales, en tu computadora. Sin nube, sin cuentas.",
  // Where the site is served from. metadataBase turns every relative
  // OG/canonical URL absolute off this, and crawlers need it to be the real
  // one — so it moves the day a custom domain does.
  url: "https://landing-vault.vercel.app",
  locale: "es_AR",
  // The app's repository, in the casing GitHub publishes it under: the same
  // slug builds both the human URL and the releases API call in lib/release.ts.
  repoSlug: "FerminLasarte/vault-ai",
  repo: "https://github.com/FerminLasarte/vault-ai",
} as const;

export const nav = [
  { href: "#producto", label: "Producto" },
  { href: "#local-first", label: "Por qué local-first" },
  { href: "#preguntas", label: "Preguntas" },
] as const;
