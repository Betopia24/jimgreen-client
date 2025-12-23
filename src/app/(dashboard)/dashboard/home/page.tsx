
import { SectionCards } from "@/components/section-cards"
import RecentMeetings from "@/components/recent-mettings"
import { ExternalLink, Lightbulb } from "lucide-react"
import HomeAiInsights from "@/components/home/HomeAiInsights"
import Link from "next/link"

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
                        <Link href="/dashboard/myAccount">
                            <button className="shadow-sm flex items-center justify-center gap-2 w-full py-2 border border-[#D1D6DB] rounded-md text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors cursor-pointer">
                                <ExternalLink size={14} />
                                Open Account
                            </button>
                        </Link>
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
                        <Link href="/dashboard/myAccount">
                            <button className="shadow-sm flex items-center justify-center gap-2 w-full py-2 border border-[#D1D6DB] rounded-md text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors cursor-pointer">
                                <ExternalLink size={14} />
                                Open Account
                            </button>
                        </Link>
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
                        <Link href="/dashboard/myAccount">
                            <button className="shadow-sm flex items-center justify-center gap-2 w-full py-2 border border-[#D1D6DB] rounded-md text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors cursor-pointer">
                                <ExternalLink size={14} />
                                Open Account
                            </button>
                        </Link>
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
                        <Link href="/dashboard/myAccount">
                            <button className="shadow-sm flex items-center justify-center gap-2 w-full py-2 border border-[#D1D6DB] rounded-md text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors cursor-pointer">
                                <ExternalLink size={14} />
                                Open Account
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* ai insights  */}
            <HomeAiInsights />
        </div>
    )
}
