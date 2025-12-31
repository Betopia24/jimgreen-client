
"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  console.log(pathname)

  return (
    <header className="flex h-auto shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-2 py-4 lg:py-6">
        {/* Left section: Trigger + Welcome text */}
        <div className="flex items-start gap-2 w-full lg:w-auto">
          <SidebarTrigger className="mt-1 lg:mt-0" />
          {/* {
//           (pathname === "/dashboard/dashboard" || pathname === "/dashboard/dashboard") && (
//             <div>
//               <h1 className="text-xl font-bold text-primaryColor">
//                 Welcome back, Md Shakil
//               </h1>
//               <p className="sm text-[#636F85]">
//                 Here's your Chemistry Analysis Platform
//               </p>
//             </div>
//           )
//         } */}
          <div className="flex-1">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-primaryColor">
              Welcome back, Md Shakil
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-[#636F85] mt-0.5">
              Here's your Chemistry Analysis Platform
            </p>
          </div>
        </div>

        {/* Right section: Profile */}
        <div className="w-full lg:w-auto lg:ml-auto flex justify-end">
          <div className="flex items-center gap-2 bg-[#F3F4F6] rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden bg-[#d2caf0] flex-shrink-0">
              <Image
                src="/dashboardImage/profileImage.svg"
                width={28}
                height={28}
                alt="User"
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#2D2D2D] whitespace-nowrap">
              Md Shakil
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}