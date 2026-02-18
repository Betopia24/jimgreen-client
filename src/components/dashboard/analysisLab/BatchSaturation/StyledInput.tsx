interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const StyledInput: React.FC<StyledInputProps> = ({
  hasError,
  className = "",
  ...props
}) => (
  <input
    {...props}
    className={`
      w-full px-3.5 py-2.5 text-sm text-slate-700 bg-white
      border rounded-lg outline-none transition-all duration-150
      placeholder:text-slate-300
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10
      disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
      ${hasError ? "border-red-400 ring-2 ring-red-400/10" : "border-slate-200 hover:border-slate-300"}
      ${className}
    `}
  />
);

export default StyledInput;
