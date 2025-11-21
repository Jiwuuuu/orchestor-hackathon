'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calendar,
    Clock,
    TrendingUp,
    Users,
    CheckCircle2,
    AlertTriangle,
    ArrowRight,
    Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { ScheduleSuggestion, SuggestionType } from '@/types/schedule-suggestion'

interface ScheduleOptimizationCardProps {
    suggestions: ScheduleSuggestion[]
    onApplyAll?: (suggestions: ScheduleSuggestion[]) => void
    onApplySelected?: (suggestions: ScheduleSuggestion[]) => void
    onDismiss?: () => void
    className?: string
}

const suggestionConfig: Record<SuggestionType, {
    icon: React.ComponentType<any>
    color: string
    bgColor: string
    borderColor: string
}> = {
    conflict: {
        icon: AlertTriangle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-600'
    },
    optimal_time: {
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-600'
    },
    platform_specific: {
        icon: Clock,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-600'
    },
    audience_insight: {
        icon: Users,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-600'
    }
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 300,
            damping: 25
        }
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: { duration: 0.2 }
    }
}

export function ScheduleOptimizationCard({
    suggestions,
    onApplyAll,
    onApplySelected,
    onDismiss,
    className = ''
}: ScheduleOptimizationCardProps) {
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
    const [appliedIds, setAppliedIds] = React.useState<Set<string>>(new Set())

    const handleToggle = (id: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    const handleSelectAll = () => {
        if (selectedIds.size === activeSuggestions.length) {
            setSelectedIds(new Set())
        } else {
            setSelectedIds(new Set(activeSuggestions.map(s => s.id)))
        }
    }

    const handleApplyAll = () => {
        setAppliedIds(new Set(activeSuggestions.map(s => s.id)))
        if (onApplyAll) {
            onApplyAll(activeSuggestions)
        }
    }

    const handleApplySelected = () => {
        setAppliedIds(prev => new Set([...prev, ...selectedIds]))
        if (onApplySelected) {
            const selected = activeSuggestions.filter(s => selectedIds.has(s.id))
            onApplySelected(selected)
        }
        setSelectedIds(new Set())
    }

    const activeSuggestions = suggestions.filter(s => !appliedIds.has(s.id))
    const hasSelection = selectedIds.size > 0

    if (activeSuggestions.length === 0 && appliedIds.size > 0) {
        return (
            <Card className={`p-[clamp(24px,3vw,32px)] border-2 border-green-600 rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-green-50 ${className}`}>
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <CheckCircle2 className="w-[clamp(48px,6vw,64px)] h-[clamp(48px,6vw,64px)] text-green-600 mx-auto mb-[clamp(16px,2vw,20px)]" />
                    </motion.div>
                    <h3 className="text-[clamp(18px,2.5vw,24px)] font-bold text-green-600 uppercase tracking-wider mb-[clamp(8px,1vw,10px)]">
                        All Optimizations Applied!
                    </h3>
                    <p className="text-[clamp(13px,1.6vw,14px)] text-green-600/80">
                        Your schedule has been optimized for maximum engagement
                    </p>
                </div>
            </Card>
        )
    }

    return (
        <Card className={`p-[clamp(24px,3vw,32px)] border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-[clamp(20px,2.5vw,24px)] pb-[clamp(16px,2vw,20px)] border-b-2 border-black">
                <div className="flex items-center gap-[clamp(12px,1.5vw,16px)]">
                    <div className="w-[clamp(40px,5vw,48px)] h-[clamp(40px,5vw,48px)] bg-blue-50 border-2 border-blue-600 rounded-[5px] flex items-center justify-center">
                        <Sparkles className="w-[clamp(20px,2.5vw,24px)] h-[clamp(20px,2.5vw,24px)] text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-[clamp(18px,2.5vw,24px)] font-bold text-black uppercase tracking-wider">
                            AI Schedule Optimization
                        </h2>
                        <p className="text-[clamp(12px,1.4vw,13px)] text-black/60 font-medium">
                            {activeSuggestions.length} suggestion{activeSuggestions.length !== 1 ? 's' : ''} to improve your schedule
                        </p>
                    </div>
                </div>

                {/* Select All Checkbox */}
                <button
                    onClick={handleSelectAll}
                    className="flex items-center gap-[clamp(6px,0.8vw,8px)] px-[clamp(10px,1.2vw,12px)] py-[clamp(6px,0.8vw,8px)] bg-white border-2 border-black rounded-[5px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                >
                    <div className={`w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)] border-2 border-black rounded-[3px] flex items-center justify-center ${selectedIds.size === activeSuggestions.length ? 'bg-black' : 'bg-white'} transition-colors`}>
                        {selectedIds.size === activeSuggestions.length && (
                            <CheckCircle2 className="w-[clamp(12px,1.5vw,14px)] h-[clamp(12px,1.5vw,14px)] text-white" />
                        )}
                    </div>
                    <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-black uppercase tracking-wider">
                        Select All
                    </span>
                </button>
            </div>

            {/* Suggestions List */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-[clamp(12px,1.5vw,16px)] mb-[clamp(24px,3vw,32px)]"
            >
                <AnimatePresence mode="popLayout">
                    {activeSuggestions.map((suggestion) => {
                        const config = suggestionConfig[suggestion.type]
                        const Icon = config.icon
                        const isSelected = selectedIds.has(suggestion.id)

                        return (
                            <motion.div
                                key={suggestion.id}
                                variants={itemVariants}
                                layout
                                className={`p-[clamp(16px,2vw,20px)] ${config.bgColor} border-2 ${config.borderColor} rounded-[5px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isSelected ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''} transition-shadow`}
                            >
                                <div className="flex items-start gap-[clamp(12px,1.5vw,16px)]">
                                    {/* Checkbox */}
                                    <button
                                        onClick={() => handleToggle(suggestion.id)}
                                        className="shrink-0 mt-[clamp(2px,0.3vw,3px)]"
                                    >
                                        <div className={`w-[clamp(20px,2.5vw,24px)] h-[clamp(20px,2.5vw,24px)] border-2 border-black rounded-[3px] flex items-center justify-center ${isSelected ? 'bg-black' : 'bg-white'} transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                                >
                                                    <CheckCircle2 className="w-[clamp(14px,1.8vw,16px)] h-[clamp(14px,1.8vw,16px)] text-white" />
                                                </motion.div>
                                            )}
                                        </div>
                                    </button>

                                    {/* Icon */}
                                    <div className={`shrink-0 w-[clamp(36px,4.5vw,44px)] h-[clamp(36px,4.5vw,44px)] bg-white border-2 ${config.borderColor} rounded-[5px] flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                        <Icon className={`w-[clamp(18px,2.2vw,22px)] h-[clamp(18px,2.2vw,22px)] ${config.color}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-[clamp(12px,1.5vw,16px)] mb-[clamp(8px,1vw,10px)]">
                                            <h3 className="text-[clamp(14px,1.8vw,16px)] font-bold text-black">
                                                {suggestion.title}
                                            </h3>
                                            <div className={`shrink-0 px-[clamp(8px,1vw,10px)] py-[clamp(4px,0.5vw,6px)] bg-white border-2 ${config.borderColor} rounded-[5px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                                <span className={`text-[clamp(11px,1.3vw,12px)] font-bold ${config.color} uppercase tracking-wider`}>
                                                    {suggestion.impact}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-[clamp(12px,1.4vw,13px)] text-black/70 mb-[clamp(12px,1.5vw,16px)]">
                                            {suggestion.description}
                                        </p>

                                        {/* Before/After Preview */}
                                        <div className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-[clamp(12px,1.5vw,16px)] items-center">
                                            {/* Before */}
                                            <div className="p-[clamp(10px,1.2vw,12px)] bg-white/60 border-2 border-black/20 rounded-[5px]">
                                                <span className="text-[clamp(10px,1.2vw,11px)] font-bold text-black/60 uppercase tracking-wider block mb-[clamp(6px,0.8vw,8px)]">
                                                    Current
                                                </span>
                                                {suggestion.action.changes.map((change, idx) => (
                                                    <div key={idx} className="text-[clamp(11px,1.3vw,12px)] text-black/80">
                                                        <span className="font-medium">{change.field}:</span> {change.from}
                                                    </div>
                                                ))}
                                                <div className="text-[clamp(10px,1.2vw,11px)] text-black/60 mt-[clamp(4px,0.5vw,6px)]">
                                                    {suggestion.affectedPosts.length} post{suggestion.affectedPosts.length !== 1 ? 's' : ''}
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <div className="hidden sm:flex items-center justify-center">
                                                <ArrowRight className={`w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] ${config.color}`} />
                                            </div>

                                            {/* After */}
                                            <div className={`p-[clamp(10px,1.2vw,12px)] bg-white border-2 ${config.borderColor} rounded-[5px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                                <span className={`text-[clamp(10px,1.2vw,11px)] font-bold ${config.color} uppercase tracking-wider block mb-[clamp(6px,0.8vw,8px)]`}>
                                                    Optimized
                                                </span>
                                                {suggestion.action.changes.map((change, idx) => (
                                                    <div key={idx} className="text-[clamp(11px,1.3vw,12px)] text-black font-medium">
                                                        <span className="font-bold">{change.field}:</span> {change.to}
                                                    </div>
                                                ))}
                                                <div className={`text-[clamp(10px,1.2vw,11px)] ${config.color} font-bold mt-[clamp(4px,0.5vw,6px)]`}>
                                                    {suggestion.impact}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>

            {/* Actions */}
            <div className="flex flex-wrap gap-[clamp(12px,1.5vw,16px)] pt-[clamp(16px,2vw,20px)] border-t-2 border-black">
                <Button
                    onClick={handleApplyAll}
                    className="flex-1 min-w-[140px] bg-green-600 text-white border-2 border-black rounded-[5px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700 font-bold uppercase tracking-wider text-[clamp(12px,1.4vw,14px)] py-[clamp(10px,1.2vw,12px)] transition-all"
                >
                    <Sparkles className="w-[clamp(14px,1.8vw,16px)] h-[clamp(14px,1.8vw,16px)] mr-[clamp(6px,0.8vw,8px)]" />
                    Apply All ({activeSuggestions.length})
                </Button>

                <Button
                    onClick={handleApplySelected}
                    disabled={!hasSelection}
                    className="flex-1 min-w-[140px] bg-blue-600 text-white border-2 border-black rounded-[5px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed font-bold uppercase tracking-wider text-[clamp(12px,1.4vw,14px)] py-[clamp(10px,1.2vw,12px)] transition-all"
                >
                    <CheckCircle2 className="w-[clamp(14px,1.8vw,16px)] h-[clamp(14px,1.8vw,16px)] mr-[clamp(6px,0.8vw,8px)]" />
                    Apply Selected {hasSelection && `(${selectedIds.size})`}
                </Button>

                <Button
                    onClick={onDismiss}
                    className="bg-white text-black border-2 border-black rounded-[5px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 font-bold uppercase tracking-wider text-[clamp(12px,1.4vw,14px)] px-[clamp(16px,2vw,20px)] py-[clamp(10px,1.2vw,12px)] transition-all"
                >
                    Dismiss
                </Button>
            </div>
        </Card>
    )
}
