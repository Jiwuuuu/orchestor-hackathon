'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { AssetVerificationBadge } from '@/components/ai/asset-verification-badge'
import { AssetPreviewThumbnail } from '@/components/ai/asset-preview-thumbnail'
import type { AssetVerification } from '@/types/asset'
import { mockAssets } from '@/lib/mock-data'

export default function AssetVerificationDemoPage() {
  // Mock assets - now imported from centralized location
  const _mockAssets: AssetVerification[] = [
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

  return (
    <main className="min-h-screen bg-white p-[clamp(20px,3vw,40px)]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-[clamp(32px,4vw,48px)]">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold text-black uppercase tracking-wider mb-[clamp(12px,1.5vw,16px)]">
            Asset Verification System
          </h1>
          <p className="text-[clamp(14px,1.8vw,16px)] text-black/60">
            Visual status indicators and preview thumbnails for media assets in your schedule
          </p>
        </div>

        {/* Badge Status Overview */}
        <Card className="p-[clamp(24px,3vw,32px)] border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-[clamp(24px,3vw,32px)]">
          <h2 className="text-[clamp(20px,3vw,24px)] font-bold text-black uppercase tracking-wider mb-[clamp(16px,2vw,20px)]">
            Status Badges
          </h2>
          <p className="text-[clamp(13px,1.6vw,14px)] text-black/60 mb-[clamp(20px,2.5vw,24px)]">
            Compact status indicators with tooltips (hover to see details)
          </p>

          <div className="space-y-[clamp(16px,2vw,20px)]">
            {/* Full Size Badges */}
            <div>
              <h3 className="text-[clamp(14px,1.8vw,16px)] font-bold text-black mb-[clamp(12px,1.5vw,16px)] uppercase tracking-wider">
                Full Size
              </h3>
              <div className="flex flex-wrap gap-[clamp(12px,1.5vw,16px)]">
                <AssetVerificationBadge 
                  status="verified" 
                  details="All checks passed - ready for publishing"
                />
                <AssetVerificationBadge 
                  status="warning" 
                  details="Image dimensions below recommended 1080p"
                />
                <AssetVerificationBadge 
                  status="error" 
                  details="Video duration exceeds platform limit (3 min max)"
                />
                <AssetVerificationBadge 
                  status="checking" 
                  details="Verifying asset format and dimensions..."
                />
                <AssetVerificationBadge 
                  status="missing" 
                  details="File not found in storage"
                />
              </div>
            </div>

            {/* Compact Badges */}
            <div>
              <h3 className="text-[clamp(14px,1.8vw,16px)] font-bold text-black mb-[clamp(12px,1.5vw,16px)] uppercase tracking-wider">
                Compact (for tables)
              </h3>
              <div className="flex flex-wrap gap-[clamp(12px,1.5vw,16px)]">
                <AssetVerificationBadge 
                  status="verified" 
                  details="All checks passed - ready for publishing"
                  compact
                />
                <AssetVerificationBadge 
                  status="warning" 
                  details="Image dimensions below recommended 1080p"
                  compact
                />
                <AssetVerificationBadge 
                  status="error" 
                  details="Video duration exceeds platform limit (3 min max)"
                  compact
                />
                <AssetVerificationBadge 
                  status="checking" 
                  details="Verifying asset format and dimensions..."
                  compact
                />
                <AssetVerificationBadge 
                  status="missing" 
                  details="File not found in storage"
                  compact
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Asset Thumbnails */}
        <Card className="p-[clamp(24px,3vw,32px)] border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-[clamp(24px,3vw,32px)]">
          <h2 className="text-[clamp(20px,3vw,24px)] font-bold text-black uppercase tracking-wider mb-[clamp(16px,2vw,20px)]">
            Asset Preview Thumbnails
          </h2>
          <p className="text-[clamp(13px,1.6vw,14px)] text-black/60 mb-[clamp(20px,2.5vw,24px)]">
            Click thumbnails to view full preview with details
          </p>

          <div className="space-y-[clamp(24px,3vw,32px)]">
            {mockAssets.map((asset, index) => (
              <div 
                key={index}
                className="flex items-start gap-[clamp(16px,2vw,20px)] p-[clamp(16px,2vw,20px)] bg-gray-50 border-2 border-gray-300 rounded-[5px]"
              >
                <AssetPreviewThumbnail asset={asset} size="md" />
                
                <div className="flex-1">
                  <div className="flex items-center gap-[clamp(12px,1.5vw,16px)] mb-[clamp(8px,1vw,10px)]">
                    <h3 className="text-[clamp(15px,2vw,18px)] font-bold text-black capitalize">
                      {asset.type} Asset {index + 1}
                    </h3>
                    <AssetVerificationBadge status={asset.status} details={asset.details.issue} />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-[clamp(12px,1.5vw,16px)] text-[clamp(12px,1.4vw,13px)]">
                    {asset.details.format && (
                      <div>
                        <span className="font-bold text-black/60 uppercase tracking-wider block">Format</span>
                        <span className="font-bold text-black">{asset.details.format}</span>
                      </div>
                    )}
                    {asset.details.dimensions && (
                      <div>
                        <span className="font-bold text-black/60 uppercase tracking-wider block">Dimensions</span>
                        <span className="font-bold text-black">{asset.details.dimensions}</span>
                      </div>
                    )}
                    {asset.details.size && (
                      <div>
                        <span className="font-bold text-black/60 uppercase tracking-wider block">Size</span>
                        <span className="font-bold text-black">{asset.details.size}</span>
                      </div>
                    )}
                  </div>
                  
                  {asset.details.issue && (
                    <div className="mt-[clamp(8px,1vw,10px)] p-[clamp(8px,1vw,10px)] bg-red-50 border-2 border-red-300 rounded-[5px]">
                      <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-red-600 uppercase tracking-wider block mb-[clamp(4px,0.5vw,6px)]">
                        Issue
                      </span>
                      <span className="text-[clamp(12px,1.4vw,13px)] text-red-600">
                        {asset.details.issue}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Size Variations */}
        <Card className="p-[clamp(24px,3vw,32px)] border-2 border-black rounded-[5px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-[clamp(20px,3vw,24px)] font-bold text-black uppercase tracking-wider mb-[clamp(16px,2vw,20px)]">
            Thumbnail Sizes
          </h2>
          <p className="text-[clamp(13px,1.6vw,14px)] text-black/60 mb-[clamp(20px,2.5vw,24px)]">
            Different sizes for various UI contexts
          </p>

          <div className="flex flex-wrap items-end gap-[clamp(20px,2.5vw,30px)]">
            <div className="text-center">
              <AssetPreviewThumbnail asset={mockAssets[0]} size="sm" />
              <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-black/60 uppercase tracking-wider mt-[clamp(8px,1vw,10px)] block">
                Small
              </span>
            </div>

            <div className="text-center">
              <AssetPreviewThumbnail asset={mockAssets[0]} size="md" />
              <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-black/60 uppercase tracking-wider mt-[clamp(8px,1vw,10px)] block">
                Medium
              </span>
            </div>

            <div className="text-center">
              <AssetPreviewThumbnail asset={mockAssets[0]} size="lg" />
              <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-black/60 uppercase tracking-wider mt-[clamp(8px,1vw,10px)] block">
                Large
              </span>
            </div>
          </div>
        </Card>

        {/* Usage Example */}
        <div className="mt-[clamp(32px,4vw,48px)] p-[clamp(20px,2.5vw,24px)] bg-gray-50 border-2 border-gray-300 rounded-[5px]">
          <h3 className="text-[clamp(16px,2vw,20px)] font-bold text-black mb-[clamp(12px,1.5vw,16px)] uppercase tracking-wider">
            Usage in Schedule Table
          </h3>
          <pre className="text-[clamp(11px,1.3vw,12px)] text-black/80 overflow-x-auto">
{`// Add to ScheduleDataTable columns:
{
  accessorKey: 'asset',
  header: 'Asset',
  cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <AssetPreviewThumbnail 
        asset={row.getValue('asset')} 
        size="sm" 
      />
      <AssetVerificationBadge 
        status={row.getValue('asset').status}
        details={row.getValue('asset').details.issue}
        compact
      />
    </div>
  ),
}`}
          </pre>
        </div>
      </div>
    </main>
  )
}
