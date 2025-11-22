'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxImageProps {
    src: string
    alt: string
    className?: string
    speed?: number
}

export function ParallaxImage({ src, alt, className = '', speed = 0.5 }: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                style={{ y }}
                className="w-full h-full"
                initial={{ y: '-20%' }}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover min-h-[120%]"
                    style={{ height: '120%' }}
                />
            </motion.div>
        </div>
    )
}
