'use client'

import { FileText, X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UploadedFile {
    name: string
    size: number
}

interface UploadSuccessProps {
    file: UploadedFile
    onReset: () => void
    onViewSchedule: () => void
}

export function UploadSuccess({ file, onReset, onViewSchedule }: UploadSuccessProps) {
    return (
        <div className="space-y-6">
            <div className="p-6 bg-custom-green/30 border-2 border-black rounded-[5px]">
                <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                    <div className="flex-1">
                        <h3 className="text-[clamp(16px,2vw,18px)] font-bold mb-2 text-black">
                            File Uploaded Successfully
                        </h3>
                        <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,16px)] text-black/60">
                            <FileText className="w-4 h-4" />
                            <span>{file.name}</span>
                            <span>•</span>
                            <span>{(file.size / 1024).toFixed(2)} KB</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onReset}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    onClick={onViewSchedule}
                    className="flex-1 text-lg bg-black text-custom-green hover:bg-custom-dark font-bold border-2 border-black"
                >
                    View Schedule Preview
                </Button>
                <Button onClick={onReset} variant="outline" className="text-lg">
                    Upload Another File
                </Button>
            </div>

            <div className="p-4 bg-yellow-50 border-2 border-yellow-500 rounded-[5px]">
                <p className="text-[clamp(14px,1.5vw,16px)] text-yellow-800">
                    <strong>Next Step:</strong> Review your schedule and get AI-powered
                    recommendations for optimal posting times.
                </p>
            </div>
        </div>
    )
}
