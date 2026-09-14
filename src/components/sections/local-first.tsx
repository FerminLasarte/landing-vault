import { Receipt } from "@/components/ui/receipt";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

// Hedged on purpose: "suele" and "depende del plan" are accurate about the
// category as a whole, and a comparison that overstates the other side is the
// fastest way to lose the argument.
const COMPARISON = [
  {
    aspect: "Dónde se guardan tus movimientos",
    vault: "En un archivo, en tu computadora",
    cloud: "En el servidor del proveedor",
  },
  { aspect: "Cuenta de usuario", vault: "No hace falta", cloud: "Obligatoria" },
  { aspect: "Claves del banco", vault: "Nunca se piden", cloud: "Suelen pedirse" },
  { aspect: "Sin internet", vault: "Funciona igual", cloud: "Limitada o no funciona" },
  {
    aspect: "Si el servicio cierra",
    vault: "Seguís con la app y el archivo",
    cloud: "Exportás lo que te dejen, mientras te dejen",
  },
  {
    aspect: "Llevarte todo",
    vault: "CSV o copia completa, cuando quieras",
    cloud: "Depende del plan",
  },
] as const;

type Side = "vault" | "cloud";

// The same six lines on two tickets. The cloud one is printed in faded ink,
// which is what happens to a receipt you do not keep.
function Ticket({ side, title, subtitle }: { side: Side; title: string; subtitle: string }) {
  const kept = side === "vault";

  return (
    <Receipt className={cn(!kept && "md:mt-20")} paperClassName={cn(!kept && "text-fade")}>
      <h3 className="font-sans font-wide text-sm font-semibold uppercase">{title}</h3>
      <p className="text-fade">{subtitle}</p>
      <dl>
        {COMPARISON.map((row) => (
          <div key={row.aspect}>
            <hr />
            <dt className="text-fade">{row.aspect}</dt>
            <dd className={cn(kept && "font-semibold")}>{row[side]}</dd>
          </div>
        ))}
      </dl>
    </Receipt>
  );
}

export function LocalFirst() {
  return (
    <Section id="local-first">
      <SectionHeading
        title="La diferencia es dónde queda tu información."
        lead="Casi toda app de finanzas guarda tus movimientos en el servidor de otro. Vault los deja en tu computadora."
      />

      <div className="mt-16 grid max-w-5xl gap-10 sm:mt-20 md:grid-cols-2 lg:gap-16">
        <Ticket side="vault" title="Vault" subtitle="En tu computadora" />
        <Ticket side="cloud" title="Apps en la nube" subtitle="En el servidor de otro" />
      </div>
    </Section>
  );
}
