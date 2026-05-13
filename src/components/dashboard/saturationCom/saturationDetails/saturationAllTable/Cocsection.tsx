import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface EvaporationData {
  evaporation_rate_gpm: number;
  evaporation_factor_pct: number;
}

interface BlowdownData {
  blowdown_rate_gpm: number | null;
}

interface MakeupData {
  makeup_rate_gpm: number | null;
  drift_rate_gpm: number | null;
  drift_percent: number | null;
}

interface ChemicalData {
  product: string;
  dosage_ppm: number;
  million_lbs_blowdown_per_day: number | null;
  lbs_per_day: number | null;
  lbs_per_year: number | null;
  operating_days_per_year: number | null;
}

export interface CocEntry {
  coc: number;
  evaporation: EvaporationData;
  blowdown: BlowdownData;
  makeup: MakeupData;
  chemical: ChemicalData;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(value: number | null | undefined, decimals = 2): string | null {
  if (value == null) return null;
  return value.toFixed(decimals);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

type AccentColor = "blue" | "violet" | "cyan" | "emerald" | "amber";

const accentMap: Record<
  AccentColor,
  { bg: string; text: string; dot: string }
> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-400" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-400" },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
  },
  amber: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
};

function MetricCard({
  label,
  value,
  unit,
  accent = "blue",
}: {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
  accent?: AccentColor;
}) {
  const { bg, text, dot } = accentMap[accent];
  const hasValue = value != null;

  return (
    <div className="relative bg-white rounded-2xl border border-slate-100 p-4 shadow-sm overflow-hidden">
      {/* accent dot */}
      <span
        className={`absolute top-3 right-3 w-2 h-2 rounded-full ${hasValue ? dot : "bg-slate-200"}`}
      />
      <p className="text-xs font-medium text-slate-400 mb-1.5 leading-tight">
        {label}
      </p>
      {hasValue ? (
        <p className={`text-xl font-bold ${text}`}>
          {value}
          {unit && (
            <span className="text-xs font-medium text-slate-400 ml-1">
              {unit}
            </span>
          )}
        </p>
      ) : (
        <p className="text-lg font-semibold text-slate-200">—</p>
      )}
    </div>
  );
}

function Section({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        {badge && (
          <span className="text-xs font-medium bg-slate-100 text-slate-500 rounded-full px-2.5 py-0.5">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function DataTable({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <table className="w-full">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function TableRow({
  label,
  value,
  unit,
  highlight = false,
}: {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
  highlight?: boolean;
}) {
  const hasValue = value != null;
  return (
    <tr
      className={`border-b border-slate-50 last:border-0 ${highlight ? "bg-cyan-50/50" : ""}`}
    >
      <td className="px-4 py-2.5 text-sm text-slate-500">{label}</td>
      <td className="px-4 py-2.5 text-sm text-right">
        {hasValue ? (
          <span
            className={`font-semibold ${highlight ? "text-cyan-700" : "text-slate-700"}`}
          >
            {value}
            {unit && (
              <span className="text-slate-400 font-normal ml-1">{unit}</span>
            )}
          </span>
        ) : (
          <span className="text-slate-200 font-medium">—</span>
        )}
      </td>
    </tr>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M3 14h18M10 3v18M14 3v18"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-400">
        Select a CoC level to view details
      </p>
      <p className="text-xs text-slate-300 mt-1">
        Click any tab above to get started
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MainCocSection({ perCoc }: { perCoc: CocEntry[] }) {
  // null = no tab selected (off by default)
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const entry = activeTab !== null ? perCoc[activeTab] : null;
  const hasBlowdown = entry?.blowdown?.blowdown_rate_gpm != null;

  function handleTabClick(index: number) {
    // clicking the active tab collapses it back to off
    setActiveTab((prev) => (prev === index ? null : index));
  }

  return (
    <Section
      title="Per Cycle of Concentration"
      badge={`${perCoc.length} CoC levels`}
    >
      {/* ── Tab bar ── */}
      <div className="flex gap-1 px-6 pt-4 pb-0 border-b border-slate-100 overflow-x-auto">
        {perCoc.map((item, i) => {
          const isActive = activeTab === i;
          const missingBlowdown = item.blowdown.blowdown_rate_gpm == null;
          return (
            <button
              key={item.coc}
              onClick={() => handleTabClick(i)}
              className={`relative px-5 py-2.5 text-sm font-semibold rounded-t-xl border border-b-0 transition-all duration-200 whitespace-nowrap -mb-px ${
                isActive
                  ? "bg-white border-slate-200 text-cyan-600 shadow-sm z-10"
                  : "bg-slate-50 border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              }`}
            >
              CoC {item.coc}
              {missingBlowdown && (
                <span className="ml-1.5 text-[10px] text-amber-400 font-bold">
                  ⚠
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-cyan-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Content area ── */}
      {activeTab === null || entry === null ? (
        <EmptyState />
      ) : (
        <div className="p-6 space-y-6">
          {/* CoC warning — only shown when blowdown unavailable */}
          {!hasBlowdown && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                CoC must be <strong>greater than 1</strong> for blowdown,
                makeup, and chemical dosing calculations to be available. Values
                will appear automatically when CoC &gt; 1.
              </span>
            </div>
          )}

          {/* ── Metric cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard
              label="Evaporation Rate"
              value={fmt(entry.evaporation.evaporation_rate_gpm, 1)}
              unit="GPM"
              accent="blue"
            />
            <MetricCard
              label="Evaporation Factor"
              value={entry.evaporation.evaporation_factor_pct}
              unit="%"
              accent="violet"
            />
            <MetricCard
              label="Blowdown Rate"
              value={
                entry.blowdown.blowdown_rate_gpm != null
                  ? fmt(entry.blowdown.blowdown_rate_gpm)
                  : null
              }
              unit="GPM"
              accent="cyan"
            />
            <MetricCard
              label="Makeup Rate"
              value={
                entry.makeup.makeup_rate_gpm != null
                  ? fmt(entry.makeup.makeup_rate_gpm)
                  : null
              }
              unit="GPM"
              accent="emerald"
            />
            <MetricCard
              label="Drift Rate"
              value={entry.makeup.drift_rate_gpm ?? null}
              unit="GPM"
              accent="amber"
            />
            <MetricCard
              label="Drift %"
              value={entry.makeup.drift_percent ?? null}
              unit="%"
              accent="amber"
            />
            <MetricCard
              label="Lbs / Day"
              value={
                entry.chemical.lbs_per_day != null
                  ? fmt(entry.chemical.lbs_per_day)
                  : null
              }
              unit="lbs"
              accent="emerald"
            />
            <MetricCard
              label="Lbs / Year"
              value={
                entry.chemical.lbs_per_year != null
                  ? fmt(entry.chemical.lbs_per_year)
                  : null
              }
              unit="lbs"
              accent="emerald"
            />
          </div>

          {/* ── Detail tables ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DataTable title="Water Balance">
              <TableRow
                label="Evaporation Rate"
                value={fmt(entry.evaporation.evaporation_rate_gpm, 1)}
                unit="GPM"
              />
              <TableRow
                label="Blowdown Rate"
                value={
                  entry.blowdown.blowdown_rate_gpm != null
                    ? fmt(entry.blowdown.blowdown_rate_gpm)
                    : null
                }
                unit="GPM"
              />
              <TableRow
                label="Drift Rate"
                value={
                  entry.makeup.drift_rate_gpm != null
                    ? fmt(entry.makeup.drift_rate_gpm, 0)
                    : null
                }
                unit="GPM"
              />
              <TableRow
                label="Makeup Rate"
                value={
                  entry.makeup.makeup_rate_gpm != null
                    ? fmt(entry.makeup.makeup_rate_gpm)
                    : null
                }
                unit="GPM"
                highlight
              />
              <TableRow
                label="Drift %"
                value={
                  entry.makeup.drift_percent != null
                    ? `${entry.makeup.drift_percent}%`
                    : null
                }
              />
            </DataTable>

            <DataTable title="Chemical Dosing">
              <TableRow label="Product" value={entry.chemical.product} />
              <TableRow
                label="Dosage"
                value={`${entry.chemical.dosage_ppm} ppm`}
              />
              <TableRow
                label="M lbs Blowdown / Day"
                value={
                  entry.chemical.million_lbs_blowdown_per_day != null
                    ? fmt(entry.chemical.million_lbs_blowdown_per_day)
                    : null
                }
              />
              <TableRow
                label="Lbs / Day"
                value={
                  entry.chemical.lbs_per_day != null
                    ? fmt(entry.chemical.lbs_per_day)
                    : null
                }
                highlight
              />
              <TableRow
                label="Lbs / Year"
                value={
                  entry.chemical.lbs_per_year != null
                    ? fmt(entry.chemical.lbs_per_year)
                    : null
                }
                highlight
              />
              <TableRow
                label="Operating Days / Year"
                value={entry.chemical.operating_days_per_year ?? null}
              />
            </DataTable>
          </div>
        </div>
      )}
    </Section>
  );
}
