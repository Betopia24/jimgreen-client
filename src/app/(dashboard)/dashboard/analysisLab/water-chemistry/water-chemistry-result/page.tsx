

"use client";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import { GoArrowLeft } from "react-icons/go";

// Recursive function to render objects
const renderObject = (obj: any) => {
  return Object.entries(obj).map(([k, v]) => {
    if (v && typeof v === "object") {
      return (
        <div key={k} className="pl-4 border-l border-gray-200 mb-2">
          <span className="font-medium capitalize">{k.replace("_", " ")}:</span>
          <div className="mt-1">{renderObject(v)}</div>
        </div>
      );
    } else {
      return (
        <div key={k} className="flex justify-between mb-1">
          <span className="font-medium capitalize">{k.replace("_", " ")}:</span>
          <span>{v !== null ? String(v) : "-"}</span>
        </div>
      );
    }
  });
};

function WaterChemistryResult() {
  const analysislabData : any = useSelector(
    (state: RootState) => state.analysisLab.analysisLabData
  );

  const results = Array.isArray(analysislabData?.data?.data) 
    ? analysislabData?.data?.data
    : analysislabData?.data?.data
      ? [analysislabData?.data?.data]
      : [];

  // console.log(results, "==================")

  // Map of risk_level to badge color
  // const riskColor = (risk: string) => {
  //   if (risk === "High Corrosion" || risk === "Corrosive" || risk === "High")
  //     return "bg-red-500";
  //   if (risk === "Medium") return "bg-yellow-500";
  //   if (risk === "Balanced") return "bg-green-500";
  //   return "bg-gray-400"; // Unknown / default
  // };

  const riskColor = (risk: string) => {
    if (
      risk === "High Corrosion" ||
      risk === "Corrosive" ||
      risk === "High" ||
      risk === "High Scale Risk" ||
      risk === "Scale Forming"
    )
      return "bg-red-500";

    if (risk === "Medium") return "bg-yellow-500";

    if (risk === "Balanced") return "bg-green-500";

    return "bg-gray-400"; // Unknown / default
  };


  return (
    <div>
      <div className="flex items-center gap-2">
        <Link href="/dashboard/analysisLab/water-chemistry"><GoArrowLeft size={25} className="mb-7" /></Link>
        <PageHeader title="Water Chemistry Analysis Results" description="Analysis completed on February 17, 2026" />
      </div>

      {results.length === 0 && (
        <div className="text-center text-gray-500 bg-white p-6 rounded-xl shadow">
          No analysis data available.
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item : any, index : number) =>
          Object.entries(item).map(([key, value]: any) => {
            if (!value) return null;

            const riskText = value.risk_level || value.risk || "Unknown";

            return (
              <div
                key={`${index}-${key}`}
                className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 mb-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-indigo-600 mb-3 capitalize">
                  {key.replace("_", " ")}
                </h2>

                <div className="text-gray-700 space-y-2">
                  {renderObject(value)}

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
          })
        )}
      </div>
    </div>
  );
}

export default WaterChemistryResult;
