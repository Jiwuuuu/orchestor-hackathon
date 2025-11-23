'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTodaySchedule } from '@/services/dashboard'

export function TodaysSchedule() {
    const { data, isLoading } = useTodaySchedule()

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    const getTimeDisplay = (dateString: string) => {
        const date = new Date(dateString)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    const truncateCaption = (caption: string, maxLength: number = 40) => {
        if (caption.length <= maxLength) return caption
        return caption.substring(0, maxLength) + '...'
    }

    return (
        <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
                <CardTitle className="text-[clamp(20px,2.5vw,24px)] font-bold text-black">
                    Today's Schedule
                </CardTitle>
                <CardDescription className="text-black/60">Posts scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="p-4 bg-custom-green/30 rounded-[5px] border-2 border-black/10 animate-pulse"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 w-[60px] h-[60px] bg-black/10 rounded-[5px]"></div>
                                    <div className="flex-1">
                                        <div className="h-3 bg-black/10 rounded w-1/4 mb-2"></div>
                                        <div className="h-4 bg-black/10 rounded w-3/4 mb-1"></div>
                                        <div className="h-3 bg-black/10 rounded w-1/3"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : data?.data && data.data.length > 0 ? (
                    <div className="space-y-4">
                        {data.data.slice(0, 5).map(item => (
                            <div
                                key={item.id}
                                className="p-4 bg-custom-green/30 rounded-[5px] border-2 border-black/10 hover:border-black transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 w-[60px] h-[60px] bg-black rounded-[5px] flex items-center justify-center border-2 border-black">
                                        <span className="text-custom-green font-bold text-[clamp(14px,1.5vw,16px)]">
                                            {getTimeDisplay(item.scheduled_time)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[clamp(12px,1.5vw,14px)] text-black/60 mb-1">
                                            {formatTime(item.scheduled_time)}
                                        </p>
                                        <h4 className="font-bold text-[clamp(13px,1.5vw,15px)] mb-1 leading-tight text-black">
                                            {truncateCaption(item.caption)}
                                        </h4>
                                        <div className="flex items-center gap-2 text-[clamp(11px,1.5vw,13px)] text-black/60">
                                            <span className="capitalize">{item.platform}</span>
                                            <span>•</span>
                                            <span>{item.account}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-black/60">
                        <p>No posts scheduled for today</p>
                    </div>
                )}

                <Link href="/upload">
                    <Button className="w-full mt-6 bg-black text-custom-green hover:bg-custom-dark font-bold border-2 border-black text-md">
                        Upload New Tasks
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}
