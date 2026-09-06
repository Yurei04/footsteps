import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/sidebar"
import { Metadata } from "next"
import { defaultMetdata } from "@/lib/metadata"

export const metadata: Metadata = defaultMetdata

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