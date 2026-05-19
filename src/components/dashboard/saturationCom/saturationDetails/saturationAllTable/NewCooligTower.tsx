"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface CustomerInformation {
  address: string;
  location: string;
  name: string;
  site_name: string;
}

interface AssetInformation {
  draft_type: string | null;
  fill_type: string;
  hottest_skin_temperature: number;
  name: string;
  recirculation_rate_gpm: number;
  return_temperature: number;
  return_temperature_unit: string;
  supply_temperature: number;
  supply_temperature_unit: string;
  system_volume: number;
  tower_type: string;
  type: string;
  wet_bulb_temperature: number | null;
}

interface ApproachData {
  approach_f: number | null;
  approach_c: number | null;
  note: string;
}

interface CoolingTons {
  calculated_tons: number;
  input_tons: number | null;
}

interface EfficiencyData {
  efficiency_percent: number | null;
  note: string;
}

interface HeatLoad {
  heat_load_btu_hr: number;
  heat_load_tons: number;
}

interface RangeData {
  range_f: number;
}

interface CoolingTowerAnalysisData {
  approach: ApproachData;
  cold_water_temp_f: number;
  cooling_tons: CoolingTons;
  cooling_tons_input: number | null;
  drift_gpm: number;
  drift_percent: number;
  efficiency: EfficiencyData;
  evaporation_factor_pct: number;
  heat_load: HeatLoad;
  hot_water_temp_f: number;
  hottest_skin_temperature_f: number;
  range: RangeData;
  recirculation_rate_gpm: number;
  return_temperature_f: number;
  skin_temp_f: number;
  supply_temperature_f: number;
  wet_bulb_temp_c: number | null;
  wet_bulb_temp_f: number | null;
}

interface Materials {
  metallurgy: string[];
  system_materials: string[];
}

interface AssetSummary {
  asset_information: AssetInformation;
  cooling_tower_analysis: CoolingTowerAnalysisData;
  customer_information: CustomerInformation;
  materials: Materials;
}

export interface CoolingTowerAnalysisProps {
  asset_summary: AssetSummary;
}

// ─────────────────────────────────────────────
// COLLAPSIBLE SECTION
// ─────────────────────────────────────────────

interface CollapsibleSectionProps {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({
  label,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-expanded={open}
      >
        <span className="text-[11px] font-bold tracking-[0.1em] text-blue-600 uppercase">
          {label}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out flex-1 ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4 border-t border-slate-100">{children}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// METRIC CARD
// ─────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: number | null | undefined;
  unit?: string;
  colorClass?: string;
  compact?: boolean;
}

function MetricCard({
  label,
  value,
  unit,
  colorClass = "bg-slate-50",
  compact = false,
}: MetricCardProps) {
  return (
    <div
      className={`${colorClass} rounded-xl ${compact ? "p-3" : "p-4"} flex-1 min-w-0`}
    >
      <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-slate-400 mb-1.5 leading-tight">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span
          className={`font-semibold text-slate-800 leading-none font-mono ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          {value !== null && value !== undefined ? value.toLocaleString() : "—"}
        </span>
        {unit && (
          <span className="text-xs text-slate-500 font-medium">{unit}</span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export default function CoolingTowerAnalysis({
  asset_summary,
}: CoolingTowerAnalysisProps) {
  const {
    customer_information: cust,
    asset_information: asset,
    cooling_tower_analysis: cta,
    materials,
  } = asset_summary;

  return (
    <div className="">
      <div className="">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Cooling Tower Analysis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Only fields with available data are displayed. Values appear
            automatically as data becomes available.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 mb-5">
          {["System Parameters"].map((tab, i) => (
            <div
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm cursor-default select-none ${
                i === 0
                  ? "bg-white border border-slate-200 font-semibold text-slate-800 shadow-sm"
                  : "text-slate-400 border border-transparent"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* ── ROW 1: Customer Information + Asset Information side by side ── */}
        <div className="grid grid-cols-2 gap-3 mb-3 items-start">
          {/* Customer Information */}
          <CollapsibleSection label="Customer Information">
            <div className="space-y-3">
              <div>
                <p className="text-[11px] text-slate-400 mb-1">Company</p>
                <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800">
                  {cust.name}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 mb-1">Site Name</p>
                <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800">
                  {cust.site_name}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 mb-1">Location</p>
                <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800">
                  {cust.location}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 mb-1">Address</p>
                <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800">
                  {cust.address}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Asset Information */}
          <CollapsibleSection label="Asset Information">
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
              {[
                { label: "Asset Name", value: asset.name },
                { label: "Type", value: asset.type },
                { label: "Tower Type", value: asset.tower_type },
                { label: "Fill Type", value: asset.fill_type },
                { label: "Draft Type", value: asset.draft_type ?? "—" },
                {
                  label: "System Volume",
                  value: asset.system_volume
                    ? `${asset.system_volume.toLocaleString()} gal`
                    : "—",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center px-4 py-2.5 text-sm"
                >
                  <span className="text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        {/* ── Operational Metrics ── */}
        <div className="mb-3">
          <CollapsibleSection label="Operational Metrics">
            <div className="grid grid-cols-4 gap-2.5 mb-2.5">
              <MetricCard
                label="Recirculation Rate"
                value={cta.recirculation_rate_gpm}
                unit="GPM"
                colorClass="bg-blue-50"
              />
              <MetricCard
                label="Hot Water Temp"
                value={cta.hot_water_temp_f}
                unit="°F"
                colorClass="bg-amber-50"
              />
              <MetricCard
                label="Cold Water Temp"
                value={cta.cold_water_temp_f}
                unit="°F"
                colorClass="bg-teal-50"
              />
              <MetricCard
                label="Skin Temp"
                value={cta.skin_temp_f}
                unit="°F"
                colorClass="bg-yellow-50"
              />
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              <MetricCard
                label="Range"
                value={cta.range?.range_f}
                unit="°F"
                colorClass="bg-purple-50"
              />
              <MetricCard
                label="Heat Load"
                value={cta.heat_load?.heat_load_tons}
                unit="tons"
                colorClass="bg-green-50"
              />
              <MetricCard
                label="Calculated Tons"
                value={cta.cooling_tons?.calculated_tons}
                unit="tons"
                colorClass="bg-emerald-50"
              />
              <div className="flex gap-2">
                <MetricCard
                  label="Drift"
                  value={cta.drift_percent}
                  unit="%"
                  colorClass="bg-pink-50"
                  compact
                />
                <MetricCard
                  label="Drift Rate"
                  value={cta.drift_gpm}
                  unit="GPM"
                  colorClass="bg-pink-50"
                  compact
                />
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* ── ROW 2: Temperatures / Factors + Heat Load / Efficiency side by side ── */}
        <div className="grid grid-cols-2 gap-3 mb-3 items-start">
          {/* Temperatures / Factors */}
          <CollapsibleSection label="Temperatures / Factors">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-3 py-2 text-[10px] font-bold tracking-[0.08em] uppercase text-slate-400 border-b border-slate-100">
                    Parameter
                  </th>
                  <th className="text-left px-3 py-2 text-[10px] font-bold tracking-[0.08em] uppercase text-slate-400 border-b border-slate-100">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-3 py-2.5 text-sm text-slate-500">
                    Evaporation Factor
                  </td>
                  <td className="px-3 py-2.5 text-sm font-semibold text-slate-800">
                    {cta.evaporation_factor_pct != null
                      ? `${cta.evaporation_factor_pct}%`
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 text-sm text-slate-500">Range</td>
                  <td className="px-3 py-2.5 text-sm font-semibold text-slate-800">
                    {cta.range?.range_f != null
                      ? `${cta.range.range_f} °F`
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 text-sm text-slate-500">
                    Approach (°F)
                  </td>
                  <td className="px-3 py-2.5 text-sm font-semibold text-slate-800">
                    {cta.approach?.approach_f != null
                      ? cta.approach.approach_f
                      : "—"}
                    {cta.approach?.note && (
                      <span className="ml-2 text-[11px] text-orange-500 font-normal">
                        {cta.approach.note}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 text-sm text-slate-500">
                    Wet Bulb Temp
                  </td>
                  <td className="px-3 py-2.5 text-sm font-semibold">
                    <span
                      className={
                        cta.wet_bulb_temp_c != null
                          ? "text-blue-600"
                          : "text-slate-800"
                      }
                    >
                      {cta.wet_bulb_temp_f != null
                        ? `${cta.wet_bulb_temp_f} °F`
                        : cta.wet_bulb_temp_c != null
                          ? `${cta.wet_bulb_temp_c} °C`
                          : "—"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </CollapsibleSection>

          {/* Heat Load / Efficiency */}
          <CollapsibleSection label="Heat Load / Efficiency">
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center px-4 py-2.5 text-sm">
                <span className="text-slate-500">Heat Load</span>
                <span className="font-semibold text-blue-600">
                  {cta.heat_load?.heat_load_btu_hr != null
                    ? `${cta.heat_load.heat_load_btu_hr.toLocaleString()} BTU/hr`
                    : "—"}
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5 text-sm">
                <span className="text-slate-500">Heat Load</span>
                <span className="font-semibold text-green-600">
                  {cta.heat_load?.heat_load_tons != null
                    ? `${cta.heat_load.heat_load_tons.toLocaleString()} tons`
                    : "—"}
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5 text-sm">
                <span className="text-slate-500">Efficiency (%)</span>
                <span className="font-semibold text-slate-800">
                  {cta.efficiency?.efficiency_percent != null
                    ? cta.efficiency.efficiency_percent
                    : "—"}
                  {cta.efficiency?.note &&
                    cta.efficiency.efficiency_percent == null && (
                      <span className="ml-2 text-[11px] text-slate-400 font-normal">
                        ({cta.efficiency.note})
                      </span>
                    )}
                </span>
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* ── Materials ── */}
        <CollapsibleSection label="Materials">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2.5">
                Metallurgy
              </p>
              <div className="flex flex-wrap gap-1.5">
                {materials.metallurgy.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2.5">
                System Materials
              </p>
              <div className="flex flex-wrap gap-1.5">
                {materials.system_materials.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
