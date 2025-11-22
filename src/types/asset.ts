export type AssetStatus = 'verified' | 'warning' | 'error' | 'checking' | 'missing'
export type AssetType = 'image' | 'video' | 'document' | 'unknown'

export interface AssetVerification {
  url: string
  status: AssetStatus
  type: AssetType
  details: {
    format?: string
    dimensions?: string
    size?: string
    issue?: string
  }
}
