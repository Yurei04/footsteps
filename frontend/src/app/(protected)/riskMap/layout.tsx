import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/sidebar"
import { Metadata, Viewport } from "next"
import { defaultMetadata, defaultViewport } from "@/lib/metadata"

export const metadata: Metadata = defaultMetadata
export const viewport: Viewport = defaultViewport

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