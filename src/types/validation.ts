// Type definitions for AI validation results

export interface ValidationIssue {
    type: 'caption' | 'asset' | 'platform' | 'deadline' | 'format'
    severity: 'error' | 'warning' | 'info'
    message: string
    aiSuggestion?: string
    autoFixAvailable: boolean
}

export interface ValidationResult {
    taskId: string
    title: string
    platform: string
    status: 'passed' | 'warning' | 'failed'
    issues: ValidationIssue[]
}

export interface ValidationSummary {
    totalTasks: number
    readyTasks: number
    needsAttention: number
    results: ValidationResult[]
}
