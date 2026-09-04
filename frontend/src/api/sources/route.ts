// app/api/sources/route.ts
import { NextResponse } from "next/server"

export async function GET() {
    try {
        // Replace with your real API
        // const response = await fetch("https://your-api.com/sources")
        // return NextResponse.json(await response.json())

        // For now, return fake data
        return NextResponse.json([
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
        ])
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sources" },
            { status: 500 }
        )
    }
}