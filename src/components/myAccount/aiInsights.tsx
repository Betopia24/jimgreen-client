import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';
import { Separator } from "@/components/ui/separator"

export default function AIInsights() {
    const engagementScore = 92;
    const sentimentTrend = [65, 70, 75, 82, 88];

    const riskAlerts1 = [
        {
            id: 1,
            type: 'warning',
            message: 'Decision timeline may slip - VP Ops not yet engaged'
        },
        {
            id: 2,
            type: 'success',
            message: 'Budget authority confirmed'
        }
    ];

    const riskAlerts2 = [
        {
            id: 1,
            type: 'warning',
            message: 'Decision timeline may slip - VP Ops not yet engaged'
        },
        {
            id: 2,
            type: 'success',
            message: 'Budget authority confirmed'
        }
    ];

    const upsellOpportunities = [
        {
            id: 1,
            title: 'Advanced Analytics Module',
            description: 'Based on reporting pain points mentioned in last call'
        },
        {
            id: 2,
            title: 'API Integration Package',
            description: 'Strong tech stack integration needs'
        }
    ];

    return (
        <div className="w-full max-w-md mx-auto py-6 bg-white">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#2D2D2D] flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-[#6E51E0]" />
                    AI Insights
                </h2>
            </div>

            {/* Average Engagement Score */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[16px] text-[#636F85]">Average Engagement Score</span>
                    <span className="text-sm text-[#2D2D2D]">{engagementScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                        className="bg-[#101010] h-full rounded-full"
                        style={{ width: `${engagementScore}%` }}
                    />
                </div>
                <p className="text-sm text-[#34A853]">Excellent - Highly Engaged</p>
                <Separator className='bg-[#D1D6DB] my-2' />
            </div>

            {/* Sentiment Trend */}
            <div className="mb-6">
                <h3 className="text-[16px] text-[#2D2D2D] mb-3">Sentiment Trend</h3>
                <div className="flex items-end gap-2 h-24 mb-2">
                    {sentimentTrend.map((value, index) => (
                        <div
                            key={index}
                            className="flex-1 bg-gradient-to-t from-[#6E51E0] to-[#D4C9FF] rounded-t"
                            style={{ height: `${value}%` }}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-[#4A5565]">
                    <TrendingUp className="w-3 h-3" />
                    <span>Improving over last 5 interactions</span>
                </div>
            </div>

            {/* Risk Alerts - Platform 1 */}
            <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2D2D2D] mb-3">
                    Risk Alerts For Enterprise CRM Platform 1
                </h3>
                <div className="space-y-2">
                    {riskAlerts1.map((alert) => (
                        <div
                            key={alert.id}
                            className={`flex items-start gap-2 p-3 rounded-lg ${
                                alert.type === 'warning' 
                                    ? 'bg-yellow-50' 
                                    : 'bg-green-50'
                            }`}
                        >
                            {alert.type === 'warning' ? (
                                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            ) : (
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            )}
                            <span className="text-sm text-gray-700">{alert.message}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Risk Alerts - Platform 2 */}
            <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-[#2D2D2D] mb-3">
                    Risk Alerts For Enterprise CRM Platform 2
                </h3>
                <div className="space-y-2">
                    {riskAlerts2.map((alert) => (
                        <div
                            key={alert.id}
                            className={`flex items-start gap-2 p-3 rounded-lg ${
                                alert.type === 'warning' 
                                    ? 'bg-yellow-50' 
                                    : 'bg-green-50'
                            }`}
                        >
                            {alert.type === 'warning' ? (
                                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            ) : (
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            )}
                            <span className="text-sm text-gray-700">{alert.message}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upsell Opportunities */}
            <div>
                <h3 className="text-[16px] font-semibold text-[#2D2D2D] mb-3">Upsell Opportunities</h3>
                <div className="space-y-3">
                    {upsellOpportunities.map((opportunity) => (
                        <div
                            key={opportunity.id}
                            className="bg-purple-50 p-4 rounded-lg"
                        >
                            <div className="flex items-start gap-2">
                                <DollarSign className="w-4 h-4 text-[#6E51E0] mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="text-[16px] font-semibold text-[#2D2D2D] mb-1">
                                        {opportunity.title}
                                    </h4>
                                    <p className="text-sm text-[#636F85]">
                                        {opportunity.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}