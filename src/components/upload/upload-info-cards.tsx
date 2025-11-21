import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function UploadInfoCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader>
                    <CardTitle className="text-[clamp(16px,2vw,18px)] font-bold text-black">
                        1. Export from Asana
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/60">
                        Go to your Asana project and export tasks as CSV or JSON
                    </p>
                </CardContent>
            </Card>

            <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader>
                    <CardTitle className="text-[clamp(16px,2vw,18px)] font-bold text-black">
                        2. Upload Here
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/60">
                        Drag and drop or select your file to upload
                    </p>
                </CardContent>
            </Card>

            <Card className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardHeader>
                    <CardTitle className="text-[clamp(16px,2vw,18px)] font-bold text-black">
                        3. Review Schedule
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[clamp(14px,1.5vw,16px)] text-black/60">
                        Get AI recommendations and optimize your posting schedule
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
