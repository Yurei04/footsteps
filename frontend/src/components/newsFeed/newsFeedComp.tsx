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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                console.log("Fetching news...")
                const res = await fetch("/api/news")
                const data = await res.json()
                console.log("Fetched news:", data)
                setNewsData(data)
                setError(null)
            } catch (error) {
                console.error("Failed to fetch news:", error)
                setError("Failed to load news articles")
            } finally {
                setLoading(false)
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

    const resultsCount = filteredNews.length

    return (
        <div role="region" aria-labelledby="news-section-heading">
            <h1 id="news-section-heading" className="sr-only">News Feed</h1>
            
            <div 
              className="mb-4 mt-2 flex justify-center"
              role="search"
              aria-label="News search"
            >
                <div className="relative max-w-4xl w-full">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                        aria-hidden="true"
                    />

                    <input
                        type="text"
                        placeholder="Search news by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-label="Search news articles by title or author name"
                        aria-describedby="search-hint"
                        aria-controls="news-results"
                    />
                    <span 
                      id="search-hint" 
                      className="sr-only"
                    >
                        Type to filter news articles. Results update automatically.
                    </span>
                </div>
            </div>

            <div 
              className="flex flex-col gap-6 p-4"
              id="news-results"
              role="list"
              aria-label="Search results"
              aria-live="polite"
              aria-atomic="false"
            >
                {loading ? (
                    <div 
                      role="status"
                      aria-live="polite"
                      aria-label="Loading news articles"
                      className="text-center py-12 text-gray-500"
                    >
                        Loading news articles...
                    </div>
                ) : error ? (
                    <div 
                      role="alert"
                      aria-live="assertive"
                      className="text-center py-12 text-red-500"
                    >
                        {error}
                    </div>
                ) : filteredNews.length === 0 ? (
                    <div 
                      role="status"
                      aria-live="polite"
                      className="text-center py-12 text-gray-500"
                    >
                        {searchQuery 
                            ? `No articles match "${searchQuery}". Try a different search.`
                            : "No news articles available."
                        }
                    </div>
                ) : (
                    <>
                        <div 
                          className="sr-only"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                            {resultsCount} article{resultsCount !== 1 ? 's' : ''} found
                        </div>
                        {filteredNews.map((news) => (
                            <div
                                key={news.id}
                                role="listitem"
                            >
                                <NewsFeedCard
                                    author={news.author}
                                    img="/images/logo2.jpeg"
                                    time={news.time}
                                    title={news.title}
                                    link={news.link}
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}