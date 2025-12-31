
'use client';

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-headingColor mb-1">
        {title}
      </h1>
      <p className="text-sm sm:text-base md:text-[16px] text-[#666666]">
        {description}
      </p>
    </div>
  );
}
