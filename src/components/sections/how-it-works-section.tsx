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
        <h3 className="uppercase tracking-wider mb-[clamp(50px,8vw,100px)] opacity-60 text-[clamp(14px,1.5vw,18px)]">
          HOW IT WORKS
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[clamp(40px,6vw,80px)]">
          <div
            ref={fadeIn1.ref}
            className={cn(
              'fade-in',
              fadeIn1.isVisible && 'visible'
            )}
          >
            <div className="font-bold mb-4 text-[clamp(60px,8vw,96px)]">01</div>
            <p className="leading-[1.5] text-[clamp(18px,2vw,24px)]">
              Connect your Asana project<br />
              Export your content tasks
            </p>
          </div>

          <div
            ref={fadeIn2.ref}
            className={cn(
              'fade-in',
              fadeIn2.isVisible && 'visible'
            )}
          >
            <div className="font-bold mb-4 text-[clamp(60px,8vw,96px)]">02</div>
            <p className="leading-[1.5] text-[clamp(18px,2vw,24px)]">
              AI validates everything<br />
              Captions, assets, platforms, deadlines
            </p>
          </div>

          <div
            ref={fadeIn3.ref}
            className={cn(
              'fade-in',
              fadeIn3.isVisible && 'visible'
            )}
          >
            <div className="font-bold mb-4 text-[clamp(60px,8vw,96px)]">03</div>
            <p className="leading-[1.5] text-[clamp(18px,2vw,24px)]">
              Get a ready-to-publish schedule<br />
              Upload straight to Meta Business Suite
            </p>
          </div>
        </div>

        <div
          ref={fadeIn4.ref}
          className={cn(
            'mt-[clamp(60px,10vw,120px)] text-center opacity-50 fade-in text-[clamp(16px,2vw,20px)]',
            fadeIn4.isVisible && 'visible'
          )}
        >
          Asana → AI → Schedule Output
        </div>
      </div>
    </section>
  )
}
