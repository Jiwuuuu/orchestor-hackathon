/**
 * Mock Flagged Items Data
 * Used in: schedule-preview/page.tsx, flagged-items-demo/page.tsx
 */

import type { FlaggedItem } from '@/types/flagged-items'

export const mockFlaggedItemsBasic: FlaggedItem[] = [
  {
    id: 'flag-1',
    taskTitle: 'Customer Success Story',
    platform: 'Facebook',
    issue: {
      type: 'missing_asset',
      severity: 'critical',
      description: 'Referenced video file "testimonial.mp4" not found in uploaded assets'
    },
    aiAttempt: {
      tried: 'Searched for similar video files in upload directory',
      reason: 'No matching video file found. Suggested using placeholder or alternative content.'
    },
    suggestion: {
      text: 'Use the image "customer-quote.jpg" instead, or mark as text-only post',
      confidence: 85,
      action: 'Replace with alternative image'
    },
    actions: ['accept', 'edit', 'skip']
  },
  {
    id: 'flag-2',
    taskTitle: 'Behind the Scenes Content',
    platform: 'LinkedIn',
    issue: {
      type: 'schedule_conflict',
      severity: 'warning',
      description: 'Scheduled at same time as another LinkedIn post'
    },
    aiAttempt: {
      tried: 'Attempted to find optimal alternative time slot',
      reason: 'Found 14:30 conflicts with existing post. Suggested 15:30 instead.'
    },
    suggestion: {
      text: 'Reschedule to 15:30 for better reach and no conflicts',
      confidence: 92,
      action: 'Update schedule time'
    },
    actions: ['accept', 'edit', 'skip']
  }
]

export const mockFlaggedItemsExtended: FlaggedItem[] = [
  {
    id: 'FLAG-001',
    taskTitle: 'Product Launch Video - Instagram',
    platform: 'Instagram',
    issue: {
      type: 'missing_asset',
      severity: 'critical',
      description: 'Required video file is missing or not accessible. The task references "product-launch-final.mp4" but the file cannot be found in the attached assets.'
    },
    aiAttempt: {
      tried: 'Searched alternative filenames (product-launch.mp4, launch-video.mp4, product_launch_final.mp4) and checked backup folders.',
      reason: 'File does not exist in the project directory or cloud storage. Manual upload or file path correction required.'
    },
    suggestion: {
      text: 'Upload the correct video file or update the task to reference an existing asset. You can also use the similar video "product-teaser-v2.mp4" as a temporary replacement.',
      confidence: 85,
      action: 'Upload missing asset or select alternative from library'
    },
    actions: ['accept', 'edit', 'skip']
  },
  {
    id: 'FLAG-002',
    taskTitle: 'Weekly Newsletter - LinkedIn',
    platform: 'LinkedIn',
    issue: {
      type: 'broken_link',
      severity: 'critical',
      description: 'The link "https://example.com/promo-2024" in the post caption returns a 404 error. This will lead to poor user experience and lost engagement.'
    },
    aiAttempt: {
      tried: 'Attempted to validate URL, checked for common typos, and searched for similar working URLs in recent posts.',
      reason: 'The destination page no longer exists or the URL is incorrect. Requires human verification of the correct link.'
    },
    suggestion: {
      text: 'Replace with the updated URL "https://example.com/promotions/winter-2024" or remove the link entirely. Alternatively, use a redirect service.',
      confidence: 92,
      action: 'Update caption with correct URL'
    },
    actions: ['accept', 'edit', 'skip']
  },
  {
    id: 'FLAG-003',
    taskTitle: 'Team Update Post - Facebook',
    platform: 'Facebook',
    issue: {
      type: 'schedule_conflict',
      severity: 'warning',
      description: 'This post is scheduled for Dec 25, 2024 at 9:00 AM, which conflicts with 2 other high-priority posts scheduled within 30 minutes of this time.'
    },
    aiAttempt: {
      tried: 'Analyzed engagement patterns and suggested alternative time slots: Dec 25 at 2:00 PM or Dec 26 at 10:00 AM.',
      reason: 'Multiple posts at similar times may reduce individual post reach. Requires approval to automatically reschedule.'
    },
    suggestion: {
      text: 'Reschedule to Dec 26, 2024 at 10:00 AM for optimal engagement (predicted 45% higher reach based on historical data).',
      confidence: 78,
      action: 'Accept new schedule or manually adjust timing'
    },
    actions: ['accept', 'edit', 'skip']
  },
  {
    id: 'FLAG-004',
    taskTitle: 'Event Announcement - Twitter/X',
    platform: 'X',
    issue: {
      type: 'invalid_format',
      severity: 'warning',
      description: 'The attached image "event-flyer.psd" is in PSD format. Twitter/X only supports JPG, PNG, GIF, and WebP formats.'
    },
    aiAttempt: {
      tried: 'Attempted automatic conversion to PNG format using built-in image processor.',
      reason: 'PSD file contains multiple layers and effects that require design software for proper export. Automatic conversion may lose quality or design intent.'
    },
    suggestion: {
      text: 'Export the PSD file as a high-quality PNG (1200x675px recommended) using Adobe Photoshop or similar software. Alternatively, use the already exported "event-flyer-web.png" if available.',
      confidence: 88,
      action: 'Upload correctly formatted image (PNG/JPG)'
    },
    actions: ['accept', 'edit', 'skip']
  },
  {
    id: 'FLAG-005',
    taskTitle: 'Holiday Greetings - Instagram',
    platform: 'Instagram',
    issue: {
      type: 'caption_issue',
      severity: 'warning',
      description: 'Caption exceeds Instagram\'s 2,200 character limit by 347 characters. The current caption is 2,547 characters long.'
    },
    aiAttempt: {
      tried: 'Attempted to automatically trim caption while preserving key message and hashtags. Reduced to 2,180 characters.',
      reason: 'Manual review needed to ensure important content wasn\'t removed. AI prioritized keeping call-to-action and brand mentions.'
    },
    suggestion: {
      text: 'Accept the AI-trimmed version which maintains all key points, hashtags, and CTAs. Removed redundant phrases and condensed storytelling section.',
      confidence: 91,
      action: 'Review and accept trimmed caption or edit manually'
    },
    actions: ['accept', 'edit', 'skip']
  }
]
