// The demo dataset: one salaried person in Argentina, twelve months of history
// ending on the day the screenshots are taken. Everything here is invented, but
// it has to hold together — a chart is only convincing when the numbers behind
// it behave like real ones, so salaries step up over the year the way they do
// in ARS, and spending moves around a trend instead of repeating a figure.

// Deterministic noise. A screenshot set that changes every run cannot be
// re-taken to match an existing one, so the variation is seeded rather than
// random.
export function makeRandom(seed = 20260907) {
  let state = seed >>> 0;
  return function next() {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export const TODAY = "2026-09-07";

// Payment methods 1-5 are created by the migrations; these two are added.
export const CARD_ID = 6;
export const SAVINGS_ACCOUNT_ID = 7;

export const EXTRA_PAYMENT_METHODS = [
  { id: CARD_ID, name: "Visa Galicia", type: "card", currency: "ARS", initial_balance: 0 },
  {
    id: SAVINGS_ACCOUNT_ID,
    name: "Caja de ahorro",
    type: "bank",
    currency: "ARS",
    initial_balance: 0,
  },
];

// Opening balances, so the accounts screen does not start every account at zero.
export const INITIAL_BALANCES = {
  1: 95_000, // Efectivo ARS
  2: 180, // Efectivo USD
  3: 140_000, // Mercado Pago
  4: 320_000, // Cuenta Bancaria ARS
  5: 900, // Cuenta Bancaria USD
};

// Categories 1-6 come from the migrations (Salario, Freelance, Comida,
// Transporte, Ocio, Otros). These complete the set a real month needs.
export const CAT = {
  salario: 1,
  freelance: 2,
  comida: 3,
  transporte: 4,
  ocio: 5,
  otros: 6,
  alquiler: 7,
  supermercado: 8,
  servicios: 9,
  salud: 10,
  suscripciones: 11,
  educacion: 12,
};

export const EXTRA_CATEGORIES = [
  { id: CAT.alquiler, name: "Alquiler", type: "expense", color: "#ef4444", icon: "🏠" },
  { id: CAT.supermercado, name: "Supermercado", type: "expense", color: "#22c55e", icon: "🛒" },
  { id: CAT.servicios, name: "Servicios", type: "expense", color: "#eab308", icon: "💡" },
  { id: CAT.salud, name: "Salud", type: "expense", color: "#14b8a6", icon: "🩺" },
  { id: CAT.suscripciones, name: "Suscripciones", type: "expense", color: "#8b5cf6", icon: "📺" },
  { id: CAT.educacion, name: "Educación", type: "expense", color: "#0ea5e9", icon: "📚" },
];

// The twelve months the history covers, oldest first.
export const MONTHS = [
  "2025-10", "2025-11", "2025-12",
  "2026-01", "2026-02", "2026-03",
  "2026-04", "2026-05", "2026-06",
  "2026-07", "2026-08", "2026-09",
];

// Take-home pay per month. It steps rather than drifts, because that is how a
// salary actually moves: a raise lands and then holds for a few months.
export const SALARY = {
  "2025-10": 1_450_000, "2025-11": 1_450_000, "2025-12": 1_600_000,
  "2026-01": 1_600_000, "2026-02": 1_600_000, "2026-03": 1_780_000,
  "2026-04": 1_780_000, "2026-05": 1_780_000, "2026-06": 1_950_000,
  "2026-07": 1_950_000, "2026-08": 2_100_000, "2026-09": 2_100_000,
};

// Rent, which in an ARS lease is renegotiated periodically rather than indexed
// monthly — hence the same stepped shape.
export const RENT = {
  "2025-10": 465_000, "2025-11": 465_000, "2025-12": 465_000,
  "2026-01": 545_000, "2026-02": 545_000, "2026-03": 545_000,
  "2026-04": 610_000, "2026-05": 610_000, "2026-06": 610_000,
  "2026-07": 668_000, "2026-08": 668_000, "2026-09": 668_000,
};

// Private health cover, same idea.
export const HEALTH = {
  "2025-10": 92_000, "2025-11": 92_000, "2025-12": 98_000,
  "2026-01": 104_000, "2026-02": 104_000, "2026-03": 111_000,
  "2026-04": 111_000, "2026-05": 118_000, "2026-06": 118_000,
  "2026-07": 124_000, "2026-08": 128_000, "2026-09": 128_000,
};

// Recurring spend that is the same shop under a different amount each time.
// `spread` is how far the amount may wander from `base`, as a fraction.
export const GROCERY_SHOPS = [
  "Coto", "Carrefour", "Día", "Jumbo", "Verdulería del barrio", "Carnicería Don Julio",
];

export const EATING_OUT = [
  "Almuerzo en la oficina", "Café con Nico", "Pedido de sushi", "Cena con Ana",
  "Empanadas del domingo", "Rappi", "Panadería",
];

export const TRANSPORT = ["Carga SUBE", "Nafta", "Peaje", "Uber", "Estacionamiento"];

export const LEISURE = [
  "Cine", "Recital", "Libros", "Cancha de fútbol", "Salida con amigos", "Museo",
];

export const OTHER = [
  "Regalo de cumpleaños", "Ferretería", "Peluquería", "Farmacia", "Correo",
];

// Utilities: one bill each, on its own day of the month.
export const UTILITIES = [
  { day: 8, description: "Edesur", base: 46_000, spread: 0.22 },
  { day: 11, description: "Metrogas", base: 31_000, spread: 0.35 },
  { day: 2, description: "Fibertel", base: 39_000, spread: 0.04 },
  { day: 14, description: "Personal", base: 24_000, spread: 0.06 },
];

export const SUBSCRIPTIONS = [
  { day: 7, description: "Netflix", base: 9_500 },
  { day: 9, description: "Spotify", base: 6_800 },
];
