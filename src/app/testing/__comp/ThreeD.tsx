// ==================================================================================================
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
// }

// export interface Corrosion {
//   mild_steel?: CorrosionMetal;
//   copper?: CorrosionMetal;
//   admiralty_brass?: CorrosionMetal;
//   [key: string]: CorrosionMetal | undefined;
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
//   description_of_solution?: { pH?: number; activity_of_water?: number } | null;
//   calculations?: Record<string, unknown>;
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
//   };
// }

// interface RawGridPoint extends Omit<GridResult, "indices" | "corrosion"> {
//   indices?: Indices;
//   corrosion?: Corrosion;
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

// const COLOR_MAP: Record<string, number> = {
//   yellow: 0xe8a800,
//   red: 0xd93025,
//   green: 0x9ca3af,
// };

// const COLOR_HEX: Record<string, string> = {
//   yellow: "#e8a800",
//   red: "#d93025",
//   green: "#9ca3af",
// };

// const GRAY_LIGHT = 0xd1fae5;
// const GRAY_DARK = 0x064e3b;
// const YELLOW_LIGHT = 0xfef9c3;
// const YELLOW_DARK = 0x92400e;
// const RED_LIGHT = 0xfee2e2;
// const RED_DARK = 0x7f1d1d;

// const BAR_W = 1.55;
// const SPACING = 2.4;
// const BAR_MAX_H = 8.0;

// const SIDEBAR_MIN = 240;
// const SIDEBAR_MAX = 560;
// const SIDEBAR_DEFAULT = 300;

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function lerpHex(from: number, to: number, t: number): number {
//   const fr = (from >> 16) & 0xff,
//     fg = (from >> 8) & 0xff,
//     fb = from & 0xff;
//   const tr = (to >> 16) & 0xff,
//     tg = (to >> 8) & 0xff,
//     tb = to & 0xff;
//   const r = Math.round(fr + (tr - fr) * t);
//   const g = Math.round(fg + (tg - fg) * t);
//   const b = Math.round(fb + (tb - fb) * t);
//   return (r << 16) | (g << 8) | b;
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

//   // Use SR for the primary display value; fall back to SI if SR is absent
//   const srValue: number = saltId
//     ? (saturation_indices[saltId]?.SR ??
//       saturation_indices[saltId]?.SI ??
//       p.si ??
//       0)
//     : (p.sr ?? p.si ?? 0);

//   console.log(srValue);

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

//   return {
//     _grid_CoC: p.coc ?? p.CoC ?? 0,
//     _grid_temp: p.temperature ?? p.temp ?? 0,
//     _grid_pH: p.ph ?? p.pH ?? 0,
//     ionic_strength: p.ionic_strength ?? 0,
//     charge_balance_error_pct: p.charge_balance_error_pct,
//     saturation_indices,
//     color_code,
//     description_of_solution: p.description_of_solution
//       ? {
//           pH: p.description_of_solution.pH,
//           activity_of_water: p.description_of_solution.activity_of_water,
//         }
//       : null,
//     indices: {
//       // Store srValue in lsi.lsi field so downstream SR-based logic works uniformly
//       lsi: { lsi: srValue, risk: lsiRisk, pHs: 0 },
//       ryznar: { ri: 0, risk: "N/A", pHs: 0 },
//       puckorius: { index: 0, risk: "N/A" },
//       larson_skold: { index: null, risk_level: "N/A" },
//       stiff_davis: { index: null, risk: "N/A", interpretation: "N/A" },
//       ccpp: { ccpp_ppm: null, risk: "N/A" },
//     },
//     corrosion: {},
//   };
// }

// // ─── API shape resolver ───────────────────────────────────────────────────────

// function resolveMeta(
//   apiResponse: SaturationApiResponseFlat | undefined,
// ): ResolvedMeta | null {
//   if (!apiResponse) return null;

//   // ── SHAPE 1: data.graph_data.axes (axes-based, e.g. graph_data with axes.z.values) ──
//   const graphData =
//     (apiResponse as any)?.data?.graph_data ?? (apiResponse as any)?.graph_data;

//   if (graphData?.axes) {
//     const tempUnit = graphData.temp_unit?.replace("°", "") ?? "C";
//     const saltId: string | null = graphData.salt_id ?? null;
//     const cocValues: number[] = graphData.axes?.x?.values ?? [];
//     const tempValues: number[] = graphData.axes?.z?.values ?? [];

//     const rawPoints: any[] =
//       graphData.points ?? (apiResponse as any)?.data?.points ?? [];

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

//     const summary = (apiResponse as any)?.data?.summary;
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

//   // ── SHAPE 2: data.chart_data.points ───────────────────────────────────────
//   const chartData = (apiResponse as any)?.data?.chart_data;
//   if (chartData?.points) {
//     const tempUnit = chartData.temp_unit?.replace("°", "") ?? "C";
//     const saltId: string | null = chartData.salt_id ?? null;

//     const gridResults: GridResult[] = chartData.points.map((p: any) =>
//       mapPointToGridResult(p, saltId),
//     );

//     const summary = (apiResponse as any)?.data?.summary;
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

//   // ── SHAPE 3: original flat / aiResponse shape ─────────────────────────────
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

//   const gridResults: GridResult[] = rawGrid.map(
//     (d: RawGridPoint): GridResult => {
//       if (d.indices) return d as GridResult;

//       const calc = d.calculations ?? {};
//       return {
//         ...(d as Omit<RawGridPoint, "indices" | "corrosion" | "calculations">),
//         indices: {
//           lsi: calc.lsi ?? { lsi: 0, risk: "Unknown", pHs: 0 },
//           ryznar: calc.ryznar ?? { ri: 0, risk: "Unknown", pHs: 0 },
//           puckorius: calc.puckorius ?? { index: 0, risk: "Unknown" },
//           larson_skold: calc.larson_skold ?? {
//             index: null,
//             risk_level: "Unknown",
//           },
//           stiff_davis: calc.stiff_davis ?? {
//             index: null,
//             risk: "",
//             interpretation: "",
//           },
//           ccpp: calc.ccpp ?? { ccpp_ppm: null, risk: "Unknown" },
//         },
//         corrosion: {
//           ...(calc.mild_steel_corrosion
//             ? { mild_steel: calc.mild_steel_corrosion }
//             : {}),
//           ...(calc.copper_corrosion ? { copper: calc.copper_corrosion } : {}),
//           ...(calc.admiralty_brass_corrosion
//             ? { admiralty_brass: calc.admiralty_brass_corrosion }
//             : {}),
//         },
//       };
//     },
//   );

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
//   // ↓ renamed: maxSR instead of maxSI — bar heights are now SR-driven
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
//     // ── SR-based bar height ──────────────────────────────────────────────────
//     // Always read the SR field directly from saturation_indices — never SI.
//     // When a salt is active: SR of that salt.
//     // When no salt is active: highest SR across all minerals in this point.
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

//     const t = Math.min(1, maxSR > 0 ? displayVal / maxSR : 0);
//     let clr: number;
//     if (d.color_code === "green") {
//       clr = lerpHex(GRAY_LIGHT, GRAY_DARK, t);
//     } else if (d.color_code === "yellow") {
//       clr = lerpHex(YELLOW_LIGHT, YELLOW_DARK, t);
//     } else {
//       clr = lerpHex(RED_LIGHT, RED_DARK, t);
//     }

//     const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
//     const mat = new THREE.MeshPhongMaterial({ color: clr, shininess: 55 });
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
//           opacity: 0.1,
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
//   const AX_SR = 0x059669; // renamed from AX_SI
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

//   // ── Y-axis ticks — now labelled SR ──────────────────────────────────────────
//   const srStep =
//     maxSR <= 1
//       ? 0.25
//       : maxSR <= 2
//         ? 0.5
//         : maxSR <= 5
//           ? 1.0
//           : maxSR <= 20
//             ? 5
//             : 10;
//   const srTicks: number[] = [];
//   for (let v = 0; v <= maxSR + srStep * 0.5; v += srStep)
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

//   // Y-axis title: always "Saturation Ratio (SR)"
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
//     return (
//       apiResponse.run_id ??
//       (apiResponse.data as { run_id?: string } | undefined)?.run_id ??
//       undefined
//     );
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
//       responseAny?.data?.graph_data?.available_salts ??
//       responseAny?.graph_data?.available_salts ??
//       responseAny?.data?.aiResponse?.available_salts ??
//       responseAny?.available_salts ??
//       responseAny?.data?.available_salts ??
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

//   // ── maxSR: drives bar heights and Y-axis scale (replaces maxSI) ─────────────
//   const maxSR = useMemo((): number => {
//     if (!gridResults.length) return 1;
//     if (activeSaltId) {
//       // Use the SR field of the active salt; fall back to SI if SR is absent
//       const vals = gridResults.map((d) =>
//         Math.abs(
//           d.saturation_indices[activeSaltId]?.SR ??
//             d.saturation_indices[activeSaltId]?.SI ??
//             0,
//         ),
//       );
//       return Math.max(...vals, 1);
//     }
//     // No active salt: use lsi.lsi which holds the SR-equivalent value
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
//       maxSR, // ← was maxSI
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
//     maxSR, // ← was maxSI
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

//   // SR value for the active salt at this grid point
//   const saltSR: number | null =
//     d && activeSaltId
//       ? (d.saturation_indices[activeSaltId]?.SR ??
//         d.saturation_indices[activeSaltId]?.SI ?? // fallback if SR absent
//         null)
//       : null;

//   // Display SR: active-salt SR → lsi.lsi (which holds SR-equivalent) → null
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

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <div className="bg-white text-slate-800 border font-sans text-[14px] h-screen overflow-hidden flex flex-col select-none ">
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
//                   <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-300 font-semibold">
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
//                     : "bg-gray-400";
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

//         {/* ── Available + Unavailable Salts ── */}
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

//         {/* Unavailable Salt Reason Modal */}
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

//                 {/* ── Loading overlay ── */}
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
//                   Left-drag · Rotate &nbsp;|&nbsp; Right-drag · Pan up/down
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

//                 <div className="mt-6 space-y-2.5">
//                   {[
//                     {
//                       label: "Protected",
//                       sub: "SR within safe band",
//                       hex: COLOR_HEX.green,
//                       bg: "bg-gray-50 border-gray-200",
//                     },
//                     {
//                       label: "Caution",
//                       sub: "Mild scaling tendency",
//                       hex: COLOR_HEX.yellow,
//                       bg: "bg-amber-50 border-amber-200",
//                     },
//                     {
//                       label: "Scale Risk",
//                       sub: "High CaCO₃ scale risk",
//                       hex: COLOR_HEX.red,
//                       bg: "bg-red-50 border-red-200",
//                     },
//                   ].map(({ label, sub, hex, bg }) => (
//                     <div
//                       key={label}
//                       className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${bg} text-left`}
//                     >
//                       <div
//                         className="w-3 h-9 rounded shrink-0"
//                         style={{ background: hex }}
//                       />
//                       <div>
//                         <div className="text-[13px] font-semibold text-slate-700">
//                           {label}
//                         </div>
//                         <div className="text-[11px] text-slate-400">{sub}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4 px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-left">
//                   <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
//                     Protected bar shade
//                   </div>
//                   <div
//                     className="h-3 rounded"
//                     style={{
//                       background: "linear-gradient(to right, #d1d5db, #374151)",
//                     }}
//                   />
//                   <div className="flex justify-between text-[10px] text-slate-400 mt-1">
//                     <span>Low SR</span>
//                     <span>High SR</span>
//                   </div>
//                 </div>

//                 <div className="mt-6 border-t border-slate-100 pt-5 space-y-2.5 text-left">
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
//                     ↕ Right-drag to pan up / down / sideways
//                   </p>
//                   <p className="text-[11px] text-slate-400 italic">
//                     🖱 Scroll to zoom in / out
//                   </p>
//                   <p className="text-[11px] text-slate-400 italic">
//                     ↔ Drag the left edge to resize this panel
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <>
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

//                 {/* ── Saturation Ratio section (replaces Deposition Index) ── */}
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

//                 {/* ── Key Salts SR ── */}
//                 {saltsOfInterest.length > 0 &&
//                   Object.keys(d.saturation_indices).length > 0 && (
//                     <SSection title="Key Salts SR">
//                       {saltsOfInterest.map((salt) => {
//                         const entry = d.saturation_indices[salt];
//                         const isActive = salt === activeSaltId;
//                         // Show SR; fall back to SI if SR not present
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

//                 {Object.keys(d.corrosion).length > 0 && (
//                   <SSection title="Corrosion Rates">
//                     {Object.entries(d.corrosion).map(([key, metal]) => {
//                       if (!metal) return null;
//                       const label = key
//                         .replace(/_/g, " ")
//                         .replace(/\b\w/g, (c) => c.toUpperCase());
//                       return (
//                         <div
//                           key={key}
//                           className="py-[6px] border-b border-slate-100 last:border-0"
//                         >
//                           <div className="flex justify-between items-center">
//                             <span className="text-[13px] text-slate-600 font-medium">
//                               {label}
//                             </span>
//                             <Badge text={metal.rating} />
//                           </div>
//                           <div className="flex justify-between mt-1">
//                             <span className="text-[11px] text-slate-400">
//                               Treated / Base
//                             </span>
//                             <span className="text-[11px] text-slate-600">
//                               {metal.cr_mpy.toFixed(2)} /{" "}
//                               {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
//                               {metal.total_inhibition_percent !== undefined && (
//                                 <span className="text-emerald-600 font-semibold ml-1.5">
//                                   −{metal.total_inhibition_percent}%
//                                 </span>
//                               )}
//                             </span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </SSection>
//                 )}

//                 {/* ── All Minerals SR — sorted by SR desc, displaying SR ── */}
//                 {Object.keys(d.saturation_indices).length > 0 && (
//                   <SSection title="All Minerals SR">
//                     {Object.entries(d.saturation_indices)
//                       // Sort descending by SR (fall back to SI if SR absent)
//                       .sort(([, a], [, b]) => {
//                         const srA = a.SR ?? a.SI;
//                         const srB = b.SR ?? b.SI;
//                         return srB - srA;
//                       })
//                       .map(([key, val]) => {
//                         const isTarget = key === activeSaltId;
//                         const isInterest = saltsOfInterest.includes(key);
//                         const srVal = val.SR ?? val.SI; // prefer SR
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

//       <div>
//         <h3>Summary</h3>
//         <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
//       </div>
//     </>
//   );
// }
// ==============================================================================================
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
// }

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
//   corrosion: Corrosion;
//   description_of_solution?: { pH?: number; activity_of_water?: number } | null;
//   calculations?: Record<string, unknown>;
//   bar_data?: BarData;
//   dissolved_oxygen_ppm?: number;
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

// const COLOR_HEX: Record<string, string> = {
//   yellow: "#e8a800",
//   red: "#d93025",
//   green: "#9ca3af",
// };

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
//  * This gives us a nice gradient effect within each color category.
//  */
// function barColorFromBarData(barData: BarData): number {
//   const { color_hex, opacity } = barData;
//   // opacity ranges from ~0.3 (low SR, light) to ~1.0 (high SR, dark)
//   // We blend between a lightened version and the full color
//   const t = Math.max(0, Math.min(1, opacity));
//   if (t > 0.5) {
//     // dark side: darken from full color
//     const darkFactor = 0.5 + (t - 0.5) * 1.0; // 0.5 → 1.0
//     return darkenHex(color_hex, darkFactor);
//   } else {
//     // light side: lighten toward white
//     const lightFactor = (0.5 - t) * 0.65; // 0.5 → 0 lightening
//     return lightenHex(color_hex, lightFactor);
//   }
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

//   // Build bar_data from point data if available
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

//   return {
//     _grid_CoC: p.coc ?? p.CoC ?? 0,
//     _grid_temp: p.temperature ?? p.temp ?? 0,
//     _grid_pH: p.ph ?? p.pH ?? 0,
//     ionic_strength: p.ionic_strength ?? 0,
//     charge_balance_error_pct: p.charge_balance_error_pct,
//     saturation_indices,
//     color_code,
//     bar_data,
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
//     corrosion: {},
//   };
// }

// // ─── API shape resolver ───────────────────────────────────────────────────────

// function resolveMeta(
//   apiResponse: SaturationApiResponseFlat | undefined,
// ): ResolvedMeta | null {
//   if (!apiResponse) return null;

//   const responseAny = apiResponse as any;

//   // ── SHAPE 1: New top-level grid_results with bar_data (from data.grid_results) ──
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

//     const gridResults: GridResult[] = topLevelGridResults.map(
//       (d: RawGridPoint): GridResult => {
//         if (d.indices) return d as GridResult;

//         const calc = (d as any).calculations ?? {};
//         return {
//           ...(d as any),
//           indices: {
//             lsi: calc.lsi ?? { lsi: 0, risk: "Unknown", pHs: 0 },
//             ryznar: calc.ryznar ?? { ri: 0, risk: "Unknown", pHs: 0 },
//             puckorius: calc.puckorius ?? { index: 0, risk: "Unknown" },
//             larson_skold: calc.larson_skold ?? {
//               index: null,
//               risk_level: "Unknown",
//             },
//             stiff_davis: calc.stiff_davis ?? {
//               index: null,
//               risk: "",
//               interpretation: "",
//             },
//             ccpp: calc.ccpp ?? { ccpp_ppm: null, risk: "Unknown" },
//           },
//           corrosion: {
//             ...(calc.mild_steel_corrosion
//               ? { mild_steel: calc.mild_steel_corrosion }
//               : {}),
//             ...(calc.copper_corrosion ? { copper: calc.copper_corrosion } : {}),
//             ...(calc.admiralty_brass_corrosion
//               ? { admiralty_brass: calc.admiralty_brass_corrosion }
//               : {}),
//           },
//         };
//       },
//     );

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

//   // ── SHAPE 4: flat / aiResponse shape ──────────────────────────────────────
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

//   const gridResults: GridResult[] = rawGrid.map(
//     (d: RawGridPoint): GridResult => {
//       if (d.indices) return d as GridResult;

//       const calc = d.calculations ?? {};
//       return {
//         ...(d as Omit<RawGridPoint, "indices" | "corrosion" | "calculations">),
//         indices: {
//           lsi: (calc as any).lsi ?? { lsi: 0, risk: "Unknown", pHs: 0 },
//           ryznar: (calc as any).ryznar ?? { ri: 0, risk: "Unknown", pHs: 0 },
//           puckorius: (calc as any).puckorius ?? { index: 0, risk: "Unknown" },
//           larson_skold: (calc as any).larson_skold ?? {
//             index: null,
//             risk_level: "Unknown",
//           },
//           stiff_davis: (calc as any).stiff_davis ?? {
//             index: null,
//             risk: "",
//             interpretation: "",
//           },
//           ccpp: (calc as any).ccpp ?? { ccpp_ppm: null, risk: "Unknown" },
//         },
//         corrosion: {
//           ...((calc as any).mild_steel_corrosion
//             ? { mild_steel: (calc as any).mild_steel_corrosion }
//             : {}),
//           ...((calc as any).copper_corrosion
//             ? { copper: (calc as any).copper_corrosion }
//             : {}),
//           ...((calc as any).admiralty_brass_corrosion
//             ? { admiralty_brass: (calc as any).admiralty_brass_corrosion }
//             : {}),
//         },
//       };
//     },
//   );

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
//     // SR value for bar height
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

//     // Use bar_data for color if available, otherwise fall back to legacy logic
//     let clr: number;
//     if (d.bar_data) {
//       clr = barColorFromBarData(d.bar_data);
//     } else {
//       // Legacy fallback: color by color_code + SR intensity
//       const t = Math.min(1, maxSR > 0 ? displayVal / maxSR : 0);
//       if (d.color_code === "green") {
//         // green: light gray → dark emerald
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

//   // Y-axis ticks
//   // AFTER (fixed)
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

//   // ── Legend swatches using actual bar_data colors ───────────────────────────
//   // Build a small legend showing the opacity gradient for each category
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

//                 {/* Color legend with gradient swatches */}
//                 <div className="mt-6 space-y-2.5">
//                   {legendItems.map(({ label, sub, baseHex, lightHex, bg }) => (
//                     <div
//                       key={label}
//                       className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${bg} text-left`}
//                     >
//                       {/* Gradient swatch showing opacity range */}
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
//                 {/* Bar color swatch from bar_data */}
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
//                   {d.dissolved_oxygen_ppm != null && (
//                     <SRow
//                       label="Dissolved O₂"
//                       value={`${d.dissolved_oxygen_ppm.toFixed(2)} ppm`}
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

//                 {Object.keys(d.corrosion).length > 0 && (
//                   <SSection title="Corrosion Rates">
//                     {Object.entries(d.corrosion).map(([key, metal]) => {
//                       if (!metal) return null;
//                       const label = key
//                         .replace(/_/g, " ")
//                         .replace(/\b\w/g, (c) => c.toUpperCase());
//                       return (
//                         <div
//                           key={key}
//                           className="py-[6px] border-b border-slate-100 last:border-0"
//                         >
//                           <div className="flex justify-between items-center">
//                             <span className="text-[13px] text-slate-600 font-medium">
//                               {label}
//                             </span>
//                             <Badge text={metal.rating} />
//                           </div>
//                           <div className="flex justify-between mt-1">
//                             <span className="text-[11px] text-slate-400">
//                               Treated / Base
//                             </span>
//                             <span className="text-[11px] text-slate-600">
//                               {metal.cr_mpy.toFixed(2)} /{" "}
//                               {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
//                               {metal.total_inhibition_percent !== undefined && (
//                                 <span className="text-emerald-600 font-semibold ml-1.5">
//                                   −{metal.total_inhibition_percent}%
//                                 </span>
//                               )}
//                             </span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </SSection>
//                 )}

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
  note?: string; // ← NEW: e.g. "Admiralty Brass rate = Copper × 0.85"
}

// ── NEW: top-level corrosion_rate shape from API ──────────────────────────────
export interface CorrosionRate {
  mild_steel?: CorrosionMetal;
  copper?: CorrosionMetal;
  admiralty_brass?: CorrosionMetal;
  do_ppm?: number; // dissolved oxygen ppm lives here in the new shape
  temp_c?: number; // temperature (°C) inside corrosion_rate block
  [key: string]: CorrosionMetal | number | undefined;
}

/** Legacy shape: metals keyed directly on corrosion */
export interface Corrosion {
  mild_steel?: CorrosionMetal;
  copper?: CorrosionMetal;
  admiralty_brass?: CorrosionMetal;
  [key: string]: CorrosionMetal | undefined;
}

/** bar_data from the new grid_results shape */
export interface BarData {
  color_hex: string;
  opacity: number;
  sr_color: string;
  sr_color_hex: string;
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
  /** Normalised corrosion metals (no do_ppm / temp_c) */
  corrosion: Corrosion;
  /** Dissolved O₂ ppm — may come from corrosion_rate.do_ppm or top-level */
  dissolved_oxygen_ppm?: number;
  /** Temperature °C from corrosion block */
  corrosion_temp_c?: number;
  description_of_solution?: { pH?: number; activity_of_water?: number } | null;
  calculations?: Record<string, unknown>;
  bar_data?: BarData;
  /** Raw corrosion_rate block preserved for reference */
  corrosion_rate?: CorrosionRate;
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
  /** NEW shape: corrosion data lives under corrosion_rate */
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

/** Convert a CSS hex color string "#rrggbb" to a THREE.js number */
function hexStringToThreeNum(hex: string): number {
  const clean = hex.replace("#", "");
  return parseInt(clean, 16);
}

/** Darken a hex color by a factor (0 = black, 1 = original) */
function darkenHex(hex: string, factor: number): number {
  const num = hexStringToThreeNum(hex);
  const r = Math.round(((num >> 16) & 0xff) * factor);
  const g = Math.round(((num >> 8) & 0xff) * factor);
  const b = Math.round((num & 0xff) * factor);
  return (r << 16) | (g << 8) | b;
}

/** Lighten a hex by blending toward white */
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

/**
 * Compute the final THREE color for a bar using bar_data.
 * opacity 1.0 = full color (darkest), low opacity = lighter tint.
 */
function barColorFromBarData(barData: BarData): number {
  const { color_hex, opacity } = barData;
  const t = Math.max(0, Math.min(1, opacity));
  if (t > 0.5) {
    const darkFactor = 0.5 + (t - 0.5) * 1.0;
    return darkenHex(color_hex, darkFactor);
  } else {
    const lightFactor = (0.5 - t) * 0.65;
    return lightenHex(color_hex, lightFactor);
  }
}

// ─── Corrosion normaliser ─────────────────────────────────────────────────────

/**
 * Given a raw grid point (either old or new shape), extract:
 *   - a clean `corrosion` map  (only CorrosionMetal objects, no scalars)
 *   - dissolved_oxygen_ppm     (from corrosion_rate.do_ppm or top-level)
 *   - corrosion_temp_c         (from corrosion_rate.temp_c)
 */
function normaliseCorrosion(raw: RawGridPoint): {
  corrosion: Corrosion;
  dissolved_oxygen_ppm?: number;
  corrosion_temp_c?: number;
} {
  // ── NEW shape: corrosion_rate block ──────────────────────────────────────
  if (raw.corrosion_rate && typeof raw.corrosion_rate === "object") {
    const cr = raw.corrosion_rate;
    const metals: Corrosion = {};

    // Pull scalar extras first
    const do_ppm = typeof cr.do_ppm === "number" ? cr.do_ppm : undefined;
    const corrosion_temp_c =
      typeof cr.temp_c === "number" ? cr.temp_c : undefined;

    // Non-scalar keys are metal objects
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

  // ── LEGACY shape: corrosion already on the point ─────────────────────────
  if (raw.corrosion && typeof raw.corrosion === "object") {
    return {
      corrosion: raw.corrosion,
      dissolved_oxygen_ppm: raw.dissolved_oxygen_ppm,
      corrosion_temp_c: raw.corrosion_temp_c,
    };
  }

  // ── calculations shape ────────────────────────────────────────────────────
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

// ─── Shared point mapper ───────────────────────────────────────────────────────

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

  // Run through normaliseCorrosion for this raw point too
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
    description_of_solution: p.description_of_solution
      ? {
          pH: p.description_of_solution.pH,
          activity_of_water: p.description_of_solution.activity_of_water,
        }
      : null,
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

// ─── Raw point → GridResult normaliser ────────────────────────────────────────

function normaliseRawPoint(d: RawGridPoint): GridResult {
  // Already fully typed?
  if (d.indices && d.corrosion) return d as GridResult;

  const calc = (d as any).calculations ?? {};
  const { corrosion, dissolved_oxygen_ppm, corrosion_temp_c } =
    normaliseCorrosion(d);

  return {
    ...(d as any),
    dissolved_oxygen_ppm:
      dissolved_oxygen_ppm ?? (d as any).dissolved_oxygen_ppm,
    corrosion_temp_c,
    indices: d.indices ?? {
      lsi: calc.lsi ?? { lsi: 0, risk: "Unknown", pHs: 0 },
      ryznar: calc.ryznar ?? { ri: 0, risk: "Unknown", pHs: 0 },
      puckorius: calc.puckorius ?? { index: 0, risk: "Unknown" },
      larson_skold: calc.larson_skold ?? {
        index: null,
        risk_level: "Unknown",
      },
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

  // ── SHAPE 1: New top-level grid_results with bar_data ─────────────────────
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

  // ── SHAPE 2: data.graph_data.axes ──────────────────────────────────────────
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

  // ── SHAPE 3: data.chart_data.points ───────────────────────────────────────
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

  // ── SHAPE 4: flat / aiResponse ────────────────────────────────────────────
  type SrcShape = Partial<SaturationApiResponseFlat> & {
    grid_results?: RawGridPoint[];
  };

  let src: SrcShape = apiResponse as SrcShape;

  if (src.data && typeof src.data === "object") {
    if (src.data.aiResponse && typeof src.data.aiResponse === "object") {
      src = src.data.aiResponse as SrcShape;
    } else {
      src = src.data as SrcShape;
    }
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
      if (d.color_code === "green") {
        clr =
          t > 0.5
            ? lightenHex("#064e3b", 1 - (t - 0.5) * 1.2)
            : lightenHex("#d1fae5", t * 0.5);
      } else if (d.color_code === "yellow") {
        clr =
          t > 0.5
            ? lightenHex("#92400e", 1 - (t - 0.5) * 1.2)
            : lightenHex("#fef9c3", t * 0.5);
      } else {
        clr =
          t > 0.5
            ? lightenHex("#7f1d1d", 1 - (t - 0.5) * 1.2)
            : lightenHex("#fee2e2", t * 0.5);
      }
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
  const srTickLimit = safMaxSR + srStep * 0.5;
  for (let v = 0; v <= srTickLimit && srTicks.length < 50; v += srStep)
    srTicks.push(parseFloat(v.toFixed(3)));

  srTicks?.forEach((v) => {
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

  const yAxisLabel = activeSaltId
    ? `Saturation Ratio (SR) — ${activeSaltId}`
    : "Saturation Ratio (SR)";
  const srTitle = makeLabel(yAxisLabel, {
    color: "#065f46",
    fontSize: "11px",
    fontWeight: "700",
  });
  srTitle.position.set(axOriginX - 0.7, yAxisTop + 0.5, axOriginZ);
  scene.add(srTitle);

  const nMax = Math.max(nCoC, nTemp);
  const spreadXZ = nMax * SPACING;
  const initDist = Math.max(28, spreadXZ * 2.2);
  const initLookAtY = BAR_MAX_H * 0.4;

  return {
    renderer,
    labelRenderer,
    scene,
    camera,
    barMeshes,
    initDist,
    initLookAtY,
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

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  apiResponse?: SaturationApiResponseFlat;
}

// ─── Corrosion sidebar section ────────────────────────────────────────────────

/** Renders the full corrosion section for the sidebar, handling the new shape. */
function CorrosionSection({
  d,
  saltsOfInterest,
}: {
  d: GridResult;
  saltsOfInterest: string[];
}) {
  const metals = d.corrosion;
  const hasMetals = Object.keys(metals).length > 0;

  // do_ppm: prefer top-level dissolved_oxygen_ppm, then corrosion_rate.do_ppm
  const doPpm =
    d.dissolved_oxygen_ppm ?? (d.corrosion_rate?.do_ppm as number | undefined);

  // temp_c from corrosion block
  const tempC =
    d.corrosion_temp_c ?? (d.corrosion_rate?.temp_c as number | undefined);

  if (!hasMetals && doPpm == null && tempC == null) return null;

  return (
    <SSection title="Corrosion">
      {/* Environmental context */}
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

      {/* Metal rows */}
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
              {/* Metal name + rating badge */}
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[13px] text-slate-700 font-semibold">
                  {label}
                </span>
                <Badge text={metal.rating} />
              </div>

              {/* Treated rate */}
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

              {/* Base rate (only show if different) */}
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

              {/* Same treated = base: just show once cleanly */}
              {!hasTreatment && metal.cr_base_mpy != null && (
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-[12px] text-slate-400">Base rate</span>
                  <span className="text-[12px] text-slate-500">
                    {metal.cr_base_mpy.toFixed(2)}{" "}
                    <span className="text-[11px] text-slate-400">mpy</span>
                  </span>
                </div>
              )}

              {/* Inhibition % */}
              {inhibitionPct != null && (
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-[12px] text-slate-400">Inhibition</span>
                  <span className="text-[12px] font-semibold text-emerald-600">
                    −{inhibitionPct}%
                  </span>
                </div>
              )}

              {/* Note (e.g. "Admiralty Brass rate = Copper × 0.85") */}
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function SaturationDashboard({ apiResponse }: Props) {
  const [activeResponse, setActiveResponse] = useState<
    SaturationApiResponseFlat | undefined
  >(apiResponse);

  const [unavailableModal, setUnavailableModal] = useState<{
    salt: string;
    reason: string;
  } | null>(null);

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
    if (currentSalt && !salts.includes(currentSalt)) {
      salts = [currentSalt, ...salts];
    }

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
      const newWidth = Math.min(
        SIDEBAR_MAX,
        Math.max(SIDEBAR_MIN, resizeStartWidthRef.current + delta),
      );
      setSidebarWidth(newWidth);
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
  const [activeData, setActiveData] = useState<GridResult | null>(null);

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
      if (s.isPanning) {
        s.isPanning = false;
        canvas.style.cursor = "grab";
        return;
      }
      if (!s.isDragging) {
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
      s.isPanning = false;
      canvas.style.cursor = "grab";
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

  // ── Render ─────────────────────────────────────────────────────────────────
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
                        className={`text-[13px] px-3.5 py-1 rounded-full border font-medium whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                          isActive
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50"
                        }`}
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
                      title="Click to see reason"
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

        {/* ── Main ── */}
        <div className="flex flex-1 overflow-hidden">
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

                {/* Controls hint */}
                <div
                  className="absolute bottom-4 right-4 pointer-events-none bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm text-[11px] text-slate-400"
                  style={{ zIndex: 20 }}
                >
                  Left-drag · Rotate &nbsp;|&nbsp; Right-drag · Pan
                  &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click · Pin
                </div>
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

          {/* ── Sidebar ── */}
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

                {/* Color legend */}
                <div className="mt-6 space-y-2.5">
                  {legendItems.map(({ label, sub, baseHex, lightHex, bg }) => (
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
                        <div className="text-[11px] text-slate-400">{sub}</div>
                        <div className="text-[10px] text-slate-300 mt-0.5">
                          Dark = high SR · Light = low SR
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-slate-100 pt-5 space-y-2.5 text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
                    Axis Legend
                  </p>
                  {[
                    { color: "#2563eb", label: "X — Cycles of Concentration" },
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
                    ↔ Drag left edge to resize panel
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Bar color swatch */}
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
                  {/* dissolved_oxygen_ppm: show from top-level or corrosion_rate */}
                  {(d.dissolved_oxygen_ppm != null ||
                    (d.corrosion_rate?.do_ppm as number | undefined) !=
                      null) && (
                    <SRow
                      label="Dissolved O₂"
                      value={`${(
                        d.dissolved_oxygen_ppm ??
                        (d.corrosion_rate?.do_ppm as number)
                      ).toFixed(2)} ppm`}
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

                {/* Key Salts SR */}
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
                              className={`text-[13px] font-semibold shrink-0 ${
                                srDisplay != null && srDisplay > 0
                                  ? "text-red-600"
                                  : "text-slate-400"
                              }`}
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

                {/* ── Corrosion section (new dedicated component) ── */}
                <CorrosionSection d={d} saltsOfInterest={saltsOfInterest} />

                {/* All Minerals SR */}
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
      </div>
    </>
  );
}
