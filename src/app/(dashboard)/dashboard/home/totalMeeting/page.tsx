"use client"
import { Building2, FileText, Play, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FaListUl } from "react-icons/fa6"

function TotalMeeting() {
    const [list, setList] = useState<boolean>(false)
    console.log(list)
    const meetings = [
        { title: "Discovery Call with CMO", company: "FastGrowth Inc.", date: "Jan 23", duration: "42 min", score: 76 },
        { title: "Demo Preparation – VP Sales", company: "BlueWave Retail", date: "Jan 22", duration: "35 min", score: 85 },
        { title: "Initial Outreach – Head of Marketing", company: "NovaTech", date: "Jan 21", duration: "28 min", score: 72 },
        { title: "Product Demo – CTO", company: "Cloudify", date: "Jan 20", duration: "50 min", score: 88 },
        { title: "Qualification Call – Sales Lead", company: "RetailPro", date: "Jan 19", duration: "31 min", score: 69 },
        { title: "Follow-up Meeting – Founder", company: "StartupX", date: "Jan 18", duration: "24 min", score: 74 },
        { title: "Pipeline Review – VP Revenue", company: "ScaleUp Co.", date: "Jan 17", duration: "46 min", score: 82 },
        { title: "Discovery Session – CRO", company: "MarketBoost", date: "Jan 16", duration: "39 min", score: 78 },
        { title: "Solution Overview – Product Head", company: "TechSphere", date: "Jan 15", duration: "41 min", score: 80 },
        { title: "Negotiation Call – Procurement", company: "EnterpriseHub", date: "Jan 14", duration: "33 min", score: 71 },
        { title: "Strategy Call – Growth Manager", company: "AdVantage", date: "Jan 13", duration: "37 min", score: 77 },
        { title: "Technical Deep Dive – Engineering Lead", company: "DevWorks", date: "Jan 12", duration: "55 min", score: 90 },
        { title: "Account Review – Client Success", company: "CustomerFirst", date: "Jan 11", duration: "29 min", score: 73 },
        { title: "Demo Follow-up – Sales Director", company: "NextGen Sales", date: "Jan 10", duration: "34 min", score: 79 },
        { title: "Intro Call – Operations Manager", company: "LogiChain", date: "Jan 9", duration: "26 min", score: 68 },
        { title: "Discovery Call – VP Operations", company: "SupplyCore", date: "Jan 8", duration: "44 min", score: 81 },
        { title: "Pricing Discussion – Finance Lead", company: "FinEdge", date: "Jan 7", duration: "32 min", score: 75 },
        { title: "Product Walkthrough – UX Lead", company: "DesignFlow", date: "Jan 6", duration: "38 min", score: 83 },
        { title: "Sales Coaching Session", company: "Internal", date: "Jan 5", duration: "47 min", score: 86 },
        { title: "Customer Feedback Call", company: "RetailMax", date: "Jan 4", duration: "30 min", score: 70 },
        { title: "Market Expansion Talk – CEO", company: "GlobalReach", date: "Jan 3", duration: "52 min", score: 89 },
        { title: "Partner Alignment – BizDev", company: "AllianceCorp", date: "Jan 2", duration: "36 min", score: 78 },
        { title: "Quarterly Review – Account Owner", company: "PrimeClients", date: "Jan 1", duration: "48 min", score: 84 },
        { title: "Demo Rehearsal – Sales Team", company: "Internal", date: "Dec 31", duration: "40 min", score: 80 },
        { title: "Onboarding Call – New Client", company: "LaunchPad", date: "Dec 30", duration: "27 min", score: 74 },
        { title: "Renewal Discussion – Client Lead", company: "Subscriptify", date: "Dec 29", duration: "35 min", score: 76 },
        { title: "Stakeholder Sync – Program Manager", company: "EnterprisePlus", date: "Dec 28", duration: "43 min", score: 82 },
        { title: "Final Decision Call – Board Member", company: "Visionary Ltd.", date: "Dec 27", duration: "58 min", score: 91 },
    ];


    const getScoreColor = (score: any) => {
        console.log(score);
        if (score >= 80) return "text-green-600 bg-green-50";
        if (score >= 70) return "text-purple-600 bg-purple-50";
        return "text-orange-600 bg-orange-50";
    };
    return (
        <div>
            <div className="my-8 flex items-center justify-between gap-3">
                <h1 className="text-3xl font-bold text-[#2D2D2D]">
                    Total Meetings
                </h1>
                <div>
                    {
                        list ? (<button
                            onClick={() => setList(false)}
                            className="border border-[#D1D6DB] cursor-pointer p-2 rounded"
                        >
                            <FaListUl size={22} />
                        </button>) : (
                            <button
                                onClick={() => setList(true)}
                                className="border border-[#D1D6DB] cursor-pointer p-1 rounded"
                            >
                                <CgMenuGridR size={30} />
                            </button>
                        )
                    }
                </div>
            </div>
            {
                list ? (
                    <div className="space-y-6">
                        {meetings.map((meeting, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-[#D1D6DB] p-6 hover:shadow-sm transition-shadow duration-200"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                            {meeting.title}
                                        </h2>
                                    </div>

                                    <div
                                        className={`px-3 py-1 rounded-sm font-semibold text-sm ${getScoreColor(
                                            meeting.score
                                        )}`}
                                    >
                                        {meeting.score}/100
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                            <Building2 className="w-4 h-4" />
                                            <span className="text-sm">{meeting.company}</span>
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {meeting.date} — {meeting.duration}
                                        </div>
                                    </div>
                                    <div className="sm:flex gap-3 mt-6">
                                        <Link href="/dashboard/home/viewSummary">
                                            <button className="flex items-center gap-2 px-3 py-1.5 border border-[#D1D6DB] rounded-sm text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                                                <FileText className="w-4 h-4" />
                                                View Summary
                                            </button>
                                        </Link>

                                        <Link href="/dashboard/home/replay">
                                            <button className="my-3 md:my-0 flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-sm text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                                                <Play className="w-4 h-4" />
                                                Replay
                                            </button>
                                        </Link>

                                        <Link href="/dashboard/home/insights">
                                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-sm text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                                                <TrendingUp className="w-4 h-4" />
                                                Insights
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {meetings.map((meeting, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-[#D1D6DB] p-6 hover:shadow-sm transition-shadow duration-200"
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

                                <div className="sm:flex gap-3 mt-6">
                                    <Link href="/dashboard/home/viewSummary">
                                        <button className="flex items-center gap-2 px-4 py-2 border border-[#D1D6DB] rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                                            <FileText className="w-4 h-4" />
                                            View Summary
                                        </button>
                                    </Link>

                                    <Link href="/dashboard/home/replay">
                                        <button className="my-3 md:my-0 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
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
                )
            }
        </div>
    )
}

export default TotalMeeting