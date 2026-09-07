import { DatabaseSync } from "node:sqlite";
import * as D from "./data.mjs";

// Seeds an existing database — one the app itself created on first launch —
// rather than building the schema here.
//
// Creating it from the migration SQL directly does produce the right tables,
// but it leaves sqlx's `_sqlx_migrations` bookkeeping table empty. On the next
// launch sqlx sees an unmigrated database, replays migration 1 against tables
// that already exist, aborts, and the app opens showing zeros in every figure
// — which is exactly what happened the first time round. Letting the app
// migrate and only inserting rows afterwards sidesteps the whole question of
// reproducing sqlx's checksums.
const OUT = process.argv[2];
if (!OUT) throw new Error("uso: node seed.mjs <ruta-del-.db>");

const db = new DatabaseSync(OUT);
db.exec("PRAGMA foreign_keys = ON");

const applied = db.prepare("SELECT count(*) c FROM _sqlx_migrations WHERE success = 1").get().c;
if (applied < 26) {
  throw new Error(`la base tiene ${applied} migraciones aplicadas; abrí la app una vez antes de sembrar`);
}
if (db.prepare("SELECT count(*) c FROM transactions").get().c > 0) {
  throw new Error("la base ya tiene movimientos; sembrar encima duplicaría los datos");
}
const random = D.makeRandom();

// Amount that wanders around a base figure and then lands on a round number,
// because prices in the wild are not exact multiples of anything but they are
// not fifteen significant digits either.
function around(base, spread = 0.18) {
  const value = base * (1 + (random() * 2 - 1) * spread);
  return Math.round(value / 100) * 100;
}

function pick(list) {
  return list[Math.floor(random() * list.length)];
}

function iso(month, day) {
  return `${month}-${String(day).padStart(2, "0")}`;
}

function daysIn(month) {
  const [y, m] = month.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

// September is the month the screenshots are taken in, and it is only a week
// old. Anything dated after the 6th would be in the future.
const LAST_MONTH = D.MONTHS[D.MONTHS.length - 1];
const LAST_DAY = 6;

function isFuture(date) {
  return date > `${LAST_MONTH}-${String(LAST_DAY).padStart(2, "0")}`;
}

const insertTx = db.prepare(
  `INSERT INTO transactions
     (amount, type, category_id, payment_method_id, destination_payment_method_id,
      destination_amount, description, date, currency)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
);

function expense(date, amount, categoryId, paymentMethodId, description) {
  if (isFuture(date)) return;
  insertTx.run(amount, "expense", categoryId, paymentMethodId, null, null, description, date, "ARS");
}

function income(date, amount, categoryId, paymentMethodId, description) {
  if (isFuture(date)) return;
  insertTx.run(amount, "income", categoryId, paymentMethodId, null, null, description, date, "ARS");
}

function transfer(date, amount, from, to, description, destinationAmount = null, currency = "ARS") {
  if (isFuture(date)) return;
  insertTx.run(amount, "transfer", null, from, to, destinationAmount, description, date, currency);
}

// ---------------------------------------------------------------- referencias

for (const category of D.EXTRA_CATEGORIES) {
  db.prepare("INSERT INTO categories (id, name, type, color, icon) VALUES (?, ?, ?, ?, ?)").run(
    category.id, category.name, category.type, category.color, category.icon,
  );
}

for (const method of D.EXTRA_PAYMENT_METHODS) {
  db.prepare(
    "INSERT INTO payment_methods (id, name, type, currency, initial_balance) VALUES (?, ?, ?, ?, ?)",
  ).run(method.id, method.name, method.type, method.currency, method.initial_balance);
}

for (const [id, balance] of Object.entries(D.INITIAL_BALANCES)) {
  db.prepare("UPDATE payment_methods SET initial_balance = ? WHERE id = ?").run(balance, Number(id));
}

// --------------------------------------------------------------- movimientos

const BANK = 4;
const WALLET = 3;
const CASH = 1;

for (const month of D.MONTHS) {
  const days = daysIn(month);

  income(iso(month, 5), D.SALARY[month], D.CAT.salario, BANK, "Sueldo");

  // Aguinaldo: half a salary, in June and December, as the law has it.
  if (month.endsWith("-06") || month.endsWith("-12")) {
    income(iso(month, 18), Math.round(D.SALARY[month] / 2), D.CAT.salario, BANK, "Aguinaldo");
  }

  // The occasional job on the side, a few times a year.
  if (["2025-11", "2026-02", "2026-05", "2026-08"].includes(month)) {
    income(iso(month, 21), around(320_000, 0.3), D.CAT.freelance, WALLET, "Trabajo freelance");
  }

  expense(iso(month, 3), D.RENT[month], D.CAT.alquiler, BANK, "Alquiler");
  // Left unrecorded in the final month on purpose: it is one of the two
  // commitments the screenshots show waiting to be confirmed, and a charge that
  // is both already booked and still pending is a contradiction on screen.
  if (month !== LAST_MONTH) {
    expense(iso(month, 5), D.HEALTH[month], D.CAT.salud, BANK, "Prepaga");
  }

  for (const bill of D.UTILITIES) {
    expense(iso(month, bill.day), around(bill.base, bill.spread), D.CAT.servicios, BANK, bill.description);
  }

  for (const sub of D.SUBSCRIPTIONS) {
    expense(iso(month, sub.day), sub.base, D.CAT.suscripciones, D.CARD_ID, sub.description);
  }

  // The weekly shop, four times a month.
  for (const day of [4, 11, 18, 25]) {
    if (day > days) continue;
    expense(iso(month, day), around(88_000, 0.28), D.CAT.supermercado, pick([WALLET, D.CARD_ID, BANK]), pick(D.GROCERY_SHOPS));
  }

  for (const day of [2, 7, 13, 19, 24, 28]) {
    if (day > days) continue;
    expense(iso(month, day), around(17_500, 0.5), D.CAT.comida, pick([WALLET, CASH, D.CARD_ID]), pick(D.EATING_OUT));
  }

  for (const day of [6, 16, 27]) {
    if (day > days) continue;
    expense(iso(month, day), around(24_000, 0.55), D.CAT.transporte, pick([WALLET, CASH]), pick(D.TRANSPORT));
  }

  for (const day of [10, 22]) {
    expense(iso(month, day), around(31_000, 0.6), D.CAT.ocio, pick([D.CARD_ID, WALLET]), pick(D.LEISURE));
  }

  expense(iso(month, 15), around(22_000, 0.7), D.CAT.otros, pick([CASH, WALLET]), pick(D.OTHER));

  // A course, twice in the year.
  if (["2026-03", "2026-08"].includes(month)) {
    expense(iso(month, 12), around(145_000, 0.1), D.CAT.educacion, BANK, "Curso de inglés");
  }

  // Money moving between the person's own accounts. Without these the cash,
  // the wallet and the card only ever pay out and drift further into the red
  // every month — an account that nobody ever tops up is the giveaway that a
  // dataset was generated rather than lived in.
  transfer(iso(month, 5), 95_000, BANK, CASH, "Extracción cajero");
  transfer(iso(month, 5), 135_000, BANK, WALLET, "Carga Mercado Pago");
  transfer(iso(month, 28), around(232_000, 0.12), BANK, D.CARD_ID, "Pago tarjeta Visa");

  // What is left over goes to the savings account, and once a quarter some of
  // it is turned into dollars — the two moves that make the transfer type and
  // the MEP conversion visible on the transactions screen.
  transfer(iso(month, 6), 250_000, BANK, D.SAVINGS_ACCOUNT_ID, "Ahorro del mes");

  if (["2025-12", "2026-03", "2026-06", "2026-09"].includes(month)) {
    const pesos = 300_000;
    const rate = 1_520 + D.MONTHS.indexOf(month) * 9;
    transfer(iso(month, 6), pesos, BANK, 5, "Compra de dólares (MEP)", Math.round((pesos / rate) * 100) / 100);
  }
}

console.log("transacciones:", db.prepare("SELECT count(*) c FROM transactions").get().c);

// ------------------------------------------------------------- presupuestos

// Caps that a real person would actually set: round, a little above what they
// usually spend, and not all of them comfortable. None is blown, on purpose —
// an overspent budget puts a red warning across the statistics screen, which is
// an honest feature but a poor thing to freeze into a marketing screenshot.
const BUDGETS = [
  [D.CAT.supermercado, 420_000],
  [D.CAT.comida, 130_000],
  [D.CAT.transporte, 95_000],
  [D.CAT.ocio, 85_000],
  [D.CAT.servicios, 155_000],
  [D.CAT.suscripciones, 20_000],
  [D.CAT.salud, 140_000],
];

for (const [categoryId, amount] of BUDGETS) {
  db.prepare(
    "INSERT INTO budgets (category_id, currency, amount, period) VALUES (?, 'ARS', ?, 'monthly')",
  ).run(categoryId, amount);
}

// --------------------------------------------------------------- compromisos

// `last_confirmed_date` is what decides whether something is waiting: the app
// counts a recurrence as pending once its next date has arrived. Two are left
// due so the statistics screen opens with the neutral "pendientes de confirmar"
// notice — the one banner worth showing, because it demonstrates that nothing
// is ever written without the user saying so.
const RECURRING = [
  ["Alquiler", 668_000, "expense", D.CAT.alquiler, BANK, "monthly", "2025-10-03", "2026-09-03"],
  ["Sueldo", 2_100_000, "income", D.CAT.salario, BANK, "monthly", "2025-10-05", "2026-09-05"],
  ["Prepaga", 128_000, "expense", D.CAT.salud, BANK, "monthly", "2025-10-05", "2026-08-05"],
  ["Netflix", 9_500, "expense", D.CAT.suscripciones, D.CARD_ID, "monthly", "2025-10-07", "2026-08-07"],
  ["Spotify", 6_800, "expense", D.CAT.suscripciones, D.CARD_ID, "monthly", "2025-10-09", "2026-08-09"],
  ["Fibertel", 39_000, "expense", D.CAT.servicios, BANK, "monthly", "2025-10-02", "2026-09-02"],
];

for (const [description, amount, type, categoryId, methodId, frequency, start, lastConfirmed] of RECURRING) {
  db.prepare(
    `INSERT INTO recurring_transactions
       (description, amount, type, category_id, payment_method_id, currency,
        frequency, start_date, last_confirmed_date, is_active)
     VALUES (?, ?, ?, ?, ?, 'ARS', ?, ?, ?, 1)`,
  ).run(description, amount, type, categoryId, methodId, frequency, start, lastConfirmed);
}

// Instalment plans, all mid-way through and none due today, so they show up as
// commitments with a remaining balance without adding to the pending count.
const INSTALMENTS = [
  ["Notebook Lenovo", 1_800_000, 12, D.CAT.otros, "2026-03-15", 6, 1_620_000],
  ["Heladera Samsung", 960_000, 6, D.CAT.otros, "2026-05-20", 4, 890_000],
  ["Bicicleta", 540_000, 9, D.CAT.ocio, "2026-04-10", 5, 495_000],
];

for (const [description, total, count, categoryId, firstDue, confirmed, cash] of INSTALMENTS) {
  db.prepare(
    `INSERT INTO installment_plans
       (description, total_amount, installment_count, currency, category_id,
        payment_method_id, first_due_date, confirmed_count, created_at, cash_price)
     VALUES (?, ?, ?, 'ARS', ?, ?, ?, ?, ?, ?)`,
  ).run(description, total, count, categoryId, D.CARD_ID, firstDue, confirmed, `${firstDue}T10:00:00Z`, cash);
}

db.prepare(
  `INSERT INTO loans
     (direction, counterparty, description, principal, currency, annual_rate,
      installment_count, category_id, payment_method_id, first_due_date,
      confirmed_count, created_at)
   VALUES ('lent', ?, ?, ?, 'ARS', 0, ?, ?, ?, ?, ?, ?)`,
).run("Martín", "Plata que le presté para la mudanza", 350_000, 5, D.CAT.otros, BANK, "2026-06-01", 4, "2026-06-01T12:00:00Z");

// ------------------------------------------------------------------- ahorros

const goals = [
  ["Fondo de emergencia", 4_000_000, "ARS", "account", D.SAVINGS_ACCOUNT_ID, "2027-03-31"],
  ["Viaje a Brasil", 1_500_000, "ARS", "contributions", null, "2027-01-15"],
  ["Dólares", 3_000, "USD", "account", 5, null],
];

for (const [name, target, currency, mode, methodId, targetDate] of goals) {
  db.prepare(
    `INSERT INTO savings_goals
       (name, target_amount, currency, tracking_mode, payment_method_id, target_date, created_at)
     VALUES (?, ?, ?, ?, ?, ?, '2025-10-01T12:00:00Z')`,
  ).run(name, target, currency, mode, methodId, targetDate);
}

// The Brazil trip is tracked by hand, so it needs its own contributions.
const tripId = db.prepare("SELECT id FROM savings_goals WHERE name = 'Viaje a Brasil'").get().id;
for (const month of D.MONTHS.slice(3, 11)) {
  db.prepare("INSERT INTO savings_contributions (goal_id, amount, date, note) VALUES (?, ?, ?, ?)").run(
    tripId, around(115_000, 0.2), `${month}-20`, null,
  );
}

// ------------------------------------------------------- etiquetas y reglas

for (const name of ["viaje", "trabajo", "regalo", "salud"]) {
  db.prepare("INSERT INTO tags (name) VALUES (?)").run(name);
}

const RULES = [
  ["coto", D.CAT.supermercado],
  ["carrefour", D.CAT.supermercado],
  ["sube", D.CAT.transporte],
  ["netflix", D.CAT.suscripciones],
  ["spotify", D.CAT.suscripciones],
  ["edesur", D.CAT.servicios],
];

for (const [pattern, categoryId] of RULES) {
  db.prepare("INSERT INTO category_rules (pattern, category_id) VALUES (?, ?)").run(pattern, categoryId);
}

// ------------------------------------------------------------- cotizaciones

// Enough history for the rate bar to have something to show, ending the day
// before the screenshots. The app refreshes this from a public API on launch,
// so these are a floor rather than the final word.
let rate = 1_452;
for (let offset = 120; offset >= 1; offset--) {
  const date = new Date(Date.UTC(2026, 8, 7) - offset * 86_400_000).toISOString().slice(0, 10);
  rate = Math.round((rate * (1 + (random() * 2 - 1) * 0.004) + 1.4) * 100) / 100;
  db.prepare(
    `INSERT INTO exchange_rates (date, rate_type, buy, sell, source, fetched_at)
     VALUES (?, 'bolsa', ?, ?, 'seed', ?)`,
  ).run(date, Math.round(rate * 0.985 * 100) / 100, rate, `${date}T21:00:00Z`);
}

// ---------------------------------------------------------------- ajustes

// A backup taken three days ago, so the screenshots do not open with the
// "hace X días que no guardás una copia" warning; the last finished month
// marked as seen, so the month-close notice stays out of the way too.
const SETTINGS = [
  ["last_backup_at", "2026-09-04T18:20:00Z"],
  ["exchange_rate_type", "bolsa"],
  ["notifications_enabled", "false"],
  ["last_seen_close", "2026-08"],
];

for (const [key, value] of SETTINGS) {
  db.prepare("INSERT INTO app_settings (key, value) VALUES (?, ?)").run(key, value);
}

// -------------------------------------------------------------- verificación

const counts = {};
for (const table of ["transactions", "budgets", "recurring_transactions", "installment_plans",
  "loans", "savings_goals", "savings_contributions", "categories", "payment_methods",
  "exchange_rates", "category_rules", "tags"]) {
  counts[table] = db.prepare(`SELECT count(*) c FROM "${table}"`).get().c;
}
console.log(counts);

const totals = db.prepare(
  `SELECT type, round(sum(amount)) total FROM transactions WHERE currency = 'ARS' GROUP BY type`,
).all();
console.log("totales ARS:", totals);
db.close();
