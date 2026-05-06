"use client";

import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useAnalyzeReportMutation,
  useGetCoustomerAndAsetListQuery,
  useGetCoustomerListQuery,
  useRecalculateReportAnalysisMutation,
} from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
import { UserProfile } from "@/interfaces/global";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { setAnalysisAllDetailsData } from "@/redux/features/analysisDataSaveSlice/analysisDataSaveSlice";
import { Loader2 } from "lucide-react";
import { useGetMeProfileQuery } from "@/redux/api/getMe/getMeApi";
import { User } from "@/app/(dashboard)/dashboard/rowMeterials/addRowMeterials/page";

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
  assetId: string;
  sampleLocation?: string;
  sampleDate?: string;
  name?: string;
  filename?: string;
  [key: string]: number | string | undefined;
}

interface Asset {
  id: string;
  name: string;
  type: string;
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
  assets?: Asset[];
}

/* ===========================
   COMPONENT
=========================== */

export default function WaterChemistryForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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
      assetId: "",
      sampleLocation: "",
      sampleDate: "",
      filename: "",
      name: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ===========================
     REDUX DATA
  =========================== */

  const analysisData = useSelector((state: any) => state.analysis.analysisData);
  const aiParameters = analysisData?.data?.parameters ?? [];
  const { data: userData } = useGetMeProfileQuery("");
  const profile = userData?.data as User;

  const company: UserProfile | null = useSelector(
    (state: RootState) => state.user.user,
  );

  const companyId =
    profile?.companyMember?.company.id || company?.companyMember?.company?.id;

  const { data: customerData } = useGetCoustomerAndAsetListQuery(
    companyId as string,
    { skip: !companyId },
  );

  console.log(company);

  // Customers list from coustomerAndAset API
  const customers: Customer[] = customerData?.data?.customers ?? [];

  // Watch selected customer to derive assets
  const selectedCustomerId = watch("customerId");
  const selectedAssetId = watch("assetId");

  const availableAssets: Asset[] = useMemo(() => {
    if (!selectedCustomerId) return [];
    const found = customers.find((c) => c.id === selectedCustomerId);
    return found?.assets ?? [];
  }, [selectedCustomerId, customers]);

  // Reset assetId when customer changes
  useEffect(() => {
    setValue("assetId", "");
  }, [selectedCustomerId, setValue]);

  const [analyzePost, { isLoading }] = useAnalyzeReportMutation();
  const [ReCulanalyzePost, { isLoading: ReCulLoading }] =
    useRecalculateReportAnalysisMutation();

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

  const onSubmit = async (formData: WaterChemistryFormData) => {
    setIsSubmitting(true);
    console.log(formData);

    try {
      // const parameters: WaterParameter[] = Object.entries(formData)
      //   .filter(([key, value]) => {
      //     if (
      //       [
      //         "customerId",
      //         "assetId",
      //         "sampleLocation",
      //         "sampleDate",
      //         "filename",
      //         "name",
      //       ].includes(key)
      //     )
      //       return false;
      //     if (value === undefined || value === null || value === "")
      //       return false;
      //     return true;
      //   })
      //   .map(([key, value]) => {
      //     const param = availableParameters.find((p: any) => p.name === key);
      //     return {
      //       name: displayNameMapping[key] || key,
      //       value: Number(value),
      //       unit: param?.unit || "",
      //       detection_limit: param?.detectionLimit ?? null,
      //     };
      //   });
      const parameters: WaterParameter[] = Object.entries(formData)
        .filter(([key, value]) => {
          // ❌ exclude non-parameter fields
          if (
            [
              "customerId",
              "assetId",
              "sampleLocation",
              "sampleDate",
              "filename",
              "name", // ✅ IMPORTANT FIX
            ].includes(key)
          )
            return false;

          // ❌ remove empty values
          if (value === undefined || value === null || value === "")
            return false;

          // ❌ remove NaN
          if (typeof value === "number" && isNaN(value)) return false;

          return true;
        })
        .map(([key, value]) => {
          const param = availableParameters.find((p: any) => p.name === key);

          return {
            name: displayNameMapping[key] || key,
            value: Number(value) || 0,
            unit: param?.unit || "",
            detection_limit: param?.detectionLimit ?? null,
          };
        });

      if (id) {
        // Recalculate flow — payload stays the same
        // const payload = {
        //   reportId: id,
        //   adjustedParameters: parameters,
        // };
        const payload = {
          reportId: id,
          name: formData.name, // ✅ add this
          adjustedParameters: parameters,
        };
        const response = await ReCulanalyzePost(payload).unwrap();
        if (response?.success) {
          toast.success(response.message);
          dispatch(setAnalysisAllDetailsData(response?.data));
          router.push("/dashboard/analysisInput/analysis-all-details");
          reset();
        }
      } else {
        // New analysis — updated payload shape
        const payload: Record<string, any> = {
          assetId: formData.assetId,
          name: formData.name,
          filename: analysisData.data.filename,
          parameters,
        };

        if (formData.sampleLocation?.trim()) {
          payload.sampleLocation = formData.sampleLocation.trim();
        }
        if (formData.sampleDate?.trim()) {
          payload.sampleDate = formData.sampleDate.trim();
        }
        if (formData.filename?.trim()) {
          payload.filename = formData.filename.trim();
        }

        const response = await analyzePost(payload).unwrap();
        if (response?.success) {
          toast.success(response.message);
          dispatch(setAnalysisAllDetailsData(response?.data));
          router.push("/dashboard/analysisInput/analysis-all-details");
          reset();
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  /* ===========================
     UI
  =========================== */

  return (
    <div className="mt-10 relative">
      {(isLoading || ReCulLoading) && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/02 backdrop-blur-xs z-50">
          <Loader2 className="animate-spin w-10 h-10 text-[#0058DD]" />
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-10">
        <h1 className="text-2xl font-semibold mb-8">
          Water Chemistry Parameters
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* name  */}
          <div className="grid grid-cols-1  gap-6 max-w-4xl">
            <div>
              <label className="block mb-2 font-medium text-sm">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>
          {/* ── Customer + Asset selects ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {/* Customer */}
            <div>
              <label className="block mb-2 font-medium">
                Select Customer *
              </label>
              <select
                {...register("customerId", {
                  required: "Customer is required",
                })}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">-- Select Customer --</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} — {customer.siteName}
                  </option>
                ))}
              </select>
              {errors.customerId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerId.message}
                </p>
              )}
            </div>

            {/* Asset — only shown once a customer is chosen */}
            {selectedCustomerId && (
              <div>
                <label className="block mb-2 font-medium">Select Asset *</label>
                <select
                  {...register("assetId", { required: "Asset is required" })}
                  className="w-full border rounded-lg px-4 py-2"
                  disabled={availableAssets.length === 0}
                >
                  <option value="">-- Select Asset --</option>
                  {availableAssets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} ({asset.type})
                    </option>
                  ))}
                </select>
                {availableAssets.length === 0 && (
                  <p className="text-gray-400 text-sm mt-1">
                    No assets for this customer.
                  </p>
                )}
                {errors.assetId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assetId.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ── Optional fields ── */}
          <div className="grid grid-cols-1  gap-6 max-w-4xl">
            {/* <div>
              <label className="block mb-2 font-medium text-sm">
                Sample Location{" "}
                <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                {...register("sampleLocation")}
                placeholder="e.g. Lab One, New York"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm">
                Sample Date <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="date"
                {...register("sampleDate")}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div> */}

            <div>
              <label className="block mb-2 font-medium text-sm">Filename</label>
              <input
                type="text"
                {...register("filename")}
                value={analysisData.data.filename}
                className="w-full border rounded-lg px-4 py-2"
                readOnly
              />
            </div>
          </div>

          {/* ── Parameters grid ── */}
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
                  step="0.001"
                  {...register(param.name, { valueAsNumber: true })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            ))}
          </div>

          {/* ── Buttons ── */}
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
              disabled={isLoading || !watch("assetId")}
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
