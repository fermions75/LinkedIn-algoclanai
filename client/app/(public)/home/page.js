
import CallToAction from "@/components/landing/CallToAction";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";

import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";

import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";

export default async function LandingPage() {
  
  return (
    <>
      
      <main>
        <Hero />
        <section id="features">
          <Features />
        </section>
        <HowItWorks />
        <section id="pricing">
          <Pricing />
        </section>
        <Testimonials />
        <FAQ />
        <CallToAction />
      </main>

    </>
  )
}