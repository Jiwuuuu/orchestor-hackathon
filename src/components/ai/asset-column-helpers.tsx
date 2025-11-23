import { ColumnDef } from '@tanstack/react-table'
import { AssetVerificationBadge } from '@/components/ai/asset-verification-badge'
import { AssetPreviewThumbnail } from '@/components/ai/asset-preview-thumbnail'
import type { AssetVerification } from '@/types/asset'

/**
 * Creates a column definition for asset verification in schedule tables
 * 
 * @example
 * ```tsx
 * const columns: ColumnDef<ScheduleItem>[] = [
 *   // ... other columns
 *   createAssetVerificationColumn(),
 *   // ... more columns
 * ]
 * ```
 */
export function createAssetVerificationColumn<T extends { asset?: AssetVerification }>(): ColumnDef<T> {
  return {
    accessorKey: 'asset',
    header: 'Asset Status',
    cell: ({ row }) => {
      const asset = row.getValue('asset') as AssetVerification | undefined
      
      if (!asset) {
        return (
          <span className="text-[clamp(11px,1.3vw,12px)] text-black/40 uppercase tracking-wider font-bold">
            No Asset
          </span>
        )
      }
      
      return (
        <div className="flex items-center gap-[clamp(8px,1vw,10px)]">
          <AssetPreviewThumbnail 
            asset={asset} 
            size="sm" 
          />
          <AssetVerificationBadge 
            status={asset.status}
            details={asset.details.issue || getStatusMessage(asset.status)}
            compact
          />
        </div>
      )
    },
  }
}

/**
 * Creates a column definition showing only the verification badge (no thumbnail)
 * Useful for tables where space is limited
 */
export function createAssetStatusBadgeColumn<T extends { asset?: AssetVerification }>(): ColumnDef<T> {
  return {
    accessorKey: 'asset',
    header: 'Status',
    cell: ({ row }) => {
      const asset = row.getValue('asset') as AssetVerification | undefined
      
      if (!asset) {
        return (
          <span className="text-[clamp(11px,1.3vw,12px)] text-black/40 uppercase tracking-wider font-bold">
            —
          </span>
        )
      }
      
      return (
        <AssetVerificationBadge 
          status={asset.status}
          details={asset.details.issue || getStatusMessage(asset.status)}
          compact
        />
      )
    },
  }
}

/**
 * Creates a column definition showing only the thumbnail preview
 * Useful when you want separate columns for preview and status
 */
export function createAssetThumbnailColumn<T extends { asset?: AssetVerification }>(): ColumnDef<T> {
  return {
    accessorKey: 'asset',
    header: 'Preview',
    cell: ({ row }) => {
      const asset = row.getValue('asset') as AssetVerification | undefined
      
      if (!asset) {
        return (
          <div className="w-[clamp(40px,5vw,48px)] h-[clamp(40px,5vw,48px)] border-2 border-gray-300 rounded-[5px] bg-gray-100" />
        )
      }
      
      return (
        <AssetPreviewThumbnail 
          asset={asset} 
          size="sm" 
        />
      )
    },
  }
}

/**
 * Helper function to get default status messages
 */
function getStatusMessage(status: AssetVerification['status']): string {
  const messages = {
    verified: 'All checks passed - ready for publishing',
    warning: 'Asset has minor issues',
    error: 'Asset verification failed',
    checking: 'Verifying asset...',
    missing: 'Asset not found'
  }
  return messages[status]
}

/**
 * Type augmentation for ScheduleItem to include asset field
 * Add this to your existing ScheduleItem interface:
 * 
 * @example
 * ```tsx
 * interface ScheduleItem {
 *   id: number
 *   title: string
 *   platform: string
 *   // ... other fields
 *   asset?: AssetVerification  // Add this
 * }
 * ```
 */
export type ScheduleItemWithAsset = {
  asset?: AssetVerification
}
