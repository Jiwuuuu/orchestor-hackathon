'use client'

import { useState } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileUploadZoneProps {
    onFileSelect: (file: File) => void
    error: string | null
}

export function FileUploadZone({ onFileSelect, error }: FileUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = e.dataTransfer.files
        if (files.length > 0) {
            onFileSelect(files[0])
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            onFileSelect(files[0])
        }
    }

    return (
        <div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-[10px] p-12 text-center transition-colors ${
                    isDragging
                        ? 'border-black bg-custom-green/20'
                        : 'border-black/30 hover:border-black/60'
                }`}
            >
                <Upload className="w-16 h-16 mx-auto mb-4 text-black/40" />
                <h3 className="text-[clamp(18px,2vw,20px)] font-bold mb-2 text-black">
                    Drop your file here
                </h3>
                <p className="text-[clamp(14px,1.5vw,16px)] text-black/60 mb-6">
                    or click to browse
                </p>
                <label htmlFor="file-upload">
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        Choose File
                    </Button>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".csv,.json"
                    onChange={handleFileInput}
                    className="hidden"
                />
                <p className="text-[clamp(12px,1.5vw,14px)] text-black/40 mt-4">
                    Supported formats: CSV, JSON (Max 10MB)
                </p>

                {error && (
                    <div className="mt-6 p-4 bg-red-100 border-2 border-red-500 rounded-[5px] flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-[clamp(14px,1.5vw,16px)] text-red-700 font-medium">
                            {error}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
