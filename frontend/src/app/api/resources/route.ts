
import { NextResponse } from "next/server"

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

export async function GET() {
    try {
        return NextResponse.json(tempResource)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        )
    }
}

export const revalidate = 60