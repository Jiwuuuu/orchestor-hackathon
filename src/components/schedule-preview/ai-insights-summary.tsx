import { Sparkles, TrendingUp, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AiInsightsSummary() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-600" />
                        <CardTitle className="text-[clamp(16px,2vw,18px)] font-bold text-black">
                            AI Optimization Score
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-[clamp(36px,5vw,48px)] font-bold text-black mb-2">87%</p>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/60">
                        Your schedule is well optimized
                    </p>
                </CardContent>
            </Card>

            <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <CardTitle className="text-[clamp(16px,2vw,18px)] font-bold text-black">
                            Expected Reach
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-[clamp(36px,5vw,48px)] font-bold text-black mb-2">+32%</p>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/60">
                        Improvement over previous week
                    </p>
                </CardContent>
            </Card>

            <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-600" />
                        <CardTitle className="text-[clamp(16px,2vw,18px)] font-bold text-black">
                            Peak Times Used
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-[clamp(36px,5vw,48px)] font-bold text-black mb-2">3/4</p>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/60">
                        Posts scheduled at optimal times
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
