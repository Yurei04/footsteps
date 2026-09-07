// app/monitoring/page.tsx
import UpperNav from "@/components/dashboard/upperNav"
import EventTimeline from "@/components/monitoring/eventTimeline"
import EventProgress from "@/components/monitoring/eventsProgress"
import { pageMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = pageMetadata(
  "Monitoring Hub Stay ahead of change",
  "The system reassesses each risk as new observations arrive, updating confidence and recommended actions in real time. ",
  ["news", "pollution", "earth"]
)

export default function Monitoring() {
    return (
        <div 
          className="w-full h-screen"
          role="application"
          aria-label="Continuous monitoring and event tracking application"
        >
            <UpperNav />

            <header 
              className="flex flex-col p-4 pl-8 mb-4 justify-between gap-2"
              aria-describedby="monitoring-description"
            >
                <p 
                  className="font-thin text-md text-[var(--text-muted)] uppercase tracking-widest"
                  aria-label="Page section"
                >
                  MONITORING · CONTINUOUS MONITORING
                </p>
                <h1 
                  className="text-4xl text-black"
                  id="page-title"
                >
                  Stay ahead of change.
                </h1>
                <p 
                  className="line-clamp-2"
                  id="monitoring-description"
                >
                  The system reassesses each risk as new observations arrive, updating confidence and recommended actions in real time.
                </p>
            </header>

            <main 
              role="main"
              aria-labelledby="page-title"
              aria-describedby="monitoring-description"
            >
              <div 
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6"
                role="region"
                aria-label="Monitoring dashboard section"
              >
                <section 
                  className="lg:col-span-2 space-y-8"
                  aria-labelledby="timeline-heading"
                  role="region"
                >
                  <h2 
                    className="sr-only"
                    id="timeline-heading"
                  >
                    Event Timeline
                  </h2>
                  <EventTimeline />
                </section>

                <aside 
                  className="lg:col-span-1"
                  aria-label="Progress tracking sidebar"
                  role="complementary"
                >
                  <section
                    aria-labelledby="progress-heading"
                    role="region"
                  >
                    <h2 
                      className="sr-only"
                      id="progress-heading"
                    >
                      Event Progress
                    </h2>
                    <EventProgress />
                  </section>
                </aside>
              </div>
            </main>
        </div>
    )
}