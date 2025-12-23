import { Play } from 'lucide-react';
import Link from 'next/link';

export default function Step5() {
    const meetingData = {
        goal: 'Book a Demo',
        methodology: 'SPIN',
        duration: '30 minutes',
        participantsName: 'Mikkle'
    };

    const handleBack = () => {
        console.log('Back clicked');
        // Handle back navigation
    };

    const handleStartMeeting = () => {
        console.log('Starting AI Meeting');
        // Handle start meeting action
    };

    return (
        <div className="bg-white flex items-center justify-center py-6 border border-[#6E51E0] rounded-lg">
            <div className="max-w-xl w-full">
                {/* Play Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#6E51E0] rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-medium text-[#2D2D2D] mb-2">
                        Ready to Start Simulation?
                    </h1>
                    <p className="text-[#636F85] text-[16px]">
                        Your AI-powered meeting is configured and ready to begin
                    </p>
                </div>

                {/* Meeting Summary Card */}
                <div className="bg-[#F9FAFB] rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold text-[#2D2D2D] mb-5">
                        Meeting Summary
                    </h2>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[#636F85] text-4">Goal:</span>
                            <span className="text-[#2D2D2D] text-[16px]">{meetingData.goal}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-[#636F85] text-4">Methodology:</span>
                            <span className="text-[#2D2D2D] text-[16px]">{meetingData.methodology}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-[#636F85] text-4">Duration:</span>
                            <span className="text-[#2D2D2D] text-[16px]">{meetingData.duration}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-[#636F85] text-4">ParticipantsName:</span>
                            <span className="text-[#2D2D2D] text-[16px]">{meetingData.participantsName}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    {/* <button
            onClick={handleBack}
            className="px-8 py-3 text-gray-700 bg-white border border-hover:bg-[#6E51E0] rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Back
          </button> */}
                    <Link href="/dashboard/startNewMeeting/startAiMeeting">
                        <button
                            onClick={handleStartMeeting}
                            className="px-8 py-3 text-white bg-[#6E51E0] rounded-md hover:bg-[#6E51E0] transition-colors font-medium flex items-center gap-2 cursor-pointer"
                        >
                            <Play className="w-4 h-4 text-white" />
                            Start AI Meeting
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}