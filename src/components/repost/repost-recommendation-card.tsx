'use client'

import {
    TrendingUp,
    ThumbsUp,
    Eye,
    MessageCircle,
    RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

interface RepostRecommendationCardProps {
    item: RepostRecommendation
}

export function RepostRecommendationCard({ item }: RepostRecommendationCardProps) {
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
        <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-[clamp(18px,2.5vw,22px)] font-bold text-black mb-2">
                            {item.originalPost.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-[clamp(14px,1.5vw,16px)] text-black/60">
                            <span>{item.originalPost.platform}</span>
                            <span>•</span>
                            <span>
                                Published:{' '}
                                {new Date(item.originalPost.publishedDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div
                        className={`px-4 py-2 rounded-[5px] border-2 ${getScoreBg(
                            item.recommendation.score
                        )}`}
                    >
                        <p
                            className={`text-[clamp(24px,3vw,32px)] font-bold ${getScoreColor(
                                item.recommendation.score
                            )}`}
                        >
                            {item.recommendation.score}
                        </p>
                        <p className="text-[clamp(11px,1.5vw,13px)] text-black/60">Repost Score</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-custom-green/20 rounded-[5px] border-2 border-black/10">
                        <div className="flex items-center gap-2 mb-1">
                            <Eye className="w-4 h-4 text-black/60" />
                            <span className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                Views
                            </span>
                        </div>
                        <p className="text-[clamp(18px,2vw,20px)] font-bold text-black">
                            {item.originalPost.performance.views.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-3 bg-custom-green/20 rounded-[5px] border-2 border-black/10">
                        <div className="flex items-center gap-2 mb-1">
                            <ThumbsUp className="w-4 h-4 text-black/60" />
                            <span className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                Likes
                            </span>
                        </div>
                        <p className="text-[clamp(18px,2vw,20px)] font-bold text-black">
                            {item.originalPost.performance.likes.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-3 bg-custom-green/20 rounded-[5px] border-2 border-black/10">
                        <div className="flex items-center gap-2 mb-1">
                            <MessageCircle className="w-4 h-4 text-black/60" />
                            <span className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                Comments
                            </span>
                        </div>
                        <p className="text-[clamp(18px,2vw,20px)] font-bold text-black">
                            {item.originalPost.performance.comments.toLocaleString()}
                        </p>
                    </div>
                    <div className="p-3 bg-custom-green/20 rounded-[5px] border-2 border-black/10">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-black/60" />
                            <span className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                Engagement
                            </span>
                        </div>
                        <p className="text-[clamp(18px,2vw,20px)] font-bold text-black">
                            {item.originalPost.performance.engagementRate}%
                        </p>
                    </div>
                </div>

                {/* AI Recommendation */}
                <div className="p-4 bg-yellow-50 border-2 border-yellow-500 rounded-[5px]">
                    <h4 className="font-bold text-[clamp(14px,1.5vw,16px)] text-black mb-2">
                        Why repost this?
                    </h4>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/80 mb-4">
                        {item.recommendation.reason}
                    </p>
                    <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,16px)] text-black/60">
                        <RefreshCw className="w-4 h-4" />
                        <span>
                            Suggested:{' '}
                            {new Date(item.recommendation.suggestedDate).toLocaleDateString()} at{' '}
                            {item.recommendation.suggestedTime}
                        </span>
                    </div>
                </div>

                {/* Improvements */}
                <div>
                    <h4 className="font-bold text-[clamp(14px,1.5vw,16px)] text-black mb-3">
                        Suggested Improvements:
                    </h4>
                    <ul className="space-y-2">
                        {item.recommendation.improvements.map((improvement, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-[clamp(14px,1.5vw,16px)] text-black/80"
                            >
                                <span className="text-green-600 mt-1">✓</span>
                                <span>{improvement}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Button className="w-full bg-black text-custom-green hover:bg-custom-dark font-bold border-2 border-black">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Schedule Repost
                </Button>
            </CardContent>
        </Card>
    )
}
