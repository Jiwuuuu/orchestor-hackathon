# Mock Data

Centralized mock data storage for the Orchestor project.

## Structure

```
lib/mock-data/
├── index.ts                   # Central export point
├── schedule.ts                # Schedule items data
├── flagged-items.ts           # Flagged items (basic & extended)
├── schedule-suggestions.ts    # Schedule optimization suggestions
├── captions.ts                # Caption enhancements
├── assets.ts                  # Asset verification data
└── reposts.ts                 # Repost recommendations
```

## Usage

### Import from Central Location

```typescript
// Import from centralized location
import { 
  mockScheduleData, 
  mockFlaggedItemsBasic,
  mockCaptionEnhancements 
} from '@/lib/mock-data'

// Don't define mock data inline in components
const mockData = [/* data */]
```

### Available Mock Data

| Export Name | Type | Used In | Description |
|------------|------|---------|-------------|
| `mockScheduleData` | `ScheduleItem[]` | schedule-preview | Complete schedule items with captions |
| `mockFlaggedItemsBasic` | `FlaggedItem[]` | schedule-preview | 2 flagged items for quick testing |
| `mockFlaggedItemsExtended` | `FlaggedItem[]` | flagged-items-demo | 5 flagged items with all issue types |
| `mockScheduleSuggestionsBasic` | `ScheduleSuggestion[]` | schedule-preview | 2 schedule optimization suggestions |
| `mockScheduleSuggestionsExtended` | `ScheduleSuggestion[]` | schedule-optimization-demo | 4 suggestions with all types |
| `mockCaptionEnhancements` | `CaptionEnhancement[]` | caption-enhancement-demo | 2 caption enhancement examples |
| `mockAssets` | `AssetVerification[]` | asset-verification-demo | 5 assets with different statuses |
| `mockRepostRecommendations` | `RepostRecommendation[]` | repost | 3 repost recommendations |

### Example Usage

```typescript
// In your page component
'use client'

import { useState } from 'react'
import { mockScheduleData, mockFlaggedItemsBasic } from '@/lib/mock-data'

export default function SchedulePage() {
  const [scheduleItems] = useState(mockScheduleData)
  const [flaggedItems] = useState(mockFlaggedItemsBasic)
  
  return (
    // Your component JSX
  )
}
```


## When Backend is Ready

Replace mock data imports with API calls:

```typescript
// Before (with mock data)
import { mockScheduleData } from '@/lib/mock-data'
const [scheduleItems] = useState(mockScheduleData)

// After (with real API)
const [scheduleItems, setScheduleItems] = useState([])

useEffect(() => {
  fetchScheduleData().then(setScheduleItems)
}, [])
```

## File Descriptions

### `schedule.ts`
Schedule items with complete caption enhancement data for testing the full schedule preview workflow.

### `flagged-items.ts`
- **Basic**: 2 items for schedule-preview (missing asset, schedule conflict)
- **Extended**: 5 items for demo page (all issue types)

### `schedule-suggestions.ts`
- **Basic**: 2 suggestions for schedule-preview (optimal time, platform-specific)
- **Extended**: 4 suggestions for demo page (all suggestion types)

### `captions.ts`
Caption enhancement examples showing before/after for all platforms (Instagram, Facebook, LinkedIn, Twitter).

### `assets.ts`
Asset verification examples with different statuses (verified, warning, error, checking, missing).

### `reposts.ts`
Repost recommendation data with performance metrics and improvement suggestions.

## Best Practices

1. **Always import from `@/lib/mock-data`**
   - Never copy-paste mock data between files
   - Use the centralized exports

2. **Choose the right variant**
   - Use `Basic` variants for main app pages
   - Use `Extended` variants for demo pages

3. **Document changes**
   - Update this README when adding new mock data
   - Keep type definitions in `/types` folder

4. **TODO comments**
   - Add `// TODO: Replace with API call` where mock data is used
   - Makes it easy to find what needs backend integration

## Adding New Mock Data

1. Create a new file in `lib/mock-data/`
2. Export properly typed data
3. Add export to `index.ts`
4. Update this README
5. Update pages to use centralized data

Example:

```typescript
// lib/mock-data/analytics.ts
export const mockAnalyticsData = [
  // ... your mock data
]

// lib/mock-data/index.ts
export { mockAnalyticsData } from './analytics'
```
