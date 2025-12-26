// import React from 'react'

// function ShowCustomer() {
//   return (
//     <div>ShowCustomer</div>
//   )
// }

// export default ShowCustomer

'use client';

import React, { useState } from 'react';
import { Search, Trash2, Eye } from 'lucide-react';
import { FiEdit } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import Link from 'next/link';

export default function AssetsList() {
    const [searchTerm, setSearchTerm] = useState('');

    const assets = [
        {
            id: '1',
            assetName: 'Main Cooling Tower CT-01',
            assetType: 'Cooling Tower',
            location: 'Building A – North Wing',
            lastUpdated: 'Dec 18, 2024',
            status: 'Active',
        },
        {
            id: '2',
            assetName: 'Main Cooling Tower CT-01',
            assetType: 'Cooling Tower',
            location: 'Building A – North Wing',
            lastUpdated: 'Dec 18, 2024',
            status: 'Active',
        },
        {
            id: '3',
            assetName: 'Main Cooling Tower CT-01',
            assetType: 'Cooling Tower',
            location: 'Building A – North Wing',
            lastUpdated: 'Dec 18, 2024',
            status: 'Active',
        },
        {
            id: '4',
            assetName: 'Main Cooling Tower CT-01',
            assetType: 'Cooling Tower',
            location: 'Building A – North Wing',
            lastUpdated: 'Dec 18, 2024',
            status: 'Inactive',
        },
        {
            id: '5',
            assetName: 'Main Cooling Tower CT-01',
            assetType: 'Cooling Tower',
            location: 'Building A – North Wing',
            lastUpdated: 'Dec 18, 2024',
            status: 'Active',
        },
        {
            id: '6',
            assetName: 'Main Cooling Tower CT-01',
            assetType: 'Cooling Tower',
            location: 'Building A – North Wing',
            lastUpdated: 'Dec 18, 2024',
            status: 'Inactive',
        },
    ];

    // Filter assets based on search term
    const filteredAssets = assets.filter((asset) =>
        asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assetType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            {/* Header Section */}
            <div>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-[#2D2D2D]">
                            Assets for Global Manufacturing Corp – Houston
                        </h1>
                        <h2 className="text-lg font-medium text-[#2D2D2D] mt-1">
                            Industrial Plant – Site A
                        </h2>
                        <p className="text-sm text-[#636F85] mt-2">
                            Manage, view, edit and add assets associated with this customer site.
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-3 bg-primaryColor text-[#FFFFFF] font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                        <GoPlus size={20} className='text-white' />
                        <span>Add Asset</span>
                    </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8">
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
                                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder:text-[#636F85] focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto border border-[#E5E7EB] rounded-lg">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#6B7280]">
                                            Asset Name
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#6B7280]">
                                            Asset Type
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#6B7280]">
                                            Location / Identifier
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#6B7280]">
                                            Last Updated
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#6B7280]">
                                            Status
                                        </th>
                                        <th className="text-left py-4 px-6 font-medium text-sm text-[#6B7280]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAssets.length > 0 ? (
                                        filteredAssets.map((asset) => (
                                            <tr
                                                key={asset.id}
                                                className="border-b border-[#E5E7EB] hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="py-4 px-6 text-[#1F2937] text-sm font-medium">
                                                    {asset.assetName}
                                                </td>
                                                <td className="py-4 px-6 text-[#4B5563] text-sm">
                                                    {asset.assetType}
                                                </td>
                                                <td className="py-4 px-6 text-[#4B5563] text-sm">
                                                    {asset.location}
                                                </td>
                                                <td className="py-4 px-6 text-[#4B5563] text-sm">
                                                    {asset.lastUpdated}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${asset.status === 'Active'
                                                            ? 'bg-[#34A85333] text-[#34A853]'
                                                            : 'bg-[#E5E7EB] text-[#6B7280]'
                                                            }`}
                                                    >
                                                        {asset.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-4">
                                                        <Link href={`/dashboard/customers/showCustomer/${asset.id}`}>
                                                            <button className="text-[#34A853] hover:text-[#2d8e44] transition-colors cursor-pointer">
                                                                <FiEdit className="w-4 h-4" />
                                                            </button>
                                                        </Link>
                                                        <button className="text-[#E7000B] hover:text-[#c40009] transition-colors cursor-pointer">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center text-gray-500 text-sm">
                                                No assets found matching "{searchTerm}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}