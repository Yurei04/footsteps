"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import NewsFeedCard from "@/components/newsFeed/newsFeedCard"
import UpperNav from "@/components/dashboard/upperNav"
import { Separator } from "@/components/ui/separator"

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

export default function NewsFeed() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredNews = useMemo(() => {
        return fakeNewsData.filter((news) =>
            news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            news.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    return (
        <div className="w-full">
            <UpperNav />

            <div className="flex-col p-4 pl-8 mb-4 justify-between">
                <h2 className=" font-thin text-md text-[var(--text-muted)]"> NEWS & INSIGHTS </h2>
                <h1 className="text-4xl text-black "> The local story, live. </h1>
                <p className="line-clamp-3"> National and local signals matched to active conditions. Curated public reports are matched against active environmental conditions, <br/> so the response team sees what data alone cannot explain. </p>
            </div>
            <div className="mb-4 mt-2 flex justify-center">
                <div className="relative max-w-4xl w-full">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search news by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6 p-4 [contain-content] [content-visibility-auto] [contain-instrinsic: 500px]">
                {filteredNews.length > 0 ? (
                    filteredNews.map((news) => (
                        <NewsFeedCard
                            key={news.id}
                            author={news.author}
                            img={"/images/logo2.jpeg"}
                            time={news.time}
                            title={news.title}
                            link={news.link}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No news found. Try a different search.</p>
                    </div>
                )}
            </div>
        </div>
    )
}