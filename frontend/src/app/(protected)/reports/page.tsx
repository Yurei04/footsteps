import UpperNav from "@/components/dashboard/upperNav";
import AgentBlock from "@/components/reportsComp/agentBlock";
import ReportsBlock from "@/components/reportsComp/reportsBlock";

export default function Reports() {
  return (
    <div className="w-full min-h-screen bg-white">
      <UpperNav />
      <div className="flex-col p-4 pl-8 mb-8">
        <h2 className="font-thin text-md text-gray-500">NEWS & INSIGHTS</h2>
        <h1 className="text-4xl text-black mt-2">The local story, live.</h1>
        <p className="text-gray-700 mt-3 max-w-2xl">
          National and local signals matched to active conditions. Curated
          public reports are matched against active environmental conditions.
        </p>
      </div>
      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <AgentBlock />
          </div>
          <div className="lg:col-span-2">
            <ReportsBlock />
          </div>
        </div>
      </div>
    </div>
  );
}