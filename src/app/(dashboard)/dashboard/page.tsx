"use client";
import AnalysisTrends from "@/components/dashboard/dashboard/AnalysisTrends";
import LatestReportTable from "@/components/dashboard/dashboard/latestRepostTable";

import StatsCards from "@/components/dashboard/dashboard/StatsCards";

import LoadingPage2 from "@/components/shared/loading/LoadingPage2";
import { useGetHomeOverviewQuery } from "@/redux/api/home/homeSlicsApi";

function Dashboard() {
  const { data: statsData, isLoading } = useGetHomeOverviewQuery("");

  if (isLoading) {
    return <LoadingPage2 />;
  }

  return (
    <div>
      {/* card  */}
      <StatsCards />
      {/* chart part  */}
      <AnalysisTrends />
      {/* latest report table  */}
      <LatestReportTable />
    </div>
  );
}

export default Dashboard;
