
import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import AppSidebar from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* <AppSidebar variant="inset" /> */}
      <AppSidebar/>
      <div className="flex flex-1 flex-col">
        <SiteHeader />
        <main className="flex-1 bg-[#F9FAFB] px-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
