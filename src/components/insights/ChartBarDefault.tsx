"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { time: "0m", value: 120, sentiment: "negative" },
    { time: "5m", value: 150, sentiment: "negative" },
    { time: "10m", value: 140, sentiment: "negative" },
    { time: "15m", value: 100, sentiment: "neutral" },
    { time: "20m", value: 160, sentiment: "neutral" },
    { time: "25m", value: 185, sentiment: "neutral", highlight: true },
    { time: "30m", value: 170, sentiment: "neutral" },
    { time: "35m", value: 90, sentiment: "positive" },
    { time: "40m", value: 180, sentiment: "positive" },
]

const chartConfig = {
    value: {
        label: "Sentiment",
    },
} satisfies ChartConfig

export default function SentimentAnalysis() {
    return (
        <div>
            {/* bar chart */}
            <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <TrendingUp className="h-6 w-6 text-[#00A63E]" />
                        <h3 className="text-[18px] font-semibold text-[#2D2D2D]">Sentiment Analysis</h3>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <defs>
                                <linearGradient id="sentimentGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#4A6CF7" />
                                    <stop offset="100%" stopColor="#8EC5FF" />
                                </linearGradient>
                            </defs>
                            {/* <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" /> */}
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs font-semibold">{data.time}</span>
                                                    <span className="text-sm font-bold text-[#4A6CF7]">
                                                        {data.value}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill="url(#sentimentGradient)"
                                        opacity={entry.highlight ? 1 : 0.85}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>

                    <div className="mt-6 flex items-center justify-between text-sm px-2">
                        <span className="font-medium text-[16px] text-[#2D2D2D]">Negative</span>
                        <span className="font-medium text-[16px] text-[#2D2D2D]">Neutral</span>
                        <span className="font-medium text-[16px] text-[#34A853]">Positive</span>
                    </div>

                    <CardDescription className="mt-10 text-center text-[#636F85] text-[16px]">
                        Overall sentiment improved throughout the meeting, with peak positivity at the 30-minute mark.
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}