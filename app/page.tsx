import CallToAction from "@/sections/CallToAction";
import Faqs from "@/sections/Faqs";
import Features from "@/sections/Features";
import Hero from "@/sections/Hero";
import Testimonials from "@/sections/Testimonials";
import Introduction from "@/sections/Introduction";
import LogoTicker from "@/sections/LogoTicker";

export default function Home() {
    return (
        <>
            <Hero />
            <LogoTicker />
            <Introduction />
            <Features />
            <Testimonials />
            <Faqs />
            <CallToAction />
        </>
    );
}
