// components/EventProgress.tsx
"use client"

import { useState, useEffect } from "react"

interface SourceStatus {
    id: string
    name: string
    current: number
    total: number
    color: string
}

export default function EventProgress() {
    const [sources, setSources] = useState<SourceStatus[]>([])
    const [totalSources, setTotalSources] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSources = async () => {
            try {
                console.log("Fetching sources...")
                const res = await fetch("/api/sources")
                const data = await res.json()
                console.log("Fetched data:", data)
                setSources(data)
                setError(null)
            } catch (error) {
                console.error("Failed to fetch sources:", error)
                setError("Failed to load monitoring sources")
            } finally {
                setLoading(false)
            }
        }

        fetchSources()
    }, [])

    useEffect(() => {
        const total = sources.reduce((sum, source) => sum + source.current, 0)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTotalSources(total)
    }, [sources])

    return (
        <div 
          className="border rounded-2xl p-6 sticky top-6"
          role="region"
          aria-labelledby="monitoring-heading"
          aria-describedby="monitoring-description"
        >
            <p 
              className="text-sm tracking-widest font-thin mb-2 uppercase"
              aria-label="Section context"
            >
                MONITORING HEALTH
            </p>
            <h2 
              className="text-3xl font-bold mb-8"
              id="monitoring-heading"
              aria-live="polite"
              aria-atomic="true"
            >
                {loading ? "Loading..." : `${totalSources} sources online`}
            </h2>

            <p 
              id="monitoring-description"
              className="sr-only"
            >
                Real-time monitoring health status showing data collection sources and their operational status.
            </p>

            {loading ? (
                <div 
                  role="status"
                  aria-live="polite"
                  className="text-center py-8 text-gray-500"
                >
                    Loading monitoring sources...
                </div>
            ) : error ? (
                <div 
                  role="alert"
                  aria-live="assertive"
                  className="text-center py-8 text-red-500"
                >
                    {error}
                </div>
            ) : (
                <div 
                  className="space-y-6"
                  role="list"
                  aria-label="Monitoring sources"
                >
                    {sources.map((source) => {
                        const percentage = (source.current / source.total) * 100
                        const percentageRounded = Math.round(percentage)
                        
                        return (
                            <div 
                              key={source.id}
                              role="listitem"
                              aria-label={`${source.name}: ${percentageRounded}% operational`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <p 
                                      className="font-medium"
                                      id={`source-name-${source.id}`}
                                    >
                                        {source.name}
                                    </p>
                                    <p 
                                      className="text-sm"
                                      aria-label={`${source.current} out of ${source.total} sources active`}
                                    >
                                        {source.current}/{source.total}
                                    </p>
                                </div>
                                <div 
                                  className="w-full bg-gray-700 rounded-full h-2 overflow-hidden"
                                  role="progressbar"
                                  aria-valuenow={percentageRounded}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-labelledby={`source-name-${source.id}`}
                                  aria-describedby={`source-status-${source.id}`}
                                >
                                    <div
                                        className={`h-full ${source.color} transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                        aria-hidden="true"
                                    />
                                </div>
                                <span 
                                  id={`source-status-${source.id}`}
                                  className="sr-only"
                                >
                                    {source.name} is {percentageRounded}% operational with {source.current} out of {source.total} sources active.
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}