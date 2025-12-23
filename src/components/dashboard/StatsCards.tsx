import React from 'react';
import { BarChart3, Target, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';

export default function StatsCards() {
    const stats = [
        {
            id: 1,
            title: 'Total Meetings',
            value: '18',
            subtitle: 'This month',
            icon: BarChart3,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            subtitleColor: 'text-[#34A853]',
        },
        {
            id: 2,
            title: 'People Met',
            value: '42',
            subtitle: 'This month',
            icon: Target,
            iconBg: 'bg-green-50',
            iconColor: 'text-green-600',
            subtitleColor: 'text-[#34A853]',
        },
        {
            id: 3,
            title: 'Success Rate',
            value: '72%',
            subtitle: '5% from last month',
            icon: CheckCircle,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            subtitleColor: 'text-[#34A853]',
        },
        {
            id: 4,
            title: 'Talk-to-Listen Ratio',
            value: '48/52',
            subtitle: 'Ideal range',
            icon: MessageSquare,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            subtitleColor: 'text-[#34A853]',
        },
        {
            id: 5,
            title: 'Everage Preparation Time',
            value: '84',
            subtitle: 'Score out of 100',
            icon: TrendingUp,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            subtitleColor: 'text-[#34A853]',
        },
    ];


    return (
        <div className="w-full py-6 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.id}
                            className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-xs font-medium text-gray-600 mb-2">
                                        {stat.title}
                                    </h3>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`${stat.iconBg} p-2 rounded-lg`}>
                                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                                </div>
                            </div>
                            <p className={`text-xs ${stat.subtitleColor || 'text-gray-500'}`}>
                                {stat.subtitle}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}