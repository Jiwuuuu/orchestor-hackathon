import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="bg-black text-white py-[clamp(100px,15vw,200px)] px-[clamp(20px,4vw,50px)] text-center">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-bold leading-[1.2] mb-[clamp(40px,6vw,60px)] text-[clamp(40px,6vw,80px)]">
          Stop juggling.<br />
          Start publishing.
        </h2>

        <Button 
          asChild 
          size="lg" 
          className="mb-6 bg-custom-green text-black border-custom-green hover:bg-white hover:text-black font-bold"
        >
          <Link href="#demo">
            Get Started — It's Free
          </Link>
        </Button>

        <p className="opacity-60 text-[clamp(12px,1.5vw,16px)]">
          No credit card required<br />
          Built with IBM watsonx Orchestrate
        </p>
      </div>
    </section>
  )
}
