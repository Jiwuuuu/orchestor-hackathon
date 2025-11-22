import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { ProblemSection } from '@/components/sections/problem-section'
import { HowItWorksSection } from '@/components/sections/how-it-works-section'
import { DemoSection } from '@/components/sections/demo-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { TransparencySection } from '@/components/sections/transparency-section'
import { UseCasesSection } from '@/components/sections/use-cases-section'
import { CTASection } from '@/components/sections/cta-section'
import { Footer } from '@/components/footer'
import { ScrollIndicator } from '@/components/scroll-indicator'
import { ScrollToTop } from '@/components/scroll-to-top'

export default function Home() {
  return (
    <div className="bg-custom-green font-body min-h-screen overflow-x-hidden">
      <ScrollIndicator />
      <ScrollToTop />
      
      {/* SECTION 1: HERO */}
      <section className="p-[clamp(20px,4vw,30px)]">
        <Navbar />
        <HeroSection />

        
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <ProblemSection />

      {/* SECTION 3: HOW IT WORKS */}
      <HowItWorksSection />

      {/* SECTION 4: LIVE DEMO */}
      <DemoSection />

      {/* SECTION 5: KEY FEATURES */}
      <FeaturesSection />

      {/* SECTION 6: TRANSPARENCY */}
      <TransparencySection />

      {/* SECTION 7: USE CASES */}
      <UseCasesSection />

      {/* SECTION 8: FINAL CTA */}
      <CTASection />

      {/* SECTION 9: FOOTER */}
      <Footer />
    </div>
  )
}
