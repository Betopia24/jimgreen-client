// "use client";

// import {
//   useGetCoustomerAndAsetListQuery,
//   useGetSaltSaturationQuery,
//   useSaturatonAnalysisMutation,
// } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
// import React, { useState, useMemo } from "react";
// import { useSelector } from "react-redux";

// // ─── Type Definitions ────────────────────────────────────────────────────────

// interface RootState {
//   user: { user: UserProfile | null };
// }

// interface UserProfile {
//   companyMember?: {
//     company?: { id: string };
//   };
// }

// interface WaterReport {
//   id: string;
//   aiReportId: string;
//   sampleDate: string | null;
//   sampleLocation: string | null;
//   originalFilename: string;
//   assetId: string;
//   customerId: string;
// }

// interface Asset {
//   id: string;
//   name: string;
//   type: string;
//   towerType: string | null;
//   systemVolume: number | null;
//   systemMetallurgy: string[];
//   systemMaterials: string[];
//   recirculationRate: number | null;
//   waterReports: WaterReport[];
// }

// interface Customer {
//   id: string;
//   name: string;
//   siteName: string;
//   location: string;
//   assets: Asset[];
// }

// interface CustomerDataResponse {
//   data: { customers: Customer[] };
// }

// // ─── Step Indicator ───────────────────────────────────────────────────────────

// const STEPS = [
//   { label: "Select Customer", icon: "👤" },
//   { label: "Select Asset", icon: "🏗️" },
//   { label: "Select Report", icon: "📄" },
//   { label: "Configure Simulation", icon: "⚙️" },
//   { label: "Run Analysis", icon: "▶" },
// ];

// function StepIndicator({ currentStep }: { currentStep: number }) {
//   return (
//     <div className="flex items-center justify-between w-full mb-8 overflow-x-auto pb-2">
//       {STEPS.map((step, idx) => {
//         const isCompleted = idx < currentStep;
//         const isActive = idx === currentStep;
//         return (
//           <React.Fragment key={step.label}>
//             <div className="flex flex-col items-center gap-1 min-w-[80px]">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
//                   isCompleted
//                     ? "bg-primaryColor text-white"
//                     : isActive
//                       ? "bg-primaryColor text-white ring-4 ring-blue-100"
//                       : "bg-gray-100 text-gray-400"
//                 }`}
//               >
//                 {isCompleted ? (
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 ) : (
//                   <span>{step.icon}</span>
//                 )}
//               </div>
//               <span
//                 className={`text-xs text-center leading-tight font-medium ${
//                   isActive || isCompleted
//                     ? "text-primaryColor"
//                     : "text-gray-400"
//                 }`}
//               >
//                 {step.label}
//               </span>
//             </div>
//             {idx < STEPS.length - 1 && (
//               <div
//                 className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
//                   idx < currentStep ? "bg-primaryColor" : "bg-gray-200"
//                 }`}
//               />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// }

// // ─── Select Dropdown ──────────────────────────────────────────────────────────

// function SelectField({
//   label,
//   required,
//   value,
//   onChange,
//   options,
//   placeholder,
//   disabled,
// }: {
//   label: string;
//   required?: boolean;
//   value: string;
//   onChange: (v: string) => void;
//   options: { value: string; label: string }[];
//   placeholder?: string;
//   disabled?: boolean;
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-sm font-medium text-gray-700">
//         {label}
//         {required && <span className="text-red-500 ml-0.5">*</span>}
//       </label>
//       <div className="relative">
//         <select
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           disabled={disabled}
//           className={`w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all ${
//             disabled
//               ? "opacity-50 cursor-not-allowed bg-gray-50"
//               : "cursor-pointer hover:border-gray-300"
//           }`}
//         >
//           {placeholder && (
//             <option value="" disabled>
//               {placeholder}
//             </option>
//           )}
//           {options.map((o) => (
//             <option key={o.value} value={o.value}>
//               {o.label}
//             </option>
//           ))}
//         </select>
//         <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Section Card ─────────────────────────────────────────────────────────────

// function SectionCard({
//   title,
//   badge,
//   children,
// }: {
//   title: string;
//   badge?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//       <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
//         <div className="w-1 h-5 rounded-full bg-primaryColor" />
//         <h2 className="text-base font-semibold text-gray-900">{title}</h2>
//         {badge && (
//           <span className="text-xs text-gray-400 font-normal">({badge})</span>
//         )}
//       </div>
//       <div className="px-6 py-5 flex flex-col gap-5">{children}</div>
//     </div>
//   );
// }

// // ─── Toggle Pill ──────────────────────────────────────────────────────────────

// function TogglePill({
//   options,
//   value,
//   onChange,
// }: {
//   options: string[];
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <div className="flex gap-2 flex-wrap">
//       {options.map((opt) => (
//         <button
//           key={opt}
//           type="button"
//           onClick={() => onChange(opt)}
//           className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
//             value === opt
//               ? "bg-primaryColor text-white border-primaryColor shadow-sm"
//               : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//           }`}
//         >
//           {opt}
//         </button>
//       ))}
//     </div>
//   );
// }

// // ─── Radio Option ─────────────────────────────────────────────────────────────

// function RadioOption({
//   label,
//   description,
//   checked,
//   onChange,
// }: {
//   label: string;
//   description: string;
//   checked: boolean;
//   onChange: () => void;
// }) {
//   return (
//     <div
//       onClick={onChange}
//       className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
//         checked
//           ? "border-primaryColor/30 bg-blue-50/40"
//           : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
//       }`}
//     >
//       <div
//         className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
//           checked ? "border-primaryColor" : "border-gray-300"
//         }`}
//       >
//         {checked && <div className="w-2 h-2 rounded-full bg-primaryColor" />}
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-800">{label}</p>
//         <p className="text-xs text-gray-500 mt-0.5">{description}</p>
//       </div>
//     </div>
//   );
// }

// // ─── Range Fields ─────────────────────────────────────────────────────────────

// function RangeFields({
//   label,
//   min,
//   max,
//   interval,
//   onChange,
//   unit,
//   onUnitToggle,
// }: {
//   label: string;
//   min: string;
//   max: string;
//   interval: string;
//   onChange: (field: "min" | "max" | "interval", value: string) => void;
//   unit?: string;
//   onUnitToggle?: () => void;
// }) {
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-3">
//         <p className="text-sm font-semibold text-gray-800">{label}</p>
//         {unit && onUnitToggle && (
//           <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden text-xs font-medium">
//             {["°C", "°F"].map((u) => (
//               <button
//                 key={u}
//                 type="button"
//                 onClick={onUnitToggle}
//                 className={`px-3 py-1.5 transition-all ${
//                   unit === u
//                     ? "bg-primaryColor text-white"
//                     : "text-gray-500 hover:bg-gray-50"
//                 }`}
//               >
//                 {u}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="grid grid-cols-3 gap-3">
//         {(["min", "max", "interval"] as const).map((field) => (
//           <div key={field}>
//             <label className="text-xs text-gray-500 mb-1 block capitalize">
//               {field}
//             </label>
//             <input
//               type="number"
//               value={field === "min" ? min : field === "max" ? max : interval}
//               onChange={(e) => onChange(field, e.target.value)}
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function SaturationAnalysis() {
//   // Step tracking
//   const [currentStep, setCurrentStep] = useState(0);

//   // ── Selection Flow
//   const [selectedCustomerId, setSelectedCustomerId] = useState("");
//   const [selectedAssetId, setSelectedAssetId] = useState("");
//   const [selectedReportId, setSelectedReportId] = useState("");

//   // ── Advanced Settings (inputConfig)
//   const [saltsSelection, setSaltsSelection] = useState("Auto");
//   const [saltOfInterest, setSaltOfInterest] = useState("Gypsum");
//   const [overrideDosage, setOverrideDosage] = useState("");
//   const [adjustmentChemical, setAdjustmentChemical] = useState("");
//   const [balanceCation, setBalanceCation] = useState("");
//   const [balanceAnion, setBalanceAnion] = useState("");

//   // ── Treatment Setup
//   const [treatmentMode, setTreatmentMode] = useState<"product" | "raw">(
//     "product",
//   );
//   const [productId, setProductId] = useState("");
//   const [rawMaterialId, setRawMaterialId] = useState("");
//   const [dosagePpm, setDosagePpm] = useState("");

//   // ── Simulation Parameters (inputConfig)
//   const [cocMin, setCocMin] = useState("");
//   const [cocMax, setCocMax] = useState("");
//   const [cocInterval, setCocInterval] = useState("");
//   const [tempMin, setTempMin] = useState("");
//   const [tempMax, setTempMax] = useState("");
//   const [tempInterval, setTempInterval] = useState("");
//   const [tempUnit, setTempUnit] = useState("°C");
//   const [pHMode, setPHMode] = useState<"natural" | "fixed">("natural");
//   const [fixedPh, setFixedPh] = useState("");

//   // ── Auth / API
//   const company: UserProfile | null = useSelector(
//     (state: RootState) => state.user.user,
//   );
//   const companyId = company?.companyMember?.company?.id ?? "mock-company-id";

//   const { data: customerData } = useGetCoustomerAndAsetListQuery(
//     companyId as string,
//     { skip: !companyId },
//   );

//   const { data: saltData } = useGetSaltSaturationQuery("");

//   const [runAnalysis, { isLoading, isSuccess }] =
//     useSaturatonAnalysisMutation();

//   // ── Derived data
//   const customers = useMemo(
//     () => customerData?.data?.customers ?? [],
//     [customerData],
//   );

//   const customerOptions = useMemo(
//     () =>
//       customers.map((c) => ({
//         value: c.id,
//         label: `${c.name} — ${c.siteName}`,
//       })),
//     [customers],
//   );

//   const selectedCustomer = useMemo(
//     () => customers.find((c) => c.id === selectedCustomerId),
//     [customers, selectedCustomerId],
//   );

//   const assetOptions = useMemo(
//     () =>
//       selectedCustomer?.assets.map((a) => ({
//         value: a.id,
//         label: `${a.name} (${a.type})`,
//       })) ?? [],
//     [selectedCustomer],
//   );

//   const selectedAsset = useMemo(
//     () => selectedCustomer?.assets.find((a) => a.id === selectedAssetId),
//     [selectedCustomer, selectedAssetId],
//   );

//   const reportOptions = useMemo(
//     () =>
//       selectedAsset?.waterReports.map((r) => ({
//         value: r.id,
//         label: r.aiReportId,
//       })) ?? [],
//     [selectedAsset],
//   );

//   // ── Step navigation
//   const handleCustomerChange = (id: string) => {
//     setSelectedCustomerId(id);
//     setSelectedAssetId("");
//     setSelectedReportId("");
//     setCurrentStep(1);
//   };

//   const handleAssetChange = (id: string) => {
//     setSelectedAssetId(id);
//     setSelectedReportId("");
//     setCurrentStep(2);
//   };

//   const handleReportChange = (id: string) => {
//     setSelectedReportId(id);
//     setCurrentStep(3);
//   };

//   // ── Submit — builds new API payload format
//   const handleSubmit = async () => {
//     if (!selectedAssetId || !selectedReportId) return;
//     setCurrentStep(4);

//     // Resolve aiReportId from selected report
//     const selectedReport = selectedAsset?.waterReports.find(
//       (r) => r.id === selectedReportId,
//     );

//     // Build inputConfig — only include fields that have values
//     const inputConfig: Record<string, unknown> = {};

//     // Salts — only populate when Manual mode
//     if (saltsSelection === "Manual") {
//       inputConfig.salt_id = saltOfInterest;
//       inputConfig.salts_of_interest = [saltOfInterest];
//     }

//     // Dosage override
//     if (overrideDosage) inputConfig.dosage_ppm = Number(overrideDosage);

//     // CoC range
//     if (cocMin) inputConfig.coc_min = Number(cocMin);
//     if (cocMax) inputConfig.coc_max = Number(cocMax);
//     if (cocInterval) inputConfig.coc_interval = Number(cocInterval);

//     // Temperature range
//     if (tempMin) inputConfig.temp_min = Number(tempMin);
//     if (tempMax) inputConfig.temp_max = Number(tempMax);
//     if (tempInterval) inputConfig.temp_interval = Number(tempInterval);
//     inputConfig.temp_unit = tempUnit === "°C" ? "C" : "F";

//     // pH mode
//     inputConfig.ph_mode = pHMode;
//     if (pHMode === "fixed" && fixedPh) {
//       inputConfig.fixed_ph = Number(fixedPh);
//     }

//     // Charge balance
//     if (adjustmentChemical)
//       inputConfig.adjustment_chemical = adjustmentChemical;
//     if (balanceCation) inputConfig.balance_cation = balanceCation;
//     if (balanceAnion) inputConfig.balance_anion = balanceAnion;

//     // Build treatment block — only include what's set
//     const treatment: Record<string, unknown> = {};
//     if (treatmentMode === "product" && productId)
//       treatment.productId = productId;
//     if (treatmentMode === "raw" && rawMaterialId)
//       treatment.rawMaterialId = rawMaterialId;
//     if (dosagePpm) treatment.dosage = Number(dosagePpm);

//     const payload = {
//       // ✅ REQUIRED
//       assetId: selectedAssetId,
//       waterReportId: selectedReport?.aiReportId ?? selectedReportId,

//       // ⬇️ OPTIONAL
//       ...(Object.keys(inputConfig).length > 0 && { inputConfig }),
//       ...(Object.keys(treatment).length > 0 && { treatment }),
//     };

//     await runAnalysis(payload);
//   };

//   const canSubmit = selectedCustomerId && selectedAssetId && selectedReportId;

//   return (
//     <div className="mt-6">
//       <div className="">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
//             Saturation Analysis
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Simulate scaling behavior across multiple operating conditions.
//           </p>
//         </div>

//         {/* Step Indicator */}
//         <StepIndicator currentStep={currentStep} />

//         {/* Success Banner */}
//         {isSuccess && (
//           <div className="mb-5 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
//               <svg
//                 className="w-4 h-4 text-green-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-green-800">
//                 Analysis submitted successfully!
//               </p>
//               <p className="text-xs text-green-600 mt-0.5">
//                 Your saturation analysis is being processed.
//               </p>
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col gap-5">
//           {/* ── Selection Flow ── */}
//           <SectionCard title="Selection Flow">
//             <SelectField
//               label="Select Customer"
//               required
//               value={selectedCustomerId}
//               onChange={handleCustomerChange}
//               placeholder="Choose a customer..."
//               options={customerOptions}
//             />
//             <SelectField
//               label="Select Asset"
//               required
//               value={selectedAssetId}
//               onChange={handleAssetChange}
//               placeholder="Choose an asset..."
//               options={assetOptions}
//               disabled={!selectedCustomerId}
//             />
//             <SelectField
//               label="Select Water Report"
//               required
//               value={selectedReportId}
//               onChange={handleReportChange}
//               placeholder="Choose a water report..."
//               options={reportOptions}
//               disabled={!selectedAssetId}
//             />
//           </SectionCard>

//           {/* ── Advanced Settings ── */}
//           <SectionCard title="Advanced Settings" badge="Optional">
//             <SelectField
//               label="Salts Selection"
//               value={saltsSelection}
//               onChange={setSaltsSelection}
//               options={[
//                 { value: "Auto", label: "Auto" },
//                 { value: "Manual", label: "Manual" },
//               ]}
//             />

//             {/* Salts of Interest — only relevant in Manual mode */}
//             <div>
//               <p className="text-sm font-medium text-gray-700 mb-2">
//                 Salts Of Interest
//                 {saltsSelection === "Auto" && (
//                   <span className="ml-2 text-xs text-gray-400 font-normal">
//                     (all salts tested in Auto mode)
//                   </span>
//                 )}
//               </p>
//               <TogglePill
//                 options={["Gypsum", "Calcite", "Silica"]}
//                 value={saltOfInterest}
//                 onChange={setSaltOfInterest}
//               />
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <label className="text-sm font-medium text-gray-700">
//                 Override Dosage (ppm)
//               </label>
//               <input
//                 type="number"
//                 value={overrideDosage}
//                 onChange={(e) => setOverrideDosage(e.target.value)}
//                 placeholder="Leave empty to use Asset default"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all"
//               />
//             </div>

//             <div>
//               <p className="text-sm font-semibold text-gray-800 mb-3">
//                 Charge Balance Adjustment
//               </p>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {[
//                   {
//                     label: "Adjustment Chemical",
//                     value: adjustmentChemical,
//                     set: setAdjustmentChemical,
//                     opts: [
//                       { value: "HCl", label: "HCl" },
//                       { value: "NaOH", label: "NaOH" },
//                       { value: "H2SO4", label: "H₂SO₄" },
//                     ],
//                   },
//                   {
//                     label: "Balance Cation",
//                     value: balanceCation,
//                     set: setBalanceCation,
//                     opts: [
//                       { value: "Ca", label: "Ca²⁺" },
//                       { value: "Mg", label: "Mg²⁺" },
//                       { value: "Na", label: "Na⁺" },
//                     ],
//                   },
//                   {
//                     label: "Balance Anion",
//                     value: balanceAnion,
//                     set: setBalanceAnion,
//                     opts: [
//                       { value: "Cl", label: "Cl⁻" },
//                       { value: "SO4", label: "SO₄²⁻" },
//                       { value: "HCO3", label: "HCO₃⁻" },
//                     ],
//                   },
//                 ].map(({ label, value, set, opts }) => (
//                   <SelectField
//                     key={label}
//                     label={label}
//                     value={value}
//                     onChange={set}
//                     placeholder="Select"
//                     options={opts}
//                   />
//                 ))}
//               </div>
//             </div>
//           </SectionCard>

//           {/* ── Treatment Setup ── */}
//           <SectionCard title="Treatment Setup" badge="Optional">
//             <div>
//               <p className="text-sm font-medium text-gray-700 mb-2">
//                 Treatment Mode
//               </p>
//               <div className="flex gap-3 flex-wrap">
//                 {(["product", "raw"] as const).map((m) => (
//                   <label
//                     key={m}
//                     className="flex items-center gap-2 cursor-pointer"
//                   >
//                     <div
//                       onClick={() => setTreatmentMode(m)}
//                       className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
//                         treatmentMode === m
//                           ? "border-primaryColor"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {treatmentMode === m && (
//                         <div className="w-2 h-2 rounded-full bg-primaryColor" />
//                       )}
//                     </div>
//                     <span className="text-sm text-gray-700">
//                       {m === "product" ? "Use Product" : "Use Raw Material"}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <div className="sm:col-span-2">
//                 {treatmentMode === "product" ? (
//                   <SelectField
//                     label="Select Product"
//                     value={productId}
//                     onChange={(val) => {
//                       setProductId(val);
//                       setRawMaterialId("");
//                     }}
//                     placeholder="Choose a product..."
//                     options={[
//                       {
//                         value: "69abaa6897ccf9ca1415f27b",
//                         label: "Corrosion Inhibitor A-200",
//                       },
//                       {
//                         value: "69abaa6897ccf9ca1415f27c",
//                         label: "Scale Inhibitor B-100",
//                       },
//                       {
//                         value: "69abaa6897ccf9ca1415f27d",
//                         label: "Biocide C-50",
//                       },
//                     ]}
//                   />
//                 ) : (
//                   <SelectField
//                     label="Select Raw Material"
//                     value={rawMaterialId}
//                     onChange={(val) => {
//                       setRawMaterialId(val);
//                       setProductId("");
//                     }}
//                     placeholder="Choose a raw material..."
//                     options={[
//                       {
//                         value: "69a6598f361c31d6053fb3ed",
//                         label: "Phosphonate",
//                       },
//                       {
//                         value: "69a6598f361c31d6053fb3ee",
//                         label: "Polymer",
//                       },
//                       {
//                         value: "69a6598f361c31d6053fb3ef",
//                         label: "Molybdate",
//                       },
//                     ]}
//                   />
//                 )}
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1.5">
//                   Dosage (ppm)
//                 </label>
//                 <input
//                   type="number"
//                   value={dosagePpm}
//                   onChange={(e) => setDosagePpm(e.target.value)}
//                   placeholder="e.g. 5.0"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all"
//                 />
//               </div>
//             </div>
//           </SectionCard>

//           {/* ── Simulation Parameters ── */}
//           <SectionCard title="Simulation Parameters" badge="Optional">
//             <RangeFields
//               label="Cycles of Concentration (CoC) Range"
//               min={cocMin}
//               max={cocMax}
//               interval={cocInterval}
//               onChange={(field, val) => {
//                 if (field === "min") setCocMin(val);
//                 else if (field === "max") setCocMax(val);
//                 else setCocInterval(val);
//               }}
//             />

//             <RangeFields
//               label="Temperature Range"
//               min={tempMin}
//               max={tempMax}
//               interval={tempInterval}
//               onChange={(field, val) => {
//                 if (field === "min") setTempMin(val);
//                 else if (field === "max") setTempMax(val);
//                 else setTempInterval(val);
//               }}
//               unit={tempUnit}
//               onUnitToggle={() =>
//                 setTempUnit((u) => (u === "°C" ? "°F" : "°C"))
//               }
//             />

//             <div>
//               <p className="text-sm font-semibold text-gray-800 mb-3">
//                 pH Mode
//               </p>
//               <div className="flex flex-col gap-2">
//                 <RadioOption
//                   label="Natural pH"
//                   description="Use pH derived from water analysis — auto-resolved from Asset"
//                   checked={pHMode === "natural"}
//                   onChange={() => setPHMode("natural")}
//                 />
//                 <RadioOption
//                   label="Fixed pH"
//                   description="Override with a specific pH value"
//                   checked={pHMode === "fixed"}
//                   onChange={() => setPHMode("fixed")}
//                 />
//               </div>

//               {/* Fixed pH input — shown only when pHMode is "fixed" */}
//               {pHMode === "fixed" && (
//                 <div className="mt-3 flex flex-col gap-1.5">
//                   <label className="text-sm font-medium text-gray-700">
//                     Fixed pH Value
//                   </label>
//                   <input
//                     type="number"
//                     step="0.1"
//                     min="0"
//                     max="14"
//                     value={fixedPh}
//                     onChange={(e) => setFixedPh(e.target.value)}
//                     placeholder="e.g. 8.2"
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all"
//                   />
//                 </div>
//               )}
//             </div>
//           </SectionCard>

//           {/* ── Run Button ── */}
//           <div className="flex justify-end pb-6">
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={!canSubmit || isLoading}
//               className={`flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
//                 canSubmit && !isLoading
//                   ? "bg-primaryColor text-white hover:bg-[#162d4d] active:scale-[0.98] shadow-blue-900/20"
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="w-4 h-4 animate-spin"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                     />
//                   </svg>
//                   Running Analysis...
//                 </>
//               ) : (
//                 <>
//                   Run Saturation Analysis
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M14 5l7 7m0 0l-7 7m7-7H3"
//                     />
//                   </svg>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  useGetCoustomerAndAsetListQuery,
  useGetSaltSaturationQuery,
  useSaturatonAnalysisMutation,
} from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

// ─── Type Definitions ────────────────────────────────────────────────────────

interface RootState {
  user: { user: UserProfile | null };
}

interface UserProfile {
  companyMember?: {
    company?: { id: string };
  };
}

interface WaterReport {
  id: string;
  aiReportId: string;
  sampleDate: string | null;
  sampleLocation: string | null;
  originalFilename: string;
  assetId: string;
  customerId: string;
}

interface Asset {
  id: string;
  name: string;
  type: string;
  towerType: string | null;
  systemVolume: number | null;
  systemMetallurgy: string[];
  systemMaterials: string[];
  recirculationRate: number | null;
  waterReports: WaterReport[];
}

interface Customer {
  id: string;
  name: string;
  siteName: string;
  location: string;
  assets: Asset[];
}

interface CustomerDataResponse {
  data: { customers: Customer[] };
}

interface Salt {
  name: string;
  chemical_formula: string;
  phase: string | null;
}

interface SaltDataResponse {
  success: boolean;
  message: string;
  data: Salt[];
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { label: "Select Customer", icon: "👤" },
  { label: "Select Asset", icon: "🏗️" },
  { label: "Select Report", icon: "📄" },
  { label: "Configure Simulation", icon: "⚙️" },
  { label: "Run Analysis", icon: "▶" },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between w-full mb-8 overflow-x-auto pb-2">
      {STEPS.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-1 min-w-[80px]">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-primaryColor text-white"
                    : isActive
                      ? "bg-primaryColor text-white ring-4 ring-blue-100"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>
              <span
                className={`text-xs text-center leading-tight font-medium ${
                  isActive || isCompleted
                    ? "text-primaryColor"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
                  idx < currentStep ? "bg-primaryColor" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Select Dropdown ──────────────────────────────────────────────────────────

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-50"
              : "cursor-pointer hover:border-gray-300"
          }`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
        <div className="w-1 h-5 rounded-full bg-primaryColor" />
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {badge && (
          <span className="text-xs text-gray-400 font-normal">({badge})</span>
        )}
      </div>
      <div className="px-6 py-5 flex flex-col gap-5">{children}</div>
    </div>
  );
}

// ─── Multi-Select Salt Pills ──────────────────────────────────────────────────

function MultiSelectSaltPills({
  salts,
  selected,
  onChange,
  isLoading,
}: {
  salts: Salt[];
  selected: string[];
  onChange: (values: string[]) => void;
  isLoading: boolean;
}) {
  const allSelected = salts.length > 0 && selected.length === salts.length;

  const toggleAll = () => {
    onChange(allSelected ? [] : salts.map((s) => s.name));
  };

  const toggleOne = (name: string) => {
    onChange(
      selected.includes(name)
        ? selected.filter((s) => s !== name)
        : [...selected, name],
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 rounded-full bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {/* Select All pill */}
      <button
        type="button"
        onClick={toggleAll}
        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
          allSelected
            ? "bg-primaryColor text-white border-primaryColor shadow-sm"
            : "bg-white text-gray-500 border-gray-300 hover:border-primaryColor hover:text-primaryColor"
        }`}
      >
        {allSelected ? "✓ All" : "Select All"}
      </button>

      {salts.map((salt) => {
        const isSelected = selected.includes(salt.name);
        return (
          <button
            key={salt.name}
            type="button"
            onClick={() => toggleOne(salt.name)}
            title={salt.chemical_formula}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border flex items-center gap-1.5 ${
              isSelected
                ? "bg-primaryColor text-white border-primaryColor shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {isSelected && (
              <svg
                className="w-3 h-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            <span>{salt.name}</span>
            <span
              className={`text-[10px] ${
                isSelected ? "text-white/70" : "text-gray-400"
              }`}
            >
              {salt.chemical_formula}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Radio Option ─────────────────────────────────────────────────────────────

function RadioOption({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={onChange}
      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
        checked
          ? "border-primaryColor/30 bg-blue-50/40"
          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div
        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          checked ? "border-primaryColor" : "border-gray-300"
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-primaryColor" />}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

// ─── Range Fields ─────────────────────────────────────────────────────────────

function RangeFields({
  label,
  min,
  max,
  interval,
  onChange,
  unit,
  onUnitToggle,
}: {
  label: string;
  min: string;
  max: string;
  interval: string;
  onChange: (field: "min" | "max" | "interval", value: string) => void;
  unit?: string;
  onUnitToggle?: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {unit && onUnitToggle && (
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden text-xs font-medium">
            {["°C", "°F"].map((u) => (
              <button
                key={u}
                type="button"
                onClick={onUnitToggle}
                className={`px-3 py-1.5 transition-all ${
                  unit === u
                    ? "bg-primaryColor text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {(["min", "max", "interval"] as const).map((field) => (
          <div key={field}>
            <label className="text-xs text-gray-500 mb-1 block capitalize">
              {field}
            </label>
            <input
              type="number"
              value={field === "min" ? min : field === "max" ? max : interval}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SaturationAnalysis() {
  // Step tracking
  const [currentStep, setCurrentStep] = useState(0);

  // ── Selection Flow
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [selectedReportId, setSelectedReportId] = useState("");

  // ── Advanced Settings (inputConfig)
  const [saltsSelection, setSaltsSelection] = useState<"Auto" | "Manual">(
    "Auto",
  );
  const [saltsOfInterest, setSaltsOfInterest] = useState<string[]>([]); // multi-select array
  const [primarySaltId, setPrimarySaltId] = useState(""); // salt_id (single)
  const [overrideDosage, setOverrideDosage] = useState("");
  const [adjustmentChemical, setAdjustmentChemical] = useState("");
  const [balanceCation, setBalanceCation] = useState("");
  const [balanceAnion, setBalanceAnion] = useState("");

  // ── Treatment Setup
  const [treatmentMode, setTreatmentMode] = useState<"product" | "raw">(
    "product",
  );
  const [productId, setProductId] = useState("");
  const [rawMaterialId, setRawMaterialId] = useState("");
  const [dosagePpm, setDosagePpm] = useState("");

  // ── Simulation Parameters (inputConfig)
  const [cocMin, setCocMin] = useState("");
  const [cocMax, setCocMax] = useState("");
  const [cocInterval, setCocInterval] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [tempInterval, setTempInterval] = useState("");
  const [tempUnit, setTempUnit] = useState("°C");
  const [pHMode, setPHMode] = useState<"natural" | "fixed">("natural");
  const [fixedPh, setFixedPh] = useState("");

  // ── Auth / API
  const company = useSelector((state: RootState) => state.user.user);
  const companyId = company?.companyMember?.company?.id ?? "";

  const { data: customerData } = useGetCoustomerAndAsetListQuery(companyId, {
    skip: !companyId,
  }) as { data: CustomerDataResponse | undefined };

  const { data: saltData, isLoading: saltsLoading } = useGetSaltSaturationQuery(
    "",
  ) as {
    data: SaltDataResponse | undefined;
    isLoading: boolean;
  };

  const [runAnalysis, { isLoading, isSuccess }] =
    useSaturatonAnalysisMutation();

  // ── Derived data
  const customers = useMemo(
    () => customerData?.data?.customers ?? [],
    [customerData],
  );

  const salts: Salt[] = useMemo(() => saltData?.data ?? [], [saltData]);

  // Dropdown options for primary salt_id — built from API response
  const saltOptions = useMemo(
    () =>
      salts.map((s) => ({
        value: s.name,
        label: `${s.name} (${s.chemical_formula})`,
      })),
    [salts],
  );

  const customerOptions = useMemo(
    () =>
      customers.map((c) => ({
        value: c.id,
        label: `${c.name} — ${c.siteName}`,
      })),
    [customers],
  );

  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === selectedCustomerId),
    [customers, selectedCustomerId],
  );

  const assetOptions = useMemo(
    () =>
      selectedCustomer?.assets.map((a) => ({
        value: a.id,
        label: `${a.name} (${a.type})`,
      })) ?? [],
    [selectedCustomer],
  );

  const selectedAsset = useMemo(
    () => selectedCustomer?.assets.find((a) => a.id === selectedAssetId),
    [selectedCustomer, selectedAssetId],
  );

  const reportOptions = useMemo(
    () =>
      selectedAsset?.waterReports.map((r) => ({
        value: r.id,
        label: r.aiReportId,
      })) ?? [],
    [selectedAsset],
  );

  // ── Step navigation
  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    setSelectedAssetId("");
    setSelectedReportId("");
    setCurrentStep(1);
  };

  const handleAssetChange = (id: string) => {
    setSelectedAssetId(id);
    setSelectedReportId("");
    setCurrentStep(2);
  };

  const handleReportChange = (id: string) => {
    setSelectedReportId(id);
    setCurrentStep(3);
  };

  // ── Submit
  const handleSubmit = async () => {
    if (!selectedAssetId || !selectedReportId) return;
    setCurrentStep(4);

    const selectedReport = selectedAsset?.waterReports.find(
      (r) => r.id === selectedReportId,
    );

    // Build inputConfig — only include fields with actual values
    const inputConfig: Record<string, unknown> = {};

    if (saltsSelection === "Manual") {
      if (primarySaltId) inputConfig.salt_id = primarySaltId;
      if (saltsOfInterest.length > 0) {
        inputConfig.salts_of_interest = saltsOfInterest;
      }
    }

    if (overrideDosage) inputConfig.dosage_ppm = Number(overrideDosage);

    if (cocMin) inputConfig.coc_min = Number(cocMin);
    if (cocMax) inputConfig.coc_max = Number(cocMax);
    if (cocInterval) inputConfig.coc_interval = Number(cocInterval);

    if (tempMin) inputConfig.temp_min = Number(tempMin);
    if (tempMax) inputConfig.temp_max = Number(tempMax);
    if (tempInterval) inputConfig.temp_interval = Number(tempInterval);
    inputConfig.temp_unit = tempUnit === "°C" ? "C" : "F";

    inputConfig.ph_mode = pHMode;
    if (pHMode === "fixed" && fixedPh) {
      inputConfig.fixed_ph = Number(fixedPh);
    }

    if (adjustmentChemical)
      inputConfig.adjustment_chemical = adjustmentChemical;
    if (balanceCation) inputConfig.balance_cation = balanceCation;
    if (balanceAnion) inputConfig.balance_anion = balanceAnion;

    // Build treatment block
    const treatment: Record<string, unknown> = {};
    if (treatmentMode === "product" && productId)
      treatment.productId = productId;
    if (treatmentMode === "raw" && rawMaterialId)
      treatment.rawMaterialId = rawMaterialId;
    if (dosagePpm) treatment.dosage = Number(dosagePpm);

    const payload = {
      assetId: selectedAssetId,
      waterReportId: selectedReport?.aiReportId ?? selectedReportId,
      ...(Object.keys(inputConfig).length > 0 && { inputConfig }),
      ...(Object.keys(treatment).length > 0 && { treatment }),
    };

    await runAnalysis(payload);
  };

  const canSubmit =
    Boolean(selectedCustomerId) &&
    Boolean(selectedAssetId) &&
    Boolean(selectedReportId);

  // ── Charge balance field config
  const chargeBalanceFields: {
    label: string;
    value: string;
    set: (v: string) => void;
    opts: { value: string; label: string }[];
  }[] = [
    {
      label: "Adjustment Chemical",
      value: adjustmentChemical,
      set: setAdjustmentChemical,
      opts: [
        { value: "HCl", label: "HCl" },
        { value: "NaOH", label: "NaOH" },
        { value: "H2SO4", label: "H₂SO₄" },
      ],
    },
    {
      label: "Balance Cation",
      value: balanceCation,
      set: setBalanceCation,
      opts: [
        { value: "Ca", label: "Ca²⁺" },
        { value: "Mg", label: "Mg²⁺" },
        { value: "Na", label: "Na⁺" },
      ],
    },
    {
      label: "Balance Anion",
      value: balanceAnion,
      set: setBalanceAnion,
      opts: [
        { value: "Cl", label: "Cl⁻" },
        { value: "SO4", label: "SO₄²⁻" },
        { value: "HCO3", label: "HCO₃⁻" },
      ],
    },
  ];

  return (
    <div className="mt-6">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Saturation Analysis
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Simulate scaling behavior across multiple operating conditions.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-5 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">
                Analysis submitted successfully!
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                Your saturation analysis is being processed.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {/* ── Selection Flow ── */}
          <SectionCard title="Selection Flow">
            <SelectField
              label="Select Customer"
              required
              value={selectedCustomerId}
              onChange={handleCustomerChange}
              placeholder="Choose a customer..."
              options={customerOptions}
            />
            <SelectField
              label="Select Asset"
              required
              value={selectedAssetId}
              onChange={handleAssetChange}
              placeholder="Choose an asset..."
              options={assetOptions}
              disabled={!selectedCustomerId}
            />
            <SelectField
              label="Select Water Report"
              required
              value={selectedReportId}
              onChange={handleReportChange}
              placeholder="Choose a water report..."
              options={reportOptions}
              disabled={!selectedAssetId}
            />
          </SectionCard>

          {/* ── Advanced Settings ── */}
          <SectionCard title="Advanced Settings" badge="Optional">
            {/* Salts Selection Mode — options driven from API response */}
            <SelectField
              label="Salts Selection"
              value={saltsSelection}
              onChange={(v) => {
                const mode = v as "Auto" | "Manual";
                setSaltsSelection(mode);
                if (mode === "Auto") {
                  setSaltsOfInterest([]);
                  setPrimarySaltId("");
                }
              }}
              options={[
                { value: "Auto", label: "Auto — test all available salts" },
                { value: "Manual", label: "Manual — choose specific salts" },
              ]}
            />

            {/* Salts Of Interest */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">
                  Salts Of Interest
                  {saltsSelection === "Auto" && (
                    <span className="ml-2 text-xs text-gray-400 font-normal">
                      (all {salts.length} salts tested automatically)
                    </span>
                  )}
                </p>
                {saltsSelection === "Manual" && saltsOfInterest.length > 0 && (
                  <span className="text-xs text-primaryColor font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                    {saltsOfInterest.length} / {salts.length} selected
                  </span>
                )}
              </div>

              {saltsSelection === "Auto" ? (
                /* Auto mode — preview all salts as muted, non-interactive pills */
                <div className="flex flex-wrap gap-2">
                  {saltsLoading
                    ? [...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="h-8 w-20 rounded-full bg-gray-100 animate-pulse"
                        />
                      ))
                    : salts.map((s) => (
                        <span
                          key={s.name}
                          title={s.chemical_formula}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-400 border border-gray-100 flex items-center gap-1"
                        >
                          {s.name}
                          <span className="text-[10px] text-gray-300">
                            {s.chemical_formula}
                          </span>
                        </span>
                      ))}
                </div>
              ) : (
                /* Manual mode — full interactive multi-select from API */
                <MultiSelectSaltPills
                  salts={salts}
                  selected={saltsOfInterest}
                  onChange={setSaltsOfInterest}
                  isLoading={saltsLoading}
                />
              )}
            </div>

            {/* Primary Salt (salt_id) — only in Manual mode, dropdown from API */}
            {saltsSelection === "Manual" && (
              <SelectField
                label="Primary Salt (salt_id)"
                value={primarySaltId}
                onChange={setPrimarySaltId}
                placeholder={
                  saltsLoading ? "Loading salts..." : "Select primary salt..."
                }
                options={saltOptions}
                disabled={saltsLoading}
              />
            )}

            {/* Override Dosage */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Override Dosage (ppm)
              </label>
              <input
                type="number"
                value={overrideDosage}
                onChange={(e) => setOverrideDosage(e.target.value)}
                placeholder="Leave empty to use Asset default"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all"
              />
            </div>

            {/* Charge Balance Adjustment */}
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Charge Balance Adjustment
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {chargeBalanceFields.map(({ label, value, set, opts }) => (
                  <SelectField
                    key={label}
                    label={label}
                    value={value}
                    onChange={set}
                    placeholder="Select"
                    options={opts}
                  />
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ── Treatment Setup ── */}
          <SectionCard title="Treatment Setup" badge="Optional">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Treatment Mode
              </p>
              <div className="flex gap-3 flex-wrap">
                {(["product", "raw"] as const).map((m) => (
                  <label
                    key={m}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      onClick={() => setTreatmentMode(m)}
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        treatmentMode === m
                          ? "border-primaryColor"
                          : "border-gray-300"
                      }`}
                    >
                      {treatmentMode === m && (
                        <div className="w-2 h-2 rounded-full bg-primaryColor" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">
                      {m === "product" ? "Use Product" : "Use Raw Material"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                {treatmentMode === "product" ? (
                  <SelectField
                    label="Select Product"
                    value={productId}
                    onChange={(val) => {
                      setProductId(val);
                      setRawMaterialId("");
                    }}
                    placeholder="Choose a product..."
                    options={[
                      {
                        value: "69abaa6897ccf9ca1415f27b",
                        label: "Corrosion Inhibitor A-200",
                      },
                      {
                        value: "69abaa6897ccf9ca1415f27c",
                        label: "Scale Inhibitor B-100",
                      },
                      {
                        value: "69abaa6897ccf9ca1415f27d",
                        label: "Biocide C-50",
                      },
                    ]}
                  />
                ) : (
                  <SelectField
                    label="Select Raw Material"
                    value={rawMaterialId}
                    onChange={(val) => {
                      setRawMaterialId(val);
                      setProductId("");
                    }}
                    placeholder="Choose a raw material..."
                    options={[
                      {
                        value: "69a6598f361c31d6053fb3ed",
                        label: "Phosphonate",
                      },
                      {
                        value: "69a6598f361c31d6053fb3ee",
                        label: "Polymer",
                      },
                      {
                        value: "69a6598f361c31d6053fb3ef",
                        label: "Molybdate",
                      },
                    ]}
                  />
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Dosage (ppm)
                </label>
                <input
                  type="number"
                  value={dosagePpm}
                  onChange={(e) => setDosagePpm(e.target.value)}
                  placeholder="e.g. 5.0"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all"
                />
              </div>
            </div>
          </SectionCard>

          {/* ── Simulation Parameters ── */}
          <SectionCard title="Simulation Parameters" badge="Optional">
            <RangeFields
              label="Cycles of Concentration (CoC) Range"
              min={cocMin}
              max={cocMax}
              interval={cocInterval}
              onChange={(field, val) => {
                if (field === "min") setCocMin(val);
                else if (field === "max") setCocMax(val);
                else setCocInterval(val);
              }}
            />

            <RangeFields
              label="Temperature Range"
              min={tempMin}
              max={tempMax}
              interval={tempInterval}
              onChange={(field, val) => {
                if (field === "min") setTempMin(val);
                else if (field === "max") setTempMax(val);
                else setTempInterval(val);
              }}
              unit={tempUnit}
              onUnitToggle={() =>
                setTempUnit((u) => (u === "°C" ? "°F" : "°C"))
              }
            />

            <div>
              <p className="text-sm font-semibold text-gray-800 mb-3">
                pH Mode
              </p>
              <div className="flex flex-col gap-2">
                <RadioOption
                  label="Natural pH"
                  description="Use pH derived from water analysis — auto-resolved from Asset"
                  checked={pHMode === "natural"}
                  onChange={() => setPHMode("natural")}
                />
                <RadioOption
                  label="Fixed pH"
                  description="Override with a specific pH value"
                  checked={pHMode === "fixed"}
                  onChange={() => setPHMode("fixed")}
                />
              </div>

              {pHMode === "fixed" && (
                <div className="mt-3 flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Fixed pH Value
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={fixedPh}
                    onChange={(e) => setFixedPh(e.target.value)}
                    placeholder="e.g. 8.2"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-all"
                  />
                </div>
              )}
            </div>
          </SectionCard>

          {/* ── Run Button ── */}
          <div className="flex justify-end pb-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
              className={`flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
                canSubmit && !isLoading
                  ? "bg-primaryColor text-white hover:bg-[#162d4d] active:scale-[0.98] shadow-blue-900/20"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Running Analysis...
                </>
              ) : (
                <>
                  Run Saturation Analysis
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
