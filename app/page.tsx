import { AccordionComponent } from "@/components/homepage/accordion-component";
import { BetaBanner } from "@/components/homepage/beta-banner";
import CareerTips from "@/components/homepage/career-tips";
import HeroSection from "@/components/homepage/hero-section";
import MarketingCards from "@/components/homepage/marketing-cards";
import { MarqueeDemo } from "@/components/homepage/marquee-demo";
import SideBySide from "@/components/homepage/side-by-side";
import { Footer } from "@/components/homepage/footer";

export default function Home() {
  return (
    <>
      <main>
        <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
          <HeroSection />
        </div>
        <BetaBanner />
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