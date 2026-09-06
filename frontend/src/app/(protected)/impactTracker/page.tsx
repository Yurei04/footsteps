import UpperNav from "@/components/dashboard/upperNav";
import ImpactBlock from "@/components/impactComp/impactBlock";

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