'use client'

import { useFadeIn } from '@/lib/hooks/use-fade-in'
import { cn } from '@/lib/utils'

export function TransparencySection() {
  const fadeIn1 = useFadeIn()
  const fadeIn2 = useFadeIn()
  const fadeIn3 = useFadeIn()

  return (
    <section className="relative bg-custom-gray text-white py-[clamp(80px,12vw,150px)] px-[clamp(20px,4vw,50px)] overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-custom-green rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-custom-green rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <h2
          ref={fadeIn1.ref}
          className={cn(
            'font-bold leading-[1.3] mb-[clamp(40px,6vw,80px)] text-[clamp(36px,5vw,72px)] fade-in',
            fadeIn1.isVisible && 'visible'
          )}
        >
          We built this because<br />
          <span className="text-custom-green">content teams are tired.</span>
        </h2>

        <div
          ref={fadeIn2.ref}
          className={cn(
            'space-y-5 leading-[1.7] mb-[clamp(40px,6vw,80px)] fade-in',
            fadeIn2.isVisible && 'visible'
          )}
        >
          <div className="flex items-center gap-4 group">
            <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-[clamp(20px,2.5vw,32px)] group-hover:text-red-400 transition-colors">
              Tired of copy-pasting
            </p>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-[clamp(20px,2.5vw,32px)] group-hover:text-red-400 transition-colors">
              Tired of chasing assets
            </p>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-[clamp(20px,2.5vw,32px)] group-hover:text-red-400 transition-colors">
              Tired of missed deadlines
            </p>
          </div>
        </div>

        <div
          ref={fadeIn3.ref}
          className={cn(
            'p-[clamp(30px,4vw,50px)] bg-black/30 border-2 border-custom-green/30 rounded-[10px] backdrop-blur-sm fade-in',
            fadeIn3.isVisible && 'visible'
          )}
        >
          <p className="text-[clamp(22px,2.8vw,36px)] font-bold mb-4 text-custom-green">
            This isn't magic.
          </p>
          <p className="text-[clamp(20px,2.5vw,32px)] mb-8 opacity-90">
            It's just smarter orchestration.
          </p>

          <div className="flex items-center gap-4 pt-6 border-t border-custom-green/30">
            <svg className="w-12 h-12 text-custom-green" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <p className="text-[clamp(16px,1.8vw,22px)] opacity-80">
              Built with <span className="text-custom-green font-bold">IBM watsonx Orchestrate</span><br />
              for teams who want their time back
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
