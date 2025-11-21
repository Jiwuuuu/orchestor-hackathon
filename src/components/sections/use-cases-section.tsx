'use client'

import { useFadeIn } from '@/lib/hooks/use-fade-in'
import { cn } from '@/lib/utils'

const useCases = [
    {
        title: 'Marketing Teams',
        description: 'Stop wasting 15 hours/week on manual scheduling',
        stat: '15 hrs saved/week',
        color: 'from-blue-500 to-cyan-500',
        icon: (
            <svg className="w-[clamp(48px,6vw,64px)] h-[clamp(48px,6vw,64px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
    {
        title: 'Social Media Managers',
        description: 'Keep posts on-brand and on-schedule',
        stat: '100% on-time',
        color: 'from-purple-500 to-pink-500',
        icon: (
            <svg className="w-[clamp(48px,6vw,64px)] h-[clamp(48px,6vw,64px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
    },
    {
        title: 'Content Agencies',
        description: 'Scale client work without hiring more hands',
        stat: '3x capacity',
        color: 'from-green-500 to-emerald-500',
        icon: (
            <svg className="w-[clamp(48px,6vw,64px)] h-[clamp(48px,6vw,64px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <h3 className="text-center uppercase tracking-[0.2em] mb-[clamp(50px,8vw,100px)] text-custom-green font-bold text-[clamp(14px,1.5vw,18px)]">
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

function UseCaseCard({ title, description, icon, stat, color }: { title: string; description: string; icon: React.ReactNode; stat: string; color: string }) {
    const fadeIn = useFadeIn()

    return (
        <div
            ref={fadeIn.ref}
            className={cn(
                'relative text-center p-[clamp(30px,4vw,40px)] bg-white/5 border-2 border-white/10 rounded-[10px] hover:border-custom-green hover:bg-white/10 transition-all duration-300 fade-in group overflow-hidden',
                fadeIn.isVisible && 'visible'
            )}
        >
            <div className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <div className="relative z-10">
                <div className="mb-5 mx-auto flex justify-center text-white group-hover:scale-110 transition-transform">{icon}</div>
                <h4 className="font-bold mb-3 text-[clamp(20px,2.5vw,28px)] text-custom-green">{title}</h4>
                <p className="text-white/80 leading-[1.6] mb-4 text-[clamp(14px,1.5vw,18px)]">{description}</p>
                <div className={`inline-block px-4 py-2 bg-linear-to-r ${color} text-white rounded-full font-bold text-[clamp(12px,1.3vw,14px)] border-2 border-white/20`}>
                    {stat}
                </div>
            </div>
        </div>
    )
}
