import React from 'react';

export default function TopicsDiscussed() {
  const topics = [
    'Budget Authority',
    'Implementation Timeline',
    'Current Pain Points',
    'Integration Requirements',
    'Decision Process',
    'ROI Expectations',
    'Stakeholder Mapping',
    'Competition'
  ];

  return (
    <div className="px-6">
      <div className="bg-white rounded-xl border border-[#D1D6DB] p-6 hover:shadow-sm">
        <h2 className="text-2xl font-medium text-[#2D2D2D] mb-3">
          Topics Discussed
        </h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-2.5 bg-[#F3F4F6] text-[#2D2D2D] text-[16px] rounded-lg"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}