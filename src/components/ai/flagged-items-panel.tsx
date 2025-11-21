/**
 * Flagged Items Panel Component
 * Displays items requiring human attention with AI suggestions
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Sparkles, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EscalationCard } from './escalation-card'
import type { FlaggedItem } from '@/types/flagged-items'

interface FlaggedItemsPanelProps {
  items: FlaggedItem[]
  onAccept?: (id: string) => void
  onEdit?: (id: string) => void
  onSkip?: (id: string) => void
  onFixAll?: () => void
  onDismissAll?: () => void
}

export function FlaggedItemsPanel({
  items: initialItems,
  onAccept,
  onEdit,
  onSkip,
  onFixAll,
  onDismissAll
}: FlaggedItemsPanelProps) {
  const [items, setItems] = useState(initialItems)
  const [isExpanded, setIsExpanded] = useState(items.length > 0)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Sort items by severity (critical first)
  const sortedItems = [...items].sort((a, b) => {
    if (a.issue.severity === 'critical' && b.issue.severity === 'warning') return -1
    if (a.issue.severity === 'warning' && b.issue.severity === 'critical') return 1
    return 0
  })

  const criticalCount = items.filter(item => item.issue.severity === 'critical').length
  const warningCount = items.filter(item => item.issue.severity === 'warning').length

  const handleAccept = (id: string) => {
    onAccept?.(id)
    setItems(prev => {
      const filtered = prev.filter(item => item.id !== id)
      // Adjust current index if needed
      if (currentIndex >= filtered.length && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
      return filtered
    })
  }

  const handleEdit = (id: string) => {
    onEdit?.(id)
    setItems(prev => {
      const filtered = prev.filter(item => item.id !== id)
      if (currentIndex >= filtered.length && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
      return filtered
    })
  }

  const handleSkip = (id: string) => {
    onSkip?.(id)
    setItems(prev => {
      const filtered = prev.filter(item => item.id !== id)
      if (currentIndex >= filtered.length && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
      return filtered
    })
  }

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : sortedItems.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev < sortedItems.length - 1 ? prev + 1 : 0))
  }

  const handleFixAll = () => {
    onFixAll?.()
    setItems([])
  }

  const handleDismissAll = () => {
    onDismissAll?.()
    setItems([])
  }

  return (
    <div className="w-full">
      {/* Header - Always Visible */}
      <Card 
        className={`
          p-[clamp(16px,2vw,20px)] border-2 border-black rounded-[5px] 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
          ${items.length > 0 ? 'bg-yellow-50' : 'bg-custom-green'}
          transition-all duration-300
        `}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-[clamp(10px,1.5vw,12px)]">
            {items.length > 0 ? (
              <>
                <span className="text-[clamp(24px,3vw,32px)]">🚨</span>
                <div>
                  <h2 className="text-[clamp(18px,2.5vw,24px)] font-bold text-black uppercase tracking-wide">
                    {items.length} ITEM{items.length !== 1 ? 'S' : ''} NEED{items.length === 1 ? 'S' : ''} YOUR ATTENTION
                  </h2>
                  <div className="flex items-center gap-[clamp(8px,1vw,10px)] mt-[clamp(4px,0.5vw,6px)]">
                    {criticalCount > 0 && (
                      <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-red-600 uppercase tracking-wider">
                        {criticalCount} Critical
                      </span>
                    )}
                    {warningCount > 0 && (
                      <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-yellow-600 uppercase tracking-wider">
                        {warningCount} Warning{warningCount !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <CheckCircle className="w-[clamp(28px,3.5vw,36px)] h-[clamp(28px,3.5vw,36px)] text-green-600" />
                <div>
                  <h2 className="text-[clamp(18px,2.5vw,24px)] font-bold text-black uppercase tracking-wide">
                    All Items Ready to Publish!
                  </h2>
                  <p className="text-[clamp(12px,1.4vw,14px)] text-black/60 mt-[clamp(4px,0.5vw,6px)]">
                    No issues detected. Your content is good to go! ✓
                  </p>
                </div>
              </>
            )}
          </div>

          {items.length > 0 && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-[clamp(24px,3vw,28px)] h-[clamp(24px,3vw,28px)] text-black" />
            </motion.div>
          )}
        </button>

        {/* Bulk Actions - Show when expanded and items exist */}
        {items.length > 0 && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-[clamp(16px,2vw,20px)] pt-[clamp(16px,2vw,20px)] border-t-2 border-black/20"
          >
            <div className="flex flex-wrap gap-[clamp(8px,1vw,10px)]">
              <Button
                onClick={handleFixAll}
                className="flex-1 min-w-40 bg-custom-green hover:bg-black hover:text-custom-green text-lg"
              >
                <Sparkles className="w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)]" />
                Fix All with AI
              </Button>
              <Button
                onClick={handleDismissAll}
                variant="outline"
                className="text-red-600 hover:bg-red-600 hover:text-white text-lg"
              >
                Dismiss All
              </Button>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Flagged Items Carousel */}
      <AnimatePresence mode="wait">
        {isExpanded && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="mt-[clamp(16px,2vw,20px)]"
          >
            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Buttons */}
              {sortedItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-[clamp(40px,5vw,48px)] h-[clamp(40px,5vw,48px)] bg-white border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center group"
                    aria-label="Previous item"
                  >
                    <ChevronLeft className="w-[clamp(20px,2.5vw,24px)] h-[clamp(20px,2.5vw,24px)] text-black group-hover:scale-110 transition-transform" />
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-[clamp(40px,5vw,48px)] h-[clamp(40px,5vw,48px)] bg-white border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center group"
                    aria-label="Next item"
                  >
                    <ChevronRight className="w-[clamp(20px,2.5vw,24px)] h-[clamp(20px,2.5vw,24px)] text-black group-hover:scale-110 transition-transform" />
                  </button>
                </>
              )}

              {/* Current Card */}
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sortedItems[currentIndex]?.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <EscalationCard
                      item={sortedItems[currentIndex]}
                      onAccept={handleAccept}
                      onEdit={handleEdit}
                      onSkip={handleSkip}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Indicators */}
              {sortedItems.length > 1 && (
                <div className="flex items-center justify-center gap-[clamp(6px,0.8vw,8px)] mt-[clamp(16px,2vw,20px)]">
                  {sortedItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-[clamp(8px,1vw,10px)] rounded-full border-2 border-black transition-all ${
                        index === currentIndex
                          ? 'w-[clamp(32px,4vw,40px)] bg-black'
                          : 'w-[clamp(8px,1vw,10px)] bg-white hover:bg-gray-200'
                      }`}
                      aria-label={`Go to item ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Counter */}
              <div className="text-center mt-[clamp(12px,1.5vw,16px)]">
                <span className="text-[clamp(12px,1.4vw,14px)] font-bold text-black/60 uppercase tracking-wider">
                  Item {currentIndex + 1} of {sortedItems.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
