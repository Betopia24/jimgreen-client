"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SpeciesItem {
  species: string;
  molality: number;
  activity: number;
  element: string | null;
}

export interface DistributionItem {
  coc: number;
  temperature: number;
  temp_unit: string;
  species: SpeciesItem[];
}

interface Props {
  data: DistributionItem[];
  title?: string;
}

export default function DistributionOfSpeciesTable({
  data,
  title = "Distribution Of Species",
}: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white  overflow-hidden">
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
            Distribution Of Species
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
          collapsed ? "max-h-0 opacity-0" : "max-h-[6000px] opacity-100"
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
                  Temperature
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Species
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Molality
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Activity
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Element
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, rowIndex) =>
                row.species.map((item, speciesIndex) => (
                  <tr
                    key={`${rowIndex}-${speciesIndex}`}
                    className={`
                      transition hover:bg-gray-50
                      ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    `}
                  >
                    {/* Row */}
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

                    {/* Species */}
                    <td className="px-4 py-3 border-b text-sm font-medium text-gray-800">
                      {item.species}
                    </td>

                    {/* Molality */}
                    <td className="px-4 py-3 border-b text-sm text-blue-700 font-medium">
                      {item.molality}
                    </td>

                    {/* Activity */}
                    <td className="px-4 py-3 border-b text-sm text-green-700 font-medium">
                      {item.activity}
                    </td>

                    {/* Element */}
                    <td className="px-4 py-3 border-b">
                      {item.element ? (
                        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold">
                          {item.element}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">—</span>
                      )}
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
