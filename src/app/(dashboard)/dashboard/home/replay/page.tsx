"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, BarChart3 } from 'lucide-react';

function Replay() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(42 * 60); // 42:00 in seconds
    const [volume, setVolume] = useState(1);
    const [showControls, setShowControls] = useState(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const formatTime = (seconds: any) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSkipBack = () => {
        setCurrentTime(Math.max(0, currentTime - 10));
    };

    const handleSkipForward = () => {
        setCurrentTime(Math.min(duration, currentTime + 10));
    };

    const handleSeek = (e: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        setCurrentTime(percentage * duration);
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return duration;
                    }
                    return prev + 0.1;
                });
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isPlaying, duration]);

    const progress = (currentTime / duration) * 100;
    return (
        <div>
            {/* title part  */}
            <div className="bg-white border border-[#6E51E0] rounded-[12px] p-6 my-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h1 className="text-2xl font-medium text-[#2D2D2D] mb-4">
                            Discovery Call with CMO
                        </h1>
                        <p className='text-[#4A5565] text-[16px]'>FastGrowth Inc. • Jan 23 • 42 minutes</p>
                    </div>

                    <div className="ml-6">
                        <div className="bg-[#6E51E0]/10 text-[#6E51E0] p-3 rounded-[8px] font-medium text-sm whitespace-nowrap">
                            Overall Score: 78/100
                        </div>
                    </div>
                </div>
            </div>
            {/* video player part  */}
            <div
                className="relative w-full h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex flex-col my-6"
                onMouseMove={handleMouseMove}
            >
                {/* Video Area */}
                <div className="flex-1 flex items-center justify-center relative">
                    {/* Time Display - Top Left */}
                    <div className={`absolute top-6 left-6 bg-black bg-opacity-80 px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Center Play Button */}
                    <button
                        onClick={handlePlayPause}
                        className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105"
                    >
                        <div className="w-24 h-24 rounded-full bg-slate-700 bg-opacity-80 flex items-center justify-center group-hover:bg-opacity-100 transition-all">
                            {isPlaying ? (
                                <Pause className="w-12 h-12 text-white ml-0" fill="white" />
                            ) : (
                                <Play className="w-12 h-12 text-white ml-1" fill="white" />
                            )}
                        </div>
                        <span className="text-slate-300 text-lg font-medium">
                            Meeting Recording
                        </span>
                    </button>
                </div>

                {/* Controls Bar */}
                <div className={`bg-white p-4 transition-all duration-300 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}>
                    {/* Progress Bar */}
                    <div
                        className="relative w-full h-1.5 bg-slate-200 rounded-full cursor-pointer mb-4 group"
                        onClick={handleSeek}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                        />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {/* Skip Back */}
                            <button
                                onClick={handleSkipBack}
                                className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                            >
                                <SkipBack className="w-5 h-5 text-slate-700" fill="currentColor" />
                            </button>

                            {/* Play/Pause */}
                            <button
                                onClick={handlePlayPause}
                                className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition-colors"
                            >
                                {isPlaying ? (
                                    <Pause className="w-5 h-5 text-white" fill="white" />
                                ) : (
                                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                                )}
                            </button>

                            {/* Skip Forward */}
                            <button
                                onClick={handleSkipForward}
                                className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                            >
                                <SkipForward className="w-5 h-5 text-slate-700" fill="currentColor" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Volume */}
                            <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
                                <Volume2 className="w-5 h-5 text-slate-700" />
                            </button>

                            {/* Fullscreen */}
                            <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
                                <Maximize2 className="w-5 h-5 text-slate-700" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* transcript part  */}
            <div className="bg-gray-50 pb-6">
                <div className="bg-white rounded-lg">
                    <div className="border-b border-gray-200 px-6 py-7">
                        <h1 className="text-xl font-semibold text-[#0A0A0A]">Transcript</h1>
                    </div>

                    <div className="px-6 py-6">
                        {/* Message 1 */}
                        <div
                            className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                        >
                            <div>
                                <span className="text-xs text-gray-500 font-medium border rounded-lg px-2 py-1">
                                    00:00
                                </span>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8">
                                        <img src="/dashboardImage/profileImage.svg" alt="" className="rounded-full" />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#0A0A0A]">You</span>
                                </div>

                                <p className="text-sm text-[#364153]">
                                    Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?
                                </p>
                            </div>
                        </div>
                        {/* Message 2 */}
                        <div
                            className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                        >
                            <div className="">
                                <span className="text-xs text-gray-500 font-medium border rounded-lg px-2 py-1">00:05</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8">
                                        <img src="/dashboardImage/profileImage.svg" alt="" className='rounded-full' />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#0A0A0A]">Mike</span>
                                </div>
                                <p className="text-sm text-[#364153]">
                                    I'm doing well, thank you! Excited to learn more about what you have to offer.
                                </p>
                            </div>
                        </div>
                        {/* Message 3 */}
                        <div
                            className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                        >
                            <div className="">
                                <span className="text-xs text-gray-500 font-medium border rounded-lg px-2 py-1">00:12</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8">
                                        <img src="/dashboardImage/profileImage.svg" alt="" className='rounded-full' />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#0A0A0A]">You</span>
                                </div>
                                <p className="text-sm text-[#364153]">
                                    Great! Before we dive in, I'd love to understand a bit more about your current situation. Can you tell me about the biggest challenges your team is facing right now?
                                </p>
                            </div>
                        </div>
                        {/* Message 4 */}
                        <div
                            className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                        >
                            <div className="">
                                <span className="text-xs text-gray-500 font-medium border rounded-lg px-2 py-1">00:25</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8">
                                        <img src="/dashboardImage/profileImage.svg" alt="" className='rounded-full' />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#0A0A0A]">Sarah Miller</span>
                                </div>
                                <p className="text-sm text-[#364153]">
                                    Absolutely. Our biggest pain point right now is manual reporting. Our sales team spends about 15 hours a week just pulling together reports and data from different systems. It's incredibly time-consuming and taking them away from actual selling.
                                </p>
                            </div>
                        </div>
                        {/* Message 5 */}
                        <div
                            className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                        >
                            <div className="">
                                <span className="text-xs text-gray-500 font-medium border rounded-lg px-2 py-1">00:55</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8">
                                        <img src="/dashboardImage/profileImage.svg" alt="" className='rounded-full' />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#0A0A0A]">Mike</span>
                                </div>
                                <p className="text-sm text-[#364153]">
                                    It's definitely affecting our numbers. We're missing opportunities because reps don't have real-time visibility into their pipeline. By the time they get the reports, the data is already outdated.
                                </p>
                            </div>
                        </div>
                        {/* Message 6 */}
                        <div
                            className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                        >
                            <div className="">
                                <span className="text-xs text-gray-500 font-medium border rounded-lg px-2 py-1">01:12</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8">
                                        <img src="/dashboardImage/profileImage.svg" alt="" className='rounded-full' />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#0A0A0A]">You</span>
                                </div>
                                <p className="text-sm text-[#364153]">
                                    I can see how that would be problematic. What have you tried so far to solve this issue?
                                </p>
                            </div>
                        </div>
                        {/* Message 7 */}
                        <div
                            className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                        >
                            <div className="">
                                <span className="text-xs text-gray-500 font-medium border rounded-lg px-2 py-1">00:12</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8">
                                        <img src="/dashboardImage/profileImage.svg" alt="" className='rounded-full' />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#0A0A0A]">Sarah Miller</span>
                                </div>
                                <p className="text-sm text-[#364153]">
                                    We've looked at a couple of basic tools, but they don't integrate well with our existing CRM. We need something that works seamlessly with Salesforce and can automate most of this work.
                                </p>
                            </div>
                        </div>
                        {/* Message 8 */}
                        <div
                            className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                        >
                            <div className="">
                                <span className="text-xs text-gray-500 font-medium border rounded-lg px-2 py-1">01:30</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8">
                                        <img src="/dashboardImage/profileImage.svg" alt="" className='rounded-full' />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#0A0A0A]">You</span>
                                </div>
                                <p className="text-sm text-[#364153]">
                                    That makes sense. If you could solve this problem, what would the ideal outcome look like for you?</p>
                            </div>
                        </div>
                        {/* Message 9 */}
                        <div
                            className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                        >
                            <div className="">
                                <span className="text-xs text-gray-500 font-medium border rounded-lg px-2 py-1">01:30</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8">
                                        <img src="/dashboardImage/profileImage.svg" alt="" className='rounded-full' />
                                    </div>
                                    <span className="text-[16px] font-medium text-[#0A0A0A]">Mike</span>
                                </div>
                                <p className="text-sm text-[#364153]">
                                    Ideal would be real-time dashboards that update automatically, so our reps can see their pipeline status at any moment. And we'd like to cut that 15 hours down to maybe 2-3 hours max.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* button part  */}
            <div className="flex gap-6 mb-6">
                <button className="flex-1 bg-white border border-[#D1D6DB] hover:border-[#6E51E0] text-[#0A0A0A] text-[16px] font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <Play className="w-5 h-5" />
                    Watch Replay
                </button>
                <button className="flex-1 bg-white border border-[#D1D6DB] hover:border-[#6E51E0] text-[#0A0A0A] text-[16px] font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <BarChart3 className="w-5 h-5" />
                    View Insights
                </button>
            </div>
        </div>
    )
}

export default Replay