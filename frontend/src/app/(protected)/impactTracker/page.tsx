
import ImpactBlock from "@/components/impactComp/impactBlock";
import { pageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = pageMetadata(
  "Impact Dashboard",
  "Track the environmental and community outcomes of active response plans over time — events logged, actions completed, and areasstabilised.",
  ["impact", "pollution", "earth"]
)

export default function Impact() {
  return (
    <div 
      className="w-full min-h-screen bg-white"
      role="application"
      aria-label="Impact tracking and measurement application"
    >

      <header 
        className="mb-8 px-8 pt-8"
        aria-describedby="impact-description"
      >
        <p 
          className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4"
          aria-label="Page section"
        >
          Impact Tracker
        </p>
        <h1 
          className="text-4xl font-light text-black mb-3"
          id="page-title"
        >
          Measure what changes.
        </h1>
        <p 
          className="text-gray-600 max-w-3xl"
          id="impact-description"
        >
          Track the environmental and community outcomes of active response
          plans over time — events logged, actions completed, and areas
          stabilised.
        </p>
      </header>

      <main 
        role="main"
        aria-labelledby="page-title"
        aria-describedby="impact-description"
        className="px-8 py-8"
      >
        <section 
          aria-labelledby="impact-heading"
          role="region"
          aria-label="Impact tracking metrics and data"
        >
          <h2 
            className="sr-only"
            id="impact-heading"
          >
            Response Plan Impact Metrics
          </h2>
          <ImpactBlock />
        </section>
      </main>
    </div>
  );
}