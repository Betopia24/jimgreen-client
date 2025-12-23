"use client";

import React from "react";
import { IconType } from "react-icons";

interface StatsCardProps {
  icon: IconType;
  number: string;
  label: string;
  iconBgColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  number,
  label,
  iconBgColor = "rgba(22,128,206,0.1)",
}) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className="flex justify-center items-center rounded-full mb-4"
        style={{
          width: "60px",
          height: "60px",
          padding: "16px",
          backgroundColor: iconBgColor,
        }}
      >
        <Icon size={32} />
      </div>
      <h6 className="text-[var(--Common-2,#101010)] text-center font-rubik text-2xl sm:text-3xl md:text-4xl font-medium leading-normal">
        {number}
      </h6>
      <p className="text-[var(--Font-Colors-Body,#636F85)] text-center font-rubik text-base sm:text-lg md:text-xl leading-normal mt-1">
        {label}
      </p>
    </div>
  );
};

export default StatsCard;
