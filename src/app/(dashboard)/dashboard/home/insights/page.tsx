import ChartBarDefault from '@/components/insights/ChartBarDefault';
import InsightsCard from '@/components/insights/insightsCard';
import RisksOpportunities from '@/components/insights/RisksOpportunities';
import TalkTimeDistribution from '@/components/insights/TalkTimeDistribution';
import TopicsDiscussed from '@/components/insights/topicDiscus';
import { Award, BarChart3, Play } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import { GoArrowLeft } from 'react-icons/go'

function Insights() {
  const score = 78;
  const maxScore = 100;
  const percentage = (score / maxScore) * 100;
  // Calculate the stroke dasharray for the circular progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div>
      {/* title part  */}
      <div className="bg-white border border-[#6E51E0] rounded-[12px] p-6 my-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <Link href="/dashboard/home" className="flex-1">
            <h3 className='flex items-center gap-2 text-[16px] text-[#2D2D2D]'><GoArrowLeft /> Back to Dashboard</h3>
          </Link>
          <div className="ml-6">
            <div className="bg-[#6E51E0]/10 text-[#6E51E0] p-3 rounded-[8px] font-medium text-sm whitespace-nowrap">
              Overall Score: 78/100
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-medium text-[#2D2D2D] mb-4">
            Discovery Call with CMO
          </h1>
          <p className='text-[#4A5565] text-[16px]'>FastGrowth Inc. • Jan 23 • 42 minutes</p>
        </div>
      </div>
      {/* engagement score part  */}
      <div className="w-full">
        <div className="bg-white rounded-xl border border-[#6E51E0] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-[#2D2D2D] text-2xl font-medium mb-2">
                Engagement Score
              </h2>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-medium text-[#0A0A0A]">
                  {score}
                </span>
                <span className="text-xl text-[#636F85] font-medium">
                  /{maxScore}
                </span>
              </div>
              <p className="text-sm text-[#636F85] mt-3">
                This meeting scored above average compared to your previous sessions
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <svg className="transform -rotate-90" width="100" height="100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#6E51E0"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Award icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Award size={40} className='text-[#6E51E0]' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chart part  */}
      <div className="lg:flex items-center gap-6 py-6">
        <div className="w-full lg:w-1/2">
          <ChartBarDefault />
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <TalkTimeDistribution />
        </div>
      </div>
      <InsightsCard />
      <TopicsDiscussed />
      <RisksOpportunities />
      {/* button part  */}
      <div className="flex gap-6 mb-6 px-6">
        <button className="flex-1 bg-white border border-[#D1D6DB] hover:border-[#6E51E0] text-[#0A0A0A] text-[16px] font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <Play className="w-5 h-5" />
          Watch Replay
        </button>
        {/* <button className="flex-1 bg-white border border-[#D1D6DB] hover:border-[#6E51E0] text-[#0A0A0A] text-[16px] font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
          <BarChart3 className="w-5 h-5" />
          View Insights
        </button> */}
      </div>
    </div>
  )
}

export default Insights