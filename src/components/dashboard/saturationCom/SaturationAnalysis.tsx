"use client";

import { useSaturatonAnalysisMutation } from "@/redux/api/reportAnalysis/reportAnalysisSliceApi";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

// ─── Type Definitions ────────────────────────────────────────────────────────

interface RootState {
  user: { user: UserProfile | null };
}

interface UserProfile {
  companyMember?: {
    company?: { id: string };
  };
}

interface WaterReport {
  id: string;
  aiReportId: string;
  sampleDate: string | null;
  sampleLocation: string | null;
  originalFilename: string;
  assetId: string;
  customerId: string;
}

interface Asset {
  id: string;
  name: string;
  type: string;
  towerType: string | null;
  systemVolume: number | null;
  systemMetallurgy: string[];
  systemMaterials: string[];
  recirculationRate: number | null;
  waterReports: WaterReport[];
}

interface Customer {
  id: string;
  name: string;
  siteName: string;
  location: string;
  assets: Asset[];
}

interface CustomerDataResponse {
  data: { customers: Customer[] };
}

// ─── Mock Hooks (replace with real RTK Query hooks) ──────────────────────────

function useGetCoustomerAndAsetListQuery(
  companyId: string,
  options?: { skip?: boolean },
): { data: CustomerDataResponse | undefined } {
  if (options?.skip) return { data: undefined };
  // Mock response using the provided JSON
  const data: CustomerDataResponse = {
    data: {
      customers: [
        {
          id: "6995988c146e0ba25d7dd838",
          name: "Enter ph",
          siteName: "site1",
          location: "Biocide",
          assets: [
            {
              id: "69ae604d6368a2929f637fc4",
              name: "Neil Whitfield",
              type: "Cooling Tower",
              towerType: "Crossflow",
              systemVolume: 1,
              systemMetallurgy: ["Admiralty Brass", "70/30 Copper Nickel"],
              systemMaterials: ["Concrete Basin / Construction"],
              recirculationRate: 66,
              waterReports: [],
            },
            {
              id: "69ae608d6368a2929f637fc5",
              name: "Ciaran Higgins",
              type: "Evaporative Condenser",
              towerType: "Crossflow",
              systemVolume: 31,
              systemMetallurgy: ["Admiralty Brass", "70/30 Copper Nickel"],
              systemMaterials: ["Concrete Basin / Construction"],
              recirculationRate: 94,
              waterReports: [],
            },
          ],
        },
        {
          id: "69959f2c146e0ba25d7dd83d",
          name: "Aquila Corp",
          siteName: "site2",
          location: "Biocide",
          assets: [
            {
              id: "69ae650f6368a2929f637fc8",
              name: "Aquila Waters",
              type: "Cooling Tower",
              towerType: "Crossflow",
              systemVolume: 52,
              systemMetallurgy: ["Galvanized Steel"],
              systemMaterials: ["Concrete Basin / Construction"],
              recirculationRate: 45,
              waterReports: [
                {
                  id: "69c8cacca74f3e4123c4be30",
                  aiReportId: "WQR-20260329-BB09",
                  sampleDate: null,
                  sampleLocation: null,
                  originalFilename:
                    "Drinking_Water_Analysis_Report_V3_Extended 1.pdf",
                  assetId: "69ae650f6368a2929f637fc8",
                  customerId: "69959f2c146e0ba25d7dd83d",
                },
              ],
            },
            {
              id: "69ae69ab6368a2929f637fcc",
              name: "Quemby Dickerson",
              type: "Cooling Tower",
              towerType: "Induced Draft",
              systemVolume: 61,
              systemMetallurgy: ["Copper", "Duplex Stainless"],
              systemMaterials: ["Concrete Basin / Construction"],
              recirculationRate: 89,
              waterReports: [
                {
                  id: "69c8d058a74f3e4123c4be31",
                  aiReportId: "WQR-20260329-5A85",
                  sampleDate: null,
                  sampleLocation: null,
                  originalFilename:
                    "Drinking_Water_Analysis_Report_V3_Extended 1.pdf",
                  assetId: "69ae69ab6368a2929f637fcc",
                  customerId: "69959f2c146e0ba25d7dd83d",
                },
                {
                  id: "69c8ca33a74f3e4123c4be2f",
                  aiReportId: "WQR-20260329-C66D",
                  sampleDate: null,
                  sampleLocation: null,
                  originalFilename:
                    "Drinking_Water_Analysis_Report_V3_Extended 1.pdf",
                  assetId: "69ae69ab6368a2929f637fcc",
                  customerId: "69959f2c146e0ba25d7dd83d",
                },
              ],
            },
          ],
        },
        {
          id: "69ae7b1e6368a2929f637fcd",
          name: "Rogan Richards",
          siteName: "site3",
          location: "Culpa eum molestiae",
          assets: [
            {
              id: "69ae83289b5acd2d63faa6a9",
              name: "Bianca Morrow",
              type: "Once-Through Cooling",
              towerType: "Forced Draft",
              systemVolume: 300000,
              systemMetallurgy: [
                "Copper",
                "Admiralty Brass",
                "90/10 Copper/Nickel",
              ],
              systemMaterials: ["Concrete Lined Pipe"],
              recirculationRate: 45000,
              waterReports: [
                {
                  id: "69c8f3c2a74f3e4123c4be32",
                  aiReportId: "WQR-20260329-9A6E",
                  sampleDate: null,
                  sampleLocation: null,
                  originalFilename:
                    "Drinking_Water_Analysis_Report_V3_Extended 1.pdf",
                  assetId: "69ae83289b5acd2d63faa6a9",
                  customerId: "69ae7b1e6368a2929f637fcd",
                },
              ],
            },
          ],
        },
      ],
    },
  };
  return { data };
}

// function useSaturatonAnalysisMutation(): [
//   (payload: unknown) => Promise<void>,
//   { isLoading: boolean; isSuccess: boolean; isError: boolean },
// ] {
//   const [state, setState] = useState({
//     isLoading: false,
//     isSuccess: false,
//     isError: false,
//   });

//   const mutate = async (payload: unknown) => {
//     setState({ isLoading: true, isSuccess: false, isError: false });
//     await new Promise((r) => setTimeout(r, 1500));
//     console.log("Saturation Analysis Payload:", payload);
//     setState({ isLoading: false, isSuccess: true, isError: false });
//   };

//   return [mutate, state];
// }

// ─── Step Indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { label: "Select Customer", icon: "👤" },
  { label: "Select Asset", icon: "🏗️" },
  { label: "Select Report", icon: "📄" },
  { label: "Configure Simulation", icon: "⚙️" },
  { label: "Run Analysis", icon: "▶" },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between w-full mb-8 overflow-x-auto pb-2">
      {STEPS.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-1 min-w-[80px]">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-primaryColor text-white"
                    : isActive
                      ? "bg-primaryColor text-white ring-4 ring-blue-100"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>
              <span
                className={`text-xs text-center leading-tight font-medium ${
                  isActive
                    ? "text-pribg-primaryColor"
                    : isCompleted
                      ? "text-pribg-primaryColor"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
                  idx < currentStep ? "bg-primaryColor" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Select Dropdown ──────────────────────────────────────────────────────────

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pribg-primaryColor/20 focus:border-pribg-primaryColor transition-all ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-50"
              : "cursor-pointer hover:border-gray-300"
          }`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
        <div className="w-1 h-5 rounded-full bg-primaryColor" />
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {badge && (
          <span className="text-xs text-gray-400 font-normal">({badge})</span>
        )}
      </div>
      <div className="px-6 py-5 flex flex-col gap-5">{children}</div>
    </div>
  );
}

// ─── Toggle Pill ──────────────────────────────────────────────────────────────

function TogglePill({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
            value === opt
              ? "bg-primaryColor text-white border-pribg-primaryColor shadow-sm"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Radio Option ─────────────────────────────────────────────────────────────

function RadioOption({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={onChange}
      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
        checked
          ? "border-pribg-primaryColor/30 bg-blue-50/40"
          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div
        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          checked ? "border-pribg-primaryColor" : "border-gray-300"
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-primaryColor" />}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

// ─── Range Fields ─────────────────────────────────────────────────────────────

function RangeFields({
  label,
  min,
  max,
  interval,
  onChange,
  unit,
  onUnitToggle,
}: {
  label: string;
  min: string;
  max: string;
  interval: string;
  onChange: (field: "min" | "max" | "interval", value: string) => void;
  unit?: string;
  onUnitToggle?: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {unit && onUnitToggle && (
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden text-xs font-medium">
            {["°C", "°F"].map((u) => (
              <button
                key={u}
                type="button"
                onClick={onUnitToggle}
                className={`px-3 py-1.5 transition-all ${
                  unit === u
                    ? "bg-primaryColor text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {(["min", "max", "interval"] as const).map((field) => (
          <div key={field}>
            <label className="text-xs text-gray-500 mb-1 block capitalize">
              {field}
            </label>
            <input
              type="number"
              value={field === "min" ? min : field === "max" ? max : interval}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pribg-primaryColor/20 focus:border-pribg-primaryColor transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SaturationAnalysis() {
  // Step tracking
  const [currentStep, setCurrentStep] = useState(0);

  // Selection Flow
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [selectedReportId, setSelectedReportId] = useState("");

  // Advanced Settings
  const [saltsSelection, setSaltsSelection] = useState("Auto");
  const [saltOfInterest, setSaltOfInterest] = useState("Gypsum");
  const [overrideDosage, setOverrideDosage] = useState("");
  const [adjustmentChemical, setAdjustmentChemical] = useState("");
  const [balanceCation, setBalanceCation] = useState("");
  const [balanceAnion, setBalanceAnion] = useState("");

  // Treatment Setup
  const [treatmentMode, setTreatmentMode] = useState<"product" | "raw">(
    "product",
  );
  const [selectedProduct, setSelectedProduct] = useState("");
  const [dosagePpm, setDosagePpm] = useState("50");

  // Simulation Parameters
  const [cocMin, setCocMin] = useState("50");
  const [cocMax, setCocMax] = useState("50");
  const [cocInterval, setCocInterval] = useState("50");
  const [tempMin, setTempMin] = useState("50");
  const [tempMax, setTempMax] = useState("50");
  const [tempInterval, setTempInterval] = useState("50");
  const [tempUnit, setTempUnit] = useState("°C");
  const [pHMode, setPHMode] = useState<"natural" | "fixed">("natural");

  // Auth / API
  const company: UserProfile | null = useSelector(
    (state: RootState) => state.user.user,
  );
  const companyId = company?.companyMember?.company?.id ?? "mock-company-id";

  const { data: customerData } = useGetCoustomerAndAsetListQuery(
    companyId as string,
    { skip: !companyId },
  );

  const [runAnalysis, { isLoading, isSuccess }] =
    useSaturatonAnalysisMutation();

  // Derived data
  const customers = useMemo(
    () => customerData?.data?.customers ?? [],
    [customerData],
  );

  const customerOptions = useMemo(
    () =>
      customers.map((c) => ({
        value: c.id,
        label: `${c.name} — ${c.siteName}`,
      })),
    [customers],
  );

  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === selectedCustomerId),
    [customers, selectedCustomerId],
  );

  const assetOptions = useMemo(
    () =>
      selectedCustomer?.assets.map((a) => ({
        value: a.id,
        label: `${a.name} (${a.type})`,
      })) ?? [],
    [selectedCustomer],
  );

  const selectedAsset = useMemo(
    () => selectedCustomer?.assets.find((a) => a.id === selectedAssetId),
    [selectedCustomer, selectedAssetId],
  );

  const reportOptions = useMemo(
    () =>
      selectedAsset?.waterReports.map((r) => ({
        value: r.id,
        label: r.aiReportId,
      })) ?? [],
    [selectedAsset],
  );

  // Step navigation
  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    setSelectedAssetId("");
    setSelectedReportId("");
    setCurrentStep(1);
  };

  const handleAssetChange = (id: string) => {
    setSelectedAssetId(id);
    setSelectedReportId("");
    setCurrentStep(2);
  };

  const handleReportChange = (id: string) => {
    setSelectedReportId(id);
    setCurrentStep(3);
  };

  // Submit
  const handleSubmit = async () => {
    if (!selectedCustomerId) return;
    setCurrentStep(4);

    const payload = {
      customerId: selectedCustomerId,
      assetId: selectedAssetId,
      reportId: selectedReportId,
      advancedSettings: {
        saltsSelection,
        saltOfInterest,
        overrideDosage: overrideDosage ? Number(overrideDosage) : null,
        chargeBalanceAdjustment: {
          adjustmentChemical,
          balanceCation,
          balanceAnion,
        },
      },
      treatmentSetup: {
        mode: treatmentMode,
        product: selectedProduct,
        dosagePpm: Number(dosagePpm),
      },
      simulationParameters: {
        cocRange: {
          min: Number(cocMin),
          max: Number(cocMax),
          interval: Number(cocInterval),
        },
        temperatureRange: {
          min: Number(tempMin),
          max: Number(tempMax),
          interval: Number(tempInterval),
          unit: tempUnit,
        },
        pHMode,
      },
      parameters: [
        { name: "pH", value: 7.41, unit: "", detection_limit: null },
        {
          name: "Nitrate_as_Nitrogen",
          value: 0.5,
          unit: "ppm",
          detection_limit: 0.5,
        },
        {
          name: "Hardness",
          value: 196,
          unit: "ppm CaCO3",
          detection_limit: null,
        },
        { name: "TDS", value: 272, unit: "ppm", detection_limit: null },
        { name: "Chloride", value: 21, unit: "ppm", detection_limit: null },
        { name: "Calcium", value: 65.6, unit: "ppm", detection_limit: null },
        { name: "Magnesium", value: 7.23, unit: "ppm", detection_limit: null },
        { name: "Sodium", value: 18, unit: "ppm", detection_limit: null },
        { name: "Iron", value: 1.31, unit: "ppm", detection_limit: null },
        { name: "Alkalinity", value: 141, unit: "ppm", detection_limit: null },
        { name: "Sulfates", value: 10, unit: "ppm", detection_limit: 10 },
        { name: "Phosphorus", value: 1.31, unit: "ppm", detection_limit: null },
        { name: "Potassium", value: 16.6, unit: "ppm", detection_limit: null },
        { name: "Manganese", value: 0.06, unit: "ppm", detection_limit: null },
        { name: "Zinc", value: 0.01, unit: "ppm", detection_limit: 0.01 },
        { name: "Copper", value: 0.01, unit: "ppm", detection_limit: null },
        {
          name: "Sulfate_Sulfur",
          value: 1,
          unit: "ppm",
          detection_limit: null,
        },
        { name: "Molybdenum", value: 0, unit: "ppm", detection_limit: null },
        { name: "Selenium", value: 0, unit: "ppm", detection_limit: null },
        { name: "Boron", value: 0, unit: "ppm", detection_limit: null },
      ],
    };

    await runAnalysis(payload);
  };

  const canSubmit = selectedCustomerId && selectedAssetId && selectedReportId;

  return (
    <div className="min-h-screen bg-gray-50/70 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Saturation Analysis
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Simulate scaling behavior across multiple operating conditions.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-5 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">
                Analysis submitted successfully!
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                Your saturation analysis is being processed.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {/* ── Selection Flow ── */}
          <SectionCard title="Selection Flow">
            <SelectField
              label="Select Customer"
              required
              value={selectedCustomerId}
              onChange={handleCustomerChange}
              placeholder="Choose a customer..."
              options={customerOptions}
            />
            <SelectField
              label="Select Asset"
              required
              value={selectedAssetId}
              onChange={handleAssetChange}
              placeholder="Choose an asset..."
              options={assetOptions}
              disabled={!selectedCustomerId}
            />
            <SelectField
              label="Select Water Report"
              required
              value={selectedReportId}
              onChange={handleReportChange}
              placeholder="Choose a water report..."
              options={reportOptions}
              disabled={!selectedAssetId}
            />
          </SectionCard>

          {/* ── Advanced Settings ── */}
          <SectionCard title="Advanced Settings" badge="Optional">
            <SelectField
              label="Salts Selection"
              value={saltsSelection}
              onChange={setSaltsSelection}
              options={[
                { value: "Auto", label: "Auto" },
                { value: "Manual", label: "Manual" },
              ]}
            />

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Salts Of Interest
              </p>
              <TogglePill
                options={["Gypsum", "Calcite", "Silica"]}
                value={saltOfInterest}
                onChange={setSaltOfInterest}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Override Dosage (ppm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={overrideDosage}
                  onChange={(e) => setOverrideDosage(e.target.value)}
                  placeholder="Leave empty to use default"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pribg-primaryColor/20 focus:border-pribg-primaryColor transition-all"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Charge Balance Adjustment
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    label: "Adjustment Chemical",
                    value: adjustmentChemical,
                    set: setAdjustmentChemical,
                  },
                  {
                    label: "Balance Cation",
                    value: balanceCation,
                    set: setBalanceCation,
                  },
                  {
                    label: "Balance Anion",
                    value: balanceAnion,
                    set: setBalanceAnion,
                  },
                ].map(({ label, value, set }) => (
                  <SelectField
                    key={label}
                    label={label}
                    value={value}
                    onChange={set}
                    placeholder="Select"
                    options={[
                      { value: "HCl", label: "HCl" },
                      { value: "NaOH", label: "NaOH" },
                      { value: "H2SO4", label: "H₂SO₄" },
                      { value: "Ca2+", label: "Ca²⁺" },
                      { value: "Mg2+", label: "Mg²⁺" },
                      { value: "Na+", label: "Na⁺" },
                      { value: "Cl-", label: "Cl⁻" },
                      { value: "SO42-", label: "SO₄²⁻" },
                      { value: "HCO3-", label: "HCO₃⁻" },
                    ]}
                  />
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ── Treatment Setup ── */}
          <SectionCard title="Treatment Setup" badge="Optional">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Treatment Mode
              </p>
              <div className="flex gap-3 flex-wrap">
                {(["product", "raw"] as const).map((m) => (
                  <label
                    key={m}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      onClick={() => setTreatmentMode(m)}
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        treatmentMode === m
                          ? "border-pribg-primaryColor"
                          : "border-gray-300"
                      }`}
                    >
                      {treatmentMode === m && (
                        <div className="w-2 h-2 rounded-full bg-primaryColor" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">
                      {m === "product" ? "Use Product" : "Use Raw Material"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <SelectField
                  label="Select Product"
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                  placeholder="Choose a product..."
                  options={[
                    {
                      value: "corrosion-a200",
                      label: "Corrosion Inhibitor A-200",
                    },
                    { value: "scale-b100", label: "Scale Inhibitor B-100" },
                    { value: "biocide-c50", label: "Biocide C-50" },
                  ]}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Dosage (ppm)
                </label>
                <input
                  type="number"
                  value={dosagePpm}
                  onChange={(e) => setDosagePpm(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pribg-primaryColor/20 focus:border-pribg-primaryColor transition-all"
                />
              </div>
            </div>
          </SectionCard>

          {/* ── Simulation Parameters ── */}
          <SectionCard title="Simulation Parameters" badge="Optional">
            <RangeFields
              label="Cycles of Concentration (CoC) Range"
              min={cocMin}
              max={cocMax}
              interval={cocInterval}
              onChange={(field, val) => {
                if (field === "min") setCocMin(val);
                else if (field === "max") setCocMax(val);
                else setCocInterval(val);
              }}
            />
            <RangeFields
              label="Temperature Range"
              min={tempMin}
              max={tempMax}
              interval={tempInterval}
              onChange={(field, val) => {
                if (field === "min") setTempMin(val);
                else if (field === "max") setTempMax(val);
                else setTempInterval(val);
              }}
              unit={tempUnit}
              onUnitToggle={() =>
                setTempUnit((u) => (u === "°C" ? "°F" : "°C"))
              }
            />

            <div>
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Treatment Mode
              </p>
              <div className="flex flex-col gap-2">
                <RadioOption
                  label="Natural pH"
                  description="Use pH from water analysis"
                  checked={pHMode === "natural"}
                  onChange={() => setPHMode("natural")}
                />
                <RadioOption
                  label="Fixed pH"
                  description="Override with specific pH value"
                  checked={pHMode === "fixed"}
                  onChange={() => setPHMode("fixed")}
                />
              </div>
            </div>
          </SectionCard>

          {/* ── Run Button ── */}
          <div className="flex justify-end pb-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
              className={`flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
                canSubmit && !isLoading
                  ? "bg-primaryColor text-white hover:bg-[#162d4d] active:scale-[0.98] shadow-blue-900/20"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
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
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Running Analysis...
                </>
              ) : (
                <>
                  Run Saturation Analysis
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
