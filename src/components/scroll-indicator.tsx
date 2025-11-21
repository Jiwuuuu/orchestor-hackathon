'use client'

import { motion, useScroll } from 'framer-motion'

export function ScrollIndicator() {
    const { scrollYProgress } = useScroll()

    return (
        <motion.div
            style={{
                scaleX: scrollYProgress,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                originX: 0,
                backgroundColor: '#84f197',
                zIndex: 9999,
            }}
        />
    )
}
