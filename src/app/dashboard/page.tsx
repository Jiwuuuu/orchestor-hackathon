'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Calendar, BarChart3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data for dashboard
const mockStats = {
    totalPosts: 127,
    scheduled: 23,
    published: 104,
    engagement: '12.5K'
}

const mockRecentPosts = [
    { id: 1, title: 'New Product Launch', platform: 'Instagram', status: 'Scheduled', date: '2025-11-20' },
    { id: 2, title: 'Weekly Newsletter', platform: 'LinkedIn', status: 'Published', date: '2025-11-18' },
    { id: 3, title: 'Behind the Scenes', platform: 'Facebook', status: 'Scheduled', date: '2025-11-21' },
    { id: 4, title: 'Customer Testimonial', platform: 'Instagram', status: 'Published', date: '2025-11-17' },
]

const mockUpcoming = [
    { id: 1, time: '10:00 AM', title: 'Instagram Story - Product Teaser', platform: 'Instagram' },
    { id: 2, time: '2:30 PM', title: 'LinkedIn Article - Industry Insights', platform: 'LinkedIn' },
    { id: 3, time: '5:00 PM', title: 'Facebook Post - Community Update', platform: 'Facebook' },
]

export default function DashboardPage() {
    const router = useRouter()
    const [greeting] = useState(() => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 18) return 'Good afternoon'
        return 'Good evening'
    })

    const handleSignOut = () => {
        // TODO: Backend sign out logic
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-custom-green">
            {/* Header */}
            <header className="border-b-2 border-black/10 bg-white">
                <div className="max-w-[1600px] mx-auto px-[clamp(20px,4vw,50px)] py-[clamp(20px,3vw,30px)]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[clamp(30px,5vw,60px)]">
                            <h1 className="font-family-logo font-bold tracking-tightest-custom text-[clamp(32px,5vw,48px)] leading-[0.85] text-black">
                                ORCHESTOR
                            </h1>
                            <nav className="hidden md:flex items-center gap-6">
                                <a href="#" className="text-[clamp(14px,1.5vw,16px)] text-black font-bold border-b-2 border-black">
                                    Dashboard
                                </a>
                                <a href="#" className="text-[clamp(14px,1.5vw,16px)] text-black/60 hover:text-black transition-colors">
                                    Calendar
                                </a>
                                <a href="#" className="text-[clamp(14px,1.5vw,16px)] text-black/60 hover:text-black transition-colors">
                                    Analytics
                                </a>
                                <a href="#" className="text-[clamp(14px,1.5vw,16px)] text-black/60 hover:text-black transition-colors">
                                    Settings
                                </a>
                            </nav>
                        </div>

                        <Button
                            onClick={handleSignOut}
                            variant="outline"
                        >
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(20px,3vw,30px)] mb-[clamp(50px,6vw,80px)]">
                    <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-black/60 text-[clamp(12px,1.5vw,14px)] uppercase tracking-wider">
                                Total Posts
                            </CardDescription>
                            <CardTitle className="text-[clamp(36px,5vw,48px)] font-bold text-black">
                                {mockStats.totalPosts}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                +12 this month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-black/60 text-[clamp(12px,1.5vw,14px)] uppercase tracking-wider">
                                Scheduled
                            </CardDescription>
                            <CardTitle className="text-[clamp(36px,5vw,48px)] font-bold text-black">
                                {mockStats.scheduled}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                Next 7 days
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-black/60 text-[clamp(12px,1.5vw,14px)] uppercase tracking-wider">
                                Published
                            </CardDescription>
                            <CardTitle className="text-[clamp(36px,5vw,48px)] font-bold text-black">
                                {mockStats.published}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                All time
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-black/60 text-[clamp(12px,1.5vw,14px)] uppercase tracking-wider">
                                Engagement
                            </CardDescription>
                            <CardTitle className="text-[clamp(36px,5vw,48px)] font-bold text-black">
                                {mockStats.engagement}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                +8.2% vs last week
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[clamp(30px,4vw,40px)]">
                    {/* Recent Posts */}
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
                            <div className="space-y-4">
                                {mockRecentPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="flex items-center justify-between p-4 bg-custom-green/30 rounded-[5px] border-2 border-black/10 hover:border-black transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[clamp(14px,1.5vw,16px)] mb-1 text-black">
                                                {post.title}
                                            </h3>
                                            <p className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                                {post.platform} • {post.date}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[clamp(12px,1.5vw,14px)] font-medium border-2 ${post.status === 'Published'
                                                ? 'bg-black text-white border-black'
                                                : 'bg-yellow-500 text-black border-black'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                className="w-full mt-6"
                            >
                                View All Posts
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Upcoming Today */}
                    <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <CardHeader>
                            <CardTitle className="text-[clamp(20px,2.5vw,24px)] font-bold text-black">
                                Today's Schedule
                            </CardTitle>
                            <CardDescription className="text-black/60">
                                Posts scheduled for today
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockUpcoming.map((item) => (
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

                            <Button
                                className="w-full mt-6 bg-black text-custom-green hover:bg-custom-dark font-bold border-2 border-black"
                            >
                                Create New Post
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-[clamp(30px,4vw,40px)]">
                    <CardHeader>
                        <CardTitle className="text-[clamp(20px,2.5vw,24px)] font-bold text-black">
                            Quick Actions
                        </CardTitle>
                        <CardDescription className="text-black/60">
                            Manage your content workflow
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Button
                                variant="outline"
                                className="h-20 flex flex-col gap-2"
                            >
                                <FileText className="w-6 h-6" />
                                <span className="text-[clamp(12px,1.5vw,14px)]">New Post</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-20 flex flex-col gap-2"
                            >
                                <Calendar className="w-6 h-6" />
                                <span className="text-[clamp(12px,1.5vw,14px)]">Schedule</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-20 flex flex-col gap-2"
                            >
                                <BarChart3 className="w-6 h-6" />
                                <span className="text-[clamp(12px,1.5vw,14px)]">Analytics</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-20 flex flex-col gap-2"
                            >
                                <Settings className="w-6 h-6" />
                                <span className="text-[clamp(12px,1.5vw,14px)]">Settings</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
