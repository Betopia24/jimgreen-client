// "use client";

// import { ChevronDown } from "lucide-react";
// import { useState } from "react";

// export interface DescriptionSolutionItem {
//   coc: number;
//   temperature: number;
//   temp_unit: string;
//   temperature_c: number;

//   ph: number;
//   specific_conductance: number;

//   activity_of_water: number;
//   charge_balance_error_pct: number;
//   density: number;
//   dissolved_oxygen_ppm: number;
//   electrical_balance: number;
//   ionic_strength: number;
//   mass_of_water_kg: number;
// }

// interface Props {
//   data: DescriptionSolutionItem[];
// }

// export default function DescriptionSolutionTable({ data }: Props) {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="w-full rounded-2xl border border-slate-200 bg-white overflow-hidden">
//       {/* Header */}
//       <div
//         onClick={() => setOpen(!open)}
//         className="flex items-center justify-between px-5 py-4 cursor-pointer"
//       >
//         <div className="flex items-center gap-3 flex-wrap">
//           <h2 className="text-sm md:text-base font-bold tracking-wider uppercase">
//             Description Of Solution
//           </h2>

//           <span className="px-2.5 py-1 border rounded-full bg-slate-100 text-xs font-medium">
//             {data.length} Rows
//           </span>
//         </div>

//         <button className="p-2 rounded-lg hover:bg-slate-100 transition">
//           <ChevronDown
//             className={`w-5 h-5 text-slate-700 transition-transform duration-300 ${
//               open ? "-rotate-90" : "rotate-0"
//             }`}
//           />
//         </button>
//       </div>

//       {/* Collapse */}
//       <div
//         className="overflow-hidden transition-all duration-500 ease-in-out"
//         style={{
//           maxHeight: open ? "5000px" : "0px",
//           opacity: open ? 1 : 0,
//         }}
//       >
//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse min-w-[1400px]">
//             <thead>
//               <tr className="bg-slate-100">
//                 {[
//                   "#",
//                   "CoC",
//                   "Temperature",
//                   "Temp °C",
//                   "pH",
//                   "Specific Conductance",
//                   "Activity Of Water",
//                   "Charge Balance %",
//                   "Density",
//                   "Dissolved Oxygen",
//                   "Electrical Balance",
//                   "Ionic Strength",
//                   "Mass Of Water",
//                 ].map((head) => (
//                   <th
//                     key={head}
//                     className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200 whitespace-nowrap"
//                   >
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

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

//                   {/* COC */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
//                       {row.coc}
//                     </span>
//                   </td>

//                   {/* Temperature */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span
//                       className={`
//                         inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
//                         ${
//                           row.temperature >= 25
//                             ? "bg-red-100 text-red-700"
//                             : row.temperature >= 18
//                               ? "bg-orange-100 text-orange-700"
//                               : row.temperature >= 10
//                                 ? "bg-yellow-100 text-yellow-700"
//                                 : "bg-green-100 text-green-700"
//                         }
//                       `}
//                     >
//                       {row.temperature}
//                       {row.temp_unit}
//                     </span>
//                   </td>

//                   {/* Temp C */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold">
//                       {row.temperature_c}°C
//                     </span>
//                   </td>

//                   {/* PH */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
//                       {row.ph}
//                     </span>
//                   </td>

//                   {/* Specific Conductance */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold">
//                       {row.specific_conductance}
//                     </span>
//                   </td>

//                   {/* Activity Of Water */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
//                       {row.activity_of_water}
//                     </span>
//                   </td>

//                   {/* Charge Balance */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span
//                       className={`
//                         inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
//                         ${
//                           Math.abs(row.charge_balance_error_pct) > 5
//                             ? "bg-red-100 text-red-700"
//                             : "bg-green-100 text-green-700"
//                         }
//                       `}
//                     >
//                       {row.charge_balance_error_pct}%
//                     </span>
//                   </td>

//                   {/* Density */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
//                       {row.density}
//                     </span>
//                   </td>

//                   {/* Dissolved Oxygen */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold">
//                       {row.dissolved_oxygen_ppm}
//                     </span>
//                   </td>

//                   {/* Electrical Balance */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
//                       {row.electrical_balance}
//                     </span>
//                   </td>

//                   {/* Ionic Strength */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold">
//                       {row.ionic_strength}
//                     </span>
//                   </td>

//                   {/* Mass Of Water */}
//                   <td className="px-4 py-4 border-b border-slate-100">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-sm font-semibold">
//                       {row.mass_of_water_kg} kg
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-5 py-3 bg-slate-50 border-t border-slate-200">
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

import {
  ChevronDown,
  Droplets,
  Thermometer,
  FlaskConical,
  Zap,
  Wind,
  Scale,
  Activity,
  Beaker,
} from "lucide-react";
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

/* ─── helpers ─────────────────────────────────────── */

function tempColor(t: number) {
  if (t >= 25) return { bg: "#FEE2E2", text: "#B91C1C" };
  if (t >= 18) return { bg: "#FFEDD5", text: "#C2410C" };
  if (t >= 10) return { bg: "#FEF9C3", text: "#92400E" };
  return { bg: "#DCFCE7", text: "#15803D" };
}

function chargeColor(v: number) {
  return Math.abs(v) > 5
    ? { bg: "#FEE2E2", text: "#B91C1C" }
    : { bg: "#DCFCE7", text: "#15803D" };
}

const PILL = (bg: string, text: string, children: React.ReactNode) => (
  <span
    style={{ background: bg, color: text }}
    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tabular-nums whitespace-nowrap"
  >
    {children}
  </span>
);

/* column definitions — drives both table header and card rows */
const COLS = [
  {
    key: "coc",
    label: "CoC",
    icon: <Beaker className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) => PILL("#EDE9FE", "#5B21B6", r.coc),
  },
  {
    key: "temperature",
    label: "Temp",
    icon: <Thermometer className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) => {
      const c = tempColor(r.temperature);
      return PILL(c.bg, c.text, `${r.temperature}${r.temp_unit}`);
    },
  },
  {
    key: "temperature_c",
    label: "°C",
    icon: <Thermometer className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) =>
      PILL("#E0F2FE", "#0369A1", `${r.temperature_c}°C`),
  },
  {
    key: "ph",
    label: "pH",
    icon: <FlaskConical className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) => PILL("#D1FAE5", "#065F46", r.ph),
  },
  {
    key: "specific_conductance",
    label: "Conductance",
    icon: <Zap className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) =>
      PILL("#CFFAFE", "#0E7490", r.specific_conductance),
  },
  {
    key: "activity_of_water",
    label: "Activity H₂O",
    icon: <Droplets className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) =>
      PILL("#DBEAFE", "#1D4ED8", r.activity_of_water),
  },
  {
    key: "charge_balance_error_pct",
    label: "Charge Bal. %",
    icon: <Activity className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) => {
      const c = chargeColor(r.charge_balance_error_pct);
      return PILL(c.bg, c.text, `${r.charge_balance_error_pct}%`);
    },
  },
  {
    key: "density",
    label: "Density",
    icon: <Scale className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) =>
      PILL("#EDE9FE", "#6D28D9", r.density),
  },
  {
    key: "dissolved_oxygen_ppm",
    label: "DO (ppm)",
    icon: <Wind className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) =>
      PILL("#FCE7F3", "#9D174D", r.dissolved_oxygen_ppm),
  },
  {
    key: "electrical_balance",
    label: "Elec. Balance",
    icon: <Zap className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) =>
      PILL("#FEF3C7", "#92400E", r.electrical_balance),
  },
  {
    key: "ionic_strength",
    label: "Ionic Strength",
    icon: <Activity className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) =>
      PILL("#CCFBF1", "#0F766E", r.ionic_strength),
  },
  {
    key: "mass_of_water_kg",
    label: "Mass H₂O",
    icon: <Scale className="w-3.5 h-3.5" />,
    render: (r: DescriptionSolutionItem) =>
      PILL("#F1F5F9", "#475569", `${r.mass_of_water_kg} kg`),
  },
];

/* ─── Mobile Card ─────────────────────────────────── */

function MobileCard({
  row,
  idx,
}: {
  row: DescriptionSolutionItem;
  idx: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const primary = COLS.slice(0, 4);
  const secondary = COLS.slice(4);

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
      style={{ fontFamily: "'DM Mono', 'Fira Code', monospace" }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
        style={{ background: idx % 2 === 0 ? "#F8FAFC" : "#F1F5F9" }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
            {idx + 1}
          </span>
          {primary.map((col) => (
            <span key={col.key}>{col.render(row)}</span>
          ))}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </div>

      {/* Expanded details */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: expanded ? "800px" : "0px",
          opacity: expanded ? 1 : 0,
        }}
      >
        <div className="px-4 py-3 grid grid-cols-2 gap-2 border-t border-slate-100">
          {secondary.map((col) => (
            <div key={col.key} className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                {col.icon} {col.label}
              </span>
              {col.render(row)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────── */

export default function DescriptionSolutionTable({ data }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Google Font import — DM Mono for that scientific/industrial feel */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');

        .ds-table th { font-family: 'Syne', sans-serif; }
        .ds-table td { font-family: 'DM Mono', monospace; }

        .ds-header-title { font-family: 'Syne', sans-serif; }

        .ds-chevron-btn { transition: background 0.15s; }
        .ds-chevron-btn:hover { background: #E2E8F0; }

        .ds-row { transition: background 0.15s; }
        .ds-row:hover td { background: #ECFDF5 !important; }

        /* subtle dot-grid background */
        .ds-wrapper {
          background-color: #FFFFFF;
          background-image: radial-gradient(circle, #CBD5E1 1px, transparent 1px);
          background-size: 22px 22px;
          background-attachment: local;
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ds-animate { animation: fadeSlideIn 0.35s ease both; }
      `}</style>

      <div className=" w-full rounded-2xl border border-slate-200 overflow-hidden shadow-md">
        {/* ── Header ──────────────────────────────── */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between border-slate-200 px-4 sm:px-6 py-4 cursor-pointer select-none"
          style={
            {
              // background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            }
          }
        >
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className=" text-sm sm:text-base font-extrabold tracking-widest uppercase">
              Description of Solution
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
              {data.length} rows
            </span>
          </div>

          <button className="ds-chevron-btn p-2 rounded-lg">
            <ChevronDown
              className={`w-5 h-5 text-slate-300 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>

        {/* ── Collapsible body ────────────────────── */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: open ? "9999px" : "0px", opacity: open ? 1 : 0 }}
        >
          {/* ── Mobile: stacked cards (hidden on md+) ── */}
          <div className="md:hidden flex flex-col gap-3 p-3 bg-slate-50/80 ds-animate">
            {data.map((row, idx) => (
              <MobileCard key={idx} row={row} idx={idx} />
            ))}
          </div>

          {/* ── Desktop: scrollable table (hidden below md) ── */}
          <div className="hidden md:block overflow-x-auto ds-animate">
            <table
              className="ds-table w-full border-collapse"
              style={{ minWidth: "1100px" }}
            >
              <thead>
                <tr style={{ background: "#F1F5F9" }}>
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 whitespace-nowrap">
                    #
                  </th>
                  {COLS.map((col) => (
                    <th
                      key={col.key}
                      className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 whitespace-nowrap"
                    >
                      <span className="flex items-center gap-1.5">
                        {col.icon}
                        {col.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, idx) => (
                  <tr
                    key={idx}
                    className="ds-row"
                    style={{
                      background: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                    }}
                  >
                    <td className="px-3 py-3 border-b border-slate-100 text-xs text-slate-400 font-medium">
                      {idx + 1}
                    </td>
                    {COLS.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 py-3 border-b border-slate-100"
                      >
                        {col.render(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Footer ────────────────────────────── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 py-3 border-t border-slate-200"
            style={{ background: "#F8FAFC" }}
          >
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              {data.length} total entries
            </span>
            <span className="text-[10px] text-slate-400 tabular-nums">
              {new Date().toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
