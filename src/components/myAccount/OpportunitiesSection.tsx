// import React from 'react';
// import { Target } from 'lucide-react';

// export default function OpportunitiesSection() {
//     const opportunities = [
//         {
//             id: 1,
//             title: "Enterprise CRM Platform",
//             value: "$125,000",
//             status: "Negotiation",
//             closeDate: "Mar 15, 2025",
//             probability: 75
//         },
//         {
//             id: 2,
//             title: "Enterprise CRM Platform",
//             value: "$125,000",
//             status: "Negotiation",
//             closeDate: "Mar 15, 2025",
//             probability: 75
//         }
//     ];

//     return (
//         <div className="w-full p-6 bg-white mt-7 rounded-xl">
//             {/* Header */}
//             <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-[18px] text-[#101010] flex items-center gap-2">
//                     <Target className="w-5 h-5" />
//                     Opportunities
//                 </h2>
//             </div>

//             {/* Opportunities Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {opportunities.map((opportunity) => (
//                     <div
//                         key={opportunity.id}
//                         className="rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
//                     >
//                         {/* Header */}
//                         <div className="flex items-start justify-between mb-4">
//                             <h3 className="text-[16px] font-medium text-[#2D2D2D] flex-1">
//                                 {opportunity.title}
//                             </h3>
//                             <span className="text-[16px] text-[#34A853] ml-2">
//                                 {opportunity.value}
//                             </span>
//                         </div>

//                         {/* Status and Close Date */}
//                         <div className="flex items-center justify-between mb-4">
//                             <span className="px-2.5 py-1 bg-[#34A8531A] text-[#016630] text-sm font-medium rounded">
//                                 {opportunity.status}
//                             </span>
//                             <span className="text-[16px] text-[#636F85]">
//                                 Close: {opportunity.closeDate}
//                             </span>
//                         </div>

//                         {/* Progress Bar */}
//                         <div className="space-y-2">
//                             <div className="text-sm text-[#636F85] text-right">
//                                 {opportunity.probability}% probability
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                                 <div
//                                     className="bg-[#101010] h-full rounded-full transition-all"
//                                     style={{ width: `${opportunity.probability}%` }}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }




"use client";

import React, { useState } from "react";
import { Target } from "lucide-react";
import { TiEdit } from "react-icons/ti";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Opportunity = {
    id: number;
    title: string;
    value: string;
    status: string;
    closeDate: string;
    probability: number;
};

export default function OpportunitiesSection() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([
        {
            id: 1,
            title: "Enterprise CRM Platform",
            value: "$125,000",
            status: "Negotiation",
            closeDate: "2025-03-15",
            probability: 75,
        },
        {
            id: 2,
            title: "Enterprise CRM Platform",
            value: "$125,000",
            status: "Negotiation",
            closeDate: "2025-03-15",
            probability: 75,
        },
    ]);

    const [editingId, setEditingId] = useState<number | null>(null);

    const handleChange = (
        id: number,
        field: keyof Opportunity,
        value: string | number
    ) => {
        setOpportunities((prev) =>
            prev.map((op) =>
                op.id === id ? { ...op, [field]: value } : op
            )
        );
    };

    return (
        <div className="w-full p-6 bg-white mt-7 rounded-xl">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#101010] flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Opportunities
                </h2>
            </div>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.map((opportunity) => {
                    const isEditing = editingId === opportunity.id;

                    return (
                        <div
                            key={opportunity.id}
                            className="group relative rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
                        >
                            {/* Edit Button (Hover) */}
                            {!isEditing && (
                                <button
                                    onClick={() => setEditingId(opportunity.id)}
                                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-sm px-1 py-1 border rounded bg-white hover:bg-gray-50 cursor-pointer"
                                >
                                    <TiEdit size={24} />
                                </button>
                            )}

                            {/* Header */}
                            <div className="flex items-start justify-between mb-4 gap-2">
                                {isEditing ? (
                                    <input
                                        value={opportunity.title}
                                        onChange={(e) =>
                                            handleChange(
                                                opportunity.id,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded px-2 py-1 text-[16px]"
                                    />
                                ) : (
                                    <h3 className="text-[16px] font-medium text-[#2D2D2D]">
                                        {opportunity.title}
                                    </h3>
                                )}

                                {isEditing ? (
                                    <input
                                        value={opportunity.value}
                                        onChange={(e) =>
                                            handleChange(
                                                opportunity.id,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                        className="w-24 border rounded px-2 py-1 text-[16px] text-right"
                                    />
                                ) : (
                                    <span className="text-[16px] text-[#34A853]">
                                        {opportunity.value}
                                    </span>
                                )}
                            </div>

                            {/* Status & Close Date */}
                            <div className="flex items-center justify-between mb-4 gap-2">
                                {isEditing ? (
                                    <Select
                                        value={opportunity.status}
                                        onValueChange={(value) =>
                                            handleChange(opportunity.id, "status", value)
                                        }
                                    >
                                        <SelectTrigger className="border rounded px-2 py-1 text-sm">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Open">Open</SelectItem>
                                            <SelectItem value="Negotiation">Negotiation</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <span className="px-2.5 py-1 bg-[#34A8531A] text-[#016630] text-sm font-medium rounded">
                                        {opportunity.status}
                                    </span>
                                )}

                                {isEditing ? (
                                    <input
                                        type="date"
                                        value={opportunity.closeDate}
                                        onChange={(e) =>
                                            handleChange(
                                                opportunity.id,
                                                "closeDate",
                                                e.target.value
                                            )
                                        }
                                        className="border rounded px-2 py-1 text-sm"
                                    />
                                ) : (
                                    <span className="text-[16px] text-[#636F85]">
                                        Close: {new Date(opportunity.closeDate).toLocaleDateString()}
                                    </span>
                                )}
                            </div>

                            {/* Probability */}
                            <div className="space-y-2">
                                <div className="text-sm text-[#636F85] text-right">
                                    {opportunity.probability}% probability
                                </div>

                                {isEditing ? (
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={opportunity.probability}
                                        onChange={(e) =>
                                            handleChange(
                                                opportunity.id,
                                                "probability",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-full accent-[#101010]"
                                    />
                                ) : (
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all bg-[#101010]"
                                            style={{ width: `${opportunity.probability}%` }}
                                        />
                                    </div>
                                )}
                            </div>


                            {/* Actions */}
                            {isEditing && (
                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="px-4 py-1.5 border rounded-md text-sm hover:bg-[#6E51E0] text-black hover:text-white cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            // 🔗 API call here
                                            setEditingId(null);
                                        }}
                                        className="px-4 py-1.5 bg-[#6E51E0] text-white rounded-md text-sm cursor-pointer"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
