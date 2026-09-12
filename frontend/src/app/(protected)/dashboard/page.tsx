import { MainContent } from "@/components/dashboard/mainDashboard"
import { pageMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = pageMetadata(
  "Main Dasboard",
  "Track the environmental and community outcomes of active response plans over time — events logged, actions completed, and areasstabilised.",
  ["impact", "pollution", "earth"]
)

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <MainContent />
    </div>
  )
}