import React from 'react';
import { Target, Lightbulb, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function InsightsCard() {
    const stats = [
        {
            icon: Target,
            iconBg: 'bg-[#155DFC1A]',
            iconColor: 'text-[#155DFC]',
            title: 'Questions Asked',
            value: '18',
            subtitle: 'Above average for discovery calls'
        },
        {
            icon: Lightbulb,
            iconBg: 'bg-[#34A8531A]',
            iconColor: 'text-[#00A63E]',
            title: 'Open Questions',
            value: '14/18',
            subtitle: '77% open-ended questions'
        },
        {
            icon: MessageSquare,
            iconBg: 'bg-[#9810FA1A]',
            iconColor: 'text-[#9810FA]',
            title: 'Active Listening',
            value: 'A+',
            subtitle: 'Excellent paraphrasing and clarification'
        }
    ];

    return (
        <div>
            <Link href='/dashboard/home/questionsAsk'>
                <div className="flex gap-4 p-6 cursor-pointer">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="flex-1 bg-white rounded-lg p-5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-[18px]">
                                    <div className={`${stat.iconBg} p-3 rounded-[10px]`}>
                                        <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[#636F85] font-medium text-[16px] mb-2">
                                            {stat.title}
                                        </h3>
                                        <p className="text-3xl font-medium text-[#2D2D2D] mb-1">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-[#636F85] text-left">
                                    {stat.subtitle}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Link>
        </div>
    );
}