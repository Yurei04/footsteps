import UpperNav from "@/components/dashboard/upperNav";
import HotSpotDetails from "@/components/riskMap/hotSpotDetail";
import MapRefresh from "@/components/riskMap/mapRefresh";
import { Card } from "@/components/ui/card";
import { pageMetadata } from "@/lib/metadata";
import { Separator } from "@base-ui/react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicMap = dynamic(() => import("@/components/riskMap/riskCompMap"));

export const metadata: Metadata = pageMetadata(
  "Risk Map",
  "Risk hotspots combine forecast intensity, ground saturation, exposure, and documented historical impacts.",
  ["risks", "map", "earth"]
)


export default function RiskMap() {
  return (
    <div 
      className="w-full h-screen overflow-hidden flex flex-col"
      role="application"
      aria-label="Environmental risk map application"
    >
      <UpperNav />

      <Separator 
        className=""
        role="presentation"
        aria-hidden="true"
      />

      <header className="flex-col pl-8 mb-4">
        <p 
          className="tracking-widest font-thin text-xs text-[var(--text-muted)] uppercase"
          aria-label="Page section"
        >
          RISK MAP · ENVIRONMENTAL ANALYSIS
        </p>
        <h1 
          className="text-2xl text-black"
          id="page-title"
        >
          See pressure before impact.
        </h1>
        <p 
          className="line-clamp-3"
          id="page-description"
        >
          Risk hotspots combine forecast intensity, ground saturation, exposure, and documented historical impacts.
        </p>
      </header>

      <main 
        className="flex-1 overflow-hidden p-4"
        aria-labelledby="page-title"
        aria-describedby="page-description"
        role="main"
      >
        <div 
          className="grid grid-cols-[2fr_1fr] gap-4 h-full"
          role="region"
          aria-label="Risk map and details section"
        >
          
          <section 
            className="overflow-hidden border-x-2 border-t-2 rounded-lg"
            aria-labelledby="map-title"
            aria-describedby="map-description"
          >
            <div className="relative">
              <header className="flex justify-between bg-white rounded-t-3xl p-6 relative z-0">
                <div className="flex-col">
                  <p 
                    className="tracking-widest font-thin text-xs text-[#00C8B3] uppercase"
                    aria-label="Section context"
                  >
                    ENVIRONMENTAL RISK MAP · COUNTRY
                  </p>
                  <h2 
                    className="text-2xl font-bold"
                    id="map-title"
                  >
                    Flood & Heavy Rainfall
                  </h2>
                </div>
                <Link 
                  href="/dashboard"
                  className="cursor-pointer rounded-lg p-2 border text-black text-md hover:bg-gray-50 transition-colors"
                  aria-label="Open full system dashboard"
                  role="button"
                >
                  Open System
                </Link>
              </header>

              <div 
                className="w-full relative z-10"
                id="map-description"
                aria-live="polite"
                aria-label="Interactive environmental risk map"
              >
                <DynamicMap />
              </div>
            </div>
          </section>

          <aside 
            className="grid grid-rows-[1.5fr_1fr] gap-4 overflow-hidden"
            aria-label="Risk details and updates sidebar"
          >
            <Card 
              className="overflow-hidden p-4 border"
              role="region"
              aria-labelledby="hotspot-heading"
            >
              <h2 
                className="sr-only"
                id="hotspot-heading"
              >
                Hotspot Details
              </h2>
              <HotSpotDetails />
            </Card>

            <Card 
              className="overflow-hidden p-4 border"
              role="region"
              aria-labelledby="refresh-heading"
            >
              <h2 
                className="sr-only"
                id="refresh-heading"
              >
                Map Refresh and Updates
              </h2>
              <MapRefresh />
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}