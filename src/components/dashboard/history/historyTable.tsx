// "use client";

// import React, { useState, useMemo } from "react";
// import { Search, Eye, ChevronLeft, ChevronRight, Filter } from "lucide-react";
// import { IoIosGitCompare } from "react-icons/io";
// import Link from "next/link";
// import { useGetReportHistoryQuery } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
// import Loading from "@/components/Others/Loading";
// import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
// import { User } from "@/app/(dashboard)/dashboard/rowMeterials/addRowMeterials/page";
// import { format } from "date-fns";
// import Pagination from "@/components/shared/pagination/Pagination";

// export default function HistoryTable() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const trimmedSearchTerm = searchTerm.trim().toLowerCase();
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data: userData } = useGetMeProfileQuery("");
//   const profile = userData?.data as User;
//   const companyId = profile?.companyMember?.company.id;
//   // console.log("companyId==============", companyId);

//   const { data: reportHistoryData, isLoading } = useGetReportHistoryQuery(
//     {
//       companyId: companyId,
//       searchTerm: trimmedSearchTerm,
//       page: currentPage,
//       limit: 10,
//     },
//     {
//       skip: !companyId,
//     },
//   );

//   // console.log("reportHistoryData", reportHistoryData?.data.length);

//   const getRiskBadgeColor = (rating: string) => {
//     switch (rating) {
//       case "low":
//         return "bg-green-100 text-green-800";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800";
//       case "high":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (isLoading) {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 py-6">
//       <div className="bg-white rounded-xl hover:shadow-sm p-4 sm:p-6 mb-6">
//         <div className="flex flex-col md:flex-row lg:items-center lg:justify-between gap-4">
//           {/* Search Input */}
//           <div className="relative w-full lg:w-0 lg:flex-1">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B4B4B4] w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by ID, customer, or sample..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//               }}
//               className="w-full pl-11 pr-4 py-3 border border-[#F3F3F3] rounded-lg text-sm text-[#191919] placeholder-[#B4B4B4] bg-[#F3F3F3] focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Action Buttons */}
//           {/* <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//                         <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#F3F3F3] rounded-lg text-sm font-medium text-[#191919] bg-[#F3F3F3] w-full sm:w-auto">
//                             <Filter className="w-4 h-4" />
//                             Filter
//                         </button>

//                         <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#F3F3F3] rounded-lg text-sm font-medium text-[#191919] bg-[#F3F3F3] transition w-full sm:w-auto">
//                             <IoIosGitCompare size={22} />
//                             Compare Reports
//                         </button>
//                     </div> */}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl hover:shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[800px]">
//             <thead>
//               <tr className="bg-[#F3F3F3] border-b border-gray-200">
//                 <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">
//                   Report ID
//                 </th>
//                 <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">
//                   Customer Name
//                 </th>
//                 <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">
//                   Date
//                 </th>
//                 <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">
//                   Score
//                 </th>
//                 <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">
//                   Rating
//                 </th>
//                 <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportHistoryData?.data?.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="py-12 text-center text-gray-500">
//                     No reports found matching your search.
//                   </td>
//                 </tr>
//               ) : (
//                 reportHistoryData?.data?.map((report: any, index: number) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="py-4 px-6 text-sm font-medium text-blue-600">
//                       {report?.report_id}
//                     </td>
//                     <td className="py-4 px-6 text-sm text-gray-900 font-medium">
//                       {report?.customerName}
//                     </td>
//                     <td className="py-4 px-6 text-sm text-gray-600">
//                       {report?.createdAt &&
//                         format(
//                           new Date(report.createdAt),
//                           "dd MMM yyyy, hh:mm a",
//                         )}
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="flex items-center gap-3">
//                         <span className="text-sm font-semibold text-gray-900">
//                           {report?.total_score?.overall_score}
//                         </span>
//                         {/* <span
//                                                     className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(
//                                                         report.risk
//                                                     )}`}
//                                                 >
//                                                     {report.risk}
//                                                 </span> */}
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 text-sm text-gray-600">
//                       {report?.total_score?.rating}
//                     </td>
//                     <td className="py-4 px-6">
//                       <Link href={`/dashboard/history/${report?.id}`}>
//                         <button className="text-[#004AAD] transition-colors cursor-pointer">
//                           <Eye className="w-5 h-5" />
//                         </button>
//                       </Link>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {/* Pagination - Always show if there are multiple pages */}
//         <div className="px-6 border-t flex justify-between items-center py-3">
//           <div className="text-sm text-gray-600">
//             Showing {reportHistoryData?.data.length} of{" "}
//             {reportHistoryData?.total_items} reports
//           </div>

//           <Pagination
//             currentPage={currentPage}
//             totalPages={reportHistoryData?.total_pages}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Search, Eye } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

// ─── RTK Query imports (replace paths to match your project) ──────────────────
import { useGetReportHistoryQuery } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import Loading from "@/components/Others/Loading";
import Pagination from "@/components/shared/pagination/Pagination";

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  companyMember?: {
    company: {
      id: string;
    };
  };
}

interface Report {
  id: string;
  report_id: string;
  customerName: string;
  createdAt: string;
  total_score?: {
    overall_score: number | string;
    rating: string;
  };
}

interface ReportHistoryResponse {
  data: Report[];
  total_items: number;
  total_pages: number;
}

// ─── Rating Badge ─────────────────────────────────────────────────────────────

function RatingBadge({ rating }: { rating?: string }) {
  if (!rating) return <span className="text-gray-400 text-sm">—</span>;

  const normalized = rating.toLowerCase();
  const colorMap: Record<string, string> = {
    low: "bg-green-100 text-green-700 border border-green-200",
    medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    high: "bg-red-100 text-red-700 border border-red-200",
    excellent: "bg-blue-100 text-blue-700 border border-blue-200",
    good: "bg-green-100 text-green-700 border border-green-200",
    poor: "bg-red-100 text-red-700 border border-red-200",
  };

  const colorClass =
    colorMap[normalized] ?? "bg-gray-100 text-gray-700 border border-gray-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass}`}
    >
      {rating}
    </span>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <tr>
      <td colSpan={6} className="py-16 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-700">
            {hasSearch ? "No reports found" : "No reports yet"}
          </p>
          <p className="text-xs text-gray-400">
            {hasSearch
              ? "Try adjusting your search term"
              : "Reports will appear here once generated"}
          </p>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HistoryTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Trim search only for API call, keep raw value for input
  const trimmedSearch = searchTerm.trim().toLowerCase();

  // ── Auth / profile ──────────────────────────────────────────────────────────
  const { data: userData, isLoading: isProfileLoading } =
    useGetMeProfileQuery("");
  const profile = userData?.data as User | undefined;
  const companyId = profile?.companyMember?.company?.id;

  // ── Report history query ────────────────────────────────────────────────────
  const {
    data: reportHistoryData,
    isLoading: isReportsLoading,
    isFetching,
    isError,
  } = useGetReportHistoryQuery(
    {
      companyId: companyId as string,
      ...(trimmedSearch && { searchTerm: trimmedSearch }),
      page: currentPage,
      limit: 10,
    },
    {
      skip: !companyId,
    },
  ) as {
    data: ReportHistoryResponse | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
  };

  // Reset to page 1 when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // ── Loading state ───────────────────────────────────────────────────────────
  if (isProfileLoading || (isReportsLoading && !reportHistoryData)) {
    return <Loading />;
  }

  // ── Error state ─────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="bg-gray-50 py-6">
        <div className="bg-white rounded-xl border border-red-100 p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-800">
            Failed to load reports
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Please refresh the page or try again later.
          </p>
        </div>
      </div>
    );
  }

  const reports = reportHistoryData?.data ?? [];
  const totalItems = reportHistoryData?.total_items ?? 0;
  const totalPages = reportHistoryData?.total_pages ?? 1;

  return (
    <div className="bg-gray-50 py-6">
      {/* ── Search Bar ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-5">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by ID, customer, or sample..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div
        className={`bg-white rounded-xl border border-gray-200 overflow-hidden transition-opacity duration-200 ${
          isFetching ? "opacity-60" : "opacity-100"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {[
                  "Report ID",
                  "Customer Name",
                  "Date",
                  "Score",
                  "Rating",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {reports.length === 0 ? (
                <EmptyState hasSearch={trimmedSearch.length > 0} />
              ) : (
                reports.map((report: Report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {/* Report ID */}
                    <td className="py-4 px-6 text-sm font-semibold text-blue-600">
                      {report?.report_id ?? "—"}
                    </td>

                    {/* Customer Name */}
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {report?.customerName ?? "—"}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {report?.createdAt
                        ? format(
                            new Date(report.createdAt),
                            "dd MMM yyyy, hh:mm a",
                          )
                        : "—"}
                    </td>

                    {/* Score */}
                    <td className="py-4 px-6">
                      <span className="text-sm font-semibold text-gray-900">
                        {report?.total_score?.overall_score ?? "—"}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-6">
                      <RatingBadge rating={report?.total_score?.rating} />
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6">
                      <Link href={`/dashboard/history/${report?.id}`}>
                        <button
                          title="View report"
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4.5 h-4.5" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Footer / Pagination ── */}
        {totalItems > 0 && (
          <div className="px-6 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">
                {Math.min((currentPage - 1) * 10 + 1, totalItems)}–
                {Math.min(currentPage * 10, totalItems)}
              </span>{" "}
              of <span className="font-medium text-gray-700">{totalItems}</span>{" "}
              reports
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
