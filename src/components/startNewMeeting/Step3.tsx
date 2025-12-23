
import React, { useState } from 'react';
import StepTitle from './stepTitle';

export default function Step3() {
  const [companyUrl, setCompanyUrl] = useState('https://fastgrowth.com');

  return (
    <div className="p-6 bg-white rounded-lg border border-[#D1D6DB]">
      {/* Header */}
      <div className="space-y-2">
        {/* header  */}
        <StepTitle title="Company Information" subtitle="Provide details about the target company" />
      </div>

      {/* Company URL */}
      <div className="mb-6">
        <label className="block text-[16px] font-medium text-[#2D2D2D] mb-2">
          Company URL
        </label>
        <input
          type="text"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
          className="w-full px-4 py-2 text-[#636F85] text-sm border border-[#D1D6DB] rounded-lg focus:ring-2 focus:ring-[#6E51E0] focus:border-transparent outline-none"
          placeholder="https://"
        />
      </div>

      {/* Company Size and Headquarters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F9FAFB] border border-[#D1D6DB] rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="text-sm text-[#636F85] mb-1.2">Company Size</div>
          <div className="text-xl font-semibold text-[#2D2D2D]">320 Employees</div>
        </div>
        <div className="bg-[#F9FAFB] border border-[#D1D6DB] rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="text-sm text-[#636F85] mb-1.2">Headquarters</div>
          <div className="text-xl font-semibold text-[#2D2D2D]">San Francisco</div>
        </div>
        {/* Revenue and Industry */}
        <div className="bg-[#F9FAFB] border border-[#D1D6DB] rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="text-sm text-[#636F85] mb-1.2">Revenue</div>
          <div className="text-xl font-semibold text-[#2D2D2D]">$55M</div>
        </div>
        <div className="bg-[#F9FAFB] border border-[#D1D6DB] rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="text-sm text-[#636F85] mb-1.2">Industry</div>
          <div className="text-xl font-semibold text-[#2D2D2D]">SaaS</div>
        </div>
      </div>
      {/* Tech Stack */}
      <div className="mb-6">
        <div className="text-sm font-medium text-[#2D2D2D] mb-3">Wappalyzer Tech Stack</div>
        <div className="flex flex-wrap gap-2">
          {['HubSpot', 'Salesforce', 'Snowflake', 'Slack', 'Zoom', 'React', 'AWS', 'Google Analytics'].map((tech) => (
            <span
              key={tech}
              className="px-6 py-2 bg-[#F3F4F6] text-[#2D2D2D] text-[16px] rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hiring Data and Customer Reviews */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#B9F8CF33] border border-[#B9F8CF] rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="text-xl font-semibold text-[#2D2D2D] mb-1">
            💼 Hiring Data
          </div>
          <div className="text-sm text-[#636F85]">
            45 open positions • Growing sales & engineering teams
          </div>
        </div>
        <div className="bg-[#E9D4FF33] border border-[#E9D4FF] rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="text-xl font-semibold text-[#2D2D2D] mb-1">
            ⭐ Customer Reviews
          </div>
          <div className="text-sm text-[#636F85]">
            4.5/5 on G2 • 328 reviews • "Great for scaling teams"
          </div>
        </div>
      </div>

      {/* Latest News */}
      <div className="mb-6">
        <div className="text-sm font-medium text-[#2D2D2D] mb-3">Latest News</div>
        <div className="bg-[#6E51E00D] border border-[#6E51E01A] rounded-lg p-4 hover:shadow-sm transition-shadow">
          <p className="text-sm text-[#2D2D2D]">
            FastGrowth Inc. announces Series B funding of $25M led by Sequoia Capital
          </p>
        </div>
      </div>

      {/* Financial Statements and Product Documentation */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#FFD6A733] border border-[#FFD6A7] rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="text-xl font-semibold text-[#2D2D2D] mb-1">
            📊 Financial Statements
          </div>
          <div className="text-[16px] text-[#636F85]">
            YoY Growth: 85% • ARR: $42M • Burn Rate: Positive
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="text-xl font-semibold text-[#2D2D2D] mb-1">
            📄 Product Documentation
          </div>
          <div className="text-[16px] text-[#636F85]">
            API docs available • Integration guides • Video tutorials
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* <div className="flex justify-between">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          Back
        </button>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
          Next Step
        </button>
      </div> */}
    </div>
  );
}