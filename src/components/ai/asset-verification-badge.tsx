'use client'

import * as React from 'react'
import { Check, AlertTriangle, X, Clock, FileQuestion } from 'lucide-react'
import type { AssetStatus } from '@/types/asset'

interface AssetVerificationBadgeProps {
  status: AssetStatus
  details?: string
  compact?: boolean
  className?: string
}

const statusConfig = {
  verified: {
    icon: Check,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-600',
    label: '✓',
    fullLabel: 'Verified'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-600',
    label: '⚠',
    fullLabel: 'Warning'
  },
  error: {
    icon: X,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-600',
    label: '✗',
    fullLabel: 'Error'
  },
  checking: {
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-600',
    label: '⏳',
    fullLabel: 'Checking'
  },
  missing: {
    icon: FileQuestion,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-600',
    label: '?',
    fullLabel: 'Missing'
  }
}

export function AssetVerificationBadge({ 
  status, 
  details, 
  compact = false,
  className = '' 
}: AssetVerificationBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  const [showTooltip, setShowTooltip] = React.useState(false)

  return (
    <div className="relative inline-block">
      <div
        className={`
          inline-flex items-center gap-[clamp(4px,0.5vw,6px)]
          ${config.bgColor} ${config.borderColor} border-2 
          rounded-[5px]
          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          ${compact ? 'px-[clamp(6px,0.8vw,8px)] py-[clamp(4px,0.5vw,6px)]' : 'px-[clamp(8px,1vw,10px)] py-[clamp(6px,0.8vw,8px)]'}
          cursor-help
          transition-shadow
          hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
          ${className}
        `}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {compact ? (
          <span className={`text-[clamp(12px,1.4vw,14px)] ${config.color} font-bold`}>
            {config.label}
          </span>
        ) : (
          <>
            <Icon className={`w-[clamp(14px,1.8vw,16px)] h-[clamp(14px,1.8vw,16px)] ${config.color}`} />
            <span className={`text-[clamp(11px,1.3vw,12px)] font-bold ${config.color} uppercase tracking-wider`}>
              {config.fullLabel}
            </span>
          </>
        )}
      </div>

      {/* Tooltip */}
      {details && showTooltip && (
        <div
          className="
            absolute z-50 
            bottom-full left-1/2 -translate-x-1/2 mb-[clamp(6px,0.8vw,8px)]
            px-[clamp(10px,1.2vw,12px)] py-[clamp(6px,0.8vw,8px)]
            bg-black text-white
            border-2 border-black rounded-[5px]
            shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
            text-[clamp(11px,1.3vw,12px)]
            whitespace-nowrap
            pointer-events-none
          "
        >
          {details}
          {/* Arrow */}
          <div
            className="
              absolute top-full left-1/2 -translate-x-1/2
              w-0 h-0
              border-l-[6px] border-l-transparent
              border-r-[6px] border-r-transparent
              border-t-[6px] border-t-black
            "
          />
        </div>
      )}
    </div>
  )
}
