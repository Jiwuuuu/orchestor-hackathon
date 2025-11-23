/**
 * Mock Schedule Data
 * Used in: schedule-preview/page.tsx
 */

import type { ScheduleItem } from '@/types/schedule-suggestion'

export const mockScheduleData: ScheduleItem[] = [
  {
    id: 1,
    title: 'New Product Launch Announcement',
    platform: 'Instagram',
    scheduledDate: '2025-11-25',
    scheduledTime: '10:00',
    status: 'scheduled',
    caption: 'Excited to announce our new product!',
    aiTips: [
      'Post between 9-11 AM for 23% higher engagement',
      'Add 3-5 hashtags for optimal reach',
      'Include a call-to-action in your caption'
    ],
    captionEnhancement: {
      taskId: '1',
      taskTitle: 'New Product Launch Announcement',
      original: {
        text: 'Excited to announce our new product!',
        characterCount: 41
      },
      enhanced: {
        instagram: {
          text: '🚀 We\'re thrilled to unveil something extraordinary! Our revolutionary new product is here to transform your experience. Get ready to discover innovation like never before! ✨\n\nTap the link in bio to be among the first to explore. Limited launch pricing available! 💫\n\n#Innovation #NewProduct #TechLaunch #GameChanger #LaunchDay',
          characterCount: 368,
          characterLimit: 2200,
          status: 'optimal',
          hashtags: ['#Innovation', '#NewProduct', '#TechLaunch', '#GameChanger', '#LaunchDay']
        },
        facebook: {
          text: '🚀 Exciting news! Our revolutionary new product is here to transform your experience. Be among the first to explore what we\'ve been working on!\n\nClick the link below for exclusive launch pricing. Limited time offer! 💫',
          characterCount: 245,
          characterLimit: 63206,
          status: 'optimal',
          hashtags: ['#Innovation', '#NewProduct', '#ProductLaunch']
        },
        linkedin: {
          text: 'We\'re excited to announce the launch of our revolutionary new product. After months of development, we\'re ready to share how this innovation will transform the industry.\n\nLearn more about our solution and get exclusive early access.',
          characterCount: 268,
          characterLimit: 3000,
          status: 'optimal',
          hashtags: ['#Innovation', '#ProductLaunch', '#Technology']
        },
        twitter: {
          text: '🚀 Big news! Our revolutionary new product is here. Be the first to explore innovation. Limited launch pricing! 💫',
          characterCount: 116,
          characterLimit: 280,
          status: 'optimal',
          hashtags: ['#Innovation', '#NewProduct']
        }
      },
      improvements: [
        'More engaging and enthusiastic tone',
        'Expanded from 41 to 368 characters for Instagram',
        'Added clear call-to-action',
        'Strategic emoji placement',
        'Platform-specific optimization'
      ],
      suggestedHashtags: [
        { tag: '#Innovation', performance: 'trending' },
        { tag: '#NewProduct', performance: 'high_engagement' },
        { tag: '#TechLaunch', performance: 'brand_aligned' },
        { tag: '#GameChanger', performance: 'high_engagement' },
        { tag: '#LaunchDay', performance: 'trending' }
      ]
    }
  },
  {
    id: 2,
    title: 'Behind the Scenes Content',
    platform: 'LinkedIn',
    scheduledDate: '2025-11-26',
    scheduledTime: '14:30',
    status: 'draft',
    aiTips: [
      'Tuesday afternoons have 18% higher engagement',
      'Professional content performs 35% better',
      'Include industry-relevant keywords'
    ]
  },
  {
    id: 3,
    title: 'Customer Success Story',
    platform: 'Facebook',
    scheduledDate: '2025-11-27',
    scheduledTime: '18:00',
    status: 'scheduled',
    aiTips: [
      'Evening posts get 40% more shares',
      'Emotional storytelling increases engagement by 28%',
      'Add customer testimonial video for 2x impact'
    ]
  },
  {
    id: 4,
    title: 'Weekly Tips Newsletter',
    platform: 'LinkedIn',
    scheduledDate: '2025-11-28',
    scheduledTime: '09:00',
    status: 'draft',
    aiTips: [
      'Morning posts on LinkedIn get 3x more views',
      'Educational content has 45% higher save rate',
      'Use bullet points for better readability'
    ]
  }
]
