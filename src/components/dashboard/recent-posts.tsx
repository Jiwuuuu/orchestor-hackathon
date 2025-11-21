import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Post {
    id: number
    title: string
    platform: string
    status: 'Scheduled' | 'Published'
    date: string
}

const mockRecentPosts: Post[] = [
    { id: 1, title: 'New Product Launch', platform: 'Instagram', status: 'Scheduled', date: '2025-11-20' },
    { id: 2, title: 'Weekly Newsletter', platform: 'LinkedIn', status: 'Published', date: '2025-11-18' },
    { id: 3, title: 'Behind the Scenes', platform: 'Facebook', status: 'Scheduled', date: '2025-11-21' },
    { id: 4, title: 'Customer Testimonial', platform: 'Instagram', status: 'Published', date: '2025-11-17' }
]

export function RecentPosts() {
    return (
        <Card className="lg:col-span-2 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
                <CardTitle className="text-[clamp(20px,2.5vw,24px)] font-bold text-black">
                    Recent Posts
                </CardTitle>
                <CardDescription className="text-black/60">
                    Your latest content across all platforms
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockRecentPosts.map(post => (
                        <div
                            key={post.id}
                            className="flex items-center justify-between p-4 bg-custom-green/30 rounded-[5px] border-2 border-black/10 hover:border-black transition-colors"
                        >
                            <div className="flex-1">
                                <h3 className="font-bold text-[clamp(14px,1.5vw,16px)] mb-1 text-black">
                                    {post.title}
                                </h3>
                                <p className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                                    {post.platform} • {post.date}
                                </p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-[clamp(12px,1.5vw,14px)] font-medium border-2 ${
                                    post.status === 'Published'
                                        ? 'bg-black text-white border-black'
                                        : 'bg-yellow-500 text-black border-black'
                                }`}
                            >
                                {post.status}
                            </span>
                        </div>
                    ))}
                </div>

                <Button variant="outline" className="w-full mt-6 text-md" >
                    View All Posts
                </Button>
            </CardContent>
        </Card>
    )
}
