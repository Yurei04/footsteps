// app/api/news/route.ts
import { NextResponse } from "next/server"

interface NewsItem {
    id: string
    author: string
    img: string
    time: number
    title: string
    link: string
}

const fakeNewsData: NewsItem[] = [
    {
        id: "1",
        author: "Climate Alert",
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
        time: 2024,
        title: "Extreme Rainfall Events Increase by 40%",
        link: "/news/1"
    },
    {
        id: "2",
        author: "Environmental Watch",
        img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=400&fit=crop",
        time: 2024,
        title: "Flood Risk Zones Expand Across Europe",
        link: "/news/2"
    },
    {
        id: "3",
        author: "Weather Report",
        img: "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=500&h=400&fit=crop",
        time: 2024,
        title: "Ground Saturation Levels at Critical Peaks",
        link: "/news/3"
    },
    {
        id: "4",
        author: "Risk Assessment",
        img: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=500&h=400&fit=crop",
        time: 2024,
        title: "Population Exposure Analysis Released",
        link: "/news/4"
    },
    {
        id: "5",
        author: "Climate Science",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=400&fit=crop",
        time: 2024,
        title: "New Predictive Models for Weather Patterns",
        link: "/news/5"
    },
]

export async function GET() {
    try {
        return NextResponse.json(fakeNewsData)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch news" },
            { status: 500 }
        )
    }
}