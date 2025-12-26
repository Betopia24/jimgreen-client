'use client';

import React from 'react';
import { Clock } from 'lucide-react';

export default function LatestRepostTable() {
    const reports = [
        {
            id: 'RPT-1247',
            client: 'Riverside Municipal',
            date: '2 hours ago',
            phLevel: '7.4',
            status: 'Good',
            statusColor: 'bg-[#DCFCE7] text-[#008236]',
        },
        {
            id: 'RPT-1247',
            client: 'Industrial Corp',
            date: '2 hours ago',
            phLevel: '8.2',
            status: 'Warning',
            statusColor: 'bg-[#FEF9C2] text-[#A65F00]',
        },
        {
            id: 'RPT-1247',
            client: 'City Pool Services',
            date: '2 hours ago',
            phLevel: '7.6',
            status: 'Good',
            statusColor: 'bg-[#DCFCE7] text-[#008236]',
        },
        {
            id: 'RPT-1247',
            client: 'Residential B',
            date: '2 hours ago',
            phLevel: '9.1',
            status: 'Critical',
            statusColor: 'bg-[#FFE2E2] text-[#C10007]',
        },
    ];

    return (
        <div className="w-full bg-gray-50 pb-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-3xl font-medium text-[#101828]">Latest Reports</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#F3F4F6] border-b border-gray-200">
                                <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
                                    Report ID
                                </th>
                                <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
                                    Client
                                </th>
                                <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
                                    Date
                                </th>
                                <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
                                    pH Level
                                </th>
                                <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
                                    Status
                                </th>
                                <th className="text-left py-4 px-6 font-semibold text-[16px] text-[#4A5565]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-6 text-[#0058DD] text-sm">
                                        {report.id}
                                    </td>
                                    <td className="py-4 px-6 text-[#101828] text-sm">
                                        {report.client}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 text-[#4A5565] text-sm">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm text-[#4A5565]">{report.date}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-[#101828] text-sm">
                                        {report.phLevel}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${report.statusColor}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button className="text-[#0058DD] hover:text-[#0058DD] text-sm font-medium hover:underline transition-colors">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}