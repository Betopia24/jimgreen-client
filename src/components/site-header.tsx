
"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { IoNotificationsOutline } from "react-icons/io5"
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  console.log(pathname)

  const notifications = [
    {
      id: 1,
      title: 'New message received',
      description: 'John sent you a message',
      time: '5 min ago',
      read: false,
      date: "23-04-2-25",
    },
    {
      id: 2,
      title: 'Project update',
      description: 'Your project has been approved',
      time: '1 hour ago',
      read: false,
      date: "23-04-2-25",
    },
    {
      id: 3,
      title: 'Meeting reminder',
      description: 'Team meeting starts in 30 minutes',
      time: '2 hours ago',
      read: true,
      date: "23-04-2-25",
    },
    {
      id: 4,
      title: 'Task completed',
      description: 'Design review task marked as done',
      time: '1 day ago',
      read: true,
      date: "23-04-2-25",
    },
    {
      id: 4,
      title: 'Task completed',
      description: 'Design review task marked as done',
      time: '1 day ago',
      read: true,
      date: "23-04-2-25",
    },
    {
      id: 4,
      title: 'Task completed',
      description: 'Design review task marked as done',
      time: '1 day ago',
      read: true,
      date: "23-04-2-25",
    },
    {
      id: 4,
      title: 'Task completed',
      description: 'Design review task marked as done',
      time: '1 day ago',
      read: true,
      date: "23-04-2-25",
    },
    {
      id: 4,
      title: 'Task completed',
      description: 'Design review task marked as done',
      time: '1 day ago',
      read: true,
      date: "23-04-2-25",
    },
    {
      id: 4,
      title: 'Task completed',
      description: 'Design review task marked as done',
      time: '1 day ago',
      read: true,
      date: "23-04-2-25",
    },
    {
      id: 4,
      title: 'Task completed',
      description: 'Design review task marked as done',
      time: '1 day ago',
      read: true,
      date: "23-04-2-25",
    },
    {
      id: 4,
      title: 'Task completed',
      description: 'Design review task marked as done',
      time: '1 day ago',
      read: true,
      date: "23-04-2-25",
    },
    {
      id: 4,
      title: 'Task completed',
      description: 'Design review task marked as done',
      time: '1 day ago',
      read: true,
      date: "23-04-2-25",
    },
  ];

  return (
    <header className="py-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-6 py-6 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        {
          (pathname === "/dashboard" || pathname === "/dashboard/home") && (
            <div>
              <h1 className="text-xl font-bold text-primaryBgColor">
                Welcome back, Md Shakil
              </h1>
              <p className="sm text-[#636F85]">
                Here's your meeting activity and insights for today.
              </p>
            </div>
          )
        }
        {
          pathname === "/dashboard/startNewMeeting" && (
            <div>
              <h1 className="text-xl font-bold text-primaryBgColor">
                Start New Meeting
              </h1>
              <p className="sm text-[#636F85]">
                Configure your AI-powered meeting simulation
              </p>
            </div>
          )
        }
        {
          pathname === "/dashboard/myAccount" && (
            <div>
              <h1 className="text-xl font-bold text-primaryBgColor">
                My Accounts
              </h1>
              <p className="sm text-[#636F85]">
                Manage your active accounts and opportunities
              </p>
            </div>
          )
        }
        {
          pathname === "/dashboard/dashboard" && (
            <div>
              <h1 className="text-xl font-bold text-primaryBgColor">
                Analytics Dashboard
              </h1>
              <p className="sm text-[#636F85]">
                Track your performance and insights
              </p>
            </div>
          )
        }
        {
          pathname === "/dashboard/settingPage" && (
            <div>
              <h1 className="text-xl font-bold text-primaryBgColor">
                Settings
              </h1>
              <p className="sm text-[#636F85]">
                Manage your account settings and preferences
              </p>
            </div>
          )
        }
        {
          pathname === "/dashboard/help" && (
            <div>
              <h1 className="text-xl font-bold text-primaryBgColor">
                Help
              </h1>
              <p className="sm text-[#636F85]">
                Manage your help
              </p>
            </div>
          )
        }
        <div className="ml-auto flex items-center gap-2">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                {/* Notification icon */}
                <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center relative cursor-pointer transition focus:none">
                  <IoNotificationsOutline size={20} className="text-[#2D2D2D]" />
                  {/* Purple dot */}
                  <span className="absolute top-3 right-3 w-2 h-2 bg-[#6E51E0] rounded-full" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-96 h-95 border border-gray-50">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="hover:bg-gray-100 transition-shadow px-4 py-3"
                  >
                    <button
                      type="button"
                      className="w-full text-left flex items-start gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                          <Bell className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-base">
                          {/* {notification.title} */}
                        </h3>
                        <p className="text-[#2D2D2D] text-sm">
                          {notification.description}
                        </p>
                        <time className="text-[#2D2D2D] text-sm">
                          {notification.date}
                        </time>
                      </div>
                    </button>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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



