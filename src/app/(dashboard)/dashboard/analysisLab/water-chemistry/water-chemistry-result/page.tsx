"use client";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

function WaterChemistryResult() {
  const analysislabData = useSelector(
    (state: RootState) => state.analysisLab.analysisLabData
  );

  const results = Array.isArray(analysislabData?.data?.data)
    ? analysislabData?.data?.data
    : analysislabData?.data?.data
      ? [analysislabData?.data?.data]
      : [];

  // Map of risk_level to badge color
  const riskColor = (risk: string) => {
    if (risk === "High Corrosion" || risk === "Corrosive" || risk === "High")
      return "bg-red-500";
    if (risk === "Medium") return "bg-yellow-500";
    if (risk === "Balanced") return "bg-green-500";
    return "bg-gray-400"; // Unknown / default
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Water Chemistry Analysis Result
        </h1>

        {results.length === 0 && (
          <div className="text-center text-gray-500 bg-white p-6 rounded-xl shadow">
            No analysis data available.
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, index) => {
            // Get all keys of the object (parameters)
            return Object.entries(item).map(([key, value]: any) => {
              if (!value) return null; // skip empty data

              // Some parameters use "risk_level", some just "risk"
              const riskText = value.risk_level || value.risk || "Unknown";

              return (
                <div
                  key={`${index}-${key}`}
                  className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 mb-6 hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold text-indigo-600 mb-3 capitalize">
                    {key.replace("_", " ")}
                  </h2>

                  <div className="space-y-2 text-gray-700">
                    {/* Dynamic rendering */}
                    {Object.entries(value).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="font-medium capitalize">{k.replace("_", " ")}:</span>
                        <span>{v !== null ? String(v) : "-"}</span>
                      </div>
                    ))}

                    <div className="mt-2">
                      <span className="font-medium">Risk Level:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${riskColor(
                          riskText
                        )}`}
                      >
                        {riskText}
                      </span>
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default WaterChemistryResult;
