'use client'

import { useState } from 'react'
import { CheckCircle2, AlertTriangle, XCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ValidationIssueCard } from './validation-issue-card'
import type { ValidationSummary, ValidationIssue } from '@/types/validation'

// Mock data for demo
const mockValidationData: ValidationSummary = {
    totalTasks: 12,
    readyTasks: 8,
    needsAttention: 4,
    results: [
        {
            taskId: '1',
            title: 'Product Launch Announcement',
            platform: 'Instagram',
            status: 'warning',
            issues: [
                {
                    type: 'caption',
                    severity: 'warning',
                    message: 'Caption exceeds recommended length (180/150 characters)',
                    aiSuggestion: 'Shorten to: "Introducing our newest product! 🚀 Revolutionary features that transform how you work. Available now. #ProductLaunch"',
                    autoFixAvailable: true
                },
                {
                    type: 'asset',
                    severity: 'info',
                    message: 'Image resolution could be optimized for Instagram (current: 1920x1080, recommended: 1080x1080)',
                    aiSuggestion: 'Crop image to 1:1 aspect ratio focusing on the product for better mobile display',
                    autoFixAvailable: true
                }
            ]
        },
        {
            taskId: '2',
            title: 'Weekly Team Update',
            platform: 'LinkedIn',
            status: 'failed',
            issues: [
                {
                    type: 'deadline',
                    severity: 'error',
                    message: 'Scheduled time conflicts with another post (both at 2:00 PM)',
                    aiSuggestion: 'Reschedule to 3:30 PM for optimal engagement based on your audience activity',
                    autoFixAvailable: true
                },
                {
                    type: 'platform',
                    severity: 'error',
                    message: 'LinkedIn requires professional tone - informal language detected',
                    aiSuggestion: 'Adjust tone: "This week, our team achieved significant milestones in Q4 objectives..." (was: "Check out what we did this week!")',
                    autoFixAvailable: true
                }
            ]
        },
        {
            taskId: '3',
            title: 'Customer Success Story',
            platform: 'Facebook',
            status: 'warning',
            issues: [
                {
                    type: 'format',
                    severity: 'warning',
                    message: 'Video format not optimal for Facebook (current: .mov, recommended: .mp4)',
                    aiSuggestion: 'Convert video to MP4 format for better compatibility and faster loading',
                    autoFixAvailable: false
                }
            ]
        },
        {
            taskId: '4',
            title: 'Event Reminder',
            platform: 'Twitter',
            status: 'warning',
            issues: [
                {
                    type: 'caption',
                    severity: 'warning',
                    message: 'Missing relevant hashtags for event discovery',
                    aiSuggestion: 'Add hashtags: #TechEvent #Networking #Innovation to increase visibility',
                    autoFixAvailable: true
                }
            ]
        }
    ]
}

interface ValidationResultsSectionProps {
    data?: ValidationSummary
}

export function ValidationResultsSection({ data = mockValidationData }: ValidationResultsSectionProps) {
    const [validationData, setValidationData] = useState(data)

    const handleFix = (taskId: string, issueType: ValidationIssue['type']) => {
        console.log(`Fixing ${issueType} for task ${taskId}`)
        // TODO: Implement AI auto-fix logic
    }

    const handleEdit = (taskId: string) => {
        console.log(`Editing task ${taskId}`)
        // TODO: Navigate to edit page
    }

    const handleSkip = (taskId: string) => {
        console.log(`Skipping task ${taskId}`)
        // TODO: Mark task as skipped
    }

    const handleFixAll = () => {
        console.log('Fixing all auto-fixable issues')
        // TODO: Apply all AI suggestions
    }

    return (
        <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-black shadow-box bg-white">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-bold text-black/60">READY TO PUBLISH</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                            <div>
                                <p className="text-3xl font-bold text-black">
                                    {validationData.readyTasks}/{validationData.totalTasks}
                                </p>
                                <p className="text-sm text-black/60">tasks passed</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-black shadow-box bg-white">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-bold text-black/60">NEEDS ATTENTION</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-8 h-8 text-yellow-600" />
                            <div>
                                <p className="text-3xl font-bold text-black">{validationData.needsAttention}</p>
                                <p className="text-sm text-black/60">tasks with issues</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-black shadow-box bg-white">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-bold text-black/60">AI ASSISTANCE</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-8 h-8 text-purple-600" />
                            <div>
                                <p className="text-3xl font-bold text-black">
                                    {validationData.results.reduce((acc, r) => 
                                        acc + r.issues.filter(i => i.autoFixAvailable).length, 0
                                    )}
                                </p>
                                <p className="text-sm text-black/60">auto-fixes available</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <Button
                    onClick={handleFixAll}
                    className="bg-purple-600 text-white hover:bg-purple-700 font-bold text-lg h-12 px-6"
                >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Fix All with AI
                </Button>
                <Button
                    variant="outline"
                    className="border-2 border-black hover:bg-black hover:text-custom-green text-lg h-12 px-6"
                >
                    Review Manually
                </Button>
            </div>

            {/* Results List - Show only tasks with issues */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-black">Validation Results</h3>
                {validationData.results
                    .filter(result => result.issues.length > 0)
                    .map(result => (
                        <ValidationIssueCard
                            key={result.taskId}
                            result={result}
                            onFix={handleFix}
                            onEdit={handleEdit}
                            onSkip={handleSkip}
                        />
                    ))}
            </div>

            {/* Tasks without issues summary */}
            {validationData.readyTasks > 0 && (
                <Card className="border-2 border-black shadow-box bg-green-50">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            <p className="text-sm text-black">
                                <span className="font-bold">{validationData.readyTasks} tasks</span> passed all quality checks and are ready to publish
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
