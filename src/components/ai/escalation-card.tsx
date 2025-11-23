/**
 * Escalation Card Component
 * Individual card for each flagged item requiring human attention
 */

'use client'

import { motion } from 'framer-motion'
import { Lightbulb, CheckCircle, Edit, SkipForward, AlertTriangle, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { FlaggedItem } from '@/types/flagged-items'

interface EscalationCardProps {
  item: FlaggedItem
  onAccept?: (id: string) => void
  onEdit?: (id: string) => void
  onSkip?: (id: string) => void
}

const issueTypeLabels = {
  missing_asset: 'Missing Asset',
  invalid_format: 'Invalid Format',
  caption_issue: 'Caption Issue',
  schedule_conflict: 'Schedule Conflict',
  broken_link: 'Broken Link'
}

const severityConfig = {
  critical: {
    borderColor: 'border-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    icon: AlertCircle,
    label: 'Critical'
  },
  warning: {
    borderColor: 'border-yellow-600',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    icon: AlertTriangle,
    label: 'Warning'
  }
}

export function EscalationCard({ item, onAccept, onEdit, onSkip }: EscalationCardProps) {
  const config = severityConfig[item.issue.severity]
  const SeverityIcon = config.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4 }}
    >
      <Card 
        className={`
          p-[clamp(16px,2vw,20px)] border-2 ${config.borderColor} rounded-[5px] 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
          transition-shadow bg-white
        `}
      >
        {/* Header with Severity */}
        <div className="flex items-start justify-between mb-[clamp(12px,1.5vw,16px)]">
          <div className="flex-1 space-y-[clamp(4px,0.5vw,6px)]">
            <div className="flex items-center gap-[clamp(6px,0.8vw,8px)] flex-wrap">
              <h3 className="text-[clamp(16px,2vw,18px)] font-bold text-black">{item.taskTitle}</h3>
              <Badge 
                variant="outline"
                className={`text-[clamp(9px,1vw,10px)] h-5 px-2 border-2 font-bold uppercase tracking-wider ${config.bgColor} ${config.borderColor} ${config.textColor}`}
              >
                {item.platform}
              </Badge>
            </div>
            <p className="text-[clamp(10px,1.2vw,11px)] text-black/60 uppercase tracking-wider font-medium">
              ID: {item.id}
            </p>
          </div>
          
          {/* Severity Badge */}
          <div className={`flex items-center gap-[clamp(4px,0.6vw,6px)] px-[clamp(8px,1vw,10px)] py-[clamp(4px,0.6vw,6px)] ${config.bgColor} border-2 ${config.borderColor} rounded-[5px]`}>
            <SeverityIcon className={`w-[clamp(14px,1.5vw,16px)] h-[clamp(14px,1.5vw,16px)] ${config.textColor}`} />
            <span className={`text-[clamp(10px,1.2vw,11px)] font-bold uppercase tracking-wider ${config.textColor}`}>
              {config.label}
            </span>
          </div>
        </div>

        {/* Issue Details */}
        <div className={`mb-[clamp(12px,1.5vw,16px)] p-[clamp(12px,1.5vw,14px)] ${config.bgColor} border-2 ${config.borderColor} rounded-[5px]`}>
          <div className="flex items-center gap-[clamp(6px,0.8vw,8px)] mb-[clamp(6px,0.8vw,8px)]">
            <Badge 
              variant="outline"
              className={`text-[clamp(9px,1vw,10px)] h-5 px-2 border-2 font-bold uppercase tracking-wider bg-white ${config.borderColor} ${config.textColor}`}
            >
              {issueTypeLabels[item.issue.type]}
            </Badge>
          </div>
          <p className="text-[clamp(13px,1.5vw,14px)] text-black leading-relaxed">
            {item.issue.description}
          </p>
        </div>

        {/* AI Attempt Info */}
        <div className="mb-[clamp(12px,1.5vw,16px)] p-[clamp(12px,1.5vw,14px)] bg-gray-50 border-2 border-black rounded-[5px]">
          <h4 className="text-[clamp(11px,1.3vw,12px)] font-bold text-black/80 uppercase tracking-wider mb-[clamp(6px,0.8vw,8px)]">
            What AI Tried
          </h4>
          <p className="text-[clamp(12px,1.4vw,13px)] text-black/80 mb-[clamp(8px,1vw,10px)] leading-relaxed">
            {item.aiAttempt.tried}
          </p>
          <div className="flex items-start gap-[clamp(6px,0.8vw,8px)] pt-[clamp(6px,0.8vw,8px)] border-t-2 border-black/10">
            <span className="text-[clamp(10px,1.2vw,11px)] font-bold text-black/60 uppercase tracking-wider shrink-0">
              Reason:
            </span>
            <span className="text-[clamp(11px,1.3vw,12px)] text-black/70 italic">
              {item.aiAttempt.reason}
            </span>
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="mb-[clamp(16px,2vw,20px)] p-[clamp(12px,1.5vw,14px)] bg-blue-50 border-2 border-blue-600 rounded-[5px]">
          <div className="flex items-center gap-[clamp(6px,0.8vw,8px)] mb-[clamp(8px,1vw,10px)]">
            <Lightbulb className="w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)] text-blue-600" />
            <h4 className="text-[clamp(12px,1.4vw,13px)] font-bold text-blue-600 uppercase tracking-wider">
              AI Suggestion
            </h4>
            <Badge 
              variant="outline"
              className="text-[clamp(9px,1vw,10px)] h-5 px-2 border-2 font-bold uppercase tracking-wider bg-white border-blue-600 text-blue-700"
            >
              {item.suggestion.confidence}% Confidence
            </Badge>
          </div>
          <p className="text-[clamp(13px,1.5vw,14px)] text-black mb-[clamp(10px,1.2vw,12px)] leading-relaxed font-medium">
            {item.suggestion.text}
          </p>
          <div className={`p-[clamp(8px,1vw,10px)] bg-white border-2 border-blue-600 rounded-[5px]`}>
            <span className="text-[clamp(10px,1.2vw,11px)] font-bold text-black/60 uppercase tracking-wider block mb-[clamp(4px,0.5vw,6px)]">
              Recommended Action:
            </span>
            <span className="text-[clamp(12px,1.4vw,13px)] text-black font-medium">
              {item.suggestion.action}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-[clamp(8px,1vw,10px)]">
          {item.actions.includes('accept') && (
            <Button
              onClick={() => onAccept?.(item.id)}
              className="flex-1 min-w-[140px] bg-custom-green hover:bg-black hover:text-custom-green text-lg"
            >
              <CheckCircle className="w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)]" />
              Accept Suggestion
            </Button>
          )}
          {item.actions.includes('edit') && (
            <Button
              onClick={() => onEdit?.(item.id)}
              variant="outline"
              className="flex-1 min-w-[120px] text-lg"
            >
              <Edit className="w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)]" />
              Edit Manually
            </Button>
          )}
          {item.actions.includes('skip') && (
            <Button
              onClick={() => onSkip?.(item.id)}
              variant="outline"
              className="text-red-600 hover:bg-red-600 hover:text-white text-lg"
            >
              <SkipForward className="w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)]" />
              Skip
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
