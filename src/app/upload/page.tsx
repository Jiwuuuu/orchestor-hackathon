'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { FileUploadZone } from '@/components/upload/file-upload-zone'
import { UploadSuccess } from '@/components/upload/upload-success'
import { UploadInfoCards } from '@/components/upload/upload-info-cards'
import { ProcessingLoader } from '@/components/upload/processing-loader'

interface UploadedFile {
    name: string
    size: number
    type: string
    data: string
}

export default function UploadPage() {
    const router = useRouter()
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const validateFile = (file: File): string | null => {
        const validTypes = ['text/csv', 'application/json', 'text/plain']
        const maxSize = 10 * 1024 * 1024 // 10MB

        if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|json)$/i)) {
            return 'Please upload a CSV or JSON file'
        }

        if (file.size > maxSize) {
            return 'File size must be less than 10MB'
        }

        return null
    }

    const processFile = async (file: File) => {
        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            return
        }

        setIsProcessing(true)
        setError(null)
        setSuccess(false)

        try {
            // Read file content
            const reader = new FileReader()
            reader.onload = async e => {
                const content = e.target?.result as string

                setUploadedFile({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: content
                })

                // Simulate processing
                await new Promise(resolve => setTimeout(resolve, 1500))

                // TODO: Backend integration - Send file to API for processing
                // const response = await fetch('/api/upload/tasks', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ filename: file.name, content })
                // })

                setSuccess(true)
                setIsProcessing(false)
            }

            reader.onerror = () => {
                setError('Failed to read file. Please try again.')
                setIsProcessing(false)
            }

            reader.readAsText(file)
        } catch (err) {
            setError('An error occurred while processing the file.')
            setIsProcessing(false)
        }
    }

    const handleReset = () => {
        setUploadedFile(null)
        setError(null)
        setSuccess(false)
        setIsProcessing(false)
    }

    const handleViewSchedule = () => {
        // TODO: Pass uploaded data to schedule preview
        router.push('/schedule-preview')
    }

    return (
        <div className="min-h-screen bg-custom-green">
            <DashboardNav />

            <main className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,50px)] py-[clamp(40px,6vw,80px)]">
                <div className="mb-[clamp(40px,6vw,60px)]">
                    <h2 className="text-[clamp(32px,5vw,56px)] font-bold mb-2 text-black">
                        Upload Tasks
                    </h2>
                    <p className="text-[clamp(16px,2vw,20px)] text-black/60">
                        Import your tasks from Asana using CSV or JSON files
                    </p>
                </div>

                <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <CardHeader>
                        <CardTitle className="text-[clamp(20px,2.5vw,24px)] font-bold text-black">
                            File Upload
                        </CardTitle>
                        <CardDescription className="text-black/60">
                            Upload your Asana export file (CSV or JSON format)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!uploadedFile ? (
                            <FileUploadZone onFileSelect={processFile} error={error} />
                        ) : (
                            <div className="space-y-6">
                                {isProcessing ? (
                                    <ProcessingLoader />
                                ) : success ? (
                                    <UploadSuccess
                                        file={uploadedFile}
                                        onReset={handleReset}
                                        onViewSchedule={handleViewSchedule}
                                    />
                                ) : null}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <UploadInfoCards />
            </main>
        </div>
    )
}
