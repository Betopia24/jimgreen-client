// import { Search } from 'lucide-react';
// import { Calendar, ExternalLink } from 'lucide-react';

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { CiFilter } from 'react-icons/ci';
// import Link from 'next/link';

// function MyAccount() {
//     const accounts = [
//         {
//             id: 1,
//             name: 'FastGrowth Inc.',
//             initial: 'F',
//             lastUpdated: '3 days ago',
//             meetings: 7,
//             opportunities: 3,
//             revenue: '$55M',
//             color: 'bg-[#6E51E0]'
//         },
//         {
//             id: 2,
//             name: 'BlueWave Retail',
//             initial: 'B',
//             lastUpdated: '2 days ago',
//             meetings: 4,
//             opportunities: 2,
//             revenue: '$120M',
//             color: 'bg-[#6E51E0]'
//         },
//         {
//             id: 3,
//             name: 'PixelCore Software',
//             initial: 'P',
//             lastUpdated: '1 week ago',
//             meetings: 3,
//             opportunities: 1,
//             revenue: '$25M',
//             color: 'bg-[#6E51E0]'
//         },
//         {
//             id: 4,
//             name: 'NovaTech Labs',
//             initial: 'N',
//             lastUpdated: '3 days ago',
//             meetings: 9,
//             opportunities: 4,
//             revenue: '$78M',
//             color: 'bg-[#6E51E0]'
//         }
//     ];
//     return (
//         <div>
//             <div className='py-6 flex justify-between items-center gap-2.5'>
//                 <div className="flex-1 bg-white rounded-lg border border-[#D1D6DB] hover:border-[#6E51E0] p-2">
//                     {/* Search Section */}
//                     <div className="flex items-center gap-2 flex-1 px-2">
//                         <Search className="w-4 h-4 text-[#636F85]" />
//                         <input
//                             type="text"
//                             placeholder="Search accounts..."
//                             className="flex-1 outline-none text-sm text-[#636F85] placeholder-gray-400 bg-transparent"
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <Select>
//                         <SelectTrigger className="flex items-center gap-2 border border-[#D1D6DB] px-1 lg:px-4 py-2 rounded-sm text-[#2D2D2D] focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-[#D1D6DB]
//                       focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">

//                             {/* Globe icon on left */}
//                             <CiFilter size={24} className="text-[#2D2D2D]" />

//                             {/* Placeholder with black color */}
//                             <SelectValue placeholder="FastGrowth" className="text-black" />

//                         </SelectTrigger>

//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectItem value="English">FastGrowth</SelectItem>
//                                 <SelectItem value="Bangla">Fast</SelectItem>
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                 </div>
//             </div>
//             {/* car design  */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {accounts.map((account) => (
//                     <div
//                         key={account.id}
//                         className="bg-white rounded-lg border border-[#D1D6DB] p-5 shadow-sm hover:shadow-md transition-shadow"
//                     >
//                         {/* Header */}
//                         <div className="flex items-start gap-3 mb-6">
//                             <div className={`${account.color} w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold text-lg`}>
//                                 {account.initial}
//                             </div>
//                             <div className="flex-1">
//                                 <h3 className="text-[#2D2D2D] font-semibold text-xl mb-1">
//                                     {account.name}
//                                 </h3>
//                                 <div className="flex items-center gap-1 text-[#636F85] text-sm">
//                                     <Calendar className="w-3.5 h-3.5" />
//                                     <span>Last updated: {account.lastUpdated}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Stats */}
//                         <div className="grid grid-cols-3 gap-4 mb-6">
//                             <div>
//                                 <div className="text-2xl font-medium text-[#2D2D2D] mb-1">
//                                     {account.meetings}
//                                 </div>
//                                 <div className="text-[16px] text-[#636F85]">Meetings</div>
//                             </div>
//                             <div>
//                                 <div className="text-2xl font-medium text-[#2D2D2D] mb-1">
//                                     {account.opportunities}
//                                 </div>
//                                 <div className="text-[16px] text-[#636F85]">Opportunities</div>
//                             </div>
//                             <div>
//                                 <div className="text-2xl font-medium text-[#2D2D2D] mb-1">
//                                     {account.revenue}
//                                 </div>
//                                 <div className="text-[16px] text-[#636F85]">Revenue</div>
//                             </div>
//                         </div>

//                         {/* Button */}
//                         <Link href={`/dashboard/myAccount/${account.id}`}>
//                             <button className="w-full bg-[#6E51E0] hover:bg-[#6E51E0] text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
//                                 <ExternalLink className="w-4 h-4" />
//                                 Open Account
//                             </button>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default MyAccount

"use client";

import { useState } from "react";
import { Search, Calendar, ExternalLink, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { CiFilter } from "react-icons/ci";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function MyAccount() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const accounts = [
    {
      id: 1,
      name: "FastGrowth Inc.",
      initial: "F",
      lastUpdated: "3 days ago",
      meetings: 7,
      opportunities: 3,
      revenue: "$55M",
      color: "bg-[#6E51E0]",
    },
    {
      id: 2,
      name: "BlueWave Retail",
      initial: "B",
      lastUpdated: "2 days ago",
      meetings: 4,
      opportunities: 2,
      revenue: "$120M",
      color: "bg-[#6E51E0]",
    },
    {
      id: 3,
      name: "PixelCore Software",
      initial: "P",
      lastUpdated: "1 week ago",
      meetings: 3,
      opportunities: 1,
      revenue: "$25M",
      color: "bg-[#6E51E0]",
    },
    {
      id: 4,
      name: "NovaTech Labs",
      initial: "N",
      lastUpdated: "3 days ago",
      meetings: 9,
      opportunities: 4,
      revenue: "$78M",
      color: "bg-[#6E51E0]",
    },
  ];

  const filteredAccounts = accounts.filter((account) =>
    account.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Top Bar */}
      <div className="py-6 flex justify-between items-center gap-3">
        {/* Search */}
        <div className="flex-1 bg-white rounded-lg border border-[#D1D6DB] p-2">
          <div className="flex items-center gap-2 px-2">
            <Search className="w-4 h-4 text-[#636F85]" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm text-[#636F85] bg-transparent"
            />
          </div>
        </div>

        {/* Filter + Toggle */}
        <div className="flex items-center gap-2">
          {/* Filter */}
          <Select>
            <SelectTrigger className="flex items-center gap-2 border border-[#D1D6DB] px-3 py-2 rounded-sm">
              <CiFilter size={20} />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High Revenue</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Single Toggle Button */}
          <button
            onClick={() =>
              setView((prev) => (prev === "grid" ? "list" : "grid"))
            }
            className="p-2 border border-[#D1D6DB] rounded bg-white hover:bg-gray-50"
            title="Toggle view"
          >
            {view === "grid" ? <List size={18} /> : <LayoutGrid size={18} />}
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        className={`gap-6 ${
          view === "grid" ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col"
        }`}
      >
        {filteredAccounts.map((account) => (
          <div
            key={account.id}
            className={`bg-white rounded-lg border border-[#D1D6DB] p-5 shadow-sm hover:shadow-md transition
    ${view === "list" ? "flex items-center justify-between gap-6" : ""}
  `}
          >
            {/* Left / Header */}
            <div
              className={`flex items-start gap-3  ${
                view === "grid" ? "mb-10" : ""
              }`}
            >
              <div
                className={`${account.color} w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold text-lg`}
              >
                {account.initial}
              </div>

              <div className={`${view === "grid" ? "" : "ml-3"}`}>
                <h3 className="text-[#2D2D2D] font-semibold text-lg">
                  {account.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-[#636F85]">
                  <Calendar className="w-4 h-4" />
                  Last updated: {account.lastUpdated}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-6 text-center mb-6`}>
              <div>
                <div className="text-xl font-medium">{account.meetings}</div>
                <div className="text-sm text-[#636F85]">Meetings</div>
              </div>
              <div>
                <div className="text-xl font-medium">
                  {account.opportunities}
                </div>
                <div className="text-sm text-[#636F85]">Opportunities</div>
              </div>
              <div>
                <div className="text-xl font-medium">{account.revenue}</div>
                <div className="text-sm text-[#636F85]">Revenue</div>
              </div>
            </div>

            {/* Open Account Button */}
            <Link href={`/dashboard/myAccount/${account.id}`}>
              <button
                className={`bg-[#6E51E0] text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm
        ${view === "grid" ? "w-full" : ""}
      `}
              >
                <ExternalLink size={16} />
                Open Account
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAccount;
