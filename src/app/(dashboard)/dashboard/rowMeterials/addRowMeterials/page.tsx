// "use client";

// import React from "react";
// import { useForm, Controller } from "react-hook-form";
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
// import { LuLoader } from "react-icons/lu";
// import LoadingPage from "@/components/shared/loading/LoadingPage2";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

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
//   isEmailVerified: boolean;
//   role: "USER";
//   status: "UNBLOCK";
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
//   companyMember: {
//     role: "owner";
//     companyId: string;
//     status: "active";
//   };
// }

// export default function AddRowMeterials() {
//   const route = useRouter();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       chemicalName: "Sodium Hypochlorite",
//       chemicalType: "Biocide",
//       supplierName: "ChemSupply Co.",
//       dosageRate: "4",
//       dosageType: "ppm",
//       feedFrequency: "Daily",
//       safetyClassification: "Hazardous",
//       instructions: "",
//       isActive: true,
//     },
//   });
//   const [createMaterialsPost, { isLoading }] = useCreateRowMaterialsMutation();
//   const { data, isLoading: profielLoading } = useGetMeProfileQuery("");

//   const userProfile = data?.data as User;
//   console.log(userProfile?.companyMember?.companyId);

//   const onSubmit = async (data: any) => {
//     console.log(userProfile?.companyMember?.companyId);
//     if (!userProfile?.companyMember?.companyId) {
//       console.error("Company ID is missing");
//       return;
//     }

//     const payload = {
//       companyId: userProfile.companyMember.companyId,
//       ...data,
//     };
//     console.log(" payloadForm Data: ", payload);

//     try {
//       const response = await createMaterialsPost(payload).unwrap();
//       console.log(response);
//       if (response?.success) {
//         toast.success(response?.message);
//         route.push("/dashboard/rowMeterials");
//       }
//     } catch (error) {
//       console.log(error);
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

//   return (
//     <div className="mb-6">
//       {/* header section  */}
//       <PageHeader title="Chemical" description="Treatment Chemical Details" />
//       <div className="bg-white rounded-md border border-[#E5E7EB] hover:shadow-sm">
//         <div className="p-6">
//           <h1 className="text-3xl font-semibold text-headingColor mb-2">
//             Chemical
//           </h1>

//           <h2 className="text-xl font-medium text-headingColor mb-4">
//             Treatment Chemical Details
//           </h2>

//           <div className="grid lg:grid-cols-2 gap-6">
//             {/* Chemical Name */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Chemical Name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Enter ph"
//                   {...register("chemicalName", { required: true })}
//                   className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//                 />
//               </div>
//             </div>

//             {/* Chemical Type */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Chemical Type
//               </label>
//               <Controller
//                 name="chemicalType"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
//                       <SelectValue placeholder="Select type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Biocide">Biocide</SelectItem>
//                       <SelectItem value="Corrosion Inhibitor">
//                         Corrosion Inhibitor
//                       </SelectItem>
//                       <SelectItem value="Scale Inhibitor">
//                         Scale Inhibitor
//                       </SelectItem>
//                       <SelectItem value="Dispersant">Dispersant</SelectItem>
//                       <SelectItem value="Other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>

//             {/* Supplier Name */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Supplier Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter magnesium (mg)"
//                 {...register("supplierName")}
//                 className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//               />
//             </div>

//             {/* Dosage Rate */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Dosage Rate
//               </label>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   {...register("dosageRate")}
//                   className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//                 />
//                 <Controller
//                   name="dosageType"
//                   control={control}
//                   render={(
//                     { field }, ///
//                   ) => (
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger className="w-24 px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="ppm">ppm</SelectItem>
//                         <SelectItem value="mg/L">mg/L</SelectItem>
//                         <SelectItem value="mL/L">mL/L</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Feed Frequency */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Feed Frequency
//               </label>
//               <Controller
//                 name="feedFrequency"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
//                       <SelectValue placeholder="Select frequency" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Continuous">Continuous</SelectItem>
//                       <SelectItem value="Daily">Daily</SelectItem>
//                       <SelectItem value="weekly">weekly</SelectItem>
//                       <SelectItem value="Monthly">Monthly</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>

//             {/* Safety Classification */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Safety Classification
//               </label>
//               <Controller
//                 name="safetyClassification"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
//                       <SelectValue placeholder="Select classification" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Hazardous">Hazardous</SelectItem>
//                       <SelectItem value="Non-Hazardous">
//                         Non-Hazardous
//                       </SelectItem>
//                       <SelectItem value="Toxic">Toxic</SelectItem>
//                       <SelectItem value="Corrosive">Corrosive</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="p-6">
//           <h2 className="text-2xl font-medium text-headingColor mb-4">
//             Additional Information
//           </h2>

//           <div>
//             <label className="block text-sm font-medium text-[#344054] mb-2">
//               Special Handling Instructions
//             </label>
//             <textarea
//               placeholder="Enter any special handling requirements..."
//               {...register("instructions")}
//               className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//             />
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="flex gap-5 justify-end m-6 mt-0">
//           <Link
//             href={"/dashboard/rowMeterials"}
//             className="px-6 py-3 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm cursor-pointer"
//           >
//             Back
//           </Link>
//           <button
//             onClick={handleFormSubmit}
//             className="px-6 py-3 flex items-center gap-3 bg-[#004AAD] text-white font-medium rounded-md hover:bg-[#004AAD] transition-colors text-sm cursor-pointer"
//           >
//             {isLoading && (
//               <>
//                 <LuLoader
//                   className={` animate-spin text-center absolutem text-white`}
//                 />
//               </>
//             )}
//             Save Raw Material
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
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
import { LuLoader } from "react-icons/lu";
import LoadingPage from "@/components/shared/loading/LoadingPage2";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  isEmailVerified: boolean;
  role: "USER";
  status: "UNBLOCK";
  createdAt: string;
  updatedAt: string;
  companyMember: {
    role: "owner";
    companyId: string;
    status: "active";
  };
}

export default function AddRowMeterials() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      commonName: "",
      manufacturer: "",
      manufacturerProductName: "",
      activeComponentName: "",
      activePercentage: "",
      activePercentageChemicalFormula: "",
      estimatedCost: "",
      saltToInhibit: "",
      formulaForInhibitionPerformance: "",
      bandUpperCushion: "",
      bandLowerCushion: "",
      communityVisibility: "",
      isActive: true,
    },
  });

  const [createMaterialsPost, { isLoading }] = useCreateRowMaterialsMutation();
  const { data, isLoading: profielLoading } = useGetMeProfileQuery("");
  const userProfile = data?.data as User;

  const onSubmit = async (data: any) => {
    if (!userProfile?.companyMember?.companyId) {
      console.error("Company ID is missing");
      return;
    }
    const payload = {
      companyId: userProfile.companyMember.companyId,
      ...data,
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

  if (profielLoading) {
    return <LoadingPage />;
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-[#F3F3F3] rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F3F3F3]";

  return (
    <div className="mb-6">
      <PageHeader title="Chemical" description="Treatment Chemical Details" />

      <div className="bg-white rounded-md border border-[#E5E7EB] hover:shadow-sm">
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-headingColor mb-2">
            Chemical
          </h1>
          <h2 className="text-xl font-medium text-headingColor mb-4">
            Treatment Chemical Details
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* commonName */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Raw Material Common Name
              </label>
              <input
                type="text"
                placeholder="Enter ph"
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
                placeholder="Enter magnesium (mg)"
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

            {/* estimatedCost */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Estimated Cost
              </label>
              <input
                type="number"
                placeholder="Enter ph"
                {...register("estimatedCost", { valueAsNumber: true })}
                className={inputClass}
              />
            </div>

            {/* saltToInhibit */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Salt to Inhibit
              </label>
              <input
                type="text"
                placeholder="Enter salt to inhibit"
                {...register("saltToInhibit")}
                className={inputClass}
              />
            </div>

            {/* formulaForInhibitionPerformance */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Formula for inhibition performance
              </label>
              <input
                type="text"
                placeholder="Enter magnesium (mg)"
                {...register("formulaForInhibitionPerformance")}
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

            {/* communityVisibility — only dropdown */}
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
