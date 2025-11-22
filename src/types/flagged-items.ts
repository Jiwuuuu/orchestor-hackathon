/**
 * Flagged Items Type Definitions
 * Used for items requiring human attention with AI suggestions
 */

export interface FlaggedItem {
  id: string
  taskTitle: string
  platform: string
  issue: {
    type: 'missing_asset' | 'invalid_format' | 'caption_issue' | 'schedule_conflict' | 'broken_link'
    severity: 'critical' | 'warning'
    description: string
  }
  aiAttempt: {
    tried: string
    reason: string
  }
  suggestion: {
    text: string
    confidence: number // 0-100
    action: string
  }
  actions: ('accept' | 'edit' | 'skip')[]
}
