interface FormFieldProps {
  label: string;
  unit?: string;
  placeholder: string;
  tooltip?: string;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  unit,
  placeholder: _placeholder,
  tooltip,
  error,
  children,
}) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-1.5">
      <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
        {label}
        {unit && (
          <span className="ml-1 text-slate-400 font-normal normal-case">
            ({unit})
          </span>
        )}
      </label>
      {tooltip && (
        <div className="group relative">
          <span className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-500 text-[9px] flex items-center justify-center cursor-help font-bold leading-none">
            ?
          </span>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-slate-800 text-white text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
            {tooltip}
          </div>
        </div>
      )}
    </div>
    {children}
    {error && (
      <span className="text-[11px] text-red-500 font-medium">{error}</span>
    )}
  </div>
);

export default FormField;
