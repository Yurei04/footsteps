"use client"

import { useEffect, useState } from "react"

interface Hotspot {
    id: string
    location: string
    rating: number
    riskType: string
    time: number
    rainfallTrigger: number
    groundSaturation: number
    populationExposure: number
}

export default function HotSpotDetails() {
    const [hotspot, setHotSpots] = useState<Hotspot[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
         const fetchHotspots = async () => {
            try {
                console.log("Fetching data...")
                setIsLoading(true)
                const res = await fetch("/api/risk")
                const data = await res.json()
                console.log("Fetched data:", data)
                setHotSpots(data)
                setError(null)
            } catch (error) {
                console.error("Failed to fetch data:", error)
                setError("Failed to load hotspot data. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }
        fetchHotspots()
    }, [])

    if (isLoading) {
        return (
            <div 
              className="p-4"
              role="status"
              aria-live="polite"
              aria-label="Loading hotspot details"
            >
                <p>Loading hotspot data...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div 
              className="p-4"
              role="alert"
              aria-live="assertive"
            >
                <p className="text-red-600">{error}</p>
            </div>
        )
    }

    return (
        <div 
          className="p-4"
          role="region"
          aria-label="Environmental risk hotspot details"
          aria-describedby="hotspot-intro"
        >
            <p 
              id="hotspot-intro" 
              className="sr-only"
            >
                Details for {hotspot.length} environmental risk hotspots including risk ratings, rainfall triggers, and population exposure data.
            </p>

            {hotspot.length === 0 ? (
                <div 
                  role="status"
                  aria-live="polite"
                >
                    <p>No hotspot data available.</p>
                </div>
            ) : (
                <div 
                  role="list"
                  aria-label="List of risk hotspots"
                >
                    {hotspot.map((spot) => (
                        <article 
                            key={spot.id} 
                            className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
                            role="listitem"
                            aria-label={`${spot.location}: Risk rating ${spot.rating} out of 100`}
                        >
                            <div className="space-y-4">
                                <header>
                                    <h2 
                                      className="font-thin tracking-tight text-xs text-gray-500 uppercase"
                                      aria-label="Section type"
                                    >
                                        Hotspot Detail
                                    </h2>
                                    <h3 
                                      className="font-bold text-4xl mb-3"
                                      id={`hotspot-title-${spot.id}`}
                                    >
                                        {spot.location}
                                    </h3>
                                    <p 
                                      className="text-lg"
                                      aria-label={`Risk rating: ${spot.rating} out of 100`}
                                    >
                                        <span 
                                          className="font-semibold text-4xl"
                                          role="doc-noteref"
                                          aria-describedby={`risk-scale-${spot.id}`}
                                        >
                                            {spot.rating}
                                        </span>
                                        <span className="sr-only"> out of 100</span>/100
                                    </p>
                                    <p 
                                      className="font-thin tracking-widest text-xs mb-4 text-gray-600"
                                      aria-label="Risk type and rainfall forecast"
                                    >
                                        <span>{spot.riskType}</span>
                                        <span className="sr-only"> risk. Next rainfall expected in </span>
                                        · next <span aria-label={`${spot.rainfallTrigger} hours`}>{spot.rainfallTrigger}</span>
                                        <span className="sr-only"> hours</span>
                                    </p>
                                </header>

                                <dl 
                                  className="grid grid-cols-2 gap-4"
                                  role="group"
                                  aria-labelledby={`hotspot-title-${spot.id}`}
                                >
                                    <div role="definition">
                                        <dt className="font-semibold text-gray-600">
                                            Ground Saturation
                                        </dt>
                                        <dd 
                                          className="text-right font-medium"
                                          aria-label={`Ground saturation level: ${spot.groundSaturation} percent`}
                                        >
                                            {spot.groundSaturation}%
                                        </dd>
                                    </div>
                                    
                                    <div role="definition">
                                        <dt className="font-semibold text-gray-600">
                                            Population Exposure
                                        </dt>
                                        <dd 
                                          className="text-right font-medium"
                                          aria-label={`Population exposure: ${spot.populationExposure.toLocaleString()} people`}
                                        >
                                            {spot.populationExposure.toLocaleString()}
                                        </dd>
                                    </div>
                                    
                                    <div role="definition">
                                        <dt className="font-semibold text-gray-600">
                                            Year
                                        </dt>
                                        <dd 
                                          className="text-right font-medium"
                                          aria-label={`Data from year ${spot.time}`}
                                        >
                                            {spot.time}
                                        </dd>
                                    </div>
                                </dl>

                                <p 
                                  id={`risk-scale-${spot.id}`}
                                  className="sr-only"
                                >
                                    Risk scale: 0-20 Low, 21-40 Moderate, 41-60 High, 61-80 Very High, 81-100 Critical
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}