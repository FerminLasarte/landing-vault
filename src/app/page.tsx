import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { LocalFirst } from "@/components/sections/local-first";
import { DataDetail } from "@/components/sections/data-detail";
import { WaitlistCta } from "@/components/sections/waitlist-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <Features />
        <LocalFirst />
        <DataDetail />
        <Faq />
        <WaitlistCta />
      </main>

      <SiteFooter />
    </>
  );
}
