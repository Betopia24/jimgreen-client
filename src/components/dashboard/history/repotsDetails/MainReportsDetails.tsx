"use client";
import { useGetReportHistorySignleQuery } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
// import ReportsDetailsOne from "./ReportsDetailsOne";
// import TrendAnalysisDashboard from "./ReportsDetailsTow";
import Loading from "@/components/Others/Loading";
import ShowAllReportDetailsData from "./ShowAllReportDetailsData";

const MainReportsDetails = ({ historyId }: { historyId: string }) => {
  // console.log("historyid==============", historyId);
  const { data: reportDetailsData, isLoading } = useGetReportHistorySignleQuery(historyId);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <div>
      {/* <ReportsDetailsOne />
      <TrendAnalysisDashboard /> */}
      <ShowAllReportDetailsData reportDetailsData={reportDetailsData}/>
    </div>
  );
};

export default MainReportsDetails;
