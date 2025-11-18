'use client'

import { useFadeIn } from '@/lib/hooks/use-fade-in'
import { cn } from '@/lib/utils'

export function ProblemSection() {
  const fadeIn1 = useFadeIn()
  const fadeIn2 = useFadeIn()
  const fadeIn3 = useFadeIn()

  return (
    <section className="bg-custom-dark text-white p-[clamp(20px,4vw,30px)] py-[clamp(80px,12vw,150px)]">
      <div className="max-w-auto] mx-auto">
        <h2
          ref={fadeIn1.ref}
          className={cn(
            'font-bold leading-[1.2] mb-[clamp(40px,6vw,80px)] fade-in text-[clamp(40px,6vw,90px)]',
            fadeIn1.isVisible && 'visible'
          )}
        >
          Your content team<br />
          is drowning.
        </h2>

        <div
          ref={fadeIn2.ref}
          className={cn(
            'space-y-6 leading-[1.7] fade-in text-[clamp(20px,2.5vw,36px)]',
            fadeIn2.isVisible && 'visible'
          )}
        >
          <p>Tasks scattered across Asana.</p>
          <p>Assets buried in Dropbox.</p>
          <p>Captions missing.</p>
          <p>Posts delayed.</p>
        </div>

        <p
          ref={fadeIn3.ref}
          className={cn(
            'mt-[clamp(40px,6vw,80px)] opacity-70 fade-in text-[clamp(18px,2vw,24px)]',
            fadeIn3.isVisible && 'visible'
          )}
        >
          Sound familiar?
        </p>
      </div>
    </section>
  )
}
