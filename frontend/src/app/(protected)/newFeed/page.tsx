import NewsFeedComp from "@/components/newsFeed/newsFeedComp"
import UpperNav from "@/components/dashboard/upperNav"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "News and insights",
  " National and local signals matched to active conditions. Curated public reports are matched against active environmental conditions.",
  ["news", "pollution", "earth"]
)

export default function News() {
    return (
        <div className="w-full">
            <UpperNav />
            <div className="flex-col p-4 pl-8 mb-4">
                <h2 className="font-thin text-md text-[var(--text-muted)]">
                    NEWS & INSIGHTS
                </h2>

                <h1 className="text-4xl text-black">
                    The local story, live.
                </h1>

                <p className="line-clamp-3">
                    National and local signals matched to active conditions.
                    Curated public reports are matched against active
                    environmental conditions.
                </p>
            </div>
            <NewsFeedComp />
        </div>
    )
}