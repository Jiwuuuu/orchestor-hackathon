/**
 * Flagged Items Demo Page
 * Shows items requiring human attention with AI suggestions
 */

'use client'

import { FlaggedItemsPanel } from '@/components/ai/flagged-items-panel'
import type { FlaggedItem } from '@/types/flagged-items'
import { mockFlaggedItemsExtended as mockFlaggedItems } from '@/lib/mock-data'

// Mock data with various issue types - now imported from centralized location
const _mockFlaggedItems: FlaggedItem[] = [
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

export default function FlaggedItemsDemoPage() {
  const handleAccept = (id: string) => {
    console.log('Accept suggestion for:', id)
    // TODO: API integration
  }

  const handleEdit = (id: string) => {
    console.log('Edit manually:', id)
    // TODO: Open edit dialog
  }

  const handleSkip = (id: string) => {
    console.log('Skip item:', id)
    // TODO: API integration
  }

  const handleFixAll = () => {
    console.log('Fix all items with AI')
    // TODO: Bulk API call
  }

  const handleDismissAll = () => {
    console.log('Dismiss all flagged items')
    // TODO: Bulk dismiss
  }

  return (
    <div className="min-h-screen bg-gray-50 py-[clamp(30px,5vw,60px)] px-[clamp(16px,3vw,30px)]">
      <div className="max-w-6xl mx-auto space-y-[clamp(30px,5vw,50px)]">
        {/* Header */}
        <div className="text-center space-y-[clamp(12px,1.5vw,16px)]">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold text-black uppercase tracking-tight">
            Flagged Items Panel
          </h1>
          <p className="text-[clamp(16px,2vw,20px)] text-black/60 leading-relaxed max-w-3xl mx-auto">
            Items requiring human attention with AI-powered suggestions for resolution
          </p>
        </div>

        {/* Flagged Items Panel */}
        <FlaggedItemsPanel
          items={mockFlaggedItems}
          onAccept={handleAccept}
          onEdit={handleEdit}
          onSkip={handleSkip}
          onFixAll={handleFixAll}
          onDismissAll={handleDismissAll}
        />

        {/* Demo Info */}
        <div className="p-[clamp(20px,3vw,30px)] bg-blue-50 border-2 border-blue-600 rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-[clamp(16px,2vw,18px)] font-bold text-blue-600 uppercase tracking-wider mb-[clamp(8px,1vw,10px)]">
            Demo Features
          </h3>
          <ul className="space-y-[clamp(6px,0.8vw,8px)] text-[clamp(13px,1.5vw,14px)] text-black/80">
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>5 different issue types: Missing Asset, Broken Link, Schedule Conflict, Invalid Format, Caption Issue</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Critical (red) and Warning (yellow) severity levels with visual indicators</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>AI attempt details showing what was tried and why it failed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Confidence scores (78-92%) for AI suggestions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Smooth animations when accepting, editing, or skipping items (Framer Motion)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Collapsible panel with bulk actions (Fix All, Dismiss All)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-blue-600">•</span>
              <span>Empty state when all items are resolved</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
