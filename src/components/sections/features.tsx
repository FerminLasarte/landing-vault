import { Fragment } from "react";

import { AppShot } from "@/components/ui/app-shot";
import { Leaders, Receipt, ReceiptHeading, type ReceiptRow } from "@/components/ui/receipt";
import { Section, SectionHeading } from "@/components/ui/section";

// Everything the app does, itemised like a ticket: what you record, what you
// see, what you plan.
const GROUPS: readonly { heading: string; rows: readonly ReceiptRow[] }[] = [
  {
    heading: "Registrás",
    rows: [
      { label: "Cuentas", value: "banco, efectivo, billetera" },
      { label: "Categorías", value: "con reglas automáticas" },
      { label: "Comprobantes", value: "adjuntos al gasto" },
      { label: "CSV", value: "importar y exportar" },
    ],
  },
  {
    heading: "Ves",
    rows: [
      { label: "Balance", value: "ingresos contra gastos" },
      { label: "Presupuestos", value: "mensuales o anuales" },
      { label: "Monedas", value: "pesos y dólares, MEP al día" },
    ],
  },
  {
    heading: "Planificás",
    rows: [
      { label: "Recurrentes", value: "vos confirmás cada uno" },
      { label: "Cuotas", value: "saldo y fechas al día" },
      { label: "Ahorro", value: "metas con proyección" },
    ],
  },
];

// `frame` crops a capture whose bottom edge cuts through a card, so it ends on
// a whole row instead. The ratio is the capture's width over the height kept;
// the phone ratio ends compromisos right after its "Registrar todos" card.
const SHOTS = [
  {
    name: "transacciones",
    alt: "Listado de movimientos con categoría, cuenta y tipo",
    caption: "Cada movimiento con su categoría, su cuenta y, si hace falta, el comprobante.",
    frame: undefined,
  },
  {
    name: "resumen",
    alt: "Resumen del mes: balance, gastos, presupuesto disponible y ahorro",
    caption: "La foto del mes sin armarla: cuánto entró, cuánto salió y en qué.",
    frame: "sm:aspect-[2880/1620]",
  },
  {
    name: "compromisos",
    alt: "Compromisos: movimientos recurrentes esperando confirmación",
    caption: "Lo recurrente aparece en su fecha y no se registra hasta que lo confirmes.",
    frame: "max-sm:aspect-[100/68] sm:aspect-[2880/1736]",
  },
] as const;

// The itemised ticket holds still while the captures that back it scroll past.
export function Features() {
  return (
    <Section id="producto">
      <SectionHeading
        title="Todo lo de tu planilla, sin tener que armarla."
        lead="Cargás cada movimiento una vez. Vault arma el resumen, controla el presupuesto y te avisa lo que viene."
      />

      <div className="mt-16 grid items-start gap-16 sm:mt-20 lg:grid-cols-12 lg:gap-x-10">
        <Receipt className="w-full max-w-md lg:sticky lg:top-24 lg:col-span-4 lg:max-w-none">
          <ReceiptHeading>Qué incluye</ReceiptHeading>
          {GROUPS.map((group) => (
            <Fragment key={group.heading}>
              <hr />
              <p className="font-semibold uppercase">{group.heading}</p>
              <Leaders rows={group.rows} className="mt-1" />
            </Fragment>
          ))}
          <hr />
          <Leaders rows={[{ label: "Precio hoy", value: "0,00 ARS", accent: true }]} />
        </Receipt>

        {/* Wide on desktop; on a phone, zoomed to the top of each window, at a
            size where the interface can actually be read. */}
        <div className="flex flex-col gap-16 lg:col-span-8 lg:col-start-5">
          {SHOTS.map((shot) => (
            <figure key={shot.name}>
              <AppShot
                name={shot.name}
                alt={shot.alt}
                zoomOnPhone
                className={shot.frame}
                sizes="(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 190vw"
              />
              <figcaption className="mt-4 max-w-xl text-sm text-fade text-pretty">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
