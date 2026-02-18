
'use client';

import React, { useState, useMemo } from 'react';
import { Search, Eye, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { IoIosGitCompare } from 'react-icons/io';
import Link from 'next/link';
import { useGetReportHistoryQuery } from '@/redux/api/reportAnalysis/reportAnalysisSliceApi';
import Loading from '@/components/Others/Loading';
import { useGetMeProfileQuery } from '@/redux/api/getMe/getMeApi';
import { User } from '@/app/(dashboard)/dashboard/rowMeterials/addRowMeterials/page';
import { format } from 'date-fns';
import Pagination from '@/components/shared/pagination/Pagination';

export default function HistoryTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: userData } = useGetMeProfileQuery("");
    const profile = userData?.data as User;
    const companyId = profile?.companyMember?.companyId;
    // console.log("companyId==============", companyId);

    const { data: reportHistoryData, isLoading } = useGetReportHistoryQuery({
        companyId: companyId,
        searchTerm: trimmedSearchTerm,
        page: currentPage,
        limit: 10,
    },
        {
            skip: !companyId,
        }
    );

    // console.log("reportHistoryData", reportHistoryData?.data.length);

    const getRiskBadgeColor = (rating: string) => {
        switch (rating) {
            case 'low':
                return 'bg-green-100 text-green-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'high':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    return (
        <div className="bg-gray-50 py-6">

            <div className="bg-white rounded-xl hover:shadow-sm p-4 sm:p-6 mb-6">
                <div className="flex flex-col md:flex-row lg:items-center lg:justify-between gap-4">

                    {/* Search Input */}
                    <div className="relative w-full lg:w-0 lg:flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B4B4B4] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by ID, customer, or sample..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            className="w-full pl-11 pr-4 py-3 border border-[#F3F3F3] rounded-lg text-sm text-[#191919] placeholder-[#B4B4B4] bg-[#F3F3F3] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Action Buttons */}
                    {/* <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#F3F3F3] rounded-lg text-sm font-medium text-[#191919] bg-[#F3F3F3] w-full sm:w-auto">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>

                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#F3F3F3] rounded-lg text-sm font-medium text-[#191919] bg-[#F3F3F3] transition w-full sm:w-auto">
                            <IoIosGitCompare size={22} />
                            Compare Reports
                        </button>
                    </div> */}
                </div>
            </div>


            {/* Table */}
            <div className="bg-white rounded-xl hover:shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="bg-[#F3F3F3] border-b border-gray-200">
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Report ID</th>
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Customer Name</th>
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Date</th>
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Score</th>
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Rating</th>
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportHistoryData?.data?.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-gray-500">
                                        No reports found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                reportHistoryData?.data?.map((report: any, index: number) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-6 text-sm font-medium text-blue-600">
                                            {report?.report_id}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                                            {report?.customerName}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {report?.createdAt &&
                                                format(new Date(report.createdAt), "dd MMM yyyy, hh:mm a")}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {report?.total_score?.overall_score}
                                                </span>
                                                {/* <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(
                                                        report.risk
                                                    )}`}
                                                >
                                                    {report.risk}
                                                </span> */}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {report?.total_score?.rating}
                                        </td>
                                        <td className="py-4 px-6">
                                            <Link href={`/dashboard/history/${report?.id}`}>
                                                <button className="text-[#004AAD] transition-colors cursor-pointer">
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination - Always show if there are multiple pages */}
                <div className="px-6 border-t flex justify-between items-center py-3">
                    <div className="text-sm text-gray-600">
                        Showing {reportHistoryData?.data.length} of {reportHistoryData?.total_items} reports
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={reportHistoryData?.total_pages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}