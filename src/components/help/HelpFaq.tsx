'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function HelpFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I start a new meeting?",
      answer: "Click the \"Start New Meeting\" button in the top header or navigate to the Start Meeting page from the sidebar. Follow the 5-step wizard to configure your meeting parameters."
    },
    {
      question: "What sales methodologies are supported?",
      answer: "We support various sales methodologies including SPIN Selling, Challenger Sale, MEDDIC, and Solution Selling. You can configure your preferred methodology in the settings."
    },
    {
      question: "How are meeting scores calculated?",
      answer: "Meeting scores are calculated based on multiple factors including talk-to-listen ratio, keyword usage, sentiment analysis, and engagement metrics. Each factor is weighted according to your organization's preferences."
    },
    {
      question: "Can I export my analytics data?",
      answer: "Yes, you can export your analytics data in multiple formats including CSV, Excel, and PDF. Navigate to the Analytics dashboard and click the Export button to choose your preferred format."
    },
    {
      question: "How do I add team members?",
      answer: "Go to the Team Settings page, click the \"Add Member\" button, and enter their email address. They will receive an invitation to join your workspace."
    }
  ];

  const toggleAccordion = (index : any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pb-6">
      <div className="bg-white rounded-lg shadow-sm border border-[#D1D6DB] p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-medium text-[#2D2D2D] mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#636F85]">
            Quick answers to common questions
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="hover:bg-[#6E51E008] rounded"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-4 text-left transition-colors"
              >
                <span className="text-[16px] font-medium text-[#2D2D2D]">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#64748B] flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#64748B] flex-shrink-0 ml-4" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-sm text-[#000000] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}