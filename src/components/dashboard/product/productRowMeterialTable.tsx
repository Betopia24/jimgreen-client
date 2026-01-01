'use client';

import React from 'react';
import { Search, Trash2 } from 'lucide-react';
import { FiEdit } from "react-icons/fi";
import Link from 'next/link';

export default function ProductRowMeterialTable() {
    const materials = [
        {
            id: "1",
            name: 'ScaleGuard 500',
            manufacturer: 'ChemPure Water Solutions',
            productCategory: 'Biocide',
            productprice: "$45.50",
            replacementFrequency: "Monthly",
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "2",
            name: 'ScaleGuard 500',
            manufacturer: 'ChemPure Water Solutions',
            productCategory: 'Biocide',
            productprice: "$45.50",
            replacementFrequency: "Monthly",
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "3",
            name: 'ScaleGuard 500',
            manufacturer: 'ChemPure Water Solutions',
            productCategory: 'Biocide',
            productprice: "$45.50",
            replacementFrequency: "Monthly",
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "4",
            name: 'ScaleGuard 500',
            manufacturer: 'ChemPure Water Solutions',
            productCategory: 'Biocide',
            productprice: "$45.50",
            replacementFrequency: "Monthly",
            status: 'Inactive',
            statusColor: 'bg-[#E5E7EB] text-[#2D2D2D]',
        },
        {
            id: "5",
            name: 'ScaleGuard 500',
            manufacturer: 'ChemPure Water Solutions',
            productCategory: 'Biocide',
            productprice: "$45.50",
            replacementFrequency: "Monthly",
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "6",
            name: 'ScaleGuard 500',
            manufacturer: 'ChemPure Water Solutions',
            productCategory: 'Biocide',
            productprice: "$45.50",
            replacementFrequency: "Monthly",
            status: 'Inactive',
            statusColor: 'bg-[#E5E7EB] text-[#2D2D2D]',
        },
    ];

    return (
        <div className="bg-gray-50 py-6">
            <div className="bg-white rounded-lg hover:shadow-sm overflow-hidden">
                <div className="p-6">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-between">
                        <h2 className="text-xl font-semibold text-[#2D2D2D]">Raw Materials List</h2>
                        <div className="relative w-50 lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B]" />
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
                                        manufacturer
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Product Category
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Product Price
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-sm text-[#4A5565]">
                                        Replacement Frequency
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
                                            {material.manufacturer}
                                        </td>
                                        <td className="py-4 px-6 text-[#191919] text-sm">
                                            {material.productCategory}
                                        </td>
                                        <td className="py-4 px-6 text-[#636F85] text-sm">
                                            {material.productprice}
                                        </td>
                                        <td className="py-4 px-6 text-[#4A5565] text-sm">
                                            {material.replacementFrequency}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${material.statusColor}`}>
                                                {material.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <Link href={`/dashboard/product/${material.id}`}>
                                                    <button className="text-[#0058DD] hover:text-[#0058DD] transition-colors cursor-pointer mt-2">
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