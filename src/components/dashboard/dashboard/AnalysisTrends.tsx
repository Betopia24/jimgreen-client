// "use client";

// import { useGetHomeOverviewQuery } from "@/redux/api/home/homeSlicsApi";
// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Area,
//   AreaChart,
// } from "recharts";

// export default function AnalysisTrends() {
//   const { data: statsData } = useGetHomeOverviewQuery("");

//   const chartData = statsData?.data?.reportTrend;
//   console.log(chartData);
//   const data = [
//     { month: "Jan", value: 50 },
//     { month: "Feb", value: 58 },
//     { month: "Mar", value: 52 },
//     { month: "Apr", value: 65 },
//     { month: "May", value: 78 },
//     { month: "Jun", value: 95 },
//   ];

//   return (
//     <div className="bg-gray-50 py-6">
//       <div className="bg-white rounded-2xl p-6 shadow-sm">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-headingColor mb-1">
//               Analysis Trends
//             </h2>
//             <p className="text-[16px] text-[#666666]">
//               Monthly calculation overview
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-sm text-gray-600">Live</span>
//           </div>
//         </div>

//         {/* Chart */}
//         <div className="relative">
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart
//               data={data}
//               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//             >
//               <defs>
//                 <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#0058DD" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#0058DD" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 stroke="#f0f0f0"
//                 vertical={false}
//               />
//               <XAxis
//                 dataKey="month"
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "#9ca3af", fontSize: 12 }}
//                 dy={10}
//               />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "#9ca3af", fontSize: 12 }}
//                 ticks={[0, 25, 50, 75, 100]}
//                 dx={-10}
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#1f2937",
//                   border: "none",
//                   borderRadius: "8px",
//                   color: "white",
//                   fontSize: "12px",
//                   padding: "8px 12px",
//                 }}
//                 cursor={{
//                   stroke: "#0058DD",
//                   strokeWidth: 1,
//                   strokeDasharray: "5 5",
//                 }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#0058DD"
//                 strokeWidth={2.5}
//                 fill="url(#colorValue)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useGetHomeOverviewQuery } from "@/redux/api/home/homeSlicsApi";
import React, { useMemo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export default function AnalysisTrends() {
  const { data: statsData, isLoading } = useGetHomeOverviewQuery("");

  // API response
  const apiData = statsData?.data?.reportTrend || [];

  //  Convert API -> chart format
  const chartData = useMemo(() => {
    return apiData.map((item: any) => ({
      month: item.month,
      value: Number(item.reports), // 👈 using reports as chart value
    }));
  }, [apiData]);

  // Optional demo data (if API empty)
  const demoData = [
    { month: "Jan", value: 50 },
    { month: "Feb", value: 58 },
    { month: "Mar", value: 52 },
    { month: "Apr", value: 65 },
    { month: "May", value: 78 },
    { month: "Jun", value: 95 },
  ];

  const finalData = chartData.length > 0 ? chartData : demoData;

  return (
    <div className="bg-gray-50 py-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="mb-1 text-2xl font-bold text-headingColor md:text-3xl lg:text-4xl">
              Analysis Trends
            </h2>
            <p className="text-[16px] text-[#666666]">
              Monthly calculation overview
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">
              {isLoading ? "Loading..." : "Live"}
            </span>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={finalData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0058DD" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0058DD" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              allowDecimals={false}
              dx={-10}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontSize: "12px",
                padding: "8px 12px",
              }}
              cursor={{
                stroke: "#0058DD",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#0058DD"
              strokeWidth={2.5}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
