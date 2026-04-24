// ====================================================================================================
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
// }

// export interface SaturationApiResponseFlat {
//   success?: boolean;
//   run_id?: string;
//   salt_id: string | null;
//   salts_of_interest?: string[];
//   dosage_ppm?: number;
//   coc_min?: number;
//   coc_max?: number;
//   temp_min?: number;
//   temp_max?: number;
//   temp_unit?: string;
//   ph_mode?: string;
//   total_grid_points?: number;
//   grid_results: GridResult[];
//   summary?: { green: number; yellow: number; red: number; error: number };
//   base_water_parameters?: Record<string, { value: number; unit: string }>;
//   asset_info?: { name?: string; type?: string };
//   data?: {
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
//   };
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// // Vivid bar colours that read clearly on a white/light background
// const COLOR_MAP: Record<string, number> = {
//   yellow: 0xe8a800, // amber
//   red: 0xd93025, // red
//   green: 0x1a9652, // emerald
// };
// const COLOR_HEX: Record<string, string> = {
//   yellow: "#e8a800",
//   red: "#d93025",
//   green: "#1a9652",
// };

// const BAR_W = 1.55;
// const SPACING = 2.4;
// const BAR_MAX_H = 6.0;

// const SIDEBAR_MIN = 240;
// const SIDEBAR_MAX = 560;
// const SIDEBAR_DEFAULT = 300;

// // ─── API shape resolver ───────────────────────────────────────────────────────

// function resolveMeta(apiResponse: SaturationApiResponseFlat | undefined) {
//   if (!apiResponse) return null;
//   const src = apiResponse.data ?? apiResponse;
//   return {
//     saltId: (src.salt_id ?? null) as string | null,
//     saltsOfInterest: src.salts_of_interest ?? [],
//     dosagePpm: src.dosage_ppm ?? 0,
//     cocMin: src.coc_min ?? 0,
//     cocMax: src.coc_max ?? 0,
//     tempMin: src.temp_min ?? 0,
//     tempMax: src.temp_max ?? 0,
//     tempUnit: src.temp_unit ?? "C",
//     phMode: src.ph_mode,
//     totalGridPoints: src.total_grid_points,
//     gridResults: (src.grid_results ?? []) as GridResult[],
//     summary: src.summary,
//     baseWaterParameters: src.base_water_parameters,
//     assetInfo: src.asset_info,
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

// // Light-theme badge styles
// const badgeCls: Record<BadgeVariant, string> = {
//   yellow: "bg-amber-50   text-amber-700   border border-amber-200",
//   red: "bg-red-50     text-red-700     border border-red-200",
//   green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
//   info: "bg-blue-50    text-blue-700    border border-blue-200",
//   warn: "bg-orange-50  text-orange-700  border border-orange-200",
// };

// function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
//   const v = variant ?? getBadgeVariant(text);
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

// function SSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="mb-5">
//       <div className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-2 pb-1 border-b border-slate-200">
//         {title}
//       </div>
//       {children}
//     </div>
//   );
// }

// // ─── CSS2D label helper (light-scene colours) ─────────────────────────────────

// function makeLabel(
//   text: string,
//   opts: {
//     color?: string;
//     fontSize?: string;
//     fontWeight?: string;
//     background?: string;
//     padding?: string;
//   } = {},
// ): CSS2DObject {
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

// // ─── Build scene (white / light theme) ───────────────────────────────────────

// function buildScene(
//   canvas: HTMLCanvasElement,
//   wrap: HTMLDivElement,
//   gridResults: GridResult[],
//   activeSaltId: string | null,
//   cocUniq: number[],
//   tempUniq: number[],
//   maxSI: number,
//   tempUnit: string,
// ) {
//   const renderer = new THREE.WebGLRenderer({
//     canvas,
//     antialias: true,
//     alpha: false,
//   });
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setClearColor(0xf8fafc, 1); // slate-50 white

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
//   scene.fog = new THREE.FogExp2(0xf8fafc, 0.007);

//   const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);

//   // Lighting tuned for bright white scene
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
//   const yMax = BAR_MAX_H;
//   const axOriginX = xMin - 0.3;
//   const axOriginY = 0;
//   const axOriginZ = zMax + 0.3;

//   const barMeshes: THREE.Mesh[] = [];

//   gridResults.forEach((d) => {
//     const siValue = activeSaltId
//       ? (d.saturation_indices[activeSaltId]?.SI ?? null)
//       : null;
//     const displayVal =
//       siValue !== null ? siValue : Math.abs(d.indices.lsi.lsi ?? 0);
//     const h = Math.max(0.15, (displayVal / maxSI) * BAR_MAX_H);
//     const ci = cocUniq.indexOf(d._grid_CoC);
//     const ti = tempUniq.indexOf(d._grid_temp);
//     const x = ci * SPACING + cocOffset;
//     const z = ti * SPACING + tempOffset;
//     const clr = COLOR_MAP[d.color_code] ?? 0xd93025;

//     const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
//     const mat = new THREE.MeshPhongMaterial({ color: clr, shininess: 55 });
//     const mesh = new THREE.Mesh(geo, mat);
//     mesh.position.set(x, h / 2, z);
//     mesh.userData = { data: d, origColor: clr, h };
//     scene.add(mesh);
//     barMeshes.push(mesh);

//     // Value label — dark text on white pill
//     const labelVal =
//       siValue !== null
//         ? siValue.toFixed(2)
//         : `LSI ${d.indices.lsi.lsi.toFixed(2)}`;
//     const siLbl = makeLabel(labelVal, {
//       color: "rgba(15,23,42,0.92)",
//       fontSize: "9px",
//       fontWeight: "700",
//       background: "rgba(255,255,255,0.88)",
//       padding: "1px 4px",
//     });
//     siLbl.position.set(0, h / 2 + 0.22, 0);
//     mesh.add(siLbl);

//     // Thin dark edge
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

//   // Floor grid — very pale lines
//   const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
//   const gridHelper = new THREE.GridHelper(
//     gridW + 4,
//     (nCoC + nTemp) * 3,
//     0xcbd5e1,
//     0xe2e8f0,
//   );
//   gridHelper.position.y = -0.01;
//   scene.add(gridHelper);

//   const mkLine = (pts: THREE.Vector3[], color: number, opacity = 0.7) => {
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints(pts),
//         new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
//       ),
//     );
//   };

//   // Axis colours — strong saturated tones visible on white
//   const AX_COC = 0x2563eb; // blue-600
//   const AX_TEMP = 0xea580c; // orange-600
//   const AX_SI = 0x059669; // emerald-600

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
//       new THREE.Vector3(axOriginX, yMax + 0.8, axOriginZ),
//     ],
//     AX_SI,
//     0.9,
//   );

//   const mkArrow = (
//     dir: THREE.Vector3,
//     origin: THREE.Vector3,
//     color: number,
//   ) => {
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
//     new THREE.Vector3(axOriginX, yMax + 0.8, axOriginZ),
//     AX_SI,
//   );

//   // CoC tick labels
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

//   // Temperature tick labels
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

//   // Y / SI ticks
//   const siStep = maxSI <= 1 ? 0.25 : maxSI <= 2 ? 0.5 : 1.0;
//   const siTicks: number[] = [];
//   for (let v = 0; v <= maxSI + siStep * 0.5; v += siStep)
//     siTicks.push(parseFloat(v.toFixed(3)));
//   siTicks.forEach((v) => {
//     const yPos = (v / maxSI) * BAR_MAX_H;
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
//       AX_SI,
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
//     ? `SI (Saturation Index) — ${activeSaltId}`
//     : "LSI (Langelier Saturation Index)";
//   const siTitle = makeLabel(yAxisLabel, {
//     color: "#065f46",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   siTitle.position.set(axOriginX - 0.7, yMax + 1.2, axOriginZ);
//   scene.add(siTitle);

//   const nMax = Math.max(nCoC, nTemp);
//   const initDist = Math.max(25, nMax * 6.5);

//   return { renderer, labelRenderer, scene, camera, barMeshes, initDist };
// }

// // ─── SceneState type ──────────────────────────────────────────────────────────

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
//   apiResponse?: SaturationApiResponseFlat;
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function SaturationDashboard({ apiResponse }: Props) {
//   const meta = useMemo(() => resolveMeta(apiResponse), [apiResponse]);
//   const gridResults = useMemo(
//     (): GridResult[] => meta?.gridResults ?? [],
//     [meta],
//   );
//   const baseSaltId = meta?.saltId ?? null;

//   const [activeSaltId, setActiveSaltId] = useState<string | null>(baseSaltId);
//   useEffect(() => {
//     setActiveSaltId(baseSaltId);
//   }, [baseSaltId]);

//   const dosage = meta?.dosagePpm ?? 0;
//   const cocMin = meta?.cocMin ?? 0;
//   const cocMax = meta?.cocMax ?? 0;
//   const tempMin = meta?.tempMin ?? 0;
//   const tempMax = meta?.tempMax ?? 0;
//   const tempUnit = meta?.tempUnit ?? "C";
//   const assetName = meta?.assetInfo?.name;
//   const summary = meta?.summary;

//   const saltsOfInterest = useMemo(() => {
//     const raw =
//       apiResponse?.salts_of_interest ??
//       apiResponse?.data?.salts_of_interest ??
//       [];
//     if (baseSaltId && !raw.includes(baseSaltId)) return [baseSaltId, ...raw];
//     return raw;
//   }, [apiResponse, baseSaltId]);

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
//     if (!gridResults.length) return 0.5;
//     if (activeSaltId)
//       return Math.max(
//         ...gridResults.map((d) => d.saturation_indices[activeSaltId]?.SI ?? 0),
//         0.5,
//       );
//     return Math.max(
//       ...gridResults.map((d) => Math.abs(d.indices?.lsi?.lsi ?? 0)),
//       0.5,
//     );
//   }, [gridResults, activeSaltId]);

//   // ── Resizable sidebar ──────────────────────────────────────────────────────
//   const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
//   const isResizingRef = useRef(false);
//   const resizeStartXRef = useRef(0);
//   const resizeStartWidthRef = useRef(SIDEBAR_DEFAULT);

//   const onResizeMouseDown = useCallback(
//     (e: React.MouseEvent) => {
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

//   // ── Re-sync canvas size when sidebar resizes ───────────────────────────────
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
//     s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.position.y = Math.sin(s.rotX) * s.dist;
//     s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.lookAt(0, 2, 0);
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

//     const { renderer, labelRenderer, scene, camera, barMeshes, initDist } =
//       buildScene(
//         canvas,
//         wrap,
//         gridResults,
//         activeSaltId,
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
//     maxSI,
//     cocUniq,
//     tempUniq,
//     tempUnit,
//     updateCamera,
//   ]);

//   // ── Mouse / touch interaction ──────────────────────────────────────────────
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
//     // Hover: darken slightly (multiply toward dark slate)
//     const setHighlight = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(0x1e293b);

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

//     const onMouseDown = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       s.isDragging = false;
//       s.prevX = e.clientX;
//       s.prevY = e.clientY;
//     };
//     const onMouseMove = (e: MouseEvent) => {
//       const s = S();
//       if (!s) return;
//       const dx = e.clientX - s.prevX,
//         dy = e.clientY - s.prevY;
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
//         if (hit !== s.selectedMesh) setHighlight(hit);
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
//           setHighlight(hit);
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
//       canvas.style.cursor = "grab";
//     };
//     const onWheel = (e: WheelEvent) => {
//       const s = S();
//       if (!s) return;
//       s.dist = Math.max(8, Math.min(120, s.dist + e.deltaY * 0.05));
//       updateCamera();
//       e.preventDefault();
//     };
//     const onTouchStart = (e: TouchEvent) => {
//       const s = S();
//       if (!s) return;
//       s.prevX = e.touches[0].clientX;
//       s.prevY = e.touches[0].clientY;
//       s.isDragging = false;
//     };
//     const onTouchMove = (e: TouchEvent) => {
//       const s = S();
//       if (!s) return;
//       const dx = e.touches[0].clientX - s.prevX,
//         dy = e.touches[0].clientY - s.prevY;
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
//     canvas.addEventListener("touchstart", onTouchStart, { passive: true });
//     canvas.addEventListener("touchmove", onTouchMove, { passive: false });
//     return () => {
//       canvas.removeEventListener("mousedown", onMouseDown);
//       canvas.removeEventListener("mousemove", onMouseMove);
//       canvas.removeEventListener("mouseup", onMouseUp);
//       canvas.removeEventListener("mouseleave", onMouseLeave);
//       canvas.removeEventListener("wheel", onWheel);
//       canvas.removeEventListener("touchstart", onTouchStart);
//       canvas.removeEventListener("touchmove", onTouchMove);
//     };
//   }, [updateCamera]);

//   // ── Derived sidebar values ─────────────────────────────────────────────────
//   const d = activeData;
//   const saltSI =
//     d && activeSaltId ? (d.saturation_indices[activeSaltId]?.SI ?? null) : null;
//   const displaySI = saltSI ?? d?.indices?.lsi?.lsi ?? null;
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
//   const displaySaltLabel =
//     activeSaltId ??
//     (saltsOfInterest.length > 0 ? saltsOfInterest.join(", ") : "Multi-Salt");

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <div className="bg-white text-slate-800 border font-sans text-[14px] h-screen overflow-hidden flex flex-col select-none">
//       {/* ── Header ── */}
//       <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0 gap-4 flex-wrap">
//         <div>
//           <div className="text-[15px] font-bold text-slate-900">
//             Saturation Analysis —{" "}
//             <span className="text-blue-600">{displaySaltLabel}</span>
//             <span className="font-normal text-slate-400"> · 3D Grid</span>
//           </div>
//           <div className="text-[12px] text-slate-400 mt-0.5 flex flex-wrap gap-x-4">
//             {assetName && (
//               <span className="text-slate-600 font-semibold">{assetName}</span>
//             )}
//             {(cocMin > 0 || cocMax > 0) && (
//               <span>
//                 CoC {cocMin}–{cocMax}
//               </span>
//             )}
//             {(tempMin > 0 || tempMax > 0) && (
//               <span>
//                 Temp {tempMin}–{tempMax} °{tempUnit}
//               </span>
//             )}
//             {dosage > 0 && <span>Dosage {dosage} ppm</span>}
//             {meta?.totalGridPoints && <span>{meta.totalGridPoints} pts</span>}
//           </div>
//         </div>
//         <div className="flex items-center gap-3 flex-wrap">
//           {summary && (
//             <div className="flex gap-1.5 text-[12px]">
//               {summary.green > 0 && (
//                 <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
//                   {summary.green} Protected
//                 </span>
//               )}
//               {summary.yellow > 0 && (
//                 <span className="px-2.5 py-1 rounded-full bg-amber-50   text-amber-700   border border-amber-200   font-semibold">
//                   {summary.yellow} Caution
//                 </span>
//               )}
//               {summary.red > 0 && (
//                 <span className="px-2.5 py-1 rounded-full bg-red-50     text-red-700     border border-red-200     font-semibold">
//                   {summary.red} Scale Risk
//                 </span>
//               )}
//             </div>
//           )}
//           {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
//             const dot =
//               label === "Caution"
//                 ? "bg-amber-400"
//                 : label === "Scale Risk"
//                   ? "bg-red-500"
//                   : "bg-emerald-500";
//             return (
//               <div
//                 key={label}
//                 className="flex items-center gap-1.5 text-[12px] text-slate-500"
//               >
//                 <span className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`} />
//                 {label}
//               </div>
//             );
//           })}
//         </div>
//       </header>

//       {/* ── Salt chips ── */}
//       {saltsOfInterest.length > 0 && (
//         <div className="flex items-center gap-2 px-5 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0">
//           <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1 tracking-widest uppercase">
//             Salt View:
//           </span>
//           {saltsOfInterest.map((s) => {
//             const isActive = s === activeSaltId;
//             return (
//               <button
//                 key={s}
//                 onClick={() => setActiveSaltId(isActive ? null : s)}
//                 title={
//                   isActive ? "Reset to LSI view" : `Switch chart to ${s} SI`
//                 }
//                 className={`
//                   text-[13px] px-3 py-1 rounded-full border font-semibold shrink-0
//                   transition-all duration-150 cursor-pointer
//                   ${
//                     isActive
//                       ? "border-blue-500 text-white bg-blue-600 shadow shadow-blue-100"
//                       : "border-slate-300 text-slate-600 bg-white hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
//                   }
//                 `}
//               >
//                 {s}
//                 {isActive && (
//                   <span className="ml-1 text-[11px] font-normal opacity-75">
//                     ✓
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//           {activeSaltId && (
//             <button
//               onClick={() => setActiveSaltId(null)}
//               className="text-[11px] px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-400 bg-white transition-all ml-1 shrink-0"
//             >
//               Reset to LSI
//             </button>
//           )}
//           <span className="text-[10px] text-slate-300 ml-auto shrink-0 hidden sm:block italic">
//             Click a salt to switch the chart axis
//           </span>
//         </div>
//       )}

//       {/* ── Main ── */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* 3D viewport */}
//         <div
//           ref={wrapRef}
//           className="flex-1 min-w-0 relative overflow-hidden"
//           style={{ background: "#f8fafc" }}
//         >
//           {isEmpty ? (
//             <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
//               <div className="text-5xl opacity-20">⬛</div>
//               <p className="text-[14px]">
//                 No grid data — pass an{" "}
//                 <code className="text-slate-500 bg-slate-100 px-1 rounded">
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

//               {/* Axis legend card */}
//               <div
//                 className="absolute bottom-4 left-4 pointer-events-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-md"
//                 style={{ zIndex: 20 }}
//               >
//                 {[
//                   {
//                     color: "#2563eb",
//                     label: "X — Cycles of Concentration (CoC)",
//                   },
//                   { color: "#ea580c", label: `Z — Temperature (°${tempUnit})` },
//                   {
//                     color: "#059669",
//                     label: activeSaltId
//                       ? `Y — ${activeSaltId} Saturation Index`
//                       : "Y — LSI (Langelier)",
//                   },
//                 ].map(({ color, label }) => (
//                   <div
//                     key={label}
//                     className="flex items-center gap-2 text-[11px] text-slate-600 py-0.5"
//                   >
//                     <div
//                       className="w-5 h-[2px] rounded shrink-0"
//                       style={{ background: color }}
//                     />
//                     {label}
//                   </div>
//                 ))}
//               </div>

//               {/* Controls hint */}
//               <div
//                 className="absolute bottom-4 right-4 pointer-events-none bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm text-[11px] text-slate-400"
//                 style={{ zIndex: 20 }}
//               >
//                 Drag · Rotate &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click ·
//                 Pin
//               </div>
//             </>
//           )}
//         </div>

//         {/* ── Resize handle ── */}
//         <div
//           onMouseDown={onResizeMouseDown}
//           className="w-[5px] shrink-0 bg-slate-200 hover:bg-blue-400 active:bg-blue-500 cursor-col-resize transition-colors relative group"
//           style={{ zIndex: 30 }}
//           title="Drag to resize sidebar"
//         >
//           <div className="absolute inset-y-0 left-[1px] w-[3px] flex flex-col items-center justify-center gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <div key={i} className="w-[3px] h-[3px] rounded-full bg-white" />
//             ))}
//           </div>
//         </div>

//         {/* ── Sidebar ── */}
//         <aside
//           style={{
//             width: sidebarWidth,
//             minWidth: SIDEBAR_MIN,
//             maxWidth: SIDEBAR_MAX,
//           }}
//           className="shrink-0 bg-white border-l border-slate-200 overflow-y-auto p-4"
//         >
//           {!d ? (
//             <div className="text-center py-8">
//               <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl">
//                 📊
//               </div>
//               <p className="text-[14px] font-semibold text-slate-600 mb-1">
//                 Hover or click a bar
//               </p>
//               <p className="text-[12px] text-slate-400">
//                 to inspect grid-point details
//               </p>

//               <div className="mt-6 space-y-2.5">
//                 {[
//                   {
//                     label: "Protected",
//                     sub: "SI within safe band",
//                     hex: COLOR_HEX.green,
//                     bg: "bg-emerald-50 border-emerald-200",
//                   },
//                   {
//                     label: "Caution",
//                     sub: "Mild scaling tendency",
//                     hex: COLOR_HEX.yellow,
//                     bg: "bg-amber-50   border-amber-200",
//                   },
//                   {
//                     label: "Scale Risk",
//                     sub: "High CaCO₃ scale risk",
//                     hex: COLOR_HEX.red,
//                     bg: "bg-red-50     border-red-200",
//                   },
//                 ].map(({ label, sub, hex, bg }) => (
//                   <div
//                     key={label}
//                     className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${bg} text-left`}
//                   >
//                     <div
//                       className="w-3 h-9 rounded shrink-0"
//                       style={{ background: hex }}
//                     />
//                     <div>
//                       <div className="text-[13px] font-semibold text-slate-700">
//                         {label}
//                       </div>
//                       <div className="text-[11px] text-slate-400">{sub}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 border-t border-slate-100 pt-5 space-y-2.5 text-left">
//                 <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
//                   Axis Legend
//                 </p>
//                 {[
//                   { color: "#2563eb", label: "X — Cycles of Concentration" },
//                   { color: "#ea580c", label: `Z — Temperature (°${tempUnit})` },
//                   {
//                     color: "#059669",
//                     label: activeSaltId
//                       ? `Y — ${activeSaltId} SI`
//                       : "Y — LSI (Langelier)",
//                   },
//                 ].map(({ color, label }) => (
//                   <div key={label} className="flex items-center gap-2.5">
//                     <div
//                       className="w-6 h-[2px] shrink-0 rounded-full"
//                       style={{ background: color }}
//                     />
//                     <span className="text-[12px] text-slate-500">{label}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-5 border-t border-slate-100 pt-4">
//                 <p className="text-[11px] text-slate-400 italic">
//                   ↔ Drag the left edge to resize this panel
//                 </p>
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
//                   value={d.ionic_strength?.toFixed(5) ?? "—"}
//                 />
//                 {d.description_of_solution?.activity_of_water != null && (
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

//               <SSection
//                 title={activeSaltId ? `${activeSaltId} SI` : "Deposition Index"}
//               >
//                 <SRow
//                   label={activeSaltId ? "Saturation Index" : "LSI"}
//                   value={displaySI !== null ? displaySI.toFixed(2) : "—"}
//                   bold
//                 />
//                 <div className="flex justify-between items-center py-[6px]">
//                   <span className="text-[13px] text-slate-500">Status</span>
//                   <Badge text={statusLabel} variant={statusVar} />
//                 </div>
//               </SSection>

//               {saltsOfInterest.length > 0 &&
//                 Object.keys(d.saturation_indices).length > 0 && (
//                   <SSection title="Key Salts SI">
//                     {saltsOfInterest.map((salt) => {
//                       const entry = d.saturation_indices[salt];
//                       const isActive = salt === activeSaltId;
//                       return (
//                         <div
//                           key={salt}
//                           className="flex justify-between items-center py-[6px] border-b border-slate-100 last:border-0"
//                         >
//                           <div className="flex items-center gap-1.5 min-w-0">
//                             <span
//                               className={`text-[13px] truncate ${isActive ? "font-semibold text-blue-700" : "text-slate-500"}`}
//                             >
//                               {salt}
//                             </span>
//                             {entry?.chemical_formula && (
//                               <span className="text-[10px] text-slate-300 shrink-0">
//                                 {entry.chemical_formula}
//                               </span>
//                             )}
//                           </div>
//                           <span
//                             className={`text-[13px] font-semibold shrink-0 ${entry && entry.SI > 0 ? "text-red-600" : "text-slate-400"}`}
//                           >
//                             {entry ? entry.SI.toFixed(2) : "—"}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </SSection>
//                 )}

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
//                   value={
//                     d.indices.larson_skold.index != null
//                       ? d.indices.larson_skold.index.toFixed(3)
//                       : "N/A"
//                   }
//                   badge={`${d.indices.larson_skold.risk_level} Risk`}
//                 />
//                 <SRow
//                   label="Stiff-Davis"
//                   value={
//                     d.indices.stiff_davis.index != null
//                       ? d.indices.stiff_davis.index.toFixed(3)
//                       : "N/A"
//                   }
//                   badge={
//                     d.indices.stiff_davis.risk ??
//                     d.indices.stiff_davis.interpretation ??
//                     ""
//                   }
//                 />
//                 <SRow
//                   label="CCPP (ppm)"
//                   value={
//                     d.indices.ccpp.ccpp_ppm != null
//                       ? String(d.indices.ccpp.ccpp_ppm)
//                       : "N/A"
//                   }
//                   badge={d.indices.ccpp.risk}
//                 />
//               </SSection>

//               <SSection title="Corrosion Rates">
//                 {Object.entries(d.corrosion).map(([key, metal]) => {
//                   if (!metal) return null;
//                   const label = key
//                     .replace(/_/g, " ")
//                     .replace(/\b\w/g, (c) => c.toUpperCase());
//                   return (
//                     <div
//                       key={key}
//                       className="py-[6px] border-b border-slate-100 last:border-0"
//                     >
//                       <div className="flex justify-between items-center">
//                         <span className="text-[13px] text-slate-600 font-medium">
//                           {label}
//                         </span>
//                         <Badge text={metal.rating} />
//                       </div>
//                       <div className="flex justify-between mt-1">
//                         <span className="text-[11px] text-slate-400">
//                           Treated / Base
//                         </span>
//                         <span className="text-[11px] text-slate-600">
//                           {metal.cr_mpy.toFixed(2)} /{" "}
//                           {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
//                           {metal.total_inhibition_percent !== undefined && (
//                             <span className="text-emerald-600 font-semibold ml-1.5">
//                               −{metal.total_inhibition_percent}%
//                             </span>
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </SSection>

//               {Object.keys(d.saturation_indices).length > 0 && (
//                 <SSection title="All Minerals SI">
//                   {Object.entries(d.saturation_indices)
//                     .sort((a, b) => b[1].SI - a[1].SI)
//                     .map(([key, val]) => {
//                       const isTarget = key === activeSaltId;
//                       const isInterest = saltsOfInterest.includes(key);
//                       return (
//                         <div
//                           key={key}
//                           className={`flex justify-between items-center py-[5px] border-b border-slate-50 last:border-0 ${isTarget ? "bg-blue-50 -mx-1 px-1 rounded" : ""}`}
//                         >
//                           <div className="flex items-center gap-1 min-w-0">
//                             <span
//                               className={`text-[13px] truncate ${isTarget ? "font-bold text-blue-700" : isInterest ? "font-semibold text-slate-700" : "text-slate-400"}`}
//                             >
//                               {key}
//                             </span>
//                             {val.chemical_formula && (
//                               <span className="text-[10px] text-slate-300 shrink-0 hidden sm:inline">
//                                 {val.chemical_formula}
//                               </span>
//                             )}
//                           </div>
//                           <span
//                             className={`text-[13px] shrink-0 font-semibold ${val.SI > 0 ? "text-red-600" : "text-slate-300"} ${isTarget ? "font-bold" : ""}`}
//                           >
//                             {val.SI.toFixed(2)}
//                           </span>
//                         </div>
//                       );
//                     })}
//                 </SSection>
//               )}
//             </>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }

// ========================================================================================
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
// }

// export interface SaturationApiResponseFlat {
//   success?: boolean;
//   run_id?: string;
//   salt_id: string | null;
//   salts_of_interest?: string[];
//   dosage_ppm?: number;
//   coc_min?: number;
//   coc_max?: number;
//   temp_min?: number;
//   temp_max?: number;
//   temp_unit?: string;
//   ph_mode?: string;
//   total_grid_points?: number;
//   grid_results: GridResult[];
//   summary?: { green: number; yellow: number; red: number; error: number };
//   base_water_parameters?: Record<string, { value: number; unit: string }>;
//   asset_info?: { name?: string; type?: string };
//   data?: {
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
//   };
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const COLOR_MAP: Record<string, number> = {
//   yellow: 0xe8a800,
//   red: 0xd93025,
//   green: 0x1a9652,
// };
// const COLOR_HEX: Record<string, string> = {
//   yellow: "#e8a800",
//   red: "#d93025",
//   green: "#1a9652",
// };

// const BAR_W = 1.55;
// const SPACING = 2.4;
// // Hard cap on visual bar height — bars are ALWAYS normalised into this range.
// // The Y-axis tick labels still show the real SI values.
// const BAR_MAX_H = 8.0;

// const SIDEBAR_MIN = 240;
// const SIDEBAR_MAX = 560;
// const SIDEBAR_DEFAULT = 300;

// // ─── API shape resolver ───────────────────────────────────────────────────────

// function resolveMeta(apiResponse: SaturationApiResponseFlat | undefined) {
//   if (!apiResponse) return null;
//   const src = apiResponse.data ?? apiResponse;
//   return {
//     saltId: (src.salt_id ?? null) as string | null,
//     saltsOfInterest: src.salts_of_interest ?? [],
//     dosagePpm: src.dosage_ppm ?? 0,
//     cocMin: src.coc_min ?? 0,
//     cocMax: src.coc_max ?? 0,
//     tempMin: src.temp_min ?? 0,
//     tempMax: src.temp_max ?? 0,
//     tempUnit: src.temp_unit ?? "C",
//     phMode: src.ph_mode,
//     totalGridPoints: src.total_grid_points,
//     gridResults: (src.grid_results ?? []) as GridResult[],
//     summary: src.summary,
//     baseWaterParameters: src.base_water_parameters,
//     assetInfo: src.asset_info,
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
//   green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
//   info: "bg-blue-50    text-blue-700    border border-blue-200",
//   warn: "bg-orange-50  text-orange-700  border border-orange-200",
// };

// function Badge({ text, variant }: { text: string; variant?: BadgeVariant }) {
//   const v = variant ?? getBadgeVariant(text);
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

// function SSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
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

// function makeLabel(
//   text: string,
//   opts: {
//     color?: string;
//     fontSize?: string;
//     fontWeight?: string;
//     background?: string;
//     padding?: string;
//   } = {},
// ): CSS2DObject {
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

// function buildScene(
//   canvas: HTMLCanvasElement,
//   wrap: HTMLDivElement,
//   gridResults: GridResult[],
//   activeSaltId: string | null,
//   cocUniq: number[],
//   tempUniq: number[],
//   maxSI: number,
//   tempUnit: string,
// ) {
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
//   // No fog — fog was clipping tall bars

//   // Far-clip extended to 2000 so nothing ever disappears after zooming out
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

//   gridResults.forEach((d) => {
//     const siValue = activeSaltId
//       ? (d.saturation_indices[activeSaltId]?.SI ?? null)
//       : null;
//     const displayVal =
//       siValue !== null ? siValue : Math.abs(d.indices.lsi.lsi ?? 0);

//     // Normalise: tallest bar → BAR_MAX_H, shortest → proportionally smaller
//     const h = Math.max(0.15, (displayVal / maxSI) * BAR_MAX_H);

//     const ci = cocUniq.indexOf(d._grid_CoC);
//     const ti = tempUniq.indexOf(d._grid_temp);
//     const x = ci * SPACING + cocOffset;
//     const z = ti * SPACING + tempOffset;
//     const clr = COLOR_MAP[d.color_code] ?? 0xd93025;

//     const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
//     const mat = new THREE.MeshPhongMaterial({ color: clr, shininess: 55 });
//     const mesh = new THREE.Mesh(geo, mat);
//     mesh.position.set(x, h / 2, z);
//     mesh.userData = { data: d, origColor: clr, h };
//     scene.add(mesh);
//     barMeshes.push(mesh);

//     const labelVal =
//       siValue !== null
//         ? siValue.toFixed(2)
//         : `LSI ${d.indices.lsi.lsi.toFixed(2)}`;
//     const siLbl = makeLabel(labelVal, {
//       color: "rgba(15,23,42,0.92)",
//       fontSize: "9px",
//       fontWeight: "700",
//       background: "rgba(255,255,255,0.88)",
//       padding: "1px 4px",
//     });
//     siLbl.position.set(0, h / 2 + 0.22, 0);
//     mesh.add(siLbl);

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

//   // Floor grid
//   const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
//   const gridHelper = new THREE.GridHelper(
//     gridW + 4,
//     (nCoC + nTemp) * 3,
//     0xcbd5e1,
//     0xe2e8f0,
//   );
//   gridHelper.position.y = -0.01;
//   scene.add(gridHelper);

//   const mkLine = (pts: THREE.Vector3[], color: number, opacity = 0.7) => {
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints(pts),
//         new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
//       ),
//     );
//   };

//   const AX_COC = 0x2563eb;
//   const AX_TEMP = 0xea580c;
//   const AX_SI = 0x059669;

//   // Y-axis extends a bit above BAR_MAX_H
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
//     AX_SI,
//     0.9,
//   );

//   const mkArrow = (
//     dir: THREE.Vector3,
//     origin: THREE.Vector3,
//     color: number,
//   ) => {
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
//     AX_SI,
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

//   // Y-axis tick labels — real SI values mapped to visual heights
//   const siStep =
//     maxSI <= 1
//       ? 0.25
//       : maxSI <= 2
//         ? 0.5
//         : maxSI <= 5
//           ? 1.0
//           : maxSI <= 20
//             ? 5
//             : 10;
//   const siTicks: number[] = [];
//   for (let v = 0; v <= maxSI + siStep * 0.5; v += siStep)
//     siTicks.push(parseFloat(v.toFixed(3)));

//   siTicks.forEach((v) => {
//     const yPos = (v / maxSI) * BAR_MAX_H;
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
//       AX_SI,
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
//     ? `SI (Saturation Index) — ${activeSaltId}`
//     : "LSI (Langelier Saturation Index)";
//   const siTitle = makeLabel(yAxisLabel, {
//     color: "#065f46",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   siTitle.position.set(axOriginX - 0.7, yAxisTop + 0.5, axOriginZ);
//   scene.add(siTitle);

//   // ── Initial camera distance — auto-fit so all bars are visible ─────────────
//   const nMax = Math.max(nCoC, nTemp);
//   const spreadXZ = nMax * SPACING;
//   // Keep the full bar height in view from the initial 38° elevation angle
//   const initDist = Math.max(32, spreadXZ * 2.4, BAR_MAX_H * 4.0);
//   // Look at the vertical centre of the bars so neither top nor bottom is clipped
//   const initLookAtY = BAR_MAX_H * 0.5;

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
//   panX: number; // look-at / orbit-centre offset
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

// interface Props {
//   apiResponse?: SaturationApiResponseFlat;
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function SaturationDashboard({ apiResponse }: Props) {
//   const meta = useMemo(() => resolveMeta(apiResponse), [apiResponse]);
//   const gridResults = useMemo(
//     (): GridResult[] => meta?.gridResults ?? [],
//     [meta],
//   );
//   const baseSaltId = meta?.saltId ?? null;

//   const [activeSaltId, setActiveSaltId] = useState<string | null>(baseSaltId);
//   useEffect(() => {
//     setActiveSaltId(baseSaltId);
//   }, [baseSaltId]);

//   const dosage = meta?.dosagePpm ?? 0;
//   const cocMin = meta?.cocMin ?? 0;
//   const cocMax = meta?.cocMax ?? 0;
//   const tempMin = meta?.tempMin ?? 0;
//   const tempMax = meta?.tempMax ?? 0;
//   const tempUnit = meta?.tempUnit ?? "C";
//   const assetName = meta?.assetInfo?.name;
//   const summary = meta?.summary;

//   const saltsOfInterest = useMemo(() => {
//     const raw =
//       apiResponse?.salts_of_interest ??
//       apiResponse?.data?.salts_of_interest ??
//       [];
//     if (baseSaltId && !raw.includes(baseSaltId)) return [baseSaltId, ...raw];
//     return raw;
//   }, [apiResponse, baseSaltId]);

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
//     if (!gridResults.length) return 0.5;
//     if (activeSaltId)
//       return Math.max(
//         ...gridResults.map((d) => d.saturation_indices[activeSaltId]?.SI ?? 0),
//         0.5,
//       );
//     return Math.max(
//       ...gridResults.map((d) => Math.abs(d.indices?.lsi?.lsi ?? 0)),
//       0.5,
//     );
//   }, [gridResults, activeSaltId]);

//   // ── Resizable sidebar ──────────────────────────────────────────────────────
//   const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
//   const isResizingRef = useRef(false);
//   const resizeStartXRef = useRef(0);
//   const resizeStartWidthRef = useRef(SIDEBAR_DEFAULT);

//   const onResizeMouseDown = useCallback(
//     (e: React.MouseEvent) => {
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

//   // ── Camera orbits around (panX, panY, panZ) ────────────────────────────────
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
//       maxSI,
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
//     maxSI,
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
//     const setHighlight = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshPhongMaterial).color.setHex(0x1e293b);

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

//     // Screen-space pan vectors
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

//       // ── Right / middle drag → pan ──────────────────────────────────────────
//       if (s.isPanning && (e.buttons === 2 || e.buttons === 4)) {
//         const speed = s.dist * 0.0018;
//         const { right } = getPanVectors(s);
//         // Horizontal mouse → pan left/right along XZ
//         s.panX -= right.x * dx * speed;
//         s.panZ -= right.z * dx * speed;
//         // Vertical mouse → pan up/down (drag down = scene moves down = look-at moves down)
//         s.panY -= dy * speed;
//         s.prevX = e.clientX;
//         s.prevY = e.clientY;
//         updateCamera();
//         canvas.style.cursor = "move";
//         return;
//       }

//       // ── Left drag → orbit ──────────────────────────────────────────────────
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

//       // ── Hover raycasting ───────────────────────────────────────────────────
//       const hit = raycast(e.clientX, e.clientY);
//       if (
//         s.hoveredMesh &&
//         s.hoveredMesh !== hit &&
//         s.hoveredMesh !== s.selectedMesh
//       )
//         resetColor(s.hoveredMesh);
//       if (hit) {
//         s.hoveredMesh = hit;
//         if (hit !== s.selectedMesh) setHighlight(hit);
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
//           setHighlight(hit);
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

//     // Touch: 1-finger orbit, 2-finger vertical pan
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
//   const saltSI =
//     d && activeSaltId ? (d.saturation_indices[activeSaltId]?.SI ?? null) : null;
//   const displaySI = saltSI ?? d?.indices?.lsi?.lsi ?? null;
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
//     (saltsOfInterest.length > 0 ? saltsOfInterest.join(", ") : "Multi-Salt");

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <div className="bg-white text-slate-800 border font-sans text-[14px] h-screen overflow-hidden flex flex-col select-none">
//       {/* ── Header ── */}
//       <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0 gap-4 flex-wrap">
//         <div>
//           <div className="text-[15px] font-bold text-slate-900">
//             Saturation Analysis —{" "}
//             <span className="text-blue-600">{displaySaltLabel}</span>
//             <span className="font-normal text-slate-400"> · 3D Grid</span>
//           </div>
//           <div className="text-[12px] text-slate-400 mt-0.5 flex flex-wrap gap-x-4">
//             {assetName && (
//               <span className="text-slate-600 font-semibold">{assetName}</span>
//             )}
//             {(cocMin > 0 || cocMax > 0) && (
//               <span>
//                 CoC {cocMin}–{cocMax}
//               </span>
//             )}
//             {(tempMin > 0 || tempMax > 0) && (
//               <span>
//                 Temp {tempMin}–{tempMax} °{tempUnit}
//               </span>
//             )}
//             {dosage > 0 && <span>Dosage {dosage} ppm</span>}
//             {meta?.totalGridPoints && <span>{meta.totalGridPoints} pts</span>}
//           </div>
//         </div>
//         <div className="flex items-center gap-3 flex-wrap">
//           {summary && (
//             <div className="flex gap-1.5 text-[12px]">
//               {summary.green > 0 && (
//                 <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
//                   {summary.green} Protected
//                 </span>
//               )}
//               {summary.yellow > 0 && (
//                 <span className="px-2.5 py-1 rounded-full bg-amber-50   text-amber-700   border border-amber-200   font-semibold">
//                   {summary.yellow} Caution
//                 </span>
//               )}
//               {summary.red > 0 && (
//                 <span className="px-2.5 py-1 rounded-full bg-red-50     text-red-700     border border-red-200     font-semibold">
//                   {summary.red} Scale Risk
//                 </span>
//               )}
//             </div>
//           )}
//           {(["Caution", "Scale Risk", "Protected"] as const).map((label) => {
//             const dot =
//               label === "Caution"
//                 ? "bg-amber-400"
//                 : label === "Scale Risk"
//                   ? "bg-red-500"
//                   : "bg-emerald-500";
//             return (
//               <div
//                 key={label}
//                 className="flex items-center gap-1.5 text-[12px] text-slate-500"
//               >
//                 <span className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`} />
//                 {label}
//               </div>
//             );
//           })}
//         </div>
//       </header>

//       {/* ── Salt chips ── */}
//       {saltsOfInterest.length > 0 && (
//         <div className="flex items-center gap-2 px-5 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0">
//           <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1 tracking-widest uppercase">
//             Salt View:
//           </span>
//           {saltsOfInterest.map((s) => {
//             const isActive = s === activeSaltId;
//             return (
//               <button
//                 key={s}
//                 onClick={() => setActiveSaltId(isActive ? null : s)}
//                 title={
//                   isActive ? "Reset to LSI view" : `Switch chart to ${s} SI`
//                 }
//                 className={`text-[13px] px-3 py-1 rounded-full border font-semibold shrink-0 transition-all duration-150 cursor-pointer ${
//                   isActive
//                     ? "border-blue-500 text-white bg-blue-600 shadow shadow-blue-100"
//                     : "border-slate-300 text-slate-600 bg-white hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
//                 }`}
//               >
//                 {s}
//                 {isActive && (
//                   <span className="ml-1 text-[11px] font-normal opacity-75">
//                     ✓
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//           {activeSaltId && (
//             <button
//               onClick={() => setActiveSaltId(null)}
//               className="text-[11px] px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-400 bg-white transition-all ml-1 shrink-0"
//             >
//               Reset to LSI
//             </button>
//           )}
//           <span className="text-[10px] text-slate-300 ml-auto shrink-0 hidden sm:block italic">
//             Click a salt to switch the chart axis
//           </span>
//         </div>
//       )}

//       {/* ── Main ── */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* 3-D viewport */}
//         <div
//           ref={wrapRef}
//           className="flex-1 min-w-0 relative overflow-hidden"
//           style={{ background: "#f8fafc" }}
//         >
//           {isEmpty ? (
//             <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
//               <div className="text-5xl opacity-20">⬛</div>
//               <p className="text-[14px]">
//                 No grid data — pass an{" "}
//                 <code className="text-slate-500 bg-slate-100 px-1 rounded">
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

//               {/* Axis legend */}
//               <div
//                 className="absolute bottom-4 left-4 pointer-events-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-md"
//                 style={{ zIndex: 20 }}
//               >
//                 {[
//                   {
//                     color: "#2563eb",
//                     label: "X — Cycles of Concentration (CoC)",
//                   },
//                   { color: "#ea580c", label: `Z — Temperature (°${tempUnit})` },
//                   {
//                     color: "#059669",
//                     label: activeSaltId
//                       ? `Y — ${activeSaltId} Saturation Index`
//                       : "Y — LSI (Langelier)",
//                   },
//                 ].map(({ color, label }) => (
//                   <div
//                     key={label}
//                     className="flex items-center gap-2 text-[11px] text-slate-600 py-0.5"
//                   >
//                     <div
//                       className="w-5 h-[2px] rounded shrink-0"
//                       style={{ background: color }}
//                     />
//                     {label}
//                   </div>
//                 ))}
//               </div>

//               {/* Controls hint */}
//               <div
//                 className="absolute bottom-4 right-4 pointer-events-none bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm text-[11px] text-slate-400"
//                 style={{ zIndex: 20 }}
//               >
//                 Left-drag · Rotate &nbsp;|&nbsp; Right-drag · Pan up/down
//                 &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click · Pin
//               </div>
//             </>
//           )}
//         </div>

//         {/* ── Resize handle ── */}
//         <div
//           onMouseDown={onResizeMouseDown}
//           className="w-[5px] shrink-0 bg-slate-200 hover:bg-blue-400 active:bg-blue-500 cursor-col-resize transition-colors relative group"
//           style={{ zIndex: 30 }}
//           title="Drag to resize sidebar"
//         >
//           <div className="absolute inset-y-0 left-[1px] w-[3px] flex flex-col items-center justify-center gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <div key={i} className="w-[3px] h-[3px] rounded-full bg-white" />
//             ))}
//           </div>
//         </div>

//         {/* ── Sidebar ── */}
//         <aside
//           style={{
//             width: sidebarWidth,
//             minWidth: SIDEBAR_MIN,
//             maxWidth: SIDEBAR_MAX,
//           }}
//           className="shrink-0 bg-white border-l border-slate-200 overflow-y-auto p-4"
//         >
//           {!d ? (
//             <div className="text-center py-8">
//               <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl">
//                 📊
//               </div>
//               <p className="text-[14px] font-semibold text-slate-600 mb-1">
//                 Hover or click a bar
//               </p>
//               <p className="text-[12px] text-slate-400">
//                 to inspect grid-point details
//               </p>

//               <div className="mt-6 space-y-2.5">
//                 {[
//                   {
//                     label: "Protected",
//                     sub: "SI within safe band",
//                     hex: COLOR_HEX.green,
//                     bg: "bg-emerald-50 border-emerald-200",
//                   },
//                   {
//                     label: "Caution",
//                     sub: "Mild scaling tendency",
//                     hex: COLOR_HEX.yellow,
//                     bg: "bg-amber-50   border-amber-200",
//                   },
//                   {
//                     label: "Scale Risk",
//                     sub: "High CaCO₃ scale risk",
//                     hex: COLOR_HEX.red,
//                     bg: "bg-red-50     border-red-200",
//                   },
//                 ].map(({ label, sub, hex, bg }) => (
//                   <div
//                     key={label}
//                     className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${bg} text-left`}
//                   >
//                     <div
//                       className="w-3 h-9 rounded shrink-0"
//                       style={{ background: hex }}
//                     />
//                     <div>
//                       <div className="text-[13px] font-semibold text-slate-700">
//                         {label}
//                       </div>
//                       <div className="text-[11px] text-slate-400">{sub}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 border-t border-slate-100 pt-5 space-y-2.5 text-left">
//                 <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
//                   Axis Legend
//                 </p>
//                 {[
//                   { color: "#2563eb", label: "X — Cycles of Concentration" },
//                   { color: "#ea580c", label: `Z — Temperature (°${tempUnit})` },
//                   {
//                     color: "#059669",
//                     label: activeSaltId
//                       ? `Y — ${activeSaltId} SI`
//                       : "Y — LSI (Langelier)",
//                   },
//                 ].map(({ color, label }) => (
//                   <div key={label} className="flex items-center gap-2.5">
//                     <div
//                       className="w-6 h-[2px] shrink-0 rounded-full"
//                       style={{ background: color }}
//                     />
//                     <span className="text-[12px] text-slate-500">{label}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-5 border-t border-slate-100 pt-4 space-y-1">
//                 <p className="text-[11px] text-slate-400 italic">
//                   ↔ Left-drag to rotate
//                 </p>
//                 <p className="text-[11px] text-slate-400 italic">
//                   ↕ Right-drag to pan up / down / sideways
//                 </p>
//                 <p className="text-[11px] text-slate-400 italic">
//                   🖱 Scroll to zoom in / out
//                 </p>
//                 <p className="text-[11px] text-slate-400 italic">
//                   ↔ Drag the left edge to resize this panel
//                 </p>
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
//                   value={d.ionic_strength?.toFixed(5) ?? "—"}
//                 />
//                 {d.description_of_solution?.activity_of_water != null && (
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

//               <SSection
//                 title={activeSaltId ? `${activeSaltId} SI` : "Deposition Index"}
//               >
//                 <SRow
//                   label={activeSaltId ? "Saturation Index" : "LSI"}
//                   value={displaySI !== null ? displaySI.toFixed(2) : "—"}
//                   bold
//                 />
//                 <div className="flex justify-between items-center py-[6px]">
//                   <span className="text-[13px] text-slate-500">Status</span>
//                   <Badge text={statusLabel} variant={statusVar} />
//                 </div>
//               </SSection>

//               {saltsOfInterest.length > 0 &&
//                 Object.keys(d.saturation_indices).length > 0 && (
//                   <SSection title="Key Salts SI">
//                     {saltsOfInterest.map((salt) => {
//                       const entry = d.saturation_indices[salt];
//                       const isActive = salt === activeSaltId;
//                       return (
//                         <div
//                           key={salt}
//                           className="flex justify-between items-center py-[6px] border-b border-slate-100 last:border-0"
//                         >
//                           <div className="flex items-center gap-1.5 min-w-0">
//                             <span
//                               className={`text-[13px] truncate ${isActive ? "font-semibold text-blue-700" : "text-slate-500"}`}
//                             >
//                               {salt}
//                             </span>
//                             {entry?.chemical_formula && (
//                               <span className="text-[10px] text-slate-300 shrink-0">
//                                 {entry.chemical_formula}
//                               </span>
//                             )}
//                           </div>
//                           <span
//                             className={`text-[13px] font-semibold shrink-0 ${entry && entry.SI > 0 ? "text-red-600" : "text-slate-400"}`}
//                           >
//                             {entry ? entry.SI.toFixed(2) : "—"}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </SSection>
//                 )}

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
//                   value={
//                     d.indices.larson_skold.index != null
//                       ? d.indices.larson_skold.index.toFixed(3)
//                       : "N/A"
//                   }
//                   badge={`${d.indices.larson_skold.risk_level} Risk`}
//                 />
//                 <SRow
//                   label="Stiff-Davis"
//                   value={
//                     d.indices.stiff_davis.index != null
//                       ? d.indices.stiff_davis.index.toFixed(3)
//                       : "N/A"
//                   }
//                   badge={
//                     d.indices.stiff_davis.risk ??
//                     d.indices.stiff_davis.interpretation ??
//                     ""
//                   }
//                 />
//                 <SRow
//                   label="CCPP (ppm)"
//                   value={
//                     d.indices.ccpp.ccpp_ppm != null
//                       ? String(d.indices.ccpp.ccpp_ppm)
//                       : "N/A"
//                   }
//                   badge={d.indices.ccpp.risk}
//                 />
//               </SSection>

//               <SSection title="Corrosion Rates">
//                 {Object.entries(d.corrosion).map(([key, metal]) => {
//                   if (!metal) return null;
//                   const label = key
//                     .replace(/_/g, " ")
//                     .replace(/\b\w/g, (c) => c.toUpperCase());
//                   return (
//                     <div
//                       key={key}
//                       className="py-[6px] border-b border-slate-100 last:border-0"
//                     >
//                       <div className="flex justify-between items-center">
//                         <span className="text-[13px] text-slate-600 font-medium">
//                           {label}
//                         </span>
//                         <Badge text={metal.rating} />
//                       </div>
//                       <div className="flex justify-between mt-1">
//                         <span className="text-[11px] text-slate-400">
//                           Treated / Base
//                         </span>
//                         <span className="text-[11px] text-slate-600">
//                           {metal.cr_mpy.toFixed(2)} /{" "}
//                           {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
//                           {metal.total_inhibition_percent !== undefined && (
//                             <span className="text-emerald-600 font-semibold ml-1.5">
//                               −{metal.total_inhibition_percent}%
//                             </span>
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </SSection>

//               {Object.keys(d.saturation_indices).length > 0 && (
//                 <SSection title="All Minerals SI">
//                   {Object.entries(d.saturation_indices)
//                     .sort((a, b) => b[1].SI - a[1].SI)
//                     .map(([key, val]) => {
//                       const isTarget = key === activeSaltId;
//                       const isInterest = saltsOfInterest.includes(key);
//                       return (
//                         <div
//                           key={key}
//                           className={`flex justify-between items-center py-[5px] border-b border-slate-50 last:border-0 ${isTarget ? "bg-blue-50 -mx-1 px-1 rounded" : ""}`}
//                         >
//                           <div className="flex items-center gap-1 min-w-0">
//                             <span
//                               className={`text-[13px] truncate ${isTarget ? "font-bold text-blue-700" : isInterest ? "font-semibold text-slate-700" : "text-slate-400"}`}
//                             >
//                               {key}
//                             </span>
//                             {val.chemical_formula && (
//                               <span className="text-[10px] text-slate-300 shrink-0 hidden sm:inline">
//                                 {val.chemical_formula}
//                               </span>
//                             )}
//                           </div>
//                           <span
//                             className={`text-[13px] shrink-0 font-semibold ${val.SI > 0 ? "text-red-600" : "text-slate-300"} ${isTarget ? "font-bold" : ""}`}
//                           >
//                             {val.SI.toFixed(2)}
//                           </span>
//                         </div>
//                       );
//                     })}
//                 </SSection>
//               )}
//             </>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }
"use client";

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
}

export interface Corrosion {
  mild_steel?: CorrosionMetal;
  copper?: CorrosionMetal;
  admiralty_brass?: CorrosionMetal;
  [key: string]: CorrosionMetal | undefined;
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
  description_of_solution?: { pH?: number; activity_of_water?: number } | null;
  // raw nested field – present before normalisation
  calculations?: Record<string, unknown>;
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
  // deeply nested variant coming from the real API
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
  };
}

// Raw grid point before normalisation (calculations instead of indices)
interface RawGridPoint extends Omit<GridResult, "indices" | "corrosion"> {
  indices?: Indices;
  corrosion?: Corrosion;
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

const COLOR_MAP: Record<string, number> = {
  yellow: 0xe8a800,
  red: 0xd93025,
  green: 0x1a9652,
};

const COLOR_HEX: Record<string, string> = {
  yellow: "#e8a800",
  red: "#d93025",
  green: "#1a9652",
};

const BAR_W = 1.55;
const SPACING = 2.4;
const BAR_MAX_H = 8.0;

const SIDEBAR_MIN = 240;
const SIDEBAR_MAX = 560;
const SIDEBAR_DEFAULT = 300;

// ─── API shape resolver ───────────────────────────────────────────────────────

function resolveMeta(
  apiResponse: SaturationApiResponseFlat | undefined,
): ResolvedMeta | null {
  if (!apiResponse) return null;

  // Dig into deeply nested shape: { data: { aiResponse: { ... } } }
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

  const gridResults: GridResult[] = rawGrid.map(
    (d: RawGridPoint): GridResult => {
      // Already normalised
      if (d.indices) return d as GridResult;

      const calc = d.calculations ?? {};
      return {
        ...(d as Omit<RawGridPoint, "indices" | "corrosion" | "calculations">),
        indices: {
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
        corrosion: {
          ...(calc.mild_steel_corrosion
            ? { mild_steel: calc.mild_steel_corrosion }
            : {}),
          ...(calc.copper_corrosion ? { copper: calc.copper_corrosion } : {}),
          ...(calc.admiralty_brass_corrosion
            ? { admiralty_brass: calc.admiralty_brass_corrosion }
            : {}),
        },
      };
    },
  );

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
  green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
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
  maxSI: number,
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
    const siValue: number | null = activeSaltId
      ? (d.saturation_indices[activeSaltId]?.SI ?? null)
      : null;
    const displayVal =
      siValue !== null ? Math.abs(siValue) : Math.abs(d.indices.lsi.lsi ?? 0);
    // Normalise: tallest bar → BAR_MAX_H. Clamp strictly so no bar ever
    // exceeds the axis height regardless of salt or LSI sign/magnitude.
    const h = Math.min(
      BAR_MAX_H,
      Math.max(0.15, (displayVal / maxSI) * BAR_MAX_H),
    );

    const ci = cocUniq.indexOf(d._grid_CoC);
    const ti = tempUniq.indexOf(d._grid_temp);
    const x = ci * SPACING + cocOffset;
    const z = ti * SPACING + tempOffset;
    const clr: number = COLOR_MAP[d.color_code] ?? 0xd93025;

    const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
    const mat = new THREE.MeshPhongMaterial({ color: clr, shininess: 55 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, h / 2, z);
    mesh.userData = { data: d, origColor: clr, h };
    scene.add(mesh);
    barMeshes.push(mesh);

    // const labelVal =
    //   siValue !== null
    //     ? siValue.toFixed(2)
    //     : `LSI ${d.indices.lsi.lsi.toFixed(2)}`;
    // const siLbl = makeLabel(labelVal, {
    //   color: "rgba(15,23,42,0.92)",
    //   fontSize: "9px",
    //   fontWeight: "700",
    //   background: "rgba(255,255,255,0.88)",
    //   padding: "1px 4px",
    // });
    // siLbl.position.set(0, h / 2 + 0.22, 0);
    // mesh.add(siLbl);

    mesh.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.1,
        }),
      ),
    );
  });

  // Floor grid
  const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
  const gridHelper = new THREE.GridHelper(
    gridW + 4,
    (nCoC + nTemp) * 3,
    0xcbd5e1,
    0xe2e8f0,
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
  const AX_SI = 0x059669;
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
    AX_SI,
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
    AX_SI,
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

  tempUniq.forEach((_temp, ti) => {
    const temp = tempUniq[tempUniq.length - 1 - ti];
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

  const siStep =
    maxSI <= 1
      ? 0.25
      : maxSI <= 2
        ? 0.5
        : maxSI <= 5
          ? 1.0
          : maxSI <= 20
            ? 5
            : 10;
  const siTicks: number[] = [];
  for (let v = 0; v <= maxSI + siStep * 0.5; v += siStep)
    siTicks.push(parseFloat(v.toFixed(3)));

  siTicks.forEach((v) => {
    const yPos = (v / maxSI) * BAR_MAX_H;
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
      AX_SI,
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
    ? `SI (Saturation Index) — ${activeSaltId}`
    : "LSI (Langelier Saturation Index)";
  const siTitle = makeLabel(yAxisLabel, {
    color: "#065f46",
    fontSize: "11px",
    fontWeight: "700",
  });
  siTitle.position.set(axOriginX - 0.7, yAxisTop + 0.5, axOriginZ);
  scene.add(siTitle);

  const nMax = Math.max(nCoC, nTemp);
  const spreadXZ = nMax * SPACING;
  // Keep initial distance proportional to grid spread, not bar height.
  // BAR_MAX_H is always the same (8) so removing it from the max prevents
  // the camera jumping to absurdly far distances when maxSI is large.
  const initDist = Math.max(28, spreadXZ * 2.2);
  // Look at the mid-point of the bar height range so bars are centred in view.
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function SaturationDashboard({ apiResponse }: Props) {
  const meta = useMemo(() => resolveMeta(apiResponse), [apiResponse]);
  const gridResults = useMemo(
    (): GridResult[] => meta?.gridResults ?? [],
    [meta],
  );
  const baseSaltId: string | null = meta?.saltId ?? null;

  const [activeSaltId, setActiveSaltId] = useState<string | null>(baseSaltId);
  useEffect(() => {
    setActiveSaltId(baseSaltId);
  }, [baseSaltId]);

  const dosage = meta?.dosagePpm ?? 0;
  const cocMin = meta?.cocMin ?? 0;
  const cocMax = meta?.cocMax ?? 0;
  const tempMin = meta?.tempMin ?? 0;
  const tempMax = meta?.tempMax ?? 0;
  const tempUnit = meta?.tempUnit ?? "C";
  const assetName = meta?.assetInfo?.name;
  const summary = meta?.summary;

  const saltsOfInterest = useMemo((): string[] => {
    const raw: string[] =
      apiResponse?.salts_of_interest ??
      apiResponse?.data?.aiResponse?.salts_of_interest ??
      apiResponse?.data?.salts_of_interest ??
      [];
    if (baseSaltId && !raw.includes(baseSaltId)) return [baseSaltId, ...raw];
    return raw;
  }, [apiResponse, baseSaltId]);

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

  const maxSI = useMemo((): number => {
    if (!gridResults.length) return 1;
    if (activeSaltId) {
      const vals = gridResults.map((d) =>
        Math.abs(d.saturation_indices[activeSaltId]?.SI ?? 0),
      );
      return Math.max(...vals, 1); // always ≥ 1 so division is safe
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

  // ── Camera orbits around (panX, panY, panZ) ────────────────────────────────
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
    maxSI,
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
    const setHighlight = (m: THREE.Mesh) =>
      (m.material as THREE.MeshPhongMaterial).color.setHex(0x1e293b);

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
        if (hit !== s.selectedMesh) setHighlight(hit);
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
          setHighlight(hit);
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
  const saltSI: number | null =
    d && activeSaltId ? (d.saturation_indices[activeSaltId]?.SI ?? null) : null;
  const displaySI: number | null = saltSI ?? d?.indices?.lsi?.lsi ?? null;
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
    (saltsOfInterest.length > 0 ? saltsOfInterest.join(", ") : "Multi-Salt");

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
        {saltsOfInterest.length > 0 && (
          <div className="flex items-center gap-2 px-5 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1 tracking-widest uppercase">
              Salt View:
            </span>
            {saltsOfInterest.map((s) => {
              const isActive = s === activeSaltId;
              return (
                <button
                  key={s}
                  onClick={() => setActiveSaltId(isActive ? null : s)}
                  title={
                    isActive ? "Reset to LSI view" : `Switch chart to ${s} SI`
                  }
                  className={`text-[13px] px-3 py-1 rounded-full border font-semibold shrink-0 transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "border-blue-500 text-white bg-blue-600 shadow shadow-blue-100"
                      : "border-slate-300 text-slate-600 bg-white hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {s}
                  {isActive && (
                    <span className="ml-1 text-[11px] font-normal opacity-75">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
            {activeSaltId && (
              <button
                onClick={() => setActiveSaltId(null)}
                className="text-[11px] px-2.5 py-1 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-400 bg-white transition-all ml-1 shrink-0"
              >
                Reset to LSI
              </button>
            )}
            <span className="text-[10px] text-slate-300 ml-auto shrink-0 hidden sm:block italic">
              Click a salt to switch the chart axis
            </span>
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
                        ? `Y — ${activeSaltId} Saturation Index`
                        : "Y — LSI (Langelier)",
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
                  Left-drag · Rotate &nbsp;|&nbsp; Right-drag · Pan up/down
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

                <div className="mt-6 space-y-2.5">
                  {[
                    {
                      label: "Protected",
                      sub: "SI within safe band",
                      hex: COLOR_HEX.green,
                      bg: "bg-emerald-50 border-emerald-200",
                    },
                    {
                      label: "Caution",
                      sub: "Mild scaling tendency",
                      hex: COLOR_HEX.yellow,
                      bg: "bg-amber-50   border-amber-200",
                    },
                    {
                      label: "Scale Risk",
                      sub: "High CaCO₃ scale risk",
                      hex: COLOR_HEX.red,
                      bg: "bg-red-50     border-red-200",
                    },
                  ].map(({ label, sub, hex, bg }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${bg} text-left`}
                    >
                      <div
                        className="w-3 h-9 rounded shrink-0"
                        style={{ background: hex }}
                      />
                      <div>
                        <div className="text-[13px] font-semibold text-slate-700">
                          {label}
                        </div>
                        <div className="text-[11px] text-slate-400">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5 space-y-2.5 text-left">
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
                        ? `Y — ${activeSaltId} SI`
                        : "Y — LSI (Langelier)",
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
                    ↕ Right-drag to pan up / down / sideways
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    🖱 Scroll to zoom in / out
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    ↔ Drag the left edge to resize this panel
                  </p>
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
                    value={d.ionic_strength?.toFixed(5) ?? "—"}
                  />
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
                    activeSaltId ? `${activeSaltId} SI` : "Deposition Index"
                  }
                >
                  <SRow
                    label={activeSaltId ? "Saturation Index" : "LSI"}
                    value={displaySI !== null ? displaySI.toFixed(2) : "—"}
                    bold
                  />
                  <div className="flex justify-between items-center py-[6px]">
                    <span className="text-[13px] text-slate-500">Status</span>
                    <Badge text={statusLabel} variant={statusVar} />
                  </div>
                </SSection>

                {saltsOfInterest.length > 0 &&
                  Object.keys(d.saturation_indices).length > 0 && (
                    <SSection title="Key Salts SI">
                      {saltsOfInterest.map((salt) => {
                        const entry = d.saturation_indices[salt];
                        const isActive = salt === activeSaltId;
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
                              className={`text-[13px] font-semibold shrink-0 ${entry && entry.SI > 0 ? "text-red-600" : "text-slate-400"}`}
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
                    value={
                      d.indices.larson_skold.index != null
                        ? d.indices.larson_skold.index.toFixed(3)
                        : "N/A"
                    }
                    badge={`${d.indices.larson_skold.risk_level} Risk`}
                  />
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
                  <SRow
                    label="CCPP (ppm)"
                    value={
                      d.indices.ccpp.ccpp_ppm != null
                        ? String(d.indices.ccpp.ccpp_ppm)
                        : "N/A"
                    }
                    badge={d.indices.ccpp.risk}
                  />
                </SSection>

                {Object.keys(d.corrosion).length > 0 && (
                  <SSection title="Corrosion Rates">
                    {Object.entries(d.corrosion).map(([key, metal]) => {
                      if (!metal) return null;
                      const label = key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase());
                      return (
                        <div
                          key={key}
                          className="py-[6px] border-b border-slate-100 last:border-0"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[13px] text-slate-600 font-medium">
                              {label}
                            </span>
                            <Badge text={metal.rating} />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-[11px] text-slate-400">
                              Treated / Base
                            </span>
                            <span className="text-[11px] text-slate-600">
                              {metal.cr_mpy.toFixed(2)} /{" "}
                              {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
                              {metal.total_inhibition_percent !== undefined && (
                                <span className="text-emerald-600 font-semibold ml-1.5">
                                  −{metal.total_inhibition_percent}%
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </SSection>
                )}

                {Object.keys(d.saturation_indices).length > 0 && (
                  <SSection title="All Minerals SI">
                    {Object.entries(d.saturation_indices)
                      .sort((a, b) => b[1].SI - a[1].SI)
                      .map(([key, val]) => {
                        const isTarget = key === activeSaltId;
                        const isInterest = saltsOfInterest.includes(key);
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
                              className={`text-[13px] shrink-0 font-semibold ${val.SI > 0 ? "text-red-600" : "text-slate-300"} ${isTarget ? "font-bold" : ""}`}
                            >
                              {val.SI.toFixed(2)}
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
      <div>
        <h3>Summary</h3>
        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
      </div>
    </>
  );
}
