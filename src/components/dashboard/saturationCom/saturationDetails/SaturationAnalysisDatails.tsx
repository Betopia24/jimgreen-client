"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SaturationDashboard from "@/app/testing/__comp/ThreeD";
import CoolingTowerTable from "./saturationAllTable/Coolingtowertable ";
import GridOverviewTable, {
  GridRow,
} from "./saturationAllTable/GridOverviewTable";

import CorssosionRateTable from "./saturationAllTable/CorroesionRates";
import ChemicalDosageTable, {
  ChemicalDosageItem,
} from "./saturationAllTable/ChemicalDosageTable";
import DescriptionSolutionTable, {
  DescriptionSolutionItem,
} from "./saturationAllTable/DescriptionSolutionTable";
import WaterBalanceTable, {
  WaterBalanceItem,
} from "./saturationAllTable/WaterBalanceTable";
import DepositionIndicesTable, {
  DepositionIndicesItem,
} from "./saturationAllTable/DepositionIndicesTable";
import SaturationIndicesTable, {
  SaturationItem,
} from "./saturationAllTable/SaturationIndicesTable";
import DistributionOfSpeciesTable, {
  DistributionItem,
} from "./saturationAllTable/DistributionOfSpeciesTable";

// ==================== FULL TYPE DEFINITIONS ====================

interface AllTallTable {
  grid_overview: GridRow[];
  saturation_indices: SaturationItem[];
  corrosion_rates: [];
  chemical_dosage: ChemicalDosageItem[];
  description_of_solution: DescriptionSolutionItem[];
  water_balance: WaterBalanceItem[];
  deposition_indices: DepositionIndicesItem[];

  distribution_of_species: DistributionItem[];
}
interface AssetInfo {
  name: string;
  type: string;
  towerType: string;
  systemVolume: number;
  systemMetallurgy: string[];
  systemMaterials: string[];
  recirculationRate: number;
  recirculationRateType: string;
  systemVolumeType: string;
}

interface Summary {
  green: number;
  yellow: number;
  red: number;
  error: number;
}

interface AiResponse {
  run_id: string;
  salt_id: string | null;
  salts_of_interest: string[];
  dosage_ppm: number;
  coc_min: number;
  coc_max: number;
  temp_min: number;
  temp_max: number;
  temp_unit: string;
  ph_mode: string;
  fixed_ph: number;
  balance_cation: string;
  balance_anion: string;
  database_used: string;
  total_grid_points: number;
  summary: Summary;
  asset_info: AssetInfo;
  created_at: string;
  cooling_tower_analysis: {};
  table_data: AllTallTable;
}

interface SaturationAnalysisData {
  id: string;
  name: string;
  aiResponse: AiResponse;
  inputConfig: {
    base_water_parameters: Record<
      string,
      { value: number | string; unit: string }
    >;
    asset_info: AssetInfo & {
      supplyTemperature?: number;
      returnTemperature?: number;
    };
  };
}

// ==================== COMPONENT ====================

const SaturationAnalysisDetails: React.FC = () => {
  const data = useSelector(
    (state: RootState) => state.analysis.saturationAnalysis,
  ) as SaturationAnalysisData | null;

  if (!data?.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Loading Saturation Analysis...
          </p>
        </div>
      </div>
    );
  }

  // ✅ FIX: Pull fields from aiResponse, not from data directly
  const aiResponse = data.aiResponse;
  console.log(aiResponse);
  const asset_info = aiResponse.asset_info;
  const inputConfig = data.inputConfig;

  const {
    run_id,
    salt_id,
    dosage_ppm,
    coc_min,
    coc_max,
    temp_min,
    temp_max,
    temp_unit,
    ph_mode,
    balance_cation,
    balance_anion,
    database_used,
    summary,
    created_at,
    total_grid_points,
  } = aiResponse;

  const formatDate = (date: string): string =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const statusColors: Record<string, string> = {
    green: "bg-emerald-500 text-white",
    yellow: "bg-amber-500 text-white",
    red: "bg-red-500 text-white",
    error: "bg-gray-400 text-white",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Created
              </p>
              <p className="font-medium text-gray-700">
                {formatDate(created_at)}
              </p>
            </div>
          </div>
        </div>
        {/* Asset Info + Materials */}
        <div className="grid grid-cols-1 -2 gap-6">
          <div className="bg-white rounded-3xl shadow-sm border p-7">
            <h2 className="text-xl font-semibold mb-5">Asset Information</h2>
            <div className="space-y-4">
              {[
                ["Name", asset_info.name],
                ["Type", asset_info.type],
                ["Tower", asset_info.towerType],
                [
                  "Volume",
                  `${asset_info.systemVolume} ${asset_info.systemVolumeType}`,
                ],
                [
                  "Recirculation",
                  `${asset_info.recirculationRate}  ${asset_info.recirculationRateType}`,
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border p-7">
            <h2 className="text-xl font-semibold mb-5">Materials</h2>
            <div className="flex flex-wrap gap-2">
              {asset_info.systemMetallurgy.map((m, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-2xl text-sm"
                >
                  {m}
                </span>
              ))}
              {asset_info.systemMaterials.map((m, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-amber-100 text-amber-800 rounded-2xl text-sm"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Analysis Config */}
        {/* 3D Dashboard */}
        <DistributionOfSpeciesTable
          data={aiResponse?.table_data?.distribution_of_species}
        />
        <DepositionIndicesTable
          data={aiResponse?.table_data?.deposition_indices}
        />
        <DescriptionSolutionTable
          data={aiResponse?.table_data?.description_of_solution}
        />
        <WaterBalanceTable data={aiResponse?.table_data?.water_balance} />
        <ChemicalDosageTable data={aiResponse?.table_data?.chemical_dosage} />
        <SaturationIndicesTable
          data={aiResponse?.table_data?.saturation_indices}
        />
        <CorssosionRateTable data={aiResponse?.table_data?.corrosion_rates} />
        <GridOverviewTable
          grid_overview={{
            salt_id: "CaCO3",
            temp_unit: "°C",
            rows: aiResponse?.table_data?.grid_overview, // ← pass your array here
          }}
        />
        <CoolingTowerTable data={aiResponse?.cooling_tower_analysis as any} />
        <SaturationDashboard apiResponse={aiResponse as any} />
        {/* Footer */}
        <div className="text-center text-xs text-gray-400 py-6">
          Database: {database_used} • pH Mode: {ph_mode} • Balance:{" "}
          {balance_cation} / {balance_anion}
        </div>
      </div>
    </div>
  );
};

export default SaturationAnalysisDetails;
