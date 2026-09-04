import UpperNav from "@/components/dashboard/upperNav"
import ResourceCard from "@/components/resources/resourceCard"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Reference materials",
  "Protocols, frameworks, and technical references for field teams and system operators.",
  ["references", "pollution", "earth"]
)


interface ResourceData {
    id: string
    title: string
    desc: string
    type: string
    link: string
}

const tempResource: ResourceData[] = [
    {
        id: "1",
        title: "Extreme Rainfall Events Increase by 40%",
        desc: "New climate data shows significant increase in extreme rainfall patterns across regions.",
        type: "Climate Alert",
        link: "/news/1"
    },
    {
        id: "2",
        title: "Flood Risk Zones Expand Across Europe",
        desc: "Environmental zones affected by flooding have expanded significantly this year.",
        type: "Environmental Watch",
        link: "/news/2"
    },
    {
        id: "3",
        title: "Ground Saturation Levels at Critical Peaks",
        desc: "Recent measurements show ground saturation reaching critical thresholds.",
        type: "Weather Report",
        link: "/news/3"
    },
    {
        id: "4",
        title: "Population Exposure Analysis Released",
        desc: "Comprehensive analysis of population exposure to flood risks published.",
        type: "Risk Assessment",
        link: "/news/4"
    },
    {
        id: "5",
        title: "New Predictive Models for Weather Patterns",
        desc: "Advanced models improve accuracy of weather and flood predictions.",
        type: "Climate Science",
        link: "/news/5"
    },
]

export default function Resources() {
    return (
        <div className="w-full">
            <UpperNav />

            <div className="flex-col p-4 pl-8 mb-4 justify-between">
                <h2 className=" font-thin text-md text-[var(--text-muted)]"> RESOURCES </h2>
                <h1 className="text-4xl text-black "> Reference materials. </h1>
                <p className="line-clamp-3"> Protocols, frameworks, and technical references for field teams and system operators.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 contain-content content-visibility-auto">
                {tempResource.map((resource) => (
                    <div
                        key={resource.id}
                        className="contain-layout contain-paint"
                    >
                        <ResourceCard
                            title={resource.title}
                            desc={resource.desc}
                            type={resource.type}
                            link={resource.link}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}