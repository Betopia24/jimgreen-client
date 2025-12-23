import React from 'react';
import { Briefcase, MapPin, Users } from 'lucide-react';
import { Separator } from "@/components/ui/separator"

export default function FastGrowth() {
  const account = {
    name: 'FastGrowth Inc.',
    initial: 'F',
    industry: 'SaaS',
    location: 'San Francisco',
    employees: 320,
    annualRevenue: '$55M',
    totalMeetings: 7,
    activeOpportunities: 3,
    potentialValue: '$255K',
    stakeholders: [
      {
        id: 1,
        name: 'Sarah Miller',
        initials: 'SM',
        title: 'CMO',
        color: 'bg-[#6E51E0]'
      },
      {
        id: 2,
        name: 'Jason Reed',
        initials: 'JR',
        title: 'VP Sales',
        color: 'bg-[#6E51E0]'
      }
    ]
  };

  return (
    <div className="w-full bg-gray-50 hover:shadow-sm transition-shadow">
      <div className="bg-white rounded-lg border border-[#D1D6DB] hover:shadow-sm transition-shadow">
        {/* Header */}
          <div className="flex items-start gap-4 p-5">
            <div className="bg-[#6E51E0] w-12 h-12 rounded-[10px] flex items-center justify-center text-white font-semibold text-xl">
              {account.initial}
            </div>
            <div className="flex-1">
              <h2 className="text-[#2D2D2D] font-medium text-xl mb-2">
                {account.name}
              </h2>
              <div className="flex items-center gap-3 text-sm text-[#636F85]">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{account.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{account.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{account.employees} employees</span>
                </div>
              </div>
            </div>
          </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 p-5">
          <div>
            <div className="text-[16px] text-[#636F85] mb-1">Annual Revenue</div>
            <div className="text-2xl font-medium text-[#2D2D2D]">{account.annualRevenue}</div>
          </div>
          <div>
            <div className="text-[16px] text-[#636F85] mb-1">Total Meetings</div>
            <div className="text-2xl font-medium text-[#2D2D2D]">{account.totalMeetings}</div>
          </div>
          <div>
            <div className="text-[16px] text-[#636F85] mb-1">Active Opportunities</div>
            <div className="text-2xl font-medium text-[#2D2D2D]">{account.activeOpportunities}</div>
          </div>
          <div>
            <div className="text-[16px] text-[#636F85] mb-1">Potential Value</div>
            <div className="text-2xl font-medium text-[#2D2D2D]">{account.potentialValue}</div>
          </div>
        </div>

        <Separator className='bg-[#D1D6DB] mx-5'/>

        {/* Key Stakeholders */}
        <div className="p-6">
          <h3 className="text-[16px] font-medium text-[#636F85] mb-4">Key Stakeholders</h3>
          <div className="flex items-center gap-6">
            {account.stakeholders.map((stakeholder) => (
              <div key={stakeholder.id} className="flex items-center gap-3">
                <div className={`${stakeholder.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-[16px]`}>
                  {stakeholder.initials}
                </div>
                <div>
                  <div className="text[16px] font-medium text-[#101010]">
                    {stakeholder.name}
                  </div>
                  <div className="text-sm text-[#636F85]">
                    {stakeholder.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}