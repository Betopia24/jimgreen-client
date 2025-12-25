

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";
import { Droplet } from "lucide-react";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="bg-white flex flex-col justify-between min-h-full p-4">
        {/* Top Section */}
        <div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Logo */}
                <Link href="/" className="text-xl">
                  <div className="flex justify-center items-center">
                    <img src="/navbar/logo.svg" alt="logo" className='w-8 md:w-[150px] h-8 md:h-[60px]' />
                  </div>
                </Link>
                <div className="space-y-2">
                  {/* navigation  */}
                  <Link
                    href="/dashboard/dashboard"
                    className={`flex items-center gap-2 w-full rounded-sm px-7 py-3 text-[16px] transition-colors
                      ${pathname === "/dashboard/dashboard"
                        ? "bg-primaryColor text-white"
                        : "text-[##666666] hover:bg-primaryColor hover:text-white"
                      }`}
                  >
                    <GrHomeRounded size={16} />
                    <span className="text-[16px]">Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard/analysisInput"
                    className={`flex items-center gap-1 w-full rounded-sm px-6 py-3 text-[16px] transition-colors
                    ${pathname === "/dashboard/analysisInput"
                        ? "bg-primaryColor text-white"
                        : "text-[##666666] hover:bg-primaryColor hover:text-white"
                      }`}
                  >
                    <Droplet size={24} />
                    <span className="text-[16px]">Analysis Input</span>
                  </Link>


                  <button
                    className={`flex items-center w-full gap-2 rounded-sm px-7 py-3 transition-colors text-[16px] text-[#4B5563]
                    ${pathname === "/dashboard/settingPage"
                        ? "bg-primaryColor text-[#FAFAFA]"
                        : "text-[##666666] hover:bg-primaryColor hover:text-[#FAFAFA]"
                      }`}
                  >
                    <Link href="/dashboard/settingPage" className="flex items-center gap-2 w-full">
                      <GrHomeRounded size={16} />
                      <span className="text-[16px]">Settings</span>
                    </Link>
                  </button>
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        <SidebarMenu>
          <div className="bg-[#EEF6FF] px-2 py-4 rounded-sm mb-20">
            <button className="flex items-center gap-1 w-full text-[#EEF6FF] cursor-pointer">
              <IoIosLogOut size={22} className="text-[#000407]" />
              <span className="text-[16px] text-[#000407]">Logout</span>
            </button>
          </div>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar >
  );
}


