"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  Search,
  Thermometer,
  SearchX,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";

export interface Species {
  species: string;
  molality: number | null;
  activity: number | null;
  element: string | null;
}

export interface SpeciesGroup {
  coc: number;
  temperature: number;
  temp_unit: string;
  species: Species[];
}

interface SpeciesDataTableProps {
  data: SpeciesGroup[];
}

function formatNum(v: number | null | undefined): string {
  if (v === null || v === undefined) return "—";
  if (Math.abs(v) < 1e-4 && v !== 0) return v.toExponential(3);
  if (Math.abs(v) >= 1) return v.toPrecision(5);
  return v.toPrecision(4);
}

function groupKey(g: SpeciesGroup) {
  return `${g.coc}_${g.temperature}`;
}

export default function SpeciesDataTable({ data }: SpeciesDataTableProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [filterCoc, setFilterCoc] = useState<string>("all");
  const [filterTemp, setFilterTemp] = useState<string>("all");

  const uniqueTemps = useMemo(
    () => [...new Set(data.map((d) => d.temperature))].sort((a, b) => a - b),
    [data],
  );

  const uniqueCocs = useMemo(
    () => [...new Set(data.map((d) => d.coc))].sort((a, b) => a - b),
    [data],
  );

  const filteredGroups = useMemo(() => {
    return data
      ?.filter((g) => {
        if (filterCoc !== "all" && g.coc !== Number(filterCoc)) return false;
        if (filterTemp !== "all" && g.temperature !== Number(filterTemp))
          return false;
        return true;
      })
      ?.map((g) => ({
        ...g,
        species: g.species?.filter((s) => {
          if (!search) return true;
          const q = search.toLowerCase();
          return (
            s.species.toLowerCase().includes(q) ||
            (s.element?.toLowerCase().includes(q) ?? false)
          );
        }),
      }))
      ?.filter((g) => g.species?.length > 0);
  }, [data, filterCoc, filterTemp, search]);

  const toggleGroup = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleAll = () => {
    const anyOpen = filteredGroups.some((g) => !collapsed[groupKey(g)]);
    const next: Record<string, boolean> = {};
    filteredGroups.forEach((g) => {
      next[groupKey(g)] = anyOpen;
    });
    setCollapsed(next);
  };

  const anyOpen = filteredGroups.some((g) => !collapsed[groupKey(g)]);
  const totalSpecies = filteredGroups.reduce((a, g) => a + g.species.length, 0);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
        <SearchX size={32} className="opacity-40" />
        <span className="text-sm">No data provided</span>
      </div>
    );
  }

  return (
    <div className="py-4 w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <span className="text-sm text-gray-500">
          {filteredGroups?.length} group{filteredGroups.length !== 1 ? "s" : ""}{" "}
          · {totalSpecies} species
        </span>
        <button
          onClick={toggleAll}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
        >
          {anyOpen ? <ChevronsDown size={14} /> : <ChevronsUp size={14} />}
          {anyOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-4">
        <div className="relative flex-1 min-w-40">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search species or element…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <select
          value={filterCoc}
          onChange={(e) => setFilterCoc(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
        >
          <option value="all">All COC</option>
          {uniqueCocs.map((c) => (
            <option key={c} value={c}>
              COC {c}
            </option>
          ))}
        </select>
        <select
          value={filterTemp}
          onChange={(e) => setFilterTemp(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
        >
          <option value="all">All temperatures</option>
          {uniqueTemps?.map((t) => (
            <option key={t} value={t}>
              {t}°C
            </option>
          ))}
        </select>
      </div>

      {/* Empty search result */}
      {filteredGroups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
          <SearchX size={28} className="opacity-40" />
          <span className="text-sm">No results found</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filteredGroups.map((g) => {
            const key = groupKey(g);
            const isOpen = !collapsed[key];
            const activeSpecies = g.species.filter(
              (s) => s.molality !== null && s.molality !== undefined,
            );
            const hasElement = activeSpecies.some((s) => s.element !== null);

            return (
              <div
                key={key}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(key)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <ChevronDown
                    size={15}
                    className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span className="flex-1 text-sm font-medium text-gray-800">
                    COC {g.coc} — {g.temperature}
                    {g.temp_unit}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      g.coc === 1
                        ? "bg-blue-50 text-blue-800"
                        : "bg-purple-50 text-purple-800"
                    }`}
                  >
                    COC {g.coc}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-green-50 text-green-800 flex items-center gap-1">
                    <Thermometer size={11} />
                    {g.temperature}°C
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 text-gray-500">
                    {activeSpecies.length} species
                  </span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <>
                    {/* Summary chips */}
                    <div className="flex gap-2 flex-wrap px-4 py-2 border-b border-gray-100 bg-white">
                      {activeSpecies.slice(0, 3).map((s) => (
                        <span
                          key={s.species}
                          className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-0.5 text-gray-600"
                        >
                          <span className="font-medium">{s.species}</span> m=
                          {formatNum(s.molality)}
                        </span>
                      ))}
                      {activeSpecies.length > 3 && (
                        <span className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-0.5 text-gray-500">
                          +{activeSpecies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-2 font-medium text-gray-500 whitespace-nowrap">
                              Species
                            </th>
                            <th className="text-left px-4 py-2 font-medium text-gray-500 whitespace-nowrap">
                              Molality (mol/kg)
                            </th>
                            <th className="text-left px-4 py-2 font-medium text-gray-500 whitespace-nowrap">
                              Activity
                            </th>
                            {hasElement && (
                              <th className="text-left px-4 py-2 font-medium text-gray-500 whitespace-nowrap">
                                Element
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {activeSpecies.map((s) => (
                            <tr
                              key={s.species}
                              className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-2 font-mono font-medium text-gray-800 whitespace-nowrap">
                                {s.species}
                              </td>
                              <td className="px-4 py-2 tabular-nums text-gray-600 whitespace-nowrap">
                                {formatNum(s.molality)}
                              </td>
                              <td className="px-4 py-2 tabular-nums text-gray-600 whitespace-nowrap">
                                {formatNum(s.activity)}
                              </td>
                              {hasElement && (
                                <td className="px-4 py-2">
                                  {s.element ? (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                                      {s.element}
                                    </span>
                                  ) : (
                                    <span className="text-gray-300 italic">
                                      —
                                    </span>
                                  )}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
