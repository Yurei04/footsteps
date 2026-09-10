import { AppSidebar } from "@/components/dashboard/sidebar"
import UpperNav from "@/components/dashboard/upperNav"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <UpperNav />

        <main className="px-8 pb-10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}