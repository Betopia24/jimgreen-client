"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
    <h3 className="text-md font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

const BatchSaturationResults = () => {
  const router = useRouter();

  const data = useSelector(
    (state: RootState) => state.analysisLab.batchSimulation,
  );

  if (!data) {
    return (
      <div className="p-10 text-center text-gray-500">
        No Batch Saturation data found.
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          Batch Saturation Results
        </h1>
      </div>

      {/* Summary */}
      <Card title="Summary">
        <div className="text-sm text-gray-700 space-y-1">
          <p>Total Grid Points: {data.total_points}</p>
          <p>Database Used: {data.database_used}</p>
        </div>
      </Card>

      {/* Grid Points Table */}
      <Card title="Grid Points">
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 border">pH</th>
                <th className="px-3 py-2 border">CoC</th>
                <th className="px-3 py-2 border">Temp (°C)</th>
              </tr>
            </thead>
            <tbody>
              {data.grid_points.map((point: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{point.pH}</td>
                  <td className="px-3 py-2 border">{point.CoC}</td>
                  <td className="px-3 py-2 border">{point.temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Results Dynamic Rendering */}
      <Card title="Detailed Results">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.results.map((result: any, index: number) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 text-sm bg-gray-50"
            >
              <p className="font-semibold mb-2 text-gray-800">
                Grid: pH {result._grid_pH} | CoC {result._grid_CoC} | Temp{" "}
                {result._grid_temp}
              </p>

              <div className="space-y-1 text-gray-700">
                <p>Ionic Strength: {result.ionic_strength}</p>
                <p>Electrical Balance: {result.electrical_balance}</p>
                <p>
                  Charge Balance Error (%): {result.charge_balance_error_pct}
                </p>
                <p>Database Used: {result.database_used}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BatchSaturationResults;
