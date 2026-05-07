"use client";

import React, { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GridRow {
  coc?: number;
  temperature?: number;
  temp_unit?: string;
  ph?: number;
  si?: number;
  sr?: number;
  color?: string;
  color_hex?: string;
  ionic_strength?: number;
  charge_balance_error_pct?: number;
  [key: string]: unknown;
}

export interface GridOverview {
  salt_id?: string;
  temp_unit?: string;
  rows: GridRow[];
}

export interface GridOverviewTableProps {
  grid_overview: GridOverview;
}

// ─── Column Definitions ───────────────────────────────────────────────────────

interface ColDef {
  key: string;
  label: string;
  decimals?: number;
  sortable?: boolean;
  unit?: "temp";
  colorize?: "si" | "status";
}

const ALL_COL_DEFS: ColDef[] = [
  { key: "coc", label: "CoC", sortable: true },
  { key: "temperature", label: "Temp", sortable: true, unit: "temp" },
  { key: "ph", label: "pH", decimals: 3, sortable: true },
  { key: "si", label: "SI", decimals: 2, sortable: true, colorize: "si" },
  { key: "sr", label: "SR", decimals: 5, sortable: true },
  { key: "color", label: "Status", colorize: "status" },
  {
    key: "ionic_strength",
    label: "Ionic Strength",
    decimals: 6,
    sortable: true,
  },
  {
    key: "charge_balance_error_pct",
    label: "CBE (%)",
    decimals: 1,
    sortable: true,
  },
];

type SortDir = "asc" | "desc";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (v: unknown, decimals?: number): string => {
  if (v === undefined || v === null || v === "") return "—";
  if (typeof v === "number") {
    if (decimals !== undefined) return v.toFixed(decimals);
    return Number.isInteger(v) ? String(v) : String(v);
  }
  return String(v);
};

/** Returns only columns that have at least one non-null value across all rows */
const getActiveColumns = (rows: GridRow[]): ColDef[] =>
  ALL_COL_DEFS.filter(({ key }) =>
    rows.some((r) => r[key] !== undefined && r[key] !== null && r[key] !== ""),
  );

// ─── StatusBadge ─────────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ color: string; hex?: string }> = ({
  color,
  hex,
}) => {
  const bg = hex ? `${hex}20` : "#22c55e20";
  const border = hex ? `${hex}40` : "#22c55e40";
  const text = hex ?? "#22c55e";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
      style={{ background: bg, border: `1px solid ${border}`, color: text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: text, boxShadow: `0 0 6px ${text}` }}
      />
      {color}
    </span>
  );
};

// ─── SortIcon ─────────────────────────────────────────────────────────────────

const SortIcon: React.FC<{ active: boolean; dir: SortDir }> = ({
  active,
  dir,
}) => (
  <span
    className={`ml-1 text-[10px] transition-all ${active ? "opacity-100 text-indigo-400" : "opacity-20 text-slate-400"}`}
  >
    {active ? (dir === "asc" ? "↑" : "↓") : "↕"}
  </span>
);

// ─── DetailCard ──────────────────────────────────────────────────────────────

const DetailCard: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="relative bg-gradient-to-br from-[#131f38] to-[#0e1829] border border-white/[0.08] rounded-xl px-4 py-3 overflow-hidden group/card hover:border-indigo-500/30 transition-colors duration-200">
    <div className="absolute inset-0 bg-indigo-500/0 group-hover/card:bg-indigo-500/[0.03] transition-colors duration-200 pointer-events-none" />
    <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-600 mb-1.5">
      {label}
    </p>
    <div className="relative">{children}</div>
  </div>
);

// ─── TableRow ────────────────────────────────────────────────────────────────

const TableRow: React.FC<{
  row: GridRow;
  activeCols: ColDef[];
  tempUnit: string;
  index: number;
}> = ({ row, activeCols, tempUnit, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        onClick={() => setExpanded((x) => !x)}
        className={`cursor-pointer select-none transition-all duration-150 group ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:bg-blue-50`}
      >
        {activeCols.map((col) => {
          const val = row[col.key];
          const isEmpty = val === undefined || val === null || val === "";

          return (
            <td
              key={col.key}
              className="px-4 py-3.5 text-sm border-b border-gray-200 whitespace-nowrap"
            >
              {isEmpty ? (
                <span className="text-gray-400">—</span>
              ) : col.colorize === "status" ? (
                <StatusBadge
                  color={String(val)}
                  hex={row.color_hex as string | undefined}
                />
              ) : col.unit === "temp" ? (
                <span className="text-gray-800 font-mono tabular-nums">
                  {fmt(val, col.decimals)}
                  <span className="text-gray-500 text-xs ml-1">{tempUnit}</span>
                </span>
              ) : col.colorize === "si" ? (
                <span
                  className={`font-mono tabular-nums font-medium ${(val as number) >= 0 ? "text-rose-600" : "text-emerald-600"}`}
                >
                  {fmt(val, col.decimals)}
                </span>
              ) : (
                <span className="font-mono tabular-nums text-gray-700">
                  {fmt(val, col.decimals)}
                </span>
              )}
            </td>
          );
        })}

        <td className="px-3 py-3.5 border-b border-gray-200 w-10 text-center">
          <span
            className={`inline-flex items-center justify-center w-5 h-5 rounded-md bg-gray-100 text-gray-400 text-[10px] transition-all duration-200 group-hover:bg-blue-100 group-hover:text-blue-600 ${
              expanded ? "rotate-180 !bg-blue-100 !text-blue-600" : ""
            }`}
          >
            ▾
          </span>
        </td>
      </tr>

      {expanded && (
        <tr>
          <td
            colSpan={activeCols.length + 1}
            className="p-0 border-b border-blue-200"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white px-6 py-5 go-slide-down border-t border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-4 rounded-full bg-blue-600 inline-block" />
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-blue-600">
                  Row Details
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                {ALL_COL_DEFS.map((col) => {
                  const val = row[col.key];
                  if (val === undefined || val === null || val === "")
                    return null;
                  return (
                    <DetailCard key={col.key} label={col.label}>
                      {col.colorize === "status" ? (
                        <StatusBadge
                          color={String(val)}
                          hex={row.color_hex as string | undefined}
                        />
                      ) : col.colorize === "si" ? (
                        <p
                          className={`font-mono text-sm font-semibold tabular-nums ${(val as number) >= 0 ? "text-rose-600" : "text-emerald-600"}`}
                        >
                          {fmt(val, col.decimals)}
                        </p>
                      ) : col.unit === "temp" ? (
                        <p className="font-mono text-sm font-semibold text-gray-800 tabular-nums">
                          {fmt(val, col.decimals)}
                          <span className="text-gray-500 text-xs ml-1">
                            {tempUnit}
                          </span>
                        </p>
                      ) : (
                        <p className="font-mono text-sm font-semibold text-gray-800 tabular-nums">
                          {fmt(val, col.decimals)}
                        </p>
                      )}
                    </DetailCard>
                  );
                })}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const GridOverviewTable: React.FC<GridOverviewTableProps> = ({
  grid_overview,
}) => {
  const { salt_id, temp_unit = "°C", rows = [] } = grid_overview;

  const [collapsed, setCollapsed] = useState(false);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [filterColor, setFilterColor] = useState("all");
  const [cocFilter, setCocFilter] = useState("");

  // Dynamically computed active columns (only columns with at least one value)
  const activeCols = useMemo(() => getActiveColumns(rows), [rows]);

  // Temperature range derived from data
  const allTemps = useMemo(
    () => rows.map((r) => r.temperature ?? 0).filter(Boolean),
    [rows],
  );
  const minTemp = allTemps.length ? Math.min(...allTemps) : 0;
  const maxTemp = allTemps.length ? Math.max(...allTemps) : 0;
  const [tempRange, setTempRange] = useState<[number, number]>([
    minTemp,
    maxTemp,
  ]);

  // Unique dropdown values
  const uniqueCocs = useMemo(
    () =>
      [
        ...new Set(rows.map((r) => r.coc).filter((v) => v !== undefined)),
      ].sort() as number[],
    [rows],
  );
  const uniqueColors = useMemo(
    () => [...new Set(rows.map((r) => r.color).filter(Boolean))] as string[],
    [rows],
  );

  // Filtered + sorted rows
  const processedRows = useMemo(() => {
    let r = [...rows];
    if (filterColor !== "all") r = r.filter((row) => row.color === filterColor);
    if (cocFilter !== "") r = r.filter((row) => String(row.coc) === cocFilter);
    if (allTemps.length) {
      r = r.filter((row) => {
        const t = row.temperature ?? 0;
        return t >= tempRange[0] && t <= tempRange[1];
      });
    }
    if (sortKey) {
      r.sort((a, b) => {
        const av = (a[sortKey] as number) ?? 0;
        const bv = (b[sortKey] as number) ?? 0;
        return sortDir === "asc" ? av - bv : bv - av;
      });
    }
    return r;
  }, [rows, filterColor, cocFilter, tempRange, sortKey, sortDir, allTemps]);

  const greenCount = processedRows.filter((r) => r.color === "green").length;
  const redCount = processedRows.filter((r) => r.color === "red").length;
  const isFiltered =
    filterColor !== "all" ||
    cocFilter !== "" ||
    tempRange[0] !== minTemp ||
    tempRange[1] !== maxTemp;

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleReset = () => {
    setFilterColor("all");
    setCocFilter("");
    setTempRange([minTemp, maxTemp]);
    setSortKey(null);
  };

  if (!rows.length) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-2 text-slate-600">
        <span className="text-3xl">⊘</span>
        <p className="text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="go-display">
        {/* ── Table Card ── */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xl shadow-gray-300/50 bg-white">
          {/* Collapse toggle header */}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-full flex items-center justify-between px-5 py-4 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_#3b82f6]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 group-hover:text-gray-600 transition-colors">
                Data Table
              </span>
              <span className="text-[10px] text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5 border border-gray-200">
                {processedRows.length} rows
              </span>
            </div>
            <span
              className={`text-gray-400 text-xs transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
            >
              ▾
            </span>
          </button>

          {/* Table body */}
          {!collapsed && (
            <div className="overflow-x-auto go-slide-down">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    {activeCols.map((col) => (
                      <th
                        key={col.key}
                        onClick={() => col.sortable && handleSort(col.key)}
                        className={`
                          px-4 py-3.5 text-left text-[10px] font-bold tracking-[0.18em] uppercase
                          border-b border-gray-200 whitespace-nowrap
                          ${col.sortable ? "cursor-pointer select-none hover:bg-gray-100" : ""}
                          ${sortKey === col.key ? "text-blue-600" : "text-gray-600"}
                        `}
                      >
                        {col.label}
                        {col.sortable && (
                          <SortIcon
                            active={sortKey === col.key}
                            dir={sortDir}
                          />
                        )}
                      </th>
                    ))}
                    <th className="w-10 border-b border-gray-200" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {processedRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={activeCols.length + 1}
                        className="text-center py-16 text-gray-400 text-sm"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-3xl opacity-30">⊘</span>
                          <span>No rows match current filters</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    processedRows.map((row, i) => (
                      <TableRow
                        key={i}
                        row={row}
                        activeCols={activeCols}
                        tempUnit={temp_unit}
                        index={i}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {collapsed && (
            <div className="px-5 py-5 text-center text-gray-400 text-sm italic bg-gray-50">
              Table collapsed — click the header above to expand
            </div>
          )}
        </div>

        <p className="text-[11px] text-gray-500 mt-3 text-right tracking-wide">
          Click any row to expand details · Click column header to sort
        </p>
      </div>
    </div>
  );
};

export default GridOverviewTable;

// ─── Usage ────────────────────────────────────────────────────────────────────
//
// import GridOverviewTable from "@/components/GridOverviewTable";
//
// <GridOverviewTable
//   grid_overview={{
//     salt_id: "CaCO3",
//     temp_unit: "°C",
//     rows: apiResponse.grid_overview,   // ← pass your array here
//   }}
// />
//
// Props shape:
//
// grid_overview: {
//   salt_id?:  string          — displayed as the page title
//   temp_unit?: string         — e.g. "°C" or "°F" (default: "°C")
//   rows:      GridRow[]       — the data array; required
// }
//
// GridRow fields (all optional — columns appear dynamically):
//   coc, temperature, ph, si, sr, color, color_hex,
//   ionic_strength, charge_balance_error_pct
//
// Any field that is undefined / null / "" across ALL rows
// is automatically hidden from the table and detail cards.
