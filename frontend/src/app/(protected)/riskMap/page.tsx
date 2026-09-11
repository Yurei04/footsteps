import HotSpotDetails from "@/components/riskMap/hotSpotDetail"
import { HotspotStats } from "@/components/riskMap/hotspotStats"
import MapRefresh from "@/components/riskMap/mapRefresh"
import { HotspotMap } from "@/components/riskMap/riskCompMap"
import { Card } from "@/components/ui/card"
import { pageMetadata } from "@/lib/metadata"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"

export const metadata: Metadata = pageMetadata(
  "Risk Map",
  "Risk hotspots combine forecast intensity, ground saturation, exposure, and documented historical impacts.",
  ["risks", "map", "earth"]
)

export default function RiskMap() {
  return (
    <div 
      className="w-full min-h-screen bg-background text-foreground flex flex-col overflow-hidden"
      role="application"
      aria-label="Environmental risk map application"
    >

      <header className="flex-col px-8 py-4">
        <p 
          className="tracking-widest font-thin text-xs text-muted-foreground uppercase"
          aria-label="Page section"
        >
          RISK MAP · ENVIRONMENTAL ANALYSIS
        </p>
        <h1 
          className="text-2xl font-bold text-foreground"
          id="page-title"
        >
          See pressure before impact.
        </h1>
        <p 
          className="line-clamp-3 text-muted-foreground"
          id="page-description"
        >
          Risk hotspots combine forecast intensity, ground saturation, exposure, and documented historical impacts.
        </p>
      </header>

      <main 
        className="flex-1 overflow-hidden px-4 pb-4"
        aria-labelledby="page-title"
        aria-describedby="page-description"
        role="main"
      >
        <div 
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 h-full"
          role="region"
          aria-label="Risk map and details section"
        >

          <section 
            className="overflow-hidden border border-border rounded-lg lg:rounded-xl"
            aria-labelledby="map-title"
            aria-describedby="map-description"
          >
            <div className="relative h-full flex flex-col">
              <header className="flex flex-col lg:flex-row lg:justify-between bg-card border-b border-border rounded-t-lg p-6 relative z-0">
                <div className="flex-col mb-4 lg:mb-0">
                  <p 
                    className="tracking-widest font-thin text-xs text-primary uppercase"
                    aria-label="Section context"
                  >
                    ENVIRONMENTAL RISK MAP · COUNTRY
                  </p>
                  <h2 
                    className="text-2xl font-bold text-foreground"
                    id="map-title"
                  >
                    Flood & Heavy Rainfall
                  </h2>
                </div>
                <Link 
                  href="/dashboard"
                  className="cursor-pointer rounded-lg px-4 py-2 border border-border text-foreground text-md hover:bg-muted transition-colors self-start lg:self-auto"
                  aria-label="Open full system dashboard"
                  role="button"
                >
                  Open System
                </Link>
              </header>

              <div 
                className="w-full flex-1 relative z-10 overflow-hidden"
                id="map-description"
                aria-live="polite"
                aria-label="Interactive environmental risk map"
              >
                      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <HotspotStats />
        </div>
      </div>
 
      {/* Map Section */}
      <div className="w-full">
        <HotspotMap height="h-[600px]" center={[0, 20]} zoom={2} />
      </div>
              </div>
            </div>
          </section>
          <aside 
            className="grid grid-rows-2 gap-4 overflow-hidden"
            aria-label="Risk details and updates sidebar"
          >
            <Card 
              className="overflow-hidden border border-border bg-card"
              role="region"
              aria-labelledby="hotspot-heading"
            >
              <div className="p-4 h-full overflow-y-auto">
                <h2 
                  className="sr-only"
                  id="hotspot-heading"
                >
                  Hotspot Details
                </h2>
                <HotSpotDetails />
              </div>
            </Card>

            <Card 
              className="overflow-hidden border border-border bg-card"
              role="region"
              aria-labelledby="refresh-heading"
            >
              <div className="p-4 h-full overflow-y-auto">
                <h2 
                  className="sr-only"
                  id="refresh-heading"
                >
                  Map Refresh and Updates
                </h2>
                <MapRefresh />
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}