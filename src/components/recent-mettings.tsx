import React from "react";
import { Building2, FileText, Play, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function RecentMeetings() {
  const meetings = [
    {
      title: "Discovery Call with CMO",
      company: "FastGrowth Inc.",
      date: "Jan 23",
      duration: "42 min",
      score: 76,
    },
    {
      title: "Demo Preparation – VP Sales",
      company: "BlueWave Retail",
      date: "Jan 22",
      duration: "35 min",
      score: 85,
    },
  ];

  const getScoreColor = (score: any) => {
    console.log(score);
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 70) return "text-purple-600 bg-purple-50";
    return "text-orange-600 bg-orange-50";
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Recent Meetings
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {meetings.map((meeting, index) => (
            <div
              key={index}
              className=" rounded-xl border border-[#D1D6DB] p-6 hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {meeting.title}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">{meeting.company}</span>
                  </div>

                  <div className="text-sm text-gray-500">
                    {meeting.date} — {meeting.duration}
                  </div>
                </div>

                <div
                  className={`px-3 py-1 rounded-sm font-semibold text-sm ${getScoreColor(
                    meeting.score
                  )}`}
                >
                  {meeting.score}/100
                </div>
              </div>

              <div className="sm:flex  gap-3  mt-6">
                <Link href="/dashboard/home/viewSummary">
                  <button className="flex items-center gap-2 px-4 py-2 border border-[#D1D6DB] rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                    <FileText className="w-4 h-4" />
                    View Summary
                  </button>
                </Link>

                <Link href="/dashboard/home/replay">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                    <Play className="w-4 h-4" />
                    Replay
                  </button>
                </Link>

                <Link href="/dashboard/home/insights">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                    <TrendingUp className="w-4 h-4" />
                    Insights
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
