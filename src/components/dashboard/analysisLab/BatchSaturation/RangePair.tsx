import { Controller } from "react-hook-form";
import FormField from "./FormField";
import StyledInput from "./StyledInput";

interface RangePairProps {
  title: string;
  minName: string;
  maxName: string;
  minPlaceholder: string;
  maxPlaceholder: string;
  control: any;
  errors: any;
  icon: React.ReactNode;
  accentColor: string;
}

const RangePair: React.FC<RangePairProps> = ({
  title,
  minName,
  maxName,
  minPlaceholder,
  maxPlaceholder,
  control,
  errors,
  icon,
  accentColor,
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center"
        style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
      >
        {icon}
      </div>
      <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <FormField
        label="Minimum"
        placeholder={minPlaceholder}
        error={errors[minName]?.message}
      >
        <Controller
          name={minName}
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <StyledInput
              {...field}
              type="number"
              placeholder={minPlaceholder}
              hasError={!!errors[minName]}
            />
          )}
        />
      </FormField>
      <FormField
        label="Maximum"
        placeholder={maxPlaceholder}
        error={errors[maxName]?.message}
      >
        <Controller
          name={maxName}
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <StyledInput
              {...field}
              type="number"
              placeholder={maxPlaceholder}
              hasError={!!errors[maxName]}
            />
          )}
        />
      </FormField>
    </div>
  </div>
);

export default RangePair;
