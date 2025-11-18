'use client'

import { useFadeIn } from '@/lib/hooks/use-fade-in'
import { cn } from '@/lib/utils'

const useCases = [
    {
        title: 'Marketing Teams',
        description: 'Stop wasting 15 hours/week on manual scheduling',
        icon: (
            <svg className="w-[clamp(48px,6vw,64px)] h-[clamp(48px,6vw,64px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
    {
        title: 'Social Media Managers',
        description: 'Keep posts on-brand and on-schedule',
        icon: (
            <svg className="w-[clamp(48px,6vw,64px)] h-[clamp(48px,6vw,64px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
    },
    {
        title: 'Content Agencies',
        description: 'Scale client work without hiring more hands',
        icon: (
            <svg className="w-[clamp(48px,6vw,64px)] h-[clamp(48px,6vw,64px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
]

export function UseCasesSection() {
    return (
        <section className="bg-custom-dark text-white py-[clamp(80px,12vw,150px)] px-[clamp(20px,4vw,50px)]">
            <div className="max-w-[1400px] mx-auto">
                <h3 className="text-center uppercase tracking-wider mb-[clamp(50px,8vw,100px)] opacity-60 text-[clamp(14px,1.5vw,18px)]">
                    BUILT FOR
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(40px,5vw,60px)]">
                    {useCases.map((useCase, index) => (
                        <UseCaseCard key={index} {...useCase} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function UseCaseCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
    const fadeIn = useFadeIn()

    return (
        <div
            ref={fadeIn.ref}
            className={cn(
                'text-center fade-in',
                fadeIn.isVisible && 'visible'
            )}
        >
            <div className="mb-5 mx-auto flex justify-center">{icon}</div>
            <h4 className="font-bold mb-3 text-[clamp(20px,2.5vw,28px)]">{title}</h4>
            <p className="opacity-80 leading-[1.6] text-[clamp(14px,1.5vw,18px)]">{description}</p>
        </div>
    )
}
