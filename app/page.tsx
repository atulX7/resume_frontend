import { AccordionComponent } from "@/components/homepage/accordion-component";
import CareerTips from "@/components/homepage/career-tips";
import HeroSection from "@/components/homepage/hero-section";
import MarketingCards from "@/components/homepage/marketing-cards";
import { MarqueeDemo } from "@/components/homepage/marquee-demo";
import SideBySide from "@/components/homepage/side-by-side";
import { Footer } from "@/components/layout/footer";

export default async function Home() {
  return (
    <>
      <main>
        <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
          <HeroSection />
        </div>
        <SideBySide />
        <MarketingCards />
        <CareerTips />
        <MarqueeDemo />
        <AccordionComponent />
      </main>
      <Footer />
    </>
  );
}