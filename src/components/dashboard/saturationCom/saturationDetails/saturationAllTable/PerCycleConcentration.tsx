"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WaterParameter {
  value: number;
  unit: string;
  as?: string;
  phreeqc_name?: string;
  label: string;
  value_c?: number;
  unit_c?: string;
}

export interface CycledWaterParameters {
  coc: number;
  pH: number;
  temperature: number;
  temperature_c: number;
  units: string;
  parameters: {
    Ca?: WaterParameter;
    Mg?: WaterParameter;
    Cl?: WaterParameter;
    HCO3?: WaterParameter;
    SO4?: WaterParameter;
    SiO2?: WaterParameter;
    PO4?: WaterParameter;
    DO?: WaterParameter;
    pH?: WaterParameter;
    Temperature?: WaterParameter;
    [key: string]: WaterParameter | undefined;
  };
  solution_properties?: Record<string, unknown>;
}

export interface CoCEntry {
  coc: number;
  evaporation: {
    evaporation_rate_gpm: number | null;
    evaporation_factor_pct: number | null;
  };
  blowdown: {
    blowdown_rate_gpm: number | null;
    note?: string | null;
  };
  makeup: {
    makeup_rate_gpm?: number | null;
    evaporation_rate_gpm?: number | null;
    blowdown_rate_gpm?: number | null;
    drift_rate_gpm?: number | null;
    drift_percent?: number | null;
    note?: string | null;
  };
  chemical: {
    product: string;
    dosage_ppm: number | null;
    lbs_per_day: number | null;
    lbs_per_year: number | null;
    million_lbs_blowdown_per_day?: number | null;
    operating_days_per_year?: number | null;
    note?: string | null;
  };
  cycled_water_parameters: CycledWaterParameters;
}

export interface PerCycleConcentrationProps {
  data?: CoCEntry[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (v: number | null | undefined, decimals = 2): string => {
  if (v == null) return "—";
  return parseFloat(v.toString()).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
};

const PHREEQC_ORDER: Array<{ key: string; pname: string }> = [
  { key: "Ca", pname: "Ca" },
  { key: "Mg", pname: "Mg" },
  { key: "Cl", pname: "Cl" },
  { key: "HCO3", pname: "Alkalinity" },
  { key: "SO4", pname: "S(6)" },
  { key: "SiO2", pname: "Si" },
  { key: "PO4", pname: "P" },
];

const PARAM_DISPLAY_ORDER = [
  "Ca",
  "Mg",
  "Cl",
  "HCO3",
  "SO4",
  "SiO2",
  "PO4",
  "DO",
];

// ─── Metric Card ──────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  unit,
  note,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  note?: string | null;
  accent: string;
}) {
  return (
    <div className="relative bg-white border border-slate-200 rounded-sm p-3 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div
        className={`absolute inset-x-0 top-0 h-[3px] rounded-t-xl ${accent}`}
      />
      <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-1.5 leading-none">
        {label}
      </p>
      <div className="flex items-baseline gap-1 flex-wrap">
        <span className="font-mono text-base font-bold text-slate-800 leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-[10px] font-semibold text-slate-400">
            {unit}
          </span>
        )}
      </div>
      {note && (
        <p className="text-[9px] text-amber-500 font-medium italic mt-1.5 leading-tight">
          {note}
        </p>
      )}
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-slate-400 whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

// ─── Panel Content ────────────────────────────────────────────────────────────

function CoCPanelContent({ entry }: { entry: CoCEntry }) {
  const {
    evaporation: ev,
    blowdown: bd,
    makeup: mk,
    chemical: ch,
    cycled_water_parameters: cwp,
  } = entry;
  const params = cwp.parameters;

  const flowCards = [
    {
      label: "Evaporation Rate",
      value: fmt(ev.evaporation_rate_gpm),
      unit: "GPM",
      accent: "bg-blue-400",
      note: null,
    },
    {
      label: "Evaporation Factor",
      value: fmt(ev.evaporation_factor_pct),
      unit: "%",
      accent: "bg-indigo-400",
      note: null,
    },
    {
      label: "Blowdown Rate",
      value: fmt(bd.blowdown_rate_gpm),
      unit: "GPM",
      accent: "bg-cyan-400",
      note: bd.note,
    },
    {
      label: "Makeup Rate",
      value: fmt(mk.makeup_rate_gpm),
      unit: "GPM",
      accent: "bg-emerald-400",
      note: mk.note,
    },
    {
      label: "Drift Rate",
      value: fmt(mk.drift_rate_gpm),
      unit: "GPM",
      accent: "bg-violet-400",
      note: null,
    },
    {
      label: "Drift %",
      value: fmt(mk.drift_percent, 1),
      unit: "%",
      accent: "bg-pink-400",
      note: null,
    },
  ];

  const chemCards = [
    {
      label: "Lbs / Day",
      value: fmt(ch.lbs_per_day, 2),
      unit: "lbs",
      accent: "bg-amber-400",
    },
    {
      label: "Lbs / Year",
      value: fmt(ch.lbs_per_year, 2),
      unit: "lbs",
      accent: "bg-rose-400",
    },
    {
      label: "M Lbs BD / Day",
      value: fmt(ch.million_lbs_blowdown_per_day, 4),
      unit: "M lbs",
      accent: "bg-orange-400",
    },
    {
      label: "Operating Days / Year",
      value: fmt(ch.operating_days_per_year, 0),
      unit: "days",
      accent: "bg-teal-400",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* ── Flow & Rate Parameters ── */}
      <div>
        <SectionLabel>Flow &amp; Rate Parameters</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {flowCards.map((c) => (
            <MetricCard key={c.label} {...c} />
          ))}
        </div>
      </div>

      {/* ── Cycled Water Chemistry + Phreeqc ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Chemistry table */}
        <div>
          <SectionLabel>Cycled Water Chemistry</SectionLabel>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-3 py-2 text-[9px] font-bold tracking-widest uppercase text-slate-400">
                    Parameter
                  </th>
                  <th className="text-right px-3 py-2 text-[9px] font-bold tracking-widest uppercase text-slate-400">
                    Value
                  </th>
                  <th className="text-left px-3 py-2 text-[9px] font-bold tracking-widest uppercase text-slate-400">
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* pH */}
                <tr className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                  <td className="px-3 py-2 text-slate-600 font-medium">pH</td>
                  <td className="px-3 py-2 text-right font-mono font-bold text-slate-800">
                    {fmt(cwp.pH, 3)}
                  </td>
                  <td className="px-3 py-2 text-slate-400">—</td>
                </tr>

                {PARAM_DISPLAY_ORDER.map((key) => {
                  const p = params[key];
                  if (!p) return null;
                  return (
                    <tr
                      key={key}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-3 py-2 text-slate-600 font-medium">
                        {p.label}
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-slate-800">
                        {fmt(p.value, 4)}
                      </td>
                      <td className="px-3 py-2 text-slate-400">
                        {p.unit}
                        {p.as && (
                          <span className="ml-1 text-[9px] text-slate-300">
                            as {p.as}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Chemical Dosing ── */}
        <div>
          <SectionLabel>Chemical Dosing</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Product card */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-emerald-600">
                  Product / Raw Material
                </span>
                <span className="bg-white border border-emerald-200 text-emerald-700 font-bold text-[11px] px-3 py-1 rounded-full shadow-sm">
                  {ch.product}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-emerald-100 pt-2">
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-emerald-600">
                  Dosage
                </span>
                <span className="font-mono font-bold text-emerald-900 text-sm">
                  {fmt(ch.dosage_ppm)} ppm
                </span>
              </div>

              {ch.note && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[10px] font-medium text-amber-700 leading-snug">
                  ⚠ {ch.note}
                </div>
              )}
            </div>

            {/* Chemical metric cards */}
            <div className="grid grid-cols-2 gap-2">
              {chemCards.map((c) => (
                <MetricCard key={c.label} {...c} note={null} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PerCycleConcentration({
  data,
}: PerCycleConcentrationProps) {
  const safeData = Array.isArray(data) ? data : [];
  const initialCoc = safeData[0]?.coc ?? 1;
  const [activeCoc, setActiveCoc] = useState<number>(initialCoc);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const activeEntry = safeData.find((d) => d.coc === activeCoc);

  if (!safeData.length) {
    return (
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-sm">
        No cycle of concentration data available.
      </div>
    );
  }

  const handleTabClick = (coc: number) => {
    if (coc === activeCoc) {
      setIsOpen((prev) => !prev);
    } else {
      setActiveCoc(coc);
      setIsOpen(true);
    }
  };

  return (
    <div className="w-full bg-white p-3 rounded-xl border">
      {/* Section header */}
      <p className="text-sm font-bold tracking-[0.1em] uppercase  mb-2 px-0.5">
        Per Cycle of Concentration
      </p>

      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl px-2 py-1.5 mb-3 flex flex-wrap gap-1 shadow-sm">
        {safeData.map((entry) => {
          const active = activeCoc === entry.coc;
          return (
            <button
              key={entry.coc}
              onClick={() => handleTabClick(entry.coc)}
              role="tab"
              aria-selected={active}
              className={[
                "text-[11px] font-bold px-3.5 py-1.5 rounded-xl transition-all duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                active
                  ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
              ].join(" ")}
            >
              CoC {entry.coc}
            </button>
          );
        })}
      </div>

      {/* Collapsible panel */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Panel toggle header */}
        <button
          onClick={() => setIsOpen((p) => !p)}
          aria-expanded={isOpen}
          className={[
            "w-full flex items-center justify-between px-5 py-3.5 text-left",
            "hover:bg-slate-50 focus:outline-none transition-colors duration-150",
            isOpen ? "border-b border-slate-100" : "",
          ].join(" ")}
        >
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-bold tracking-wide text-slate-600 uppercase">
              Cycle of Concentration
            </span>
            <span className="bg-blue-50 text-blue-600 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
              CoC = {activeCoc}
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Body */}
        <div
          className={[
            "transition-all duration-300 ease-in-out overflow-hidden",
            isOpen
              ? "max-h-[9999px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none",
          ].join(" ")}
        >
          {activeEntry ? (
            <CoCPanelContent entry={activeEntry} />
          ) : (
            <div className="flex items-center justify-center py-12 text-slate-400 text-sm">
              No data available for CoC {activeCoc}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
