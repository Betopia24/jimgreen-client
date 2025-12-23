
import React from 'react';
import { Calendar, Clock, FileText, Play, TrendingUp, User } from 'lucide-react';
import Link from 'next/link';
import OpportunitiesSection from './OpportunitiesSection';

export default function RecentMeetings() {
    const meetings = [
        {
            id: 1,
            title: "Discovery Call with CMO",
            date: "Jan 23",
            duration: "42 minutes",
            attendee: "Sarah Miller",
            score: 78
        },
        {
            id: 2,
            title: "Discovery Call with CMO",
            date: "Jan 23",
            duration: "42 minutes",
            attendee: "Sarah Miller",
            score: 78
        }
    ];

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-[#6E51E0] bg-[#6E51E01A]';
        if (score >= 70) return 'text-[#6E51E0] bg-[#6E51E01A]';
        return 'text-orange-600 bg-orange-50';
    };

    return (
        <div>
            <div className="w-full bg-white p-6 rounded-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-900" />
                        <h2 className="text-lg font-semibold text-gray-900">Recent Meetings</h2>
                    </div>
                    <button className="text-sm font-medium text-gray-900 hover:text-gray-700">
                        View All
                    </button>
                </div>

                {/* Meeting Cards */}
                <div className="space-y-4">
                    {meetings.map((meeting) => (
                        <div
                            key={meeting.id}
                            className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
                        >
                            {/* Meeting Header */}
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-base font-semibold text-gray-900">
                                    {meeting.title}
                                </h3>
                                <span className={`px-2.5 py-1 rounded text-sm font-semibold bg ${getScoreColor(meeting.score)}`}>
                                    {meeting.score}/100
                                </span>
                            </div>

                            {/* Meeting Details */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>{meeting.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{meeting.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4" />
                                    <span>{meeting.attendee}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-3 gap-3">
                                <Link href="/dashboard/home/viewSummary">
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                        <FileText className="w-4 h-4" />
                                        Summary
                                    </button>
                                </Link>

                                <Link href="/dashboard/home/replay">
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                        <Play className="w-4 h-4" />
                                        Replay
                                    </button>
                                </Link>

                                <Link href="/dashboard/home/insights">
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                        <TrendingUp className="w-4 h-4" />
                                        Insights
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <OpportunitiesSection />
        </div>
    );
}