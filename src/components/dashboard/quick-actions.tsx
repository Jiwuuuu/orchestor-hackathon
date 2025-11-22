'use client'

import Link from 'next/link'
import { Upload, Calendar, BarChart3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface QuickAction {
    icon: React.ReactNode
    label: string
    href: string
}

export function QuickActions() {
    const actions: QuickAction[] = [
        { icon: <Upload className="w-6 h-6" />, label: 'Upload Tasks', href: '/upload' },
        { icon: <Calendar className="w-6 h-6" />, label: 'Schedule', href: '/schedule-preview' },
        { icon: <BarChart3 className="w-6 h-6" />, label: 'Analytics', href: '/repost' },
        { icon: <Settings className="w-6 h-6" />, label: 'Settings', href: '#' }
    ]

    return (
        <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
                    {actions.map((action, index) => (
                        <Link key={index} href={action.href}>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 w-full">
                                {action.icon}
                                <span className="text-[clamp(12px,1.5vw,14px)]">{action.label}</span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
