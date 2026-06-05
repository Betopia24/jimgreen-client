// "use client";

// import { useSaltAnalysisMutation } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
// import {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
//   ReactNode,
//   MouseEvent as RMouseEvent,
// } from "react";
// import * as THREE from "three";
// import {
//   CSS2DRenderer,
//   CSS2DObject,
// } from "three/examples/jsm/renderers/CSS2DRenderer.js";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface SIEntry {
//   SI: number;
//   SR?: number;
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
//   index: number | null;
//   interpretation?: string;
//   risk_level: string;
//   components?: Record<string, number>;
// }

// export interface StiffDavisIndex {
//   index: number | null;
//   interpretation?: string;
//   risk?: string;
//   components?: Record<string, number>;
// }

// export interface CcppIndex {
//   ccpp_ppm: number | null;
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
//   note?: string; // ← NEW: e.g. "Admiralty Brass rate = Copper × 0.85"
// }

// // ── NEW: top-level corrosion_rate shape from API ──────────────────────────────
// export interface CorrosionRate {
//   mild_steel?: CorrosionMetal;
//   copper?: CorrosionMetal;
//   admiralty_brass?: CorrosionMetal;
//   do_ppm?: number; // dissolved oxygen ppm lives here in the new shape
//   temp_c?: number; // temperature (°C) inside corrosion_rate block
//   [key: string]: CorrosionMetal | number | undefined;
// }

// /** Legacy shape: metals keyed directly on corrosion */
// export interface Corrosion {
//   mild_steel?: CorrosionMetal;
//   copper?: CorrosionMetal;
//   admiralty_brass?: CorrosionMetal;
//   [key: string]: CorrosionMetal | undefined;
// }

// /** bar_data from the new grid_results shape */
// export interface BarData {
//   color_hex: string;
//   opacity: number;
//   sr_color: string;
//   sr_color_hex: string;
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
//   /** Normalised corrosion metals (no do_ppm / temp_c) */
//   corrosion: Corrosion;
//   /** Dissolved O₂ ppm — may come from corrosion_rate.do_ppm or top-level */
//   dissolved_oxygen_ppm?: number;
//   /** Temperature °C from corrosion block */
//   corrosion_temp_c?: number;
//   description_of_solution?: { pH?: number; activity_of_water?: number } | null;
//   calculations?: Record<string, unknown>;
//   bar_data?: BarData;
//   /** Raw corrosion_rate block preserved for reference */
//   corrosion_rate?: CorrosionRate;
// }

// export interface SaturationApiResponseFlat {
//   success?: boolean;
//   run_id?: string;
//   salt_id?: string | null;
//   salts_of_interest?: string[];
//   dosage_ppm?: number;
//   coc_min?: number;
//   coc_max?: number;
//   temp_min?: number;
//   temp_max?: number;
//   temp_unit?: string;
//   ph_mode?: string;
//   total_grid_points?: number;
//   grid_results?: GridResult[];
//   summary?: { green: number; yellow: number; red: number; error: number };
//   base_water_parameters?: Record<string, { value: number; unit: string }>;
//   asset_info?: { name?: string; type?: string };
//   data?: {
//     aiResponse?: Partial<SaturationApiResponseFlat>;
//     salt_id?: string | null;
//     salts_of_interest?: string[];
//     dosage_ppm?: number;
//     coc_min?: number;
//     coc_max?: number;
//     temp_min?: number;
//     temp_max?: number;
//     temp_unit?: string;
//     ph_mode?: string;
//     total_grid_points?: number;
//     grid_results?: GridResult[];
//     summary?: { green: number; yellow: number; red: number; error: number };
//     base_water_parameters?: Record<string, { value: number; unit: string }>;
//     asset_info?: { name?: string; type?: string };
//     available_salts?: string[];
//     chart_data?: {
//       salt_id?: string | null;
//       temp_unit?: string;
//       available_salts?: string[];
//       total_points?: number;
//       points?: any[];
//     };
//     graph_data?: {
//       type?: string;
//       salt_id?: string | null;
//       temp_unit?: string;
//       total_points?: number;
//       available_salts?: string[];
//       points?: any[];
//       axes?: {
//         x?: { label?: string; values?: number[] };
//         y?: { label?: string; unit?: string };
//         z?: { label?: string; values?: number[] };
//       };
//     };
//     run_id?: string;
//   };
// }

// interface RawGridPoint extends Omit<GridResult, "indices" | "corrosion"> {
//   indices?: Indices;
//   corrosion?: Corrosion;
//   /** NEW shape: corrosion data lives under corrosion_rate */
//   corrosion_rate?: CorrosionRate;
//   calculations?: {
//     lsi?: LsiIndex;
//     ryznar?: RyznarIndex;
//     puckorius?: PuckoriusIndex;
//     larson_skold?: LarsonSkoldIndex;
//     stiff_davis?: StiffDavisIndex;
//     ccpp?: CcppIndex;
//     mild_steel_corrosion?: CorrosionMetal;
//     copper_corrosion?: CorrosionMetal;
//     admiralty_brass_corrosion?: CorrosionMetal;
//   };
//   bar_data?: BarData;
// }

// interface ResolvedMeta {
//   saltId: string | null;
//   saltsOfInterest: string[];
//   dosagePpm: number;
//   cocMin: number;
//   cocMax: number;
//   tempMin: number;
//   tempMax: number;
//   tempUnit: string;
//   phMode?: string;
//   totalGridPoints?: number;
//   gridResults: GridResult[];
//   summary?: { green: number; yellow: number; red: number; error: number };
//   baseWaterParameters?: Record<string, { value: number; unit: string }>;
//   assetInfo?: { name?: string; type?: string };
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const BAR_W = 1.55;
// const SPACING = 2.4;
// const BAR_MAX_H = 8.0;

// const SIDEBAR_MIN = 240;
// const SIDEBAR_MAX = 560;
// const SIDEBAR_DEFAULT = 300;

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// /** Convert a CSS hex color string "#rrggbb" to a THREE.js number */
// function hexStringToThreeNum(hex: string): number {
//   const clean = hex.replace("#", "");
//   return parseInt(clean, 16);
// }

// /** Darken a hex color by a factor (0 = black, 1 = original) */
// function darkenHex(hex: string, factor: number): number {
//   const num = hexStringToThreeNum(hex);
//   const r = Math.round(((num >> 16) & 0xff) * factor);
//   const g = Math.round(((num >> 8) & 0xff) * factor);
//   const b = Math.round((num & 0xff) * factor);
//   return (r << 16) | (g << 8) | b;
// }

// /** Lighten a hex by blending toward white */
// function lightenHex(hex: string, factor: number): number {
//   const num = hexStringToThreeNum(hex);
//   const r = Math.round(
//     ((num >> 16) & 0xff) + (255 - ((num >> 16) & 0xff)) * factor,
//   );
//   const g = Math.round(
//     ((num >> 8) & 0xff) + (255 - ((num >> 8) & 0xff)) * factor,
//   );
//   const b = Math.round((num & 0xff) + (255 - (num & 0xff)) * factor);
//   return (r << 16) | (g << 8) | b;
// }

// /**
//  * Compute the final THREE color for a bar using bar_data.
//  * opacity 1.0 = full color (darkest), low opacity = lighter tint.
//  */
// function barColorFromBarData(barData: BarData): number {
//   const { color_hex, opacity } = barData;
//   const t = Math.max(0, Math.min(1, opacity));
//   if (t > 0.5) {
//     const darkFactor = 0.5 + (t - 0.5) * 1.0;
//     return darkenHex(color_hex, darkFactor);
//   } else {
//     const lightFactor = (0.5 - t) * 0.65;
//     return lightenHex(color_hex, lightFactor);
//   }
// }

// // ─── Corrosion normaliser ─────────────────────────────────────────────────────

// /**
//  * Given a raw grid point (either old or new shape), extract:
//  *   - a clean `corrosion` map  (only CorrosionMetal objects, no scalars)
//  *   - dissolved_oxygen_ppm     (from corrosion_rate.do_ppm or top-level)
//  *   - corrosion_temp_c         (from corrosion_rate.temp_c)
//  */
// function normaliseCorrosion(raw: RawGridPoint): {
//   corrosion: Corrosion;
//   dissolved_oxygen_ppm?: number;
//   corrosion_temp_c?: number;
// } {
//   // ── NEW shape: corrosion_rate block ──────────────────────────────────────
//   if (raw.corrosion_rate && typeof raw.corrosion_rate === "object") {
//     const cr = raw.corrosion_rate;
//     const metals: Corrosion = {};

//     // Pull scalar extras first
//     const do_ppm = typeof cr.do_ppm === "number" ? cr.do_ppm : undefined;
//     const corrosion_temp_c =
//       typeof cr.temp_c === "number" ? cr.temp_c : undefined;

//     // Non-scalar keys are metal objects
//     const SCALAR_KEYS = new Set(["do_ppm", "temp_c"]);
//     for (const key of Object.keys(cr)) {
//       if (SCALAR_KEYS.has(key)) continue;
//       const val = cr[key];
//       if (val && typeof val === "object" && "cr_mpy" in val) {
//         metals[key] = val as CorrosionMetal;
//       }
//     }

//     return {
//       corrosion: metals,
//       dissolved_oxygen_ppm: do_ppm,
//       corrosion_temp_c,
//     };
//   }

//   // ── LEGACY shape: corrosion already on the point ─────────────────────────
//   if (raw.corrosion && typeof raw.corrosion === "object") {
//     return {
//       corrosion: raw.corrosion,
//       dissolved_oxygen_ppm: raw.dissolved_oxygen_ppm,
//       corrosion_temp_c: raw.corrosion_temp_c,
//     };
//   }

//   // ── calculations shape ────────────────────────────────────────────────────
//   const calc = raw.calculations ?? {};
//   const metals: Corrosion = {};
//   if ((calc as any).mild_steel_corrosion)
//     metals.mild_steel = (calc as any).mild_steel_corrosion;
//   if ((calc as any).copper_corrosion)
//     metals.copper = (calc as any).copper_corrosion;
//   if ((calc as any).admiralty_brass_corrosion)
//     metals.admiralty_brass = (calc as any).admiralty_brass_corrosion;

//   return {
//     corrosion: metals,
//     dissolved_oxygen_ppm: raw.dissolved_oxygen_ppm,
//     corrosion_temp_c: raw.corrosion_temp_c,
//   };
// }

// // ─── Shared point mapper ───────────────────────────────────────────────────────

// function mapPointToGridResult(p: any, saltId: string | null): GridResult {
//   const saturation_indices: Record<string, SIEntry> = {};
//   for (const [key, val] of Object.entries(p.all_si ?? {})) {
//     const v = val as any;
//     saturation_indices[key] = {
//       SI: v.SI ?? 0,
//       SR: v.SR,
//       log_IAP: v.log_IAP,
//       log_K: v.log_K,
//       chemical_formula: v.chemical_formula,
//     };
//   }

//   const srValue: number = saltId
//     ? (saturation_indices[saltId]?.SR ??
//       saturation_indices[saltId]?.SI ??
//       p.si ??
//       0)
//     : (p.sr ?? p.si ?? 0);

//   const colorRaw: string = p.color ?? "green";
//   const color_code = (
//     ["green", "yellow", "red"].includes(colorRaw) ? colorRaw : "red"
//   ) as "green" | "yellow" | "red";

//   const lsiRisk =
//     color_code === "green"
//       ? "Low Scale"
//       : color_code === "yellow"
//         ? "Moderate"
//         : "High Scale";

//   const bar_data: BarData = {
//     color_hex:
//       p.color_hex ??
//       (color_code === "green"
//         ? "#2ECC71"
//         : color_code === "red"
//           ? "#E74C3C"
//           : "#F1C40F"),
//     opacity: p.opacity ?? 1,
//     sr_color: color_code,
//     sr_color_hex: p.color_hex ?? "#2ECC71",
//   };

//   // Run through normaliseCorrosion for this raw point too
//   const { corrosion, dissolved_oxygen_ppm, corrosion_temp_c } =
//     normaliseCorrosion(p as RawGridPoint);

//   return {
//     _grid_CoC: p.coc ?? p.CoC ?? 0,
//     _grid_temp: p.temperature ?? p.temp ?? 0,
//     _grid_pH: p.ph ?? p.pH ?? 0,
//     ionic_strength: p.ionic_strength ?? 0,
//     charge_balance_error_pct: p.charge_balance_error_pct,
//     saturation_indices,
//     color_code,
//     bar_data,
//     dissolved_oxygen_ppm: dissolved_oxygen_ppm ?? p.dissolved_oxygen_ppm,
//     corrosion_temp_c,
//     description_of_solution: p.description_of_solution
//       ? {
//           pH: p.description_of_solution.pH,
//           activity_of_water: p.description_of_solution.activity_of_water,
//         }
//       : null,
//     indices: {
//       lsi: { lsi: srValue, risk: lsiRisk, pHs: 0 },
//       ryznar: { ri: 0, risk: "N/A", pHs: 0 },
//       puckorius: { index: 0, risk: "N/A" },
//       larson_skold: { index: null, risk_level: "N/A" },
//       stiff_davis: { index: null, risk: "N/A", interpretation: "N/A" },
//       ccpp: { ccpp_ppm: null, risk: "N/A" },
//     },
//     corrosion,
//     corrosion_rate: p.corrosion_rate,
//   };
// }

// // ─── Raw point → GridResult normaliser ────────────────────────────────────────

// function normaliseRawPoint(d: RawGridPoint): GridResult {
//   // Already fully typed?
//   if (d.indices && d.corrosion) return d as GridResult;

//   const calc = (d as any).calculations ?? {};
//   const { corrosion, dissolved_oxygen_ppm, corrosion_temp_c } =
//     normaliseCorrosion(d);

//   return {
//     ...(d as any),
//     dissolved_oxygen_ppm:
//       dissolved_oxygen_ppm ?? (d as any).dissolved_oxygen_ppm,
//     corrosion_temp_c,
//     indices: d.indices ?? {
//       lsi: calc.lsi ?? { lsi: 0, risk: "Unknown", pHs: 0 },
//       ryznar: calc.ryznar ?? { ri: 0, risk: "Unknown", pHs: 0 },
//       puckorius: calc.puckorius ?? { index: 0, risk: "Unknown" },
//       larson_skold: calc.larson_skold ?? {
//         index: null,
//         risk_level: "Unknown",
//       },
//       stiff_davis: calc.stiff_davis ?? {
//         index: null,
//         risk: "",
//         interpretation: "",
//       },
//       ccpp: calc.ccpp ?? { ccpp_ppm: null, risk: "Unknown" },
//     },
//     corrosion,
//   };
// }

// // ─── API shape resolver ───────────────────────────────────────────────────────

// function resolveMeta(
//   apiResponse: SaturationApiResponseFlat | undefined,
// ): ResolvedMeta | null {
//   if (!apiResponse) return null;

//   const responseAny = apiResponse as any;

//   // ── SHAPE 1: New top-level grid_results with bar_data ─────────────────────
//   const topLevelGridResults: RawGridPoint[] =
//     responseAny?.data?.grid_results ?? responseAny?.grid_results ?? [];

//   if (topLevelGridResults.length > 0 && topLevelGridResults[0]?.bar_data) {
//     const tempUnit = (
//       responseAny?.data?.temp_unit ??
//       responseAny?.temp_unit ??
//       "F"
//     ).replace("°", "");
//     const saltId: string | null =
//       responseAny?.data?.salt_id ?? responseAny?.salt_id ?? null;

//     const gridResults: GridResult[] =
//       topLevelGridResults.map(normaliseRawPoint);

//     const summary = responseAny?.data?.summary ?? responseAny?.summary;
//     const availableSalts: string[] =
//       responseAny?.data?.available_salts ?? responseAny?.available_salts ?? [];
//     const cocVals = gridResults.map((d) => d._grid_CoC);
//     const tempVals = gridResults.map((d) => d._grid_temp);

//     return {
//       saltId,
//       saltsOfInterest: availableSalts,
//       dosagePpm: responseAny?.data?.dosage_ppm ?? responseAny?.dosage_ppm ?? 0,
//       cocMin: cocVals.length ? Math.min(...cocVals) : 0,
//       cocMax: cocVals.length ? Math.max(...cocVals) : 0,
//       tempMin: tempVals.length ? Math.min(...tempVals) : 0,
//       tempMax: tempVals.length ? Math.max(...tempVals) : 0,
//       tempUnit,
//       totalGridPoints: gridResults.length,
//       gridResults,
//       summary,
//     };
//   }

//   // ── SHAPE 2: data.graph_data.axes ──────────────────────────────────────────
//   const graphData = responseAny?.data?.graph_data ?? responseAny?.graph_data;

//   if (graphData?.axes) {
//     const tempUnit = graphData.temp_unit?.replace("°", "") ?? "C";
//     const saltId: string | null = graphData.salt_id ?? null;
//     const cocValues: number[] = graphData.axes?.x?.values ?? [];
//     const tempValues: number[] = graphData.axes?.z?.values ?? [];
//     const rawPoints: any[] =
//       graphData.points ?? responseAny?.data?.points ?? [];

//     let gridResults: GridResult[];
//     if (rawPoints.length > 0) {
//       gridResults = rawPoints.map((p: any) => mapPointToGridResult(p, saltId));
//     } else {
//       gridResults = cocValues.flatMap((coc) =>
//         tempValues.map(
//           (temp): GridResult => ({
//             _grid_CoC: coc,
//             _grid_temp: temp,
//             _grid_pH: 7,
//             ionic_strength: 0,
//             saturation_indices: {},
//             color_code: "green",
//             bar_data: {
//               color_hex: "#2ECC71",
//               opacity: 1,
//               sr_color: "green",
//               sr_color_hex: "#2ECC71",
//             },
//             indices: {
//               lsi: { lsi: 0, risk: "N/A", pHs: 0 },
//               ryznar: { ri: 0, risk: "N/A", pHs: 0 },
//               puckorius: { index: 0, risk: "N/A" },
//               larson_skold: { index: null, risk_level: "N/A" },
//               stiff_davis: { index: null, risk: "N/A", interpretation: "N/A" },
//               ccpp: { ccpp_ppm: null, risk: "N/A" },
//             },
//             corrosion: {},
//           }),
//         ),
//       );
//     }

//     const summary = responseAny?.data?.summary;
//     const cocVals = gridResults.map((d) => d._grid_CoC);
//     const tempVals = gridResults.map((d) => d._grid_temp);

//     return {
//       saltId,
//       saltsOfInterest: graphData.available_salts ?? [],
//       dosagePpm: 0,
//       cocMin: cocVals.length ? Math.min(...cocVals) : 0,
//       cocMax: cocVals.length ? Math.max(...cocVals) : 0,
//       tempMin: tempVals.length ? Math.min(...tempVals) : 0,
//       tempMax: tempVals.length ? Math.max(...tempVals) : 0,
//       tempUnit,
//       totalGridPoints: graphData.total_points ?? gridResults.length,
//       gridResults,
//       summary,
//     };
//   }

//   // ── SHAPE 3: data.chart_data.points ───────────────────────────────────────
//   const chartData = responseAny?.data?.chart_data;
//   if (chartData?.points) {
//     const tempUnit = chartData.temp_unit?.replace("°", "") ?? "C";
//     const saltId: string | null = chartData.salt_id ?? null;

//     const gridResults: GridResult[] = chartData.points.map((p: any) =>
//       mapPointToGridResult(p, saltId),
//     );

//     const summary = responseAny?.data?.summary;
//     const availableSalts: string[] = chartData.available_salts ?? [];
//     const cocVals = gridResults.map((d) => d._grid_CoC);
//     const tempVals = gridResults.map((d) => d._grid_temp);

//     return {
//       saltId,
//       saltsOfInterest: availableSalts,
//       dosagePpm: 0,
//       cocMin: Math.min(...cocVals),
//       cocMax: Math.max(...cocVals),
//       tempMin: Math.min(...tempVals),
//       tempMax: Math.max(...tempVals),
//       tempUnit,
//       totalGridPoints: chartData.total_points,
//       gridResults,
//       summary,
//     };
//   }

//   // ── SHAPE 4: flat / aiResponse ────────────────────────────────────────────
//   type SrcShape = Partial<SaturationApiResponseFlat> & {
//     grid_results?: RawGridPoint[];
//   };

//   let src: SrcShape = apiResponse as SrcShape;

//   if (src.data && typeof src.data === "object") {
//     if (src.data.aiResponse && typeof src.data.aiResponse === "object") {
//       src = src.data.aiResponse as SrcShape;
//     } else {
//       src = src.data as SrcShape;
//     }
//   }

//   const rawGrid: RawGridPoint[] = (src.grid_results as RawGridPoint[]) ?? [];
//   const gridResults: GridResult[] = rawGrid.map(normaliseRawPoint);

//   return {
//     saltId: (src.salt_id as string | null) ?? null,
//     saltsOfInterest: (src.salts_of_interest as string[]) ?? [],
//     dosagePpm: (src.dosage_ppm as number) ?? 0,
//     cocMin: (src.coc_min as number) ?? 0,
//     cocMax: (src.coc_max as number) ?? 0,
//     tempMin: (src.temp_min as number) ?? 0,
//     tempMax: (src.temp_max as number) ?? 0,
//     tempUnit: (src.temp_unit as string) ?? "C",
//     phMode: src.ph_mode as string | undefined,
//     totalGridPoints: src.total_grid_points as number | undefined,
//     gridResults,
//     summary: src.summary as ResolvedMeta["summary"],
//     baseWaterParameters:
//       src.base_water_parameters as ResolvedMeta["baseWaterParameters"],
//     assetInfo: src.asset_info as ResolvedMeta["assetInfo"],
//   };
// }

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
//   yellow: "bg-amber-50   text-amber-700   border border-amber-200",
//   red: "bg-red-50     text-red-700     border border-red-200",
//   green: "bg-gray-100   text-gray-600    border border-gray-300",
//   info: "bg-blue-50    text-blue-700    border border-blue-200",
//   warn: "bg-orange-50  text-orange-700  border border-orange-200",
// };

// function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
//   const v: BadgeVariant = variant ?? getBadgeVariant(text);
//   return (
//     <span
//       className={`text-[12px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap ${badgeCls[v]}`}
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
//     <div className="flex justify-between items-center py-[6px] border-b border-slate-100 gap-2 last:border-0">
//       <span
//         className={`text-[13px] shrink-0 ${bold ? "font-semibold text-slate-800" : "text-slate-500"}`}
//       >
//         {label}
//       </span>
//       <span
//         className={`text-[13px] flex items-center gap-1 flex-wrap justify-end ${bold ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}
//       >
//         {value}
//         {badge && <Badge text={badge} />}
//       </span>
//     </div>
//   );
// }

// function SSection({ title, children }: { title: string; children: ReactNode }) {
//   return (
//     <div className="mb-5">
//       <div className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-2 pb-1 border-b border-slate-200">
//         {title}
//       </div>
//       {children}
//     </div>
//   );
// }

// // ─── CSS2D label helper ───────────────────────────────────────────────────────

// interface LabelOpts {
//   color?: string;
//   fontSize?: string;
//   fontWeight?: string;
//   background?: string;
//   padding?: string;
// }

// function makeLabel(text: string, opts: LabelOpts = {}): CSS2DObject {
//   const div = document.createElement("div");
//   div.textContent = text;
//   div.style.color = opts.color ?? "rgba(30,41,59,0.85)";
//   div.style.fontSize = opts.fontSize ?? "10px";
//   div.style.fontWeight = opts.fontWeight ?? "500";
//   div.style.fontFamily = "ui-monospace,'Cascadia Code','Fira Code',monospace";
//   div.style.whiteSpace = "nowrap";
//   div.style.pointerEvents = "none";
//   div.style.userSelect = "none";
//   div.style.letterSpacing = "0.03em";
//   div.style.lineHeight = "1";
//   if (opts.background) {
//     div.style.background = opts.background;
//     div.style.padding = opts.padding ?? "2px 5px";
//     div.style.borderRadius = "3px";
//     div.style.boxShadow = "0 1px 3px rgba(0,0,0,0.10)";
//   }
//   return new CSS2DObject(div);
// }

// // ─── Build scene ──────────────────────────────────────────────────────────────

// interface BuiltScene {
//   renderer: THREE.WebGLRenderer;
//   labelRenderer: CSS2DRenderer;
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   barMeshes: THREE.Mesh[];
//   initDist: number;
//   initLookAtY: number;
// }

// function buildScene(
//   canvas: HTMLCanvasElement,
//   wrap: HTMLDivElement,
//   gridResults: GridResult[],
//   activeSaltId: string | null,
//   cocUniq: number[],
//   tempUniq: number[],
//   maxSR: number,
//   tempUnit: string,
// ): BuiltScene {
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     antialias: true,
//     alpha: false,
//   });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setClearColor(0xf8fafc, 1);

//   const labelRenderer = new CSS2DRenderer();
//   const labelEl = labelRenderer.domElement;
//   labelEl.style.position = "absolute";
//   labelEl.style.top = "0";
//   labelEl.style.left = "0";
//   labelEl.style.width = "100%";
//   labelEl.style.height = "100%";
//   labelEl.style.pointerEvents = "none";
//   labelEl.style.overflow = "hidden";
//   labelEl.style.zIndex = "10";
//   wrap.appendChild(labelEl);

//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xf8fafc);

//   const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2000);

//   scene.add(new THREE.AmbientLight(0xffffff, 0.85));
//   const sun = new THREE.DirectionalLight(0xffffff, 0.9);
//   sun.position.set(15, 30, 15);
//   scene.add(sun);
//   const fill = new THREE.DirectionalLight(0xdbeafe, 0.35);
//   fill.position.set(-15, 8, -10);
//   scene.add(fill);
//   const bounce = new THREE.DirectionalLight(0xfef9c3, 0.2);
//   bounce.position.set(0, -10, 0);
//   scene.add(bounce);

//   const nCoC = cocUniq.length;
//   const nTemp = tempUniq.length;
//   const cocOffset = -((nCoC - 1) * SPACING) / 2;
//   const tempOffset = -((nTemp - 1) * SPACING) / 2;
//   const xMin = cocOffset - SPACING / 2;
//   const xMax = (nCoC - 1) * SPACING + cocOffset + SPACING / 2;
//   const zMin = tempOffset - SPACING / 2;
//   const zMax = (nTemp - 1) * SPACING + tempOffset + SPACING / 2;
//   const axOriginX = xMin - 0.3;
//   const axOriginY = 0;
//   const axOriginZ = zMax + 0.3;

//   const barMeshes: THREE.Mesh[] = [];

//   gridResults.forEach((d: GridResult) => {
//     const srValue: number = activeSaltId
//       ? (d.saturation_indices[activeSaltId]?.SR ?? 0)
//       : Math.max(
//           0,
//           ...Object.values(d.saturation_indices).map((e) => e.SR ?? 0),
//         );

//     const displayVal = Math.abs(srValue);
//     const h = Math.min(
//       BAR_MAX_H,
//       Math.max(0.15, (displayVal / maxSR) * BAR_MAX_H),
//     );

//     const ci = cocUniq.indexOf(d._grid_CoC);
//     const ti = tempUniq.indexOf(d._grid_temp);
//     const x = ci * SPACING + cocOffset;
//     const z = ti * SPACING + tempOffset;

//     let clr: number;
//     if (d.bar_data) {
//       clr = barColorFromBarData(d.bar_data);
//     } else {
//       const t = Math.min(1, maxSR > 0 ? displayVal / maxSR : 0);
//       if (d.color_code === "green") {
//         clr =
//           t > 0.5
//             ? lightenHex("#064e3b", 1 - (t - 0.5) * 1.2)
//             : lightenHex("#d1fae5", t * 0.5);
//       } else if (d.color_code === "yellow") {
//         clr =
//           t > 0.5
//             ? lightenHex("#92400e", 1 - (t - 0.5) * 1.2)
//             : lightenHex("#fef9c3", t * 0.5);
//       } else {
//         clr =
//           t > 0.5
//             ? lightenHex("#7f1d1d", 1 - (t - 0.5) * 1.2)
//             : lightenHex("#fee2e2", t * 0.5);
//       }
//     }

//     const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
//     const mat = new THREE.MeshPhongMaterial({ color: clr, shininess: 60 });
//     const mesh = new THREE.Mesh(geo, mat);
//     mesh.position.set(x, h / 2, z);
//     mesh.userData = { data: d, origColor: clr, h };
//     scene.add(mesh);
//     barMeshes.push(mesh);

//     mesh.add(
//       new THREE.LineSegments(
//         new THREE.EdgesGeometry(geo),
//         new THREE.LineBasicMaterial({
//           color: 0x000000,
//           transparent: true,
//           opacity: 0.08,
//         }),
//       ),
//     );
//   });

//   const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
//   const gridHelper = new THREE.GridHelper(
//     gridW + 4,
//     (nCoC + nTemp) * 3,
//     0x64748b,
//     0x94a3b8,
//   );
//   gridHelper.position.y = -0.01;
//   scene.add(gridHelper);

//   const mkLine = (pts: THREE.Vector3[], color: number, opacity = 0.7): void => {
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints(pts),
//         new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
//       ),
//     );
//   };

//   const AX_COC = 0x2563eb;
//   const AX_TEMP = 0xea580c;
//   const AX_SR = 0x059669;
//   const yAxisTop = BAR_MAX_H + 2.0;

//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//       new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     ],
//     AX_COC,
//     0.9,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//     ],
//     AX_TEMP,
//     0.9,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, 0, axOriginZ),
//       new THREE.Vector3(axOriginX, yAxisTop, axOriginZ),
//     ],
//     AX_SR,
//     0.9,
//   );

//   const mkArrow = (
//     dir: THREE.Vector3,
//     origin: THREE.Vector3,
//     color: number,
//   ): void => {
//     scene.add(
//       new THREE.ArrowHelper(dir.normalize(), origin, 0.7, color, 0.35, 0.18),
//     );
//   };
//   mkArrow(
//     new THREE.Vector3(1, 0, 0),
//     new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     AX_COC,
//   );
//   mkArrow(
//     new THREE.Vector3(0, 0, -1),
//     new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//     AX_TEMP,
//   );
//   mkArrow(
//     new THREE.Vector3(0, 1, 0),
//     new THREE.Vector3(axOriginX, yAxisTop, axOriginZ),
//     AX_SR,
//   );

//   cocUniq.forEach((coc, ci) => {
//     const x = ci * SPACING + cocOffset;
//     const lbl = makeLabel(`CoC ${coc}`, {
//       color: "#1d4ed8",
//       fontSize: "10px",
//       fontWeight: "700",
//       background: "rgba(219,234,254,0.80)",
//       padding: "1px 5px",
//     });
//     lbl.position.set(x, 0, axOriginZ + 0.9);
//     scene.add(lbl);
//     mkLine(
//       [
//         new THREE.Vector3(x, 0, axOriginZ),
//         new THREE.Vector3(x, 0, axOriginZ + 0.45),
//       ],
//       AX_COC,
//       0.4,
//     );
//     mkLine(
//       [new THREE.Vector3(x, 0, zMin - 0.3), new THREE.Vector3(x, 0, axOriginZ)],
//       0x93c5fd,
//       0.15,
//     );
//   });

//   const cocTitle = makeLabel("← Cycles of Concentration (CoC) →", {
//     color: "#1d4ed8",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   cocTitle.position.set((xMin + xMax) / 2, 0, axOriginZ + 2.1);
//   scene.add(cocTitle);

//   tempUniq.forEach((temp, ti) => {
//     const z = ti * SPACING + tempOffset;
//     const lbl = makeLabel(`${temp}°${tempUnit}`, {
//       color: "#c2410c",
//       fontSize: "10px",
//       fontWeight: "700",
//       background: "rgba(254,215,170,0.80)",
//       padding: "1px 5px",
//     });
//     lbl.position.set(axOriginX - 1.0, 0, z);
//     scene.add(lbl);
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, 0, z),
//         new THREE.Vector3(axOriginX - 0.45, 0, z),
//       ],
//       AX_TEMP,
//       0.4,
//     );
//     mkLine(
//       [new THREE.Vector3(axOriginX, 0, z), new THREE.Vector3(xMax + 0.3, 0, z)],
//       0xfed7aa,
//       0.15,
//     );
//   });

//   const tempTitle = makeLabel("← Temperature →", {
//     color: "#c2410c",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   tempTitle.position.set(axOriginX - 2.0, 0, (zMin + zMax) / 2);
//   scene.add(tempTitle);

//   const safMaxSR = maxSR > 0 ? maxSR : 1;
//   const srStep =
//     safMaxSR <= 1
//       ? 0.25
//       : safMaxSR <= 2
//         ? 0.5
//         : safMaxSR <= 5
//           ? 1.0
//           : safMaxSR <= 20
//             ? 5
//             : 10;
//   const srTicks: number[] = [];
//   const srTickLimit = safMaxSR + srStep * 0.5;
//   for (let v = 0; v <= srTickLimit && srTicks.length < 50; v += srStep)
//     srTicks.push(parseFloat(v.toFixed(3)));

//   srTicks?.forEach((v) => {
//     const yPos = (v / maxSR) * BAR_MAX_H;
//     const lbl = makeLabel(v.toFixed(2), {
//       color: "#065f46",
//       fontSize: "10px",
//       fontWeight: "600",
//       background: "rgba(209,250,229,0.80)",
//       padding: "1px 4px",
//     });
//     lbl.position.set(axOriginX - 0.7, yPos, axOriginZ);
//     scene.add(lbl);
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, yPos, axOriginZ),
//         new THREE.Vector3(axOriginX - 0.4, yPos, axOriginZ),
//       ],
//       AX_SR,
//       0.4,
//     );
//     if (v > 0)
//       mkLine(
//         [
//           new THREE.Vector3(axOriginX, yPos, axOriginZ),
//           new THREE.Vector3(xMax + 0.3, yPos, axOriginZ),
//         ],
//         0xa7f3d0,
//         0.16,
//       );
//   });

//   const yAxisLabel = activeSaltId
//     ? `Saturation Ratio (SR) — ${activeSaltId}`
//     : "Saturation Ratio (SR)";
//   const srTitle = makeLabel(yAxisLabel, {
//     color: "#065f46",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   srTitle.position.set(axOriginX - 0.7, yAxisTop + 0.5, axOriginZ);
//   scene.add(srTitle);

//   const nMax = Math.max(nCoC, nTemp);
//   const spreadXZ = nMax * SPACING;
//   const initDist = Math.max(28, spreadXZ * 2.2);
//   const initLookAtY = BAR_MAX_H * 0.4;

//   return {
//     renderer,
//     labelRenderer,
//     scene,
//     camera,
//     barMeshes,
//     initDist,
//     initLookAtY,
//   };
// }

// // ─── SceneState ───────────────────────────────────────────────────────────────

// interface SceneState {
//   renderer: THREE.WebGLRenderer;
//   labelRenderer: CSS2DRenderer;
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   barMeshes: THREE.Mesh[];
//   rotY: number;
//   rotX: number;
//   dist: number;
//   panX: number;
//   panY: number;
//   panZ: number;
//   isDragging: boolean;
//   isPanning: boolean;
//   prevX: number;
//   prevY: number;
//   hoveredMesh: THREE.Mesh | null;
//   selectedMesh: THREE.Mesh | null;
//   animId: number;
// }

// // ─── Props ────────────────────────────────────────────────────────────────────

// interface Props {
//   apiResponse?: SaturationApiResponseFlat;
// }

// // ─── Corrosion sidebar section ────────────────────────────────────────────────

// /** Renders the full corrosion section for the sidebar, handling the new shape. */
// function CorrosionSection({
//   d,
//   saltsOfInterest,
// }: {
//   d: GridResult;
//   saltsOfInterest: string[];
// }) {
//   const metals = d.corrosion;
//   const hasMetals = Object.keys(metals).length > 0;

//   // do_ppm: prefer top-level dissolved_oxygen_ppm, then corrosion_rate.do_ppm
//   const doPpm =
//     d.dissolved_oxygen_ppm ?? (d.corrosion_rate?.do_ppm as number | undefined);

//   // temp_c from corrosion block
//   const tempC =
//     d.corrosion_temp_c ?? (d.corrosion_rate?.temp_c as number | undefined);

//   if (!hasMetals && doPpm == null && tempC == null) return null;

//   return (
//     <SSection title="Corrosion">
//       {/* Environmental context */}
//       {(doPpm != null || tempC != null) && (
//         <div className="mb-3 flex gap-2 flex-wrap">
//           {doPpm != null && (
//             <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1.5">
//               <span className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">
//                 DO
//               </span>
//               <span className="text-[13px] font-bold text-blue-700">
//                 {doPpm.toFixed(2)}
//               </span>
//               <span className="text-[11px] text-blue-400">ppm</span>
//             </div>
//           )}
//           {tempC != null && (
//             <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1.5">
//               <span className="text-[11px] text-orange-400 font-semibold uppercase tracking-wider">
//                 Temp
//               </span>
//               <span className="text-[13px] font-bold text-orange-700">
//                 {tempC}
//               </span>
//               <span className="text-[11px] text-orange-400">°C</span>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Metal rows */}
//       {hasMetals &&
//         Object.entries(metals).map(([key, metal]) => {
//           if (!metal) return null;
//           const label = key
//             .replace(/_/g, " ")
//             .replace(/\b\w/g, (c) => c.toUpperCase());
//           const inhibitionPct = metal.total_inhibition_percent;
//           const hasTreatment =
//             metal.cr_base_mpy != null && metal.cr_mpy !== metal.cr_base_mpy;

//           return (
//             <div
//               key={key}
//               className="py-[8px] border-b border-slate-100 last:border-0"
//             >
//               {/* Metal name + rating badge */}
//               <div className="flex justify-between items-center mb-1.5">
//                 <span className="text-[13px] text-slate-700 font-semibold">
//                   {label}
//                 </span>
//                 <Badge text={metal.rating} />
//               </div>

//               {/* Treated rate */}
//               <div className="flex justify-between items-center">
//                 <span className="text-[12px] text-slate-400">
//                   Corrosion Rate (treated)
//                 </span>
//                 <span className="text-[13px] font-bold text-slate-700">
//                   {metal.cr_mpy.toFixed(2)}{" "}
//                   <span className="text-[11px] font-normal text-slate-400">
//                     mpy
//                   </span>
//                 </span>
//               </div>

//               {/* Base rate (only show if different) */}
//               {hasTreatment && metal.cr_base_mpy != null && (
//                 <div className="flex justify-between items-center mt-0.5">
//                   <span className="text-[12px] text-slate-400">
//                     Base rate (untreated)
//                   </span>
//                   <span className="text-[12px] text-slate-500">
//                     {metal.cr_base_mpy.toFixed(2)}{" "}
//                     <span className="text-[11px] text-slate-400">mpy</span>
//                   </span>
//                 </div>
//               )}

//               {/* Same treated = base: just show once cleanly */}
//               {!hasTreatment && metal.cr_base_mpy != null && (
//                 <div className="flex justify-between items-center mt-0.5">
//                   <span className="text-[12px] text-slate-400">Base rate</span>
//                   <span className="text-[12px] text-slate-500">
//                     {metal.cr_base_mpy.toFixed(2)}{" "}
//                     <span className="text-[11px] text-slate-400">mpy</span>
//                   </span>
//                 </div>
//               )}

//               {/* Inhibition % */}
//               {inhibitionPct != null && (
//                 <div className="flex justify-between items-center mt-0.5">
//                   <span className="text-[12px] text-slate-400">Inhibition</span>
//                   <span className="text-[12px] font-semibold text-emerald-600">
//                     −{inhibitionPct}%
//                   </span>
//                 </div>
//               )}

//               {/* Note (e.g. "Admiralty Brass rate = Copper × 0.85") */}
//               {metal.note && (
//                 <p className="text-[11px] text-slate-300 italic mt-1">
//                   {metal.note}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//     </SSection>
//   );
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function SaturationDashboard({ apiResponse }: Props) {
//   const [activeResponse, setActiveResponse] = useState<
//     SaturationApiResponseFlat | undefined
//   >(apiResponse);

//   const [unavailableModal, setUnavailableModal] = useState<{
//     salt: string;
//     reason: string;
//   } | null>(null);

//   useEffect(() => {
//     setActiveResponse(apiResponse);
//   }, [apiResponse]);

//   const meta = useMemo(() => resolveMeta(activeResponse), [activeResponse]);
//   const gridResults = useMemo(
//     (): GridResult[] => meta?.gridResults ?? [],
//     [meta],
//   );
//   const baseSaltId: string | null = meta?.saltId ?? null;

//   const [saltAnaliysis, { isLoading }] = useSaltAnalysisMutation();

//   const runId: string | undefined = useMemo(() => {
//     if (!apiResponse) return undefined;
//     const any = apiResponse as any;
//     return apiResponse.run_id ?? any?.data?.run_id ?? undefined;
//   }, [apiResponse]);

//   const [activeSaltId, setActiveSaltId] = useState<string | null>(baseSaltId);
//   useEffect(() => {
//     setActiveSaltId(baseSaltId);
//   }, [baseSaltId]);

//   const handleSaltChipClick = useCallback(
//     async (salt: string) => {
//       if (salt === activeSaltId) {
//         setActiveSaltId(null);
//         setActiveResponse(apiResponse);
//         return;
//       }

//       if (!runId) {
//         setActiveSaltId(salt);
//         return;
//       }

//       setActiveSaltId(salt);

//       try {
//         const result = await saltAnaliysis({
//           run_id: runId,
//           salt_id: salt,
//         }).unwrap();

//         setActiveResponse(result as SaturationApiResponseFlat);
//       } catch (err) {
//         console.error("Salt analysis API error:", err);
//       }
//     },
//     [activeSaltId, apiResponse, runId, saltAnaliysis],
//   );

//   const handleResetToSR = useCallback(() => {
//     setActiveSaltId(null);
//     setActiveResponse(apiResponse);
//   }, [apiResponse]);

//   const dosage = meta?.dosagePpm ?? 0;
//   const cocMin = meta?.cocMin ?? 0;
//   const cocMax = meta?.cocMax ?? 0;
//   const tempMin = meta?.tempMin ?? 0;
//   const tempMax = meta?.tempMax ?? 0;
//   const tempUnit = meta?.tempUnit ?? "C";
//   const assetName = meta?.assetInfo?.name;
//   const summary = meta?.summary;

//   const saltsOfInterest = useMemo((): string[] => {
//     const responseAny = apiResponse as any;

//     let salts: string[] =
//       responseAny?.data?.available_salts ??
//       responseAny?.data?.graph_data?.available_salts ??
//       responseAny?.graph_data?.available_salts ??
//       responseAny?.data?.aiResponse?.available_salts ??
//       responseAny?.available_salts ??
//       [];

//     if (salts.length === 0) {
//       salts =
//         responseAny?.salts_of_interest ??
//         responseAny?.data?.aiResponse?.salts_of_interest ??
//         responseAny?.data?.salts_of_interest ??
//         [];
//     }

//     const currentSalt = activeSaltId || baseSaltId;
//     if (currentSalt && !salts.includes(currentSalt)) {
//       salts = [currentSalt, ...salts];
//     }

//     return salts;
//   }, [apiResponse, activeSaltId, baseSaltId]);

//   const unavailableSalts = useMemo(() => {
//     const responseAny = apiResponse as any;
//     const unavailableRaw =
//       responseAny?.data?.aiResponse?.unavailable_salts ??
//       responseAny?.unavailable_salts ??
//       responseAny?.data?.unavailable_salts ??
//       [];
//     return unavailableRaw.map((item: any) => ({
//       salt: item.salt || item.name,
//       reason: item.reason || "Not available in this analysis.",
//     }));
//   }, [apiResponse]);

//   const cocUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_CoC))].sort((a, b) => a - b),
//     [gridResults],
//   );

//   const tempUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_temp))].sort((a, b) => b - a),
//     [gridResults],
//   );

//   const maxSR = useMemo((): number => {
//     if (!gridResults.length) return 1;
//     if (activeSaltId) {
//       const vals = gridResults.map((d) =>
//         Math.abs(
//           d.saturation_indices[activeSaltId]?.SR ??
//             d.saturation_indices[activeSaltId]?.SI ??
//             0,
//         ),
//       );
//       return Math.max(...vals, 1);
//     }
//     const vals = gridResults.map((d) => Math.abs(d.indices?.lsi?.lsi ?? 0));
//     return Math.max(...vals, 1);
//   }, [gridResults, activeSaltId]);

//   // ── Resizable sidebar ──────────────────────────────────────────────────────
//   const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
//   const isResizingRef = useRef(false);
//   const resizeStartXRef = useRef(0);
//   const resizeStartWidthRef = useRef(SIDEBAR_DEFAULT);

//   const onResizeMouseDown = useCallback(
//     (e: RMouseEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       isResizingRef.current = true;
//       resizeStartXRef.current = e.clientX;
//       resizeStartWidthRef.current = sidebarWidth;
//       document.body.style.cursor = "col-resize";
//       document.body.style.userSelect = "none";
//     },
//     [sidebarWidth],
//   );

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       if (!isResizingRef.current) return;
//       const delta = resizeStartXRef.current - e.clientX;
//       const newWidth = Math.min(
//         SIDEBAR_MAX,
//         Math.max(SIDEBAR_MIN, resizeStartWidthRef.current + delta),
//       );
//       setSidebarWidth(newWidth);
//     };
//     const onUp = () => {
//       if (!isResizingRef.current) return;
//       isResizingRef.current = false;
//       document.body.style.cursor = "";
//       document.body.style.userSelect = "";
//     };
//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };
//   }, []);

//   const resizeFnRef = useRef<(() => void) | null>(null);
//   useEffect(() => {
//     const id = requestAnimationFrame(() => {
//       resizeFnRef.current?.();
//     });
//     return () => cancelAnimationFrame(id);
//   }, [sidebarWidth]);

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<SceneState | null>(null);
//   const [activeData, setActiveData] = useState<GridResult | null>(null);

//   const updateCamera = useCallback(() => {
//     const s = sceneRef.current;
//     if (!s) return;
//     s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist + s.panX;
//     s.camera.position.y = Math.sin(s.rotX) * s.dist + s.panY;
//     s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist + s.panZ;
//     s.camera.lookAt(s.panX, s.panY, s.panZ);
//   }, []);

//   // ── Build / rebuild scene ──────────────────────────────────────────────────
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const wrap = wrapRef.current;
//     if (!canvas || !wrap) return;

//     if (sceneRef.current) {
//       cancelAnimationFrame(sceneRef.current.animId);
//       sceneRef.current.renderer.dispose();
//       const oldEl = sceneRef.current.labelRenderer.domElement;
//       if (oldEl.parentNode === wrap) wrap.removeChild(oldEl);
//       sceneRef.current = null;
//     }
//     if (gridResults.length === 0) return;

//     const {
//       renderer,
//       labelRenderer,
//       scene,
//       camera,
//       barMeshes,
//       initDist,
//       initLookAtY,
//     } = buildScene(
//       canvas,
//       wrap,
//       gridResults,
//       activeSaltId,
//       cocUniq,
//       tempUniq,
//       maxSR,
//       tempUnit,
//     );

//     const state: SceneState = {
//       renderer,
//       labelRenderer,
//       scene,
//       camera,
//       barMeshes,
//       rotY: 0.55,
//       rotX: 0.38,
//       dist: initDist,
//       panX: 0,
//       panY: initLookAtY,
//       panZ: 0,
//       isDragging: false,
//       isPanning: false,
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
//     resizeFnRef.current = resize;
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
//       resizeFnRef.current = null;
//       renderer.dispose();
//       const el = labelRenderer.domElement;
//       if (el.parentNode === wrap) wrap.removeChild(el);
//       sceneRef.current = null;
//     };
//   }, [
//     gridResults,
//     activeSaltId,
//     maxSR,
//     cocUniq,
//     tempUniq,
//     tempUnit,
//     updateCamera,
//   ]);

//   // ── Pointer / touch interaction ────────────────────────────────────────────
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     const S = () => sceneRef.current;

//     const resetColor = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(
//         m.userData.origColor as number,
//       );
//     const setHover = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(0x1abc9c);
//     const setSelected = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(0x1d4ed8);

//     const raycast = (cx: number, cy: number): THREE.Mesh | null => {
//       const s = S();
//       if (!s) return null;
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = ((cx - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -(((cy - rect.top) / rect.height) * 2 - 1);
//       raycaster.setFromCamera(mouse, s.camera);
//       const hits = raycaster.intersectObjects(s.barMeshes, false);
//       return hits.length > 0 ? (hits[0].object as THREE.Mesh) : null;
//     };

//     const getPanVectors = (s: SceneState) => {
//       const right = new THREE.Vector3(
//         Math.cos(s.rotY),
//         0,
//         -Math.sin(s.rotY),
//       ).normalize();
//       const fwd = new THREE.Vector3(
//         -Math.sin(s.rotY) * Math.cos(s.rotX),
//         Math.sin(s.rotX),
//         -Math.cos(s.rotY) * Math.cos(s.rotX),
//       ).normalize();
//       const up = new THREE.Vector3()
//         .crossVectors(right, fwd)
//         .negate()
//         .normalize();
//       return { right, up };
//     };

//     const onMouseDown = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       if (e.button === 1 || e.button === 2) {
//         s.isPanning = true;
//         s.isDragging = false;
//       } else {
//         s.isDragging = false;
//         s.isPanning = false;
//       }
//       s.prevX = e.clientX;
//       s.prevY = e.clientY;
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       const dx = e.clientX - s.prevX;
//       const dy = e.clientY - s.prevY;

//       if (s.isPanning && (e.buttons === 2 || e.buttons === 4)) {
//         const speed = s.dist * 0.0018;
//         const { right } = getPanVectors(s);
//         s.panX -= right.x * dx * speed;
//         s.panZ -= right.z * dx * speed;
//         s.panY -= dy * speed;
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         canvas.style.cursor = "move";
//         return;
//       }

//       if (
//         e.buttons === 1 &&
//         !s.isDragging &&
//         (Math.abs(dx) > 3 || Math.abs(dy) > 3)
//       )
//         s.isDragging = true;
//       if (s.isDragging && e.buttons === 1) {
//         s.rotY += dx * 0.008;
//         s.rotX -= dy * 0.008;
//         s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         canvas.style.cursor = "grabbing";
//         return;
//       }

//       const hit = raycast(e.clientX, e.clientY);
//       if (
//         s.hoveredMesh &&
//         s.hoveredMesh !== hit &&
//         s.hoveredMesh !== s.selectedMesh
//       )
//         resetColor(s.hoveredMesh);
//       if (hit) {
//         s.hoveredMesh = hit;
//         if (hit !== s.selectedMesh) setHover(hit);
//         canvas.style.cursor = "pointer";
//         setActiveData(hit.userData.data as GridResult);
//       } else {
//         s.hoveredMesh = null;
//         canvas.style.cursor = "grab";
//         setActiveData(
//           s.selectedMesh ? (s.selectedMesh.userData.data as GridResult) : null,
//         );
//       }
//     };

//     const onMouseUp = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       if (s.isPanning) {
//         s.isPanning = false;
//         canvas.style.cursor = "grab";
//         return;
//       }
//       if (!s.isDragging) {
//         const hit = raycast(e.clientX, e.clientY);
//         if (hit) {
//           if (
//             s.selectedMesh &&
//             s.selectedMesh !== hit &&
//             s.selectedMesh !== s.hoveredMesh
//           )
//             resetColor(s.selectedMesh);
//           s.selectedMesh = hit;
//           setSelected(hit);
//           setActiveData(hit.userData.data as GridResult);
//         }
//       }
//       s.isDragging = false;
//       canvas.style.cursor = "grab";
//     };

//     const onMouseLeave = () => {
//       const s = S();
//       if (!s) return;
//       if (s.hoveredMesh && s.hoveredMesh !== s.selectedMesh) {
//         resetColor(s.hoveredMesh);
//         s.hoveredMesh = null;
//       }
//       s.isDragging = false;
//       s.isPanning = false;
//       canvas.style.cursor = "grab";
//     };

//     const onWheel = (e: WheelEvent) => {
//       const s = S();
//       if (!s) return;
//       s.dist = Math.max(8, Math.min(300, s.dist + e.deltaY * 0.07));
//       updateCamera();
//       e.preventDefault();
//     };

//     const onContextMenu = (e: MouseEvent) => e.preventDefault();

//     let lastTouchY2 = 0;
//     const onTouchStart = (e: TouchEvent) => {
//       const s = S();
//       if (!s) return;
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       s.isDragging = false;
//       s.isPanning = false;
//       if (e.touches.length === 2)
//         lastTouchY2 = (e.touches[0].clientY + e.touches[1].clientY) / 2;
//     };
//     const onTouchMove = (e: TouchEvent) => {
//       const s = S();
//       if (!s) return;
//       if (e.touches.length === 2) {
//         const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
//         s.panY -= (midY - lastTouchY2) * s.dist * 0.0018;
//         lastTouchY2 = midY;
//         updateCamera();
//         e.preventDefault();
//         return;
//       }
//       const dx = e.touches[0].clientX - s.prevX;
//       const dy = e.touches[0].clientY - s.prevY;
//       s.isDragging = true;
//       s.rotY += dx * 0.01;
//       s.rotX -= dy * 0.01;
//       s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       updateCamera();
//       e.preventDefault();
//     };

//     canvas.addEventListener("mousedown", onMouseDown);
//     canvas.addEventListener("mousemove", onMouseMove);
//     canvas.addEventListener("mouseup", onMouseUp);
//     canvas.addEventListener("mouseleave", onMouseLeave);
//     canvas.addEventListener("wheel", onWheel, { passive: false });
//     canvas.addEventListener("contextmenu", onContextMenu);
//     canvas.addEventListener("touchstart", onTouchStart, { passive: true });
//     canvas.addEventListener("touchmove", onTouchMove, { passive: false });
//     return () => {
//       canvas.removeEventListener("mousedown", onMouseDown);
//       canvas.removeEventListener("mousemove", onMouseMove);
//       canvas.removeEventListener("mouseup", onMouseUp);
//       canvas.removeEventListener("mouseleave", onMouseLeave);
//       canvas.removeEventListener("wheel", onWheel);
//       canvas.removeEventListener("contextmenu", onContextMenu);
//       canvas.removeEventListener("touchstart", onTouchStart);
//       canvas.removeEventListener("touchmove", onTouchMove);
//     };
//   }, [updateCamera]);

//   // ── Derived sidebar values ─────────────────────────────────────────────────
//   const d = activeData;

//   const saltSR: number | null =
//     d && activeSaltId
//       ? (d.saturation_indices[activeSaltId]?.SR ??
//         d.saturation_indices[activeSaltId]?.SI ??
//         null)
//       : null;

//   const displaySR: number | null = saltSR ?? d?.indices?.lsi?.lsi ?? null;

//   const colorCode = d?.color_code;
//   const statusLabel: string =
//     colorCode === "yellow"
//       ? "Caution"
//       : colorCode === "red"
//         ? "Scale Risk"
//         : "Protected";
//   const statusVar: BadgeVariant =
//     colorCode === "yellow" ? "yellow" : colorCode === "red" ? "red" : "green";
//   const isEmpty = gridResults.length === 0;
//   const displaySaltLabel =
//     activeSaltId ??
//     (saltsOfInterest.length > 0 ? saltsOfInterest[0] : "Multi-Salt");

//   const legendItems = [
//     {
//       label: "Protected",
//       sub: "SR within safe band",
//       baseHex: "#2ECC71",
//       lightHex: "#d1fae5",
//       bg: "bg-emerald-50 border-emerald-200",
//     },
//     {
//       label: "Caution",
//       sub: "Mild scaling tendency",
//       baseHex: "#F1C40F",
//       lightHex: "#fef9c3",
//       bg: "bg-amber-50 border-amber-200",
//     },
//     {
//       label: "Scale Risk",
//       sub: "High scale risk",
//       baseHex: "#E74C3C",
//       lightHex: "#fee2e2",
//       bg: "bg-red-50 border-red-200",
//     },
//   ];

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <div className="bg-white text-slate-800 border font-sans text-[14px] h-screen overflow-hidden flex flex-col select-none">
//         {/* ── Header ── */}
//         <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0 gap-4 flex-wrap">
//           <div>
//             <div className="text-[15px] font-bold text-slate-900">
//               Saturation Analysis —{" "}
//               <span className="text-blue-600">{displaySaltLabel}</span>
//               <span className="font-normal text-slate-400"> · 3D Grid</span>
//             </div>
//             <div className="text-[12px] text-slate-400 mt-0.5 flex flex-wrap gap-x-4">
//               {assetName && (
//                 <span className="text-slate-600 font-semibold">
//                   {assetName}
//                 </span>
//               )}
//               {(cocMin > 0 || cocMax > 0) && (
//                 <span>
//                   CoC {cocMin}–{cocMax}
//                 </span>
//               )}
//               {(tempMin > 0 || tempMax > 0) && (
//                 <span>
//                   Temp {tempMin}–{tempMax} °{tempUnit}
//                 </span>
//               )}
//               {dosage > 0 && <span>Dosage {dosage} ppm</span>}
//               {meta?.totalGridPoints && <span>{meta.totalGridPoints} pts</span>}
//             </div>
//           </div>
//           <div className="flex items-center gap-3 flex-wrap">
//             {summary && (
//               <div className="flex gap-1.5 text-[12px]">
//                 {summary.green > 0 && (
//                   <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
//                     {summary.green} Protected
//                   </span>
//                 )}
//                 {summary.yellow > 0 && (
//                   <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
//                     {summary.yellow} Caution
//                   </span>
//                 )}
//                 {summary.red > 0 && (
//                   <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-semibold">
//                     {summary.red} Scale Risk
//                   </span>
//                 )}
//               </div>
//             )}
//             {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
//               const dot =
//                 label === "Caution"
//                   ? "bg-amber-400"
//                   : label === "Scale Risk"
//                     ? "bg-red-500"
//                     : "bg-emerald-500";
//               return (
//                 <div
//                   key={label}
//                   className="flex items-center gap-1.5 text-[12px] text-slate-500"
//                 >
//                   <span
//                     className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`}
//                   />
//                   {label}
//                 </div>
//               );
//             })}
//           </div>
//         </header>

//         {/* ── Salt chips ── */}
//         {(saltsOfInterest.length > 0 || unavailableSalts.length > 0) && (
//           <div className="bg-slate-50 border-b border-slate-200 shrink-0">
//             {saltsOfInterest.length > 0 && (
//               <div className="px-5 pt-3 pb-2 flex items-center gap-2 overflow-x-auto max-h-[58px]">
//                 <span className="text-[11px] font-semibold text-slate-400 shrink-0 tracking-widest uppercase whitespace-nowrap">
//                   AVAILABLE SALTS:
//                 </span>
//                 <div className="flex gap-1.5 flex-nowrap">
//                   {saltsOfInterest.map((s) => {
//                     const isActive = s === activeSaltId;
//                     return (
//                       <button
//                         key={s}
//                         onClick={() => handleSaltChipClick(s)}
//                         disabled={isLoading}
//                         className={`text-[13px] px-3.5 py-1 rounded-full border font-medium whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
//                           isActive
//                             ? "bg-blue-600 text-white border-blue-600 shadow-sm"
//                             : "bg-white border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50"
//                         }`}
//                       >
//                         {s}
//                         {isActive && <span className="text-xs">●</span>}
//                       </button>
//                     );
//                   })}
//                 </div>
//                 {activeSaltId && (
//                   <button
//                     onClick={handleResetToSR}
//                     disabled={isLoading}
//                     className="ml-2 text-xs px-3 py-1 rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100 whitespace-nowrap shrink-0"
//                   >
//                     Reset to SR
//                   </button>
//                 )}
//               </div>
//             )}

//             {unavailableSalts.length > 0 && (
//               <div className="px-5 pb-3 pt-1 border-t border-slate-100 flex items-start gap-2 overflow-x-auto max-h-[58px]">
//                 <span className="text-[11px] font-semibold text-slate-400 shrink-0 tracking-widest uppercase whitespace-nowrap pt-1">
//                   UNAVAILABLE:
//                 </span>
//                 <div className="flex gap-1.5 flex-nowrap flex-wrap">
//                   {unavailableSalts.map(({ salt, reason }: any) => (
//                     <button
//                       key={salt}
//                       onClick={() => setUnavailableModal({ salt, reason })}
//                       className="text-[12px] px-3 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-600 transition-colors flex items-center gap-1 whitespace-nowrap"
//                       title="Click to see reason"
//                     >
//                       {salt}
//                       <span className="text-[10px] opacity-60">ⓘ</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Unavailable Modal */}
//         {unavailableModal && (
//           <div
//             className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
//             onClick={() => setUnavailableModal(null)}
//           >
//             <div
//               className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
//                 <div className="font-semibold text-slate-900">
//                   Why{" "}
//                   <span className="text-slate-600">
//                     {unavailableModal.salt}
//                   </span>{" "}
//                   is unavailable
//                 </div>
//                 <button
//                   onClick={() => setUnavailableModal(null)}
//                   className="text-slate-400 hover:text-slate-600 text-xl leading-none"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="p-6 text-[13px] text-slate-600 leading-relaxed">
//                 {unavailableModal.reason}
//               </div>
//               <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
//                 <button
//                   onClick={() => setUnavailableModal(null)}
//                   className="px-5 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── Main ── */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* 3-D viewport */}
//           <div
//             ref={wrapRef}
//             className="flex-1 min-w-0 relative overflow-hidden"
//             style={{ background: "#f8fafc" }}
//           >
//             {isEmpty ? (
//               <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
//                 <div className="text-5xl opacity-20">⬛</div>
//                 <p className="text-[14px]">
//                   No grid data — pass an{" "}
//                   <code className="text-slate-500 bg-slate-100 px-1 rounded">
//                     apiResponse
//                   </code>{" "}
//                   prop.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <canvas
//                   ref={canvasRef}
//                   className="block w-full h-full cursor-grab"
//                 />

//                 {/* Loading overlay */}
//                 {isLoading && (
//                   <div
//                     className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
//                     style={{
//                       background: "rgba(248,250,252,0.78)",
//                       backdropFilter: "blur(3px)",
//                       zIndex: 25,
//                     }}
//                   >
//                     <svg
//                       className="animate-spin w-11 h-11 text-blue-500"
//                       viewBox="0 0 44 44"
//                       fill="none"
//                     >
//                       <circle
//                         cx="22"
//                         cy="22"
//                         r="18"
//                         stroke="currentColor"
//                         strokeOpacity="0.2"
//                         strokeWidth="4"
//                       />
//                       <path
//                         d="M40 22a18 18 0 00-18-18"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                         strokeLinecap="round"
//                       />
//                     </svg>
//                     <div className="text-center">
//                       <p className="text-[14px] font-semibold text-slate-700">
//                         Analysing{" "}
//                         <span className="text-blue-600">{activeSaltId}</span>
//                       </p>
//                       <p className="text-[12px] text-slate-400 mt-0.5">
//                         Fetching saturation grid…
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Axis legend */}
//                 <div
//                   className="absolute bottom-4 left-4 pointer-events-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-md"
//                   style={{ zIndex: 20 }}
//                 >
//                   {[
//                     {
//                       color: "#2563eb",
//                       label: "X — Cycles of Concentration (CoC)",
//                     },
//                     {
//                       color: "#ea580c",
//                       label: `Z — Temperature (°${tempUnit})`,
//                     },
//                     {
//                       color: "#059669",
//                       label: activeSaltId
//                         ? `Y — ${activeSaltId} Saturation Ratio (SR)`
//                         : "Y — Saturation Ratio (SR)",
//                     },
//                   ].map(({ color, label }) => (
//                     <div
//                       key={label}
//                       className="flex items-center gap-2 text-[11px] text-slate-600 py-0.5"
//                     >
//                       <div
//                         className="w-5 h-[2px] rounded shrink-0"
//                         style={{ background: color }}
//                       />
//                       {label}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Controls hint */}
//                 <div
//                   className="absolute bottom-4 right-4 pointer-events-none bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm text-[11px] text-slate-400"
//                   style={{ zIndex: 20 }}
//                 >
//                   Left-drag · Rotate &nbsp;|&nbsp; Right-drag · Pan
//                   &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click · Pin
//                 </div>
//               </>
//             )}
//           </div>

//           {/* ── Resize handle ── */}
//           <div
//             onMouseDown={onResizeMouseDown}
//             className="w-[5px] shrink-0 bg-slate-200 hover:bg-blue-400 active:bg-blue-500 cursor-col-resize transition-colors relative group"
//             style={{ zIndex: 30 }}
//             title="Drag to resize sidebar"
//           >
//             <div className="absolute inset-y-0 left-[1px] w-[3px] flex flex-col items-center justify-center gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="w-[3px] h-[3px] rounded-full bg-white"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* ── Sidebar ── */}
//           <aside
//             style={{
//               width: sidebarWidth,
//               minWidth: SIDEBAR_MIN,
//               maxWidth: SIDEBAR_MAX,
//             }}
//             className="shrink-0 bg-white border-l border-slate-200 overflow-y-auto p-4"
//           >
//             {!d ? (
//               <div className="text-center py-8">
//                 <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl">
//                   📊
//                 </div>
//                 <p className="text-[14px] font-semibold text-slate-600 mb-1">
//                   Hover or click a bar
//                 </p>
//                 <p className="text-[12px] text-slate-400">
//                   to inspect grid-point details
//                 </p>

//                 {/* Color legend */}
//                 <div className="mt-6 space-y-2.5">
//                   {legendItems.map(({ label, sub, baseHex, lightHex, bg }) => (
//                     <div
//                       key={label}
//                       className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${bg} text-left`}
//                     >
//                       <div
//                         className="w-3 h-9 rounded shrink-0"
//                         style={{
//                           background: `linear-gradient(to bottom, ${baseHex}, ${lightHex})`,
//                         }}
//                       />
//                       <div>
//                         <div className="text-[13px] font-semibold text-slate-700">
//                           {label}
//                         </div>
//                         <div className="text-[11px] text-slate-400">{sub}</div>
//                         <div className="text-[10px] text-slate-300 mt-0.5">
//                           Dark = high SR · Light = low SR
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-5 border-t border-slate-100 pt-5 space-y-2.5 text-left">
//                   <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
//                     Axis Legend
//                   </p>
//                   {[
//                     { color: "#2563eb", label: "X — Cycles of Concentration" },
//                     {
//                       color: "#ea580c",
//                       label: `Z — Temperature (°${tempUnit})`,
//                     },
//                     {
//                       color: "#059669",
//                       label: activeSaltId
//                         ? `Y — ${activeSaltId} Saturation Ratio (SR)`
//                         : "Y — Saturation Ratio (SR)",
//                     },
//                   ].map(({ color, label }) => (
//                     <div key={label} className="flex items-center gap-2.5">
//                       <div
//                         className="w-6 h-[2px] shrink-0 rounded-full"
//                         style={{ background: color }}
//                       />
//                       <span className="text-[12px] text-slate-500">
//                         {label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-5 border-t border-slate-100 pt-4 space-y-1">
//                   <p className="text-[11px] text-slate-400 italic">
//                     ↔ Left-drag to rotate
//                   </p>
//                   <p className="text-[11px] text-slate-400 italic">
//                     ↕ Right-drag to pan
//                   </p>
//                   <p className="text-[11px] text-slate-400 italic">
//                     🖱 Scroll to zoom
//                   </p>
//                   <p className="text-[11px] text-slate-400 italic">
//                     ↔ Drag left edge to resize panel
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {/* Bar color swatch */}
//                 {d.bar_data && (
//                   <div
//                     className="mb-4 rounded-lg px-3 py-2 text-white text-[12px] font-semibold flex items-center gap-2"
//                     style={{ backgroundColor: d.bar_data.color_hex }}
//                   >
//                     <div
//                       className="w-3 h-3 rounded-full border border-white/40"
//                       style={{ opacity: d.bar_data.opacity }}
//                     />
//                     {statusLabel} · SR intensity{" "}
//                     {Math.round(d.bar_data.opacity * 100)}%
//                   </div>
//                 )}

//                 <SSection title="Grid Point">
//                   <SRow label="CoC" value={String(d._grid_CoC)} />
//                   <SRow
//                     label="Temperature"
//                     value={`${d._grid_temp} °${tempUnit}`}
//                   />
//                   <SRow label="pH" value={String(d._grid_pH)} />
//                   <SRow
//                     label="Ionic Strength"
//                     value={d.ionic_strength?.toFixed(5) ?? "—"}
//                   />
//                   {/* dissolved_oxygen_ppm: show from top-level or corrosion_rate */}
//                   {(d.dissolved_oxygen_ppm != null ||
//                     (d.corrosion_rate?.do_ppm as number | undefined) !=
//                       null) && (
//                     <SRow
//                       label="Dissolved O₂"
//                       value={`${(
//                         d.dissolved_oxygen_ppm ??
//                         (d.corrosion_rate?.do_ppm as number)
//                       ).toFixed(2)} ppm`}
//                     />
//                   )}
//                   {d.description_of_solution?.activity_of_water != null && (
//                     <SRow
//                       label="Activity H₂O"
//                       value={d.description_of_solution.activity_of_water.toFixed(
//                         3,
//                       )}
//                     />
//                   )}
//                   {d.charge_balance_error_pct !== undefined && (
//                     <SRow
//                       label="Charge Bal. Err"
//                       value={`${d.charge_balance_error_pct}%`}
//                     />
//                   )}
//                 </SSection>

//                 <SSection
//                   title={
//                     activeSaltId
//                       ? `${activeSaltId} — Saturation Ratio`
//                       : "Saturation Ratio (SR)"
//                   }
//                 >
//                   <SRow
//                     label="Saturation Ratio (SR)"
//                     value={displaySR !== null ? displaySR.toFixed(4) : "—"}
//                     bold
//                   />
//                   <div className="flex justify-between items-center py-[6px]">
//                     <span className="text-[13px] text-slate-500">Status</span>
//                     <Badge text={statusLabel} variant={statusVar} />
//                   </div>
//                 </SSection>

//                 {/* Key Salts SR */}
//                 {saltsOfInterest.length > 0 &&
//                   Object.keys(d.saturation_indices).length > 0 && (
//                     <SSection title="Key Salts SR">
//                       {saltsOfInterest.map((salt) => {
//                         const entry = d.saturation_indices[salt];
//                         const isActive = salt === activeSaltId;
//                         const srDisplay =
//                           entry?.SR != null ? entry.SR : entry?.SI;
//                         return (
//                           <div
//                             key={salt}
//                             className="flex justify-between items-center py-[6px] border-b border-slate-100 last:border-0"
//                           >
//                             <div className="flex items-center gap-1.5 min-w-0">
//                               <span
//                                 className={`text-[13px] truncate ${isActive ? "font-semibold text-blue-700" : "text-slate-500"}`}
//                               >
//                                 {salt}
//                               </span>
//                               {entry?.chemical_formula && (
//                                 <span className="text-[10px] text-slate-300 shrink-0">
//                                   {entry.chemical_formula}
//                                 </span>
//                               )}
//                             </div>
//                             <span
//                               className={`text-[13px] font-semibold shrink-0 ${
//                                 srDisplay != null && srDisplay > 0
//                                   ? "text-red-600"
//                                   : "text-slate-400"
//                               }`}
//                             >
//                               {srDisplay != null ? srDisplay : "—"}
//                             </span>
//                           </div>
//                         );
//                       })}
//                     </SSection>
//                   )}

//                 <SSection title="Deposition Indices">
//                   <SRow
//                     label="LSI"
//                     value={d.indices.lsi.lsi.toFixed(2)}
//                     badge={d.indices.lsi.risk}
//                   />
//                   {d.indices.ryznar.risk !== "N/A" && (
//                     <SRow
//                       label="RSI"
//                       value={d.indices.ryznar.ri.toFixed(2)}
//                       badge={d.indices.ryznar.risk}
//                     />
//                   )}
//                   {d.indices.puckorius.risk !== "N/A" && (
//                     <SRow
//                       label="PSI"
//                       value={d.indices.puckorius.index.toFixed(2)}
//                       badge={d.indices.puckorius.risk}
//                     />
//                   )}
//                   {d.indices.larson_skold.risk_level !== "N/A" && (
//                     <SRow
//                       label="Larson-Skold"
//                       value={
//                         d.indices.larson_skold.index != null
//                           ? d.indices.larson_skold.index.toFixed(3)
//                           : "N/A"
//                       }
//                       badge={`${d.indices.larson_skold.risk_level} Risk`}
//                     />
//                   )}
//                   {d.indices.stiff_davis.risk !== "N/A" && (
//                     <SRow
//                       label="Stiff-Davis"
//                       value={
//                         d.indices.stiff_davis.index != null
//                           ? d.indices.stiff_davis.index.toFixed(3)
//                           : "N/A"
//                       }
//                       badge={
//                         d.indices.stiff_davis.risk ??
//                         d.indices.stiff_davis.interpretation ??
//                         ""
//                       }
//                     />
//                   )}
//                   {d.indices.ccpp.risk !== "N/A" && (
//                     <SRow
//                       label="CCPP (ppm)"
//                       value={
//                         d.indices.ccpp.ccpp_ppm != null
//                           ? String(d.indices.ccpp.ccpp_ppm)
//                           : "N/A"
//                       }
//                       badge={d.indices.ccpp.risk}
//                     />
//                   )}
//                 </SSection>

//                 {/* ── Corrosion section (new dedicated component) ── */}
//                 <CorrosionSection d={d} saltsOfInterest={saltsOfInterest} />

//                 {/* All Minerals SR */}
//                 {Object.keys(d.saturation_indices).length > 0 && (
//                   <SSection title="All Minerals SR">
//                     {Object.entries(d.saturation_indices)
//                       .sort(([, a], [, b]) => {
//                         const srA = a.SR ?? a.SI;
//                         const srB = b.SR ?? b.SI;
//                         return srB - srA;
//                       })
//                       .map(([key, val]) => {
//                         const isTarget = key === activeSaltId;
//                         const isInterest = saltsOfInterest.includes(key);
//                         const srVal = val.SR ?? val.SI;
//                         return (
//                           <div
//                             key={key}
//                             className={`flex justify-between items-center py-[5px] border-b border-slate-50 last:border-0 ${isTarget ? "bg-blue-50 -mx-1 px-1 rounded" : ""}`}
//                           >
//                             <div className="flex items-center gap-1 min-w-0">
//                               <span
//                                 className={`text-[13px] truncate ${isTarget ? "font-bold text-blue-700" : isInterest ? "font-semibold text-slate-700" : "text-slate-400"}`}
//                               >
//                                 {key}
//                               </span>
//                               {val.chemical_formula && (
//                                 <span className="text-[10px] text-slate-300 shrink-0 hidden sm:inline">
//                                   {val.chemical_formula}
//                                 </span>
//                               )}
//                             </div>
//                             <span
//                               className={`text-[13px] shrink-0 font-semibold ${srVal > 0 ? "text-red-600" : "text-slate-300"} ${isTarget ? "font-bold" : ""}`}
//                             >
//                               {srVal}
//                             </span>
//                           </div>
//                         );
//                       })}
//                   </SSection>
//                 )}
//               </>
//             )}
//           </aside>
//         </div>
//       </div>
//     </>
//   );
// }
// =========================================================================
// "use client";

// import { useSaltAnalysisMutation } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
// import {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
//   ReactNode,
//   MouseEvent as RMouseEvent,
// } from "react";
// import * as THREE from "three";
// import {
//   CSS2DRenderer,
//   CSS2DObject,
// } from "three/examples/jsm/renderers/CSS2DRenderer.js";
// import {
//   Droplets,
//   Thermometer,
//   FlaskConical,
//   Zap,
//   Wind,
//   Scale,
//   Activity,
//   Beaker,
//   ChevronDown,
//   X,
// } from "lucide-react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface SIEntry {
//   SI: number;
//   SR?: number;
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
//   index: number | null;
//   interpretation?: string;
//   risk_level: string;
//   components?: Record<string, number>;
// }

// export interface StiffDavisIndex {
//   index: number | null;
//   interpretation?: string;
//   risk?: string;
//   components?: Record<string, number>;
// }

// export interface CcppIndex {
//   ccpp_ppm: number | null;
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
//   note?: string;
// }

// export interface CorrosionRate {
//   mild_steel?: CorrosionMetal;
//   copper?: CorrosionMetal;
//   admiralty_brass?: CorrosionMetal;
//   do_ppm?: number;
//   temp_c?: number;
//   [key: string]: CorrosionMetal | number | undefined;
// }

// export interface Corrosion {
//   mild_steel?: CorrosionMetal;
//   copper?: CorrosionMetal;
//   admiralty_brass?: CorrosionMetal;
//   [key: string]: CorrosionMetal | undefined;
// }

// export interface BarData {
//   color_hex: string;
//   opacity: number;
//   sr_color: string;
//   sr_color_hex: string;
// }

// // ─── New: DescriptionOfSolution shape from grid_results ──────────────────────
// export interface DescriptionOfSolution {
//   pH?: number;
//   specific_conductance?: number;
//   density?: number;
//   activity_of_water?: number;
//   ionic_strength_desc?: number;
//   mass_of_water_kg?: number;
//   temperature_C?: number;
//   [key: string]: number | undefined;
// }

// // ─── New: DistributionOfSpecies shape from grid_results ──────────────────────
// export interface SpeciesEntry {
//   molality: number;
//   activity: number;
//   element?: string | null;
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
//   dissolved_oxygen_ppm?: number;
//   corrosion_temp_c?: number;
//   description_of_solution?: DescriptionOfSolution | null;
//   distribution_of_species?: Record<string, SpeciesEntry> | null;
//   calculations?: Record<string, unknown>;
//   bar_data?: BarData;
//   corrosion_rate?: CorrosionRate;
//   // Raw extra fields from API
//   specific_conductance?: number;
//   density?: number;
//   electrical_balance?: number;
//   _grid_temp_c?: number;
// }

// export interface SaturationApiResponseFlat {
//   success?: boolean;
//   run_id?: string;
//   salt_id?: string | null;
//   salts_of_interest?: string[];
//   dosage_ppm?: number;
//   coc_min?: number;
//   coc_max?: number;
//   temp_min?: number;
//   temp_max?: number;
//   temp_unit?: string;
//   ph_mode?: string;
//   total_grid_points?: number;
//   grid_results?: GridResult[];
//   summary?: { green: number; yellow: number; red: number; error: number };
//   base_water_parameters?: Record<string, { value: number; unit: string }>;
//   asset_info?: { name?: string; type?: string };
//   data?: {
//     aiResponse?: Partial<SaturationApiResponseFlat>;
//     salt_id?: string | null;
//     salts_of_interest?: string[];
//     dosage_ppm?: number;
//     coc_min?: number;
//     coc_max?: number;
//     temp_min?: number;
//     temp_max?: number;
//     temp_unit?: string;
//     ph_mode?: string;
//     total_grid_points?: number;
//     grid_results?: GridResult[];
//     summary?: { green: number; yellow: number; red: number; error: number };
//     base_water_parameters?: Record<string, { value: number; unit: string }>;
//     asset_info?: { name?: string; type?: string };
//     available_salts?: string[];
//     chart_data?: {
//       salt_id?: string | null;
//       temp_unit?: string;
//       available_salts?: string[];
//       total_points?: number;
//       points?: any[];
//     };
//     graph_data?: {
//       type?: string;
//       salt_id?: string | null;
//       temp_unit?: string;
//       total_points?: number;
//       available_salts?: string[];
//       points?: any[];
//       axes?: {
//         x?: { label?: string; values?: number[] };
//         y?: { label?: string; unit?: string };
//         z?: { label?: string; values?: number[] };
//       };
//     };
//     run_id?: string;
//   };
// }

// interface RawGridPoint extends Omit<GridResult, "indices" | "corrosion"> {
//   indices?: Indices;
//   corrosion?: Corrosion;
//   corrosion_rate?: CorrosionRate;
//   calculations?: {
//     lsi?: LsiIndex;
//     ryznar?: RyznarIndex;
//     puckorius?: PuckoriusIndex;
//     larson_skold?: LarsonSkoldIndex;
//     stiff_davis?: StiffDavisIndex;
//     ccpp?: CcppIndex;
//     mild_steel_corrosion?: CorrosionMetal;
//     copper_corrosion?: CorrosionMetal;
//     admiralty_brass_corrosion?: CorrosionMetal;
//   };
//   bar_data?: BarData;
// }

// interface ResolvedMeta {
//   saltId: string | null;
//   saltsOfInterest: string[];
//   dosagePpm: number;
//   cocMin: number;
//   cocMax: number;
//   tempMin: number;
//   tempMax: number;
//   tempUnit: string;
//   phMode?: string;
//   totalGridPoints?: number;
//   gridResults: GridResult[];
//   summary?: { green: number; yellow: number; red: number; error: number };
//   baseWaterParameters?: Record<string, { value: number; unit: string }>;
//   assetInfo?: { name?: string; type?: string };
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const BAR_W = 1.55;
// const SPACING = 2.4;
// const BAR_MAX_H = 8.0;

// const SIDEBAR_MIN = 240;
// const SIDEBAR_MAX = 560;
// const SIDEBAR_DEFAULT = 300;

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function hexStringToThreeNum(hex: string): number {
//   return parseInt(hex.replace("#", ""), 16);
// }

// function darkenHex(hex: string, factor: number): number {
//   const num = hexStringToThreeNum(hex);
//   const r = Math.round(((num >> 16) & 0xff) * factor);
//   const g = Math.round(((num >> 8) & 0xff) * factor);
//   const b = Math.round((num & 0xff) * factor);
//   return (r << 16) | (g << 8) | b;
// }

// function lightenHex(hex: string, factor: number): number {
//   const num = hexStringToThreeNum(hex);
//   const r = Math.round(
//     ((num >> 16) & 0xff) + (255 - ((num >> 16) & 0xff)) * factor,
//   );
//   const g = Math.round(
//     ((num >> 8) & 0xff) + (255 - ((num >> 8) & 0xff)) * factor,
//   );
//   const b = Math.round((num & 0xff) + (255 - (num & 0xff)) * factor);
//   return (r << 16) | (g << 8) | b;
// }

// function barColorFromBarData(barData: BarData): number {
//   const t = Math.max(0, Math.min(1, barData.opacity));
//   if (t > 0.5) return darkenHex(barData.color_hex, 0.5 + (t - 0.5) * 1.0);
//   return lightenHex(barData.color_hex, (0.5 - t) * 0.65);
// }

// // ─── Corrosion normaliser ─────────────────────────────────────────────────────

// function normaliseCorrosion(raw: RawGridPoint): {
//   corrosion: Corrosion;
//   dissolved_oxygen_ppm?: number;
//   corrosion_temp_c?: number;
// } {
//   if (raw.corrosion_rate && typeof raw.corrosion_rate === "object") {
//     const cr = raw.corrosion_rate;
//     const metals: Corrosion = {};
//     const do_ppm = typeof cr.do_ppm === "number" ? cr.do_ppm : undefined;
//     const corrosion_temp_c =
//       typeof cr.temp_c === "number" ? cr.temp_c : undefined;
//     const SCALAR_KEYS = new Set(["do_ppm", "temp_c"]);
//     for (const key of Object.keys(cr)) {
//       if (SCALAR_KEYS.has(key)) continue;
//       const val = cr[key];
//       if (val && typeof val === "object" && "cr_mpy" in val) {
//         metals[key] = val as CorrosionMetal;
//       }
//     }
//     return {
//       corrosion: metals,
//       dissolved_oxygen_ppm: do_ppm,
//       corrosion_temp_c,
//     };
//   }
//   if (raw.corrosion && typeof raw.corrosion === "object") {
//     return {
//       corrosion: raw.corrosion,
//       dissolved_oxygen_ppm: raw.dissolved_oxygen_ppm,
//       corrosion_temp_c: raw.corrosion_temp_c,
//     };
//   }
//   const calc = raw.calculations ?? {};
//   const metals: Corrosion = {};
//   if ((calc as any).mild_steel_corrosion)
//     metals.mild_steel = (calc as any).mild_steel_corrosion;
//   if ((calc as any).copper_corrosion)
//     metals.copper = (calc as any).copper_corrosion;
//   if ((calc as any).admiralty_brass_corrosion)
//     metals.admiralty_brass = (calc as any).admiralty_brass_corrosion;
//   return {
//     corrosion: metals,
//     dissolved_oxygen_ppm: raw.dissolved_oxygen_ppm,
//     corrosion_temp_c: raw.corrosion_temp_c,
//   };
// }

// // ─── Point mappers ────────────────────────────────────────────────────────────

// function mapPointToGridResult(p: any, saltId: string | null): GridResult {
//   const saturation_indices: Record<string, SIEntry> = {};
//   for (const [key, val] of Object.entries(p.all_si ?? {})) {
//     const v = val as any;
//     saturation_indices[key] = {
//       SI: v.SI ?? 0,
//       SR: v.SR,
//       log_IAP: v.log_IAP,
//       log_K: v.log_K,
//       chemical_formula: v.chemical_formula,
//     };
//   }
//   const srValue: number = saltId
//     ? (saturation_indices[saltId]?.SR ??
//       saturation_indices[saltId]?.SI ??
//       p.si ??
//       0)
//     : (p.sr ?? p.si ?? 0);
//   const colorRaw: string = p.color ?? "green";
//   const color_code = (
//     ["green", "yellow", "red"].includes(colorRaw) ? colorRaw : "red"
//   ) as "green" | "yellow" | "red";
//   const lsiRisk =
//     color_code === "green"
//       ? "Low Scale"
//       : color_code === "yellow"
//         ? "Moderate"
//         : "High Scale";
//   const bar_data: BarData = {
//     color_hex:
//       p.color_hex ??
//       (color_code === "green"
//         ? "#2ECC71"
//         : color_code === "red"
//           ? "#E74C3C"
//           : "#F1C40F"),
//     opacity: p.opacity ?? 1,
//     sr_color: color_code,
//     sr_color_hex: p.color_hex ?? "#2ECC71",
//   };
//   const { corrosion, dissolved_oxygen_ppm, corrosion_temp_c } =
//     normaliseCorrosion(p as RawGridPoint);
//   return {
//     _grid_CoC: p.coc ?? p.CoC ?? 0,
//     _grid_temp: p.temperature ?? p.temp ?? 0,
//     _grid_pH: p.ph ?? p.pH ?? 0,
//     ionic_strength: p.ionic_strength ?? 0,
//     charge_balance_error_pct: p.charge_balance_error_pct,
//     saturation_indices,
//     color_code,
//     bar_data,
//     dissolved_oxygen_ppm: dissolved_oxygen_ppm ?? p.dissolved_oxygen_ppm,
//     corrosion_temp_c,
//     description_of_solution: p.description_of_solution ?? null,
//     distribution_of_species: p.distribution_of_species ?? null,
//     indices: {
//       lsi: { lsi: srValue, risk: lsiRisk, pHs: 0 },
//       ryznar: { ri: 0, risk: "N/A", pHs: 0 },
//       puckorius: { index: 0, risk: "N/A" },
//       larson_skold: { index: null, risk_level: "N/A" },
//       stiff_davis: { index: null, risk: "N/A", interpretation: "N/A" },
//       ccpp: { ccpp_ppm: null, risk: "N/A" },
//     },
//     corrosion,
//     corrosion_rate: p.corrosion_rate,
//   };
// }

// function normaliseRawPoint(d: RawGridPoint): GridResult {
//   if (d.indices && d.corrosion) return d as GridResult;
//   const calc = (d as any).calculations ?? {};
//   const { corrosion, dissolved_oxygen_ppm, corrosion_temp_c } =
//     normaliseCorrosion(d);
//   return {
//     ...(d as any),
//     dissolved_oxygen_ppm:
//       dissolved_oxygen_ppm ?? (d as any).dissolved_oxygen_ppm,
//     corrosion_temp_c,
//     description_of_solution: (d as any).description_of_solution ?? null,
//     distribution_of_species: (d as any).distribution_of_species ?? null,
//     indices: d.indices ?? {
//       lsi: calc.lsi ?? { lsi: 0, risk: "Unknown", pHs: 0 },
//       ryznar: calc.ryznar ?? { ri: 0, risk: "Unknown", pHs: 0 },
//       puckorius: calc.puckorius ?? { index: 0, risk: "Unknown" },
//       larson_skold: calc.larson_skold ?? { index: null, risk_level: "Unknown" },
//       stiff_davis: calc.stiff_davis ?? {
//         index: null,
//         risk: "",
//         interpretation: "",
//       },
//       ccpp: calc.ccpp ?? { ccpp_ppm: null, risk: "Unknown" },
//     },
//     corrosion,
//   };
// }

// // ─── API shape resolver ───────────────────────────────────────────────────────

// function resolveMeta(
//   apiResponse: SaturationApiResponseFlat | undefined,
// ): ResolvedMeta | null {
//   if (!apiResponse) return null;
//   const responseAny = apiResponse as any;

//   const topLevelGridResults: RawGridPoint[] =
//     responseAny?.data?.grid_results ?? responseAny?.grid_results ?? [];
//   if (topLevelGridResults.length > 0 && topLevelGridResults[0]?.bar_data) {
//     const tempUnit = (
//       responseAny?.data?.temp_unit ??
//       responseAny?.temp_unit ??
//       "F"
//     ).replace("°", "");
//     const saltId: string | null =
//       responseAny?.data?.salt_id ?? responseAny?.salt_id ?? null;
//     const gridResults: GridResult[] =
//       topLevelGridResults.map(normaliseRawPoint);
//     const summary = responseAny?.data?.summary ?? responseAny?.summary;
//     const availableSalts: string[] =
//       responseAny?.data?.available_salts ?? responseAny?.available_salts ?? [];
//     const cocVals = gridResults.map((d) => d._grid_CoC);
//     const tempVals = gridResults.map((d) => d._grid_temp);
//     return {
//       saltId,
//       saltsOfInterest: availableSalts,
//       dosagePpm: responseAny?.data?.dosage_ppm ?? responseAny?.dosage_ppm ?? 0,
//       cocMin: cocVals.length ? Math.min(...cocVals) : 0,
//       cocMax: cocVals.length ? Math.max(...cocVals) : 0,
//       tempMin: tempVals.length ? Math.min(...tempVals) : 0,
//       tempMax: tempVals.length ? Math.max(...tempVals) : 0,
//       tempUnit,
//       totalGridPoints: gridResults.length,
//       gridResults,
//       summary,
//     };
//   }

//   const graphData = responseAny?.data?.graph_data ?? responseAny?.graph_data;
//   if (graphData?.axes) {
//     const tempUnit = graphData.temp_unit?.replace("°", "") ?? "C";
//     const saltId: string | null = graphData.salt_id ?? null;
//     const cocValues: number[] = graphData.axes?.x?.values ?? [];
//     const tempValues: number[] = graphData.axes?.z?.values ?? [];
//     const rawPoints: any[] =
//       graphData.points ?? responseAny?.data?.points ?? [];
//     let gridResults: GridResult[];
//     if (rawPoints.length > 0) {
//       gridResults = rawPoints.map((p: any) => mapPointToGridResult(p, saltId));
//     } else {
//       gridResults = cocValues.flatMap((coc) =>
//         tempValues.map(
//           (temp): GridResult => ({
//             _grid_CoC: coc,
//             _grid_temp: temp,
//             _grid_pH: 7,
//             ionic_strength: 0,
//             saturation_indices: {},
//             color_code: "green",
//             bar_data: {
//               color_hex: "#2ECC71",
//               opacity: 1,
//               sr_color: "green",
//               sr_color_hex: "#2ECC71",
//             },
//             indices: {
//               lsi: { lsi: 0, risk: "N/A", pHs: 0 },
//               ryznar: { ri: 0, risk: "N/A", pHs: 0 },
//               puckorius: { index: 0, risk: "N/A" },
//               larson_skold: { index: null, risk_level: "N/A" },
//               stiff_davis: { index: null, risk: "N/A", interpretation: "N/A" },
//               ccpp: { ccpp_ppm: null, risk: "N/A" },
//             },
//             corrosion: {},
//           }),
//         ),
//       );
//     }
//     const summary = responseAny?.data?.summary;
//     const cocVals = gridResults.map((d) => d._grid_CoC);
//     const tempVals = gridResults.map((d) => d._grid_temp);
//     return {
//       saltId,
//       saltsOfInterest: graphData.available_salts ?? [],
//       dosagePpm: 0,
//       cocMin: cocVals.length ? Math.min(...cocVals) : 0,
//       cocMax: cocVals.length ? Math.max(...cocVals) : 0,
//       tempMin: tempVals.length ? Math.min(...tempVals) : 0,
//       tempMax: tempVals.length ? Math.max(...tempVals) : 0,
//       tempUnit,
//       totalGridPoints: graphData.total_points ?? gridResults.length,
//       gridResults,
//       summary,
//     };
//   }

//   const chartData = responseAny?.data?.chart_data;
//   if (chartData?.points) {
//     const tempUnit = chartData.temp_unit?.replace("°", "") ?? "C";
//     const saltId: string | null = chartData.salt_id ?? null;
//     const gridResults: GridResult[] = chartData.points.map((p: any) =>
//       mapPointToGridResult(p, saltId),
//     );
//     const summary = responseAny?.data?.summary;
//     const availableSalts: string[] = chartData.available_salts ?? [];
//     const cocVals = gridResults.map((d) => d._grid_CoC);
//     const tempVals = gridResults.map((d) => d._grid_temp);
//     return {
//       saltId,
//       saltsOfInterest: availableSalts,
//       dosagePpm: 0,
//       cocMin: Math.min(...cocVals),
//       cocMax: Math.max(...cocVals),
//       tempMin: Math.min(...tempVals),
//       tempMax: Math.max(...tempVals),
//       tempUnit,
//       totalGridPoints: chartData.total_points,
//       gridResults,
//       summary,
//     };
//   }

//   type SrcShape = Partial<SaturationApiResponseFlat> & {
//     grid_results?: RawGridPoint[];
//   };
//   let src: SrcShape = apiResponse as SrcShape;
//   if (src.data && typeof src.data === "object") {
//     if (src.data.aiResponse && typeof src.data.aiResponse === "object")
//       src = src.data.aiResponse as SrcShape;
//     else src = src.data as SrcShape;
//   }
//   const rawGrid: RawGridPoint[] = (src.grid_results as RawGridPoint[]) ?? [];
//   const gridResults: GridResult[] = rawGrid.map(normaliseRawPoint);
//   return {
//     saltId: (src.salt_id as string | null) ?? null,
//     saltsOfInterest: (src.salts_of_interest as string[]) ?? [],
//     dosagePpm: (src.dosage_ppm as number) ?? 0,
//     cocMin: (src.coc_min as number) ?? 0,
//     cocMax: (src.coc_max as number) ?? 0,
//     tempMin: (src.temp_min as number) ?? 0,
//     tempMax: (src.temp_max as number) ?? 0,
//     tempUnit: (src.temp_unit as string) ?? "C",
//     phMode: src.ph_mode as string | undefined,
//     totalGridPoints: src.total_grid_points as number | undefined,
//     gridResults,
//     summary: src.summary as ResolvedMeta["summary"],
//     baseWaterParameters:
//       src.base_water_parameters as ResolvedMeta["baseWaterParameters"],
//     assetInfo: src.asset_info as ResolvedMeta["assetInfo"],
//   };
// }

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
//   yellow: "bg-amber-50   text-amber-700   border border-amber-200",
//   red: "bg-red-50     text-red-700     border border-red-200",
//   green: "bg-gray-100   text-gray-600    border border-gray-300",
//   info: "bg-blue-50    text-blue-700    border border-blue-200",
//   warn: "bg-orange-50  text-orange-700  border border-orange-200",
// };

// function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
//   const v: BadgeVariant = variant ?? getBadgeVariant(text);
//   return (
//     <span
//       className={`text-[12px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap ${badgeCls[v]}`}
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
//     <div className="flex justify-between items-center py-[6px] border-b border-slate-100 gap-2 last:border-0">
//       <span
//         className={`text-[13px] shrink-0 ${bold ? "font-semibold text-slate-800" : "text-slate-500"}`}
//       >
//         {label}
//       </span>
//       <span
//         className={`text-[13px] flex items-center gap-1 flex-wrap justify-end ${bold ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}
//       >
//         {value}
//         {badge && <Badge text={badge} />}
//       </span>
//     </div>
//   );
// }

// function SSection({ title, children }: { title: string; children: ReactNode }) {
//   return (
//     <div className="mb-5">
//       <div className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-2 pb-1 border-b border-slate-200">
//         {title}
//       </div>
//       {children}
//     </div>
//   );
// }

// // ─── CSS2D label helper ───────────────────────────────────────────────────────

// interface LabelOpts {
//   color?: string;
//   fontSize?: string;
//   fontWeight?: string;
//   background?: string;
//   padding?: string;
// }

// function makeLabel(text: string, opts: LabelOpts = {}): CSS2DObject {
//   const div = document.createElement("div");
//   div.textContent = text;
//   div.style.color = opts.color ?? "rgba(30,41,59,0.85)";
//   div.style.fontSize = opts.fontSize ?? "10px";
//   div.style.fontWeight = opts.fontWeight ?? "500";
//   div.style.fontFamily = "ui-monospace,'Cascadia Code','Fira Code',monospace";
//   div.style.whiteSpace = "nowrap";
//   div.style.pointerEvents = "none";
//   div.style.userSelect = "none";
//   div.style.letterSpacing = "0.03em";
//   div.style.lineHeight = "1";
//   if (opts.background) {
//     div.style.background = opts.background;
//     div.style.padding = opts.padding ?? "2px 5px";
//     div.style.borderRadius = "3px";
//     div.style.boxShadow = "0 1px 3px rgba(0,0,0,0.10)";
//   }
//   return new CSS2DObject(div);
// }

// // ─── Build scene ──────────────────────────────────────────────────────────────

// interface BuiltScene {
//   renderer: THREE.WebGLRenderer;
//   labelRenderer: CSS2DRenderer;
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   barMeshes: THREE.Mesh[];
//   initDist: number;
//   initLookAtY: number;
// }

// function buildScene(
//   canvas: HTMLCanvasElement,
//   wrap: HTMLDivElement,
//   gridResults: GridResult[],
//   activeSaltId: string | null,
//   cocUniq: number[],
//   tempUniq: number[],
//   maxSR: number,
//   tempUnit: string,
// ): BuiltScene {
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     antialias: true,
//     alpha: false,
//   });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setClearColor(0xf8fafc, 1);

//   const labelRenderer = new CSS2DRenderer();
//   const labelEl = labelRenderer.domElement;
//   labelEl.style.position = "absolute";
//   labelEl.style.top = "0";
//   labelEl.style.left = "0";
//   labelEl.style.width = "100%";
//   labelEl.style.height = "100%";
//   labelEl.style.pointerEvents = "none";
//   labelEl.style.overflow = "hidden";
//   labelEl.style.zIndex = "10";
//   wrap.appendChild(labelEl);

//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xf8fafc);
//   const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2000);

//   scene.add(new THREE.AmbientLight(0xffffff, 0.85));
//   const sun = new THREE.DirectionalLight(0xffffff, 0.9);
//   sun.position.set(15, 30, 15);
//   scene.add(sun);
//   const fill = new THREE.DirectionalLight(0xdbeafe, 0.35);
//   fill.position.set(-15, 8, -10);
//   scene.add(fill);
//   const bounce = new THREE.DirectionalLight(0xfef9c3, 0.2);
//   bounce.position.set(0, -10, 0);
//   scene.add(bounce);

//   const nCoC = cocUniq.length;
//   const nTemp = tempUniq.length;
//   const cocOffset = -((nCoC - 1) * SPACING) / 2;
//   const tempOffset = -((nTemp - 1) * SPACING) / 2;
//   const xMin = cocOffset - SPACING / 2;
//   const xMax = (nCoC - 1) * SPACING + cocOffset + SPACING / 2;
//   const zMin = tempOffset - SPACING / 2;
//   const zMax = (nTemp - 1) * SPACING + tempOffset + SPACING / 2;
//   const axOriginX = xMin - 0.3;
//   const axOriginY = 0;
//   const axOriginZ = zMax + 0.3;

//   const barMeshes: THREE.Mesh[] = [];

//   gridResults.forEach((d: GridResult) => {
//     const srValue: number = activeSaltId
//       ? (d.saturation_indices[activeSaltId]?.SR ?? 0)
//       : Math.max(
//           0,
//           ...Object.values(d.saturation_indices).map((e) => e.SR ?? 0),
//         );
//     const displayVal = Math.abs(srValue);
//     const h = Math.min(
//       BAR_MAX_H,
//       Math.max(0.15, (displayVal / maxSR) * BAR_MAX_H),
//     );
//     const ci = cocUniq.indexOf(d._grid_CoC);
//     const ti = tempUniq.indexOf(d._grid_temp);
//     const x = ci * SPACING + cocOffset;
//     const z = ti * SPACING + tempOffset;

//     let clr: number;
//     if (d.bar_data) {
//       clr = barColorFromBarData(d.bar_data);
//     } else {
//       const t = Math.min(1, maxSR > 0 ? displayVal / maxSR : 0);
//       if (d.color_code === "green")
//         clr =
//           t > 0.5
//             ? lightenHex("#064e3b", 1 - (t - 0.5) * 1.2)
//             : lightenHex("#d1fae5", t * 0.5);
//       else if (d.color_code === "yellow")
//         clr =
//           t > 0.5
//             ? lightenHex("#92400e", 1 - (t - 0.5) * 1.2)
//             : lightenHex("#fef9c3", t * 0.5);
//       else
//         clr =
//           t > 0.5
//             ? lightenHex("#7f1d1d", 1 - (t - 0.5) * 1.2)
//             : lightenHex("#fee2e2", t * 0.5);
//     }

//     const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
//     const mat = new THREE.MeshPhongMaterial({ color: clr, shininess: 60 });
//     const mesh = new THREE.Mesh(geo, mat);
//     mesh.position.set(x, h / 2, z);
//     mesh.userData = { data: d, origColor: clr, h };
//     scene.add(mesh);
//     barMeshes.push(mesh);
//     mesh.add(
//       new THREE.LineSegments(
//         new THREE.EdgesGeometry(geo),
//         new THREE.LineBasicMaterial({
//           color: 0x000000,
//           transparent: true,
//           opacity: 0.08,
//         }),
//       ),
//     );
//   });

//   const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
//   const gridHelper = new THREE.GridHelper(
//     gridW + 4,
//     (nCoC + nTemp) * 3,
//     0x64748b,
//     0x94a3b8,
//   );
//   gridHelper.position.y = -0.01;
//   scene.add(gridHelper);

//   const mkLine = (pts: THREE.Vector3[], color: number, opacity = 0.7): void => {
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints(pts),
//         new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
//       ),
//     );
//   };
//   const AX_COC = 0x2563eb;
//   const AX_TEMP = 0xea580c;
//   const AX_SR = 0x059669;
//   const yAxisTop = BAR_MAX_H + 2.0;
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//       new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     ],
//     AX_COC,
//     0.9,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//     ],
//     AX_TEMP,
//     0.9,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, 0, axOriginZ),
//       new THREE.Vector3(axOriginX, yAxisTop, axOriginZ),
//     ],
//     AX_SR,
//     0.9,
//   );

//   const mkArrow = (
//     dir: THREE.Vector3,
//     origin: THREE.Vector3,
//     color: number,
//   ): void => {
//     scene.add(
//       new THREE.ArrowHelper(dir.normalize(), origin, 0.7, color, 0.35, 0.18),
//     );
//   };
//   mkArrow(
//     new THREE.Vector3(1, 0, 0),
//     new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     AX_COC,
//   );
//   mkArrow(
//     new THREE.Vector3(0, 0, -1),
//     new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//     AX_TEMP,
//   );
//   mkArrow(
//     new THREE.Vector3(0, 1, 0),
//     new THREE.Vector3(axOriginX, yAxisTop, axOriginZ),
//     AX_SR,
//   );

//   cocUniq.forEach((coc, ci) => {
//     const x = ci * SPACING + cocOffset;
//     const lbl = makeLabel(`CoC ${coc}`, {
//       color: "#1d4ed8",
//       fontSize: "10px",
//       fontWeight: "700",
//       background: "rgba(219,234,254,0.80)",
//       padding: "1px 5px",
//     });
//     lbl.position.set(x, 0, axOriginZ + 0.9);
//     scene.add(lbl);
//     mkLine(
//       [
//         new THREE.Vector3(x, 0, axOriginZ),
//         new THREE.Vector3(x, 0, axOriginZ + 0.45),
//       ],
//       AX_COC,
//       0.4,
//     );
//     mkLine(
//       [new THREE.Vector3(x, 0, zMin - 0.3), new THREE.Vector3(x, 0, axOriginZ)],
//       0x93c5fd,
//       0.15,
//     );
//   });
//   const cocTitle = makeLabel("← Cycles of Concentration (CoC) →", {
//     color: "#1d4ed8",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   cocTitle.position.set((xMin + xMax) / 2, 0, axOriginZ + 2.1);
//   scene.add(cocTitle);

//   tempUniq.forEach((temp, ti) => {
//     const z = ti * SPACING + tempOffset;
//     const lbl = makeLabel(`${temp}°${tempUnit}`, {
//       color: "#c2410c",
//       fontSize: "10px",
//       fontWeight: "700",
//       background: "rgba(254,215,170,0.80)",
//       padding: "1px 5px",
//     });
//     lbl.position.set(axOriginX - 1.0, 0, z);
//     scene.add(lbl);
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, 0, z),
//         new THREE.Vector3(axOriginX - 0.45, 0, z),
//       ],
//       AX_TEMP,
//       0.4,
//     );
//     mkLine(
//       [new THREE.Vector3(axOriginX, 0, z), new THREE.Vector3(xMax + 0.3, 0, z)],
//       0xfed7aa,
//       0.15,
//     );
//   });
//   const tempTitle = makeLabel("← Temperature →", {
//     color: "#c2410c",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   tempTitle.position.set(axOriginX - 2.0, 0, (zMin + zMax) / 2);
//   scene.add(tempTitle);

//   const safMaxSR = maxSR > 0 ? maxSR : 1;
//   const srStep =
//     safMaxSR <= 1
//       ? 0.25
//       : safMaxSR <= 2
//         ? 0.5
//         : safMaxSR <= 5
//           ? 1.0
//           : safMaxSR <= 20
//             ? 5
//             : 10;
//   const srTicks: number[] = [];
//   for (
//     let v = 0;
//     v <= safMaxSR + srStep * 0.5 && srTicks.length < 50;
//     v += srStep
//   )
//     srTicks.push(parseFloat(v.toFixed(3)));
//   srTicks.forEach((v) => {
//     const yPos = (v / maxSR) * BAR_MAX_H;
//     const lbl = makeLabel(v.toFixed(2), {
//       color: "#065f46",
//       fontSize: "10px",
//       fontWeight: "600",
//       background: "rgba(209,250,229,0.80)",
//       padding: "1px 4px",
//     });
//     lbl.position.set(axOriginX - 0.7, yPos, axOriginZ);
//     scene.add(lbl);
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, yPos, axOriginZ),
//         new THREE.Vector3(axOriginX - 0.4, yPos, axOriginZ),
//       ],
//       AX_SR,
//       0.4,
//     );
//     if (v > 0)
//       mkLine(
//         [
//           new THREE.Vector3(axOriginX, yPos, axOriginZ),
//           new THREE.Vector3(xMax + 0.3, yPos, axOriginZ),
//         ],
//         0xa7f3d0,
//         0.16,
//       );
//   });
//   const srTitle = makeLabel(
//     activeSaltId
//       ? `Saturation Ratio (SR) — ${activeSaltId}`
//       : "Saturation Ratio (SR)",
//     { color: "#065f46", fontSize: "11px", fontWeight: "700" },
//   );
//   srTitle.position.set(axOriginX - 0.7, yAxisTop + 0.5, axOriginZ);
//   scene.add(srTitle);

//   const nMax = Math.max(nCoC, nTemp);
//   const spreadXZ = nMax * SPACING;
//   const initDist = Math.max(28, spreadXZ * 2.2);
//   return {
//     renderer,
//     labelRenderer,
//     scene,
//     camera,
//     barMeshes,
//     initDist,
//     initLookAtY: BAR_MAX_H * 0.4,
//   };
// }

// // ─── SceneState ───────────────────────────────────────────────────────────────

// interface SceneState {
//   renderer: THREE.WebGLRenderer;
//   labelRenderer: CSS2DRenderer;
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   barMeshes: THREE.Mesh[];
//   rotY: number;
//   rotX: number;
//   dist: number;
//   panX: number;
//   panY: number;
//   panZ: number;
//   isDragging: boolean;
//   isPanning: boolean;
//   prevX: number;
//   prevY: number;
//   hoveredMesh: THREE.Mesh | null;
//   selectedMesh: THREE.Mesh | null;
//   animId: number;
// }

// // ─── Corrosion sidebar section ────────────────────────────────────────────────

// function CorrosionSection({
//   d,
//   saltsOfInterest,
// }: {
//   d: GridResult;
//   saltsOfInterest: string[];
// }) {
//   const metals = d.corrosion;
//   const hasMetals = Object.keys(metals).length > 0;
//   const doPpm =
//     d.dissolved_oxygen_ppm ?? (d.corrosion_rate?.do_ppm as number | undefined);
//   const tempC =
//     d.corrosion_temp_c ?? (d.corrosion_rate?.temp_c as number | undefined);
//   if (!hasMetals && doPpm == null && tempC == null) return null;
//   return (
//     <SSection title="Corrosion">
//       {(doPpm != null || tempC != null) && (
//         <div className="mb-3 flex gap-2 flex-wrap">
//           {doPpm != null && (
//             <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1.5">
//               <span className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">
//                 DO
//               </span>
//               <span className="text-[13px] font-bold text-blue-700">
//                 {doPpm.toFixed(2)}
//               </span>
//               <span className="text-[11px] text-blue-400">ppm</span>
//             </div>
//           )}
//           {tempC != null && (
//             <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1.5">
//               <span className="text-[11px] text-orange-400 font-semibold uppercase tracking-wider">
//                 Temp
//               </span>
//               <span className="text-[13px] font-bold text-orange-700">
//                 {tempC}
//               </span>
//               <span className="text-[11px] text-orange-400">°C</span>
//             </div>
//           )}
//         </div>
//       )}
//       {hasMetals &&
//         Object.entries(metals).map(([key, metal]) => {
//           if (!metal) return null;
//           const label = key
//             .replace(/_/g, " ")
//             .replace(/\b\w/g, (c) => c.toUpperCase());
//           const inhibitionPct = metal.total_inhibition_percent;
//           const hasTreatment =
//             metal.cr_base_mpy != null && metal.cr_mpy !== metal.cr_base_mpy;
//           return (
//             <div
//               key={key}
//               className="py-[8px] border-b border-slate-100 last:border-0"
//             >
//               <div className="flex justify-between items-center mb-1.5">
//                 <span className="text-[13px] text-slate-700 font-semibold">
//                   {label}
//                 </span>
//                 <Badge text={metal.rating} />
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-[12px] text-slate-400">
//                   Corrosion Rate (treated)
//                 </span>
//                 <span className="text-[13px] font-bold text-slate-700">
//                   {metal.cr_mpy.toFixed(2)}{" "}
//                   <span className="text-[11px] font-normal text-slate-400">
//                     mpy
//                   </span>
//                 </span>
//               </div>
//               {hasTreatment && metal.cr_base_mpy != null && (
//                 <div className="flex justify-between items-center mt-0.5">
//                   <span className="text-[12px] text-slate-400">
//                     Base rate (untreated)
//                   </span>
//                   <span className="text-[12px] text-slate-500">
//                     {metal.cr_base_mpy.toFixed(2)}{" "}
//                     <span className="text-[11px] text-slate-400">mpy</span>
//                   </span>
//                 </div>
//               )}
//               {!hasTreatment && metal.cr_base_mpy != null && (
//                 <div className="flex justify-between items-center mt-0.5">
//                   <span className="text-[12px] text-slate-400">Base rate</span>
//                   <span className="text-[12px] text-slate-500">
//                     {metal.cr_base_mpy.toFixed(2)}{" "}
//                     <span className="text-[11px] text-slate-400">mpy</span>
//                   </span>
//                 </div>
//               )}
//               {inhibitionPct != null && (
//                 <div className="flex justify-between items-center mt-0.5">
//                   <span className="text-[12px] text-slate-400">Inhibition</span>
//                   <span className="text-[12px] font-semibold text-emerald-600">
//                     −{inhibitionPct}%
//                   </span>
//                 </div>
//               )}
//               {metal.note && (
//                 <p className="text-[11px] text-slate-300 italic mt-1">
//                   {metal.note}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//     </SSection>
//   );
// }

// // ─── DescriptionSolutionPanel ─────────────────────────────────────────────────

// function DescriptionSolutionPanel({
//   d,
//   tempUnit,
// }: {
//   d: GridResult;
//   tempUnit: string;
// }) {
//   const ds = d.description_of_solution;

//   // Build the full row data from all available sources
//   const row = {
//     coc: d._grid_CoC,
//     temperature: d._grid_temp,
//     temp_unit: `°${tempUnit}`,
//     temperature_c: d._grid_temp_c ?? ds?.temperature_C ?? d._grid_temp,
//     ph: ds?.pH ?? d._grid_pH,
//     specific_conductance:
//       ds?.specific_conductance ?? (d as any).specific_conductance ?? 0,
//     activity_of_water: ds?.activity_of_water ?? 0,
//     charge_balance_error_pct: d.charge_balance_error_pct ?? 0,
//     density: ds?.density ?? (d as any).density ?? 0,
//     dissolved_oxygen_ppm:
//       d.dissolved_oxygen_ppm ?? d.corrosion_rate?.do_ppm ?? 0,
//     electrical_balance: (d as any).electrical_balance ?? 0,
//     ionic_strength: ds?.ionic_strength_desc ?? d.ionic_strength ?? 0,
//     mass_of_water_kg: ds?.mass_of_water_kg ?? 0,
//   };

//   function tempColor(t: number) {
//     if (t >= 25) return { bg: "#FEE2E2", text: "#B91C1C" };
//     if (t >= 18) return { bg: "#FFEDD5", text: "#C2410C" };
//     if (t >= 10) return { bg: "#FEF9C3", text: "#92400E" };
//     return { bg: "#DCFCE7", text: "#15803D" };
//   }

//   function chargeColor(v: number) {
//     return Math.abs(v) > 5
//       ? { bg: "#FEE2E2", text: "#B91C1C" }
//       : { bg: "#DCFCE7", text: "#15803D" };
//   }

//   const Pill = ({
//     bg,
//     text,
//     children,
//   }: {
//     bg: string;
//     text: string;
//     children: ReactNode;
//   }) => (
//     <span
//       style={{ background: bg, color: text }}
//       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tabular-nums whitespace-nowrap"
//     >
//       {children}
//     </span>
//   );

//   const tc = tempColor(row.temperature);
//   const cc = chargeColor(row.charge_balance_error_pct);

//   const items = [
//     {
//       icon: <Beaker className="w-3.5 h-3.5" />,
//       label: "CoC",
//       el: (
//         <Pill bg="#EDE9FE" text="#5B21B6">
//           {row.coc}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Thermometer className="w-3.5 h-3.5" />,
//       label: "Temperature",
//       el: (
//         <Pill bg={tc.bg} text={tc.text}>
//           {row.temperature}
//           {row.temp_unit}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Thermometer className="w-3.5 h-3.5" />,
//       label: "Temp °C",
//       el: (
//         <Pill bg="#E0F2FE" text="#0369A1">
//           {row.temperature_c}°C
//         </Pill>
//       ),
//     },
//     {
//       icon: <FlaskConical className="w-3.5 h-3.5" />,
//       label: "pH",
//       el: (
//         <Pill bg="#D1FAE5" text="#065F46">
//           {row.ph}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Zap className="w-3.5 h-3.5" />,
//       label: "Conductance",
//       el: (
//         <Pill bg="#CFFAFE" text="#0E7490">
//           {row.specific_conductance}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Droplets className="w-3.5 h-3.5" />,
//       label: "Activity H₂O",
//       el: (
//         <Pill bg="#DBEAFE" text="#1D4ED8">
//           {row.activity_of_water}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Activity className="w-3.5 h-3.5" />,
//       label: "Charge Bal. %",
//       el: (
//         <Pill bg={cc.bg} text={cc.text}>
//           {row.charge_balance_error_pct}%
//         </Pill>
//       ),
//     },
//     {
//       icon: <Scale className="w-3.5 h-3.5" />,
//       label: "Density",
//       el: (
//         <Pill bg="#EDE9FE" text="#6D28D9">
//           {row.density}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Wind className="w-3.5 h-3.5" />,
//       label: "DO (ppm)",
//       el: (
//         <Pill bg="#FCE7F3" text="#9D174D">
//           {typeof row.dissolved_oxygen_ppm === "number"
//             ? row.dissolved_oxygen_ppm.toFixed(4)
//             : row.dissolved_oxygen_ppm}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Zap className="w-3.5 h-3.5" />,
//       label: "Elec. Balance",
//       el: (
//         <Pill bg="#FEF3C7" text="#92400E">
//           {typeof row.electrical_balance === "number"
//             ? row.electrical_balance.toExponential(3)
//             : row.electrical_balance}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Activity className="w-3.5 h-3.5" />,
//       label: "Ionic Strength",
//       el: (
//         <Pill bg="#CCFBF1" text="#0F766E">
//           {row.ionic_strength}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Scale className="w-3.5 h-3.5" />,
//       label: "Mass H₂O",
//       el: (
//         <Pill bg="#F1F5F9" text="#475569">
//           {row.mass_of_water_kg} kg
//         </Pill>
//       ),
//     },
//   ];

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700">
//         <div className="flex items-center gap-2">
//           <FlaskConical className="w-4 h-4 text-cyan-400" />
//           <span className="text-[12px] font-bold tracking-widest uppercase text-white">
//             Description of Solution
//           </span>
//           <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
//             CoC {d._grid_CoC} · {d._grid_temp}°{tempUnit}
//           </span>
//         </div>
//       </div>
//       {/* Grid of pills */}
//       <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
//         {items.map(({ icon, label, el }) => (
//           <div key={label} className="flex flex-col gap-1 min-w-0">
//             <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1 truncate">
//               <span className="text-slate-300">{icon}</span>
//               {label}
//             </span>
//             <div>{el}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── DistributionOfSpeciesPanel ───────────────────────────────────────────────

// function DistributionOfSpeciesPanel({
//   d,
//   tempUnit,
// }: {
//   d: GridResult;
//   tempUnit: string;
// }) {
//   const [search, setSearch] = useState("");
//   const rawDist = d.distribution_of_species;
//   if (!rawDist || Object.keys(rawDist).length === 0) return null;

//   const speciesList = Object.entries(rawDist)
//     .map(([species, entry]) => ({
//       species,
//       molality: entry.molality,
//       activity: entry.activity,
//       element: entry.element ?? null,
//     }))
//     .sort((a, b) => Math.abs(b.molality) - Math.abs(a.molality));

//   const filtered = search.trim()
//     ? speciesList.filter(
//         (s) =>
//           s.species.toLowerCase().includes(search.toLowerCase()) ||
//           (s.element ?? "").toLowerCase().includes(search.toLowerCase()),
//       )
//     : speciesList;

//   const fmt = (n: number) => {
//     if (n === 0) return "0";
//     const abs = Math.abs(n);
//     if (abs < 1e-4 || abs >= 1e4) return n.toExponential(3);
//     return n.toPrecision(4);
//   };

//   // color by element family
//   const ELEMENT_COLORS: Record<string, { bg: string; text: string }> = {
//     Ca: { bg: "#DBEAFE", text: "#1E40AF" },
//     Mg: { bg: "#D1FAE5", text: "#065F46" },
//     "C(4)": { bg: "#FEF3C7", text: "#92400E" },
//     "S(6)": { bg: "#FCE7F3", text: "#9D174D" },
//     P: { bg: "#EDE9FE", text: "#5B21B6" },
//     Cl: { bg: "#CFFAFE", text: "#0E7490" },
//     Si: { bg: "#CCFBF1", text: "#0F766E" },
//     Na: { bg: "#FEE2E2", text: "#991B1B" },
//     K: { bg: "#FFEDD5", text: "#9A3412" },
//   };

//   const getElemStyle = (el: string | null) => {
//     if (!el) return { bg: "#F1F5F9", text: "#475569" };
//     return ELEMENT_COLORS[el] ?? { bg: "#F1F5F9", text: "#475569" };
//   };

//   const molalityBar = (mol: number, max: number) => {
//     if (max === 0) return 0;
//     return Math.min(100, (Math.abs(mol) / max) * 100);
//   };
//   const maxMol = speciesList[0]?.molality ?? 1;

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-indigo-900 to-indigo-800">
//         <div className="flex items-center gap-2">
//           <Droplets className="w-4 h-4 text-indigo-300" />
//           <span className="text-[12px] font-bold tracking-widest uppercase text-white">
//             Distribution of Species
//           </span>
//           <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-400/20 text-indigo-200 border border-indigo-400/30">
//             {speciesList.length} species · CoC {d._grid_CoC}
//           </span>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
//         <input
//           type="text"
//           placeholder="Search species or element…"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full text-[12px] px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300 placeholder-slate-300"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-auto max-h-[340px]">
//         <table className="w-full text-[12px] border-collapse">
//           <thead className="sticky top-0 z-10">
//             <tr className="bg-slate-100">
//               <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
//                 Species
//               </th>
//               <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
//                 Molality
//               </th>
//               <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
//                 Activity
//               </th>
//               <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
//                 Element
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((item, idx) => {
//               const es = getElemStyle(item.element);
//               const barPct = molalityBar(item.molality, maxMol);
//               return (
//                 <tr
//                   key={item.species}
//                   className={`border-b border-slate-50 hover:bg-indigo-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
//                 >
//                   {/* Species */}
//                   <td className="px-3 py-2 font-mono font-semibold text-slate-800 whitespace-nowrap">
//                     {item.species}
//                   </td>
//                   {/* Molality + bar */}
//                   <td className="px-3 py-2">
//                     <div className="flex flex-col gap-0.5">
//                       <span className="font-semibold text-blue-700 tabular-nums">
//                         {fmt(item.molality)}
//                       </span>
//                       <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden">
//                         <div
//                           className="h-full rounded-full bg-blue-400 transition-all duration-300"
//                           style={{ width: `${barPct}%` }}
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   {/* Activity */}
//                   <td className="px-3 py-2">
//                     <span className="font-semibold text-emerald-700 tabular-nums">
//                       {fmt(item.activity)}
//                     </span>
//                   </td>
//                   {/* Element badge */}
//                   <td className="px-3 py-2">
//                     {item.element ? (
//                       <span
//                         style={{ background: es.bg, color: es.text }}
//                         className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold"
//                       >
//                         {item.element}
//                       </span>
//                     ) : (
//                       <span className="text-slate-300 italic text-[11px]">
//                         —
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         {filtered.length === 0 && (
//           <div className="py-8 text-center text-[12px] text-slate-400 italic">
//             No matching species found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Props ────────────────────────────────────────────────────────────────────

// interface Props {
//   apiResponse?: SaturationApiResponseFlat;
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function SaturationDashboard({ apiResponse }: Props) {
//   const [activeResponse, setActiveResponse] = useState<
//     SaturationApiResponseFlat | undefined
//   >(apiResponse);
//   const [unavailableModal, setUnavailableModal] = useState<{
//     salt: string;
//     reason: string;
//   } | null>(null);
//   const [bottomPanelOpen, setBottomPanelOpen] = useState(false);
//   const [bottomTab, setBottomTab] = useState<"description" | "species">(
//     "description",
//   );

//   useEffect(() => {
//     setActiveResponse(apiResponse);
//   }, [apiResponse]);

//   const meta = useMemo(() => resolveMeta(activeResponse), [activeResponse]);
//   const gridResults = useMemo(
//     (): GridResult[] => meta?.gridResults ?? [],
//     [meta],
//   );
//   const baseSaltId: string | null = meta?.saltId ?? null;

//   const [saltAnaliysis, { isLoading }] = useSaltAnalysisMutation();

//   const runId: string | undefined = useMemo(() => {
//     if (!apiResponse) return undefined;
//     const any = apiResponse as any;
//     return apiResponse.run_id ?? any?.data?.run_id ?? undefined;
//   }, [apiResponse]);

//   const [activeSaltId, setActiveSaltId] = useState<string | null>(baseSaltId);
//   useEffect(() => {
//     setActiveSaltId(baseSaltId);
//   }, [baseSaltId]);

//   const handleSaltChipClick = useCallback(
//     async (salt: string) => {
//       if (salt === activeSaltId) {
//         setActiveSaltId(null);
//         setActiveResponse(apiResponse);
//         return;
//       }
//       if (!runId) {
//         setActiveSaltId(salt);
//         return;
//       }
//       setActiveSaltId(salt);
//       try {
//         const result = await saltAnaliysis({
//           run_id: runId,
//           salt_id: salt,
//         }).unwrap();
//         setActiveResponse(result as SaturationApiResponseFlat);
//       } catch (err) {
//         console.error("Salt analysis API error:", err);
//       }
//     },
//     [activeSaltId, apiResponse, runId, saltAnaliysis],
//   );

//   const handleResetToSR = useCallback(() => {
//     setActiveSaltId(null);
//     setActiveResponse(apiResponse);
//   }, [apiResponse]);

//   const dosage = meta?.dosagePpm ?? 0;
//   const cocMin = meta?.cocMin ?? 0;
//   const cocMax = meta?.cocMax ?? 0;
//   const tempMin = meta?.tempMin ?? 0;
//   const tempMax = meta?.tempMax ?? 0;
//   const tempUnit = meta?.tempUnit ?? "C";
//   const assetName = meta?.assetInfo?.name;
//   const summary = meta?.summary;

//   const saltsOfInterest = useMemo((): string[] => {
//     const responseAny = apiResponse as any;
//     let salts: string[] =
//       responseAny?.data?.available_salts ??
//       responseAny?.data?.graph_data?.available_salts ??
//       responseAny?.graph_data?.available_salts ??
//       responseAny?.data?.aiResponse?.available_salts ??
//       responseAny?.available_salts ??
//       [];
//     if (salts.length === 0) {
//       salts =
//         responseAny?.salts_of_interest ??
//         responseAny?.data?.aiResponse?.salts_of_interest ??
//         responseAny?.data?.salts_of_interest ??
//         [];
//     }
//     const currentSalt = activeSaltId || baseSaltId;
//     if (currentSalt && !salts.includes(currentSalt))
//       salts = [currentSalt, ...salts];
//     return salts;
//   }, [apiResponse, activeSaltId, baseSaltId]);

//   const unavailableSalts = useMemo(() => {
//     const responseAny = apiResponse as any;
//     const unavailableRaw =
//       responseAny?.data?.aiResponse?.unavailable_salts ??
//       responseAny?.unavailable_salts ??
//       responseAny?.data?.unavailable_salts ??
//       [];
//     return unavailableRaw.map((item: any) => ({
//       salt: item.salt || item.name,
//       reason: item.reason || "Not available in this analysis.",
//     }));
//   }, [apiResponse]);

//   const cocUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_CoC))].sort((a, b) => a - b),
//     [gridResults],
//   );
//   const tempUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_temp))].sort((a, b) => b - a),
//     [gridResults],
//   );

//   const maxSR = useMemo((): number => {
//     if (!gridResults.length) return 1;
//     if (activeSaltId) {
//       const vals = gridResults.map((d) =>
//         Math.abs(
//           d.saturation_indices[activeSaltId]?.SR ??
//             d.saturation_indices[activeSaltId]?.SI ??
//             0,
//         ),
//       );
//       return Math.max(...vals, 1);
//     }
//     const vals = gridResults.map((d) => Math.abs(d.indices?.lsi?.lsi ?? 0));
//     return Math.max(...vals, 1);
//   }, [gridResults, activeSaltId]);

//   // ── Resizable sidebar ──────────────────────────────────────────────────────
//   const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
//   const isResizingRef = useRef(false);
//   const resizeStartXRef = useRef(0);
//   const resizeStartWidthRef = useRef(SIDEBAR_DEFAULT);

//   const onResizeMouseDown = useCallback(
//     (e: RMouseEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       isResizingRef.current = true;
//       resizeStartXRef.current = e.clientX;
//       resizeStartWidthRef.current = sidebarWidth;
//       document.body.style.cursor = "col-resize";
//       document.body.style.userSelect = "none";
//     },
//     [sidebarWidth],
//   );

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       if (!isResizingRef.current) return;
//       const delta = resizeStartXRef.current - e.clientX;
//       setSidebarWidth(
//         Math.min(
//           SIDEBAR_MAX,
//           Math.max(SIDEBAR_MIN, resizeStartWidthRef.current + delta),
//         ),
//       );
//     };
//     const onUp = () => {
//       if (!isResizingRef.current) return;
//       isResizingRef.current = false;
//       document.body.style.cursor = "";
//       document.body.style.userSelect = "";
//     };
//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };
//   }, []);

//   const resizeFnRef = useRef<(() => void) | null>(null);
//   useEffect(() => {
//     const id = requestAnimationFrame(() => {
//       resizeFnRef.current?.();
//     });
//     return () => cancelAnimationFrame(id);
//   }, [sidebarWidth]);

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<SceneState | null>(null);
//   const [activeData, setActiveData] = useState<GridResult | null>(null);

//   const updateCamera = useCallback(() => {
//     const s = sceneRef.current;
//     if (!s) return;
//     s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist + s.panX;
//     s.camera.position.y = Math.sin(s.rotX) * s.dist + s.panY;
//     s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist + s.panZ;
//     s.camera.lookAt(s.panX, s.panY, s.panZ);
//   }, []);

//   // ── Build / rebuild scene ──────────────────────────────────────────────────
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const wrap = wrapRef.current;
//     if (!canvas || !wrap) return;
//     if (sceneRef.current) {
//       cancelAnimationFrame(sceneRef.current.animId);
//       sceneRef.current.renderer.dispose();
//       const oldEl = sceneRef.current.labelRenderer.domElement;
//       if (oldEl.parentNode === wrap) wrap.removeChild(oldEl);
//       sceneRef.current = null;
//     }
//     if (gridResults.length === 0) return;

//     const {
//       renderer,
//       labelRenderer,
//       scene,
//       camera,
//       barMeshes,
//       initDist,
//       initLookAtY,
//     } = buildScene(
//       canvas,
//       wrap,
//       gridResults,
//       activeSaltId,
//       cocUniq,
//       tempUniq,
//       maxSR,
//       tempUnit,
//     );

//     const state: SceneState = {
//       renderer,
//       labelRenderer,
//       scene,
//       camera,
//       barMeshes,
//       rotY: 0.55,
//       rotX: 0.38,
//       dist: initDist,
//       panX: 0,
//       panY: initLookAtY,
//       panZ: 0,
//       isDragging: false,
//       isPanning: false,
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
//     resizeFnRef.current = resize;
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
//       resizeFnRef.current = null;
//       renderer.dispose();
//       const el = labelRenderer.domElement;
//       if (el.parentNode === wrap) wrap.removeChild(el);
//       sceneRef.current = null;
//     };
//   }, [
//     gridResults,
//     activeSaltId,
//     maxSR,
//     cocUniq,
//     tempUniq,
//     tempUnit,
//     updateCamera,
//   ]);

//   // ── Pointer / touch interaction ────────────────────────────────────────────
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     const S = () => sceneRef.current;

//     const resetColor = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(
//         m.userData.origColor as number,
//       );
//     const setHover = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(0x1abc9c);
//     const setSelected = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(0x1d4ed8);

//     const raycast = (cx: number, cy: number): THREE.Mesh | null => {
//       const s = S();
//       if (!s) return null;
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = ((cx - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -(((cy - rect.top) / rect.height) * 2 - 1);
//       raycaster.setFromCamera(mouse, s.camera);
//       const hits = raycaster.intersectObjects(s.barMeshes, false);
//       return hits.length > 0 ? (hits[0].object as THREE.Mesh) : null;
//     };

//     const getPanVectors = (s: SceneState) => {
//       const right = new THREE.Vector3(
//         Math.cos(s.rotY),
//         0,
//         -Math.sin(s.rotY),
//       ).normalize();
//       const fwd = new THREE.Vector3(
//         -Math.sin(s.rotY) * Math.cos(s.rotX),
//         Math.sin(s.rotX),
//         -Math.cos(s.rotY) * Math.cos(s.rotX),
//       ).normalize();
//       const up = new THREE.Vector3()
//         .crossVectors(right, fwd)
//         .negate()
//         .normalize();
//       return { right, up };
//     };

//     const onMouseDown = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       if (e.button === 1 || e.button === 2) {
//         s.isPanning = true;
//         s.isDragging = false;
//       } else {
//         s.isDragging = false;
//         s.isPanning = false;
//       }
//       s.prevX = e.clientX;
//       s.prevY = e.clientY;
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       const dx = e.clientX - s.prevX;
//       const dy = e.clientY - s.prevY;
//       if (s.isPanning && (e.buttons === 2 || e.buttons === 4)) {
//         const speed = s.dist * 0.0018;
//         const { right } = getPanVectors(s);
//         s.panX -= right.x * dx * speed;
//         s.panZ -= right.z * dx * speed;
//         s.panY -= dy * speed;
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         canvas.style.cursor = "move";
//         return;
//       }
//       if (
//         e.buttons === 1 &&
//         !s.isDragging &&
//         (Math.abs(dx) > 3 || Math.abs(dy) > 3)
//       )
//         s.isDragging = true;
//       if (s.isDragging && e.buttons === 1) {
//         s.rotY += dx * 0.008;
//         s.rotX -= dy * 0.008;
//         s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         canvas.style.cursor = "grabbing";
//         return;
//       }
//       const hit = raycast(e.clientX, e.clientY);
//       if (
//         s.hoveredMesh &&
//         s.hoveredMesh !== hit &&
//         s.hoveredMesh !== s.selectedMesh
//       )
//         resetColor(s.hoveredMesh);
//       if (hit) {
//         s.hoveredMesh = hit;
//         if (hit !== s.selectedMesh) setHover(hit);
//         canvas.style.cursor = "pointer";
//         setActiveData(hit.userData.data as GridResult);
//       } else {
//         s.hoveredMesh = null;
//         canvas.style.cursor = "grab";
//         setActiveData(
//           s.selectedMesh ? (s.selectedMesh.userData.data as GridResult) : null,
//         );
//       }
//     };

//     const onMouseUp = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       if (s.isPanning) {
//         s.isPanning = false;
//         canvas.style.cursor = "grab";
//         return;
//       }
//       if (!s.isDragging) {
//         const hit = raycast(e.clientX, e.clientY);
//         if (hit) {
//           if (
//             s.selectedMesh &&
//             s.selectedMesh !== hit &&
//             s.selectedMesh !== s.hoveredMesh
//           )
//             resetColor(s.selectedMesh);
//           s.selectedMesh = hit;
//           setSelected(hit);
//           const clickedData = hit.userData.data as GridResult;
//           setActiveData(clickedData);
//           // ── KEY: auto-open bottom panel with both tables on bar click ──
//           setBottomPanelOpen(true);
//         }
//       }
//       s.isDragging = false;
//       canvas.style.cursor = "grab";
//     };

//     const onMouseLeave = () => {
//       const s = S();
//       if (!s) return;
//       if (s.hoveredMesh && s.hoveredMesh !== s.selectedMesh) {
//         resetColor(s.hoveredMesh);
//         s.hoveredMesh = null;
//       }
//       s.isDragging = false;
//       s.isPanning = false;
//       canvas.style.cursor = "grab";
//     };

//     const onWheel = (e: WheelEvent) => {
//       const s = S();
//       if (!s) return;
//       s.dist = Math.max(8, Math.min(300, s.dist + e.deltaY * 0.07));
//       updateCamera();
//       e.preventDefault();
//     };

//     const onContextMenu = (e: MouseEvent) => e.preventDefault();
//     let lastTouchY2 = 0;
//     const onTouchStart = (e: TouchEvent) => {
//       const s = S();
//       if (!s) return;
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       s.isDragging = false;
//       s.isPanning = false;
//       if (e.touches.length === 2)
//         lastTouchY2 = (e.touches[0].clientY + e.touches[1].clientY) / 2;
//     };
//     const onTouchMove = (e: TouchEvent) => {
//       const s = S();
//       if (!s) return;
//       if (e.touches.length === 2) {
//         const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
//         s.panY -= (midY - lastTouchY2) * s.dist * 0.0018;
//         lastTouchY2 = midY;
//         updateCamera();
//         e.preventDefault();
//         return;
//       }
//       const dx = e.touches[0].clientX - s.prevX;
//       const dy = e.touches[0].clientY - s.prevY;
//       s.isDragging = true;
//       s.rotY += dx * 0.01;
//       s.rotX -= dy * 0.01;
//       s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       updateCamera();
//       e.preventDefault();
//     };

//     canvas.addEventListener("mousedown", onMouseDown);
//     canvas.addEventListener("mousemove", onMouseMove);
//     canvas.addEventListener("mouseup", onMouseUp);
//     canvas.addEventListener("mouseleave", onMouseLeave);
//     canvas.addEventListener("wheel", onWheel, { passive: false });
//     canvas.addEventListener("contextmenu", onContextMenu);
//     canvas.addEventListener("touchstart", onTouchStart, { passive: true });
//     canvas.addEventListener("touchmove", onTouchMove, { passive: false });
//     return () => {
//       canvas.removeEventListener("mousedown", onMouseDown);
//       canvas.removeEventListener("mousemove", onMouseMove);
//       canvas.removeEventListener("mouseup", onMouseUp);
//       canvas.removeEventListener("mouseleave", onMouseLeave);
//       canvas.removeEventListener("wheel", onWheel);
//       canvas.removeEventListener("contextmenu", onContextMenu);
//       canvas.removeEventListener("touchstart", onTouchStart);
//       canvas.removeEventListener("touchmove", onTouchMove);
//     };
//   }, [updateCamera]);

//   // ── Derived sidebar values ─────────────────────────────────────────────────
//   const d = activeData;
//   const saltSR: number | null =
//     d && activeSaltId
//       ? (d.saturation_indices[activeSaltId]?.SR ??
//         d.saturation_indices[activeSaltId]?.SI ??
//         null)
//       : null;
//   const displaySR: number | null = saltSR ?? d?.indices?.lsi?.lsi ?? null;
//   const colorCode = d?.color_code;
//   const statusLabel: string =
//     colorCode === "yellow"
//       ? "Caution"
//       : colorCode === "red"
//         ? "Scale Risk"
//         : "Protected";
//   const statusVar: BadgeVariant =
//     colorCode === "yellow" ? "yellow" : colorCode === "red" ? "red" : "green";
//   const isEmpty = gridResults.length === 0;
//   const displaySaltLabel =
//     activeSaltId ??
//     (saltsOfInterest.length > 0 ? saltsOfInterest[0] : "Multi-Salt");

//   const hasDescription = !!d?.description_of_solution;
//   const hasSpecies = !!(
//     d?.distribution_of_species &&
//     Object.keys(d.distribution_of_species).length > 0
//   );
//   const hasBottomData = hasDescription || hasSpecies;

//   const legendItems = [
//     {
//       label: "Protected",
//       sub: "SR within safe band",
//       baseHex: "#2ECC71",
//       lightHex: "#d1fae5",
//       bg: "bg-emerald-50 border-emerald-200",
//     },
//     {
//       label: "Caution",
//       sub: "Mild scaling tendency",
//       baseHex: "#F1C40F",
//       lightHex: "#fef9c3",
//       bg: "bg-amber-50 border-amber-200",
//     },
//     {
//       label: "Scale Risk",
//       sub: "High scale risk",
//       baseHex: "#E74C3C",
//       lightHex: "#fee2e2",
//       bg: "bg-red-50 border-red-200",
//     },
//   ];

//   return (
//     <>
//       <div className="bg-white text-slate-800 border font-sans text-[14px] h-screen overflow-hidden flex flex-col select-none">
//         {/* ── Header ── */}
//         <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0 gap-4 flex-wrap">
//           <div>
//             <div className="text-[15px] font-bold text-slate-900">
//               Saturation Analysis —{" "}
//               <span className="text-blue-600">{displaySaltLabel}</span>
//               <span className="font-normal text-slate-400"> · 3D Grid</span>
//             </div>
//             <div className="text-[12px] text-slate-400 mt-0.5 flex flex-wrap gap-x-4">
//               {assetName && (
//                 <span className="text-slate-600 font-semibold">
//                   {assetName}
//                 </span>
//               )}
//               {(cocMin > 0 || cocMax > 0) && (
//                 <span>
//                   CoC {cocMin}–{cocMax}
//                 </span>
//               )}
//               {(tempMin > 0 || tempMax > 0) && (
//                 <span>
//                   Temp {tempMin}–{tempMax} °{tempUnit}
//                 </span>
//               )}
//               {dosage > 0 && <span>Dosage {dosage} ppm</span>}
//               {meta?.totalGridPoints && <span>{meta.totalGridPoints} pts</span>}
//             </div>
//           </div>
//           <div className="flex items-center gap-3 flex-wrap">
//             {summary && (
//               <div className="flex gap-1.5 text-[12px]">
//                 {summary.green > 0 && (
//                   <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
//                     {summary.green} Protected
//                   </span>
//                 )}
//                 {summary.yellow > 0 && (
//                   <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
//                     {summary.yellow} Caution
//                   </span>
//                 )}
//                 {summary.red > 0 && (
//                   <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-semibold">
//                     {summary.red} Scale Risk
//                   </span>
//                 )}
//               </div>
//             )}
//             {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
//               const dot =
//                 label === "Caution"
//                   ? "bg-amber-400"
//                   : label === "Scale Risk"
//                     ? "bg-red-500"
//                     : "bg-emerald-500";
//               return (
//                 <div
//                   key={label}
//                   className="flex items-center gap-1.5 text-[12px] text-slate-500"
//                 >
//                   <span
//                     className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`}
//                   />
//                   {label}
//                 </div>
//               );
//             })}
//           </div>
//         </header>

//         {/* ── Salt chips ── */}
//         {(saltsOfInterest.length > 0 || unavailableSalts.length > 0) && (
//           <div className="bg-slate-50 border-b border-slate-200 shrink-0">
//             {saltsOfInterest.length > 0 && (
//               <div className="px-5 pt-3 pb-2 flex items-center gap-2 overflow-x-auto max-h-[58px]">
//                 <span className="text-[11px] font-semibold text-slate-400 shrink-0 tracking-widest uppercase whitespace-nowrap">
//                   AVAILABLE SALTS:
//                 </span>
//                 <div className="flex gap-1.5 flex-nowrap">
//                   {saltsOfInterest.map((s) => {
//                     const isActive = s === activeSaltId;
//                     return (
//                       <button
//                         key={s}
//                         onClick={() => handleSaltChipClick(s)}
//                         disabled={isLoading}
//                         className={`text-[13px] px-3.5 py-1 rounded-full border font-medium whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${isActive ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50"}`}
//                       >
//                         {s}
//                         {isActive && <span className="text-xs">●</span>}
//                       </button>
//                     );
//                   })}
//                 </div>
//                 {activeSaltId && (
//                   <button
//                     onClick={handleResetToSR}
//                     disabled={isLoading}
//                     className="ml-2 text-xs px-3 py-1 rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100 whitespace-nowrap shrink-0"
//                   >
//                     Reset to SR
//                   </button>
//                 )}
//               </div>
//             )}
//             {unavailableSalts.length > 0 && (
//               <div className="px-5 pb-3 pt-1 border-t border-slate-100 flex items-start gap-2 overflow-x-auto max-h-[58px]">
//                 <span className="text-[11px] font-semibold text-slate-400 shrink-0 tracking-widest uppercase whitespace-nowrap pt-1">
//                   UNAVAILABLE:
//                 </span>
//                 <div className="flex gap-1.5 flex-nowrap flex-wrap">
//                   {unavailableSalts.map(({ salt, reason }: any) => (
//                     <button
//                       key={salt}
//                       onClick={() => setUnavailableModal({ salt, reason })}
//                       className="text-[12px] px-3 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-600 transition-colors flex items-center gap-1 whitespace-nowrap"
//                     >
//                       {salt}
//                       <span className="text-[10px] opacity-60">ⓘ</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Unavailable Modal */}
//         {unavailableModal && (
//           <div
//             className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
//             onClick={() => setUnavailableModal(null)}
//           >
//             <div
//               className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
//                 <div className="font-semibold text-slate-900">
//                   Why{" "}
//                   <span className="text-slate-600">
//                     {unavailableModal.salt}
//                   </span>{" "}
//                   is unavailable
//                 </div>
//                 <button
//                   onClick={() => setUnavailableModal(null)}
//                   className="text-slate-400 hover:text-slate-600 text-xl leading-none"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="p-6 text-[13px] text-slate-600 leading-relaxed">
//                 {unavailableModal.reason}
//               </div>
//               <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
//                 <button
//                   onClick={() => setUnavailableModal(null)}
//                   className="px-5 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── Main body: 3D + sidebar + bottom panel ── */}
//         <div className="flex flex-1 overflow-hidden flex-col">
//           <div className="flex flex-1 overflow-hidden">
//             {/* 3-D viewport */}
//             <div
//               ref={wrapRef}
//               className="flex-1 min-w-0 relative overflow-hidden"
//               style={{ background: "#f8fafc" }}
//             >
//               {isEmpty ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
//                   <div className="text-5xl opacity-20">⬛</div>
//                   <p className="text-[14px]">
//                     No grid data — pass an{" "}
//                     <code className="text-slate-500 bg-slate-100 px-1 rounded">
//                       apiResponse
//                     </code>{" "}
//                     prop.
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <canvas
//                     ref={canvasRef}
//                     className="block w-full h-full cursor-grab"
//                   />

//                   {/* Loading overlay */}
//                   {isLoading && (
//                     <div
//                       className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
//                       style={{
//                         background: "rgba(248,250,252,0.78)",
//                         backdropFilter: "blur(3px)",
//                         zIndex: 25,
//                       }}
//                     >
//                       <svg
//                         className="animate-spin w-11 h-11 text-blue-500"
//                         viewBox="0 0 44 44"
//                         fill="none"
//                       >
//                         <circle
//                           cx="22"
//                           cy="22"
//                           r="18"
//                           stroke="currentColor"
//                           strokeOpacity="0.2"
//                           strokeWidth="4"
//                         />
//                         <path
//                           d="M40 22a18 18 0 00-18-18"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                           strokeLinecap="round"
//                         />
//                       </svg>
//                       <div className="text-center">
//                         <p className="text-[14px] font-semibold text-slate-700">
//                           Analysing{" "}
//                           <span className="text-blue-600">{activeSaltId}</span>
//                         </p>
//                         <p className="text-[12px] text-slate-400 mt-0.5">
//                           Fetching saturation grid…
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Axis legend */}
//                   <div
//                     className="absolute bottom-4 left-4 pointer-events-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-md"
//                     style={{ zIndex: 20 }}
//                   >
//                     {[
//                       {
//                         color: "#2563eb",
//                         label: "X — Cycles of Concentration (CoC)",
//                       },
//                       {
//                         color: "#ea580c",
//                         label: `Z — Temperature (°${tempUnit})`,
//                       },
//                       {
//                         color: "#059669",
//                         label: activeSaltId
//                           ? `Y — ${activeSaltId} Saturation Ratio (SR)`
//                           : "Y — Saturation Ratio (SR)",
//                       },
//                     ].map(({ color, label }) => (
//                       <div
//                         key={label}
//                         className="flex items-center gap-2 text-[11px] text-slate-600 py-0.5"
//                       >
//                         <div
//                           className="w-5 h-[2px] rounded shrink-0"
//                           style={{ background: color }}
//                         />
//                         {label}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Controls hint */}
//                   <div
//                     className="absolute bottom-4 right-4 pointer-events-none bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm text-[11px] text-slate-400"
//                     style={{ zIndex: 20 }}
//                   >
//                     Left-drag · Rotate &nbsp;|&nbsp; Right-drag · Pan
//                     &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click · Pin
//                   </div>

//                   {/* ── Bottom panel toggle pill ── */}
//                   {hasBottomData && (
//                     <div
//                       className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto"
//                       style={{ zIndex: 20 }}
//                     >
//                       <button
//                         onClick={() => setBottomPanelOpen((v) => !v)}
//                         className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[12px] font-semibold shadow-lg hover:bg-slate-700 transition-all"
//                       >
//                         <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
//                         CoC {d?._grid_CoC} · {d?._grid_temp}°{tempUnit} —
//                         Solution Details
//                         <ChevronDown
//                           className={`w-3.5 h-3.5 transition-transform ${bottomPanelOpen ? "rotate-180" : ""}`}
//                         />
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>

//             {/* ── Resize handle ── */}
//             <div
//               onMouseDown={onResizeMouseDown}
//               className="w-[5px] shrink-0 bg-slate-200 hover:bg-blue-400 active:bg-blue-500 cursor-col-resize transition-colors relative group"
//               style={{ zIndex: 30 }}
//               title="Drag to resize sidebar"
//             >
//               <div className="absolute inset-y-0 left-[1px] w-[3px] flex flex-col items-center justify-center gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-[3px] h-[3px] rounded-full bg-white"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* ── Right Sidebar ── */}
//             <aside
//               style={{
//                 width: sidebarWidth,
//                 minWidth: SIDEBAR_MIN,
//                 maxWidth: SIDEBAR_MAX,
//               }}
//               className="shrink-0 bg-white border-l border-slate-200 overflow-y-auto p-4"
//             >
//               {!d ? (
//                 <div className="text-center py-8">
//                   <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl">
//                     📊
//                   </div>
//                   <p className="text-[14px] font-semibold text-slate-600 mb-1">
//                     Hover or click a bar
//                   </p>
//                   <p className="text-[12px] text-slate-400">
//                     to inspect grid-point details
//                   </p>
//                   <div className="mt-6 space-y-2.5">
//                     {legendItems.map(
//                       ({ label, sub, baseHex, lightHex, bg }) => (
//                         <div
//                           key={label}
//                           className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${bg} text-left`}
//                         >
//                           <div
//                             className="w-3 h-9 rounded shrink-0"
//                             style={{
//                               background: `linear-gradient(to bottom, ${baseHex}, ${lightHex})`,
//                             }}
//                           />
//                           <div>
//                             <div className="text-[13px] font-semibold text-slate-700">
//                               {label}
//                             </div>
//                             <div className="text-[11px] text-slate-400">
//                               {sub}
//                             </div>
//                             <div className="text-[10px] text-slate-300 mt-0.5">
//                               Dark = high SR · Light = low SR
//                             </div>
//                           </div>
//                         </div>
//                       ),
//                     )}
//                   </div>
//                   <div className="mt-5 border-t border-slate-100 pt-5 space-y-2.5 text-left">
//                     <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
//                       Axis Legend
//                     </p>
//                     {[
//                       {
//                         color: "#2563eb",
//                         label: "X — Cycles of Concentration",
//                       },
//                       {
//                         color: "#ea580c",
//                         label: `Z — Temperature (°${tempUnit})`,
//                       },
//                       {
//                         color: "#059669",
//                         label: activeSaltId
//                           ? `Y — ${activeSaltId} Saturation Ratio (SR)`
//                           : "Y — Saturation Ratio (SR)",
//                       },
//                     ].map(({ color, label }) => (
//                       <div key={label} className="flex items-center gap-2.5">
//                         <div
//                           className="w-6 h-[2px] shrink-0 rounded-full"
//                           style={{ background: color }}
//                         />
//                         <span className="text-[12px] text-slate-500">
//                           {label}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-5 border-t border-slate-100 pt-4 space-y-1">
//                     <p className="text-[11px] text-slate-400 italic">
//                       ↔ Left-drag to rotate
//                     </p>
//                     <p className="text-[11px] text-slate-400 italic">
//                       ↕ Right-drag to pan
//                     </p>
//                     <p className="text-[11px] text-slate-400 italic">
//                       🖱 Scroll to zoom
//                     </p>
//                     <p className="text-[11px] text-slate-400 italic">
//                       Click bar → Solution details below
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   {d.bar_data && (
//                     <div
//                       className="mb-4 rounded-lg px-3 py-2 text-white text-[12px] font-semibold flex items-center gap-2"
//                       style={{ backgroundColor: d.bar_data.color_hex }}
//                     >
//                       <div
//                         className="w-3 h-3 rounded-full border border-white/40"
//                         style={{ opacity: d.bar_data.opacity }}
//                       />
//                       {statusLabel} · SR intensity{" "}
//                       {Math.round(d.bar_data.opacity * 100)}%
//                     </div>
//                   )}
//                   <SSection title="Grid Point">
//                     <SRow label="CoC" value={String(d._grid_CoC)} />
//                     <SRow
//                       label="Temperature"
//                       value={`${d._grid_temp} °${tempUnit}`}
//                     />
//                     <SRow label="pH" value={String(d._grid_pH)} />
//                     <SRow
//                       label="Ionic Strength"
//                       value={d.ionic_strength?.toFixed(5) ?? "—"}
//                     />
//                     {(d.dissolved_oxygen_ppm != null ||
//                       (d.corrosion_rate?.do_ppm as number | undefined) !=
//                         null) && (
//                       <SRow
//                         label="Dissolved O₂"
//                         value={`${(d.dissolved_oxygen_ppm ?? (d.corrosion_rate?.do_ppm as number)).toFixed(2)} ppm`}
//                       />
//                     )}
//                     {d.description_of_solution?.activity_of_water != null && (
//                       <SRow
//                         label="Activity H₂O"
//                         value={d.description_of_solution.activity_of_water.toFixed(
//                           3,
//                         )}
//                       />
//                     )}
//                     {d.charge_balance_error_pct !== undefined && (
//                       <SRow
//                         label="Charge Bal. Err"
//                         value={`${d.charge_balance_error_pct}%`}
//                       />
//                     )}
//                   </SSection>

//                   <SSection
//                     title={
//                       activeSaltId
//                         ? `${activeSaltId} — Saturation Ratio`
//                         : "Saturation Ratio (SR)"
//                     }
//                   >
//                     <SRow
//                       label="Saturation Ratio (SR)"
//                       value={displaySR !== null ? displaySR.toFixed(4) : "—"}
//                       bold
//                     />
//                     <div className="flex justify-between items-center py-[6px]">
//                       <span className="text-[13px] text-slate-500">Status</span>
//                       <Badge text={statusLabel} variant={statusVar} />
//                     </div>
//                   </SSection>

//                   {saltsOfInterest.length > 0 &&
//                     Object.keys(d.saturation_indices).length > 0 && (
//                       <SSection title="Key Salts SR">
//                         {saltsOfInterest.map((salt) => {
//                           const entry = d.saturation_indices[salt];
//                           const isActive = salt === activeSaltId;
//                           const srDisplay =
//                             entry?.SR != null ? entry.SR : entry?.SI;
//                           return (
//                             <div
//                               key={salt}
//                               className="flex justify-between items-center py-[6px] border-b border-slate-100 last:border-0"
//                             >
//                               <div className="flex items-center gap-1.5 min-w-0">
//                                 <span
//                                   className={`text-[13px] truncate ${isActive ? "font-semibold text-blue-700" : "text-slate-500"}`}
//                                 >
//                                   {salt}
//                                 </span>
//                                 {entry?.chemical_formula && (
//                                   <span className="text-[10px] text-slate-300 shrink-0">
//                                     {entry.chemical_formula}
//                                   </span>
//                                 )}
//                               </div>
//                               <span
//                                 className={`text-[13px] font-semibold shrink-0 ${srDisplay != null && srDisplay > 0 ? "text-red-600" : "text-slate-400"}`}
//                               >
//                                 {srDisplay != null ? srDisplay : "—"}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </SSection>
//                     )}

//                   <SSection title="Deposition Indices">
//                     <SRow
//                       label="LSI"
//                       value={d.indices.lsi.lsi.toFixed(2)}
//                       badge={d.indices.lsi.risk}
//                     />
//                     {d.indices.ryznar.risk !== "N/A" && (
//                       <SRow
//                         label="RSI"
//                         value={d.indices.ryznar.ri.toFixed(2)}
//                         badge={d.indices.ryznar.risk}
//                       />
//                     )}
//                     {d.indices.puckorius.risk !== "N/A" && (
//                       <SRow
//                         label="PSI"
//                         value={d.indices.puckorius.index.toFixed(2)}
//                         badge={d.indices.puckorius.risk}
//                       />
//                     )}
//                     {d.indices.larson_skold.risk_level !== "N/A" && (
//                       <SRow
//                         label="Larson-Skold"
//                         value={
//                           d.indices.larson_skold.index != null
//                             ? d.indices.larson_skold.index.toFixed(3)
//                             : "N/A"
//                         }
//                         badge={`${d.indices.larson_skold.risk_level} Risk`}
//                       />
//                     )}
//                     {d.indices.stiff_davis.risk !== "N/A" && (
//                       <SRow
//                         label="Stiff-Davis"
//                         value={
//                           d.indices.stiff_davis.index != null
//                             ? d.indices.stiff_davis.index.toFixed(3)
//                             : "N/A"
//                         }
//                         badge={
//                           d.indices.stiff_davis.risk ??
//                           d.indices.stiff_davis.interpretation ??
//                           ""
//                         }
//                       />
//                     )}
//                     {d.indices.ccpp.risk !== "N/A" && (
//                       <SRow
//                         label="CCPP (ppm)"
//                         value={
//                           d.indices.ccpp.ccpp_ppm != null
//                             ? String(d.indices.ccpp.ccpp_ppm)
//                             : "N/A"
//                         }
//                         badge={d.indices.ccpp.risk}
//                       />
//                     )}
//                   </SSection>

//                   <CorrosionSection d={d} saltsOfInterest={saltsOfInterest} />

//                   {Object.keys(d.saturation_indices).length > 0 && (
//                     <SSection title="All Minerals SR">
//                       {Object.entries(d.saturation_indices)
//                         .sort(([, a], [, b]) => {
//                           const srA = a.SR ?? a.SI;
//                           const srB = b.SR ?? b.SI;
//                           return srB - srA;
//                         })
//                         .map(([key, val]) => {
//                           const isTarget = key === activeSaltId;
//                           const isInterest = saltsOfInterest.includes(key);
//                           const srVal = val.SR ?? val.SI;
//                           return (
//                             <div
//                               key={key}
//                               className={`flex justify-between items-center py-[5px] border-b border-slate-50 last:border-0 ${isTarget ? "bg-blue-50 -mx-1 px-1 rounded" : ""}`}
//                             >
//                               <div className="flex items-center gap-1 min-w-0">
//                                 <span
//                                   className={`text-[13px] truncate ${isTarget ? "font-bold text-blue-700" : isInterest ? "font-semibold text-slate-700" : "text-slate-400"}`}
//                                 >
//                                   {key}
//                                 </span>
//                                 {val.chemical_formula && (
//                                   <span className="text-[10px] text-slate-300 shrink-0 hidden sm:inline">
//                                     {val.chemical_formula}
//                                   </span>
//                                 )}
//                               </div>
//                               <span
//                                 className={`text-[13px] shrink-0 font-semibold ${srVal > 0 ? "text-red-600" : "text-slate-300"} ${isTarget ? "font-bold" : ""}`}
//                               >
//                                 {srVal}
//                               </span>
//                             </div>
//                           );
//                         })}
//                     </SSection>
//                   )}
//                 </>
//               )}
//             </aside>
//           </div>

//           {/* ══════════════════════════════════════════════════════════════════
//               BOTTOM PANEL — Description of Solution + Distribution of Species
//               Slides up when a bar is clicked and has data
//           ══════════════════════════════════════════════════════════════════ */}
//           {d && hasBottomData && (
//             <div
//               className="shrink-0 border-t border-slate-200 bg-white overflow-hidden transition-all duration-500 ease-in-out"
//               style={{
//                 maxHeight: bottomPanelOpen ? "520px" : "0px",
//                 opacity: bottomPanelOpen ? 1 : 0,
//               }}
//             >
//               {/* Panel header */}
//               <div className="flex items-center justify-between px-5 py-2 bg-slate-50 border-b border-slate-200">
//                 <div className="flex items-center gap-1">
//                   {/* Tab: Description */}
//                   {hasDescription && (
//                     <button
//                       onClick={() => setBottomTab("description")}
//                       className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${bottomTab === "description" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
//                     >
//                       <FlaskConical className="w-3.5 h-3.5" />
//                       Description of Solution
//                     </button>
//                   )}
//                   {/* Tab: Species */}
//                   {hasSpecies && (
//                     <button
//                       onClick={() => setBottomTab("species")}
//                       className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${bottomTab === "species" ? "bg-indigo-700 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
//                     >
//                       <Droplets className="w-3.5 h-3.5" />
//                       Distribution of Species
//                     </button>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[11px] text-slate-400 font-mono">
//                     CoC {d._grid_CoC} · {d._grid_temp}°{tempUnit} · pH{" "}
//                     {d._grid_pH}
//                   </span>
//                   <button
//                     onClick={() => setBottomPanelOpen(false)}
//                     className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Panel content */}
//               <div className="overflow-y-auto" style={{ maxHeight: "460px" }}>
//                 <div className="p-4">
//                   {bottomTab === "description" && hasDescription && (
//                     <DescriptionSolutionPanel d={d} tempUnit={tempUnit} />
//                   )}
//                   {bottomTab === "species" && hasSpecies && (
//                     <DistributionOfSpeciesPanel d={d} tempUnit={tempUnit} />
//                   )}
//                   {bottomTab === "description" && !hasDescription && (
//                     <div className="text-center py-8 text-[13px] text-slate-400 italic">
//                       No description_of_solution data for this grid point.
//                     </div>
//                   )}
//                   {bottomTab === "species" && !hasSpecies && (
//                     <div className="text-center py-8 text-[13px] text-slate-400 italic">
//                       No distribution_of_species data for this grid point.
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useSaltAnalysisMutation } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
// import {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
//   ReactNode,
//   MouseEvent as RMouseEvent,
// } from "react";
// import * as THREE from "three";
// import {
//   CSS2DRenderer,
//   CSS2DObject,
// } from "three/examples/jsm/renderers/CSS2DRenderer.js";
// import {
//   Droplets,
//   Thermometer,
//   FlaskConical,
//   Zap,
//   Wind,
//   Scale,
//   Activity,
//   Beaker,
//   ChevronDown,
//   X,
// } from "lucide-react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface SIEntry {
//   SI: number;
//   SR?: number;
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
//   index: number | null;
//   interpretation?: string;
//   risk_level: string;
//   components?: Record<string, number>;
// }

// export interface StiffDavisIndex {
//   index: number | null;
//   interpretation?: string;
//   risk?: string;
//   components?: Record<string, number>;
// }

// export interface CcppIndex {
//   ccpp_ppm: number | null;
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
//   note?: string;
// }

// export interface CorrosionRate {
//   mild_steel?: CorrosionMetal;
//   copper?: CorrosionMetal;
//   admiralty_brass?: CorrosionMetal;
//   do_ppm?: number;
//   temp_c?: number;
//   [key: string]: CorrosionMetal | number | undefined;
// }

// export interface Corrosion {
//   mild_steel?: CorrosionMetal;
//   copper?: CorrosionMetal;
//   admiralty_brass?: CorrosionMetal;
//   [key: string]: CorrosionMetal | undefined;
// }

// export interface BarData {
//   color_hex: string;
//   opacity: number;
//   sr_color: string;
//   sr_color_hex: string;
// }

// export interface DescriptionOfSolution {
//   pH?: number;
//   specific_conductance?: number;
//   density?: number;
//   activity_of_water?: number;
//   ionic_strength_desc?: number;
//   mass_of_water_kg?: number;
//   temperature_C?: number;
//   [key: string]: number | undefined;
// }

// export interface SpeciesEntry {
//   molality: number;
//   activity: number;
//   element?: string | null;
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
//   dissolved_oxygen_ppm?: number;
//   corrosion_temp_c?: number;
//   description_of_solution?: DescriptionOfSolution | null;
//   distribution_of_species?: Record<string, SpeciesEntry> | null;
//   calculations?: Record<string, unknown>;
//   bar_data?: BarData;
//   corrosion_rate?: CorrosionRate;
//   specific_conductance?: number;
//   density?: number;
//   electrical_balance?: number;
//   _grid_temp_c?: number;
// }

// export interface SaturationApiResponseFlat {
//   success?: boolean;
//   run_id?: string;
//   salt_id?: string | null;
//   salts_of_interest?: string[];
//   dosage_ppm?: number;
//   coc_min?: number;
//   coc_max?: number;
//   temp_min?: number;
//   temp_max?: number;
//   temp_unit?: string;
//   ph_mode?: string;
//   total_grid_points?: number;
//   grid_results?: GridResult[];
//   summary?: { green: number; yellow: number; red: number; error: number };
//   base_water_parameters?: Record<string, { value: number; unit: string }>;
//   asset_info?: { name?: string; type?: string };
//   data?: {
//     aiResponse?: Partial<SaturationApiResponseFlat>;
//     salt_id?: string | null;
//     salts_of_interest?: string[];
//     dosage_ppm?: number;
//     coc_min?: number;
//     coc_max?: number;
//     temp_min?: number;
//     temp_max?: number;
//     temp_unit?: string;
//     ph_mode?: string;
//     total_grid_points?: number;
//     grid_results?: GridResult[];
//     summary?: { green: number; yellow: number; red: number; error: number };
//     base_water_parameters?: Record<string, { value: number; unit: string }>;
//     asset_info?: { name?: string; type?: string };
//     available_salts?: string[];
//     chart_data?: {
//       salt_id?: string | null;
//       temp_unit?: string;
//       available_salts?: string[];
//       total_points?: number;
//       points?: any[];
//     };
//     graph_data?: {
//       type?: string;
//       salt_id?: string | null;
//       temp_unit?: string;
//       total_points?: number;
//       available_salts?: string[];
//       points?: any[];
//       axes?: {
//         x?: { label?: string; values?: number[] };
//         y?: { label?: string; unit?: string };
//         z?: { label?: string; values?: number[] };
//       };
//     };
//     run_id?: string;
//   };
// }

// interface RawGridPoint extends Omit<GridResult, "indices" | "corrosion"> {
//   indices?: Indices;
//   corrosion?: Corrosion;
//   corrosion_rate?: CorrosionRate;
//   calculations?: {
//     lsi?: LsiIndex;
//     ryznar?: RyznarIndex;
//     puckorius?: PuckoriusIndex;
//     larson_skold?: LarsonSkoldIndex;
//     stiff_davis?: StiffDavisIndex;
//     ccpp?: CcppIndex;
//     mild_steel_corrosion?: CorrosionMetal;
//     copper_corrosion?: CorrosionMetal;
//     admiralty_brass_corrosion?: CorrosionMetal;
//   };
//   bar_data?: BarData;
// }

// interface ResolvedMeta {
//   saltId: string | null;
//   saltsOfInterest: string[];
//   dosagePpm: number;
//   cocMin: number;
//   cocMax: number;
//   tempMin: number;
//   tempMax: number;
//   tempUnit: string;
//   phMode?: string;
//   totalGridPoints?: number;
//   gridResults: GridResult[];
//   summary?: { green: number; yellow: number; red: number; error: number };
//   baseWaterParameters?: Record<string, { value: number; unit: string }>;
//   assetInfo?: { name?: string; type?: string };
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const BAR_W = 1.55;
// const SPACING = 2.4;
// const BAR_MAX_H = 8.0;

// const SIDEBAR_MIN = 240;
// const SIDEBAR_MAX = 560;
// const SIDEBAR_DEFAULT = 300;

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function hexStringToThreeNum(hex: string): number {
//   return parseInt(hex.replace("#", ""), 16);
// }

// function darkenHex(hex: string, factor: number): number {
//   const num = hexStringToThreeNum(hex);
//   const r = Math.round(((num >> 16) & 0xff) * factor);
//   const g = Math.round(((num >> 8) & 0xff) * factor);
//   const b = Math.round((num & 0xff) * factor);
//   return (r << 16) | (g << 8) | b;
// }

// function lightenHex(hex: string, factor: number): number {
//   const num = hexStringToThreeNum(hex);
//   const r = Math.round(
//     ((num >> 16) & 0xff) + (255 - ((num >> 16) & 0xff)) * factor,
//   );
//   const g = Math.round(
//     ((num >> 8) & 0xff) + (255 - ((num >> 8) & 0xff)) * factor,
//   );
//   const b = Math.round((num & 0xff) + (255 - (num & 0xff)) * factor);
//   return (r << 16) | (g << 8) | b;
// }

// function barColorFromBarData(barData: BarData): number {
//   const t = Math.max(0, Math.min(1, barData.opacity));
//   if (t > 0.5) return darkenHex(barData.color_hex, 0.5 + (t - 0.5) * 1.0);
//   return lightenHex(barData.color_hex, (0.5 - t) * 0.65);
// }

// // ─── Corrosion normaliser ─────────────────────────────────────────────────────

// function normaliseCorrosion(raw: RawGridPoint): {
//   corrosion: Corrosion;
//   dissolved_oxygen_ppm?: number;
//   corrosion_temp_c?: number;
// } {
//   if (raw.corrosion_rate && typeof raw.corrosion_rate === "object") {
//     const cr = raw.corrosion_rate;
//     const metals: Corrosion = {};
//     const do_ppm = typeof cr.do_ppm === "number" ? cr.do_ppm : undefined;
//     const corrosion_temp_c =
//       typeof cr.temp_c === "number" ? cr.temp_c : undefined;
//     const SCALAR_KEYS = new Set(["do_ppm", "temp_c"]);
//     for (const key of Object.keys(cr)) {
//       if (SCALAR_KEYS.has(key)) continue;
//       const val = cr[key];
//       if (val && typeof val === "object" && "cr_mpy" in val) {
//         metals[key] = val as CorrosionMetal;
//       }
//     }
//     return {
//       corrosion: metals,
//       dissolved_oxygen_ppm: do_ppm,
//       corrosion_temp_c,
//     };
//   }
//   if (raw.corrosion && typeof raw.corrosion === "object") {
//     return {
//       corrosion: raw.corrosion,
//       dissolved_oxygen_ppm: raw.dissolved_oxygen_ppm,
//       corrosion_temp_c: raw.corrosion_temp_c,
//     };
//   }
//   const calc = raw.calculations ?? {};
//   const metals: Corrosion = {};
//   if ((calc as any).mild_steel_corrosion)
//     metals.mild_steel = (calc as any).mild_steel_corrosion;
//   if ((calc as any).copper_corrosion)
//     metals.copper = (calc as any).copper_corrosion;
//   if ((calc as any).admiralty_brass_corrosion)
//     metals.admiralty_brass = (calc as any).admiralty_brass_corrosion;
//   return {
//     corrosion: metals,
//     dissolved_oxygen_ppm: raw.dissolved_oxygen_ppm,
//     corrosion_temp_c: raw.corrosion_temp_c,
//   };
// }

// // ─── Point mappers ────────────────────────────────────────────────────────────

// function mapPointToGridResult(p: any, saltId: string | null): GridResult {
//   const saturation_indices: Record<string, SIEntry> = {};
//   for (const [key, val] of Object.entries(p.all_si ?? {})) {
//     const v = val as any;
//     saturation_indices[key] = {
//       SI: v.SI ?? 0,
//       SR: v.SR,
//       log_IAP: v.log_IAP,
//       log_K: v.log_K,
//       chemical_formula: v.chemical_formula,
//     };
//   }
//   const srValue: number = saltId
//     ? (saturation_indices[saltId]?.SR ??
//       saturation_indices[saltId]?.SI ??
//       p.si ??
//       0)
//     : (p.sr ?? p.si ?? 0);
//   const colorRaw: string = p.color ?? "green";
//   const color_code = (
//     ["green", "yellow", "red"].includes(colorRaw) ? colorRaw : "red"
//   ) as "green" | "yellow" | "red";
//   const lsiRisk =
//     color_code === "green"
//       ? "Low Scale"
//       : color_code === "yellow"
//         ? "Moderate"
//         : "High Scale";
//   const bar_data: BarData = {
//     color_hex:
//       p.color_hex ??
//       (color_code === "green"
//         ? "#2ECC71"
//         : color_code === "red"
//           ? "#E74C3C"
//           : "#F1C40F"),
//     opacity: p.opacity ?? 1,
//     sr_color: color_code,
//     sr_color_hex: p.color_hex ?? "#2ECC71",
//   };
//   const { corrosion, dissolved_oxygen_ppm, corrosion_temp_c } =
//     normaliseCorrosion(p as RawGridPoint);
//   return {
//     _grid_CoC: p.coc ?? p.CoC ?? 0,
//     _grid_temp: p.temperature ?? p.temp ?? 0,
//     _grid_pH: p.ph ?? p.pH ?? 0,
//     ionic_strength: p.ionic_strength ?? 0,
//     charge_balance_error_pct: p.charge_balance_error_pct,
//     saturation_indices,
//     color_code,
//     bar_data,
//     dissolved_oxygen_ppm: dissolved_oxygen_ppm ?? p.dissolved_oxygen_ppm,
//     corrosion_temp_c,
//     description_of_solution: p.description_of_solution ?? null,
//     distribution_of_species: p.distribution_of_species ?? null,
//     indices: {
//       lsi: { lsi: srValue, risk: lsiRisk, pHs: 0 },
//       ryznar: { ri: 0, risk: "N/A", pHs: 0 },
//       puckorius: { index: 0, risk: "N/A" },
//       larson_skold: { index: null, risk_level: "N/A" },
//       stiff_davis: { index: null, risk: "N/A", interpretation: "N/A" },
//       ccpp: { ccpp_ppm: null, risk: "N/A" },
//     },
//     corrosion,
//     corrosion_rate: p.corrosion_rate,
//   };
// }

// function normaliseRawPoint(d: RawGridPoint): GridResult {
//   if (d.indices && d.corrosion) return d as GridResult;
//   const calc = (d as any).calculations ?? {};
//   const { corrosion, dissolved_oxygen_ppm, corrosion_temp_c } =
//     normaliseCorrosion(d);
//   return {
//     ...(d as any),
//     dissolved_oxygen_ppm:
//       dissolved_oxygen_ppm ?? (d as any).dissolved_oxygen_ppm,
//     corrosion_temp_c,
//     description_of_solution: (d as any).description_of_solution ?? null,
//     distribution_of_species: (d as any).distribution_of_species ?? null,
//     indices: d.indices ?? {
//       lsi: calc.lsi ?? { lsi: 0, risk: "Unknown", pHs: 0 },
//       ryznar: calc.ryznar ?? { ri: 0, risk: "Unknown", pHs: 0 },
//       puckorius: calc.puckorius ?? { index: 0, risk: "Unknown" },
//       larson_skold: calc.larson_skold ?? { index: null, risk_level: "Unknown" },
//       stiff_davis: calc.stiff_davis ?? {
//         index: null,
//         risk: "",
//         interpretation: "",
//       },
//       ccpp: calc.ccpp ?? { ccpp_ppm: null, risk: "Unknown" },
//     },
//     corrosion,
//   };
// }

// // ─── API shape resolver ───────────────────────────────────────────────────────

// function resolveMeta(
//   apiResponse: SaturationApiResponseFlat | undefined,
// ): ResolvedMeta | null {
//   if (!apiResponse) return null;
//   const responseAny = apiResponse as any;

//   const topLevelGridResults: RawGridPoint[] =
//     responseAny?.data?.grid_results ?? responseAny?.grid_results ?? [];
//   if (topLevelGridResults.length > 0 && topLevelGridResults[0]?.bar_data) {
//     const tempUnit = (
//       responseAny?.data?.temp_unit ??
//       responseAny?.temp_unit ??
//       "F"
//     ).replace("°", "");
//     const saltId: string | null =
//       responseAny?.data?.salt_id ?? responseAny?.salt_id ?? null;
//     const gridResults: GridResult[] =
//       topLevelGridResults.map(normaliseRawPoint);
//     const summary = responseAny?.data?.summary ?? responseAny?.summary;
//     const availableSalts: string[] =
//       responseAny?.data?.available_salts ?? responseAny?.available_salts ?? [];
//     const cocVals = gridResults.map((d) => d._grid_CoC);
//     const tempVals = gridResults.map((d) => d._grid_temp);
//     return {
//       saltId,
//       saltsOfInterest: availableSalts,
//       dosagePpm: responseAny?.data?.dosage_ppm ?? responseAny?.dosage_ppm ?? 0,
//       cocMin: cocVals.length ? Math.min(...cocVals) : 0,
//       cocMax: cocVals.length ? Math.max(...cocVals) : 0,
//       tempMin: tempVals.length ? Math.min(...tempVals) : 0,
//       tempMax: tempVals.length ? Math.max(...tempVals) : 0,
//       tempUnit,
//       totalGridPoints: gridResults.length,
//       gridResults,
//       summary,
//     };
//   }

//   const graphData = responseAny?.data?.graph_data ?? responseAny?.graph_data;
//   if (graphData?.axes) {
//     const tempUnit = graphData.temp_unit?.replace("°", "") ?? "C";
//     const saltId: string | null = graphData.salt_id ?? null;
//     const cocValues: number[] = graphData.axes?.x?.values ?? [];
//     const tempValues: number[] = graphData.axes?.z?.values ?? [];
//     const rawPoints: any[] =
//       graphData.points ?? responseAny?.data?.points ?? [];
//     let gridResults: GridResult[];
//     if (rawPoints.length > 0) {
//       gridResults = rawPoints.map((p: any) => mapPointToGridResult(p, saltId));
//     } else {
//       gridResults = cocValues.flatMap((coc) =>
//         tempValues.map(
//           (temp): GridResult => ({
//             _grid_CoC: coc,
//             _grid_temp: temp,
//             _grid_pH: 7,
//             ionic_strength: 0,
//             saturation_indices: {},
//             color_code: "green",
//             bar_data: {
//               color_hex: "#2ECC71",
//               opacity: 1,
//               sr_color: "green",
//               sr_color_hex: "#2ECC71",
//             },
//             indices: {
//               lsi: { lsi: 0, risk: "N/A", pHs: 0 },
//               ryznar: { ri: 0, risk: "N/A", pHs: 0 },
//               puckorius: { index: 0, risk: "N/A" },
//               larson_skold: { index: null, risk_level: "N/A" },
//               stiff_davis: { index: null, risk: "N/A", interpretation: "N/A" },
//               ccpp: { ccpp_ppm: null, risk: "N/A" },
//             },
//             corrosion: {},
//           }),
//         ),
//       );
//     }
//     const summary = responseAny?.data?.summary;
//     const cocVals = gridResults.map((d) => d._grid_CoC);
//     const tempVals = gridResults.map((d) => d._grid_temp);
//     return {
//       saltId,
//       saltsOfInterest: graphData.available_salts ?? [],
//       dosagePpm: 0,
//       cocMin: cocVals.length ? Math.min(...cocVals) : 0,
//       cocMax: cocVals.length ? Math.max(...cocVals) : 0,
//       tempMin: tempVals.length ? Math.min(...tempVals) : 0,
//       tempMax: tempVals.length ? Math.max(...tempVals) : 0,
//       tempUnit,
//       totalGridPoints: graphData.total_points ?? gridResults.length,
//       gridResults,
//       summary,
//     };
//   }

//   const chartData = responseAny?.data?.chart_data;
//   if (chartData?.points) {
//     const tempUnit = chartData.temp_unit?.replace("°", "") ?? "C";
//     const saltId: string | null = chartData.salt_id ?? null;
//     const gridResults: GridResult[] = chartData.points.map((p: any) =>
//       mapPointToGridResult(p, saltId),
//     );
//     const summary = responseAny?.data?.summary;
//     const availableSalts: string[] = chartData.available_salts ?? [];
//     const cocVals = gridResults.map((d) => d._grid_CoC);
//     const tempVals = gridResults.map((d) => d._grid_temp);
//     return {
//       saltId,
//       saltsOfInterest: availableSalts,
//       dosagePpm: 0,
//       cocMin: Math.min(...cocVals),
//       cocMax: Math.max(...cocVals),
//       tempMin: Math.min(...tempVals),
//       tempMax: Math.max(...tempVals),
//       tempUnit,
//       totalGridPoints: chartData.total_points,
//       gridResults,
//       summary,
//     };
//   }

//   type SrcShape = Partial<SaturationApiResponseFlat> & {
//     grid_results?: RawGridPoint[];
//   };
//   let src: SrcShape = apiResponse as SrcShape;
//   if (src.data && typeof src.data === "object") {
//     if (src.data.aiResponse && typeof src.data.aiResponse === "object")
//       src = src.data.aiResponse as SrcShape;
//     else src = src.data as SrcShape;
//   }
//   const rawGrid: RawGridPoint[] = (src.grid_results as RawGridPoint[]) ?? [];
//   const gridResults: GridResult[] = rawGrid.map(normaliseRawPoint);
//   return {
//     saltId: (src.salt_id as string | null) ?? null,
//     saltsOfInterest: (src.salts_of_interest as string[]) ?? [],
//     dosagePpm: (src.dosage_ppm as number) ?? 0,
//     cocMin: (src.coc_min as number) ?? 0,
//     cocMax: (src.coc_max as number) ?? 0,
//     tempMin: (src.temp_min as number) ?? 0,
//     tempMax: (src.temp_max as number) ?? 0,
//     tempUnit: (src.temp_unit as string) ?? "C",
//     phMode: src.ph_mode as string | undefined,
//     totalGridPoints: src.total_grid_points as number | undefined,
//     gridResults,
//     summary: src.summary as ResolvedMeta["summary"],
//     baseWaterParameters:
//       src.base_water_parameters as ResolvedMeta["baseWaterParameters"],
//     assetInfo: src.asset_info as ResolvedMeta["assetInfo"],
//   };
// }

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
//   yellow: "bg-amber-50   text-amber-700   border border-amber-200",
//   red: "bg-red-50     text-red-700     border border-red-200",
//   green: "bg-gray-100   text-gray-600    border border-gray-300",
//   info: "bg-blue-50    text-blue-700    border border-blue-200",
//   warn: "bg-orange-50  text-orange-700  border border-orange-200",
// };

// function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
//   const v: BadgeVariant = variant ?? getBadgeVariant(text);
//   return (
//     <span
//       className={`text-[12px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap ${badgeCls[v]}`}
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
//     <div className="flex justify-between items-center py-[6px] border-b border-slate-100 gap-2 last:border-0">
//       <span
//         className={`text-[13px] shrink-0 ${bold ? "font-semibold text-slate-800" : "text-slate-500"}`}
//       >
//         {label}
//       </span>
//       <span
//         className={`text-[13px] flex items-center gap-1 flex-wrap justify-end ${bold ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}
//       >
//         {value}
//         {badge && <Badge text={badge} />}
//       </span>
//     </div>
//   );
// }

// function SSection({ title, children }: { title: string; children: ReactNode }) {
//   return (
//     <div className="mb-5">
//       <div className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-2 pb-1 border-b border-slate-200">
//         {title}
//       </div>
//       {children}
//     </div>
//   );
// }

// // ─── CSS2D label helper ───────────────────────────────────────────────────────

// interface LabelOpts {
//   color?: string;
//   fontSize?: string;
//   fontWeight?: string;
//   background?: string;
//   padding?: string;
// }

// function makeLabel(text: string, opts: LabelOpts = {}): CSS2DObject {
//   const div = document.createElement("div");
//   div.textContent = text;
//   div.style.color = opts.color ?? "rgba(30,41,59,0.85)";
//   div.style.fontSize = opts.fontSize ?? "10px";
//   div.style.fontWeight = opts.fontWeight ?? "500";
//   div.style.fontFamily = "ui-monospace,'Cascadia Code','Fira Code',monospace";
//   div.style.whiteSpace = "nowrap";
//   div.style.pointerEvents = "none";
//   div.style.userSelect = "none";
//   div.style.letterSpacing = "0.03em";
//   div.style.lineHeight = "1";
//   if (opts.background) {
//     div.style.background = opts.background;
//     div.style.padding = opts.padding ?? "2px 5px";
//     div.style.borderRadius = "3px";
//     div.style.boxShadow = "0 1px 3px rgba(0,0,0,0.10)";
//   }
//   return new CSS2DObject(div);
// }

// // ─── Build scene ──────────────────────────────────────────────────────────────

// interface BuiltScene {
//   renderer: THREE.WebGLRenderer;
//   labelRenderer: CSS2DRenderer;
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   barMeshes: THREE.Mesh[];
//   initDist: number;
//   initLookAtY: number;
// }

// function buildScene(
//   canvas: HTMLCanvasElement,
//   wrap: HTMLDivElement,
//   gridResults: GridResult[],
//   activeSaltId: string | null,
//   cocUniq: number[],
//   tempUniq: number[],
//   maxSR: number,
//   tempUnit: string,
// ): BuiltScene {
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     antialias: true,
//     alpha: false,
//   });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setClearColor(0xf8fafc, 1);

//   const labelRenderer = new CSS2DRenderer();
//   const labelEl = labelRenderer.domElement;
//   labelEl.style.position = "absolute";
//   labelEl.style.top = "0";
//   labelEl.style.left = "0";
//   labelEl.style.width = "100%";
//   labelEl.style.height = "100%";
//   labelEl.style.pointerEvents = "none";
//   labelEl.style.overflow = "hidden";
//   labelEl.style.zIndex = "10";
//   wrap.appendChild(labelEl);

//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xf8fafc);
//   const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2000);

//   scene.add(new THREE.AmbientLight(0xffffff, 0.85));
//   const sun = new THREE.DirectionalLight(0xffffff, 0.9);
//   sun.position.set(15, 30, 15);
//   scene.add(sun);
//   const fill = new THREE.DirectionalLight(0xdbeafe, 0.35);
//   fill.position.set(-15, 8, -10);
//   scene.add(fill);
//   const bounce = new THREE.DirectionalLight(0xfef9c3, 0.2);
//   bounce.position.set(0, -10, 0);
//   scene.add(bounce);

//   const nCoC = cocUniq.length;
//   const nTemp = tempUniq.length;
//   const cocOffset = -((nCoC - 1) * SPACING) / 2;
//   const tempOffset = -((nTemp - 1) * SPACING) / 2;
//   const xMin = cocOffset - SPACING / 2;
//   const xMax = (nCoC - 1) * SPACING + cocOffset + SPACING / 2;
//   const zMin = tempOffset - SPACING / 2;
//   const zMax = (nTemp - 1) * SPACING + tempOffset + SPACING / 2;
//   const axOriginX = xMin - 0.3;
//   const axOriginY = 0;
//   const axOriginZ = zMax + 0.3;

//   const barMeshes: THREE.Mesh[] = [];

//   gridResults.forEach((d: GridResult) => {
//     const srValue: number = activeSaltId
//       ? (d.saturation_indices[activeSaltId]?.SR ?? 0)
//       : Math.max(
//           0,
//           ...Object.values(d.saturation_indices).map((e) => e.SR ?? 0),
//         );
//     const displayVal = Math.abs(srValue);
//     const h = Math.min(
//       BAR_MAX_H,
//       Math.max(0.15, (displayVal / maxSR) * BAR_MAX_H),
//     );
//     const ci = cocUniq.indexOf(d._grid_CoC);
//     const ti = tempUniq.indexOf(d._grid_temp);
//     const x = ci * SPACING + cocOffset;
//     const z = ti * SPACING + tempOffset;

//     let clr: number;
//     if (d.bar_data) {
//       clr = barColorFromBarData(d.bar_data);
//     } else {
//       const t = Math.min(1, maxSR > 0 ? displayVal / maxSR : 0);
//       if (d.color_code === "green")
//         clr =
//           t > 0.5
//             ? lightenHex("#064e3b", 1 - (t - 0.5) * 1.2)
//             : lightenHex("#d1fae5", t * 0.5);
//       else if (d.color_code === "yellow")
//         clr =
//           t > 0.5
//             ? lightenHex("#92400e", 1 - (t - 0.5) * 1.2)
//             : lightenHex("#fef9c3", t * 0.5);
//       else
//         clr =
//           t > 0.5
//             ? lightenHex("#7f1d1d", 1 - (t - 0.5) * 1.2)
//             : lightenHex("#fee2e2", t * 0.5);
//     }

//     const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
//     const mat = new THREE.MeshPhongMaterial({ color: clr, shininess: 60 });
//     const mesh = new THREE.Mesh(geo, mat);
//     mesh.position.set(x, h / 2, z);
//     mesh.userData = { data: d, origColor: clr, h };
//     scene.add(mesh);
//     barMeshes.push(mesh);
//     mesh.add(
//       new THREE.LineSegments(
//         new THREE.EdgesGeometry(geo),
//         new THREE.LineBasicMaterial({
//           color: 0x000000,
//           transparent: true,
//           opacity: 0.08,
//         }),
//       ),
//     );
//   });

//   const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
//   const gridHelper = new THREE.GridHelper(
//     gridW + 4,
//     (nCoC + nTemp) * 3,
//     0x64748b,
//     0x94a3b8,
//   );
//   gridHelper.position.y = -0.01;
//   scene.add(gridHelper);

//   const mkLine = (pts: THREE.Vector3[], color: number, opacity = 0.7): void => {
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints(pts),
//         new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
//       ),
//     );
//   };
//   const AX_COC = 0x2563eb;
//   const AX_TEMP = 0xea580c;
//   const AX_SR = 0x059669;
//   const yAxisTop = BAR_MAX_H + 2.0;
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//       new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     ],
//     AX_COC,
//     0.9,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//     ],
//     AX_TEMP,
//     0.9,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, 0, axOriginZ),
//       new THREE.Vector3(axOriginX, yAxisTop, axOriginZ),
//     ],
//     AX_SR,
//     0.9,
//   );

//   const mkArrow = (
//     dir: THREE.Vector3,
//     origin: THREE.Vector3,
//     color: number,
//   ): void => {
//     scene.add(
//       new THREE.ArrowHelper(dir.normalize(), origin, 0.7, color, 0.35, 0.18),
//     );
//   };
//   mkArrow(
//     new THREE.Vector3(1, 0, 0),
//     new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     AX_COC,
//   );
//   mkArrow(
//     new THREE.Vector3(0, 0, -1),
//     new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//     AX_TEMP,
//   );
//   mkArrow(
//     new THREE.Vector3(0, 1, 0),
//     new THREE.Vector3(axOriginX, yAxisTop, axOriginZ),
//     AX_SR,
//   );

//   cocUniq.forEach((coc, ci) => {
//     const x = ci * SPACING + cocOffset;
//     const lbl = makeLabel(`CoC ${coc}`, {
//       color: "#1d4ed8",
//       fontSize: "10px",
//       fontWeight: "700",
//       background: "rgba(219,234,254,0.80)",
//       padding: "1px 5px",
//     });
//     lbl.position.set(x, 0, axOriginZ + 0.9);
//     scene.add(lbl);
//     mkLine(
//       [
//         new THREE.Vector3(x, 0, axOriginZ),
//         new THREE.Vector3(x, 0, axOriginZ + 0.45),
//       ],
//       AX_COC,
//       0.4,
//     );
//     mkLine(
//       [new THREE.Vector3(x, 0, zMin - 0.3), new THREE.Vector3(x, 0, axOriginZ)],
//       0x93c5fd,
//       0.15,
//     );
//   });
//   const cocTitle = makeLabel("← Cycles of Concentration (CoC) →", {
//     color: "#1d4ed8",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   cocTitle.position.set((xMin + xMax) / 2, 0, axOriginZ + 2.1);
//   scene.add(cocTitle);

//   tempUniq.forEach((temp, ti) => {
//     const z = ti * SPACING + tempOffset;
//     const lbl = makeLabel(`${temp}°${tempUnit}`, {
//       color: "#c2410c",
//       fontSize: "10px",
//       fontWeight: "700",
//       background: "rgba(254,215,170,0.80)",
//       padding: "1px 5px",
//     });
//     lbl.position.set(axOriginX - 1.0, 0, z);
//     scene.add(lbl);
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, 0, z),
//         new THREE.Vector3(axOriginX - 0.45, 0, z),
//       ],
//       AX_TEMP,
//       0.4,
//     );
//     mkLine(
//       [new THREE.Vector3(axOriginX, 0, z), new THREE.Vector3(xMax + 0.3, 0, z)],
//       0xfed7aa,
//       0.15,
//     );
//   });
//   const tempTitle = makeLabel("← Temperature →", {
//     color: "#c2410c",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   tempTitle.position.set(axOriginX - 2.0, 0, (zMin + zMax) / 2);
//   scene.add(tempTitle);

//   const safMaxSR = maxSR > 0 ? maxSR : 1;
//   const srStep =
//     safMaxSR <= 1
//       ? 0.25
//       : safMaxSR <= 2
//         ? 0.5
//         : safMaxSR <= 5
//           ? 1.0
//           : safMaxSR <= 20
//             ? 5
//             : 10;
//   const srTicks: number[] = [];
//   for (
//     let v = 0;
//     v <= safMaxSR + srStep * 0.5 && srTicks.length < 50;
//     v += srStep
//   )
//     srTicks.push(parseFloat(v.toFixed(3)));
//   srTicks.forEach((v) => {
//     const yPos = (v / maxSR) * BAR_MAX_H;
//     const lbl = makeLabel(v.toFixed(2), {
//       color: "#065f46",
//       fontSize: "10px",
//       fontWeight: "600",
//       background: "rgba(209,250,229,0.80)",
//       padding: "1px 4px",
//     });
//     lbl.position.set(axOriginX - 0.7, yPos, axOriginZ);
//     scene.add(lbl);
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, yPos, axOriginZ),
//         new THREE.Vector3(axOriginX - 0.4, yPos, axOriginZ),
//       ],
//       AX_SR,
//       0.4,
//     );
//     if (v > 0)
//       mkLine(
//         [
//           new THREE.Vector3(axOriginX, yPos, axOriginZ),
//           new THREE.Vector3(xMax + 0.3, yPos, axOriginZ),
//         ],
//         0xa7f3d0,
//         0.16,
//       );
//   });
//   const srTitle = makeLabel(
//     activeSaltId
//       ? `Saturation Ratio (SR) — ${activeSaltId}`
//       : "Saturation Ratio (SR)",
//     { color: "#065f46", fontSize: "11px", fontWeight: "700" },
//   );
//   srTitle.position.set(axOriginX - 0.7, yAxisTop + 0.5, axOriginZ);
//   scene.add(srTitle);

//   const nMax = Math.max(nCoC, nTemp);
//   const spreadXZ = nMax * SPACING;
//   const initDist = Math.max(28, spreadXZ * 2.2);
//   return {
//     renderer,
//     labelRenderer,
//     scene,
//     camera,
//     barMeshes,
//     initDist,
//     initLookAtY: BAR_MAX_H * 0.4,
//   };
// }

// // ─── SceneState ───────────────────────────────────────────────────────────────

// interface SceneState {
//   renderer: THREE.WebGLRenderer;
//   labelRenderer: CSS2DRenderer;
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   barMeshes: THREE.Mesh[];
//   rotY: number;
//   rotX: number;
//   dist: number;
//   panX: number;
//   panY: number;
//   panZ: number;
//   isDragging: boolean;
//   isPanning: boolean;
//   prevX: number;
//   prevY: number;
//   hoveredMesh: THREE.Mesh | null;
//   selectedMesh: THREE.Mesh | null;
//   animId: number;
// }

// // ─── Corrosion sidebar section ────────────────────────────────────────────────

// function CorrosionSection({
//   d,
//   saltsOfInterest,
// }: {
//   d: GridResult;
//   saltsOfInterest: string[];
// }) {
//   const metals = d.corrosion;
//   const hasMetals = Object.keys(metals).length > 0;
//   const doPpm =
//     d.dissolved_oxygen_ppm ?? (d.corrosion_rate?.do_ppm as number | undefined);
//   const tempC =
//     d.corrosion_temp_c ?? (d.corrosion_rate?.temp_c as number | undefined);
//   if (!hasMetals && doPpm == null && tempC == null) return null;
//   return (
//     <SSection title="Corrosion">
//       {(doPpm != null || tempC != null) && (
//         <div className="mb-3 flex gap-2 flex-wrap">
//           {doPpm != null && (
//             <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1.5">
//               <span className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">
//                 DO
//               </span>
//               <span className="text-[13px] font-bold text-blue-700">
//                 {doPpm.toFixed(2)}
//               </span>
//               <span className="text-[11px] text-blue-400">ppm</span>
//             </div>
//           )}
//           {tempC != null && (
//             <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1.5">
//               <span className="text-[11px] text-orange-400 font-semibold uppercase tracking-wider">
//                 Temp
//               </span>
//               <span className="text-[13px] font-bold text-orange-700">
//                 {tempC}
//               </span>
//               <span className="text-[11px] text-orange-400">°C</span>
//             </div>
//           )}
//         </div>
//       )}
//       {hasMetals &&
//         Object.entries(metals).map(([key, metal]) => {
//           if (!metal) return null;
//           const label = key
//             .replace(/_/g, " ")
//             .replace(/\b\w/g, (c) => c.toUpperCase());
//           const inhibitionPct = metal.total_inhibition_percent;
//           const hasTreatment =
//             metal.cr_base_mpy != null && metal.cr_mpy !== metal.cr_base_mpy;
//           return (
//             <div
//               key={key}
//               className="py-[8px] border-b border-slate-100 last:border-0"
//             >
//               <div className="flex justify-between items-center mb-1.5">
//                 <span className="text-[13px] text-slate-700 font-semibold">
//                   {label}
//                 </span>
//                 <Badge text={metal.rating} />
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-[12px] text-slate-400">
//                   Corrosion Rate (treated)
//                 </span>
//                 <span className="text-[13px] font-bold text-slate-700">
//                   {metal.cr_mpy.toFixed(2)}{" "}
//                   <span className="text-[11px] font-normal text-slate-400">
//                     mpy
//                   </span>
//                 </span>
//               </div>
//               {hasTreatment && metal.cr_base_mpy != null && (
//                 <div className="flex justify-between items-center mt-0.5">
//                   <span className="text-[12px] text-slate-400">
//                     Base rate (untreated)
//                   </span>
//                   <span className="text-[12px] text-slate-500">
//                     {metal.cr_base_mpy.toFixed(2)}{" "}
//                     <span className="text-[11px] text-slate-400">mpy</span>
//                   </span>
//                 </div>
//               )}
//               {!hasTreatment && metal.cr_base_mpy != null && (
//                 <div className="flex justify-between items-center mt-0.5">
//                   <span className="text-[12px] text-slate-400">Base rate</span>
//                   <span className="text-[12px] text-slate-500">
//                     {metal.cr_base_mpy.toFixed(2)}{" "}
//                     <span className="text-[11px] text-slate-400">mpy</span>
//                   </span>
//                 </div>
//               )}
//               {inhibitionPct != null && (
//                 <div className="flex justify-between items-center mt-0.5">
//                   <span className="text-[12px] text-slate-400">Inhibition</span>
//                   <span className="text-[12px] font-semibold text-emerald-600">
//                     −{inhibitionPct}%
//                   </span>
//                 </div>
//               )}
//               {metal.note && (
//                 <p className="text-[11px] text-slate-300 italic mt-1">
//                   {metal.note}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//     </SSection>
//   );
// }

// // ─── DescriptionSolutionPanel ─────────────────────────────────────────────────

// function DescriptionSolutionPanel({
//   d,
//   tempUnit,
// }: {
//   d: GridResult;
//   tempUnit: string;
// }) {
//   const ds = d.description_of_solution;

//   const row = {
//     coc: d._grid_CoC,
//     temperature: d._grid_temp,
//     temp_unit: `°${tempUnit}`,
//     temperature_c: d._grid_temp_c ?? ds?.temperature_C ?? d._grid_temp,
//     ph: ds?.pH ?? d._grid_pH,
//     specific_conductance:
//       ds?.specific_conductance ?? (d as any).specific_conductance ?? 0,
//     activity_of_water: ds?.activity_of_water ?? 0,
//     charge_balance_error_pct: d.charge_balance_error_pct ?? 0,
//     density: ds?.density ?? (d as any).density ?? 0,
//     dissolved_oxygen_ppm:
//       d.dissolved_oxygen_ppm ?? d.corrosion_rate?.do_ppm ?? 0,
//     electrical_balance: (d as any).electrical_balance ?? 0,
//     ionic_strength: ds?.ionic_strength_desc ?? d.ionic_strength ?? 0,
//     mass_of_water_kg: ds?.mass_of_water_kg ?? 0,
//   };

//   function tempColor(t: number) {
//     if (t >= 25) return { bg: "#FEE2E2", text: "#B91C1C" };
//     if (t >= 18) return { bg: "#FFEDD5", text: "#C2410C" };
//     if (t >= 10) return { bg: "#FEF9C3", text: "#92400E" };
//     return { bg: "#DCFCE7", text: "#15803D" };
//   }

//   function chargeColor(v: number) {
//     return Math.abs(v) > 5
//       ? { bg: "#FEE2E2", text: "#B91C1C" }
//       : { bg: "#DCFCE7", text: "#15803D" };
//   }

//   const Pill = ({
//     bg,
//     text,
//     children,
//   }: {
//     bg: string;
//     text: string;
//     children: ReactNode;
//   }) => (
//     <span
//       style={{ background: bg, color: text }}
//       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tabular-nums whitespace-nowrap"
//     >
//       {children}
//     </span>
//   );

//   const tc = tempColor(row.temperature);
//   const cc = chargeColor(row.charge_balance_error_pct);

//   const items = [
//     {
//       icon: <Beaker className="w-3.5 h-3.5" />,
//       label: "CoC",
//       el: (
//         <Pill bg="#EDE9FE" text="#5B21B6">
//           {row.coc}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Thermometer className="w-3.5 h-3.5" />,
//       label: "Temperature",
//       el: (
//         <Pill bg={tc.bg} text={tc.text}>
//           {row.temperature}
//           {row.temp_unit}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Thermometer className="w-3.5 h-3.5" />,
//       label: "Temp °C",
//       el: (
//         <Pill bg="#E0F2FE" text="#0369A1">
//           {row.temperature_c}°C
//         </Pill>
//       ),
//     },
//     {
//       icon: <FlaskConical className="w-3.5 h-3.5" />,
//       label: "pH",
//       el: (
//         <Pill bg="#D1FAE5" text="#065F46">
//           {row.ph}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Zap className="w-3.5 h-3.5" />,
//       label: "Conductance",
//       el: (
//         <Pill bg="#CFFAFE" text="#0E7490">
//           {row.specific_conductance}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Droplets className="w-3.5 h-3.5" />,
//       label: "Activity H₂O",
//       el: (
//         <Pill bg="#DBEAFE" text="#1D4ED8">
//           {row.activity_of_water}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Activity className="w-3.5 h-3.5" />,
//       label: "Charge Bal. %",
//       el: (
//         <Pill bg={cc.bg} text={cc.text}>
//           {row.charge_balance_error_pct}%
//         </Pill>
//       ),
//     },
//     {
//       icon: <Scale className="w-3.5 h-3.5" />,
//       label: "Density",
//       el: (
//         <Pill bg="#EDE9FE" text="#6D28D9">
//           {row.density}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Wind className="w-3.5 h-3.5" />,
//       label: "DO (ppm)",
//       el: (
//         <Pill bg="#FCE7F3" text="#9D174D">
//           {typeof row.dissolved_oxygen_ppm === "number"
//             ? row.dissolved_oxygen_ppm.toFixed(4)
//             : row.dissolved_oxygen_ppm}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Zap className="w-3.5 h-3.5" />,
//       label: "Elec. Balance",
//       el: (
//         <Pill bg="#FEF3C7" text="#92400E">
//           {typeof row.electrical_balance === "number"
//             ? row.electrical_balance.toExponential(3)
//             : row.electrical_balance}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Activity className="w-3.5 h-3.5" />,
//       label: "Ionic Strength",
//       el: (
//         <Pill bg="#CCFBF1" text="#0F766E">
//           {row.ionic_strength}
//         </Pill>
//       ),
//     },
//     {
//       icon: <Scale className="w-3.5 h-3.5" />,
//       label: "Mass H₂O",
//       el: (
//         <Pill bg="#F1F5F9" text="#475569">
//           {row.mass_of_water_kg} kg
//         </Pill>
//       ),
//     },
//   ];

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
//       <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700">
//         <div className="flex items-center gap-2">
//           <FlaskConical className="w-4 h-4 text-cyan-400" />
//           <span className="text-[12px] font-bold tracking-widest uppercase text-white">
//             Description of Solution
//           </span>
//           <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
//             CoC {d._grid_CoC} · {d._grid_temp}°{tempUnit}
//           </span>
//         </div>
//       </div>
//       <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
//         {items.map(({ icon, label, el }) => (
//           <div key={label} className="flex flex-col gap-1 min-w-0">
//             <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1 truncate">
//               <span className="text-slate-300">{icon}</span>
//               {label}
//             </span>
//             <div>{el}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── DistributionOfSpeciesPanel ───────────────────────────────────────────────

// function DistributionOfSpeciesPanel({
//   d,
//   tempUnit,
// }: {
//   d: GridResult;
//   tempUnit: string;
// }) {
//   const [search, setSearch] = useState("");
//   const rawDist = d.distribution_of_species;
//   if (!rawDist || Object.keys(rawDist).length === 0) return null;

//   const speciesList = Object.entries(rawDist)
//     .map(([species, entry]) => ({
//       species,
//       molality: entry.molality,
//       activity: entry.activity,
//       element: entry.element ?? null,
//     }))
//     .sort((a, b) => Math.abs(b.molality) - Math.abs(a.molality));

//   const filtered = search.trim()
//     ? speciesList.filter(
//         (s) =>
//           s.species.toLowerCase().includes(search.toLowerCase()) ||
//           (s.element ?? "").toLowerCase().includes(search.toLowerCase()),
//       )
//     : speciesList;

//   const fmt = (n: number) => {
//     if (n === 0) return "0";
//     const abs = Math.abs(n);
//     if (abs < 1e-4 || abs >= 1e4) return n.toExponential(3);
//     return n.toPrecision(4);
//   };

//   const ELEMENT_COLORS: Record<string, { bg: string; text: string }> = {
//     Ca: { bg: "#DBEAFE", text: "#1E40AF" },
//     Mg: { bg: "#D1FAE5", text: "#065F46" },
//     "C(4)": { bg: "#FEF3C7", text: "#92400E" },
//     "S(6)": { bg: "#FCE7F3", text: "#9D174D" },
//     P: { bg: "#EDE9FE", text: "#5B21B6" },
//     Cl: { bg: "#CFFAFE", text: "#0E7490" },
//     Si: { bg: "#CCFBF1", text: "#0F766E" },
//     Na: { bg: "#FEE2E2", text: "#991B1B" },
//     K: { bg: "#FFEDD5", text: "#9A3412" },
//   };

//   const getElemStyle = (el: string | null) => {
//     if (!el) return { bg: "#F1F5F9", text: "#475569" };
//     return ELEMENT_COLORS[el] ?? { bg: "#F1F5F9", text: "#475569" };
//   };

//   const molalityBar = (mol: number, max: number) => {
//     if (max === 0) return 0;
//     return Math.min(100, (Math.abs(mol) / max) * 100);
//   };
//   const maxMol = speciesList[0]?.molality ?? 1;

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
//       <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-indigo-900 to-indigo-800">
//         <div className="flex items-center gap-2">
//           <Droplets className="w-4 h-4 text-indigo-300" />
//           <span className="text-[12px] font-bold tracking-widest uppercase text-white">
//             Distribution of Species
//           </span>
//           <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-400/20 text-indigo-200 border border-indigo-400/30">
//             {speciesList.length} species · CoC {d._grid_CoC}
//           </span>
//         </div>
//       </div>
//       <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
//         <input
//           type="text"
//           placeholder="Search species or element…"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full text-[12px] px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300 placeholder-slate-300"
//         />
//       </div>
//       <div className="overflow-auto max-h-[340px]">
//         <table className="w-full text-[12px] border-collapse">
//           <thead className="sticky top-0 z-10">
//             <tr className="bg-slate-100">
//               <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
//                 Species
//               </th>
//               <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
//                 Molality
//               </th>
//               <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
//                 Activity
//               </th>
//               <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
//                 Element
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((item, idx) => {
//               const es = getElemStyle(item.element);
//               const barPct = molalityBar(item.molality, maxMol);
//               return (
//                 <tr
//                   key={item.species}
//                   className={`border-b border-slate-50 hover:bg-indigo-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
//                 >
//                   <td className="px-3 py-2 font-mono font-semibold text-slate-800 whitespace-nowrap">
//                     {item.species}
//                   </td>
//                   <td className="px-3 py-2">
//                     <div className="flex flex-col gap-0.5">
//                       <span className="font-semibold text-blue-700 tabular-nums">
//                         {fmt(item.molality)}
//                       </span>
//                       <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden">
//                         <div
//                           className="h-full rounded-full bg-blue-400 transition-all duration-300"
//                           style={{ width: `${barPct}%` }}
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-3 py-2">
//                     <span className="font-semibold text-emerald-700 tabular-nums">
//                       {fmt(item.activity)}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2">
//                     {item.element ? (
//                       <span
//                         style={{ background: es.bg, color: es.text }}
//                         className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold"
//                       >
//                         {item.element}
//                       </span>
//                     ) : (
//                       <span className="text-slate-300 italic text-[11px]">
//                         —
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         {filtered.length === 0 && (
//           <div className="py-8 text-center text-[12px] text-slate-400 italic">
//             No matching species found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Props ────────────────────────────────────────────────────────────────────

// interface Props {
//   apiResponse?: SaturationApiResponseFlat;
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function SaturationDashboard({ apiResponse }: Props) {
//   const [activeResponse, setActiveResponse] = useState<
//     SaturationApiResponseFlat | undefined
//   >(apiResponse);
//   const [unavailableModal, setUnavailableModal] = useState<{
//     salt: string;
//     reason: string;
//   } | null>(null);
//   // bottomPanelOpen = true only when a bar is CLICKED (not hovered)
//   const [bottomPanelOpen, setBottomPanelOpen] = useState(false);
//   const [bottomTab, setBottomTab] = useState<"description" | "species">(
//     "description",
//   );

//   useEffect(() => {
//     setActiveResponse(apiResponse);
//   }, [apiResponse]);

//   const meta = useMemo(() => resolveMeta(activeResponse), [activeResponse]);
//   const gridResults = useMemo(
//     (): GridResult[] => meta?.gridResults ?? [],
//     [meta],
//   );
//   const baseSaltId: string | null = meta?.saltId ?? null;

//   const [saltAnaliysis, { isLoading }] = useSaltAnalysisMutation();

//   const runId: string | undefined = useMemo(() => {
//     if (!apiResponse) return undefined;
//     const any = apiResponse as any;
//     return apiResponse.run_id ?? any?.data?.run_id ?? undefined;
//   }, [apiResponse]);

//   const [activeSaltId, setActiveSaltId] = useState<string | null>(baseSaltId);
//   useEffect(() => {
//     setActiveSaltId(baseSaltId);
//   }, [baseSaltId]);

//   const handleSaltChipClick = useCallback(
//     async (salt: string) => {
//       if (salt === activeSaltId) {
//         setActiveSaltId(null);
//         setActiveResponse(apiResponse);
//         return;
//       }
//       if (!runId) {
//         setActiveSaltId(salt);
//         return;
//       }
//       setActiveSaltId(salt);
//       try {
//         const result = await saltAnaliysis({
//           run_id: runId,
//           salt_id: salt,
//         }).unwrap();
//         setActiveResponse(result as SaturationApiResponseFlat);
//       } catch (err) {
//         console.error("Salt analysis API error:", err);
//       }
//     },
//     [activeSaltId, apiResponse, runId, saltAnaliysis],
//   );

//   const handleResetToSR = useCallback(() => {
//     setActiveSaltId(null);
//     setActiveResponse(apiResponse);
//   }, [apiResponse]);

//   const dosage = meta?.dosagePpm ?? 0;
//   const cocMin = meta?.cocMin ?? 0;
//   const cocMax = meta?.cocMax ?? 0;
//   const tempMin = meta?.tempMin ?? 0;
//   const tempMax = meta?.tempMax ?? 0;
//   const tempUnit = meta?.tempUnit ?? "C";
//   const assetName = meta?.assetInfo?.name;
//   const summary = meta?.summary;

//   const saltsOfInterest = useMemo((): string[] => {
//     const responseAny = apiResponse as any;
//     let salts: string[] =
//       responseAny?.data?.available_salts ??
//       responseAny?.data?.graph_data?.available_salts ??
//       responseAny?.graph_data?.available_salts ??
//       responseAny?.data?.aiResponse?.available_salts ??
//       responseAny?.available_salts ??
//       [];
//     if (salts.length === 0) {
//       salts =
//         responseAny?.salts_of_interest ??
//         responseAny?.data?.aiResponse?.salts_of_interest ??
//         responseAny?.data?.salts_of_interest ??
//         [];
//     }
//     const currentSalt = activeSaltId || baseSaltId;
//     if (currentSalt && !salts.includes(currentSalt))
//       salts = [currentSalt, ...salts];
//     return salts;
//   }, [apiResponse, activeSaltId, baseSaltId]);

//   const unavailableSalts = useMemo(() => {
//     const responseAny = apiResponse as any;
//     const unavailableRaw =
//       responseAny?.data?.aiResponse?.unavailable_salts ??
//       responseAny?.unavailable_salts ??
//       responseAny?.data?.unavailable_salts ??
//       [];
//     return unavailableRaw.map((item: any) => ({
//       salt: item.salt || item.name,
//       reason: item.reason || "Not available in this analysis.",
//     }));
//   }, [apiResponse]);

//   const cocUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_CoC))].sort((a, b) => a - b),
//     [gridResults],
//   );
//   const tempUniq = useMemo(
//     () =>
//       [...new Set(gridResults.map((d) => d._grid_temp))].sort((a, b) => b - a),
//     [gridResults],
//   );

//   const maxSR = useMemo((): number => {
//     if (!gridResults.length) return 1;
//     if (activeSaltId) {
//       const vals = gridResults.map((d) =>
//         Math.abs(
//           d.saturation_indices[activeSaltId]?.SR ??
//             d.saturation_indices[activeSaltId]?.SI ??
//             0,
//         ),
//       );
//       return Math.max(...vals, 1);
//     }
//     const vals = gridResults.map((d) => Math.abs(d.indices?.lsi?.lsi ?? 0));
//     return Math.max(...vals, 1);
//   }, [gridResults, activeSaltId]);

//   // ── Resizable sidebar ──────────────────────────────────────────────────────
//   const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
//   const isResizingRef = useRef(false);
//   const resizeStartXRef = useRef(0);
//   const resizeStartWidthRef = useRef(SIDEBAR_DEFAULT);

//   const onResizeMouseDown = useCallback(
//     (e: RMouseEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       isResizingRef.current = true;
//       resizeStartXRef.current = e.clientX;
//       resizeStartWidthRef.current = sidebarWidth;
//       document.body.style.cursor = "col-resize";
//       document.body.style.userSelect = "none";
//     },
//     [sidebarWidth],
//   );

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       if (!isResizingRef.current) return;
//       const delta = resizeStartXRef.current - e.clientX;
//       setSidebarWidth(
//         Math.min(
//           SIDEBAR_MAX,
//           Math.max(SIDEBAR_MIN, resizeStartWidthRef.current + delta),
//         ),
//       );
//     };
//     const onUp = () => {
//       if (!isResizingRef.current) return;
//       isResizingRef.current = false;
//       document.body.style.cursor = "";
//       document.body.style.userSelect = "";
//     };
//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };
//   }, []);

//   const resizeFnRef = useRef<(() => void) | null>(null);
//   useEffect(() => {
//     const id = requestAnimationFrame(() => {
//       resizeFnRef.current?.();
//     });
//     return () => cancelAnimationFrame(id);
//   }, [sidebarWidth]);

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<SceneState | null>(null);

//   // ── Two separate state slots: hover vs selected ────────────────────────────
//   // hoveredData: updated on mousemove — drives sidebar preview only (NO bottom panel)
//   // selectedData: updated on click — drives sidebar + bottom panel
//   const [hoveredData, setHoveredData] = useState<GridResult | null>(null);
//   const [selectedData, setSelectedData] = useState<GridResult | null>(null);

//   // The sidebar shows: selectedData if something is pinned, else hoveredData
//   const activeData: GridResult | null = selectedData ?? hoveredData;

//   const updateCamera = useCallback(() => {
//     const s = sceneRef.current;
//     if (!s) return;
//     s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist + s.panX;
//     s.camera.position.y = Math.sin(s.rotX) * s.dist + s.panY;
//     s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist + s.panZ;
//     s.camera.lookAt(s.panX, s.panY, s.panZ);
//   }, []);

//   // ── Build / rebuild scene ──────────────────────────────────────────────────
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const wrap = wrapRef.current;
//     if (!canvas || !wrap) return;
//     if (sceneRef.current) {
//       cancelAnimationFrame(sceneRef.current.animId);
//       sceneRef.current.renderer.dispose();
//       const oldEl = sceneRef.current.labelRenderer.domElement;
//       if (oldEl.parentNode === wrap) wrap.removeChild(oldEl);
//       sceneRef.current = null;
//     }
//     if (gridResults.length === 0) return;

//     const {
//       renderer,
//       labelRenderer,
//       scene,
//       camera,
//       barMeshes,
//       initDist,
//       initLookAtY,
//     } = buildScene(
//       canvas,
//       wrap,
//       gridResults,
//       activeSaltId,
//       cocUniq,
//       tempUniq,
//       maxSR,
//       tempUnit,
//     );

//     const state: SceneState = {
//       renderer,
//       labelRenderer,
//       scene,
//       camera,
//       barMeshes,
//       rotY: 0.55,
//       rotX: 0.38,
//       dist: initDist,
//       panX: 0,
//       panY: initLookAtY,
//       panZ: 0,
//       isDragging: false,
//       isPanning: false,
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
//     resizeFnRef.current = resize;
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
//       resizeFnRef.current = null;
//       renderer.dispose();
//       const el = labelRenderer.domElement;
//       if (el.parentNode === wrap) wrap.removeChild(el);
//       sceneRef.current = null;
//     };
//   }, [
//     gridResults,
//     activeSaltId,
//     maxSR,
//     cocUniq,
//     tempUniq,
//     tempUnit,
//     updateCamera,
//   ]);

//   // ── Pointer / touch interaction ────────────────────────────────────────────
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     const S = () => sceneRef.current;

//     const resetColor = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(
//         m.userData.origColor as number,
//       );
//     const setHover = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(0x1abc9c);
//     const setSelected = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(0x1d4ed8);

//     const raycast = (cx: number, cy: number): THREE.Mesh | null => {
//       const s = S();
//       if (!s) return null;
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = ((cx - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -(((cy - rect.top) / rect.height) * 2 - 1);
//       raycaster.setFromCamera(mouse, s.camera);
//       const hits = raycaster.intersectObjects(s.barMeshes, false);
//       return hits.length > 0 ? (hits[0].object as THREE.Mesh) : null;
//     };

//     const getPanVectors = (s: SceneState) => {
//       const right = new THREE.Vector3(
//         Math.cos(s.rotY),
//         0,
//         -Math.sin(s.rotY),
//       ).normalize();
//       const fwd = new THREE.Vector3(
//         -Math.sin(s.rotY) * Math.cos(s.rotX),
//         Math.sin(s.rotX),
//         -Math.cos(s.rotY) * Math.cos(s.rotX),
//       ).normalize();
//       const up = new THREE.Vector3()
//         .crossVectors(right, fwd)
//         .negate()
//         .normalize();
//       return { right, up };
//     };

//     const onMouseDown = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       if (e.button === 1 || e.button === 2) {
//         s.isPanning = true;
//         s.isDragging = false;
//       } else {
//         s.isDragging = false;
//         s.isPanning = false;
//       }
//       s.prevX = e.clientX;
//       s.prevY = e.clientY;
//     };

//     const onMouseMove = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       const dx = e.clientX - s.prevX;
//       const dy = e.clientY - s.prevY;
//       if (s.isPanning && (e.buttons === 2 || e.buttons === 4)) {
//         const speed = s.dist * 0.0018;
//         const { right } = getPanVectors(s);
//         s.panX -= right.x * dx * speed;
//         s.panZ -= right.z * dx * speed;
//         s.panY -= dy * speed;
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         canvas.style.cursor = "move";
//         return;
//       }
//       if (
//         e.buttons === 1 &&
//         !s.isDragging &&
//         (Math.abs(dx) > 3 || Math.abs(dy) > 3)
//       )
//         s.isDragging = true;
//       if (s.isDragging && e.buttons === 1) {
//         s.rotY += dx * 0.008;
//         s.rotX -= dy * 0.008;
//         s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         canvas.style.cursor = "grabbing";
//         return;
//       }
//       // ── HOVER: update bar highlight and sidebar preview only ──
//       // Do NOT touch bottomPanelOpen or selectedData here
//       const hit = raycast(e.clientX, e.clientY);
//       if (
//         s.hoveredMesh &&
//         s.hoveredMesh !== hit &&
//         s.hoveredMesh !== s.selectedMesh
//       )
//         resetColor(s.hoveredMesh);
//       if (hit) {
//         s.hoveredMesh = hit;
//         if (hit !== s.selectedMesh) setHover(hit);
//         canvas.style.cursor = "pointer";
//         setHoveredData(hit.userData.data as GridResult);
//       } else {
//         s.hoveredMesh = null;
//         canvas.style.cursor = "grab";
//         setHoveredData(null);
//       }
//     };

//     const onMouseUp = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       if (s.isPanning) {
//         s.isPanning = false;
//         canvas.style.cursor = "grab";
//         return;
//       }
//       if (!s.isDragging) {
//         // ── CLICK: pin selection + open bottom panel ──
//         const hit = raycast(e.clientX, e.clientY);
//         if (hit) {
//           if (
//             s.selectedMesh &&
//             s.selectedMesh !== hit &&
//             s.selectedMesh !== s.hoveredMesh
//           )
//             resetColor(s.selectedMesh);
//           s.selectedMesh = hit;
//           setSelected(hit);
//           const clickedData = hit.userData.data as GridResult;
//           setSelectedData(clickedData);
//           setBottomPanelOpen(true);
//         }
//       }
//       s.isDragging = false;
//       canvas.style.cursor = "grab";
//     };

//     const onMouseLeave = () => {
//       const s = S();
//       if (!s) return;
//       if (s.hoveredMesh && s.hoveredMesh !== s.selectedMesh) {
//         resetColor(s.hoveredMesh);
//         s.hoveredMesh = null;
//       }
//       s.isDragging = false;
//       s.isPanning = false;
//       canvas.style.cursor = "grab";
//       setHoveredData(null);
//       // NOTE: do NOT clear selectedData on mouse leave
//     };

//     const onWheel = (e: WheelEvent) => {
//       const s = S();
//       if (!s) return;
//       s.dist = Math.max(8, Math.min(300, s.dist + e.deltaY * 0.07));
//       updateCamera();
//       e.preventDefault();
//     };

//     const onContextMenu = (e: MouseEvent) => e.preventDefault();
//     let lastTouchY2 = 0;
//     const onTouchStart = (e: TouchEvent) => {
//       const s = S();
//       if (!s) return;
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       s.isDragging = false;
//       s.isPanning = false;
//       if (e.touches.length === 2)
//         lastTouchY2 = (e.touches[0].clientY + e.touches[1].clientY) / 2;
//     };
//     const onTouchMove = (e: TouchEvent) => {
//       const s = S();
//       if (!s) return;
//       if (e.touches.length === 2) {
//         const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
//         s.panY -= (midY - lastTouchY2) * s.dist * 0.0018;
//         lastTouchY2 = midY;
//         updateCamera();
//         e.preventDefault();
//         return;
//       }
//       const dx = e.touches[0].clientX - s.prevX;
//       const dy = e.touches[0].clientY - s.prevY;
//       s.isDragging = true;
//       s.rotY += dx * 0.01;
//       s.rotX -= dy * 0.01;
//       s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       updateCamera();
//       e.preventDefault();
//     };

//     canvas.addEventListener("mousedown", onMouseDown);
//     canvas.addEventListener("mousemove", onMouseMove);
//     canvas.addEventListener("mouseup", onMouseUp);
//     canvas.addEventListener("mouseleave", onMouseLeave);
//     canvas.addEventListener("wheel", onWheel, { passive: false });
//     canvas.addEventListener("contextmenu", onContextMenu);
//     canvas.addEventListener("touchstart", onTouchStart, { passive: true });
//     canvas.addEventListener("touchmove", onTouchMove, { passive: false });
//     return () => {
//       canvas.removeEventListener("mousedown", onMouseDown);
//       canvas.removeEventListener("mousemove", onMouseMove);
//       canvas.removeEventListener("mouseup", onMouseUp);
//       canvas.removeEventListener("mouseleave", onMouseLeave);
//       canvas.removeEventListener("wheel", onWheel);
//       canvas.removeEventListener("contextmenu", onContextMenu);
//       canvas.removeEventListener("touchstart", onTouchStart);
//       canvas.removeEventListener("touchmove", onTouchMove);
//     };
//   }, [updateCamera]);

//   // ── Derived sidebar values ─────────────────────────────────────────────────
//   // activeData drives sidebar (hover preview OR pinned selection)
//   // bottomPanel only uses selectedData (pinned)
//   const d = activeData;
//   const bottomPanelData = selectedData; // always pinned selection for tables

//   const saltSR: number | null =
//     d && activeSaltId
//       ? (d.saturation_indices[activeSaltId]?.SR ??
//         d.saturation_indices[activeSaltId]?.SI ??
//         null)
//       : null;
//   const displaySR: number | null = saltSR ?? d?.indices?.lsi?.lsi ?? null;
//   const colorCode = d?.color_code;
//   const statusLabel: string =
//     colorCode === "yellow"
//       ? "Caution"
//       : colorCode === "red"
//         ? "Scale Risk"
//         : "Protected";
//   const statusVar: BadgeVariant =
//     colorCode === "yellow" ? "yellow" : colorCode === "red" ? "red" : "green";
//   const isEmpty = gridResults.length === 0;
//   const displaySaltLabel =
//     activeSaltId ??
//     (saltsOfInterest.length > 0 ? saltsOfInterest[0] : "Multi-Salt");

//   // Bottom panel shows only when there's a pinned selection with data
//   const hasDescription = !!bottomPanelData?.description_of_solution;
//   const hasSpecies = !!(
//     bottomPanelData?.distribution_of_species &&
//     Object.keys(bottomPanelData.distribution_of_species).length > 0
//   );
//   const hasBottomData = hasDescription || hasSpecies;

//   // Close bottom panel handler — also clears pin
//   const handleCloseBottomPanel = useCallback(() => {
//     setBottomPanelOpen(false);
//     // Optionally keep the selection visible in sidebar but close tables:
//     // If you want closing tables to also deselect, uncomment:
//     // setSelectedData(null);
//   }, []);

//   const legendItems = [
//     {
//       label: "Protected",
//       sub: "SR within safe band",
//       baseHex: "#2ECC71",
//       lightHex: "#d1fae5",
//       bg: "bg-emerald-50 border-emerald-200",
//     },
//     {
//       label: "Caution",
//       sub: "Mild scaling tendency",
//       baseHex: "#F1C40F",
//       lightHex: "#fef9c3",
//       bg: "bg-amber-50 border-amber-200",
//     },
//     {
//       label: "Scale Risk",
//       sub: "High scale risk",
//       baseHex: "#E74C3C",
//       lightHex: "#fee2e2",
//       bg: "bg-red-50 border-red-200",
//     },
//   ];

//   return (
//     <>
//       {/*
//         KEY LAYOUT CHANGE:
//         - Root is flex-col, height = 100vh (screen), overflow = hidden
//         - "main body" is flex-col flex-1 overflow-hidden
//           - "graph row" is flex flex-1 overflow-hidden  (3D + sidebar)
//             → flex-1 means it takes remaining space AFTER header/chips
//           - "bottom panel" is shrink-0, sits BELOW the graph row
//             → expands downward by growing maxHeight, NOT overlaying graph
//         - The graph row does NOT change height when bottom panel opens
//       */}
//       <div className="bg-white text-slate-800 border font-sans text-[14px] h-screen overflow-hidden flex flex-col select-none">
//         {/* ── Header ── */}
//         <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0 gap-4 flex-wrap">
//           <div>
//             <div className="text-[15px] font-bold text-slate-900">
//               Saturation Analysis —{" "}
//               <span className="text-blue-600">{displaySaltLabel}</span>
//               <span className="font-normal text-slate-400"> · 3D Grid</span>
//             </div>
//             <div className="text-[12px] text-slate-400 mt-0.5 flex flex-wrap gap-x-4">
//               {assetName && (
//                 <span className="text-slate-600 font-semibold">
//                   {assetName}
//                 </span>
//               )}
//               {(cocMin > 0 || cocMax > 0) && (
//                 <span>
//                   CoC {cocMin}–{cocMax}
//                 </span>
//               )}
//               {(tempMin > 0 || tempMax > 0) && (
//                 <span>
//                   Temp {tempMin}–{tempMax} °{tempUnit}
//                 </span>
//               )}
//               {dosage > 0 && <span>Dosage {dosage} ppm</span>}
//               {meta?.totalGridPoints && <span>{meta.totalGridPoints} pts</span>}
//             </div>
//           </div>
//           <div className="flex items-center gap-3 flex-wrap">
//             {summary && (
//               <div className="flex gap-1.5 text-[12px]">
//                 {summary.green > 0 && (
//                   <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
//                     {summary.green} Protected
//                   </span>
//                 )}
//                 {summary.yellow > 0 && (
//                   <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
//                     {summary.yellow} Caution
//                   </span>
//                 )}
//                 {summary.red > 0 && (
//                   <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-semibold">
//                     {summary.red} Scale Risk
//                   </span>
//                 )}
//               </div>
//             )}
//             {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
//               const dot =
//                 label === "Caution"
//                   ? "bg-amber-400"
//                   : label === "Scale Risk"
//                     ? "bg-red-500"
//                     : "bg-emerald-500";
//               return (
//                 <div
//                   key={label}
//                   className="flex items-center gap-1.5 text-[12px] text-slate-500"
//                 >
//                   <span
//                     className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`}
//                   />
//                   {label}
//                 </div>
//               );
//             })}
//           </div>
//         </header>

//         {/* ── Salt chips ── */}
//         {(saltsOfInterest.length > 0 || unavailableSalts.length > 0) && (
//           <div className="bg-slate-50 border-b border-slate-200 shrink-0">
//             {saltsOfInterest.length > 0 && (
//               <div className="px-5 pt-3 pb-2 flex items-center gap-2 overflow-x-auto max-h-[58px]">
//                 <span className="text-[11px] font-semibold text-slate-400 shrink-0 tracking-widest uppercase whitespace-nowrap">
//                   AVAILABLE SALTS:
//                 </span>
//                 <div className="flex gap-1.5 flex-nowrap">
//                   {saltsOfInterest.map((s) => {
//                     const isActive = s === activeSaltId;
//                     return (
//                       <button
//                         key={s}
//                         onClick={() => handleSaltChipClick(s)}
//                         disabled={isLoading}
//                         className={`text-[13px] px-3.5 py-1 rounded-full border font-medium whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${isActive ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50"}`}
//                       >
//                         {s}
//                         {isActive && <span className="text-xs">●</span>}
//                       </button>
//                     );
//                   })}
//                 </div>
//                 {activeSaltId && (
//                   <button
//                     onClick={handleResetToSR}
//                     disabled={isLoading}
//                     className="ml-2 text-xs px-3 py-1 rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100 whitespace-nowrap shrink-0"
//                   >
//                     Reset to SR
//                   </button>
//                 )}
//               </div>
//             )}
//             {unavailableSalts.length > 0 && (
//               <div className="px-5 pb-3 pt-1 border-t border-slate-100 flex items-start gap-2 overflow-x-auto max-h-[58px]">
//                 <span className="text-[11px] font-semibold text-slate-400 shrink-0 tracking-widest uppercase whitespace-nowrap pt-1">
//                   UNAVAILABLE:
//                 </span>
//                 <div className="flex gap-1.5 flex-nowrap flex-wrap">
//                   {unavailableSalts.map(({ salt, reason }: any) => (
//                     <button
//                       key={salt}
//                       onClick={() => setUnavailableModal({ salt, reason })}
//                       className="text-[12px] px-3 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-600 transition-colors flex items-center gap-1 whitespace-nowrap"
//                     >
//                       {salt}
//                       <span className="text-[10px] opacity-60">ⓘ</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Unavailable Modal */}
//         {unavailableModal && (
//           <div
//             className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
//             onClick={() => setUnavailableModal(null)}
//           >
//             <div
//               className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
//                 <div className="font-semibold text-slate-900">
//                   Why{" "}
//                   <span className="text-slate-600">
//                     {unavailableModal.salt}
//                   </span>{" "}
//                   is unavailable
//                 </div>
//                 <button
//                   onClick={() => setUnavailableModal(null)}
//                   className="text-slate-400 hover:text-slate-600 text-xl leading-none"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="p-6 text-[13px] text-slate-600 leading-relaxed">
//                 {unavailableModal.reason}
//               </div>
//               <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
//                 <button
//                   onClick={() => setUnavailableModal(null)}
//                   className="px-5 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ══════════════════════════════════════════════════════════════════
//             MAIN BODY
//             flex-col → graph row (flex-1, fixed height) + bottom panel (shrink-0, grows down)
//             The graph row NEVER changes height. The bottom panel is a separate row below it.
//         ══════════════════════════════════════════════════════════════════ */}
//         <div className="flex flex-col flex-1 min-h-0">
//           {/* ── Graph row: 3D viewport + resize handle + sidebar ── */}
//           <div className="flex flex-1 min-h-0 overflow-hidden">
//             {/* 3-D viewport */}
//             <div
//               ref={wrapRef}
//               className="flex-1 min-w-0 relative overflow-hidden"
//               style={{ background: "#f8fafc" }}
//             >
//               {isEmpty ? (
//                 <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
//                   <div className="text-5xl opacity-20">⬛</div>
//                   <p className="text-[14px]">
//                     No grid data — pass an{" "}
//                     <code className="text-slate-500 bg-slate-100 px-1 rounded">
//                       apiResponse
//                     </code>{" "}
//                     prop.
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <canvas
//                     ref={canvasRef}
//                     className="block w-full h-full cursor-grab"
//                   />

//                   {/* Loading overlay */}
//                   {isLoading && (
//                     <div
//                       className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
//                       style={{
//                         background: "rgba(248,250,252,0.78)",
//                         backdropFilter: "blur(3px)",
//                         zIndex: 25,
//                       }}
//                     >
//                       <svg
//                         className="animate-spin w-11 h-11 text-blue-500"
//                         viewBox="0 0 44 44"
//                         fill="none"
//                       >
//                         <circle
//                           cx="22"
//                           cy="22"
//                           r="18"
//                           stroke="currentColor"
//                           strokeOpacity="0.2"
//                           strokeWidth="4"
//                         />
//                         <path
//                           d="M40 22a18 18 0 00-18-18"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                           strokeLinecap="round"
//                         />
//                       </svg>
//                       <div className="text-center">
//                         <p className="text-[14px] font-semibold text-slate-700">
//                           Analysing{" "}
//                           <span className="text-blue-600">{activeSaltId}</span>
//                         </p>
//                         <p className="text-[12px] text-slate-400 mt-0.5">
//                           Fetching saturation grid…
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Axis legend */}
//                   <div
//                     className="absolute bottom-4 left-4 pointer-events-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-md"
//                     style={{ zIndex: 20 }}
//                   >
//                     {[
//                       {
//                         color: "#2563eb",
//                         label: "X — Cycles of Concentration (CoC)",
//                       },
//                       {
//                         color: "#ea580c",
//                         label: `Z — Temperature (°${tempUnit})`,
//                       },
//                       {
//                         color: "#059669",
//                         label: activeSaltId
//                           ? `Y — ${activeSaltId} Saturation Ratio (SR)`
//                           : "Y — Saturation Ratio (SR)",
//                       },
//                     ].map(({ color, label }) => (
//                       <div
//                         key={label}
//                         className="flex items-center gap-2 text-[11px] text-slate-600 py-0.5"
//                       >
//                         <div
//                           className="w-5 h-[2px] rounded shrink-0"
//                           style={{ background: color }}
//                         />
//                         {label}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Controls hint */}
//                   <div
//                     className="absolute bottom-4 right-4 pointer-events-none bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm text-[11px] text-slate-400"
//                     style={{ zIndex: 20 }}
//                   >
//                     Left-drag · Rotate &nbsp;|&nbsp; Right-drag · Pan
//                     &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click · Pin
//                   </div>

//                   {/* ── "Click a bar" hint — shown only when nothing is selected yet ── */}
//                   {!selectedData && (
//                     <div
//                       className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
//                       style={{ zIndex: 20 }}
//                     >
//                       <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/75 text-white text-[11px] font-medium backdrop-blur-sm shadow">
//                         <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
//                         Click a bar to view solution details below
//                       </div>
//                     </div>
//                   )}

//                   {/* ── "Selected" indicator pill — shown when a bar is pinned ── */}
//                   {selectedData && (
//                     <div
//                       className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto"
//                       style={{ zIndex: 20 }}
//                     >
//                       <button
//                         onClick={() => setBottomPanelOpen((v) => !v)}
//                         className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[12px] font-semibold shadow-lg hover:bg-slate-700 transition-all"
//                       >
//                         <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
//                         CoC {selectedData._grid_CoC} · {selectedData._grid_temp}
//                         °{tempUnit} — Solution Details
//                         <ChevronDown
//                           className={`w-3.5 h-3.5 transition-transform duration-300 ${bottomPanelOpen ? "rotate-180" : ""}`}
//                         />
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>

//             {/* ── Resize handle ── */}
//             <div
//               onMouseDown={onResizeMouseDown}
//               className="w-[5px] shrink-0 bg-slate-200 hover:bg-blue-400 active:bg-blue-500 cursor-col-resize transition-colors relative group"
//               style={{ zIndex: 30 }}
//               title="Drag to resize sidebar"
//             >
//               <div className="absolute inset-y-0 left-[1px] w-[3px] flex flex-col items-center justify-center gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-[3px] h-[3px] rounded-full bg-white"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* ── Right Sidebar ── */}
//             <aside
//               style={{
//                 width: sidebarWidth,
//                 minWidth: SIDEBAR_MIN,
//                 maxWidth: SIDEBAR_MAX,
//               }}
//               className="shrink-0 bg-white border-l border-slate-200 overflow-y-auto p-4"
//             >
//               {!d ? (
//                 <div className="text-center py-8">
//                   <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl">
//                     📊
//                   </div>
//                   <p className="text-[14px] font-semibold text-slate-600 mb-1">
//                     Hover or click a bar
//                   </p>
//                   <p className="text-[12px] text-slate-400">
//                     to inspect grid-point details
//                   </p>
//                   <div className="mt-6 space-y-2.5">
//                     {legendItems.map(
//                       ({ label, sub, baseHex, lightHex, bg }) => (
//                         <div
//                           key={label}
//                           className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${bg} text-left`}
//                         >
//                           <div
//                             className="w-3 h-9 rounded shrink-0"
//                             style={{
//                               background: `linear-gradient(to bottom, ${baseHex}, ${lightHex})`,
//                             }}
//                           />
//                           <div>
//                             <div className="text-[13px] font-semibold text-slate-700">
//                               {label}
//                             </div>
//                             <div className="text-[11px] text-slate-400">
//                               {sub}
//                             </div>
//                             <div className="text-[10px] text-slate-300 mt-0.5">
//                               Dark = high SR · Light = low SR
//                             </div>
//                           </div>
//                         </div>
//                       ),
//                     )}
//                   </div>
//                   <div className="mt-5 border-t border-slate-100 pt-5 space-y-2.5 text-left">
//                     <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
//                       Axis Legend
//                     </p>
//                     {[
//                       {
//                         color: "#2563eb",
//                         label: "X — Cycles of Concentration",
//                       },
//                       {
//                         color: "#ea580c",
//                         label: `Z — Temperature (°${tempUnit})`,
//                       },
//                       {
//                         color: "#059669",
//                         label: activeSaltId
//                           ? `Y — ${activeSaltId} Saturation Ratio (SR)`
//                           : "Y — Saturation Ratio (SR)",
//                       },
//                     ].map(({ color, label }) => (
//                       <div key={label} className="flex items-center gap-2.5">
//                         <div
//                           className="w-6 h-[2px] shrink-0 rounded-full"
//                           style={{ background: color }}
//                         />
//                         <span className="text-[12px] text-slate-500">
//                           {label}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-5 border-t border-slate-100 pt-4 space-y-1">
//                     <p className="text-[11px] text-slate-400 italic">
//                       ↔ Left-drag to rotate
//                     </p>
//                     <p className="text-[11px] text-slate-400 italic">
//                       ↕ Right-drag to pan
//                     </p>
//                     <p className="text-[11px] text-slate-400 italic">
//                       🖱 Scroll to zoom
//                     </p>
//                     <p className="text-[11px] text-slate-400 italic">
//                       Click bar → Solution details below
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   {/* Indicate hover vs pinned state */}
//                   {selectedData && d === selectedData && (
//                     <div className="mb-3 flex items-center gap-1.5">
//                       <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
//                       <span className="text-[11px] text-blue-600 font-semibold">
//                         Pinned selection
//                       </span>
//                     </div>
//                   )}
//                   {selectedData && d !== selectedData && (
//                     <div className="mb-3 flex items-center gap-1.5">
//                       <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
//                       <span className="text-[11px] text-teal-600 font-semibold">
//                         Hovering — click to pin
//                       </span>
//                     </div>
//                   )}
//                   {!selectedData && (
//                     <div className="mb-3 flex items-center gap-1.5">
//                       <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
//                       <span className="text-[11px] text-teal-600 font-semibold">
//                         Hovering — click to pin
//                       </span>
//                     </div>
//                   )}

//                   {d.bar_data && (
//                     <div
//                       className="mb-4 rounded-lg px-3 py-2 text-white text-[12px] font-semibold flex items-center gap-2"
//                       style={{ backgroundColor: d.bar_data.color_hex }}
//                     >
//                       <div
//                         className="w-3 h-3 rounded-full border border-white/40"
//                         style={{ opacity: d.bar_data.opacity }}
//                       />
//                       {statusLabel} · SR intensity{" "}
//                       {Math.round(d.bar_data.opacity * 100)}%
//                     </div>
//                   )}
//                   <SSection title="Grid Point">
//                     <SRow label="CoC" value={String(d._grid_CoC)} />
//                     <SRow
//                       label="Temperature"
//                       value={`${d._grid_temp} °${tempUnit}`}
//                     />
//                     <SRow label="pH" value={String(d._grid_pH)} />
//                     <SRow
//                       label="Ionic Strength"
//                       value={d.ionic_strength?.toFixed(5) ?? "—"}
//                     />
//                     {(d.dissolved_oxygen_ppm != null ||
//                       (d.corrosion_rate?.do_ppm as number | undefined) !=
//                         null) && (
//                       <SRow
//                         label="Dissolved O₂"
//                         value={`${(d.dissolved_oxygen_ppm ?? (d.corrosion_rate?.do_ppm as number)).toFixed(2)} ppm`}
//                       />
//                     )}
//                     {d.description_of_solution?.activity_of_water != null && (
//                       <SRow
//                         label="Activity H₂O"
//                         value={d.description_of_solution.activity_of_water.toFixed(
//                           3,
//                         )}
//                       />
//                     )}
//                     {d.charge_balance_error_pct !== undefined && (
//                       <SRow
//                         label="Charge Bal. Err"
//                         value={`${d.charge_balance_error_pct}%`}
//                       />
//                     )}
//                   </SSection>

//                   <SSection
//                     title={
//                       activeSaltId
//                         ? `${activeSaltId} — Saturation Ratio`
//                         : "Saturation Ratio (SR)"
//                     }
//                   >
//                     <SRow
//                       label="Saturation Ratio (SR)"
//                       value={displaySR !== null ? displaySR.toFixed(4) : "—"}
//                       bold
//                     />
//                     <div className="flex justify-between items-center py-[6px]">
//                       <span className="text-[13px] text-slate-500">Status</span>
//                       <Badge text={statusLabel} variant={statusVar} />
//                     </div>
//                   </SSection>

//                   {saltsOfInterest.length > 0 &&
//                     Object.keys(d.saturation_indices).length > 0 && (
//                       <SSection title="Key Salts SR">
//                         {saltsOfInterest.map((salt) => {
//                           const entry = d.saturation_indices[salt];
//                           const isActive = salt === activeSaltId;
//                           const srDisplay =
//                             entry?.SR != null ? entry.SR : entry?.SI;
//                           return (
//                             <div
//                               key={salt}
//                               className="flex justify-between items-center py-[6px] border-b border-slate-100 last:border-0"
//                             >
//                               <div className="flex items-center gap-1.5 min-w-0">
//                                 <span
//                                   className={`text-[13px] truncate ${isActive ? "font-semibold text-blue-700" : "text-slate-500"}`}
//                                 >
//                                   {salt}
//                                 </span>
//                                 {entry?.chemical_formula && (
//                                   <span className="text-[10px] text-slate-300 shrink-0">
//                                     {entry.chemical_formula}
//                                   </span>
//                                 )}
//                               </div>
//                               <span
//                                 className={`text-[13px] font-semibold shrink-0 ${srDisplay != null && srDisplay > 0 ? "text-red-600" : "text-slate-400"}`}
//                               >
//                                 {srDisplay != null ? srDisplay : "—"}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </SSection>
//                     )}

//                   <SSection title="Deposition Indices">
//                     <SRow
//                       label="LSI"
//                       value={d.indices.lsi.lsi.toFixed(2)}
//                       badge={d.indices.lsi.risk}
//                     />
//                     {d.indices.ryznar.risk !== "N/A" && (
//                       <SRow
//                         label="RSI"
//                         value={d.indices.ryznar.ri.toFixed(2)}
//                         badge={d.indices.ryznar.risk}
//                       />
//                     )}
//                     {d.indices.puckorius.risk !== "N/A" && (
//                       <SRow
//                         label="PSI"
//                         value={d.indices.puckorius.index.toFixed(2)}
//                         badge={d.indices.puckorius.risk}
//                       />
//                     )}
//                     {d.indices.larson_skold.risk_level !== "N/A" && (
//                       <SRow
//                         label="Larson-Skold"
//                         value={
//                           d.indices.larson_skold.index != null
//                             ? d.indices.larson_skold.index.toFixed(3)
//                             : "N/A"
//                         }
//                         badge={`${d.indices.larson_skold.risk_level} Risk`}
//                       />
//                     )}
//                     {d.indices.stiff_davis.risk !== "N/A" && (
//                       <SRow
//                         label="Stiff-Davis"
//                         value={
//                           d.indices.stiff_davis.index != null
//                             ? d.indices.stiff_davis.index.toFixed(3)
//                             : "N/A"
//                         }
//                         badge={
//                           d.indices.stiff_davis.risk ??
//                           d.indices.stiff_davis.interpretation ??
//                           ""
//                         }
//                       />
//                     )}
//                     {d.indices.ccpp.risk !== "N/A" && (
//                       <SRow
//                         label="CCPP (ppm)"
//                         value={
//                           d.indices.ccpp.ccpp_ppm != null
//                             ? String(d.indices.ccpp.ccpp_ppm)
//                             : "N/A"
//                         }
//                         badge={d.indices.ccpp.risk}
//                       />
//                     )}
//                   </SSection>

//                   <CorrosionSection d={d} saltsOfInterest={saltsOfInterest} />

//                   {Object.keys(d.saturation_indices).length > 0 && (
//                     <SSection title="All Minerals SR">
//                       {Object.entries(d.saturation_indices)
//                         .sort(([, a], [, b]) => {
//                           const srA = a.SR ?? a.SI;
//                           const srB = b.SR ?? b.SI;
//                           return srB - srA;
//                         })
//                         .map(([key, val]) => {
//                           const isTarget = key === activeSaltId;
//                           const isInterest = saltsOfInterest.includes(key);
//                           const srVal = val.SR ?? val.SI;
//                           return (
//                             <div
//                               key={key}
//                               className={`flex justify-between items-center py-[5px] border-b border-slate-50 last:border-0 ${isTarget ? "bg-blue-50 -mx-1 px-1 rounded" : ""}`}
//                             >
//                               <div className="flex items-center gap-1 min-w-0">
//                                 <span
//                                   className={`text-[13px] truncate ${isTarget ? "font-bold text-blue-700" : isInterest ? "font-semibold text-slate-700" : "text-slate-400"}`}
//                                 >
//                                   {key}
//                                 </span>
//                                 {val.chemical_formula && (
//                                   <span className="text-[10px] text-slate-300 shrink-0 hidden sm:inline">
//                                     {val.chemical_formula}
//                                   </span>
//                                 )}
//                               </div>
//                               <span
//                                 className={`text-[13px] shrink-0 font-semibold ${srVal > 0 ? "text-red-600" : "text-slate-300"} ${isTarget ? "font-bold" : ""}`}
//                               >
//                                 {srVal}
//                               </span>
//                             </div>
//                           );
//                         })}
//                     </SSection>
//                   )}
//                 </>
//               )}
//             </aside>
//           </div>

//           {bottomPanelData && hasBottomData && (
//             <div
//               className="shrink-0 border-t-2 border-slate-300 bg-white overflow-hidden"
//               style={{
//                 // Transition open/close with maxHeight animation
//                 maxHeight: bottomPanelOpen ? "480px" : "0px",
//                 transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
//                 // Panel is below graph, never overlaps it
//               }}
//             >
//               {/* Panel header — always rendered so close button works even mid-animation */}
//               <div className="flex items-center justify-between px-5 py-2 bg-slate-50 border-b border-slate-200 shrink-0">
//                 <div className="flex items-center gap-1">
//                   {hasDescription && (
//                     <button
//                       onClick={() => setBottomTab("description")}
//                       className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${bottomTab === "description" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
//                     >
//                       <FlaskConical className="w-3.5 h-3.5" />
//                       Description of Solution
//                     </button>
//                   )}
//                   {hasSpecies && (
//                     <button
//                       onClick={() => setBottomTab("species")}
//                       className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${bottomTab === "species" ? "bg-indigo-700 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
//                     >
//                       <Droplets className="w-3.5 h-3.5" />
//                       Distribution of Species
//                     </button>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[11px] text-slate-400 font-mono">
//                     CoC {bottomPanelData._grid_CoC} ·{" "}
//                     {bottomPanelData._grid_temp}°{tempUnit} · pH{" "}
//                     {bottomPanelData._grid_pH}
//                   </span>
//                   <button
//                     onClick={handleCloseBottomPanel}
//                     className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
//                     title="Close panel"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Panel scrollable content */}
//               <div className="overflow-y-auto" style={{ maxHeight: "420px" }}>
//                 <div className="p-4">
//                   {bottomTab === "description" && hasDescription && (
//                     <DescriptionSolutionPanel
//                       d={bottomPanelData}
//                       tempUnit={tempUnit}
//                     />
//                   )}
//                   {bottomTab === "species" && hasSpecies && (
//                     <DistributionOfSpeciesPanel
//                       d={bottomPanelData}
//                       tempUnit={tempUnit}
//                     />
//                   )}
//                   {bottomTab === "description" && !hasDescription && (
//                     <div className="text-center py-8 text-[13px] text-slate-400 italic">
//                       No description_of_solution data for this grid point.
//                     </div>
//                   )}
//                   {bottomTab === "species" && !hasSpecies && (
//                     <div className="text-center py-8 text-[13px] text-slate-400 italic">
//                       No distribution_of_species data for this grid point.
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useSaltAnalysisMutation } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  MouseEvent as RMouseEvent,
} from "react";
import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import {
  Droplets,
  Thermometer,
  FlaskConical,
  Zap,
  Wind,
  Scale,
  Activity,
  Beaker,
  ChevronDown,
  X,
  TableProperties,
  Eye,
  EyeOff,
  PanelBottomOpen,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SIEntry {
  SI: number;
  SR?: number;
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
  index: number | null;
  interpretation?: string;
  risk_level: string;
  components?: Record<string, number>;
}

export interface StiffDavisIndex {
  index: number | null;
  interpretation?: string;
  risk?: string;
  components?: Record<string, number>;
}

export interface CcppIndex {
  ccpp_ppm: number | null;
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
  note?: string;
}

export interface CorrosionRate {
  mild_steel?: CorrosionMetal;
  copper?: CorrosionMetal;
  admiralty_brass?: CorrosionMetal;
  do_ppm?: number;
  temp_c?: number;
  [key: string]: CorrosionMetal | number | undefined;
}

export interface Corrosion {
  mild_steel?: CorrosionMetal;
  copper?: CorrosionMetal;
  admiralty_brass?: CorrosionMetal;
  [key: string]: CorrosionMetal | undefined;
}

export interface BarData {
  color_hex: string;
  opacity: number;
  sr_color: string;
  sr_color_hex: string;
}

export interface DescriptionOfSolution {
  pH?: number;
  specific_conductance?: number;
  density?: number;
  activity_of_water?: number;
  ionic_strength_desc?: number;
  mass_of_water_kg?: number;
  temperature_C?: number;
  [key: string]: number | undefined;
}

export interface SpeciesEntry {
  molality: number;
  activity: number;
  element?: string | null;
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
  dissolved_oxygen_ppm?: number;
  corrosion_temp_c?: number;
  description_of_solution?: DescriptionOfSolution | null;
  distribution_of_species?: Record<string, SpeciesEntry> | null;
  calculations?: Record<string, unknown>;
  bar_data?: BarData;
  corrosion_rate?: CorrosionRate;
  specific_conductance?: number;
  density?: number;
  electrical_balance?: number;
  _grid_temp_c?: number;
}

export interface SaturationApiResponseFlat {
  success?: boolean;
  run_id?: string;
  salt_id?: string | null;
  salts_of_interest?: string[];
  dosage_ppm?: number;
  coc_min?: number;
  coc_max?: number;
  temp_min?: number;
  temp_max?: number;
  temp_unit?: string;
  ph_mode?: string;
  total_grid_points?: number;
  grid_results?: GridResult[];
  summary?: { green: number; yellow: number; red: number; error: number };
  base_water_parameters?: Record<string, { value: number; unit: string }>;
  asset_info?: { name?: string; type?: string };
  data?: {
    aiResponse?: Partial<SaturationApiResponseFlat>;
    salt_id?: string | null;
    salts_of_interest?: string[];
    dosage_ppm?: number;
    coc_min?: number;
    coc_max?: number;
    temp_min?: number;
    temp_max?: number;
    temp_unit?: string;
    ph_mode?: string;
    total_grid_points?: number;
    grid_results?: GridResult[];
    summary?: { green: number; yellow: number; red: number; error: number };
    base_water_parameters?: Record<string, { value: number; unit: string }>;
    asset_info?: { name?: string; type?: string };
    available_salts?: string[];
    chart_data?: {
      salt_id?: string | null;
      temp_unit?: string;
      available_salts?: string[];
      total_points?: number;
      points?: any[];
    };
    graph_data?: {
      type?: string;
      salt_id?: string | null;
      temp_unit?: string;
      total_points?: number;
      available_salts?: string[];
      points?: any[];
      axes?: {
        x?: { label?: string; values?: number[] };
        y?: { label?: string; unit?: string };
        z?: { label?: string; values?: number[] };
      };
    };
    run_id?: string;
  };
}

interface RawGridPoint extends Omit<GridResult, "indices" | "corrosion"> {
  indices?: Indices;
  corrosion?: Corrosion;
  corrosion_rate?: CorrosionRate;
  calculations?: {
    lsi?: LsiIndex;
    ryznar?: RyznarIndex;
    puckorius?: PuckoriusIndex;
    larson_skold?: LarsonSkoldIndex;
    stiff_davis?: StiffDavisIndex;
    ccpp?: CcppIndex;
    mild_steel_corrosion?: CorrosionMetal;
    copper_corrosion?: CorrosionMetal;
    admiralty_brass_corrosion?: CorrosionMetal;
  };
  bar_data?: BarData;
}

interface ResolvedMeta {
  saltId: string | null;
  saltsOfInterest: string[];
  dosagePpm: number;
  cocMin: number;
  cocMax: number;
  tempMin: number;
  tempMax: number;
  tempUnit: string;
  phMode?: string;
  totalGridPoints?: number;
  gridResults: GridResult[];
  summary?: { green: number; yellow: number; red: number; error: number };
  baseWaterParameters?: Record<string, { value: number; unit: string }>;
  assetInfo?: { name?: string; type?: string };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BAR_W = 1.55;
const SPACING = 2.4;
const BAR_MAX_H = 8.0;

const SIDEBAR_MIN = 240;
const SIDEBAR_MAX = 560;
const SIDEBAR_DEFAULT = 300;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexStringToThreeNum(hex: string): number {
  return parseInt(hex.replace("#", ""), 16);
}

function darkenHex(hex: string, factor: number): number {
  const num = hexStringToThreeNum(hex);
  const r = Math.round(((num >> 16) & 0xff) * factor);
  const g = Math.round(((num >> 8) & 0xff) * factor);
  const b = Math.round((num & 0xff) * factor);
  return (r << 16) | (g << 8) | b;
}

function lightenHex(hex: string, factor: number): number {
  const num = hexStringToThreeNum(hex);
  const r = Math.round(
    ((num >> 16) & 0xff) + (255 - ((num >> 16) & 0xff)) * factor,
  );
  const g = Math.round(
    ((num >> 8) & 0xff) + (255 - ((num >> 8) & 0xff)) * factor,
  );
  const b = Math.round((num & 0xff) + (255 - (num & 0xff)) * factor);
  return (r << 16) | (g << 8) | b;
}

function barColorFromBarData(barData: BarData): number {
  const t = Math.max(0, Math.min(1, barData.opacity));
  if (t > 0.5) return darkenHex(barData.color_hex, 0.5 + (t - 0.5) * 1.0);
  return lightenHex(barData.color_hex, (0.5 - t) * 0.65);
}

// ─── Corrosion normaliser ─────────────────────────────────────────────────────

function normaliseCorrosion(raw: RawGridPoint): {
  corrosion: Corrosion;
  dissolved_oxygen_ppm?: number;
  corrosion_temp_c?: number;
} {
  if (raw.corrosion_rate && typeof raw.corrosion_rate === "object") {
    const cr = raw.corrosion_rate;
    const metals: Corrosion = {};
    const do_ppm = typeof cr.do_ppm === "number" ? cr.do_ppm : undefined;
    const corrosion_temp_c =
      typeof cr.temp_c === "number" ? cr.temp_c : undefined;
    const SCALAR_KEYS = new Set(["do_ppm", "temp_c"]);
    for (const key of Object.keys(cr)) {
      if (SCALAR_KEYS.has(key)) continue;
      const val = cr[key];
      if (val && typeof val === "object" && "cr_mpy" in val) {
        metals[key] = val as CorrosionMetal;
      }
    }
    return {
      corrosion: metals,
      dissolved_oxygen_ppm: do_ppm,
      corrosion_temp_c,
    };
  }
  if (raw.corrosion && typeof raw.corrosion === "object") {
    return {
      corrosion: raw.corrosion,
      dissolved_oxygen_ppm: raw.dissolved_oxygen_ppm,
      corrosion_temp_c: raw.corrosion_temp_c,
    };
  }
  const calc = raw.calculations ?? {};
  const metals: Corrosion = {};
  if ((calc as any).mild_steel_corrosion)
    metals.mild_steel = (calc as any).mild_steel_corrosion;
  if ((calc as any).copper_corrosion)
    metals.copper = (calc as any).copper_corrosion;
  if ((calc as any).admiralty_brass_corrosion)
    metals.admiralty_brass = (calc as any).admiralty_brass_corrosion;
  return {
    corrosion: metals,
    dissolved_oxygen_ppm: raw.dissolved_oxygen_ppm,
    corrosion_temp_c: raw.corrosion_temp_c,
  };
}

// ─── Point mappers ────────────────────────────────────────────────────────────

function mapPointToGridResult(p: any, saltId: string | null): GridResult {
  const saturation_indices: Record<string, SIEntry> = {};
  for (const [key, val] of Object.entries(p.all_si ?? {})) {
    const v = val as any;
    saturation_indices[key] = {
      SI: v.SI ?? 0,
      SR: v.SR,
      log_IAP: v.log_IAP,
      log_K: v.log_K,
      chemical_formula: v.chemical_formula,
    };
  }
  const srValue: number = saltId
    ? (saturation_indices[saltId]?.SR ??
      saturation_indices[saltId]?.SI ??
      p.si ??
      0)
    : (p.sr ?? p.si ?? 0);
  const colorRaw: string = p.color ?? "green";
  const color_code = (
    ["green", "yellow", "red"].includes(colorRaw) ? colorRaw : "red"
  ) as "green" | "yellow" | "red";
  const lsiRisk =
    color_code === "green"
      ? "Low Scale"
      : color_code === "yellow"
        ? "Moderate"
        : "High Scale";
  const bar_data: BarData = {
    color_hex:
      p.color_hex ??
      (color_code === "green"
        ? "#2ECC71"
        : color_code === "red"
          ? "#E74C3C"
          : "#F1C40F"),
    opacity: p.opacity ?? 1,
    sr_color: color_code,
    sr_color_hex: p.color_hex ?? "#2ECC71",
  };
  const { corrosion, dissolved_oxygen_ppm, corrosion_temp_c } =
    normaliseCorrosion(p as RawGridPoint);
  return {
    _grid_CoC: p.coc ?? p.CoC ?? 0,
    _grid_temp: p.temperature ?? p.temp ?? 0,
    _grid_pH: p.ph ?? p.pH ?? 0,
    ionic_strength: p.ionic_strength ?? 0,
    charge_balance_error_pct: p.charge_balance_error_pct,
    saturation_indices,
    color_code,
    bar_data,
    dissolved_oxygen_ppm: dissolved_oxygen_ppm ?? p.dissolved_oxygen_ppm,
    corrosion_temp_c,
    description_of_solution: p.description_of_solution ?? null,
    distribution_of_species: p.distribution_of_species ?? null,
    indices: {
      lsi: { lsi: srValue, risk: lsiRisk, pHs: 0 },
      ryznar: { ri: 0, risk: "N/A", pHs: 0 },
      puckorius: { index: 0, risk: "N/A" },
      larson_skold: { index: null, risk_level: "N/A" },
      stiff_davis: { index: null, risk: "N/A", interpretation: "N/A" },
      ccpp: { ccpp_ppm: null, risk: "N/A" },
    },
    corrosion,
    corrosion_rate: p.corrosion_rate,
  };
}

function normaliseRawPoint(d: RawGridPoint): GridResult {
  if (d.indices && d.corrosion) return d as GridResult;
  const calc = (d as any).calculations ?? {};
  const { corrosion, dissolved_oxygen_ppm, corrosion_temp_c } =
    normaliseCorrosion(d);
  return {
    ...(d as any),
    dissolved_oxygen_ppm:
      dissolved_oxygen_ppm ?? (d as any).dissolved_oxygen_ppm,
    corrosion_temp_c,
    description_of_solution: (d as any).description_of_solution ?? null,
    distribution_of_species: (d as any).distribution_of_species ?? null,
    indices: d.indices ?? {
      lsi: calc.lsi ?? { lsi: 0, risk: "Unknown", pHs: 0 },
      ryznar: calc.ryznar ?? { ri: 0, risk: "Unknown", pHs: 0 },
      puckorius: calc.puckorius ?? { index: 0, risk: "Unknown" },
      larson_skold: calc.larson_skold ?? { index: null, risk_level: "Unknown" },
      stiff_davis: calc.stiff_davis ?? {
        index: null,
        risk: "",
        interpretation: "",
      },
      ccpp: calc.ccpp ?? { ccpp_ppm: null, risk: "Unknown" },
    },
    corrosion,
  };
}

// ─── API shape resolver ───────────────────────────────────────────────────────

function resolveMeta(
  apiResponse: SaturationApiResponseFlat | undefined,
): ResolvedMeta | null {
  if (!apiResponse) return null;
  const responseAny = apiResponse as any;

  const topLevelGridResults: RawGridPoint[] =
    responseAny?.data?.grid_results ?? responseAny?.grid_results ?? [];
  if (topLevelGridResults.length > 0 && topLevelGridResults[0]?.bar_data) {
    const tempUnit = (
      responseAny?.data?.temp_unit ??
      responseAny?.temp_unit ??
      "F"
    ).replace("°", "");
    const saltId: string | null =
      responseAny?.data?.salt_id ?? responseAny?.salt_id ?? null;
    const gridResults: GridResult[] =
      topLevelGridResults.map(normaliseRawPoint);
    const summary = responseAny?.data?.summary ?? responseAny?.summary;
    const availableSalts: string[] =
      responseAny?.data?.available_salts ?? responseAny?.available_salts ?? [];
    const cocVals = gridResults.map((d) => d._grid_CoC);
    const tempVals = gridResults.map((d) => d._grid_temp);
    return {
      saltId,
      saltsOfInterest: availableSalts,
      dosagePpm: responseAny?.data?.dosage_ppm ?? responseAny?.dosage_ppm ?? 0,
      cocMin: cocVals.length ? Math.min(...cocVals) : 0,
      cocMax: cocVals.length ? Math.max(...cocVals) : 0,
      tempMin: tempVals.length ? Math.min(...tempVals) : 0,
      tempMax: tempVals.length ? Math.max(...tempVals) : 0,
      tempUnit,
      totalGridPoints: gridResults.length,
      gridResults,
      summary,
    };
  }

  const graphData = responseAny?.data?.graph_data ?? responseAny?.graph_data;
  if (graphData?.axes) {
    const tempUnit = graphData.temp_unit?.replace("°", "") ?? "C";
    const saltId: string | null = graphData.salt_id ?? null;
    const cocValues: number[] = graphData.axes?.x?.values ?? [];
    const tempValues: number[] = graphData.axes?.z?.values ?? [];
    const rawPoints: any[] =
      graphData.points ?? responseAny?.data?.points ?? [];
    let gridResults: GridResult[];
    if (rawPoints.length > 0) {
      gridResults = rawPoints.map((p: any) => mapPointToGridResult(p, saltId));
    } else {
      gridResults = cocValues.flatMap((coc) =>
        tempValues.map(
          (temp): GridResult => ({
            _grid_CoC: coc,
            _grid_temp: temp,
            _grid_pH: 7,
            ionic_strength: 0,
            saturation_indices: {},
            color_code: "green",
            bar_data: {
              color_hex: "#2ECC71",
              opacity: 1,
              sr_color: "green",
              sr_color_hex: "#2ECC71",
            },
            indices: {
              lsi: { lsi: 0, risk: "N/A", pHs: 0 },
              ryznar: { ri: 0, risk: "N/A", pHs: 0 },
              puckorius: { index: 0, risk: "N/A" },
              larson_skold: { index: null, risk_level: "N/A" },
              stiff_davis: { index: null, risk: "N/A", interpretation: "N/A" },
              ccpp: { ccpp_ppm: null, risk: "N/A" },
            },
            corrosion: {},
          }),
        ),
      );
    }
    const summary = responseAny?.data?.summary;
    const cocVals = gridResults.map((d) => d._grid_CoC);
    const tempVals = gridResults.map((d) => d._grid_temp);
    return {
      saltId,
      saltsOfInterest: graphData.available_salts ?? [],
      dosagePpm: 0,
      cocMin: cocVals.length ? Math.min(...cocVals) : 0,
      cocMax: cocVals.length ? Math.max(...cocVals) : 0,
      tempMin: tempVals.length ? Math.min(...tempVals) : 0,
      tempMax: tempVals.length ? Math.max(...tempVals) : 0,
      tempUnit,
      totalGridPoints: graphData.total_points ?? gridResults.length,
      gridResults,
      summary,
    };
  }

  const chartData = responseAny?.data?.chart_data;
  if (chartData?.points) {
    const tempUnit = chartData.temp_unit?.replace("°", "") ?? "C";
    const saltId: string | null = chartData.salt_id ?? null;
    const gridResults: GridResult[] = chartData.points.map((p: any) =>
      mapPointToGridResult(p, saltId),
    );
    const summary = responseAny?.data?.summary;
    const availableSalts: string[] = chartData.available_salts ?? [];
    const cocVals = gridResults.map((d) => d._grid_CoC);
    const tempVals = gridResults.map((d) => d._grid_temp);
    return {
      saltId,
      saltsOfInterest: availableSalts,
      dosagePpm: 0,
      cocMin: Math.min(...cocVals),
      cocMax: Math.max(...cocVals),
      tempMin: Math.min(...tempVals),
      tempMax: Math.max(...tempVals),
      tempUnit,
      totalGridPoints: chartData.total_points,
      gridResults,
      summary,
    };
  }

  type SrcShape = Partial<SaturationApiResponseFlat> & {
    grid_results?: RawGridPoint[];
  };
  let src: SrcShape = apiResponse as SrcShape;
  if (src.data && typeof src.data === "object") {
    if (src.data.aiResponse && typeof src.data.aiResponse === "object")
      src = src.data.aiResponse as SrcShape;
    else src = src.data as SrcShape;
  }
  const rawGrid: RawGridPoint[] = (src.grid_results as RawGridPoint[]) ?? [];
  const gridResults: GridResult[] = rawGrid.map(normaliseRawPoint);
  return {
    saltId: (src.salt_id as string | null) ?? null,
    saltsOfInterest: (src.salts_of_interest as string[]) ?? [],
    dosagePpm: (src.dosage_ppm as number) ?? 0,
    cocMin: (src.coc_min as number) ?? 0,
    cocMax: (src.coc_max as number) ?? 0,
    tempMin: (src.temp_min as number) ?? 0,
    tempMax: (src.temp_max as number) ?? 0,
    tempUnit: (src.temp_unit as string) ?? "C",
    phMode: src.ph_mode as string | undefined,
    totalGridPoints: src.total_grid_points as number | undefined,
    gridResults,
    summary: src.summary as ResolvedMeta["summary"],
    baseWaterParameters:
      src.base_water_parameters as ResolvedMeta["baseWaterParameters"],
    assetInfo: src.asset_info as ResolvedMeta["assetInfo"],
  };
}

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
  yellow: "bg-amber-50   text-amber-700   border border-amber-200",
  red: "bg-red-50     text-red-700     border border-red-200",
  green: "bg-gray-100   text-gray-600    border border-gray-300",
  info: "bg-blue-50    text-blue-700    border border-blue-200",
  warn: "bg-orange-50  text-orange-700  border border-orange-200",
};

function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
  const v: BadgeVariant = variant ?? getBadgeVariant(text);
  return (
    <span
      className={`text-[12px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap ${badgeCls[v]}`}
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
    <div className="flex justify-between items-center py-[6px] border-b border-slate-100 gap-2 last:border-0">
      <span
        className={`text-[13px] shrink-0 ${bold ? "font-semibold text-slate-800" : "text-slate-500"}`}
      >
        {label}
      </span>
      <span
        className={`text-[13px] flex items-center gap-1 flex-wrap justify-end ${bold ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}
      >
        {value}
        {badge && <Badge text={badge} />}
      </span>
    </div>
  );
}

function SSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-2 pb-1 border-b border-slate-200">
        {title}
      </div>
      {children}
    </div>
  );
}

// ─── CSS2D label helper ───────────────────────────────────────────────────────

interface LabelOpts {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  background?: string;
  padding?: string;
}

function makeLabel(text: string, opts: LabelOpts = {}): CSS2DObject {
  const div = document.createElement("div");
  div.textContent = text;
  div.style.color = opts.color ?? "rgba(30,41,59,0.85)";
  div.style.fontSize = opts.fontSize ?? "10px";
  div.style.fontWeight = opts.fontWeight ?? "500";
  div.style.fontFamily = "ui-monospace,'Cascadia Code','Fira Code',monospace";
  div.style.whiteSpace = "nowrap";
  div.style.pointerEvents = "none";
  div.style.userSelect = "none";
  div.style.letterSpacing = "0.03em";
  div.style.lineHeight = "1";
  if (opts.background) {
    div.style.background = opts.background;
    div.style.padding = opts.padding ?? "2px 5px";
    div.style.borderRadius = "3px";
    div.style.boxShadow = "0 1px 3px rgba(0,0,0,0.10)";
  }
  return new CSS2DObject(div);
}

// ─── Build scene ──────────────────────────────────────────────────────────────

interface BuiltScene {
  renderer: THREE.WebGLRenderer;
  labelRenderer: CSS2DRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  barMeshes: THREE.Mesh[];
  initDist: number;
  initLookAtY: number;
}

function buildScene(
  canvas: HTMLCanvasElement,
  wrap: HTMLDivElement,
  gridResults: GridResult[],
  activeSaltId: string | null,
  cocUniq: number[],
  tempUniq: number[],
  maxSR: number,
  tempUnit: string,
): BuiltScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xf8fafc, 1);

  const labelRenderer = new CSS2DRenderer();
  const labelEl = labelRenderer.domElement;
  labelEl.style.position = "absolute";
  labelEl.style.top = "0";
  labelEl.style.left = "0";
  labelEl.style.width = "100%";
  labelEl.style.height = "100%";
  labelEl.style.pointerEvents = "none";
  labelEl.style.overflow = "hidden";
  labelEl.style.zIndex = "10";
  wrap.appendChild(labelEl);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf8fafc);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2000);

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const sun = new THREE.DirectionalLight(0xffffff, 0.9);
  sun.position.set(15, 30, 15);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xdbeafe, 0.35);
  fill.position.set(-15, 8, -10);
  scene.add(fill);
  const bounce = new THREE.DirectionalLight(0xfef9c3, 0.2);
  bounce.position.set(0, -10, 0);
  scene.add(bounce);

  const nCoC = cocUniq.length;
  const nTemp = tempUniq.length;
  const cocOffset = -((nCoC - 1) * SPACING) / 2;
  const tempOffset = -((nTemp - 1) * SPACING) / 2;
  const xMin = cocOffset - SPACING / 2;
  const xMax = (nCoC - 1) * SPACING + cocOffset + SPACING / 2;
  const zMin = tempOffset - SPACING / 2;
  const zMax = (nTemp - 1) * SPACING + tempOffset + SPACING / 2;
  const axOriginX = xMin - 0.3;
  const axOriginY = 0;
  const axOriginZ = zMax + 0.3;

  const barMeshes: THREE.Mesh[] = [];

  gridResults.forEach((d: GridResult) => {
    const srValue: number = activeSaltId
      ? (d.saturation_indices[activeSaltId]?.SR ?? 0)
      : Math.max(
          0,
          ...Object.values(d.saturation_indices).map((e) => e.SR ?? 0),
        );
    const displayVal = Math.abs(srValue);
    const h = Math.min(
      BAR_MAX_H,
      Math.max(0.15, (displayVal / maxSR) * BAR_MAX_H),
    );
    const ci = cocUniq.indexOf(d._grid_CoC);
    const ti = tempUniq.indexOf(d._grid_temp);
    const x = ci * SPACING + cocOffset;
    const z = ti * SPACING + tempOffset;

    let clr: number;
    if (d.bar_data) {
      clr = barColorFromBarData(d.bar_data);
    } else {
      const t = Math.min(1, maxSR > 0 ? displayVal / maxSR : 0);
      if (d.color_code === "green")
        clr =
          t > 0.5
            ? lightenHex("#064e3b", 1 - (t - 0.5) * 1.2)
            : lightenHex("#d1fae5", t * 0.5);
      else if (d.color_code === "yellow")
        clr =
          t > 0.5
            ? lightenHex("#92400e", 1 - (t - 0.5) * 1.2)
            : lightenHex("#fef9c3", t * 0.5);
      else
        clr =
          t > 0.5
            ? lightenHex("#7f1d1d", 1 - (t - 0.5) * 1.2)
            : lightenHex("#fee2e2", t * 0.5);
    }

    const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
    const mat = new THREE.MeshPhongMaterial({ color: clr, shininess: 60 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, h / 2, z);
    mesh.userData = { data: d, origColor: clr, h };
    scene.add(mesh);
    barMeshes.push(mesh);
    mesh.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.08,
        }),
      ),
    );
  });

  const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
  const gridHelper = new THREE.GridHelper(
    gridW + 4,
    (nCoC + nTemp) * 3,
    0x64748b,
    0x94a3b8,
  );
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  const mkLine = (pts: THREE.Vector3[], color: number, opacity = 0.7): void => {
    scene.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
      ),
    );
  };
  const AX_COC = 0x2563eb;
  const AX_TEMP = 0xea580c;
  const AX_SR = 0x059669;
  const yAxisTop = BAR_MAX_H + 2.0;
  mkLine(
    [
      new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
      new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
    ],
    AX_COC,
    0.9,
  );
  mkLine(
    [
      new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
      new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
    ],
    AX_TEMP,
    0.9,
  );
  mkLine(
    [
      new THREE.Vector3(axOriginX, 0, axOriginZ),
      new THREE.Vector3(axOriginX, yAxisTop, axOriginZ),
    ],
    AX_SR,
    0.9,
  );

  const mkArrow = (
    dir: THREE.Vector3,
    origin: THREE.Vector3,
    color: number,
  ): void => {
    scene.add(
      new THREE.ArrowHelper(dir.normalize(), origin, 0.7, color, 0.35, 0.18),
    );
  };
  mkArrow(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
    AX_COC,
  );
  mkArrow(
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
    AX_TEMP,
  );
  mkArrow(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(axOriginX, yAxisTop, axOriginZ),
    AX_SR,
  );

  cocUniq.forEach((coc, ci) => {
    const x = ci * SPACING + cocOffset;
    const lbl = makeLabel(`CoC ${coc}`, {
      color: "#1d4ed8",
      fontSize: "10px",
      fontWeight: "700",
      background: "rgba(219,234,254,0.80)",
      padding: "1px 5px",
    });
    lbl.position.set(x, 0, axOriginZ + 0.9);
    scene.add(lbl);
    mkLine(
      [
        new THREE.Vector3(x, 0, axOriginZ),
        new THREE.Vector3(x, 0, axOriginZ + 0.45),
      ],
      AX_COC,
      0.4,
    );
    mkLine(
      [new THREE.Vector3(x, 0, zMin - 0.3), new THREE.Vector3(x, 0, axOriginZ)],
      0x93c5fd,
      0.15,
    );
  });
  const cocTitle = makeLabel("← Cycles of Concentration (CoC) →", {
    color: "#1d4ed8",
    fontSize: "11px",
    fontWeight: "700",
  });
  cocTitle.position.set((xMin + xMax) / 2, 0, axOriginZ + 2.1);
  scene.add(cocTitle);

  tempUniq.forEach((temp, ti) => {
    const z = ti * SPACING + tempOffset;
    const lbl = makeLabel(`${temp}°${tempUnit}`, {
      color: "#c2410c",
      fontSize: "10px",
      fontWeight: "700",
      background: "rgba(254,215,170,0.80)",
      padding: "1px 5px",
    });
    lbl.position.set(axOriginX - 1.0, 0, z);
    scene.add(lbl);
    mkLine(
      [
        new THREE.Vector3(axOriginX, 0, z),
        new THREE.Vector3(axOriginX - 0.45, 0, z),
      ],
      AX_TEMP,
      0.4,
    );
    mkLine(
      [new THREE.Vector3(axOriginX, 0, z), new THREE.Vector3(xMax + 0.3, 0, z)],
      0xfed7aa,
      0.15,
    );
  });
  const tempTitle = makeLabel("← Temperature →", {
    color: "#c2410c",
    fontSize: "11px",
    fontWeight: "700",
  });
  tempTitle.position.set(axOriginX - 2.0, 0, (zMin + zMax) / 2);
  scene.add(tempTitle);

  const safMaxSR = maxSR > 0 ? maxSR : 1;
  const srStep =
    safMaxSR <= 1
      ? 0.25
      : safMaxSR <= 2
        ? 0.5
        : safMaxSR <= 5
          ? 1.0
          : safMaxSR <= 20
            ? 5
            : 10;
  const srTicks: number[] = [];
  for (
    let v = 0;
    v <= safMaxSR + srStep * 0.5 && srTicks.length < 50;
    v += srStep
  )
    srTicks.push(parseFloat(v.toFixed(3)));
  srTicks.forEach((v) => {
    const yPos = (v / maxSR) * BAR_MAX_H;
    const lbl = makeLabel(v.toFixed(2), {
      color: "#065f46",
      fontSize: "10px",
      fontWeight: "600",
      background: "rgba(209,250,229,0.80)",
      padding: "1px 4px",
    });
    lbl.position.set(axOriginX - 0.7, yPos, axOriginZ);
    scene.add(lbl);
    mkLine(
      [
        new THREE.Vector3(axOriginX, yPos, axOriginZ),
        new THREE.Vector3(axOriginX - 0.4, yPos, axOriginZ),
      ],
      AX_SR,
      0.4,
    );
    if (v > 0)
      mkLine(
        [
          new THREE.Vector3(axOriginX, yPos, axOriginZ),
          new THREE.Vector3(xMax + 0.3, yPos, axOriginZ),
        ],
        0xa7f3d0,
        0.16,
      );
  });
  const srTitle = makeLabel(
    activeSaltId
      ? `Saturation Ratio (SR) — ${activeSaltId}`
      : "Saturation Ratio (SR)",
    { color: "#065f46", fontSize: "11px", fontWeight: "700" },
  );
  srTitle.position.set(axOriginX - 0.7, yAxisTop + 0.5, axOriginZ);
  scene.add(srTitle);

  const nMax = Math.max(nCoC, nTemp);
  const spreadXZ = nMax * SPACING;
  const initDist = Math.max(28, spreadXZ * 2.2);
  return {
    renderer,
    labelRenderer,
    scene,
    camera,
    barMeshes,
    initDist,
    initLookAtY: BAR_MAX_H * 0.4,
  };
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
  panX: number;
  panY: number;
  panZ: number;
  isDragging: boolean;
  isPanning: boolean;
  prevX: number;
  prevY: number;
  hoveredMesh: THREE.Mesh | null;
  selectedMesh: THREE.Mesh | null;
  animId: number;
}

// ─── Corrosion sidebar section ────────────────────────────────────────────────

function CorrosionSection({
  d,
  saltsOfInterest,
}: {
  d: GridResult;
  saltsOfInterest: string[];
}) {
  const metals = d.corrosion;
  const hasMetals = Object.keys(metals).length > 0;
  const doPpm =
    d.dissolved_oxygen_ppm ?? (d.corrosion_rate?.do_ppm as number | undefined);
  const tempC =
    d.corrosion_temp_c ?? (d.corrosion_rate?.temp_c as number | undefined);
  if (!hasMetals && doPpm == null && tempC == null) return null;
  return (
    <SSection title="Corrosion">
      {(doPpm != null || tempC != null) && (
        <div className="mb-3 flex gap-2 flex-wrap">
          {doPpm != null && (
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1.5">
              <span className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">
                DO
              </span>
              <span className="text-[13px] font-bold text-blue-700">
                {doPpm.toFixed(2)}
              </span>
              <span className="text-[11px] text-blue-400">ppm</span>
            </div>
          )}
          {tempC != null && (
            <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1.5">
              <span className="text-[11px] text-orange-400 font-semibold uppercase tracking-wider">
                Temp
              </span>
              <span className="text-[13px] font-bold text-orange-700">
                {tempC}
              </span>
              <span className="text-[11px] text-orange-400">°C</span>
            </div>
          )}
        </div>
      )}
      {hasMetals &&
        Object.entries(metals).map(([key, metal]) => {
          if (!metal) return null;
          const label = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          const inhibitionPct = metal.total_inhibition_percent;
          const hasTreatment =
            metal.cr_base_mpy != null && metal.cr_mpy !== metal.cr_base_mpy;
          return (
            <div
              key={key}
              className="py-[8px] border-b border-slate-100 last:border-0"
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[13px] text-slate-700 font-semibold">
                  {label}
                </span>
                <Badge text={metal.rating} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-slate-400">
                  Corrosion Rate (treated)
                </span>
                <span className="text-[13px] font-bold text-slate-700">
                  {metal.cr_mpy.toFixed(2)}{" "}
                  <span className="text-[11px] font-normal text-slate-400">
                    mpy
                  </span>
                </span>
              </div>
              {hasTreatment && metal.cr_base_mpy != null && (
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-[12px] text-slate-400">
                    Base rate (untreated)
                  </span>
                  <span className="text-[12px] text-slate-500">
                    {metal.cr_base_mpy.toFixed(2)}{" "}
                    <span className="text-[11px] text-slate-400">mpy</span>
                  </span>
                </div>
              )}
              {!hasTreatment && metal.cr_base_mpy != null && (
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-[12px] text-slate-400">Base rate</span>
                  <span className="text-[12px] text-slate-500">
                    {metal.cr_base_mpy.toFixed(2)}{" "}
                    <span className="text-[11px] text-slate-400">mpy</span>
                  </span>
                </div>
              )}
              {inhibitionPct != null && (
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-[12px] text-slate-400">Inhibition</span>
                  <span className="text-[12px] font-semibold text-emerald-600">
                    −{inhibitionPct}%
                  </span>
                </div>
              )}
              {metal.note && (
                <p className="text-[11px] text-slate-300 italic mt-1">
                  {metal.note}
                </p>
              )}
            </div>
          );
        })}
    </SSection>
  );
}

// ─── DescriptionSolutionPanel ─────────────────────────────────────────────────

function DescriptionSolutionPanel({
  d,
  tempUnit,
}: {
  d: GridResult;
  tempUnit: string;
}) {
  const ds = d.description_of_solution;

  const row = {
    coc: d._grid_CoC,
    temperature: d._grid_temp,
    temp_unit: `°${tempUnit}`,
    temperature_c: d._grid_temp_c ?? ds?.temperature_C ?? d._grid_temp,
    ph: ds?.pH ?? d._grid_pH,
    specific_conductance:
      ds?.specific_conductance ?? (d as any).specific_conductance ?? 0,
    activity_of_water: ds?.activity_of_water ?? 0,
    charge_balance_error_pct: d.charge_balance_error_pct ?? 0,
    density: ds?.density ?? (d as any).density ?? 0,
    dissolved_oxygen_ppm:
      d.dissolved_oxygen_ppm ?? d.corrosion_rate?.do_ppm ?? 0,
    electrical_balance: (d as any).electrical_balance ?? 0,
    ionic_strength: ds?.ionic_strength_desc ?? d.ionic_strength ?? 0,
    mass_of_water_kg: ds?.mass_of_water_kg ?? 0,
  };

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

  const Pill = ({
    bg,
    text,
    children,
  }: {
    bg: string;
    text: string;
    children: ReactNode;
  }) => (
    <span
      style={{ background: bg, color: text }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tabular-nums whitespace-nowrap"
    >
      {children}
    </span>
  );

  const tc = tempColor(row.temperature);
  const cc = chargeColor(row.charge_balance_error_pct);

  const items = [
    {
      icon: <Beaker className="w-3.5 h-3.5" />,
      label: "CoC",
      el: (
        <Pill bg="#EDE9FE" text="#5B21B6">
          {row.coc}
        </Pill>
      ),
    },
    {
      icon: <Thermometer className="w-3.5 h-3.5" />,
      label: "Temperature",
      el: (
        <Pill bg={tc.bg} text={tc.text}>
          {row.temperature}
          {row.temp_unit}
        </Pill>
      ),
    },
    {
      icon: <Thermometer className="w-3.5 h-3.5" />,
      label: "Temp °C",
      el: (
        <Pill bg="#E0F2FE" text="#0369A1">
          {row.temperature_c}°C
        </Pill>
      ),
    },
    {
      icon: <FlaskConical className="w-3.5 h-3.5" />,
      label: "pH",
      el: (
        <Pill bg="#D1FAE5" text="#065F46">
          {row.ph}
        </Pill>
      ),
    },
    {
      icon: <Zap className="w-3.5 h-3.5" />,
      label: "Conductance",
      el: (
        <Pill bg="#CFFAFE" text="#0E7490">
          {row.specific_conductance}
        </Pill>
      ),
    },
    {
      icon: <Droplets className="w-3.5 h-3.5" />,
      label: "Activity H₂O",
      el: (
        <Pill bg="#DBEAFE" text="#1D4ED8">
          {row.activity_of_water}
        </Pill>
      ),
    },
    {
      icon: <Activity className="w-3.5 h-3.5" />,
      label: "Charge Bal. %",
      el: (
        <Pill bg={cc.bg} text={cc.text}>
          {row.charge_balance_error_pct}%
        </Pill>
      ),
    },
    {
      icon: <Scale className="w-3.5 h-3.5" />,
      label: "Density",
      el: (
        <Pill bg="#EDE9FE" text="#6D28D9">
          {row.density}
        </Pill>
      ),
    },
    {
      icon: <Wind className="w-3.5 h-3.5" />,
      label: "DO (ppm)",
      el: (
        <Pill bg="#FCE7F3" text="#9D174D">
          {typeof row.dissolved_oxygen_ppm === "number"
            ? row.dissolved_oxygen_ppm.toFixed(4)
            : row.dissolved_oxygen_ppm}
        </Pill>
      ),
    },
    {
      icon: <Zap className="w-3.5 h-3.5" />,
      label: "Elec. Balance",
      el: (
        <Pill bg="#FEF3C7" text="#92400E">
          {typeof row.electrical_balance === "number"
            ? row.electrical_balance.toExponential(3)
            : row.electrical_balance}
        </Pill>
      ),
    },
    {
      icon: <Activity className="w-3.5 h-3.5" />,
      label: "Ionic Strength",
      el: (
        <Pill bg="#CCFBF1" text="#0F766E">
          {row.ionic_strength}
        </Pill>
      ),
    },
    {
      icon: <Scale className="w-3.5 h-3.5" />,
      label: "Mass H₂O",
      el: (
        <Pill bg="#F1F5F9" text="#475569">
          {row.mass_of_water_kg} kg
        </Pill>
      ),
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-cyan-400" />
          <span className="text-[12px] font-bold tracking-widest uppercase text-white">
            Description of Solution
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
            CoC {d._grid_CoC} · {d._grid_temp}°{tempUnit}
          </span>
        </div>
      </div>
      <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {items.map(({ icon, label, el }) => (
          <div key={label} className="flex flex-col gap-1 min-w-0">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1 truncate">
              <span className="text-slate-300">{icon}</span>
              {label}
            </span>
            <div>{el}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DistributionOfSpeciesPanel ───────────────────────────────────────────────

function DistributionOfSpeciesPanel({
  d,
  tempUnit,
}: {
  d: GridResult;
  tempUnit: string;
}) {
  const [search, setSearch] = useState("");
  const rawDist = d.distribution_of_species;
  if (!rawDist || Object.keys(rawDist).length === 0) return null;

  const speciesList = Object.entries(rawDist)
    .map(([species, entry]) => ({
      species,
      molality: entry.molality,
      activity: entry.activity,
      element: entry.element ?? null,
    }))
    .sort((a, b) => Math.abs(b.molality) - Math.abs(a.molality));

  const filtered = search.trim()
    ? speciesList.filter(
        (s) =>
          s.species.toLowerCase().includes(search.toLowerCase()) ||
          (s.element ?? "").toLowerCase().includes(search.toLowerCase()),
      )
    : speciesList;

  const fmt = (n: number) => {
    if (n === 0) return "0";
    const abs = Math.abs(n);
    if (abs < 1e-4 || abs >= 1e4) return n.toExponential(3);
    return n.toPrecision(4);
  };

  const ELEMENT_COLORS: Record<string, { bg: string; text: string }> = {
    Ca: { bg: "#DBEAFE", text: "#1E40AF" },
    Mg: { bg: "#D1FAE5", text: "#065F46" },
    "C(4)": { bg: "#FEF3C7", text: "#92400E" },
    "S(6)": { bg: "#FCE7F3", text: "#9D174D" },
    P: { bg: "#EDE9FE", text: "#5B21B6" },
    Cl: { bg: "#CFFAFE", text: "#0E7490" },
    Si: { bg: "#CCFBF1", text: "#0F766E" },
    Na: { bg: "#FEE2E2", text: "#991B1B" },
    K: { bg: "#FFEDD5", text: "#9A3412" },
  };

  const getElemStyle = (el: string | null) => {
    if (!el) return { bg: "#F1F5F9", text: "#475569" };
    return ELEMENT_COLORS[el] ?? { bg: "#F1F5F9", text: "#475569" };
  };

  const molalityBar = (mol: number, max: number) => {
    if (max === 0) return 0;
    return Math.min(100, (Math.abs(mol) / max) * 100);
  };
  const maxMol = speciesList[0]?.molality ?? 1;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-indigo-900 to-indigo-800">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-indigo-300" />
          <span className="text-[12px] font-bold tracking-widest uppercase text-white">
            Distribution of Species
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-400/20 text-indigo-200 border border-indigo-400/30">
            {speciesList.length} species · CoC {d._grid_CoC}
          </span>
        </div>
      </div>
      <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
        <input
          type="text"
          placeholder="Search species or element…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-[12px] px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300 placeholder-slate-300"
        />
      </div>
      <div className="overflow-auto max-h-[340px]">
        <table className="w-full text-[12px] border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-100">
              <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
                Species
              </th>
              <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
                Molality
              </th>
              <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
                Activity
              </th>
              <th className="px-3 py-2 text-left font-bold text-slate-500 text-[10px] uppercase tracking-wider whitespace-nowrap">
                Element
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => {
              const es = getElemStyle(item.element);
              const barPct = molalityBar(item.molality, maxMol);
              return (
                <tr
                  key={item.species}
                  className={`border-b border-slate-50 hover:bg-indigo-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                >
                  <td className="px-3 py-2 font-mono font-semibold text-slate-800 whitespace-nowrap">
                    {item.species}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-blue-700 tabular-nums">
                        {fmt(item.molality)}
                      </span>
                      <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-400 transition-all duration-300"
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="font-semibold text-emerald-700 tabular-nums">
                      {fmt(item.activity)}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {item.element ? (
                      <span
                        style={{ background: es.bg, color: es.text }}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold"
                      >
                        {item.element}
                      </span>
                    ) : (
                      <span className="text-slate-300 italic text-[11px]">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-8 text-center text-[12px] text-slate-400 italic">
            No matching species found
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Solution Details FAB / Floating Toggle Button ────────────────────────────
// This is the persistent floating button that lets users manually open/close
// the bottom panel. It is always visible once a bar is selected (pinned).

interface SolutionDetailsFABProps {
  selectedData: GridResult | null;
  bottomPanelOpen: boolean;
  hasBottomData: boolean;
  tempUnit: string;
  onToggle: () => void;
}

function SolutionDetailsFAB({
  selectedData,
  bottomPanelOpen,
  hasBottomData,
  tempUnit,
  onToggle,
}: SolutionDetailsFABProps) {
  if (!selectedData) {
    // No selection yet — show a subtle hint
    return (
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800/80 text-white text-[11px] font-medium backdrop-blur-sm shadow-lg border border-white/10">
          <TableProperties className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          Click a bar to inspect solution details
        </div>
      </div>
    );
  }

  const colorMap: Record<
    string,
    { bg: string; ring: string; dot: string; label: string }
  > = {
    green: {
      bg: "bg-emerald-600 hover:bg-emerald-500",
      ring: "ring-emerald-400/40",
      dot: "bg-emerald-300",
      label: "Protected",
    },
    yellow: {
      bg: "bg-amber-500   hover:bg-amber-400",
      ring: "ring-amber-400/40",
      dot: "bg-amber-300",
      label: "Caution",
    },
    red: {
      bg: "bg-red-600     hover:bg-red-500",
      ring: "ring-red-400/40",
      dot: "bg-red-300",
      label: "Scale Risk",
    },
  };
  const c = colorMap[selectedData.color_code] ?? colorMap.green;

  return (
    <div
      className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center gap-1.5"
      style={{ zIndex: 20 }}
    >
      {/* Compact context label above the button */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/10 text-[10px] text-slate-300 font-mono whitespace-nowrap">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
        CoC {selectedData._grid_CoC} · {selectedData._grid_temp}°{tempUnit} · pH{" "}
        {selectedData._grid_pH}
        <span className="ml-1 text-slate-500">|</span>
        <span className="text-slate-400">{c.label}</span>
      </div>

      {/* Main FAB toggle */}
      <button
        onClick={onToggle}
        className={`
          flex items-center gap-2.5 px-5 py-2.5 rounded-full font-semibold text-[12px] text-white
          shadow-xl transition-all duration-200 active:scale-95
          ring-4 ${c.ring} ${c.bg}
          ${!hasBottomData ? "opacity-50 cursor-not-allowed" : ""}
        `}
        disabled={!hasBottomData}
        title={
          !hasBottomData
            ? "No solution detail data for this grid point"
            : bottomPanelOpen
              ? "Hide solution detail tables"
              : "Show solution detail tables"
        }
      >
        <PanelBottomOpen className="w-4 h-4 shrink-0" />
        {bottomPanelOpen ? "Hide Solution Details" : "View Solution Details"}
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${bottomPanelOpen ? "rotate-180" : ""}`}
        />
        {hasBottomData && !bottomPanelOpen && (
          // Pulsing badge to draw attention when there's data available
          <span className="ml-0.5 relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
        )}
      </button>

      {/* Small "deselect" affordance */}
      {/* Removed: clicking away from pin keeps selection; users close via X in bottom panel */}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  apiResponse?: SaturationApiResponseFlat;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SaturationDashboard({ apiResponse }: Props) {
  const [activeResponse, setActiveResponse] = useState<
    SaturationApiResponseFlat | undefined
  >(apiResponse);
  const [unavailableModal, setUnavailableModal] = useState<{
    salt: string;
    reason: string;
  } | null>(null);

  // ── DECOUPLED PANEL STATE ──────────────────────────────────────────────────
  // bottomPanelOpen is ONLY controlled by the FAB toggle button.
  // Clicking a grid bar NEVER opens it — it only updates selectedData (values).
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false);
  const [bottomTab, setBottomTab] = useState<"description" | "species">(
    "description",
  );

  useEffect(() => {
    setActiveResponse(apiResponse);
  }, [apiResponse]);

  const meta = useMemo(() => resolveMeta(activeResponse), [activeResponse]);
  const gridResults = useMemo(
    (): GridResult[] => meta?.gridResults ?? [],
    [meta],
  );
  const baseSaltId: string | null = meta?.saltId ?? null;

  const [saltAnaliysis, { isLoading }] = useSaltAnalysisMutation();

  const runId: string | undefined = useMemo(() => {
    if (!apiResponse) return undefined;
    const any = apiResponse as any;
    return apiResponse.run_id ?? any?.data?.run_id ?? undefined;
  }, [apiResponse]);

  const [activeSaltId, setActiveSaltId] = useState<string | null>(baseSaltId);
  useEffect(() => {
    setActiveSaltId(baseSaltId);
  }, [baseSaltId]);

  const handleSaltChipClick = useCallback(
    async (salt: string) => {
      if (salt === activeSaltId) {
        setActiveSaltId(null);
        setActiveResponse(apiResponse);
        return;
      }
      if (!runId) {
        setActiveSaltId(salt);
        return;
      }
      setActiveSaltId(salt);
      try {
        const result = await saltAnaliysis({
          run_id: runId,
          salt_id: salt,
        }).unwrap();
        setActiveResponse(result as SaturationApiResponseFlat);
      } catch (err) {
        console.error("Salt analysis API error:", err);
      }
    },
    [activeSaltId, apiResponse, runId, saltAnaliysis],
  );

  const handleResetToSR = useCallback(() => {
    setActiveSaltId(null);
    setActiveResponse(apiResponse);
  }, [apiResponse]);

  const dosage = meta?.dosagePpm ?? 0;
  const cocMin = meta?.cocMin ?? 0;
  const cocMax = meta?.cocMax ?? 0;
  const tempMin = meta?.tempMin ?? 0;
  const tempMax = meta?.tempMax ?? 0;
  const tempUnit = meta?.tempUnit ?? "C";
  const assetName = meta?.assetInfo?.name;
  const summary = meta?.summary;

  const saltsOfInterest = useMemo((): string[] => {
    const responseAny = apiResponse as any;
    let salts: string[] =
      responseAny?.data?.available_salts ??
      responseAny?.data?.graph_data?.available_salts ??
      responseAny?.graph_data?.available_salts ??
      responseAny?.data?.aiResponse?.available_salts ??
      responseAny?.available_salts ??
      [];
    if (salts.length === 0) {
      salts =
        responseAny?.salts_of_interest ??
        responseAny?.data?.aiResponse?.salts_of_interest ??
        responseAny?.data?.salts_of_interest ??
        [];
    }
    const currentSalt = activeSaltId || baseSaltId;
    if (currentSalt && !salts.includes(currentSalt))
      salts = [currentSalt, ...salts];
    return salts;
  }, [apiResponse, activeSaltId, baseSaltId]);

  const unavailableSalts = useMemo(() => {
    const responseAny = apiResponse as any;
    const unavailableRaw =
      responseAny?.data?.aiResponse?.unavailable_salts ??
      responseAny?.unavailable_salts ??
      responseAny?.data?.unavailable_salts ??
      [];
    return unavailableRaw.map((item: any) => ({
      salt: item.salt || item.name,
      reason: item.reason || "Not available in this analysis.",
    }));
  }, [apiResponse]);

  const cocUniq = useMemo(
    () =>
      [...new Set(gridResults.map((d) => d._grid_CoC))].sort((a, b) => a - b),
    [gridResults],
  );
  const tempUniq = useMemo(
    () =>
      [...new Set(gridResults.map((d) => d._grid_temp))].sort((a, b) => b - a),
    [gridResults],
  );

  const maxSR = useMemo((): number => {
    if (!gridResults.length) return 1;
    if (activeSaltId) {
      const vals = gridResults.map((d) =>
        Math.abs(
          d.saturation_indices[activeSaltId]?.SR ??
            d.saturation_indices[activeSaltId]?.SI ??
            0,
        ),
      );
      return Math.max(...vals, 1);
    }
    const vals = gridResults.map((d) => Math.abs(d.indices?.lsi?.lsi ?? 0));
    return Math.max(...vals, 1);
  }, [gridResults, activeSaltId]);

  // ── Resizable sidebar ──────────────────────────────────────────────────────
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const isResizingRef = useRef(false);
  const resizeStartXRef = useRef(0);
  const resizeStartWidthRef = useRef(SIDEBAR_DEFAULT);

  const onResizeMouseDown = useCallback(
    (e: RMouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      isResizingRef.current = true;
      resizeStartXRef.current = e.clientX;
      resizeStartWidthRef.current = sidebarWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [sidebarWidth],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      const delta = resizeStartXRef.current - e.clientX;
      setSidebarWidth(
        Math.min(
          SIDEBAR_MAX,
          Math.max(SIDEBAR_MIN, resizeStartWidthRef.current + delta),
        ),
      );
    };
    const onUp = () => {
      if (!isResizingRef.current) return;
      isResizingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const resizeFnRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      resizeFnRef.current?.();
    });
    return () => cancelAnimationFrame(id);
  }, [sidebarWidth]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneState | null>(null);

  // ── Two separate state slots: hover vs selected ────────────────────────────
  const [hoveredData, setHoveredData] = useState<GridResult | null>(null);
  const [selectedData, setSelectedData] = useState<GridResult | null>(null);

  // The sidebar shows: selectedData if something is pinned, else hoveredData
  const activeData: GridResult | null = selectedData ?? hoveredData;

  // The bottom panel always shows selectedData (the pinned bar's data)
  const bottomPanelData = selectedData;

  const updateCamera = useCallback(() => {
    const s = sceneRef.current;
    if (!s) return;
    s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist + s.panX;
    s.camera.position.y = Math.sin(s.rotX) * s.dist + s.panY;
    s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist + s.panZ;
    s.camera.lookAt(s.panX, s.panY, s.panZ);
  }, []);

  // ── Build / rebuild scene ──────────────────────────────────────────────────
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

    const {
      renderer,
      labelRenderer,
      scene,
      camera,
      barMeshes,
      initDist,
      initLookAtY,
    } = buildScene(
      canvas,
      wrap,
      gridResults,
      activeSaltId,
      cocUniq,
      tempUniq,
      maxSR,
      tempUnit,
    );

    const state: SceneState = {
      renderer,
      labelRenderer,
      scene,
      camera,
      barMeshes,
      rotY: 0.55,
      rotX: 0.38,
      dist: initDist,
      panX: 0,
      panY: initLookAtY,
      panZ: 0,
      isDragging: false,
      isPanning: false,
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
    resizeFnRef.current = resize;
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
      resizeFnRef.current = null;
      renderer.dispose();
      const el = labelRenderer.domElement;
      if (el.parentNode === wrap) wrap.removeChild(el);
      sceneRef.current = null;
    };
  }, [
    gridResults,
    activeSaltId,
    maxSR,
    cocUniq,
    tempUniq,
    tempUnit,
    updateCamera,
  ]);

  // ── Pointer / touch interaction ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const S = () => sceneRef.current;

    const resetColor = (m: THREE.Mesh) =>
      (m.material as THREE.MeshPhongMaterial).color.setHex(
        m.userData.origColor as number,
      );
    const setHover = (m: THREE.Mesh) =>
      (m.material as THREE.MeshPhongMaterial).color.setHex(0x1abc9c);
    const setSelected = (m: THREE.Mesh) =>
      (m.material as THREE.MeshPhongMaterial).color.setHex(0x1d4ed8);

    const raycast = (cx: number, cy: number): THREE.Mesh | null => {
      const s = S();
      if (!s) return null;
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((cx - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((cy - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(mouse, s.camera);
      const hits = raycaster.intersectObjects(s.barMeshes, false);
      return hits.length > 0 ? (hits[0].object as THREE.Mesh) : null;
    };

    const getPanVectors = (s: SceneState) => {
      const right = new THREE.Vector3(
        Math.cos(s.rotY),
        0,
        -Math.sin(s.rotY),
      ).normalize();
      const fwd = new THREE.Vector3(
        -Math.sin(s.rotY) * Math.cos(s.rotX),
        Math.sin(s.rotX),
        -Math.cos(s.rotY) * Math.cos(s.rotX),
      ).normalize();
      const up = new THREE.Vector3()
        .crossVectors(right, fwd)
        .negate()
        .normalize();
      return { right, up };
    };

    const onMouseDown = (e: MouseEvent) => {
      const s = S();
      if (!s) return;
      if (e.button === 1 || e.button === 2) {
        s.isPanning = true;
        s.isDragging = false;
      } else {
        s.isDragging = false;
        s.isPanning = false;
      }
      s.prevX = e.clientX;
      s.prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const s = S();
      if (!s) return;
      const dx = e.clientX - s.prevX;
      const dy = e.clientY - s.prevY;
      if (s.isPanning && (e.buttons === 2 || e.buttons === 4)) {
        const speed = s.dist * 0.0018;
        const { right } = getPanVectors(s);
        s.panX -= right.x * dx * speed;
        s.panZ -= right.z * dx * speed;
        s.panY -= dy * speed;
        s.prevX = e.clientX;
        s.prevY = e.clientY;
        updateCamera();
        canvas.style.cursor = "move";
        return;
      }
      if (
        e.buttons === 1 &&
        !s.isDragging &&
        (Math.abs(dx) > 3 || Math.abs(dy) > 3)
      )
        s.isDragging = true;
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
      // ── HOVER: update bar highlight and sidebar preview only ──
      const hit = raycast(e.clientX, e.clientY);
      if (
        s.hoveredMesh &&
        s.hoveredMesh !== hit &&
        s.hoveredMesh !== s.selectedMesh
      )
        resetColor(s.hoveredMesh);
      if (hit) {
        s.hoveredMesh = hit;
        if (hit !== s.selectedMesh) setHover(hit);
        canvas.style.cursor = "pointer";
        setHoveredData(hit.userData.data as GridResult);
      } else {
        s.hoveredMesh = null;
        canvas.style.cursor = "grab";
        setHoveredData(null);
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      const s = S();
      if (!s) return;
      if (s.isPanning) {
        s.isPanning = false;
        canvas.style.cursor = "grab";
        return;
      }
      if (!s.isDragging) {
        // ── CLICK: pin selection ONLY — do NOT touch bottomPanelOpen ──
        // The user must manually press the FAB to open the bottom panel.
        const hit = raycast(e.clientX, e.clientY);
        if (hit) {
          if (
            s.selectedMesh &&
            s.selectedMesh !== hit &&
            s.selectedMesh !== s.hoveredMesh
          )
            resetColor(s.selectedMesh);
          s.selectedMesh = hit;
          setSelected(hit);
          const clickedData = hit.userData.data as GridResult;
          // Update selectedData (sidebar + bottom panel data source)
          // but DO NOT open the bottom panel automatically
          setSelectedData(clickedData);
          // Note: bottomPanelOpen is intentionally NOT set here
          // The FAB button is the sole control for opening/closing the panel
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
      s.isPanning = false;
      canvas.style.cursor = "grab";
      setHoveredData(null);
    };

    const onWheel = (e: WheelEvent) => {
      const s = S();
      if (!s) return;
      s.dist = Math.max(8, Math.min(300, s.dist + e.deltaY * 0.07));
      updateCamera();
      e.preventDefault();
    };

    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    let lastTouchY2 = 0;
    const onTouchStart = (e: TouchEvent) => {
      const s = S();
      if (!s) return;
      s.prevX = e.touches[0].clientX;
      s.prevY = e.touches[0].clientY;
      s.isDragging = false;
      s.isPanning = false;
      if (e.touches.length === 2)
        lastTouchY2 = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    };
    const onTouchMove = (e: TouchEvent) => {
      const s = S();
      if (!s) return;
      if (e.touches.length === 2) {
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        s.panY -= (midY - lastTouchY2) * s.dist * 0.0018;
        lastTouchY2 = midY;
        updateCamera();
        e.preventDefault();
        return;
      }
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
    canvas.addEventListener("contextmenu", onContextMenu);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("contextmenu", onContextMenu);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
    };
  }, [updateCamera]);

  // ── Derived sidebar values ─────────────────────────────────────────────────
  const d = activeData;

  const saltSR: number | null =
    d && activeSaltId
      ? (d.saturation_indices[activeSaltId]?.SR ??
        d.saturation_indices[activeSaltId]?.SI ??
        null)
      : null;
  const displaySR: number | null = saltSR ?? d?.indices?.lsi?.lsi ?? null;
  const colorCode = d?.color_code;
  const statusLabel: string =
    colorCode === "yellow"
      ? "Caution"
      : colorCode === "red"
        ? "Scale Risk"
        : "Protected";
  const statusVar: BadgeVariant =
    colorCode === "yellow" ? "yellow" : colorCode === "red" ? "red" : "green";
  const isEmpty = gridResults.length === 0;
  const displaySaltLabel =
    activeSaltId ??
    (saltsOfInterest.length > 0 ? saltsOfInterest[0] : "Multi-Salt");

  const hasDescription = !!bottomPanelData?.description_of_solution;
  const hasSpecies = !!(
    bottomPanelData?.distribution_of_species &&
    Object.keys(bottomPanelData.distribution_of_species).length > 0
  );
  const hasBottomData = hasDescription || hasSpecies;

  // FAB toggle handler — the ONLY way to open/close the bottom panel
  const handleToggleBottomPanel = useCallback(() => {
    if (!hasBottomData) return;
    setBottomPanelOpen((v) => !v);
  }, [hasBottomData]);

  // Close bottom panel — does NOT deselect the pinned bar
  const handleCloseBottomPanel = useCallback(() => {
    setBottomPanelOpen(false);
  }, []);

  const legendItems = [
    {
      label: "Protected",
      sub: "SR within safe band",
      baseHex: "#2ECC71",
      lightHex: "#d1fae5",
      bg: "bg-emerald-50 border-emerald-200",
    },
    {
      label: "Caution",
      sub: "Mild scaling tendency",
      baseHex: "#F1C40F",
      lightHex: "#fef9c3",
      bg: "bg-amber-50 border-amber-200",
    },
    {
      label: "Scale Risk",
      sub: "High scale risk",
      baseHex: "#E74C3C",
      lightHex: "#fee2e2",
      bg: "bg-red-50 border-red-200",
    },
  ];

  return (
    <>
      <div className="bg-white text-slate-800 border font-sans text-[14px] h-screen overflow-hidden flex flex-col select-none">
        {/* ── Header ── */}
        <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0 gap-4 flex-wrap">
          <div>
            <div className="text-[15px] font-bold text-slate-900">
              Saturation Analysis —{" "}
              <span className="text-blue-600">{displaySaltLabel}</span>
              <span className="font-normal text-slate-400"> · 3D Grid</span>
            </div>
            <div className="text-[12px] text-slate-400 mt-0.5 flex flex-wrap gap-x-4">
              {assetName && (
                <span className="text-slate-600 font-semibold">
                  {assetName}
                </span>
              )}
              {(cocMin > 0 || cocMax > 0) && (
                <span>
                  CoC {cocMin}–{cocMax}
                </span>
              )}
              {(tempMin > 0 || tempMax > 0) && (
                <span>
                  Temp {tempMin}–{tempMax} °{tempUnit}
                </span>
              )}
              {dosage > 0 && <span>Dosage {dosage} ppm</span>}
              {meta?.totalGridPoints && <span>{meta.totalGridPoints} pts</span>}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {summary && (
              <div className="flex gap-1.5 text-[12px]">
                {summary.green > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    {summary.green} Protected
                  </span>
                )}
                {summary.yellow > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                    {summary.yellow} Caution
                  </span>
                )}
                {summary.red > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-semibold">
                    {summary.red} Scale Risk
                  </span>
                )}
              </div>
            )}
            {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
              const dot =
                label === "Caution"
                  ? "bg-amber-400"
                  : label === "Scale Risk"
                    ? "bg-red-500"
                    : "bg-emerald-500";
              return (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-[12px] text-slate-500"
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`}
                  />
                  {label}
                </div>
              );
            })}
          </div>
        </header>

        {/* ── Salt chips ── */}
        {(saltsOfInterest.length > 0 || unavailableSalts.length > 0) && (
          <div className="bg-slate-50 border-b border-slate-200 shrink-0">
            {saltsOfInterest.length > 0 && (
              <div className="px-5 pt-3 pb-2 flex items-center gap-2 overflow-x-auto max-h-[58px]">
                <span className="text-[11px] font-semibold text-slate-400 shrink-0 tracking-widest uppercase whitespace-nowrap">
                  AVAILABLE SALTS:
                </span>
                <div className="flex gap-1.5 flex-nowrap">
                  {saltsOfInterest.map((s) => {
                    const isActive = s === activeSaltId;
                    return (
                      <button
                        key={s}
                        onClick={() => handleSaltChipClick(s)}
                        disabled={isLoading}
                        className={`text-[13px] px-3.5 py-1 rounded-full border font-medium whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${isActive ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50"}`}
                      >
                        {s}
                        {isActive && <span className="text-xs">●</span>}
                      </button>
                    );
                  })}
                </div>
                {activeSaltId && (
                  <button
                    onClick={handleResetToSR}
                    disabled={isLoading}
                    className="ml-2 text-xs px-3 py-1 rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100 whitespace-nowrap shrink-0"
                  >
                    Reset to SR
                  </button>
                )}
              </div>
            )}
            {unavailableSalts.length > 0 && (
              <div className="px-5 pb-3 pt-1 border-t border-slate-100 flex items-start gap-2 overflow-x-auto max-h-[58px]">
                <span className="text-[11px] font-semibold text-slate-400 shrink-0 tracking-widest uppercase whitespace-nowrap pt-1">
                  UNAVAILABLE:
                </span>
                <div className="flex gap-1.5 flex-nowrap flex-wrap">
                  {unavailableSalts.map(({ salt, reason }: any) => (
                    <button
                      key={salt}
                      onClick={() => setUnavailableModal({ salt, reason })}
                      className="text-[12px] px-3 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-600 transition-colors flex items-center gap-1 whitespace-nowrap"
                    >
                      {salt}
                      <span className="text-[10px] opacity-60">ⓘ</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Unavailable Modal */}
        {unavailableModal && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setUnavailableModal(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="font-semibold text-slate-900">
                  Why{" "}
                  <span className="text-slate-600">
                    {unavailableModal.salt}
                  </span>{" "}
                  is unavailable
                </div>
                <button
                  onClick={() => setUnavailableModal(null)}
                  className="text-slate-400 hover:text-slate-600 text-xl leading-none"
                >
                  ×
                </button>
              </div>
              <div className="p-6 text-[13px] text-slate-600 leading-relaxed">
                {unavailableModal.reason}
              </div>
              <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setUnavailableModal(null)}
                  className="px-5 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            MAIN BODY: graph row (flex-1, fixed) + bottom panel (shrink-0, below)
            The graph row height is never affected by the bottom panel.
        ══════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* ── Graph row: 3D viewport + resize handle + sidebar ── */}
          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* 3-D viewport */}
            <div
              ref={wrapRef}
              className="flex-1 min-w-0 relative overflow-hidden"
              style={{ background: "#f8fafc" }}
            >
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                  <div className="text-5xl opacity-20">⬛</div>
                  <p className="text-[14px]">
                    No grid data — pass an{" "}
                    <code className="text-slate-500 bg-slate-100 px-1 rounded">
                      apiResponse
                    </code>{" "}
                    prop.
                  </p>
                </div>
              ) : (
                <>
                  <canvas
                    ref={canvasRef}
                    className="block w-full h-full cursor-grab"
                  />

                  {/* Loading overlay */}
                  {isLoading && (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
                      style={{
                        background: "rgba(248,250,252,0.78)",
                        backdropFilter: "blur(3px)",
                        zIndex: 25,
                      }}
                    >
                      <svg
                        className="animate-spin w-11 h-11 text-blue-500"
                        viewBox="0 0 44 44"
                        fill="none"
                      >
                        <circle
                          cx="22"
                          cy="22"
                          r="18"
                          stroke="currentColor"
                          strokeOpacity="0.2"
                          strokeWidth="4"
                        />
                        <path
                          d="M40 22a18 18 0 00-18-18"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-center">
                        <p className="text-[14px] font-semibold text-slate-700">
                          Analysing{" "}
                          <span className="text-blue-600">{activeSaltId}</span>
                        </p>
                        <p className="text-[12px] text-slate-400 mt-0.5">
                          Fetching saturation grid…
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Axis legend */}
                  <div
                    className="absolute bottom-4 left-4 pointer-events-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-md"
                    style={{ zIndex: 20 }}
                  >
                    {[
                      {
                        color: "#2563eb",
                        label: "X — Cycles of Concentration (CoC)",
                      },
                      {
                        color: "#ea580c",
                        label: `Z — Temperature (°${tempUnit})`,
                      },
                      {
                        color: "#059669",
                        label: activeSaltId
                          ? `Y — ${activeSaltId} Saturation Ratio (SR)`
                          : "Y — Saturation Ratio (SR)",
                      },
                    ].map(({ color, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 text-[11px] text-slate-600 py-0.5"
                      >
                        <div
                          className="w-5 h-[2px] rounded shrink-0"
                          style={{ background: color }}
                        />
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Controls hint — top-right corner, unobtrusive */}
                  <div
                    className="absolute top-3 right-3 pointer-events-none bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm text-[10px] text-slate-400"
                    style={{ zIndex: 20 }}
                  >
                    Left-drag · Rotate &nbsp;|&nbsp; Right-drag · Pan
                    &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click · Pin
                  </div>

                  {/* ── FAB: the SOLE control for the bottom panel ── */}
                  <SolutionDetailsFAB
                    selectedData={selectedData}
                    bottomPanelOpen={bottomPanelOpen}
                    hasBottomData={hasBottomData}
                    tempUnit={tempUnit}
                    onToggle={handleToggleBottomPanel}
                  />
                </>
              )}
            </div>

            {/* ── Resize handle ── */}
            <div
              onMouseDown={onResizeMouseDown}
              className="w-[5px] shrink-0 bg-slate-200 hover:bg-blue-400 active:bg-blue-500 cursor-col-resize transition-colors relative group"
              style={{ zIndex: 30 }}
              title="Drag to resize sidebar"
            >
              <div className="absolute inset-y-0 left-[1px] w-[3px] flex flex-col items-center justify-center gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] h-[3px] rounded-full bg-white"
                  />
                ))}
              </div>
            </div>

            {/* ── Right Sidebar ── */}
            <aside
              style={{
                width: sidebarWidth,
                minWidth: SIDEBAR_MIN,
                maxWidth: SIDEBAR_MAX,
              }}
              className="shrink-0 bg-white border-l border-slate-200 overflow-y-auto p-4"
            >
              {!d ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl">
                    📊
                  </div>
                  <p className="text-[14px] font-semibold text-slate-600 mb-1">
                    Hover or click a bar
                  </p>
                  <p className="text-[12px] text-slate-400">
                    to inspect grid-point details
                  </p>
                  <div className="mt-6 space-y-2.5">
                    {legendItems.map(
                      ({ label, sub, baseHex, lightHex, bg }) => (
                        <div
                          key={label}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${bg} text-left`}
                        >
                          <div
                            className="w-3 h-9 rounded shrink-0"
                            style={{
                              background: `linear-gradient(to bottom, ${baseHex}, ${lightHex})`,
                            }}
                          />
                          <div>
                            <div className="text-[13px] font-semibold text-slate-700">
                              {label}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {sub}
                            </div>
                            <div className="text-[10px] text-slate-300 mt-0.5">
                              Dark = high SR · Light = low SR
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-5 space-y-2.5 text-left">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
                      Axis Legend
                    </p>
                    {[
                      {
                        color: "#2563eb",
                        label: "X — Cycles of Concentration",
                      },
                      {
                        color: "#ea580c",
                        label: `Z — Temperature (°${tempUnit})`,
                      },
                      {
                        color: "#059669",
                        label: activeSaltId
                          ? `Y — ${activeSaltId} Saturation Ratio (SR)`
                          : "Y — Saturation Ratio (SR)",
                      },
                    ].map(({ color, label }) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <div
                          className="w-6 h-[2px] shrink-0 rounded-full"
                          style={{ background: color }}
                        />
                        <span className="text-[12px] text-slate-500">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-4 space-y-1">
                    <p className="text-[11px] text-slate-400 italic">
                      ↔ Left-drag to rotate
                    </p>
                    <p className="text-[11px] text-slate-400 italic">
                      ↕ Right-drag to pan
                    </p>
                    <p className="text-[11px] text-slate-400 italic">
                      🖱 Scroll to zoom
                    </p>
                    <p className="text-[11px] text-slate-400 italic">
                      Click bar → Pin selection & update values
                    </p>
                    <p className="text-[11px] text-slate-400 italic">
                      FAB button → Open / close solution tables
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Hover vs pinned state indicator */}
                  {selectedData && d === selectedData && (
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-[11px] text-blue-600 font-semibold">
                          Pinned selection
                        </span>
                      </div>
                      {/* Quick-access table toggle in sidebar header */}
                      {hasBottomData && (
                        <button
                          onClick={handleToggleBottomPanel}
                          className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-md font-semibold transition-all border ${
                            bottomPanelOpen
                              ? "bg-slate-800 text-white border-slate-700"
                              : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                          }`}
                          title={
                            bottomPanelOpen ? "Hide tables" : "Show tables"
                          }
                        >
                          {bottomPanelOpen ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                          {bottomPanelOpen ? "Hide" : "Tables"}
                        </button>
                      )}
                    </div>
                  )}
                  {(!selectedData || d !== selectedData) && (
                    <div className="mb-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                      <span className="text-[11px] text-teal-600 font-semibold">
                        Hovering — click to pin
                      </span>
                    </div>
                  )}

                  {d.bar_data && (
                    <div
                      className="mb-4 rounded-lg px-3 py-2 text-white text-[12px] font-semibold flex items-center gap-2"
                      style={{ backgroundColor: d.bar_data.color_hex }}
                    >
                      <div
                        className="w-3 h-3 rounded-full border border-white/40"
                        style={{ opacity: d.bar_data.opacity }}
                      />
                      {statusLabel} · SR intensity{" "}
                      {Math.round(d.bar_data.opacity * 100)}%
                    </div>
                  )}
                  <SSection title="Grid Point">
                    <SRow label="CoC" value={String(d._grid_CoC)} />
                    <SRow
                      label="Temperature"
                      value={`${d._grid_temp} °${tempUnit}`}
                    />
                    <SRow label="pH" value={String(d._grid_pH)} />
                    <SRow
                      label="Ionic Strength"
                      value={d.ionic_strength?.toFixed(5) ?? "—"}
                    />
                    {(d.dissolved_oxygen_ppm != null ||
                      (d.corrosion_rate?.do_ppm as number | undefined) !=
                        null) && (
                      <SRow
                        label="Dissolved O₂"
                        value={`${(d.dissolved_oxygen_ppm ?? (d.corrosion_rate?.do_ppm as number)).toFixed(2)} ppm`}
                      />
                    )}
                    {d.description_of_solution?.activity_of_water != null && (
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

                  <SSection
                    title={
                      activeSaltId
                        ? `${activeSaltId} — Saturation Ratio`
                        : "Saturation Ratio (SR)"
                    }
                  >
                    <SRow
                      label="Saturation Ratio (SR)"
                      value={displaySR !== null ? displaySR.toFixed(4) : "—"}
                      bold
                    />
                    <div className="flex justify-between items-center py-[6px]">
                      <span className="text-[13px] text-slate-500">Status</span>
                      <Badge text={statusLabel} variant={statusVar} />
                    </div>
                  </SSection>

                  {saltsOfInterest.length > 0 &&
                    Object.keys(d.saturation_indices).length > 0 && (
                      <SSection title="Key Salts SR">
                        {saltsOfInterest.map((salt) => {
                          const entry = d.saturation_indices[salt];
                          const isActive = salt === activeSaltId;
                          const srDisplay =
                            entry?.SR != null ? entry.SR : entry?.SI;
                          return (
                            <div
                              key={salt}
                              className="flex justify-between items-center py-[6px] border-b border-slate-100 last:border-0"
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span
                                  className={`text-[13px] truncate ${isActive ? "font-semibold text-blue-700" : "text-slate-500"}`}
                                >
                                  {salt}
                                </span>
                                {entry?.chemical_formula && (
                                  <span className="text-[10px] text-slate-300 shrink-0">
                                    {entry.chemical_formula}
                                  </span>
                                )}
                              </div>
                              <span
                                className={`text-[13px] font-semibold shrink-0 ${srDisplay != null && srDisplay > 0 ? "text-red-600" : "text-slate-400"}`}
                              >
                                {srDisplay != null ? srDisplay : "—"}
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
                    {d.indices.ryznar.risk !== "N/A" && (
                      <SRow
                        label="RSI"
                        value={d.indices.ryznar.ri.toFixed(2)}
                        badge={d.indices.ryznar.risk}
                      />
                    )}
                    {d.indices.puckorius.risk !== "N/A" && (
                      <SRow
                        label="PSI"
                        value={d.indices.puckorius.index.toFixed(2)}
                        badge={d.indices.puckorius.risk}
                      />
                    )}
                    {d.indices.larson_skold.risk_level !== "N/A" && (
                      <SRow
                        label="Larson-Skold"
                        value={
                          d.indices.larson_skold.index != null
                            ? d.indices.larson_skold.index.toFixed(3)
                            : "N/A"
                        }
                        badge={`${d.indices.larson_skold.risk_level} Risk`}
                      />
                    )}
                    {d.indices.stiff_davis.risk !== "N/A" && (
                      <SRow
                        label="Stiff-Davis"
                        value={
                          d.indices.stiff_davis.index != null
                            ? d.indices.stiff_davis.index.toFixed(3)
                            : "N/A"
                        }
                        badge={
                          d.indices.stiff_davis.risk ??
                          d.indices.stiff_davis.interpretation ??
                          ""
                        }
                      />
                    )}
                    {d.indices.ccpp.risk !== "N/A" && (
                      <SRow
                        label="CCPP (ppm)"
                        value={
                          d.indices.ccpp.ccpp_ppm != null
                            ? String(d.indices.ccpp.ccpp_ppm)
                            : "N/A"
                        }
                        badge={d.indices.ccpp.risk}
                      />
                    )}
                  </SSection>

                  <CorrosionSection d={d} saltsOfInterest={saltsOfInterest} />

                  {Object.keys(d.saturation_indices).length > 0 && (
                    <SSection title="All Minerals SR">
                      {Object.entries(d.saturation_indices)
                        .sort(([, a], [, b]) => {
                          const srA = a.SR ?? a.SI;
                          const srB = b.SR ?? b.SI;
                          return srB - srA;
                        })
                        .map(([key, val]) => {
                          const isTarget = key === activeSaltId;
                          const isInterest = saltsOfInterest.includes(key);
                          const srVal = val.SR ?? val.SI;
                          return (
                            <div
                              key={key}
                              className={`flex justify-between items-center py-[5px] border-b border-slate-50 last:border-0 ${isTarget ? "bg-blue-50 -mx-1 px-1 rounded" : ""}`}
                            >
                              <div className="flex items-center gap-1 min-w-0">
                                <span
                                  className={`text-[13px] truncate ${isTarget ? "font-bold text-blue-700" : isInterest ? "font-semibold text-slate-700" : "text-slate-400"}`}
                                >
                                  {key}
                                </span>
                                {val.chemical_formula && (
                                  <span className="text-[10px] text-slate-300 shrink-0 hidden sm:inline">
                                    {val.chemical_formula}
                                  </span>
                                )}
                              </div>
                              <span
                                className={`text-[13px] shrink-0 font-semibold ${srVal > 0 ? "text-red-600" : "text-slate-300"} ${isTarget ? "font-bold" : ""}`}
                              >
                                {srVal}
                              </span>
                            </div>
                          );
                        })}
                    </SSection>
                  )}
                </>
              )}
            </aside>
          </div>

          {/* ── Bottom panel — only renders when there's a pinned selection ── */}
          {bottomPanelData && (
            <div
              className="shrink-0 border-t-2 border-slate-300 bg-white overflow-hidden"
              style={{
                maxHeight: bottomPanelOpen ? "480px" : "0px",
                transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-2 bg-slate-50 border-b border-slate-200 shrink-0">
                <div className="flex items-center gap-1">
                  {hasDescription && (
                    <button
                      onClick={() => setBottomTab("description")}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${bottomTab === "description" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
                    >
                      <FlaskConical className="w-3.5 h-3.5" />
                      Description of Solution
                    </button>
                  )}
                  {hasSpecies && (
                    <button
                      onClick={() => setBottomTab("species")}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${bottomTab === "species" ? "bg-indigo-700 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      Distribution of Species
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    CoC {bottomPanelData._grid_CoC} ·{" "}
                    {bottomPanelData._grid_temp}°{tempUnit} · pH{" "}
                    {bottomPanelData._grid_pH}
                  </span>
                  <button
                    onClick={handleCloseBottomPanel}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    title="Close panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Panel content */}
              <div className="overflow-y-auto" style={{ maxHeight: "420px" }}>
                <div className="p-4">
                  {bottomTab === "description" && hasDescription && (
                    <DescriptionSolutionPanel
                      d={bottomPanelData}
                      tempUnit={tempUnit}
                    />
                  )}
                  {bottomTab === "species" && hasSpecies && (
                    <DistributionOfSpeciesPanel
                      d={bottomPanelData}
                      tempUnit={tempUnit}
                    />
                  )}
                  {bottomTab === "description" && !hasDescription && (
                    <div className="text-center py-8 text-[13px] text-slate-400 italic">
                      No description_of_solution data for this grid point.
                    </div>
                  )}
                  {bottomTab === "species" && !hasSpecies && (
                    <div className="text-center py-8 text-[13px] text-slate-400 italic">
                      No distribution_of_species data for this grid point.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
