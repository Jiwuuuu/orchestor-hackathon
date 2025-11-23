'use client'

import { useState } from 'react'
import { Calendar, Clock, Edit2, Save, Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ScheduleItem {
    id: number
    title: string
    platform: string
    scheduledDate: string
    scheduledTime: string
    status: 'draft' | 'scheduled' | 'published'
    aiTips: string[]
}

interface ScheduleItemCardProps {
    item: ScheduleItem
    onSave: (item: ScheduleItem) => void
}

export function ScheduleItemCard({ item, onSave }: ScheduleItemCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedItem, setEditedItem] = useState<ScheduleItem>(item)

    const handleEdit = () => {
        setIsEditing(true)
        setEditedItem({ ...item })
    }

    const handleSave = () => {
        onSave(editedItem)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditedItem(item)
    }

    const handleInputChange = (field: keyof ScheduleItem, value: string) => {
        setEditedItem({ ...editedItem, [field]: value })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-black text-white border-black'
            case 'scheduled':
                return 'bg-custom-green text-black border-black'
            case 'draft':
                return 'bg-yellow-500 text-black border-black'
            default:
                return 'bg-gray-200 text-black border-black'
        }
    }

    return (
        <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor={`title-${item.id}`}>Title</Label>
                                    <Input
                                        id={`title-${item.id}`}
                                        value={editedItem.title}
                                        onChange={e => handleInputChange('title', e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`date-${item.id}`}>Date</Label>
                                        <Input
                                            id={`date-${item.id}`}
                                            type="date"
                                            value={editedItem.scheduledDate}
                                            onChange={e =>
                                                handleInputChange('scheduledDate', e.target.value)
                                            }
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`time-${item.id}`}>Time</Label>
                                        <Input
                                            id={`time-${item.id}`}
                                            type="time"
                                            value={editedItem.scheduledTime}
                                            onChange={e =>
                                                handleInputChange('scheduledTime', e.target.value)
                                            }
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-[clamp(18px,2.5vw,22px)] font-bold text-black mb-2">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-4 text-[clamp(14px,1.5vw,16px)] text-black/60">
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {item.platform}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(item.scheduledDate).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {item.scheduledTime}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`px-3 py-1 rounded-full text-[clamp(12px,1.5vw,14px)] font-medium border-2 ${getStatusColor(
                                item.status
                            )}`}
                        >
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={handleSave}
                                    className="bg-black text-custom-green"
                                >
                                    <Save className="w-4 h-4 mr-1" />
                                    Save
                                </Button>
                                <Button size="sm" variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button size="sm" variant="outline" onClick={handleEdit}>
                                <Edit2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="p-4 bg-custom-green/20 border-2 border-black/10 rounded-[5px]">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-yellow-600" />
                        <h4 className="font-bold text-[clamp(14px,1.5vw,16px)] text-black">
                            AI Recommendations
                        </h4>
                    </div>
                    <ul className="space-y-2">
                        {item.aiTips.map((tip, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-[clamp(14px,1.5vw,16px)] text-black/80"
                            >
                                <span className="text-yellow-600 mt-1">•</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}
