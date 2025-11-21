'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { AiInsightsSummary } from '@/components/schedule-preview/ai-insights-summary'
import { ScheduleDataTable } from '@/components/schedule-preview/schedule-data-table'
import { EditScheduleDialog } from '@/components/schedule-preview/edit-schedule-dialog'
import { FlaggedItemsPanel } from '@/components/ai/flagged-items-panel'
import { ScheduleOptimizationCard } from '@/components/ai/schedule-optimization-card'
import { CaptionEnhancementCard } from '@/components/ai/caption-enhancement-card'
import type { FlaggedItem } from '@/types/flagged-items'
import type { ScheduleSuggestion, ScheduleItem } from '@/types/schedule-suggestion'
import type { CaptionEnhancement } from '@/types/caption'
import { mockScheduleData, mockFlaggedItemsBasic, mockScheduleSuggestionsBasic } from '@/lib/mock-data'

export default function SchedulePreviewPage() {
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(mockScheduleData)
    const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>(mockFlaggedItemsBasic)
    const [scheduleSuggestions, setScheduleSuggestions] = useState<ScheduleSuggestion[]>(mockScheduleSuggestionsBasic)
    const [showEnhancementsDialog, setShowEnhancementsDialog] = useState(false)
    const [currentEnhancementIndex, setCurrentEnhancementIndex] = useState(0)
    const [reviewedEnhancements, setReviewedEnhancements] = useState<Set<string>>(new Set())

    // Simulate loading from upload flow
    useEffect(() => {
        // TODO: Check if coming from /upload route and load actual data
        // For now, using mock data
    }, [])

    const handleEdit = (item: ScheduleItem) => {
        setEditingItem(item)
        setDialogOpen(true)
    }

    const handleSave = (updatedItem: ScheduleItem) => {
        setScheduleItems(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)))
        // TODO: Backend integration - save changes to API
    }

    const handleFixFlaggedItem = (itemId: string) => {
        setFlaggedItems(prev => prev.filter(item => item.id !== itemId))
        // TODO: Apply AI fix and update schedule
    }

    const handleDismissFlaggedItem = (itemId: string) => {
        setFlaggedItems(prev => prev.filter(item => item.id !== itemId))
    }

    const handleApplyAllSuggestions = (suggestions: ScheduleSuggestion[]) => {
        // Apply all schedule optimizations
        suggestions.forEach(suggestion => {
            suggestion.action.changes.forEach(change => {
                setScheduleItems(prev => prev.map(item => {
                    if (item.id.toString() === change.postId) {
                        return {
                            ...item,
                            [change.field === 'date' ? 'scheduledDate' : 'scheduledTime']: change.to
                        }
                    }
                    return item
                }))
            })
        })
        // TODO: Backend integration
    }

    const handleApplySelectedSuggestions = (suggestions: ScheduleSuggestion[]) => {
        handleApplyAllSuggestions(suggestions)
    }

    const handleDismissSuggestions = () => {
        setScheduleSuggestions([])
    }

    const handleAcceptAll = (taskId: string) => {
        // Update the schedule item with enhanced caption for all platforms
        setScheduleItems(prev => prev.map(item => {
            if (item.captionEnhancement?.taskId === taskId) {
                return {
                    ...item,
                    // TODO: Backend integration - apply enhanced captions for all platforms
                }
            }
            return item
        }))
        
        // Mark as reviewed and move to next
        moveToNextEnhancement(taskId)
    }

    const handleAcceptPlatform = (taskId: string, platform: string) => {
        // Update the schedule item with enhanced caption for specific platform
        setScheduleItems(prev => prev.map(item => {
            if (item.captionEnhancement?.taskId === taskId) {
                return {
                    ...item,
                    // TODO: Backend integration - apply enhanced caption for specific platform
                }
            }
            return item
        }))
        
        // Mark as reviewed and move to next
        moveToNextEnhancement(taskId)
    }

    const handleEditEnhancement = (taskId: string) => {
        // TODO: Open edit dialog for manual caption editing
        console.log('Edit enhancement:', taskId)
        // For now, just move to next
        moveToNextEnhancement(taskId)
    }

    const handleKeepOriginal = (taskId: string) => {
        // Keep original caption, reject AI enhancement
        console.log('Keeping original for:', taskId)
        // Mark as reviewed and move to next
        moveToNextEnhancement(taskId)
    }

    const moveToNextEnhancement = (completedTaskId: string) => {
        const newReviewed = new Set(reviewedEnhancements)
        newReviewed.add(completedTaskId)
        setReviewedEnhancements(newReviewed)
        
        // Move to next card
        const nextIndex = currentEnhancementIndex + 1
        if (nextIndex < enhancedItems.length) {
            setCurrentEnhancementIndex(nextIndex)
        } else {
            // All cards reviewed - close dialog
            setTimeout(() => {
                setShowEnhancementsDialog(false)
                setCurrentEnhancementIndex(0)
                setReviewedEnhancements(new Set())
            }, 300)
        }
    }

    const enhancedItems = scheduleItems.filter(item => item.captionEnhancement)
    const currentEnhancement = enhancedItems[currentEnhancementIndex]
    const remainingCount = enhancedItems.length - currentEnhancementIndex

    return (
        <div className="min-h-screen bg-custom-green">
            {/* Header */}
            <DashboardNav />

            {/* Main Content */}
            <main className="max-w-[1600px] mx-auto px-[clamp(20px,4vw,50px)] py-[clamp(40px,6vw,80px)]">
                <div className="mb-[clamp(40px,6vw,60px)]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-[clamp(32px,5vw,56px)] font-bold mb-2 text-black">
                                Schedule Preview
                            </h2>
                            <p className="text-[clamp(16px,2vw,20px)] text-black/60">
                                Review and optimize your content schedule with AI recommendations
                            </p>
                        </div>

                        {/* Review AI Changes Button */}
                        {enhancedItems.length > 0 && (
                            <Dialog open={showEnhancementsDialog} onOpenChange={(open) => {
                                setShowEnhancementsDialog(open)
                                if (!open) {
                                    // Reset when dialog closes
                                    setCurrentEnhancementIndex(0)
                                    setReviewedEnhancements(new Set())
                                }
                            }}>
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-[clamp(8px,1vw,10px)] bg-blue-600 text-white border-2 border-black rounded-[5px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 font-bold uppercase tracking-wider text-[clamp(12px,1.4vw,14px)] px-[clamp(16px,2vw,20px)] py-[clamp(10px,1.2vw,12px)] transition-all">
                                        <Sparkles className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)]" />
                                        Review AI Changes ({enhancedItems.length})
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[1200px] max-h-[90vh] p-0 flex flex-col overflow-hidden">
                                    <DialogHeader className="px-[clamp(16px,3vw,24px)] pt-[clamp(16px,3vw,24px)] pb-[clamp(12px,2vw,16px)] border-b-2 border-black shrink-0">
                                        <div className="flex items-center justify-between">
                                            <DialogTitle className="text-[clamp(18px,2.5vw,24px)] md:text-[clamp(20px,3vw,28px)] font-bold uppercase tracking-wider">
                                                AI Caption Enhancements
                                            </DialogTitle>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border-2 border-black rounded-[5px]">
                                                <span className="text-[clamp(12px,1.5vw,14px)] font-bold text-blue-600">
                                                    Reviewing {currentEnhancementIndex + 1} of {enhancedItems.length}
                                                </span>
                                            </div>
                                        </div>
                                    </DialogHeader>
                                    <div className="overflow-y-auto overflow-x-hidden px-[clamp(16px,3vw,24px)] py-[clamp(16px,2vw,20px)] flex-1">
                                        {currentEnhancement?.captionEnhancement && (
                                            <CaptionEnhancementCard
                                                key={currentEnhancement.id}
                                                enhancement={currentEnhancement.captionEnhancement}
                                                onAcceptAll={() => handleAcceptAll(currentEnhancement.captionEnhancement!.taskId)}
                                                onAcceptPlatform={(taskId, platform) => handleAcceptPlatform(taskId, platform)}
                                                onEdit={(taskId) => handleEditEnhancement(taskId)}
                                                onKeepOriginal={(taskId) => handleKeepOriginal(taskId)}
                                            />
                                        )}
                                    </div>
                                    
                                    {/* Progress Dots */}
                                    {enhancedItems.length > 1 && (
                                        <div className="flex items-center justify-center gap-2 px-[clamp(16px,3vw,24px)] py-[clamp(12px,2vw,16px)] border-t-2 border-black shrink-0">
                                            {enhancedItems.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`h-2 rounded-full transition-all duration-300 ${
                                                        index === currentEnhancementIndex
                                                            ? 'w-8 bg-blue-600'
                                                            : index < currentEnhancementIndex
                                                            ? 'w-2 bg-green-600'
                                                            : 'w-2 bg-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>

                {/* Flagged Items Panel (if any) */}
                {flaggedItems.length > 0 && (
                    <div className="mb-[clamp(24px,3vw,32px)]">
                        <FlaggedItemsPanel
                            items={flaggedItems}
                            onAccept={handleFixFlaggedItem}
                            onSkip={handleDismissFlaggedItem}
                        />
                    </div>
                )}

                {/* Schedule Optimization Suggestions */}
                {scheduleSuggestions.length > 0 && (
                    <div className="mb-[clamp(24px,3vw,32px)]">
                        <ScheduleOptimizationCard
                            suggestions={scheduleSuggestions}
                            onApplyAll={handleApplyAllSuggestions}
                            onApplySelected={handleApplySelectedSuggestions}
                            onDismiss={handleDismissSuggestions}
                        />
                    </div>
                )}

                {/* AI Insights Summary */}
                <AiInsightsSummary />

                {/* Schedule Data Table with Pagination */}
                <div className="mt-8">
                    <ScheduleDataTable data={scheduleItems} onEdit={handleEdit} />
                </div>

                {/* Edit Dialog */}
                <EditScheduleDialog
                    item={editingItem}
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    onSave={handleSave}
                />

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <Link href="/dashboard" className="flex-1">
                        <Button className="flex items-center justify-center gap-[clamp(8px,1vw,10px)] text-lg w-full bg-black text-custom-green hover:bg-custom-dark font-bold border-2 border-black">
                            <FileCheck className="w-[clamp(18px,2.2vw,22px)] h-[clamp(18px,2.2vw,22px)]" />
                            Publish Schedule
                        </Button>
                    </Link>
                    <Link href="/upload">
                        <Button variant="outline" className="text-lg">Upload New File</Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}
