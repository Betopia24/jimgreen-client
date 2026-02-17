import { useForm, Controller } from "react-hook-form";
import SectionCard from "./SectionCard";
import ResolutionSlider from "./ResolutionSlider";
// ── Shared grid resolution section
const RenderGridResolution = (control: any) => (
  <SectionCard title="Grid Resolution">
    <Controller
      name="grid_resolution"
      control={control}
      render={({ field }) => (
        <ResolutionSlider value={field.value} onChange={field.onChange} />
      )}
    />
  </SectionCard>
);

export default RenderGridResolution;
