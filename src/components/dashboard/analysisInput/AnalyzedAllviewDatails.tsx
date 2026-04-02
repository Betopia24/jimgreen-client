// "use client";

// import Image from "next/image";
// import React from "react";
// import ScoreCard from "./detailsComonents/ScoreCard";
// import { useSelector } from "react-redux";
// import PageHeader from "../PageHeader";
// import Link from "next/link";
// import { GoArrowRight } from "react-icons/go";
// import GraphSection from "./detailsComonents/ReportGrap";

// interface Props {
//   data: any;
// }

// const badge = (status: string) => {
//   const s = status?.toLowerCase();

//   if (["passed", "safe", "low", "optimal", "good"].includes(s))
//     return "bg-green-100 text-green-600";

//   if (["failed", "critical"].includes(s)) return "bg-red-100 text-red-600";

//   if (["pending", "warning"].includes(s))
//     return "bg-yellow-100 text-yellow-600";

//   return "bg-gray-100 text-gray-600";
// };

// export const Section = ({ title, children }: any) => (
//   <div className="bg-white rounded-xl shadow border p-6 space-y-4">
//     <h2 className="text-xl font-semibold border-b pb-2">{title}</h2>
//     {children}
//   </div>
// );
// const InfoItem = ({ label, value }: any) => (
//   <div className="bg-gray-50 p-4 rounded-lg border">
//     <p className="text-gray-500 text-xs">{label}</p>
//     <p className="font-medium text-gray-800">{value || "N/A"}</p>
//   </div>
// );

// const InfoCard = ({ label, value }: any) => (
//   <div className="bg-gray-50 border rounded-lg p-4">
//     <p className="text-xs text-gray-500">{label}</p>
//     <p className="font-semibold text-gray-800">{value ?? "N/A"}</p>
//   </div>
// );

// // Contamination Risk===============================

// const RiskTable = ({ title, data }: any) => (
//   <div className="mb-8">
//     <h3 className="font-semibold text-lg mb-3">{title}</h3>

//     <div className="overflow-auto border rounded-lg">
//       <table className="min-w-full text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border text-left">Contaminant</th>
//             <th className="p-2 border text-center">Value</th>
//             <th className="p-2 border text-center">Threshold</th>
//             <th className="p-2 border text-center">Risk Level</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item: any, i: number) => (
//             <tr key={i} className="hover:bg-gray-50 text-center">
//               <td className="border p-2 text-left font-medium">
//                 {item.contaminant_name.replaceAll("_", " ")}
//               </td>
//               <td className="border p-2">
//                 {item.value} {item.unit}
//               </td>
//               <td className="border p-2">
//                 {item.threshold} {item.unit}
//               </td>
//               <td className="border p-2">
//                 <span
//                   className={`px-2 py-1 rounded text-xs font-medium ${
//                     item.risk_level === "Critical"
//                       ? "bg-red-100 text-red-600"
//                       : item.risk_level === "Moderate"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-green-100 text-green-600"
//                   }`}
//                 >
//                   {item.risk_level}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// const RiskCard = ({ label, value, highlight }: any) => (
//   <div className="bg-gray-50 border rounded-xl p-4">
//     <p className="text-xs text-gray-500">{label}</p>
//     <p
//       className={`font-bold text-lg ${
//         highlight
//           ? value === "Critical"
//             ? "text-red-600"
//             : value === "Moderate"
//               ? "text-yellow-600"
//               : "text-green-600"
//           : "text-gray-800"
//       }`}
//     >
//       {value ?? "N/A"}
//     </p>
//   </div>
// );

// // ============================ Main Component =============================

// const WaterFullReport: React.FC<Props> = ({ data }) => {
//   const analysisViewData = useSelector(
//     (state: any) => state.analysis.analysisAllData,
//   );
//   // const report = data?.data.waterReport;
//   const report = analysisViewData;

//   console.log("analysisViewData", report);

//   const statusBadge = (status: string) => {
//     switch (status) {
//       case "Safe":
//         return "bg-green-100 text-green-700";
//       case "Unsafe":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   const riskBadge = (risk: string) => {
//     switch (risk) {
//       case "Low":
//         return "bg-blue-100 text-blue-700";
//       case "Medium":
//         return "bg-yellow-100 text-yellow-700";
//       case "High":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* heading part  */}
//       <div className="flex items-center justify-between">
//         <PageHeader
//           title="Chemical Analysis Graphs"
//           description="Interactive visualization of water quality parameters"
//         />
//         <Link
//           href={`/dashboard/analysisInput/analysisChemistyInput?id=${analysisViewData.id} `}
//         >
//           <button
//             type="submit"
//             className="px-4 py-3 bg-primaryColor text-[#FFFFFF] font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer flex items-center justify-center gap-2"
//           >
//             <span>Recalculation </span>
//             <GoArrowRight size={20} className="text-white" />
//           </button>
//         </Link>
//       </div>
//       {/* GRAPH */}

//       <GraphSection report={report} id={analysisViewData.id} />

//       {/* CUSTOMER INFO */}
//       {/* <Section title="Customer Information">
//         <div className="grid md:grid-cols-2 gap-4 text-sm">
//           {Object.entries(data?.data?.customer || {}).map(([key, value]) => (
//             <div key={key}>
//               <span className="font-medium capitalize">{key}: </span>
//               {String(value)}
//             </div>
//           ))}
//         </div>
//       </Section> */}

//       {/* REPORT META */}
//       <Section title="Report Information">
//         <div className="grid md:grid-cols-2 gap-6 text-sm">
//           <InfoItem label="Report ID" value={report?.report_id} />
//           <InfoItem
//             label="original filename"
//             value={report?.original_filename}
//           />
//           <InfoItem label="Lab Name" value={report?.lab_name} />
//           <InfoItem label="Water Source" value={report?.water_source} />
//         </div>
//       </Section>

//       {/* EXTRACTED PARAMETERS */}
//       <Section title="Extracted Parameters">
//         <div className="grid md:grid-cols-3 gap-4">
//           {Object.entries(report?.extracted_parameters || {}).map(
//             ([name, val]: any) => (
//               <div key={name} className="border rounded p-3">
//                 <p className="font-medium">{name}</p>
//                 <p>
//                   {val.value} {val.unit}
//                 </p>
//               </div>
//             ),
//           )}
//         </div>
//       </Section>

//       <Section title="Chemical Analysis Report">
//         {/* 1️⃣ INPUT PARAMETERS TABLE */}
//         <div>
//           <h3 className="font-semibold text-lg mb-3">Input Parameters</h3>
//           <div className="overflow-auto border rounded-lg">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 border text-left">Parameter</th>
//                   <th className="p-2 border text-center">Value</th>
//                   <th className="p-2 border text-center">Unit</th>
//                   {/* <th className="p-2 border text-center">Detection Limit</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(
//                   report?.chemical_status?.input_parameters || {},
//                 ).map(([name, param]: any, i: number) => (
//                   <tr key={i} className="hover:bg-gray-50">
//                     <td className="border p-2 font-medium">
//                       {name.replaceAll("_", " ")}
//                     </td>
//                     <td className="border p-2 text-center">{param.value}</td>
//                     <td className="border p-2 text-center">
//                       {param.unit || "-"}
//                     </td>
//                     {/* <td className="border p-2 text-center">
//                       {param.detection_limit ?? "-"}
//                     </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* 2️⃣ SOLUTION PARAMETERS */}
//         <div className="mt-8">
//           <h3 className="font-semibold text-lg mb-3">Solution Parameters</h3>
//           <div className="grid md:grid-cols-4 gap-4">
//             {Object.entries(
//               report?.chemical_status?.solution_parameters || {},
//             ).map(([key, value]: any, i: number) => (
//               <div key={i} className="bg-gray-50 border rounded-lg p-4">
//                 <p className="text-xs text-gray-500 capitalize">
//                   {key.replaceAll("_", " ")}
//                 </p>
//                 <p className="font-semibold text-gray-800">{value ?? "N/A"}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 3️⃣ BALANCE INFORMATION */}
//         <div className="mt-8">
//           <h3 className="font-semibold text-lg mb-3">
//             Charge & Electrical Balance
//           </h3>
//           <div className="grid md:grid-cols-3 gap-4">
//             <InfoCard
//               label="Charge Balance Error"
//               value={report?.chemical_status?.charge_balance_error}
//             />
//             <InfoCard
//               label="Electrical Balance"
//               value={report?.chemical_status?.electrical_balance}
//             />
//             <InfoCard
//               label="Ionic Strength"
//               value={report?.chemical_status?.ionic_strength}
//             />
//           </div>
//         </div>

//         {/* 4️⃣ DATABASE INFO */}
//         <div className="mt-8">
//           <h3 className="font-semibold text-lg mb-3">Database Information</h3>
//           <div className="bg-gray-50 border rounded-lg p-4">
//             <p className="text-sm">
//               <span className="font-medium">Database Used:</span>{" "}
//               {report?.chemical_status?.database_used}
//             </p>
//           </div>
//         </div>
//       </Section>

//       {/* TOTAL SCORE */}
//       <Section title="Total Score">
//         <div className="space-y-4">
//           <div>
//             Overall Score:{" "}
//             <span className="font-bold">
//               {report?.total_score?.overall_score}/
//               {report?.total_score?.max_score}
//             </span>
//             <span
//               className={`ml-3 px-2 py-1 rounded text-sm ${badge(
//                 report?.total_score?.rating,
//               )}`}
//             >
//               {report?.total_score?.rating}
//             </span>
//           </div>

//           <div className="grid md:grid-cols-4 gap-4">
//             {report?.total_score?.components?.map((comp: any, i: number) => (
//               <div key={i} className="bg-gray-50 p-4 rounded text-center">
//                 <p className="font-semibold">{comp.name}</p>
//                 <p className="font-bold">
//                   {comp.score}/{comp.max_score}
//                 </p>
//                 <p className="text-xs mt-1 te">weight: {comp.weight}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Section>

//       {/* QUALITY REPORT */}
//       <Section title="Quality Assessment Summary">
//         <div className="grid md:grid-cols-3 gap-6">
//           {/* 1️⃣ Water Quality Index */}
//           <ScoreCard
//             title="Water Quality Index"
//             score={report?.quality_report?.water_quality_index?.score}
//             maxScore={report?.quality_report?.water_quality_index?.max_score}
//             rating={report?.quality_report?.water_quality_index?.rating}
//           />

//           {/* 2️⃣ Compliance Score */}
//           <ScoreCard
//             title="Compliance Score"
//             score={report?.quality_report?.compliance_score?.score}
//             maxScore={100}
//             rating={report?.quality_report?.compliance_score?.rating}
//             percentage
//           />

//           {/* 3️⃣ Risk Factor */}
//           <ScoreCard
//             title="Risk Factor"
//             score={report?.quality_report?.risk_factor?.score}
//             maxScore={report?.quality_report?.risk_factor?.max_score}
//             rating={report?.quality_report?.risk_factor?.severity}
//             danger
//           />
//         </div>
//       </Section>

//       {/* CHEMICAL COMPOSITION */}
//       <Section title="Chemical Composition">
//         <div className="overflow-auto">
//           <table className="min-w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 border">Name</th>
//                 <th className="p-2 border">Value</th>
//                 <th className="p-2 border">Unit</th>
//                 <th className="p-2 border">Category</th>
//                 <th className="p-2 border">Symbol</th>
//                 <th className="p-2 border">Formula</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report?.chemical_composition?.parameters?.map(
//                 (p: any, i: number) => (
//                   <tr key={i} className="text-center">
//                     <td className="border p-2">{p.parameter_name}</td>
//                     <td className="border p-2">{p.value}</td>
//                     <td className="border p-2">{p.unit}</td>
//                     <td className="border p-2">{p.category}</td>
//                     <td className="border p-2">{p.chemical_symbol}</td>
//                     <td className="border p-2">{p.chemical_formula}</td>
//                   </tr>
//                 ),
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Section>

//       {/* BIOLOGICAL */}
//       {/* <Section title="Biological Indicators">
//         {report?.biological_indicators?.indicators?.map(
//           (bio: any, i: number) => (
//             <div key={i} className="flex justify-between border-b pb-2">
//               <span>{bio.indicator_name}</span>
//               <span
//                 className={`px-2 py-1 rounded text-xs ${badge(bio.status)}`}
//               >
//                 {bio.status}
//               </span>
//             </div>
//           ),
//         )}
//       </Section> */}

//       {/* BIOLOGICAL */}
//       <Section title="Biological Indicators">
//         <div className="space-y-4">
//           {report?.biological_indicators?.indicators?.map(
//             (bio: any, i: number) => (
//               <div
//                 key={i}
//                 className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
//               >
//                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                   {/* Left Side */}
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
//                       {bio.indicator_name}
//                     </h4>
//                     <p className="text-xs text-gray-500 sm:text-sm">
//                       {bio.value} {bio.unit}
//                     </p>
//                   </div>

//                   {/* Right Side */}
//                   <div className="flex flex-wrap items-center gap-2">
//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
//                         bio.status,
//                       )}`}
//                     >
//                       {bio.status}
//                     </span>

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-medium ${riskBadge(
//                         bio.risk_level,
//                       )}`}
//                     >
//                       {bio.risk_level} Risk
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ),
//           )}

//           {/* Empty State */}
//           {!report?.biological_indicators?.indicators?.length && (
//             <div className="text-center py-6 text-gray-500 text-sm">
//               No biological indicators found
//             </div>
//           )}
//         </div>
//       </Section>

//       {/* COMPLIANCE TABLE */}
//       <Section title="Compliance Checklist">
//         <div className="overflow-auto">
//           <table className="min-w-full text-xs border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2">Parameter</th>
//                 <th className="border p-2">Standard</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actual</th>
//                 <th className="border p-2">Required</th>
//                 <th className="border p-2">remarks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report?.compliance_checklist?.items?.map(
//                 (item: any, i: number) => (
//                   <tr key={i} className="text-center">
//                     <td className="border p-2">{item.parameter}</td>
//                     <td className="border p-2">{item.standard}</td>
//                     <td className="border p-2">
//                       <span
//                         className={`px-2 py-1 rounded text-xs ${badge(
//                           item.status,
//                         )}`}
//                       >
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="border p-2">{item.actual_value}</td>
//                     <td className="border p-2">{item.required_value}</td>
//                     <td className="border p-2">{item.remarks}</td>
//                   </tr>
//                 ),
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Section>

//       {/* CONTAMINATION RISK */}
//       {/* CONTAMINATION RISK */}
//       <Section title="Contamination Risk Assessment">
//         {/* 🔴 Overall Risk Summary */}
//         <div className="mb-8 grid md:grid-cols-3 gap-4">
//           <RiskCard
//             label="Overall Severity"
//             value={report?.contamination_risk?.overall_severity}
//             highlight
//           />
//           <RiskCard
//             label="Contamination Score"
//             value={report?.contamination_risk?.contamination_score}
//           />
//           <RiskCard
//             label="Risk Score"
//             value={report?.contamination_risk?.risk_score}
//           />
//           {/* <RiskCard label="Score Scale" value="0 = Safe | 10 = Critical" /> */}
//         </div>

//         {/* 🧪 Heavy Metals */}
//         {report?.contamination_risk?.heavy_metals?.length > 0 && (
//           <RiskTable
//             title="Heavy Metals"
//             data={report?.contamination_risk?.heavy_metals}
//           />
//         )}

//         {/* 🦠 Microbiological */}
//         {report?.contamination_risk?.microbiological?.length > 0 && (
//           <RiskTable
//             title="Microbiological Contaminants"
//             data={report?.contamination_risk?.microbiological}
//           />
//         )}

//         {/* 🧫 Organic Compounds */}
//         {report?.contamination_risk?.organic_compounds?.length > 0 && (
//           <RiskTable
//             title="Organic Compounds"
//             data={report?.contamination_risk?.organic_compounds}
//           />
//         )}
//       </Section>
//     </div>
//   );
// };

// export default WaterFullReport;

// "use client";

// import React from "react";
// import { useSelector } from "react-redux";
// import ScoreCard from "./detailsComonents/ScoreCard";
// import PageHeader from "../PageHeader";
// import Link from "next/link";
// import { GoArrowRight } from "react-icons/go";
// import GraphSection from "./detailsComonents/ReportGrap";

// interface Props {
//   data?: any;
// }

// // ─── Helpers ────────────────────────────────────────────────────────────────

// const badge = (status: string) => {
//   const s = status?.toLowerCase();
//   if (["passed", "safe", "low", "optimal", "good"].includes(s))
//     return "bg-green-100 text-green-600";
//   if (["failed", "critical"].includes(s)) return "bg-red-100 text-red-600";
//   if (["pending", "warning"].includes(s))
//     return "bg-yellow-100 text-yellow-600";
//   return "bg-gray-100 text-gray-600";
// };

// const statusBadge = (status: string) => {
//   if (status === "Safe") return "bg-green-100 text-green-700";
//   if (status === "Unsafe") return "bg-red-100 text-red-700";
//   return "bg-gray-100 text-gray-600";
// };

// const riskBadge = (risk: string) => {
//   if (risk === "Low") return "bg-blue-100 text-blue-700";
//   if (risk === "Medium") return "bg-yellow-100 text-yellow-700";
//   if (risk === "High") return "bg-red-100 text-red-700";
//   return "bg-gray-100 text-gray-600";
// };

// // ─── Sub-components ──────────────────────────────────────────────────────────

// export const Section = ({ title, children }: any) => (
//   <div className="bg-white rounded-xl shadow border p-6 space-y-4">
//     <h2 className="text-xl font-semibold border-b pb-2">{title}</h2>
//     {children}
//   </div>
// );

// const InfoItem = ({ label, value }: any) => (
//   <div className="bg-gray-50 p-4 rounded-lg border">
//     <p className="text-gray-500 text-xs">{label}</p>
//     <p className="font-medium text-gray-800">{value || "N/A"}</p>
//   </div>
// );

// const InfoCard = ({ label, value }: any) => (
//   <div className="bg-gray-50 border rounded-lg p-4">
//     <p className="text-xs text-gray-500">{label}</p>
//     <p className="font-semibold text-gray-800">{value ?? "N/A"}</p>
//   </div>
// );

// const RiskCard = ({ label, value, highlight }: any) => (
//   <div className="bg-gray-50 border rounded-xl p-4">
//     <p className="text-xs text-gray-500">{label}</p>
//     <p
//       className={`font-bold text-lg ${
//         highlight
//           ? value === "Critical"
//             ? "text-red-600"
//             : value === "Moderate"
//               ? "text-yellow-600"
//               : "text-green-600"
//           : "text-gray-800"
//       }`}
//     >
//       {value ?? "N/A"}
//     </p>
//   </div>
// );

// const RiskTable = ({ title, data }: any) => (
//   <div className="mb-8">
//     <h3 className="font-semibold text-lg mb-3">{title}</h3>
//     <div className="overflow-auto border rounded-lg">
//       <table className="min-w-full text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border text-left">Contaminant</th>
//             <th className="p-2 border text-center">Value</th>
//             <th className="p-2 border text-center">Threshold</th>
//             <th className="p-2 border text-center">Risk Level</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item: any, i: number) => (
//             <tr key={i} className="hover:bg-gray-50 text-center">
//               <td className="border p-2 text-left font-medium">
//                 {item.contaminant_name.replaceAll("_", " ")}
//               </td>
//               <td className="border p-2">
//                 {item.value} {item.unit}
//               </td>
//               <td className="border p-2">
//                 {item.threshold} {item.unit}
//               </td>
//               <td className="border p-2">
//                 <span
//                   className={`px-2 py-1 rounded text-xs font-medium ${
//                     item.risk_level === "Critical"
//                       ? "bg-red-100 text-red-600"
//                       : item.risk_level === "Moderate"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-green-100 text-green-600"
//                   }`}
//                 >
//                   {item.risk_level}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// // ─── Main Component ───────────────────────────────────────────────────────────

// const WaterFullReport: React.FC<Props> = ({ data }) => {
//   // Pull raw API data from Redux
//   const analysisViewData = useSelector(
//     (state: any) => state.analysis.analysisAllData,
//   );

//   // ── Map camelCase API keys → component-friendly names ──────────────────────
//   // The backend returns camelCase; unify everything here so the JSX below
//   // stays clean and readable regardless of future API changes.
//   const raw = analysisViewData ?? data?.data ?? {};

//   const report = {
//     // identifiers
//     report_id: raw.aiReportId,
//     original_filename: raw.originalFilename,
//     lab_name: raw.asset?.name, // closest "lab name" equivalent
//     water_source: raw.asset?.type,

//     // extracted parameters (already snake_case from API)
//     extracted_parameters: raw.extractedParameters ?? {},
//     parameterGraph: raw.parameterGraph ?? {},

//     // chemical status block
//     chemical_status: {
//       input_parameters:
//         raw.chemicalStatus?.input_parameters ??
//         raw.chemicalStatus?.inputParameters ??
//         raw.extractedParameters ??
//         {},
//       solution_parameters:
//         raw.chemicalStatus?.solution_parameters ??
//         raw.chemicalStatus?.solutionParameters ??
//         {},
//       saturation_indices:
//         raw.chemicalStatus?.saturation_indices ??
//         raw.chemicalStatus?.saturationIndices ??
//         [],
//       charge_balance_error:
//         raw.chemicalStatus?.charge_balance_error ??
//         raw.chemicalStatus?.chargeBalanceError ??
//         0,
//       electrical_balance:
//         raw.chemicalStatus?.electrical_balance ??
//         raw.chemicalStatus?.electricalBalance ??
//         "N/A",
//       ionic_strength:
//         raw.chemicalStatus?.ionic_strength ??
//         raw.chemicalStatus?.ionicStrength ??
//         "N/A",
//       database_used:
//         raw.chemicalStatus?.database_used ??
//         raw.chemicalStatus?.databaseUsed ??
//         "N/A",
//     },

//     // scores
//     total_score: {
//       overall_score:
//         raw.totalScore?.overall_score ?? raw.totalScore?.overallScore,
//       max_score: raw.totalScore?.max_score ?? raw.totalScore?.maxScore,
//       rating: raw.totalScore?.rating,
//       components: raw.totalScore?.components ?? [],
//     },

//     // quality report
//     quality_report: {
//       water_quality_index: {
//         score:
//           raw.qualityReport?.water_quality_index?.score ??
//           raw.qualityReport?.waterQualityIndex?.score,
//         max_score:
//           raw.qualityReport?.water_quality_index?.max_score ??
//           raw.qualityReport?.waterQualityIndex?.max_score ??
//           raw.qualityReport?.waterQualityIndex?.maxScore,
//         rating:
//           raw.qualityReport?.water_quality_index?.rating ??
//           raw.qualityReport?.waterQualityIndex?.rating,
//       },
//       compliance_score: {
//         score:
//           raw.qualityReport?.compliance_score?.score ??
//           raw.qualityReport?.complianceScore?.score,
//         rating:
//           raw.qualityReport?.compliance_score?.rating ??
//           raw.qualityReport?.complianceScore?.rating,
//       },
//       risk_factor: {
//         score:
//           raw.qualityReport?.risk_factor?.score ??
//           raw.qualityReport?.riskFactor?.score,
//         max_score:
//           raw.qualityReport?.risk_factor?.max_score ??
//           raw.qualityReport?.riskFactor?.max_score ??
//           raw.qualityReport?.riskFactor?.maxScore,
//         severity:
//           raw.qualityReport?.risk_factor?.severity ??
//           raw.qualityReport?.riskFactor?.severity,
//       },
//     },

//     // chemical composition
//     chemical_composition: {
//       parameters: raw.chemicalComposition?.parameters ?? [],
//       summary: raw.chemicalComposition?.summary ?? "",
//     },

//     // biological indicators
//     biological_indicators: {
//       indicators: raw.biologicalIndicators?.indicators ?? [],
//       overall_status:
//         raw.biologicalIndicators?.overall_status ??
//         raw.biologicalIndicators?.overallStatus ??
//         "N/A",
//     },

//     // compliance
//     compliance_checklist: {
//       items: raw.complianceChecklist?.items ?? [],
//       overall_compliance:
//         raw.complianceChecklist?.overall_compliance ??
//         raw.complianceChecklist?.overallCompliance,
//       passed_count:
//         raw.complianceChecklist?.passed_count ??
//         raw.complianceChecklist?.passedCount,
//       failed_count:
//         raw.complianceChecklist?.failed_count ??
//         raw.complianceChecklist?.failedCount,
//       pending_count:
//         raw.complianceChecklist?.pending_count ??
//         raw.complianceChecklist?.pendingCount,
//     },

//     // contamination risk
//     contamination_risk: {
//       heavy_metals:
//         raw.contaminationRisk?.heavy_metals ??
//         raw.contaminationRisk?.heavyMetals ??
//         [],
//       organic_compounds:
//         raw.contaminationRisk?.organic_compounds ??
//         raw.contaminationRisk?.organicCompounds ??
//         [],
//       microbiological: raw.contaminationRisk?.microbiological ?? [],
//       overall_severity:
//         raw.contaminationRisk?.overall_severity ??
//         raw.contaminationRisk?.overallSeverity,
//       contamination_score:
//         raw.contaminationRisk?.contamination_score ??
//         raw.contaminationRisk?.contaminationScore,
//       risk_score:
//         raw.contaminationRisk?.risk_score ?? raw.contaminationRisk?.riskScore,
//     },
//   };

//   // ─────────────────────────────────────────────────────────────────────────

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <PageHeader
//           title="Chemical Analysis Graphs"
//           description="Interactive visualization of water quality parameters"
//         />
//         <Link
//           href={`/dashboard/analysisInput/analysisChemistyInput?id=${raw.id}`}
//         >
//           <button
//             type="button"
//             className="px-4 py-3 bg-primaryColor text-white font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer flex items-center justify-center gap-2"
//           >
//             <span>Recalculation</span>
//             <GoArrowRight size={20} className="text-white" />
//           </button>
//         </Link>
//       </div>

//       {/* Graph */}
//       <GraphSection report={report} id={raw.id} />

//       {/* Report Information */}
//       <Section title="Report Information">
//         <div className="grid md:grid-cols-2 gap-6 text-sm">
//           <InfoItem label="Report ID" value={report.report_id} />
//           <InfoItem
//             label="Original Filename"
//             value={report.original_filename}
//           />
//           <InfoItem label="Lab / Asset Name" value={report.lab_name} />
//           <InfoItem label="Water Source Type" value={report.water_source} />
//         </div>
//       </Section>

//       {/* Extracted Parameters */}
//       <Section title="Extracted Parameters">
//         <div className="grid md:grid-cols-3 gap-4">
//           {Object.entries(report.extracted_parameters).map(
//             ([name, val]: any) => (
//               <div key={name} className="border rounded p-3">
//                 <p className="font-medium">{name.replaceAll("_", " ")}</p>
//                 <p>
//                   {val.value} {val.unit}
//                 </p>
//               </div>
//             ),
//           )}
//         </div>
//       </Section>

//       {/* Chemical Analysis Report */}
//       <Section title="Chemical Analysis Report">
//         {/* Input Parameters */}
//         <div>
//           <h3 className="font-semibold text-lg mb-3">Input Parameters</h3>
//           <div className="overflow-auto border rounded-lg">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 border text-left">Parameter</th>
//                   <th className="p-2 border text-center">Value</th>
//                   <th className="p-2 border text-center">Unit</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(report.chemical_status.input_parameters).map(
//                   ([name, param]: any, i) => (
//                     <tr key={i} className="hover:bg-gray-50">
//                       <td className="border p-2 font-medium">
//                         {name.replaceAll("_", " ")}
//                       </td>
//                       <td className="border p-2 text-center">{param.value}</td>
//                       <td className="border p-2 text-center">
//                         {param.unit || "-"}
//                       </td>
//                     </tr>
//                   ),
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Solution Parameters */}
//         <div className="mt-8">
//           <h3 className="font-semibold text-lg mb-3">Solution Parameters</h3>
//           <div className="grid md:grid-cols-4 gap-4">
//             {Object.entries(report.chemical_status.solution_parameters).map(
//               ([key, value]: any, i) => (
//                 <div key={i} className="bg-gray-50 border rounded-lg p-4">
//                   <p className="text-xs text-gray-500 capitalize">
//                     {key.replaceAll("_", " ")}
//                   </p>
//                   <p className="font-semibold text-gray-800">
//                     {value ?? "N/A"}
//                   </p>
//                 </div>
//               ),
//             )}
//           </div>
//         </div>

//         {/* Charge & Electrical Balance */}
//         <div className="mt-8">
//           <h3 className="font-semibold text-lg mb-3">
//             Charge &amp; Electrical Balance
//           </h3>
//           <div className="grid md:grid-cols-3 gap-4">
//             <InfoCard
//               label="Charge Balance Error"
//               value={report.chemical_status.charge_balance_error}
//             />
//             <InfoCard
//               label="Electrical Balance"
//               value={report.chemical_status.electrical_balance}
//             />
//             <InfoCard
//               label="Ionic Strength"
//               value={report.chemical_status.ionic_strength}
//             />
//           </div>
//         </div>

//         {/* Database Info */}
//         <div className="mt-8">
//           <h3 className="font-semibold text-lg mb-3">Database Information</h3>
//           <div className="bg-gray-50 border rounded-lg p-4">
//             <p className="text-sm">
//               <span className="font-medium">Database Used:</span>{" "}
//               {report.chemical_status.database_used}
//             </p>
//           </div>
//         </div>
//       </Section>

//       {/* Total Score */}
//       <Section title="Total Score">
//         <div className="space-y-4">
//           <div>
//             Overall Score:{" "}
//             <span className="font-bold">
//               {report.total_score.overall_score}/{report.total_score.max_score}
//             </span>
//             <span
//               className={`ml-3 px-2 py-1 rounded text-sm ${badge(
//                 report.total_score.rating,
//               )}`}
//             >
//               {report.total_score.rating}
//             </span>
//           </div>
//           <div className="grid md:grid-cols-4 gap-4">
//             {report.total_score.components.map((comp: any, i: number) => (
//               <div key={i} className="bg-gray-50 p-4 rounded text-center">
//                 <p className="font-semibold">{comp.name}</p>
//                 <p className="font-bold">
//                   {comp.score}/{comp.max_score}
//                 </p>
//                 <p className="text-xs mt-1">weight: {comp.weight}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Section>

//       {/* Quality Assessment Summary */}
//       <Section title="Quality Assessment Summary">
//         <div className="grid md:grid-cols-3 gap-6">
//           <ScoreCard
//             title="Water Quality Index"
//             score={report.quality_report.water_quality_index.score}
//             maxScore={report.quality_report.water_quality_index.max_score}
//             rating={report.quality_report.water_quality_index.rating}
//           />
//           <ScoreCard
//             title="Compliance Score"
//             score={report.quality_report.compliance_score.score}
//             maxScore={100}
//             rating={report.quality_report.compliance_score.rating}
//             percentage
//           />
//           <ScoreCard
//             title="Risk Factor"
//             score={report.quality_report.risk_factor.score}
//             maxScore={report.quality_report.risk_factor.max_score}
//             rating={report.quality_report.risk_factor.severity}
//             danger
//           />
//         </div>
//       </Section>

//       {/* Chemical Composition */}
//       <Section title="Chemical Composition">
//         <div className="overflow-auto">
//           <table className="min-w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 border">Name</th>
//                 <th className="p-2 border">Value</th>
//                 <th className="p-2 border">Unit</th>
//                 <th className="p-2 border">Category</th>
//                 <th className="p-2 border">Symbol</th>
//                 <th className="p-2 border">Formula</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.chemical_composition.parameters.map(
//                 (p: any, i: number) => (
//                   <tr key={i} className="text-center">
//                     <td className="border p-2">{p.parameter_name}</td>
//                     <td className="border p-2">{p.value}</td>
//                     <td className="border p-2">{p.unit}</td>
//                     <td className="border p-2">{p.category}</td>
//                     <td className="border p-2">{p.chemical_symbol}</td>
//                     <td className="border p-2">{p.chemical_formula}</td>
//                   </tr>
//                 ),
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Section>

//       {/* Biological Indicators */}
//       <Section title="Biological Indicators">
//         <div className="space-y-4">
//           {report.biological_indicators.indicators.map(
//             (bio: any, i: number) => (
//               <div
//                 key={i}
//                 className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
//               >
//                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
//                       {bio.indicator_name}
//                     </h4>
//                     <p className="text-xs text-gray-500 sm:text-sm">
//                       {bio.value} {bio.unit}
//                     </p>
//                   </div>
//                   <div className="flex flex-wrap items-center gap-2">
//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
//                         bio.status,
//                       )}`}
//                     >
//                       {bio.status}
//                     </span>
//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-medium ${riskBadge(
//                         bio.risk_level,
//                       )}`}
//                     >
//                       {bio.risk_level} Risk
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ),
//           )}
//           {!report.biological_indicators.indicators.length && (
//             <div className="text-center py-6 text-gray-500 text-sm">
//               No biological indicators found
//             </div>
//           )}
//         </div>
//       </Section>

//       {/* Compliance Checklist */}
//       <Section title="Compliance Checklist">
//         <div className="overflow-auto">
//           <table className="min-w-full text-xs border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2">Parameter</th>
//                 <th className="border p-2">Standard</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actual</th>
//                 <th className="border p-2">Required</th>
//                 <th className="border p-2">Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.compliance_checklist.items.map((item: any, i: number) => (
//                 <tr key={i} className="text-center">
//                   <td className="border p-2">{item.parameter}</td>
//                   <td className="border p-2">{item.standard}</td>
//                   <td className="border p-2">
//                     <span
//                       className={`px-2 py-1 rounded text-xs ${badge(
//                         item.status,
//                       )}`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="border p-2">{item.actual_value ?? "-"}</td>
//                   <td className="border p-2">{item.required_value}</td>
//                   <td className="border p-2">{item.remarks}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Section>

//       {/* Contamination Risk */}
//       <Section title="Contamination Risk Assessment">
//         <div className="mb-8 grid md:grid-cols-3 gap-4">
//           <RiskCard
//             label="Overall Severity"
//             value={report.contamination_risk.overall_severity}
//             highlight
//           />
//           <RiskCard
//             label="Contamination Score"
//             value={report.contamination_risk.contamination_score}
//           />
//           <RiskCard
//             label="Risk Score"
//             value={report.contamination_risk.risk_score}
//           />
//         </div>

//         {report.contamination_risk.heavy_metals.length > 0 && (
//           <RiskTable
//             title="Heavy Metals"
//             data={report.contamination_risk.heavy_metals}
//           />
//         )}
//         {report.contamination_risk.microbiological.length > 0 && (
//           <RiskTable
//             title="Microbiological Contaminants"
//             data={report.contamination_risk.microbiological}
//           />
//         )}
//         {report.contamination_risk.organic_compounds.length > 0 && (
//           <RiskTable
//             title="Organic Compounds"
//             data={report.contamination_risk.organic_compounds}
//           />
//         )}
//       </Section>
//     </div>
//   );
// };

// export default WaterFullReport;

"use client";

import React from "react";
import { useSelector } from "react-redux";
import ScoreCard from "./detailsComonents/ScoreCard";
import PageHeader from "../PageHeader";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import GraphSection from "./detailsComonents/ReportGrap";

interface Props {
  data?: any;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const badge = (status: string) => {
  const s = status?.toLowerCase();
  if (["passed", "safe", "low", "optimal", "good"].includes(s))
    return "bg-green-100 text-green-600";
  if (["failed", "critical"].includes(s)) return "bg-red-100 text-red-600";
  if (["pending", "warning"].includes(s))
    return "bg-yellow-100 text-yellow-600";
  return "bg-gray-100 text-gray-600";
};

const statusBadge = (status: string) => {
  if (status === "Safe") return "bg-green-100 text-green-700";
  if (status === "Unsafe") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
};

const riskBadge = (risk: string) => {
  if (risk === "Low") return "bg-blue-100 text-blue-700";
  if (risk === "Medium") return "bg-yellow-100 text-yellow-700";
  if (risk === "High") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
};

// ─── Sub-components ──────────────────────────────────────────────────────────

export const Section = ({ title, children }: any) => (
  <div className="bg-white rounded-xl shadow border p-6 space-y-4">
    <h2 className="text-xl font-semibold border-b pb-2">{title}</h2>
    {children}
  </div>
);

const InfoItem = ({ label, value }: any) => (
  <div className="bg-gray-50 p-4 rounded-lg border">
    <p className="text-gray-500 text-xs">{label}</p>
    <p className="font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);

const InfoCard = ({ label, value }: any) => (
  <div className="bg-gray-50 border rounded-lg p-4">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value ?? "N/A"}</p>
  </div>
);

const RiskCard = ({ label, value, highlight }: any) => (
  <div className="bg-gray-50 border rounded-xl p-4">
    <p className="text-xs text-gray-500">{label}</p>
    <p
      className={`font-bold text-lg ${
        highlight
          ? value === "Critical"
            ? "text-red-600"
            : value === "Moderate"
              ? "text-yellow-600"
              : "text-green-600"
          : "text-gray-800"
      }`}
    >
      {value ?? "N/A"}
    </p>
  </div>
);

const RiskTable = ({ title, data }: any) => (
  <div className="mb-8">
    <h3 className="font-semibold text-lg mb-3">{title}</h3>
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-left">Contaminant</th>
            <th className="p-2 border text-center">Value</th>
            <th className="p-2 border text-center">Threshold</th>
            <th className="p-2 border text-center">Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, i: number) => (
            <tr key={i} className="hover:bg-gray-50 text-center">
              <td className="border p-2 text-left font-medium">
                {item.contaminant_name.replaceAll("_", " ")}
              </td>
              <td className="border p-2">
                {item.value} {item.unit}
              </td>
              <td className="border p-2">
                {item.threshold} {item.unit}
              </td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.risk_level === "Critical"
                      ? "bg-red-100 text-red-600"
                      : item.risk_level === "Moderate"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.risk_level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const WaterFullReport: React.FC<Props> = ({ data }) => {
  // Pull raw API data from Redux
  const analysisViewData = useSelector(
    (state: any) => state.analysis.analysisAllData,
  );

  // ── Map camelCase API keys → component-friendly names ──────────────────────
  // The backend returns camelCase; unify everything here so the JSX below
  // stays clean and readable regardless of future API changes.
  const raw = analysisViewData ?? data?.data ?? {};

  const report = {
    // identifiers
    report_id: raw.aiReportId,
    original_filename: raw.originalFilename,
    lab_name: raw.asset?.name, // closest "lab name" equivalent
    water_source: raw.asset?.type,

    // extracted parameters (already snake_case from API)
    extracted_parameters: raw.extractedParameters ?? {},
    parameterGraph: raw.parameterGraph ?? {},

    // chemical status block
    chemical_status: {
      input_parameters:
        raw.chemicalStatus?.input_parameters ??
        raw.chemicalStatus?.inputParameters ??
        raw.extractedParameters ??
        {},
      solution_parameters:
        raw.chemicalStatus?.solution_parameters ??
        raw.chemicalStatus?.solutionParameters ??
        {},
      saturation_indices:
        raw.chemicalStatus?.saturation_indices ??
        raw.chemicalStatus?.saturationIndices ??
        [],
      charge_balance_error:
        raw.chemicalStatus?.charge_balance_error ??
        raw.chemicalStatus?.chargeBalanceError ??
        0,
      electrical_balance:
        raw.chemicalStatus?.electrical_balance ??
        raw.chemicalStatus?.electricalBalance ??
        "N/A",
      ionic_strength:
        raw.chemicalStatus?.ionic_strength ??
        raw.chemicalStatus?.ionicStrength ??
        "N/A",
      database_used:
        raw.chemicalStatus?.database_used ??
        raw.chemicalStatus?.databaseUsed ??
        "N/A",
    },

    // scores
    total_score: {
      overall_score:
        raw.totalScore?.overall_score ?? raw.totalScore?.overallScore,
      max_score: raw.totalScore?.max_score ?? raw.totalScore?.maxScore,
      rating: raw.totalScore?.rating,
      components: raw.totalScore?.components ?? [],
    },

    // quality report
    quality_report: {
      water_quality_index: {
        score:
          raw.qualityReport?.water_quality_index?.score ??
          raw.qualityReport?.waterQualityIndex?.score,
        max_score:
          raw.qualityReport?.water_quality_index?.max_score ??
          raw.qualityReport?.waterQualityIndex?.max_score ??
          raw.qualityReport?.waterQualityIndex?.maxScore,
        rating:
          raw.qualityReport?.water_quality_index?.rating ??
          raw.qualityReport?.waterQualityIndex?.rating,
      },
      compliance_score: {
        score:
          raw.qualityReport?.compliance_score?.score ??
          raw.qualityReport?.complianceScore?.score,
        rating:
          raw.qualityReport?.compliance_score?.rating ??
          raw.qualityReport?.complianceScore?.rating,
      },
      risk_factor: {
        score:
          raw.qualityReport?.risk_factor?.score ??
          raw.qualityReport?.riskFactor?.score,
        max_score:
          raw.qualityReport?.risk_factor?.max_score ??
          raw.qualityReport?.riskFactor?.max_score ??
          raw.qualityReport?.riskFactor?.maxScore,
        severity:
          raw.qualityReport?.risk_factor?.severity ??
          raw.qualityReport?.riskFactor?.severity,
      },
    },

    // chemical composition
    chemical_composition: {
      parameters: raw.chemicalComposition?.parameters ?? [],
      summary: raw.chemicalComposition?.summary ?? "",
    },

    // biological indicators
    biological_indicators: {
      indicators: raw.biologicalIndicators?.indicators ?? [],
      overall_status:
        raw.biologicalIndicators?.overall_status ??
        raw.biologicalIndicators?.overallStatus ??
        "N/A",
    },

    // compliance
    compliance_checklist: {
      items: raw.complianceChecklist?.items ?? [],
      overall_compliance:
        raw.complianceChecklist?.overall_compliance ??
        raw.complianceChecklist?.overallCompliance,
      passed_count:
        raw.complianceChecklist?.passed_count ??
        raw.complianceChecklist?.passedCount,
      failed_count:
        raw.complianceChecklist?.failed_count ??
        raw.complianceChecklist?.failedCount,
      pending_count:
        raw.complianceChecklist?.pending_count ??
        raw.complianceChecklist?.pendingCount,
    },

    // contamination risk
    contamination_risk: {
      heavy_metals:
        raw.contaminationRisk?.heavy_metals ??
        raw.contaminationRisk?.heavyMetals ??
        [],
      organic_compounds:
        raw.contaminationRisk?.organic_compounds ??
        raw.contaminationRisk?.organicCompounds ??
        [],
      microbiological: raw.contaminationRisk?.microbiological ?? [],
      overall_severity:
        raw.contaminationRisk?.overall_severity ??
        raw.contaminationRisk?.overallSeverity,
      contamination_score:
        raw.contaminationRisk?.contamination_score ??
        raw.contaminationRisk?.contaminationScore,
      risk_score:
        raw.contaminationRisk?.risk_score ?? raw.contaminationRisk?.riskScore,
    },
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <PageHeader
          title="Chemical Analysis Graphs"
          description="Interactive visualization of water quality parameters"
        />
        <Link
          href={`/dashboard/analysisInput/analysisChemistyInput?id=${raw.id}`}
        >
          <button
            type="button"
            className="px-4 py-3 bg-primaryColor text-white font-medium rounded-lg hover:bg-primaryColor transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Recalculation</span>
            <GoArrowRight size={20} className="text-white" />
          </button>
        </Link>
      </div>

      {/* Graph */}
      <GraphSection report={report} id={raw.id} />

      {/* Report Information */}
      <Section title="Report Information">
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <InfoItem label="Report ID" value={report.report_id} />
          <InfoItem
            label="Original Filename"
            value={report.original_filename}
          />
          <InfoItem label="Lab / Asset Name" value={report.lab_name} />
          <InfoItem label="Water Source Type" value={report.water_source} />
        </div>
      </Section>

      {/* Extracted Parameters */}
      {/* <Section title="Extracted Parameters">
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(report.extracted_parameters).map(
            ([name, val]: any) => (
              <div key={name} className="border rounded p-3">
                <p className="font-medium">{name.replaceAll("_", " ")}</p>
                <p>
                  {val.value} {val.unit}
                </p>
              </div>
            ),
          )}
        </div>
      </Section> */}

      {/* Chemical Analysis Report */}
      <Section title="Chemical Analysis Report">
        {/* Input Parameters */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Input Parameters</h3>
          <div className="overflow-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border text-left">Parameter</th>
                  <th className="p-2 border text-center">Value</th>
                  <th className="p-2 border text-center">Unit</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(report.chemical_status.input_parameters).map(
                  ([name, param]: any, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border p-2 font-medium">
                        {name.replaceAll("_", " ")}
                      </td>
                      <td className="border p-2 text-center">{param.value}</td>
                      <td className="border p-2 text-center">
                        {param.unit || "-"}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Solution Parameters */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-3">Solution Parameters</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(report.chemical_status.solution_parameters).map(
              ([key, value]: any, i) => (
                <div key={i} className="bg-gray-50 border rounded-lg p-4">
                  <p className="text-xs text-gray-500 capitalize">
                    {key.replaceAll("_", " ")}
                  </p>
                  <p className="font-semibold text-gray-800">
                    {value ?? "N/A"}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Charge & Electrical Balance */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-3">
            Charge &amp; Electrical Balance
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <InfoCard
              label="Charge Balance Error"
              value={report.chemical_status.charge_balance_error}
            />
            <InfoCard
              label="Electrical Balance"
              value={report.chemical_status.electrical_balance}
            />
            <InfoCard
              label="Ionic Strength"
              value={report.chemical_status.ionic_strength}
            />
          </div>
        </div>

        {/* Database Info */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-3">Database Information</h3>
          <div className="bg-gray-50 border rounded-lg p-4">
            <p className="text-sm">
              <span className="font-medium">Database Used:</span>{" "}
              {report.chemical_status.database_used}
            </p>
          </div>
        </div>
      </Section>

      {/* Total Score */}
      <Section title="Total Score">
        <div className="space-y-4">
          <div>
            Overall Score:{" "}
            <span className="font-bold">
              {report.total_score.overall_score}/{report.total_score.max_score}
            </span>
            <span
              className={`ml-3 px-2 py-1 rounded text-sm ${badge(
                report.total_score.rating,
              )}`}
            >
              {report.total_score.rating}
            </span>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {report.total_score.components.map((comp: any, i: number) => (
              <div key={i} className="bg-gray-50 p-4 rounded text-center">
                <p className="font-semibold">{comp.name}</p>
                <p className="font-bold">
                  {comp.score}/{comp.max_score}
                </p>
                <p className="text-xs mt-1">weight: {comp.weight}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Quality Assessment Summary */}
      <Section title="Quality Assessment Summary">
        <div className="grid md:grid-cols-3 gap-6">
          <ScoreCard
            title="Water Quality Index"
            score={report.quality_report.water_quality_index.score}
            maxScore={report.quality_report.water_quality_index.max_score}
            rating={report.quality_report.water_quality_index.rating}
          />
          <ScoreCard
            title="Compliance Score"
            score={report.quality_report.compliance_score.score}
            maxScore={100}
            rating={report.quality_report.compliance_score.rating}
            percentage
          />
          <ScoreCard
            title="Risk Factor"
            score={report.quality_report.risk_factor.score}
            maxScore={report.quality_report.risk_factor.max_score}
            rating={report.quality_report.risk_factor.severity}
            danger
          />
        </div>
      </Section>

      {/* Chemical Composition */}
      <Section title="Chemical Composition">
        <div className="overflow-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Value</th>
                <th className="p-2 border">Unit</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Symbol</th>
                <th className="p-2 border">Formula</th>
              </tr>
            </thead>
            <tbody>
              {report.chemical_composition.parameters.map(
                (p: any, i: number) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{p.parameter_name}</td>
                    <td className="border p-2">{p.value}</td>
                    <td className="border p-2">{p.unit}</td>
                    <td className="border p-2">{p.category}</td>
                    <td className="border p-2">{p.chemical_symbol}</td>
                    <td className="border p-2">{p.chemical_formula}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Biological Indicators */}
      <Section title="Biological Indicators">
        <div className="space-y-4">
          {report.biological_indicators.indicators.map(
            (bio: any, i: number) => (
              <div
                key={i}
                className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                      {bio.indicator_name}
                    </h4>
                    <p className="text-xs text-gray-500 sm:text-sm">
                      {bio.value} {bio.unit}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                        bio.status,
                      )}`}
                    >
                      {bio.status}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${riskBadge(
                        bio.risk_level,
                      )}`}
                    >
                      {bio.risk_level} Risk
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}
          {!report.biological_indicators.indicators.length && (
            <div className="text-center py-6 text-gray-500 text-sm">
              No biological indicators found
            </div>
          )}
        </div>
      </Section>

      {/* Compliance Checklist */}
      <Section title="Compliance Checklist">
        <div className="overflow-auto">
          <table className="min-w-full text-xs border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Parameter</th>
                <th className="border p-2">Standard</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actual</th>
                <th className="border p-2">Required</th>
                <th className="border p-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {report.compliance_checklist.items.map((item: any, i: number) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{item.parameter}</td>
                  <td className="border p-2">{item.standard}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${badge(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="border p-2">{item.actual_value ?? "-"}</td>
                  <td className="border p-2">{item.required_value}</td>
                  <td className="border p-2">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Contamination Risk */}
      <Section title="Contamination Risk Assessment">
        <div className="mb-8 grid md:grid-cols-3 gap-4">
          <RiskCard
            label="Overall Severity"
            value={report.contamination_risk.overall_severity}
            highlight
          />
          <RiskCard
            label="Contamination Score"
            value={report.contamination_risk.contamination_score}
          />
          <RiskCard
            label="Risk Score"
            value={report.contamination_risk.risk_score}
          />
        </div>

        {report.contamination_risk.heavy_metals.length > 0 && (
          <RiskTable
            title="Heavy Metals"
            data={report.contamination_risk.heavy_metals}
          />
        )}
        {report.contamination_risk.microbiological.length > 0 && (
          <RiskTable
            title="Microbiological Contaminants"
            data={report.contamination_risk.microbiological}
          />
        )}
        {report.contamination_risk.organic_compounds.length > 0 && (
          <RiskTable
            title="Organic Compounds"
            data={report.contamination_risk.organic_compounds}
          />
        )}
      </Section>
    </div>
  );
};

export default WaterFullReport;
