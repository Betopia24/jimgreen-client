import AnalysisTrends from '@/components/dashboard/dashboard/AnalysisTrends'
import LatestRepostTable from '@/components/dashboard/dashboard/latestRepostTable'
import StatsCards from '@/components/dashboard/dashboard/StatsCards'
import React from 'react'

function Test() {
    return (
        <div>
            {/* card  */}
            <StatsCards />
            {/* chart part  */}
            <AnalysisTrends />
            {/* latest report table  */}
            <LatestRepostTable />
        </div>
    )
}

export default Test