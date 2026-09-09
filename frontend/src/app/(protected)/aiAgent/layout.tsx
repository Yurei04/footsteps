import type { Metadata, Viewport } from "next"
import { defaultMetadata, defaultViewport } from "@/lib/metadata"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { CombinedNavigation } from "@/components/dashboard/navigation"

export const metadata: Metadata = defaultMetadata
export const viewport: Viewport = defaultViewport

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <CombinedNavigation>
        {children}
      </CombinedNavigation>
    </ThemeProvider>
  )
}