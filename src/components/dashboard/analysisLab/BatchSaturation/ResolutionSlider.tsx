interface ResolutionSliderProps {
  value: number;
  onChange: (v: number) => void;
}

const resolutionLabels: Record<number, string> = {
  1: "Low Resolution",
  2: "Low-Medium",
  3: "Medium Resolution",
  4: "Medium-High",
  5: "High Resolution",
};

const resolutionColors: Record<number, string> = {
  1: "#6B7280",
  2: "#10B981",
  3: "#F59E0B",
  4: "#EF4444",
  5: "#8B5CF6",
};

const ResolutionSlider: React.FC<ResolutionSliderProps> = ({
  value,
  onChange,
}) => {
  const label = resolutionLabels[value] ?? "Medium Resolution";
  const color = resolutionColors[value] ?? "#F59E0B";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Simulation Precision
        </span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ color, backgroundColor: `${color}18` }}
        >
          {label}
        </span>
      </div>

      <div className="relative pt-1">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - 1) / 4) * 100}%, #E2E8F0 ${((value - 1) / 4) * 100}%, #E2E8F0 100%)`,
          }}
        />
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: white;
            border: 2.5px solid ${color};
            box-shadow: 0 1px 6px rgba(0,0,0,0.15);
            cursor: pointer;
            transition: transform 0.1s, box-shadow 0.1s;
          }
          input[type=range]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          }
          input[type=range]:focus { outline: none; }
        `}</style>

        <div className="flex justify-between mt-2 px-0.5">
          {["Low", "", "Medium", "", "High"].map((tick, i) => (
            <span
              key={i}
              className={`text-[10px] font-medium ${i + 1 === value ? "text-slate-700" : "text-slate-300"}`}
            >
              {tick || "·"}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-100 rounded-lg">
        <span className="text-amber-500 mt-0.5 shrink-0">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </span>
        <p className="text-[11px] text-amber-700 leading-relaxed">
          Higher resolution increases simulation accuracy but requires longer
          processing time. <strong>Medium resolution</strong> is recommended for
          most analyses.
        </p>
      </div>
    </div>
  );
};

export default ResolutionSlider;
