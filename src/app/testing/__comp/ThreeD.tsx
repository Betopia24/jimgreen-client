// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import * as THREE from "three";

// // ─── Types ───────────────────────────────────────────────────────────────────

// interface SaturationIndex {
//   SI: number;
// }

// interface LsiIndex {
//   lsi: number;
//   risk: string;
//   pHs: number;
// }

// interface RyznarIndex {
//   ri: number;
//   risk: string;
//   pHs: number;
// }

// interface PuckoriusIndex {
//   index: number;
//   risk: string;
// }

// interface LarsonSkoldIndex {
//   index: number;
//   risk_level: string;
// }

// interface StiffDavisIndex {
//   index: number;
//   risk: string;
// }

// interface CcppIndex {
//   ccpp_ppm: number;
//   risk: string;
// }

// interface Indices {
//   lsi: LsiIndex;
//   ryznar: RyznarIndex;
//   puckorius: PuckoriusIndex;
//   larson_skold: LarsonSkoldIndex;
//   stiff_davis: StiffDavisIndex;
//   ccpp: CcppIndex;
// }

// interface CorrosionMetal {
//   cr_mpy: number;
//   rating: string;
// }

// interface Corrosion {
//   mild_steel: CorrosionMetal;
//   copper: CorrosionMetal;
//   admiralty_brass: CorrosionMetal;
// }

// interface GridResult {
//   _grid_CoC: number;
//   _grid_temp: number;
//   _grid_pH: number;
//   ionic_strength: number;
//   saturation_indices: Record<string, SaturationIndex>;
//   color_code: "yellow" | "red" | "green";
//   indices: Indices;
//   corrosion: Corrosion;
// }

// // ─── Data ────────────────────────────────────────────────────────────────────

// const gridResults: GridResult[] = [
//   {_grid_CoC:1,_grid_temp:25,_grid_pH:7.5,ionic_strength:0.01515,saturation_indices:{Calcite:{SI:0.3},Anhydrite:{SI:-1.78},Aragonite:{SI:0.15},Dolomite:{SI:0.49},Gypsum:{SI:-1.47},Halite:{SI:-6.71},Quartz:{SI:0.38},Talc:{SI:0.25},Siderite:{SI:-0.6},"CO2(g)":{SI:-2.28}},color_code:"yellow",indices:{lsi:{lsi:0.26,risk:"Scale Forming",pHs:7.24},ryznar:{ri:6.98,risk:"Low Scale Risk",pHs:7.24},puckorius:{index:6.63,risk:"Corrosive"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:1.197,risk:"Scale Forming"},ccpp:{ccpp_ppm:15,risk:"Moderate Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.26,rating:"Excellent"},copper:{cr_mpy:0.05,rating:"Excellent"},admiralty_brass:{cr_mpy:0.04,rating:"Excellent"}}},
//   {_grid_CoC:1,_grid_temp:35,_grid_pH:7.5,ionic_strength:0.01498,saturation_indices:{Calcite:{SI:0.45},Anhydrite:{SI:-1.69},Aragonite:{SI:0.29},Dolomite:{SI:0.82},Gypsum:{SI:-1.49},Halite:{SI:-6.72},Quartz:{SI:0.23},Talc:{SI:1.32},Siderite:{SI:-0.48},"CO2(g)":{SI:-2.22}},color_code:"yellow",indices:{lsi:{lsi:0.45,risk:"Scale Forming",pHs:7.05},ryznar:{ri:6.6,risk:"Low Scale Risk",pHs:7.05},puckorius:{index:6.26,risk:"Balanced"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:1.286,risk:"Scale Forming"},ccpp:{ccpp_ppm:22.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.02,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:1,_grid_temp:45,_grid_pH:7.5,ionic_strength:0.01479,saturation_indices:{Calcite:{SI:0.6},Anhydrite:{SI:-1.59},Aragonite:{SI:0.41},Dolomite:{SI:1.14},Gypsum:{SI:-1.5},Halite:{SI:-6.73},Quartz:{SI:0.1},Talc:{SI:2.31},Siderite:{SI:-0.38},"CO2(g)":{SI:-2.15}},color_code:"red",indices:{lsi:{lsi:0.63,risk:"Scale Forming",pHs:6.87},ryznar:{ri:6.24,risk:"Low Scale Risk",pHs:6.87},puckorius:{index:5.89,risk:"Balanced"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:1.358,risk:"Scale Forming"},ccpp:{ccpp_ppm:30,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:1,_grid_temp:55,_grid_pH:7.5,ionic_strength:0.01457,saturation_indices:{Calcite:{SI:0.75},Anhydrite:{SI:-1.5},Aragonite:{SI:0.53},Dolomite:{SI:1.46},Gypsum:{SI:-1.5},Halite:{SI:-6.74},Quartz:{SI:-0.03},Talc:{SI:3.24},Siderite:{SI:-0.32},"CO2(g)":{SI:-2.08}},color_code:"red",indices:{lsi:{lsi:0.81,risk:"Scale Forming",pHs:6.69},ryznar:{ri:5.88,risk:"Moderate Scale Risk",pHs:6.69},puckorius:{index:5.54,risk:"Balanced"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:1.42,risk:"Scale Forming"},ccpp:{ccpp_ppm:37.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:2,_grid_temp:25,_grid_pH:7.5,ionic_strength:0.02937,saturation_indices:{Calcite:{SI:0.8},Anhydrite:{SI:-1.36},Aragonite:{SI:0.66},Dolomite:{SI:1.5},Gypsum:{SI:-1.06},Halite:{SI:-6.15},Quartz:{SI:0.68},Talc:{SI:2.14},Siderite:{SI:-0.14},"CO2(g)":{SI:-2.0}},color_code:"red",indices:{lsi:{lsi:0.83,risk:"Scale Forming",pHs:6.67},ryznar:{ri:5.84,risk:"Moderate Scale Risk",pHs:6.67},puckorius:{index:5.05,risk:"Balanced"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:1.748,risk:"Scale Forming"},ccpp:{ccpp_ppm:40,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.2,rating:"Excellent"},copper:{cr_mpy:0.04,rating:"Excellent"},admiralty_brass:{cr_mpy:0.03,rating:"Excellent"}}},
//   {_grid_CoC:2,_grid_temp:35,_grid_pH:7.5,ionic_strength:0.02897,saturation_indices:{Calcite:{SI:0.95},Anhydrite:{SI:-1.28},Aragonite:{SI:0.79},Dolomite:{SI:1.82},Gypsum:{SI:-1.08},Halite:{SI:-6.16},Quartz:{SI:0.54},Talc:{SI:3.2},Siderite:{SI:-0.02},"CO2(g)":{SI:-1.94}},color_code:"red",indices:{lsi:{lsi:1.02,risk:"Scale Forming",pHs:6.48},ryznar:{ri:5.46,risk:"High Scale Risk",pHs:6.48},puckorius:{index:4.67,risk:"Balanced"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:1.837,risk:"Scale Forming"},ccpp:{ccpp_ppm:47.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.01,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:2,_grid_temp:45,_grid_pH:7.5,ionic_strength:0.02851,saturation_indices:{Calcite:{SI:1.09},Anhydrite:{SI:-1.19},Aragonite:{SI:0.91},Dolomite:{SI:2.13},Gypsum:{SI:-1.1},Halite:{SI:-6.17},Quartz:{SI:0.4},Talc:{SI:4.18},Siderite:{SI:0.07},"CO2(g)":{SI:-1.88}},color_code:"red",indices:{lsi:{lsi:1.2,risk:"Scale Forming",pHs:6.3},ryznar:{ri:5.1,risk:"High Scale Risk",pHs:6.3},puckorius:{index:4.31,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:1.91,risk:"Scale Forming"},ccpp:{ccpp_ppm:54.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:2,_grid_temp:55,_grid_pH:7.5,ionic_strength:0.02799,saturation_indices:{Calcite:{SI:1.24},Anhydrite:{SI:-1.1},Aragonite:{SI:1.02},Dolomite:{SI:2.44},Gypsum:{SI:-1.11},Halite:{SI:-6.17},Quartz:{SI:0.27},Talc:{SI:5.1},Siderite:{SI:0.14},"CO2(g)":{SI:-1.82}},color_code:"red",indices:{lsi:{lsi:1.38,risk:"Scale Forming",pHs:6.12},ryznar:{ri:4.74,risk:"High Scale Risk",pHs:6.12},puckorius:{index:3.95,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:1.974,risk:"Scale Forming"},ccpp:{ccpp_ppm:62,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:3,_grid_temp:25,_grid_pH:7.5,ionic_strength:0.04322,saturation_indices:{Calcite:{SI:1.09},Anhydrite:{SI:-1.14},Aragonite:{SI:0.94},Dolomite:{SI:2.07},Gypsum:{SI:-0.83},Halite:{SI:-5.82},Quartz:{SI:0.86},Talc:{SI:3.23},Siderite:{SI:0.11},"CO2(g)":{SI:-1.84}},color_code:"red",indices:{lsi:{lsi:1.17,risk:"Scale Forming",pHs:6.33},ryznar:{ri:5.16,risk:"High Scale Risk",pHs:6.33},puckorius:{index:4.12,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.048,risk:"Scale Forming"},ccpp:{ccpp_ppm:54.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.2,rating:"Excellent"},copper:{cr_mpy:0.06,rating:"Excellent"},admiralty_brass:{cr_mpy:0.05,rating:"Excellent"}}},
//   {_grid_CoC:3,_grid_temp:35,_grid_pH:7.5,ionic_strength:0.04257,saturation_indices:{Calcite:{SI:1.23},Anhydrite:{SI:-1.06},Aragonite:{SI:1.07},Dolomite:{SI:2.38},Gypsum:{SI:-0.86},Halite:{SI:-5.83},Quartz:{SI:0.71},Talc:{SI:4.28},Siderite:{SI:0.23},"CO2(g)":{SI:-1.79}},color_code:"red",indices:{lsi:{lsi:1.36,risk:"Scale Forming",pHs:6.14},ryznar:{ri:4.78,risk:"High Scale Risk",pHs:6.14},puckorius:{index:3.74,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.138,risk:"Scale Forming"},ccpp:{ccpp_ppm:61.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.01,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:4,_grid_temp:25,_grid_pH:7.5,ionic_strength:0.05682,saturation_indices:{Calcite:{SI:1.29},Anhydrite:{SI:-0.98},Aragonite:{SI:1.14},Dolomite:{SI:2.47},Gypsum:{SI:-0.68},Halite:{SI:-5.59},Quartz:{SI:0.98},Talc:{SI:4.0},Siderite:{SI:0.29},"CO2(g)":{SI:-1.73}},color_code:"red",indices:{lsi:{lsi:1.41,risk:"Scale Forming",pHs:6.09},ryznar:{ri:4.68,risk:"High Scale Risk",pHs:6.09},puckorius:{index:3.46,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.246,risk:"Scale Forming"},ccpp:{ccpp_ppm:64.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.2,rating:"Excellent"},copper:{cr_mpy:0.06,rating:"Excellent"},admiralty_brass:{cr_mpy:0.05,rating:"Excellent"}}},
//   {_grid_CoC:4,_grid_temp:35,_grid_pH:7.5,ionic_strength:0.0559,saturation_indices:{Calcite:{SI:1.43},Anhydrite:{SI:-0.9},Aragonite:{SI:1.27},Dolomite:{SI:2.78},Gypsum:{SI:-0.71},Halite:{SI:-5.6},Quartz:{SI:0.84},Talc:{SI:5.05},Siderite:{SI:0.4},"CO2(g)":{SI:-1.68}},color_code:"red",indices:{lsi:{lsi:1.59,risk:"Scale Forming",pHs:5.91},ryznar:{ri:4.32,risk:"High Scale Risk",pHs:5.91},puckorius:{index:3.09,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.337,risk:"Scale Forming"},ccpp:{ccpp_ppm:71.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.01,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:5,_grid_temp:25,_grid_pH:7.5,ionic_strength:0.07025,saturation_indices:{Calcite:{SI:1.44},Anhydrite:{SI:-0.86},Aragonite:{SI:1.3},Dolomite:{SI:2.78},Gypsum:{SI:-0.56},Halite:{SI:-5.41},Quartz:{SI:1.08},Talc:{SI:4.59},Siderite:{SI:0.42},"CO2(g)":{SI:-1.65}},color_code:"red",indices:{lsi:{lsi:1.59,risk:"Scale Forming",pHs:5.91},ryznar:{ri:4.32,risk:"High Scale Risk",pHs:5.91},puckorius:{index:2.95,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.387,risk:"Scale Forming"},ccpp:{ccpp_ppm:72,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.2,rating:"Excellent"},copper:{cr_mpy:0.06,rating:"Excellent"},admiralty_brass:{cr_mpy:0.05,rating:"Excellent"}}},
//   {_grid_CoC:5,_grid_temp:35,_grid_pH:7.5,ionic_strength:0.06905,saturation_indices:{Calcite:{SI:1.58},Anhydrite:{SI:-0.79},Aragonite:{SI:1.42},Dolomite:{SI:3.08},Gypsum:{SI:-0.59},Halite:{SI:-5.42},Quartz:{SI:0.94},Talc:{SI:5.64},Siderite:{SI:0.53},"CO2(g)":{SI:-1.59}},color_code:"red",indices:{lsi:{lsi:1.78,risk:"Scale Forming",pHs:5.72},ryznar:{ri:3.94,risk:"High Scale Risk",pHs:5.72},puckorius:{index:2.58,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.48,risk:"Scale Forming"},ccpp:{ccpp_ppm:79,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.01,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:6,_grid_temp:25,_grid_pH:7.5,ionic_strength:0.08352,saturation_indices:{Calcite:{SI:1.56},Anhydrite:{SI:-0.77},Aragonite:{SI:1.42},Dolomite:{SI:3.02},Gypsum:{SI:-0.47},Halite:{SI:-5.26},Quartz:{SI:1.16},Talc:{SI:5.08},Siderite:{SI:0.52},"CO2(g)":{SI:-1.58}},color_code:"red",indices:{lsi:{lsi:1.74,risk:"Scale Forming",pHs:5.76},ryznar:{ri:4.02,risk:"High Scale Risk",pHs:5.76},puckorius:{index:2.53,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.492,risk:"Scale Forming"},ccpp:{ccpp_ppm:78,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.2,rating:"Excellent"},copper:{cr_mpy:0.06,rating:"Excellent"},admiralty_brass:{cr_mpy:0.05,rating:"Excellent"}}},
//   {_grid_CoC:6,_grid_temp:35,_grid_pH:7.5,ionic_strength:0.08204,saturation_indices:{Calcite:{SI:1.7},Anhydrite:{SI:-0.69},Aragonite:{SI:1.54},Dolomite:{SI:3.32},Gypsum:{SI:-0.5},Halite:{SI:-5.28},Quartz:{SI:1.02},Talc:{SI:6.13},Siderite:{SI:0.64},"CO2(g)":{SI:-1.53}},color_code:"red",indices:{lsi:{lsi:1.93,risk:"Scale Forming",pHs:5.57},ryznar:{ri:3.64,risk:"High Scale Risk",pHs:5.57},puckorius:{index:2.16,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.586,risk:"Scale Forming"},ccpp:{ccpp_ppm:85,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.01,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:7,_grid_temp:25,_grid_pH:7.5,ionic_strength:0.09668,saturation_indices:{Calcite:{SI:1.67},Anhydrite:{SI:-0.69},Aragonite:{SI:1.52},Dolomite:{SI:3.23},Gypsum:{SI:-0.39},Halite:{SI:-5.14},Quartz:{SI:1.23},Talc:{SI:5.49},Siderite:{SI:0.61},"CO2(g)":{SI:-1.52}},color_code:"red",indices:{lsi:{lsi:1.87,risk:"Scale Forming",pHs:5.63},ryznar:{ri:3.76,risk:"High Scale Risk",pHs:5.63},puckorius:{index:2.18,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.572,risk:"Scale Forming"},ccpp:{ccpp_ppm:83.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.2,rating:"Excellent"},copper:{cr_mpy:0.06,rating:"Excellent"},admiralty_brass:{cr_mpy:0.05,rating:"Excellent"}}},
//   {_grid_CoC:7,_grid_temp:35,_grid_pH:7.5,ionic_strength:0.0949,saturation_indices:{Calcite:{SI:1.8},Anhydrite:{SI:-0.62},Aragonite:{SI:1.64},Dolomite:{SI:3.52},Gypsum:{SI:-0.42},Halite:{SI:-5.15},Quartz:{SI:1.09},Talc:{SI:6.53},Siderite:{SI:0.72},"CO2(g)":{SI:-1.47}},color_code:"red",indices:{lsi:{lsi:2.06,risk:"Scale Forming",pHs:5.44},ryznar:{ri:3.38,risk:"High Scale Risk",pHs:5.44},puckorius:{index:1.81,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.667,risk:"Scale Forming"},ccpp:{ccpp_ppm:90,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.01,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
//   {_grid_CoC:8,_grid_temp:25,_grid_pH:7.5,ionic_strength:0.1097,saturation_indices:{Calcite:{SI:1.76},Anhydrite:{SI:-0.62},Aragonite:{SI:1.61},Dolomite:{SI:3.41},Gypsum:{SI:-0.32},Halite:{SI:-5.04},Quartz:{SI:1.29},Talc:{SI:5.84},Siderite:{SI:0.68},"CO2(g)":{SI:-1.47}},color_code:"red",indices:{lsi:{lsi:1.98,risk:"Scale Forming",pHs:5.52},ryznar:{ri:3.54,risk:"High Scale Risk",pHs:5.52},puckorius:{index:1.88,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.633,risk:"Scale Forming"},ccpp:{ccpp_ppm:88,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.2,rating:"Excellent"},copper:{cr_mpy:0.06,rating:"Excellent"},admiralty_brass:{cr_mpy:0.05,rating:"Excellent"}}},
//   {_grid_CoC:8,_grid_temp:35,_grid_pH:7.5,ionic_strength:0.1077,saturation_indices:{Calcite:{SI:1.89},Anhydrite:{SI:-0.55},Aragonite:{SI:1.73},Dolomite:{SI:3.7},Gypsum:{SI:-0.35},Halite:{SI:-5.05},Quartz:{SI:1.15},Talc:{SI:6.89},Siderite:{SI:0.8},"CO2(g)":{SI:-1.42}},color_code:"red",indices:{lsi:{lsi:2.17,risk:"Scale Forming",pHs:5.33},ryznar:{ri:3.16,risk:"High Scale Risk",pHs:5.33},puckorius:{index:1.5,risk:"Scale Forming"},larson_skold:{index:1.685,risk_level:"High"},stiff_davis:{index:2.73,risk:"Scale Forming"},ccpp:{ccpp_ppm:94.5,risk:"High Scale Risk"}},corrosion:{mild_steel:{cr_mpy:0.01,rating:"Excellent"},copper:{cr_mpy:0,rating:"Excellent"},admiralty_brass:{cr_mpy:0,rating:"Excellent"}}},
// ];

// // ─── Constants ────────────────────────────────────────────────────────────────

// const COLOR_MAP: Record<string, number> = {
//   yellow: 0xf1c40f,
//   red: 0xe74c3c,
//   green: 0x2ecc71,
// };

// // ─── Helper Components ────────────────────────────────────────────────────────

// type BadgeVariant = "yellow" | "red" | "green" | "info" | "warn";

// function getBadgeVariant(text: string): BadgeVariant {
//   const lc = (text || "").toLowerCase();
//   if (lc.includes("excellent") || lc.includes("low scale") || lc.includes("protected")) return "green";
//   if (lc.includes("moderate") || lc.includes("slight") || lc.includes("caution") || lc.includes("balanced")) return "warn";
//   if (lc.includes("scale") || lc.includes("high") || lc.includes("corros") || lc.includes("forming")) return "red";
//   return "info";
// }

// const badgeClasses: Record<BadgeVariant, string> = {
//   yellow: "bg-yellow-400/15 text-yellow-400",
//   red: "bg-red-500/15 text-red-400",
//   green: "bg-emerald-500/15 text-emerald-400",
//   info: "bg-blue-400/15 text-blue-400",
//   warn: "bg-amber-500/15 text-amber-400",
// };

// function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
//   const v = variant ?? getBadgeVariant(text);
//   return (
//     <span className={`text-[10px] px-1.5 py-0.5 rounded font-normal whitespace-nowrap ${badgeClasses[v]}`}>
//       {text}
//     </span>
//   );
// }

// function SidebarRow({
//   label,
//   value,
//   badge,
//   highlight,
// }: {
//   label: string;
//   value: string;
//   badge?: string;
//   highlight?: boolean;
// }) {
//   return (
//     <div className="flex justify-between items-center py-[5px] border-b border-white/[0.04] gap-2 last:border-0">
//       <span className={`text-[11px] text-slate-400 shrink-0 ${highlight ? "font-medium text-slate-200" : ""}`}>
//         {label}
//       </span>
//       <span className={`text-[11px] font-medium text-slate-100 flex items-center gap-1 flex-wrap justify-end ${highlight ? "font-semibold" : ""}`}>
//         {value}
//         {badge && <Badge text={badge} />}
//       </span>
//     </div>
//   );
// }

// function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
//   return (
//     <div className="mb-4">
//       <div className="text-[10px] font-medium text-slate-500 tracking-widest uppercase mb-2 pb-1 border-b border-white/10">
//         {title}
//       </div>
//       {children}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function ThreeDGraph() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<{
//     renderer: THREE.WebGLRenderer;
//     scene: THREE.Scene;
//     camera: THREE.PerspectiveCamera;
//     barMeshes: THREE.Mesh[];
//     rotY: number;
//     rotX: number;
//     dist: number;
//     isDragging: boolean;
//     prevX: number;
//     prevY: number;
//     hoveredMesh: THREE.Mesh | null;
//     selectedMesh: THREE.Mesh | null;
//     animId: number;
//   } | null>(null);

//   const [activeData, setActiveData] = useState<GridResult | null>(null);

//   const updateCamera = useCallback(() => {
//     const s = sceneRef.current;
//     if (!s) return;
//     const { camera, rotY, rotX, dist } = s;
//     camera.position.x = Math.sin(rotY) * Math.cos(rotX) * dist;
//     camera.position.y = Math.sin(rotX) * dist;
//     camera.position.z = Math.cos(rotY) * Math.cos(rotX) * dist;
//     camera.lookAt(0, 1.5, 0);
//   }, []);

//   // Build scene once
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const wrap = wrapRef.current;
//     if (!canvas || !wrap) return;

//     const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setClearColor(0x0d1117, 1);

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

//     // Lighting
//     scene.add(new THREE.AmbientLight(0xffffff, 0.6));
//     const dir = new THREE.DirectionalLight(0xffffff, 0.9);
//     dir.position.set(10, 20, 10);
//     scene.add(dir);
//     const dir2 = new THREE.DirectionalLight(0x4488ff, 0.3);
//     dir2.position.set(-10, 5, -10);
//     scene.add(dir2);

//     const cocUniq = [...new Set(gridResults.map((d) => d._grid_CoC))];
//     const tempUniq = [...new Set(gridResults.map((d) => d._grid_temp))];
//     const siValues = gridResults.map((d) => d.saturation_indices.Calcite.SI);
//     const maxSI = Math.max(...siValues);
//     const spacing = 2.2;
//     const cocOffset = -((cocUniq.length - 1) * spacing) / 2;
//     const tempOffset = -((tempUniq.length - 1) * spacing) / 2;

//     const barMeshes: THREE.Mesh[] = [];

//     gridResults.forEach((d) => {
//       const si = d.saturation_indices.Calcite.SI;
//       const h = Math.max(0.18, (si / maxSI) * 5.5);
//       const ci = cocUniq.indexOf(d._grid_CoC);
//       const ti = tempUniq.indexOf(d._grid_temp);
//       const x = ci * spacing + cocOffset;
//       const z = ti * spacing + tempOffset;
//       const clr = COLOR_MAP[d.color_code] ?? 0xe74c3c;

//       const geo = new THREE.BoxGeometry(1.65, h, 1.65);
//       const mat = new THREE.MeshLambertMaterial({ color: clr });
//       const mesh = new THREE.Mesh(geo, mat);
//       mesh.position.set(x, h / 2, z);
//       (mesh as any).userData = { data: d, origColor: clr };
//       scene.add(mesh);
//       barMeshes.push(mesh);

//       const edgeGeo = new THREE.EdgesGeometry(geo);
//       const edgeMat = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 });
//       mesh.add(new THREE.LineSegments(edgeGeo, edgeMat));
//     });

//     const gridHelper = new THREE.GridHelper(
//       cocUniq.length * spacing + 2,
//       cocUniq.length * 2 + 2,
//       0x2a2a2a,
//       0x1a1a1a
//     );
//     gridHelper.position.y = -0.02;
//     scene.add(gridHelper);

//     const state = {
//       renderer, scene, camera, barMeshes,
//       rotY: 0.45, rotX: 0.35, dist: 32,
//       isDragging: false, prevX: 0, prevY: 0,
//       hoveredMesh: null as THREE.Mesh | null,
//       selectedMesh: null as THREE.Mesh | null,
//       animId: 0,
//     };
//     sceneRef.current = state;

//     // Size
//     const resize = () => {
//       const w = wrap.clientWidth;
//       const h = Math.max(300, wrap.clientHeight);
//       renderer.setSize(w, h, false);
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     // Initial camera
//     const cam = state;
//     camera.position.x = Math.sin(cam.rotY) * Math.cos(cam.rotX) * cam.dist;
//     camera.position.y = Math.sin(cam.rotX) * cam.dist;
//     camera.position.z = Math.cos(cam.rotY) * Math.cos(cam.rotX) * cam.dist;
//     camera.lookAt(0, 1.5, 0);

//     // Animate
//     const animate = () => {
//       state.animId = requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(state.animId);
//       window.removeEventListener("resize", resize);
//       renderer.dispose();
//       sceneRef.current = null;
//     };
//   }, []);

//   // Mouse/touch events
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();

//     const getState = () => sceneRef.current;

//     const onMouseDown = (e: MouseEvent) => {
//       const s = getState(); if (!s) return;
//       s.isDragging = true; s.prevX = e.clientX; s.prevY = e.clientY;
//       canvas.style.cursor = "grabbing";
//     };
//     const onMouseUp = () => {
//       const s = getState(); if (!s) return;
//       s.isDragging = false; canvas.style.cursor = "grab";
//     };
//     const onMouseMove = (e: MouseEvent) => {
//       const s = getState(); if (!s) return;
//       if (s.isDragging) {
//         s.rotY += (e.clientX - s.prevX) * 0.01;
//         s.rotX -= (e.clientY - s.prevY) * 0.01;
//         s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX));
//         s.prevX = e.clientX; s.prevY = e.clientY;
//         updateCamera();
//         return;
//       }
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
//       raycaster.setFromCamera(mouse, s.camera);
//       const hits = raycaster.intersectObjects(s.barMeshes);
//       if (s.hoveredMesh && s.hoveredMesh !== s.selectedMesh) {
//         (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(s.hoveredMesh.userData.origColor);
//       }
//       if (hits.length > 0) {
//         s.hoveredMesh = hits[0].object as THREE.Mesh;
//         if (s.hoveredMesh !== s.selectedMesh) {
//           (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(0xffffff);
//         }
//         canvas.style.cursor = "pointer";
//         setActiveData(s.hoveredMesh.userData.data as GridResult);
//       } else {
//         s.hoveredMesh = null;
//         canvas.style.cursor = "grab";
//         setActiveData(s.selectedMesh ? (s.selectedMesh.userData.data as GridResult) : null);
//       }
//     };
//     const onClick = () => {
//       const s = getState(); if (!s || !s.hoveredMesh) return;
//       if (s.selectedMesh && s.selectedMesh !== s.hoveredMesh) {
//         (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(s.selectedMesh.userData.origColor);
//       }
//       s.selectedMesh = s.hoveredMesh;
//       (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(0xffffff);
//       setActiveData(s.selectedMesh.userData.data as GridResult);
//     };
//     const onWheel = (e: WheelEvent) => {
//       const s = getState(); if (!s) return;
//       s.dist = Math.max(10, Math.min(70, s.dist + e.deltaY * 0.06));
//       updateCamera(); e.preventDefault();
//     };
//     const onTouchStart = (e: TouchEvent) => {
//       const s = getState(); if (!s) return;
//       s.prevX = e.touches[0].clientX; s.prevY = e.touches[0].clientY;
//     };
//     const onTouchMove = (e: TouchEvent) => {
//       const s = getState(); if (!s) return;
//       s.rotY += (e.touches[0].clientX - s.prevX) * 0.012;
//       s.rotX -= (e.touches[0].clientY - s.prevY) * 0.012;
//       s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX));
//       s.prevX = e.touches[0].clientX; s.prevY = e.touches[0].clientY;
//       updateCamera(); e.preventDefault();
//     };

//     canvas.addEventListener("mousedown", onMouseDown);
//     window.addEventListener("mouseup", onMouseUp);
//     window.addEventListener("mousemove", onMouseMove);
//     canvas.addEventListener("click", onClick);
//     canvas.addEventListener("wheel", onWheel, { passive: false });
//     canvas.addEventListener("touchstart", onTouchStart, { passive: true });
//     canvas.addEventListener("touchmove", onTouchMove, { passive: false });

//     return () => {
//       canvas.removeEventListener("mousedown", onMouseDown);
//       window.removeEventListener("mouseup", onMouseUp);
//       window.removeEventListener("mousemove", onMouseMove);
//       canvas.removeEventListener("click", onClick);
//       canvas.removeEventListener("wheel", onWheel);
//       canvas.removeEventListener("touchstart", onTouchStart);
//       canvas.removeEventListener("touchmove", onTouchMove);
//     };
//   }, [updateCamera]);

//   const d = activeData;
//   const colorCode = d?.color_code;
//   const statusLabel = colorCode === "yellow" ? "Caution" : colorCode === "red" ? "Scale Risk" : "Protected";
//   const statusVariant: BadgeVariant = colorCode === "yellow" ? "yellow" : colorCode === "red" ? "red" : "green";

//   return (
//     <div className="bg-[#0d1117] text-slate-200 font-sans text-[13px] h-screen overflow-hidden flex flex-col">
//       {/* Header */}
//       <header className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/10 shrink-0">
//         <div>
//           <div className="text-sm font-medium text-slate-100 tracking-wide">
//             Saturation Analysis — Calcite · 3D Grid
//           </div>
//           <div className="text-[11px] text-slate-500 mt-0.5">
//             CoC 1–8 &nbsp;·&nbsp; Temp 25–55 °C &nbsp;·&nbsp; pH 7.5 &nbsp;·&nbsp; Dosage 3 ppm
//           </div>
//         </div>
//         <div className="flex gap-4 items-center">
//           {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
//             const dot = label === "Caution" ? "bg-yellow-400" : label === "Scale Risk" ? "bg-red-500" : "bg-emerald-500";
//             return (
//               <div key={label} className="flex items-center gap-1.5 text-[11px] text-slate-400">
//                 <span className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`} />
//                 {label}
//               </div>
//             );
//           })}
//         </div>
//       </header>

//       {/* Main */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Canvas */}
//         <div ref={wrapRef} className="flex-1 min-w-0 relative bg-[#0d1117] overflow-hidden">
//           <canvas ref={canvasRef} className="block w-full h-full cursor-grab" />
//           <div className="absolute bottom-3 left-3 text-[10px] text-slate-700 pointer-events-none">
//             Drag to rotate · Scroll to zoom
//           </div>
//         </div>

//         {/* Sidebar */}
//         <aside className="w-[250px] shrink-0 bg-[#161b22] border-l border-white/10 overflow-y-auto p-3.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
//           {!d ? (
//             <p className="text-[11px] text-slate-500 text-center pt-2 pb-3">
//               Hover or click a bar to see details
//             </p>
//           ) : (
//             <>
//               <SidebarSection title="Grid Point">
//                 <SidebarRow label="CoC" value={String(d._grid_CoC)} />
//                 <SidebarRow label="Temperature" value={`${d._grid_temp} °C`} />
//                 <SidebarRow label="pH" value={String(d._grid_pH)} />
//                 <SidebarRow label="Ionic Strength" value={d.ionic_strength.toFixed(5)} />
//               </SidebarSection>

//               <SidebarSection title="Calcite SI">
//                 <SidebarRow label="Saturation Index" value={d.saturation_indices.Calcite.SI.toFixed(2)} />
//                 <div className="flex justify-between items-center py-[5px]">
//                   <span className="text-[11px] text-slate-400">Status</span>
//                   <Badge text={statusLabel} variant={statusVariant} />
//                 </div>
//               </SidebarSection>

//               <SidebarSection title="Deposition Indices">
//                 <SidebarRow label="LSI" value={d.indices.lsi.lsi.toFixed(2)} badge={d.indices.lsi.risk} />
//                 <SidebarRow label="RSI" value={d.indices.ryznar.ri.toFixed(2)} badge={d.indices.ryznar.risk} />
//                 <SidebarRow label="PSI" value={d.indices.puckorius.index.toFixed(2)} badge={d.indices.puckorius.risk} />
//                 <SidebarRow label="Larson-Skold" value={d.indices.larson_skold.index.toFixed(3)} badge={`${d.indices.larson_skold.risk_level} Risk`} />
//                 <SidebarRow label="Stiff & Davis" value={d.indices.stiff_davis.index.toFixed(3)} badge={d.indices.stiff_davis.risk} />
//                 <SidebarRow label="CCPP (ppm)" value={String(d.indices.ccpp.ccpp_ppm)} badge={d.indices.ccpp.risk} />
//               </SidebarSection>

//               <SidebarSection title="Corrosion Rates (mpy)">
//                 <SidebarRow label="Mild Steel" value={`${d.corrosion.mild_steel.cr_mpy.toFixed(2)} mpy`} badge={d.corrosion.mild_steel.rating} />
//                 <SidebarRow label="Copper" value={`${d.corrosion.copper.cr_mpy.toFixed(2)} mpy`} badge={d.corrosion.copper.rating} />
//                 <SidebarRow label="Admiralty Brass" value={`${d.corrosion.admiralty_brass.cr_mpy.toFixed(2)} mpy`} badge={d.corrosion.admiralty_brass.rating} />
//               </SidebarSection>

//               <SidebarSection title="All Minerals SI">
//                 {Object.entries(d.saturation_indices).map(([key, val]) => {
//                   const isPos = val.SI > 0;
//                   const isCalcite = key === "Calcite";
//                   return (
//                     <div
//                       key={key}
//                       className="flex justify-between items-center py-[5px] border-b border-white/[0.04] last:border-0"
//                     >
//                       <span className={`text-[11px] ${isCalcite ? "font-semibold text-slate-200" : "text-slate-400"}`}>
//                         {key}
//                       </span>
//                       <span className={`text-[11px] font-medium ${isPos ? "text-red-400" : "text-slate-500"} ${isCalcite ? "font-semibold" : ""}`}>
//                         {val.SI.toFixed(2)}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </SidebarSection>
//             </>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef, useState, useCallback, useMemo } from "react";
// import * as THREE from "three";

// // ─── API Response Types ───────────────────────────────────────────────────────

// export interface SIEntry {
//   SI: number;
//   log_IAP?: number;
//   log_K?: number;
//   phase?: string | null;
//   chemical_formula?: string;
// }

// export interface LsiIndex {
//   lsi: number;
//   interpretation?: string;
//   risk: string;
//   pH_actual?: number;
//   pHs: number;
// }

// export interface RyznarIndex {
//   ri: number;
//   interpretation?: string;
//   risk: string;
//   pH_actual?: number;
//   pHs: number;
// }

// export interface PuckoriusIndex {
//   index: number;
//   interpretation?: string;
//   risk: string;
//   components?: Record<string, number>;
// }

// export interface LarsonSkoldIndex {
//   index: number;
//   interpretation?: string;
//   risk_level: string;
//   components?: Record<string, number>;
// }

// export interface StiffDavisIndex {
//   index: number;
//   interpretation?: string;
//   risk: string;
//   components?: Record<string, number>;
// }

// export interface CcppIndex {
//   ccpp_ppm: number;
//   interpretation?: string;
//   risk: string;
// }

// export interface Indices {
//   lsi: LsiIndex;
//   ryznar: RyznarIndex;
//   puckorius: PuckoriusIndex;
//   larson_skold: LarsonSkoldIndex;
//   stiff_davis: StiffDavisIndex;
//   ccpp: CcppIndex;
// }

// export interface CorrosionMetal {
//   cr_mpy: number;
//   cr_base_mpy?: number;
//   total_inhibition_percent?: number;
//   rating: string;
// }

// export interface Corrosion {
//   mild_steel: CorrosionMetal;
//   copper: CorrosionMetal;
//   admiralty_brass: CorrosionMetal;
// }

// export interface GridResult {
//   _grid_CoC: number;
//   _grid_temp: number;
//   _grid_pH: number;
//   ionic_strength: number;
//   charge_balance_error_pct?: number;
//   saturation_indices: Record<string, SIEntry>;
//   color_code: "yellow" | "red" | "green";
//   indices: Indices;
//   corrosion: Corrosion;
//   description_of_solution?: { pH: number; activity_of_water: number };
// }

// export interface SaturationApiResponse {
//   success: boolean;
//   data: {
//     salt_id: string;
//     salts_of_interest?: string[];
//     dosage_ppm: number;
//     coc_min: number;
//     coc_max: number;
//     temp_min: number;
//     temp_max: number;
//     temp_unit: string;
//     ph_mode?: string;
//     total_grid_points?: number;
//     grid_results: GridResult[];
//     summary?: { green: number; yellow: number; red: number; error: number };
//     base_water_parameters?: Record<string, { value: number; unit: string }>;
//     asset_info?: { name?: string; type?: string };
//   };
// }

// // ─── Color maps ───────────────────────────────────────────────────────────────

// const COLOR_MAP: Record<string, number> = {
//   yellow: 0xf1c40f,
//   red: 0xe74c3c,
//   green: 0x2ecc71,
// };

// const COLOR_HEX: Record<string, string> = {
//   yellow: "#f1c40f",
//   red: "#e74c3c",
//   green: "#2ecc71",
// };

// // ─── Badge ────────────────────────────────────────────────────────────────────

// type BadgeVariant = "yellow" | "red" | "green" | "info" | "warn";

// function getBadgeVariant(text: string): BadgeVariant {
//   const lc = (text || "").toLowerCase();
//   if (
//     lc.includes("excellent") ||
//     lc.includes("low scale") ||
//     lc.includes("protected")
//   )
//     return "green";
//   if (
//     lc.includes("moderate") ||
//     lc.includes("slight") ||
//     lc.includes("caution") ||
//     lc.includes("balanced")
//   )
//     return "warn";
//   if (
//     lc.includes("scale") ||
//     lc.includes("high") ||
//     lc.includes("corros") ||
//     lc.includes("forming")
//   )
//     return "red";
//   return "info";
// }

// const badgeCls: Record<BadgeVariant, string> = {
//   yellow: "bg-yellow-400/15 text-yellow-400",
//   red: "bg-red-500/15 text-red-400",
//   green: "bg-emerald-500/15 text-emerald-400",
//   info: "bg-blue-400/15 text-blue-400",
//   warn: "bg-amber-500/15 text-amber-400",
// };

// function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
//   const v = variant ?? getBadgeVariant(text);
//   return (
//     <span
//       className={`text-[10px] px-1.5 py-0.5 rounded font-normal whitespace-nowrap ${badgeCls[v]}`}
//     >
//       {text}
//     </span>
//   );
// }

// // ─── Sidebar primitives ───────────────────────────────────────────────────────

// function SRow({
//   label,
//   value,
//   badge,
//   bold,
// }: {
//   label: string;
//   value: string;
//   badge?: string;
//   bold?: boolean;
// }) {
//   return (
//     <div className="flex justify-between items-center py-[5px] border-b border-white/[0.04] gap-2 last:border-0">
//       <span
//         className={`text-[11px] shrink-0 ${bold ? "font-semibold text-slate-200" : "text-slate-400"}`}
//       >
//         {label}
//       </span>
//       <span
//         className={`text-[11px] flex items-center gap-1 flex-wrap justify-end ${bold ? "font-semibold text-slate-100" : "font-medium text-slate-100"}`}
//       >
//         {value}
//         {badge && <Badge text={badge} />}
//       </span>
//     </div>
//   );
// }

// function SSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="mb-4">
//       <div className="text-[10px] font-medium text-slate-500 tracking-widest uppercase mb-2 pb-1 border-b border-white/10">
//         {title}
//       </div>
//       {children}
//     </div>
//   );
// }

// // ─── Three.js scene state ─────────────────────────────────────────────────────

// interface SceneState {
//   renderer: THREE.WebGLRenderer;
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   barMeshes: THREE.Mesh[];
//   rotY: number;
//   rotX: number;
//   dist: number;
//   isDragging: boolean;
//   prevX: number;
//   prevY: number;
//   hoveredMesh: THREE.Mesh | null;
//   selectedMesh: THREE.Mesh | null;
//   animId: number;
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// interface Props {
//   /** Pass the full API JSON response here. When omitted the canvas shows an empty-state. */
//   apiResponse?: SaturationApiResponse;
// }

// export default function SaturationDashboard({ apiResponse }: Props) {
//   // ── Derive everything from the API response ──
//   const gridResults: GridResult[] = useMemo(
//     () => apiResponse?.data?.grid_results ?? [],
//     [apiResponse],
//   );

//   const meta = apiResponse?.data;
//   const saltId = meta?.salt_id ?? "Calcite";
//   const dosage = meta?.dosage_ppm ?? 0;
//   const cocMin = meta?.coc_min ?? 1;
//   const cocMax = meta?.coc_max ?? 8;
//   const tempMin = meta?.temp_min ?? 25;
//   const tempMax = meta?.temp_max ?? 55;
//   const tempUnit = meta?.temp_unit ?? "C";
//   const assetName = meta?.asset_info?.name;
//   const summary = meta?.summary;
//   const saltsOfInterest = meta?.salts_of_interest ?? [saltId];

//   const cocUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_CoC))].sort((a, b) => a - b),
//     [gridResults],
//   );
//   const tempUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_temp))].sort((a, b) => a - b),
//     [gridResults],
//   );
//   const maxSI = useMemo(() => {
//     const vals = gridResults.map((d) => d.saturation_indices[saltId]?.SI ?? 0);
//     return Math.max(...vals, 0.1);
//   }, [gridResults, saltId]);

//   // ── Refs ──
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<SceneState | null>(null);
//   const [activeData, setActiveData] = useState<GridResult | null>(null);

//   const updateCamera = useCallback(() => {
//     const s = sceneRef.current;
//     if (!s) return;
//     s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.position.y = Math.sin(s.rotX) * s.dist;
//     s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.lookAt(0, 1.5, 0);
//   }, []);

//   // ── Build scene (re-runs when data changes) ──
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const wrap = wrapRef.current;
//     if (!canvas || !wrap) return;

//     // Cleanup previous
//     if (sceneRef.current) {
//       cancelAnimationFrame(sceneRef.current.animId);
//       sceneRef.current.renderer.dispose();
//       sceneRef.current = null;
//     }

//     if (gridResults.length === 0) return;

//     const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setClearColor(0x0d1117, 1);

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

//     scene.add(new THREE.AmbientLight(0xffffff, 0.6));
//     const dir = new THREE.DirectionalLight(0xffffff, 0.9);
//     dir.position.set(10, 20, 10);
//     scene.add(dir);
//     const dir2 = new THREE.DirectionalLight(0x4488ff, 0.3);
//     dir2.position.set(-10, 5, -10);
//     scene.add(dir2);

//     const spacing = 2.2;
//     const cocOffset = -((cocUniq.length - 1) * spacing) / 2;
//     const tempOffset = -((tempUniq.length - 1) * spacing) / 2;
//     const barMeshes: THREE.Mesh[] = [];

//     gridResults.forEach((d) => {
//       const si = d.saturation_indices[saltId]?.SI ?? 0;
//       const h = Math.max(0.18, (si / maxSI) * 5.5);
//       const ci = cocUniq.indexOf(d._grid_CoC);
//       const ti = tempUniq.indexOf(d._grid_temp);
//       const x = ci * spacing + cocOffset;
//       const z = ti * spacing + tempOffset;
//       const clr = COLOR_MAP[d.color_code] ?? 0xe74c3c;

//       const geo = new THREE.BoxGeometry(1.65, h, 1.65);
//       const mat = new THREE.MeshLambertMaterial({ color: clr });
//       const mesh = new THREE.Mesh(geo, mat);
//       mesh.position.set(x, h / 2, z);
//       mesh.userData = { data: d, origColor: clr };
//       scene.add(mesh);
//       barMeshes.push(mesh);

//       mesh.add(
//         new THREE.LineSegments(
//           new THREE.EdgesGeometry(geo),
//           new THREE.LineBasicMaterial({
//             color: 0x000000,
//             transparent: true,
//             opacity: 0.25,
//           }),
//         ),
//       );
//     });

//     const gridW = cocUniq.length * spacing + 2;
//     const gridH = new THREE.GridHelper(
//       gridW,
//       cocUniq.length * 2 + 2,
//       0x2a2a2a,
//       0x1a1a1a,
//     );
//     gridH.position.y = -0.02;
//     scene.add(gridH);

//     const initDist = Math.max(28, cocUniq.length * 4.5);
//     const state: SceneState = {
//       renderer,
//       scene,
//       camera,
//       barMeshes,
//       rotY: 0.45,
//       rotX: 0.35,
//       dist: initDist,
//       isDragging: false,
//       prevX: 0,
//       prevY: 0,
//       hoveredMesh: null,
//       selectedMesh: null,
//       animId: 0,
//     };
//     sceneRef.current = state;

//     const resize = () => {
//       const w = wrap.clientWidth;
//       const h = Math.max(300, wrap.clientHeight);
//       renderer.setSize(w, h, false);
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     camera.position.x =
//       Math.sin(state.rotY) * Math.cos(state.rotX) * state.dist;
//     camera.position.y = Math.sin(state.rotX) * state.dist;
//     camera.position.z =
//       Math.cos(state.rotY) * Math.cos(state.rotX) * state.dist;
//     camera.lookAt(0, 1.5, 0);

//     const animate = () => {
//       state.animId = requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(state.animId);
//       window.removeEventListener("resize", resize);
//       renderer.dispose();
//       sceneRef.current = null;
//     };
//   }, [gridResults, saltId, maxSI, cocUniq, tempUniq]);

//   // ── Interaction events ──
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     const gs = () => sceneRef.current;

//     const onDown = (e: MouseEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.isDragging = true;
//       s.prevX = e.clientX;
//       s.prevY = e.clientY;
//       canvas.style.cursor = "grabbing";
//     };
//     const onUp = () => {
//       const s = gs();
//       if (!s) return;
//       s.isDragging = false;
//       canvas.style.cursor = "grab";
//     };
//     const onMove = (e: MouseEvent) => {
//       const s = gs();
//       if (!s) return;
//       if (s.isDragging) {
//         s.rotY += (e.clientX - s.prevX) * 0.01;
//         s.rotX -= (e.clientY - s.prevY) * 0.01;
//         s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX));
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         return;
//       }
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
//       raycaster.setFromCamera(mouse, s.camera);
//       const hits = raycaster.intersectObjects(s.barMeshes);
//       if (s.hoveredMesh && s.hoveredMesh !== s.selectedMesh)
//         (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
//           s.hoveredMesh.userData.origColor,
//         );
//       if (hits.length > 0) {
//         s.hoveredMesh = hits[0].object as THREE.Mesh;
//         if (s.hoveredMesh !== s.selectedMesh)
//           (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
//             0xffffff,
//           );
//         canvas.style.cursor = "pointer";
//         setActiveData(s.hoveredMesh.userData.data as GridResult);
//       } else {
//         s.hoveredMesh = null;
//         canvas.style.cursor = "grab";
//         setActiveData(
//           s.selectedMesh ? (s.selectedMesh.userData.data as GridResult) : null,
//         );
//       }
//     };
//     const onClick = () => {
//       const s = gs();
//       if (!s || !s.hoveredMesh) return;
//       if (s.selectedMesh && s.selectedMesh !== s.hoveredMesh)
//         (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(
//           s.selectedMesh.userData.origColor,
//         );
//       s.selectedMesh = s.hoveredMesh;
//       (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(
//         0xffffff,
//       );
//       setActiveData(s.selectedMesh.userData.data as GridResult);
//     };
//     const onWheel = (e: WheelEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.dist = Math.max(10, Math.min(100, s.dist + e.deltaY * 0.06));
//       updateCamera();
//       e.preventDefault();
//     };
//     const onTStart = (e: TouchEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//     };
//     const onTMove = (e: TouchEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.rotY += (e.touches[0].clientX - s.prevX) * 0.012;
//       s.rotX -= (e.touches[0].clientY - s.prevY) * 0.012;
//       s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX));
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       updateCamera();
//       e.preventDefault();
//     };

//     canvas.addEventListener("mousedown", onDown);
//     window.addEventListener("mouseup", onUp);
//     window.addEventListener("mousemove", onMove);
//     canvas.addEventListener("click", onClick);
//     canvas.addEventListener("wheel", onWheel, { passive: false });
//     canvas.addEventListener("touchstart", onTStart, { passive: true });
//     canvas.addEventListener("touchmove", onTMove, { passive: false });
//     return () => {
//       canvas.removeEventListener("mousedown", onDown);
//       window.removeEventListener("mouseup", onUp);
//       window.removeEventListener("mousemove", onMove);
//       canvas.removeEventListener("click", onClick);
//       canvas.removeEventListener("wheel", onWheel);
//       canvas.removeEventListener("touchstart", onTStart);
//       canvas.removeEventListener("touchmove", onTMove);
//     };
//   }, [updateCamera]);

//   // ── Sidebar helpers ──
//   const d = activeData;
//   const saltSI = d ? (d.saturation_indices[saltId]?.SI ?? null) : null;
//   const colorCode = d?.color_code;
//   const statusLabel =
//     colorCode === "yellow"
//       ? "Caution"
//       : colorCode === "red"
//         ? "Scale Risk"
//         : "Protected";
//   const statusVar: BadgeVariant =
//     colorCode === "yellow" ? "yellow" : colorCode === "red" ? "red" : "green";
//   const isEmpty = gridResults.length === 0;

//   // ── Render ──
//   return (
//     <div className="bg-[#0d1117] text-slate-200 font-sans text-[13px] h-screen overflow-hidden flex flex-col select-none">
//       {/* Header */}
//       <header className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/10 shrink-0 gap-4 flex-wrap">
//         <div>
//           <div className="text-sm font-semibold text-slate-100 tracking-wide">
//             Saturation Analysis —{" "}
//             <span className="text-blue-400">{saltId}</span> · 3D Grid
//           </div>
//           <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap gap-x-3">
//             {assetName && (
//               <span className="text-slate-400 font-medium">{assetName}</span>
//             )}
//             <span>
//               CoC {cocMin}–{cocMax}
//             </span>
//             <span>
//               Temp {tempMin}–{tempMax} °{tempUnit}
//             </span>
//             <span>Dosage {dosage} ppm</span>
//             {meta?.total_grid_points && (
//               <span>{meta.total_grid_points} pts</span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-2 flex-wrap">
//           {/* Summary pills */}
//           {summary && (
//             <div className="flex gap-1 mr-3 text-[11px]">
//               {summary.green > 0 && (
//                 <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">
//                   {summary.green} Protected
//                 </span>
//               )}
//               {summary.yellow > 0 && (
//                 <span className="px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 font-medium">
//                   {summary.yellow} Caution
//                 </span>
//               )}
//               {summary.red > 0 && (
//                 <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-medium">
//                   {summary.red} Scale Risk
//                 </span>
//               )}
//             </div>
//           )}
//           {/* Legend dots */}
//           {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
//             const dot =
//               label === "Caution"
//                 ? "bg-yellow-400"
//                 : label === "Scale Risk"
//                   ? "bg-red-500"
//                   : "bg-emerald-500";
//             return (
//               <div
//                 key={label}
//                 className="flex items-center gap-1.5 text-[11px] text-slate-400"
//               >
//                 <span className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`} />
//                 {label}
//               </div>
//             );
//           })}
//         </div>
//       </header>

//       {/* Salts of interest chip bar */}
//       {saltsOfInterest.length > 1 && (
//         <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0f1419] border-b border-white/[0.06] overflow-x-auto shrink-0">
//           <span className="text-[10px] text-slate-600 shrink-0 mr-1">
//             Salts of interest:
//           </span>
//           {saltsOfInterest.map((s) => (
//             <span
//               key={s}
//               className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${
//                 s === saltId
//                   ? "border-blue-500/60 text-blue-400 bg-blue-500/10"
//                   : "border-white/10 text-slate-500"
//               }`}
//             >
//               {s}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Main */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* 3-D Canvas */}
//         <div
//           ref={wrapRef}
//           className="flex-1 min-w-0 relative bg-[#0d1117] overflow-hidden"
//         >
//           {isEmpty ? (
//             <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
//               <div className="text-4xl opacity-20">⬛</div>
//               <p className="text-sm">
//                 No grid data — pass an{" "}
//                 <code className="text-slate-500 bg-white/5 px-1 rounded">
//                   apiResponse
//                 </code>{" "}
//                 prop.
//               </p>
//             </div>
//           ) : (
//             <>
//               <canvas
//                 ref={canvasRef}
//                 className="block w-full h-full cursor-grab"
//               />
//               {/* Axis hints */}
//               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-slate-700 pointer-events-none">
//                 ← CoC ({cocMin}–{cocMax}) →
//               </div>
//               <div
//                 className="absolute left-3 text-[10px] text-slate-700 pointer-events-none"
//                 style={{
//                   top: "50%",
//                   writingMode: "vertical-lr",
//                   transform: "rotate(180deg) translateY(50%)",
//                 }}
//               >
//                 ← Temp ({tempMin}–{tempMax} °{tempUnit}) →
//               </div>
//               <div className="absolute bottom-3 left-12 text-[10px] text-slate-700 pointer-events-none">
//                 Drag to rotate · Scroll to zoom · Click to pin
//               </div>
//             </>
//           )}
//         </div>

//         {/* Sidebar */}
//         <aside className="w-[265px] shrink-0 bg-[#161b22] border-l border-white/10 overflow-y-auto p-3.5">
//           {!d ? (
//             /* Empty state */
//             <div className="text-center py-6">
//               <p className="text-[11px] text-slate-500 mb-1">
//                 Hover or click a bar
//               </p>
//               <p className="text-[10px] text-slate-700">
//                 to inspect grid-point details
//               </p>
//               {/* Color key */}
//               <div className="mt-6 space-y-2">
//                 {[
//                   {
//                     label: "Protected",
//                     sub: "SI within safe band",
//                     hex: COLOR_HEX.green,
//                     bg: "bg-emerald-500/10",
//                   },
//                   {
//                     label: "Caution",
//                     sub: "Mild scaling tendency",
//                     hex: COLOR_HEX.yellow,
//                     bg: "bg-yellow-400/10",
//                   },
//                   {
//                     label: "Scale Risk",
//                     sub: "High CaCO₃ scale risk",
//                     hex: COLOR_HEX.red,
//                     bg: "bg-red-500/10",
//                   },
//                 ].map(({ label, sub, hex, bg }) => (
//                   <div
//                     key={label}
//                     className={`flex items-center gap-2.5 px-2.5 py-2 rounded ${bg} text-left`}
//                   >
//                     <div
//                       className="w-3 h-8 rounded-sm shrink-0"
//                       style={{ background: hex }}
//                     />
//                     <div>
//                       <div className="text-[11px] font-semibold text-slate-300">
//                         {label}
//                       </div>
//                       <div className="text-[10px] text-slate-600">{sub}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* ── Grid Point ── */}
//               <SSection title="Grid Point">
//                 <SRow label="CoC" value={String(d._grid_CoC)} />
//                 <SRow
//                   label="Temperature"
//                   value={`${d._grid_temp} °${tempUnit}`}
//                 />
//                 <SRow label="pH" value={String(d._grid_pH)} />
//                 <SRow
//                   label="Ionic Strength"
//                   value={d.ionic_strength.toFixed(5)}
//                 />
//                 {d.description_of_solution && (
//                   <SRow
//                     label="Activity H₂O"
//                     value={d.description_of_solution.activity_of_water.toFixed(
//                       3,
//                     )}
//                   />
//                 )}
//                 {d.charge_balance_error_pct !== undefined && (
//                   <SRow
//                     label="Charge Bal. Err"
//                     value={`${d.charge_balance_error_pct}%`}
//                   />
//                 )}
//               </SSection>

//               {/* ── Primary Salt SI ── */}
//               <SSection title={`${saltId} SI`}>
//                 <SRow
//                   label="Saturation Index"
//                   value={saltSI !== null ? saltSI.toFixed(2) : "—"}
//                   bold
//                 />
//                 <div className="flex justify-between items-center py-[5px]">
//                   <span className="text-[11px] text-slate-400">Status</span>
//                   <Badge text={statusLabel} variant={statusVar} />
//                 </div>
//               </SSection>

//               {/* ── Key Salts SI (dynamic from API) ── */}
//               {saltsOfInterest.length > 1 && (
//                 <SSection title="Key Salts SI">
//                   {saltsOfInterest.map((salt) => {
//                     const entry = d.saturation_indices[salt];
//                     return (
//                       <div
//                         key={salt}
//                         className="flex justify-between items-center py-[5px] border-b border-white/[0.04] last:border-0"
//                       >
//                         <div className="flex items-center gap-1.5 min-w-0">
//                           <span
//                             className={`text-[11px] truncate ${salt === saltId ? "font-semibold text-slate-200" : "text-slate-400"}`}
//                           >
//                             {salt}
//                           </span>
//                           {entry?.chemical_formula && (
//                             <span className="text-[9px] text-slate-700 shrink-0">
//                               {entry.chemical_formula}
//                             </span>
//                           )}
//                         </div>
//                         <span
//                           className={`text-[11px] font-medium shrink-0 ${entry && entry.SI > 0 ? "text-red-400" : "text-slate-500"}`}
//                         >
//                           {entry ? entry.SI.toFixed(2) : "—"}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </SSection>
//               )}

//               {/* ── Deposition Indices ── */}
//               <SSection title="Deposition Indices">
//                 <SRow
//                   label="LSI"
//                   value={d.indices.lsi.lsi.toFixed(2)}
//                   badge={d.indices.lsi.risk}
//                 />
//                 <SRow
//                   label="RSI"
//                   value={d.indices.ryznar.ri.toFixed(2)}
//                   badge={d.indices.ryznar.risk}
//                 />
//                 <SRow
//                   label="PSI"
//                   value={d.indices.puckorius.index.toFixed(2)}
//                   badge={d.indices.puckorius.risk}
//                 />
//                 <SRow
//                   label="Larson-Skold"
//                   value={d.indices.larson_skold.index.toFixed(3)}
//                   badge={`${d.indices.larson_skold.risk_level} Risk`}
//                 />
//                 <SRow
//                   label="Stiff-Davis"
//                   value={d.indices.stiff_davis.index.toFixed(3)}
//                   badge={d.indices.stiff_davis.risk}
//                 />
//                 <SRow
//                   label="CCPP (ppm)"
//                   value={String(d.indices.ccpp.ccpp_ppm)}
//                   badge={d.indices.ccpp.risk}
//                 />
//               </SSection>

//               {/* ── Corrosion (dynamic metals from object keys) ── */}
//               <SSection title="Corrosion Rates">
//                 {(
//                   [
//                     ["Mild Steel", d.corrosion.mild_steel],
//                     ["Copper", d.corrosion.copper],
//                     ["Admiralty Brass", d.corrosion.admiralty_brass],
//                   ] as [string, CorrosionMetal][]
//                 ).map(([label, metal]) => (
//                   <div
//                     key={label}
//                     className="py-[5px] border-b border-white/[0.04] last:border-0"
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className="text-[11px] text-slate-400">
//                         {label}
//                       </span>
//                       <Badge text={metal.rating} />
//                     </div>
//                     <div className="flex justify-between mt-0.5">
//                       <span className="text-[10px] text-slate-700">
//                         Treated / Base
//                       </span>
//                       <span className="text-[10px] text-slate-400">
//                         {metal.cr_mpy.toFixed(2)} /{" "}
//                         {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
//                         {metal.total_inhibition_percent !== undefined && (
//                           <span className="text-emerald-500/70 ml-1.5">
//                             −{metal.total_inhibition_percent}%
//                           </span>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </SSection>

//               {/* ── All Minerals SI (sorted, dynamic) ── */}
//               <SSection title="All Minerals SI">
//                 {Object.entries(d.saturation_indices)
//                   .sort((a, b) => b[1].SI - a[1].SI)
//                   .map(([key, val]) => {
//                     const isTarget = key === saltId;
//                     const isInterest = saltsOfInterest.includes(key);
//                     return (
//                       <div
//                         key={key}
//                         className={`flex justify-between items-center py-[4px] border-b border-white/[0.03] last:border-0 ${isTarget ? "bg-blue-500/5 -mx-1 px-1 rounded" : ""}`}
//                       >
//                         <div className="flex items-center gap-1 min-w-0">
//                           <span
//                             className={`text-[11px] truncate ${
//                               isTarget
//                                 ? "font-bold text-slate-100"
//                                 : isInterest
//                                   ? "font-medium text-slate-300"
//                                   : "text-slate-500"
//                             }`}
//                           >
//                             {key}
//                           </span>
//                           {val.chemical_formula && (
//                             <span className="text-[9px] text-slate-700 shrink-0 hidden sm:inline">
//                               {val.chemical_formula}
//                             </span>
//                           )}
//                         </div>
//                         <span
//                           className={`text-[11px] shrink-0 font-medium ${
//                             val.SI > 0 ? "text-red-400" : "text-slate-600"
//                           } ${isTarget ? "font-bold" : ""}`}
//                         >
//                           {val.SI.toFixed(2)}
//                         </span>
//                       </div>
//                     );
//                   })}
//               </SSection>
//             </>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useRef, useState, useCallback, useMemo } from "react";
// import * as THREE from "three";

// import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
// import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// // ─── API Response Types ───────────────────────────────────────────────────────

// export interface SIEntry {
//   SI: number;
//   log_IAP?: number;
//   log_K?: number;
//   phase?: string | null;
//   chemical_formula?: string;
// }

// export interface LsiIndex {
//   lsi: number;
//   interpretation?: string;
//   risk: string;
//   pH_actual?: number;
//   pHs: number;
// }

// export interface RyznarIndex {
//   ri: number;
//   interpretation?: string;
//   risk: string;
//   pH_actual?: number;
//   pHs: number;
// }

// export interface PuckoriusIndex {
//   index: number;
//   interpretation?: string;
//   risk: string;
//   components?: Record<string, number>;
// }

// export interface LarsonSkoldIndex {
//   index: number;
//   interpretation?: string;
//   risk_level: string;
//   components?: Record<string, number>;
// }

// export interface StiffDavisIndex {
//   index: number;
//   interpretation?: string;
//   risk: string;
//   components?: Record<string, number>;
// }

// export interface CcppIndex {
//   ccpp_ppm: number;
//   interpretation?: string;
//   risk: string;
// }

// export interface Indices {
//   lsi: LsiIndex;
//   ryznar: RyznarIndex;
//   puckorius: PuckoriusIndex;
//   larson_skold: LarsonSkoldIndex;
//   stiff_davis: StiffDavisIndex;
//   ccpp: CcppIndex;
// }

// export interface CorrosionMetal {
//   cr_mpy: number;
//   cr_base_mpy?: number;
//   total_inhibition_percent?: number;
//   rating: string;
// }

// export interface Corrosion {
//   mild_steel: CorrosionMetal;
//   copper: CorrosionMetal;
//   admiralty_brass: CorrosionMetal;
// }

// export interface GridResult {
//   _grid_CoC: number;
//   _grid_temp: number;
//   _grid_pH: number;
//   ionic_strength: number;
//   charge_balance_error_pct?: number;
//   saturation_indices: Record<string, SIEntry>;
//   color_code: "yellow" | "red" | "green";
//   indices: Indices;
//   corrosion: Corrosion;
//   description_of_solution?: { pH: number; activity_of_water: number };
// }

// export interface SaturationApiResponse {
//   success: boolean;
//   data: {
//     salt_id: string;
//     salts_of_interest?: string[];
//     dosage_ppm: number;
//     coc_min: number;
//     coc_max: number;
//     temp_min: number;
//     temp_max: number;
//     temp_unit: string;
//     ph_mode?: string;
//     total_grid_points?: number;
//     grid_results: GridResult[];
//     summary?: { green: number; yellow: number; red: number; error: number };
//     base_water_parameters?: Record<string, { value: number; unit: string }>;
//     asset_info?: { name?: string; type?: string };
//   };
// }

// // ─── Color maps ───────────────────────────────────────────────────────────────

// const COLOR_MAP: Record<string, number> = {
//   yellow: 0xf1c40f,
//   red: 0xe74c3c,
//   green: 0x2ecc71,
// };

// const COLOR_HEX: Record<string, string> = {
//   yellow: "#f1c40f",
//   red: "#e74c3c",
//   green: "#2ecc71",
// };

// // ─── Badge ────────────────────────────────────────────────────────────────────

// type BadgeVariant = "yellow" | "red" | "green" | "info" | "warn";

// function getBadgeVariant(text: string): BadgeVariant {
//   const lc = (text || "").toLowerCase();
//   if (
//     lc.includes("excellent") ||
//     lc.includes("low scale") ||
//     lc.includes("protected")
//   )
//     return "green";
//   if (
//     lc.includes("moderate") ||
//     lc.includes("slight") ||
//     lc.includes("caution") ||
//     lc.includes("balanced")
//   )
//     return "warn";
//   if (
//     lc.includes("scale") ||
//     lc.includes("high") ||
//     lc.includes("corros") ||
//     lc.includes("forming")
//   )
//     return "red";
//   return "info";
// }

// const badgeCls: Record<BadgeVariant, string> = {
//   yellow: "bg-yellow-400/15 text-yellow-400",
//   red: "bg-red-500/15 text-red-400",
//   green: "bg-emerald-500/15 text-emerald-400",
//   info: "bg-blue-400/15 text-blue-400",
//   warn: "bg-amber-500/15 text-amber-400",
// };

// function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
//   const v = variant ?? getBadgeVariant(text);
//   return (
//     <span
//       className={`text-[10px] px-1.5 py-0.5 rounded font-normal whitespace-nowrap ${badgeCls[v]}`}
//     >
//       {text}
//     </span>
//   );
// }

// // ─── Sidebar primitives ───────────────────────────────────────────────────────

// function SRow({
//   label,
//   value,
//   badge,
//   bold,
// }: {
//   label: string;
//   value: string;
//   badge?: string;
//   bold?: boolean;
// }) {
//   return (
//     <div className="flex justify-between items-center py-[5px] border-b border-white/[0.04] gap-2 last:border-0">
//       <span
//         className={`text-[11px] shrink-0 ${bold ? "font-semibold text-slate-200" : "text-slate-400"}`}
//       >
//         {label}
//       </span>
//       <span
//         className={`text-[11px] flex items-center gap-1 flex-wrap justify-end ${bold ? "font-semibold text-slate-100" : "font-medium text-slate-100"}`}
//       >
//         {value}
//         {badge && <Badge text={badge} />}
//       </span>
//     </div>
//   );
// }

// function SSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="mb-4">
//       <div className="text-[10px] font-medium text-slate-500 tracking-widest uppercase mb-2 pb-1 border-b border-white/10">
//         {title}
//       </div>
//       {children}
//     </div>
//   );
// }

// // ─── CSS2D label helper ───────────────────────────────────────────────────────

// function makeLabel(
//   text: string,
//   opts: {
//     color?: string;
//     fontSize?: string;
//     fontWeight?: string;
//     opacity?: number;
//     background?: string;
//     padding?: string;
//     rotate?: string;
//     letterSpacing?: string;
//   } = {},
// ): CSS2DObject {
//   const div = document.createElement("div");
//   div.textContent = text;
//   div.style.color = opts.color ?? "rgba(148,163,184,0.75)"; // slate-400 ish
//   div.style.fontSize = opts.fontSize ?? "10px";
//   div.style.fontWeight = opts.fontWeight ?? "500";
//   div.style.fontFamily = "ui-monospace, 'Cascadia Code', monospace";
//   div.style.whiteSpace = "nowrap";
//   div.style.pointerEvents = "none";
//   div.style.userSelect = "none";
//   div.style.letterSpacing = opts.letterSpacing ?? "0.04em";
//   if (opts.opacity !== undefined) div.style.opacity = String(opts.opacity);
//   if (opts.background) {
//     div.style.background = opts.background;
//     div.style.padding = opts.padding ?? "1px 4px";
//     div.style.borderRadius = "3px";
//   }
//   if (opts.rotate) div.style.transform = opts.rotate;
//   return new CSS2DObject(div);
// }

// // ─── Three.js scene state ─────────────────────────────────────────────────────

// interface SceneState {
//   renderer: THREE.WebGLRenderer;
//   labelRenderer: CSS2DRenderer;
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   barMeshes: THREE.Mesh[];
//   rotY: number;
//   rotX: number;
//   dist: number;
//   isDragging: boolean;
//   prevX: number;
//   prevY: number;
//   hoveredMesh: THREE.Mesh | null;
//   selectedMesh: THREE.Mesh | null;
//   animId: number;
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// interface Props {
//   apiResponse?: SaturationApiResponse;
// }

// export default function SaturationDashboard({ apiResponse }: Props) {
//   const gridResults: GridResult[] = useMemo(
//     () => apiResponse?.data?.grid_results ?? [],
//     [apiResponse],
//   );

//   const meta = apiResponse?.data;
//   const saltId = meta?.salt_id ?? "Calcite";
//   const dosage = meta?.dosage_ppm ?? 0;
//   const cocMin = meta?.coc_min ?? 1;
//   const cocMax = meta?.coc_max ?? 8;
//   const tempMin = meta?.temp_min ?? 25;
//   const tempMax = meta?.temp_max ?? 55;
//   const tempUnit = meta?.temp_unit ?? "C";
//   const assetName = meta?.asset_info?.name;
//   const summary = meta?.summary;
//   const saltsOfInterest = meta?.salts_of_interest ?? [saltId];

//   const cocUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_CoC))].sort((a, b) => a - b),
//     [gridResults],
//   );
//   const tempUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_temp))].sort((a, b) => a - b),
//     [gridResults],
//   );
//   const maxSI = useMemo(() => {
//     const vals = gridResults.map((d) => d.saturation_indices[saltId]?.SI ?? 0);
//     return Math.max(...vals, 0.1);
//   }, [gridResults, saltId]);

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const labelDivRef = useRef<HTMLDivElement>(null);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<SceneState | null>(null);
//   const [activeData, setActiveData] = useState<GridResult | null>(null);

//   const updateCamera = useCallback(() => {
//     const s = sceneRef.current;
//     if (!s) return;
//     s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.position.y = Math.sin(s.rotX) * s.dist;
//     s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.lookAt(0, 1.5, 0);
//   }, []);

//   // ── Build scene ──
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const wrap = wrapRef.current;
//     const labelDiv = labelDivRef.current;
//     if (!canvas || !wrap || !labelDiv) return;

//     if (sceneRef.current) {
//       cancelAnimationFrame(sceneRef.current.animId);
//       sceneRef.current.renderer.dispose();
//       sceneRef.current = null;
//     }

//     if (gridResults.length === 0) return;

//     // ── Renderers ──
//     const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setClearColor(0x0d1117, 1);

//     const labelRenderer = new CSS2DRenderer({ element: labelDiv });
//     labelRenderer.setSize(wrap.clientWidth, Math.max(300, wrap.clientHeight));

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

//     // ── Lighting ──
//     scene.add(new THREE.AmbientLight(0xffffff, 0.6));
//     const dir = new THREE.DirectionalLight(0xffffff, 0.9);
//     dir.position.set(10, 20, 10);
//     scene.add(dir);
//     const dir2 = new THREE.DirectionalLight(0x4488ff, 0.3);
//     dir2.position.set(-10, 5, -10);
//     scene.add(dir2);

//     const spacing = 2.2;
//     const cocOffset = -((cocUniq.length - 1) * spacing) / 2;
//     const tempOffset = -((tempUniq.length - 1) * spacing) / 2;
//     const barMeshes: THREE.Mesh[] = [];

//     // ── Bars ──
//     gridResults.forEach((d) => {
//       const si = d.saturation_indices[saltId]?.SI ?? 0;
//       const h = Math.max(0.18, (si / maxSI) * 5.5);
//       const ci = cocUniq.indexOf(d._grid_CoC);
//       const ti = tempUniq.indexOf(d._grid_temp);
//       const x = ci * spacing + cocOffset;
//       const z = ti * spacing + tempOffset;
//       const clr = COLOR_MAP[d.color_code] ?? 0xe74c3c;

//       const geo = new THREE.BoxGeometry(1.65, h, 1.65);
//       const mat = new THREE.MeshLambertMaterial({ color: clr });
//       const mesh = new THREE.Mesh(geo, mat);
//       mesh.position.set(x, h / 2, z);
//       mesh.userData = { data: d, origColor: clr };
//       scene.add(mesh);
//       barMeshes.push(mesh);

//       // SI value label on top of each bar
//       const siLabel = makeLabel(si.toFixed(2), {
//         color: "rgba(255,255,255,0.82)",
//         fontSize: "9px",
//         fontWeight: "600",
//         background: "rgba(0,0,0,0.45)",
//         padding: "1px 3px",
//       });
//       siLabel.position.set(0, h / 2 + 0.18, 0);
//       mesh.add(siLabel);

//       mesh.add(
//         new THREE.LineSegments(
//           new THREE.EdgesGeometry(geo),
//           new THREE.LineBasicMaterial({
//             color: 0x000000,
//             transparent: true,
//             opacity: 0.25,
//           }),
//         ),
//       );
//     });

//     // ── Grid floor ──
//     const gridW = Math.max(cocUniq.length, tempUniq.length) * spacing + 2;
//     const gridHelper = new THREE.GridHelper(
//       gridW + 2,
//       (cocUniq.length + tempUniq.length) * 2,
//       0x2a2a2a,
//       0x1a1a1a,
//     );
//     gridHelper.position.y = -0.02;
//     scene.add(gridHelper);

//     // ── Axis lines ──
//     const axisMatX = new THREE.LineBasicMaterial({
//       color: 0x4488ff,
//       opacity: 0.55,
//       transparent: true,
//     });
//     const axisMatZ = new THREE.LineBasicMaterial({
//       color: 0xff6644,
//       opacity: 0.55,
//       transparent: true,
//     });
//     const axisMatY = new THREE.LineBasicMaterial({
//       color: 0x44cc88,
//       opacity: 0.55,
//       transparent: true,
//     });

//     const halfX = ((cocUniq.length - 1) * spacing) / 2 + spacing * 0.8;
//     const halfZ = ((tempUniq.length - 1) * spacing) / 2 + spacing * 0.8;
//     const maxH = 5.5 + 0.5;

//     // X axis (CoC)
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints([
//           new THREE.Vector3(-halfX - 0.4, -0.02, halfZ + 0.4),
//           new THREE.Vector3(halfX + 0.4, -0.02, halfZ + 0.4),
//         ]),
//         axisMatX,
//       ),
//     );

//     // Z axis (Temperature)
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints([
//           new THREE.Vector3(-halfX - 0.4, -0.02, -halfZ - 0.4),
//           new THREE.Vector3(-halfX - 0.4, -0.02, halfZ + 0.4),
//         ]),
//         axisMatZ,
//       ),
//     );

//     // Y axis (SI height)
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints([
//           new THREE.Vector3(-halfX - 0.4, 0, halfZ + 0.4),
//           new THREE.Vector3(-halfX - 0.4, maxH, halfZ + 0.4),
//         ]),
//         axisMatY,
//       ),
//     );

//     // ── CoC tick labels ──
//     cocUniq.forEach((coc, ci) => {
//       const x = ci * spacing + cocOffset;
//       const lbl = makeLabel(String(coc), {
//         color: "#60a5fa",
//         fontSize: "10px",
//         fontWeight: "600",
//       });
//       lbl.position.set(x, -0.02, halfZ + 1.1);
//       scene.add(lbl);

//       // tick mark
//       const tick = new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints([
//           new THREE.Vector3(x, -0.02, halfZ + 0.4),
//           new THREE.Vector3(x, -0.02, halfZ + 0.7),
//         ]),
//         new THREE.LineBasicMaterial({
//           color: 0x4488ff,
//           opacity: 0.4,
//           transparent: true,
//         }),
//       );
//       scene.add(tick);
//     });

//     // CoC axis title
//     const cocTitle = makeLabel("Cycles of Concentration", {
//       color: "#93c5fd",
//       fontSize: "11px",
//       fontWeight: "700",
//       letterSpacing: "0.06em",
//     });
//     const midCocX = ((cocUniq.length - 1) * spacing) / 2 + cocOffset;
//     cocTitle.position.set(midCocX, -0.02, halfZ + 2.2);
//     scene.add(cocTitle);

//     // ── Temperature tick labels ──
//     tempUniq.forEach((temp, ti) => {
//       const z = ti * spacing + tempOffset;
//       const lbl = makeLabel(`${temp}°`, {
//         color: "#fb923c",
//         fontSize: "10px",
//         fontWeight: "600",
//       });
//       lbl.position.set(-halfX - 1.2, -0.02, z);
//       scene.add(lbl);

//       const tick = new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints([
//           new THREE.Vector3(-halfX - 0.4, -0.02, z),
//           new THREE.Vector3(-halfX - 0.7, -0.02, z),
//         ]),
//         new THREE.LineBasicMaterial({
//           color: 0xff6644,
//           opacity: 0.4,
//           transparent: true,
//         }),
//       );
//       scene.add(tick);
//     });

//     // Temperature axis title — rotated via CSS
//     const tempTitle = makeLabel(`Temperature (°C)`, {
//       color: "#fdba74",
//       fontSize: "11px",
//       fontWeight: "700",
//       letterSpacing: "0.06em",
//       rotate: "rotate(-90deg)",
//     });
//     const midTempZ = ((tempUniq.length - 1) * spacing) / 2 + tempOffset;
//     tempTitle.position.set(-halfX - 2.4, -0.02, midTempZ);
//     scene.add(tempTitle);

//     // ── SI (Y) tick labels ──
//     const siTicks = [0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0].filter(
//       (v) => v <= maxSI + 0.1,
//     );
//     siTicks.forEach((v) => {
//       const yPos = (v / maxSI) * 5.5;
//       const lbl = makeLabel(v.toFixed(2), {
//         color: "#6ee7b7",
//         fontSize: "10px",
//         fontWeight: "600",
//       });
//       lbl.position.set(-halfX - 0.4, yPos, halfZ + 0.4);
//       scene.add(lbl);

//       // horizontal tick line
//       const tick = new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints([
//           new THREE.Vector3(-halfX - 0.4, yPos, halfZ + 0.4),
//           new THREE.Vector3(-halfX - 0.7, yPos, halfZ + 0.4),
//         ]),
//         new THREE.LineBasicMaterial({
//           color: 0x44cc88,
//           opacity: 0.35,
//           transparent: true,
//         }),
//       );
//       scene.add(tick);
//     });

//     // SI axis title
//     const siTitle = makeLabel("Saturation Index (SI)", {
//       color: "#6ee7b7",
//       fontSize: "11px",
//       fontWeight: "700",
//       letterSpacing: "0.06em",
//     });
//     siTitle.position.set(-halfX - 0.4, maxH + 0.5, halfZ + 0.4);
//     scene.add(siTitle);

//     // ── State ──
//     const initDist = Math.max(
//       28,
//       Math.max(cocUniq.length, tempUniq.length) * 5,
//     );
//     const state: SceneState = {
//       renderer,
//       labelRenderer,
//       scene,
//       camera,
//       barMeshes,
//       rotY: 0.45,
//       rotX: 0.35,
//       dist: initDist,
//       isDragging: false,
//       prevX: 0,
//       prevY: 0,
//       hoveredMesh: null,
//       selectedMesh: null,
//       animId: 0,
//     };
//     sceneRef.current = state;

//     const resize = () => {
//       const w = wrap.clientWidth;
//       const h = Math.max(300, wrap.clientHeight);
//       renderer.setSize(w, h, false);
//       labelRenderer.setSize(w, h);
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     camera.position.x =
//       Math.sin(state.rotY) * Math.cos(state.rotX) * state.dist;
//     camera.position.y = Math.sin(state.rotX) * state.dist;
//     camera.position.z =
//       Math.cos(state.rotY) * Math.cos(state.rotX) * state.dist;
//     camera.lookAt(0, 1.5, 0);

//     const animate = () => {
//       state.animId = requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//       labelRenderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(state.animId);
//       window.removeEventListener("resize", resize);
//       renderer.dispose();
//       sceneRef.current = null;
//     };
//   }, [gridResults, saltId, maxSI, cocUniq, tempUniq]);

//   // ── Interaction events ──
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     const gs = () => sceneRef.current;

//     const onDown = (e: MouseEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.isDragging = true;
//       s.prevX = e.clientX;
//       s.prevY = e.clientY;
//       canvas.style.cursor = "grabbing";
//     };
//     const onUp = () => {
//       const s = gs();
//       if (!s) return;
//       s.isDragging = false;
//       canvas.style.cursor = "grab";
//     };
//     const onMove = (e: MouseEvent) => {
//       const s = gs();
//       if (!s) return;
//       if (s.isDragging) {
//         s.rotY += (e.clientX - s.prevX) * 0.01;
//         s.rotX -= (e.clientY - s.prevY) * 0.01;
//         s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX));
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         return;
//       }
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
//       raycaster.setFromCamera(mouse, s.camera);
//       const hits = raycaster.intersectObjects(s.barMeshes);
//       if (s.hoveredMesh && s.hoveredMesh !== s.selectedMesh)
//         (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
//           s.hoveredMesh.userData.origColor,
//         );
//       if (hits.length > 0) {
//         s.hoveredMesh = hits[0].object as THREE.Mesh;
//         if (s.hoveredMesh !== s.selectedMesh)
//           (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
//             0xffffff,
//           );
//         canvas.style.cursor = "pointer";
//         setActiveData(s.hoveredMesh.userData.data as GridResult);
//       } else {
//         s.hoveredMesh = null;
//         canvas.style.cursor = "grab";
//         setActiveData(
//           s.selectedMesh ? (s.selectedMesh.userData.data as GridResult) : null,
//         );
//       }
//     };
//     const onClick = () => {
//       const s = gs();
//       if (!s || !s.hoveredMesh) return;
//       if (s.selectedMesh && s.selectedMesh !== s.hoveredMesh)
//         (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(
//           s.selectedMesh.userData.origColor,
//         );
//       s.selectedMesh = s.hoveredMesh;
//       (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(
//         0xffffff,
//       );
//       setActiveData(s.selectedMesh.userData.data as GridResult);
//     };
//     const onWheel = (e: WheelEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.dist = Math.max(10, Math.min(100, s.dist + e.deltaY * 0.06));
//       updateCamera();
//       e.preventDefault();
//     };
//     const onTStart = (e: TouchEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//     };
//     const onTMove = (e: TouchEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.rotY += (e.touches[0].clientX - s.prevX) * 0.012;
//       s.rotX -= (e.touches[0].clientY - s.prevY) * 0.012;
//       s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX));
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       updateCamera();
//       e.preventDefault();
//     };

//     canvas.addEventListener("mousedown", onDown);
//     window.addEventListener("mouseup", onUp);
//     window.addEventListener("mousemove", onMove);
//     canvas.addEventListener("click", onClick);
//     canvas.addEventListener("wheel", onWheel, { passive: false });
//     canvas.addEventListener("touchstart", onTStart, { passive: true });
//     canvas.addEventListener("touchmove", onTMove, { passive: false });
//     return () => {
//       canvas.removeEventListener("mousedown", onDown);
//       window.removeEventListener("mouseup", onUp);
//       window.removeEventListener("mousemove", onMove);
//       canvas.removeEventListener("click", onClick);
//       canvas.removeEventListener("wheel", onWheel);
//       canvas.removeEventListener("touchstart", onTStart);
//       canvas.removeEventListener("touchmove", onTMove);
//     };
//   }, [updateCamera]);

//   // ── Sidebar helpers ──
//   const d = activeData;
//   const saltSI = d ? (d.saturation_indices[saltId]?.SI ?? null) : null;
//   const colorCode = d?.color_code;
//   const statusLabel =
//     colorCode === "yellow"
//       ? "Caution"
//       : colorCode === "red"
//         ? "Scale Risk"
//         : "Protected";
//   const statusVar: BadgeVariant =
//     colorCode === "yellow" ? "yellow" : colorCode === "red" ? "red" : "green";
//   const isEmpty = gridResults.length === 0;

//   return (
//     <div className="bg-[#0d1117] text-slate-200 font-sans text-[13px] h-screen overflow-hidden flex flex-col select-none">
//       {/* ── Header ── */}
//       <header className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/10 shrink-0 gap-4 flex-wrap">
//         <div>
//           <div className="text-sm font-semibold text-slate-100 tracking-wide">
//             Saturation Analysis —{" "}
//             <span className="text-blue-400">{saltId}</span> · 3D Grid
//           </div>
//           <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap gap-x-3">
//             {assetName && (
//               <span className="text-slate-400 font-medium">{assetName}</span>
//             )}
//             <span>
//               CoC {cocMin}–{cocMax}
//             </span>
//             <span>
//               Temp {tempMin}–{tempMax} °{tempUnit}
//             </span>
//             <span>Dosage {dosage} ppm</span>
//             {meta?.total_grid_points && (
//               <span>{meta.total_grid_points} pts</span>
//             )}
//           </div>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           {summary && (
//             <div className="flex gap-1 mr-3 text-[11px]">
//               {summary.green > 0 && (
//                 <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">
//                   {summary.green} Protected
//                 </span>
//               )}
//               {summary.yellow > 0 && (
//                 <span className="px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 font-medium">
//                   {summary.yellow} Caution
//                 </span>
//               )}
//               {summary.red > 0 && (
//                 <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-medium">
//                   {summary.red} Scale Risk
//                 </span>
//               )}
//             </div>
//           )}
//           {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
//             const dot =
//               label === "Caution"
//                 ? "bg-yellow-400"
//                 : label === "Scale Risk"
//                   ? "bg-red-500"
//                   : "bg-emerald-500";
//             return (
//               <div
//                 key={label}
//                 className="flex items-center gap-1.5 text-[11px] text-slate-400"
//               >
//                 <span className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`} />
//                 {label}
//               </div>
//             );
//           })}
//         </div>
//       </header>

//       {/* ── Salts chip bar ── */}
//       {saltsOfInterest.length > 1 && (
//         <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0f1419] border-b border-white/[0.06] overflow-x-auto shrink-0">
//           <span className="text-[10px] text-slate-600 shrink-0 mr-1">
//             Salts of interest:
//           </span>
//           {saltsOfInterest.map((s) => (
//             <span
//               key={s}
//               className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${s === saltId ? "border-blue-500/60 text-blue-400 bg-blue-500/10" : "border-white/10 text-slate-500"}`}
//             >
//               {s}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* ── Main ── */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* 3-D Canvas area */}
//         <div
//           ref={wrapRef}
//           className="flex-1 min-w-0 relative bg-[#0d1117] overflow-hidden"
//         >
//           {isEmpty ? (
//             <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
//               <div className="text-4xl opacity-20">⬛</div>
//               <p className="text-sm">
//                 No grid data — pass an{" "}
//                 <code className="text-slate-500 bg-white/5 px-1 rounded">
//                   apiResponse
//                 </code>{" "}
//                 prop.
//               </p>
//             </div>
//           ) : (
//             <>
//               <canvas
//                 ref={canvasRef}
//                 className="block w-full h-full cursor-grab"
//               />
//               {/* CSS2D label overlay — must be position:absolute, pointer-events:none */}
//               <div
//                 ref={labelDivRef}
//                 className="absolute inset-0 pointer-events-none overflow-hidden"
//                 style={{ zIndex: 10 }}
//               />
//               <div className="absolute bottom-3 left-12 text-[10px] text-slate-700 pointer-events-none">
//                 Drag to rotate · Scroll to zoom · Click to pin
//               </div>
//             </>
//           )}
//         </div>

//         {/* ── Sidebar ── */}
//         <aside className="w-[265px] shrink-0 bg-[#161b22] border-l border-white/10 overflow-y-auto p-3.5">
//           {!d ? (
//             <div className="text-center py-6">
//               <p className="text-[11px] text-slate-500 mb-1">
//                 Hover or click a bar
//               </p>
//               <p className="text-[10px] text-slate-700">
//                 to inspect grid-point details
//               </p>
//               <div className="mt-6 space-y-2">
//                 {[
//                   {
//                     label: "Protected",
//                     sub: "SI within safe band",
//                     hex: COLOR_HEX.green,
//                     bg: "bg-emerald-500/10",
//                   },
//                   {
//                     label: "Caution",
//                     sub: "Mild scaling tendency",
//                     hex: COLOR_HEX.yellow,
//                     bg: "bg-yellow-400/10",
//                   },
//                   {
//                     label: "Scale Risk",
//                     sub: "High CaCO₃ scale risk",
//                     hex: COLOR_HEX.red,
//                     bg: "bg-red-500/10",
//                   },
//                 ].map(({ label, sub, hex, bg }) => (
//                   <div
//                     key={label}
//                     className={`flex items-center gap-2.5 px-2.5 py-2 rounded ${bg} text-left`}
//                   >
//                     <div
//                       className="w-3 h-8 rounded-sm shrink-0"
//                       style={{ background: hex }}
//                     />
//                     <div>
//                       <div className="text-[11px] font-semibold text-slate-300">
//                         {label}
//                       </div>
//                       <div className="text-[10px] text-slate-600">{sub}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {/* Axis colour key */}
//               <div className="mt-6 border-t border-white/[0.06] pt-4 space-y-2 text-left">
//                 <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">
//                   Axis Legend
//                 </p>
//                 {[
//                   { color: "#60a5fa", label: "X — Cycles of Concentration" },
//                   { color: "#fb923c", label: "Z — Temperature (°C)" },
//                   { color: "#6ee7b7", label: "Y — Saturation Index (SI)" },
//                 ].map(({ color, label }) => (
//                   <div key={label} className="flex items-center gap-2">
//                     <div
//                       className="w-6 h-0.5 shrink-0 rounded-full"
//                       style={{ background: color }}
//                     />
//                     <span className="text-[10px] text-slate-500">{label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <>
//               <SSection title="Grid Point">
//                 <SRow label="CoC" value={String(d._grid_CoC)} />
//                 <SRow
//                   label="Temperature"
//                   value={`${d._grid_temp} °${tempUnit}`}
//                 />
//                 <SRow label="pH" value={String(d._grid_pH)} />
//                 <SRow
//                   label="Ionic Strength"
//                   value={d.ionic_strength.toFixed(5)}
//                 />
//                 {d.description_of_solution && (
//                   <SRow
//                     label="Activity H₂O"
//                     value={d.description_of_solution.activity_of_water.toFixed(
//                       3,
//                     )}
//                   />
//                 )}
//                 {d.charge_balance_error_pct !== undefined && (
//                   <SRow
//                     label="Charge Bal. Err"
//                     value={`${d.charge_balance_error_pct}%`}
//                   />
//                 )}
//               </SSection>

//               <SSection title={`${saltId} SI`}>
//                 <SRow
//                   label="Saturation Index"
//                   value={saltSI !== null ? saltSI.toFixed(2) : "—"}
//                   bold
//                 />
//                 <div className="flex justify-between items-center py-[5px]">
//                   <span className="text-[11px] text-slate-400">Status</span>
//                   <Badge text={statusLabel} variant={statusVar} />
//                 </div>
//               </SSection>

//               {saltsOfInterest.length > 1 && (
//                 <SSection title="Key Salts SI">
//                   {saltsOfInterest.map((salt) => {
//                     const entry = d.saturation_indices[salt];
//                     return (
//                       <div
//                         key={salt}
//                         className="flex justify-between items-center py-[5px] border-b border-white/[0.04] last:border-0"
//                       >
//                         <div className="flex items-center gap-1.5 min-w-0">
//                           <span
//                             className={`text-[11px] truncate ${salt === saltId ? "font-semibold text-slate-200" : "text-slate-400"}`}
//                           >
//                             {salt}
//                           </span>
//                           {entry?.chemical_formula && (
//                             <span className="text-[9px] text-slate-700 shrink-0">
//                               {entry.chemical_formula}
//                             </span>
//                           )}
//                         </div>
//                         <span
//                           className={`text-[11px] font-medium shrink-0 ${entry && entry.SI > 0 ? "text-red-400" : "text-slate-500"}`}
//                         >
//                           {entry ? entry.SI.toFixed(2) : "—"}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </SSection>
//               )}

//               <SSection title="Deposition Indices">
//                 <SRow
//                   label="LSI"
//                   value={d.indices.lsi.lsi.toFixed(2)}
//                   badge={d.indices.lsi.risk}
//                 />
//                 <SRow
//                   label="RSI"
//                   value={d.indices.ryznar.ri.toFixed(2)}
//                   badge={d.indices.ryznar.risk}
//                 />
//                 <SRow
//                   label="PSI"
//                   value={d.indices.puckorius.index.toFixed(2)}
//                   badge={d.indices.puckorius.risk}
//                 />
//                 <SRow
//                   label="Larson-Skold"
//                   value={d.indices.larson_skold.index.toFixed(3)}
//                   badge={`${d.indices.larson_skold.risk_level} Risk`}
//                 />
//                 <SRow
//                   label="Stiff-Davis"
//                   value={d.indices.stiff_davis.index.toFixed(3)}
//                   badge={d.indices.stiff_davis.risk}
//                 />
//                 <SRow
//                   label="CCPP (ppm)"
//                   value={String(d.indices.ccpp.ccpp_ppm)}
//                   badge={d.indices.ccpp.risk}
//                 />
//               </SSection>

//               <SSection title="Corrosion Rates">
//                 {(
//                   [
//                     ["Mild Steel", d.corrosion.mild_steel],
//                     ["Copper", d.corrosion.copper],
//                     ["Admiralty Brass", d.corrosion.admiralty_brass],
//                   ] as [string, CorrosionMetal][]
//                 ).map(([label, metal]) => (
//                   <div
//                     key={label}
//                     className="py-[5px] border-b border-white/[0.04] last:border-0"
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className="text-[11px] text-slate-400">
//                         {label}
//                       </span>
//                       <Badge text={metal.rating} />
//                     </div>
//                     <div className="flex justify-between mt-0.5">
//                       <span className="text-[10px] text-slate-700">
//                         Treated / Base
//                       </span>
//                       <span className="text-[10px] text-slate-400">
//                         {metal.cr_mpy.toFixed(2)} /{" "}
//                         {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
//                         {metal.total_inhibition_percent !== undefined && (
//                           <span className="text-emerald-500/70 ml-1.5">
//                             −{metal.total_inhibition_percent}%
//                           </span>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </SSection>

//               <SSection title="All Minerals SI">
//                 {Object.entries(d.saturation_indices)
//                   .sort((a, b) => b[1].SI - a[1].SI)
//                   .map(([key, val]) => {
//                     const isTarget = key === saltId;
//                     const isInterest = saltsOfInterest.includes(key);
//                     return (
//                       <div
//                         key={key}
//                         className={`flex justify-between items-center py-[4px] border-b border-white/[0.03] last:border-0 ${isTarget ? "bg-blue-500/5 -mx-1 px-1 rounded" : ""}`}
//                       >
//                         <div className="flex items-center gap-1 min-w-0">
//                           <span
//                             className={`text-[11px] truncate ${isTarget ? "font-bold text-slate-100" : isInterest ? "font-medium text-slate-300" : "text-slate-500"}`}
//                           >
//                             {key}
//                           </span>
//                           {val.chemical_formula && (
//                             <span className="text-[9px] text-slate-700 shrink-0 hidden sm:inline">
//                               {val.chemical_formula}
//                             </span>
//                           )}
//                         </div>
//                         <span
//                           className={`text-[11px] shrink-0 font-medium ${val.SI > 0 ? "text-red-400" : "text-slate-600"} ${isTarget ? "font-bold" : ""}`}
//                         >
//                           {val.SI.toFixed(2)}
//                         </span>
//                       </div>
//                     );
//                   })}
//               </SSection>
//             </>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef, useState, useCallback, useMemo } from "react";
// import * as THREE from "three";
// import {
//   CSS2DRenderer,
//   CSS2DObject,
// } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface SIEntry {
//   SI: number;
//   log_IAP?: number;
//   log_K?: number;
//   phase?: string | null;
//   chemical_formula?: string;
// }

// export interface LsiIndex {
//   lsi: number;
//   interpretation?: string;
//   risk: string;
//   pH_actual?: number;
//   pHs: number;
// }
// export interface RyznarIndex {
//   ri: number;
//   interpretation?: string;
//   risk: string;
//   pH_actual?: number;
//   pHs: number;
// }
// export interface PuckoriusIndex {
//   index: number;
//   interpretation?: string;
//   risk: string;
//   components?: Record<string, number>;
// }
// export interface LarsonSkoldIndex {
//   index: number;
//   interpretation?: string;
//   risk_level: string;
//   components?: Record<string, number>;
// }
// export interface StiffDavisIndex {
//   index: number;
//   interpretation?: string;
//   risk: string;
//   components?: Record<string, number>;
// }
// export interface CcppIndex {
//   ccpp_ppm: number;
//   interpretation?: string;
//   risk: string;
// }

// export interface Indices {
//   lsi: LsiIndex;
//   ryznar: RyznarIndex;
//   puckorius: PuckoriusIndex;
//   larson_skold: LarsonSkoldIndex;
//   stiff_davis: StiffDavisIndex;
//   ccpp: CcppIndex;
// }

// export interface CorrosionMetal {
//   cr_mpy: number;
//   cr_base_mpy?: number;
//   total_inhibition_percent?: number;
//   rating: string;
// }

// export interface Corrosion {
//   mild_steel: CorrosionMetal;
//   copper: CorrosionMetal;
//   admiralty_brass: CorrosionMetal;
// }

// export interface GridResult {
//   _grid_CoC: number;
//   _grid_temp: number;
//   _grid_pH: number;
//   ionic_strength: number;
//   charge_balance_error_pct?: number;
//   saturation_indices: Record<string, SIEntry>;
//   color_code: "yellow" | "red" | "green";
//   indices: Indices;
//   corrosion: Corrosion;
//   description_of_solution?: { pH: number; activity_of_water: number };
// }

// export interface SaturationApiResponse {
//   success: boolean;
//   data: {
//     salt_id: string;
//     salts_of_interest?: string[];
//     dosage_ppm: number;
//     coc_min: number;
//     coc_max: number;
//     temp_min: number;
//     temp_max: number;
//     temp_unit: string;
//     ph_mode?: string;
//     total_grid_points?: number;
//     grid_results: GridResult[];
//     summary?: { green: number; yellow: number; red: number; error: number };
//     base_water_parameters?: Record<string, { value: number; unit: string }>;
//     asset_info?: { name?: string; type?: string };
//   };
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const COLOR_MAP: Record<string, number> = {
//   yellow: 0xf1c40f,
//   red: 0xe74c3c,
//   green: 0x2ecc71,
// };
// const COLOR_HEX: Record<string, string> = {
//   yellow: "#f1c40f",
//   red: "#e74c3c",
//   green: "#2ecc71",
// };
// const BAR_W = 1.55;
// const SPACING = 2.4;
// const BAR_MAX_H = 6.0;

// // ─── Badge ────────────────────────────────────────────────────────────────────

// type BadgeVariant = "yellow" | "red" | "green" | "info" | "warn";

// function getBadgeVariant(text: string): BadgeVariant {
//   const lc = (text || "").toLowerCase();
//   if (
//     lc.includes("excellent") ||
//     lc.includes("low scale") ||
//     lc.includes("protected")
//   )
//     return "green";
//   if (
//     lc.includes("moderate") ||
//     lc.includes("slight") ||
//     lc.includes("caution") ||
//     lc.includes("balanced")
//   )
//     return "warn";
//   if (
//     lc.includes("scale") ||
//     lc.includes("high") ||
//     lc.includes("corros") ||
//     lc.includes("forming")
//   )
//     return "red";
//   return "info";
// }

// const badgeCls: Record<BadgeVariant, string> = {
//   yellow: "bg-yellow-400/15 text-yellow-400",
//   red: "bg-red-500/15 text-red-400",
//   green: "bg-emerald-500/15 text-emerald-400",
//   info: "bg-blue-400/15 text-blue-400",
//   warn: "bg-amber-500/15 text-amber-400",
// };

// function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
//   const v = variant ?? getBadgeVariant(text);
//   return (
//     <span
//       className={`text-[10px] px-1.5 py-0.5 rounded font-normal whitespace-nowrap ${badgeCls[v]}`}
//     >
//       {text}
//     </span>
//   );
// }

// // ─── Sidebar primitives ───────────────────────────────────────────────────────

// function SRow({
//   label,
//   value,
//   badge,
//   bold,
// }: {
//   label: string;
//   value: string;
//   badge?: string;
//   bold?: boolean;
// }) {
//   return (
//     <div className="flex justify-between items-center py-[5px] border-b border-white/[0.04] gap-2 last:border-0">
//       <span
//         className={`text-[11px] shrink-0 ${bold ? "font-semibold text-slate-200" : "text-slate-400"}`}
//       >
//         {label}
//       </span>
//       <span
//         className={`text-[11px] flex items-center gap-1 flex-wrap justify-end ${bold ? "font-semibold text-slate-100" : "font-medium text-slate-100"}`}
//       >
//         {value}
//         {badge && <Badge text={badge} />}
//       </span>
//     </div>
//   );
// }

// function SSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="mb-4">
//       <div className="text-[10px] font-medium text-slate-500 tracking-widest uppercase mb-2 pb-1 border-b border-white/10">
//         {title}
//       </div>
//       {children}
//     </div>
//   );
// }

// // ─── CSS2D label helper ───────────────────────────────────────────────────────

// function makeLabel(
//   text: string,
//   opts: {
//     color?: string;
//     fontSize?: string;
//     fontWeight?: string;
//     background?: string;
//     padding?: string;
//     border?: string;
//   } = {},
// ): CSS2DObject {
//   const div = document.createElement("div");
//   div.textContent = text;
//   div.style.color = opts.color ?? "rgba(148,163,184,0.85)";
//   div.style.fontSize = opts.fontSize ?? "10px";
//   div.style.fontWeight = opts.fontWeight ?? "500";
//   div.style.fontFamily =
//     "ui-monospace, 'Cascadia Code', 'Fira Code', monospace";
//   div.style.whiteSpace = "nowrap";
//   div.style.pointerEvents = "none";
//   div.style.userSelect = "none";
//   div.style.letterSpacing = "0.03em";
//   div.style.lineHeight = "1";
//   if (opts.background) {
//     div.style.background = opts.background;
//     div.style.padding = opts.padding ?? "2px 5px";
//     div.style.borderRadius = "3px";
//   }
//   if (opts.border) div.style.border = opts.border;
//   return new CSS2DObject(div);
// }

// // ─── Build the Three.js scene ─────────────────────────────────────────────────

// function buildScene(
//   canvas: HTMLCanvasElement,
//   labelDiv: HTMLDivElement,
//   wrap: HTMLDivElement,
//   gridResults: GridResult[],
//   saltId: string,
//   cocUniq: number[],
//   tempUniq: number[],
//   maxSI: number,
//   tempUnit: string,
// ) {
//   // ── Renderers ──
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     antialias: true,
//     alpha: false,
//   });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setClearColor(0x0d1117, 1);

//   const labelRenderer = new CSS2DRenderer({ element: labelDiv });

//   const scene = new THREE.Scene();
//   scene.fog = new THREE.FogExp2(0x0d1117, 0.012);

//   const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);

//   // ── Lighting ──
//   scene.add(new THREE.AmbientLight(0xffffff, 0.55));
//   const sun = new THREE.DirectionalLight(0xffffff, 1.0);
//   sun.position.set(15, 30, 15);
//   scene.add(sun);
//   const fill = new THREE.DirectionalLight(0x5588ff, 0.3);
//   fill.position.set(-15, 8, -10);
//   scene.add(fill);

//   // ── Layout math ──
//   // X axis = CoC (increases right)
//   // Z axis = Temperature (increases away from viewer / back)
//   // Y axis = SI height
//   const nCoC = cocUniq.length;
//   const nTemp = tempUniq.length;
//   const cocOffset = -((nCoC - 1) * SPACING) / 2;
//   const tempOffset = -((nTemp - 1) * SPACING) / 2;

//   // World extents
//   const xMin = cocOffset - SPACING / 2;
//   const xMax = (nCoC - 1) * SPACING + cocOffset + SPACING / 2;
//   const zMin = tempOffset - SPACING / 2;
//   const zMax = (nTemp - 1) * SPACING + tempOffset + SPACING / 2;
//   const yMax = BAR_MAX_H;

//   // Axis origins — place at the left-front corner of the floor
//   const axOriginX = xMin - 0.3;
//   const axOriginY = 0;
//   const axOriginZ = zMax + 0.3; // front of scene (positive Z is towards viewer)

//   const barMeshes: THREE.Mesh[] = [];

//   // ── Bars ──
//   gridResults.forEach((d) => {
//     const si = d.saturation_indices[saltId]?.SI ?? 0;
//     const h = Math.max(0.15, (si / maxSI) * BAR_MAX_H);
//     const ci = cocUniq.indexOf(d._grid_CoC);
//     const ti = tempUniq.indexOf(d._grid_temp);
//     const x = ci * SPACING + cocOffset;
//     const z = ti * SPACING + tempOffset;
//     const clr = COLOR_MAP[d.color_code] ?? 0xe74c3c;

//     const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
//     const mat = new THREE.MeshLambertMaterial({ color: clr });
//     const mesh = new THREE.Mesh(geo, mat);
//     mesh.position.set(x, h / 2, z);
//     mesh.userData = { data: d, origColor: clr, h };
//     scene.add(mesh);
//     barMeshes.push(mesh);

//     // SI value on top
//     const siLbl = makeLabel(si.toFixed(2), {
//       color: "rgba(255,255,255,0.9)",
//       fontSize: "9px",
//       fontWeight: "700",
//       background: "rgba(0,0,0,0.5)",
//       padding: "1px 4px",
//     });
//     siLbl.position.set(0, h / 2 + 0.22, 0);
//     mesh.add(siLbl);

//     // Edges
//     mesh.add(
//       new THREE.LineSegments(
//         new THREE.EdgesGeometry(geo),
//         new THREE.LineBasicMaterial({
//           color: 0x000000,
//           transparent: true,
//           opacity: 0.2,
//         }),
//       ),
//     );
//   });

//   // ── Floor grid ──
//   const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
//   const gridHelper = new THREE.GridHelper(
//     gridW + 4,
//     (nCoC + nTemp) * 3,
//     0x252d3a,
//     0x1a2030,
//   );
//   gridHelper.position.y = -0.01;
//   scene.add(gridHelper);

//   // ── Axis helper lines ──
//   // We draw the three axis lines from a shared origin at (axOriginX, 0, axOriginZ)

//   const mkLine = (points: THREE.Vector3[], color: number, opacity = 0.7) => {
//     const line = new THREE.Line(
//       new THREE.BufferGeometry().setFromPoints(points),
//       new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
//     );
//     scene.add(line);
//   };

//   // X axis line (CoC) — runs along Z = axOriginZ (front), at y=0
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//       new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     ],
//     0x60a5fa,
//     0.8,
//   );

//   // Z axis line (Temperature) — runs along X = axOriginX (left), at y=0
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//     ],
//     0xfb923c,
//     0.8,
//   );

//   // Y axis line (SI) — vertical at the shared origin corner
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, 0, axOriginZ),
//       new THREE.Vector3(axOriginX, yMax + 0.8, axOriginZ),
//     ],
//     0x6ee7b7,
//     0.8,
//   );

//   // Arrow heads
//   const mkArrow = (
//     dir: THREE.Vector3,
//     origin: THREE.Vector3,
//     color: number,
//   ) => {
//     const arrow = new THREE.ArrowHelper(
//       dir.normalize(),
//       origin,
//       0.7,
//       color,
//       0.35,
//       0.18,
//     );
//     scene.add(arrow);
//   };
//   mkArrow(
//     new THREE.Vector3(1, 0, 0),
//     new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     0x60a5fa,
//   );
//   mkArrow(
//     new THREE.Vector3(0, 0, -1),
//     new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//     0xfb923c,
//   );
//   mkArrow(
//     new THREE.Vector3(0, 1, 0),
//     new THREE.Vector3(axOriginX, yMax + 0.8, axOriginZ),
//     0x6ee7b7,
//   );

//   // ── CoC tick labels (X axis) ──
//   cocUniq.forEach((coc, ci) => {
//     const x = ci * SPACING + cocOffset;
//     const lbl = makeLabel(`CoC ${coc}`, {
//       color: "#93c5fd",
//       fontSize: "10px",
//       fontWeight: "700",
//       background: "rgba(30,58,138,0.35)",
//       padding: "1px 5px",
//     });
//     lbl.position.set(x, 0, axOriginZ + 0.9);
//     scene.add(lbl);

//     // tick line down from axis
//     mkLine(
//       [
//         new THREE.Vector3(x, 0, axOriginZ),
//         new THREE.Vector3(x, 0, axOriginZ + 0.45),
//       ],
//       0x3b82f6,
//       0.35,
//     );

//     // vertical guide line (faint)
//     mkLine(
//       [new THREE.Vector3(x, 0, zMin - 0.3), new THREE.Vector3(x, 0, axOriginZ)],
//       0x1e3a5f,
//       0.18,
//     );
//   });

//   // CoC axis title
//   const cocTitle = makeLabel("← Cycles of Concentration (CoC) →", {
//     color: "#93c5fd",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   cocTitle.position.set((xMin + xMax) / 2, 0, axOriginZ + 2.1);
//   scene.add(cocTitle);

//   // ── Temperature tick labels (Z axis) ──
//   tempUniq.forEach((temp, ti) => {
//     const z = ti * SPACING + tempOffset;
//     const lbl = makeLabel(`${temp}°${tempUnit}`, {
//       color: "#fdba74",
//       fontSize: "10px",
//       fontWeight: "700",
//       background: "rgba(120,53,15,0.35)",
//       padding: "1px 5px",
//     });
//     lbl.position.set(axOriginX - 1.0, 0, z);
//     scene.add(lbl);

//     // tick
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, 0, z),
//         new THREE.Vector3(axOriginX - 0.45, 0, z),
//       ],
//       0xf97316,
//       0.35,
//     );

//     // horizontal guide
//     mkLine(
//       [new THREE.Vector3(axOriginX, 0, z), new THREE.Vector3(xMax + 0.3, 0, z)],
//       0x431407,
//       0.18,
//     );
//   });

//   // Temperature axis title
//   const tempTitle = makeLabel("← Temperature →", {
//     color: "#fdba74",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   tempTitle.position.set(axOriginX - 2.0, 0, (zMin + zMax) / 2);
//   scene.add(tempTitle);

//   // ── SI tick labels (Y axis) ──
//   const siStep = maxSI <= 1 ? 0.25 : maxSI <= 2 ? 0.5 : 1.0;
//   const siTicks: number[] = [];
//   for (let v = 0; v <= maxSI + siStep * 0.5; v += siStep) {
//     siTicks.push(parseFloat(v.toFixed(3)));
//   }
//   siTicks.forEach((v) => {
//     const yPos = (v / maxSI) * BAR_MAX_H;
//     const lbl = makeLabel(v.toFixed(2), {
//       color: "#86efac",
//       fontSize: "10px",
//       fontWeight: "600",
//       background: "rgba(5,46,22,0.4)",
//       padding: "1px 4px",
//     });
//     lbl.position.set(axOriginX - 0.7, yPos, axOriginZ);
//     scene.add(lbl);

//     // horizontal tick
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, yPos, axOriginZ),
//         new THREE.Vector3(axOriginX - 0.4, yPos, axOriginZ),
//       ],
//       0x22c55e,
//       0.35,
//     );

//     // faint horizontal plane line
//     if (v > 0) {
//       mkLine(
//         [
//           new THREE.Vector3(axOriginX, yPos, axOriginZ),
//           new THREE.Vector3(xMax + 0.3, yPos, axOriginZ),
//         ],
//         0x14532d,
//         0.15,
//       );
//     }
//   });

//   // SI axis title
//   const siTitle = makeLabel("SI (Saturation Index)", {
//     color: "#86efac",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   siTitle.position.set(axOriginX - 0.7, yMax + 1.2, axOriginZ);
//   scene.add(siTitle);

//   // ── State ──
//   const nMax = Math.max(nCoC, nTemp);
//   const initDist = Math.max(25, nMax * 6.5);

//   return {
//     renderer,
//     labelRenderer,
//     scene,
//     camera,
//     barMeshes,
//     initDist,
//     axOriginX,
//     axOriginY,
//     axOriginZ,
//   };
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// interface SceneState {
//   renderer: THREE.WebGLRenderer;
//   labelRenderer: CSS2DRenderer;
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   barMeshes: THREE.Mesh[];
//   rotY: number;
//   rotX: number;
//   dist: number;
//   isDragging: boolean;
//   prevX: number;
//   prevY: number;
//   hoveredMesh: THREE.Mesh | null;
//   selectedMesh: THREE.Mesh | null;
//   animId: number;
// }

// interface Props {
//   apiResponse?: SaturationApiResponse;
// }

// export default function SaturationDashboard({ apiResponse }: Props) {
//   const gridResults: GridResult[] = useMemo(
//     () => apiResponse?.data?.grid_results ?? [],
//     [apiResponse],
//   );
//   const meta = apiResponse?.data;
//   const saltId = meta?.salt_id ?? "Calcite";
//   const dosage = meta?.dosage_ppm ?? 0;
//   const cocMin = meta?.coc_min ?? 1;
//   const cocMax = meta?.coc_max ?? 8;
//   const tempMin = meta?.temp_min ?? 25;
//   const tempMax = meta?.temp_max ?? 55;
//   const tempUnit = meta?.temp_unit ?? "C";
//   const assetName = meta?.asset_info?.name;
//   const summary = meta?.summary;
//   const saltsOfInterest = meta?.salts_of_interest ?? [saltId];

//   const cocUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_CoC))].sort((a, b) => a - b),
//     [gridResults],
//   );
//   const tempUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_temp))].sort((a, b) => a - b),
//     [gridResults],
//   );
//   const maxSI = useMemo(() => {
//     const vals = gridResults.map((d) => d.saturation_indices[saltId]?.SI ?? 0);
//     return Math.max(...vals, 0.5);
//   }, [gridResults, saltId]);

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const labelDivRef = useRef<HTMLDivElement>(null);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<SceneState | null>(null);
//   const [activeData, setActiveData] = useState<GridResult | null>(null);

//   const updateCamera = useCallback(() => {
//     const s = sceneRef.current;
//     if (!s) return;
//     s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.position.y = Math.sin(s.rotX) * s.dist;
//     s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.lookAt(0, 2, 0);
//   }, []);

//   // ── Build scene ──
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const wrap = wrapRef.current;
//     const labelDiv = labelDivRef.current;
//     if (!canvas || !wrap || !labelDiv) return;

//     // Tear down previous
//     if (sceneRef.current) {
//       cancelAnimationFrame(sceneRef.current.animId);
//       sceneRef.current.renderer.dispose();
//       sceneRef.current = null;
//     }
//     if (gridResults.length === 0) return;

//     const { renderer, labelRenderer, scene, camera, barMeshes, initDist } =
//       buildScene(
//         canvas,
//         labelDiv,
//         wrap,
//         gridResults,
//         saltId,
//         cocUniq,
//         tempUniq,
//         maxSI,
//         tempUnit,
//       );

//     const state: SceneState = {
//       renderer,
//       labelRenderer,
//       scene,
//       camera,
//       barMeshes,
//       rotY: 0.55,
//       rotX: 0.4,
//       dist: initDist,
//       isDragging: false,
//       prevX: 0,
//       prevY: 0,
//       hoveredMesh: null,
//       selectedMesh: null,
//       animId: 0,
//     };
//     sceneRef.current = state;

//     const resize = () => {
//       const w = wrap.clientWidth;
//       const h = Math.max(300, wrap.clientHeight);
//       renderer.setSize(w, h, false);
//       labelRenderer.setSize(w, h);
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     updateCamera();

//     const animate = () => {
//       state.animId = requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//       labelRenderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(state.animId);
//       window.removeEventListener("resize", resize);
//       renderer.dispose();
//       sceneRef.current = null;
//     };
//   }, [gridResults, saltId, maxSI, cocUniq, tempUniq, tempUnit, updateCamera]);

//   // ── Interaction ──
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     const gs = () => sceneRef.current;

//     const onDown = (e: MouseEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.isDragging = true;
//       s.prevX = e.clientX;
//       s.prevY = e.clientY;
//       canvas.style.cursor = "grabbing";
//     };
//     const onUp = () => {
//       const s = gs();
//       if (!s) return;
//       s.isDragging = false;
//       canvas.style.cursor = "grab";
//     };
//     const onMove = (e: MouseEvent) => {
//       const s = gs();
//       if (!s) return;
//       if (s.isDragging) {
//         s.rotY += (e.clientX - s.prevX) * 0.008;
//         s.rotX -= (e.clientY - s.prevY) * 0.008;
//         s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         return;
//       }
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
//       raycaster.setFromCamera(mouse, s.camera);
//       const hits = raycaster.intersectObjects(s.barMeshes);
//       if (s.hoveredMesh && s.hoveredMesh !== s.selectedMesh)
//         (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
//           s.hoveredMesh.userData.origColor,
//         );
//       if (hits.length > 0) {
//         s.hoveredMesh = hits[0].object as THREE.Mesh;
//         if (s.hoveredMesh !== s.selectedMesh)
//           (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
//             0xffffff,
//           );
//         canvas.style.cursor = "pointer";
//         setActiveData(s.hoveredMesh.userData.data as GridResult);
//       } else {
//         s.hoveredMesh = null;
//         canvas.style.cursor = "grab";
//         setActiveData(
//           s.selectedMesh ? (s.selectedMesh.userData.data as GridResult) : null,
//         );
//       }
//     };
//     const onClick = () => {
//       const s = gs();
//       if (!s || !s.hoveredMesh) return;
//       if (s.selectedMesh && s.selectedMesh !== s.hoveredMesh)
//         (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(
//           s.selectedMesh.userData.origColor,
//         );
//       s.selectedMesh = s.hoveredMesh;
//       (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(
//         0xffffff,
//       );
//       setActiveData(s.selectedMesh.userData.data as GridResult);
//     };
//     const onWheel = (e: WheelEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.dist = Math.max(8, Math.min(120, s.dist + e.deltaY * 0.05));
//       updateCamera();
//       e.preventDefault();
//     };
//     const onTStart = (e: TouchEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//     };
//     const onTMove = (e: TouchEvent) => {
//       const s = gs();
//       if (!s) return;
//       s.rotY += (e.touches[0].clientX - s.prevX) * 0.01;
//       s.rotX -= (e.touches[0].clientY - s.prevY) * 0.01;
//       s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       updateCamera();
//       e.preventDefault();
//     };

//     canvas.addEventListener("mousedown", onDown);
//     window.addEventListener("mouseup", onUp);
//     window.addEventListener("mousemove", onMove);
//     canvas.addEventListener("click", onClick);
//     canvas.addEventListener("wheel", onWheel, { passive: false });
//     canvas.addEventListener("touchstart", onTStart, { passive: true });
//     canvas.addEventListener("touchmove", onTMove, { passive: false });
//     return () => {
//       canvas.removeEventListener("mousedown", onDown);
//       window.removeEventListener("mouseup", onUp);
//       window.removeEventListener("mousemove", onMove);
//       canvas.removeEventListener("click", onClick);
//       canvas.removeEventListener("wheel", onWheel);
//       canvas.removeEventListener("touchstart", onTStart);
//       canvas.removeEventListener("touchmove", onTMove);
//     };
//   }, [updateCamera]);

//   // ── Sidebar ──
//   const d = activeData;
//   const saltSI = d ? (d.saturation_indices[saltId]?.SI ?? null) : null;
//   const colorCode = d?.color_code;
//   const statusLabel =
//     colorCode === "yellow"
//       ? "Caution"
//       : colorCode === "red"
//         ? "Scale Risk"
//         : "Protected";
//   const statusVar: BadgeVariant =
//     colorCode === "yellow" ? "yellow" : colorCode === "red" ? "red" : "green";
//   const isEmpty = gridResults.length === 0;

//   return (
//     <div className="bg-[#0d1117] text-slate-200 font-sans text-[13px] h-screen overflow-hidden flex flex-col select-none">
//       {/* Header */}
//       <header className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/10 shrink-0 gap-4 flex-wrap">
//         <div>
//           <div className="text-sm font-semibold text-slate-100 tracking-wide">
//             Saturation Analysis —{" "}
//             <span className="text-blue-400">{saltId}</span> · 3D Grid
//           </div>
//           <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap gap-x-3">
//             {assetName && (
//               <span className="text-slate-400 font-medium">{assetName}</span>
//             )}
//             <span>
//               CoC {cocMin}–{cocMax}
//             </span>
//             <span>
//               Temp {tempMin}–{tempMax} °{tempUnit}
//             </span>
//             <span>Dosage {dosage} ppm</span>
//             {meta?.total_grid_points && (
//               <span>{meta.total_grid_points} pts</span>
//             )}
//           </div>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap">
//           {summary && (
//             <div className="flex gap-1 mr-3 text-[11px]">
//               {summary.green > 0 && (
//                 <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">
//                   {summary.green} Protected
//                 </span>
//               )}
//               {summary.yellow > 0 && (
//                 <span className="px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 font-medium">
//                   {summary.yellow} Caution
//                 </span>
//               )}
//               {summary.red > 0 && (
//                 <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-medium">
//                   {summary.red} Scale Risk
//                 </span>
//               )}
//             </div>
//           )}
//           {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
//             const dot =
//               label === "Caution"
//                 ? "bg-yellow-400"
//                 : label === "Scale Risk"
//                   ? "bg-red-500"
//                   : "bg-emerald-500";
//             return (
//               <div
//                 key={label}
//                 className="flex items-center gap-1.5 text-[11px] text-slate-400"
//               >
//                 <span className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`} />
//                 {label}
//               </div>
//             );
//           })}
//         </div>
//       </header>

//       {/* Salt chips */}
//       {saltsOfInterest.length > 1 && (
//         <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0f1419] border-b border-white/[0.06] overflow-x-auto shrink-0">
//           <span className="text-[10px] text-slate-600 shrink-0 mr-1">
//             Salts of interest:
//           </span>
//           {saltsOfInterest.map((s) => (
//             <span
//               key={s}
//               className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${s === saltId ? "border-blue-500/60 text-blue-400 bg-blue-500/10" : "border-white/10 text-slate-500"}`}
//             >
//               {s}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Main */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* 3D canvas */}
//         <div
//           ref={wrapRef}
//           className="flex-1 min-w-0 relative bg-[#0d1117] overflow-hidden"
//         >
//           {isEmpty ? (
//             <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
//               <div className="text-4xl opacity-20">⬛</div>
//               <p className="text-sm">
//                 No grid data — pass an{" "}
//                 <code className="text-slate-500 bg-white/5 px-1 rounded">
//                   apiResponse
//                 </code>{" "}
//                 prop.
//               </p>
//             </div>
//           ) : (
//             <>
//               <canvas
//                 ref={canvasRef}
//                 className="block w-full h-full cursor-grab"
//               />
//               <div
//                 ref={labelDivRef}
//                 className="absolute inset-0 pointer-events-none overflow-hidden"
//                 style={{ zIndex: 10 }}
//               />
//               {/* Axis legend overlay */}
//               <div className="absolute bottom-3 left-3 flex flex-col gap-1 pointer-events-none">
//                 <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
//                   <div className="w-5 h-0.5 bg-blue-400 rounded" />
//                   <span>X — Cycles of Concentration (CoC)</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
//                   <div className="w-5 h-0.5 bg-orange-400 rounded" />
//                   <span>Z — Temperature (°{tempUnit})</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
//                   <div className="w-5 h-0.5 bg-emerald-400 rounded" />
//                   <span>Y — Saturation Index (SI)</span>
//                 </div>
//               </div>
//               <div className="absolute bottom-3 right-3 text-[10px] text-slate-700 pointer-events-none text-right">
//                 Drag · Rotate &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click ·
//                 Pin
//               </div>
//             </>
//           )}
//         </div>

//         {/* Sidebar */}
//         <aside className="w-[265px] shrink-0 bg-[#161b22] border-l border-white/10 overflow-y-auto p-3.5">
//           {!d ? (
//             <div className="text-center py-6">
//               <p className="text-[11px] text-slate-500 mb-1">
//                 Hover or click a bar
//               </p>
//               <p className="text-[10px] text-slate-700">
//                 to inspect grid-point details
//               </p>
//               <div className="mt-6 space-y-2">
//                 {[
//                   {
//                     label: "Protected",
//                     sub: "SI within safe band",
//                     hex: COLOR_HEX.green,
//                     bg: "bg-emerald-500/10",
//                   },
//                   {
//                     label: "Caution",
//                     sub: "Mild scaling tendency",
//                     hex: COLOR_HEX.yellow,
//                     bg: "bg-yellow-400/10",
//                   },
//                   {
//                     label: "Scale Risk",
//                     sub: "High CaCO₃ scale risk",
//                     hex: COLOR_HEX.red,
//                     bg: "bg-red-500/10",
//                   },
//                 ].map(({ label, sub, hex, bg }) => (
//                   <div
//                     key={label}
//                     className={`flex items-center gap-2.5 px-2.5 py-2 rounded ${bg} text-left`}
//                   >
//                     <div
//                       className="w-3 h-8 rounded-sm shrink-0"
//                       style={{ background: hex }}
//                     />
//                     <div>
//                       <div className="text-[11px] font-semibold text-slate-300">
//                         {label}
//                       </div>
//                       <div className="text-[10px] text-slate-600">{sub}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-6 border-t border-white/[0.06] pt-4 space-y-2 text-left">
//                 <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">
//                   Axis Legend
//                 </p>
//                 {[
//                   { color: "#60a5fa", label: "X — Cycles of Concentration" },
//                   { color: "#fb923c", label: "Z — Temperature (°C)" },
//                   { color: "#6ee7b7", label: "Y — Saturation Index (SI)" },
//                 ].map(({ color, label }) => (
//                   <div key={label} className="flex items-center gap-2">
//                     <div
//                       className="w-6 h-0.5 shrink-0 rounded-full"
//                       style={{ background: color }}
//                     />
//                     <span className="text-[10px] text-slate-500">{label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <>
//               <SSection title="Grid Point">
//                 <SRow label="CoC" value={String(d._grid_CoC)} />
//                 <SRow
//                   label="Temperature"
//                   value={`${d._grid_temp} °${tempUnit}`}
//                 />
//                 <SRow label="pH" value={String(d._grid_pH)} />
//                 <SRow
//                   label="Ionic Strength"
//                   value={d.ionic_strength.toFixed(5)}
//                 />
//                 {d.description_of_solution && (
//                   <SRow
//                     label="Activity H₂O"
//                     value={d.description_of_solution.activity_of_water.toFixed(
//                       3,
//                     )}
//                   />
//                 )}
//                 {d.charge_balance_error_pct !== undefined && (
//                   <SRow
//                     label="Charge Bal. Err"
//                     value={`${d.charge_balance_error_pct}%`}
//                   />
//                 )}
//               </SSection>

//               <SSection title={`${saltId} SI`}>
//                 <SRow
//                   label="Saturation Index"
//                   value={saltSI !== null ? saltSI.toFixed(2) : "—"}
//                   bold
//                 />
//                 <div className="flex justify-between items-center py-[5px]">
//                   <span className="text-[11px] text-slate-400">Status</span>
//                   <Badge text={statusLabel} variant={statusVar} />
//                 </div>
//               </SSection>

//               {saltsOfInterest.length > 1 && (
//                 <SSection title="Key Salts SI">
//                   {saltsOfInterest.map((salt) => {
//                     const entry = d.saturation_indices[salt];
//                     return (
//                       <div
//                         key={salt}
//                         className="flex justify-between items-center py-[5px] border-b border-white/[0.04] last:border-0"
//                       >
//                         <div className="flex items-center gap-1.5 min-w-0">
//                           <span
//                             className={`text-[11px] truncate ${salt === saltId ? "font-semibold text-slate-200" : "text-slate-400"}`}
//                           >
//                             {salt}
//                           </span>
//                           {entry?.chemical_formula && (
//                             <span className="text-[9px] text-slate-700 shrink-0">
//                               {entry.chemical_formula}
//                             </span>
//                           )}
//                         </div>
//                         <span
//                           className={`text-[11px] font-medium shrink-0 ${entry && entry.SI > 0 ? "text-red-400" : "text-slate-500"}`}
//                         >
//                           {entry ? entry.SI.toFixed(2) : "—"}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </SSection>
//               )}

//               <SSection title="Deposition Indices">
//                 <SRow
//                   label="LSI"
//                   value={d.indices.lsi.lsi.toFixed(2)}
//                   badge={d.indices.lsi.risk}
//                 />
//                 <SRow
//                   label="RSI"
//                   value={d.indices.ryznar.ri.toFixed(2)}
//                   badge={d.indices.ryznar.risk}
//                 />
//                 <SRow
//                   label="PSI"
//                   value={d.indices.puckorius.index.toFixed(2)}
//                   badge={d.indices.puckorius.risk}
//                 />
//                 <SRow
//                   label="Larson-Skold"
//                   value={d.indices.larson_skold.index.toFixed(3)}
//                   badge={`${d.indices.larson_skold.risk_level} Risk`}
//                 />
//                 <SRow
//                   label="Stiff-Davis"
//                   value={d.indices.stiff_davis.index.toFixed(3)}
//                   badge={d.indices.stiff_davis.risk}
//                 />
//                 <SRow
//                   label="CCPP (ppm)"
//                   value={String(d.indices.ccpp.ccpp_ppm)}
//                   badge={d.indices.ccpp.risk}
//                 />
//               </SSection>

//               <SSection title="Corrosion Rates">
//                 {(
//                   [
//                     ["Mild Steel", d.corrosion.mild_steel],
//                     ["Copper", d.corrosion.copper],
//                     ["Admiralty Brass", d.corrosion.admiralty_brass],
//                   ] as [string, CorrosionMetal][]
//                 ).map(([label, metal]) => (
//                   <div
//                     key={label}
//                     className="py-[5px] border-b border-white/[0.04] last:border-0"
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className="text-[11px] text-slate-400">
//                         {label}
//                       </span>
//                       <Badge text={metal.rating} />
//                     </div>
//                     <div className="flex justify-between mt-0.5">
//                       <span className="text-[10px] text-slate-700">
//                         Treated / Base
//                       </span>
//                       <span className="text-[10px] text-slate-400">
//                         {metal.cr_mpy.toFixed(2)} /{" "}
//                         {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
//                         {metal.total_inhibition_percent !== undefined && (
//                           <span className="text-emerald-500/70 ml-1.5">
//                             −{metal.total_inhibition_percent}%
//                           </span>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </SSection>

//               <SSection title="All Minerals SI">
//                 {Object.entries(d.saturation_indices)
//                   .sort((a, b) => b[1].SI - a[1].SI)
//                   .map(([key, val]) => {
//                     const isTarget = key === saltId;
//                     const isInterest = saltsOfInterest.includes(key);
//                     return (
//                       <div
//                         key={key}
//                         className={`flex justify-between items-center py-[4px] border-b border-white/[0.03] last:border-0 ${isTarget ? "bg-blue-500/5 -mx-1 px-1 rounded" : ""}`}
//                       >
//                         <div className="flex items-center gap-1 min-w-0">
//                           <span
//                             className={`text-[11px] truncate ${isTarget ? "font-bold text-slate-100" : isInterest ? "font-medium text-slate-300" : "text-slate-500"}`}
//                           >
//                             {key}
//                           </span>
//                           {val.chemical_formula && (
//                             <span className="text-[9px] text-slate-700 shrink-0 hidden sm:inline">
//                               {val.chemical_formula}
//                             </span>
//                           )}
//                         </div>
//                         <span
//                           className={`text-[11px] shrink-0 font-medium ${val.SI > 0 ? "text-red-400" : "text-slate-600"} ${isTarget ? "font-bold" : ""}`}
//                         >
//                           {val.SI.toFixed(2)}
//                         </span>
//                       </div>
//                     );
//                   })}
//               </SSection>
//             </>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SIEntry {
  SI: number;
  log_IAP?: number;
  log_K?: number;
  phase?: string | null;
  chemical_formula?: string;
}
export interface LsiIndex {
  lsi: number;
  interpretation?: string;
  risk: string;
  pH_actual?: number;
  pHs: number;
}
export interface RyznarIndex {
  ri: number;
  interpretation?: string;
  risk: string;
  pH_actual?: number;
  pHs: number;
}
export interface PuckoriusIndex {
  index: number;
  interpretation?: string;
  risk: string;
  components?: Record<string, number>;
}
export interface LarsonSkoldIndex {
  index: number;
  interpretation?: string;
  risk_level: string;
  components?: Record<string, number>;
}
export interface StiffDavisIndex {
  index: number;
  interpretation?: string;
  risk: string;
  components?: Record<string, number>;
}
export interface CcppIndex {
  ccpp_ppm: number;
  interpretation?: string;
  risk: string;
}
export interface Indices {
  lsi: LsiIndex;
  ryznar: RyznarIndex;
  puckorius: PuckoriusIndex;
  larson_skold: LarsonSkoldIndex;
  stiff_davis: StiffDavisIndex;
  ccpp: CcppIndex;
}
export interface CorrosionMetal {
  cr_mpy: number;
  cr_base_mpy?: number;
  total_inhibition_percent?: number;
  rating: string;
}
export interface Corrosion {
  mild_steel: CorrosionMetal;
  copper: CorrosionMetal;
  admiralty_brass: CorrosionMetal;
}
export interface GridResult {
  _grid_CoC: number;
  _grid_temp: number;
  _grid_pH: number;
  ionic_strength: number;
  charge_balance_error_pct?: number;
  saturation_indices: Record<string, SIEntry>;
  color_code: "yellow" | "red" | "green";
  indices: Indices;
  corrosion: Corrosion;
  description_of_solution?: { pH: number; activity_of_water: number };
}
export interface SaturationApiResponse {
  success: boolean;
  data: {
    salt_id: string;
    salts_of_interest?: string[];
    dosage_ppm: number;
    coc_min: number;
    coc_max: number;
    temp_min: number;
    temp_max: number;
    temp_unit: string;
    ph_mode?: string;
    total_grid_points?: number;
    grid_results: GridResult[];
    summary?: { green: number; yellow: number; red: number; error: number };
    base_water_parameters?: Record<string, { value: number; unit: string }>;
    asset_info?: { name?: string; type?: string };
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, number> = {
  yellow: 0xf1c40f,
  red: 0xe74c3c,
  green: 0x2ecc71,
};
const COLOR_HEX: Record<string, string> = {
  yellow: "#f1c40f",
  red: "#e74c3c",
  green: "#2ecc71",
};
const BAR_W = 1.55;
const SPACING = 2.4;
const BAR_MAX_H = 6.0;

// ─── Badge ────────────────────────────────────────────────────────────────────

type BadgeVariant = "yellow" | "red" | "green" | "info" | "warn";

function getBadgeVariant(text: string): BadgeVariant {
  const lc = (text || "").toLowerCase();
  if (
    lc.includes("excellent") ||
    lc.includes("low scale") ||
    lc.includes("protected")
  )
    return "green";
  if (
    lc.includes("moderate") ||
    lc.includes("slight") ||
    lc.includes("caution") ||
    lc.includes("balanced")
  )
    return "warn";
  if (
    lc.includes("scale") ||
    lc.includes("high") ||
    lc.includes("corros") ||
    lc.includes("forming")
  )
    return "red";
  return "info";
}

const badgeCls: Record<BadgeVariant, string> = {
  yellow: "bg-yellow-400/15 text-yellow-400",
  red: "bg-red-500/15 text-red-400",
  green: "bg-emerald-500/15 text-emerald-400",
  info: "bg-blue-400/15 text-blue-400",
  warn: "bg-amber-500/15 text-amber-400",
};

function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
  const v = variant ?? getBadgeVariant(text);
  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded font-normal whitespace-nowrap ${badgeCls[v]}`}
    >
      {text}
    </span>
  );
}

// ─── Sidebar primitives ───────────────────────────────────────────────────────

function SRow({
  label,
  value,
  badge,
  bold,
}: {
  label: string;
  value: string;
  badge?: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-[5px] border-b border-white/[0.04] gap-2 last:border-0">
      <span
        className={`text-[11px] shrink-0 ${bold ? "font-semibold text-slate-200" : "text-slate-400"}`}
      >
        {label}
      </span>
      <span
        className={`text-[11px] flex items-center gap-1 flex-wrap justify-end ${bold ? "font-semibold text-slate-100" : "font-medium text-slate-100"}`}
      >
        {value}
        {badge && <Badge text={badge} />}
      </span>
    </div>
  );
}

function SSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="text-[10px] font-medium text-slate-500 tracking-widest uppercase mb-2 pb-1 border-b border-white/10">
        {title}
      </div>
      {children}
    </div>
  );
}

// ─── CSS2D label helper ───────────────────────────────────────────────────────
// CRITICAL: Every label div must have pointerEvents="none" so they never
// intercept mousemove/click events that need to reach the canvas for raycasting.

function makeLabel(
  text: string,
  opts: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    background?: string;
    padding?: string;
  } = {},
): CSS2DObject {
  const div = document.createElement("div");
  div.textContent = text;
  div.style.color = opts.color ?? "rgba(148,163,184,0.85)";
  div.style.fontSize = opts.fontSize ?? "10px";
  div.style.fontWeight = opts.fontWeight ?? "500";
  div.style.fontFamily =
    "ui-monospace, 'Cascadia Code', 'Fira Code', monospace";
  div.style.whiteSpace = "nowrap";
  div.style.pointerEvents = "none"; // ← MUST be none on every label
  div.style.userSelect = "none";
  div.style.letterSpacing = "0.03em";
  div.style.lineHeight = "1";
  if (opts.background) {
    div.style.background = opts.background;
    div.style.padding = opts.padding ?? "2px 5px";
    div.style.borderRadius = "3px";
  }
  return new CSS2DObject(div);
}

// ─── Build scene ─────────────────────────────────────────────────────────────

function buildScene(
  canvas: HTMLCanvasElement,
  wrap: HTMLDivElement,
  gridResults: GridResult[],
  saltId: string,
  cocUniq: number[],
  tempUniq: number[],
  maxSI: number,
  tempUnit: string,
) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0d1117, 1);

  // FIX 1: CSS2DRenderer owns its own DOM element — never share an external div.
  // FIX 2: The label overlay element has pointer-events:none so it NEVER blocks
  //         mouse events from reaching the canvas below it.
  const labelRenderer = new CSS2DRenderer();
  const labelEl = labelRenderer.domElement;
  labelEl.style.position = "absolute";
  labelEl.style.top = "0";
  labelEl.style.left = "0";
  labelEl.style.width = "100%";
  labelEl.style.height = "100%";
  labelEl.style.pointerEvents = "none"; // ← The root fix for hover/click issues
  labelEl.style.overflow = "hidden";
  labelEl.style.zIndex = "10";
  wrap.appendChild(labelEl);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0d1117, 0.012);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 1.0);
  sun.position.set(15, 30, 15);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x5588ff, 0.3);
  fill.position.set(-15, 8, -10);
  scene.add(fill);

  const nCoC = cocUniq.length;
  const nTemp = tempUniq.length;
  const cocOffset = -((nCoC - 1) * SPACING) / 2;
  const tempOffset = -((nTemp - 1) * SPACING) / 2;
  const xMin = cocOffset - SPACING / 2;
  const xMax = (nCoC - 1) * SPACING + cocOffset + SPACING / 2;
  const zMin = tempOffset - SPACING / 2;
  const zMax = (nTemp - 1) * SPACING + tempOffset + SPACING / 2;
  const yMax = BAR_MAX_H;
  const axOriginX = xMin - 0.3;
  const axOriginY = 0;
  const axOriginZ = zMax + 0.3;

  const barMeshes: THREE.Mesh[] = [];

  gridResults.forEach((d) => {
    const si = d.saturation_indices[saltId]?.SI ?? 0;
    const h = Math.max(0.15, (si / maxSI) * BAR_MAX_H);
    const ci = cocUniq.indexOf(d._grid_CoC);
    const ti = tempUniq.indexOf(d._grid_temp);
    const x = ci * SPACING + cocOffset;
    const z = ti * SPACING + tempOffset;
    const clr = COLOR_MAP[d.color_code] ?? 0xe74c3c;

    const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
    const mat = new THREE.MeshLambertMaterial({ color: clr });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, h / 2, z);
    mesh.userData = { data: d, origColor: clr, h };
    scene.add(mesh);
    barMeshes.push(mesh);

    const siLbl = makeLabel(si.toFixed(2), {
      color: "rgba(255,255,255,0.9)",
      fontSize: "9px",
      fontWeight: "700",
      background: "rgba(0,0,0,0.5)",
      padding: "1px 4px",
    });
    siLbl.position.set(0, h / 2 + 0.22, 0);
    mesh.add(siLbl);

    mesh.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.2,
        }),
      ),
    );
  });

  const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
  const gridHelper = new THREE.GridHelper(
    gridW + 4,
    (nCoC + nTemp) * 3,
    0x252d3a,
    0x1a2030,
  );
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  const mkLine = (points: THREE.Vector3[], color: number, opacity = 0.7) => {
    scene.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
      ),
    );
  };

  mkLine(
    [
      new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
      new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
    ],
    0x60a5fa,
    0.8,
  );
  mkLine(
    [
      new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
      new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
    ],
    0xfb923c,
    0.8,
  );
  mkLine(
    [
      new THREE.Vector3(axOriginX, 0, axOriginZ),
      new THREE.Vector3(axOriginX, yMax + 0.8, axOriginZ),
    ],
    0x6ee7b7,
    0.8,
  );

  const mkArrow = (
    dir: THREE.Vector3,
    origin: THREE.Vector3,
    color: number,
  ) => {
    scene.add(
      new THREE.ArrowHelper(dir.normalize(), origin, 0.7, color, 0.35, 0.18),
    );
  };
  mkArrow(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
    0x60a5fa,
  );
  mkArrow(
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
    0xfb923c,
  );
  mkArrow(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(axOriginX, yMax + 0.8, axOriginZ),
    0x6ee7b7,
  );

  cocUniq.forEach((coc, ci) => {
    const x = ci * SPACING + cocOffset;
    const lbl = makeLabel(`CoC ${coc}`, {
      color: "#93c5fd",
      fontSize: "10px",
      fontWeight: "700",
      background: "rgba(30,58,138,0.35)",
      padding: "1px 5px",
    });
    lbl.position.set(x, 0, axOriginZ + 0.9);
    scene.add(lbl);
    mkLine(
      [
        new THREE.Vector3(x, 0, axOriginZ),
        new THREE.Vector3(x, 0, axOriginZ + 0.45),
      ],
      0x3b82f6,
      0.35,
    );
    mkLine(
      [new THREE.Vector3(x, 0, zMin - 0.3), new THREE.Vector3(x, 0, axOriginZ)],
      0x1e3a5f,
      0.18,
    );
  });

  const cocTitle = makeLabel("← Cycles of Concentration (CoC) →", {
    color: "#93c5fd",
    fontSize: "11px",
    fontWeight: "700",
  });
  cocTitle.position.set((xMin + xMax) / 2, 0, axOriginZ + 2.1);
  scene.add(cocTitle);

  tempUniq.forEach((temp, ti) => {
    const z = ti * SPACING + tempOffset;
    const lbl = makeLabel(`${temp}°${tempUnit}`, {
      color: "#fdba74",
      fontSize: "10px",
      fontWeight: "700",
      background: "rgba(120,53,15,0.35)",
      padding: "1px 5px",
    });
    lbl.position.set(axOriginX - 1.0, 0, z);
    scene.add(lbl);
    mkLine(
      [
        new THREE.Vector3(axOriginX, 0, z),
        new THREE.Vector3(axOriginX - 0.45, 0, z),
      ],
      0xf97316,
      0.35,
    );
    mkLine(
      [new THREE.Vector3(axOriginX, 0, z), new THREE.Vector3(xMax + 0.3, 0, z)],
      0x431407,
      0.18,
    );
  });

  const tempTitle = makeLabel("← Temperature →", {
    color: "#fdba74",
    fontSize: "11px",
    fontWeight: "700",
  });
  tempTitle.position.set(axOriginX - 2.0, 0, (zMin + zMax) / 2);
  scene.add(tempTitle);

  const siStep = maxSI <= 1 ? 0.25 : maxSI <= 2 ? 0.5 : 1.0;
  const siTicks: number[] = [];
  for (let v = 0; v <= maxSI + siStep * 0.5; v += siStep)
    siTicks.push(parseFloat(v.toFixed(3)));
  siTicks.forEach((v) => {
    const yPos = (v / maxSI) * BAR_MAX_H;
    const lbl = makeLabel(v.toFixed(2), {
      color: "#86efac",
      fontSize: "10px",
      fontWeight: "600",
      background: "rgba(5,46,22,0.4)",
      padding: "1px 4px",
    });
    lbl.position.set(axOriginX - 0.7, yPos, axOriginZ);
    scene.add(lbl);
    mkLine(
      [
        new THREE.Vector3(axOriginX, yPos, axOriginZ),
        new THREE.Vector3(axOriginX - 0.4, yPos, axOriginZ),
      ],
      0x22c55e,
      0.35,
    );
    if (v > 0)
      mkLine(
        [
          new THREE.Vector3(axOriginX, yPos, axOriginZ),
          new THREE.Vector3(xMax + 0.3, yPos, axOriginZ),
        ],
        0x14532d,
        0.15,
      );
  });

  const siTitle = makeLabel("SI (Saturation Index)", {
    color: "#86efac",
    fontSize: "11px",
    fontWeight: "700",
  });
  siTitle.position.set(axOriginX - 0.7, yMax + 1.2, axOriginZ);
  scene.add(siTitle);

  const nMax = Math.max(nCoC, nTemp);
  const initDist = Math.max(25, nMax * 6.5);

  return { renderer, labelRenderer, scene, camera, barMeshes, initDist };
}

// ─── SceneState ───────────────────────────────────────────────────────────────

interface SceneState {
  renderer: THREE.WebGLRenderer;
  labelRenderer: CSS2DRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  barMeshes: THREE.Mesh[];
  rotY: number;
  rotX: number;
  dist: number;
  isDragging: boolean;
  prevX: number;
  prevY: number;
  hoveredMesh: THREE.Mesh | null;
  selectedMesh: THREE.Mesh | null;
  animId: number;
}

interface Props {
  apiResponse?: SaturationApiResponse;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SaturationDashboard({ apiResponse }: Props) {
  const gridResults: GridResult[] = useMemo(
    () => apiResponse?.data?.grid_results ?? [],
    [apiResponse],
  );
  const meta = apiResponse?.data;
  const saltId = meta?.salt_id ?? "Calcite";
  const dosage = meta?.dosage_ppm ?? 0;
  const cocMin = meta?.coc_min ?? 1;
  const cocMax = meta?.coc_max ?? 8;
  const tempMin = meta?.temp_min ?? 25;
  const tempMax = meta?.temp_max ?? 55;
  const tempUnit = meta?.temp_unit ?? "C";
  const assetName = meta?.asset_info?.name;
  const summary = meta?.summary;
  const saltsOfInterest = meta?.salts_of_interest ?? [saltId];

  const cocUniq = useMemo(
    () =>
      [...new Set(gridResults.map((d) => d._grid_CoC))].sort((a, b) => a - b),
    [gridResults],
  );
  const tempUniq = useMemo(
    () =>
      [...new Set(gridResults.map((d) => d._grid_temp))].sort((a, b) => a - b),
    [gridResults],
  );
  const maxSI = useMemo(
    () =>
      Math.max(
        ...gridResults.map((d) => d.saturation_indices[saltId]?.SI ?? 0),
        0.5,
      ),
    [gridResults, saltId],
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneState | null>(null);
  const [activeData, setActiveData] = useState<GridResult | null>(null);

  const updateCamera = useCallback(() => {
    const s = sceneRef.current;
    if (!s) return;
    s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist;
    s.camera.position.y = Math.sin(s.rotX) * s.dist;
    s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist;
    s.camera.lookAt(0, 2, 0);
  }, []);

  // ── Build scene ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    if (sceneRef.current) {
      cancelAnimationFrame(sceneRef.current.animId);
      sceneRef.current.renderer.dispose();
      const oldEl = sceneRef.current.labelRenderer.domElement;
      if (oldEl.parentNode === wrap) wrap.removeChild(oldEl);
      sceneRef.current = null;
    }
    if (gridResults.length === 0) return;

    const { renderer, labelRenderer, scene, camera, barMeshes, initDist } =
      buildScene(
        canvas,
        wrap,
        gridResults,
        saltId,
        cocUniq,
        tempUniq,
        maxSI,
        tempUnit,
      );

    const state: SceneState = {
      renderer,
      labelRenderer,
      scene,
      camera,
      barMeshes,
      rotY: 0.55,
      rotX: 0.4,
      dist: initDist,
      isDragging: false,
      prevX: 0,
      prevY: 0,
      hoveredMesh: null,
      selectedMesh: null,
      animId: 0,
    };
    sceneRef.current = state;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = Math.max(300, wrap.clientHeight);
      renderer.setSize(w, h, false);
      labelRenderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);
    updateCamera();

    const animate = () => {
      state.animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(state.animId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      const el = labelRenderer.domElement;
      if (el.parentNode === wrap) wrap.removeChild(el);
      sceneRef.current = null;
    };
  }, [gridResults, saltId, maxSI, cocUniq, tempUniq, tempUnit, updateCamera]);

  // ── Interaction ──
  // FIX: All events are on the canvas element only. Raycasting uses
  // canvas.getBoundingClientRect() for pixel-perfect coords. Drag detection
  // uses a movement threshold so small mouse wiggles don't suppress clicks.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const S = () => sceneRef.current;

    const resetColor = (m: THREE.Mesh) =>
      (m.material as THREE.MeshLambertMaterial).color.setHex(
        m.userData.origColor as number,
      );
    const setWhite = (m: THREE.Mesh) =>
      (m.material as THREE.MeshLambertMaterial).color.setHex(0xffffff);

    // Raycast using canvas-relative coordinates (not window-relative)
    const raycast = (clientX: number, clientY: number): THREE.Mesh | null => {
      const s = S();
      if (!s) return null;
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(mouse, s.camera);
      const hits = raycaster.intersectObjects(s.barMeshes, false);
      return hits.length > 0 ? (hits[0].object as THREE.Mesh) : null;
    };

    const onMouseDown = (e: MouseEvent) => {
      const s = S();
      if (!s) return;
      s.isDragging = false;
      s.prevX = e.clientX;
      s.prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const s = S();
      if (!s) return;
      const dx = e.clientX - s.prevX;
      const dy = e.clientY - s.prevY;

      // Start drag only when button held and moved >3px
      if (
        e.buttons === 1 &&
        !s.isDragging &&
        (Math.abs(dx) > 3 || Math.abs(dy) > 3)
      ) {
        s.isDragging = true;
      }

      if (s.isDragging && e.buttons === 1) {
        s.rotY += dx * 0.008;
        s.rotX -= dy * 0.008;
        s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
        s.prevX = e.clientX;
        s.prevY = e.clientY;
        updateCamera();
        canvas.style.cursor = "grabbing";
        return;
      }

      // ── Hover ──
      const hit = raycast(e.clientX, e.clientY);

      // Restore previous hover if it changed and isn't the pinned selection
      if (
        s.hoveredMesh &&
        s.hoveredMesh !== hit &&
        s.hoveredMesh !== s.selectedMesh
      ) {
        resetColor(s.hoveredMesh);
      }

      if (hit) {
        s.hoveredMesh = hit;
        if (hit !== s.selectedMesh) setWhite(hit);
        canvas.style.cursor = "pointer";
        setActiveData(hit.userData.data as GridResult);
      } else {
        s.hoveredMesh = null;
        canvas.style.cursor = "grab";
        setActiveData(
          s.selectedMesh ? (s.selectedMesh.userData.data as GridResult) : null,
        );
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      const s = S();
      if (!s) return;

      if (!s.isDragging) {
        // True click — select bar under cursor
        const hit = raycast(e.clientX, e.clientY);
        if (hit) {
          if (
            s.selectedMesh &&
            s.selectedMesh !== hit &&
            s.selectedMesh !== s.hoveredMesh
          ) {
            resetColor(s.selectedMesh);
          }
          s.selectedMesh = hit;
          setWhite(hit);
          setActiveData(hit.userData.data as GridResult);
        }
      }

      s.isDragging = false;
      canvas.style.cursor = "grab";
    };

    const onMouseLeave = () => {
      const s = S();
      if (!s) return;
      if (s.hoveredMesh && s.hoveredMesh !== s.selectedMesh) {
        resetColor(s.hoveredMesh);
        s.hoveredMesh = null;
      }
      s.isDragging = false;
      canvas.style.cursor = "grab";
    };

    const onWheel = (e: WheelEvent) => {
      const s = S();
      if (!s) return;
      s.dist = Math.max(8, Math.min(120, s.dist + e.deltaY * 0.05));
      updateCamera();
      e.preventDefault();
    };

    const onTouchStart = (e: TouchEvent) => {
      const s = S();
      if (!s) return;
      s.prevX = e.touches[0].clientX;
      s.prevY = e.touches[0].clientY;
      s.isDragging = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const s = S();
      if (!s) return;
      const dx = e.touches[0].clientX - s.prevX;
      const dy = e.touches[0].clientY - s.prevY;
      s.isDragging = true;
      s.rotY += dx * 0.01;
      s.rotX -= dy * 0.01;
      s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
      s.prevX = e.touches[0].clientX;
      s.prevY = e.touches[0].clientY;
      updateCamera();
      e.preventDefault();
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
    };
  }, [updateCamera]);

  // ── Sidebar ──
  const d = activeData;
  const saltSI = d ? (d.saturation_indices[saltId]?.SI ?? null) : null;
  const colorCode = d?.color_code;
  const statusLabel =
    colorCode === "yellow"
      ? "Caution"
      : colorCode === "red"
        ? "Scale Risk"
        : "Protected";
  const statusVar: BadgeVariant =
    colorCode === "yellow" ? "yellow" : colorCode === "red" ? "red" : "green";
  const isEmpty = gridResults.length === 0;

  return (
    <div className="bg-[#0d1117] text-slate-200 font-sans text-[13px] h-screen overflow-hidden flex flex-col select-none">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/10 shrink-0 gap-4 flex-wrap">
        <div>
          <div className="text-sm font-semibold text-slate-100 tracking-wide">
            Saturation Analysis —{" "}
            <span className="text-blue-400">{saltId}</span> · 3D Grid
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap gap-x-3">
            {assetName && (
              <span className="text-slate-400 font-medium">{assetName}</span>
            )}
            <span>
              CoC {cocMin}–{cocMax}
            </span>
            <span>
              Temp {tempMin}–{tempMax} °{tempUnit}
            </span>
            <span>Dosage {dosage} ppm</span>
            {meta?.total_grid_points && (
              <span>{meta.total_grid_points} pts</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {summary && (
            <div className="flex gap-1 mr-3 text-[11px]">
              {summary.green > 0 && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">
                  {summary.green} Protected
                </span>
              )}
              {summary.yellow > 0 && (
                <span className="px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 font-medium">
                  {summary.yellow} Caution
                </span>
              )}
              {summary.red > 0 && (
                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-medium">
                  {summary.red} Scale Risk
                </span>
              )}
            </div>
          )}
          {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
            const dot =
              label === "Caution"
                ? "bg-yellow-400"
                : label === "Scale Risk"
                  ? "bg-red-500"
                  : "bg-emerald-500";
            return (
              <div
                key={label}
                className="flex items-center gap-1.5 text-[11px] text-slate-400"
              >
                <span className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`} />
                {label}
              </div>
            );
          })}
        </div>
      </header>

      {/* Salt chips */}
      {saltsOfInterest.length > 1 && (
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0f1419] border-b border-white/[0.06] overflow-x-auto shrink-0">
          <span className="text-[10px] text-slate-600 shrink-0 mr-1">
            Salts of interest:
          </span>
          {saltsOfInterest.map((s) => (
            <span
              key={s}
              className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${s === saltId ? "border-blue-500/60 text-blue-400 bg-blue-500/10" : "border-white/10 text-slate-500"}`}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* 3D viewport — canvas is the sole interactive element here */}
        <div
          ref={wrapRef}
          className="flex-1 min-w-0 relative bg-[#0d1117] overflow-hidden"
        >
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
              <div className="text-4xl opacity-20">⬛</div>
              <p className="text-sm">
                No grid data — pass an{" "}
                <code className="text-slate-500 bg-white/5 px-1 rounded">
                  apiResponse
                </code>{" "}
                prop.
              </p>
            </div>
          ) : (
            <>
              {/* Canvas is the only element that needs to receive mouse events.
                  The CSS2DRenderer label overlay (appended in buildScene) has
                  pointer-events:none so it is fully transparent to mouse input. */}
              <canvas
                ref={canvasRef}
                className="block w-full h-full cursor-grab"
              />

              {/* Static HUD overlays — also pointer-events:none, above label layer */}
              <div
                className="absolute bottom-3 left-3 flex flex-col gap-1 pointer-events-none"
                style={{ zIndex: 20 }}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <div className="w-5 h-0.5 bg-blue-400 rounded" />
                  <span>X — Cycles of Concentration (CoC)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <div className="w-5 h-0.5 bg-orange-400 rounded" />
                  <span>Z — Temperature (°{tempUnit})</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <div className="w-5 h-0.5 bg-emerald-400 rounded" />
                  <span>Y — Saturation Index (SI)</span>
                </div>
              </div>
              <div
                className="absolute bottom-3 right-3 text-[10px] text-slate-700 pointer-events-none text-right"
                style={{ zIndex: 20 }}
              >
                Drag · Rotate &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click ·
                Pin
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-[265px] shrink-0 bg-[#161b22] border-l border-white/10 overflow-y-auto p-3.5">
          {!d ? (
            <div className="text-center py-6">
              <p className="text-[11px] text-slate-500 mb-1">
                Hover or click a bar
              </p>
              <p className="text-[10px] text-slate-700">
                to inspect grid-point details
              </p>
              <div className="mt-6 space-y-2">
                {[
                  {
                    label: "Protected",
                    sub: "SI within safe band",
                    hex: COLOR_HEX.green,
                    bg: "bg-emerald-500/10",
                  },
                  {
                    label: "Caution",
                    sub: "Mild scaling tendency",
                    hex: COLOR_HEX.yellow,
                    bg: "bg-yellow-400/10",
                  },
                  {
                    label: "Scale Risk",
                    sub: "High CaCO₃ scale risk",
                    hex: COLOR_HEX.red,
                    bg: "bg-red-500/10",
                  },
                ].map(({ label, sub, hex, bg }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded ${bg} text-left`}
                  >
                    <div
                      className="w-3 h-8 rounded-sm shrink-0"
                      style={{ background: hex }}
                    />
                    <div>
                      <div className="text-[11px] font-semibold text-slate-300">
                        {label}
                      </div>
                      <div className="text-[10px] text-slate-600">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/[0.06] pt-4 space-y-2 text-left">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">
                  Axis Legend
                </p>
                {[
                  { color: "#60a5fa", label: "X — Cycles of Concentration" },
                  { color: "#fb923c", label: "Z — Temperature (°C)" },
                  { color: "#6ee7b7", label: "Y — Saturation Index (SI)" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="w-6 h-0.5 shrink-0 rounded-full"
                      style={{ background: color }}
                    />
                    <span className="text-[10px] text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <SSection title="Grid Point">
                <SRow label="CoC" value={String(d._grid_CoC)} />
                <SRow
                  label="Temperature"
                  value={`${d._grid_temp} °${tempUnit}`}
                />
                <SRow label="pH" value={String(d._grid_pH)} />
                <SRow
                  label="Ionic Strength"
                  value={d.ionic_strength.toFixed(5)}
                />
                {d.description_of_solution && (
                  <SRow
                    label="Activity H₂O"
                    value={d.description_of_solution.activity_of_water.toFixed(
                      3,
                    )}
                  />
                )}
                {d.charge_balance_error_pct !== undefined && (
                  <SRow
                    label="Charge Bal. Err"
                    value={`${d.charge_balance_error_pct}%`}
                  />
                )}
              </SSection>

              <SSection title={`${saltId} SI`}>
                <SRow
                  label="Saturation Index"
                  value={saltSI !== null ? saltSI.toFixed(2) : "—"}
                  bold
                />
                <div className="flex justify-between items-center py-[5px]">
                  <span className="text-[11px] text-slate-400">Status</span>
                  <Badge text={statusLabel} variant={statusVar} />
                </div>
              </SSection>

              {saltsOfInterest.length > 1 && (
                <SSection title="Key Salts SI">
                  {saltsOfInterest.map((salt) => {
                    const entry = d.saturation_indices[salt];
                    return (
                      <div
                        key={salt}
                        className="flex justify-between items-center py-[5px] border-b border-white/[0.04] last:border-0"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`text-[11px] truncate ${salt === saltId ? "font-semibold text-slate-200" : "text-slate-400"}`}
                          >
                            {salt}
                          </span>
                          {entry?.chemical_formula && (
                            <span className="text-[9px] text-slate-700 shrink-0">
                              {entry.chemical_formula}
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[11px] font-medium shrink-0 ${entry && entry.SI > 0 ? "text-red-400" : "text-slate-500"}`}
                        >
                          {entry ? entry.SI.toFixed(2) : "—"}
                        </span>
                      </div>
                    );
                  })}
                </SSection>
              )}

              <SSection title="Deposition Indices">
                <SRow
                  label="LSI"
                  value={d.indices.lsi.lsi.toFixed(2)}
                  badge={d.indices.lsi.risk}
                />
                <SRow
                  label="RSI"
                  value={d.indices.ryznar.ri.toFixed(2)}
                  badge={d.indices.ryznar.risk}
                />
                <SRow
                  label="PSI"
                  value={d.indices.puckorius.index.toFixed(2)}
                  badge={d.indices.puckorius.risk}
                />
                <SRow
                  label="Larson-Skold"
                  value={d.indices.larson_skold.index.toFixed(3)}
                  badge={`${d.indices.larson_skold.risk_level} Risk`}
                />
                <SRow
                  label="Stiff-Davis"
                  value={d.indices.stiff_davis.index.toFixed(3)}
                  badge={d.indices.stiff_davis.risk}
                />
                <SRow
                  label="CCPP (ppm)"
                  value={String(d.indices.ccpp.ccpp_ppm)}
                  badge={d.indices.ccpp.risk}
                />
              </SSection>

              <SSection title="Corrosion Rates">
                {(
                  [
                    ["Mild Steel", d.corrosion.mild_steel],
                    ["Copper", d.corrosion.copper],
                    ["Admiralty Brass", d.corrosion.admiralty_brass],
                  ] as [string, CorrosionMetal][]
                ).map(([label, metal]) => (
                  <div
                    key={label}
                    className="py-[5px] border-b border-white/[0.04] last:border-0"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-slate-400">
                        {label}
                      </span>
                      <Badge text={metal.rating} />
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-[10px] text-slate-700">
                        Treated / Base
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {metal.cr_mpy.toFixed(2)} /{" "}
                        {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
                        {metal.total_inhibition_percent !== undefined && (
                          <span className="text-emerald-500/70 ml-1.5">
                            −{metal.total_inhibition_percent}%
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </SSection>

              <SSection title="All Minerals SI">
                {Object.entries(d.saturation_indices)
                  .sort((a, b) => b[1].SI - a[1].SI)
                  .map(([key, val]) => {
                    const isTarget = key === saltId;
                    const isInterest = saltsOfInterest.includes(key);
                    return (
                      <div
                        key={key}
                        className={`flex justify-between items-center py-[4px] border-b border-white/[0.03] last:border-0 ${isTarget ? "bg-blue-500/5 -mx-1 px-1 rounded" : ""}`}
                      >
                        <div className="flex items-center gap-1 min-w-0">
                          <span
                            className={`text-[11px] truncate ${isTarget ? "font-bold text-slate-100" : isInterest ? "font-medium text-slate-300" : "text-slate-500"}`}
                          >
                            {key}
                          </span>
                          {val.chemical_formula && (
                            <span className="text-[9px] text-slate-700 shrink-0 hidden sm:inline">
                              {val.chemical_formula}
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[11px] shrink-0 font-medium ${val.SI > 0 ? "text-red-400" : "text-slate-600"} ${isTarget ? "font-bold" : ""}`}
                        >
                          {val.SI.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
              </SSection>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
