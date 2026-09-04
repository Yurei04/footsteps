// app/monitoring/page.tsx
import UpperNav from "@/components/dashboard/upperNav"
import EventTimeline from "@/components/monitoring/eventTimeline"
import EventProgress from "@/components/monitoring/eventsProgress"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Monitoring Hub Stay ahead of change",
  "The system reassesses each risk as new observations arrive, updating confidence and recommended actions in real time. ",
  ["news", "pollution", "earth"]
)

export default function Monitoring() {
    return (
        <div className="w-full h-screen">
            <UpperNav/>

            <div className="flex flex-col p-4 pl-8 mb-4 justify-between gap-2">
                <h2 className=" font-thin text-md text-[var(--text-muted)]"> MONITORING · CONTINUOUS MONITORING </h2>
                <h1 className="text-4xl text-black "> Stay ahead of change. </h1>
                <p className="line-clamp-2"> The system reassesses each risk as new observations arrive, updating confidence and recommended actions in real time. </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6">
                <div className="lg:col-span-2 space-y-8">
                    <EventTimeline />
                </div>

                <div>
                    <EventProgress />
                </div>
            </div>
        </div>
    )
}