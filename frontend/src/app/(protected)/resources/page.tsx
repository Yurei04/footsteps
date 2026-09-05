import UpperNav from "@/components/dashboard/upperNav"
import ResourceFeedComp from "@/components/resources/resourceFeedComp"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Reference materials",
  "Protocols, frameworks, and technical references for field teams and system operators.",
  ["references", "pollution", "earth"]
)

export default function Resources() {
    return (
        <div className="w-full">
            <UpperNav />

            <div className="flex-col p-4 pl-8 mb-4 justify-between">
                <h2 className=" font-thin text-md text-[var(--text-muted)]"> RESOURCES </h2>
                <h1 className="text-4xl text-black "> Reference materials. </h1>
                <p className="line-clamp-3"> Protocols, frameworks, and technical references for field teams and system operators.</p>
            </div>
            <ResourceFeedComp />
        </div>
    )
}