'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardSummary } from '@/services/dashboard'

interface StatCardProps {
    title: string
    value: string
    description: string
    loading?: boolean
}

function StatCard({ title, value, description, loading }: StatCardProps) {
    return (
        <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
            <CardHeader className="pb-3">
                <CardDescription className="text-black/60 text-[clamp(12px,1.5vw,14px)] uppercase tracking-wider">
                    {title}
                </CardDescription>
                <CardTitle className="text-[clamp(36px,5vw,48px)] font-bold text-black">
                    {loading ? (
                        <span className="animate-pulse text-black/30">--</span>
                    ) : (
                        value
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-[clamp(12px,1.5vw,14px)] text-black/60">{description}</p>
            </CardContent>
        </Card>
    )
}

export function StatsCards() {
    const { data, isLoading } = useDashboardSummary()

    const stats: StatCardProps[] = [
        {
            title: 'Total Scheduled',
            value: data?.data.totalScheduled?.toString() || '0',
            description: 'Pending posts',
            loading: isLoading
        },
        {
            title: 'Scheduled Today',
            value: data?.data.todayCount?.toString() || '0',
            description: 'Posts for today',
            loading: isLoading
        },
        {
            title: 'Published',
            value: data?.data.totalPublished?.toString() || '0',
            description: 'All time',
            loading: isLoading
        },
        {
            title: 'Upcoming',
            value: data?.data.upcomingCount?.toString() || '0',
            description: 'Next posts',
            loading: isLoading
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(20px,3vw,30px)] mb-[clamp(30px,4vw,40px)]">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    )
}
