import { DownloadBlock } from "@/components/download";
import { Container } from "@/components/ui/container";

// The stub you tear off at the end of the ticket, and the target of the header
// button. It repeats the download rather than sending the visitor back up:
// whoever read the whole page is exactly the person ready to install it.
export function DownloadCta() {
  return (
    <section id="descargar" className="pb-24 sm:pb-32">
      <Container>
        <div className="receipt-shadow">
          <div className="stub grid gap-12 bg-paper px-6 pb-10 pt-14 sm:px-12 sm:pb-14 sm:pt-20 lg:grid-cols-12 lg:gap-x-10 lg:px-16">
            <div className="lg:col-span-5">
              <h2 className="font-wide text-title font-semibold text-balance">
                Bajala y abrila. No hay más.
              </h2>
              <p className="mt-6 max-w-md text-lead text-fade text-pretty">
                Sin cuenta, sin registro, sin conexión. Se instala en tu computadora y los
                datos se quedan ahí.
              </p>
            </div>

            <DownloadBlock className="lg:col-span-6 lg:col-start-7 lg:pt-2" />
          </div>
        </div>
      </Container>
    </section>
  );
}
