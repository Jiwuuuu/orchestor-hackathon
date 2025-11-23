'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { RepostSummaryStats } from '@/components/repost/repost-summary-stats'
import { RepostDataTable } from '@/components/repost/repost-data-table'
import { ViewRepostDialog } from '@/components/repost/view-repost-dialog'
import { UploadPerformanceDialog } from '@/components/repost/upload-performance-dialog'
import { Upload } from 'lucide-react'

interface UploadedFile {
    name: string
    size: number
    type: string
    data: string
}

import type { RepostRecommendation } from '@/lib/mock-data'
import { mockRepostRecommendations as mockRecommendations } from '@/lib/mock-data'

// Mock recommendations data - now imported from centralized location
const _mockRecommendations: RepostRecommendation[] = [
    {
        id: 1,
        originalPost: {
            title: 'Product Launch Tips & Tricks',
            platform: 'LinkedIn',
            publishedDate: '2025-10-15',
            performance: {
                views: 12500,
                likes: 890,
                comments: 145,
                shares: 234,
                engagementRate: 10.2
            }
        },
        recommendation: {
            score: 95,
            reason: 'High engagement rate (10.2%) and still relevant to current audience',
            suggestedDate: '2025-12-05',
            suggestedTime: '09:30',
            improvements: [
                'Update statistics with 2025 data',
                'Add new customer success story',
                'Include video testimonial for 40% higher engagement'
            ]
        }
    },
    {
        id: 2,
        originalPost: {
            title: '5 Marketing Strategies That Work',
            platform: 'Instagram',
            publishedDate: '2025-09-20',
            performance: {
                views: 8900,
                likes: 756,
                comments: 89,
                shares: 123,
                engagementRate: 10.9
            }
        },
        recommendation: {
            score: 92,
            reason: 'Evergreen content with consistent engagement over time',
            suggestedDate: '2025-12-10',
            suggestedTime: '14:00',
            improvements: [
                'Update with latest marketing trends',
                'Add carousel format for better visibility',
                'Include call-to-action button'
            ]
        }
    },
    {
        id: 3,
        originalPost: {
            title: 'Behind the Scenes: Our Team Culture',
            platform: 'Facebook',
            publishedDate: '2025-08-12',
            performance: {
                views: 15600,
                likes: 1200,
                comments: 234,
                shares: 567,
                engagementRate: 12.8
            }
        },
        recommendation: {
            score: 88,
            reason: 'High share rate indicates audience resonance and viral potential',
            suggestedDate: '2025-12-15',
            suggestedTime: '18:00',
            improvements: [
                'Add new team member introductions',
                'Include recent company achievements',
                'Create video montage for higher engagement'
            ]
        }
    }
]

export default function RepostPage() {
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [recommendations] = useState<RepostRecommendation[]>(mockRecommendations)
    const [viewingItem, setViewingItem] = useState<RepostRecommendation | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

    const handleView = (item: RepostRecommendation) => {
        setViewingItem(item)
        setDialogOpen(true)
    }

    const validateFile = (file: File): string | null => {
        const validTypes = ['text/csv', 'application/json', 'text/plain']
        const maxSize = 10 * 1024 * 1024 // 10MB

        if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|json)$/i)) {
            return 'Please upload a CSV or JSON file'
        }

        if (file.size > maxSize) {
            return 'File size must be less than 10MB'
        }

        return null
    }

    const processFile = async (file: File) => {
        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            return
        }

        setIsProcessing(true)
        setError(null)

        try {
            const reader = new FileReader()
            reader.onload = async e => {
                const content = e.target?.result as string

                setUploadedFile({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: content
                })

                // Simulate AI processing
                await new Promise(resolve => setTimeout(resolve, 2000))

                // TODO: Backend integration - Send file to API for analysis
                // const response = await fetch('/api/analyze/performance', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ filename: file.name, content })
                // })

                setUploadDialogOpen(false)
                setIsProcessing(false)
            }

            reader.onerror = () => {
                setError('Failed to read file. Please try again.')
                setIsProcessing(false)
            }

            reader.readAsText(file)
        } catch (err) {
            setError('An error occurred while processing the file.')
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-custom-green">
            {/* Header */}
            <DashboardNav />

            {/* Main Content */}
            <main className="max-w-[1600px] mx-auto px-[clamp(20px,4vw,50px)] py-[clamp(40px,6vw,80px)]">
                {/* Header with Upload Button */}
                <div className="mb-[clamp(40px,6vw,60px)] flex items-start justify-between">
                    <div>
                        <h2 className="text-[clamp(32px,5vw,56px)] font-bold mb-2 text-black">
                            Repost Recommendations
                        </h2>
                        <p className="text-[clamp(16px,2vw,20px)] text-black/60">
                            Analyze your performance data to discover which posts deserve a second chance
                        </p>
                    </div>
                    <Button 
                        onClick={() => setUploadDialogOpen(true)} 
                        className="bg-black text-custom-green hover:bg-black/90 text-lg h-12 px-6"
                    >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload New File
                    </Button>
                </div>

                <div className="space-y-8">
                    <RepostSummaryStats
                        totalAnalyzed={47}
                        highPerformers={recommendations.length}
                        averageScore={91.7}
                    />

                    {/* Repost Data Table with Pagination */}
                    <div className="mt-8">
                        <RepostDataTable data={recommendations} onView={handleView} />
                    </div>

                    {/* View Dialog */}
                    <ViewRepostDialog
                        item={viewingItem}
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                    />

                    {/* Upload Performance Dialog */}
                    <UploadPerformanceDialog
                        open={uploadDialogOpen}
                        onOpenChange={setUploadDialogOpen}
                        onFileSelect={processFile}
                        error={error}
                        isProcessing={isProcessing}
                        uploadedFile={uploadedFile}
                    />
                </div>
            </main>
        </div>
    )
}
