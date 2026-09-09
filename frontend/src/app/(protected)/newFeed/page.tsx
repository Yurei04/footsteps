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
          className="w-full"
          role="application"
          aria-label="News and insights feed application"
        >
            <header 
              className="flex-col p-4 pl-8 mb-4"
              aria-describedby="news-description"
            >
                <p 
                  className="font-thin text-md text-[var(--text-muted)] uppercase tracking-widest"
                  aria-label="Page section"
                >
                    NEWS & INSIGHTS
                </p>

                <h1 
                  className="text-4xl text-black"
                  id="page-title"
                >
                    The local story, live.
                </h1>

                <p 
                  className="line-clamp-3"
                  id="news-description"
                >
                    National and local signals matched to active conditions.
                    Curated public reports are matched against active
                    environmental conditions.
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