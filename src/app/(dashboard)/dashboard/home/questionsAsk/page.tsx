import { User } from 'lucide-react';
import Link from 'next/link'
import React from 'react'
import { GoArrowLeft } from 'react-icons/go'

function QuestionsAsk() {
    const conversations = [
        {
            "id": 1,
            "speaker": "You",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        },
        {
            "id": 2,
            "speaker": "Mike",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        },
        {
            "id": 3,
            "speaker": "You",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        },
        {
            "id": 4,
            "speaker": "Sarah Miller",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        },
        {
            "id": 5,
            "speaker": "You",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        },
        {
            "id": 6,
            "speaker": "Mike",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        },
        {
            "id": 7,
            "speaker": "You",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        },
        {
            "id": 8,
            "speaker": "Sarah Miller",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        },
        {
            "id": 9,
            "speaker": "You",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        },
        {
            "id": 10,
            "speaker": "Mike",
            "question": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing?",
            "answer": "Hi Sarah, thanks so much for taking the time to meet with me today. How are you doing."
        }
    ]
    return (
        <div>
            {/* title part  */}
            <div>
                <Link href="/dashboard/home" className="flex-1">
                    <h3 className='flex items-center gap-2 text-[16px] text-[#2D2D2D] my-6'><GoArrowLeft /> Back to Dashboard</h3>
                </Link>
                <h1 className="text-3xl font-medium text-[#2D2D2D] mb-6">
                    Discovery Call with CMO
                </h1>
            </div>
            {/* questions and answers part  */}
            <div className="py-6 bg-white rounded-lg">
                <div className="space-y-4">
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            className=""
                        >
                            <div
                                className="flex gap-2 border-l-4 border-transparent rounded-lg
                             hover:border-[#4A6CF7] hover:bg-[#EFF6FF]
                             transition-all duration-300 ease-in-out px-1 py-3"
                            >
                                <div>
                                    <span className="text-xs text-gray-500 font-medium border rounded-sm px-2 py-1">
                                        {conv.id}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-8 h-8">
                                            <img src="/dashboardImage/profileImage.svg" alt="" className="rounded-full" />
                                        </div>
                                        <span className="text-[16px] font-medium text-[#0A0A0A]">{conv.speaker}</span>
                                    </div>

                                    <p className="text-sm text-[#364153]">
                                        <span className='text-sm text-[#364153] font-semibold'>Question: </span>{conv.question}
                                    </p>
                                    <p className="text-sm text-[#364153]">
                                        <span className='text-sm text-[#364153] font-semibold'>Ans: </span>{conv.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuestionsAsk