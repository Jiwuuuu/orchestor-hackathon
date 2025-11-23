'use client'

import { useState } from 'react'
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ValidationResult, ValidationIssue } from '@/types/validation'

interface ValidationIssueCardProps {
    result: ValidationResult
    onFix: (taskId: string, issueType: ValidationIssue['type']) => void
    onEdit: (taskId: string) => void
    onSkip: (taskId: string) => void
}

export function ValidationIssueCard({ result, onFix, onEdit, onSkip }: ValidationIssueCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const getStatusIcon = () => {
        switch (result.status) {
            case 'passed':
                return <CheckCircle2 className="w-5 h-5 text-green-600" />
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-600" />
            case 'failed':
                return <XCircle className="w-5 h-5 text-red-600" />
        }
    }

    const getStatusColor = () => {
        switch (result.status) {
            case 'passed':
                return 'bg-green-100 text-green-800 border-green-500'
            case 'warning':
                return 'bg-yellow-100 text-yellow-800 border-yellow-500'
            case 'failed':
                return 'bg-red-100 text-red-800 border-red-500'
        }
    }

    const getIssueSeverityColor = (severity: ValidationIssue['severity']) => {
        switch (severity) {
            case 'error':
                return 'text-red-600 bg-red-50 border-red-200'
            case 'warning':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200'
            case 'info':
                return 'text-blue-600 bg-blue-50 border-blue-200'
        }
    }

    const getIssueTypeLabel = (type: ValidationIssue['type']) => {
        const labels = {
            caption: 'Caption',
            asset: 'Asset',
            platform: 'Platform',
            deadline: 'Deadline',
            format: 'Format'
        }
        return labels[type]
    }

    return (
        <Card className="border-2 border-black shadow-box bg-white">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon()}
                        <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-black mb-1">
                                {result.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-black/60">
                                <span className="capitalize">{result.platform}</span>
                                <span>•</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border-2 ${getStatusColor()}`}>
                                    {result.status === 'passed' ? 'Ready' : result.status === 'warning' ? 'Needs Review' : 'Failed'}
                                </span>
                                <span>•</span>
                                <span>{result.issues.length} {result.issues.length === 1 ? 'issue' : 'issues'}</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="hover:bg-black/5"
                    >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                </div>
            </CardHeader>

            {isExpanded && (
                <CardContent className="space-y-4 pt-0 border-t-2 border-black/10">
                    {result.issues.map((issue, index) => (
                        <div key={index} className={`p-4 rounded-[5px] border-2 ${getIssueSeverityColor(issue.severity)}`}>
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold uppercase">
                                            {getIssueTypeLabel(issue.type)}
                                        </span>
                                        <span className="text-xs px-2 py-0.5 rounded-full border">
                                            {issue.severity}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium">{issue.message}</p>
                                </div>
                            </div>

                            {issue.aiSuggestion && (
                                <div className="mt-3 p-3 bg-white/50 rounded-[5px] border">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-purple-600" />
                                        <span className="text-xs font-bold text-purple-600">AI SUGGESTION</span>
                                    </div>
                                    <p className="text-sm text-black/80">{issue.aiSuggestion}</p>
                                    {issue.autoFixAvailable && (
                                        <div className="flex gap-2 mt-3">
                                            <Button
                                                size="sm"
                                                onClick={() => onFix(result.taskId, issue.type)}
                                                className="bg-purple-600 text-white hover:bg-purple-700 text-xs h-8"
                                            >
                                                <Sparkles className="w-3 h-3 mr-1" />
                                                Apply Fix
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-xs h-8 border-2 border-black"
                                            >
                                                Dismiss
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex gap-2 pt-4 border-t-2 border-black/10">
                        <Button
                            onClick={() => onEdit(result.taskId)}
                            variant="outline"
                            className="flex-1 border-2 border-black hover:bg-black hover:text-custom-green"
                        >
                            Edit Manually
                        </Button>
                        <Button
                            onClick={() => onSkip(result.taskId)}
                            variant="outline"
                            className="border-2 border-black hover:bg-black/5"
                        >
                            Skip
                        </Button>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}
