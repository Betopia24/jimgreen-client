"use client";

import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import SectionCard from "./SectionCard";
import FormField from "./FormField";
import StyledInput from "./StyledInput";
import RenderRangeSection from "./RenderRangeSection";
import RenderGridResolution from "./RenderGridResolution";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ManualFormValues {
  pH: string;
  Calcium: string;
  Magnesium: string;
  Sodium: string;
  Potassium: string;
  Chloride: string;
  Sulfate: string;
  Alkalinity: string;
  Temperature: string;
  ph_range_min: string;
  ph_range_max: string;
  coc_range_min: string;
  coc_range_max: string;
  temp_range_min: string;
  temp_range_max: string;
  grid_resolution: number;
}

export interface SavedReportFormValues {
  report_id: string;
  ph_range_min: string;
  ph_range_max: string;
  coc_range_min: string;
  coc_range_max: string;
  temp_range_min: string;
  temp_range_max: string;
  grid_resolution: number;
}

type TabType = "manual" | "saved";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// ─── Sub-components ───────────────────────────────────────────────────────────

// ─── Resolution Slider ────────────────────────────────────────────────────────

// interface ResolutionSliderProps {
//   value: number;
//   onChange: (v: number) => void;
// }

// const ResolutionSlider: React.FC<ResolutionSliderProps> = ({
//   value,
//   onChange,
// }) => {
//   const label = resolutionLabels[value] ?? "Medium Resolution";
//   const color = resolutionColors[value] ?? "#F59E0B";

//   return (
//     <div className="space-y-3">
//       <div className="flex items-center justify-between">
//         <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
//           Simulation Precision
//         </span>
//         <span
//           className="text-xs font-bold px-2 py-0.5 rounded-full"
//           style={{ color, backgroundColor: `${color}18` }}
//         >
//           {label}
//         </span>
//       </div>

//       <div className="relative pt-1">
//         <input
//           type="range"
//           min={1}
//           max={5}
//           step={1}
//           value={value}
//           onChange={(e) => onChange(Number(e.target.value))}
//           className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
//           style={{
//             background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - 1) / 4) * 100}%, #E2E8F0 ${((value - 1) / 4) * 100}%, #E2E8F0 100%)`,
//           }}
//         />
//         <style>{`
//           input[type=range]::-webkit-slider-thumb {
//             -webkit-appearance: none;
//             width: 18px;
//             height: 18px;
//             border-radius: 50%;
//             background: white;
//             border: 2.5px solid ${color};
//             box-shadow: 0 1px 6px rgba(0,0,0,0.15);
//             cursor: pointer;
//             transition: transform 0.1s, box-shadow 0.1s;
//           }
//           input[type=range]::-webkit-slider-thumb:hover {
//             transform: scale(1.2);
//             box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//           }
//           input[type=range]:focus { outline: none; }
//         `}</style>

//         <div className="flex justify-between mt-2 px-0.5">
//           {["Low", "", "Medium", "", "High"].map((tick, i) => (
//             <span
//               key={i}
//               className={`text-[10px] font-medium ${i + 1 === value ? "text-slate-700" : "text-slate-300"}`}
//             >
//               {tick || "·"}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-100 rounded-lg">
//         <span className="text-amber-500 mt-0.5 shrink-0">
//           <svg
//             width="13"
//             height="13"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="12" r="10" />
//             <line x1="12" y1="8" x2="12" y2="12" />
//             <line x1="12" y1="16" x2="12.01" y2="16" />
//           </svg>
//         </span>
//         <p className="text-[11px] text-amber-700 leading-relaxed">
//           Higher resolution increases simulation accuracy but requires longer
//           processing time. <strong>Medium resolution</strong> is recommended for
//           most analyses.
//         </p>
//       </div>
//     </div>
//   );
// };

// ─── Range Pair ───────────────────────────────────────────────────────────────

// ─── Section Card ─────────────────────────────────────────────────────────────

// const SectionCard: React.FC<{
//   title: string;
//   children: React.ReactNode;
//   className?: string;
// }> = ({ title, children, className = "" }) => (
//   <div
//     className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden ${className}`}
//   >
//     <div className="px-5 py-4 border-b border-slate-50">
//       <h3 className="text-base font-bold text-slate-800 tracking-tight">
//         {title}
//       </h3>
//     </div>
//     <div className="p-5">{children}</div>
//   </div>
// );

// ─── Main Component ───────────────────────────────────────────────────────────

const BatchSaturationModeling: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("manual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<object | null>(null);

  // ── Manual form
  const manualForm = useForm<ManualFormValues>({
    defaultValues: {
      pH: "",
      Calcium: "",
      Magnesium: "",
      Sodium: "",
      Potassium: "",
      Chloride: "",
      Sulfate: "",
      Alkalinity: "",
      Temperature: "",
      ph_range_min: "6.5",
      ph_range_max: "8.5",
      coc_range_min: "2.0",
      coc_range_max: "6.0",
      temp_range_min: "27",
      temp_range_max: "100",
      grid_resolution: 3,
    },
  });

  // ── Saved report form
  const savedForm = useForm<SavedReportFormValues>({
    defaultValues: {
      report_id: "",
      ph_range_min: "6.5",
      ph_range_max: "8.5",
      coc_range_min: "2.0",
      coc_range_max: "6.0",
      temp_range_min: "27",
      temp_range_max: "100",
      grid_resolution: 3,
    },
  });

  // ── Payload builders
  const buildManualPayload = useCallback(
    (data: ManualFormValues) => ({
      base_water_parameters: {
        pH: { value: parseFloat(data.pH), unit: "" },
        Calcium: { value: parseFloat(data.Calcium), unit: "mg/L" },
        Magnesium: { value: parseFloat(data.Magnesium), unit: "mg/L" },
        Sodium: { value: parseFloat(data.Sodium), unit: "mg/L" },
        Potassium: { value: parseFloat(data.Potassium), unit: "mg/L" },
        Chloride: { value: parseFloat(data.Chloride), unit: "mg/L" },
        Sulfate: { value: parseFloat(data.Sulfate), unit: "mg/L" },
        Alkalinity: { value: parseFloat(data.Alkalinity), unit: "mg/L" },
        Temperature: { value: parseFloat(data.Temperature), unit: "°C" },
      },
      ph_range_min: parseFloat(data.ph_range_min),
      ph_range_max: parseFloat(data.ph_range_max),
      coc_range_min: parseFloat(data.coc_range_min),
      coc_range_max: parseFloat(data.coc_range_max),
      temp_range_min: parseFloat(data.temp_range_min),
      temp_range_max: parseFloat(data.temp_range_max),
      grid_resolution: data.grid_resolution,
    }),
    [],
  );

  const buildSavedPayload = useCallback(
    (data: SavedReportFormValues) => ({
      report_id: data.report_id,
      ph_range_min: parseFloat(data.ph_range_min),
      ph_range_max: parseFloat(data.ph_range_max),
      coc_range_min: parseFloat(data.coc_range_min),
      coc_range_max: parseFloat(data.coc_range_max),
      temp_range_min: parseFloat(data.temp_range_min),
      temp_range_max: parseFloat(data.temp_range_max),
      grid_resolution: data.grid_resolution,
    }),
    [],
  );

  const handleManualSubmit = manualForm.handleSubmit(async (data) => {
    console.log(data);
    // const payload = {
    //   base_water_parameters: {
    //     pH: { value: parseFloat(data.pH), unit: "" },
    //     Calcium: { value: parseFloat(data.Calcium), unit: "mg/L" },
    //     Magnesium: { value: parseFloat(data.Magnesium), unit: "mg/L" },
    //     Sodium: { value: parseFloat(data.Sodium), unit: "mg/L" },
    //     Potassium: { value: parseFloat(data.Potassium), unit: "mg/L" },
    //     Chloride: { value: parseFloat(data.Chloride), unit: "mg/L" },
    //     Sulfate: { value: parseFloat(data.Sulfate), unit: "mg/L" },
    //     Alkalinity: { value: parseFloat(data.Alkalinity), unit: "mg/L" },
    //     Temperature: { value: parseFloat(data.Temperature), unit: "°C" },
    //   },
    //   ph_range_min: parseFloat(data.ph_range_min),
    //   ph_range_max: parseFloat(data.ph_range_max),
    //   coc_range_min: parseFloat(data.coc_range_min),
    //   coc_range_max: parseFloat(data.coc_range_max),
    //   temp_range_min: parseFloat(data.temp_range_min),
    //   temp_range_max: parseFloat(data.temp_range_max),
    //   grid_resolution: data.grid_resolution,
    // }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(buildManualPayload(data));
    console.log(submitted);
    setIsSubmitting(false);
  });

  const handleSavedSubmit = savedForm.handleSubmit(async (data) => {
    console.log(data);
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(buildSavedPayload(data));
    console.log(submitted);
    setIsSubmitting(false);
  });

  const handleCancel = () => {
    manualForm.reset();
    savedForm.reset();
    setSubmitted(null);
  };

  // ── Shared range section renderer

  return (
    <div className="mt-10">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-100/30 blur-3xl" />
      </div>

      <div className="relative ">
        {/* ── Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Batch Saturation Modeling
            </h1>
          </div>
          <p className="text-sm text-slate-500 ">
            Test multiple operating conditions across pH, temperature, and
            cycles of concentration
          </p>
        </div>

        {/* ── Tab Switcher */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-1.5 mb-5 flex gap-1">
          {(["manual", "saved"] as TabType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setSubmitted(null);
              }}
              className={`
                flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-[1.01]"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }
              `}
            >
              {tab === "manual" ? "✦ Manual Entry" : "⬡ Use Saved Report"}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════
            TAB 1 — Manual Entry
        ══════════════════════════════════════ */}
        {activeTab === "manual" && (
          <form onSubmit={handleManualSubmit} className="space-y-5">
            {/* Water Parameters */}
            <SectionCard title="Manual Water Parameters">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="pH"
                  tooltip="Power of Hydrogen (0–14)"
                  placeholder="7.5"
                  error={manualForm.formState.errors.pH?.message}
                >
                  <Controller
                    name="pH"
                    control={manualForm.control}
                    rules={{
                      required: "pH is required",
                      min: { value: 0, message: "Min 0" },
                      max: { value: 14, message: "Max 14" },
                    }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        type="number"
                        step="0.1"
                        placeholder="Enter pH"
                        hasError={!!manualForm.formState.errors.pH}
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Calcium"
                  unit="mg/L"
                  tooltip="Ca²⁺ concentration"
                  placeholder="100"
                  error={manualForm.formState.errors.Calcium?.message}
                >
                  <Controller
                    name="Calcium"
                    control={manualForm.control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        type="number"
                        placeholder="Enter calcium (Ca)"
                        hasError={!!manualForm.formState.errors.Calcium}
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Magnesium"
                  unit="mg/L"
                  tooltip="Mg²⁺ concentration"
                  placeholder="50"
                  error={manualForm.formState.errors.Magnesium?.message}
                >
                  <Controller
                    name="Magnesium"
                    control={manualForm.control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        type="number"
                        placeholder="Enter magnesium (mg)"
                        hasError={!!manualForm.formState.errors.Magnesium}
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Sodium"
                  unit="mg/L"
                  tooltip="Na⁺ concentration"
                  placeholder="80"
                  error={manualForm.formState.errors.Sodium?.message}
                >
                  <Controller
                    name="Sodium"
                    control={manualForm.control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        type="number"
                        placeholder="Enter sodium (Na)"
                        hasError={!!manualForm.formState.errors.Sodium}
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Potassium"
                  unit="mg/L"
                  tooltip="K⁺ concentration"
                  placeholder="10"
                  error={manualForm.formState.errors.Potassium?.message}
                >
                  <Controller
                    name="Potassium"
                    control={manualForm.control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        type="number"
                        placeholder="Enter chloride (cl)"
                        hasError={!!manualForm.formState.errors.Potassium}
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Sulfate (SO₄)"
                  unit="mg/L"
                  tooltip="SO₄²⁻ concentration"
                  placeholder="80"
                  error={manualForm.formState.errors.Sulfate?.message}
                >
                  <Controller
                    name="Sulfate"
                    control={manualForm.control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        type="number"
                        placeholder="Enter sulfate (so₄)"
                        hasError={!!manualForm.formState.errors.Sulfate}
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Chloride (Cl)"
                  unit="mg/L"
                  tooltip="Cl⁻ concentration"
                  placeholder="120"
                  error={manualForm.formState.errors.Chloride?.message}
                >
                  <Controller
                    name="Chloride"
                    control={manualForm.control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        type="number"
                        placeholder="Enter chloride (cl)"
                        hasError={!!manualForm.formState.errors.Chloride}
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Alkalinity"
                  unit="mg/L"
                  tooltip="Total alkalinity as CaCO₃"
                  placeholder="150"
                  error={manualForm.formState.errors.Alkalinity?.message}
                >
                  <Controller
                    name="Alkalinity"
                    control={manualForm.control}
                    rules={{ required: "Required" }}
                    render={({ field }) => (
                      <StyledInput
                        {...field}
                        type="number"
                        placeholder="Enter sulfate (so₄)"
                        hasError={!!manualForm.formState.errors.Alkalinity}
                      />
                    )}
                  />
                </FormField>

                <div className="sm:col-span-2">
                  <FormField
                    label="Temperature"
                    unit="°C"
                    tooltip="Water temperature"
                    placeholder="25"
                    error={manualForm.formState.errors.Temperature?.message}
                  >
                    <Controller
                      name="Temperature"
                      control={manualForm.control}
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          type="number"
                          placeholder="Enter total alkalinity"
                          hasError={!!manualForm.formState.errors.Temperature}
                        />
                      )}
                    />
                  </FormField>
                </div>
              </div>
            </SectionCard>

            {RenderRangeSection(
              manualForm.control,
              manualForm.formState.errors,
            )}
            {RenderGridResolution(manualForm.control)}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 sm:flex-none sm:px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className=" py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeOpacity="0.3"
                        strokeWidth="3"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Running…
                  </>
                ) : (
                  <>
                    Run Simulation
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ══════════════════════════════════════
            TAB 2 — Use Saved Report
        ══════════════════════════════════════ */}
        {activeTab === "saved" && (
          <form onSubmit={handleSavedSubmit} className="space-y-5">
            {/* Report ID */}
            <SectionCard title="Report Reference">
              <FormField
                label="Report ID"
                tooltip="Unique identifier from a previous water quality report"
                placeholder="WQR-20240115-A3F2"
                error={savedForm.formState.errors.report_id?.message}
              >
                <Controller
                  name="report_id"
                  control={savedForm.control}
                  rules={{ required: "Report ID is required" }}
                  render={({ field }) => (
                    <StyledInput
                      {...field}
                      type="text"
                      placeholder="Enter id"
                      hasError={!!savedForm.formState.errors.report_id}
                      className="font-mono tracking-wide"
                    />
                  )}
                />
              </FormField>
            </SectionCard>

            {RenderRangeSection(savedForm.control, savedForm.formState.errors)}
            {RenderGridResolution(savedForm.control)}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 sm:flex-none sm:px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeOpacity="0.3"
                        strokeWidth="3"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Running…
                  </>
                ) : (
                  <>
                    Run Simulation
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BatchSaturationModeling;
