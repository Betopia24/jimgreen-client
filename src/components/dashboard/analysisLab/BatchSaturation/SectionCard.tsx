const SectionCard: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = "" }) => (
  <div
    className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden ${className}`}
  >
    <div className="px-5 py-4 border-b border-slate-50">
      <h3 className="text-base font-bold text-slate-800 tracking-tight">
        {title}
      </h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

export default SectionCard;
