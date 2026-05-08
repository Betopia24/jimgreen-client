"use client";

import { ChevronDown } from "lucide-react";
import React, { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Metal {
  name: string;
  value?: number | string;
  unit?: string;
  [key: string]: unknown;
}

export interface DataRow {
  coc: number;
  temperature: number;
  temp_unit: string;
  metals: Metal[];
  [key: string]: unknown;
}

export interface DataTableProps {
  data: DataRow[];
  title?: string;
  defaultCollapsed?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Derive the list of extra keys (beyond coc, temperature, temp_unit, metals)
 * that actually have non-null / non-empty values somewhere in the dataset.
 */
function getDynamicColumns(data: DataRow[]): string[] {
  const excluded = new Set(["coc", "temperature", "temp_unit", "metals"]);
  const seen = new Set<string>();
  data.forEach((row) => {
    Object.entries(row).forEach(([k, v]) => {
      if (!excluded.has(k) && v !== null && v !== undefined && v !== "") {
        seen.add(k);
      }
    });
  });
  return Array.from(seen);
}

/**
 * Derive the list of metal-sub-keys (name, value, unit, etc.) that actually
 * have values across all metals in the dataset.
 */
function getMetalSubKeys(data: DataRow[]): string[] {
  const excluded = new Set(["name"]);
  const seen = new Set<string>();
  data.forEach((row) => {
    row.metals?.forEach((m) => {
      Object.entries(m).forEach(([k, v]) => {
        if (!excluded.has(k) && v !== null && v !== undefined && v !== "") {
          seen.add(k);
        }
      });
    });
  });
  return Array.from(seen);
}

function hasMetals(data: DataRow[]): boolean {
  return data.some((r) => r.metals && r.metals.length > 0);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CollapseButton({
  collapsed,
  onClick,
}: {
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase
        border border-cyan-400/30 text-cyan-300 bg-cyan-900/20
        hover:bg-cyan-400/10 hover:border-cyan-400/60 hover:text-cyan-100
        transition-all duration-200 select-none
      "
    >
      <button className="p-2 rounded-lg hover:bg-gray-200 transition">
        <ChevronDown
          className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
            collapsed ? "-rotate-90" : "rotate-0"
          }`}
        />
      </button>
    </button>
  );
}

function MetalsBadge({ metals }: { metals: Metal[] }) {
  if (!metals || metals.length === 0) {
    return (
      <span className="inline-block px-2 py-0.5 rounded text-xs bg-slate-700/50 text-slate-500 italic">
        —
      </span>
    );
  }
  return (
    <div className="flex flex-wrap gap-1">
      {metals.map((m, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
            bg-amber-500/15 border border-amber-500/30 text-amber-300"
        >
          <span className="font-semibold">{m.name}</span>
          {m.value !== undefined && m.value !== null && m.value !== "" && (
            <span className="opacity-70">
              {m.value}
              {m.unit ? ` ${m.unit}` : ""}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function TempBadge({
  temperature,
  unit,
}: {
  temperature: number;
  unit: string;
}) {
  const heat =
    temperature >= 80
      ? "bg-red-500/20 border-red-500/40 text-red-300"
      : temperature >= 60
        ? "bg-orange-500/20 border-orange-500/40 text-orange-300"
        : temperature >= 40
          ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-300"
          : "bg-teal-500/20 border-teal-500/40 text-teal-300";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${heat}`}
    >
      {temperature}
      {unit}
    </span>
  );
}

function CocBadge({ coc }: { coc: number }) {
  return (
    <span
      className="
        inline-flex items-center justify-center w-8 h-8 rounded-full
        bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-bold text-sm
      "
    >
      {coc}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CorssosionRateTable({
  data,
  title = "Data Table",
  defaultCollapsed = false,
}: DataTableProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [open, setOpen] = useState(true);

  const dynamicCols = useMemo(() => getDynamicColumns(data), [data]);
  const metalSubKeys = useMemo(() => getMetalSubKeys(data), [data]);
  const showMetals = useMemo(() => hasMetals(data), [data]);

  const baseHeaders: { key: string; label: string }[] = [
    { key: "coc", label: "CoC" },
    { key: "temperature", label: "Temperature" },
  ];

  const dynamicHeaders = dynamicCols.map((k) => ({
    key: k,
    label: k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  const allHeaders = [
    ...baseHeaders,
    ...dynamicHeaders,
    ...(showMetals ? [{ key: "metals", label: "Metals" }] : []),
  ];
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-between
          px-5 py-4
          cursor-pointer
         
        "
      >
        <div className="flex items-center gap-3">
          <h2 className="text-sm md:text-base font-bold tracking-wider uppercase">
            Corrosion Rate Table
          </h2>

          <span className="px-2.5 py-1 border rounded-full bg-white/20 text-xs font-medium">
            {data.length} Rows
          </span>
        </div>

        {/* Arrow */}
        <button className="p-2 rounded-lg hover:bg-gray-200 transition">
          <ChevronDown
            className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
              open ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Table Area */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: open ? "3000px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-100">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  #
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  CoC
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  Temperature
                </th>

                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                  Metals
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((row: any, idx: number) => (
                <tr
                  key={idx}
                  className={`
                    transition-all duration-200
                    hover:bg-cyan-50
                    ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  `}
                >
                  {/* Row Number */}
                  <td className="px-4 py-4 border-b border-slate-100 text-slate-500 font-medium">
                    {idx + 1}
                  </td>

                  {/* CoC */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span
                      className="
                        inline-flex items-center justify-center
                        px-3 py-1 rounded-full
                        bg-indigo-100
                        text-indigo-700
                        text-sm font-semibold
                      "
                    >
                      {row.coc}
                    </span>
                  </td>

                  {/* Temperature */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span
                      className={`
                        inline-flex items-center
                        px-3 py-1 rounded-full
                        text-sm font-semibold
                        ${
                          row.temperature >= 80
                            ? "bg-red-100 text-red-700"
                            : row.temperature >= 60
                              ? "bg-orange-100 text-orange-700"
                              : row.temperature >= 40
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {row.temperature}
                      {row.temp_unit}
                    </span>
                  </td>

                  {/* Metals */}
                  <td className="px-4 py-4 border-b border-slate-100">
                    <div className="flex flex-wrap gap-2">
                      {row.metals?.map((metal: any, i: number) => (
                        <span
                          key={i}
                          className="
                            px-2.5 py-1 rounded-lg
                            bg-amber-100
                            text-amber-700
                            text-xs font-medium
                          "
                        >
                          {metal.name}
                          {metal.value && ` - ${metal.value}`}
                          {metal.unit && ` ${metal.unit}`}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-t border-slate-200">
          <span className="text-xs text-slate-500 uppercase tracking-wider">
            {data.length} Total Entries
          </span>

          <span className="text-xs text-slate-400">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div
  //       className=""
  //       style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
  //     >
  //       {/* ── Header bar ── */}
  //       <div
  //         className="

  //         "
  //       >
  //         <div className="flex items-center gap-3">
  //           {/* Decorative dot cluster */}
  //           <div className="flex gap-1.5">
  //             <span className="w-3 h-3 rounded-full bg-red-500/70" />
  //             <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
  //             <span className="w-3 h-3 rounded-full bg-green-500/70" />
  //           </div>
  //           <h2 className="text-sm font-semibold text-slate-200 tracking-widest uppercase">
  //             {title}
  //           </h2>
  //           <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-400 font-medium">
  //             {data.length} rows
  //           </span>
  //         </div>
  //         <CollapseButton
  //           collapsed={collapsed}
  //           onClick={() => setCollapsed((v) => !v)}
  //         />
  //       </div>

  //       {/* ── Collapsible body ── */}
  //       <div
  //         className="overflow-hidden transition-all duration-500 ease-in-out"
  //         style={{
  //           maxHeight: collapsed ? 0 : "9999px",
  //           opacity: collapsed ? 0 : 1,
  //         }}
  //       >
  //         <div className="overflow-x-auto">
  //           <table className="w-full text-sm border-collapse">
  //             {/* ── thead ── */}
  //             <thead>
  //               <tr className="bg-slate-800/70">
  //                 <th className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-slate-500 w-10">
  //                   #
  //                 </th>
  //                 {allHeaders.map((h) => (
  //                   <th
  //                     key={h.key}
  //                     className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-slate-400 whitespace-nowrap"
  //                   >
  //                     {h.label}
  //                   </th>
  //                 ))}
  //               </tr>
  //               {/* thin accent line */}
  //               <tr>
  //                 <td
  //                   colSpan={allHeaders.length + 1}
  //                   className="h-px bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-transparent p-0"
  //                 />
  //               </tr>
  //             </thead>

  //             {/* ── tbody ── */}
  //             <tbody>
  //               {data.map((row, idx) => {
  //                 const isEven = idx % 2 === 0;
  //                 return (
  //                   <tr
  //                     key={idx}
  //                     className={`
  //                       group transition-colors duration-150
  //                       ${
  //                         isEven
  //                           ? "bg-slate-900/40 hover:bg-slate-700/30"
  //                           : "bg-slate-800/20 hover:bg-slate-700/30"
  //                       }
  //                       border-b border-slate-700/30 last:border-b-0
  //                     `}
  //                   >
  //                     {/* Row index */}
  //                     <td className="px-4 py-3 text-slate-600 text-xs font-mono">
  //                       {String(idx + 1).padStart(2, "0")}
  //                     </td>

  //                     {/* CoC */}
  //                     <td className="px-4 py-3">
  //                       <CocBadge coc={row.coc} />
  //                     </td>

  //                     {/* Temperature */}
  //                     <td className="px-4 py-3">
  //                       <TempBadge
  //                         temperature={row.temperature}
  //                         unit={row.temp_unit}
  //                       />
  //                     </td>

  //                     {/* Dynamic extra columns */}
  //                     {dynamicCols.map((k) => {
  //                       const val = row[k];
  //                       const display =
  //                         val === null || val === undefined || val === ""
  //                           ? null
  //                           : typeof val === "object"
  //                             ? JSON.stringify(val)
  //                             : String(val);
  //                       return (
  //                         <td key={k} className="px-4 py-3">
  //                           {display ? (
  //                             <span className="text-slate-200 font-medium">
  //                               {display}
  //                             </span>
  //                           ) : (
  //                             <span className="text-slate-600 text-xs italic">
  //                               —
  //                             </span>
  //                           )}
  //                         </td>
  //                       );
  //                     })}

  //                     {/* Metals */}
  //                     {showMetals && (
  //                       <td className="px-4 py-3">
  //                         <MetalsBadge metals={row.metals} />
  //                       </td>
  //                     )}
  //                   </tr>
  //                 );
  //               })}
  //             </tbody>
  //           </table>
  //         </div>

  //         {/* ── Footer ── */}
  //         <div className="flex items-center justify-between px-5 py-3 bg-slate-800/40 border-t border-slate-700/40">
  //           <span className="text-xs text-slate-600 tracking-widest uppercase">
  //             {allHeaders.length} columns · {data.length} entries
  //           </span>
  //           <span className="text-xs text-slate-700 font-mono">
  //             {new Date().toLocaleDateString()}
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
