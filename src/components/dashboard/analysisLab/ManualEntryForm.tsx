
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCalculateWaterIndicesMutation } from "@/redux/api/reportAnalysisLab/reportAnalysisLab";
import { toast } from "sonner";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const parameterField = (unit: any) =>
  z.object({
    value: z
      .number({ message: "Must be a number" })
      .nonnegative("Value must be ≥ 0"),
    unit: z.string().default(unit),
  });

const waterChemistrySchema = z.object({
  parameters: z.object({
    pH: z.object({
      value: z
        .number({ message: "Must be a number" })
        .min(0, "pH must be ≥ 0")
        .max(14, "pH must be ≤ 14"),
      unit: z.string().default(""),
    }),
    Calcium: parameterField("mg/L"),
    Alkalinity: parameterField("mg/L"),
    TDS: parameterField("mg/L"),
    Temperature: z.object({
      value: z.number({ message: "Must be a number" }),
      unit: z.enum(["°C", "°F"]).default("°C"),
    }),
    Chloride: parameterField("mg/L"),
    Sulfate: parameterField("mg/L"),
    Bicarbonate: parameterField("mg/L"),
    Carbonate: parameterField("mg/L"),
  }),
});

// ─── InfoIcon ─────────────────────────────────────────────────────────────────

const InfoIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 15 15"
    fill="none"
    className="inline ml-1 align-middle cursor-pointer"
  >
    <circle cx="7.5" cy="7.5" r="7" stroke="#9ca3af" strokeWidth="1.2" />
    <text
      x="7.5" y="11"
      textAnchor="middle"
      fontSize="8"
      fill="#9ca3af"
      fontFamily="sans-serif"
      fontWeight="bold"
    >
      i
    </text>
  </svg>
);

// ─── Field Component ──────────────────────────────────────────────────────────

const Field = ({ label, unit, placeholder, name, register, error }: { label: string; unit?: string; placeholder: string; name: string; register: any; error?: any }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-900">
      {label}
      {unit && <span className="text-sm font-normal text-gray-500"> {unit} </span>}
      <InfoIcon />
    </label>
    <input
      type="number"
      step="any"
      placeholder={placeholder}
      {...register(name, { valueAsNumber: true })}
      className={`
        mt-1.5 w-full rounded-lg border bg-gray-50 px-3.5 py-3 text-sm text-gray-700
        placeholder:text-gray-400
        focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:bg-white
        transition-all duration-150
        [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
        ${error ? "border-red-400 bg-red-50" : "border-gray-200"}
      `}
    />
    {error && (
      <p className="mt-1 text-xs text-red-500">{error.message}</p>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ManualEntryForm() {
  const [tempUnit, setTempUnit] = useState("°C");

  const [calculatingWater, { isLoading }] = useCalculateWaterIndicesMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(waterChemistrySchema),
    defaultValues: {
      parameters: {
        pH: { value: undefined, unit: "" },
        Calcium: { value: undefined, unit: "mg/L" },
        Alkalinity: { value: undefined, unit: "mg/L" },
        TDS: { value: undefined, unit: "mg/L" },
        Temperature: { value: undefined, unit: "°C" },
        Chloride: { value: undefined, unit: "mg/L" },
        Sulfate: { value: undefined, unit: "mg/L" },
        Bicarbonate: { value: undefined, unit: "mg/L" },
        Carbonate: { value: undefined, unit: "mg/L" },
      },
    },
  });

  const handleTempUnitToggle = (unit: any) => {
    setTempUnit(unit);
    setValue("parameters.Temperature.unit", unit);
  };

  const onSubmit = async (data: any) => {
    console.log("Payload to backend:", JSON.stringify(data, null, 2));

    try {
      const res = await calculatingWater(data);
      toast.success("Water indices calculated successfully!");
      console.log("Response from backend:", res);
    } catch (error) {
      toast.error("Failed to calculate water indices.");
    }
  };

  const p = errors?.parameters;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold text-gray-900 mb-7">Basic Parameters</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* ── Hidden unit fields ── */}
        <input type="hidden" {...register("parameters.pH.unit")} />
        <input type="hidden" {...register("parameters.Calcium.unit")} />
        <input type="hidden" {...register("parameters.Alkalinity.unit")} />
        <input type="hidden" {...register("parameters.TDS.unit")} />
        <input type="hidden" {...register("parameters.Temperature.unit")} />
        <input type="hidden" {...register("parameters.Chloride.unit")} />
        <input type="hidden" {...register("parameters.Sulfate.unit")} />
        <input type="hidden" {...register("parameters.Bicarbonate.unit")} />
        <input type="hidden" {...register("parameters.Carbonate.unit")} />

        {/* ── Row 1: pH + Calcium ── */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <Field
            label="pH"
            placeholder="Enter ph"
            name="parameters.pH.value"
            register={register}
            error={p?.pH?.value}
          />
          <Field
            label="Calcium (Ca)"
            unit="(mg/L)"
            placeholder="Enter calcium (ca)"
            name="parameters.Calcium.value"
            register={register}
            error={p?.Calcium?.value}
          />
        </div>

        {/* ── Row 2: Alkalinity + TDS ── */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <Field
            label="Alkalinity"
            unit="(mg/L)"
            placeholder="Enter magnesium (mg)"
            name="parameters.Alkalinity.value"
            register={register}
            error={p?.Alkalinity?.value}
          />
          <Field
            label="TDS"
            unit="(mg/L)"
            placeholder="Enter sodium (na)"
            name="parameters.TDS.value"
            register={register}
            error={p?.TDS?.value}
          />
        </div>

        {/* ── Row 3: Temperature (full width + unit toggle) ── */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-900">
            Temperature (°C)
            <InfoIcon />
          </label>
          <div className="flex items-center gap-2.5 mt-1.5">
            <input
              type="number"
              step="any"
              placeholder="Enter temperature"
              {...register("parameters.Temperature.value", { valueAsNumber: true })}
              className={`
                flex-1 rounded-lg border bg-gray-50 px-3.5 py-3 text-sm text-gray-700
                placeholder:text-gray-400
                focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:bg-white
                transition-all duration-150
                [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                ${p?.Temperature?.value ? "border-red-400 bg-red-50" : "border-gray-200"}
              `}
            />
            {/* °C / °F Toggle */}
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1 shrink-0">
              {["°C", "°F"].map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => handleTempUnitToggle(unit)}
                  className={`
                    px-3.5 py-2 rounded-md text-sm font-semibold transition-all duration-150
                    ${tempUnit === unit
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                    }
                  `}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          {p?.Temperature?.value && (
            <p className="mt-1 text-xs text-red-500">{p.Temperature.value.message}</p>
          )}
        </div>

        {/* ── Row 4: Chloride + Sulfate ── */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <Field
            label="Chloride (Cl)"
            unit="(mg/L)"
            placeholder="Enter chloride (cl)"
            name="parameters.Chloride.value"
            register={register}
            error={p?.Chloride?.value}
          />
          <Field
            label="Sulfate (SO₄)"
            unit="(mg/L)"
            placeholder="Enter sulfate (so₄)"
            name="parameters.Sulfate.value"
            register={register}
            error={p?.Sulfate?.value}
          />
        </div>

        {/* ── Row 5: Bicarbonate + Carbonate ── */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          <Field
            label="Bicarbonate"
            unit="(mg/L)"
            placeholder="Enter total alkalinity"
            name="parameters.Bicarbonate.value"
            register={register}
            error={p?.Bicarbonate?.value}
          />
          <Field
            label="Carbonate"
            unit="(mg/L)"
            placeholder="Enter tds"
            name="parameters.Carbonate.value"
            register={register}
            error={p?.Carbonate?.value}
          />
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => { reset(); setTempUnit("°C"); }}
            className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white text-sm font-semibold
              hover:bg-blue-800 active:bg-blue-900 transition-colors duration-150
              disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
            `}
          >
            {isSubmitting ? "Calculating..." : "Calculate Indices"}
            {!isSubmitting && <span className="text-base">→</span>}
          </button>
        </div>

      </form>
    </div>
  );
}