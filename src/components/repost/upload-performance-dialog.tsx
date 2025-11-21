'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { FileUploadZone } from '@/components/upload/file-upload-zone'
import { ProcessingLoader } from '@/components/upload/processing-loader'

interface UploadPerformanceDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onFileSelect: (file: File) => void
    error: string | null
    isProcessing: boolean
    uploadedFile: { name: string; size: number } | null
}

export function UploadPerformanceDialog({
    open,
    onOpenChange,
    onFileSelect,
    error,
    isProcessing,
    uploadedFile
}: UploadPerformanceDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl border-2 border-black shadow-box bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Upload Performance Data</DialogTitle>
                    <DialogDescription>
                        Upload your social media analytics export (CSV or JSON format)
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {!uploadedFile ? (
                        <FileUploadZone onFileSelect={onFileSelect} error={error} />
                    ) : isProcessing ? (
                        <ProcessingLoader />
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    )
}
