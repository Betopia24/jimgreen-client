import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';

export default function RisksOpportunities() {
  const risks = [
    {
      title: 'Timeline Pressure',
      description: 'Aggressive Q1 deadline may be challenging. Need to confirm implementation resources availability.'
    },
    {
      title: 'Multiple Stakeholders',
      description: 'VP of Operations not yet involved. May introduce new requirements or objections.'
    },
    {
      title: 'Budget Clarity',
      description: "While $150K is allocated, exact pricing tier hasn't been discussed yet."
    }
  ];

  const opportunities = [
    {
      title: 'Strong Pain Point',
      description: '15 hours/week wasted on manual reporting is a clear, quantifiable problem we can solve.'
    },
    {
      title: 'Decision Authority',
      description: 'Sarah Miller has budget approval authority. Can move quickly if demo is successful.'
    },
    {
      title: 'Expansion Potential',
      description: 'Company is scaling rapidly. Could expand to other departments after initial success.'
    }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risks Section */}
        <div className="bg-white rounded-xl border border-[#FF4D4F4D] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-6 h-6 text-[#FF4D4F]" />
            <h2 className="text-2xl font-medium text-[#FF4D4F]">
              Risks Identified
            </h2>
          </div>
          <div className="space-y-4">
            {risks.map((risk, index) => (
              <div
                key={index}
                className="border-l-4 border-[#FF4D4F] bg-[#FF4D4F0F] p-4 rounded-lg"
              >
                <h3 className="font-semibold text-[#2D2D2D] text-[16px] mb-1">
                  {risk.title}
                </h3>
                <p className="text-sm text-[#2D2D2D]">
                  {risk.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities Section */}
        <div className="bg-white rounded-xl border border-[#34A8534D] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-6 h-6 text-[#34A853]" />
            <h2 className="text-2xl font-medium text-[#34A853]">
              Opportunities
            </h2>
          </div>
          <div className="space-y-4">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="border-l-4 border-[#34A853] bg-[#34A85314] p-4 rounded-lg"
              >
                <h3 className="font-semibold text-[#2D2D2D] text-[16px] mb-1">
                  {opportunity.title}
                </h3>
                <p className="text-sm text-[#2D2D2D]">
                  {opportunity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}