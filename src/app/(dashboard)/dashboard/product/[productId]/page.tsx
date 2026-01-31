"use client";
import PageHeader from "@/components/dashboard/PageHeader";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import {
  useCreateProductMutation,
  useGetSignleProductQuery,
  useUpdateProductsMutation,
} from "@/redux/api/productsManage/productSliceApi";
import { Error } from "../../rowMeterials/addRowMeterials/page";
import LoadingPage from "@/components/shared/loading/LoadingPage";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useParams, useSearchParams } from "next/navigation";
import { Product } from "@/components/dashboard/product/productRowMeterialTable";
import { useEffect } from "react";
import Link from "next/link";

function UpdateProduct() {
  const params = useParams();
  const id = params.productId as string;

  const { data: signleProduct, isLoading } = useGetSignleProductQuery(id);
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductsMutation();

  const { data: profileData } = useGetMeProfileQuery("");
  const userProfile = profileData?.data;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      manufacturer: "",
      productCategory: "Biocide",
      intendedUse: "Cooling",
      operatingPhRangeMin: "",
      operatingPhRangeMax: "",
      temperatureTolerance: "",
      maximumHardnessAllowed: "Treatment Chemical",
      compatibilityNote: "",
      costPerUnit: "",
      averageMonthlyConsumption: "4",
      consumptionUnit: "ppm",
      replacementFrequency: "Monthly",
    },
  });

  useEffect(() => {
    if (signleProduct?.data) {
      const product = signleProduct.data as Product;

      reset({
        name: product.name ?? "",
        manufacturer: product.manufacturer ?? "",
        productCategory: product.productCategory ?? "Biocide",
        intendedUse: product.intendedUse ?? "Cooling",

        operatingPhRangeMin:
          product.operatingPhRangeMin !== undefined
            ? String(product.operatingPhRangeMin)
            : "",

        operatingPhRangeMax:
          product.operatingPhRangeMax !== undefined
            ? String(product.operatingPhRangeMax)
            : "",

        temperatureTolerance:
          product.temperatureTolerance !== undefined
            ? String(product.temperatureTolerance)
            : "",
        maximumHardnessAllowed:
          product.maximumHardnessAllowed !== undefined
            ? String(product.maximumHardnessAllowed)
            : "",
        compatibilityNote: product.compatibilityNote ?? "",
        costPerUnit:
          product.costPerUnit !== undefined ? String(product.costPerUnit) : "",

        averageMonthlyConsumption:
          product.averageMonthlyConsumption !== undefined
            ? String(product.averageMonthlyConsumption)
            : "",
        consumptionUnit: product.consumptionUnit ?? "ppm",
        replacementFrequency: product.replacementFrequency ?? "monthly",
      });
    }
  }, [signleProduct, reset]);

  /**  UPDATE ONLY */
  const onSubmit = async (formData: any) => {
    if (!userProfile?.companyMember?.companyId) return;

    const payload = {
      companyId: userProfile.companyMember.companyId,
      ...formData,
    };

    try {
      const response = await updateProduct({
        payload,
        id,
      }).unwrap();

      toast.success(response?.message);
    } catch (error) {
      const err = error as Error;
      toast.error(err?.data?.message);
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      <div>
        <PageHeader
          title="Product Performance & Specifications"
          description="Enter operational product data used for system treatment and optimization."
        />
      </div>
      {/* from section  */}
      <div className="bg-white p-6 mb-6 border border-[#E5E7EB] rounded-lg hover:shadow-sm">
        {/* Product Identification Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-headingColor mb-2">
            Product
          </h1>
          <h2 className="text-xl font-medium text-headingColor mb-4">
            Product Identification
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter ph"
                {...register("name")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>

            {/* Manufacturer */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Manufacturer
              </label>
              <input
                type="text"
                placeholder="Enter ph"
                {...register("manufacturer")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>

            {/* Product Category */}
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Product Category
              </label>
              <Controller
                name="productCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Biocide">Biocide</SelectItem>
                      <SelectItem value="Corrosion Inhibitor">
                        Treatment Chemical
                      </SelectItem>
                      <SelectItem value="Scale Inhibitor">
                        Scale Inhibitor
                      </SelectItem>
                      <SelectItem value="pH Adjuster">pH Adjuster</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Intended Use
              </label>
              <Controller
                name="intendedUse"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cooling">Cooling</SelectItem>
                      <SelectItem value="Boiler">Boiler</SelectItem>
                      <SelectItem value="Process Water">
                        Process Water
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        {/* Performance Parameters Section */}
        <div className=" mb-6">
          <h2 className="text-xl font-medium text-headingColor mb-4">
            Performance Parameters
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Operating pH Range */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Operating pH Range
              </label>
              {/* <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  {...register("operatingPhRangeMin", { valueAsNumber: true })}
                  className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                />
                <span className="text-gray-400">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  {...register("operatingPhRangeMax", { valueAsNumber: true })}
                  className="flex-1 px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                />
              </div> */}
              <div className="flex items-center gap-3">
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Min"
                    {...register("operatingPhRangeMin", {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "pH must be at least 0",
                      },
                      max: {
                        value: 14,
                        message: "pH cannot be greater than 14",
                      },
                    })}
                    className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                  />
                  {errors.operatingPhRangeMax && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.operatingPhRangeMax.message}
                    </p>
                  )}
                </div>

                <span className="text-gray-400">—</span>

                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Max"
                    {...register("operatingPhRangeMax", {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "pH must be at least 0",
                      },
                      max: {
                        value: 14,
                        message: "pH cannot be greater than 14",
                      },
                      validate: (value, formValues) =>
                        value >= formValues.operatingPhRangeMin ||
                        "Max pH must be greater than or equal to Min pH",
                    })}
                    className="flex-1 w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                  />
                  {errors.operatingPhRangeMin && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.operatingPhRangeMin.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Temperature Tolerance (°C) */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Temperature Tolerance (°C)
              </label>
              <input
                type="text"
                placeholder="Enter ph"
                {...register("temperatureTolerance")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>

            {/* Maximum Hardness Allowed (ppm) */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Maximum Hardness Allowed (ppm)
              </label>
              <Controller
                name="maximumHardnessAllowed"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Treatment Chemical">
                        Treatment Chemical
                      </SelectItem>
                      <SelectItem value="Testing Reagent">
                        Testing Reagent
                      </SelectItem>
                      <SelectItem value="Cleaning Agent">
                        Cleaning Agent
                      </SelectItem>
                      <SelectItem value="Additive">Additive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Compatibility Notes */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Compatibility Notes
              </label>
              <textarea
                placeholder="Enter compatibility notes and restrictions..."
                {...register("compatibilityNote")}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>
          </div>
        </div>

        {/* Cost & Consumption Section */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-headingColor mb-4">
            Cost & Consumption
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Cost per Unit ($) */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Cost per Unit ($)
              </label>
              <input
                type="number"
                placeholder="Enter ph"
                {...register("costPerUnit", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
              />
            </div>

            {/* Average Monthly Consumption */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Average Monthly Consumption
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register("averageMonthlyConsumption")}
                  className="flex-1 w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]"
                />
                <Controller
                  name="consumptionUnit"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-24 px-4 py-5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
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

            {/* Replacement Frequency */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#344054] mb-2">
                Replacement Frequency
              </label>
              <Controller
                name="replacementFrequency"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full px-4 py-2.5 border border-[#F3F3F3] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#F3F3F3]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="semi-annually">
                        Semi-Annually
                      </SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-5 justify-end">
          {/* <button
            onClick={handleFormSubmit}
            className="px-6 py-3 bg-[#004AAD] text-white font-medium rounded-lg hover:bg-[#004AAD] transition-colors text-sm cursor-pointer"
          >
            Save Product
          </button> */}
          <Link
            href={"/dashboard/product"}
            className="px-6 py-3 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition-colors text-sm cursor-pointer"
          >
            Back
          </Link>
          <PrimaryButton
            type="button"
            onClick={handleFormSubmit}
            loading={updateLoading}
            text=" Update Product"
            className="px-8"
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
