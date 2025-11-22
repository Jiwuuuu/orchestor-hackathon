'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [currentTime, setCurrentTime] = useState('1:05 BANGKOK, TH')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes} BANGKOK, TH`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col 1.5xl:flex-row justify-between items-start mb-[clamp(30px,5vw,35px)] pb-5 border-b-2 border-black">
      <div className="font-family-logo font-bold tracking-tightest-custom text-black leading-[0.85] break-all 1.5xl:break-normal text-[clamp(48px,14vw,200px)]">
        ORCHESTOR
      </div>

      <div className="flex flex-row 1.5xl:flex-col justify-between 1.5xl:justify-between items-center 1.5xl:items-end w-full 1.5xl:w-auto h-auto 1.5xl:h-full gap-5 1.5xl:gap-[clamp(50px,8vw,80px)] mt-4 1.5xl:mt-0">
        <Button asChild variant="outline" size="sm">
          <Link href="/auth">
            Sign In
          </Link>
        </Button>
        <div className="text-[clamp(14px,2vw,20px)] text-black whitespace-nowrap">
          {currentTime}
        </div>
      </div>
    </div>
  )
}
