import UpperNav from "@/components/dashboard/upperNav";
import ImpactBlock from "@/components/impactComp/impactBlock";
import { pageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = pageMetadata(
  "Impact Dashboard",
  "The system reassesses each risk as new observations arrive, updating confidence and recommended actions in real time. ",
  ["news", "pollution", "earth"]
)

export default function Impact() {
  return (
    <div className="w-full min-h-screen bg-white">
      <UpperNav />
      <div className="px-8 py-8">
        <ImpactBlock />
      </div>
    </div>
  );
}