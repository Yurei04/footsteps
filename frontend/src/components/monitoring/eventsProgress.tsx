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

    useEffect(() => {
        const fetchSources = async () => {
            try {
                console.log("Fetching sources...")
                const res = await fetch("/api/sources")
                const data = await res.json()
                console.log("Fetched data:", data)
                setSources(data)
            } catch (error) {
                console.error("Failed to fetch sources:", error)
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
        <div className="border rounded-2xl p-6 sticky top-6">
            <p className="text-sm tracking-widest font-thin mb-2">
                MONITORING HEALTH
            </p>
            <h2 className="text-3xl font-bold mb-8">
                {totalSources} sources online
            </h2>

            <div className="space-y-6">
                {sources.map((source) => {
                    const percentage = (source.current / source.total) * 100
                    return (
                        <div key={source.id}>
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-medium">{source.name}</p>
                                <p className="text-sm">{source.current}/{source.total}</p>
                            </div>
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