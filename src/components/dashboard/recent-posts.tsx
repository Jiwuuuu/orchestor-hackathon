'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRecentPosts } from '@/services/dashboard'

export function RecentPosts() {
    const { data, isLoading } = useRecentPosts()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    const truncateCaption = (caption: string, maxLength: number = 50) => {
        if (caption.length <= maxLength) return caption
        return caption.substring(0, maxLength) + '...'
    }

    return (
        <Card className="lg:col-span-2 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
                <CardTitle className="text-[clamp(20px,2.5vw,24px)] font-bold text-black">
                    Recent Posts
                </CardTitle>
                <CardDescription className="text-black/60">
                    Your latest content across all platforms
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                className="p-4 bg-custom-green/30 rounded-[5px] border-2 border-black/10 animate-pulse"
                            >
                                <div className="h-4 bg-black/10 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-black/10 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : data?.data && data.data.length > 0 ? (
                    <div className="space-y-4">
                        {data.data.slice(0, 10).map(post => (
                            <div
                                key={post.id}
                                className="flex items-center justify-between p-4 bg-custom-green/30 rounded-[5px] border-2 border-black/10 hover:border-black transition-colors"
                            >
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-[clamp(14px,1.5vw,16px)] mb-1 text-black truncate">
                                        {truncateCaption(post.caption)}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[clamp(12px,1.5vw,14px)] text-black/60">
                                        <span className="capitalize">{post.platform}</span>
                                        <span>•</span>
                                        <span>{post.account}</span>
                                        <span>•</span>
                                        <span>{formatDate(post.scheduled_time)}</span>
                                    </div>
                                </div>
                                <span
                                    className={`shrink-0 ml-4 px-3 py-1 rounded-full text-[clamp(12px,1.5vw,14px)] font-medium border-2 ${
                                        post.status === 'PUBLISHED'
                                            ? 'bg-black text-white border-black'
                                            : post.status === 'FAILED'
                                            ? 'bg-red-500 text-white border-black'
                                            : 'bg-yellow-500 text-black border-black'
                                    }`}
                                >
                                    {post.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-black/60">
                        <p>No recent posts found</p>
                    </div>
                )}

                <Link href="/schedule-preview">
                    <Button variant="outline" className="w-full mt-6 text-md">
                        View All Posts
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}
