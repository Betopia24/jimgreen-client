// "use client";
// import PageHeader from "@/components/dashboard/PageHeader";
// import { useForm, Controller } from "react-hook-form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";
// import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
// import { useCreateProductMutation } from "@/redux/api/productsManage/productSliceApi";
// import { Error } from "../../rowMeterials/addRowMeterials/page";
// import LoadingPage from "@/components/shared/loading/LoadingPage2";
// import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// function AddProduct() {
//   const route = useRouter();
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       manufacturer: "",
//       productCategory: "Biocide",
//       intendedUse: "Cooling",
//       operatingPhRangeMin: "",
//       operatingPhRangeMax: "",
//       temperatureTolerance: "",
//       maximumHardnessAllowed: "Treatment Chemical",
//       compatibilityNote: "",
//       costPerUnit: "",
//       averageMonthlyConsumption: "4",
//       consumptionType: "ppm",
//       replacementFrequency: "monthly",
//     },
//   });

//   const [createProductPost, { isLoading }] = useCreateProductMutation();
//   const { data, isLoading: profielLoading } = useGetMeProfileQuery("");

//   const userProfile = data?.data;
//   console.log(userProfile);

//   const onSubmit = async (data: any) => {
//     console.log(data);
//     console.log(userProfile?.companyMember?.companyId);
//     if (!userProfile?.companyMember?.companyId) {
//       console.error("Company ID is missing");
//       return;
//     }

//     const payload = {
//       companyId: userProfile.companyMember.companyId,
//       isActive: true,
//       ...data,
//     };
//     console.log(" payloadForm Data: ", payload);

//     try {
//       const response = await createProductPost(payload).unwrap();
//       console.log(response);
//       if (response?.success) {
//         toast.success(response?.message);
//         route.push("/dashboard/product");
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
//     <div>
//       <div>
//         <PageHeader
//           title="Product Performance & Specifications"
//           description="Enter operational product data used for system treatment and optimization."
//         />
//       </div>
//       {/* from section  */}
//       <div className="bg-white p-6 mb-6 border border-[#E5E7EB] rounded-lg hover:shadow-sm">
//         {/* Product Identification Section */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-semibold text-headingColor mb-2">
//             Product
//           </h1>
//           <h2 className="text-xl font-medium text-headingColor mb-4">
//             Product Identification
//           </h2>

//           <div className="grid lg:grid-cols-2 gap-6">
//             {/* Product Name */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter ph"
//                 {...register("name")}
//                 className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//               />
//             </div>

//             {/* Manufacturer */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Manufacturer
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter ph"
//                 {...register("manufacturer")}
//                 className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//               />
//             </div>

//             {/* Product Category */}
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Product Category
//               </label>
//               <Controller
//                 name="productCategory"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Biocide">Biocide</SelectItem>
//                       <SelectItem value="Corrosion Inhibitor">
//                         Treatment Chemical
//                       </SelectItem>
//                       <SelectItem value="Scale Inhibitor">
//                         Scale Inhibitor
//                       </SelectItem>
//                       <SelectItem value="pH Adjuster">pH Adjuster</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Intended Use
//               </label>
//               <Controller
//                 name="intendedUse"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Cooling">Cooling</SelectItem>
//                       <SelectItem value="Boiler">Boiler</SelectItem>
//                       <SelectItem value="Process Water">
//                         Process Water
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Performance Parameters Section */}
//         <div className=" mb-6">
//           <h2 className="text-xl font-medium text-headingColor mb-4">
//             Performance Parameters
//           </h2>

//           <div className="grid lg:grid-cols-2 gap-6">
//             {/* Operating pH Range */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Operating pH Range
//               </label>
//               {/* <div className="flex items-center gap-3">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   {...register("operatingPhRangeMin", { valueAsNumber: true })}
//                   className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//                 />
//                 <span className="text-gray-400">—</span>
//                 <input
//                   type="number"
//                   placeholder="Max"
//                   {...register("operatingPhRangeMax", { valueAsNumber: true })}
//                   className="flex-1 px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//                 />
//               </div> */}
//               <div className="flex items-center gap-3">
//                 <div className="w-full">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     {...register("operatingPhRangeMin", {
//                       valueAsNumber: true,
//                       min: {
//                         value: 0,
//                         message: "pH must be at least 0",
//                       },
//                       max: {
//                         value: 14,
//                         message: "pH cannot be greater than 14",
//                       },
//                     })}
//                     className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//                   />
//                   {errors.operatingPhRangeMax && (
//                     <p className="text-sm text-red-500 mt-1">
//                       {errors.operatingPhRangeMax.message}
//                     </p>
//                   )}
//                 </div>

//                 <span className="text-gray-400">—</span>

//                 <div className="w-full">
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     {...register("operatingPhRangeMax", {
//                       valueAsNumber: true,
//                       min: {
//                         value: 0,
//                         message: "pH must be at least 0",
//                       },
//                       max: {
//                         value: 14,
//                         message: "pH cannot be greater than 14",
//                       },
//                       validate: (value, formValues) =>
//                         value >= formValues.operatingPhRangeMin ||
//                         "Max pH must be greater than or equal to Min pH",
//                     })}
//                     className="flex-1 w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//                   />
//                   {errors.operatingPhRangeMin && (
//                     <p className="text-sm text-red-500 mt-1">
//                       {errors.operatingPhRangeMin.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Temperature Tolerance (°C) */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Temperature Tolerance (°C)
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter ph"
//                 {...register("temperatureTolerance")}
//                 className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//               />
//             </div>

//             {/* Maximum Hardness Allowed (ppm) */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Maximum Hardness Allowed (ppm)
//               </label>
//               <Controller
//                 name="maximumHardnessAllowed"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Treatment Chemical">
//                         Treatment Chemical
//                       </SelectItem>
//                       <SelectItem value="Testing Reagent">
//                         Testing Reagent
//                       </SelectItem>
//                       <SelectItem value="Cleaning Agent">
//                         Cleaning Agent
//                       </SelectItem>
//                       <SelectItem value="Additive">Additive</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>

//             {/* Compatibility Notes */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Compatibility Notes
//               </label>
//               <textarea
//                 placeholder="Enter compatibility notes and restrictions..."
//                 {...register("compatibilityNote")}
//                 className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Cost & Consumption Section */}
//         <div className="mb-6">
//           <h2 className="text-xl font-medium text-headingColor mb-4">
//             Cost & Consumption
//           </h2>

//           <div className="grid lg:grid-cols-2 gap-6">
//             {/* Cost per Unit ($) */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Cost per Unit ($)
//               </label>
//               <input
//                 type="number"
//                 placeholder="Enter ph"
//                 {...register("costPerUnit", { valueAsNumber: true })}
//                 className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//               />
//             </div>

//             {/* Average Monthly Consumption */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Average Monthly Consumption
//               </label>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   {...register("averageMonthlyConsumption")}
//                   className="flex-1 w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
//                 />
//                 <Controller
//                   name="consumptionType"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger className="w-24 px-4 py-5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
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

//             {/* Replacement Frequency */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-[#344054] mb-2">
//                 Replacement Frequency
//               </label>
//               <Controller
//                 name="replacementFrequency"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {/* <SelectItem value="Daily">Daily</SelectItem>
//                       <SelectItem value="Weekly">Weekly</SelectItem> */}
//                       <SelectItem value="monthly">Monthly</SelectItem>
//                       <SelectItem value="quarterly">Quarterly</SelectItem>
//                       <SelectItem value="semi-annually">
//                         Semi-Annually
//                       </SelectItem>
//                       <SelectItem value="annually">Annually</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="flex gap-5 justify-end">
//           <Link
//             href={"/dashboard/product"}
//             className="px-6 py-3 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm cursor-pointer"
//           >
//             Back
//           </Link>
//           <PrimaryButton
//             type="button"
//             onClick={handleFormSubmit}
//             loading={isLoading}
//             text=" Save Product"
//             className="px-8"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddProduct;

"use client";
import PageHeader from "@/components/dashboard/PageHeader";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import { useCreateProductMutation } from "@/redux/api/productsManage/productSliceApi";

import { Error } from "../../rowMeterials/addRowMeterials/page";
import LoadingPage from "@/components/shared/loading/LoadingPage2";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAllRowMaterialsQuery } from "@/redux/api/rowMaterials/rowMaterialsSliceApi";

type RawMaterialRow = {
  rawId: string;
  percentage: string;
};

type FormValues = {
  productName: string;
  manufacturerName: string;
  rawMaterials: RawMaterialRow[];
  productPrice: string;
  manualCostOverride: string | null;
  calculatedProductCost: string;
  communityVisibility: string;
  isActive: boolean;
};

function AddProduct() {
  const route = useRouter();

  const user = useSelector((state: RootState) => state.user.user);
  const { data, isLoading: profileLoading } = useGetMeProfileQuery("");
  const companyId =
    data?.data?.companyMember?.companyId || user?.companyMember?.companyId;

  const { data: allRawMaterials, isLoading: rawMaterialsLoading } =
    useAllRowMaterialsQuery(companyId, { skip: !companyId });

  const rawMaterialOptions = allRawMaterials?.data ?? [];

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      productName: "",
      manufacturerName: "",
      rawMaterials: [{ rawId: "", percentage: "" }],
      productPrice: "",
      manualCostOverride: null,
      calculatedProductCost: "",
      communityVisibility: "public",
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rawMaterials",
  });

  // Live total percentage
  const watchedRawMaterials = useWatch({ control, name: "rawMaterials" });
  const totalPercentage = watchedRawMaterials.reduce((sum, row) => {
    const val = parseFloat(row?.percentage || "0");
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const isOver100 = totalPercentage > 100;

  const [createProductPost, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (formData: FormValues) => {
    if (!companyId) {
      toast.error("Company ID is missing");
      return;
    }

    const payload = {
      companyId,
      productName: formData.productName,
      manufacturerName: formData.manufacturerName,
      rawMaterials: formData.rawMaterials.map((item) => ({
        rawId: item.rawId,
        percentage: Number(item.percentage),
      })),
      productPrice: Number(formData.productPrice),
      manualCostOverride: formData.manualCostOverride
        ? Number(formData.manualCostOverride)
        : null,
      calculatedProductCost: Number(formData.calculatedProductCost),
      communityVisibility: formData.communityVisibility,
      isActive: formData.isActive,
    };

    try {
      const response = await createProductPost(payload).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        route.push("/dashboard/product");
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

  if (profileLoading) return <LoadingPage />;

  return (
    <div>
      <PageHeader
        title="Product Performance & Specifications"
        description="Enter operational product data used for system treatment and optimization."
      />

      <div className="bg-white p-6 mb-6 border border-[#E5E7EB] rounded-lg hover:shadow-sm">
        {/* Product Identification Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-headingColor mb-2">
            Product
          </h1>
          <h2 className="text-xl font-medium text-headingColor mb-4">
            Product Identification
          </h2>

          {/* Product Name & Manufacturer */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                {...register("productName")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Manufacturer Name
              </label>
              <input
                type="text"
                placeholder="Enter manufacturer name"
                {...register("manufacturerName")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>
          </div>

          {/* Column Headers */}
          <div className="grid lg:grid-cols-2 gap-6 mb-2">
            <label className="block text-sm font-medium text-[#344054]">
              Raw Materials
            </label>
            <label className="block text-sm font-medium text-[#344054]">
              Percentage
            </label>
          </div>

          {/* Dynamic Raw Material Rows */}
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid lg:grid-cols-2 gap-6 items-center"
              >
                {/* Raw Material Dropdown — commonName displayed, rawId stored */}
                <Controller
                  name={`rawMaterials.${index}.rawId`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                        <SelectValue placeholder="Select raw material" />
                      </SelectTrigger>
                      <SelectContent>
                        {rawMaterialsLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        ) : rawMaterialOptions.length === 0 ? (
                          <SelectItem value="empty" disabled>
                            No raw materials found
                          </SelectItem>
                        ) : (
                          rawMaterialOptions.map((rm: any) => (
                            <SelectItem key={rm.id} value={rm.id}>
                              {rm.commonName}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />

                {/* Percentage + Buttons */}
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="0"
                    {...register(`rawMaterials.${index}.percentage`)}
                    className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                  />

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="whitespace-nowrap px-4 py-2.5 bg-red-100 text-red-600 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  )}

                  {/* {index === fields.length - 1 && (
                    <button
                      type="button"
                      onClick={() => append({ rawId: "", percentage: "" })}
                      className="whitespace-nowrap px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Raw Materials
                    </button>
                  )} */}
                </div>
              </div>
            ))}
          </div>

          {/* Total Percentage */}
          <div className="mt-4 flex items-center justify-end gap-3">
            <div>
              <span className="text-sm font-medium text-[#344054]">
                Total Percentage:
              </span>
              <span
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${
                  isOver100
                    ? "bg-red-100 text-red-600"
                    : totalPercentage === 100
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {totalPercentage.toFixed(2)}%
              </span>
              {isOver100 && (
                <span className="text-xs text-red-500">Exceeds 100%</span>
              )}
              {totalPercentage === 100 && (
                <span className="text-xs text-green-500">Perfect!</span>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => append({ rawId: "", percentage: "" })}
                className="whitespace-nowrap px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Raw Materials
              </button>
            </div>
          </div>

          {/* {index === fields.length - 1 && (
            <button
              type="button"
              onClick={() => append({ rawId: "", percentage: "" })}
              className="whitespace-nowrap px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Raw Materials
            </button>
          )} */}
        </div>

        {/* Cost & Consumption Section */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-headingColor mb-4">
            Cost &amp; Consumption
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calculated Product Cost (read-only / auto) */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Calculated Product Cost
              </label>
              <input
                type="number"
                placeholder="Auto calculated"
                {...register("calculatedProductCost")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>

            {/* Product Price */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Product Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                {...register("productPrice")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>

            {/* Manual Cost Override */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Manual Cost Override
              </label>
              <input
                type="number"
                placeholder="Leave blank to use calculated cost"
                {...register("manualCostOverride")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>

            {/* Community Visibility */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Select Community Visibility
              </label>
              <Controller
                name="communityVisibility"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="Water Treatment Companies">
                        Water Treatment Companies
                      </SelectItem>
                      <SelectItem value="Technical Users">
                        Technical Users
                      </SelectItem>
                      <SelectItem value="My own company's users">
                        My own company's users
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 justify-end">
          <Link
            href={"/dashboard/product"}
            className="px-6 py-3 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm cursor-pointer"
          >
            Back
          </Link>
          <PrimaryButton
            type="button"
            onClick={handleFormSubmit}
            loading={isLoading}
            text="Save Product"
            className="px-8"
          />
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
