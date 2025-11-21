/**
 * Platform Caption Tab Component
 * Shows platform-specific caption with icon, character count, and status
 */

import { siInstagram, siFacebook, siX } from 'simple-icons'
import { Badge } from '@/components/ui/badge'
import type { Platform } from '@/types/caption'

interface PlatformCaptionTabProps {
  platform: Platform
  characterCount: number
  characterLimit: number
  status: 'optimal' | 'too_long' | 'too_short'
  isActive: boolean
  onClick: () => void
}

// LinkedIn icon from Simple Icons (manual since package doesn't export it correctly)
const linkedinIcon = {
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  title: 'LinkedIn'
}

interface IconData {
  path: string
  title: string
}

const platformConfig: Record<Platform, { icon: IconData; label: string; color: string }> = {
  instagram: {
    icon: siInstagram,
    label: 'Instagram',
    color: '#E4405F'
  },
  facebook: {
    icon: siFacebook,
    label: 'Facebook',
    color: '#0866FF'
  },
  linkedin: {
    icon: linkedinIcon,
    label: 'LinkedIn',
    color: '#0A66C2'
  },
  twitter: {
    icon: siX,
    label: 'X',
    color: '#000000'
  }
}

const statusConfig = {
  optimal: {
    label: 'Optimal',
    color: 'bg-green-100 text-green-700 border-green-600'
  },
  too_long: {
    label: 'Too Long',
    color: 'bg-red-100 text-red-700 border-red-600'
  },
  too_short: {
    label: 'Too Short',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-600'
  }
}

export function PlatformCaptionTab({
  platform,
  characterCount,
  characterLimit,
  status,
  isActive,
  onClick
}: PlatformCaptionTabProps) {
  const config = platformConfig[platform]
  const statusStyle = statusConfig[status]
  const percentage = (characterCount / characterLimit) * 100

  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-start gap-[clamp(8px,1vw,12px)] 
        p-[clamp(12px,1.5vw,16px)] border-2 border-black rounded-[5px]
        transition-all duration-300
        ${isActive 
          ? 'bg-custom-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
          : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
        }
      `}
    >
      {/* Platform Header */}
      <div className="flex items-center gap-[clamp(8px,1vw,12px)] w-full">
        <div className="p-1.5 bg-white border-2 border-black rounded-[5px] flex items-center justify-center">
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[clamp(14px,1.5vw,16px)] h-[clamp(14px,1.5vw,16px)]"
            fill={config.color}
          >
            <path d={config.icon.path} />
          </svg>
        </div>
        <span className="text-[clamp(10px,1.2vw,12px)] font-bold uppercase tracking-wider text-black">
          {config.label}
        </span>
      </div>

      {/* Character Count */}
      <div className="w-full space-y-[clamp(4px,0.5vw,6px)]">
        <div className="flex items-center justify-between text-[clamp(10px,1.2vw,11px)]">
          <span className="text-black/60 font-medium">
            {characterCount}/{characterLimit}
          </span>
          <span className={`font-bold ${
            percentage > 100 ? 'text-red-600' :
            percentage > 90 ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 border-2 border-black rounded-[5px] overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              percentage > 100 ? 'bg-red-500' :
              percentage > 90 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Status Badge */}
      <Badge 
        variant="outline"
        className={`text-[clamp(9px,1vw,10px)] h-5 px-2 border-2 font-bold uppercase tracking-wider ${statusStyle.color}`}
      >
        {statusStyle.label}
      </Badge>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-custom-green border-2 border-black rounded-full" />
      )}
    </button>
  )
}
