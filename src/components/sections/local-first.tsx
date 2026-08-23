import { Section, SectionHeading } from "@/components/ui/section";
import { revealDelay } from "@/lib/reveal";

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
  {
    aspect: "Cuenta de usuario",
    vault: "No hace falta",
    cloud: "Obligatoria",
  },
  {
    aspect: "Acceso a tu banco",
    vault: "Nunca se pide",
    cloud: "Suele pedirse",
  },
  {
    aspect: "Sin conexión",
    vault: "Funciona igual",
    cloud: "Limitada o no funciona",
  },
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
        title="La diferencia está en dónde viven tus datos"
        lead="Casi toda app de finanzas guarda tus movimientos en el servidor de otro. Vault los guarda en el tuyo, que es simplemente tu computadora."
      />

      <div className="mt-14 grid gap-10 sm:grid-cols-3">
        {ARGUMENTS.map((argument, index) => (
          <div key={argument.title} data-reveal style={revealDelay(index)}>
            <h3 className="font-semibold tracking-tight">{argument.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
              {argument.body}
            </p>
          </div>
        ))}
      </div>

      {/* Wide on a narrow screen, so it scrolls inside its own box instead of
          making the whole page scroll sideways. */}
      <div data-reveal className="mt-16 overflow-x-auto">
        <table className="w-full min-w-lg border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-6 font-medium text-muted-foreground">
                <span className="sr-only">Aspecto</span>
              </th>
              <th className="py-3 pr-6 font-semibold">Vault</th>
              <th className="py-3 font-medium text-muted-foreground">
                Apps en la nube
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, index) => (
              <tr
                key={row.aspect}
                data-reveal="row"
                style={revealDelay(index, 60)}
                className="border-b border-border"
              >
                <th scope="row" className="py-4 pr-6 font-normal text-muted-foreground">
                  {row.aspect}
                </th>
                <td className="py-4 pr-6">{row.vault}</td>
                <td className="py-4 text-muted-foreground">{row.cloud}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
