/**
 * Mock Schedule Suggestions Data
 * Used in: schedule-preview/page.tsx, schedule-optimization-demo/page.tsx
 */

import type { ScheduleSuggestion } from '@/types/schedule-suggestion'

export const mockScheduleSuggestionsBasic: ScheduleSuggestion[] = [
  {
    id: 'sug-1',
    type: 'optimal_time',
    icon: '📈',
    title: 'Optimal Engagement Window',
    description: 'Move Instagram post to Tuesday 11:00 AM for 40% higher engagement based on your audience activity patterns',
    impact: '+40% Engagement',
    affectedPosts: ['New Product Launch'],
    action: {
      label: 'Reschedule to optimal time',
      changes: [
        {
          postId: '1',
          field: 'date',
          from: 'Monday, Nov 25',
          to: 'Tuesday, Nov 26'
        },
        {
          postId: '1',
          field: 'time',
          from: '10:00 AM',
          to: '11:00 AM'
        }
      ]
    }
  },
  {
    id: 'sug-2',
    type: 'platform_specific',
    icon: '🕒',
    title: 'LinkedIn Peak Time Optimization',
    description: 'LinkedIn posts perform 35% better at 9:00 AM compared to afternoon scheduling',
    impact: '+35% Reach',
    affectedPosts: ['Behind the Scenes', 'Weekly Tips'],
    action: {
      label: 'Move to morning peak hours',
      changes: [
        {
          postId: '2',
          field: 'time',
          from: '2:30 PM',
          to: '9:00 AM'
        }
      ]
    }
  }
]

export const mockScheduleSuggestionsExtended: ScheduleSuggestion[] = [
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
