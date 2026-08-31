import UpperNav from "@/components/dashboard/upperNav";
import { Card } from "@/components/ui/card";
import { Separator } from "@base-ui/react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/riskMap/riskCompMap"));

export default function RiskMap() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <UpperNav />

      <Separator className="" />

      <div className="flex-1 overflow-hidden p-4">
        <div className="grid grid-cols-[2fr_1fr] gap-4 h-full">
          <div className="overflow-hidden rounded-lg ">
            <DynamicMap />
          </div>

          <div className="grid grid-rows-[1.5fr_1fr] gap-4 overflow-hidden">
            <Card className="overflow-hidden">
              <div className="p-4">
                <h2 className="font-semibold mb-4">Card 1</h2>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="p-4">
                <h2 className="font-semibold mb-4">Card 2</h2>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}