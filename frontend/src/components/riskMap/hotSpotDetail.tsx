"use client"

import { useEffect, useState } from "react"

interface Hotspot {
  id: string
  location: string
  country?: string
  latitude: number
  longitude: number
  riskLevel: string
  riskType: string
  precipitation: number
  temperature: number
  humidity: number
  windSpeed: number
  weatherCode: number | null
  riskReason: string
  date: string | null
  analyzedAt: string | null
}

export default function HotSpotDetails() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHotspots = async () => {
      try {
        console.log("Fetching hotspot data...")
        setIsLoading(true)

        const res = await fetch("/api/risk")
        const data = await res.json()

        if (!res.ok) {
          throw new Error("Failed to fetch hotspot data")
        }

        console.log("Fetched hotspot data:", data)

        setHotspots(data)

        // Default to the first hotspot
        if (data.length > 0) {
          setSelectedHotspot(data[0])
        }

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

  useEffect(() => {
    const handleHotspotSelected = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>

      const selectedId = customEvent.detail?.id

      if (!selectedId) {
        return
      }

      const selected = hotspots.find(
        (spot) => spot.id === selectedId
      )

      if (selected) {
        setSelectedHotspot(selected)
      }
    }

    window.addEventListener(
      "hotspot-selected",
      handleHotspotSelected
    )

    return () => {
      window.removeEventListener(
        "hotspot-selected",
        handleHotspotSelected
      )
    }
  }, [hotspots])

  if (isLoading) {
    return (
      <div className="p-4">
        <p>Loading hotspot data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (hotspots.length === 0) {
    return (
      <div className="p-4">
        <p>No hotspot data available.</p>
      </div>
    )
  }

  if (!selectedHotspot) {
    return (
      <div className="p-4">
        <p>Select a hotspot on the map.</p>
      </div>
    )
  }

  const spot = selectedHotspot

  return (
    <div
      className="p-4"
      role="region"
      aria-label="Environmental risk hotspot details"
    >
      <p
        id="hotspot-intro"
        className="sr-only"
      >
        Details for the selected environmental risk hotspot.
      </p>

      <article>
        <div className="space-y-4">

          <header>
            <h2 className="font-thin tracking-tight text-xs text-gray-500 uppercase">
              Hotspot Detail
            </h2>

            <h3 className="font-bold text-4xl mb-3">
              {spot.location}
            </h3>

            {spot.country && (
              <p className="text-sm text-gray-500 mb-2">
                {spot.country}
              </p>
            )}

            <p className="text-lg">
              <span className="font-semibold text-4xl">
                {spot.riskLevel}
              </span>
            </p>

            <p className="font-thin tracking-widest text-xs mb-4 text-gray-600">
              {spot.riskType}
            </p>

            <p className="text-sm text-gray-600">
              {spot.riskReason}
            </p>
          </header>

          <dl className="grid grid-cols-2 gap-4">

            <div>
              <dt className="font-semibold text-gray-600">
                Rainfall
              </dt>
              <dd className="text-right font-medium">
                {spot.precipitation} mm
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-gray-600">
                Temperature
              </dt>
              <dd className="text-right font-medium">
                {spot.temperature} °C
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-gray-600">
                Humidity
              </dt>
              <dd className="text-right font-medium">
                {spot.humidity}%
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-gray-600">
                Wind Speed
              </dt>
              <dd className="text-right font-medium">
                {spot.windSpeed} km/h
              </dd>
            </div>

          </dl>

          <div className="text-xs text-gray-500">
            <p>
              Coordinates: {spot.latitude}, {spot.longitude}
            </p>

            {spot.date && (
              <p>
                Recorded: {new Date(spot.date).toLocaleString()}
              </p>
            )}
          </div>

        </div>
      </article>
    </div>
  )
}