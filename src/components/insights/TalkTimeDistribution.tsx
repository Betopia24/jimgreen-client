"use client"
import { MessageSquare, Check } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function TalkTimeDistribution() {
    const yourTalkTime = 48
    const otherTalkTime = 52

    return (
        <Card className="w-full hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <MessageSquare size={24} className="h-5 w-5 text-[#9810FA]" />
                    <h3 className="text-[#2D2D2D] text-[18px] font-semibold">Talk-Time Distribution</h3>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                {/* Circular Progress Chart */}
                <div className="relative w-64 h-64">
                    {/* Background circle (light gray) */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'conic-gradient(from 0deg, #D1D6DB 0%, #D1D6DB 100%)'
                        }}
                    ></div>

                    {/* Progress circle (purple for "You") */}
                    <div
                        className="absolute inset-0 rounded-full transition-all duration-500"
                        style={{
                            background: `conic-gradient(from 0deg, #6E51E0 0%, #6E51E0 ${yourTalkTime}%, transparent ${yourTalkTime}%, transparent 100%)`
                        }}
                    ></div>

                    {/* Inner white circle */}
                    <div className="absolute inset-12 bg-white rounded-full flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-gray-900">{yourTalkTime}%</span>
                        <span className="text-sm text-gray-600 mt-1">Your Talk Time</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#6E51E0]"></div>
                            <span className="text-[16px] text-[#2D2D2D]">You</span>
                        </div>
                        <span className="text-[16px] font-semibold text-[#0A0A0A]">{yourTalkTime}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#D1D6DB]"></div>
                            <span className="text-[16px] text-[#2D2D2D]">Sarah Miller</span>
                        </div>
                        <span className="text-[16px] font-semibold text-[#0A0A0A]">{otherTalkTime}%</span>
                    </div>
                </div>

                {/* Success Message */}
                <div className="w-full bg-[#34A8531A] rounded-lg p-5">
                    <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                        <p className="text-[16px] text-[#34A853]">
                            Excellent ratio! You listened more than you talked, which is ideal for discovery calls.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}