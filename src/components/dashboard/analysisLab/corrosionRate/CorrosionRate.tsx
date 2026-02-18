"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

// ─── Types ───────────────────────────────────────────────────────────────────

type MetalType = "mild_steel" | "copper";

interface ManualFormData {
  metal_type: MetalType;
  pH: number;
  Chloride: number;
  Free_Chlorine: number;
  Total_Chlorine: number;
  TTA: number;
  MBT: number;
  Copper: number;
  Calcite: number;
  AluminiumSilicate: number;
  TinSilicate: number;
  Tricalciumphosphate: number;
  Zincphosphate: number;
  do_ppm: number;
  temp_c: number;
}

interface ReportFormData {
  report_id: string;
  metal_type: MetalType;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const Tooltip = ({ text }: { text: string }) => (
  <span className="group relative inline-flex items-center ml-1">
    <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-400 text-[10px] flex items-center justify-center cursor-help select-none">
      ?
    </span>
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50 shadow-lg">
      {text}
    </span>
  </span>
);

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  tooltip?: string;
  unit?: string;
  placeholder?: string;
  error?: string;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, tooltip, unit, placeholder, error, ...rest }, ref) => (
    <div className="flex flex-col gap-1">
      <label className="flex items-center text-sm font-medium text-slate-700">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
        {unit && (
          <span className="ml-1 text-xs text-slate-400 font-normal">
            ({unit})
          </span>
        )}
      </label>
      <div className="relative">
        <input
          ref={ref}
          {...rest}
          type="number"
          step="any"
          placeholder={placeholder ?? "Enter value"}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-white outline-none transition-all
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? "border-red-400 bg-red-50" : "border-slate-200 hover:border-slate-300"}`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  ),
);
Field.displayName = "Field";

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-semibold   mb-3 mt-1">{children}</h3>
);

// ─── Manual Entry Tab ─────────────────────────────────────────────────────────

function ManualEntry({ onCancel }: { onCancel: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ManualFormData>({
    defaultValues: { metal_type: "mild_steel" },
  });

  const onSubmit = (data: ManualFormData) => {
    const payload = {
      metal_type: data.metal_type,
      parameters: {
        pH: { value: data.pH, unit: "" },
        Chloride: { value: data.Chloride, unit: "mg/L" },
        Free_Chlorine: { value: data.Free_Chlorine, unit: "ppm" },
        Total_Chlorine: { value: data.Total_Chlorine, unit: "ppm" },
        TTA: { value: data.TTA, unit: "ppm" },
        MBT: { value: data.MBT, unit: "ppm" },
        Copper: { value: data.Copper, unit: "mg/L" },
      },
      saturation_indices: {
        Calcite: data.Calcite,
        AluminiumSilicate: data.AluminiumSilicate,
        TinSilicate: data.TinSilicate,
        Tricalciumphosphate: data.Tricalciumphosphate,
        Zincphosphate: data.Zincphosphate,
      },
      do_ppm: data.do_ppm,
      temp_c: data.temp_c,
    };
    // console.log("Manual payload:", JSON.stringify(payload, null, 2));
    console.log(payload);
    // alert("Simulation started! Check console for payload.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionHeading>Manual Water Parameters</SectionHeading>
      {/* Metal Type */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center text-sm font-medium text-slate-700">
          Select Metal Type
          <span className="ml-1 text-red-500">*</span>
        </label>
        <select
          {...register("metal_type", { required: true })}
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 bg-white outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-300 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight: "36px",
          }}
        >
          <option value="mild_steel">Mild Steel</option>
          <option value="copper">Copper</option>
        </select>
      </div>

      {/* Water Parameters */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="pH"
            tooltip="Measure of acidity or alkalinity"
            placeholder="e.g. 7.8"
            error={errors.pH?.message as string}
            {...register("pH", {
              required: "pH is required",
              valueAsNumber: true,
            })}
          />
          <Field
            label="Temperature"
            unit="°C"
            tooltip="Water temperature in Celsius"
            placeholder="e.g. 30"
            error={errors.temp_c?.message as string}
            {...register("temp_c", {
              required: "Temperature is required",
              valueAsNumber: true,
            })}
          />
          <Field
            label="Chloride"
            unit="mg/L"
            tooltip="Chloride concentration"
            placeholder="e.g. 120"
            {...register("Chloride", { valueAsNumber: true })}
          />
          <Field
            label="DO"
            unit="ppm"
            tooltip="Dissolved oxygen level"
            placeholder="e.g. 5.0"
            {...register("do_ppm", { valueAsNumber: true })}
          />
          <Field
            label="Free Chlorine"
            unit="ppm"
            placeholder="e.g. 0.3"
            {...register("Free_Chlorine", { valueAsNumber: true })}
          />
          <Field
            label="Total Chlorine"
            unit="ppm"
            placeholder="e.g. 1.5"
            {...register("Total_Chlorine", { valueAsNumber: true })}
          />
          <Field
            label="TTA"
            unit="ppm"
            tooltip="Total Triazole/Azole content"
            placeholder="e.g. 2.2"
            {...register("TTA", { valueAsNumber: true })}
          />
          <Field
            label="MBT"
            unit="ppm"
            tooltip="Mercaptobenzothiazole"
            placeholder="e.g. 1.8"
            {...register("MBT", { valueAsNumber: true })}
          />
          <Field
            label="Copper"
            unit="mg/L"
            placeholder="e.g. 0.4"
            {...register("Copper", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Saturation Indices */}
      <div>
        <SectionHeading>Saturation Indices</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Calcite SI"
            tooltip="Calcite Saturation Index"
            placeholder="e.g. 0.3"
            {...register("Calcite", { valueAsNumber: true })}
          />
          <Field
            label="Aluminium Silicate SI"
            tooltip="Aluminium Silicate Saturation Index"
            placeholder="e.g. 0.2"
            {...register("AluminiumSilicate", { valueAsNumber: true })}
          />
          <Field
            label="Tin Silicate SI"
            placeholder="e.g. 0.05"
            {...register("TinSilicate", { valueAsNumber: true })}
          />
          <Field
            label="Tricalcium Phosphate SI"
            placeholder="e.g. 0.15"
            {...register("Tricalciumphosphate", { valueAsNumber: true })}
          />
          <Field
            label="Zinc Phosphate SI"
            placeholder="e.g. 0.05"
            {...register("Zincphosphate", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-60"
        >
          {isSubmitting ? "Running…" : "Run Simulation"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}

// ─── Saved Report Tab ─────────────────────────────────────────────────────────

function SavedReport({ onCancel }: { onCancel: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormData>({
    defaultValues: { metal_type: "mild_steel" },
  });

  const onSubmit = (data: ReportFormData) => {
    const payload = {
      report_id: data.report_id,
      metal_type: data.metal_type,
    };
    // console.log("Report payload:", JSON.stringify(payload, null, 2));
    console.log(payload);
    // alert("Indices calculated! Check console for payload.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Metal Type */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center text-sm font-medium text-slate-700">
          Select Metal Type
          <span className="ml-1 text-red-500">*</span>
        </label>
        <select
          {...register("metal_type", { required: true })}
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 bg-white outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-300 appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight: "36px",
          }}
        >
          <option value="mild_steel">Mild Steel</option>
          <option value="copper">Copper</option>
        </select>
      </div>

      {/* Report ID */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center text-sm font-medium text-slate-700">
          Report ID
          <Tooltip text="Unique water quality report identifier (e.g. WQR-20260114-45D4)" />
          <span className="ml-1 text-red-500">*</span>
        </label>
        <input
          {...register("report_id", { required: "Report ID is required" })}
          type="text"
          placeholder="e.g. WQR-20260114-45D4"
          className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-white outline-none transition-all
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${errors.report_id ? "border-red-400 bg-red-50" : "border-slate-200 hover:border-slate-300"}`}
        />
        {errors.report_id && (
          <p className="text-xs text-red-500">{errors.report_id.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-60"
        >
          {isSubmitting ? "Calculating…" : "Calculate Indices"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Tab = "manual" | "report";

export default function CorrosionRatePrediction() {
  const [activeTab, setActiveTab] = useState<Tab>("manual");

  const handleCancel = () => {
    console.log("Cancelled");
  };

  return (
    <div className="mt-10">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Corrosion Rate Prediction
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Test multiple operating conditions across pH, temperature, and
            cycles of concentration
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Tab Bar */}
          <div className="flex border-b border-slate-100">
            {(
              [
                { key: "manual", label: "Manual Entry" },
                { key: "report", label: "Use Saved Report" },
              ] as { key: Tab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3.5 text-sm font-semibold cursor-pointer transition-all relative ${
                  activeTab === tab.key
                    ? "text-white bg-primaryColor"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-5 sm:p-6">
            {activeTab === "manual" ? (
              <ManualEntry onCancel={handleCancel} />
            ) : (
              <SavedReport onCancel={handleCancel} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
