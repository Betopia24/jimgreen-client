"use client";
import React, { useState } from "react";
import {
  Activity,
  Shield,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileText,
  Droplets,
} from "lucide-react";
import PageHeader from "../../PageHeader";

const ReportsDetailsOne: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    chemical: true,
    biological: true,
    contamination: true,
    compliance: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <PageHeader title="Complete Water Quality Report" description="A detailed breakdown of all quality indicators, trends, and risk
            evaluations."/>

        {/* Key Metrics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {/* Water Quality Index */}
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex gap-4">
                <div>
                  <div className="inline-block rounded-xl bg-blue-50 p-2">
                    <Activity className="h-8 w-8 text-blue-500" />
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-600">
                    Water Quality Index
                  </span>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                      87.4
                    </span>
                    <span className="text-lg text-gray-500">/ 100</span>
                  </div>
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    Good
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Score */}
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex gap-4">
              <div>
                <div className="inline-block rounded-xl bg-blue-50 p-2">
                  <Shield className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-600">Compliance Score</span>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    92.2%
                  </span>
                  <span className="text-lg text-gray-500">/ 100</span>
                </div>
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Excellent
                </span>
              </div>
            </div>
          </div>

          {/* Risk Factor */}
          <div className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1">
            <div className="flex gap-4">
              <div>
                <div className="inline-block rounded-xl bg-blue-50 p-2">
                  <AlertTriangle className="h-7 w-7 text-yellow-500" />
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-600">Risk Factor</span>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">32.4</span>
                  <span className="text-lg text-gray-500">/ 100</span>
                </div>
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Low
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Report Section */}
        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
            Complete Water Quality Report
          </h2>

          {/* Chemical Composition Report */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("chemical")}
              className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-900">
                  Chemical Composition Report
                </span>
              </div>
              {expandedSections.chemical ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.chemical && (
              <div className="mt-4 grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
                {/* pH Level */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      pH Level
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      7.2
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-green-500"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>

                {/* Conductivity */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Conductivity (µS/cm)
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      7.2
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-blue-500"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>

                {/* Hardness */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Hardness (mg/L)
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      7.2
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-blue-500"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>

                {/* Turbidity */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Turbidity (NTU)
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      7.2
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-green-500"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Biological Indicators */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("biological")}
              className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Droplets className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-gray-900">
                  Biological Indicators
                </span>
              </div>
              {expandedSections.biological ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.biological && (
              <div className="mt-4 space-y-4 p-4">
                {/* Bacteria Levels */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Bacteria Levels
                      </h4>
                      <p className="text-sm text-gray-600">
                        Total Coliform Count
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        &lt;1 CFU/100mL
                      </p>
                      <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Safe
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pathogen Score */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Pathogen Score
                      </h4>
                      <p className="text-sm text-gray-600">
                        Risk Assessment Index
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        1.2 / 10
                      </p>
                      <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Low Risk
                      </span>
                    </div>
                  </div>
                </div>

                {/* Organic Material */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Organic Material
                      </h4>
                      <p className="text-sm text-gray-600">
                        Total Organic Carbon
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        2.4 mg/L
                      </p>
                      <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Normal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contamination Risk Analysis */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("contamination")}
              className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-gray-900">
                  Contamination Risk Analysis
                </span>
              </div>
              {expandedSections.contamination ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.contamination && (
              <div className="mt-4 p-4">
                {/* Overall Risk Severity Scale */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Overall Risk Severity Scale
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      7.2
                    </span>
                  </div>
                  <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-green-500"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low (0-3)</span>
                    <span>Medium (4-6)</span>
                    <span>High (7-10)</span>
                  </div>
                </div>

                {/* Heavy Metals */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 py-2">
                    <span className="text-sm text-gray-700">Heavy Metals</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Low (0.5)
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-2">
                    <span className="text-sm text-gray-700">Heavy Metals</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Low (1.2)
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-700">Heavy Metals</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Low (0.6)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Compliance Checklist */}
          <div>
            <button
              onClick={() => toggleSection("compliance")}
              className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-gray-900">
                  Compliance Checklist
                </span>
              </div>
              {expandedSections.compliance ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSections.compliance && (
              <div className="mt-4 space-y-2 p-4">
                {/* pH Level Compliance */}
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      pH Level Compliance
                    </span>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Passed
                  </span>
                </div>

                {/* Turbidity Standards */}
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Turbidity Standards
                    </span>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Passed
                  </span>
                </div>

                {/* Bacterial Count Limits */}
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Bacterial Count Limits
                    </span>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Passed
                  </span>
                </div>

                {/* Chemical Parameter Limits */}
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Chemical Parameter Limits
                    </span>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Passed
                  </span>
                </div>

                {/* Heavy Metal Screening */}
                <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500">
                      <span className="text-xs font-bold text-white">!</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Heavy Metal Screening
                    </span>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                    Pending
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDetailsOne;
