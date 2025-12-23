'use client';

import { useState } from 'react';
import { Play, Pause, Square, Share2, MessageSquare, Sparkles, Mic } from 'lucide-react';

export default function NextResponse() {
    const [isPaused, setIsPaused] = useState(false);

    const discoveryQuestions = [
        "What are your current biggest challenges?",
        "What are your current biggest challenges?",
        "What are your current biggest challenges?",
        "What are your current biggest challenges?"
    ];

    const aiQuestions = [
        "What are your current biggest challenges?",
        "What are your current biggest challenges?",
        "What are your current biggest challenges?",
        "What are your current biggest challenges?"
    ];

    const participants = [
        {
            id: 1,
            name: 'Mike',
            muted: true,
            image: '/dashboardImage/profileImage.svg'
        },
        {
            id: 2,
            name: 'Mike',
            muted: true,
            image: '/dashboardImage/profileImage.svg'
        }
    ];

    return (
        <div className="bg-gray-50 p-8 flex items-center justify-center">
            <div className="w-full flex gap-8">
                {/* Left Panel - Questions */}
                <div className="w-80 space-y-6">
                    {/* Discovery Questions */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-3">My top Discovery Questions</h3>
                        <ul className="space-y-2">
                            {discoveryQuestions.map((question, index) => (
                                <li key={index} className="text-gray-600 text-sm flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{question}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AI Powered Questions */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-1 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            AI powered Questions
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">Based on your sales Methodology</p>
                        <ul className="space-y-2">
                            {aiQuestions.map((question, index) => (
                                <li key={index} className="text-gray-600 text-sm flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{question}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Panel - Video Call */}
                <div className="flex-1">
                    <div className="relative bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Video Content */}
                        <div
                            className="aspect-video relative bg-cover bg-center rounded-md"
                            style={{
                                backgroundImage: "url('/dashboardImage/profileImage.svg')",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}
                        >
                        </div>
                        {/* Side participants */}
                        <div className="absolute top-6 right-6 space-y-3">
                            {participants.map((participant) => (
                                <div
                                    key={participant.id}
                                    className="bg-white rounded-lg shadow-md p-2 w-34 relative border border-[#7B7B7B]"
                                >
                                    {participant.muted && (
                                        <div className="absolute top-2 left-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                                            <Mic className="w-3 h-3 text-white" strokeWidth={2.5} />
                                            <div className="absolute w-0.5 h-6 bg-white rotate-45" />
                                        </div>
                                    )}

                                    {/* IMAGE HERE */}
                                    <div className="w-full h-34 rounded-md mb-2 overflow-hidden relative">
                                        <img
                                            src={participant.image}
                                            alt={participant.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />

                                        {/* Overlay Name */}
                                        <div className="absolute bottom-0 left-0 w-full bg-opacity-50 py-1 text-center">
                                            <span className="text-[16px] text-[#6E51E0] font-medium bg-white px-3 py-1 rounded-sm">
                                                {participant.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Speaker indicator */}
                        <div className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">Rabib xyz</span>
                        </div>

                        {/* Timer */}
                        <div className="absolute bottom-4 right-4 bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <span className="text-white text-sm font-medium">00:47</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-white px-6 py-4 flex items-center justify-center gap-4">
                        {/* Screen Share */}
                        <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                            <MessageSquare className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Share */}
                        <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                            <Share2 className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Next Response */}
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-purple-200">
                            Next Response
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>

                        {/* Pause/Play */}
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            {isPaused ? (
                                <Play className="w-5 h-5 text-gray-600 fill-gray-600" />
                            ) : (
                                <Pause className="w-5 h-5 text-gray-600 fill-gray-600" />
                            )}
                        </button>

                        {/* Stop */}
                        <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                            <Square className="w-5 h-5 text-gray-600 fill-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}