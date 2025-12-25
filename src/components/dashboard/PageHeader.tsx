'use client';

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
      <div className="py-6">
        <h1 className="text-3xl font-bold text-headingColor mb-1">
          {title}
        </h1>
        <p className="text-[16px] text-[#666666]">
          {description}
        </p>
      </div>
  );
}
