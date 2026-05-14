// "use client";

// import { ChevronDown } from "lucide-react";
// import { useState } from "react";

// export interface DescriptionSolutionItem {
//   coc: number;
//   temperature: number;
//   temp_unit: string;
//   ph: number;
//   specific_conductance: number;
// }

// export default function DescriptionSolutionTable({
//   data,
// }: {
//   data: DescriptionSolutionItem[];
// }) {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="w-full rounded-2xl border border-slate-200 bg-white  overflow-hidden">
//       {/* Header */}
//       <div
//         onClick={() => setOpen(!open)}
//         className="
//           flex items-center justify-between
//           px-5 py-4
//           cursor-pointer

//         "
//       >
//         <div className="flex items-center gap-3">
//           <h2 className="text-sm md:text-base  font-bold tracking-wider uppercase">
//             Description Of Solution
//           </h2>

//           <span className="px-2.5 py-1 border rounded-full bg-white/20 text-xs font-medium">
//             {data.length} Rows
//           </span>
//         </div>

//         {/* Arrow */}
//         <button className="p-2 rounded-lg hover:bg-gray-200 transition">
//           <ChevronDown
//             className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
//               open ? "-rotate-90" : "rotate-0"
//             }`}
//           />
//         </button>
//       </div>

//       {/* Table */}
//       <div
//         className="overflow-hidden transition-all duration-500 ease-in-out"
//         style={{
//           maxHeight: open ? "5000px" : "0px",
//           opacity: open ? 1 : 0,
//         }}
//       >
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             {/* Table Head */}
//             <thead>
//               <tr className="bg-slate-100">
//                 <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
//                   #
//                 </th>

//                 <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
//                   CoC
//                 </th>

//                 <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
//                   Temperature
//                 </th>

//                 <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
//                   pH
//                 </th>

//                 <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
//                   Specific Conductance
//                 </th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody>
//               {data.map((row, idx) => (
//                 <tr
//                   key={idx}
//                   className={`
//                     transition-all duration-200
//                     hover:bg-cyan-50
//                     ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
//                   `}
//                 >
//                   {/* Index */}
//                   <td className="px-4 py-4 border-b border-slate-100 text-slate-500 font-medium">
//                     {idx + 1}
//                   </td>

//                   {/* CoC */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span
//                       className="
//                         inline-flex items-center justify-center
//                         px-3 py-1 rounded-full
//                         bg-indigo-100
//                         text-indigo-700
//                         text-sm font-semibold
//                       "
//                     >
//                       {row.coc}
//                     </span>
//                   </td>

//                   {/* Temperature */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span
//                       className={`
//                         inline-flex items-center
//                         px-3 py-1 rounded-full
//                         text-sm font-semibold
//                         ${
//                           row.temperature >= 80
//                             ? "bg-red-100 text-red-700"
//                             : row.temperature >= 60
//                               ? "bg-orange-100 text-orange-700"
//                               : row.temperature >= 40
//                                 ? "bg-yellow-100 text-yellow-700"
//                                 : "bg-green-100 text-green-700"
//                         }
//                       `}
//                     >
//                       {row.temperature}
//                       {row.temp_unit}
//                     </span>
//                   </td>

//                   {/* PH */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span
//                       className="
//                         inline-flex items-center
//                         px-3 py-1 rounded-full
//                         bg-emerald-100
//                         text-emerald-700
//                         text-sm font-semibold
//                       "
//                     >
//                       {row.ph}
//                     </span>
//                   </td>

//                   {/* Specific Conductance */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span
//                       className="
//                         inline-flex items-center
//                         px-3 py-1 rounded-full
//                         bg-cyan-100
//                         text-cyan-700
//                         text-sm font-semibold
//                       "
//                     >
//                       {row.specific_conductance}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-200">
//           <span className="text-xs text-slate-500 uppercase tracking-wider">
//             {data.length} Total Entries
//           </span>

//           <span className="text-xs text-slate-400">
//             {new Date().toLocaleDateString()}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface DescriptionSolutionItem {
  coc: number;
  temperature: number;
  temp_unit: string;
  temperature_c: number;

  ph: number;
  specific_conductance: number;

  activity_of_water: number;
  charge_balance_error_pct: number;
  density: number;
  dissolved_oxygen_ppm: number;
  electrical_balance: number;
  ionic_strength: number;
  mass_of_water_kg: number;
}

interface Props {
  data: DescriptionSolutionItem[];
}

export default function DescriptionSolutionTable({ data }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-5 py-4 cursor-pointer"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-sm md:text-base font-bold tracking-wider uppercase">
            Description Of Solution
          </h2>

          <span className="px-2.5 py-1 border rounded-full bg-slate-100 text-xs font-medium">
            {data.length} Rows
          </span>
        </div>

        <button className="p-2 rounded-lg hover:bg-slate-100 transition">
          <ChevronDown
            className={`w-5 h-5 text-slate-700 transition-transform duration-300 ${
              open ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Collapse */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: open ? "5000px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1400px]">
            <thead>
              <tr className="bg-slate-100">
                {[
                  "#",
                  "CoC",
                  "Temperature",
                  "Temp °C",
                  "pH",
                  "Specific Conductance",
                  "Activity Of Water",
                  "Charge Balance %",
                  "Density",
                  "Dissolved Oxygen",
                  "Electrical Balance",
                  "Ionic Strength",
                  "Mass Of Water",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200 whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className={`
                    transition-all duration-200
                    hover:bg-cyan-50
                    ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  `}
                >
                  {/* Index */}
                  <td className="px-4 py-4 border-b border-slate-100 text-slate-500 font-medium">
                    {idx + 1}
                  </td>

                  {/* COC */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
                      {row.coc}
                    </span>
                  </td>

                  {/* Temperature */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span
                      className={`
                        inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          row.temperature >= 25
                            ? "bg-red-100 text-red-700"
                            : row.temperature >= 18
                              ? "bg-orange-100 text-orange-700"
                              : row.temperature >= 10
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {row.temperature}
                      {row.temp_unit}
                    </span>
                  </td>

                  {/* Temp C */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold">
                      {row.temperature_c}°C
                    </span>
                  </td>

                  {/* PH */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                      {row.ph}
                    </span>
                  </td>

                  {/* Specific Conductance */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
                      {row.specific_conductance}
                    </span>
                  </td>

                  {/* Activity Of Water */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                      {row.activity_of_water}
                    </span>
                  </td>

                  {/* Charge Balance */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span
                      className={`
                        inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          Math.abs(row.charge_balance_error_pct) > 5
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {row.charge_balance_error_pct}%
                    </span>
                  </td>

                  {/* Density */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
                      {row.density}
                    </span>
                  </td>

                  {/* Dissolved Oxygen */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold">
                      {row.dissolved_oxygen_ppm}
                    </span>
                  </td>

                  {/* Electrical Balance */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
                      {row.electrical_balance}
                    </span>
                  </td>

                  {/* Ionic Strength */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold">
                      {row.ionic_strength}
                    </span>
                  </td>

                  {/* Mass Of Water */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-sm font-semibold">
                      {row.mass_of_water_kg} kg
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-5 py-3 bg-slate-50 border-t border-slate-200">
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
