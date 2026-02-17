"use client";
import AnalysisTrends from "@/components/dashboard/dashboard/AnalysisTrends";
import LatestRepostTable from "@/components/dashboard/dashboard/latestRepostTable";
import StatsCards from "@/components/dashboard/dashboard/StatsCards";
import LoadingPage from "@/components/shared/loading/LoadingPage2";
import { useGetHomeOverviewQuery } from "@/redux/api/home/homeSlicsApi";

function Dashboard() {
  const { data, isLoading } = useGetHomeOverviewQuery("");

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div>
      {/* card  */}
      <StatsCards />
      {/* chart part  */}
      <AnalysisTrends />
      {/* latest report table  */}
      <LatestRepostTable />
    </div>
  );
}

export default Dashboard;
