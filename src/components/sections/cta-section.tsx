'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useFadeIn } from '@/lib/hooks/use-fade-in'
import { cn } from '@/lib/utils'

export function CTASection() {
  const fadeIn = useFadeIn()

  return (
    <section className="relative bg-black text-white py-[clamp(100px,15vw,200px)] px-[clamp(20px,4vw,50px)] text-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-custom-green/20 via-transparent to-custom-green/20 opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-custom-green/10 rounded-full blur-3xl" />

      <div
        ref={fadeIn.ref}
        className={cn(
          'max-w-[900px] mx-auto relative z-10 fade-in',
          fadeIn.isVisible && 'visible'
        )}
      >
        <h2 className="font-bold leading-[1.2] mb-[clamp(30px,5vw,50px)] text-[clamp(40px,6vw,80px)]">
          Stop juggling.<br />
          <span className="text-custom-green">Start publishing.</span>
        </h2>

        <p className="text-[clamp(18px,2vw,24px)] mb-[clamp(40px,6vw,60px)] text-white/80 leading-relaxed">
          Transform your Asana chaos into a publish-ready schedule.<br />
          AI-powered. Human-approved. Always on time.
        </p>

        <Button 
          asChild 
          size="lg" 
          className="mb-8 bg-custom-green text-black border-4 border-custom-green hover:bg-white hover:text-black font-bold text-[clamp(16px,2vw,20px)] px-[clamp(30px,4vw,50px)] py-[clamp(16px,2vw,24px)] shadow-[6px_6px_0px_0px_rgba(186,230,126,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(186,230,126,0.7)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] uppercase tracking-wide"
        >
          <Link href="/auth">
            Get Started — It's Free →
          </Link>
        </Button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[clamp(12px,1.5vw,16px)] text-white/60">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-custom-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-custom-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Setup in 2 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-custom-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>

        <p className="mt-8 text-[clamp(14px,1.5vw,16px)] text-white/40">
          Built with <span className="text-custom-green font-bold">IBM watsonx Orchestrate</span>
        </p>
      </div>
    </section>
  )
}
