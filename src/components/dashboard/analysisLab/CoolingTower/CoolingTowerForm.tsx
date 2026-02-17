"use client";

import React from "react";
import { useForm } from "react-hook-form";

interface CoolingTowerFormData {
  recirculation_rate_gpm: number;
  hot_water_temp_f: number;
  cold_water_temp_f: number;
  wet_bulb_temp_f: number;
  coc: number;
  drift_percent: number;
  evaporation_factor_percent: number;
}

const DEMO_PAYLOAD: CoolingTowerFormData = {
  recirculation_rate_gpm: 10000,
  hot_water_temp_f: 95,
  cold_water_temp_f: 85,
  wet_bulb_temp_f: 78,
  coc: 4.0,
  drift_percent: 0.1,
  evaporation_factor_percent: 85.0,
};

interface TooltipProps {
  text: string;
}

const InfoTooltip: React.FC<TooltipProps> = ({ text }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <span className="relative inline-flex items-center ml-1">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-300 text-gray-600 text-[10px] font-bold hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="More information"
      >
        ?
      </button>
      {visible && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-52 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none">
          {text}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
        </div>
      )}
    </span>
  );
};

interface FormFieldProps {
  label: string;
  tooltip: string;
  placeholder: string;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  tooltip,
  placeholder: _,
  error,
  children,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center text-sm font-medium text-gray-700">
      {label}
      <InfoTooltip text={tooltip} />
    </label>
    {children}
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
);

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-400 bg-gray-50 transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    hasError
      ? "border-red-400 ring-1 ring-red-300"
      : "border-gray-200 hover:border-gray-300"
  }`;

const CoolingTowerAnalysis: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CoolingTowerFormData>({
    defaultValues: DEMO_PAYLOAD,
    mode: "onBlur",
  });

  const onSubmit = async (data: CoolingTowerFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Payload:", JSON.stringify(data, null, 2));
    alert(`Analysis triggered!\n\nPayload:\n${JSON.stringify(data, null, 2)}`);
  };

  const handleCancel = () => {
    reset(DEMO_PAYLOAD);
  };

  return (
    <div className="mt-10">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Cooling Tower Performance Analysis
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Evaluate system efficiency, heat load, evaporation, and blowdown
            rates
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Section 1: Operational Data */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Operational Data
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {/* Recirculation Rate */}
              <FormField
                label="Recirculation Rate (GPM)"
                tooltip="Volume of water circulated through the cooling tower per minute, measured in gallons per minute (GPM)."
                placeholder="e.g. 10000"
                error={errors.recirculation_rate_gpm?.message}
              >
                <input
                  type="number"
                  step="any"
                  placeholder="Enter recirculation rate"
                  className={inputClass(!!errors.recirculation_rate_gpm)}
                  {...register("recirculation_rate_gpm", {
                    required: "Recirculation rate is required",
                    min: { value: 1, message: "Must be greater than 0" },
                    valueAsNumber: true,
                  })}
                />
              </FormField>

              {/* Hot Water Temperature */}
              <FormField
                label="Hot Water Temperature (°F)"
                tooltip="Temperature of water entering the cooling tower from the heat source, in degrees Fahrenheit."
                placeholder="e.g. 95"
                error={errors.hot_water_temp_f?.message}
              >
                <input
                  type="number"
                  step="any"
                  placeholder="Enter hot water temperature"
                  className={inputClass(!!errors.hot_water_temp_f)}
                  {...register("hot_water_temp_f", {
                    required: "Hot water temperature is required",
                    min: { value: 32, message: "Must be ≥ 32°F" },
                    max: { value: 220, message: "Must be ≤ 220°F" },
                    valueAsNumber: true,
                  })}
                />
              </FormField>

              {/* Cold Water Temperature */}
              <FormField
                label="Cold Water Temperature (°F)"
                tooltip="Temperature of cooled water leaving the cooling tower basin, in degrees Fahrenheit."
                placeholder="e.g. 85"
                error={errors.cold_water_temp_f?.message}
              >
                <input
                  type="number"
                  step="any"
                  placeholder="Enter cold water temperature"
                  className={inputClass(!!errors.cold_water_temp_f)}
                  {...register("cold_water_temp_f", {
                    required: "Cold water temperature is required",
                    min: { value: 32, message: "Must be ≥ 32°F" },
                    max: { value: 220, message: "Must be ≤ 220°F" },
                    valueAsNumber: true,
                  })}
                />
              </FormField>

              {/* Wet Bulb Temperature */}
              <FormField
                label="Wet Bulb Temperature (°F)"
                tooltip="Ambient wet-bulb temperature, the theoretical lower limit of cooling achievable by the tower, in degrees Fahrenheit."
                placeholder="e.g. 78"
                error={errors.wet_bulb_temp_f?.message}
              >
                <input
                  type="number"
                  step="any"
                  placeholder="Enter wet bulb temperature"
                  className={inputClass(!!errors.wet_bulb_temp_f)}
                  {...register("wet_bulb_temp_f", {
                    required: "Wet bulb temperature is required",
                    min: { value: -40, message: "Must be ≥ -40°F" },
                    max: { value: 120, message: "Must be ≤ 120°F" },
                    valueAsNumber: true,
                  })}
                />
              </FormField>
            </div>
          </div>

          {/* Section 2: System Efficiency */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              System Efficiency
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {/* Cycles of Concentration */}
              <FormField
                label="Cycles of Concentration (CoC)"
                tooltip="Ratio of dissolved solids in circulating water vs. makeup water. Higher CoC means less water consumption but higher scaling risk."
                placeholder="e.g. 4.0"
                error={errors.coc?.message}
              >
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter cycles of concentration"
                  className={inputClass(!!errors.coc)}
                  {...register("coc", {
                    required: "CoC is required",
                    min: { value: 1, message: "Must be ≥ 1" },
                    max: { value: 20, message: "Must be ≤ 20" },
                    valueAsNumber: true,
                  })}
                />
              </FormField>

              {/* Drift % */}
              <FormField
                label="Drift (%)"
                tooltip="Percentage of circulating water lost as unevaporated droplets carried away by air. Typical range: 0.001%–0.2%."
                placeholder="e.g. 0.1"
                error={errors.drift_percent?.message}
              >
                <input
                  type="number"
                  step="0.001"
                  placeholder="Enter drift percentage"
                  className={inputClass(!!errors.drift_percent)}
                  {...register("drift_percent", {
                    required: "Drift % is required",
                    min: { value: 0, message: "Must be ≥ 0" },
                    max: { value: 5, message: "Must be ≤ 5%" },
                    valueAsNumber: true,
                  })}
                />
              </FormField>

              {/* Evaporation Factor */}
              <div className="sm:col-span-2">
                <FormField
                  label="Evaporation Factor (%)"
                  tooltip="Percentage of heat removed via evaporation relative to total heat rejection. Typically 70–90% for standard cooling towers."
                  placeholder="e.g. 85.0"
                  error={errors.evaporation_factor_percent?.message}
                >
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Enter evaporation factor"
                    className={inputClass(!!errors.evaporation_factor_percent)}
                    {...register("evaporation_factor_percent", {
                      required: "Evaporation factor is required",
                      min: { value: 0, message: "Must be ≥ 0%" },
                      max: { value: 100, message: "Must be ≤ 100%" },
                      valueAsNumber: true,
                    })}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Running...
                </>
              ) : (
                <>
                  Run Cooling Analysis
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoolingTowerAnalysis;
