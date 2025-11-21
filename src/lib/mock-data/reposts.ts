/**
 * Mock Repost Recommendations Data
 * Used in: repost/page.tsx
 */

export interface RepostRecommendation {
  id: number
  originalPost: {
    title: string
    platform: string
    publishedDate: string
    performance: {
      views: number
      likes: number
      comments: number
      shares: number
      engagementRate: number
    }
  }
  recommendation: {
    score: number
    reason: string
    suggestedDate: string
    suggestedTime: string
    improvements: string[]
  }
}

export const mockRepostRecommendations: RepostRecommendation[] = [
  {
    id: 1,
    originalPost: {
      title: 'Product Launch Tips & Tricks',
      platform: 'LinkedIn',
      publishedDate: '2025-10-15',
      performance: {
        views: 12500,
        likes: 890,
        comments: 145,
        shares: 234,
        engagementRate: 10.2
      }
    },
    recommendation: {
      score: 95,
      reason: 'High engagement rate (10.2%) and still relevant to current audience',
      suggestedDate: '2025-12-05',
      suggestedTime: '09:30',
      improvements: [
        'Update statistics with 2025 data',
        'Add new customer success story',
        'Include video testimonial for 40% higher engagement'
      ]
    }
  },
  {
    id: 2,
    originalPost: {
      title: '5 Marketing Strategies That Work',
      platform: 'Instagram',
      publishedDate: '2025-09-20',
      performance: {
        views: 8900,
        likes: 756,
        comments: 89,
        shares: 123,
        engagementRate: 10.9
      }
    },
    recommendation: {
      score: 92,
      reason: 'Evergreen content with consistent engagement over time',
      suggestedDate: '2025-12-10',
      suggestedTime: '14:00',
      improvements: [
        'Update with latest marketing trends',
        'Add carousel format for better visibility',
        'Include call-to-action button'
      ]
    }
  },
  {
    id: 3,
    originalPost: {
      title: 'Behind the Scenes: Our Team Culture',
      platform: 'Facebook',
      publishedDate: '2025-08-12',
      performance: {
        views: 15600,
        likes: 1200,
        comments: 234,
        shares: 567,
        engagementRate: 12.8
      }
    },
    recommendation: {
      score: 88,
      reason: 'High share rate indicates audience resonance and viral potential',
      suggestedDate: '2025-12-15',
      suggestedTime: '18:00',
      improvements: [
        'Add new team member introductions',
        'Include recent company achievements',
        'Create video montage for higher engagement'
      ]
    }
  }
]
