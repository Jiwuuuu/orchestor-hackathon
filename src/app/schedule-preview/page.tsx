'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { AiInsightsSummary } from '@/components/schedule-preview/ai-insights-summary'
import { ScheduleDataTable } from '@/components/schedule-preview/schedule-data-table'
import { EditScheduleDialog } from '@/components/schedule-preview/edit-schedule-dialog'

interface ScheduleItem {
    id: number
    title: string
    platform: string
    scheduledDate: string
    scheduledTime: string
    status: 'draft' | 'scheduled' | 'published'
    aiTips: string[]
}

// Mock data - will be replaced with actual uploaded data
const mockScheduleData: ScheduleItem[] = [
    {
        id: 1,
        title: 'New Product Launch Announcement',
        platform: 'Instagram',
        scheduledDate: '2025-11-25',
        scheduledTime: '10:00',
        status: 'scheduled',
        aiTips: [
            'Post between 9-11 AM for 23% higher engagement',
            'Add 3-5 hashtags for optimal reach',
            'Include a call-to-action in your caption'
        ]
    },
    {
        id: 2,
        title: 'Behind the Scenes Content',
        platform: 'LinkedIn',
        scheduledDate: '2025-11-26',
        scheduledTime: '14:30',
        status: 'draft',
        aiTips: [
            'Tuesday afternoons have 18% higher engagement',
            'Professional content performs 35% better',
            'Include industry-relevant keywords'
        ]
    },
    {
        id: 3,
        title: 'Customer Success Story',
        platform: 'Facebook',
        scheduledDate: '2025-11-27',
        scheduledTime: '18:00',
        status: 'scheduled',
        aiTips: [
            'Evening posts get 40% more shares',
            'Emotional storytelling increases engagement by 28%',
            'Add customer testimonial video for 2x impact'
        ]
    },
    {
        id: 4,
        title: 'Weekly Tips Newsletter',
        platform: 'LinkedIn',
        scheduledDate: '2025-11-28',
        scheduledTime: '09:00',
        status: 'draft',
        aiTips: [
            'Morning posts on LinkedIn get 3x more views',
            'Educational content has 45% higher save rate',
            'Use bullet points for better readability'
        ]
    }
]

export default function SchedulePreviewPage() {
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(mockScheduleData)
    const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleEdit = (item: ScheduleItem) => {
        setEditingItem(item)
        setDialogOpen(true)
    }

    const handleSave = (updatedItem: ScheduleItem) => {
        setScheduleItems(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)))
        // TODO: Backend integration - save changes to API
    }

    return (
        <div className="min-h-screen bg-custom-green">
            {/* Header */}
            <DashboardNav />

            {/* Main Content */}
            <main className="max-w-[1600px] mx-auto px-[clamp(20px,4vw,50px)] py-[clamp(40px,6vw,80px)]">
                <div className="mb-[clamp(40px,6vw,60px)]">
                    <h2 className="text-[clamp(32px,5vw,56px)] font-bold mb-2 text-black">
                        Schedule Preview
                    </h2>
                    <p className="text-[clamp(16px,2vw,20px)] text-black/60">
                        Review and optimize your content schedule with AI recommendations
                    </p>
                </div>

                <AiInsightsSummary />

                {/* Schedule Data Table with Pagination */}
                <div className="mt-8">
                    <ScheduleDataTable data={scheduleItems} onEdit={handleEdit} />
                </div>

                {/* Edit Dialog */}
                <EditScheduleDialog
                    item={editingItem}
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    onSave={handleSave}
                />

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <Link href="/dashboard" className="flex-1">
                        <Button className="text-lg w-full bg-black text-custom-green hover:bg-custom-dark font-bold border-2 border-black">
                            Publish Schedule
                        </Button>
                    </Link>
                    <Link href="/upload">
                        <Button variant="outline" className='text-lg'>Upload New File</Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}
