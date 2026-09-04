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

const fakeSources: SourceStatus[] = [
    {
        id: "1",
        name: "Weather stations",
        current: 6,
        total: 6,
        color: "bg-cyan-400",
    },
    {
        id: "2",
        name: "News & public signals",
        current: 6,
        total: 6,
        color: "bg-orange-400",
    },
    {
        id: "3",
        name: "Risk model layers",
        current: 6,
        total: 6,
        color: "bg-cyan-400",
    },
]

export default function EventProgress() {
    const [sources, setSources] = useState<SourceStatus[]>(fakeSources)
    const [totalSources, setTotalSources] = useState(0)

    useEffect(() => {
        // Real data fetching function (ready to use)
        const fetchSources = async () => {
            try {
                const res = await fetch("/api/sources")
                const data = await res.json()
                setSources(data)
            } catch (error) {
                console.error("Failed to fetch sources:", error)
                setSources(fakeSources)
            }
        }

        // Uncomment to fetch from API
        // fetchSources()

        // Optional: Polling every 30 seconds
        // const interval = setInterval(fetchSources, 30000)
        // return () => clearInterval(interval)
    }, [])

    // Calculate total sources online
    useEffect(() => {
        const total = sources.reduce((sum, source) => sum + source.current, 0)
        setTotalSources(total)
    }, [sources])

    return (
        <div className="border rounded-2xl p-6 sticky top-6">
            {/* Header */}
            <p className="text-sm tracking-widest font-thin mb-2">
                MONITORING HEALTH
            </p>
            <h2 className="text-3xl font-boldmb-8">
                {totalSources} sources online
            </h2>

            {/* Progress items */}
            <div className="space-y-6">
                {sources.map((source) => {
                    const percentage = (source.current / source.total) * 100
                    return (
                        <div key={source.id}>
                            {/* Label and count */}
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-medium">
                                    {source.name}
                                </p>
                                <p className="text-sm">
                                    {source.current}/{source.total}
                                </p>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                <div
                                    className={`h-full ${source.color} transition-all duration-500`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}