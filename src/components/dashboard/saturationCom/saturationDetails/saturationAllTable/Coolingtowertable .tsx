// "use client";

// import { useState } from "react";

// // ─── Types (all exported so parent can use them) ──────────────────────────────

// export interface Range {
//   range_f: number;
//   note: string;
// }

// export interface Approach {
//   approach_f: number | null;
//   note: string;
// }

// export interface Efficiency {
//   efficiency_percent: number | null;
//   note: string;
// }

// export interface HeatLoad {
//   heat_load_btu_hr: number;
//   heat_load_tons: number;
// }

// export interface CoolingTons {
//   calculated_tons: number;
//   input_tons: number | null;
// }

// export interface DissolvedOxygen {
//   do_ppm: number;
//   water_temp_c: number;
//   wet_bulb_temp_c: number;
// }

// export interface SystemData {
//   recirculation_rate_gpm: number;
//   hot_water_temp_f: number;
//   cold_water_temp_f: number;
//   wet_bulb_temp_f: number | null;
//   skin_temp_f: number;
//   drift_percent: number;
//   evaporation_factor_pct: number;
//   cooling_tons_input: number | null;
//   range: Range;
//   approach: Approach;
//   efficiency: Efficiency;
//   heat_load: HeatLoad;
//   cooling_tons: CoolingTons;
//   dissolved_oxygen: DissolvedOxygen;
// }

// export interface Evaporation {
//   evaporation_rate_gpm: number;
//   evaporation_factor_pct: number;
// }

// export interface Blowdown {
//   blowdown_rate_gpm: number | null;
//   note?: string;
// }

// export interface Makeup {
//   makeup_rate_gpm: number | null;
//   evaporation_rate_gpm?: number;
//   blowdown_rate_gpm?: number;
//   drift_rate_gpm?: number;
//   drift_percent?: number;
//   note?: string;
// }

// export interface Chemical {
//   product: string;
//   dosage_ppm: number;
//   million_lbs_blowdown_per_day?: number;
//   lbs_per_day: number | null;
//   lbs_per_year: number | null;
//   operating_days_per_year?: number;
//   note?: string;
// }

// export interface CocEntry {
//   coc: number;
//   evaporation: Evaporation;
//   blowdown: Blowdown;
//   makeup: Makeup;
//   chemical: Chemical;
// }

// export interface CoolingTowerAnalysis {
//   system: SystemData;
//   per_coc: CocEntry[];
// }

// // ─── Props ────────────────────────────────────────────────────────────────────

// interface CoolingTowerTableProps {
//   data: CoolingTowerAnalysis;
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function fmt(value: number | null | undefined, decimals = 2): string {
//   if (value == null) return "—";
//   return value.toLocaleString("en-US", {
//     minimumFractionDigits: decimals,
//     maximumFractionDigits: decimals,
//   });
// }

// function fmtInt(value: number | null | undefined): string {
//   if (value == null) return "—";
//   return value.toLocaleString("en-US");
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function SectionHeader({
//   title,
//   subtitle,
//   isOpen,
//   onToggle,
// }: {
//   title: string;
//   subtitle?: string;
//   isOpen: boolean;
//   onToggle: () => void;
// }) {
//   return (
//     <button
//       onClick={onToggle}
//       className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors duration-150 border-b border-slate-200 text-left"
//     >
//       <div>
//         <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
//           {title}
//         </span>
//         {subtitle && (
//           <span className="ml-3 text-xs text-slate-400 font-normal normal-case tracking-normal">
//             {subtitle}
//           </span>
//         )}
//       </div>
//       <svg
//         className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
//           isOpen ? "rotate-180" : ""
//         }`}
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//       </svg>
//     </button>
//   );
// }

// function MetricCard({
//   label,
//   value,
//   unit,
//   muted,
// }: {
//   label: string;
//   value: string;
//   unit?: string;
//   muted?: boolean;
// }) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-lg p-4">
//       <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
//         {label}
//       </p>
//       <p
//         className={`text-xl font-semibold ${
//           muted ? "text-slate-400 italic text-base" : "text-slate-800"
//         }`}
//       >
//         {value}
//         {unit && !muted && (
//           <span className="text-sm font-normal text-slate-400 ml-1">
//             {unit}
//           </span>
//         )}
//       </p>
//     </div>
//   );
// }

// function NullBadge({ note }: { note?: string }) {
//   return (
//     <span
//       className="inline-flex items-center gap-1 text-slate-400 text-sm italic"
//       title={note}
//     >
//       —
//       {note && (
//         <span className="text-xs not-italic text-slate-300">({note})</span>
//       )}
//     </span>
//   );
// }

// function TableRow({
//   label,
//   value,
//   unit,
//   note,
//   highlight,
// }: {
//   label: string;
//   value: string | null | undefined;
//   unit?: string;
//   note?: string;
//   highlight?: boolean;
// }) {
//   return (
//     <tr
//       className={`border-b border-slate-100 last:border-0 ${
//         highlight ? "bg-cyan-50/50" : "hover:bg-slate-50/50"
//       } transition-colors`}
//     >
//       <td className="py-3 px-4 text-sm text-slate-500 font-medium w-56">
//         {label}
//       </td>
//       <td className="py-3 px-4 text-sm">
//         {value == null || value === "—" ? (
//           <NullBadge note={note} />
//         ) : (
//           <span className="font-semibold text-slate-700">
//             {value}
//             {unit && (
//               <span className="font-normal text-slate-400 ml-1">{unit}</span>
//             )}
//           </span>
//         )}
//       </td>
//     </tr>
//   );
// }

// // ─── System Section ───────────────────────────────────────────────────────────

// function SystemSection({ system }: { system: SystemData }) {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
//       <SectionHeader
//         title="System Parameters"
//         subtitle="Core operating conditions"
//         isOpen={open}
//         onToggle={() => setOpen(!open)}
//       />
//       {open && (
//         <div className="p-6 bg-white">
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
//             <MetricCard
//               label="Recirculation Rate"
//               value={fmtInt(system.recirculation_rate_gpm)}
//               unit="GPM"
//             />
//             <MetricCard
//               label="Hot Water Temp"
//               value={String(system.hot_water_temp_f)}
//               unit="°F"
//             />
//             <MetricCard
//               label="Cold Water Temp"
//               value={String(system.cold_water_temp_f)}
//               unit="°F"
//             />
//             <MetricCard
//               label="Skin Temp"
//               value={String(system.skin_temp_f)}
//               unit="°F"
//             />
//             <MetricCard
//               label="Range"
//               value={String(system.range.range_f)}
//               unit="°F"
//             />
//             <MetricCard
//               label="Heat Load"
//               value={fmtInt(system.heat_load.heat_load_tons)}
//               unit="tons"
//             />
//             <MetricCard
//               label="Calculated Tons"
//               value={fmtInt(system.cooling_tons.calculated_tons)}
//               unit="tons"
//             />
//             <MetricCard label="Drift" value={`${system.drift_percent}%`} />
//           </div>

//           <div className="rounded-lg border border-slate-200 overflow-hidden">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-slate-50 border-b border-slate-200">
//                   <th className="py-2.5 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-56">
//                     Parameter
//                   </th>
//                   <th className="py-2.5 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                     Value
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <TableRow
//                   label="Wet Bulb Temp"
//                   value={
//                     system.wet_bulb_temp_f != null
//                       ? `${system.wet_bulb_temp_f} °F`
//                       : null
//                   }
//                   note="Not provided"
//                 />
//                 <TableRow
//                   label="Approach"
//                   value={
//                     system.approach.approach_f != null
//                       ? `${system.approach.approach_f} °F`
//                       : null
//                   }
//                   note={system.approach.note}
//                 />
//                 <TableRow
//                   label="Efficiency"
//                   value={
//                     system.efficiency.efficiency_percent != null
//                       ? `${system.efficiency.efficiency_percent}%`
//                       : null
//                   }
//                   note={system.efficiency.note}
//                 />
//                 <TableRow
//                   label="Evaporation Factor"
//                   value={`${system.evaporation_factor_pct}%`}
//                 />
//                 <TableRow
//                   label="Cooling Tons (Input)"
//                   value={
//                     system.cooling_tons.input_tons != null
//                       ? fmtInt(system.cooling_tons.input_tons)
//                       : null
//                   }
//                   note="Not provided"
//                 />
//                 <TableRow
//                   label="Heat Load (BTU/hr)"
//                   value={fmtInt(system.heat_load.heat_load_btu_hr)}
//                 />
//                 <TableRow
//                   label="Dissolved Oxygen"
//                   value={`${system.dissolved_oxygen.do_ppm} ppm`}
//                   highlight
//                 />
//                 <TableRow
//                   label="Water Temp (°C)"
//                   value={`${system.dissolved_oxygen.water_temp_c} °C`}
//                   highlight
//                 />
//                 <TableRow
//                   label="Wet Bulb Temp (°C)"
//                   value={`${system.dissolved_oxygen.wet_bulb_temp_c} °C`}
//                   highlight
//                 />
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Per-CoC Section ──────────────────────────────────────────────────────────

// function CocSection({ perCoc }: { perCoc: CocEntry[] }) {
//   const [open, setOpen] = useState(true);
//   const [activeTab, setActiveTab] = useState(0);

//   const entry = perCoc[activeTab];
//   const hasData = entry.blowdown.blowdown_rate_gpm != null;

//   return (
//     <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
//       <SectionHeader
//         title="Per Cycle of Concentration"
//         subtitle={`${perCoc.length} CoC levels`}
//         isOpen={open}
//         onToggle={() => setOpen(!open)}
//       />
//       {open && (
//         <div className="bg-white">
//           {/* Tabs */}
//           <div className="flex gap-1 px-6 pt-5 pb-0 border-b border-slate-200">
//             {perCoc.map((item, i) => (
//               <button
//                 key={item.coc}
//                 onClick={() => setActiveTab(i)}
//                 className={`px-4 py-2 text-sm font-medium rounded-t-lg border border-b-0 transition-colors duration-150 -mb-px ${
//                   activeTab === i
//                     ? "bg-white border-slate-200 text-cyan-600 border-b-white z-10"
//                     : "bg-slate-50 border-transparent text-slate-500 hover:text-slate-700"
//                 }`}
//               >
//                 CoC {item.coc}
//                 {item.coc === 1 && (
//                   <span className="ml-1.5 text-xs text-amber-500">⚠</span>
//                 )}
//               </button>
//             ))}
//           </div>

//           <div className="p-6">
//             {/* Metric cards */}
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
//               <MetricCard
//                 label="Evaporation Rate"
//                 value={fmt(entry.evaporation.evaporation_rate_gpm, 1)}
//                 unit="GPM"
//               />
//               <MetricCard
//                 label="Blowdown Rate"
//                 value={hasData ? fmt(entry.blowdown.blowdown_rate_gpm) : "—"}
//                 unit={hasData ? "GPM" : undefined}
//                 muted={!hasData}
//               />
//               <MetricCard
//                 label="Makeup Rate"
//                 value={
//                   entry.makeup.makeup_rate_gpm != null
//                     ? fmt(entry.makeup.makeup_rate_gpm)
//                     : "—"
//                 }
//                 unit={entry.makeup.makeup_rate_gpm != null ? "GPM" : undefined}
//                 muted={entry.makeup.makeup_rate_gpm == null}
//               />
//               <MetricCard
//                 label="Evaporation Factor"
//                 value={`${entry.evaporation.evaporation_factor_pct}%`}
//               />
//             </div>

//             {/* Two-column tables */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               {/* Water balance */}
//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
//                   Water Balance
//                 </p>
//                 <div className="rounded-lg border border-slate-200 overflow-hidden">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-slate-50 border-b border-slate-200">
//                         <th className="py-2.5 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                           Parameter
//                         </th>
//                         <th className="py-2.5 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                           Value
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <TableRow
//                         label="Evaporation Rate"
//                         value={fmt(entry.evaporation.evaporation_rate_gpm, 1)}
//                         unit="GPM"
//                       />
//                       <TableRow
//                         label="Blowdown Rate"
//                         value={
//                           hasData ? fmt(entry.blowdown.blowdown_rate_gpm) : null
//                         }
//                         unit="GPM"
//                         note={entry.blowdown.note}
//                       />
//                       <TableRow
//                         label="Drift Rate"
//                         value={
//                           entry.makeup.drift_rate_gpm != null
//                             ? fmt(entry.makeup.drift_rate_gpm, 0)
//                             : null
//                         }
//                         unit="GPM"
//                         note="Not applicable"
//                       />
//                       <TableRow
//                         label="Makeup Rate"
//                         value={
//                           entry.makeup.makeup_rate_gpm != null
//                             ? fmt(entry.makeup.makeup_rate_gpm)
//                             : null
//                         }
//                         unit="GPM"
//                         note={entry.makeup.note}
//                       />
//                       <TableRow
//                         label="Drift %"
//                         value={
//                           entry.makeup.drift_percent != null
//                             ? `${entry.makeup.drift_percent}%`
//                             : null
//                         }
//                         note="Not applicable"
//                       />
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Chemical dosing */}
//               <div>
//                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
//                   Chemical Dosing
//                 </p>
//                 <div className="rounded-lg border border-slate-200 overflow-hidden">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-slate-50 border-b border-slate-200">
//                         <th className="py-2.5 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                           Parameter
//                         </th>
//                         <th className="py-2.5 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                           Value
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <TableRow
//                         label="Product"
//                         value={entry.chemical.product}
//                       />
//                       <TableRow
//                         label="Dosage"
//                         value={`${entry.chemical.dosage_ppm} ppm`}
//                       />
//                       <TableRow
//                         label="M lbs Blowdown/day"
//                         value={
//                           entry.chemical.million_lbs_blowdown_per_day != null
//                             ? fmt(entry.chemical.million_lbs_blowdown_per_day)
//                             : null
//                         }
//                         note={entry.chemical.note}
//                       />
//                       <TableRow
//                         label="Lbs / Day"
//                         value={
//                           entry.chemical.lbs_per_day != null
//                             ? fmt(entry.chemical.lbs_per_day)
//                             : null
//                         }
//                         note={entry.chemical.note}
//                         highlight={entry.chemical.lbs_per_day != null}
//                       />
//                       <TableRow
//                         label="Lbs / Year"
//                         value={
//                           entry.chemical.lbs_per_year != null
//                             ? fmt(entry.chemical.lbs_per_year)
//                             : null
//                         }
//                         note={entry.chemical.note}
//                         highlight={entry.chemical.lbs_per_year != null}
//                       />
//                       <TableRow
//                         label="Operating Days/Year"
//                         value={
//                           entry.chemical.operating_days_per_year != null
//                             ? String(entry.chemical.operating_days_per_year)
//                             : null
//                         }
//                         note="Not applicable"
//                       />
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             {/* CoC 1 warning */}
//             {entry.coc === 1 && (
//               <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">
//                 <svg
//                   className="w-4 h-4 mt-0.5 flex-shrink-0"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 CoC must be greater than 1 for blowdown, makeup, and chemical
//                 dosing calculations to apply.
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function CoolingTowerTable({ data }: CoolingTowerTableProps) {
//   const operatingDays =
//     data.per_coc.find((c) => c.chemical.operating_days_per_year != null)
//       ?.chemical.operating_days_per_year ?? "—";

//   return (
//     <div className="">
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
//             Cooling Tower Analysis
//           </h1>
//           <p className="text-sm text-slate-400 mt-1">
//             System parameters and per-cycle-of-concentration breakdown
//           </p>
//         </div>

//         {/* Sections */}
//         <SystemSection system={data.system} />
//         <CocSection perCoc={data.per_coc} />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Range {
  range_f: number;
  note: string;
}

export interface Approach {
  approach_f: number | null;
  note: string;
}

export interface Efficiency {
  efficiency_percent: number | null;
  note: string;
}

export interface HeatLoad {
  heat_load_btu_hr: number;
  heat_load_tons: number;
}

export interface CoolingTons {
  calculated_tons: number;
  input_tons: number | null;
}

export interface DissolvedOxygen {
  do_ppm: number;
  water_temp_c: number;
  wet_bulb_temp_c: number;
}

export interface SystemData {
  recirculation_rate_gpm: number;
  hot_water_temp_f: number;
  cold_water_temp_f: number;
  wet_bulb_temp_f: number | null;
  skin_temp_f: number;
  drift_percent: number;
  evaporation_factor_pct: number;
  cooling_tons_input: number | null;
  range: Range;
  approach: Approach;
  efficiency: Efficiency;
  heat_load: HeatLoad;
  cooling_tons: CoolingTons;
  dissolved_oxygen: DissolvedOxygen;
}

export interface Evaporation {
  evaporation_rate_gpm: number;
  evaporation_factor_pct: number;
}

export interface Blowdown {
  blowdown_rate_gpm: number | null;
  note?: string;
}

export interface Makeup {
  makeup_rate_gpm: number | null;
  evaporation_rate_gpm?: number;
  blowdown_rate_gpm?: number;
  drift_rate_gpm?: number;
  drift_percent?: number;
  note?: string;
}

export interface Chemical {
  product: string;
  dosage_ppm: number;
  million_lbs_blowdown_per_day?: number;
  lbs_per_day: number | null;
  lbs_per_year: number | null;
  operating_days_per_year?: number;
  note?: string;
}

export interface CocEntry {
  coc: number;
  evaporation: Evaporation;
  blowdown: Blowdown;
  makeup: Makeup;
  chemical: Chemical;
}

export interface CoolingTowerAnalysis {
  system: SystemData;
  per_coc: CocEntry[];
}

interface CoolingTowerTableProps {
  data: CoolingTowerAnalysis;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hasValue(v: unknown): boolean {
  return v !== null && v !== undefined;
}

function fmt(value: number | null | undefined, decimals = 2): string {
  if (!hasValue(value)) return "";
  return (value as number).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtInt(value: number | null | undefined): string {
  if (!hasValue(value)) return "";
  return (value as number).toLocaleString("en-US");
}

// ─── Metric Card — only renders when value is present ─────────────────────────

function MetricCard({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
  accent?: "blue" | "cyan" | "emerald" | "violet" | "amber";
}) {
  if (!hasValue(value) || value === "") return null;

  const accentMap: Record<string, string> = {
    blue: "from-blue-50 to-blue-100/60 border-blue-200 text-blue-700",
    cyan: "from-cyan-50 to-cyan-100/60 border-cyan-200 text-cyan-700",
    emerald:
      "from-emerald-50 to-emerald-100/60 border-emerald-200 text-emerald-700",
    violet: "from-violet-50 to-violet-100/60 border-violet-200 text-violet-700",
    amber: "from-amber-50 to-amber-100/60 border-amber-200 text-amber-700",
  };

  const labelMap: Record<string, string> = {
    blue: "text-blue-500",
    cyan: "text-cyan-500",
    emerald: "text-emerald-500",
    violet: "text-violet-500",
    amber: "text-amber-500",
  };

  const key = accent ?? "blue";
  const cardCls = accentMap[key];
  const labelCls = labelMap[key];

  return (
    <div
      className={`relative rounded-xl border bg-gradient-to-br ${cardCls} p-4 flex flex-col gap-1 transition-all duration-300`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-widest ${labelCls}`}
      >
        {label}
      </p>
      <p className="text-2xl font-bold text-slate-800 leading-tight">
        {String(value)}
        {unit && (
          <span className="text-sm font-medium text-slate-400 ml-1">
            {unit}
          </span>
        )}
      </p>
    </div>
  );
}

// ─── Table Row — only renders when value is present ───────────────────────────

function TableRow({
  label,
  value,
  unit,
  highlight,
  icon,
}: {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
  highlight?: boolean;
  icon?: React.ReactNode;
}) {
  if (!hasValue(value) || value === "" || value === null) return null;

  return (
    <tr
      className={`group border-b border-slate-100 last:border-0 transition-colors duration-150 ${
        highlight
          ? "bg-gradient-to-r from-cyan-50/70 to-transparent"
          : "hover:bg-slate-50/80"
      }`}
    >
      <td className="py-3 px-5 text-sm text-slate-500 font-medium w-60">
        <span className="flex items-center gap-2">
          {icon && <span className="opacity-60">{icon}</span>}
          {label}
        </span>
      </td>
      <td className="py-3 px-5 text-sm">
        <span
          className={`font-semibold ${
            highlight ? "text-cyan-700" : "text-slate-700"
          }`}
        >
          {String(value)}
          {unit && (
            <span className="font-normal text-slate-400 ml-1">{unit}</span>
          )}
        </span>
      </td>
    </tr>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  badge,
  children,
  defaultOpen = true,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 transition-all duration-200 border-b border-slate-100 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">
            {title}
          </span>
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold">
              {badge}
            </span>
          )}
        </div>
        <div
          className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg
            className="w-3.5 h-3.5 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      {open && <div className="animate-fadeIn">{children}</div>}
    </div>
  );
}

// ─── Styled Table Wrapper ─────────────────────────────────────────────────────

function DataTable({
  title,
  children,
  accentColor = "slate",
}: {
  title?: string;
  children: React.ReactNode;
  accentColor?: string;
}) {
  // Check if there are any actual <tr> children rendered
  const hasRows = !!children;

  if (!hasRows) return null;

  return (
    <div>
      {title && (
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
          {title}
        </p>
      )}
      <div className={`rounded-xl border border-slate-200 overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr
              className={`bg-gradient-to-r from-slate-50 to-white border-b border-slate-200`}
            >
              <th className="py-2.5 px-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest w-60">
                Parameter
              </th>
              <th className="py-2.5 px-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Value
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── System Section ───────────────────────────────────────────────────────────

function SystemSection({ system }: { system: SystemData }) {
  return (
    <Section title="System Parameters" badge="Operating Conditions">
      <div className="p-6 space-y-6">
        {/* Metric cards grid — only non-null values render */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <MetricCard
            label="Recirculation Rate"
            value={fmtInt(system.recirculation_rate_gpm)}
            unit="GPM"
            accent="blue"
          />
          <MetricCard
            label="Hot Water Temp"
            value={system.hot_water_temp_f}
            unit="°F"
            accent="amber"
          />
          <MetricCard
            label="Cold Water Temp"
            value={system.cold_water_temp_f}
            unit="°F"
            accent="cyan"
          />
          <MetricCard
            label="Skin Temp"
            value={system.skin_temp_f}
            unit="°F"
            accent="amber"
          />
          <MetricCard
            label="Range"
            value={system.range.range_f}
            unit="°F"
            accent="violet"
          />
          <MetricCard
            label="Heat Load"
            value={fmtInt(system.heat_load.heat_load_tons)}
            unit="tons"
            accent="emerald"
          />
          <MetricCard
            label="Calculated Tons"
            value={fmtInt(system.cooling_tons.calculated_tons)}
            unit="tons"
            accent="emerald"
          />
          <MetricCard
            label="Drift"
            value={system.drift_percent}
            unit="%"
            accent="violet"
          />
          <MetricCard
            label="Wet Bulb Temp"
            value={system.wet_bulb_temp_f}
            unit="°F"
            accent="cyan"
          />
          <MetricCard
            label="Cooling Tons (Input)"
            value={system.cooling_tons.input_tons}
            unit="tons"
            accent="emerald"
          />
        </div>

        {/* Detail table — only rows with values are shown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DataTable title="Thermal Properties">
            <TableRow
              label="Evaporation Factor"
              value={`${system.evaporation_factor_pct}%`}
            />
            <TableRow label="Range" value={system.range.range_f} unit="°F" />
            <TableRow label="Range Note" value={system.range.note} />
            <TableRow
              label="Approach"
              value={system.approach.approach_f}
              unit="°F"
            />
            <TableRow
              label="Efficiency"
              value={
                system.efficiency.efficiency_percent != null
                  ? `${system.efficiency.efficiency_percent}%`
                  : null
              }
            />
            <TableRow
              label="Heat Load"
              value={fmtInt(system.heat_load.heat_load_btu_hr)}
              unit="BTU/hr"
              highlight
            />
            <TableRow
              label="Heat Load"
              value={fmtInt(system.heat_load.heat_load_tons)}
              unit="tons"
              highlight
            />
          </DataTable>

          <DataTable title="Dissolved Oxygen">
            <TableRow
              label="DO Level"
              value={`${system.dissolved_oxygen.do_ppm} ppm`}
              highlight
            />
            <TableRow
              label="Water Temp"
              value={system.dissolved_oxygen.water_temp_c}
              unit="°C"
              highlight
            />
            <TableRow
              label="Wet Bulb Temp"
              value={system.dissolved_oxygen.wet_bulb_temp_c}
              unit="°C"
              highlight
            />
          </DataTable>
        </div>
      </div>
    </Section>
  );
}

// ─── Per-CoC Section ──────────────────────────────────────────────────────────

function CocSection({ perCoc }: { perCoc: CocEntry[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const entry = perCoc[activeTab];
  const hasBlowdown = entry.blowdown.blowdown_rate_gpm != null;

  return (
    <Section
      title="Per Cycle of Concentration"
      badge={`${perCoc.length} CoC levels`}
      defaultOpen={false}
    >
      {/* Tab bar */}
      <div className="flex gap-1 px-6 pt-4 pb-0 border-b border-slate-100 overflow-x-auto">
        {perCoc.map((item, i) => (
          <button
            key={item.coc}
            onClick={() => setActiveTab(i)}
            className={`relative px-5 py-2.5 text-sm font-semibold rounded-t-xl border border-b-0 transition-all duration-200 whitespace-nowrap -mb-px ${
              activeTab === i
                ? "bg-white border-slate-200 text-cyan-600 shadow-sm z-10"
                : "bg-slate-50 border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            }`}
          >
            CoC {item.coc}
            {item.blowdown.blowdown_rate_gpm == null && (
              <span className="ml-1.5 text-[10px] text-amber-400 font-bold">
                ⚠
              </span>
            )}
            {activeTab === i && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* CoC warning */}
        {!hasBlowdown && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              CoC must be <strong>greater than 1</strong> for blowdown, makeup,
              and chemical dosing calculations to be available. Values will
              appear automatically when CoC &gt; 1.
            </span>
          </div>
        )}

        {/* Metric cards — only show those with values */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard
            label="Evaporation Rate"
            value={fmt(entry.evaporation.evaporation_rate_gpm, 1)}
            unit="GPM"
            accent="blue"
          />
          <MetricCard
            label="Evaporation Factor"
            value={entry.evaporation.evaporation_factor_pct}
            unit="%"
            accent="violet"
          />
          <MetricCard
            label="Blowdown Rate"
            value={
              entry.blowdown.blowdown_rate_gpm != null
                ? fmt(entry.blowdown.blowdown_rate_gpm)
                : null
            }
            unit="GPM"
            accent="cyan"
          />
          <MetricCard
            label="Makeup Rate"
            value={
              entry.makeup.makeup_rate_gpm != null
                ? fmt(entry.makeup.makeup_rate_gpm)
                : null
            }
            unit="GPM"
            accent="emerald"
          />
          <MetricCard
            label="Drift Rate"
            value={entry.makeup.drift_rate_gpm ?? null}
            unit="GPM"
            accent="amber"
          />
          <MetricCard
            label="Drift %"
            value={entry.makeup.drift_percent ?? null}
            unit="%"
            accent="amber"
          />
          <MetricCard
            label="Lbs / Day"
            value={
              entry.chemical.lbs_per_day != null
                ? fmt(entry.chemical.lbs_per_day)
                : null
            }
            unit="lbs"
            accent="emerald"
          />
          <MetricCard
            label="Lbs / Year"
            value={
              entry.chemical.lbs_per_year != null
                ? fmt(entry.chemical.lbs_per_year)
                : null
            }
            unit="lbs"
            accent="emerald"
          />
        </div>

        {/* Detail tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DataTable title="Water Balance">
            <TableRow
              label="Evaporation Rate"
              value={fmt(entry.evaporation.evaporation_rate_gpm, 1)}
              unit="GPM"
            />
            <TableRow
              label="Blowdown Rate"
              value={
                entry.blowdown.blowdown_rate_gpm != null
                  ? fmt(entry.blowdown.blowdown_rate_gpm)
                  : null
              }
              unit="GPM"
            />
            <TableRow
              label="Drift Rate"
              value={
                entry.makeup.drift_rate_gpm != null
                  ? fmt(entry.makeup.drift_rate_gpm, 0)
                  : null
              }
              unit="GPM"
            />
            <TableRow
              label="Makeup Rate"
              value={
                entry.makeup.makeup_rate_gpm != null
                  ? fmt(entry.makeup.makeup_rate_gpm)
                  : null
              }
              unit="GPM"
              highlight
            />
            <TableRow
              label="Drift %"
              value={
                entry.makeup.drift_percent != null
                  ? `${entry.makeup.drift_percent}%`
                  : null
              }
            />
          </DataTable>

          <DataTable title="Chemical Dosing">
            <TableRow label="Product" value={entry.chemical.product} />
            <TableRow
              label="Dosage"
              value={`${entry.chemical.dosage_ppm} ppm`}
            />
            <TableRow
              label="M lbs Blowdown / Day"
              value={
                entry.chemical.million_lbs_blowdown_per_day != null
                  ? fmt(entry.chemical.million_lbs_blowdown_per_day)
                  : null
              }
            />
            <TableRow
              label="Lbs / Day"
              value={
                entry.chemical.lbs_per_day != null
                  ? fmt(entry.chemical.lbs_per_day)
                  : null
              }
              highlight
            />
            <TableRow
              label="Lbs / Year"
              value={
                entry.chemical.lbs_per_year != null
                  ? fmt(entry.chemical.lbs_per_year)
                  : null
              }
              highlight
            />
            <TableRow
              label="Operating Days / Year"
              value={entry.chemical.operating_days_per_year ?? null}
            />
          </DataTable>
        </div>
      </div>
    </Section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CoolingTowerTable({ data }: CoolingTowerTableProps) {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out both; }
      `}</style>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Cooling Tower Analysis
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Only fields with available data are displayed. Values appear
            automatically as data becomes available.
          </p>
        </div>
        <SystemSection system={data.system} />
        <CocSection perCoc={data.per_coc} />
      </div>
    </>
  );
}
