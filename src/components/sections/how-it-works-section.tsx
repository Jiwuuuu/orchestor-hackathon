'use client'

import { useFadeIn } from '@/lib/hooks/use-fade-in'
import { cn } from '@/lib/utils'

export function HowItWorksSection() {
  const fadeIn1 = useFadeIn()
  const fadeIn2 = useFadeIn()
  const fadeIn3 = useFadeIn()
  const fadeIn4 = useFadeIn()

  return (
    <section className="bg-custom-gray text-white py-[clamp(80px,12vw,150px)] px-[clamp(20px,4vw,50px)]">
      <div className="max-w-[1400px] mx-auto">
        <h3 className="uppercase tracking-[0.2em] mb-[clamp(50px,8vw,100px)] text-custom-green font-bold text-[clamp(14px,1.5vw,18px)]">
          HOW IT WORKS
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[clamp(40px,6vw,80px)]">
          <div
            ref={fadeIn1.ref}
            className={cn(
              'relative p-[clamp(30px,4vw,40px)] bg-white/5 border-2 border-white/10 rounded-[10px] hover:border-custom-green hover:bg-white/10 transition-all duration-300 fade-in group',
              fadeIn1.isVisible && 'visible'
            )}
          >
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-custom-green text-black rounded-full flex items-center justify-center font-bold text-2xl border-4 border-custom-gray group-hover:scale-110 transition-transform">
              01
            </div>
            <div className="mt-6">
              <h4 className="font-bold mb-3 text-[clamp(20px,2.5vw,28px)] text-custom-green">
                Connect & Export
              </h4>
              <p className="leading-[1.6] text-[clamp(16px,1.8vw,20px)] opacity-90">
                Connect your Asana project and export your content tasks in seconds
              </p>
            </div>
          </div>

          <div
            ref={fadeIn2.ref}
            className={cn(
              'relative p-[clamp(30px,4vw,40px)] bg-white/5 border-2 border-white/10 rounded-[10px] hover:border-custom-green hover:bg-white/10 transition-all duration-300 fade-in group',
              fadeIn2.isVisible && 'visible'
            )}
          >
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-custom-green text-black rounded-full flex items-center justify-center font-bold text-2xl border-4 border-custom-gray group-hover:scale-110 transition-transform">
              02
            </div>
            <div className="mt-6">
              <h4 className="font-bold mb-3 text-[clamp(20px,2.5vw,28px)] text-custom-green">
                AI Validation
              </h4>
              <p className="leading-[1.6] text-[clamp(16px,1.8vw,20px)] opacity-90">
                AI validates everything—captions, assets, platforms, and deadlines
              </p>
            </div>
          </div>

          <div
            ref={fadeIn3.ref}
            className={cn(
              'relative p-[clamp(30px,4vw,40px)] bg-white/5 border-2 border-white/10 rounded-[10px] hover:border-custom-green hover:bg-white/10 transition-all duration-300 fade-in group',
              fadeIn3.isVisible && 'visible'
            )}
          >
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-custom-green text-black rounded-full flex items-center justify-center font-bold text-2xl border-4 border-custom-gray group-hover:scale-110 transition-transform">
              03
            </div>
            <div className="mt-6">
              <h4 className="font-bold mb-3 text-[clamp(20px,2.5vw,28px)] text-custom-green">
                Publish Ready
              </h4>
              <p className="leading-[1.6] text-[clamp(16px,1.8vw,20px)] opacity-90">
                Get a ready-to-publish schedule and upload straight to Meta Business Suite
              </p>
            </div>
          </div>
        </div>

        <div
          ref={fadeIn4.ref}
          className={cn(
            'mt-[clamp(60px,10vw,120px)] text-center fade-in',
            fadeIn4.isVisible && 'visible'
          )}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-black border-2 border-custom-green rounded-full">
            <span className="text-[clamp(16px,2vw,24px)] font-bold text-custom-green">Asana</span>
            <svg className="w-6 h-6 text-custom-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-[clamp(16px,2vw,24px)] font-bold text-custom-green">AI</span>
            <svg className="w-6 h-6 text-custom-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="text-[clamp(16px,2vw,24px)] font-bold text-custom-green">Published</span>
          </div>
        </div>
      </div>
    </section>
  )
}
