// "use client";

// import { useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   useForm,
//   useFieldArray,
//   Controller,
//   SubmitHandler,
// } from "react-hook-form";
// import { RootState } from "@/redux/store";
// import { useGetCreateAssestMutation } from "@/redux/api/assest/customerAssestApi";
// import { useGetSingleCustomerQuery } from "@/redux/api/customer/customerApi";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type AssetType =
//   | "Cooling Tower"
//   | "Evaporative Condenser"
//   | "Once-Through Cooling"
//   | "Seawater Cooling Tower"
//   | "Adiabatic Cooler";

// type TowerType =
//   | "Counterflow"
//   | "Crossflow"
//   | "Induced Draft"
//   | "Forced Draft"
//   | "";
// type FillType = "Film Fill" | "Splash Fill" | "Trickle Fill" | "";

// type Metallurgy =
//   | "Mild Steel"
//   | "Galvanized Steel"
//   | "Copper"
//   | "Admiralty Brass"
//   | "90/10 Copper/Nickel"
//   | "316 Stainless Steel"
//   | "Duplex Stainless"
//   | "304 Stainless Steel"
//   | "70/30 Copper Nickel";

// type OtherMaterial =
//   | "Concrete Lined Pipe"
//   | "Concrete Basin / Construction"
//   | "Wood Construction"
//   | "FRP";

// interface DischargeLimit {
//   parameter: string;
//   limitValue: string;
//   unit: string;
// }
// interface ChemicalProduct {
//   product: string;
//   dosage: string;
//   unit: string;
// }
// interface ControlVariable {
//   variable: string;
//   source: "Water Analysis" | "Manual Input" | "";
//   minValue: string;
//   maxValue: string;
//   unit: string;
// }

// // ── Internal form shape ──────────────────────────────────────────────────────
// interface FormValues {
//   waterTreatmentCompany: string;
//   customerName: string;
//   siteNameLocation: string;
//   assetName: string;
//   assetType: AssetType;
//   towerType: TowerType;
//   fillType: FillType;
//   criticalHeatExchangerDesign: FillType;
//   recirculationRate: string;
//   recirculationUnit: "gpm" | "lpm";
//   tonnageOfCooling: string;
//   systemVolume: string;
//   systemVolumeUnit: "gallons" | "liters";
//   evaporationFactor: string;
//   // temperature
//   supplyTemperature: string;
//   supplyTempUnit: "°F" | "°C";
//   returnTemperature: string;
//   returnTempUnit: "°F" | "°C";
//   // metallurgy
//   metallurgy: Metallurgy[];
//   otherMaterials: OtherMaterial[];
//   // heat exchanger
//   hottestSkinTemp: string;
//   hottestSkinTempUnit: "°F" | "°C";
//   criticalHeatExchangerFlowRate: string;
//   criticalFlowRateUnit: "ft/s" | "m/s";
//   // special requirements
//   nsfStandard60: boolean;
//   nsfG5G7: boolean;
//   gras: boolean;
//   // arrays
//   dischargeLimits: DischargeLimit[];
//   chemicalProducts: ChemicalProduct[];
//   controlVariables: ControlVariable[];
// }

// // ── API payload shape (exact match to backend) ───────────────────────────────
// interface CreateAssetPayload {
//   customerId: string;
//   waterTreatmentCompany: string;
//   customerName: string;
//   siteNameLocation: string;
//   name: string;
//   type: string;
//   towerType: string;
//   fillType: string;
//   criticalHeatExchangerDesign: string;
//   recirculationRate: number;
//   recirculationRateType: string;
//   tonnageOfCooling: number;
//   systemVolume: number;
//   systemVolumeType: string;
//   supplyTemperature: number;
//   supplyTemperatureType: string;
//   returnTemperature: number;
//   returnTemperatureType: string;
//   deltaTemperature: number;
//   systemMetallurgy: string[];
//   systemMaterials: string[];
//   hottestSkinTemperature: number;
//   hottestSkinTemperatureType: string;
//   criticalHeatExchangerFlowRate: number;
//   criticalHeatExchangerFlowRateType: string;
//   NSFStandard60: boolean;
//   "NSFG5/G7": boolean;
//   GRAS: boolean;
//   environmentalDischargeLimits: {
//     parameter: string;
//     limitValue: string;
//     unit: string;
//   }[];
//   productPrograms: { productId: string; dosage: string; unit: string }[];
//   controlVariablesAndTargets: {
//     variable: string;
//     source: string;
//     minValue: number;
//     maxValue: number;
//     unit: string;
//   }[];
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const ASSET_TYPES: AssetType[] = [
//   "Cooling Tower",
//   "Evaporative Condenser",
//   "Once-Through Cooling",
//   "Seawater Cooling Tower",
//   "Adiabatic Cooler",
// ];
// const TOWER_TYPES: TowerType[] = [
//   "Counterflow",
//   "Crossflow",
//   "Induced Draft",
//   "Forced Draft",
// ];
// const FILL_TYPES: FillType[] = ["Film Fill", "Splash Fill", "Trickle Fill"];

// const METALLURGY_OPTIONS: Metallurgy[] = [
//   "Mild Steel",
//   "Galvanized Steel",
//   "Copper",
//   "Admiralty Brass",
//   "90/10 Copper/Nickel",
//   "316 Stainless Steel",
//   "Duplex Stainless",
//   "304 Stainless Steel",
//   "70/30 Copper Nickel",
// ];
// const OTHER_MATERIAL_OPTIONS: OtherMaterial[] = [
//   "Concrete Lined Pipe",
//   "Concrete Basin / Construction",
//   "Wood Construction",
//   "FRP",
// ];
// const DEFAULT_DISCHARGE_LIMITS: DischargeLimit[] = [
//   { parameter: "Upper pH limit", limitValue: "", unit: "pH" },
//   { parameter: "Lower pH limit", limitValue: "", unit: "pH" },
//   { parameter: "Phosphate", limitValue: "", unit: "pH" },
//   { parameter: "Zinc", limitValue: "", unit: "pH" },
//   { parameter: "BOD", limitValue: "", unit: "mg/L" },
//   { parameter: "COD", limitValue: "", unit: "mg/L" },
//   { parameter: "Conductivity", limitValue: "", unit: "µS/cm" },
//   { parameter: "TDS", limitValue: "", unit: "mg/L" },
//   { parameter: "TSS", limitValue: "", unit: "mg/L" },
// ];
// const VARIABLE_OPTIONS = [
//   "Calcium",
//   "Magnesium",
//   "pH",
//   "Conductivity",
//   "Alkalinity",
//   "Chloride",
//   "TDS",
//   "Custom Variable...",
// ];
// const SOURCE_OPTIONS = ["Water Analysis", "Manual Input"] as const;
// const PRODUCT_OPTIONS = [
//   "Scale Inhibitor",
//   "Corrosion Inhibitor",
//   "Biocide",
//   "Dispersant",
//   "pH Adjuster",
//   "Custom Product...",
// ];

// // ─── Shared UI ────────────────────────────────────────────────────────────────

// const Label = ({
//   children,
//   required,
// }: {
//   children: React.ReactNode;
//   required?: boolean;
// }) => (
//   <label className="block text-xs font-medium text-gray-500 mb-1.5">
//     {children}
//     {required && <span className="text-red-400 ml-0.5">*</span>}
//   </label>
// );

// const Input = ({
//   className = "",
//   ...props
// }: React.InputHTMLAttributes<HTMLInputElement>) => (
//   <input
//     {...props}
//     className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800
//       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition ${className}`}
//   />
// );

// const SubSection = ({ title }: { title: string }) => (
//   <div className="flex items-center gap-2 mb-4">
//     <div className="w-1 h-5 bg-teal-500 rounded-full" />
//     <h3 className="text-base font-semibold text-gray-800">{title}</h3>
//   </div>
// );

// const Toggle = ({
//   checked,
//   onChange,
// }: {
//   checked: boolean;
//   onChange: () => void;
// }) => (
//   <button
//     type="button"
//     onClick={onChange}
//     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-teal-500" : "bg-gray-200"}`}
//   >
//     <span
//       className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
//     />
//   </button>
// );

// const ChipButton = ({
//   label,
//   selected,
//   onClick,
// }: {
//   label: string;
//   selected: boolean;
//   onClick: () => void;
// }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
//       selected
//         ? "bg-teal-50 border-teal-400 text-teal-700"
//         : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
//     }`}
//   >
//     {label}
//   </button>
// );

// const Card = ({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => (
//   <div
//     className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}
//   >
//     {children}
//   </div>
// );

// const SelectField = ({
//   field,
//   options,
//   placeholder,
// }: {
//   field: any;
//   options: string[];
//   placeholder?: string;
// }) => (
//   <div className="relative">
//     <select
//       {...field}
//       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800
//         focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
//     >
//       {placeholder && <option value="">{placeholder}</option>}
//       {options.map((o) => (
//         <option key={o} value={o}>
//           {o}
//         </option>
//       ))}
//     </select>
//     <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//       ▾
//     </div>
//   </div>
// );

// const UnitSelect = ({ field, options }: { field: any; options: string[] }) => (
//   <div className="relative shrink-0">
//     <select
//       {...field}
//       className="h-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none
//         focus:outline-none focus:ring-2 focus:ring-teal-400"
//     >
//       {options.map((o) => (
//         <option key={o} value={o}>
//           {o}
//         </option>
//       ))}
//     </select>
//     <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//       ▾
//     </div>
//   </div>
// );

// const TrashIcon = () => (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//     />
//   </svg>
// );

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function CoolingWaterAssetConfig() {
//   // ── Redux ──────────────────────────────────────────────────────────────────
//   const customerId = useSelector(
//     (state: RootState) => state.customerId.customerId,
//   );
//   const [createAssest, { isLoading }] = useGetCreateAssestMutation();

//   console.log(customerId);
//   const { data: singleCustomer, error } = useGetSingleCustomerQuery(
//     customerId || "",
//   );

//   // ── Local UI state ─────────────────────────────────────────────────────────
//   const [showAssetTypeDropdown, setShowAssetTypeDropdown] = useState(false);
//   const [supplyTempVal, setSupplyTempVal] = useState("85");
//   const [returnTempVal, setReturnTempVal] = useState("95");

//   // ── Delta T (reactive) ─────────────────────────────────────────────────────
//   const returnNum = parseFloat(returnTempVal);
//   const supplyNum = parseFloat(supplyTempVal);
//   const deltaT =
//     !isNaN(returnNum) && !isNaN(supplyNum)
//       ? (returnNum - supplyNum).toFixed(1)
//       : "—";

//   // ── React Hook Form ────────────────────────────────────────────────────────
//   const { register, control, handleSubmit, watch, setValue, getValues } =
//     useForm<FormValues>({
//       defaultValues: {
//         assetName: "",
//         assetType: "Cooling Tower",
//         towerType: "",
//         fillType: "",
//         criticalHeatExchangerDesign: "",
//         recirculationRate: "",
//         recirculationUnit: "gpm",
//         tonnageOfCooling: "",
//         systemVolume: "",
//         systemVolumeUnit: "gallons",
//         evaporationFactor: "0.85",
//         supplyTemperature: "85",
//         supplyTempUnit: "°F",
//         returnTemperature: "95",
//         returnTempUnit: "°F",
//         metallurgy: [],
//         otherMaterials: [],
//         hottestSkinTemp: "",
//         hottestSkinTempUnit: "°F",
//         criticalHeatExchangerFlowRate: "",
//         criticalFlowRateUnit: "ft/s",
//         nsfStandard60: false,
//         nsfG5G7: false,
//         gras: false,
//         dischargeLimits: DEFAULT_DISCHARGE_LIMITS,
//         chemicalProducts: [{ product: "", dosage: "", unit: "ppm" }],
//         controlVariables: [
//           {
//             variable: "",
//             source: "Water Analysis",
//             minValue: "",
//             maxValue: "",
//             unit: "ppm",
//           },
//         ],
//       },
//     });

//   const watchedAssetType = watch("assetType");
//   const watchedMetallurgy = watch("metallurgy");
//   const watchedOtherMaterials = watch("otherMaterials");
//   const watchedNsf60 = watch("nsfStandard60");
//   const watchedNsfG5G7 = watch("nsfG5G7");
//   const watchedGras = watch("gras");
//   const watchedSupplyUnit = watch("supplyTempUnit");

//   // ── Field Arrays ───────────────────────────────────────────────────────────
//   const {
//     fields: dischargeLimitFields,
//     append: appendDischargeLimit,
//     remove: removeDischargeLimit,
//   } = useFieldArray({ control, name: "dischargeLimits" });
//   const {
//     fields: chemicalProductFields,
//     append: appendChemicalProduct,
//     remove: removeChemicalProduct,
//   } = useFieldArray({ control, name: "chemicalProducts" });
//   const {
//     fields: controlVariableFields,
//     append: appendControlVariable,
//     remove: removeControlVariable,
//   } = useFieldArray({ control, name: "controlVariables" });

//   // ── Metallurgy toggle ──────────────────────────────────────────────────────
//   const toggleMetallurgy = (m: Metallurgy) => {
//     const cur = getValues("metallurgy");
//     setValue(
//       "metallurgy",
//       cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m],
//     );
//   };
//   const toggleOtherMaterial = (m: OtherMaterial) => {
//     const cur = getValues("otherMaterials");
//     setValue(
//       "otherMaterials",
//       cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m],
//     );
//   };

//   // ── Submit → build payload → call API ─────────────────────────────────────
//   const onSubmit: SubmitHandler<FormValues> = async (data) => {
//     const deltaTNum =
//       !isNaN(returnNum) && !isNaN(supplyNum) ? returnNum - supplyNum : 0;

//     const payload: CreateAssetPayload = {
//       customerId: customerId as string,
//       waterTreatmentCompany: data.waterTreatmentCompany,
//       customerName: data.customerName,
//       siteNameLocation: data.siteNameLocation,
//       name: data.assetName,
//       type: data.assetType,
//       towerType: data.towerType,
//       fillType: data.fillType,
//       criticalHeatExchangerDesign: data.criticalHeatExchangerDesign,
//       recirculationRate: parseFloat(data.recirculationRate) || 0,
//       recirculationRateType: data.recirculationUnit,
//       tonnageOfCooling: parseFloat(data.tonnageOfCooling) || 0,
//       systemVolume: parseFloat(data.systemVolume) || 0,
//       systemVolumeType: data.systemVolumeUnit,
//       supplyTemperature: parseFloat(supplyTempVal) || 0,
//       supplyTemperatureType: data.supplyTempUnit,
//       returnTemperature: parseFloat(returnTempVal) || 0,
//       returnTemperatureType: data.returnTempUnit,
//       deltaTemperature: deltaTNum,
//       systemMetallurgy: data.metallurgy,
//       systemMaterials: data.otherMaterials,
//       hottestSkinTemperature: parseFloat(data.hottestSkinTemp) || 0,
//       hottestSkinTemperatureType: data.hottestSkinTempUnit,
//       criticalHeatExchangerFlowRate:
//         parseFloat(data.criticalHeatExchangerFlowRate) || 0,
//       criticalHeatExchangerFlowRateType: data.criticalFlowRateUnit,
//       NSFStandard60: data.nsfStandard60,
//       "NSFG5/G7": data.nsfG5G7,
//       GRAS: data.gras,
//       environmentalDischargeLimits: data.dischargeLimits.map((d) => ({
//         parameter: d.parameter,
//         limitValue: d.limitValue,
//         unit: d.unit,
//       })),
//       productPrograms: data.chemicalProducts.map((p) => ({
//         productId: p.product, // product name → productId
//         dosage: p.dosage,
//         unit: p.unit,
//       })),
//       controlVariablesAndTargets: data.controlVariables.map((c) => ({
//         variable: c.variable,
//         source: c.source,
//         minValue: parseFloat(c.minValue) || 0,
//         maxValue: parseFloat(c.maxValue) || 0,
//         unit: c.unit,
//       })),
//     };

//     try {
//       await createAssest(payload).unwrap();
//       alert("Asset created successfully!");
//     } catch (err) {
//       console.error("Create asset failed:", err);
//       alert("Failed to create asset. Please try again.");
//     }
//   };

//   // ─── JSX ──────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-50 font-sans mt-6">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* ── Page Title ── */}
//         <div className="my-6">
//           <h1 className="lg:text-3xl text-2xl font-bold text-gray-900 tracking-tight">
//             Cooling Water Asset Configuration
//           </h1>
//           <p className="text-sm text-gray-500 mt-2">
//             Describe the physical cooling system assets used at your facility.
//           </p>
//         </div>

//         {/* ── Top Fields Card ── */}
//         <Card>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <Label>Water Treatment Company</Label>
//               <Input
//                 placeholder="e.g. Aqua Tech Solutions"
//                 {...register("waterTreatmentCompany")}
//               />
//             </div>
//             <div>
//               <Label>Customer Name</Label>
//               <Input
//                 placeholder="e.g. Tech Industries Corp."
//                 {...register("customerName")}
//               />
//             </div>
//             <div>
//               <Label>Site Name & Location</Label>
//               <Input
//                 placeholder="e.g. Main Facility – Houston, TX"
//                 {...register("siteNameLocation")}
//               />
//             </div>
//             <div>
//               <Label required>Asset Name</Label>
//               <Input
//                 placeholder="Enter asset name"
//                 {...register("assetName", { required: true })}
//               />
//             </div>
//           </div>
//         </Card>

//         {/* ── Asset Type Card ── */}
//         <Card>
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
//               <svg
//                 className="w-5 h-5 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-base font-semibold text-gray-900">
//               Asset Type
//             </h2>
//           </div>
//           <div className="relative w-72">
//             <button
//               type="button"
//               onClick={() => setShowAssetTypeDropdown(!showAssetTypeDropdown)}
//               className="w-full flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-800 hover:border-gray-300 transition"
//             >
//               <span className="w-2 h-2 rounded-full bg-green-500" />
//               {watchedAssetType}
//               <span className="ml-auto text-gray-400">▾</span>
//             </button>
//             {showAssetTypeDropdown && (
//               <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-30 overflow-hidden">
//                 {ASSET_TYPES.map((type) => (
//                   <button
//                     key={type}
//                     type="button"
//                     onClick={() => {
//                       setValue("assetType", type);
//                       setShowAssetTypeDropdown(false);
//                     }}
//                     className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition ${watchedAssetType === type ? "text-teal-600 font-medium" : "text-gray-700"}`}
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Card>

//         {/* ── Asset Details Card ── */}
//         <Card>
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Asset Details
//             </h2>
//             <p className="text-sm text-gray-500 mt-0.5">
//               Configure evaporative condenser operating parameters
//             </p>
//           </div>

//           {/* Mechanical Details */}
//           <SubSection title="Mechanical Details" />
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//             <div>
//               <Label>Tower Type</Label>
//               <Controller
//                 name="towerType"
//                 control={control}
//                 render={({ field }) => (
//                   <SelectField
//                     field={field}
//                     options={TOWER_TYPES}
//                     placeholder="Select tower type..."
//                   />
//                 )}
//               />
//             </div>
//             <div>
//               <Label>Fill Type</Label>
//               <Controller
//                 name="fillType"
//                 control={control}
//                 render={({ field }) => (
//                   <SelectField
//                     field={field}
//                     options={FILL_TYPES}
//                     placeholder="Select fill type..."
//                   />
//                 )}
//               />
//             </div>
//             <div>
//               <Label>Critical Heat Exchanger Design</Label>
//               <Controller
//                 name="criticalHeatExchangerDesign"
//                 control={control}
//                 render={({ field }) => (
//                   <SelectField
//                     field={field}
//                     options={FILL_TYPES}
//                     placeholder="Select fill type..."
//                   />
//                 )}
//               />
//             </div>
//           </div>

//           {/* Recirculation & Volume */}
//           <SubSection title="Recirculation & Volume" />
//           <div className="border border-gray-200 rounded-xl mb-6 overflow-hidden">
//             <div className="flex flex-col lg:flex-row">
//               {/* LEFT — Recirculation Rate */}
//               <div className="flex-1 p-5">
//                 <Label required>Recirculation Rate</Label>
//                 <div className="flex gap-2 mt-1">
//                   <Input
//                     type="number"
//                     className="flex-1 min-w-0"
//                     placeholder="e.g. 1000"
//                     {...register("recirculationRate")}
//                   />
//                   <Controller
//                     name="recirculationUnit"
//                     control={control}
//                     render={({ field }) => (
//                       <div className="relative w-20 shrink-0">
//                         <select
//                           {...field}
//                           className="w-full h-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
//                         >
//                           <option value="gpm">gpm</option>
//                           <option value="lpm">lpm</option>
//                         </select>
//                         <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//                           ▾
//                         </div>
//                       </div>
//                     )}
//                   />
//                 </div>
//                 <p className="text-xs text-teal-600 mt-2">
//                   Auto-calculated if tonnage is provided
//                 </p>
//               </div>

//               {/* CENTER — OR */}
//               <div className="flex lg:flex-col items-center justify-center px-4 py-3 lg:py-0 bg-gray-50 border-t border-b lg:border-t-0 lg:border-b-0 lg:border-l lg:border-r border-gray-200">
//                 <div className="w-9 h-9 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-xs font-bold text-gray-400 shadow-sm">
//                   OR
//                 </div>
//               </div>

//               {/* RIGHT — Tonnage */}
//               <div className="flex-1 p-5">
//                 <Label>Tonnage of Cooling</Label>
//                 <div className="flex gap-2 mt-1">
//                   <Input
//                     type="number"
//                     className="flex-1 min-w-0"
//                     placeholder="e.g. 350"
//                     {...register("tonnageOfCooling")}
//                   />
//                   <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg bg-gray-50 shrink-0">
//                     tons
//                   </span>
//                 </div>
//                 <p className="text-xs text-gray-400 mt-2">
//                   Entering tonnage will auto-calculate recirculation rate
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* System Volume + Evaporation Factor */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//             <div>
//               <Label required>System Volume</Label>
//               <div className="flex gap-2">
//                 <Input
//                   type="number"
//                   className="flex-1 min-w-0"
//                   placeholder="e.g. 5000"
//                   {...register("systemVolume")}
//                 />
//                 <Controller
//                   name="systemVolumeUnit"
//                   control={control}
//                   render={({ field }) => (
//                     <div className="relative w-24 shrink-0">
//                       <select
//                         {...field}
//                         className="w-full h-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
//                       >
//                         <option value="gallons">gallons</option>
//                         <option value="liters">liters</option>
//                       </select>
//                       <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//                         ▾
//                       </div>
//                     </div>
//                   )}
//                 />
//               </div>
//             </div>
//             <div>
//               <Label>
//                 Evaporation Factor{" "}
//                 <span
//                   className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-gray-400 text-xs ml-1 cursor-help"
//                   title="Fraction of recirculating water that evaporates"
//                 >
//                   ⓘ
//                 </span>
//               </Label>
//               <Input
//                 type="number"
//                 step="0.01"
//                 {...register("evaporationFactor")}
//               />
//             </div>
//           </div>

//           {/* System Volume & Temperature */}
//           <SubSection title="System Volume & Temperature" />
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {/* Supply Temperature */}
//             <div>
//               <Label>Supply Temperature</Label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800
//                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//                   placeholder="e.g. 85"
//                   value={supplyTempVal}
//                   onChange={(e) => {
//                     setSupplyTempVal(e.target.value);
//                     setValue("supplyTemperature", e.target.value);
//                   }}
//                 />
//                 <Controller
//                   name="supplyTempUnit"
//                   control={control}
//                   render={({ field }) => (
//                     <div className="relative w-16 shrink-0">
//                       <select
//                         {...field}
//                         className="w-full h-full px-1 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
//                       >
//                         <option value="°F">°F</option>
//                         <option value="°C">°C</option>
//                       </select>
//                       <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//                         ▾
//                       </div>
//                     </div>
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Return Temperature */}
//             <div>
//               <Label>Return Temperature</Label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800
//                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//                   placeholder="e.g. 95"
//                   value={returnTempVal}
//                   onChange={(e) => {
//                     setReturnTempVal(e.target.value);
//                     setValue("returnTemperature", e.target.value);
//                   }}
//                 />
//                 <Controller
//                   name="returnTempUnit"
//                   control={control}
//                   render={({ field }) => (
//                     <div className="relative w-16 shrink-0">
//                       <select
//                         {...field}
//                         className="w-full h-full px-1 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
//                       >
//                         <option value="°F">°F</option>
//                         <option value="°C">°C</option>
//                       </select>
//                       <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//                         ▾
//                       </div>
//                     </div>
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Delta T — calculated */}
//             <div className="sm:col-span-2 lg:col-span-1">
//               <Label>Delta T (Calculated)</Label>
//               <div className="flex gap-2">
//                 <div
//                   className={`flex-1 min-w-0 px-3 py-2 text-sm rounded-lg font-semibold border-2 transition-all duration-200 ${
//                     deltaT !== "—"
//                       ? "border-teal-400 bg-teal-50 text-teal-700"
//                       : "border-gray-200 bg-gray-50 text-gray-400"
//                   }`}
//                 >
//                   {deltaT}
//                 </div>
//                 <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg bg-gray-50 shrink-0">
//                   {watchedSupplyUnit || "°F"}
//                 </span>
//               </div>
//               <p className="text-xs text-gray-400 mt-1.5">
//                 Formula: Delta T = Return − Supply
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* ── System Metallurgy & Materials ── */}
//         <Card>
//           <SubSection title="System Metallurgy" />
//           <p className="text-xs text-gray-500 mb-3">Select all that apply</p>
//           <div className="flex flex-wrap gap-2 mb-8">
//             {METALLURGY_OPTIONS.map((m) => (
//               <ChipButton
//                 key={m}
//                 label={m}
//                 selected={watchedMetallurgy.includes(m)}
//                 onClick={() => toggleMetallurgy(m)}
//               />
//             ))}
//           </div>

//           <SubSection title="System Materials — Other" />
//           <p className="text-xs text-gray-500 mb-3">Select all that apply</p>
//           <div className="flex flex-wrap gap-2 mb-8">
//             {OTHER_MATERIAL_OPTIONS.map((m) => (
//               <ChipButton
//                 key={m}
//                 label={m}
//                 selected={watchedOtherMaterials.includes(m)}
//                 onClick={() => toggleOtherMaterial(m)}
//               />
//             ))}
//           </div>

//           {/* Heat Exchanger Details */}
//           <SubSection title="Heat Exchanger Details" />
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//             <div>
//               <Label required>Hottest Skin Temperature</Label>
//               <div className="flex gap-2">
//                 <Input
//                   type="number"
//                   className="flex-1"
//                   placeholder="e.g. 200"
//                   {...register("hottestSkinTemp")}
//                 />
//                 <Controller
//                   name="hottestSkinTempUnit"
//                   control={control}
//                   render={({ field }) => (
//                     <UnitSelect field={field} options={["°F", "°C"]} />
//                   )}
//                 />
//               </div>
//             </div>
//             <div>
//               <Label required>Critical Heat Exchanger Flow Rate</Label>
//               <div className="flex gap-2">
//                 <Input
//                   type="number"
//                   className="flex-1"
//                   placeholder="e.g. 5"
//                   {...register("criticalHeatExchangerFlowRate")}
//                 />
//                 <Controller
//                   name="criticalFlowRateUnit"
//                   control={control}
//                   render={({ field }) => (
//                     <UnitSelect field={field} options={["ft/s", "m/s"]} />
//                   )}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Special Requirements */}
//           <SubSection title="Special Requirements" />
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {(
//               [
//                 {
//                   key: "nsfStandard60" as const,
//                   title: "NSF Standard 60",
//                   sub: "Drinking water components",
//                   val: watchedNsf60,
//                 },
//                 {
//                   key: "nsfG5G7" as const,
//                   title: "NSF G5/G7",
//                   sub: "Food processing",
//                   val: watchedNsfG5G7,
//                 },
//                 {
//                   key: "gras" as const,
//                   title: "GRAS",
//                   sub: "Generally Recognized As Safe",
//                   val: watchedGras,
//                 },
//               ] as const
//             ).map(({ key, title, sub, val }) => (
//               <div
//                 key={key}
//                 className="border border-gray-100 rounded-xl p-4 flex items-start justify-between"
//               >
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">{title}</p>
//                   <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
//                 </div>
//                 <Toggle checked={val} onChange={() => setValue(key, !val)} />
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* ── Environmental Discharge Limits ── */}
//         <Card>
//           <SubSection title="Environmental Discharge Limits" />
//           <div className="overflow-x-auto mb-4">
//             <div className="border border-gray-100 rounded-xl overflow-hidden min-w-[500px]">
//               <div className="grid grid-cols-[1fr_1fr_1fr_48px] bg-gray-50 border-b border-gray-100 px-4 py-2.5">
//                 {["Parameter", "Limit Value", "Unit", "Action"].map((h) => (
//                   <span
//                     key={h}
//                     className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
//                   >
//                     {h}
//                   </span>
//                 ))}
//               </div>
//               {dischargeLimitFields.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-[1fr_1fr_1fr_48px] items-center px-4 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
//                 >
//                   <Input
//                     className="mr-2 text-xs"
//                     {...register(`dischargeLimits.${index}.parameter`)}
//                   />
//                   <Input
//                     placeholder="Value..."
//                     className="mx-2 text-xs"
//                     {...register(`dischargeLimits.${index}.limitValue`)}
//                   />
//                   <Input
//                     className="mx-2 text-xs"
//                     {...register(`dischargeLimits.${index}.unit`)}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeDischargeLimit(index)}
//                     className="text-red-400 hover:text-red-600 transition flex items-center justify-center"
//                   >
//                     <TrashIcon />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() =>
//               appendDischargeLimit({
//                 parameter: "",
//                 limitValue: "",
//                 unit: "mg/L",
//               })
//             }
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition"
//           >
//             <span className="text-lg leading-none">+</span> Add Custom Limit
//           </button>
//         </Card>

//         {/* ── Chemical Treatment Program ── */}
//         <Card>
//           <SubSection title="Current Chemical Treatment Program" />
//           <p className="text-xs text-gray-500 mb-4 font-medium">
//             Product Program
//           </p>
//           <div className="overflow-x-auto mb-4">
//             <div className="border border-gray-100 rounded-xl overflow-hidden min-w-[500px]">
//               <div className="grid grid-cols-[1fr_1fr_1fr_48px] bg-gray-50 border-b border-gray-100 px-4 py-2.5">
//                 {["Product", "Dosage", "Unit", "Remove"].map((h) => (
//                   <span
//                     key={h}
//                     className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
//                   >
//                     {h}
//                   </span>
//                 ))}
//               </div>
//               {chemicalProductFields.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-[1fr_1fr_1fr_48px] items-center px-4 py-2.5 border-b border-gray-50 last:border-0"
//                 >
//                   <Controller
//                     name={`chemicalProducts.${index}.product`}
//                     control={control}
//                     render={({ field: f }) => (
//                       <div className="relative mr-2">
//                         <select
//                           {...f}
//                           className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
//                         >
//                           <option value="">Select product...</option>
//                           {PRODUCT_OPTIONS.map((p) => (
//                             <option key={p} value={p}>
//                               {p}
//                             </option>
//                           ))}
//                         </select>
//                         <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//                           ▾
//                         </div>
//                       </div>
//                     )}
//                   />
//                   <Input
//                     placeholder="Dosage..."
//                     className="mx-2 text-xs"
//                     {...register(`chemicalProducts.${index}.dosage`)}
//                   />
//                   <Controller
//                     name={`chemicalProducts.${index}.unit`}
//                     control={control}
//                     render={({ field: f }) => (
//                       <div className="relative mx-2">
//                         <select
//                           {...f}
//                           className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
//                         >
//                           <option value="ppm">ppm</option>
//                           <option value="mg/L">mg/L</option>
//                           <option value="mL/day">mL/day</option>
//                         </select>
//                         <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//                           ▾
//                         </div>
//                       </div>
//                     )}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeChemicalProduct(index)}
//                     className="text-red-400 hover:text-red-600 transition flex items-center justify-center"
//                   >
//                     <TrashIcon />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() =>
//               appendChemicalProduct({ product: "", dosage: "", unit: "ppm" })
//             }
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition"
//           >
//             <span className="text-lg leading-none">+</span> Add Product
//           </button>
//         </Card>

//         {/* ── Control Variables & Targets ── */}
//         <Card>
//           <SubSection title="Control Variables & Targets" />
//           <p className="text-xs text-gray-500 mb-4">
//             Define acceptable operating ranges for key water parameters.
//           </p>
//           <div className="overflow-x-auto mb-4">
//             <div className="border border-gray-100 rounded-xl overflow-hidden min-w-[700px]">
//               <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_48px] bg-gray-50 border-b border-gray-100 px-4 py-2.5 gap-2">
//                 {[
//                   "Variable",
//                   "Source",
//                   "Min Value",
//                   "Max Value",
//                   "Unit",
//                   "Remove",
//                 ].map((h) => (
//                   <span
//                     key={h}
//                     className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
//                   >
//                     {h}
//                   </span>
//                 ))}
//               </div>
//               {controlVariableFields.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_48px] items-center px-4 py-2.5 border-b border-gray-50 last:border-0 gap-2"
//                 >
//                   <Controller
//                     name={`controlVariables.${index}.variable`}
//                     control={control}
//                     render={({ field: f }) => (
//                       <div className="relative">
//                         <select
//                           {...f}
//                           className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
//                         >
//                           <option value="">Select variable</option>
//                           {VARIABLE_OPTIONS.map((v) => (
//                             <option key={v} value={v}>
//                               {v}
//                             </option>
//                           ))}
//                         </select>
//                         <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//                           ▾
//                         </div>
//                       </div>
//                     )}
//                   />
//                   <Controller
//                     name={`controlVariables.${index}.source`}
//                     control={control}
//                     render={({ field: f }) => (
//                       <div className="relative">
//                         <select
//                           {...f}
//                           className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
//                         >
//                           {SOURCE_OPTIONS.map((s) => (
//                             <option key={s} value={s}>
//                               {s}
//                             </option>
//                           ))}
//                         </select>
//                         <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//                           ▾
//                         </div>
//                       </div>
//                     )}
//                   />
//                   <Input
//                     type="number"
//                     placeholder="Min"
//                     {...register(`controlVariables.${index}.minValue`)}
//                     className="text-xs"
//                   />
//                   <Input
//                     type="number"
//                     placeholder="Max"
//                     {...register(`controlVariables.${index}.maxValue`)}
//                     className="text-xs"
//                   />
//                   <Controller
//                     name={`controlVariables.${index}.unit`}
//                     control={control}
//                     render={({ field: f }) => (
//                       <div className="relative">
//                         <select
//                           {...f}
//                           className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
//                         >
//                           {["ppm", "mg/L", "µS/cm", "pH", "°F", "°C"].map(
//                             (u) => (
//                               <option key={u} value={u}>
//                                 {u}
//                               </option>
//                             ),
//                           )}
//                         </select>
//                         <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
//                           ▾
//                         </div>
//                       </div>
//                     )}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeControlVariable(index)}
//                     className="text-red-400 hover:text-red-600 transition flex items-center justify-center"
//                   >
//                     <TrashIcon />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() =>
//               appendControlVariable({
//                 variable: "",
//                 source: "Water Analysis",
//                 minValue: "",
//                 maxValue: "",
//                 unit: "ppm",
//               })
//             }
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition"
//           >
//             <span className="text-lg leading-none">+</span> Add Variable
//           </button>
//         </Card>

//         {/* ── Submit ── */}
//         <div className="flex justify-end pb-8">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="px-8 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             {isLoading && (
//               <svg
//                 className="animate-spin h-4 w-4 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v8H4z"
//                 />
//               </svg>
//             )}
//             {isLoading ? "Saving..." : "Save Data"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { RootState } from "@/redux/store";
import { useGetCreateAssestMutation } from "@/redux/api/assest/customerAssestApi";
import { useGetSingleCustomerQuery } from "@/redux/api/customer/customerApi";

// ─── Types ────────────────────────────────────────────────────────────────────

type AssetType =
  | "Cooling Tower"
  | "Evaporative Condenser"
  | "Once-Through Cooling";
// | "Seawater Cooling Tower"
// | "Adiabatic Cooler";

type TowerType =
  | "Counterflow"
  | "Crossflow"
  | "Induced Draft"
  | "Forced Draft"
  | "";
type FillType = "Film Fill" | "Splash Fill" | "Trickle Fill" | "";

type Metallurgy =
  | "Mild Steel"
  | "Galvanized Steel"
  | "Copper"
  | "Admiralty Brass"
  | "90/10 Copper/Nickel"
  | "316 Stainless Steel"
  | "Duplex Stainless"
  | "304 Stainless Steel"
  | "70/30 Copper Nickel";

type OtherMaterial =
  | "Concrete Lined Pipe"
  | "Concrete Basin / Construction"
  | "Wood Construction"
  | "FRP";

interface DischargeLimit {
  parameter: string;
  limitValue: string;
  unit: string;
}
interface ChemicalProduct {
  product: string;
  dosage: string;
  unit: string;
}
interface ControlVariable {
  variable: string;
  source: "Water Analysis" | "Manual Input" | "";
  minValue: string;
  maxValue: string;
  unit: string;
}

// ── Internal form shape ──────────────────────────────────────────────────────
interface FormValues {
  // top fields
  waterTreatmentCompany: string;
  customerName: string;
  siteNameLocation: string;
  assetName: string;
  assetType: AssetType;

  // Cooling Tower / Evaporative Condenser fields
  towerType: TowerType;
  fillType: FillType;
  criticalHeatExchangerDesign: FillType;
  recirculationRate: string;
  recirculationUnit: "gpm" | "lpm";
  tonnageOfCooling: string;
  systemVolume: string;
  systemVolumeUnit: "gallons" | "liters";
  evaporationFactor: string;
  supplyTemperature: string;
  supplyTempUnit: "°F" | "°C";
  returnTemperature: string;
  returnTempUnit: "°F" | "°C";

  // Once-Through Cooling fields
  flowRate: string;
  flowRateUnit: string;
  onceThroughSupplyTemp: string;
  onceThroughSupplyUnit: "°F" | "°C";
  dischargeTemperature: string;
  dischargeTempUnit: "°F" | "°C";
  criticalCooling: string;
  criticalFlowRate: string;
  criticalFlowRateUnit: string;
  onceThroughHottestSkin: string;
  onceThroughHottestUnit: "°F" | "°C";

  // shared
  metallurgy: Metallurgy[];
  otherMaterials: OtherMaterial[];
  hottestSkinTemp: string;
  hottestSkinTempUnit: "°F" | "°C";
  criticalHeatExchangerFlowRate: string;
  criticalHxFlowRateUnit: "ft/s" | "m/s";
  nsfStandard60: boolean;
  nsfG5G7: boolean;
  gras: boolean;
  dischargeLimits: DischargeLimit[];
  chemicalProducts: ChemicalProduct[];
  controlVariables: ControlVariable[];
}

// ── API payload ──────────────────────────────────────────────────────────────
interface CreateAssetPayload {
  customerId: string;
  waterTreatmentCompany: string;
  customerName: string;
  siteNameLocation: string;
  name: string;
  type: string;
  // Cooling Tower / Evaporative Condenser
  towerType?: string;
  fillType?: string;
  criticalHeatExchangerDesign?: string;
  recirculationRate?: number;
  recirculationRateType?: string;
  tonnageOfCooling?: number;
  systemVolume?: number;
  systemVolumeType?: string;
  supplyTemperature?: number;
  supplyTemperatureType?: string;
  returnTemperature?: number;
  returnTemperatureType?: string;
  deltaTemperature?: number;
  // Once-Through Cooling
  flowRate?: number;
  flowRateType?: string;
  dischargeTemperature?: number;
  dischargeTemperatureType?: string;
  criticalCooling?: string;
  criticalFlowRate?: number;
  criticalFlowRateType?: string;
  // shared
  systemMetallurgy: string[];
  systemMaterials: string[];
  hottestSkinTemperature: number;
  hottestSkinTemperatureType: string;
  criticalHeatExchangerFlowRate: number;
  criticalHeatExchangerFlowRateType: string;
  NSFStandard60: boolean;
  "NSFG5/G7": boolean;
  GRAS: boolean;
  environmentalDischargeLimits: {
    parameter: string;
    limitValue: string;
    unit: string;
  }[];
  productPrograms: { productId: string; dosage: string; unit: string }[];
  controlVariablesAndTargets: {
    variable: string;
    source: string;
    minValue: number;
    maxValue: number;
    unit: string;
  }[];
}

// ─── Constants ────────────────────────────────────────────────────────────────
const ASSET_TYPES: AssetType[] = [
  "Cooling Tower",
  "Evaporative Condenser",
  "Once-Through Cooling",
  // "Seawater Cooling Tower",
  // "Adiabatic Cooler",
];
const TOWER_TYPES: TowerType[] = [
  "Counterflow",
  "Crossflow",
  "Induced Draft",
  "Forced Draft",
];
const FILL_TYPES: FillType[] = ["Film Fill", "Splash Fill", "Trickle Fill"];
const METALLURGY_OPTIONS: Metallurgy[] = [
  "Mild Steel",
  "Galvanized Steel",
  "Copper",
  "Admiralty Brass",
  "90/10 Copper/Nickel",
  "316 Stainless Steel",
  "Duplex Stainless",
  "304 Stainless Steel",
  "70/30 Copper Nickel",
];
const OTHER_MATERIAL_OPTIONS: OtherMaterial[] = [
  "Concrete Lined Pipe",
  "Concrete Basin / Construction",
  "Wood Construction",
  "FRP",
];
const DEFAULT_DISCHARGE_LIMITS: DischargeLimit[] = [
  { parameter: "Upper pH limit", limitValue: "", unit: "pH" },
  { parameter: "Lower pH limit", limitValue: "", unit: "pH" },
  { parameter: "Phosphate", limitValue: "", unit: "pH" },
  { parameter: "Zinc", limitValue: "", unit: "pH" },
  { parameter: "BOD", limitValue: "", unit: "mg/L" },
  { parameter: "COD", limitValue: "", unit: "mg/L" },
  { parameter: "Conductivity", limitValue: "", unit: "µS/cm" },
  { parameter: "TDS", limitValue: "", unit: "mg/L" },
  { parameter: "TSS", limitValue: "", unit: "mg/L" },
];
const VARIABLE_OPTIONS = [
  "Calcium",
  "Magnesium",
  "pH",
  "Conductivity",
  "Alkalinity",
  "Chloride",
  "TDS",
  "Custom Variable...",
];
const SOURCE_OPTIONS = ["Water Analysis", "Manual Input"] as const;
const PRODUCT_OPTIONS = [
  "Scale Inhibitor",
  "Corrosion Inhibitor",
  "Biocide",
  "Dispersant",
  "pH Adjuster",
  "Custom Product...",
];
const CRITICAL_COOLING_OPTIONS = [
  "Heat Exchanger",
  "Condenser",
  "Process Cooler",
  "Other",
];
const FLOW_RATE_UNITS = ["gpm", "lpm", "m³/hr"];
const TEMP_UNITS = ["°F", "°C"];
const FLOW_RATE_UNITS2 = ["ft/s", "m/s", "m³/hr"];

// ─── Shared UI ────────────────────────────────────────────────────────────────
const Label = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <label className="block text-xs font-medium text-gray-500 mb-1.5">
    {children}
    {required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

const Input = ({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800
      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition ${className}`}
  />
);

const SubSection = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1 h-5 bg-teal-500 rounded-full" />
    <h3 className="text-base font-semibold text-gray-800">{title}</h3>
  </div>
);

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-teal-500" : "bg-gray-200"}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
    />
  </button>
);

const ChipButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
      selected
        ? "bg-teal-50 border-teal-400 text-teal-700"
        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
    }`}
  >
    {label}
  </button>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}
  >
    {children}
  </div>
);

const SelectField = ({
  field,
  options,
  placeholder,
}: {
  field: any;
  options: string[];
  placeholder?: string;
}) => (
  <div className="relative">
    <select
      {...field}
      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800
        focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
      ▾
    </div>
  </div>
);

const UnitSelect = ({
  field,
  options,
  width = "w-20",
}: {
  field: any;
  options: string[];
  width?: string;
}) => (
  <div className={`relative ${width} shrink-0`}>
    <select
      {...field}
      className="w-full h-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none
        focus:outline-none focus:ring-2 focus:ring-teal-400"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
      ▾
    </div>
  </div>
);

const TrashIcon = () => (
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
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CoolingWaterAssetConfig() {
  // ── Redux ──────────────────────────────────────────────────────────────────
  const customerId = useSelector(
    (state: RootState) => state.customerId.customerId,
  );
  const [createAssest, { isLoading }] = useGetCreateAssestMutation();
  const { data: singleCustomer } = useGetSingleCustomerQuery(customerId || "");

  // ── Local UI state ─────────────────────────────────────────────────────────
  const [showAssetTypeDropdown, setShowAssetTypeDropdown] = useState(false);

  // Delta T state (Cooling Tower / Evaporative Condenser)
  const [supplyTempVal, setSupplyTempVal] = useState("85");
  const [returnTempVal, setReturnTempVal] = useState("95");
  const returnNum = parseFloat(returnTempVal);
  const supplyNum = parseFloat(supplyTempVal);
  const deltaT =
    !isNaN(returnNum) && !isNaN(supplyNum)
      ? (returnNum - supplyNum).toFixed(1)
      : "—";

  // ── React Hook Form ────────────────────────────────────────────────────────
  const { register, control, handleSubmit, watch, setValue, getValues } =
    useForm<FormValues>({
      defaultValues: {
        waterTreatmentCompany: "",
        customerName: "",
        siteNameLocation: "",
        assetName: "",
        assetType: "Cooling Tower",
        // Cooling Tower / Evap fields
        towerType: "",
        fillType: "",
        criticalHeatExchangerDesign: "",
        recirculationRate: "",
        recirculationUnit: "gpm",
        tonnageOfCooling: "",
        systemVolume: "",
        systemVolumeUnit: "gallons",
        evaporationFactor: "0.85",
        supplyTemperature: "85",
        supplyTempUnit: "°F",
        returnTemperature: "95",
        returnTempUnit: "°F",
        // Once-Through fields
        flowRate: "",
        flowRateUnit: "gpm",
        onceThroughSupplyTemp: "",
        onceThroughSupplyUnit: "°F",
        dischargeTemperature: "",
        dischargeTempUnit: "°F",
        criticalCooling: "",
        criticalFlowRate: "",
        criticalFlowRateUnit: "ft/s",
        onceThroughHottestSkin: "",
        onceThroughHottestUnit: "°F",
        // shared
        metallurgy: [],
        otherMaterials: [],
        hottestSkinTemp: "",
        hottestSkinTempUnit: "°F",
        criticalHeatExchangerFlowRate: "",
        criticalHxFlowRateUnit: "ft/s",
        nsfStandard60: false,
        nsfG5G7: false,
        gras: false,
        dischargeLimits: DEFAULT_DISCHARGE_LIMITS,
        chemicalProducts: [{ product: "", dosage: "", unit: "ppm" }],
        controlVariables: [
          {
            variable: "",
            source: "Water Analysis",
            minValue: "",
            maxValue: "",
            unit: "ppm",
          },
        ],
      },
    });

  const watchedAssetType = watch("assetType");
  const watchedMetallurgy = watch("metallurgy");
  const watchedOtherMaterials = watch("otherMaterials");
  const watchedNsf60 = watch("nsfStandard60");
  const watchedNsfG5G7 = watch("nsfG5G7");
  const watchedGras = watch("gras");
  const watchedSupplyUnit = watch("supplyTempUnit");

  // ── Asset type helpers ─────────────────────────────────────────────────────
  const isCoolingTower = watchedAssetType === "Cooling Tower";
  const isEvapCondenser = watchedAssetType === "Evaporative Condenser";
  const isOnceThroughCooling = watchedAssetType === "Once-Through Cooling";
  const isCoolingTowerOrEvap = isCoolingTower || isEvapCondenser;

  // ── Field Arrays ───────────────────────────────────────────────────────────
  const {
    fields: dischargeLimitFields,
    append: appendDischargeLimit,
    remove: removeDischargeLimit,
  } = useFieldArray({ control, name: "dischargeLimits" });
  const {
    fields: chemicalProductFields,
    append: appendChemicalProduct,
    remove: removeChemicalProduct,
  } = useFieldArray({ control, name: "chemicalProducts" });
  const {
    fields: controlVariableFields,
    append: appendControlVariable,
    remove: removeControlVariable,
  } = useFieldArray({ control, name: "controlVariables" });

  // ── Metallurgy toggle ──────────────────────────────────────────────────────
  const toggleMetallurgy = (m: Metallurgy) => {
    const cur = getValues("metallurgy");
    setValue(
      "metallurgy",
      cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m],
    );
  };
  const toggleOtherMaterial = (m: OtherMaterial) => {
    const cur = getValues("otherMaterials");
    setValue(
      "otherMaterials",
      cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m],
    );
  };

  // ── Submit → build payload → call API ─────────────────────────────────────
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const deltaTNum =
      !isNaN(returnNum) && !isNaN(supplyNum) ? returnNum - supplyNum : 0;

    // Base payload (all types)
    const payload: CreateAssetPayload = {
      customerId: customerId as string,
      waterTreatmentCompany: data.waterTreatmentCompany,
      customerName: data.customerName,
      siteNameLocation: data.siteNameLocation,
      name: data.assetName,
      type: data.assetType,
      systemMetallurgy: data.metallurgy,
      systemMaterials: data.otherMaterials,
      hottestSkinTemperature: parseFloat(data.hottestSkinTemp) || 0,
      hottestSkinTemperatureType: data.hottestSkinTempUnit,
      criticalHeatExchangerFlowRate:
        parseFloat(data.criticalHeatExchangerFlowRate) || 0,
      criticalHeatExchangerFlowRateType: data.criticalHxFlowRateUnit,
      NSFStandard60: data.nsfStandard60,
      "NSFG5/G7": data.nsfG5G7,
      GRAS: data.gras,
      environmentalDischargeLimits: data.dischargeLimits.map((d) => ({
        parameter: d.parameter,
        limitValue: d.limitValue,
        unit: d.unit,
      })),
      productPrograms: data.chemicalProducts.map((p) => ({
        productId: p.product,
        dosage: p.dosage,
        unit: p.unit,
      })),
      controlVariablesAndTargets: data.controlVariables.map((c) => ({
        variable: c.variable,
        source: c.source,
        minValue: parseFloat(c.minValue) || 0,
        maxValue: parseFloat(c.maxValue) || 0,
        unit: c.unit,
      })),
    };

    // Cooling Tower / Evaporative Condenser — specific fields
    if (isCoolingTowerOrEvap) {
      payload.towerType = data.towerType;
      payload.fillType = data.fillType;
      payload.criticalHeatExchangerDesign = data.criticalHeatExchangerDesign;
      payload.recirculationRate = parseFloat(data.recirculationRate) || 0;
      payload.recirculationRateType = data.recirculationUnit;
      payload.tonnageOfCooling = parseFloat(data.tonnageOfCooling) || 0;
      payload.systemVolume = parseFloat(data.systemVolume) || 0;
      payload.systemVolumeType = data.systemVolumeUnit;
      payload.supplyTemperature = parseFloat(supplyTempVal) || 0;
      payload.supplyTemperatureType = data.supplyTempUnit;
      payload.returnTemperature = parseFloat(returnTempVal) || 0;
      payload.returnTemperatureType = data.returnTempUnit;
      payload.deltaTemperature = deltaTNum;
    }

    // Once-Through Cooling — specific fields
    if (isOnceThroughCooling) {
      payload.flowRate = parseFloat(data.flowRate) || 0;
      payload.flowRateType = data.flowRateUnit;
      payload.supplyTemperature = parseFloat(data.onceThroughSupplyTemp) || 0;
      payload.supplyTemperatureType = data.onceThroughSupplyUnit;
      payload.dischargeTemperature = parseFloat(data.dischargeTemperature) || 0;
      payload.dischargeTemperatureType = data.dischargeTempUnit;
      payload.criticalCooling = data.criticalCooling;
      payload.criticalFlowRate = parseFloat(data.criticalFlowRate) || 0;
      payload.criticalFlowRateType = data.criticalFlowRateUnit;
      // override hottest skin with once-through specific fields
      payload.hottestSkinTemperature =
        parseFloat(data.onceThroughHottestSkin) || 0;
      payload.hottestSkinTemperatureType = data.onceThroughHottestUnit;
    }

    try {
      await createAssest(payload).unwrap();
      alert("Asset created successfully!");
    } catch (err) {
      console.error("Create asset failed:", err);
      alert("Failed to create asset. Please try again.");
    }
  };

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans mt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ── Page Title ── */}
        <div className="my-6">
          <h1 className="lg:text-3xl text-2xl font-bold text-gray-900 tracking-tight">
            Cooling Water Asset Configuration
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Describe the physical cooling system assets used at your facility.
          </p>
        </div>

        {/* ── Top Fields Card ── */}
        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Water Treatment Company</Label>
              <Input
                placeholder="e.g. Aqua Tech Solutions"
                {...register("waterTreatmentCompany")}
              />
            </div>
            <div>
              <Label>Customer Name</Label>
              <Input
                placeholder="e.g. Tech Industries Corp."
                {...register("customerName")}
              />
            </div>
            <div>
              <Label>Site Name & Location</Label>
              <Input
                placeholder="e.g. Main Facility – Houston, TX"
                {...register("siteNameLocation")}
              />
            </div>
            <div>
              <Label required>Asset Name</Label>
              <Input
                placeholder="Enter asset name"
                {...register("assetName", { required: true })}
              />
            </div>
          </div>
        </Card>

        {/* ── Asset Type Card ── */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              Asset Type
            </h2>
          </div>
          <div className="relative w-72">
            <button
              type="button"
              onClick={() => setShowAssetTypeDropdown(!showAssetTypeDropdown)}
              className="w-full flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-800 hover:border-gray-300 transition"
            >
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {watchedAssetType}
              <span className="ml-auto text-gray-400">▾</span>
            </button>
            {showAssetTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-30 overflow-hidden">
                {ASSET_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setValue("assetType", type);
                      setShowAssetTypeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition ${watchedAssetType === type ? "text-teal-600 font-medium" : "text-gray-700"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* ── Asset Details Card ── */}
        <Card>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Asset Details
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Configure evaporative condenser operating parameters
            </p>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              COOLING TOWER + EVAPORATIVE CONDENSER FIELDS
          ════════════════════════════════════════════════════════════════ */}
          {isCoolingTowerOrEvap && (
            <>
              {/* Mechanical Details — only for Cooling Tower */}
              {isCoolingTower && (
                <>
                  <SubSection title="Mechanical Details" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div>
                      <Label>Tower Type</Label>
                      <Controller
                        name="towerType"
                        control={control}
                        render={({ field }) => (
                          <SelectField
                            field={field}
                            options={TOWER_TYPES}
                            placeholder="Select tower type..."
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label>Fill Type</Label>
                      <Controller
                        name="fillType"
                        control={control}
                        render={({ field }) => (
                          <SelectField
                            field={field}
                            options={FILL_TYPES}
                            placeholder="Select fill type..."
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label>Critical Heat Exchanger Design</Label>
                      <Controller
                        name="criticalHeatExchangerDesign"
                        control={control}
                        render={({ field }) => (
                          <SelectField
                            field={field}
                            options={FILL_TYPES}
                            placeholder="Select fill type..."
                          />
                        )}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Recirculation & Volume */}
              <SubSection title="Recirculation & Volume" />
              <div className="border border-gray-200 rounded-xl mb-6 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* LEFT — Recirculation Rate */}
                  <div className="flex-1 p-5">
                    <Label required>Recirculation Rate</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="number"
                        className="flex-1 min-w-0"
                        placeholder="e.g. 1000"
                        {...register("recirculationRate")}
                      />
                      <Controller
                        name="recirculationUnit"
                        control={control}
                        render={({ field }) => (
                          <div className="relative w-20 shrink-0">
                            <select
                              {...field}
                              className="w-full h-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                            >
                              <option value="gpm">gpm</option>
                              <option value="lpm">lpm</option>
                            </select>
                            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                              ▾
                            </div>
                          </div>
                        )}
                      />
                    </div>
                    <p className="text-xs text-teal-600 mt-2">
                      Auto-calculated if tonnage is provided
                    </p>
                  </div>
                  {/* CENTER — OR */}
                  <div className="flex lg:flex-col items-center justify-center px-4 py-3 lg:py-0 bg-gray-50 border-t border-b lg:border-t-0 lg:border-b-0 lg:border-l lg:border-r border-gray-200">
                    <div className="w-9 h-9 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-xs font-bold text-gray-400 shadow-sm">
                      OR
                    </div>
                  </div>
                  {/* RIGHT — Tonnage */}
                  <div className="flex-1 p-5">
                    <Label>Tonnage of Cooling</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="number"
                        className="flex-1 min-w-0"
                        placeholder="e.g. 350"
                        {...register("tonnageOfCooling")}
                      />
                      <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg bg-gray-50 shrink-0">
                        tons
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Entering tonnage will auto-calculate recirculation rate
                    </p>
                  </div>
                </div>
              </div>

              {/* System Volume + Evaporation Factor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <Label required>System Volume</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="flex-1 min-w-0"
                      placeholder="e.g. 5000"
                      {...register("systemVolume")}
                    />
                    <Controller
                      name="systemVolumeUnit"
                      control={control}
                      render={({ field }) => (
                        <div className="relative w-24 shrink-0">
                          <select
                            {...field}
                            className="w-full h-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                          >
                            <option value="gallons">gallons</option>
                            <option value="liters">liters</option>
                          </select>
                          <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            ▾
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Label>
                    Evaporation Factor{" "}
                    <span
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-gray-400 text-xs ml-1 cursor-help"
                      title="Fraction of recirculating water that evaporates"
                    >
                      ⓘ
                    </span>
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("evaporationFactor")}
                  />
                </div>
              </div>

              {/* Temperature Section */}
              <SubSection title="Temperature" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Supply Temperature */}
                <div>
                  <Label>Supply Temperature</Label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                      placeholder="e.g. 85"
                      value={supplyTempVal}
                      onChange={(e) => {
                        setSupplyTempVal(e.target.value);
                        setValue("supplyTemperature", e.target.value);
                      }}
                    />
                    <Controller
                      name="supplyTempUnit"
                      control={control}
                      render={({ field }) => (
                        <UnitSelect
                          field={field}
                          options={TEMP_UNITS}
                          width="w-16"
                        />
                      )}
                    />
                  </div>
                </div>
                {/* Return Temperature */}
                <div>
                  <Label>Return Temperature</Label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                      placeholder="e.g. 95"
                      value={returnTempVal}
                      onChange={(e) => {
                        setReturnTempVal(e.target.value);
                        setValue("returnTemperature", e.target.value);
                      }}
                    />
                    <Controller
                      name="returnTempUnit"
                      control={control}
                      render={({ field }) => (
                        <UnitSelect
                          field={field}
                          options={TEMP_UNITS}
                          width="w-16"
                        />
                      )}
                    />
                  </div>
                </div>
                {/* Delta T */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <Label>Delta T (Calculated)</Label>
                  <div className="flex gap-2">
                    <div
                      className={`flex-1 min-w-0 px-3 py-2 text-sm rounded-lg font-semibold border-2 transition-all duration-200 ${
                        deltaT !== "—"
                          ? "border-teal-400 bg-teal-50 text-teal-700"
                          : "border-gray-200 bg-gray-50 text-gray-400"
                      }`}
                    >
                      {deltaT}
                    </div>
                    <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg bg-gray-50 shrink-0">
                      {watchedSupplyUnit || "°F"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    Formula: Delta T = Return − Supply
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════════════
              ONCE-THROUGH COOLING FIELDS
          ════════════════════════════════════════════════════════════════ */}
          {isOnceThroughCooling && (
            <>
              {/* System Size and Temperatures */}
              <SubSection title="System Size and Temperatures" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Flow Rate */}
                <div>
                  <Label>Flow Rate</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="flex-1 min-w-0"
                      placeholder="e.g. 200"
                      {...register("flowRate")}
                    />
                    <Controller
                      name="flowRateUnit"
                      control={control}
                      render={({ field }) => (
                        <UnitSelect field={field} options={FLOW_RATE_UNITS} />
                      )}
                    />
                  </div>
                </div>
                {/* Supply Temperature */}
                <div>
                  <Label>Supply Temperature</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="flex-1 min-w-0"
                      placeholder="e.g. 5"
                      {...register("onceThroughSupplyTemp")}
                    />
                    <Controller
                      name="onceThroughSupplyUnit"
                      control={control}
                      render={({ field }) => (
                        <UnitSelect
                          field={field}
                          options={TEMP_UNITS}
                          width="w-16"
                        />
                      )}
                    />
                  </div>
                </div>
                {/* Discharge Temperature */}
                <div>
                  <Label>Discharge Temperature</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="flex-1 min-w-0"
                      placeholder="e.g. 200"
                      {...register("dischargeTemperature")}
                    />
                    <Controller
                      name="dischargeTempUnit"
                      control={control}
                      render={({ field }) => (
                        <UnitSelect
                          field={field}
                          options={TEMP_UNITS}
                          width="w-16"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Heat Exchanger Details (Once-Through specific) */}
              <SubSection title="Heat Exchanger Details" />
              <div className="grid grid-cols-1 gap-4 mb-6">
                {/* Critical Cooling */}
                <div>
                  <Label>Critical Cooling</Label>
                  <Controller
                    name="criticalCooling"
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        field={field}
                        options={CRITICAL_COOLING_OPTIONS}
                        placeholder="Select..."
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Hottest Skin Temperature */}
                <div>
                  <Label>Hottest Skin Temperature</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="flex-1"
                      placeholder="e.g. 200"
                      {...register("onceThroughHottestSkin")}
                    />
                    <Controller
                      name="onceThroughHottestUnit"
                      control={control}
                      render={({ field }) => (
                        <UnitSelect
                          field={field}
                          options={TEMP_UNITS}
                          width="w-16"
                        />
                      )}
                    />
                  </div>
                </div>
                {/* Critical Flow Rate */}
                <div>
                  <Label>Critical Flow Rate</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="flex-1"
                      placeholder="e.g. 5"
                      {...register("criticalFlowRate")}
                    />
                    <Controller
                      name="criticalFlowRateUnit"
                      control={control}
                      render={({ field }) => (
                        <UnitSelect field={field} options={FLOW_RATE_UNITS2} />
                      )}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════════════════════
              SYSTEM METALLURGY — shown for all asset types
          ════════════════════════════════════════════════════════════════ */}
        </Card>

        {/* ── System Metallurgy & Materials ── */}
        <Card>
          <SubSection title="System Metallurgy" />
          <p className="text-xs text-gray-500 mb-3">Select all that apply</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {METALLURGY_OPTIONS.map((m) => (
              <ChipButton
                key={m}
                label={m}
                selected={watchedMetallurgy.includes(m)}
                onClick={() => toggleMetallurgy(m)}
              />
            ))}
          </div>

          <SubSection title="System Materials — Other" />
          <p className="text-xs text-gray-500 mb-3">Select all that apply</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {OTHER_MATERIAL_OPTIONS.map((m) => (
              <ChipButton
                key={m}
                label={m}
                selected={watchedOtherMaterials.includes(m)}
                onClick={() => toggleOtherMaterial(m)}
              />
            ))}
          </div>

          {/* Heat Exchanger Details — shown for Cooling Tower & Evaporative Condenser */}
          {isCoolingTowerOrEvap && (
            <>
              <SubSection title="Heat Exchanger Details" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div>
                  <Label required>Hottest Skin Temperature</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="flex-1"
                      placeholder="e.g. 200"
                      {...register("hottestSkinTemp")}
                    />
                    <Controller
                      name="hottestSkinTempUnit"
                      control={control}
                      render={({ field }) => (
                        <UnitSelect
                          field={field}
                          options={TEMP_UNITS}
                          width="w-16"
                        />
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Label required>Critical Heat Exchanger Flow Rate</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="flex-1"
                      placeholder="e.g. 5"
                      {...register("criticalHeatExchangerFlowRate")}
                    />
                    <Controller
                      name="criticalHxFlowRateUnit"
                      control={control}
                      render={({ field }) => (
                        <UnitSelect field={field} options={FLOW_RATE_UNITS2} />
                      )}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Special Requirements */}
          <SubSection title="Special Requirements" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(
              [
                {
                  key: "nsfStandard60" as const,
                  title: "NSF Standard 60",
                  sub: "Drinking water components",
                  val: watchedNsf60,
                },
                {
                  key: "nsfG5G7" as const,
                  title: "NSF G5/G7",
                  sub: "Food processing",
                  val: watchedNsfG5G7,
                },
                {
                  key: "gras" as const,
                  title: "GRAS",
                  sub: "Generally Recognized As Safe",
                  val: watchedGras,
                },
              ] as const
            ).map(({ key, title, sub, val }) => (
              <div
                key={key}
                className="border border-gray-100 rounded-xl p-4 flex items-start justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
                <Toggle checked={val} onChange={() => setValue(key, !val)} />
              </div>
            ))}
          </div>
        </Card>

        {/* ── Environmental Discharge Limits ── */}
        <Card>
          <SubSection title="Environmental Discharge Limits" />
          <div className="overflow-x-auto mb-4">
            <div className="border border-gray-100 rounded-xl overflow-hidden min-w-[500px]">
              <div className="grid grid-cols-[1fr_1fr_1fr_48px] bg-gray-50 border-b border-gray-100 px-4 py-2.5">
                {["Parameter", "Limit Value", "Unit", "Action"].map((h) => (
                  <span
                    key={h}
                    className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {dischargeLimitFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_1fr_1fr_48px] items-center px-4 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
                >
                  <Input
                    className="mr-2 text-xs"
                    {...register(`dischargeLimits.${index}.parameter`)}
                  />
                  <Input
                    placeholder="Value..."
                    className="mx-2 text-xs"
                    {...register(`dischargeLimits.${index}.limitValue`)}
                  />
                  <Input
                    className="mx-2 text-xs"
                    {...register(`dischargeLimits.${index}.unit`)}
                  />
                  <button
                    type="button"
                    onClick={() => removeDischargeLimit(index)}
                    className="text-red-400 hover:text-red-600 transition flex items-center justify-center"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              appendDischargeLimit({
                parameter: "",
                limitValue: "",
                unit: "mg/L",
              })
            }
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition"
          >
            <span className="text-lg leading-none">+</span> Add Custom Limit
          </button>
        </Card>

        {/* ── Chemical Treatment Program ── */}
        <Card>
          <SubSection title="Current Chemical Treatment Program" />
          <p className="text-xs text-gray-500 mb-4 font-medium">
            Product Program
          </p>
          <div className="overflow-x-auto mb-4">
            <div className="border border-gray-100 rounded-xl overflow-hidden min-w-[500px]">
              <div className="grid grid-cols-[1fr_1fr_1fr_48px] bg-gray-50 border-b border-gray-100 px-4 py-2.5">
                {["Product", "Dosage", "Unit", "Remove"].map((h) => (
                  <span
                    key={h}
                    className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {chemicalProductFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_1fr_1fr_48px] items-center px-4 py-2.5 border-b border-gray-50 last:border-0"
                >
                  <Controller
                    name={`chemicalProducts.${index}.product`}
                    control={control}
                    render={({ field: f }) => (
                      <div className="relative mr-2">
                        <select
                          {...f}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                          <option value="">Select product...</option>
                          {PRODUCT_OPTIONS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                          ▾
                        </div>
                      </div>
                    )}
                  />
                  <Input
                    placeholder="Dosage..."
                    className="mx-2 text-xs"
                    {...register(`chemicalProducts.${index}.dosage`)}
                  />
                  <Controller
                    name={`chemicalProducts.${index}.unit`}
                    control={control}
                    render={({ field: f }) => (
                      <div className="relative mx-2">
                        <select
                          {...f}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                          <option value="ppm">ppm</option>
                          <option value="mg/L">mg/L</option>
                          <option value="mL/day">mL/day</option>
                        </select>
                        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                          ▾
                        </div>
                      </div>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => removeChemicalProduct(index)}
                    className="text-red-400 hover:text-red-600 transition flex items-center justify-center"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              appendChemicalProduct({ product: "", dosage: "", unit: "ppm" })
            }
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition"
          >
            <span className="text-lg leading-none">+</span> Add Product
          </button>
        </Card>

        {/* ── Control Variables & Targets ── */}
        <Card>
          <SubSection title="Control Variables & Targets" />
          <p className="text-xs text-gray-500 mb-4">
            Define acceptable operating ranges for key water parameters.
          </p>
          <div className="overflow-x-auto mb-4">
            <div className="border border-gray-100 rounded-xl overflow-hidden min-w-[700px]">
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_48px] bg-gray-50 border-b border-gray-100 px-4 py-2.5 gap-2">
                {[
                  "Variable",
                  "Source",
                  "Min Value",
                  "Max Value",
                  "Unit",
                  "Remove",
                ].map((h) => (
                  <span
                    key={h}
                    className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {controlVariableFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_48px] items-center px-4 py-2.5 border-b border-gray-50 last:border-0 gap-2"
                >
                  <Controller
                    name={`controlVariables.${index}.variable`}
                    control={control}
                    render={({ field: f }) => (
                      <div className="relative">
                        <select
                          {...f}
                          className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                          <option value="">Select variable</option>
                          {VARIABLE_OPTIONS.map((v) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                          ▾
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name={`controlVariables.${index}.source`}
                    control={control}
                    render={({ field: f }) => (
                      <div className="relative">
                        <select
                          {...f}
                          className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                          {SOURCE_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                          ▾
                        </div>
                      </div>
                    )}
                  />
                  <Input
                    type="number"
                    placeholder="Min"
                    {...register(`controlVariables.${index}.minValue`)}
                    className="text-xs"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    {...register(`controlVariables.${index}.maxValue`)}
                    className="text-xs"
                  />
                  <Controller
                    name={`controlVariables.${index}.unit`}
                    control={control}
                    render={({ field: f }) => (
                      <div className="relative">
                        <select
                          {...f}
                          className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                          {["ppm", "mg/L", "µS/cm", "pH", "°F", "°C"].map(
                            (u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ),
                          )}
                        </select>
                        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                          ▾
                        </div>
                      </div>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => removeControlVariable(index)}
                    className="text-red-400 hover:text-red-600 transition flex items-center justify-center"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              appendControlVariable({
                variable: "",
                source: "Water Analysis",
                minValue: "",
                maxValue: "",
                unit: "ppm",
              })
            }
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition"
          >
            <span className="text-lg leading-none">+</span> Add Variable
          </button>
        </Card>

        {/* ── Submit ── */}
        <div className="flex justify-end pb-8">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && (
              <svg
                className="animate-spin h-4 w-4 text-white"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            {isLoading ? "Saving..." : "Save Data"}
          </button>
        </div>
      </form>
    </div>
  );
}
