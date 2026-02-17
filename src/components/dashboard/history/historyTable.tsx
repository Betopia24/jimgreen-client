
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

export default function HistoryTable() {
    // const [searchTerm, setSearchTerm] = useState('');
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 10;

    const { data: userData } = useGetMeProfileQuery("");
    const profile = userData?.data as User;
    const companyId = profile?.companyMember?.companyId;

    const { data: reportHistoryData, isLoading } = useGetReportHistoryQuery(companyId);
    console.log("reportHistoryData==============", reportHistoryData);

    // Extended data to ensure pagination is visible (18 items → 2 pages)
    // const reportsData = [
    //     {
    //         id: "1",
    //         reportId: 'WA-2024-1247',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Supply Line #4',
    //         date: 'Sep 30, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 87.4,
    //         risk: 'low',
    //     },
    //     {
    //         id: "2",
    //         reportId: 'WA-2024-1247',
    //         customer: 'Wastewater Discharge A',
    //         sample: 'Supply Line #4',
    //         date: 'Sep 29, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 62.1,
    //         risk: 'high',
    //     },
    //     {
    //         id: "3",
    //         reportId: 'WA-2024-1247',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Supply Line #4',
    //         date: 'Sep 28, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 87.4,
    //         risk: 'low',
    //     },
    //     {
    //         id: "4",
    //         reportId: 'WA-2024-1247',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Supply Line #4',
    //         date: 'Sep 27, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 87.4,
    //         risk: 'low',
    //     },
    //     {
    //         id: "5",
    //         reportId: 'WA-2024-1247',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Tower 3 Water Supply',
    //         date: 'Sep 27, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 78.5,
    //         risk: 'medium',
    //     },
    //     {
    //         id: "6",
    //         reportId: 'WA-2024-1247',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Supply Line #4',
    //         date: 'Sep 27, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 87.4,
    //         risk: 'low',
    //     },
    //     {
    //         id: "7",
    //         reportId: 'WA-2024-1247',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Supply Line #4',
    //         date: 'Sep 27, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 87.4,
    //         risk: 'low',
    //     },
    //     {
    //         id: "8",
    //         reportId: 'WA-2024-1246',
    //         customer: 'Central City Utilities',
    //         sample: 'Cooling Tower Basin',
    //         date: 'Sep 25, 2024',
    //         analyst: 'Dr. Michael Lee',
    //         score: 71.2,
    //         risk: 'medium',
    //     },
    //     {
    //         id: "9",
    //         reportId: 'WA-2024-1245',
    //         customer: 'Industrial Park Co.',
    //         sample: 'Makeup Water',
    //         date: 'Sep 20, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 89.9,
    //         risk: 'low',
    //     },
    //     {
    //         id: "10",
    //         reportId: 'WA-2024-1244',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Blowdown Line',
    //         date: 'Sep 15, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 55.3,
    //         risk: 'high',
    //     },
    //     {
    //         id: "11",
    //         reportId: 'WA-2024-1243',
    //         customer: 'Metro Water District',
    //         sample: 'Chilled Water Loop',
    //         date: 'Sep 12, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 82.6,
    //         risk: 'low',
    //     },
    //     {
    //         id: "12",
    //         reportId: 'WA-2024-1242',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Supply Line #4',
    //         date: 'Sep 10, 2024',
    //         analyst: 'Dr. Michael Lee',
    //         score: 85.1,
    //         risk: 'low',
    //     },
    //     {
    //         id: "13",
    //         reportId: 'WA-2024-1241',
    //         customer: 'Power Plant Alpha',
    //         sample: 'Condenser Water',
    //         date: 'Sep 08, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 68.4,
    //         risk: 'medium',
    //     },
    //     {
    //         id: "14",
    //         reportId: 'WA-2024-1240',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Tower 2 Basin',
    //         date: 'Sep 05, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 90.2,
    //         risk: 'low',
    //     },
    //     {
    //         id: "15",
    //         reportId: 'WA-2024-1239',
    //         customer: 'Wastewater Discharge A',
    //         sample: 'Effluent Line',
    //         date: 'Sep 03, 2024',
    //         analyst: 'Dr. Michael Lee',
    //         score: 59.7,
    //         risk: 'high',
    //     },
    //     {
    //         id: "16",
    //         reportId: 'WA-2024-1238',
    //         customer: 'Central City Utilities',
    //         sample: 'Makeup Water Intake',
    //         date: 'Sep 01, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 83.5,
    //         risk: 'low',
    //     },
    //     {
    //         id: "17",
    //         reportId: 'WA-2024-1237',
    //         customer: 'Industrial Park Co.',
    //         sample: 'Cooling Tower #5',
    //         date: 'Aug 30, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 76.8,
    //         risk: 'medium',
    //     },
    //     {
    //         id: "18",
    //         reportId: 'WA-2024-1236',
    //         customer: 'Riverside Municipal Water',
    //         sample: 'Supply Line #4',
    //         date: 'Aug 28, 2024',
    //         analyst: 'Dr. Sarah Chen',
    //         score: 88.3,
    //         risk: 'low',
    //     },
    // ];

    // Search filtering
    // const filteredReports = useMemo(() => {
    //     if (!searchTerm.trim()) return reportsData;

    //     const lowerSearch = searchTerm.toLowerCase();
    //     return reportsData.filter(
    //         (report) =>
    //             report.reportId.toLowerCase().includes(lowerSearch) ||
    //             report.customer.toLowerCase().includes(lowerSearch) ||
    //             report.sample.toLowerCase().includes(lowerSearch)
    //     );
    // }, [searchTerm]);

    // Pagination
    // const totalItems = filteredReports.length;
    // const totalPages = Math.ceil(totalItems / itemsPerPage);
    // const paginatedReports = useMemo(() => {
    //     const start = (currentPage - 1) * itemsPerPage;
    //     const end = start + itemsPerPage;
    //     return filteredReports.slice(start, end);
    // }, [filteredReports, currentPage]);

    // const goToPage = (page: number) => {
    //     setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    // };

    // const getRiskBadgeColor = (risk: string) => {
    //     switch (risk) {
    //         case 'low':
    //             return 'bg-green-100 text-green-800';
    //         case 'medium':
    //             return 'bg-yellow-100 text-yellow-800';
    //         case 'high':
    //             return 'bg-red-100 text-red-800';
    //         default:
    //             return 'bg-gray-100 text-gray-800';
    //     }
    // };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>
                    <Loading />
                </p>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 py-6">
            {/* Header Controls */}
            {/* <div className="bg-white rounded-xl hover:shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B4B4B4] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by ID, customer, or sample..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-11 pr-4 py-3 border border-[#F3F3F3] rounded-lg text-sm text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-3 border border-[#F3F3F3] rounded-lg text-sm font-medium text-[#191919] bg-[#F3F3F3]">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-5 py-3 border border-[#F3F3F3] rounded-lg text-sm font-medium text-[#191919] bg-[#F3F3F3] transition">
                            <IoIosGitCompare size={22} />
                            Compare Reports
                        </button>
                    </div>
                </div>
            </div> */}

            <div className="bg-white rounded-xl hover:shadow-sm p-4 sm:p-6 mb-6">
                <div className="flex flex-col md:flex-row lg:items-center lg:justify-between gap-4">

                    {/* Search Input */}
                    {/* <div className="relative w-full lg:w-0 lg:flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B4B4B4] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by ID, customer, or sample..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-11 pr-4 py-3 border border-[#F3F3F3] rounded-lg text-sm text-[#191919] placeholder-[#B4B4B4] bg-[#F3F3F3] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div> */}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#F3F3F3] rounded-lg text-sm font-medium text-[#191919] bg-[#F3F3F3] w-full sm:w-auto">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>

                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#F3F3F3] rounded-lg text-sm font-medium text-[#191919] bg-[#F3F3F3] transition w-full sm:w-auto">
                            <IoIosGitCompare size={22} />
                            Compare Reports
                        </button>
                    </div>
                </div>
            </div>


            {/* Table */}
            <div className="bg-white rounded-xl hover:shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="bg-[#F3F3F3] border-b border-gray-200">
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Report ID</th>
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Customer</th>
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Date</th>
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Analyst</th>
                                <th className="text-left py-4 px-6 font-medium text-sm text-gray-700">Score</th>
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
                                            {report?.createdAt &&
                                                format(new Date(report.createdAt), "dd MMM yyyy, hh:mm a")}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {report?.createdAt}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {report?.analyst}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {report.score}
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
                {/* {totalPages > 1 && ( */}
                {/* <div className="flex items-center justify-between px-6 py-4 bg-[#F9FAFB]">
                    <div className="text-sm text-gray-600">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} reports
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#E5E7EB] text-sm font-medium text-[#4B5563] hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition bg-white"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${currentPage === page
                                        ? 'bg-primaryColor text-white'
                                        : 'text-[#4B5563] hover:bg-[#F3F4F6] bg-white border border-[#E5E7EB]'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#E5E7EB] text-sm font-medium text-[#4B5563] hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition bg-white"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div> */}
                {/* )} */}
            </div>
        </div>
    );
}