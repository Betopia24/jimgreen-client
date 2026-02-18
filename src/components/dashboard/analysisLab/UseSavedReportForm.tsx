// import React from 'react'

// function UseSavedReport() {
//   return (
//     <div>UseSavedReport</div>
//   )
// }

// export default UseSavedReport



"use client";

import { useCalculateWaterIndicesMutation } from "@/redux/api/reportAnalysisLab/reportAnalysisLab";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
    report_id: string;
};

export default function UseSavedReportForm() {
    const router = useRouter();
    const [calculatingWater, { isLoading }] = useCalculateWaterIndicesMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        const payload = { report_id: data.report_id };
        console.log("Submitting payload:", payload);

        try {
            const res = await calculatingWater(payload);
            toast.success("Water indices calculated successfully!");
            console.log("Response from backend:", res);
            router.push("/dashboard/analysisLab/water-chemistry/water-chemistry-result");
        } catch (error) {
            toast.error("Failed to calculate water indices.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Report ID Field */}
                <div className="px-6 pt-5 pb-4">
                    <label
                        htmlFor="report_id"
                    // className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2"
                    >
                        Report ID
                        <span
                            title="Enter the unique report identifier"
                            className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-gray-500 text-[10px] cursor-help leading-none select-none"
                        >
                            ?
                        </span>
                    </label>

                    <input
                        id="report_id"
                        type="text"
                        placeholder="Enter id"
                        className={[
                            "w-full h-10 px-3 rounded-md text-sm text-gray-900 bg-gray-50 border outline-none transition-all",
                            "placeholder:text-gray-400",
                            "focus:bg-white focus:ring-2",
                            errors.report_id
                                ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100",
                        ].join(" ")}
                        {...register("report_id", {
                            required: "Report ID is required",
                        })}
                    />

                    {errors.report_id && (
                        <p className="mt-1.5 text-xs text-red-500">
                            {errors.report_id.message}
                        </p>
                    )}
                </div>

                {/* Dashed divider — matches screenshot */}
                <div className="mx-6" />

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2.5 ">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="h-9 px-4 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-1.5 h-9 px-4 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        {isSubmitting ? "Calculating…" : "Calculate Indices"}
                        {!isSubmitting && (
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
}