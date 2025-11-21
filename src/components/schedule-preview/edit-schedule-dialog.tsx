'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Lightbulb } from 'lucide-react'

interface ScheduleItem {
    id: number
    title: string
    platform: string
    scheduledDate: string
    scheduledTime: string
    status: 'draft' | 'scheduled' | 'published'
    aiTips: string[]
}

interface EditScheduleDialogProps {
    item: ScheduleItem | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (item: ScheduleItem) => void
}

export function EditScheduleDialog({ item, open, onOpenChange, onSave }: EditScheduleDialogProps) {
    const [formData, setFormData] = useState<ScheduleItem | null>(item)

    // Update form data when item changes
    useEffect(() => {
        setFormData(item)
    }, [item])

    if (!formData) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl border-2 border-black shadow-box bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit Schedule Item</DialogTitle>
                    <DialogDescription>
                        Make changes to your scheduled post. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="border-2 border-black"
                                required
                            />
                        </div>

                        {/* Platform */}
                        <div className="space-y-2">
                            <Label htmlFor="platform">Platform</Label>
                            <select
                                id="platform"
                                value={formData.platform}
                                onChange={(e) =>
                                    setFormData({ ...formData, platform: e.target.value })
                                }
                                className="w-full px-3 py-2 border-2 border-black rounded-md"
                                required
                            >
                                <option value="Instagram">Instagram</option>
                                <option value="Facebook">Facebook</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Twitter">Twitter</option>
                            </select>
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Scheduled Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.scheduledDate}
                                    onChange={(e) =>
                                        setFormData({ ...formData, scheduledDate: e.target.value })
                                    }
                                    className="border-2 border-black"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Scheduled Time</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={formData.scheduledTime}
                                    onChange={(e) =>
                                        setFormData({ ...formData, scheduledTime: e.target.value })
                                    }
                                    className="border-2 border-black"
                                    required
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.value as 'draft' | 'scheduled' | 'published',
                                    })
                                }
                                className="w-full px-3 py-2 border-2 border-black rounded-md"
                                required
                            >
                                <option value="draft">Draft</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        {/* AI Tips */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-yellow-600" />
                                AI Recommendations
                            </Label>
                            <div className="p-4 bg-yellow-50 border-2 border-yellow-800 rounded-md space-y-2">
                                {formData.aiTips.map((tip, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <span className="text-yellow-800 font-bold">•</span>
                                        <p className="text-sm text-yellow-900">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex justify-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="border-2 border-black text-lg h-12 px-8"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-black text-custom-green hover:bg-black/90 text-lg h-12 px-8"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
