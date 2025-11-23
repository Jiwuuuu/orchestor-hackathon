'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { RefreshCw, TrendingUp, Eye, ThumbsUp, MessageCircle } from 'lucide-react'

interface RepostRecommendation {
    id: number
    originalPost: {
        title: string
        platform: string
        publishedDate: string
        performance: {
            views: number
            likes: number
            comments: number
            shares: number
            engagementRate: number
        }
    }
    recommendation: {
        score: number
        reason: string
        suggestedDate: string
        suggestedTime: string
        improvements: string[]
    }
}

interface ViewRepostDialogProps {
    item: RepostRecommendation | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ViewRepostDialog({ item, open, onOpenChange }: ViewRepostDialogProps) {
    if (!item) return null

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600'
        if (score >= 75) return 'text-yellow-600'
        return 'text-orange-600'
    }

    const getScoreBg = (score: number) => {
        if (score >= 90) return 'bg-green-100 border-green-500'
        if (score >= 75) return 'bg-yellow-100 border-yellow-500'
        return 'bg-orange-100 border-orange-500'
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl border-2 border-black shadow-box bg-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <DialogTitle className="text-2xl font-bold">{item.originalPost.title}</DialogTitle>
                            <DialogDescription className="mt-2 flex items-center gap-2 text-base">
                                <span>{item.originalPost.platform}</span>
                                <span>•</span>
                                <span>Published: {new Date(item.originalPost.publishedDate).toLocaleDateString()}</span>
                            </DialogDescription>
                        </div>
                        <div
                            className={`px-4 py-2 rounded-[5px] border-2 ${getScoreBg(item.recommendation.score)}`}
                        >
                            <p className={`text-3xl font-bold ${getScoreColor(item.recommendation.score)}`}>
                                {item.recommendation.score}
                            </p>
                            <p className="text-xs text-black/60">Repost Score</p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Performance Metrics */}
                    <div>
                        <h4 className="font-bold text-sm mb-3">Original Performance</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-custom-green/20 rounded-[5px] border-2 border-black/10">
                                <div className="flex items-center gap-2 mb-1">
                                    <Eye className="w-4 h-4 text-black/60" />
                                    <span className="text-xs text-black/60">Views</span>
                                </div>
                                <p className="text-lg font-bold text-black">
                                    {item.originalPost.performance.views.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-custom-green/20 rounded-[5px] border-2 border-black/10">
                                <div className="flex items-center gap-2 mb-1">
                                    <ThumbsUp className="w-4 h-4 text-black/60" />
                                    <span className="text-xs text-black/60">Likes</span>
                                </div>
                                <p className="text-lg font-bold text-black">
                                    {item.originalPost.performance.likes.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-custom-green/20 rounded-[5px] border-2 border-black/10">
                                <div className="flex items-center gap-2 mb-1">
                                    <MessageCircle className="w-4 h-4 text-black/60" />
                                    <span className="text-xs text-black/60">Comments</span>
                                </div>
                                <p className="text-lg font-bold text-black">
                                    {item.originalPost.performance.comments.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-custom-green/20 rounded-[5px] border-2 border-black/10">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-4 h-4 text-black/60" />
                                    <span className="text-xs text-black/60">Engagement</span>
                                </div>
                                <p className="text-lg font-bold text-black">
                                    {item.originalPost.performance.engagementRate}%
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className="p-4 bg-yellow-50 border-2 border-yellow-500 rounded-[5px]">
                        <h4 className="font-bold text-sm text-black mb-2">Why repost this?</h4>
                        <p className="text-sm text-black/80 mb-3">{item.recommendation.reason}</p>
                        <div className="flex items-center gap-2 text-sm text-black/60">
                            <RefreshCw className="w-4 h-4" />
                            <span>
                                Suggested: {new Date(item.recommendation.suggestedDate).toLocaleDateString()} at{' '}
                                {item.recommendation.suggestedTime}
                            </span>
                        </div>
                    </div>

                    {/* Improvements */}
                    <div>
                        <h4 className="font-bold text-sm text-black mb-3">Suggested Improvements:</h4>
                        <ul className="space-y-2">
                            {item.recommendation.improvements.map((improvement, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-black/80">
                                    <span className="text-green-600 mt-0.5">✓</span>
                                    <span>{improvement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <DialogFooter className="flex justify-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-2 border-black text-lg h-12 px-8"
                    >
                        Close
                    </Button>
                    <Button
                        type="button"
                        className="bg-black text-custom-green hover:bg-black/90 text-lg h-12 px-8"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Schedule Repost
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
