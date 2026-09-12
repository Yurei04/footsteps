import NewsFeedComp from "@/components/newsFeed/newsFeedComp"
import { pageMetadata } from "@/lib/metadata"
import { Metadata } from "next"

export const metadata: Metadata = pageMetadata(
  "News and insights",
  "National and local signals matched to active conditions. Curated public reports are matched against active environmental conditions.",
  ["news", "pollution", "earth"]
)

export default function News() {
    return (
        <div 
          className="w-full bg-background p-4"
          role="application"
          aria-label="News and insights feed application"
        >
            <header 
              className="flex-col p-4 pl-8 my-4"
              aria-describedby="news-description"
            >
                <p 
                  className="font-thin text-[11px] text-primary uppercase tracking-widest"
                  aria-label="Page section"
                >
                    NEWS  &  INSIGHTS  ·  GLOBAL HOTSPOTS
                </p>

                <h1 
                  className="text-6xl text-forefround"
                  id="page-title"
                >
                    The global story, live.
                </h1>

                <p 
                  className="line-clamp-3 w-1/2 text-muted-foreground mt-2"
                  id="news-description"
                >
                    Public reporting matched against the 8 active Risk Map hotspots — so the response team sees what weather data alone cannot explain.
                </p>
            </header>

            <main 
              role="main"
              aria-labelledby="page-title"
              aria-describedby="news-description"
            >
              <section 
                aria-label="News feed"
                role="region"
                aria-live="polite"
                aria-atomic="false"
              >
                <NewsFeedComp />
              </section>
            </main>
        </div>
    )
}