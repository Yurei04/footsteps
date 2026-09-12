import HotSpotDetails from "@/components/riskMap/hotSpotDetail"
import { HotspotStats } from "@/components/riskMap/hotspotStats"
import MapRefresh from "@/components/riskMap/mapRefresh"
import { HotspotMap } from "@/components/riskMap/riskCompMap"
import { Card } from "@/components/ui/card"
import { pageMetadata } from "@/lib/metadata"
import { Separator } from "@base-ui/react"
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
      className="w-full h-screen bg-background text-foreground flex flex-col overflow-hidden"
      role="application"
      aria-label="Environmental risk map application"
    >

      <header className="flex-col px-8 py-8">
        <p 
          className="tracking-widest font-thin text-xs text-primary uppercase"
          aria-label="Page section"
        >
          ENVIRONMENTAL RISK MAP · COUNTRY
        </p>
        <h1 
          className="text-4xl text-foreground"
          id="page-title"
        >
          Flood & Heavy Rainfall
        </h1>
        <p 
          className="line-clamp-3 text-muted-foreground"
          id="page-description"
        >
          Risk hotspots combine forecast intensity, ground saturation, exposure, and documented historical impacts.
        </p>
      </header>
      <Separator />
      <main 
        className="flex-1 overflow-hidden px-4 pb-4"
        aria-labelledby="page-title"
        aria-describedby="page-description"
        role="main"
      >
        <div 
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] h-full"
          role="region"
          aria-label="Risk map and details section"
        >

          <section 
            className="overflow-hidden border border-border"
            aria-labelledby="map-title"
            aria-describedby="map-description"
          >
            <div className="relative h-full flex flex-col">
              <div 
                className="w-full flex-1 relative z-10 overflow-hidden"
                id="map-description"
                aria-live="polite"
                aria-label="Interactive environmental risk map"
              >

                <div className="w-full">
                  <HotspotMap 
                    height="h-[600px]"
                    center={[0, 20]} 
                    zoom={2} />
                </div>
              </div>
            </div>
          </section>
          <Card 
            className="overflow-hidden bg-background rounded-none border border-border"
            role="region"
            aria-labelledby="hotspot-heading"
          >
            <div className="p-4 h-screen overflow-y-auto">
              <HotSpotDetails />
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}