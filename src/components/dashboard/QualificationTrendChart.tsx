"use client"
// import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function QualificationTrendChart() {
    // const [tooltipData, setTooltipData] = useState(null);

    const data = [
        { month: 'Jan', value: 22, totalMeetings: 18, minutesSpent: 380 },
        { month: 'Feb', value: 30, totalMeetings: 22, minutesSpent: 460 },
        { month: 'Mar', value: 23, totalMeetings: 25, minutesSpent: 430 },
        { month: 'Apr', value: 35, totalMeetings: 30, minutesSpent: 490 },
        { month: 'May', value: 20, totalMeetings: 32, minutesSpent: 510 },
        { month: 'Jun', value: 33, totalMeetings: 24, minutesSpent: 420 },
        { month: 'Jun', value: 18, totalMeetings: 17, minutesSpent: 350 }
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{payload[0].payload.month}</p>
                    <p className="text-xs text-gray-600">Total Meeting: {payload[0].payload.totalMeetings}</p>
                    <p className="text-xs text-gray-600">Minutes Spent: {payload[0].payload.minutesSpent} Min</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full p-6 bg-white rounded-lg">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Qualification Trend
                </h2>
                <p className="text-sm text-gray-600">
                    Performance over the last 6 months
                </p>
            </div>

            {/* Chart */}
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.05}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
                        <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            domain={[0, 40]}
                            ticks={[0, 10, 20, 30, 40]}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#14b8a6', strokeWidth: 1, strokeDasharray: '5 5' }} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#14b8a6"
                            strokeWidth={2.5}
                            fill="url(#colorValue)"
                            dot={false}
                            activeDot={{ r: 6, fill: '#14b8a6', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}