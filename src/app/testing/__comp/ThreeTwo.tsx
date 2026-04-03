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

function makeLabel(
  text: string,
  opts: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    background?: string;
    padding?: string;
    border?: string;
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
  div.style.pointerEvents = "none";
  div.style.userSelect = "none";
  div.style.letterSpacing = "0.03em";
  div.style.lineHeight = "1";
  if (opts.background) {
    div.style.background = opts.background;
    div.style.padding = opts.padding ?? "2px 5px";
    div.style.borderRadius = "3px";
  }
  if (opts.border) div.style.border = opts.border;
  return new CSS2DObject(div);
}

// ─── Build the Three.js scene ─────────────────────────────────────────────────

function buildScene(
  canvas: HTMLCanvasElement,
  labelDiv: HTMLDivElement,
  wrap: HTMLDivElement,
  gridResults: GridResult[],
  saltId: string,
  cocUniq: number[],
  tempUniq: number[],
  maxSI: number,
  tempUnit: string,
) {
  // ── Renderers ──
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0d1117, 1);

  const labelRenderer = new CSS2DRenderer({ element: labelDiv });

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0d1117, 0.012);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);

  // ── Lighting ──
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 1.0);
  sun.position.set(15, 30, 15);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x5588ff, 0.3);
  fill.position.set(-15, 8, -10);
  scene.add(fill);

  // ── Layout math ──
  // X axis = CoC (increases right)
  // Z axis = Temperature (increases away from viewer / back)
  // Y axis = SI height
  const nCoC = cocUniq.length;
  const nTemp = tempUniq.length;
  const cocOffset = -((nCoC - 1) * SPACING) / 2;
  const tempOffset = -((nTemp - 1) * SPACING) / 2;

  // World extents
  const xMin = cocOffset - SPACING / 2;
  const xMax = (nCoC - 1) * SPACING + cocOffset + SPACING / 2;
  const zMin = tempOffset - SPACING / 2;
  const zMax = (nTemp - 1) * SPACING + tempOffset + SPACING / 2;
  const yMax = BAR_MAX_H;

  // Axis origins — place at the left-front corner of the floor
  const axOriginX = xMin - 0.3;
  const axOriginY = 0;
  const axOriginZ = zMax + 0.3; // front of scene (positive Z is towards viewer)

  const barMeshes: THREE.Mesh[] = [];

  // ── Bars ──
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

    // SI value on top
    const siLbl = makeLabel(si.toFixed(2), {
      color: "rgba(255,255,255,0.9)",
      fontSize: "9px",
      fontWeight: "700",
      background: "rgba(0,0,0,0.5)",
      padding: "1px 4px",
    });
    siLbl.position.set(0, h / 2 + 0.22, 0);
    mesh.add(siLbl);

    // Edges
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

  // ── Floor grid ──
  const gridW = Math.max(nCoC, nTemp) * SPACING + SPACING;
  const gridHelper = new THREE.GridHelper(
    gridW + 4,
    (nCoC + nTemp) * 3,
    0x252d3a,
    0x1a2030,
  );
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  // ── Axis helper lines ──
  // We draw the three axis lines from a shared origin at (axOriginX, 0, axOriginZ)

  const mkLine = (points: THREE.Vector3[], color: number, opacity = 0.7) => {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    );
    scene.add(line);
  };

  // X axis line (CoC) — runs along Z = axOriginZ (front), at y=0
  mkLine(
    [
      new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
      new THREE.Vector3(xMax + 0.5, axOriginY, axOriginZ),
    ],
    0x60a5fa,
    0.8,
  );

  // Z axis line (Temperature) — runs along X = axOriginX (left), at y=0
  mkLine(
    [
      new THREE.Vector3(axOriginX, axOriginY, zMin - 0.5),
      new THREE.Vector3(axOriginX, axOriginY, axOriginZ),
    ],
    0xfb923c,
    0.8,
  );

  // Y axis line (SI) — vertical at the shared origin corner
  mkLine(
    [
      new THREE.Vector3(axOriginX, 0, axOriginZ),
      new THREE.Vector3(axOriginX, yMax + 0.8, axOriginZ),
    ],
    0x6ee7b7,
    0.8,
  );

  // Arrow heads
  const mkArrow = (
    dir: THREE.Vector3,
    origin: THREE.Vector3,
    color: number,
  ) => {
    const arrow = new THREE.ArrowHelper(
      dir.normalize(),
      origin,
      0.7,
      color,
      0.35,
      0.18,
    );
    scene.add(arrow);
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

  // ── CoC tick labels (X axis) ──
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

    // tick line down from axis
    mkLine(
      [
        new THREE.Vector3(x, 0, axOriginZ),
        new THREE.Vector3(x, 0, axOriginZ + 0.45),
      ],
      0x3b82f6,
      0.35,
    );

    // vertical guide line (faint)
    mkLine(
      [new THREE.Vector3(x, 0, zMin - 0.3), new THREE.Vector3(x, 0, axOriginZ)],
      0x1e3a5f,
      0.18,
    );
  });

  // CoC axis title
  const cocTitle = makeLabel("← Cycles of Concentration (CoC) →", {
    color: "#93c5fd",
    fontSize: "11px",
    fontWeight: "700",
  });
  cocTitle.position.set((xMin + xMax) / 2, 0, axOriginZ + 2.1);
  scene.add(cocTitle);

  // ── Temperature tick labels (Z axis) ──
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

    // tick
    mkLine(
      [
        new THREE.Vector3(axOriginX, 0, z),
        new THREE.Vector3(axOriginX - 0.45, 0, z),
      ],
      0xf97316,
      0.35,
    );

    // horizontal guide
    mkLine(
      [new THREE.Vector3(axOriginX, 0, z), new THREE.Vector3(xMax + 0.3, 0, z)],
      0x431407,
      0.18,
    );
  });

  // Temperature axis title
  const tempTitle = makeLabel("← Temperature →", {
    color: "#fdba74",
    fontSize: "11px",
    fontWeight: "700",
  });
  tempTitle.position.set(axOriginX - 2.0, 0, (zMin + zMax) / 2);
  scene.add(tempTitle);

  // ── SI tick labels (Y axis) ──
  const siStep = maxSI <= 1 ? 0.25 : maxSI <= 2 ? 0.5 : 1.0;
  const siTicks: number[] = [];
  for (let v = 0; v <= maxSI + siStep * 0.5; v += siStep) {
    siTicks.push(parseFloat(v.toFixed(3)));
  }
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

    // horizontal tick
    mkLine(
      [
        new THREE.Vector3(axOriginX, yPos, axOriginZ),
        new THREE.Vector3(axOriginX - 0.4, yPos, axOriginZ),
      ],
      0x22c55e,
      0.35,
    );

    // faint horizontal plane line
    if (v > 0) {
      mkLine(
        [
          new THREE.Vector3(axOriginX, yPos, axOriginZ),
          new THREE.Vector3(xMax + 0.3, yPos, axOriginZ),
        ],
        0x14532d,
        0.15,
      );
    }
  });

  // SI axis title
  const siTitle = makeLabel("SI (Saturation Index)", {
    color: "#86efac",
    fontSize: "11px",
    fontWeight: "700",
  });
  siTitle.position.set(axOriginX - 0.7, yMax + 1.2, axOriginZ);
  scene.add(siTitle);

  // ── State ──
  const nMax = Math.max(nCoC, nTemp);
  const initDist = Math.max(25, nMax * 6.5);

  return {
    renderer,
    labelRenderer,
    scene,
    camera,
    barMeshes,
    initDist,
    axOriginX,
    axOriginY,
    axOriginZ,
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────

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
  const maxSI = useMemo(() => {
    const vals = gridResults.map((d) => d.saturation_indices[saltId]?.SI ?? 0);
    return Math.max(...vals, 0.5);
  }, [gridResults, saltId]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelDivRef = useRef<HTMLDivElement>(null);
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
    const labelDiv = labelDivRef.current;
    if (!canvas || !wrap || !labelDiv) return;

    // Tear down previous
    if (sceneRef.current) {
      cancelAnimationFrame(sceneRef.current.animId);
      sceneRef.current.renderer.dispose();
      sceneRef.current = null;
    }
    if (gridResults.length === 0) return;

    const { renderer, labelRenderer, scene, camera, barMeshes, initDist } =
      buildScene(
        canvas,
        labelDiv,
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
      sceneRef.current = null;
    };
  }, [gridResults, saltId, maxSI, cocUniq, tempUniq, tempUnit, updateCamera]);

  // ── Interaction ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const gs = () => sceneRef.current;

    const onDown = (e: MouseEvent) => {
      const s = gs();
      if (!s) return;
      s.isDragging = true;
      s.prevX = e.clientX;
      s.prevY = e.clientY;
      canvas.style.cursor = "grabbing";
    };
    const onUp = () => {
      const s = gs();
      if (!s) return;
      s.isDragging = false;
      canvas.style.cursor = "grab";
    };
    const onMove = (e: MouseEvent) => {
      const s = gs();
      if (!s) return;
      if (s.isDragging) {
        s.rotY += (e.clientX - s.prevX) * 0.008;
        s.rotX -= (e.clientY - s.prevY) * 0.008;
        s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
        s.prevX = e.clientX;
        s.prevY = e.clientY;
        updateCamera();
        return;
      }
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(mouse, s.camera);
      const hits = raycaster.intersectObjects(s.barMeshes);
      if (s.hoveredMesh && s.hoveredMesh !== s.selectedMesh)
        (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
          s.hoveredMesh.userData.origColor,
        );
      if (hits.length > 0) {
        s.hoveredMesh = hits[0].object as THREE.Mesh;
        if (s.hoveredMesh !== s.selectedMesh)
          (s.hoveredMesh.material as THREE.MeshLambertMaterial).color.setHex(
            0xffffff,
          );
        canvas.style.cursor = "pointer";
        setActiveData(s.hoveredMesh.userData.data as GridResult);
      } else {
        s.hoveredMesh = null;
        canvas.style.cursor = "grab";
        setActiveData(
          s.selectedMesh ? (s.selectedMesh.userData.data as GridResult) : null,
        );
      }
    };
    const onClick = () => {
      const s = gs();
      if (!s || !s.hoveredMesh) return;
      if (s.selectedMesh && s.selectedMesh !== s.hoveredMesh)
        (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(
          s.selectedMesh.userData.origColor,
        );
      s.selectedMesh = s.hoveredMesh;
      (s.selectedMesh.material as THREE.MeshLambertMaterial).color.setHex(
        0xffffff,
      );
      setActiveData(s.selectedMesh.userData.data as GridResult);
    };
    const onWheel = (e: WheelEvent) => {
      const s = gs();
      if (!s) return;
      s.dist = Math.max(8, Math.min(120, s.dist + e.deltaY * 0.05));
      updateCamera();
      e.preventDefault();
    };
    const onTStart = (e: TouchEvent) => {
      const s = gs();
      if (!s) return;
      s.prevX = e.touches[0].clientX;
      s.prevY = e.touches[0].clientY;
    };
    const onTMove = (e: TouchEvent) => {
      const s = gs();
      if (!s) return;
      s.rotY += (e.touches[0].clientX - s.prevX) * 0.01;
      s.rotX -= (e.touches[0].clientY - s.prevY) * 0.01;
      s.rotX = Math.max(-1.1, Math.min(1.1, s.rotX));
      s.prevX = e.touches[0].clientX;
      s.prevY = e.touches[0].clientY;
      updateCamera();
      e.preventDefault();
    };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTStart, { passive: true });
    canvas.addEventListener("touchmove", onTMove, { passive: false });
    return () => {
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTStart);
      canvas.removeEventListener("touchmove", onTMove);
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
        {/* 3D canvas */}
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
              <canvas
                ref={canvasRef}
                className="block w-full h-full cursor-grab"
              />
              <div
                ref={labelDivRef}
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ zIndex: 10 }}
              />
              {/* Axis legend overlay */}
              <div className="absolute bottom-3 left-3 flex flex-col gap-1 pointer-events-none">
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
              <div className="absolute bottom-3 right-3 text-[10px] text-slate-700 pointer-events-none text-right">
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
