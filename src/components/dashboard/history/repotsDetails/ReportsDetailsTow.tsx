"use client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

// Water Quality Data
const waterQualityData = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 65 },
  { month: "Mar", value: 63 },
  { month: "Apr", value: 70 },
  { month: "May", value: 78 },
  { month: "Jun", value: 92 },
];

// Compliance Score Data
const complianceData = [
  { week: "Week 1", score: 92 },
  { week: "Week 2", score: 94 },
  { week: "Week 3", score: 89 },
  { week: "Week 4", score: 93 },
];

// Risk Factor Data
const riskFactorData = [
  { month: "May", risk: 4.2 },
  { month: "Jun", risk: 3.8 },
  { month: "Jul", risk: 3.5 },
  { month: "Aug", risk: 3.2 },
  { month: "Sep", risk: 3.4 },
  { month: "Oct", risk: 3.3 },
];

const TrendAnalysisDashboard = () => {
  return (
    <div className="mt-10">
      <div className="">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
          Trend Analysis
        </h1>

        <div className="space-y-6">
          {/* Water Quality Index Trend */}
          <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
                  Water Quality Index Trend
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  6-month historical data
                </p>
              </div>
            </div>

            <div className="h-64 w-full md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waterQualityData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    stroke="#9ca3af"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="#9ca3af"
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Compliance Score Comparison */}
          <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-green-50 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
                  Compliance Score Comparison
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Weekly performance tracking
                </p>
              </div>
            </div>

            <div className="h-64 w-full md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 12 }}
                    stroke="#9ca3af"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="#9ca3af"
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                  <Bar dataKey="score" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Factor Fluctuation */}
          <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-orange-50 p-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
                  Risk Factor Fluctuation
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Monthly risk assessment
                </p>
              </div>
            </div>

            <div className="h-64 w-full md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskFactorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    stroke="#9ca3af"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="#9ca3af"
                    domain={[0, 10]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisDashboard;
