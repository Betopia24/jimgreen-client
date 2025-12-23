
import { SectionCards } from "@/components/section-cards"
import RecentMeetings from "@/components/recent-mettings"
import { ExternalLink, Lightbulb } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <RecentMeetings />
      {/* active accounts  */}
      <div>
        <h3 className="text-[#2D2D2D] text-2xl font-medium mb-6">Active Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="flex flex-col border border-[#D1D6DB] p-5 rounded-xl hover:shadow-sm bg-white">
            {/* Avatar and Company Name */}
            <div className="w-12 h-12 rounded-[10px] bg-[#6E51E0] flex items-center justify-center text-white font-semibold">
              F
            </div>
            <h3 className="font-semibold text-[#2D2D2D] text-[18px] my-2">FastGrowth Inc.</h3>
            {/* Info */}
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-[16px] text-[#636F85]">3 Active Opportunities</p>
              <p className="text-sm text-[#636F85]">Last Interaction: 5 days ago</p>
            </div>

            {/* Button */}
            <button className="shadow-sm flex items-center justify-center gap-2 w-full py-2 border border-[#D1D6DB] rounded-md text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors cursor-pointer">
              <ExternalLink size={14} />
              Open Account
            </button>
          </div>
          <div className="flex flex-col border border-[#D1D6DB] p-5 rounded-xl hover:shadow-sm bg-white">
            {/* Avatar and Company Name */}
            <div className="w-12 h-12 rounded-[10px] bg-[#6E51E0] flex items-center justify-center text-white font-semibold">
              B
            </div>
            <h3 className="font-semibold text-[#2D2D2D] text-[18px] my-2">BlueWave Retail</h3>
            {/* Info */}
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-[16px] text-[#636F85]">2 Active Opportunities</p>
              <p className="text-sm text-[#636F85]">Last Interaction: 2 days ago</p>
            </div>

            {/* Button */}
            <button className="shadow-sm flex items-center justify-center gap-2 w-full py-2 border border-[#D1D6DB] rounded-md text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors cursor-pointer">
              <ExternalLink size={14} />
              Open Account
            </button>
          </div>
          <div className="flex flex-col border border-[#D1D6DB] p-5 rounded-xl hover:shadow-sm bg-white">
            {/* Avatar and Company Name */}
            <div className="w-12 h-12 rounded-[10px] bg-[#6E51E0] flex items-center justify-center text-white font-semibold">
              P
            </div>
            <h3 className="font-semibold text-[#2D2D2D] text-[18px] my-2">PixelCore Software</h3>
            {/* Info */}
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-[16px] text-[#636F85]">1 Active Opportunities</p>
              <p className="text-sm text-[#636F85]">Last Interaction: 1 week ago</p>
            </div>

            {/* Button */}
            <button className="shadow-sm flex items-center justify-center gap-2 w-full py-2 border border-[#D1D6DB] rounded-md text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors cursor-pointer">
              <ExternalLink size={14} />
              Open Account
            </button>
          </div>
          <div className="flex flex-col border border-[#D1D6DB] p-5 rounded-xl hover:shadow-sm bg-white">
            {/* Avatar and Company Name */}
            <div className="w-12 h-12 rounded-[10px] bg-[#6E51E0] flex items-center justify-center text-white font-semibold">
              N
            </div>
            <h3 className="font-semibold text-[#2D2D2D] text-[18px] my-2">NovaTech Labs</h3>
            {/* Info */}
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-[16px] text-[#636F85]">4 Active Opportunities</p>
              <p className="text-sm text-[#636F85]">Last Interaction: 3 days ago</p>
            </div>

            {/* Button */}
            <button className="shadow-sm flex items-center justify-center gap-2 w-full py-2 border border-[#D1D6DB] rounded-md text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors cursor-pointer">
              <ExternalLink size={14} />
              Open Account
            </button>
          </div>
        </div>
      </div>
      {/* ai insights  */}
      <div className="border border-[#6E51E0] rounded-xl bg-[#ECE9F8] p-6 mb-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="text-[#4A6CF7]" size={24} />
          <h2 className="text-[18px] font-semibold text-[#2D2D2D]">AI Insights</h2>
        </div>

        {/* Insights List */}
        <div>
          {/* Strength */}
          <div className="bg-white rounded-lg p-4 mb-3">
            <div className="flex gap-3">
              <span className="font-medium text-[#101010] text-[16px]">Strength:</span>
              <p className="text-[#636F85] text-[16px]">You ask strong open-ended questions that encourage detailed responses.</p>
            </div>
          </div>

          {/* Improvement */}
          <div className="bg-white rounded-lg p-4 mb-3">
            <div className="flex gap-3">
              <span className="font-semibold text-gray-900 whitespace-nowrap">Improvement:</span>
              <p className="text-gray-600">Improve budget exploration in early calls. Only 30% of your discovery calls include budget discussion.</p>
            </div>
          </div>

          {/* Pattern */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex gap-3">
              <span className="font-semibold text-gray-900 whitespace-nowrap">Pattern:</span>
              <p className="text-gray-600">Your qualification rate increases by 15% when you use SPIN methodology vs BANT.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
