'use client';

import React, { useState } from 'react';
import { Search, Trash2, Eye } from 'lucide-react';
import { FiEdit } from "react-icons/fi";
import Link from 'next/link';

export default function CustomerTable() {
    const [searchTerm, setSearchTerm] = useState('');

    const materials = [
        {
            id: "1",
            customerName: 'ScaleGuard 500',
            site: 'Houston Industrial Plant',
            location: 'Houston, TX',
            address: '4500 Industrial Blvd, Houston, TX 77001',
            assets: '8',
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "2",
            customerName: 'ScaleGuard 500',
            site: 'Houston Industrial Plant',
            location: 'Houston, TX',
            address: '4500 Industrial Blvd, Houston, TX 77001',
            assets: '8',
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "3",
            customerName: 'ScaleGuard 500',
            site: 'Houston Industrial Plant',
            location: 'Houston, TX',
            address: '4500 Industrial Blvd, Houston, TX 77001',
            assets: '8',
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "4",
            customerName: 'ScaleGuard 500',
            site: 'Houston Industrial Plant',
            location: 'Houston, TX',
            address: '4500 Industrial Blvd, Houston, TX 77001',
            assets: '8',
            status: 'Inactive',
            statusColor: 'bg-[#E5E7EB] text-[#2D2D2D]',
        },
        {
            id: "5",
            customerName: 'ScaleGuard 500',
            site: 'Houston Industrial Plant',
            location: 'Houston, TX',
            address: '4500 Industrial Blvd, Houston, TX 77001',
            assets: '8',
            status: 'Active',
            statusColor: 'bg-[#34A85333] text-[#34A853]',
        },
        {
            id: "6",
            customerName: 'ScaleGuard 500',
            site: 'Houston Industrial Plant',
            location: 'Houston, TX',
            address: '4500 Industrial Blvd, Houston, TX 77001',
            assets: '8',
            status: 'Inactive',
            statusColor: 'bg-[#E5E7EB] text-[#2D2D2D]',
        },
    ];

    // Filter materials based on search term
    const filteredMaterials = materials.filter(material =>
        material.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-[#2D2D2D]">Raw Materials List</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-[#636F85] focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto border border-[#E2E8F0] rounded-lg">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#F3F4F6] border-b border-gray-200">
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                                            Customer Name
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                                            Site
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                                            Location
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                                            Address
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                                            Assets
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                                            Status
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#4A5565]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMaterials.length > 0 ? (
                                        filteredMaterials.map((material, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="py-4 px-6 text-[#2D2D2D] text-sm font-medium">
                                                    {material.customerName}
                                                </td>
                                                <td className="py-4 px-6 text-[#636F85] text-sm">
                                                    {material.site}
                                                </td>
                                                <td className="py-4 px-6 text-[#191919] text-sm">
                                                    {material.location}
                                                </td>
                                                <td className="py-4 px-6 text-[#636F85] text-sm">
                                                    {material.address}
                                                </td>
                                                <td className="py-4 px-6 text-[#4A5565] text-sm">
                                                    {material.assets}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium ${material.statusColor}`}>
                                                        {material.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <button className="text-[#34A853] hover:text-[#2d8e44] transition-colors">
                                                            <FiEdit className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-[#0058DD] hover:text-[#0058DD] transition-colors">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-[#E7000B] hover:text-[#c40009] transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="py-8 px-6 text-center text-gray-500 text-sm">
                                                No materials found matching "{searchTerm}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );
}