import RangePair from "./RangePair";
import SectionCard from "./SectionCard";

// ── Shared range section renderer
const RenderRangeSection = (control: any, errors: any) => (
  <SectionCard title="Simulation Range Builder">
    <div className="space-y-6">
      <RangePair
        title="pH Range"
        minName="ph_range_min"
        maxName="ph_range_max"
        minPlaceholder="6.5"
        maxPlaceholder="8.5"
        control={control}
        errors={errors}
        accentColor="#3B82F6"
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        }
      />
      <div className="h-px bg-slate-50" />
      <RangePair
        title="Cycles of Concentration Range"
        minName="coc_range_min"
        maxName="coc_range_max"
        minPlaceholder="2.0"
        maxPlaceholder="6.0"
        control={control}
        errors={errors}
        accentColor="#10B981"
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        }
      />
      <div className="h-px bg-slate-50" />
      <RangePair
        title="Temperature Range (°F)"
        minName="temp_range_min"
        maxName="temp_range_max"
        minPlaceholder="27"
        maxPlaceholder="100"
        control={control}
        errors={errors}
        accentColor="#F59E0B"
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
          </svg>
        }
      />
    </div>
  </SectionCard>
);

export default RenderRangeSection;
