"use client";
import { useState, useEffect } from "react";
import { Settings, Video, Mic } from "lucide-react";
import { FiUpload } from "react-icons/fi";
import { BsBadgeCc } from "react-icons/bs";
import Link from "next/link";

export default function StartAiMeeting() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevels, setAudioLevels] = useState([
    40, 60, 80, 70, 90, 60, 75, 85, 65, 70, 80, 60, 75,
  ]);

  // Animate audio levels
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAudioLevels((prev) => prev.map(() => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const participants = [
    {
      id: 1,
      name: "Mike",
      muted: true,
      image: "/dashboardImage/profileImage.svg",
    },
    {
      id: 2,
      name: "Mike",
      muted: true,
      image: "/dashboardImage/profileImage.svg",
    },
  ];

  const handleStart = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col  items-center justify-center py-6">
      {/* Main Meeting Area */}
      <div
        className="w-full bg-[#EAEAEA] min-h-[70vh] border-2 border-white rounded-lg mb-6 relative"
        // style={{ height: "500px" }}
      >
        {/* Audio Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-1 h-24">
            {audioLevels.map((level, index) => (
              <div
                key={index}
                className="w-2 bg-[#6E51E0] rounded-full transition-all duration-100"
                style={{
                  height: isRecording ? `${level}%` : "20%",
                  opacity: isRecording ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Participants Panel */}
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

        {/* Transcription Text */}
        <div className="absolute bottom-6 left-6">
          <div className="bg-[#B2B2B252] rounded-full border border-white px-4 py-2 flex items-center gap-2">
            <Video className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">Blah blah xyz...</span>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex items-center gap-4">
        {/* Settings Button */}
        <button className="w-12 h-12 bg-[#6E51E01A] rounded-full flex items-center justify-center transition-colors shadow-md cursor-pointer">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>

        {/* Video Button */}
        <button className="w-12 h-12 bg-[#6E51E01A] rounded-full flex items-center justify-center transition-colors shadow-md cursor-pointer">
          <BsBadgeCc className="w-5 h-5 text-gray-600" />
        </button>

        {/* Share Button */}
        <button className="w-12 h-12 bg-[#6E51E01A] rounded-full flex items-center justify-center transition-colors shadow-md cursor-pointer">
          <FiUpload className="w-5 h-5 text-gray-600" />
        </button>

        {/* Start Button */}
        {/* <Link href="/dashboard/startNewMeeting/nextResponse"> */}
        <button
          onClick={handleStart}
          className="px-8 py-3 bg-[#6E51E0] text-white rounded-full hover:bg-[#6E51E0] transition-colors shadow-lg flex items-center gap-2 font-medium cursor-pointer"
        >
          <div className="w-3 h-3 bg-white rounded-full" />
          {isRecording ? "Stop" : "Start"}
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
