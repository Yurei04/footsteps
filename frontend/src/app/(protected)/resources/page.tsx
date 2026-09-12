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
          className="w-full bg-[var(--background)]"
          role="application"
          aria-label="Reference materials and resources application"
        >
            <header 
              className="flex-col p-4 pl-8 my-4"
              aria-describedby="resources-description"
            >
                <p 
                  className="font-thin text-[11px] text-primary uppercase tracking-widest"
                  aria-label="Page section"
                >
                  RESOURCES
                </p>
                <h1 
                  className="text-6xl text-foregroun"
                  id="page-title"
                >
                  Reference materials.
                </h1>
                <p 
                  className="line-clamp-3 text-muted-foreground mt-2"
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