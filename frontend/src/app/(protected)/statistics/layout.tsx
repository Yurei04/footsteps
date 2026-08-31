import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
            {children}
        </main>
    </SidebarProvider>
  )
}