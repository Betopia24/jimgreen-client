// "use client";

// import { useForm } from "react-hook-form";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import {
//   useAnalyzeReportMutation,
//   useGetCoustomerListQuery,
// } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
// import { UserProfile } from "@/interfaces/global";
// import { toast } from "sonner";

// // Types
// interface WaterParameter {
//   name: string;
//   value: number;
//   unit: string;
//   detection_limit: number | null;
// }

// interface WaterAnalysisPayload {
//   parameters: WaterParameter[];
// }

// interface WaterChemistryFormData {
//   [key: string]: number | undefined;
// }

// interface Company {
//   id: string;
//   name: string;
//   email: string;
//   location: string;
// }

// interface Customer {
//   id: string;
//   name: string;
//   address: string;
//   location: string;
//   siteName: string;
//   company: Company;
// }

// export default function WaterChemistryForm() {
//   //   const { register, handleSubmit, watch, reset, setValue } =
//   //     useForm<WaterChemistryFormData>({
//   //       defaultValues: {},
//   //     });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm<WaterChemistryFormData & { customerId: string }>({
//     defaultValues: {
//       customerId: "",
//     },
//   });

//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [showSuccess, setShowSuccess] = useState<boolean>(false);
//   const [selectedCustomer, setSelectedCustomer] = useState("");

//   const analysisData = useSelector(
//     (state: RootState) => state.analysis.analysisData,
//   );
//   const aiParameters = analysisData?.data?.parameters;

//   const company: UserProfile | null = useSelector(
//     (state: RootState) => state.user.user,
//   );

//   const [analyzePost, { isLoading }] = useAnalyzeReportMutation();
//   const { data } = useGetCoustomerListQuery(company.companyMember.companyId);
//   const customers: Customer[] = data?.data || [];
//   // Name mapping to standardize parameter names
//   const nameMapping: { [key: string]: string } = {
//     pH: "pH",
//     "Nitrate as Nitrogen": "Nitrate_as_Nitrogen",
//     "Nitrate as NO3": "Nitrate_as_NO3",
//     "Total Coliform": "Total_Coliform",
//     "E.Coli": "E_Coli",
//     "E. Coli": "E_Coli",
//     Hardness: "Hardness",
//     "Total Dissolved Solids (TDS)": "TDS",
//     TDS: "TDS",
//     Calcium: "Calcium",
//     Magnesium: "Magnesium",
//     Sodium: "Sodium",
//     Potassium: "Potassium",
//     Chloride: "Chloride",
//     Sulfate: "Sulfates",
//     Sulfates: "Sulfates",
//     Iron: "Iron",
//     Manganese: "Manganese",
//     Copper: "Copper",
//     Zinc: "Zinc",
//     Molybdenum: "Molybdenum",
//     Selenium: "Selenium",
//     Boron: "Boron",
//     Phosphorus: "Phosphorus",
//     "Sulfate Sulfur": "Sulfate_Sulfur",
//     Alkalinity: "Alkalinity",
//     "Total Alkalinity": "Alkalinity",
//     Temperature: "Temperature",
//   };

//   // Reverse mapping for display
//   const displayNameMapping: { [key: string]: string } = {
//     pH: "pH",
//     Nitrate_as_Nitrogen: "Nitrate as Nitrogen",
//     Nitrate_as_NO3: "Nitrate as NO₃",
//     Total_Coliform: "Total Coliform",
//     E_Coli: "E. Coli",
//     Hardness: "Hardness",
//     TDS: "TDS",
//     Calcium: "Calcium (Ca)",
//     Magnesium: "Magnesium (Mg)",
//     Sodium: "Sodium (Na)",
//     Potassium: "Potassium (K)",
//     Chloride: "Chloride (Cl)",
//     Sulfates: "Sulfate (SO₄)",
//     Iron: "Iron (Fe)",
//     Manganese: "Manganese (Mn)",
//     Copper: "Copper (Cu)",
//     Zinc: "Zinc (Zn)",
//     Molybdenum: "Molybdenum (Mo)",
//     Selenium: "Selenium (Se)",
//     Boron: "Boron (B)",
//     Phosphorus: "Phosphorus (P)",
//     Sulfate_Sulfur: "Sulfate Sulfur (S)",
//     Alkalinity: "Total Alkalinity",
//     Temperature: "Temperature",
//   };

//   // Load data from Redux store into form
//   useEffect(() => {
//     if (aiParameters && Array.isArray(aiParameters)) {
//       aiParameters.forEach((param) => {
//         const standardName = nameMapping[param.name] || param.name;
//         setValue(standardName, param.value);
//       });
//     }
//   }, [aiParameters, setValue]);

//   // Parameter configuration with detection limits
//   const detectionLimits: { [key: string]: number | null } = {
//     Nitrate_as_Nitrogen: 0.5,
//     Nitrate_as_NO3: 2.2,
//     Total_Coliform: 2000.5,
//     E_Coli: 200.5,
//     Sulfates: 10,
//     Zinc: 0.01,
//   };

//   // All possible parameters
//   const allParameters = [
//     { name: "pH", unit: "", placeholder: "Enter pH" },
//     { name: "Calcium", unit: "ppm", placeholder: "Enter calcium" },
//     { name: "Magnesium", unit: "ppm", placeholder: "Enter magnesium" },
//     { name: "Sodium", unit: "ppm", placeholder: "Enter sodium" },
//     { name: "Chloride", unit: "ppm", placeholder: "Enter chloride" },
//     { name: "Sulfates", unit: "ppm", placeholder: "Enter sulfates" },
//     { name: "Iron", unit: "ppm", placeholder: "Enter iron" },
//     { name: "Temperature", unit: "°C", placeholder: "Enter temperature" },
//     { name: "Alkalinity", unit: "ppm", placeholder: "Enter alkalinity" },
//     { name: "TDS", unit: "ppm", placeholder: "Enter TDS" },
//     { name: "Hardness", unit: "ppm CaCO3", placeholder: "Enter hardness" },
//     {
//       name: "Nitrate_as_Nitrogen",
//       unit: "ppm",
//       placeholder: "Enter nitrate as nitrogen",
//     },
//     {
//       name: "Nitrate_as_NO3",
//       unit: "ppm",
//       placeholder: "Enter nitrate as NO₃",
//     },
//     { name: "Phosphorus", unit: "ppm", placeholder: "Enter phosphorus" },
//     { name: "Potassium", unit: "ppm", placeholder: "Enter potassium" },
//     { name: "Manganese", unit: "ppm", placeholder: "Enter manganese" },
//     { name: "Zinc", unit: "ppm", placeholder: "Enter zinc" },
//     { name: "Copper", unit: "ppm", placeholder: "Enter copper" },
//     {
//       name: "Sulfate_Sulfur",
//       unit: "ppm",
//       placeholder: "Enter sulfate sulfur",
//     },
//     { name: "Molybdenum", unit: "ppm", placeholder: "Enter molybdenum" },
//     { name: "Selenium", unit: "ppm", placeholder: "Enter selenium" },
//     { name: "Boron", unit: "ppm", placeholder: "Enter boron" },
//     {
//       name: "Total_Coliform",
//       unit: "colonies per 100 ml",
//       placeholder: "Enter total coliform",
//     },
//     {
//       name: "E_Coli",
//       unit: "colonies per 100 ml",
//       placeholder: "Enter E. coli",
//     },
//   ];

//   // Get dynamic parameters from Redux or use all parameters
//   const availableParameters =
//     aiParameters && aiParameters.length > 0
//       ? aiParameters.map((param) => {
//           const standardName = nameMapping[param.name] || param.name;
//           const paramConfig = allParameters.find(
//             (p) => p.name === standardName,
//           );
//           return {
//             name: standardName,
//             unit: param.unit || paramConfig?.unit || "",
//             placeholder: paramConfig?.placeholder || `Enter ${param.name}`,
//             detectionLimit: param.detection_limit,
//           };
//         })
//       : allParameters.map((param) => ({
//           ...param,
//           detectionLimit: detectionLimits[param.name] || null,
//         }));

//   // Organized parameter groups (dynamic based on available parameters)
//   const parameterGroups: { [key: string]: string[] } = {};

//   const groupMapping: { [key: string]: string } = {
//     pH: "Basic Parameters",
//     TDS: "Basic Parameters",
//     Hardness: "Basic Parameters",
//     Alkalinity: "Basic Parameters",
//     Temperature: "Basic Parameters",
//     Calcium: "Major Ions",
//     Magnesium: "Major Ions",
//     Sodium: "Major Ions",
//     Potassium: "Major Ions",
//     Chloride: "Major Ions",
//     Sulfates: "Major Ions",
//     Nitrate_as_Nitrogen: "Nutrients",
//     Nitrate_as_NO3: "Nutrients",
//     Phosphorus: "Nutrients",
//     Iron: "Trace Metals",
//     Manganese: "Trace Metals",
//     Zinc: "Trace Metals",
//     Copper: "Trace Metals",
//     Sulfate_Sulfur: "Trace Metals",
//     Molybdenum: "Trace Metals",
//     Selenium: "Trace Metals",
//     Boron: "Trace Metals",
//     Total_Coliform: "Biological",
//     E_Coli: "Biological",
//   };

//   // Build parameter groups dynamically
//   availableParameters.forEach((param) => {
//     const group = groupMapping[param.name] || "Other Parameters";
//     if (!parameterGroups[group]) {
//       parameterGroups[group] = [];
//     }
//     parameterGroups[group].push(param.name);
//   });

//   const onSubmit = async (
//     data: WaterChemistryFormData & { customerId: string },
//   ): Promise<void> => {
//     console.log("Selected Customer ID:", data.customerId);

//     setIsSubmitting(true);

//     const parameters: WaterParameter[] = Object.entries(data)
//       .filter(
//         ([key, value]) =>
//           key !== "customerId" &&
//           value !== undefined &&
//           value !== null &&
//           value !== "",
//       )
//       .map(([key, value]) => {
//         const param = availableParameters.find((p) => p.name === key);
//         const displayName = displayNameMapping[key] || key;

//         return {
//           name: displayName,
//           value: Number(value) || 0,
//           unit: param?.unit || "",
//           detection_limit: param?.detectionLimit ?? null,
//         };
//       });

//     const payload = {
//       customerId: data.customerId, // ✅ included
//       parameters,
//     };

//     console.log("Final Payload:", payload);

//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     const response = await analyzePost(payload).unwrap();
//     console.log(response);
//     if (response.success) {
//       toast.success(response.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-10">
//             <h1 className="text-3xl font-semibold text-gray-900">
//               Water Chemistry Parameters
//             </h1>
//             <div className="w-full max-w-md">
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 Select Customer <span className="text-red-500">*</span>
//               </label>

//               <select
//                 {...register("customerId", {
//                   required: "Customer is required",
//                 })}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">-- Select Customer --</option>

//                 {customers.map((customer) => (
//                   <option key={customer.id} value={customer.id}>
//                     {customer.name} - {customer.company?.name}
//                   </option>
//                 ))}
//               </select>

//               {errors.customerId && (
//                 <p className="mt-1 text-sm text-red-500">
//                   {errors.customerId.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Display Redux Data Info */}
//           {aiParameters && aiParameters.length > 0 && (
//             <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-sm text-blue-800">
//                 ✓ Loaded {aiParameters.length} parameters from analysis data
//               </p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* Parameter Groups */}
//             <div className="space-y-10">
//               {Object.entries(parameterGroups).map(
//                 ([groupName, paramNames]) => (
//                   <section key={groupName}>
//                     <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-gray-200">
//                       {groupName}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {paramNames.map((paramName) => {
//                         const field = availableParameters.find(
//                           (p) => p.name === paramName,
//                         );
//                         if (!field) return null;

//                         const displayLabel =
//                           displayNameMapping[field.name] || field.name;

//                         return (
//                           <div key={field.name}>
//                             <label className="flex items-center text-sm font-medium text-gray-800 mb-2.5">
//                               {displayLabel}
//                               {field.unit && (
//                                 <span className="ml-1 text-gray-500 font-normal">
//                                   ({field.unit})
//                                 </span>
//                               )}
//                               <span className="ml-2 text-gray-300">
//                                 <svg
//                                   className="w-4 h-4"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <circle
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     strokeWidth="2"
//                                   />
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M12 16v-4m0-4h.01"
//                                   />
//                                 </svg>
//                               </span>
//                             </label>
//                             <input
//                               type="number"
//                               step="0.01"
//                               placeholder={field.placeholder}
//                               {...register(field.name, {
//                                 valueAsNumber: true,
//                               })}
//                               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
//                             />
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </section>
//                 ),
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="mt-12 gap-5 pt-8 border-t border-gray-200 flex justify-end relative">
//               <button
//                 type="button"
//                 onClick={() => reset()}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
//               >
//                 Reset Form
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex items-center gap-2.5 px-8 py-4 bg-blue-600 text-white font-medium text-base rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg
//                       className="animate-spin h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     Save Water Analysis
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M14 5l7 7m0 0l-7 7m7-7H3"
//                       />
//                     </svg>
//                   </>
//                 )}
//               </button>

//               {/* Success Indicator */}
//               {showSuccess && (
//                 <div className="absolute -top-3 -right-3 z-10">
//                   <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
//                     <svg
//                       className="w-9 h-9 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="3"
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes bounce-in {
//           0% {
//             transform: scale(0);
//             opacity: 0;
//           }
//           50% {
//             transform: scale(1.15);
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }
//         .animate-bounce-in {
//           animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useAnalyzeReportMutation,
  useGetCoustomerListQuery,
} from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
import { UserProfile } from "@/interfaces/global";
import { toast } from "sonner";

/* ===========================
   TYPES
=========================== */

interface WaterParameter {
  name: string;
  value: number;
  unit: string;
  detection_limit: number | null;
}

interface WaterChemistryFormData {
  customerId: string;
  [key: string]: number | string | undefined;
}

interface Company {
  id: string;
  name: string;
  email: string;
  location: string;
}

interface Customer {
  id: string;
  name: string;
  address: string;
  location: string;
  siteName: string;
  company: Company;
}

/* ===========================
   COMPONENT
=========================== */

export default function WaterChemistryForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WaterChemistryFormData>({
    defaultValues: {
      customerId: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ===========================
     REDUX DATA
  =========================== */

  const analysisData = useSelector((state: any) => state.analysis.analysisData);

  const aiParameters = analysisData?.data?.parameters ?? [];

  const company: UserProfile | null = useSelector(
    (state: RootState) => state.user.user,
  );

  const companyId = company?.companyMember?.companyId;

  const { data } = useGetCoustomerListQuery(companyId as string, {
    skip: !companyId,
  });

  const customers: Customer[] = data?.data ?? [];

  const [analyzePost, { isLoading }] = useAnalyzeReportMutation();

  /* ===========================
     PARAMETER CONFIG
  =========================== */

  const nameMapping: Record<string, string> = {
    "Nitrate as Nitrogen": "Nitrate_as_Nitrogen",
    "Nitrate as NO3": "Nitrate_as_NO3",
    "Total Coliform": "Total_Coliform",
    "E.Coli": "E_Coli",
    "E. Coli": "E_Coli",
    "Total Dissolved Solids (TDS)": "TDS",
    Sulfate: "Sulfates",
  };

  const displayNameMapping: Record<string, string> = {
    Nitrate_as_Nitrogen: "Nitrate as Nitrogen",
    Nitrate_as_NO3: "Nitrate as NO₃",
    Total_Coliform: "Total Coliform",
    E_Coli: "E. Coli",
    Sulfates: "Sulfate (SO₄)",
  };

  const allParameters = [
    { name: "pH", unit: "" },
    { name: "Calcium", unit: "ppm" },
    { name: "Magnesium", unit: "ppm" },
    { name: "Sodium", unit: "ppm" },
    { name: "Chloride", unit: "ppm" },
    { name: "Sulfates", unit: "ppm" },
    { name: "Iron", unit: "ppm" },
    { name: "Temperature", unit: "°C" },
    { name: "Alkalinity", unit: "ppm" },
    { name: "TDS", unit: "ppm" },
    { name: "Hardness", unit: "ppm CaCO3" },
    { name: "Nitrate_as_Nitrogen", unit: "ppm" },
    { name: "Nitrate_as_NO3", unit: "ppm" },
    { name: "Phosphorus", unit: "ppm" },
    { name: "Potassium", unit: "ppm" },
    { name: "Manganese", unit: "ppm" },
    { name: "Zinc", unit: "ppm" },
    { name: "Copper", unit: "ppm" },
    { name: "Sulfate_Sulfur", unit: "ppm" },
    { name: "Molybdenum", unit: "ppm" },
    { name: "Selenium", unit: "ppm" },
    { name: "Boron", unit: "ppm" },
    { name: "Total_Coliform", unit: "colonies / 100ml" },
    { name: "E_Coli", unit: "colonies / 100ml" },
  ];

  /* ===========================
     LOAD AI VALUES
  =========================== */

  useEffect(() => {
    if (Array.isArray(aiParameters)) {
      aiParameters.forEach((param: any) => {
        const standardName = nameMapping[param.name] || param.name;
        setValue(standardName, param.value);
      });
    }
  }, [aiParameters, setValue]);

  /* ===========================
     AVAILABLE PARAMETERS
  =========================== */

  const availableParameters = useMemo(() => {
    if (aiParameters.length > 0) {
      return aiParameters.map((param: any) => {
        const standardName = nameMapping[param.name] || param.name;
        const config = allParameters.find((p) => p.name === standardName);
        return {
          name: standardName,
          unit: param.unit || config?.unit || "",
          detectionLimit: param.detection_limit ?? null,
        };
      });
    }
    return allParameters.map((p) => ({
      ...p,
      detectionLimit: null,
    }));
  }, [aiParameters]);

  /* ===========================
     SUBMIT
  =========================== */

  const onSubmit = async (data: WaterChemistryFormData) => {
    setIsSubmitting(true);

    try {
      const parameters: WaterParameter[] = Object.entries(data)
        .filter(([key, value]) => {
          if (key === "customerId") return false;
          if (value === undefined || value === null || value === "")
            return false;
          return true;
        })
        .map(([key, value]) => {
          const param = availableParameters.find((p: any) => p.name === key);

          return {
            name: displayNameMapping[key] || key,
            value: Number(value),
            unit: param?.unit || "",
            detection_limit: param?.detectionLimit ?? null,
          };
        });

      const payload = {
        customerId: data.customerId,
        parameters,
      };

      const response = await analyzePost(payload).unwrap();

      if (response.success) {
        toast.success(response.message);
        reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ===========================
     UI
  =========================== */

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-10">
        <h1 className="text-2xl font-semibold mb-8">
          Water Chemistry Parameters
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Customer Select */}
          <div className="max-w-md">
            <label className="block mb-2 font-medium">Select Customer *</label>
            <select
              {...register("customerId", {
                required: "Customer is required",
              })}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">-- Select Customer --</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.company?.name}
                </option>
              ))}
            </select>

            {errors.customerId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.customerId.message}
              </p>
            )}
          </div>

          {/* Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableParameters.map((param: any) => (
              <div key={param.name}>
                <label className="block text-sm font-medium mb-2">
                  {displayNameMapping[param.name] || param.name}
                  {param.unit && (
                    <span className="ml-1 text-gray-500">({param.unit})</span>
                  )}
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(param.name, {
                    valueAsNumber: true,
                  })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 border rounded-lg"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={isLoading || !watch("customerId")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Analysis"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
