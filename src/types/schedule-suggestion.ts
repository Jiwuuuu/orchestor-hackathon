import type { CaptionEnhancement } from './caption'

export type SuggestionType = 'conflict' | 'optimal_time' | 'platform_specific' | 'audience_insight'

export interface ScheduleChange {
  postId: string
  field: 'date' | 'time' | 'platform'
  from: string
  to: string
}

export interface ScheduleSuggestion {
  id: string
  type: SuggestionType
  icon: string
  title: string
  description: string
  impact: string // "+23% engagement", "Avoid overlap"
  affectedPosts: string[]
  action: {
    label: string
    changes: ScheduleChange[]
  }
}

export interface ScheduleItem {
  id: number
  title: string
  platform: string
  scheduledDate: string
  scheduledTime: string
  status: 'draft' | 'scheduled' | 'published'
  aiTips: string[]
  caption?: string
  captionEnhancement?: CaptionEnhancement
}
