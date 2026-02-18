// 'use client';

// import React from 'react';
// import { Clock } from 'lucide-react';
// import Link from 'next/link';

// export default function LatestRepostTable() {
//     const reports = [
//         {
//             id: 'RPT-1247',
//             client: 'Riverside Municipal',
//             date: '2 hours ago',
//             phLevel: '7.4',
//             status: 'Good',
//             statusColor: 'bg-[#DCFCE7] text-[#008236]',
//         },
//         {
//             id: 'RPT-1247',
//             client: 'Industrial Corp',
//             date: '2 hours ago',
//             phLevel: '8.2',
//             status: 'Warning',
//             statusColor: 'bg-[#FEF9C2] text-[#A65F00]',
//         },
//         {
//             id: 'RPT-1247',
//             client: 'City Pool Services',
//             date: '2 hours ago',
//             phLevel: '7.6',
//             status: 'Good',
//             statusColor: 'bg-[#DCFCE7] text-[#008236]',
//         },
//         {
//             id: 'RPT-1247',
//             client: 'Residential B',
//             date: '2 hours ago',
//             phLevel: '9.1',
//             status: 'Critical',
//             statusColor: 'bg-[#FFE2E2] text-[#C10007]',
//         },
//     ];

//     return (
//         <div className="w-full bg-gray-50 pb-6">
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//                 <div className="p-6 border-b border-gray-200">
//                     <h2 className="text-2xl md:text-3xl font-medium text-[#101828]">Latest Reports</h2>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="bg-[#F3F4F6] border-b border-gray-200">
//                                 <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
//                                     Report ID
//                                 </th>
//                                 <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
//                                     Client
//                                 </th>
//                                 <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
//                                     Date
//                                 </th>
//                                 <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
//                                     pH Level
//                                 </th>
//                                 <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
//                                     Status
//                                 </th>
//                                 <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
//                                     Action
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {reports.map((report, index) => (
//                                 <tr
//                                     key={index}
//                                     className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
//                                 >
//                                     <td className="py-4 px-6 text-[#0058DD] text-sm">
//                                         {report.id}
//                                     </td>
//                                     <td className="py-4 px-6 text-[#101828] text-sm">
//                                         {report.client}
//                                     </td>
//                                     <td className="py-4 px-6">
//                                         <div className="flex items-center gap-2 text-[#4A5565] text-sm">
//                                             <Clock className="w-4 h-4" />
//                                             <span className="text-sm text-[#4A5565]">{report.date}</span>
//                                         </div>
//                                     </td>
//                                     <td className="py-4 px-6 text-[#101828] text-sm">
//                                         {report.phLevel}
//                                     </td>
//                                     <td className="py-4 px-6">
//                                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${report.statusColor}`}>
//                                             {report.status}
//                                         </span>
//                                     </td>
//                                     <td className="py-4 px-6">
//                                         <Link href={`/dashboard/dashboard/${report.id}`}>
//                                             <button className="text-[#0058DD] hover:text-[#0058DD] text-sm font-medium hover:underline transition-colors cursor-pointer">
//                                                 View Details
//                                             </button>
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useGetHomeOverviewQuery } from "@/redux/api/home/homeSlicsApi";

export type ReportStatus = "Pending" | "In Progress" | "Completed";

export interface RecentReport {
  id: string;
  reportId: string;
  customer: string;
  type: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

interface LatestReportTableProps {
  reports: RecentReport[];
  isLoading?: boolean;
}

const LatestReportTable = () => {
  const { data: statsData, isLoading } = useGetHomeOverviewQuery("");

  // API response
  const reports: RecentReport[] = statsData?.data?.recentReports || [];
  const getStatusStyle = (status: ReportStatus) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Recent Reports</h2>
      </div>

      {isLoading && (
        <div className="p-6 text-center text-gray-500">Loading...</div>
      )}

      {!isLoading && reports.length === 0 && (
        <div className="p-6 text-center text-gray-400">No reports found</div>
      )}

      {!isLoading && reports.length > 0 && (
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm">Report ID</th>
              <th className="text-left px-6 py-3 text-sm">Customer</th>
              <th className="text-left px-6 py-3 text-sm">Type</th>
              <th className="text-left px-6 py-3 text-sm">Created</th>
              <th className="text-left px-6 py-3 text-sm">Status</th>
              <th className="text-left px-6 py-3 text-sm">Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-blue-600">{report.reportId}</td>

                <td className="px-6 py-4">{report.customer}</td>

                <td className="px-6 py-4">{report.type}</td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {formatDistanceToNow(new Date(report.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      report.status,
                    )}`}
                  >
                    {report.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <Link href={`/dashboard/history`}>
                    <button className="text-blue-600 hover:underline text-sm">
                      All History
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LatestReportTable;
