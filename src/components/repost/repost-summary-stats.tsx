import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RepostSummaryStatsProps {
    totalAnalyzed: number
    highPerformers: number
    averageScore: number
}

export function RepostSummaryStats({
    totalAnalyzed,
    highPerformers,
    averageScore
}: RepostSummaryStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="pb-3">
                    <CardTitle className="text-[clamp(16px,2vw,18px)] font-bold text-black">
                        Posts Analyzed
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[clamp(36px,5vw,48px)] font-bold text-black">
                        {totalAnalyzed}
                    </p>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/60">
                        From last 6 months
                    </p>
                </CardContent>
            </Card>

            <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="pb-3">
                    <CardTitle className="text-[clamp(16px,2vw,18px)] font-bold text-black">
                        High Performers
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[clamp(36px,5vw,48px)] font-bold text-black">
                        {highPerformers}
                    </p>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/60">Ready to repost</p>
                </CardContent>
            </Card>

            <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="pb-3">
                    <CardTitle className="text-[clamp(16px,2vw,18px)] font-bold text-black">
                        Avg. Score
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[clamp(36px,5vw,48px)] font-bold text-black">
                        {averageScore}
                    </p>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/60">
                        Excellent repost potential
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
