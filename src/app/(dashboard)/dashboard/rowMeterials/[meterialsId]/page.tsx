"use client";

import React, { use, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/dashboard/PageHeader";
import {
  useGetSignleRowMaterialsQuery,
  useUpdateRowMaterialsMutation,
} from "@/redux/api/rowMaterials/rowMaterialsSliceApi";
import { Material } from "@/components/dashboard/rowMeterials/rowMeterialsTable";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import LoadingPage from "@/components/shared/loading/LoadingPage";
import { Error } from "../addRowMeterials/page";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";

export default function EditMaterials() {
  const params = useParams<{ meterialsId: string }>();
  const meterialsId = params.meterialsId;

  const { data, isLoading } = useGetSignleRowMaterialsQuery(meterialsId);
  const [updateMaterials, { isLoading: updateLoading }] =
    useUpdateRowMaterialsMutation();

  console.log(data);

  const materials = data?.data as Material;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Material>({
    defaultValues: {
      chemicalName: "",
      chemicalType: "",
      supplierName: "",
      dosageRate: "",
      dosageUnit: "",
      feedFrequency: "",
      safetyClassification: "",
      instructions: "",
      isActive: true, // Optional, true | false
      companyId: "",
    },
  });

  useEffect(() => {
    if (materials) {
      reset({
        chemicalName: materials.chemicalName,
        chemicalType: materials.chemicalType,
        supplierName: materials.supplierName,
        dosageRate: materials.dosageRate,
        dosageUnit: "ppm",
        feedFrequency: materials.feedFrequency,
        safetyClassification: materials.safetyClassification,
        instructions: materials.instructions,
        companyId: materials.companyId,
      });
    }
  }, [materials, reset]);

  const onSubmit = async (data: any) => {
    // console.log(userProfile?.companyMember?.companyId);
    if (!materials.companyId) {
      console.error("Company ID is missing");
      return;
    }

    const payload = {
      companyId: materials.companyId,
      ...data,
    };
    console.log(" payloadForm Data: ", payload);

    try {
      const response = await updateMaterials({ payload, meterialsId }).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        // route.push("/dashboard/rowMeterials");
      }
    } catch (error) {
      console.log(error);
      const err = error as Error;
      toast.error(err?.data?.message);
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div className="mb-6">
      {/* header section  */}
      <PageHeader title="Chemical" description="Treatment Chemical Details" />
      <div className="bg-white rounded-lg border border-[#E5E7EB] hover:shadow-sm">
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-headingColor mb-2">
            Chemical
          </h1>

          <h2 className="text-xl font-medium text-headingColor mb-4">
            Treatment Chemical Details
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Chemical Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Chemical Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter ph"
                  {...register("chemicalName", { required: true })}
                  className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                />
              </div>
            </div>

            {/* Chemical Type */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Chemical Type
              </label>
              <Controller
                name="chemicalType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Biocide">Biocide</SelectItem>
                      <SelectItem value="Corrosion Inhibitor">
                        Corrosion Inhibitor
                      </SelectItem>
                      <SelectItem value="Scale Inhibitor">
                        Scale Inhibitor
                      </SelectItem>
                      <SelectItem value="Dispersant">Dispersant</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Supplier Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Supplier Name
              </label>
              <input
                type="text"
                placeholder="Enter magnesium (mg)"
                {...register("supplierName")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>

            {/* Dosage Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Dosage Rate
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register("dosageRate")}
                  className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                />
                <Controller
                  name="dosageUnit"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-24 px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ppm">ppm</SelectItem>
                        <SelectItem value="mg/L">mg/L</SelectItem>
                        <SelectItem value="mL/L">mL/L</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Feed Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Feed Frequency
              </label>
              <Controller
                name="feedFrequency"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Continuous">Continuous</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="weekly">weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Safety Classification */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Safety Classification
              </label>
              <Controller
                name="safetyClassification"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hazardous">Hazardous</SelectItem>
                      <SelectItem value="Non-Hazardous">
                        Non-Hazardous
                      </SelectItem>
                      <SelectItem value="Toxic">Toxic</SelectItem>
                      <SelectItem value="Corrosive">Corrosive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="p-6">
          <h2 className="text-2xl font-medium text-headingColor mb-4">
            Additional Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Special Handling Instructions
            </label>
            <textarea
              placeholder="Enter any special handling requirements..."
              {...register("instructions")}
              className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end m-6 mt-0">
          <div></div>
          <PrimaryButton
            type="button"
            onClick={handleFormSubmit}
            loading={updateLoading}
            text="Save Raw Material"
            className="px-8"
          />
          {/* <button
            onClick={handleFormSubmit}
            className="px-6 py-3 bg-[#004AAD] text-white font-medium rounded-lg hover:bg-[#004AAD] transition-colors text-sm cursor-pointer"
          >
            Save Raw Material
          </button> */}
        </div>
      </div>
    </div>
  );
}
