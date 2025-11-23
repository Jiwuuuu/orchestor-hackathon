/**
 * Caption Enhancement Card Component
 * Shows original vs AI-enhanced captions with platform-specific versions
 */

'use client'

import { useState } from 'react'
import { Sparkles, Check, Edit, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlatformCaptionTab } from './platform-caption-tab'
import { CaptionDiff } from './caption-diff'
import type { CaptionEnhancement, Platform, Hashtag } from '@/types/caption'

interface CaptionEnhancementCardProps {
    enhancement: CaptionEnhancement
    onAcceptAll?: (taskId: string) => void
    onAcceptPlatform?: (taskId: string, platform: Platform) => void
    onEdit?: (taskId: string) => void
    onKeepOriginal?: (taskId: string) => void
}

const performanceColors = {
    trending: 'bg-red-100 text-red-700 border-red-600',
    high_engagement: 'bg-green-100 text-green-700 border-green-600',
    brand_aligned: 'bg-blue-100 text-blue-700 border-blue-600',
    niche: 'bg-purple-100 text-purple-700 border-purple-600'
}

export function CaptionEnhancementCard({
    enhancement,
    onAcceptAll,
    onAcceptPlatform,
    onEdit,
    onKeepOriginal
}: CaptionEnhancementCardProps) {
    const [activePlatform, setActivePlatform] = useState<Platform>('instagram')
    const currentPlatformCaption = enhancement.enhanced[activePlatform]

    return (
        <Card className="p-[clamp(20px,3vw,30px)] border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-white">
            {/* Header */}
            <div className="flex items-start justify-between mb-[clamp(20px,3vw,24px)]">
                <div className="space-y-[clamp(4px,0.5vw,6px)]">
                    <h3 className="text-[clamp(18px,2vw,22px)] font-bold text-black">{enhancement.taskTitle}</h3>
                    <p className="text-[clamp(11px,1.2vw,12px)] text-black/60 uppercase tracking-wider">Task ID: {enhancement.taskId}</p>
                </div>
                <div className="flex items-center gap-[clamp(6px,0.8vw,8px)] px-[clamp(10px,1.5vw,12px)] py-[clamp(6px,0.8vw,8px)] bg-purple-50 border-2 border-black rounded-[5px]">
                    <Sparkles className="w-[clamp(14px,1.5vw,16px)] h-[clamp(14px,1.5vw,16px)] text-purple-600" />
                    <span className="text-[clamp(10px,1.2vw,11px)] font-bold text-purple-600 uppercase tracking-wider">AI Enhanced</span>
                </div>
            </div>

            {/* Improvements Summary */}
            {enhancement.improvements.length > 0 && (
                <div className="mb-[clamp(20px,3vw,24px)] p-[clamp(12px,1.5vw,16px)] bg-blue-50 border-2 border-black rounded-[5px]">
                    <div className="flex items-center gap-[clamp(6px,0.8vw,8px)] mb-[clamp(8px,1vw,10px)]">
                        <Check className="w-[clamp(14px,1.5vw,16px)] h-[clamp(14px,1.5vw,16px)] text-blue-600" />
                        <span className="text-[clamp(10px,1.2vw,11px)] font-bold text-blue-600 uppercase tracking-wider">Improvements Applied</span>
                    </div>
                    <div className="flex flex-wrap gap-[clamp(6px,0.8vw,8px)]">
                        {enhancement.improvements.map((improvement, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="text-[clamp(9px,1vw,10px)] h-5 px-2 bg-white border-2 border-blue-600 text-blue-700 font-bold uppercase tracking-wider"
                            >
                                {improvement}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Platform Tabs */}
            <div className="mb-[clamp(20px,3vw,24px)]">
                <h4 className="text-[clamp(12px,1.5vw,14px)] font-bold mb-[clamp(12px,1.5vw,14px)] uppercase tracking-wider text-black/80">Select Platform</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(10px,1.5vw,12px)]">
                    {(['instagram', 'facebook', 'linkedin', 'twitter'] as Platform[]).map((platform) => (
                        <PlatformCaptionTab
                            key={platform}
                            platform={platform}
                            characterCount={enhancement.enhanced[platform].characterCount}
                            characterLimit={enhancement.enhanced[platform].characterLimit}
                            status={enhancement.enhanced[platform].status}
                            isActive={activePlatform === platform}
                            onClick={() => setActivePlatform(platform)}
                        />
                    ))}
                </div>
            </div>

            {/* Caption Comparison */}
            <div className="mb-[clamp(20px,3vw,24px)]">
                <h4 className="text-[clamp(12px,1.5vw,14px)] font-bold mb-[clamp(12px,1.5vw,14px)] uppercase tracking-wider text-black/80">
                    {activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)} Caption
                </h4>
                <CaptionDiff
                    original={enhancement.original.text}
                    enhanced={currentPlatformCaption.text}
                    originalCount={enhancement.original.characterCount}
                    enhancedCount={currentPlatformCaption.characterCount}
                />
            </div>

            {/* Hashtags for Current Platform */}
            {currentPlatformCaption.hashtags.length > 0 && (
                <div className="mb-[clamp(20px,3vw,24px)] p-[clamp(14px,2vw,16px)] bg-gray-50 border-2 border-black rounded-[5px]">
                    <div className="flex items-center justify-between mb-[clamp(10px,1.5vw,12px)]">
                        <h4 className="text-[clamp(12px,1.5vw,14px)] font-bold uppercase tracking-wider text-black">Platform Hashtags</h4>
                        <span className="text-[clamp(10px,1.2vw,11px)] text-black/60 font-medium">{currentPlatformCaption.hashtags.length} tags</span>
                    </div>
                    <div className="flex flex-wrap gap-[clamp(6px,0.8vw,8px)]">
                        {currentPlatformCaption.hashtags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-[clamp(11px,1.2vw,12px)] px-2 py-1 bg-white border-2 border-black rounded-[5px] font-mono font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Suggested Hashtags with Performance */}
            {enhancement.suggestedHashtags.length > 0 && (
                <div className="mb-[clamp(20px,3vw,24px)] p-[clamp(14px,2vw,16px)] bg-yellow-50 border-2 border-black rounded-[5px]">
                    <div className="flex items-center justify-between mb-[clamp(10px,1.5vw,12px)]">
                        <h4 className="text-[clamp(12px,1.5vw,14px)] font-bold uppercase tracking-wider text-black">Suggested Hashtags</h4>
                        <span className="text-[clamp(10px,1.2vw,11px)] text-black/60 font-medium">{enhancement.suggestedHashtags.length} suggestions</span>
                    </div>
                    <div className="space-y-[clamp(6px,0.8vw,8px)]">
                        {enhancement.suggestedHashtags.map((hashtag: Hashtag, index: number) => (
                            <div key={index} className="flex items-center justify-between p-[clamp(8px,1vw,10px)] bg-white border-2 border-black rounded-[5px]">
                                <span className="text-[clamp(11px,1.2vw,12px)] font-mono font-bold">{hashtag.tag}</span>
                                <Badge
                                    variant="outline"
                                    className={`text-[clamp(9px,1vw,10px)] h-5 px-2 border-2 font-bold uppercase tracking-wider ${performanceColors[hashtag.performance]}`}
                                >
                                    {hashtag.performance.replace('_', ' ').toUpperCase()}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-[clamp(10px,1.5vw,12px)]">
                <Button
                    onClick={() => onAcceptAll?.(enhancement.taskId)}
                    className="flex-1 min-w-[150px] bg-custom-green hover:bg-black hover:text-custom-green text-lg"
                >
                    <Check className="w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)]" />
                    Accept All
                </Button>
                <Button
                    onClick={() => onAcceptPlatform?.(enhancement.taskId, activePlatform)}
                    variant="outline"
                    className="flex-1 min-w-[150px] text-lg"
                >
                    <Check className="w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)]" />
                    Accept {activePlatform === 'twitter' ? 'X' : activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)}
                </Button>
                <Button
                    onClick={() => onEdit?.(enhancement.taskId)}
                    variant="outline"
                    className='text-lg'
                >
                    <Edit className="w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)]" />
                    Edit
                </Button>
                <Button
                    onClick={() => onKeepOriginal?.(enhancement.taskId)}
                    variant="outline"
                    className="text-red-600 hover:bg-red-600 hover:text-white text-lg"
                >
                    <X className="w-[clamp(16px,2vw,18px)] h-[clamp(16px,2vw,18px)]" />
                    Keep Original
                </Button>
            </div>
        </Card>
    )
}
