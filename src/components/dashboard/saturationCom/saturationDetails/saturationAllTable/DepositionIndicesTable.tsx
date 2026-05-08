"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface DepositionIndex {
  index_key: string;
  index_name: string;
  full_name: string;
  value: number;
  interpretation: string;
}

export interface DepositionIndicesItem {
  coc: number;
  temperature: number;
  temp_unit: string;
  indices: DepositionIndex[];
}

export default function DepositionIndicesTable({
  data,
}: {
  data: DepositionIndicesItem[];
}) {
  const [open, setOpen] = useState(true);

  const getInterpretationColor = (text: string) => {
    const value = text.toLowerCase();

    if (value.includes("heavy corrosion") || value.includes("high risk")) {
      return "bg-red-100 text-red-700";
    }

    if (value.includes("corrosive") || value.includes("dissolution")) {
      return "bg-orange-100 text-orange-700";
    }

    if (value.includes("scale")) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-between
          px-5 py-4
          cursor-pointer
         
        "
      >
        <div className="flex items-center gap-3">
          <h2 className="text-sm md:text-base font-bold tracking-wider uppercase">
            Deposition Indices
          </h2>

          <span className="px-2.5 py-1 border rounded-full bg-white/20 text-xs font-medium">
            {data.length} Rows
          </span>
        </div>

        {/* Arrow */}
        <button className="p-2 rounded-lg hover:bg-gray-200 transition">
          <ChevronDown
            className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
              open ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Table */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: open ? "8000px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1200px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-slate-100">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  #
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  CoC
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  Temperature
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  Index
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  Full Name
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  Value
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  Interpretation
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((row, rowIndex) =>
                row.indices.map((index, idx) => (
                  <tr
                    key={`${rowIndex}-${idx}`}
                    className={`
                      transition-all duration-200
                      hover:bg-violet-50
                      ${(rowIndex + idx) % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    `}
                  >
                    {/* Row */}
                    <td className="px-4 py-4 border-b border-slate-100 text-slate-500 font-medium">
                      {rowIndex + 1}
                    </td>

                    {/* CoC */}
                    <td className="px-4 py-4 border-b border-slate-100">
                      <span
                        className="
                          inline-flex items-center justify-center
                          px-3 py-1 rounded-full
                          bg-indigo-100
                          text-indigo-700
                          text-sm font-semibold
                        "
                      >
                        {row.coc}
                      </span>
                    </td>

                    {/* Temperature */}
                    <td className="px-4 py-4 border-b border-slate-100">
                      <span
                        className={`
                          inline-flex items-center
                          px-3 py-1 rounded-full
                          text-sm font-semibold
                          ${
                            row.temperature >= 80
                              ? "bg-red-100 text-red-700"
                              : row.temperature >= 60
                                ? "bg-orange-100 text-orange-700"
                                : row.temperature >= 40
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        {row.temperature}
                        {row.temp_unit}
                      </span>
                    </td>

                    {/* Index */}
                    <td className="px-4 py-4 border-b border-slate-100">
                      <span
                        className="
                          inline-flex items-center
                          px-3 py-1 rounded-full
                          bg-violet-100
                          text-violet-700
                          text-sm font-semibold
                        "
                      >
                        {index.index_name}
                      </span>
                    </td>

                    {/* Full Name */}
                    <td className="px-4 py-4 border-b border-slate-100 text-slate-700 font-medium">
                      {index.full_name}
                    </td>

                    {/* Value */}
                    <td className="px-4 py-4 border-b border-slate-100">
                      <span
                        className="
                          inline-flex items-center
                          px-3 py-1 rounded-full
                          bg-cyan-100
                          text-cyan-700
                          text-sm font-semibold
                        "
                      >
                        {index.value}
                      </span>
                    </td>

                    {/* Interpretation */}
                    <td className="px-4 py-4 border-b border-slate-100">
                      <span
                        className={`
                          inline-flex items-center
                          px-3 py-1 rounded-full
                          text-sm font-semibold
                          ${getInterpretationColor(index.interpretation)}
                        `}
                      >
                        {index.interpretation}
                      </span>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-200">
          <span className="text-xs text-slate-500 uppercase tracking-wider">
            {data.length} Total Entries
          </span>

          <span className="text-xs text-slate-400">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
