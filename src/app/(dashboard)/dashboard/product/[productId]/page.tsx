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
import {
  useGetSignleProductQuery,
  useUpdateProductsMutation,
} from "@/redux/api/productsManage/productSliceApi";

import { Error } from "../../rowMeterials/addRowMeterials/page";
import LoadingPage from "@/components/shared/loading/LoadingPage2";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useParams } from "next/navigation";

import { useEffect } from "react";
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

function UpdateProduct() {
  const params = useParams();
  const id = params.productId as string;

  const user = useSelector((state: RootState) => state.user.user);
  const { data: profileData, isLoading: profileLoading } =
    useGetMeProfileQuery("");
  const companyId =
    profileData?.data?.companyMember?.company?.id ||
    user?.companyMember?.company?.id;

  const { data: allRawMaterials, isLoading: rawMaterialsLoading } =
    useAllRowMaterialsQuery(companyId, { skip: !companyId });
  const rawMaterialOptions = allRawMaterials?.data ?? [];

  const { data: singleProduct, isLoading } = useGetSignleProductQuery(id);
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductsMutation();

  const { register, handleSubmit, control, reset } = useForm<FormValues>({
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

  useEffect(() => {
    if (singleProduct?.data) {
      const product = singleProduct.data;
      reset({
        productName: product.productName ?? "",
        manufacturerName: product.manufacturerName ?? "",
        rawMaterials:
          product.rawMaterials?.length > 0
            ? product.rawMaterials.map((rm: any) => ({
                rawId: rm.rawId ?? "",
                percentage: String(rm.percentage ?? ""),
              }))
            : [{ rawId: "", percentage: "" }],
        productPrice:
          product.productPrice !== undefined
            ? String(product.productPrice)
            : "",
        manualCostOverride:
          product.manualCostOverride !== undefined &&
          product.manualCostOverride !== null
            ? String(product.manualCostOverride)
            : null,
        calculatedProductCost:
          product.calculatedProductCost !== undefined
            ? String(product.calculatedProductCost)
            : "",
        communityVisibility: product.communityVisibility ?? "public",
        isActive: product.isActive ?? true,
      });
    }
  }, [singleProduct, reset]);

  const onSubmit = async (formData: FormValues) => {
    if (!companyId) return;

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
      const response = await updateProduct({ payload, id }).unwrap();
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

  if (isLoading || profileLoading) return <LoadingPage />;

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
                {/* Raw Material Dropdown — commonName displayed, id stored as rawId */}
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
          {/* <div className="mt-4 flex items-center justify-end gap-3">
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
          </div> */}
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
        </div>

        {/* Cost & Consumption Section */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-headingColor mb-4">
            Cost &amp; Consumption
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calculated Product Cost */}
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
            loading={updateLoading}
            text="Update Product"
            className="px-8"
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
