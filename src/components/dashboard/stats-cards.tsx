import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface StatCardProps {
    title: string
    value: string
    description: string
}

const statData: StatCardProps[] = [
    {
        title: 'Total Posts',
        value: '127',
        description: '+12 this month'
    },
    {
        title: 'Scheduled',
        value: '23',
        description: 'Next 7 days'
    },
    {
        title: 'Published',
        value: '104',
        description: 'All time'
    },
    {
        title: 'Engagement',
        value: '12.5K',
        description: '+8.2% vs last week'
    }
]

export function StatsCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(20px,3vw,30px)] mb-[clamp(30px,4vw,40px)]">
            {statData.map((stat, index) => (
                <Card
                    key={index}
                    className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                >
                    <CardHeader className="pb-3">
                        <CardDescription className="text-black/60 text-[clamp(12px,1.5vw,14px)] uppercase tracking-wider">
                            {stat.title}
                        </CardDescription>
                        <CardTitle className="text-[clamp(36px,5vw,48px)] font-bold text-black">
                            {stat.value}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-[clamp(12px,1.5vw,14px)] text-black/60">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
