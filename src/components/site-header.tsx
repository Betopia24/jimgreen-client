
"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  console.log(pathname)

  return (
    <header className="py-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-6 py-6 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        {/* {
          (pathname === "/dashboard/dashboard" || pathname === "/dashboard/dashboard") && (
            <div>
              <h1 className="text-xl font-bold text-primaryColor">
                Welcome back, Md Shakil
              </h1>
              <p className="sm text-[#636F85]">
                Here's your Chemistry Analysis Platform
              </p>
            </div>
          )
        } */}
        <div>
          <h1 className="text-xl font-bold text-primaryColor">
            Welcome back, Md Shakil
          </h1>
          <p className="sm text-[#636F85]">
            Here's your Chemistry Analysis Platform
          </p>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          {/* Profile */}
          <div className="flex items-center gap-2 bg-[#F3F4F6] rounded-full px-3 py-1.5">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-[#d2caf0]">
              <Image
                src="/dashboardImage/profileImage.svg"
                width={28}
                height={28}
                alt="User"
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-[#2D2D2D]">
              Md Shakil
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}



