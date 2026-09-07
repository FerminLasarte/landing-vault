import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { revealDelay } from "@/lib/reveal";
import { cn } from "@/lib/utils";

const ARGUMENTS = [
  {
    title: "No hay cuenta que crear",
    body: "No hay registro, ni contraseña, ni mail. Abrís la app y empezás. No podemos filtrar datos tuyos porque no tenemos ninguno.",
  },
  {
    title: "No te pedimos las claves del banco",
    body: "Vault no se conecta a tu banco ni te pide credenciales de nada. Cargás lo que querés registrar, o lo importás desde un CSV.",
  },
  {
    title: "Funciona sin internet",
    body: "No depende de un servidor. Si te quedás sin conexión — o si el proyecto desaparece mañana — la app sigue abriendo y tus datos siguen ahí.",
  },
] as const;

// Hedged on purpose: "suele" and "depende del plan" are accurate about the
// category as a whole, and a comparison table that overstates the other side is
// the fastest way to lose the argument.
const COMPARISON = [
  {
    aspect: "Dónde se guardan tus movimientos",
    vault: "En un archivo, en tu disco",
    cloud: "En el servidor del proveedor",
  },
  { aspect: "Cuenta de usuario", vault: "No hace falta", cloud: "Obligatoria" },
  { aspect: "Acceso a tu banco", vault: "Nunca se pide", cloud: "Suele pedirse" },
  { aspect: "Sin conexión", vault: "Funciona igual", cloud: "Limitada o no funciona" },
  {
    aspect: "Si el servicio cierra",
    vault: "Seguís teniendo la app y el archivo",
    cloud: "Exportás lo que te dejen, mientras te dejen",
  },
  {
    aspect: "Llevarte todo",
    vault: "CSV o copia completa, cuando quieras",
    cloud: "Depende del plan",
  },
] as const;

export function LocalFirst() {
  return (
    <Section id="local-first">
      <SectionHeading
        eyebrow="Por qué local-first"
        index="02"
        title="La diferencia está en dónde viven tus datos"
        lead="Casi toda app de finanzas guarda tus movimientos en el servidor de otro. Vault los guarda en el tuyo, que es simplemente tu computadora."
      />

      <div className="mt-20 grid gap-12 sm:mt-24 sm:grid-cols-3 sm:gap-10">
        {ARGUMENTS.map((argument, index) => (
          <Reveal key={argument.title} index={index}>
            <h3 className="text-lead font-semibold tracking-tight">
              {argument.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
              {argument.body}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Wide on a narrow screen, so it scrolls inside its own box instead of
          making the whole page scroll sideways. `border-separate` rather than
          the usual collapse: the Vault column is a raised panel with rounded
          ends, and collapsed borders round badly. */}
      <div data-reveal className="mt-20 overflow-x-auto sm:mt-24">
        <table className="w-full min-w-2xl border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              <th className="w-2/5 py-4 pr-8 font-medium">
                <span className="sr-only">Aspecto</span>
              </th>
              <th className="w-[30%] rounded-t-xl bg-surface px-6 py-4 font-semibold">
                Vault
              </th>
              <th className="w-[30%] px-6 py-4 font-medium text-muted-foreground">
                Apps en la nube
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, index) => {
              const last = index === COMPARISON.length - 1;
              const line = last ? "" : "border-b border-border";

              return (
                <tr key={row.aspect} data-reveal="row" style={revealDelay(index, 60)}>
                  <th
                    scope="row"
                    className={cn("py-5 pr-8 font-normal text-muted-foreground", line)}
                  >
                    {row.aspect}
                  </th>
                  <td
                    className={cn(
                      "bg-surface px-6 py-5 font-medium",
                      line,
                      last && "rounded-b-xl",
                    )}
                  >
                    {row.vault}
                  </td>
                  <td className={cn("px-6 py-5 text-muted-foreground", line)}>
                    {row.cloud}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
