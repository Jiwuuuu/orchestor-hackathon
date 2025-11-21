'use client'

import { useState } from 'react'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentPosts } from '@/components/dashboard/recent-posts'
import { TodaysSchedule } from '@/components/dashboard/todays-schedule'
import { QuickActions } from '@/components/dashboard/quick-actions'

export default function DashboardPage() {
    const [greeting] = useState(() => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 18) return 'Good afternoon'
        return 'Good evening'
    })

    return (
        <div className="min-h-screen bg-custom-green">
            {/* Header */}
            <DashboardNav />

            {/* Main Content */}
            <main className="max-w-[1600px] mx-auto px-[clamp(20px,4vw,50px)] py-[clamp(40px,6vw,80px)]">
                {/* Welcome Section */}
                <div className="mb-[clamp(40px,6vw,60px)]">
                    <h2 className="text-[clamp(32px,5vw,56px)] font-bold mb-2 text-black">
                        {greeting}, User
                    </h2>
                    <p className="text-[clamp(16px,2vw,20px)] text-black/60">
                        Here's what's happening with your content today
                    </p>
                </div>

                {/* Stats Grid */}
                <StatsCards />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[clamp(30px,4vw,40px)] mb-[clamp(30px,4vw,40px)]">
                    <RecentPosts />
                    <TodaysSchedule />
                </div>

                {/* Quick Actions */}
                <QuickActions />
            </main>
        </div>
    )
}
