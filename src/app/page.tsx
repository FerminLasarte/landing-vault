import { DataDetail } from "@/components/sections/data-detail";
import { DownloadCta } from "@/components/sections/download-cta";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { LocalFirst } from "@/components/sections/local-first";
import { Pillars } from "@/components/sections/pillars";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// The order is the argument: what it is, why you would care, what it does, why
// local-first, what that means in practice, the objections, and only then the
// download. No section announces itself with a rule — the separation is tone
// and rhythm, which is what keeps the page reading as one document.
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <Pillars />
        <Features />
        <LocalFirst />
        <DataDetail />
        <Faq />
        <DownloadCta />
      </main>

      <SiteFooter />
    </>
  );
}
