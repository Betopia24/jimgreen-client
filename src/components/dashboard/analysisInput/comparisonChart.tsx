

'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { MessageSquare } from 'lucide-react';

export default function ComparisonChart() {
    const [prompt, setPrompt] = useState('');

    const data = [
        { name: 'pH', value: 35, status: 'warning' },
        { name: 'Cl₂', value: 25, status: 'optimal' },
        { name: 'Alkalinity', value: 105, status: 'optimal' },
        { name: 'Hardness', value: 165, status: 'good' },
        { name: 'TDS', value: 420, status: 'critical' },
        { name: 'Fe', value: 180, status: 'optimal' },
        { name: 'M', value: 140, status: 'warning' },
        { name: 'Cu', value: 55, status: 'good' },
    ];

    const getColor = (status: string) => {
        switch (status) {
            case 'optimal':
                return '#10b981'; // green
            case 'good':
                return '#06b6d4'; // cyan
            case 'warning':
                return '#f59e0b'; // orange/yellow
            case 'critical':
                return '#ec4899'; // pink/red
            default:
                return '#6b7280'; // gray
        }
    };

    return (
        <div className=" bg-gray-50 pb-6">
            <div className="bg-white rounded-2xl hover:shadow-sm p-8 border border-gray-200">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <h2 className="text-3xl font-medium text-headingColor">
                        Parameter Comparison
                    </h2>

                    {/* Prompt Input */}
                    <div className="relative">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="write your prompt which graph you want"
                            className="w-[389px] h-[65px] p-2.5 bg-[#F3F3F3] rounded-lg text-sm placeholder-[#666666] focus:outline-none"
                        />
                    </div>
                </div>

                {/* Chart */}
                <div className="relative">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 13 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                ticks={[0, 150, 300, 450, 600]}
                                dx={-10}
                            />
                            <Bar
                                dataKey="value"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={60}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                    {/* Floating Button */}
                    <button className="absolute bottom-6 right-6 w-12 h-12 bg-green-600 hover:bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#009D34]"></div>
                        <span className="text-sm text-[#666666]">Optimal</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#00D4FF]"></div>
                        <span className="text-sm text-[#666666]">Good</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#FFB800]"></div>
                        <span className="text-sm text-[#666666]">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#FF3366]"></div>
                        <span className="text-sm text-[#666666]">Critical</span>
                    </div>
                </div>
            </div>
        </div>
    );
}