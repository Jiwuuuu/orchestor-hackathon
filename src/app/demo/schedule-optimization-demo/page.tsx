'use client'

import * as React from 'react'
import { ScheduleOptimizationCard } from '@/components/ai/schedule-optimization-card'
import type { ScheduleSuggestion } from '@/types/schedule-suggestion'
import { mockScheduleSuggestionsExtended as mockSuggestions } from '@/lib/mock-data'

export default function ScheduleOptimizationDemoPage() {
  // Mock suggestions - now imported from centralized location
  const _mockSuggestions: ScheduleSuggestion[] = [
    {
      id: 'conflict-1',
      type: 'conflict',
      icon: '⚠️',
      title: 'Schedule Conflict Detected',
      description: '3 posts scheduled for Tuesday 2:00 PM will compete for attention. Spreading them apart will maximize reach and engagement.',
      impact: 'Avoid Overlap',
      affectedPosts: ['Post #12', 'Post #15', 'Post #18'],
      action: {
        label: 'Spread posts across 4-hour intervals',
        changes: [
          {
            postId: '12',
            field: 'time',
            from: '2:00 PM',
            to: '10:00 AM'
          },
          {
            postId: '15',
            field: 'time',
            from: '2:00 PM',
            to: '2:00 PM'
          },
          {
            postId: '18',
            field: 'time',
            from: '2:00 PM',
            to: '6:00 PM'
          }
        ]
      }
    },
    {
      id: 'optimal-1',
      type: 'optimal_time',
      icon: '📈',
      title: 'Optimal Engagement Window',
      description: 'Your product launch post is scheduled for Monday 4:00 PM, but historical data shows Tuesday 11:00 AM gets 40% higher engagement for your audience.',
      impact: '+40% Engagement',
      affectedPosts: ['Post #23: Product Launch'],
      action: {
        label: 'Reschedule to optimal time',
        changes: [
          {
            postId: '23',
            field: 'date',
            from: 'Monday, Nov 25',
            to: 'Tuesday, Nov 26'
          },
          {
            postId: '23',
            field: 'time',
            from: '4:00 PM',
            to: '11:00 AM'
          }
        ]
      }
    },
    {
      id: 'platform-1',
      type: 'platform_specific',
      icon: '🕒',
      title: 'Instagram Peak Time Optimization',
      description: 'Instagram posts perform 35% better at 9:00 AM compared to your current 2:00 PM schedule. Your audience is most active during morning commute hours.',
      impact: '+35% Reach',
      affectedPosts: ['Post #8', 'Post #14', 'Post #20'],
      action: {
        label: 'Move to morning peak hours',
        changes: [
          {
            postId: '8',
            field: 'time',
            from: '2:00 PM',
            to: '9:00 AM'
          },
          {
            postId: '14',
            field: 'time',
            from: '2:30 PM',
            to: '9:15 AM'
          },
          {
            postId: '20',
            field: 'time',
            from: '3:00 PM',
            to: '9:30 AM'
          }
        ]
      }
    },
    {
      id: 'audience-1',
      type: 'audience_insight',
      icon: '👥',
      title: 'Audience Activity Pattern',
      description: 'Your audience shows 60% higher engagement on weekdays vs weekends. Consider moving Saturday posts to Thursday/Friday for better performance.',
      impact: '+60% Engagement',
      affectedPosts: ['Post #31', 'Post #32'],
      action: {
        label: 'Shift to weekday schedule',
        changes: [
          {
            postId: '31',
            field: 'date',
            from: 'Saturday, Nov 30',
            to: 'Thursday, Nov 28'
          },
          {
            postId: '32',
            field: 'date',
            from: 'Saturday, Nov 30',
            to: 'Friday, Nov 29'
          }
        ]
      }
    }
  ]

  const handleApplyAll = (suggestions: ScheduleSuggestion[]) => {
    console.log('Applying all suggestions:', suggestions)
    // TODO: Integrate with backend API
    alert(`Applied ${suggestions.length} optimization suggestions!`)
  }

  const handleApplySelected = (suggestions: ScheduleSuggestion[]) => {
    console.log('Applying selected suggestions:', suggestions)
    // TODO: Integrate with backend API
    alert(`Applied ${suggestions.length} selected suggestions!`)
  }

  const handleDismiss = () => {
    console.log('Dismissed optimization suggestions')
    // TODO: Track dismissal in analytics
  }

  return (
    <main className="min-h-screen bg-white p-[clamp(20px,3vw,40px)]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-[clamp(32px,4vw,48px)]">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold text-black uppercase tracking-wider mb-[clamp(12px,1.5vw,16px)]">
            AI Schedule Optimization
          </h1>
          <p className="text-[clamp(14px,1.8vw,16px)] text-black/60">
            Smart suggestions to maximize engagement and avoid conflicts
          </p>
        </div>

        {/* Optimization Card */}
        <ScheduleOptimizationCard
          suggestions={mockSuggestions}
          onApplyAll={handleApplyAll}
          onApplySelected={handleApplySelected}
          onDismiss={handleDismiss}
        />

        {/* Features Info */}
        <div className="mt-[clamp(32px,4vw,48px)] p-[clamp(20px,2.5vw,24px)] bg-gray-50 border-2 border-gray-300 rounded-[5px]">
          <h3 className="text-[clamp(16px,2vw,20px)] font-bold text-black mb-[clamp(16px,2vw,20px)] uppercase tracking-wider">
            Optimization Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(16px,2vw,20px)]">
            <div>
              <h4 className="text-[clamp(14px,1.8vw,16px)] font-bold text-red-600 mb-[clamp(8px,1vw,10px)] uppercase tracking-wider">
                ⚠️ Conflict Resolution
              </h4>
              <p className="text-[clamp(12px,1.4vw,13px)] text-black/70">
                Detects overlapping posts and suggests optimal spacing to avoid audience fatigue
              </p>
            </div>

            <div>
              <h4 className="text-[clamp(14px,1.8vw,16px)] font-bold text-green-600 mb-[clamp(8px,1vw,10px)] uppercase tracking-wider">
                📈 Optimal Timing
              </h4>
              <p className="text-[clamp(12px,1.4vw,13px)] text-black/70">
                Analyzes historical data to recommend peak engagement windows
              </p>
            </div>

            <div>
              <h4 className="text-[clamp(14px,1.8vw,16px)] font-bold text-blue-600 mb-[clamp(8px,1vw,10px)] uppercase tracking-wider">
                🕒 Platform-Specific
              </h4>
              <p className="text-[clamp(12px,1.4vw,13px)] text-black/70">
                Optimizes timing based on platform-specific engagement patterns
              </p>
            </div>

            <div>
              <h4 className="text-[clamp(14px,1.8vw,16px)] font-bold text-purple-600 mb-[clamp(8px,1vw,10px)] uppercase tracking-wider">
                👥 Audience Insights
              </h4>
              <p className="text-[clamp(12px,1.4vw,13px)] text-black/70">
                Understands your audience's activity patterns and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="mt-[clamp(24px,3vw,32px)] p-[clamp(20px,2.5vw,24px)] bg-gray-50 border-2 border-gray-300 rounded-[5px]">
          <h3 className="text-[clamp(16px,2vw,20px)] font-bold text-black mb-[clamp(12px,1.5vw,16px)] uppercase tracking-wider">
            Integration Example
          </h3>
          <pre className="text-[clamp(11px,1.3vw,12px)] text-black/80 overflow-x-auto">
{`import { ScheduleOptimizationCard } from '@/components/ai/schedule-optimization-card'
import type { ScheduleSuggestion } from '@/types/schedule-suggestion'

// In your schedule page:
const [suggestions, setSuggestions] = useState<ScheduleSuggestion[]>([])

useEffect(() => {
  // Fetch AI suggestions
  fetchOptimizationSuggestions().then(setSuggestions)
}, [scheduleData])

return (
  <ScheduleOptimizationCard
    suggestions={suggestions}
    onApplyAll={(suggestions) => {
      // Apply all optimizations to schedule
      applyOptimizations(suggestions)
    }}
    onApplySelected={(suggestions) => {
      // Apply selected optimizations
      applyOptimizations(suggestions)
    }}
    onDismiss={() => {
      // Hide suggestions panel
      setSuggestions([])
    }}
  />
)`}
          </pre>
        </div>

        {/* Interaction Tips */}
        <div className="mt-[clamp(24px,3vw,32px)] p-[clamp(20px,2.5vw,24px)] bg-blue-50 border-2 border-blue-600 rounded-[5px]">
          <h3 className="text-[clamp(16px,2vw,20px)] font-bold text-blue-600 mb-[clamp(12px,1.5vw,16px)] uppercase tracking-wider">
            💡 Interaction Tips
          </h3>
          <ul className="space-y-[clamp(8px,1vw,10px)] text-[clamp(12px,1.4vw,13px)] text-black/80">
            <li>• <strong>Select individual suggestions</strong> by clicking the checkbox next to each item</li>
            <li>• <strong>Select All</strong> checkbox toggles all suggestions at once</li>
            <li>• <strong>Before/After preview</strong> shows current vs optimized schedule</li>
            <li>• <strong>Apply All</strong> implements all suggestions immediately</li>
            <li>• <strong>Apply Selected</strong> only applies checked suggestions</li>
            <li>• <strong>Suggestions disappear</strong> after being applied</li>
            <li>• <strong>Success message</strong> appears when all optimizations are complete</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
