import { AppShot } from "@/components/ui/app-shot";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

// Three chapters rather than a grid of loose features: each one answers a
// different question ("¿qué cargo?", "¿qué veo?", "¿qué planifico?"), and the
// capture that belongs to it sits next to it.
const CHAPTERS = [
  {
    title: "Registrás todo en un solo lugar",
    lead: "Ingresos, gastos y transferencias entre tus propias cuentas. Cada movimiento con su categoría, su medio de pago y, si hace falta, el comprobante adjunto.",
    items: [
      "Cuentas y medios de pago: banco, efectivo, billetera virtual, tarjeta.",
      "Categorías con ícono y color, y reglas que clasifican solas lo que se repite todos los meses.",
      "Etiquetas y comprobantes adjuntos en cualquier movimiento.",
      "Importación y exportación en CSV.",
    ],
    shots: [{ name: "transacciones", alt: "Listado de movimientos con categoría, cuenta y tipo" }],
  },
  {
    title: "Ves a dónde se va la plata",
    lead: "La foto del mes sin tener que armarla: cuánto entró, cuánto salió y en qué.",
    items: [
      "Ingresos contra gastos, y el desglose por categoría.",
      "Presupuestos por categoría, mensuales o anuales, con lo que va consumido.",
      "Varias monedas a la vez, con la cotización del dólar MEP al día.",
    ],
    shots: [{ name: "resumen", alt: "Resumen del mes: balance, gastos, presupuesto disponible y ahorro" }],
  },
  {
    title: "Planificás lo que viene",
    lead: "Lo que ya sabés que va a pasar, cargado una vez.",
    items: [
      "Gastos recurrentes: la app te los propone en su fecha y vos confirmás. Nada se registra hasta que lo confirmes.",
      "Compras en cuotas, con el saldo pendiente y las fechas siempre calculados.",
      "Metas de ahorro, con la proyección de si llegás a la fecha que te pusiste.",
    ],
    shots: [
      { name: "compromisos", alt: "Compromisos: movimientos recurrentes esperando confirmación" },
      { name: "ahorros", alt: "Objetivos de ahorro, con el ritmo y la fecha en que se alcanzarían" },
    ],
  },
] as const;

// The narrow text column runs taller than the capture beside it, which is what
// makes the sticky worth having: the screenshot holds still while its own list
// of claims scrolls past it, and releases when the chapter ends. It is the
// section's whole gesture, and it costs one class.
export function Features() {
  return (
    <Section id="producto" tone="raised">
      <SectionHeading
        eyebrow="Producto"
        index="01"
        title="Todo lo que necesitás para llevar tus cuentas"
        lead="Sin funciones de más ni pantallas que no vas a abrir nunca."
      />

      <div className="mt-24 flex flex-col gap-28 sm:mt-32 lg:gap-36">
        {CHAPTERS.map((chapter, index) => {
          const flipped = index % 2 === 1;

          return (
            <article
              key={chapter.title}
              className="grid items-start gap-12 lg:grid-cols-12 lg:gap-x-8"
            >
              <div
                className={cn(
                  "lg:col-span-4",
                  flipped ? "lg:order-2 lg:col-start-9" : "lg:col-start-1",
                )}
              >
                <Reveal
                  as="p"
                  index={0}
                  className="text-sm font-medium tabular-nums text-muted-foreground"
                >
                  {String(index + 1).padStart(2, "0")}
                </Reveal>
                <Reveal
                  as="h3"
                  variant="line"
                  index={1}
                  className="mt-4 text-subtitle font-semibold text-balance"
                >
                  {chapter.title}
                </Reveal>
                <Reveal
                  as="p"
                  index={2}
                  className="mt-4 leading-relaxed text-muted-foreground text-pretty"
                >
                  {chapter.lead}
                </Reveal>

                <ul className="mt-8 flex flex-col gap-5">
                  {chapter.items.map((item, itemIndex) => (
                    <Reveal
                      key={item}
                      as="li"
                      index={3 + itemIndex}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {item}
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* La columna se fija sólo cuando lleva una captura: con dos,
                  ya es más alta que el texto de al lado y no hay nada que
                  fijar — quedaría clavada mostrando la primera mientras la
                  segunda queda fuera de la pantalla. */}
              <div
                className={cn(
                  "flex flex-col gap-8 lg:col-span-7",
                  chapter.shots.length === 1 && "lg:sticky lg:top-28",
                  flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-6",
                )}
              >
                {chapter.shots.map((shot) => (
                  <AppShot
                    key={shot.name}
                    name={shot.name}
                    alt={shot.alt}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
