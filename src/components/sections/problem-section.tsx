'use client'

import { useFadeIn } from '@/lib/hooks/use-fade-in'
import { cn } from '@/lib/utils'
import { ParallaxImage } from '@/components/parallax-image'

export function ProblemSection() {
  const fadeIn1 = useFadeIn()
  const fadeIn2 = useFadeIn()
  const fadeIn3 = useFadeIn()

  return (
    <section className="relative bg-custom-dark text-white overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch min-h-[600px] lg:min-h-[700px]">
        {/* Content Side */}
        <div className="w-full lg:w-1/2 p-[clamp(30px,5vw,80px)] py-[clamp(80px,10vw,150px)] flex flex-col justify-center">
          <h2
            ref={fadeIn1.ref}
            className={cn(
              'font-bold leading-[1.1] mb-[clamp(40px,5vw,60px)] fade-in text-[clamp(40px,5.5vw,80px)]',
              fadeIn1.isVisible && 'visible'
            )}
          >
            Your content team<br />
            is drowning.
          </h2>

          <div
          ref={fadeIn2.ref}
          className={cn(
            'space-y-5 leading-[1.6] fade-in',
            fadeIn2.isVisible && 'visible'
          )}
        >
          <div className="flex items-center gap-4 group">
            <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-[clamp(18px,2.2vw,30px)] group-hover:text-red-400 transition-colors">
              Tasks scattered across Asana
            </p>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-[clamp(18px,2.2vw,30px)] group-hover:text-red-400 transition-colors">
              Assets buried in Dropbox
            </p>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-[clamp(18px,2.2vw,30px)] group-hover:text-red-400 transition-colors">
              Captions missing
            </p>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-[clamp(18px,2.2vw,30px)] group-hover:text-red-400 transition-colors">
              Posts delayed
            </p>
          </div>
        </div>          <p
            ref={fadeIn3.ref}
            className={cn(
              'mt-[clamp(40px,5vw,60px)] text-custom-green font-bold fade-in text-[clamp(20px,2.5vw,32px)]',
              fadeIn3.isVisible && 'visible'
            )}
          >
            Sound familiar?
          </p>
        </div>

        {/* Parallax Image Side */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative">
          <ParallaxImage
            src="/images/7868567.jpg"
            alt="Stressed content team"
            className="w-full h-full absolute inset-0"
            speed={0.3}
          />
          <div className="absolute inset-0 bg-linear-to-r from-custom-dark via-custom-dark/50 to-transparent lg:from-custom-dark lg:via-custom-dark/80 lg:to-transparent" />
        </div>
      </div>
    </section>
  )
}
