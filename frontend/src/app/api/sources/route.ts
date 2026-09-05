// app/api/sources/route.ts
import { NextResponse } from "next/server"

interface SourceStatus {
    id: string
    name: string
    current: number
    total: number
    color: string
}

const fakeSources: SourceStatus[] = [
    {
        id: "1",
        name: "Weather stations",
        current: 6,
        total: 6,
        color: "bg-cyan-400"
    },
    {
        id: "2",
        name: "News & public signals",
        current: 6,
        total: 6,
        color: "bg-orange-400"
    },
    {
        id: "3",
        name: "Risk model layers",
        current: 6,
        total: 6,
        color: "bg-cyan-400"
    },
]

export async function GET() {
    try {
        // const response = await fetch("https://your-api.com/sources")
        // return NextResponse.json(await response.json())

        return NextResponse.json(fakeSources)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sources" },
            { status: 500 }
        )
    }
}