'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  // Check if user is authenticated and redirect to dashboard immediately
  useEffect(() => {
    const loggingOut = sessionStorage.getItem('isLoggingOut') === 'true'
    const accessToken = sessionStorage.getItem('access_token')

    // Clear the logout flag if present
    if (loggingOut) {
      sessionStorage.removeItem('isLoggingOut')
      setIsChecking(false)
      return
    }

    // Redirect to dashboard if authenticated and not logging out
    if (accessToken && !loggingOut) {
      router.replace('/dashboard')
      // Don't set isChecking to false - keep showing loading during redirect
    } else {
      setIsChecking(false)
    }
  }, [router])

  // Show loading while checking auth to prevent flash of landing page
  if (isChecking) {
    return null // Return nothing while checking, prevents any renders
  }

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
