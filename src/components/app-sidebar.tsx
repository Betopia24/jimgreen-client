// "use client";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
// } from "@/components/ui/sidebar";
// import { Separator } from "@/components/ui/separator";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { GrHomeRounded } from "react-icons/gr";
// import { RiIdCardLine } from "react-icons/ri";
// import { MdManageAccounts } from "react-icons/md";
// import { RxDashboard } from "react-icons/rx";
// import { IoSettingsOutline } from "react-icons/io5";
// import { TfiHelpAlt } from "react-icons/tfi";
// import { IoIosLogOut } from "react-icons/io";

// export default function AppSidebar() {
//   const pathname = usePathname();

//   return (
//     <Sidebar>
//       <SidebarContent className="bg-white flex flex-col justify-between min-h-full p-4">
//         {/* Top Section */}
//         <div>
//           <SidebarGroup>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {/* Profile */}
//                 <div className="flex justify-center items-center mb-3">
//                   <Link href="/" className="text-xl text-[#000000]">
//                     <div className="flex items-center gap-2">
//                       <img
//                         src="/navbar/logo.png"
//                         alt="logo"
//                         className="w-8 md:w-12 h-8 md:h-12"
//                       />
//                       <h3 className="text-2xl text-[#6E51E0] font-semibold">
//                         phora
//                       </h3>
//                     </div>
//                   </Link>
//                 </div>
//                 <div className="space-y-2">
//                   {/* navigation  */}
//                   <button
//                     className={`flex items-center w-full gap-2 rounded-sm px-4 py-3 transition-colors bg-[#F5F6F7]/60 text-[16px] text-[#636F85] hover:text-white ${
//                       pathname === "/home"
//                         ? "bg-[#F7F7F81A] text-white"
//                         : "text-[#D5D6E2] hover:bg-primaryBgColor hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
//                     }`}
//                   >
//                     <Link
//                       href="/dashboard/home"
//                       className="flex items-center gap-1 w-full text-[#636F85] hover:text-white"
//                     >
//                       <GrHomeRounded size={20} />
//                       <span className="text-[16px]">Home</span>
//                     </Link>
//                   </button>
//                   <button
//                     className={`flex items-center w-full gap-2 rounded-sm px-4 py-3 transition-colors bg-[#F5F6F7]/60 text-[16px] text-[#636F85] hover:text-white ${
//                       pathname === "/dashboard/startNewMeeting"
//                         ? "bg-[#F7F7F81A] text-white"
//                         : "text-[#D5D6E2] hover:bg-primaryBgColor hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
//                     }`}
//                   >
//                     <Link
//                       href="/dashboard/startNewMeeting"
//                       className="flex items-center gap-1 w-full text-[#636F85] hover:text-white"
//                     >
//                       <RiIdCardLine size={20} />
//                       <span className="text-[16px]">Start a New Meeting</span>
//                     </Link>
//                   </button>
//                   <button
//                     className={`flex items-center w-full gap-2 rounded-sm px-4 py-3 transition-colors bg-[#F5F6F7]/60 text-[16px] text-[#636F85] hover:text-white ${
//                       pathname === "/dashboard/myAccount"
//                         ? "bg-[#F7F7F81A] text-white"
//                         : "text-[#D5D6E2] hover:bg-primaryBgColor hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
//                     }`}
//                   >
//                     <Link
//                       href="/dashboard/myAccount"
//                       className="flex items-center gap-1 w-full text-[#636F85] hover:text-white"
//                     >
//                       <MdManageAccounts size={22} />
//                       <span className="text-[16px]">My Accounts</span>
//                     </Link>
//                   </button>
//                   <button
//                     className={`flex items-center w-full gap-2 rounded-sm px-4 py-3 transition-colors bg-[#F5F6F7]/60 text-[16px] text-[#636F85] hover:text-white ${
//                       pathname === "/dashboard/dashboard"
//                         ? "bg-[#F7F7F81A] text-white"
//                         : "text-[#D5D6E2] hover:bg-primaryBgColor hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
//                     }`}
//                   >
//                     <Link
//                       href="/dashboard/dashboard"
//                       className="flex items-center gap-1 w-full text-[#636F85] hover:text-white"
//                     >
//                       <RxDashboard size={20} />
//                       <span className="text-[16px]">Dashboard</span>
//                     </Link>
//                   </button>
//                   <div className="my-3">
//                     <Separator />
//                   </div>

//                   <button
//                     className={`flex items-center w-full gap-2 rounded-sm px-4 py-3 transition-colors bg-[#F5F6F7]/60 text-[16px] text-[#636F85] hover:text-white ${
//                       pathname === "/dashboard/settingPage"
//                         ? "bg-[#F7F7F81A] text-white"
//                         : "text-[#D5D6E2] hover:bg-primaryBgColor hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
//                     }`}
//                   >
//                     <Link
//                       href="/dashboard/settingPage"
//                       className="flex items-center gap-1 w-full text-[#636F85] hover:text-white"
//                     >
//                       <IoSettingsOutline size={20} />
//                       <span className="text-[16px]">Setting</span>
//                     </Link>
//                   </button>
//                   <button
//                     className={`flex items-center w-full gap-2 rounded-sm px-4 py-3 transition-colors bg-[#F5F6F7]/60 text-[16px] text-[#636F85] hover:text-white ${
//                       pathname === "/dashboard/help"
//                         ? "bg-[#F7F7F81A] text-white"
//                         : "text-[#D5D6E2] hover:bg-primaryBgColor hover:text-white focus:bg-[#F7F7F81A] focus:text-white"
//                     }`}
//                   >
//                     <Link
//                       href="/dashboard/help"
//                       className="flex items-center gap-1 w-full text-[#636F85] hover:text-white"
//                     >
//                       <TfiHelpAlt size={18} />
//                       <span className="text-[16px]">Help</span>
//                     </Link>
//                   </button>
//                 </div>
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </div>
//         <SidebarMenu>
//           <div className="bg-[#FBE7E8] px-2 py-2 rounded-sm cursor-pointer mb-20">
//             <button className="flex items-center gap-1 w-full text-[#D00E11]">
//               <IoIosLogOut size={22} />
//               <span className="text-[16px]">Logout</span>
//             </button>
//           </div>
//         </SidebarMenu>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrHomeRounded } from "react-icons/gr";
import { RiIdCardLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiHelpAlt } from "react-icons/tfi";
import { IoIosLogOut } from "react-icons/io";

export default function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/dashboard/home", icon: GrHomeRounded },
    {
      label: "Start a New Meeting",
      href: "/dashboard/startNewMeeting",
      icon: RiIdCardLine,
    },
    {
      label: "My Accounts",
      href: "/dashboard/myAccount",
      icon: MdManageAccounts,
    },
    { label: "Dashboard", href: "/dashboard/dashboard", icon: RxDashboard },
    {
      label: "Setting",
      href: "/dashboard/settingPage",
      icon: IoSettingsOutline,
    },
    { label: "Help", href: "/dashboard/help", icon: TfiHelpAlt },
  ];

  return (
    <Sidebar>
      <SidebarContent className="bg-white flex flex-col justify-between min-h-full p-4">
        {/* Top Section */}
        <div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Logo */}
                <div className="flex justify-start items-center mb-10 mt-2">
                  <Link href="/" className="flex items-center gap-2 ml-4">
                    <img
                      src="/navbar/logo.png"
                      alt="logo"
                      className="w-14 h-14"
                    />
                    <h3 className="text-3xl text-[#6E51E0] font-semibold">
                      Phora
                    </h3>
                  </Link>
                </div>

                {/* Navigation */}
                <div className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const isSettings = item.href === "/dashboard/settingPage";
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center rounded-md gap-2 px-4 py-3 text-[16px] transition-all
                          ${
                            isActive
                              ? "bg-primaryBgColor text-white"
                              : "bg-[#F5F6F7]/60 text-[#636F85] hover:bg-primaryBgColor hover:text-white"
                          }
                          ${
                            isActive && isSettings
                              ? "border-t-2 border-[#6E51E0]"
                              : ""
                          }
                        `}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}

                  <Separator className="my-3" />
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Logout */}
        <SidebarMenu>
          <div className="bg-[#FBE7E8] px-4 py-3 cursor-pointer rounded-sm mb-6">
            <button className="flex items-center cursor-pointer gap-1 w-full text-[#D00E11]">
              <IoIosLogOut size={22} />
              <span className="text-[16px]">Logout</span>
            </button>
          </div>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
