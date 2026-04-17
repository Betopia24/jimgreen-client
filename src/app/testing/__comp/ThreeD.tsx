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

// // ─── FIX: Flexible API response type that matches both nested and flat shapes ──
// // Your Redux store may return the raw API response (flat) or the wrapped shape.
// // This component handles BOTH automatically.

// export interface SaturationApiResponseFlat {
//   // Top-level flat shape (what your API actually returns)
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
//   // Nested shape (old wrapper)
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

// // ─── Helper: resolve flat vs nested API shape ─────────────────────────────────

// function resolveMeta(apiResponse: SaturationApiResponseFlat | undefined) {
//   if (!apiResponse) return null;
//   // If data is nested under `.data`, use that; otherwise use top level
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
//   return new CSS2DObject(div);
// }

// // ─── Build scene ─────────────────────────────────────────────────────────────

// function buildScene(
//   canvas: HTMLCanvasElement,
//   wrap: HTMLDivElement,
//   gridResults: GridResult[],
//   saltId: string | null,
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
//   renderer.setClearColor(0x0d1117, 1);

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
//   scene.fog = new THREE.FogExp2(0x0d1117, 0.012);
//   const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);

//   scene.add(new THREE.AmbientLight(0xffffff, 0.55));
//   const sun = new THREE.DirectionalLight(0xffffff, 1.0);
//   sun.position.set(15, 30, 15);
//   scene.add(sun);
//   const fill = new THREE.DirectionalLight(0x5588ff, 0.3);
//   fill.position.set(-15, 8, -10);
//   scene.add(fill);

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
//     // FIX: When saltId is null or SI is missing, use LSI as the height metric
//     const siValue = saltId ? (d.saturation_indices[saltId]?.SI ?? null) : null;
//     const displayValue =
//       siValue !== null ? siValue : Math.abs(d.indices.lsi.lsi ?? 0);
//     const h = Math.max(0.15, (displayValue / maxSI) * BAR_MAX_H);
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

//     // Label shows SI if available, else LSI
//     const labelVal =
//       siValue !== null
//         ? siValue.toFixed(2)
//         : `LSI ${d.indices.lsi.lsi.toFixed(2)}`;
//     const siLbl = makeLabel(labelVal, {
//       color: "rgba(255,255,255,0.9)",
//       fontSize: "9px",
//       fontWeight: "700",
//       background: "rgba(0,0,0,0.5)",
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
//           opacity: 0.2,
//         }),
//       ),
//     );
//   });

//   const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
//   const gridHelper = new THREE.GridHelper(
//     gridW + 4,
//     (nCoC + nTemp) * 3,
//     0x252d3a,
//     0x1a2030,
//   );
//   gridHelper.position.y = -0.01;
//   scene.add(gridHelper);

//   const mkLine = (points: THREE.Vector3[], color: number, opacity = 0.7) => {
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints(points),
//         new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
//       ),
//     );
//   };

//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//       new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     ],
//     0x60a5fa,
//     0.8,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//     ],
//     0xfb923c,
//     0.8,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, 0, axOriginZ),
//       new THREE.Vector3(axOriginX, yMax + 0.8, axOriginZ),
//     ],
//     0x6ee7b7,
//     0.8,
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
//     mkLine(
//       [
//         new THREE.Vector3(x, 0, axOriginZ),
//         new THREE.Vector3(x, 0, axOriginZ + 0.45),
//       ],
//       0x3b82f6,
//       0.35,
//     );
//     mkLine(
//       [new THREE.Vector3(x, 0, zMin - 0.3), new THREE.Vector3(x, 0, axOriginZ)],
//       0x1e3a5f,
//       0.18,
//     );
//   });

//   const cocTitle = makeLabel("← Cycles of Concentration (CoC) →", {
//     color: "#93c5fd",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   cocTitle.position.set((xMin + xMax) / 2, 0, axOriginZ + 2.1);
//   scene.add(cocTitle);

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
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, 0, z),
//         new THREE.Vector3(axOriginX - 0.45, 0, z),
//       ],
//       0xf97316,
//       0.35,
//     );
//     mkLine(
//       [new THREE.Vector3(axOriginX, 0, z), new THREE.Vector3(xMax + 0.3, 0, z)],
//       0x431407,
//       0.18,
//     );
//   });

//   const tempTitle = makeLabel("← Temperature →", {
//     color: "#fdba74",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   tempTitle.position.set(axOriginX - 2.0, 0, (zMin + zMax) / 2);
//   scene.add(tempTitle);

//   const siStep = maxSI <= 1 ? 0.25 : maxSI <= 2 ? 0.5 : 1.0;
//   const siTicks: number[] = [];
//   for (let v = 0; v <= maxSI + siStep * 0.5; v += siStep)
//     siTicks.push(parseFloat(v.toFixed(3)));
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
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, yPos, axOriginZ),
//         new THREE.Vector3(axOriginX - 0.4, yPos, axOriginZ),
//       ],
//       0x22c55e,
//       0.35,
//     );
//     if (v > 0)
//       mkLine(
//         [
//           new THREE.Vector3(axOriginX, yPos, axOriginZ),
//           new THREE.Vector3(xMax + 0.3, yPos, axOriginZ),
//         ],
//         0x14532d,
//         0.15,
//       );
//   });

//   // FIX: Y-axis label reflects what's actually being shown
//   const yAxisLabel = saltId
//     ? `SI (Saturation Index) — ${saltId}`
//     : "LSI (Langelier Saturation Index)";
//   const siTitle = makeLabel(yAxisLabel, {
//     color: "#86efac",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   siTitle.position.set(axOriginX - 0.7, yMax + 1.2, axOriginZ);
//   scene.add(siTitle);

//   const nMax = Math.max(nCoC, nTemp);
//   const initDist = Math.max(25, nMax * 6.5);

//   return { renderer, labelRenderer, scene, camera, barMeshes, initDist };
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
//   isDragging: boolean;
//   prevX: number;
//   prevY: number;
//   hoveredMesh: THREE.Mesh | null;
//   selectedMesh: THREE.Mesh | null;
//   animId: number;
// }

// interface Props {
//   // FIX: Accept both the flat API shape and the old wrapped shape
//   apiResponse?: SaturationApiResponseFlat | undefined;
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function SaturationDashboard({ apiResponse }: Props) {
//   // FIX: Resolve meta from either flat or nested shape
//   const meta = useMemo(() => resolveMeta(apiResponse), [apiResponse]);

//   const gridResults: GridResult[] = useMemo(
//     () => meta?.gridResults ?? [],
//     [meta],
//   );

//   // FIX: saltId can be null — handle gracefully throughout
//   const saltId = meta?.saltId ?? null;
//   const dosage = meta?.dosagePpm ?? 0;
//   const cocMin = meta?.cocMin ?? 0;
//   const cocMax = meta?.cocMax ?? 0;
//   const tempMin = meta?.tempMin ?? 0;
//   const tempMax = meta?.tempMax ?? 0;
//   const tempUnit = meta?.tempUnit ?? "C";
//   const assetName = meta?.assetInfo?.name;
//   const summary = meta?.summary;

//   // FIX: salts_of_interest is at the top level in the flat response
//   const saltsOfInterest = useMemo(() => {
//     const raw =
//       apiResponse?.salts_of_interest ??
//       apiResponse?.data?.salts_of_interest ??
//       [];
//     // Only include saltId if it's non-null and not already in the list
//     if (saltId && !raw.includes(saltId)) return [saltId, ...raw];
//     return raw;
//   }, [apiResponse, saltId]);

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

//   // FIX: When saltId is null, use absolute LSI as the bar height metric
//   const maxSI = useMemo(() => {
//     if (!gridResults.length) return 0.5;
//     if (saltId) {
//       return Math.max(
//         ...gridResults.map((d) => d.saturation_indices[saltId]?.SI ?? 0),
//         0.5,
//       );
//     }
//     // Fall back to absolute LSI values for bar height
//     return Math.max(
//       ...gridResults.map((d) => Math.abs(d.indices?.lsi?.lsi ?? 0)),
//       0.5,
//     );
//   }, [gridResults, saltId]);

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

//   // ── Build scene ──
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
//       const el = labelRenderer.domElement;
//       if (el.parentNode === wrap) wrap.removeChild(el);
//       sceneRef.current = null;
//     };
//   }, [gridResults, saltId, maxSI, cocUniq, tempUniq, tempUnit, updateCamera]);

//   // ── Interaction ──
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     const S = () => sceneRef.current;

//     const resetColor = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshLambertMaterial).color.setHex(
//         m.userData.origColor as number,
//       );
//     const setWhite = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshLambertMaterial).color.setHex(0xffffff);

//     const raycast = (clientX: number, clientY: number): THREE.Mesh | null => {
//       const s = S();
//       if (!s) return null;
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
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
//       const dx = e.clientX - s.prevX;
//       const dy = e.clientY - s.prevY;

//       if (
//         e.buttons === 1 &&
//         !s.isDragging &&
//         (Math.abs(dx) > 3 || Math.abs(dy) > 3)
//       ) {
//         s.isDragging = true;
//       }

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
//       ) {
//         resetColor(s.hoveredMesh);
//       }
//       if (hit) {
//         s.hoveredMesh = hit;
//         if (hit !== s.selectedMesh) setWhite(hit);
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
//           ) {
//             resetColor(s.selectedMesh);
//           }
//           s.selectedMesh = hit;
//           setWhite(hit);
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

//   // ── Sidebar ──
//   const d = activeData;
//   // FIX: saltSI can be null when saltId is null or saturation_indices is empty
//   const saltSI =
//     d && saltId ? (d.saturation_indices[saltId]?.SI ?? null) : null;
//   // FIX: fall back to LSI for display when SI unavailable
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

//   // FIX: Display label in header — show salts_of_interest or "Multi-Salt" when saltId is null
//   const displaySaltLabel =
//     saltId ??
//     (saltsOfInterest.length > 0 ? saltsOfInterest.join(", ") : "Multi-Salt");

//   return (
//     <div className="bg-[#0d1117] text-slate-200 font-sans text-[13px] h-screen overflow-hidden flex flex-col select-none">
//       {/* Header */}
//       <header className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/10 shrink-0 gap-4 flex-wrap">
//         <div>
//           <div className="text-sm font-semibold text-slate-100 tracking-wide">
//             Saturation Analysis —{" "}
//             <span className="text-blue-400">{displaySaltLabel}</span> · 3D Grid
//           </div>
//           <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap gap-x-3">
//             {assetName && (
//               <span className="text-slate-400 font-medium">{assetName}</span>
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
//       {saltsOfInterest.length > 0 && (
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
//         {/* 3D viewport */}
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
//                 className="absolute bottom-3 left-3 flex flex-col gap-1 pointer-events-none"
//                 style={{ zIndex: 20 }}
//               >
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
//                   <span>
//                     Y —{" "}
//                     {saltId
//                       ? `${saltId} Saturation Index (SI)`
//                       : "LSI (Langelier Saturation Index)"}
//                   </span>
//                 </div>
//               </div>
//               <div
//                 className="absolute bottom-3 right-3 text-[10px] text-slate-700 pointer-events-none text-right"
//                 style={{ zIndex: 20 }}
//               >
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
//                   { color: "#fb923c", label: `Z — Temperature (°${tempUnit})` },
//                   {
//                     color: "#6ee7b7",
//                     label: saltId ? `Y — ${saltId} SI` : "Y — LSI (Langelier)",
//                   },
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

//               {/* FIX: Show SI section — use saltId SI or fall back to LSI */}
//               <SSection title={saltId ? `${saltId} SI` : "Deposition Index"}>
//                 <SRow
//                   label={saltId ? "Saturation Index" : "LSI"}
//                   value={displaySI !== null ? displaySI.toFixed(2) : "—"}
//                   bold
//                 />
//                 <div className="flex justify-between items-center py-[5px]">
//                   <span className="text-[11px] text-slate-400">Status</span>
//                   <Badge text={statusLabel} variant={statusVar} />
//                 </div>
//               </SSection>

//               {/* FIX: Only show Key Salts section if there are actual SI values */}
//               {saltsOfInterest.length > 0 &&
//                 Object.keys(d.saturation_indices).length > 0 && (
//                   <SSection title="Key Salts SI">
//                     {saltsOfInterest.map((salt) => {
//                       const entry = d.saturation_indices[salt];
//                       return (
//                         <div
//                           key={salt}
//                           className="flex justify-between items-center py-[5px] border-b border-white/[0.04] last:border-0"
//                         >
//                           <div className="flex items-center gap-1.5 min-w-0">
//                             <span
//                               className={`text-[11px] truncate ${salt === saltId ? "font-semibold text-slate-200" : "text-slate-400"}`}
//                             >
//                               {salt}
//                             </span>
//                             {entry?.chemical_formula && (
//                               <span className="text-[9px] text-slate-700 shrink-0">
//                                 {entry.chemical_formula}
//                               </span>
//                             )}
//                           </div>
//                           <span
//                             className={`text-[11px] font-medium shrink-0 ${entry && entry.SI > 0 ? "text-red-400" : "text-slate-500"}`}
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
//                 {/* FIX: Larson-Skold index can be null */}
//                 <SRow
//                   label="Larson-Skold"
//                   value={
//                     d.indices.larson_skold.index != null
//                       ? d.indices.larson_skold.index.toFixed(3)
//                       : "N/A"
//                   }
//                   badge={`${d.indices.larson_skold.risk_level} Risk`}
//                 />
//                 {/* FIX: Stiff-Davis index can be null */}
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
//                 {/* FIX: CCPP can be null */}
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

//               {/* FIX: Corrosion section — mild_steel may be absent; iterate dynamically */}
//               <SSection title="Corrosion Rates">
//                 {Object.entries(d.corrosion).map(([key, metal]) => {
//                   if (!metal) return null;
//                   const label = key
//                     .replace(/_/g, " ")
//                     .replace(/\b\w/g, (c) => c.toUpperCase());
//                   return (
//                     <div
//                       key={key}
//                       className="py-[5px] border-b border-white/[0.04] last:border-0"
//                     >
//                       <div className="flex justify-between items-center">
//                         <span className="text-[11px] text-slate-400">
//                           {label}
//                         </span>
//                         <Badge text={metal.rating} />
//                       </div>
//                       <div className="flex justify-between mt-0.5">
//                         <span className="text-[10px] text-slate-700">
//                           Treated / Base
//                         </span>
//                         <span className="text-[10px] text-slate-400">
//                           {metal.cr_mpy.toFixed(2)} /{" "}
//                           {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
//                           {metal.total_inhibition_percent !== undefined && (
//                             <span className="text-emerald-500/70 ml-1.5">
//                               −{metal.total_inhibition_percent}%
//                             </span>
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </SSection>

//               {/* FIX: Only show All Minerals SI when there are actual entries */}
//               {Object.keys(d.saturation_indices).length > 0 && (
//                 <SSection title="All Minerals SI">
//                   {Object.entries(d.saturation_indices)
//                     .sort((a, b) => b[1].SI - a[1].SI)
//                     .map(([key, val]) => {
//                       const isTarget = key === saltId;
//                       const isInterest = saltsOfInterest.includes(key);
//                       return (
//                         <div
//                           key={key}
//                           className={`flex justify-between items-center py-[4px] border-b border-white/[0.03] last:border-0 ${isTarget ? "bg-blue-500/5 -mx-1 px-1 rounded" : ""}`}
//                         >
//                           <div className="flex items-center gap-1 min-w-0">
//                             <span
//                               className={`text-[11px] truncate ${isTarget ? "font-bold text-slate-100" : isInterest ? "font-medium text-slate-300" : "text-slate-500"}`}
//                             >
//                               {key}
//                             </span>
//                             {val.chemical_formula && (
//                               <span className="text-[9px] text-slate-700 shrink-0 hidden sm:inline">
//                                 {val.chemical_formula}
//                               </span>
//                             )}
//                           </div>
//                           <span
//                             className={`text-[11px] shrink-0 font-medium ${val.SI > 0 ? "text-red-400" : "text-slate-600"} ${isTarget ? "font-bold" : ""}`}
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

// // Sidebar resize constraints
// const SIDEBAR_MIN = 240;
// const SIDEBAR_MAX = 560;
// const SIDEBAR_DEFAULT = 300;

// // ─── Helper: resolve flat vs nested API shape ──────────────────────────────

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
//       className={`text-[13px] px-1.5 py-0.5 rounded font-normal whitespace-nowrap ${badgeCls[v]}`}
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
//     <div className="flex justify-between items-center py-[6px] border-b border-white/[0.04] gap-2 last:border-0">
//       <span
//         className={`text-[13px] shrink-0 ${bold ? "font-semibold text-slate-200" : "text-slate-400"}`}
//       >
//         {label}
//       </span>
//       <span
//         className={`text-[13px] flex items-center gap-1 flex-wrap justify-end ${bold ? "font-semibold text-slate-100" : "font-medium text-slate-100"}`}
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
//       <div className="text-[11px] font-medium text-slate-500 tracking-widest uppercase mb-2 pb-1 border-b border-white/10">
//         {title}
//       </div>
//       {children}
//     </div>
//   );
// }

// // ─── CSS2D label helper ────────────────────────────────────────────────────

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
//   return new CSS2DObject(div);
// }

// // ─── Build scene ──────────────────────────────────────────────────────────

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
//   renderer.setClearColor(0x0d1117, 1);

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
//   scene.fog = new THREE.FogExp2(0x0d1117, 0.012);
//   const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);

//   scene.add(new THREE.AmbientLight(0xffffff, 0.55));
//   const sun = new THREE.DirectionalLight(0xffffff, 1.0);
//   sun.position.set(15, 30, 15);
//   scene.add(sun);
//   const fill = new THREE.DirectionalLight(0x5588ff, 0.3);
//   fill.position.set(-15, 8, -10);
//   scene.add(fill);

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
//     const displayValue =
//       siValue !== null ? siValue : Math.abs(d.indices.lsi.lsi ?? 0);
//     const h = Math.max(0.15, (displayValue / maxSI) * BAR_MAX_H);
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

//     const labelVal =
//       siValue !== null
//         ? siValue.toFixed(2)
//         : `LSI ${d.indices.lsi.lsi.toFixed(2)}`;
//     const siLbl = makeLabel(labelVal, {
//       color: "rgba(255,255,255,0.9)",
//       fontSize: "9px",
//       fontWeight: "700",
//       background: "rgba(0,0,0,0.5)",
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
//           opacity: 0.2,
//         }),
//       ),
//     );
//   });

//   const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
//   const gridHelper = new THREE.GridHelper(
//     gridW + 4,
//     (nCoC + nTemp) * 3,
//     0x252d3a,
//     0x1a2030,
//   );
//   gridHelper.position.y = -0.01;
//   scene.add(gridHelper);

//   const mkLine = (points: THREE.Vector3[], color: number, opacity = 0.7) => {
//     scene.add(
//       new THREE.Line(
//         new THREE.BufferGeometry().setFromPoints(points),
//         new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
//       ),
//     );
//   };

//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//       new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
//     ],
//     0x60a5fa,
//     0.8,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
//       new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
//     ],
//     0xfb923c,
//     0.8,
//   );
//   mkLine(
//     [
//       new THREE.Vector3(axOriginX, 0, axOriginZ),
//       new THREE.Vector3(axOriginX, yMax + 0.8, axOriginZ),
//     ],
//     0x6ee7b7,
//     0.8,
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
//     mkLine(
//       [
//         new THREE.Vector3(x, 0, axOriginZ),
//         new THREE.Vector3(x, 0, axOriginZ + 0.45),
//       ],
//       0x3b82f6,
//       0.35,
//     );
//     mkLine(
//       [new THREE.Vector3(x, 0, zMin - 0.3), new THREE.Vector3(x, 0, axOriginZ)],
//       0x1e3a5f,
//       0.18,
//     );
//   });

//   const cocTitle = makeLabel("← Cycles of Concentration (CoC) →", {
//     color: "#93c5fd",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   cocTitle.position.set((xMin + xMax) / 2, 0, axOriginZ + 2.1);
//   scene.add(cocTitle);

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
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, 0, z),
//         new THREE.Vector3(axOriginX - 0.45, 0, z),
//       ],
//       0xf97316,
//       0.35,
//     );
//     mkLine(
//       [new THREE.Vector3(axOriginX, 0, z), new THREE.Vector3(xMax + 0.3, 0, z)],
//       0x431407,
//       0.18,
//     );
//   });

//   const tempTitle = makeLabel("← Temperature →", {
//     color: "#fdba74",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   tempTitle.position.set(axOriginX - 2.0, 0, (zMin + zMax) / 2);
//   scene.add(tempTitle);

//   const siStep = maxSI <= 1 ? 0.25 : maxSI <= 2 ? 0.5 : 1.0;
//   const siTicks: number[] = [];
//   for (let v = 0; v <= maxSI + siStep * 0.5; v += siStep)
//     siTicks.push(parseFloat(v.toFixed(3)));
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
//     mkLine(
//       [
//         new THREE.Vector3(axOriginX, yPos, axOriginZ),
//         new THREE.Vector3(axOriginX - 0.4, yPos, axOriginZ),
//       ],
//       0x22c55e,
//       0.35,
//     );
//     if (v > 0)
//       mkLine(
//         [
//           new THREE.Vector3(axOriginX, yPos, axOriginZ),
//           new THREE.Vector3(xMax + 0.3, yPos, axOriginZ),
//         ],
//         0x14532d,
//         0.15,
//       );
//   });

//   const yAxisLabel = activeSaltId
//     ? `SI (Saturation Index) — ${activeSaltId}`
//     : "LSI (Langelier Saturation Index)";
//   const siTitle = makeLabel(yAxisLabel, {
//     color: "#86efac",
//     fontSize: "11px",
//     fontWeight: "700",
//   });
//   siTitle.position.set(axOriginX - 0.7, yMax + 1.2, axOriginZ);
//   scene.add(siTitle);

//   const nMax = Math.max(nCoC, nTemp);
//   const initDist = Math.max(25, nMax * 6.5);

//   return { renderer, labelRenderer, scene, camera, barMeshes, initDist };
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
//   isDragging: boolean;
//   prevX: number;
//   prevY: number;
//   hoveredMesh: THREE.Mesh | null;
//   selectedMesh: THREE.Mesh | null;
//   animId: number;
// }

// interface Props {
//   apiResponse?: SaturationApiResponseFlat | undefined;
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function SaturationDashboard({ apiResponse }: Props) {
//   const meta = useMemo(() => resolveMeta(apiResponse), [apiResponse]);

//   const gridResults: GridResult[] = useMemo(
//     () => meta?.gridResults ?? [],
//     [meta],
//   );

//   // The "base" saltId from API
//   const baseSaltId = meta?.saltId ?? null;

//   // ── NEW: Active salt controlled by user clicking chips ──
//   const [activeSaltId, setActiveSaltId] = useState<string | null>(baseSaltId);

//   // Reset active salt when apiResponse changes
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

//   // maxSI recalculates based on the ACTIVE salt chip selection
//   const maxSI = useMemo(() => {
//     if (!gridResults.length) return 0.5;
//     if (activeSaltId) {
//       return Math.max(
//         ...gridResults.map((d) => d.saturation_indices[activeSaltId]?.SI ?? 0),
//         0.5,
//       );
//     }
//     return Math.max(
//       ...gridResults.map((d) => Math.abs(d.indices?.lsi?.lsi ?? 0)),
//       0.5,
//     );
//   }, [gridResults, activeSaltId]);

//   // ── Resizable sidebar state ──
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
//     const onMouseMove = (e: MouseEvent) => {
//       if (!isResizingRef.current) return;
//       // Dragging the handle leftward INCREASES sidebar width (handle is on left edge of sidebar)
//       const delta = resizeStartXRef.current - e.clientX;
//       const newWidth = Math.min(
//         SIDEBAR_MAX,
//         Math.max(SIDEBAR_MIN, resizeStartWidthRef.current + delta),
//       );
//       setSidebarWidth(newWidth);
//     };
//     const onMouseUp = () => {
//       if (isResizingRef.current) {
//         isResizingRef.current = false;
//         document.body.style.cursor = "";
//         document.body.style.userSelect = "";
//       }
//     };
//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", onMouseUp);
//     return () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", onMouseUp);
//     };
//   }, []);

//   // ── Re-sync 3D canvas whenever the sidebar is resized ──
//   // sidebarWidth changing shrinks/grows the viewport div; we must tell Three.js.
//   // Use requestAnimationFrame so the DOM has already relaid out before we measure.
//   useEffect(() => {
//     const id = requestAnimationFrame(() => {
//       resizeFnRef.current?.();
//     });
//     return () => cancelAnimationFrame(id);
//   }, [sidebarWidth]);

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<SceneState | null>(null);
//   const resizeFnRef = useRef<(() => void) | null>(null);
//   const [activeData, setActiveData] = useState<GridResult | null>(null);

//   const updateCamera = useCallback(() => {
//     const s = sceneRef.current;
//     if (!s) return;
//     s.camera.position.x = Math.sin(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.position.y = Math.sin(s.rotX) * s.dist;
//     s.camera.position.z = Math.cos(s.rotY) * Math.cos(s.rotX) * s.dist;
//     s.camera.lookAt(0, 2, 0);
//   }, []);

//   // ── Build scene — rebuilds when activeSaltId changes ──
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

//   // ── Interaction ──
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     const S = () => sceneRef.current;

//     const resetColor = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshLambertMaterial).color.setHex(
//         m.userData.origColor as number,
//       );
//     const setWhite = (m: THREE.Mesh) =>
//       (m.material as THREE.MeshLambertMaterial).color.setHex(0xffffff);

//     const raycast = (clientX: number, clientY: number): THREE.Mesh | null => {
//       const s = S();
//       if (!s) return null;
//       const rect = canvas.getBoundingClientRect();
//       mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
//       mouse.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
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
//       const dx = e.clientX - s.prevX;
//       const dy = e.clientY - s.prevY;
//       if (
//         e.buttons === 1 &&
//         !s.isDragging &&
//         (Math.abs(dx) > 3 || Math.abs(dy) > 3)
//       ) {
//         s.isDragging = true;
//       }
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
//       ) {
//         resetColor(s.hoveredMesh);
//       }
//       if (hit) {
//         s.hoveredMesh = hit;
//         if (hit !== s.selectedMesh) setWhite(hit);
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
//           ) {
//             resetColor(s.selectedMesh);
//           }
//           s.selectedMesh = hit;
//           setWhite(hit);
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

//   // ── Sidebar data ──
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

//   return (
//     <div className="bg-[#0d1117] text-slate-200 font-sans text-[14px] h-screen overflow-hidden flex flex-col select-none">
//       {/* Header */}
//       <header className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/10 shrink-0 gap-4 flex-wrap">
//         <div>
//           <div className="text-[15px] font-semibold text-slate-100 tracking-wide">
//             Saturation Analysis —{" "}
//             <span className="text-blue-400">{displaySaltLabel}</span> · 3D Grid
//           </div>
//           <div className="text-[12px] text-slate-500 mt-0.5 flex flex-wrap gap-x-3">
//             {assetName && (
//               <span className="text-slate-400 font-medium">{assetName}</span>
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
//         <div className="flex items-center gap-2 flex-wrap">
//           {summary && (
//             <div className="flex gap-1 mr-3 text-[12px]">
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
//                 className="flex items-center gap-1.5 text-[12px] text-slate-400"
//               >
//                 <span className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`} />
//                 {label}
//               </div>
//             );
//           })}
//         </div>
//       </header>

//       {/* ── Salt chips — CLICKABLE, switch active salt ── */}
//       {saltsOfInterest.length > 0 && (
//         <div className="flex items-center gap-2 px-4 py-2 bg-[#0f1419] border-b border-white/[0.06] overflow-x-auto shrink-0">
//           <span className="text-[11px] text-slate-600 shrink-0 mr-1 font-medium tracking-wide uppercase">
//             Salt View:
//           </span>
//           {saltsOfInterest.map((s) => {
//             const isActive = s === activeSaltId;
//             return (
//               <button
//                 key={s}
//                 onClick={() => setActiveSaltId(isActive ? null : s)}
//                 title={
//                   isActive
//                     ? "Click to reset to LSI view"
//                     : `Click to view graph by ${s} SI`
//                 }
//                 className={`
//                   relative text-[13px] px-3 py-1 rounded-full border font-medium shrink-0
//                   transition-all duration-150 cursor-pointer
//                   ${
//                     isActive
//                       ? "border-blue-400 text-blue-300 bg-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.35)]"
//                       : "border-white/[0.12] text-slate-400 bg-white/[0.03] hover:border-blue-400/50 hover:text-blue-300 hover:bg-blue-500/10"
//                   }
//                 `}
//               >
//                 {s}
//                 {isActive && (
//                   <span className="ml-1.5 text-[10px] text-blue-400/70 font-normal">
//                     active ✓
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//           {activeSaltId && (
//             <button
//               onClick={() => setActiveSaltId(null)}
//               className="text-[11px] px-2 py-1 rounded-full border border-slate-700 text-slate-600 hover:text-slate-400 hover:border-slate-500 transition-all ml-1 shrink-0"
//               title="Reset to LSI view"
//             >
//               Reset to LSI
//             </button>
//           )}
//           <span className="text-[10px] text-slate-700 ml-auto shrink-0 hidden sm:block">
//             Click a salt to switch the chart axis
//           </span>
//         </div>
//       )}

//       {/* Main */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* 3D viewport */}
//         <div
//           ref={wrapRef}
//           className="flex-1 min-w-0 relative bg-[#0d1117] overflow-hidden"
//         >
//           {isEmpty ? (
//             <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
//               <div className="text-4xl opacity-20">⬛</div>
//               <p className="text-[14px]">
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
//                 className="absolute bottom-3 left-3 flex flex-col gap-1 pointer-events-none"
//                 style={{ zIndex: 20 }}
//               >
//                 <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
//                   <div className="w-5 h-0.5 bg-blue-400 rounded" />
//                   <span>X — Cycles of Concentration (CoC)</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
//                   <div className="w-5 h-0.5 bg-orange-400 rounded" />
//                   <span>Z — Temperature (°{tempUnit})</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
//                   <div className="w-5 h-0.5 bg-emerald-400 rounded" />
//                   <span>
//                     Y —{" "}
//                     {activeSaltId
//                       ? `${activeSaltId} Saturation Index (SI)`
//                       : "LSI (Langelier Saturation Index)"}
//                   </span>
//                 </div>
//               </div>
//               <div
//                 className="absolute bottom-3 right-3 text-[11px] text-slate-700 pointer-events-none text-right"
//                 style={{ zIndex: 20 }}
//               >
//                 Drag · Rotate &nbsp;|&nbsp; Scroll · Zoom &nbsp;|&nbsp; Click ·
//                 Pin
//               </div>
//             </>
//           )}
//         </div>

//         {/* ── Resize Handle ── */}
//         <div
//           onMouseDown={onResizeMouseDown}
//           className="w-[5px] shrink-0 bg-transparent hover:bg-blue-500/30 active:bg-blue-500/50 cursor-col-resize transition-colors relative group"
//           title="Drag to resize sidebar"
//           style={{ zIndex: 30 }}
//         >
//           {/* Visual grip dots */}
//           <div className="absolute inset-y-0 left-[1px] w-[3px] flex flex-col items-center justify-center gap-[5px] opacity-0 group-hover:opacity-100 transition-opacity">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="w-[3px] h-[3px] rounded-full bg-blue-400/70"
//               />
//             ))}
//           </div>
//         </div>

//         {/* ── Sidebar — width controlled by state ── */}
//         <aside
//           style={{
//             width: sidebarWidth,
//             minWidth: SIDEBAR_MIN,
//             maxWidth: SIDEBAR_MAX,
//           }}
//           className="shrink-0 bg-[#161b22] border-l border-white/10 overflow-y-auto p-4"
//         >
//           {!d ? (
//             <div className="text-center py-6">
//               <p className="text-[13px] text-slate-500 mb-1">
//                 Hover or click a bar
//               </p>
//               <p className="text-[11px] text-slate-700">
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
//                       <div className="text-[13px] font-semibold text-slate-300">
//                         {label}
//                       </div>
//                       <div className="text-[11px] text-slate-600">{sub}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-6 border-t border-white/[0.06] pt-4 space-y-2 text-left">
//                 <p className="text-[11px] text-slate-600 uppercase tracking-widest mb-2">
//                   Axis Legend
//                 </p>
//                 {[
//                   { color: "#60a5fa", label: "X — Cycles of Concentration" },
//                   { color: "#fb923c", label: `Z — Temperature (°${tempUnit})` },
//                   {
//                     color: "#6ee7b7",
//                     label: activeSaltId
//                       ? `Y — ${activeSaltId} SI`
//                       : "Y — LSI (Langelier)",
//                   },
//                 ].map(({ color, label }) => (
//                   <div key={label} className="flex items-center gap-2">
//                     <div
//                       className="w-6 h-0.5 shrink-0 rounded-full"
//                       style={{ background: color }}
//                     />
//                     <span className="text-[12px] text-slate-500">{label}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Resize tip */}
//               <div className="mt-6 border-t border-white/[0.06] pt-4">
//                 <p className="text-[11px] text-slate-700">
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
//                   <span className="text-[13px] text-slate-400">Status</span>
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
//                           className="flex justify-between items-center py-[6px] border-b border-white/[0.04] last:border-0"
//                         >
//                           <div className="flex items-center gap-1.5 min-w-0">
//                             <span
//                               className={`text-[13px] truncate ${isActive ? "font-semibold text-slate-200" : "text-slate-400"}`}
//                             >
//                               {salt}
//                             </span>
//                             {entry?.chemical_formula && (
//                               <span className="text-[10px] text-slate-700 shrink-0">
//                                 {entry.chemical_formula}
//                               </span>
//                             )}
//                           </div>
//                           <span
//                             className={`text-[13px] font-medium shrink-0 ${entry && entry.SI > 0 ? "text-red-400" : "text-slate-500"}`}
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
//                       className="py-[6px] border-b border-white/[0.04] last:border-0"
//                     >
//                       <div className="flex justify-between items-center">
//                         <span className="text-[13px] text-slate-400">
//                           {label}
//                         </span>
//                         <Badge text={metal.rating} />
//                       </div>
//                       <div className="flex justify-between mt-0.5">
//                         <span className="text-[11px] text-slate-700">
//                           Treated / Base
//                         </span>
//                         <span className="text-[11px] text-slate-400">
//                           {metal.cr_mpy.toFixed(2)} /{" "}
//                           {(metal.cr_base_mpy ?? 0).toFixed(2)} mpy
//                           {metal.total_inhibition_percent !== undefined && (
//                             <span className="text-emerald-500/70 ml-1.5">
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
//                           className={`flex justify-between items-center py-[5px] border-b border-white/[0.03] last:border-0 ${isTarget ? "bg-blue-500/5 -mx-1 px-1 rounded" : ""}`}
//                         >
//                           <div className="flex items-center gap-1 min-w-0">
//                             <span
//                               className={`text-[13px] truncate ${isTarget ? "font-bold text-slate-100" : isInterest ? "font-medium text-slate-300" : "text-slate-500"}`}
//                             >
//                               {key}
//                             </span>
//                             {val.chemical_formula && (
//                               <span className="text-[10px] text-slate-700 shrink-0 hidden sm:inline">
//                                 {val.chemical_formula}
//                               </span>
//                             )}
//                           </div>
//                           <span
//                             className={`text-[13px] shrink-0 font-medium ${val.SI > 0 ? "text-red-400" : "text-slate-600"} ${isTarget ? "font-bold" : ""}`}
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
}

export interface SaturationApiResponseFlat {
  success?: boolean;
  run_id?: string;
  salt_id: string | null;
  salts_of_interest?: string[];
  dosage_ppm?: number;
  coc_min?: number;
  coc_max?: number;
  temp_min?: number;
  temp_max?: number;
  temp_unit?: string;
  ph_mode?: string;
  total_grid_points?: number;
  grid_results: GridResult[];
  summary?: { green: number; yellow: number; red: number; error: number };
  base_water_parameters?: Record<string, { value: number; unit: string }>;
  asset_info?: { name?: string; type?: string };
  data?: {
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
// Hard cap on visual bar height — bars are ALWAYS normalised into this range.
// The Y-axis tick labels still show the real SI values.
const BAR_MAX_H = 8.0;

const SIDEBAR_MIN = 240;
const SIDEBAR_MAX = 560;
const SIDEBAR_DEFAULT = 300;

// ─── API shape resolver ───────────────────────────────────────────────────────

function resolveMeta(apiResponse: SaturationApiResponseFlat | undefined) {
  if (!apiResponse) return null;
  const src = apiResponse.data ?? apiResponse;
  return {
    saltId: (src.salt_id ?? null) as string | null,
    saltsOfInterest: src.salts_of_interest ?? [],
    dosagePpm: src.dosage_ppm ?? 0,
    cocMin: src.coc_min ?? 0,
    cocMax: src.coc_max ?? 0,
    tempMin: src.temp_min ?? 0,
    tempMax: src.temp_max ?? 0,
    tempUnit: src.temp_unit ?? "C",
    phMode: src.ph_mode,
    totalGridPoints: src.total_grid_points,
    gridResults: (src.grid_results ?? []) as GridResult[],
    summary: src.summary,
    baseWaterParameters: src.base_water_parameters,
    assetInfo: src.asset_info,
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
  const v = variant ?? getBadgeVariant(text);
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

function SSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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

function buildScene(
  canvas: HTMLCanvasElement,
  wrap: HTMLDivElement,
  gridResults: GridResult[],
  activeSaltId: string | null,
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
  // No fog — fog was clipping tall bars

  // Far-clip extended to 2000 so nothing ever disappears after zooming out
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

  gridResults.forEach((d) => {
    const siValue = activeSaltId
      ? (d.saturation_indices[activeSaltId]?.SI ?? null)
      : null;
    const displayVal =
      siValue !== null ? siValue : Math.abs(d.indices.lsi.lsi ?? 0);

    // Normalise: tallest bar → BAR_MAX_H, shortest → proportionally smaller
    const h = Math.max(0.15, (displayVal / maxSI) * BAR_MAX_H);

    const ci = cocUniq.indexOf(d._grid_CoC);
    const ti = tempUniq.indexOf(d._grid_temp);
    const x = ci * SPACING + cocOffset;
    const z = ti * SPACING + tempOffset;
    const clr = COLOR_MAP[d.color_code] ?? 0xd93025;

    const geo = new THREE.BoxGeometry(BAR_W, h, BAR_W);
    const mat = new THREE.MeshPhongMaterial({ color: clr, shininess: 55 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, h / 2, z);
    mesh.userData = { data: d, origColor: clr, h };
    scene.add(mesh);
    barMeshes.push(mesh);

    const labelVal =
      siValue !== null
        ? siValue.toFixed(2)
        : `LSI ${d.indices.lsi.lsi.toFixed(2)}`;
    const siLbl = makeLabel(labelVal, {
      color: "rgba(15,23,42,0.92)",
      fontSize: "9px",
      fontWeight: "700",
      background: "rgba(255,255,255,0.88)",
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

  const mkLine = (pts: THREE.Vector3[], color: number, opacity = 0.7) => {
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

  // Y-axis extends a bit above BAR_MAX_H
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
  ) => {
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

  // Y-axis tick labels — real SI values mapped to visual heights
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

  // ── Initial camera distance — auto-fit so all bars are visible ─────────────
  const nMax = Math.max(nCoC, nTemp);
  const spreadXZ = nMax * SPACING;
  // Keep the full bar height in view from the initial 38° elevation angle
  const initDist = Math.max(32, spreadXZ * 2.4, BAR_MAX_H * 4.0);
  // Look at the vertical centre of the bars so neither top nor bottom is clipped
  const initLookAtY = BAR_MAX_H * 0.5;

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
  panX: number; // look-at / orbit-centre offset
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
  const baseSaltId = meta?.saltId ?? null;

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

  const saltsOfInterest = useMemo(() => {
    const raw =
      apiResponse?.salts_of_interest ??
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

  const maxSI = useMemo(() => {
    if (!gridResults.length) return 0.5;
    if (activeSaltId)
      return Math.max(
        ...gridResults.map((d) => d.saturation_indices[activeSaltId]?.SI ?? 0),
        0.5,
      );
    return Math.max(
      ...gridResults.map((d) => Math.abs(d.indices?.lsi?.lsi ?? 0)),
      0.5,
    );
  }, [gridResults, activeSaltId]);

  // ── Resizable sidebar ──────────────────────────────────────────────────────
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const isResizingRef = useRef(false);
  const resizeStartXRef = useRef(0);
  const resizeStartWidthRef = useRef(SIDEBAR_DEFAULT);

  const onResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
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

    // Screen-space pan vectors
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

      // ── Right / middle drag → pan ──────────────────────────────────────────
      if (s.isPanning && (e.buttons === 2 || e.buttons === 4)) {
        const speed = s.dist * 0.0018;
        const { right } = getPanVectors(s);
        // Horizontal mouse → pan left/right along XZ
        s.panX -= right.x * dx * speed;
        s.panZ -= right.z * dx * speed;
        // Vertical mouse → pan up/down (drag down = scene moves down = look-at moves down)
        s.panY -= dy * speed;
        s.prevX = e.clientX;
        s.prevY = e.clientY;
        updateCamera();
        canvas.style.cursor = "move";
        return;
      }

      // ── Left drag → orbit ──────────────────────────────────────────────────
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

      // ── Hover raycasting ───────────────────────────────────────────────────
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

    // Touch: 1-finger orbit, 2-finger vertical pan
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
  const saltSI =
    d && activeSaltId ? (d.saturation_indices[activeSaltId]?.SI ?? null) : null;
  const displaySI = saltSI ?? d?.indices?.lsi?.lsi ?? null;
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
              <span className="text-slate-600 font-semibold">{assetName}</span>
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
                <span className="px-2.5 py-1 rounded-full bg-amber-50   text-amber-700   border border-amber-200   font-semibold">
                  {summary.yellow} Caution
                </span>
              )}
              {summary.red > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-red-50     text-red-700     border border-red-200     font-semibold">
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
                <span className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${dot}`} />
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
                  { color: "#ea580c", label: `Z — Temperature (°${tempUnit})` },
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
              <div key={i} className="w-[3px] h-[3px] rounded-full bg-white" />
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
                  { color: "#ea580c", label: `Z — Temperature (°${tempUnit})` },
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
                    <span className="text-[12px] text-slate-500">{label}</span>
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
                title={activeSaltId ? `${activeSaltId} SI` : "Deposition Index"}
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
  );
}
