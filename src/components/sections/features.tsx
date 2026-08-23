import { AppShot } from "@/components/ui/app-shot";
import { Section, SectionHeading } from "@/components/ui/section";
import { revealDelay } from "@/lib/reveal";

// Three groups rather than a grid of loose features: each one answers a
// different question ("¿qué cargo?", "¿qué veo?", "¿qué planifico?"), and the
// screenshot that belongs to it sits next to it.
const GROUPS = [
  {
    title: "Registrás todo en un solo lugar",
    lead: "Ingresos, gastos y transferencias entre tus propias cuentas. Cada movimiento con su categoría, su medio de pago y, si hace falta, el comprobante adjunto.",
    items: [
      "Cuentas y medios de pago: banco, efectivo, billetera virtual, tarjeta.",
      "Categorías con ícono y color, y reglas que clasifican solas lo que se repite todos los meses.",
      "Etiquetas y comprobantes adjuntos en cualquier movimiento.",
      "Importación y exportación en CSV.",
    ],
    shot: { name: "transacciones", alt: "Listado de transacciones" },
  },
  {
    title: "Ves a dónde se va la plata",
    lead: "La foto del mes sin tener que armarla: cuánto entró, cuánto salió y en qué.",
    items: [
      "Ingresos contra gastos, y el desglose por categoría.",
      "Presupuestos por categoría, mensuales o anuales, con lo que va consumido.",
      "Varias monedas a la vez, con la cotización del dólar MEP al día.",
    ],
    shot: { name: "presupuestos", alt: "Presupuestos por categoría" },
  },
  {
    title: "Planificás lo que viene",
    lead: "Lo que ya sabés que va a pasar, cargado una vez.",
    items: [
      "Gastos recurrentes: la app te los propone en su fecha y vos confirmás. Nada se registra hasta que lo confirmes.",
      "Compras en cuotas, con el saldo pendiente y las fechas siempre calculados.",
      "Metas de ahorro, con la proyección de si llegás a la fecha que te pusiste.",
    ],
    shot: { name: "recurrentes", alt: "Gastos recurrentes pendientes de confirmar" },
  },
] as const;

export function Features() {
  return (
    <Section id="producto">
      <SectionHeading
        eyebrow="Producto"
        title="Todo lo que necesitás para llevar tus cuentas"
        lead="Sin funciones de más ni pantallas que no vas a abrir nunca."
      />

      <div className="mt-16 flex flex-col gap-20">
        {GROUPS.map((group, index) => (
          <div
            key={group.title}
            className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <h3
                data-reveal
                style={revealDelay(0)}
                className="text-xl font-semibold tracking-tight"
              >
                {group.title}
              </h3>
              <p
                data-reveal
                style={revealDelay(1)}
                className="mt-3 leading-relaxed text-muted-foreground text-pretty"
              >
                {group.lead}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {group.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    data-reveal
                    style={revealDelay(2 + itemIndex)}
                    className="border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <AppShot
              name={group.shot.name}
              alt={group.shot.alt}
              revealStyle={revealDelay(1)}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
