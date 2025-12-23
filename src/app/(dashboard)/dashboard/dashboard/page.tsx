import QualificationTrendChart from '@/components/dashboard/QualificationTrendChart'
import StatsCards from '@/components/dashboard/StatsCards'
import TalkRatioChart from '@/components/dashboard/TalkRatioChart '
import HomeAiInsights from '@/components/home/HomeAiInsights'
import React from 'react'

function Dashboard() {
  return (
    <div>
      <StatsCards/>
      <div className='lg:flex items-center justify-between gap-6'>
        {/* chart part  */}
       <div className='flex-1'>
         <QualificationTrendChart/>
       </div>
        {/* progress part  */}
        <div className='flex-1'>
          <TalkRatioChart />
        </div>
      </div>
      <div className='my-6'>
        <HomeAiInsights/>
      </div>
    </div>
  )
}

export default Dashboard