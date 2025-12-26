'use client';

import React from 'react';
import { Search, Trash2 } from 'lucide-react';
import { FiEdit } from "react-icons/fi";
import Link from 'next/link';

export default function RowMeterialsTable() {
    const materials = [
        {
            id: "1",
            name: 'Sodium Hypochlorite',
            supplier: 'ChemSupply Co.',
            dosageRate: '5.0 ppm',
            feedFrequency: "Continuous",
            lastModified: "Dec 18, 2024",
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "2",
            name: 'Phosphonate Scale Inhibitor',
            supplier: 'ChemSupply Co.',
            dosageRate: '5.0 ppm',
            feedFrequency: "Continuous",
            lastModified: "Dec 18, 2024",
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "3",
            name: 'Molybdate Corrosion Inhibitor',
            supplier: 'ChemSupply Co.',
            dosageRate: '5.0 ppm',
            feedFrequency: "Continuous",
            lastModified: "Dec 18, 2024",
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "4",
            name: 'Polyacrylate Dispersant',
            supplier: 'ChemSupply Co.',
            dosageRate: '5.0 ppm',
            feedFrequency: "Continuous",
            lastModified: "Dec 18, 2024",
            status: 'Inactive',
            statusColor: 'bg-[#E5E7EB] text-[#2D2D2D]',
        },
        {
            id: "5",
            name: 'Bromine Biocide',
            supplier: 'ChemSupply Co.',
            dosageRate: '5.0 ppm',
            feedFrequency: "Continuous",
            lastModified: "Dec 18, 2024",
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "6",
            name: 'Zinc Orthophosphate',
            supplier: 'ChemSupply Co.',
            dosageRate: '5.0 ppm',
            feedFrequency: "Continuous",
            lastModified: "Dec 18, 2024",
            status: 'Inactive',
            statusColor: 'bg-[#E5E7EB] text-[#2D2D2D]',
        },
    ];

    return (
        <div className="bg-gray-50 py-6">
            <div className="bg-white rounded-lg hover:shadow-sm overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#2D2D2D]">Raw Materials List</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-[#636F85] focus:outline-nonew-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto border border-[#E2E8F0] border-b-0 rounded-lg">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#F3F4F6] border-b border-gray-200">
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Name
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Supplier
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Dosage Rate
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Feed Frequency
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Last Modified
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Status
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {materials.map((material, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-6 text-[#2D2D2D] text-sm font-medium">
                                            {material.name}
                                        </td>
                                        <td className="py-4 px-6 text-[#636F85] text-sm">
                                            {material.supplier}
                                        </td>
                                        <td className="py-4 px-6 text-[#191919] text-sm">
                                            {material.dosageRate}
                                        </td>
                                        <td className="py-4 px-6 text-[#636F85] text-sm">
                                            {material.feedFrequency}
                                        </td>
                                        <td className="py-4 px-6 text-[#4A5565] text-sm">
                                            {material.lastModified}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${material.statusColor}`}>
                                                {material.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <Link href={`/dashboard/rowMeterials/editmeterials${material.id}`}>
                                                    <button className="text-[#0058DD] hover:text-[#0058DD] transition-colors cursor-pointer">
                                                        <FiEdit className="w-4 h-4" />
                                                    </button></Link>
                                                <button className="text-[#E7000B] hover:text-[#E7000B] transition-colors cursor-pointer">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}