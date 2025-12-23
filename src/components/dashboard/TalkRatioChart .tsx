// components/TalkRatioChart.tsx
"use client";

import React from "react";

type MeetingType = {
    name: string;
    talk: number;   // talk percentage
    listen: number; // listen percentage
};

const data: MeetingType[] = [
    { name: "Discovery", talk: 40, listen: 60 },
    { name: "Demo", talk: 55, listen: 45 },
    { name: "Closing", talk: 48, listen: 52 },
    { name: "Follow-up", talk: 45, listen: 55 },
];

const TalkRatioChart = () => {
    return (
        <div className="w-full p-4 bg-white rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Talk Ratio by Meeting Type</h2>
            <p className="text-sm text-gray-500 mb-4">
                Average talk time across different meeting types
            </p>

            <div className="space-y-4">
                {data.map((meeting) => (
                    <div key={meeting.name}>
                        <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
                            <span>{meeting.name}</span>
                            <span>{meeting.talk}% / {meeting.listen}%</span>
                        </div>

                        <div className="w-full h-7 bg-gray-200 rounded-full relative overflow-hidden">
                            {/* Talk bar */}
                            <div
                                className="h-full bg-[#6E51E0] flex items-center justify-center text-white text-[16px]"
                                style={{ width: `${meeting.talk}%` }}
                            >
                                <span>Talk</span>
                            </div>

                            {/* Listen text */}
                            <span
                                className="absolute right-1/4 top-0 h-full flex items-center text-[16px]"
                            >
                                Listen
                            </span>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default TalkRatioChart;
