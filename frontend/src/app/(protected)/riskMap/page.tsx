import UpperNav from "@/components/dashboard/upperNav";
import HotSpotDetails from "@/components/riskMap/hotSpotDetail";
import MapRefresh from "@/components/riskMap/mapRefresh";
import { Card } from "@/components/ui/card";
import { pageMetadata } from "@/lib/metadata";
import { Separator } from "@base-ui/react";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicMap = dynamic(() => import("@/components/riskMap/riskCompMap"));

export const metadata = pageMetadata(
  "Risk Map",
  "Risk hotspots combine forecast intensity, ground saturation, exposure, and documented historical impacts.",
  ["risks", "map", "earth"]
)


export default function RiskMap() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <UpperNav />

      <Separator className="" />

      <div className="flex-col pl-8 mb-4">
        <h2 className="tracking-widest font-thin text-xs text-[var(--text-muted)]"> RISK MAP · ENVIRONMENTAL ANALYSIS </h2>
        <h1 className="text-2xl text-black "> See pressure before impact. </h1>
        <p className="line-clamp-3"> Risk hotspots combine forecast intensity, ground saturation, exposure, and documented historical impacts. </p>
      </div>

      <div className="flex-1 overflow-hidden p-4">
        <div className="grid grid-cols-[2fr_1fr] gap-4 h-full">
          
        <div className="overflow-hidden border-x-2 border-t-2 rounded-lg">
          <div className="relative ">
            <div className="flex justify-between bg-white rounded-t-3xl p-6 relative z-0">
              <div className="flex-col">
                  <p className="tracking-widest font-thin text-xs text-[#00C8B3]">
                  ENVIRONMENTAL RISK MAP · COUNTRY
                  </p>
                  <h1 className="text-2xl font-bold">Flood & Heavy Rainfall</h1>
              </div>
              <Link 
                href="/dashboard"
                className="cursor-pointer rounded-lg p-2 border text-black text-md"
              >
                Open System
              </Link>
            </div>

            <div className="w-full relative z-10">
              <DynamicMap />
            </div>
          </div>
        </div>

          <div className="grid grid-rows-[1.5fr_1fr] gap-4 overflow-hidden">
            <Card className="overflow-hidden p-4 border">
                <HotSpotDetails  />
            </Card>

            <Card className="overflow-hidden p-4 border">
              <MapRefresh />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}