/**
 * Caption Diff Component
 * Highlights changes between original and enhanced captions
 */

import { Badge } from '@/components/ui/badge'

interface CaptionDiffProps {
  original: string
  enhanced: string
  originalCount: number
  enhancedCount: number
}

export function CaptionDiff({ original, enhanced, originalCount, enhancedCount }: CaptionDiffProps) {
  // Simple diff highlighting - splits by spaces and compares
  const originalWords = original.split(' ')
  const enhancedWords = enhanced.split(' ')
  
  // Find added content by comparing strings
  const getAddedContent = () => {
    const added: string[] = []
    enhancedWords.forEach(word => {
      if (!originalWords.includes(word)) {
        added.push(word)
      }
    })
    return added
  }

  const addedContent = getAddedContent()

  return (
    <div className="space-y-[clamp(12px,1.5vw,14px)]">
      {/* Original Caption */}
      <div className="space-y-[clamp(6px,0.8vw,8px)]">
        <div className="flex items-center justify-between">
          <span className="text-[clamp(10px,1.2vw,11px)] font-bold text-black/60 uppercase tracking-wider">Original</span>
          <span className="text-[clamp(10px,1.2vw,11px)] text-black/60 font-medium">{originalCount} characters</span>
        </div>
        <div className="p-[clamp(12px,1.5vw,14px)] bg-gray-50 border-2 border-black rounded-[5px] text-[clamp(13px,1.5vw,14px)] leading-relaxed text-black">
          {original}
        </div>
      </div>

      {/* Enhanced Caption */}
      <div className="space-y-[clamp(6px,0.8vw,8px)]">
        <div className="flex items-center justify-between">
          <span className="text-[clamp(10px,1.2vw,11px)] font-bold text-black/60 uppercase tracking-wider">Enhanced</span>
          <div className="flex items-center gap-[clamp(6px,0.8vw,8px)]">
            <span className="text-[clamp(10px,1.2vw,11px)] text-green-600 font-bold">
              +{enhancedCount - originalCount} chars
            </span>
            <span className="text-[clamp(10px,1.2vw,11px)] text-black/60 font-medium">{enhancedCount} characters</span>
          </div>
        </div>
        <div className="p-[clamp(12px,1.5vw,14px)] bg-custom-green/30 border-2 border-black rounded-[5px] text-[clamp(13px,1.5vw,14px)] leading-relaxed text-black">
          {/* Render enhanced text with highlights for added content */}
          {enhancedWords.map((word, index) => {
            const isAdded = addedContent.includes(word)
            return (
              <span
                key={index}
                className={isAdded ? 'bg-custom-green px-1 rounded-[3px] font-medium' : ''}
              >
                {word}{' '}
              </span>
            )
          })}
        </div>
      </div>

      {/* Added Elements Summary */}
      {addedContent.length > 0 && (
        <div className="flex flex-wrap gap-[clamp(6px,0.8vw,8px)] pt-[clamp(4px,0.5vw,6px)]">
          <span className="text-[clamp(10px,1.2vw,11px)] text-black/60 font-bold uppercase tracking-wider">Added:</span>
          {addedContent.slice(0, 10).map((word, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-[clamp(9px,1vw,10px)] h-5 px-1.5 bg-green-50 border-2 border-green-600 text-green-700 font-bold uppercase tracking-wider"
            >
              {word}
            </Badge>
          ))}
          {addedContent.length > 10 && (
            <span className="text-[clamp(10px,1.2vw,11px)] text-black/60 font-medium">+{addedContent.length - 10} more</span>
          )}
        </div>
      )}
    </div>
  )
}
