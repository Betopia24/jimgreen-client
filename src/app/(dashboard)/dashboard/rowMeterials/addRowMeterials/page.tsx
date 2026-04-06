// "use client";

// import React from "react";
// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import PageHeader from "@/components/dashboard/PageHeader";
// import { useCreateRowMaterialsMutation } from "@/redux/api/rowMaterials/rowMaterialsSliceApi";
// import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
// import { toast } from "sonner";
// import { LuLoader, LuPlus, LuTrash2 } from "react-icons/lu";
// import LoadingPage from "@/components/shared/loading/LoadingPage2";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useGetSaltSaturationQuery } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";

// export type Error = {
//   data: {
//     message: string;
//   };
// };

// export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   avatar: string | null;
//   provider: "EMAIL" | string;
//   isEmailVerified: boolean;
//   role: "USER" | "ADMIN" | string;
//   status: "UNBLOCK" | "BLOCK" | string;
//   createdAt: string;
//   updatedAt: string;
//   companyMember: CompanyMember;
//   activeSubscription: ActiveSubscription;
// }

// export interface CompanyMember {
//   role: "member" | "admin" | string;
//   company: Company;
//   status: "active" | "inactive" | string;
// }

// export interface Company {
//   id: string;
//   name: string;
//   email: string;
//   isActive: boolean;
// }

// export interface ActiveSubscription {
//   id: string;
//   status: "ACTIVE" | "INACTIVE" | string;
//   startDate: string;
//   endDate: string;
//   canceledAt: string | null;
//   planSnapshot: PlanSnapshot;
//   remainingReportGeneration: number;
//   remainingAccountAddition: number;
// }

// export interface PlanSnapshot {
//   name: string;
//   price: number;
//   maxReports: number;
//   maxAccounts: number;
//   features: string[];
// }

// interface FormulaRow {
//   salToInhibit: string;
//   applicableIonicStrength: string;
//   formulaForInhibitionPerformance: string;
// }

// interface FormValues {
//   commonName: string;
//   manufacturer: string;
//   manufacturerProductName: string;
//   activeComponentName: string;
//   activePercentage: number | string;
//   activePercentageChemicalFormula: string;
//   estimatedCost: number | string;
//   formulas: FormulaRow[];
//   bandUpperCushion: string;
//   bandLowerCushion: string;
//   communityVisibility: string;
//   additionalInformation: string;
//   isActive: boolean;
// }

// export default function AddRowMeterials() {
//   const route = useRouter();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       commonName: "",
//       manufacturer: "",
//       manufacturerProductName: "",
//       activeComponentName: "",
//       activePercentage: "",
//       activePercentageChemicalFormula: "",
//       estimatedCost: "",
//       formulas: [
//         {
//           salToInhibit: "",
//           applicableIonicStrength: "",
//           formulaForInhibitionPerformance: "",
//         },
//       ],
//       bandUpperCushion: "",
//       bandLowerCushion: "",
//       communityVisibility: "",
//       additionalInformation: "",
//       isActive: true,
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "formulas",
//   });

//   const [createMaterialsPost, { isLoading }] = useCreateRowMaterialsMutation();
//   const { data, isLoading: profielLoading } = useGetMeProfileQuery("");
//   const userProfile = data?.data as User;
//   const { data: saltData, isLoading: saltsLoading } =
//     useGetSaltSaturationQuery("");

//   const onSubmit = async (data: FormValues) => {
//     if (!userProfile?.companyMember?.company?.id) {
//       console.error("Company ID is missing");
//       return;
//     }
//     const payload = {
//       companyId: userProfile.companyMember.company.id,
//       commonName: data.commonName,
//       manufacturer: data.manufacturer,
//       manufacturerProductName: data.manufacturerProductName,
//       activeComponentName: data.activeComponentName,
//       activePercentage: data.activePercentage,
//       activePercentageChemicalFormula: data.activePercentageChemicalFormula,
//       estimatedCost: data.estimatedCost,
//       formulas: data.formulas,
//       bandUpperCushion: data.bandUpperCushion,
//       bandLowerCushion: data.bandLowerCushion,
//       communityVisibility: data.communityVisibility,
//       additionalInformation: data.additionalInformation,
//       isActive: data.isActive,
//     };
//     try {
//       const response = await createMaterialsPost(payload).unwrap();
//       if (response?.success) {
//         toast.success(response?.message);
//         route.push("/dashboard/rowMeterials");
//       }
//     } catch (error) {
//       const err = error as Error;
//       toast.error(err?.data?.message);
//     }
//   };

//   const handleFormSubmit = (e: any) => {
//     e.preventDefault();
//     handleSubmit(onSubmit)(e);
//   };

//   if (profielLoading) {
//     return <LoadingPage />;
//   }

//   const inputClass =
//     "w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F3F3F3]";

//   return (
//     <div className="mb-6">
//       <PageHeader title="Chemical" description="Treatment Chemical Details" />

//       <div className="bg-white rounded-md border border-[#E5E7EB] hover:shadow-sm">
//         <div className="p-6">
//           <div className="grid lg:grid-cols-2 gap-6">
//             {/* commonName */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Raw Material Common Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter common name"
//                 {...register("commonName", { required: true })}
//                 className={inputClass}
//               />
//             </div>

//             {/* manufacturer */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Manufacturer
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter manufacturer"
//                 {...register("manufacturer")}
//                 className={inputClass}
//               />
//             </div>

//             {/* manufacturerProductName */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Manufacturer Product Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter manufacturer product name"
//                 {...register("manufacturerProductName")}
//                 className={inputClass}
//               />
//             </div>

//             {/* activeComponentName */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Active Component Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter active component name"
//                 {...register("activeComponentName")}
//                 className={inputClass}
//               />
//             </div>

//             {/* activePercentage */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Active Percentage
//               </label>
//               <input
//                 type="number"
//                 placeholder="Enter active percentage"
//                 {...register("activePercentage", { valueAsNumber: true })}
//                 className={inputClass}
//               />
//             </div>

//             {/* activePercentageChemicalFormula */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Active Percentage Chemical Formula
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter chemical formula"
//                 {...register("activePercentageChemicalFormula")}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* ── Formula Rows ── */}
//           <div className="mt-6 space-y-4">
//             {fields.map((field, index) => (
//               <div
//                 key={field.id}
//                 className="grid lg:grid-cols-3 gap-4 p-4 border border-[#E5E7EB] rounded-md bg-gray-50 relative"
//               >
//                 {/* salToInhibit */}
//                 <div>
//                   <label className="block text-sm font-medium text-[#344054] mb-2">
//                     Salt to Inhibit
//                   </label>
//                   <Controller
//                     name={`formulas.${index}.salToInhibit`}
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <SelectTrigger className={inputClass}>
//                           <SelectValue placeholder="Select salt" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Biocide">Biocide</SelectItem>
//                           <SelectItem value="Calcium Sulfate">
//                             Calcium Sulfate
//                           </SelectItem>
//                           <SelectItem value="Calcium Carbonate">
//                             Calcium Carbonate
//                           </SelectItem>
//                           <SelectItem value="Barium Sulfate">
//                             Barium Sulfate
//                           </SelectItem>
//                           <SelectItem value="Strontium Sulfate">
//                             Strontium Sulfate
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>

//                 {/* applicableIonicStrength */}
//                 <div>
//                   <label className="block text-sm font-medium text-[#344054] mb-2">
//                     Applicable Ionic Strength
//                   </label>
//                   <Controller
//                     name={`formulas.${index}.applicableIonicStrength`}
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <SelectTrigger className={inputClass}>
//                           <SelectValue placeholder="Select ionic strength" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="<0.1">&lt;0.1</SelectItem>
//                           <SelectItem value="0.1-0.5">0.1–0.5</SelectItem>
//                           <SelectItem value=">0.5">&gt;0.5</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>

//                 {/* formulaForInhibitionPerformance */}
//                 <div>
//                   <label className="block text-sm font-medium text-[#344054] mb-2">
//                     Formula for Inhibition Performance
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter formula"
//                     {...register(
//                       `formulas.${index}.formulaForInhibitionPerformance`,
//                     )}
//                     className={inputClass}
//                   />
//                 </div>

//                 {/* Remove button (only show if more than 1 row) */}
//                 {fields.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => remove(index)}
//                     className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors"
//                   >
//                     <LuTrash2 size={16} />
//                   </button>
//                 )}
//               </div>
//             ))}

//             {/* Add Formula Button */}
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={() =>
//                   append({
//                     salToInhibit: "",
//                     applicableIonicStrength: "",
//                     formulaForInhibitionPerformance: "",
//                   })
//                 }
//                 className="flex items-center  gap-2 px-4 py-2 bg-primaryColor text-white text-sm font-medium rounded-md hover:bg-[#004AAD] transition-colors"
//               >
//                 <LuPlus size={16} />
//                 Add Formula
//               </button>
//             </div>
//           </div>

//           {/* ── Remaining Fields ── */}
//           <div className="grid lg:grid-cols-2 gap-6 mt-6">
//             {/* estimatedCost */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Estimated Cost
//               </label>
//               <input
//                 type="number"
//                 placeholder="Enter estimated cost"
//                 {...register("estimatedCost", { valueAsNumber: true })}
//                 className={inputClass}
//               />
//             </div>

//             {/* bandUpperCushion */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Caution (Yellow) Band Upper Cushion
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter upper cushion"
//                 {...register("bandUpperCushion")}
//                 className={inputClass}
//               />
//             </div>

//             {/* bandLowerCushion */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Caution (Yellow) Band Lower Cushion
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter lower cushion"
//                 {...register("bandLowerCushion")}
//                 className={inputClass}
//               />
//             </div>

//             {/* communityVisibility */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Select Community Visibility
//               </label>
//               <Controller
//                 name="communityVisibility"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger className={inputClass}>
//                       <SelectValue placeholder="Select visibility" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Public">Public</SelectItem>
//                       <SelectItem value="Water Treatment Companies">
//                         Water Treatment Companies
//                       </SelectItem>
//                       <SelectItem value="Technical Users">
//                         Technical Users
//                       </SelectItem>
//                       <SelectItem value="My own company's users">
//                         My own company&apos;s users
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>
//           </div>

//           {/* ── Additional Information ── */}
//           <div className="mt-8">
//             <h3 className="text-xl font-semibold text-headingColor mb-4">
//               Additional Information
//             </h3>
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Special Handling Instructions
//               </label>
//               <textarea
//                 rows={4}
//                 placeholder="Enter any special handling requirements..."
//                 {...register("additionalInformation")}
//                 className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F3F3F3] resize-none"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-5 justify-end m-6">
//           <Link
//             href={"/dashboard/rowMeterials"}
//             className="px-6 py-3 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm cursor-pointer"
//           >
//             Back
//           </Link>
//           <button
//             onClick={handleFormSubmit}
//             className="px-6 py-3 flex items-center gap-3 bg-primaryColor text-white font-medium rounded-md hover:bg-[#004AAD] transition-colors text-sm cursor-pointer"
//           >
//             {isLoading && <LuLoader className="animate-spin text-white" />}
//             Save Raw Material
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/dashboard/PageHeader";
import { useCreateRowMaterialsMutation } from "@/redux/api/rowMaterials/rowMaterialsSliceApi";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import { toast } from "sonner";
import { LuLoader, LuPlus, LuTrash2 } from "react-icons/lu";
import LoadingPage from "@/components/shared/loading/LoadingPage2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetSaltSaturationQuery } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";

export type Error = {
  data: {
    message: string;
  };
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  provider: "EMAIL" | string;
  isEmailVerified: boolean;
  role: "USER" | "ADMIN" | string;
  status: "UNBLOCK" | "BLOCK" | string;
  createdAt: string;
  updatedAt: string;
  companyMember: CompanyMember;
  activeSubscription: ActiveSubscription;
}

export interface CompanyMember {
  role: "member" | "admin" | string;
  company: Company;
  status: "active" | "inactive" | string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface ActiveSubscription {
  id: string;
  status: "ACTIVE" | "INACTIVE" | string;
  startDate: string;
  endDate: string;
  canceledAt: string | null;
  planSnapshot: PlanSnapshot;
  remainingReportGeneration: number;
  remainingAccountAddition: number;
}

export interface PlanSnapshot {
  name: string;
  price: number;
  maxReports: number;
  maxAccounts: number;
  features: string[];
}

export interface Salt {
  name: string;
  chemical_formula: string;
  phase: string | null;
}

interface FormulaRow {
  salToInhibit: string;
  applicableIonicStrength: string;
  formulaForInhibitionPerformance: string;
}

interface FormValues {
  commonName: string;
  manufacturer: string;
  manufacturerProductName: string;
  activeComponentName: string;
  activePercentage: number | string;
  activePercentageChemicalFormula: string;
  estimatedCost: number | string;
  formulas: FormulaRow[];
  bandUpperCushion: string;
  bandLowerCushion: string;
  communityVisibility: string;
  additionalInformation: string;
  isActive: boolean;
}

export default function AddRowMeterials() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      commonName: "",
      manufacturer: "",
      manufacturerProductName: "",
      activeComponentName: "",
      activePercentage: "",
      activePercentageChemicalFormula: "",
      estimatedCost: "",
      formulas: [
        {
          salToInhibit: "",
          applicableIonicStrength: "",
          formulaForInhibitionPerformance: "",
        },
      ],
      bandUpperCushion: "",
      bandLowerCushion: "",
      communityVisibility: "",
      additionalInformation: "",
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "formulas",
  });

  const [createMaterialsPost, { isLoading }] = useCreateRowMaterialsMutation();
  const { data, isLoading: profileLoading } = useGetMeProfileQuery("");
  const userProfile = data?.data as User;
  const { data: saltData, isLoading: saltsLoading } =
    useGetSaltSaturationQuery("");

  const salts: Salt[] = saltData?.data ?? [];

  const onSubmit = async (data: FormValues) => {
    if (!userProfile?.companyMember?.company?.id) {
      console.error("Company ID is missing");
      return;
    }
    const payload = {
      companyId: userProfile.companyMember.company.id,
      commonName: data.commonName,
      manufacturer: data.manufacturer,
      manufacturerProductName: data.manufacturerProductName,
      activeComponentName: data.activeComponentName,
      activePercentage: data.activePercentage,
      activePercentageChemicalFormula: data.activePercentageChemicalFormula,
      estimatedCost: data.estimatedCost,
      formulas: data.formulas,
      bandUpperCushion: data.bandUpperCushion,
      bandLowerCushion: data.bandLowerCushion,
      communityVisibility: data.communityVisibility,
      additionalInformation: data.additionalInformation,
      isActive: data.isActive,
    };
    try {
      const response = await createMaterialsPost(payload).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        route.push("/dashboard/rowMeterials");
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err?.data?.message);
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  if (profileLoading) {
    return <LoadingPage />;
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F3F3F3]";

  return (
    <div className="mb-6">
      <PageHeader title="Chemical" description="Treatment Chemical Details" />

      <div className="bg-white rounded-md border border-[#E5E7EB] hover:shadow-sm">
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* commonName */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Raw Material Common Name
              </label>
              <input
                type="text"
                placeholder="Enter common name"
                {...register("commonName", { required: true })}
                className={inputClass}
              />
            </div>

            {/* manufacturer */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Manufacturer
              </label>
              <input
                type="text"
                placeholder="Enter manufacturer"
                {...register("manufacturer")}
                className={inputClass}
              />
            </div>

            {/* manufacturerProductName */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Manufacturer Product Name
              </label>
              <input
                type="text"
                placeholder="Enter manufacturer product name"
                {...register("manufacturerProductName")}
                className={inputClass}
              />
            </div>

            {/* activeComponentName */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Active Component Name
              </label>
              <input
                type="text"
                placeholder="Enter active component name"
                {...register("activeComponentName")}
                className={inputClass}
              />
            </div>

            {/* activePercentage */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Active Percentage
              </label>
              <input
                type="number"
                placeholder="Enter active percentage"
                {...register("activePercentage", { valueAsNumber: true })}
                className={inputClass}
              />
            </div>

            {/* activePercentageChemicalFormula */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Active Percentage Chemical Formula
              </label>
              <input
                type="text"
                placeholder="Enter chemical formula"
                {...register("activePercentageChemicalFormula")}
                className={inputClass}
              />
            </div>
          </div>

          {/* ── Formula Rows ── */}
          <div className="mt-6 space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid lg:grid-cols-3 gap-4 p-4 border border-[#E5E7EB] rounded-md bg-gray-50 relative"
              >
                {/* salToInhibit */}
                <div>
                  <label className="block text-sm font-medium text-[#344054] mb-2">
                    Salt to Inhibit
                  </label>
                  <Controller
                    name={`formulas.${index}.salToInhibit`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className={inputClass}>
                          <SelectValue
                            placeholder={
                              saltsLoading ? "Loading salts..." : "Select salt"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {saltsLoading ? (
                            <SelectItem value="_loading" disabled>
                              Loading...
                            </SelectItem>
                          ) : salts.length === 0 ? (
                            <SelectItem value="_empty" disabled>
                              No salts available
                            </SelectItem>
                          ) : (
                            salts.map((salt) => (
                              <SelectItem key={salt.name} value={salt.name}>
                                {salt.name} ({salt.chemical_formula})
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* applicableIonicStrength */}
                <div>
                  <label className="block text-sm font-medium text-[#344054] mb-2">
                    Applicable Ionic Strength
                  </label>
                  <Controller
                    name={`formulas.${index}.applicableIonicStrength`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="Select ionic strength" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<0.1">&lt;0.1</SelectItem>
                          <SelectItem value="0.1-0.5">0.1–0.5</SelectItem>
                          <SelectItem value=">0.5">&gt;0.5</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* formulaForInhibitionPerformance */}
                <div>
                  <label className="block text-sm font-medium text-[#344054] mb-2">
                    Formula for Inhibition Performance
                  </label>
                  <input
                    type="text"
                    placeholder="Enter formula"
                    {...register(
                      `formulas.${index}.formulaForInhibitionPerformance`,
                    )}
                    className={inputClass}
                  />
                </div>

                {/* Remove button (only show if more than 1 row) */}
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <LuTrash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            {/* Add Formula Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  append({
                    salToInhibit: "",
                    applicableIonicStrength: "",
                    formulaForInhibitionPerformance: "",
                  })
                }
                className="flex items-center gap-2 px-4 py-2 bg-primaryColor text-white text-sm font-medium rounded-md hover:bg-[#004AAD] transition-colors"
              >
                <LuPlus size={16} />
                Add Formula
              </button>
            </div>
          </div>

          {/* ── Remaining Fields ── */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* estimatedCost */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Estimated Cost
              </label>
              <input
                type="number"
                placeholder="Enter estimated cost"
                {...register("estimatedCost", { valueAsNumber: true })}
                className={inputClass}
              />
            </div>

            {/* bandUpperCushion */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Caution (Yellow) Band Upper Cushion
              </label>
              <input
                type="text"
                placeholder="Enter upper cushion"
                {...register("bandUpperCushion")}
                className={inputClass}
              />
            </div>

            {/* bandLowerCushion */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Caution (Yellow) Band Lower Cushion
              </label>
              <input
                type="text"
                placeholder="Enter lower cushion"
                {...register("bandLowerCushion")}
                className={inputClass}
              />
            </div>

            {/* communityVisibility */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Select Community Visibility
              </label>
              <Controller
                name="communityVisibility"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Water Treatment Companies">
                        Water Treatment Companies
                      </SelectItem>
                      <SelectItem value="Technical Users">
                        Technical Users
                      </SelectItem>
                      <SelectItem value="My own company's users">
                        My own company&apos;s users
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* ── Additional Information ── */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-headingColor mb-4">
              Additional Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Special Handling Instructions
              </label>
              <textarea
                rows={4}
                placeholder="Enter any special handling requirements..."
                {...register("additionalInformation")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F3F3F3] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-5 justify-end m-6">
          <Link
            href={"/dashboard/rowMeterials"}
            className="px-6 py-3 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm cursor-pointer"
          >
            Back
          </Link>
          <button
            onClick={handleFormSubmit}
            className="px-6 py-3 flex items-center gap-3 bg-primaryColor text-white font-medium rounded-md hover:bg-[#004AAD] transition-colors text-sm cursor-pointer"
          >
            {isLoading && <LuLoader className="animate-spin text-white" />}
            Save Raw Material
          </button>
        </div>
      </div>
    </div>
  );
}
