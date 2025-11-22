/**
 * Caption Enhancement Type Definitions
 * Used for AI-powered caption optimization across social media platforms
 */

export interface PlatformCaption {
  text: string
  characterCount: number
  characterLimit: number
  status: 'optimal' | 'too_long' | 'too_short'
  hashtags: string[]
}

export interface Hashtag {
  tag: string
  performance: 'trending' | 'high_engagement' | 'brand_aligned' | 'niche'
}

export interface CaptionEnhancement {
  taskId: string
  taskTitle: string
  original: {
    text: string
    characterCount: number
  }
  enhanced: {
    instagram: PlatformCaption
    facebook: PlatformCaption
    linkedin: PlatformCaption
    twitter: PlatformCaption
  }
  improvements: string[]
  suggestedHashtags: Hashtag[]
}

export type Platform = 'instagram' | 'facebook' | 'linkedin' | 'twitter'
