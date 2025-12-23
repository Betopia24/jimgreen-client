import Link from "next/link";
import { LuUsers } from "react-icons/lu";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link href="/dashboard/home/totalMeeting">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border- hover:shadow-md transition">

          {/* Header */}
          <div className="flex justify-between">
            <div>
              <p className="text-[#636F85] text-[16px]">Total Meetings</p>
              {/* Number */}
              <h2 className="text-2xl font-semibold text-[#2D2D2D] my-2">28</h2>
            </div>

            <div className="w-12 h-12 bg-blue-50 rounded-[10px] flex items-center justify-center text-blue-600">
              <LuUsers />
            </div>
          </div>


          {/* Footer */}
          <p className="text-[#34A853] text-sm font-medium">
            +12.5% from last month
          </p>
        </div>
      </Link>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">

        {/* Header */}
        <div className="flex justify-between">
          <div>
            <p className="text-[#636F85] text-[16px]">People Met</p>
            {/* Number */}
            <h2 className="text-2xl font-semibold text-[#2D2D2D] my-2">25</h2>
          </div>

          <div className="w-12 h-12 bg-[#34A8531A] rounded-[10px] flex items-center justify-center text-[#34A853]">
            <LuUsers />
          </div>
        </div>


        {/* Footer */}
        <p className="text-[#34A853] text-sm font-medium">
          +12.5% from last month
        </p>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">

        {/* Header */}
        <div className="flex justify-between">
          <div>
            <p className="text-[#636F85] text-[16px]">Meeting Success Rate</p>
            {/* Number */}
            <h2 className="text-2xl font-semibold text-[#2D2D2D] my-2">78.5%</h2>
          </div>

          <div className="w-12 h-12 bg-[#9810FA1A] rounded-[10px] flex items-center justify-center text-[#9810FA]">
            <LuUsers />
          </div>
        </div>


        {/* Footer */}
        <p className="text-[#34A853] text-sm font-medium">
          +12.5% from last month
        </p>
      </div>
    </div>

  )
}
