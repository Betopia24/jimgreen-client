// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface CoolingTowerData {
//   range: {
//     range_f: number;
//     hot_water_temp_f: number;
//     cold_water_temp_f: number;
//   };
//   approach: {
//     approach_f: number;
//     cold_water_temp_f: number;
//     wet_bulb_temp_f: number;
//   };
//   efficiency: {
//     efficiency_percent: number;
//     range_f: number;
//     approach_f: number;
//   };
//   evaporation: {
//     evaporation_rate_gpm: number;
//     recirculation_rate_gpm: number;
//     delta_t_f: number;
//     evaporation_factor_percent: number;
//   };
//   blowdown: {
//     blowdown_rate_gpm: number;
//     evaporation_rate_gpm: number;
//     coc: number;
//   };
//   makeup: {
//     makeup_rate_gpm: number;
//     evaporation_rate_gpm: number;
//     blowdown_rate_gpm: number;
//     drift_rate_gpm: number;
//     drift_percent: number;
//   };
//   heat_load: {
//     heat_load_btu_hr: number;
//     recirculation_rate_gpm: number;
//     range_f: number;
//   };
//   cooling_tons: {
//     cooling_tons: number;
//     recirculation_rate_gpm: number;
//     range_f: number;
//   };
// }

// // ─── SVG Icons ────────────────────────────────────────────────────────────────
// const Icons = {
//   Thermometer: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
//     </svg>
//   ),
//   Droplet: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
//     </svg>
//   ),
//   Zap: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//     </svg>
//   ),
//   Wind: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
//       <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
//       <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
//     </svg>
//   ),
//   Activity: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
//     </svg>
//   ),
//   Layers: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <polygon points="12 2 2 7 12 12 22 7 12 2" />
//       <polyline points="2 17 12 22 22 17" />
//       <polyline points="2 12 12 17 22 12" />
//     </svg>
//   ),
//   Anchor: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <circle cx="12" cy="5" r="3" />
//       <line x1="12" y1="22" x2="12" y2="8" />
//       <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
//     </svg>
//   ),
//   Flame: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
//     </svg>
//   ),
//   Snowflake: () => (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <line x1="2" y1="12" x2="22" y2="12" />
//       <line x1="12" y1="2" x2="12" y2="22" />
//       <path d="m20 16-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4" />
//     </svg>
//   ),
//   AlertTriangle: () => (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
//       <line x1="12" y1="9" x2="12" y2="13" />
//       <line x1="12" y1="17" x2="12.01" y2="17" />
//     </svg>
//   ),
//   CheckCircle: () => (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//       <polyline points="22 4 12 14.01 9 11.01" />
//     </svg>
//   ),
//   Info: () => (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <line x1="12" y1="8" x2="12" y2="12" />
//       <line x1="12" y1="16" x2="12.01" y2="16" />
//     </svg>
//   ),
//   Download: () => (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//       <polyline points="7 10 12 15 17 10" />
//       <line x1="12" y1="15" x2="12" y2="3" />
//     </svg>
//   ),
//   Tower: () => (
//     <svg
//       width="22"
//       height="22"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <rect x="4" y="2" width="16" height="6" rx="1" />
//       <path d="M8 8v13M16 8v13" />
//       <path d="M6 13h12M6 18h12" />
//     </svg>
//   ),
//   EmptyBox: () => (
//     <svg
//       width="52"
//       height="52"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.2"
//     >
//       <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
//       <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
//       <line x1="12" y1="22.08" x2="12" y2="12" />
//     </svg>
//   ),
// };

// // ─── Reusable UI Components ───────────────────────────────────────────────────
// interface MetricCardProps {
//   icon: React.ReactNode;
//   label: string;
//   value: string | number;
//   unit: string;
//   subtitle: string;
//   accentColor: string;
//   iconBg: string;
//   borderColor: string;
// }
// const MetricCard = ({
//   icon,
//   label,
//   value,
//   unit,
//   subtitle,
//   accentColor,
//   iconBg,
//   borderColor,
// }: MetricCardProps) => (
//   <div
//     className={`rounded-2xl p-5 bg-white shadow-sm border-l-4 ${borderColor} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group`}
//   >
//     <div
//       className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 ${iconBg}`}
//     >
//       <span className={accentColor}>{icon}</span>
//     </div>
//     <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
//       {label}
//     </p>
//     <div className="flex items-baseline gap-1.5">
//       <span className="text-2xl font-black text-slate-800 font-mono">
//         {value}
//       </span>
//       <span className="text-sm font-semibold text-slate-400">{unit}</span>
//     </div>
//     <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{subtitle}</p>
//   </div>
// );

// interface StatRowProps {
//   label: string;
//   value: string | number;
//   highlight?: boolean;
//   badge?: string;
//   badgeColor?: string;
// }
// const StatRow = ({
//   label,
//   value,
//   highlight,
//   badge,
//   badgeColor = "bg-blue-100 text-blue-700",
// }: StatRowProps) => (
//   <div className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0 group hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors">
//     <span className="text-sm text-slate-500 font-medium">{label}</span>
//     <div className="flex items-center gap-2">
//       {badge && (
//         <span
//           className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badgeColor}`}
//         >
//           {badge}
//         </span>
//       )}
//       <span
//         className={`text-sm font-bold font-mono ${highlight ? "text-blue-600" : "text-slate-800"}`}
//       >
//         {value}
//       </span>
//     </div>
//   </div>
// );

// interface SectionCardProps {
//   title: string;
//   icon: React.ReactNode;
//   iconBg: string;
//   iconColor: string;
//   children: React.ReactNode;
// }
// const SectionCard = ({
//   title,
//   icon,
//   iconBg,
//   iconColor,
//   children,
// }: SectionCardProps) => (
//   <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
//     <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-50">
//       <div
//         className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}
//       >
//         {icon}
//       </div>
//       <h3 className="font-bold text-slate-800 text-sm tracking-tight">
//         {title}
//       </h3>
//     </div>
//     {children}
//   </div>
// );

// // ─── No Data Empty State ──────────────────────────────────────────────────────
// const EmptyState = () => (
//   <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center gap-4 text-center">
//     <span className="text-slate-200">
//       <Icons.EmptyBox />
//     </span>
//     <h2 className="text-lg font-bold text-slate-600">
//       No Analysis Data Available
//     </h2>
//     <p className="text-sm text-slate-400 max-w-sm">
//       Run a cooling tower calculation first. The results will automatically
//       appear here once the analysis completes.
//     </p>
//     <div className="mt-2 px-5 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-500">
//       Waiting for Redux state:{" "}
//       <code className="font-mono ml-1">state.analysisLab.coolingTower</code>
//     </div>
//   </div>
// );

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function CoolingTowerReport() {
//   //  Pull directly from Redux — no fetch, no local state for data
//   const d = useSelector(
//     (state: RootState) =>
//       state.analysisLab.coolingTower as CoolingTowerData | null,
//   );

//   // ── Guard: no data yet ────────────────────────────────────────────────────
//   if (!d)
//     return (
//       <div className="min-h-screen bg-slate-50 font-sans">
//         <Header d={null} />
//         <EmptyState />
//       </div>
//     );

//   // ── Derived display values (all from Redux d) ─────────────────────────────
//   const efficiency = d.efficiency.efficiency_percent;

//   const efficiencyStatus =
//     efficiency >= 70
//       ? "excellent"
//       : efficiency >= 55
//         ? "good"
//         : efficiency >= 40
//           ? "moderate"
//           : "low";

//   const efficiencyConfig = {
//     excellent: {
//       bar: "bg-emerald-500",
//       text: "text-emerald-600",
//       badge: "bg-emerald-100 text-emerald-700",
//     },
//     good: {
//       bar: "bg-blue-500",
//       text: "text-blue-600",
//       badge: "bg-blue-100 text-blue-700",
//     },
//     moderate: {
//       bar: "bg-amber-400",
//       text: "text-amber-500",
//       badge: "bg-amber-100 text-amber-700",
//     },
//     low: {
//       bar: "bg-red-500",
//       text: "text-red-500",
//       badge: "bg-red-100 text-red-700",
//     },
//   }[efficiencyStatus];

//   const heatLoadDisplay =
//     d.heat_load.heat_load_btu_hr >= 1_000_000
//       ? `${(d.heat_load.heat_load_btu_hr / 1_000_000).toFixed(1)}M`
//       : d.heat_load.heat_load_btu_hr.toLocaleString();

//   // ── Dynamic smart recommendations ────────────────────────────────────────
//   const recommendations: {
//     type: "success" | "info" | "warning";
//     title: string;
//     detail: string;
//   }[] = [
//     {
//       type: efficiency >= 55 ? "success" : "warning",
//       title:
//         efficiency >= 55
//           ? "Efficiency within optimal operational range"
//           : "Efficiency below optimal threshold — action recommended",
//       detail:
//         efficiency >= 55
//           ? `Thermal efficiency of ${efficiency}% with ${d.approach.approach_f}°F approach confirms stable tower operation. Recirculation at ${d.evaporation.recirculation_rate_gpm.toLocaleString()} GPM is performing well.`
//           : `Efficiency of ${efficiency}% is below the 55% benchmark. Inspect fill media, nozzle spray distribution, and airflow balance for possible improvements.`,
//     },
//     {
//       type: "info",
//       title: "Monitor blowdown & makeup water balance",
//       detail: `COC at ${d.blowdown.coc}×, makeup ${d.makeup.makeup_rate_gpm} GPM, blowdown ${d.blowdown.blowdown_rate_gpm} GPM. Drift loss ${d.makeup.drift_percent}% (${d.makeup.drift_rate_gpm} GPM) — maintain within design limits.`,
//     },
//     ...(d.approach.approach_f <= 5
//       ? [
//           {
//             type: "warning" as const,
//             title: "Very low approach temperature — verify sensors",
//             detail: `Approach of ${d.approach.approach_f}°F is unusually low. Confirm wet-bulb sensor accuracy (${d.approach.wet_bulb_temp_f}°F) and cold water outlet (${d.approach.cold_water_temp_f}°F).`,
//           },
//         ]
//       : []),
//     ...(d.blowdown.coc > 5
//       ? [
//           {
//             type: "warning" as const,
//             title: "High cycles of concentration detected",
//             detail: `COC of ${d.blowdown.coc}× exceeds the recommended maximum of 5×. Increase blowdown from ${d.blowdown.blowdown_rate_gpm} GPM to prevent scale and corrosion.`,
//           },
//         ]
//       : []),
//     ...(d.makeup.drift_percent > 0.2
//       ? [
//           {
//             type: "warning" as const,
//             title: "Elevated drift loss",
//             detail: `Drift at ${d.makeup.drift_percent}% exceeds the 0.2% guideline. Inspect drift eliminators for damage or fouling.`,
//           },
//         ]
//       : []),
//   ];

//   const recStyles = {
//     success: {
//       bg: "bg-emerald-50",
//       border: "border-emerald-100",
//       icon: <Icons.CheckCircle />,
//       iconColor: "text-emerald-500",
//       title: "text-emerald-800",
//       detail: "text-emerald-600",
//     },
//     info: {
//       bg: "bg-blue-50",
//       border: "border-blue-100",
//       icon: <Icons.Info />,
//       iconColor: "text-blue-500",
//       title: "text-blue-800",
//       detail: "text-blue-600",
//     },
//     warning: {
//       bg: "bg-amber-50",
//       border: "border-amber-100",
//       icon: <Icons.AlertTriangle />,
//       iconColor: "text-amber-500",
//       title: "text-amber-800",
//       detail: "text-amber-600",
//     },
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans">
//       <Header d={d} />

//       <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
//         {/* ── SECTION 1: Hero KPIs ─────────────────────────────────────────── */}
//         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
//           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-5">
//             Key Performance Indicators
//           </p>
//           <div className="flex flex-wrap gap-6 items-start">
//             {/* Efficiency */}
//             <div className="flex-1 min-w-[130px]">
//               <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">
//                 Cooling Efficiency
//               </p>
//               <div className="flex items-baseline gap-1.5">
//                 <span
//                   className={`text-4xl font-black font-mono ${efficiencyConfig.text}`}
//                 >
//                   {efficiency}
//                 </span>
//                 <span className="text-lg font-bold text-slate-400">%</span>
//               </div>
//               <p className="text-xs text-slate-400 mt-0.5">
//                 Tower thermal efficiency
//               </p>
//             </div>

//             <div className="hidden sm:block h-14 w-px bg-slate-100 self-center" />

//             {/* Cooling Tons */}
//             <div className="flex-1 min-w-[130px]">
//               <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">
//                 Cooling Capacity
//               </p>
//               <div className="flex items-baseline gap-1.5">
//                 <span className="text-4xl font-black font-mono text-blue-600">
//                   {d.cooling_tons.cooling_tons.toLocaleString()}
//                 </span>
//                 <span className="text-lg font-bold text-slate-400">RT</span>
//               </div>
//               <p className="text-xs text-slate-400 mt-0.5">
//                 {d.cooling_tons.recirculation_rate_gpm.toLocaleString()} GPM
//                 recirculation
//               </p>
//             </div>

//             <div className="hidden sm:block h-14 w-px bg-slate-100 self-center" />

//             {/* Heat Load */}
//             <div className="flex-1 min-w-[130px]">
//               <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">
//                 Heat Load
//               </p>
//               <div className="flex items-baseline gap-1.5">
//                 <span className="text-4xl font-black font-mono text-orange-500">
//                   {heatLoadDisplay}
//                 </span>
//                 <span className="text-lg font-bold text-slate-400">BTU/hr</span>
//               </div>
//               <p className="text-xs text-slate-400 mt-0.5">
//                 Range {d.heat_load.range_f}°F across tower
//               </p>
//             </div>

//             <div className="hidden sm:block h-14 w-px bg-slate-100 self-center" />

//             {/* Makeup Water */}
//             <div className="flex-1 min-w-[130px]">
//               <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">
//                 Makeup Water
//               </p>
//               <div className="flex items-baseline gap-1.5">
//                 <span className="text-4xl font-black font-mono text-cyan-600">
//                   {d.makeup.makeup_rate_gpm}
//                 </span>
//                 <span className="text-lg font-bold text-slate-400">GPM</span>
//               </div>
//               <p className="text-xs text-slate-400 mt-0.5">
//                 Drift {d.makeup.drift_percent}% · {d.makeup.drift_rate_gpm} GPM
//               </p>
//             </div>

//             <div className="hidden sm:block h-14 w-px bg-slate-100 self-center" />

//             {/* Efficiency Gauge */}
//             <div className="flex-1 min-w-[180px] self-center">
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
//                   Efficiency Gauge
//                 </p>
//                 <span
//                   className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${efficiencyConfig.badge}`}
//                 >
//                   {efficiencyStatus.toUpperCase()}
//                 </span>
//               </div>
//               <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
//                 <div
//                   className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${efficiencyConfig.bar}`}
//                   style={{ width: `${Math.min(efficiency, 100)}%` }}
//                 />
//               </div>
//               <div className="flex justify-between mt-1.5">
//                 <span className="text-[10px] text-slate-300">0%</span>
//                 <span
//                   className={`text-[10px] font-bold ${efficiencyConfig.text}`}
//                 >
//                   {efficiency}%
//                 </span>
//                 <span className="text-[10px] text-slate-300">100%</span>
//               </div>
//               <div className="flex justify-between mt-0.5 text-[9px] text-slate-300">
//                 <span>Low</span>
//                 <span>Moderate</span>
//                 <span>Excellent</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── SECTION 2: Quick Metric Cards ───────────────────────────────── */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <MetricCard
//             icon={<Icons.Thermometer />}
//             label="Temperature Range"
//             value={d.range.range_f}
//             unit="°F"
//             subtitle={`${d.range.hot_water_temp_f}°F hot → ${d.range.cold_water_temp_f}°F cold`}
//             accentColor="text-red-500"
//             iconBg="bg-red-50"
//             borderColor="border-l-red-400"
//           />
//           <MetricCard
//             icon={<Icons.Activity />}
//             label="Approach Temp"
//             value={d.approach.approach_f}
//             unit="°F"
//             subtitle={`Wet bulb ${d.approach.wet_bulb_temp_f}°F · Cold ${d.approach.cold_water_temp_f}°F`}
//             accentColor="text-violet-500"
//             iconBg="bg-violet-50"
//             borderColor="border-l-violet-400"
//           />
//           <MetricCard
//             icon={<Icons.Droplet />}
//             label="Evaporation Rate"
//             value={d.evaporation.evaporation_rate_gpm}
//             unit="GPM"
//             subtitle={`Factor ${d.evaporation.evaporation_factor_percent}% · ΔT ${d.evaporation.delta_t_f}°F`}
//             accentColor="text-cyan-500"
//             iconBg="bg-cyan-50"
//             borderColor="border-l-cyan-400"
//           />
//           <MetricCard
//             icon={<Icons.Wind />}
//             label="Recirculation"
//             value={d.evaporation.recirculation_rate_gpm.toLocaleString()}
//             unit="GPM"
//             subtitle={`Delta T ${d.evaporation.delta_t_f}°F · ${d.evaporation.evaporation_factor_percent}% factor`}
//             accentColor="text-sky-500"
//             iconBg="bg-sky-50"
//             borderColor="border-l-sky-400"
//           />
//         </div>

//         {/* ── SECTION 3: Detailed Data Panels ─────────────────────────────── */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Blowdown */}
//           <SectionCard
//             title="Blowdown"
//             icon={<Icons.Layers />}
//             iconBg="bg-amber-50"
//             iconColor="text-amber-500"
//           >
//             <StatRow
//               label="Blowdown Rate"
//               value={`${d.blowdown.blowdown_rate_gpm} GPM`}
//               highlight
//             />
//             <StatRow
//               label="Evaporation Rate"
//               value={`${d.blowdown.evaporation_rate_gpm} GPM`}
//             />
//             <StatRow
//               label="Cycles of Concentration"
//               value={`${d.blowdown.coc}×`}
//               badge={d.blowdown.coc > 5 ? "HIGH" : "OK"}
//               badgeColor={
//                 d.blowdown.coc > 5
//                   ? "bg-red-100 text-red-700"
//                   : "bg-emerald-100 text-emerald-700"
//               }
//             />
//           </SectionCard>

//           {/* Makeup Water */}
//           <SectionCard
//             title="Makeup Water"
//             icon={<Icons.Anchor />}
//             iconBg="bg-blue-50"
//             iconColor="text-blue-500"
//           >
//             <StatRow
//               label="Total Makeup Rate"
//               value={`${d.makeup.makeup_rate_gpm} GPM`}
//               highlight
//             />
//             <StatRow
//               label="Evaporation"
//               value={`${d.makeup.evaporation_rate_gpm} GPM`}
//             />
//             <StatRow
//               label="Blowdown"
//               value={`${d.makeup.blowdown_rate_gpm} GPM`}
//             />
//             <StatRow
//               label="Drift Rate"
//               value={`${d.makeup.drift_rate_gpm} GPM`}
//             />
//             <StatRow
//               label="Drift %"
//               value={`${d.makeup.drift_percent}%`}
//               badge={d.makeup.drift_percent > 0.2 ? "HIGH" : "OK"}
//               badgeColor={
//                 d.makeup.drift_percent > 0.2
//                   ? "bg-red-100 text-red-700"
//                   : "bg-emerald-100 text-emerald-700"
//               }
//             />
//           </SectionCard>

//           {/* System Flow */}
//           <SectionCard
//             title="System Flow & Load"
//             icon={<Icons.Zap />}
//             iconBg="bg-emerald-50"
//             iconColor="text-emerald-500"
//           >
//             <StatRow
//               label="Recirculation Rate"
//               value={`${d.evaporation.recirculation_rate_gpm.toLocaleString()} GPM`}
//               highlight
//             />
//             <StatRow label="Delta T" value={`${d.evaporation.delta_t_f}°F`} />
//             <StatRow
//               label="Efficiency Range"
//               value={`${d.efficiency.range_f}°F · ${d.efficiency.approach_f}°F approach`}
//             />
//             <StatRow label="Heat Load" value={`${heatLoadDisplay} BTU/hr`} />
//             <StatRow
//               label="Cooling Capacity"
//               value={`${d.cooling_tons.cooling_tons.toLocaleString()} RT`}
//             />
//           </SectionCard>
//         </div>

//         {/* ── SECTION 4: Full API Data Reference ──────────────────────────── */}
//         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
//           <div className="flex items-center gap-2 mb-6">
//             <h2 className="font-bold text-slate-900 text-base">
//               Complete Data Summary
//             </h2>
//             <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
//               ALL FIELDS
//             </span>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
//             {/* Left column */}
//             <div className="space-y-0">
//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 mb-1 border-b border-slate-100">
//                 Range
//               </p>
//               <StatRow label="Range" value={`${d.range.range_f}°F`} />
//               <StatRow
//                 label="Hot Water Temperature"
//                 value={`${d.range.hot_water_temp_f}°F`}
//               />
//               <StatRow
//                 label="Cold Water Temperature"
//                 value={`${d.range.cold_water_temp_f}°F`}
//               />

//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 mb-1 border-b border-slate-100 mt-5">
//                 Approach
//               </p>
//               <StatRow
//                 label="Approach Temperature"
//                 value={`${d.approach.approach_f}°F`}
//               />
//               <StatRow
//                 label="Cold Water Temperature"
//                 value={`${d.approach.cold_water_temp_f}°F`}
//               />
//               <StatRow
//                 label="Wet Bulb Temperature"
//                 value={`${d.approach.wet_bulb_temp_f}°F`}
//               />

//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 mb-1 border-b border-slate-100 mt-5">
//                 Efficiency
//               </p>
//               <StatRow
//                 label="Efficiency %"
//                 value={`${d.efficiency.efficiency_percent}%`}
//                 highlight
//               />
//               <StatRow label="Range" value={`${d.efficiency.range_f}°F`} />
//               <StatRow
//                 label="Approach"
//                 value={`${d.efficiency.approach_f}°F`}
//               />

//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 mb-1 border-b border-slate-100 mt-5">
//                 Evaporation
//               </p>
//               <StatRow
//                 label="Evaporation Rate"
//                 value={`${d.evaporation.evaporation_rate_gpm} GPM`}
//               />
//               <StatRow
//                 label="Recirculation Rate"
//                 value={`${d.evaporation.recirculation_rate_gpm.toLocaleString()} GPM`}
//               />
//               <StatRow label="Delta T" value={`${d.evaporation.delta_t_f}°F`} />
//               <StatRow
//                 label="Evaporation Factor"
//                 value={`${d.evaporation.evaporation_factor_percent}%`}
//               />
//             </div>

//             {/* Right column */}
//             <div className="space-y-0">
//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 mb-1 border-b border-slate-100">
//                 Blowdown
//               </p>
//               <StatRow
//                 label="Blowdown Rate"
//                 value={`${d.blowdown.blowdown_rate_gpm} GPM`}
//               />
//               <StatRow
//                 label="Evaporation Rate"
//                 value={`${d.blowdown.evaporation_rate_gpm} GPM`}
//               />
//               <StatRow
//                 label="Cycles of Concentration"
//                 value={`${d.blowdown.coc}×`}
//               />

//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 mb-1 border-b border-slate-100 mt-5">
//                 Makeup Water
//               </p>
//               <StatRow
//                 label="Makeup Rate"
//                 value={`${d.makeup.makeup_rate_gpm} GPM`}
//                 highlight
//               />
//               <StatRow
//                 label="Evaporation Rate"
//                 value={`${d.makeup.evaporation_rate_gpm} GPM`}
//               />
//               <StatRow
//                 label="Blowdown Rate"
//                 value={`${d.makeup.blowdown_rate_gpm} GPM`}
//               />
//               <StatRow
//                 label="Drift Rate"
//                 value={`${d.makeup.drift_rate_gpm} GPM`}
//               />
//               <StatRow label="Drift %" value={`${d.makeup.drift_percent}%`} />

//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 mb-1 border-b border-slate-100 mt-5">
//                 Heat Load
//               </p>
//               <StatRow
//                 label="Heat Load"
//                 value={`${d.heat_load.heat_load_btu_hr.toLocaleString()} BTU/hr`}
//                 highlight
//               />
//               <StatRow
//                 label="Recirculation Rate"
//                 value={`${d.heat_load.recirculation_rate_gpm.toLocaleString()} GPM`}
//               />
//               <StatRow label="Range" value={`${d.heat_load.range_f}°F`} />

//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1 mb-1 border-b border-slate-100 mt-5">
//                 Cooling Tons
//               </p>
//               <StatRow
//                 label="Cooling Tons"
//                 value={`${d.cooling_tons.cooling_tons.toLocaleString()} RT`}
//                 highlight
//               />
//               <StatRow
//                 label="Recirculation Rate"
//                 value={`${d.cooling_tons.recirculation_rate_gpm.toLocaleString()} GPM`}
//               />
//               <StatRow label="Range" value={`${d.cooling_tons.range_f}°F`} />
//             </div>
//           </div>
//         </div>

//         {/* ── SECTION 5: Smart Recommendations ────────────────────────────── */}
//         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
//           <h2 className="font-bold text-slate-900 text-base mb-4">
//             Interpretation & Recommendations
//           </h2>
//           <div className="space-y-3">
//             {recommendations.map((rec, idx) => {
//               const s = recStyles[rec.type];
//               return (
//                 <div
//                   key={idx}
//                   className={`flex items-start gap-3 p-4 ${s.bg} rounded-xl border ${s.border}`}
//                 >
//                   <span className={`${s.iconColor} mt-0.5 shrink-0`}>
//                     {s.icon}
//                   </span>
//                   <div>
//                     <p className={`text-sm font-semibold ${s.title}`}>
//                       {rec.title}
//                     </p>
//                     <p className={`text-xs ${s.detail} mt-0.5 leading-relaxed`}>
//                       {rec.detail}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <p className="text-center text-xs text-slate-300 pb-4">
//           Cooling Tower Analysis Report · Data source: Redux Store
//           (state.analysisLab.coolingTower)
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─── Shared Header (used in both empty + data states) ────────────────────────
// function Header({ d }: { d: CoolingTowerData | null }) {
//   const timestamp =
//     new Date().toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     }) +
//     " at " +
//     new Date().toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   return (
//     <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
//       <div className="flex items-center gap-3">
//         <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
//           <Icons.Tower />
//         </div>
//         <div>
//           <h1 className="text-lg font-bold text-slate-900 tracking-tight">
//             Cooling Tower Prediction Report
//           </h1>
//           <p className="text-xs text-slate-400">
//             {d
//               ? `Analysis completed on ${timestamp}`
//               : "Awaiting analysis data…"}
//           </p>
//         </div>
//       </div>
//       <div className="flex items-center gap-3">
//         <button
//           disabled={!d}
//           onClick={() => window.print()}
//           className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
//         >
//           <Icons.Download /> Export PDF
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ResultCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-2 text-sm text-gray-700">{children}</div>
  </div>
);

const Row = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between border-b border-gray-100 pb-1">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

const CoolingDetails = () => {
  const router = useRouter();
  const data = useSelector(
    (state: RootState) => state.analysisLab.coolingTower,
  );

  if (!data) {
    return (
      <div className="p-10 text-center text-gray-500">
        No Cooling Tower data found.
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Cooling Tower Results
        </h1>
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center py-2 px-4  rounded-xl border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" /> Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Range */}
        <ResultCard title="Range">
          <Row label="Range (°F)" value={data.range.range_f} />
          <Row
            label="Hot Water Temp (°F)"
            value={data.range.hot_water_temp_f}
          />
          <Row
            label="Cold Water Temp (°F)"
            value={data.range.cold_water_temp_f}
          />
        </ResultCard>

        {/* Approach */}
        <ResultCard title="Approach">
          <Row label="Approach (°F)" value={data.approach.approach_f} />
          <Row
            label="Cold Water Temp (°F)"
            value={data.approach.cold_water_temp_f}
          />
          <Row
            label="Wet Bulb Temp (°F)"
            value={data.approach.wet_bulb_temp_f}
          />
        </ResultCard>

        {/* Efficiency */}
        <ResultCard title="Efficiency">
          <Row
            label="Efficiency (%)"
            value={data.efficiency.efficiency_percent}
          />
          <Row label="Range (°F)" value={data.efficiency.range_f} />
          <Row label="Approach (°F)" value={data.efficiency.approach_f} />
        </ResultCard>

        {/* Evaporation */}
        <ResultCard title="Evaporation">
          <Row
            label="Evaporation Rate (GPM)"
            value={data.evaporation.evaporation_rate_gpm}
          />
          <Row
            label="Recirculation Rate (GPM)"
            value={data.evaporation.recirculation_rate_gpm}
          />
          <Row label="Delta T (°F)" value={data.evaporation.delta_t_f} />
          <Row
            label="Evaporation Factor (%)"
            value={data.evaporation.evaporation_factor_percent}
          />
        </ResultCard>

        {/* Blowdown */}
        <ResultCard title="Blowdown">
          <Row
            label="Blowdown Rate (GPM)"
            value={data.blowdown.blowdown_rate_gpm}
          />
          <Row
            label="Evaporation Rate (GPM)"
            value={data.blowdown.evaporation_rate_gpm}
          />
          <Row label="CoC" value={data.blowdown.coc} />
        </ResultCard>

        {/* Makeup */}
        <ResultCard title="Makeup">
          <Row label="Makeup Rate (GPM)" value={data.makeup.makeup_rate_gpm} />
          <Row
            label="Evaporation Rate (GPM)"
            value={data.makeup.evaporation_rate_gpm}
          />
          <Row
            label="Blowdown Rate (GPM)"
            value={data.makeup.blowdown_rate_gpm}
          />
          <Row label="Drift Rate (GPM)" value={data.makeup.drift_rate_gpm} />
          <Row label="Drift (%)" value={data.makeup.drift_percent} />
        </ResultCard>

        {/* Heat Load */}
        <ResultCard title="Heat Load">
          <Row
            label="Heat Load (BTU/hr)"
            value={data.heat_load.heat_load_btu_hr.toLocaleString()}
          />
          <Row
            label="Recirculation Rate (GPM)"
            value={data.heat_load.recirculation_rate_gpm}
          />
          <Row label="Range (°F)" value={data.heat_load.range_f} />
        </ResultCard>

        {/* Cooling Tons */}
        <ResultCard title="Cooling Tons">
          <Row label="Cooling Tons" value={data.cooling_tons.cooling_tons} />
          <Row
            label="Recirculation Rate (GPM)"
            value={data.cooling_tons.recirculation_rate_gpm}
          />
          <Row label="Range (°F)" value={data.cooling_tons.range_f} />
        </ResultCard>
      </div>
    </div>
  );
};

export default CoolingDetails;
