/**
 * Mock Caption Enhancements Data
 * Used in: caption-enhancement-demo/page.tsx
 */

import type { CaptionEnhancement } from '@/types/caption'

export const mockCaptionEnhancements: CaptionEnhancement[] = [
  {
    taskId: 'TASK-001',
    taskTitle: 'Q4 Product Launch Announcement',
    original: {
      text: 'New product launch next week. Check it out.',
      characterCount: 48
    },
    enhanced: {
      instagram: {
        text: '🚀 HUGE NEWS! Our game-changing product drops NEXT WEEK! 🔥\n\nGet ready to experience innovation like never before. This is what you\'ve been waiting for! ✨\n\nMark your calendars 📅 | Set your alarms ⏰ | Tell your friends 👯\n\n#ProductLaunch #Innovation #TechNews #ComingSoon #ExcitingTimes #NewRelease #StayTuned #GameChanger',
        characterCount: 312,
        characterLimit: 2200,
        status: 'optimal',
        hashtags: ['#ProductLaunch', '#Innovation', '#TechNews', '#ComingSoon', '#ExcitingTimes', '#NewRelease', '#StayTuned', '#GameChanger']
      },
      facebook: {
        text: '🚀 EXCITING ANNOUNCEMENT! 🚀\n\nWe\'re thrilled to reveal that our revolutionary new product is launching NEXT WEEK!\n\nThis launch represents months of hard work, innovation, and dedication from our incredible team. We can\'t wait to share it with you!\n\nWhat makes this special:\n✅ Cutting-edge technology\n✅ User-focused design\n✅ Unprecedented value\n\nStay tuned for the big reveal. Trust us, you won\'t want to miss this! 🎉\n\n#ProductLaunch #Innovation #TechNews #BusinessGrowth',
        characterCount: 456,
        characterLimit: 63206,
        status: 'optimal',
        hashtags: ['#ProductLaunch', '#Innovation', '#TechNews', '#BusinessGrowth']
      },
      linkedin: {
        text: 'Exciting Product Launch Announcement 🚀\n\nWe\'re proud to announce that our latest innovation will be launching next week. This represents a significant milestone in our commitment to delivering cutting-edge solutions.\n\nKey highlights:\n• Advanced technology infrastructure\n• Enhanced user experience\n• Seamless integration capabilities\n• Industry-leading performance\n\nOur team has worked tirelessly to bring this vision to life, and we\'re excited to share the results with our community.\n\nStay connected for the official launch details.\n\n#Innovation #ProductLaunch #TechnologyLeadership #BusinessSolutions #DigitalTransformation',
        characterCount: 567,
        characterLimit: 3000,
        status: 'optimal',
        hashtags: ['#Innovation', '#ProductLaunch', '#TechnologyLeadership', '#BusinessSolutions', '#DigitalTransformation']
      },
      twitter: {
        text: '🚀 BIG NEWS: Our groundbreaking product launches NEXT WEEK!\n\nThis is the innovation you\'ve been waiting for. ✨\n\nMark your calendars 📅\n\n#ProductLaunch #Innovation #TechNews',
        characterCount: 178,
        characterLimit: 280,
        status: 'optimal',
        hashtags: ['#ProductLaunch', '#Innovation', '#TechNews']
      }
    },
    improvements: [
      'Added emojis (8x)',
      'Optimized length for each platform',
      'Added 15+ relevant hashtags',
      'Enhanced call-to-action',
      'Improved engagement potential by 300%',
      'Platform-specific formatting'
    ],
    suggestedHashtags: [
      { tag: '#ProductLaunch', performance: 'trending' },
      { tag: '#Innovation', performance: 'high_engagement' },
      { tag: '#TechNews', performance: 'high_engagement' },
      { tag: '#BrandName', performance: 'brand_aligned' },
      { tag: '#GameChanger', performance: 'trending' },
      { tag: '#TechCommunity', performance: 'niche' }
    ]
  },
  {
    taskId: 'TASK-002',
    taskTitle: 'Weekly Team Update Post',
    original: {
      text: 'Team meeting today. Great progress on our projects.',
      characterCount: 53
    },
    enhanced: {
      instagram: {
        text: '💼 TEAM TUESDAY VIBES! 💪\n\nJust wrapped an incredible team meeting and WOW - the progress is REAL! 🎯\n\nOur squad is crushing it on multiple projects simultaneously. The energy, dedication, and innovation in the room today was absolutely inspiring! 🌟\n\nShoutout to everyone bringing their A-game! 🙌\n\n#TeamWork #OfficeLife #ProgressUpdate #TeamGoals #WorkCulture #Productivity #TeamTuesday #CorporateCulture',
        characterCount: 378,
        characterLimit: 2200,
        status: 'optimal',
        hashtags: ['#TeamWork', '#OfficeLife', '#ProgressUpdate', '#TeamGoals', '#WorkCulture', '#Productivity', '#TeamTuesday', '#CorporateCulture']
      },
      facebook: {
        text: '💼 Team Update: Progress & Momentum 💪\n\nWhat a fantastic team meeting today! We\'re excited to share that we\'re making excellent progress across all our active projects.\n\nHighlights from today:\n✅ Major milestones achieved\n✅ Innovative solutions implemented\n✅ Team collaboration at its finest\n✅ Clear roadmap for the weeks ahead\n\nWe\'re grateful to work with such a talented and dedicated team. Every member brings unique value, and together we\'re achieving great things!\n\nHere\'s to continued success and growth! 🎉\n\n#TeamWork #Progress #CompanyCulture #Collaboration',
        characterCount: 528,
        characterLimit: 63206,
        status: 'optimal',
        hashtags: ['#TeamWork', '#Progress', '#CompanyCulture', '#Collaboration']
      },
      linkedin: {
        text: 'Team Progress Update 📊\n\nToday\'s team meeting reinforced what makes our organization special - dedicated professionals working collaboratively towards shared goals.\n\nKey achievements discussed:\n• Significant progress on strategic initiatives\n• Successful implementation of innovative solutions\n• Enhanced cross-functional collaboration\n• Clear alignment on upcoming priorities\n\nOur team\'s commitment to excellence and continuous improvement continues to drive outstanding results. Proud to work alongside such talented individuals.\n\n#TeamLeadership #BusinessProgress #OrganizationalExcellence #ProfessionalDevelopment #WorkplaceSuccess',
        characterCount: 573,
        characterLimit: 3000,
        status: 'optimal',
        hashtags: ['#TeamLeadership', '#BusinessProgress', '#OrganizationalExcellence', '#ProfessionalDevelopment', '#WorkplaceSuccess']
      },
      twitter: {
        text: '💼 Team meeting = ✅\nProgress update = 🔥\nMotivation level = 💯\n\nOur squad is absolutely crushing it on all projects! Incredible energy today! 💪\n\n#TeamWork #Progress #Productivity',
        characterCount: 180,
        characterLimit: 280,
        status: 'optimal',
        hashtags: ['#TeamWork', '#Progress', '#Productivity']
      }
    },
    improvements: [
      'Added emojis (12x)',
      'Increased engagement by 250%',
      'Platform-optimized formatting',
      'Added specific bullet points',
      'Enhanced visual appeal',
      'Improved readability'
    ],
    suggestedHashtags: [
      { tag: '#TeamWork', performance: 'high_engagement' },
      { tag: '#WorkCulture', performance: 'trending' },
      { tag: '#OfficeLife', performance: 'high_engagement' },
      { tag: '#CompanyUpdate', performance: 'brand_aligned' },
      { tag: '#ProfessionalGrowth', performance: 'niche' }
    ]
  }
]
