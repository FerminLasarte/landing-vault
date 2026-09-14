import { DownloadCta } from "@/components/sections/download-cta";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { LocalFirst } from "@/components/sections/local-first";
import { Verifiable } from "@/components/sections/verifiable";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// The order is the argument: the offer and its proof, what the app does, why
// local-first, what you can check for yourself, the objections, and only then
// the download.
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <Features />
        <LocalFirst />
        <Verifiable />
        <Faq />
        <DownloadCta />
      </main>

      <SiteFooter />
    </>
  );
}
