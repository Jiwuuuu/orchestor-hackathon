'use client'

import { useFadeIn } from '@/lib/hooks/use-fade-in'
import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Smart Validation',
    description: 'Checks for missing captions, assets, platforms, deadlines',
    color: 'from-blue-500 to-cyan-500',
    icon: (
      <svg className="w-[clamp(40px,5vw,56px)] h-[clamp(40px,5vw,56px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'AI Enhancement',
    description: 'Optimizes captions for each platform (IG, FB, LinkedIn)',
    color: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-[clamp(40px,5vw,56px)] h-[clamp(40px,5vw,56px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Asset Verification',
    description: 'Confirms Dropbox links work before you schedule',
    color: 'from-green-500 to-emerald-500',
    icon: (
      <svg className="w-[clamp(40px,5vw,56px)] h-[clamp(40px,5vw,56px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: 'Conflict Detection',
    description: 'Flags multiple posts at same time',
    color: 'from-orange-500 to-red-500',
    icon: (
      <svg className="w-[clamp(40px,5vw,56px)] h-[clamp(40px,5vw,56px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Smart Escalation',
    description: 'Only asks humans when truly needed',
    color: 'from-yellow-500 to-amber-500',
    icon: (
      <svg className="w-[clamp(40px,5vw,56px)] h-[clamp(40px,5vw,56px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Export Ready',
    description: 'JSON/CSV output for any scheduling tool',
    color: 'from-teal-500 to-cyan-500',
    icon: (
      <svg className="w-[clamp(40px,5vw,56px)] h-[clamp(40px,5vw,56px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-custom-dark text-white py-[clamp(80px,12vw,150px)] px-[clamp(20px,4vw,50px)]">
      <div className="max-w-[1400px] mx-auto">
        <h3 className="text-center uppercase tracking-[0.2em] mb-[clamp(50px,8vw,100px)] text-custom-green font-bold text-[clamp(14px,1.5vw,18px)]">
          WHAT IT DOES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(40px,5vw,60px)]">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ title, description, icon, color }: { title: string; description: string; icon: React.ReactNode; color: string }) {
  const fadeIn = useFadeIn()

  return (
    <div
      ref={fadeIn.ref}
      className={cn(
        'relative p-[clamp(24px,3vw,32px)] bg-white/5 border-2 border-white/10 rounded-[10px] hover:border-custom-green hover:bg-white/10 transition-all duration-300 fade-in group overflow-hidden',
        fadeIn.isVisible && 'visible'
      )}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
      <div className={`mb-4 text-white transition-transform`}>{icon}</div>
      <h4 className="font-bold mb-3 text-[clamp(18px,2vw,24px)] text-custom-green">{title}</h4>
      <p className="text-white/80 leading-[1.6] text-[clamp(14px,1.5vw,18px)]">{description}</p>
    </div>
  )
}
