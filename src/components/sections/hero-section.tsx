import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
    return (
        <section>
            {/* Hero Content */}
            {/* EXPERIMENT WITH GAP: Change the gap value below to adjust spacing between image and text */}
            {/* Current: gap-[clamp(20px,3vw,50px)] */}
            {/* Try: gap-[clamp(15px,2.5vw,40px)] for tighter spacing */}
            {/* Try: gap-[clamp(25px,3.5vw,60px)] for wider spacing */}
            <div className="flex flex-col lg:flex-row items-stretch gap-[clamp(60px,10vw,80px)]">

                {/* EXPERIMENT WITH IMAGE WIDTH: Change the width value below */}
                {/* Current: lg:w-[clamp(500px,52vw,1125px)] */}
                {/* Try: lg:w-[clamp(500px,55vw,1125px)] to make image larger */}
                {/* Try: lg:w-[clamp(500px,48vw,1125px)] to make image smaller */}
                <div className="w-full lg:w-[clamp(500px,52vw,2000px)] transition-all duration-300 ease-in-out">
                    <div className="w-full h-full lg:w-[clamp(500px,52vw,2000px)] rounded-[5px] overflow-hidden">
                        <img src="/images/7868567.jpg" alt="Hero Visual" className="w-full h-full object-cover block" />
                    </div>
                </div>

                <div className="flex-1 w-full lg:w-auto min-w-[300px] flex flex-col justify-between">

                    <div className="text-right mt-6 lg:mt-0">
                        <h1 className="font-normal text-black leading-[1.2] text-[clamp(32px,4.5vw,60px)]">
                            STOP JUGGLING.<br/>START PUBLISHING.
                        </h1>

                        <p className="text-black mb-5 leading-[1.4] text-[clamp(16px,1.5vw,25px)]">
                            Turn Asana tasks into ready-to-publish<br />social media posts—automatically.
                        </p>
                    </div>

                    <div className="flex justify-end mb-[clamp(50px,10vw,200px)]">
                        <Button asChild>
                            <a href="#demo">
                                Discover Orchestor →
                            </a>
                        </Button>
                    </div>

                    <div className="text-center text-black pt-[clamp(20px,5vw,120px)] text-[clamp(16px,1.5vw,20px)] flex flex-col items-center gap-2">
                        <span className="text-sm">Scroll to explore</span>
                        <ChevronDown className="w-5 h-5 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    )
}
