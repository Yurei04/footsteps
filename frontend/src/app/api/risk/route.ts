import { NextResponse } from "next/server"


interface Hotspot {
    id: string
    location: string
    rating: number
    riskType: string
    time: number
    rainfallTrigger: number
    groundSaturation: number
    populationExposure: number
}

const hotspots: Hotspot[] = [
    {
        id: "1",
        location: "Marikina River Basin",
        rating: 85,
        riskType: "High Risk",
        time: 2024,
        rainfallTrigger: 120,
        groundSaturation: 75,
        populationExposure: 2500000,
    },
]

export async function GET() {
    try {
        return NextResponse.json(hotspots)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        )
    }
}

export const revalidate = 100