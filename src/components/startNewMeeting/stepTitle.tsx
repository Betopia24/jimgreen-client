"use client";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function StepTitle({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-[#2D2D2D]">{title}</h2>
      {subtitle && (
        <p className="text-[16px] text-[#636F85] mt-1">{subtitle}</p>
      )}
    </div>
  );
}
