"use client"
import { useState, useMemo, useEffect } from "react"
import { Search } from "lucide-react"
import NewsFeedCard from "./newsFeedCard"

interface NewsItem {
    id: string
    author: string
    img: string
    time: number
    title: string
    link: string
}

export default function NewsFeedComp() {
    const [newsData, setNewsData] = useState<NewsItem[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchNews = async () => {
            try {
                console.log("Fetching news...")
                const res = await fetch("/api/news")
                const data = await res.json()
                console.log("Fetched news:", data)
                setNewsData(data)
            } catch (error) {
                console.error("Failed to fetch news:", error)
            }
        }
        fetchNews()
    }, [])

    const filteredNews = useMemo(() => {
        return newsData.filter((news) =>
            news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            news.author.toLowerCase().includes(searchQuery.toLowerCase())
        )

    }, [searchQuery, newsData])
    return (
        <>
            <div className="mb-4 mt-2 flex justify-center">
                <div className="relative max-w-4xl w-full">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />

                    <input
                        type="text"
                        placeholder="Search news by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6 p-4">
                {filteredNews.map((news) => (
                    <NewsFeedCard
                        key={news.id}
                        author={news.author}
                        img="/images/logo2.jpeg"
                        time={news.time}
                        title={news.title}
                        link={news.link}
                    />
                ))}
            </div>
        </>
    )
}