

"use client";

import Image from "next/image";
import React from "react";
import ScoreCard from "../../analysisInput/detailsComonents/ScoreCard";
import { format } from "date-fns";

const badge = (status: string) => {
  const s = status?.toLowerCase();

  if (["passed", "safe", "low", "optimal", "good"].includes(s))
    return "bg-green-100 text-green-600";

  if (["failed", "critical"].includes(s)) return "bg-red-100 text-red-600";

  if (["pending", "warning"].includes(s))
    return "bg-yellow-100 text-yellow-600";

  return "bg-gray-100 text-gray-600";
};

export const Section = ({ title, children }: any) => (
  <div className="bg-white rounded-xl shadow border p-6 space-y-4">
    <h2 className="text-xl font-semibold border-b pb-2">{title}</h2>
    {children}
  </div>
);
const InfoItem = ({ label, value }: any) => (
  <div className="bg-gray-50 p-4 rounded-lg border">
    <p className="text-gray-500 text-xs">{label}</p>
    <p className="font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);

const InfoCard = ({ label, value }: any) => (
  <div className="bg-gray-50 border rounded-lg p-4">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value ?? "N/A"}</p>
  </div>
);

// Contamination Risk===============================

const RiskTable = ({ title, data }: any) => (
  <div className="mb-8">
    <h3 className="font-semibold text-lg mb-3">{title}</h3>

    <div className="overflow-auto border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-left">Contaminant</th>
            <th className="p-2 border text-center">Value</th>
            <th className="p-2 border text-center">Threshold</th>
            <th className="p-2 border text-center">Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, i: number) => (
            <tr key={i} className="hover:bg-gray-50 text-center">
              <td className="border p-2 text-left font-medium">
                {item.contaminant_name.replaceAll("_", " ")}
              </td>
              <td className="border p-2">
                {item.value} {item.unit}
              </td>
              <td className="border p-2">
                {item.threshold} {item.unit}
              </td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.risk_level === "Critical"
                      ? "bg-red-100 text-red-600"
                      : item.risk_level === "Moderate"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.risk_level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RiskCard = ({ label, value, highlight }: any) => (
  <div className="bg-gray-50 border rounded-xl p-4">
    <p className="text-xs text-gray-500">{label}</p>
    <p
      className={`font-bold text-lg ${
        highlight
          ? value === "Critical"
            ? "text-red-600"
            : value === "Moderate"
              ? "text-yellow-600"
              : "text-green-600"
          : "text-gray-800"
      }`}
    >
      {value ?? "N/A"}
    </p>
  </div>
);

// ============================ Main Component =============================

const ShowAllReportDetailsData = ({
  reportDetailsData,
}: {
  reportDetailsData: any;
}) => {
  // const report = data?.data.waterReport;
  const report = reportDetailsData?.data?.waterReport;

  return (
    <div className="space-y-6">
      {/* GRAPH */}
      {/* <GraphSection report={report} id={analysisViewData.id} /> */}

      <div className="relative w-full aspect-[16/9] overflow-auto border rounded-lg bg-white">
        <Image
          src={reportDetailsData?.data?.waterReport?.parameter_graph?.graph_url}
          alt="Parameter Comparison Graph"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw,
           (max-width: 1200px) 80vw,
           1200px"
          priority
        />
      </div>

      {/* CUSTOMER INFO */}
      {/* <Section title="Customer Information">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {Object.entries(data?.data?.customer || {}).map(([key, value]) => (
            <div key={key}>
              <span className="font-medium capitalize">{key}: </span>
              {String(value)}
            </div>
          ))}
        </div>
      </Section> */}

      {/* REPORT META */}
      <Section title="Report Information">
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <InfoItem label="Report ID" value={report?.report_id} />
          <InfoItem
            label="Test Date"
            value={
              report?.created_at
                ? format(new Date(report.created_at), "dd MMM yyyy, hh:mm a")
                : "N/A"
            }
          />
        </div>
      </Section>

      {/* EXTRACTED PARAMETERS */}
      <Section title="Extracted Parameters">
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(report?.extracted_parameters || {}).map(
            ([name, val]: any) => (
              <div key={name} className="border rounded p-3">
                <p className="font-medium">{name}</p>
                <p>
                  {val.value} {val.unit}
                </p>
              </div>
            ),
          )}
        </div>
      </Section>

      <Section title="Chemical Analysis Report">
        {/* 1️⃣ INPUT PARAMETERS TABLE */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Input Parameters</h3>
          <div className="overflow-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border text-left">Parameter</th>
                  <th className="p-2 border text-center">Value</th>
                  <th className="p-2 border text-center">Unit</th>
                  <th className="p-2 border text-center">Detection Limit</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  report?.chemical_status?.input_parameters || {},
                ).map(([name, param]: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border p-2 font-medium">
                      {name.replaceAll("_", " ")}
                    </td>
                    <td className="border p-2 text-center">{param.value}</td>
                    <td className="border p-2 text-center">
                      {param.unit || "-"}
                    </td>
                    <td className="border p-2 text-center">
                      {param.detection_limit ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2️⃣ SOLUTION PARAMETERS */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-3">Solution Parameters</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(
              report?.chemical_status?.solution_parameters || {},
            ).map(([key, value]: any, i: number) => (
              <div key={i} className="bg-gray-50 border rounded-lg p-4">
                <p className="text-xs text-gray-500 capitalize">
                  {key.replaceAll("_", " ")}
                </p>
                <p className="font-semibold text-gray-800">{value ?? "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3️⃣ BALANCE INFORMATION */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-3">
            Charge & Electrical Balance
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <InfoCard
              label="Charge Balance Error"
              value={report?.chemical_status?.charge_balance_error}
            />
            <InfoCard
              label="Electrical Balance"
              value={report?.chemical_status?.electrical_balance}
            />
            <InfoCard
              label="Ionic Strength"
              value={report?.chemical_status?.ionic_strength}
            />
          </div>
        </div>

        {/* 4️⃣ DATABASE INFO */}
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-3">Database Information</h3>
          <div className="bg-gray-50 border rounded-lg p-4">
            <p className="text-sm">
              <span className="font-medium">Database Used:</span>{" "}
              {report?.chemical_status?.database_used}
            </p>
          </div>
        </div>
      </Section>

      {/* TOTAL SCORE */}
      <Section title="Total Score">
        <div className="space-y-4">
          <div>
            Overall Score:{" "}
            <span className="font-bold">
              {report?.total_score?.overall_score}/
              {report?.total_score?.max_score}
            </span>
            <span
              className={`ml-3 px-2 py-1 rounded text-sm ${badge(
                report?.total_score?.rating,
              )}`}
            >
              {report?.total_score?.rating}
            </span>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {report?.total_score?.components?.map((comp: any, i: number) => (
              <div key={i} className="bg-gray-50 p-4 rounded text-center">
                <p>{comp.name}</p>
                <p className="font-bold">
                  {comp.score}/{comp.max_score}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* QUALITY REPORT */}
      <Section title="Quality Assessment Summary">
        <div className="grid md:grid-cols-3 gap-6">
          {/* 1️⃣ Water Quality Index */}
          <ScoreCard
            title="Water Quality Index"
            score={report?.quality_report?.water_quality_index?.score}
            maxScore={report?.quality_report?.water_quality_index?.max_score}
            rating={report?.quality_report?.water_quality_index?.rating}
          />

          {/* 2️⃣ Compliance Score */}
          <ScoreCard
            title="Compliance Score"
            score={report?.quality_report?.compliance_score?.score}
            maxScore={100}
            rating={report?.quality_report?.compliance_score?.rating}
            percentage
          />

          {/* 3️⃣ Risk Factor */}
          <ScoreCard
            title="Risk Factor"
            score={report?.quality_report?.risk_factor?.score}
            maxScore={report?.quality_report?.risk_factor?.max_score}
            rating={report?.quality_report?.risk_factor?.severity}
            danger
          />
        </div>
      </Section>

      {/* CHEMICAL COMPOSITION */}
      <Section title="Chemical Composition">
        <div className="overflow-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Value</th>
                <th className="p-2 border">Unit</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Symbol</th>
                <th className="p-2 border">Formula</th>
              </tr>
            </thead>
            <tbody>
              {report?.chemical_composition?.parameters?.map(
                (p: any, i: number) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{p.parameter_name}</td>
                    <td className="border p-2">{p.value}</td>
                    <td className="border p-2">{p.unit}</td>
                    <td className="border p-2">{p.category}</td>
                    <td className="border p-2">{p.chemical_symbol}</td>
                    <td className="border p-2">{p.chemical_formula}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* BIOLOGICAL */}
      <Section title="Biological Indicators">
        {report?.biological_indicators?.indicators?.map(
          (bio: any, i: number) => (
            <div key={i} className="flex justify-between border-b pb-2">
              <span>{bio.indicator_name}</span>
              <span
                className={`px-2 py-1 rounded text-xs ${badge(bio.status)}`}
              >
                {bio.status}
              </span>
            </div>
          ),
        )}
      </Section>

      {/* COMPLIANCE TABLE */}
      <Section title="Compliance Checklist">
        <div className="overflow-auto">
          <table className="min-w-full text-xs border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Parameter</th>
                <th className="border p-2">Standard</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actual</th>
                <th className="border p-2">Required</th>
              </tr>
            </thead>
            <tbody>
              {report?.compliance_checklist?.items?.map(
                (item: any, i: number) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{item.parameter}</td>
                    <td className="border p-2">{item.standard}</td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${badge(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="border p-2">{item.actual_value}</td>
                    <td className="border p-2">{item.required_value}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* CONTAMINATION RISK */}
      {/* CONTAMINATION RISK */}
      <Section title="Contamination Risk Assessment">
        {/* 🔴 Overall Risk Summary */}
        <div className="mb-8 grid md:grid-cols-4 gap-4">
          <RiskCard
            label="Overall Severity"
            value={report?.contamination_risk?.overall_severity}
            highlight
          />
          <RiskCard
            label="Contamination Score"
            value={report?.contamination_risk?.contamination_score}
          />
          <RiskCard
            label="Risk Score"
            value={report?.contamination_risk?.risk_score}
          />
          <RiskCard label="Score Scale" value="0 = Safe | 10 = Critical" />
        </div>

        {/* 🧪 Heavy Metals */}
        {report?.contamination_risk?.heavy_metals?.length > 0 && (
          <RiskTable
            title="Heavy Metals"
            data={report?.contamination_risk?.heavy_metals}
          />
        )}

        {/* 🦠 Microbiological */}
        {report?.contamination_risk?.microbiological?.length > 0 && (
          <RiskTable
            title="Microbiological Contaminants"
            data={report?.contamination_risk?.microbiological}
          />
        )}

        {/* 🧫 Organic Compounds */}
        {report?.contamination_risk?.organic_compounds?.length > 0 && (
          <RiskTable
            title="Organic Compounds"
            data={report?.contamination_risk?.organic_compounds}
          />
        )}
      </Section>
    </div>
  );
};

export default ShowAllReportDetailsData;
