'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ScheduleItem {
    id: number
    time: string
    title: string
    platform: string
}

const mockUpcoming: ScheduleItem[] = [
    { id: 1, time: '10:00 AM', title: 'Instagram Story - Product Teaser', platform: 'Instagram' },
    { id: 2, time: '2:30 PM', title: 'LinkedIn Article - Industry Insights', platform: 'LinkedIn' },
    { id: 3, time: '5:00 PM', title: 'Facebook Post - Community Update', platform: 'Facebook' }
]

export function TodaysSchedule() {
    return (
        <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
                <CardTitle className="text-[clamp(20px,2.5vw,24px)] font-bold text-black">
                    Today's Schedule
                </CardTitle>
                <CardDescription className="text-black/60">Posts scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockUpcoming.map(item => (
                        <div
                            key={item.id}
                            className="p-4 bg-custom-green/30 rounded-[5px] border-2 border-black/10 hover:border-black transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 w-[60px] h-[60px] bg-black rounded-[5px] flex items-center justify-center border-2 border-black">
                                    <span className="text-custom-green font-bold text-[clamp(14px,1.5vw,16px)]">
                                        {item.time.split(' ')[0]}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[clamp(12px,1.5vw,14px)] text-black/60 mb-1">
                                        {item.time}
                                    </p>
                                    <h4 className="font-bold text-[clamp(13px,1.5vw,15px)] mb-1 leading-tight text-black">
                                        {item.title}
                                    </h4>
                                    <p className="text-[clamp(11px,1.5vw,13px)] text-black/60">
                                        {item.platform}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link href="/upload">
                    <Button className="w-full mt-6 bg-black text-custom-green hover:bg-custom-dark font-bold border-2 border-black text-md">
                        Upload New Tasks
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}
