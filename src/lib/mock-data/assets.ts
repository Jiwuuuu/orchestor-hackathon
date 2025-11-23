/**
 * Mock Asset Verification Data
 * Used in: asset-verification-demo/page.tsx
 */

import type { AssetVerification } from '@/types/asset'

export const mockAssets: AssetVerification[] = [
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    status: 'verified',
    type: 'image',
    details: {
      format: 'JPG',
      dimensions: '1920x1080',
      size: '2.4 MB'
    }
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    status: 'warning',
    type: 'image',
    details: {
      format: 'PNG',
      dimensions: '1024x768',
      size: '3.8 MB',
      issue: 'Image dimensions below recommended 1080p'
    }
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    status: 'error',
    type: 'video',
    details: {
      format: 'MP4',
      dimensions: '1280x720',
      size: '5.3 MB',
      issue: 'Video duration exceeds platform limit (3 min max)'
    }
  },
  {
    url: '',
    status: 'checking',
    type: 'image',
    details: {
      format: 'WEBP',
      dimensions: 'Unknown',
      size: 'Unknown'
    }
  },
  {
    url: '',
    status: 'missing',
    type: 'document',
    details: {
      format: 'PDF',
      issue: 'File not found in storage'
    }
  }
]
