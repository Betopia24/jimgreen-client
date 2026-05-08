"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Mineral {
  mineral: string;
  si: number;
  sr: number;
  log_iap: number;
  log_k: number;
}

export interface SaturationItem {
  coc: number;
  temperature: number;
  temp_unit: string;
  minerals: Mineral[];
}

interface Props {
  data: SaturationItem[];
  title?: string;
}

export default function SaturationIndicesTable({
  data,
  title = "Saturation Indices",
}: Props) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl  overflow-hidden">
      {/* Header */}

      <div
        onClick={() => setCollapsed(!collapsed)}
        className="
          flex items-center justify-between
          px-5 py-4
          cursor-pointer
         
        "
      >
        <div className="flex items-center gap-3">
          <h2 className="text-sm md:text-base font-bold tracking-wider uppercase">
            Saturation Indices
          </h2>

          <span className="px-2.5 py-1 border rounded-full bg-white/20 text-xs font-medium">
            {data.length} Rows
          </span>
        </div>

        {/* Arrow */}
        <button className="p-2 rounded-lg hover:bg-gray-200 transition">
          <ChevronDown
            className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
              !collapsed ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Table */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          collapsed ? "max-h-0 opacity-0" : "max-h-[5000px] opacity-100"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  #
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  CoC
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Temp
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Mineral
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  SI
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  SR
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Log IAP
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Log K
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, rowIndex) =>
                row.minerals.map((mineral, mineralIndex) => (
                  <tr
                    key={`${rowIndex}-${mineralIndex}`}
                    className={`
                      transition hover:bg-gray-50
                      ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    `}
                  >
                    {/* Index */}
                    <td className="px-4 py-3 border-b text-sm text-gray-500">
                      {rowIndex + 1}
                    </td>

                    {/* CoC */}
                    <td className="px-4 py-3 border-b">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                        {row.coc}
                      </span>
                    </td>

                    {/* Temp */}
                    <td className="px-4 py-3 border-b">
                      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                        {row.temperature}
                        {row.temp_unit}
                      </span>
                    </td>

                    {/* Mineral */}
                    <td className="px-4 py-3 border-b text-sm font-medium text-gray-800">
                      {mineral.mineral}
                    </td>

                    {/* SI */}
                    <td className="px-4 py-3 border-b">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          mineral.si >= 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {mineral.si}
                      </span>
                    </td>

                    {/* SR */}
                    <td className="px-4 py-3 border-b text-sm text-gray-700">
                      {mineral.sr}
                    </td>

                    {/* log_iap */}
                    <td className="px-4 py-3 border-b text-sm text-gray-700">
                      {mineral.log_iap}
                    </td>

                    {/* log_k */}
                    <td className="px-4 py-3 border-b text-sm text-gray-700">
                      {mineral.log_k}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
