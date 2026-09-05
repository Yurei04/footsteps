// app/api/eventTimeline/route.ts
import { NextResponse } from "next/server"

interface Event {
    id: string
    title: string
    time: string
    status: string
    severity: "High" | "Verified" | "Watch" | "Ready"
    timestamp: number
    description: string
    details: string
}

const initialEvents: Event[] = [
    {
        id: "1",
        title: "Rainfall threshold crossed",
        time: "08:42",
        status: "High",
        severity: "High",
        timestamp: Date.now(),
        description: "Rainfall monitoring alert",
        details: "Rainfall has exceeded safe threshold levels in monitoring zone. Action required for population alert.",
    },
    {
        id: "2",
        title: "Doppler radar validates intensity",
        time: "08:37",
        status: "Verified",
        severity: "Verified",
        timestamp: Date.now() - 300000,
        description: "Radar validation complete",
        details: "Doppler radar systems have verified the intensity of rainfall patterns across the region.",
    },
    {
        id: "3",
        title: "River level +12 cm in 30 min",
        time: "08:18",
        status: "Watch",
        severity: "Watch",
        timestamp: Date.now() - 1440000,
        description: "River level monitoring alert",
        details: "River levels have risen 12 cm within a 30-minute window. Close monitoring recommended.",
    },
    {
        id: "4",
        title: "AI action plan refreshed",
        time: "07:59",
        status: "Ready",
        severity: "Ready",
        timestamp: Date.now() - 2700000,
        description: "System status update",
        details: "AI-generated action plan has been updated based on latest environmental data.",
    },
]

export async function GET() {
    try {
        // const response = await fetch("https://your-api.com/events")
        // return NextResponse.json(await response.json())

        return NextResponse.json(initialEvents)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        )
    }
}

export const revalidate = 60