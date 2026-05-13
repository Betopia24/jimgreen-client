"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AssetSummaryProps {
  data: {
    asset_information: {
      name: string;
      type: string;
      tower_type: string;
      fill_type: string;
      recirculation_rate_gpm: number;
      return_temperature: number;
      return_temperature_unit: string;
      supply_temperature: number;
      supply_temperature_unit: string;
      system_volume: number;
      draft_type?: string | null;
    };

    cooling_tower_analysis: {
      recirculation_rate_gpm: number;
      hot_water_temp_f: number;
      cold_water_temp_f: number;
      wet_bulb_temp_f?: number | null;
      skin_temp_f?: number;
    };

    materials: {
      metallurgy: string[];
      system_materials: string[];
    };
  };

  title?: string;
}

export default function AssetSummaryTable({
  data,
  title = "Asset Information | Cooling Tower Analysis | Materials",
}: AssetSummaryProps) {
  const [collapsed, setCollapsed] = useState(false);

  const asset = data.asset_information;
  const cooling = data.cooling_tower_analysis;
  const materials = data.materials;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b"
      >
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            <p className="text-xs text-gray-500">Cooling Tower Information</p>
          </div>
        </div>

        {/* Collapse */}
        <button className="p-2 rounded-lg hover:bg-gray-200 transition">
          <ChevronDown
            className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
              collapsed ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Body */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          collapsed ? "max-h-0 opacity-0" : "max-h-[5000px] opacity-100"
        }`}
      >
        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Information */}
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-3 uppercase tracking-wide">
                Asset Information
              </h3>

              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                  <tbody>
                    {[
                      ["Asset Name", asset.name],
                      ["Type", asset.type],
                      ["Tower Type", asset.tower_type],
                      ["Fill Type", asset.fill_type],
                      ["Draft Type", asset.draft_type || "—"],
                      [
                        "Recirculation Rate",
                        `${asset.recirculation_rate_gpm} GPM`,
                      ],
                      [
                        "Return Temperature",
                        `${asset.return_temperature}${asset.return_temperature_unit}`,
                      ],
                      [
                        "Supply Temperature",
                        `${asset.supply_temperature}${asset.supply_temperature_unit}`,
                      ],
                      ["System Volume", `${asset.system_volume} Gallons`],
                    ].map(([label, value], index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3 border-b font-semibold text-gray-700 w-[280px]">
                          {label}
                        </td>

                        <td className="px-4 py-3 border-b text-gray-800">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cooling Tower Analysis */}
            <div>
              <h3 className="text-sm font-bold text-orange-700 mb-3 uppercase tracking-wide">
                Cooling Tower Analysis
              </h3>

              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                  <tbody>
                    {[
                      [
                        "Recirculation Rate",
                        `${cooling.recirculation_rate_gpm} GPM`,
                      ],
                      [
                        "Hot Water Temperature",
                        `${cooling.hot_water_temp_f}°F`,
                      ],
                      [
                        "Cold Water Temperature",
                        `${cooling.cold_water_temp_f}°F`,
                      ],
                      [
                        "Wet Bulb Temperature",
                        cooling.wet_bulb_temp_f
                          ? `${cooling.wet_bulb_temp_f}°F`
                          : "—",
                      ],
                      [
                        "Skin Temperature",
                        cooling.skin_temp_f ? `${cooling.skin_temp_f}°F` : "—",
                      ],
                    ].map(([label, value], index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-3 border-b font-semibold text-gray-700 w-[280px]">
                          {label}
                        </td>

                        <td className="px-4 py-3 border-b text-gray-800">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Materials */}
          <div>
            <h3 className="text-sm font-bold text-green-700 mb-3 uppercase tracking-wide">
              Materials
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Metallurgy */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Metallurgy</h4>

                <div className="flex flex-wrap gap-2">
                  {materials.metallurgy.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* System Materials */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-3">
                  System Materials
                </h4>

                <div className="flex flex-wrap gap-2">
                  {materials.system_materials.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
