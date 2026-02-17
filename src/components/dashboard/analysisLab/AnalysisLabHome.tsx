

"use client";

import { useState } from "react";
import { FaTint, FaWind, FaThLarge, FaExclamationTriangle } from "react-icons/fa";
import PageHeader from "../PageHeader";
import Link from "next/link";

const cards = [
  {
    id: 1,
    title: "Water Chemistry Analysis",
    description:
      "Analyze saturation indices, scaling potential, and chemical balance using detailed water parameters.",
    route: "/dashboard/analysisLab/water-chemistry",
    icon: <FaTint size={20} className="text-white" />,
    iconBg: "from-blue-500 to-blue-700",
    iconShadow: "shadow-blue-300",
  },
  {
    id: 2,
    title: "Cooling Tower Performance",
    description:
      "Evaluate thermal efficiency, evaporation loss, blowdown rate, and cooling capacity.",
    route: "/dashboard/analysisLab/cooling-tower",
    icon: <FaWind size={20} className="text-white" />,
    iconBg: "from-violet-500 to-violet-700",
    iconShadow: "shadow-violet-300",
  },
  {
    id: 3,
    title: "Batch Saturation Simulation",
    description:
      "Simulate multiple operating conditions across pH, temperature, and concentration cycles to predict system behavior.",
    route: "/dashboard/analysisLab/batch-simulation",
    icon: <FaThLarge size={18} className="text-white" />,
    iconBg: "from-orange-400 to-orange-600",
    iconShadow: "shadow-orange-300",
  },
  {
    id: 4,
    title: "Corrosion Rate Prediction",
    description:
      "Predict corrosion risk for system metals based on chemistry and inhibitor presence.",
    route: "/dashboard/analysisLab/corrosion-rate",
    icon: <FaExclamationTriangle size={19} className="text-white" />,
    iconBg: "from-red-400 to-red-600",
    iconShadow: "shadow-red-300",
  },
];

export default function AnalysisLabHome() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div>
      <div>
        <PageHeader title='Analysis Lab' description='Select a modeling tool to analyze your system performance, chemistry balance, and operational risk.' />
      </div>
      <div className="py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {cards.map((card) => {
            const isHovered = hoveredId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`bg-white rounded-2xl p-6 flex flex-col gap-3 border border-gray-100 transition-all duration-200 cursor-default
                ${isHovered ? "shadow-xl -translate-y-1" : "shadow-sm"}`}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${card.iconBg} shadow-lg ${card.iconShadow}`}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-bold text-gray-900 leading-snug tracking-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[13.5px] text-gray-500 leading-relaxed flex-grow">
                  {card.description}
                </p>

                {/* Button */}
                <Link href={card.route}>
                  <button
                    className="mt-2 w-full bg-blue-800 hover:bg-blue-900 active:scale-[0.98] active:bg-blue-950 text-white text-sm font-semibold rounded-lg py-[10px] flex items-center justify-center gap-2 transition-all duration-150 tracking-wide cursor-pointer"
                  >
                    Start Analysis
                    <span className="text-base">→</span>
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}