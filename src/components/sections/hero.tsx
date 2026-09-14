import { DownloadBlock } from "@/components/download";
import { AppShot } from "@/components/ui/app-shot";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Leaders, Receipt, ReceiptHeading, type ReceiptRow } from "@/components/ui/receipt";

// A sample month. The categories are made up, but they add up to the total the
// app's own capture below shows, so the ticket and the screenshot tell the same
// story. Labelled as sample data on the ticket itself.
const EXPENSES: readonly ReceiptRow[] = [
  { label: "Alquiler", value: "320.000,00" },
  { label: "Supermercado", value: "214.300,00" },
  { label: "Salidas", value: "100.000,00" },
  { label: "Tarjeta, cuota 3 de 6", value: "92.850,00" },
  { label: "Servicios", value: "61.450,00" },
  { label: "Transporte", value: "38.200,00" },
];

const PROOF: readonly ReceiptRow[] = [
  { label: "Guardado en", value: "tu computadora", accent: true },
  { label: "Cuenta creada", value: "ninguna" },
  { label: "Copias en la nube", value: "0" },
];

// The fold states the offer on the left and proves it on the right: a ticket
// of the month that prints line by line as the page opens, ending in where the
// data lives. The real app capture hangs from it.
export function Hero() {
  return (
    <section className="pb-24 pt-12 sm:pb-32 sm:pt-16 lg:pt-24">
      <Container>
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <h1 className="font-wide text-display font-semibold text-balance">
              Tus cuentas, en tu computadora.
            </h1>
            <p className="mt-6 max-w-md text-lead text-fade text-pretty">
              Vault ordena gastos, presupuestos y ahorros como tu planilla, pero sin
              fórmulas. Sin cuenta, sin nube.
            </p>
            <DownloadBlock className="mt-10" detail="brief" />
          </div>

          <figure
            aria-label="Ejemplo de un resumen mensual en Vault"
            className="relative z-10 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9"
          >
            <Receipt print="load" className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="flex items-center gap-2">
                <Logo className="h-4 w-auto" />
                <ReceiptHeading>Vault</ReceiptHeading>
              </div>
              <p className="text-fade">Resumen de septiembre 2026</p>
              <hr />
              <Leaders rows={EXPENSES} />
              <hr />
              <div className="flex items-baseline justify-between gap-4 font-sans font-wide font-semibold">
                <span className="text-sm uppercase">Total gastos</span>
                <span className="text-lg tabular-nums">826.800,00</span>
              </div>
              <p className="text-right text-fade">ARS</p>
              <hr />
              <Leaders rows={[{ label: "Dólar MEP", value: "1.533,70 ARS" }]} />
              <p className="text-fade">Origen: API pública, solo lectura</p>
              <hr />
              <Leaders rows={PROOF} />
              <p className="mt-6 text-center text-fade">Datos de ejemplo</p>
            </Receipt>
          </figure>
        </div>
      </Container>

      {/* The capture is the ticket's attachment: on wide screens the torn edge
          lands on the window's title bar instead of floating above it. Any
          deeper and it half-covers the app's own toolbar buttons. */}
      <Container width="wide" className="mt-8 lg:-mt-6">
        <AppShot
          name="estadisticas"
          alt="Estadísticas de Vault: gastos por categoría e ingresos contra gastos, mes a mes"
          important
          sizes="(min-width: 100rem) 100rem, 100vw"
        />
      </Container>
    </section>
  );
}
