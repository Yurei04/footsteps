import UpperNav from "@/components/dashboard/upperNav"
import ResourceFeedComp from "@/components/resources/resourceFeedComp"
import { pageMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = pageMetadata(
  "Reference materials",
  "Protocols, frameworks, and technical references for field teams and system operators.",
  ["references", "pollution", "earth"]
)

export default function Resources() {
    return (
        <div 
          className="w-full"
          role="application"
          aria-label="Reference materials and resources application"
        >
            <UpperNav />

            <header 
              className="flex-col p-4 pl-8 mb-4 justify-between"
              aria-describedby="resources-description"
            >
                <p 
                  className="font-thin text-md text-[var(--text-muted)] uppercase tracking-widest"
                  aria-label="Page section"
                >
                  RESOURCES
                </p>
                <h1 
                  className="text-4xl text-black"
                  id="page-title"
                >
                  Reference materials.
                </h1>
                <p 
                  className="line-clamp-3"
                  id="resources-description"
                >
                  Protocols, frameworks, and technical references for field teams and system operators.
                </p>
            </header>

            <main 
              role="main"
              aria-labelledby="page-title"
              aria-describedby="resources-description"
            >
              <section 
                aria-label="Resource feed"
                role="region"
              >
                <ResourceFeedComp />
              </section>
            </main>
        </div>
    )
}