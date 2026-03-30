// "use client";

// import { RootState } from "@/redux/store";
// import Image from "next/image";
// import React from "react";
// import { useSelector } from "react-redux";

// // ─── Types ───────────────────────────────────────────────────────────────────

// interface SaltEntry {
//   SI: number;
//   log_IAP: number;
//   log_K: number;
//   phase: string | null;
//   chemical_formula: string;
// }

// interface BaseParam {
//   value: number;
//   unit: string;
//   detection_limit: null | number;
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const data = {
//   run_id: "d279b785-5306-43f0-af24-81f7ee55d26c",
//   salt_id: "Mirabilite",
//   salts_of_interest: ["Anhydrite"],
//   dosage_ppm: 93,
//   coc_min: 7,
//   coc_max: 9,
//   coc_interval: 46,
//   temp_min: 9,
//   temp_max: 80,
//   temp_interval: 33,
//   temp_unit: "C",
//   ph_mode: "natural",
//   fixed_ph: 8.2,
//   adjustment_chemical: "H2SO4",
//   balance_cation: "Na",
//   balance_anion: "SO4",
//   database_used: "phreeqc.dat",
//   total_grid_points: 1,
//   grid_results: {
//     _grid_CoC: 7,
//     _grid_temp: 9,
//     _grid_pH: 0.001,
//     saturation_indices: {
//       Arcanite: {
//         SI: -11.88,
//         log_IAP: -13.39,
//         log_K: -1.5,
//         phase: null,
//         chemical_formula: "K2SO4",
//       },
//       Epsomite: {
//         SI: -7.93,
//         log_IAP: -9.35,
//         log_K: -1.43,
//         phase: null,
//         chemical_formula: "MgSO4:7H2O",
//       },
//       "H2(g)": {
//         SI: -8.2,
//         log_IAP: -11.34,
//         log_K: -3.13,
//         phase: null,
//         chemical_formula: "H2",
//       },
//       "H2O(g)": {
//         SI: -0.43,
//         log_IAP: -0.01,
//         log_K: 0.42,
//         phase: null,
//         chemical_formula: "H2O",
//       },
//       Hexahydrite: {
//         SI: -7.85,
//         log_IAP: -9.34,
//         log_K: -1.5,
//         phase: null,
//         chemical_formula: "MgSO4:6H2O",
//       },
//       Kieserite: {
//         SI: -7.8,
//         log_IAP: -9.29,
//         log_K: -1.49,
//         phase: null,
//         chemical_formula: "MgSO4:H2O",
//       },
//       Melanterite: {
//         SI: -10.25,
//         log_IAP: -12.02,
//         log_K: -1.77,
//         phase: null,
//         chemical_formula: "FeSO4:7H2O",
//       },
//       Mirabilite: {
//         SI: -11.49,
//         log_IAP: -11.34,
//         log_K: 0.14,
//         phase: null,
//         chemical_formula: "Na2SO4:10H2O",
//       },
//       "O2(g)": {
//         SI: -52.81,
//         log_IAP: -55.91,
//         log_K: -3.1,
//         phase: null,
//         chemical_formula: "O2",
//       },
//       Thenardite: {
//         SI: -10.68,
//         log_IAP: -11.24,
//         log_K: -0.56,
//         phase: null,
//         chemical_formula: "Na2SO4",
//       },
//     } as Record<string, SaltEntry>,
//     description_of_solution: { pH: 0, activity_of_water: 0.977 },
//     color_code: "green" as "green" | "yellow" | "red" | "error",
//     ionic_strength: 0.6861,
//     charge_balance_error_pct: 0,
//   },
//   graph_url:
//     "https://water-analysis.s3.eu-north-1.amazonaws.com/saturation-graphs/d279b785-5306-43f0-af24-81f7ee55d26c.png",
//   summary: { green: 1, yellow: 0, red: 0, error: 0 },
//   thresholds: { max_si_at_dose: 0, band_lower: 0, band_upper: 0.5 },
//   base_water_parameters: {
//     pH: { value: 6.06, unit: "", detection_limit: null },
//     Total_Dissolved_Solids: { value: 11, unit: "mg/L", detection_limit: null },
//     Electrical_Conductivity: {
//       value: 22,
//       unit: "µS/cm",
//       detection_limit: null,
//     },
//     Total_Hardness: { value: 75, unit: "mg/L", detection_limit: null },
//     Calcium: { value: 17, unit: "mg/L", detection_limit: null },
//     Magnesium: { value: 8, unit: "mg/L", detection_limit: null },
//     Sodium: { value: 12, unit: "mg/L", detection_limit: null },
//     Potassium: { value: 2, unit: "mg/L", detection_limit: null },
//     Chloride: { value: 0, unit: "mg/L", detection_limit: null },
//     Sulphate: { value: 5, unit: "mg/L", detection_limit: null },
//     Nitrate: { value: 0.13, unit: "mg/L", detection_limit: null },
//     Nitrite: { value: 0, unit: "mg/L", detection_limit: null },
//     Fluoride: { value: 0.3, unit: "mg/L", detection_limit: null },
//     Iron: { value: 0.05, unit: "mg/L", detection_limit: null },
//     Manganese: { value: 0.02, unit: "mg/L", detection_limit: null },
//     Arsenic: { value: 0, unit: "mg/L", detection_limit: null },
//     Lead: { value: 0, unit: "mg/L", detection_limit: null },
//     Cadmium: { value: 0, unit: "mg/L", detection_limit: null },
//     Chromium: { value: 0, unit: "mg/L", detection_limit: null },
//     Mercury: { value: 0, unit: "mg/L", detection_limit: null },
//     Cyanide: { value: 0, unit: "mg/L", detection_limit: null },
//     Phenolic_Compounds: { value: 0.001, unit: "mg/L", detection_limit: null },
//     "Total Coliform": { value: 0, unit: "CFU/100mL", detection_limit: null },
//     E_coli: { value: 0, unit: "CFU/100mL", detection_limit: null },
//   } as Record<string, BaseParam>,
//   asset_info: {
//     name: "Ciaran Higgins",
//     type: "Evaporative Condenser",
//     towerType: "Crossflow",
//     systemVolume: 31,
//     systemMetallurgy: ["Admiralty Brass", "70/30 Copper Nickel"],
//     systemMaterials: ["Concrete Basin / Construction"],
//     recirculationRate: 94,
//   },
//   created_at: "2026-03-30T04:35:13.206464+00:00",
// };

// // ─── Helpers ─────────────────────────────────────────────────────────────────

// const STATUS = {
//   green: { label: "Safe", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
//   yellow: {
//     label: "Caution",
//     color: "#d97706",
//     bg: "#fffbeb",
//     border: "#fde68a",
//   },
//   red: {
//     label: "Critical",
//     color: "#dc2626",
//     bg: "#fef2f2",
//     border: "#fecaca",
//   },
//   error: { label: "Error", color: "#64748b", bg: "#f8fafc", border: "#e2e8f0" },
// };

// function fmtLabel(k: string) {
//   return k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
// }

// function siColor(si: number) {
//   if (si >= 0) return "#dc2626";
//   if (si >= -1) return "#d97706";
//   return "#16a34a";
// }

// function SIBar({ si }: { si: number }) {
//   const pct = Math.min(100, Math.max(0, ((si + 15) / 17) * 100));
//   return (
//     <div
//       style={{
//         height: 4,
//         background: "#f1f5f9",
//         borderRadius: 9999,
//         overflow: "hidden",
//         width: "100%",
//       }}
//     >
//       <div
//         style={{
//           height: "100%",
//           width: `${pct}%`,
//           background: siColor(si),
//           borderRadius: 9999,
//         }}
//       />
//     </div>
//   );
// }

// // ─── Reusable layout pieces ───────────────────────────────────────────────────

// function SectionTitle({ children }: { children: React.ReactNode }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         marginBottom: 20,
//       }}
//     >
//       <div
//         style={{
//           width: 3,
//           height: 18,
//           background: "#2563eb",
//           borderRadius: 9999,
//         }}
//       />
//       <h2
//         style={{
//           fontSize: 11,
//           fontWeight: 800,
//           letterSpacing: "0.12em",
//           textTransform: "uppercase",
//           color: "#64748b",
//           margin: 0,
//         }}
//       >
//         {children}
//       </h2>
//       <div
//         style={{
//           flex: 1,
//           height: 1,
//           background: "linear-gradient(to right, #e2e8f0, transparent)",
//         }}
//       />
//     </div>
//   );
// }

// function DataCell({
//   label,
//   value,
//   unit,
//   mono = true,
// }: {
//   label: string;
//   value: string | number;
//   unit?: string;
//   mono?: boolean;
// }) {
//   return (
//     <div
//       style={{
//         padding: "14px 16px",
//         background: "#fff",
//         border: "1px solid #e2e8f0",
//         borderRadius: 12,
//       }}
//     >
//       <div
//         style={{
//           fontSize: 9,
//           fontWeight: 700,
//           letterSpacing: "0.1em",
//           textTransform: "uppercase",
//           color: "#94a3b8",
//           marginBottom: 6,
//         }}
//       >
//         {label}
//       </div>
//       <div
//         style={{
//           fontSize: 15,
//           fontWeight: 700,
//           color: "#0f172a",
//           fontFamily: mono ? "'DM Mono', 'Fira Mono', monospace" : "inherit",
//         }}
//       >
//         {value}
//         {unit && (
//           <span
//             style={{
//               fontSize: 11,
//               fontWeight: 400,
//               color: "#94a3b8",
//               marginLeft: 4,
//             }}
//           >
//             {unit}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// function Tag({
//   children,
//   color = "#2563eb",
//   bg = "#eff6ff",
// }: {
//   children: React.ReactNode;
//   color?: string;
//   bg?: string;
// }) {
//   return (
//     <span
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         padding: "4px 12px",
//         borderRadius: 9999,
//         fontSize: 11,
//         fontWeight: 600,
//         color,
//         background: bg,
//         border: `1px solid ${color}22`,
//       }}
//     >
//       {children}
//     </span>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function SaturationAnalysisDetails() {
//   const data = useSelector(
//     (state: RootState) => state.analysis.saturationAnalysis,
//   );
//   console.log(a);
//   const r = data.grid_results;
//   const st = STATUS[r.color_code];
//   const siRows = Object.entries(r.saturation_indices);
//   const date = new Date(data.created_at);
//   console.log(data.graph_url);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f8fafc",
//         fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//         color: "#0f172a",
//       }}
//     >
//       <div className="mt-6">
//         {/* ══ SECTION 1 — Report Identity ══ */}
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #e2e8f0",
//             borderRadius: 20,
//             padding: "28px 32px",
//             marginBottom: 24,
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 32,
//             alignItems: "flex-start",
//             justifyContent: "space-between",
//           }}
//         >
//           <div>
//             <div
//               style={{
//                 fontSize: 10,
//                 fontWeight: 800,
//                 letterSpacing: "0.14em",
//                 textTransform: "uppercase",
//                 color: "#2563eb",
//                 marginBottom: 6,
//               }}
//             >
//               Water Treatment Analysis
//             </div>
//             <h1
//               style={{
//                 fontSize: 34,
//                 fontWeight: 900,
//                 letterSpacing: "-0.03em",
//                 margin: "0 0 4px",
//                 lineHeight: 1.1,
//               }}
//             >
//               {data.salt_id}
//               <span
//                 style={{
//                   fontSize: 16,
//                   fontWeight: 500,
//                   color: "#94a3b8",
//                   marginLeft: 10,
//                 }}
//               >
//                 Analysis Report
//               </span>
//             </h1>
//             <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
//               Salt of interest:{" "}
//               <strong style={{ color: "#0f172a" }}>
//                 {data.salts_of_interest.join(", ")}
//               </strong>
//             </div>
//             <div
//               style={{
//                 fontSize: 10,
//                 fontFamily: "monospace",
//                 color: "#94a3b8",
//                 marginTop: 4,
//               }}
//             >
//               {data.run_id}
//             </div>
//           </div>

//           {/* Summary pills */}
//           <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//             {Object.entries(data.summary).map(([k, v]) => {
//               const s = STATUS[k as keyof typeof STATUS];
//               return (
//                 <div
//                   key={k}
//                   style={{
//                     textAlign: "center",
//                     background: s.bg,
//                     border: `1px solid ${s.border}`,
//                     borderRadius: 16,
//                     padding: "12px 20px",
//                     minWidth: 64,
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: 26,
//                       fontWeight: 900,
//                       fontFamily: "monospace",
//                       color: s.color,
//                     }}
//                   >
//                     {v}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 9,
//                       fontWeight: 700,
//                       letterSpacing: "0.1em",
//                       textTransform: "uppercase",
//                       color: "#94a3b8",
//                       marginTop: 2,
//                     }}
//                   >
//                     {s.label}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="w-full">
//           <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
//             <Image
//               src={data.graph_url}
//               alt="Parameter Comparison Graph"
//               fill
//               className="object-contain"
//               sizes="(max-width: 768px) 100vw,
//                              (max-width: 1200px) 80vw,
//                              1200px"
//               priority
//               unoptimized
//             />
//           </div>
//         </div>

//         {/* ══ SECTION 2 — Run Configuration ══ */}
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #e2e8f0",
//             borderRadius: 20,
//             padding: "28px 32px",
//             marginBottom: 24,
//           }}
//         >
//           <SectionTitle>Run Configuration</SectionTitle>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
//               gap: 10,
//             }}
//           >
//             <DataCell label="Database" value={data.database_used} />
//             <DataCell label="pH Mode" value={data.ph_mode} mono={false} />
//             <DataCell label="Adj. Chemical" value={data.adjustment_chemical} />
//             <DataCell label="Balance Cation" value={data.balance_cation} />
//             <DataCell label="Balance Anion" value={data.balance_anion} />
//             <DataCell label="Fixed pH" value={data.fixed_ph} />
//             <DataCell label="Dosage" value={data.dosage_ppm} unit="ppm" />
//             <DataCell label="CoC Min" value={data.coc_min} />
//             <DataCell label="CoC Max" value={data.coc_max} />
//             <DataCell label="CoC Interval" value={data.coc_interval} />
//             <DataCell
//               label="Temp Min"
//               value={`${data.temp_min} °${data.temp_unit}`}
//             />
//             <DataCell
//               label="Temp Max"
//               value={`${data.temp_max} °${data.temp_unit}`}
//             />
//             <DataCell label="Temp Interval" value={data.temp_interval} />
//             <DataCell label="Grid Points" value={data.total_grid_points} />
//             <DataCell
//               label="Created"
//               value={date.toLocaleDateString()}
//               mono={false}
//             />
//             <DataCell
//               label="Time"
//               value={date.toLocaleTimeString()}
//               mono={false}
//             />
//           </div>
//         </div>

//         {/* ══ SECTION 3 — Thresholds ══ */}
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #e2e8f0",
//             borderRadius: 20,
//             padding: "28px 32px",
//             marginBottom: 24,
//           }}
//         >
//           <SectionTitle>Thresholds</SectionTitle>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(3, 1fr)",
//               gap: 10,
//             }}
//           >
//             <DataCell
//               label="Max SI at Dose"
//               value={data.thresholds.max_si_at_dose}
//             />
//             <DataCell label="Band Lower" value={data.thresholds.band_lower} />
//             <DataCell label="Band Upper" value={data.thresholds.band_upper} />
//           </div>
//         </div>

//         {/* ══ SECTION 4 — Grid Result ══ */}
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #e2e8f0",
//             borderRadius: 20,
//             padding: "28px 32px",
//             marginBottom: 24,
//           }}
//         >
//           <SectionTitle>Grid Result</SectionTitle>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
//               gap: 10,
//             }}
//           >
//             <DataCell label="Grid CoC" value={r._grid_CoC} />
//             <DataCell label="Grid Temp" value={`${r._grid_temp} °C`} />
//             <DataCell label="Grid pH" value={r._grid_pH} />
//             <DataCell label="Ionic Strength" value={r.ionic_strength} />
//             <DataCell
//               label="Activity of Water"
//               value={r.description_of_solution.activity_of_water}
//             />
//             <DataCell
//               label="Solution pH"
//               value={r.description_of_solution.pH}
//             />
//             <DataCell
//               label="Charge Bal. Error"
//               value={`${r.charge_balance_error_pct}%`}
//             />
//             <div
//               style={{
//                 padding: "14px 16px",
//                 background: st.bg,
//                 border: `1px solid ${st.border}`,
//                 borderRadius: 12,
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 9,
//                   fontWeight: 700,
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   color: "#94a3b8",
//                   marginBottom: 6,
//                 }}
//               >
//                 Status
//               </div>
//               <div
//                 style={{
//                   fontSize: 15,
//                   fontWeight: 700,
//                   color: st.color,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 6,
//                 }}
//               >
//                 <span
//                   style={{
//                     width: 8,
//                     height: 8,
//                     borderRadius: "50%",
//                     background: st.color,
//                     display: "inline-block",
//                   }}
//                 />
//                 {st.label}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ══ SECTION 5 — Saturation Indices ══ */}
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #e2e8f0",
//             borderRadius: 20,
//             padding: "28px 32px",
//             marginBottom: 24,
//           }}
//         >
//           <SectionTitle>Saturation Indices</SectionTitle>

//           {/* Legend */}
//           <div
//             style={{
//               display: "flex",
//               gap: 20,
//               marginBottom: 16,
//               flexWrap: "wrap",
//             }}
//           >
//             {[
//               ["#16a34a", "Undersaturated (safe)"],
//               ["#d97706", "Near saturation"],
//               ["#dc2626", "Supersaturated (risk)"],
//             ].map(([c, l]) => (
//               <div
//                 key={l}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 6,
//                   fontSize: 11,
//                   color: "#64748b",
//                 }}
//               >
//                 <span
//                   style={{
//                     width: 10,
//                     height: 10,
//                     borderRadius: "50%",
//                     background: c,
//                     display: "inline-block",
//                   }}
//                 />
//                 {l}
//               </div>
//             ))}
//           </div>

//           {/* Table — desktop */}
//           <div style={{ overflowX: "auto" }}>
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 fontSize: 13,
//               }}
//             >
//               <thead>
//                 <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
//                   {[
//                     "Salt",
//                     "Formula",
//                     "SI",
//                     "log IAP",
//                     "log K",
//                     "Phase",
//                     "Trend",
//                   ].map((h, i) => (
//                     <th
//                       key={h}
//                       style={{
//                         padding: "10px 14px",
//                         textAlign: i >= 2 && i < 5 ? "right" : "left",
//                         fontSize: 10,
//                         fontWeight: 800,
//                         letterSpacing: "0.1em",
//                         textTransform: "uppercase",
//                         color: "#94a3b8",
//                       }}
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {siRows.map(([name, entry], idx) => {
//                   const isPrimary = name === data.salt_id;
//                   return (
//                     <tr
//                       key={name}
//                       style={{
//                         background: isPrimary
//                           ? "#eff6ff"
//                           : idx % 2 === 0
//                             ? "#fff"
//                             : "#fafafa",
//                         borderBottom: "1px solid #f1f5f9",
//                         transition: "background 0.15s",
//                       }}
//                     >
//                       <td
//                         style={{
//                           padding: "12px 14px",
//                           fontWeight: 700,
//                           color: "#0f172a",
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 8,
//                           }}
//                         >
//                           {isPrimary && (
//                             <span
//                               style={{
//                                 fontSize: 9,
//                                 fontWeight: 800,
//                                 background: "#2563eb",
//                                 color: "#fff",
//                                 borderRadius: 6,
//                                 padding: "2px 7px",
//                                 letterSpacing: "0.08em",
//                                 textTransform: "uppercase",
//                               }}
//                             >
//                               TARGET
//                             </span>
//                           )}
//                           {name}
//                         </div>
//                       </td>
//                       <td
//                         style={{
//                           padding: "12px 14px",
//                           fontFamily: "monospace",
//                           fontSize: 12,
//                           color: "#64748b",
//                         }}
//                       >
//                         {entry.chemical_formula}
//                       </td>
//                       <td
//                         style={{
//                           padding: "12px 14px",
//                           fontFamily: "monospace",
//                           textAlign: "right",
//                           fontWeight: 800,
//                           fontSize: 14,
//                           color: siColor(entry.SI),
//                         }}
//                       >
//                         {entry.SI.toFixed(2)}
//                       </td>
//                       <td
//                         style={{
//                           padding: "12px 14px",
//                           fontFamily: "monospace",
//                           textAlign: "right",
//                           color: "#64748b",
//                         }}
//                       >
//                         {entry.log_IAP.toFixed(2)}
//                       </td>
//                       <td
//                         style={{
//                           padding: "12px 14px",
//                           fontFamily: "monospace",
//                           textAlign: "right",
//                           color: "#64748b",
//                         }}
//                       >
//                         {entry.log_K.toFixed(2)}
//                       </td>
//                       <td
//                         style={{
//                           padding: "12px 14px",
//                           color: "#94a3b8",
//                           fontSize: 12,
//                         }}
//                       >
//                         {entry.phase ?? "—"}
//                       </td>
//                       <td style={{ padding: "12px 14px", width: 120 }}>
//                         <SIBar si={entry.SI} />
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ══ SECTION 6 — Saturation Graph ══ */}
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #e2e8f0",
//             borderRadius: 20,
//             padding: "28px 32px",
//             marginBottom: 24,
//           }}
//         >
//           <SectionTitle>Saturation Graph</SectionTitle>
//           <div
//             style={{
//               background: "#f8fafc",
//               borderRadius: 14,
//               overflow: "hidden",
//               border: "1px solid #e2e8f0",
//             }}
//           >
//             <img
//               src={data.graph_url}
//               alt="Saturation Index Graph"
//               style={{
//                 width: "100%",
//                 maxHeight: 420,
//                 objectFit: "contain",
//                 display: "block",
//               }}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).style.display = "none";
//               }}
//             />
//           </div>
//           <div
//             style={{
//               display: "flex",
//               gap: 32,
//               marginTop: 14,
//               flexWrap: "wrap",
//             }}
//           >
//             {[
//               ["X Axis", "Cycles of Concentration"],
//               ["Y Axis", `Saturation Index (${data.salt_id})`],
//               ["Z Axis", "Temperature (°C)"],
//             ].map(([ax, val]) => (
//               <div key={ax}>
//                 <div
//                   style={{
//                     fontSize: 9,
//                     fontWeight: 800,
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                     color: "#94a3b8",
//                   }}
//                 >
//                   {ax}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: 12,
//                     fontWeight: 600,
//                     color: "#334155",
//                     marginTop: 2,
//                   }}
//                 >
//                   {val}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ══ SECTION 7 — Base Water Parameters ══ */}
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #e2e8f0",
//             borderRadius: 20,
//             padding: "28px 32px",
//             marginBottom: 24,
//           }}
//         >
//           <SectionTitle>Base Water Parameters</SectionTitle>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
//               gap: 10,
//             }}
//           >
//             {Object.entries(data.base_water_parameters).map(([key, param]) => (
//               <div
//                 key={key}
//                 style={{
//                   padding: "14px 16px",
//                   background: "#fafafa",
//                   border: "1px solid #e2e8f0",
//                   borderRadius: 12,
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: 9,
//                     fontWeight: 700,
//                     letterSpacing: "0.1em",
//                     textTransform: "uppercase",
//                     color: "#94a3b8",
//                     marginBottom: 6,
//                   }}
//                 >
//                   {fmtLabel(key)}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: 16,
//                     fontWeight: 800,
//                     color: "#0f172a",
//                     fontFamily: "monospace",
//                   }}
//                 >
//                   {param.value}
//                   {param.unit && (
//                     <span
//                       style={{
//                         fontSize: 10,
//                         fontWeight: 400,
//                         color: "#94a3b8",
//                         marginLeft: 4,
//                       }}
//                     >
//                       {param.unit}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ══ SECTION 8 — Asset Information ══ */}
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #e2e8f0",
//             borderRadius: 20,
//             padding: "28px 32px",
//             marginBottom: 24,
//           }}
//         >
//           <SectionTitle>Asset Information</SectionTitle>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 16,
//               marginBottom: 24,
//             }}
//           >
//             <div
//               style={{
//                 width: 56,
//                 height: 56,
//                 borderRadius: 16,
//                 background: "linear-gradient(135deg, #2563eb, #4f46e5)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexShrink: 0,
//               }}
//             >
//               <svg
//                 width="28"
//                 height="28"
//                 fill="none"
//                 stroke="#fff"
//                 strokeWidth="1.5"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                 />
//               </svg>
//             </div>
//             <div>
//               <div
//                 style={{
//                   fontSize: 22,
//                   fontWeight: 900,
//                   letterSpacing: "-0.02em",
//                   color: "#0f172a",
//                 }}
//               >
//                 {data.asset_info.name}
//               </div>
//               <div
//                 style={{
//                   fontSize: 13,
//                   color: "#2563eb",
//                   fontWeight: 600,
//                   marginTop: 2,
//                 }}
//               >
//                 {data.asset_info.type}
//               </div>
//             </div>
//           </div>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
//               gap: 10,
//               marginBottom: 16,
//             }}
//           >
//             <DataCell
//               label="Tower Type"
//               value={data.asset_info.towerType}
//               mono={false}
//             />
//             <DataCell
//               label="System Volume"
//               value={data.asset_info.systemVolume}
//               unit="m³"
//             />
//             <DataCell
//               label="Recirculation Rate"
//               value={data.asset_info.recirculationRate}
//               unit="m³/hr"
//             />
//           </div>

//           <div
//             style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
//           >
//             <div
//               style={{
//                 padding: "16px 18px",
//                 background: "#fafafa",
//                 border: "1px solid #e2e8f0",
//                 borderRadius: 12,
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 9,
//                   fontWeight: 800,
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   color: "#94a3b8",
//                   marginBottom: 10,
//                 }}
//               >
//                 System Metallurgy
//               </div>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//                 {data.asset_info.systemMetallurgy.map((m) => (
//                   <Tag key={m} color="#92400e" bg="#fffbeb">
//                     {m}
//                   </Tag>
//                 ))}
//               </div>
//             </div>
//             <div
//               style={{
//                 padding: "16px 18px",
//                 background: "#fafafa",
//                 border: "1px solid #e2e8f0",
//                 borderRadius: 12,
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 9,
//                   fontWeight: 800,
//                   letterSpacing: "0.1em",
//                   textTransform: "uppercase",
//                   color: "#94a3b8",
//                   marginBottom: 10,
//                 }}
//               >
//                 System Materials
//               </div>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//                 {data.asset_info.systemMaterials.map((m) => (
//                   <Tag key={m} color="#3730a3" bg="#eef2ff">
//                     {m}
//                   </Tag>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Footer ── */}
//         <div
//           style={{
//             borderTop: "1px solid #e2e8f0",
//             paddingTop: 20,
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "space-between",
//             gap: 8,
//             fontSize: 11,
//             color: "#94a3b8",
//           }}
//         >
//           <span>
//             Run ID:{" "}
//             <span style={{ fontFamily: "monospace", color: "#64748b" }}>
//               {data.run_id}
//             </span>
//           </span>
//           <span>Generated: {date.toUTCString()}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// ==================== FULL TYPE DEFINITIONS ====================

interface GraphAxes {
  x: string;
  y: string;
  z: string;
}

interface GraphPoint {
  x: number;
  y: number | null;
  z: number;
  color: string;
  pH: number;
}

interface GraphData {
  axes: GraphAxes;
  salt_id: string;
  points: GraphPoint[];
  color_map: {
    green: string;
    yellow: string;
    red: string;
    error: string;
  };
}

interface Summary {
  green: number;
  yellow: number;
  red: number;
  error: number;
}

interface Thresholds {
  max_si_at_dose: number;
  band_lower: number;
  band_upper: number;
}

interface WaterParameter {
  value: number | string;
  unit: string;
  detection_limit: number | null;
}

interface BaseWaterParameters {
  [key: string]: WaterParameter;
}

interface AssetInfo {
  name: string;
  type: string;
  towerType: string;
  systemVolume: number;
  systemMetallurgy: string[];
  systemMaterials: string[];
  recirculationRate: number;
}

interface SaturationAnalysisData {
  run_id: string;
  salt_id: string;
  salts_of_interest: string[];
  dosage_ppm: number;
  coc_min: number;
  coc_max: number;
  coc_interval: number;
  temp_min: number;
  temp_max: number;
  temp_interval: number;
  temp_unit: string;
  ph_mode: string;
  fixed_ph: number;
  adjustment_chemical: string;
  balance_cation: string;
  balance_anion: string;
  database_used: string;
  total_grid_points: number;
  grid_results: Array<{
    _grid_CoC: number;
    _grid_temp: number;
    _grid_pH: number;
    saturation_indices: Record<string, any>;
    description_of_solution: string | null;
    color_code: string;
    ionic_strength: number;
    charge_balance_error_pct: number;
  }>;
  graph_url: string;
  graph_data: GraphData;
  summary: Summary;
  thresholds: Thresholds;
  base_water_parameters: BaseWaterParameters;
  asset_info: AssetInfo;
  created_at: string;
  product_blend: any | null;
  raw_material_chemistry: any | null;
}

// ==================== COMPONENT ====================

const O2SaturationAnalysis: React.FC = () => {
  const data = useSelector(
    (state: RootState) => state.analysis.saturationAnalysis,
  ) as SaturationAnalysisData | null;

  // Safe fallback if data is missing
  if (!data?.run_id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Loading O₂(g) Saturation Analysis...
          </p>
        </div>
      </div>
    );
  }

  const {
    run_id,
    salt_id,
    salts_of_interest,
    dosage_ppm,
    coc_min,
    coc_max,
    temp_min,
    temp_max,
    temp_unit,
    graph_url,
    graph_data,
    summary,
    thresholds,
    base_water_parameters,
    asset_info,
    created_at,
    total_grid_points,
  } = data;

  const getStatusColor = (status: keyof Summary): string => {
    const colors: Record<string, string> = {
      green: "bg-emerald-500 text-white",
      yellow: "bg-amber-500 text-white",
      red: "bg-red-500 text-white",
      error: "bg-gray-400 text-white",
    };
    return colors[status] || "bg-gray-400 text-white";
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className=" space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                O₂(g) Saturation Analysis
              </h1>
              <p className="text-gray-500 mt-2 font-mono">Run ID: {run_id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Created
              </p>
              <p className="font-medium text-gray-700">
                {formatDate(created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Asset Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-sm border p-7">
            <h2 className="text-xl font-semibold mb-5">Asset Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{asset_info.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium">{asset_info.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tower</span>
                <span className="font-medium">{asset_info.towerType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volume</span>
                <span className="font-medium">
                  {asset_info.systemVolume} m³
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recirculation</span>
                <span className="font-medium">
                  {asset_info.recirculationRate} m³/h
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border p-7">
            <h2 className="text-xl font-semibold mb-5">Materials</h2>
            <div className="flex flex-wrap gap-2">
              {asset_info.systemMetallurgy.map((m, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-2xl text-sm"
                >
                  {m}
                </span>
              ))}
              {asset_info.systemMaterials.map((m, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-amber-100 text-amber-800 rounded-2xl text-sm"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <h2 className="text-2xl font-semibold mb-6">Analysis Parameters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Salt</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{salt_id}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Dosage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {dosage_ppm} ppm
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">CoC Range</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {coc_min} – {coc_max}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Temperature</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {temp_min} – {temp_max} °{temp_unit}
              </p>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="p-8 border-b">
            <h2 className="text-2xl font-semibold">Saturation Index Graph</h2>
            <p className="text-gray-500 mt-1">
              {graph_data?.axes?.y} vs {graph_data?.axes?.x} at{" "}
              {graph_data?.axes?.z}
            </p>
          </div>

          <div className="p-10 bg-gray-50 flex justify-center">
            <div className="relative w-full max-w-5xl aspect-[16/9.5] rounded-2xl overflow-hidden shadow border bg-white">
              {graph_url && (
                <Image
                  src={graph_url}
                  alt={`${salt_id} Saturation Graph`}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="p-8 bg-white border-t flex flex-wrap justify-center gap-8">
            {Object.entries(graph_data?.color_map || {}).map(([key, color]) => (
              <div key={key} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full shadow"
                  style={{ backgroundColor: color }}
                />
                <span className="capitalize font-medium text-gray-700">
                  {key} Zone
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Results Summary ({total_grid_points} points)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {(Object.keys(summary) as Array<keyof Summary>).map((status) => (
              <div
                key={status}
                className={`rounded-3xl p-10 text-center transition hover:scale-105 ${getStatusColor(status)}`}
              >
                <div className="text-6xl font-bold mb-3">{summary[status]}</div>
                <p className="uppercase tracking-widest text-sm opacity-90">
                  {status} Points
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Base Water Parameters */}
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <h2 className="text-2xl font-semibold mb-6">Base Water Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-6 text-sm">
            {Object.entries(base_water_parameters).map(([key, param]) => (
              <div
                key={key}
                className="flex justify-between border-b pb-3 last:border-0"
              >
                <span className="text-gray-600 capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="font-semibold">
                  {param.value} {param.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 py-6">
          Database: {data.database_used} • pH Mode: {data.ph_mode} • Balance:{" "}
          {data.balance_cation} / {data.balance_anion}
        </div>
      </div>
    </div>
  );
};

export default O2SaturationAnalysis;
