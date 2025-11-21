'use client'

import * as React from 'react'
import { Image, Video, FileText, File, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AssetVerification } from '@/types/asset'

interface AssetPreviewThumbnailProps {
  asset: AssetVerification
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeConfig = {
  sm: {
    container: 'w-[clamp(40px,5vw,48px)] h-[clamp(40px,5vw,48px)]',
    icon: 'w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)]',
    text: 'text-[clamp(9px,1.1vw,10px)]'
  },
  md: {
    container: 'w-[clamp(64px,8vw,80px)] h-[clamp(64px,8vw,80px)]',
    icon: 'w-[clamp(24px,3vw,32px)] h-[clamp(24px,3vw,32px)]',
    text: 'text-[clamp(10px,1.2vw,11px)]'
  },
  lg: {
    container: 'w-[clamp(96px,12vw,120px)] h-[clamp(96px,12vw,120px)]',
    icon: 'w-[clamp(32px,4vw,40px)] h-[clamp(32px,4vw,40px)]',
    text: 'text-[clamp(11px,1.3vw,12px)]'
  }
}

const typeConfig = {
  image: { icon: Image, color: 'text-blue-600', label: 'IMG' },
  video: { icon: Video, color: 'text-purple-600', label: 'VID' },
  document: { icon: FileText, color: 'text-gray-600', label: 'DOC' },
  unknown: { icon: File, color: 'text-gray-400', label: '?' }
}

export function AssetPreviewThumbnail({ 
  asset, 
  size = 'md',
  className = '' 
}: AssetPreviewThumbnailProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)
  const config = sizeConfig[size]
  const typeInfo = typeConfig[asset.type]
  const Icon = typeInfo.icon

  const canShowPreview = (asset.type === 'image' || asset.type === 'video') && asset.url && !imageError

  return (
    <>
      <button
        onClick={() => setIsExpanded(true)}
        className={`
          relative ${config.container}
          border-2 border-black rounded-[5px]
          shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
          transition-shadow
          overflow-hidden
          bg-white
          ${className}
        `}
      >
        {/* Preview or Icon */}
        {canShowPreview && asset.type === 'image' ? (
          <img
            src={asset.url}
            alt="Asset preview"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : canShowPreview && asset.type === 'video' ? (
          <video
            src={asset.url}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <Icon className={`${config.icon} ${typeInfo.color}`} />
          </div>
        )}

        {/* Overlay */}
        <div className="
          absolute inset-0
          bg-linear-to-t from-black/80 via-transparent to-transparent
          flex flex-col justify-end
          p-[clamp(4px,0.5vw,6px)]
        ">
          {/* Format Badge */}
          {asset.details.format && (
            <span className={`
              ${config.text} font-bold text-white uppercase tracking-wider
              bg-black/60 px-[clamp(4px,0.5vw,6px)] py-[clamp(2px,0.3vw,3px)]
              rounded-[3px]
              inline-block
              w-fit
            `}>
              {asset.details.format}
            </span>
          )}
          
          {/* Dimensions */}
          {asset.details.dimensions && (
            <span className={`
              ${config.text} text-white/90 font-medium mt-[clamp(2px,0.3vw,3px)]
            `}>
              {asset.details.dimensions}
            </span>
          )}
        </div>
      </button>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-[clamp(16px,2vw,24px)]"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="
                relative max-w-[90vw] max-h-[90vh]
                border-2 border-black rounded-[5px]
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                bg-white
                overflow-hidden
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="
                  absolute top-[clamp(12px,1.5vw,16px)] right-[clamp(12px,1.5vw,16px)]
                  z-10
                  w-[clamp(32px,4vw,40px)] h-[clamp(32px,4vw,40px)]
                  bg-white border-2 border-black rounded-[5px]
                  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                  flex items-center justify-center
                  transition-shadow
                "
              >
                <X className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)] text-black" />
              </button>

              {/* Asset Preview */}
              <div className="relative">
                {canShowPreview && asset.type === 'image' ? (
                  <img
                    src={asset.url}
                    alt="Asset full preview"
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                ) : canShowPreview && asset.type === 'video' ? (
                  <video
                    src={asset.url}
                    controls
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-gray-50 p-[clamp(40px,5vw,60px)]">
                    <Icon className="w-[clamp(64px,8vw,80px)] h-[clamp(64px,8vw,80px)] text-gray-400 mb-[clamp(16px,2vw,20px)]" />
                    <span className="text-[clamp(14px,1.8vw,16px)] font-bold text-gray-600 uppercase tracking-wider">
                      {typeInfo.label} Preview Not Available
                    </span>
                  </div>
                )}
              </div>

              {/* Details Panel */}
              <div className="
                p-[clamp(16px,2vw,20px)]
                border-t-2 border-black
                bg-gray-50
              ">
                <div className="grid grid-cols-2 gap-[clamp(12px,1.5vw,16px)]">
                  {asset.details.format && (
                    <div>
                      <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-black/60 uppercase tracking-wider block mb-[clamp(4px,0.5vw,6px)]">
                        Format
                      </span>
                      <span className="text-[clamp(13px,1.6vw,14px)] font-bold text-black">
                        {asset.details.format}
                      </span>
                    </div>
                  )}
                  
                  {asset.details.dimensions && (
                    <div>
                      <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-black/60 uppercase tracking-wider block mb-[clamp(4px,0.5vw,6px)]">
                        Dimensions
                      </span>
                      <span className="text-[clamp(13px,1.6vw,14px)] font-bold text-black">
                        {asset.details.dimensions}
                      </span>
                    </div>
                  )}
                  
                  {asset.details.size && (
                    <div>
                      <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-black/60 uppercase tracking-wider block mb-[clamp(4px,0.5vw,6px)]">
                        File Size
                      </span>
                      <span className="text-[clamp(13px,1.6vw,14px)] font-bold text-black">
                        {asset.details.size}
                      </span>
                    </div>
                  )}
                  
                  {asset.details.issue && (
                    <div className="col-span-2">
                      <span className="text-[clamp(11px,1.3vw,12px)] font-bold text-red-600 uppercase tracking-wider block mb-[clamp(4px,0.5vw,6px)]">
                        Issue
                      </span>
                      <span className="text-[clamp(13px,1.6vw,14px)] font-medium text-red-600">
                        {asset.details.issue}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
