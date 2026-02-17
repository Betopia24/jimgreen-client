"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";
import { CiDroplet, CiGlass } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { FiCreditCard } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBuilding } from "react-icons/lu";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { LuLoader } from "react-icons/lu";
import { useState } from "react";
import { PiMagicWandLight } from "react-icons/pi";

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(false);

  const menuItems = [
    {
      href: "/dashboard/dashboard",
      icon: GrHomeRounded,
      label: "Dashboard",
      size: 14,
    },
    {
      href: "/dashboard/analysisInput",
      icon: CiDroplet,
      label: "Analysis Input",
      size: 24,
    },
    {
      href: "/dashboard/analysisLab",
      icon: PiMagicWandLight,
      label: "Analysis Lab",
      size: 24,
    },
    {
      href: "/dashboard/rowMeterials",
      icon: CiGlass,
      label: "Raw Materials",
      size: 24,
    },
    { href: "/dashboard/product", icon: BsBoxSeam, label: "Product", size: 16 },
    {
      href: "/dashboard/customers",
      icon: LuBuilding,
      label: "Customers",
      size: 18,
    },
    { href: "/dashboard/history", icon: MdHistory, label: "History", size: 20 },
    // {
    //   href: "/dashboard/subscription",
    //   icon: FiCreditCard,
    //   label: "Subscription",
    //   size: 16,
    // },
    {
      href: "/dashboard/setting",
      icon: IoSettingsOutline,
      label: "Settings",
      size: 16,
    },
  ];

  const handleLogOut = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("persist:root");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("token");
      toast.success("Logged out successfully");
      router.push("/signIn"); // optional redirect
      setLoading(false); // 2-second delay
    }, 2000);
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-white flex flex-col justify-between min-h-full">
        {/* Top Section */}
        <div className="p-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Logo */}
                <Link href="/">
                  <div className="flex justify-center items-center py-4">
                    <img
                      src="/navbar/logo.svg"
                      alt="logo"
                      className="
                        w-16 
                        md:w-[220px] 
                        h-16 
                        md:h-[90px] 
                        transition-transform 
                        duration-300 
                        hover:scale-110
                      "
                    />
                  </div>
                </Link>
                <div className="space-y-1">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const isLast = index === menuItems.length - 1;

                    return (
                      <div
                        key={item.href}
                        className={
                          isLast ? "pt-6 mt-4 border-t border-[#E5E7EB]" : ""
                        }
                      >
                        <Link
                          href={item.href}
                          style={{
                            backgroundColor: isActive ? "#004AAD" : undefined,
                            color: isActive ? "white" : undefined,
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = "#004AAD";
                              e.currentTarget.style.color = "white";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = "";
                              e.currentTarget.style.color = "";
                            }
                          }}
                          className={`
                            group flex items-center gap-3 w-full rounded-lg px-4 py-3
                            text-[16px] font-medium transition-all duration-200 ease-in-out
                            ${
                              isActive
                                ? "shadow-md scale-[1.02]"
                                : "text-gray-600 hover:translate-x-1"
                            }
                          `}
                        >
                          <Icon
                            size={item.size}
                            className={`
                              transition-transform duration-200 flex-shrink-0
                              ${isActive ? "scale-110" : "group-hover:scale-110"}
                            `}
                          />
                          <span className="flex-1 text-[16px]">
                            {item.label}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom Section - Logout */}
        <div className="px-4 mb-24">
          <SidebarMenu>
            <div className="bg-[#D00E111A] px-4 py-4 rounded-lg hover:bg-[#D00E111A] transition-colors duration-200">
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 w-full cursor-pointer group"
              >
                {loading ? (
                  <>
                    <LuLoader
                      className={` animate-spin text-center absolutem text-[#D00E11]`}
                    />
                  </>
                ) : (
                  <>
                    <IoIosLogOut
                      size={22}
                      className="text-[#D00E11] transition-transform duration-200 group-hover:scale-110"
                    />
                  </>
                )}

                <span className="text-[16px] font-medium text-[#D00E11]">
                  Logout
                </span>
              </button>
            </div>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
