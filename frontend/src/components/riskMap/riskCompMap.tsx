"use client"

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
  MarkerLabel,
  useMap,
} from "@/components/ui/map"

import { Button } from "@/components/ui/button"
import { Navigation, ExternalLink } from "lucide-react"
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

export default function RiskWholeMap() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([])

  useEffect(() => {
    const fetchHotspots = async () => {
      try {
        const res = await fetch("/api/risk")
        const data = await res.json()

        if (!res.ok) {
          throw new Error("Failed to fetch risk data")
        }

        setHotspots(data)
      } catch (error) {
        console.error("Failed to fetch risk data:", error)
      }
    }

    fetchHotspots()
  }, [])

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toUpperCase()) {
      case "HIGH":
        return "bg-red-500"

      case "MEDIUM":
        return "bg-yellow-500"

      case "LOW":
      default:
        return "bg-green-500"
    }
  }

  const selectHotspot = (spot: Hotspot) => {
    window.dispatchEvent(
      new CustomEvent("hotspot-selected", {
        detail: {
          id: spot.id,
        },
      })
    )
  }

  return (
    <div
      className="h-[400px] w-full"
      role="region"
      aria-label="Environmental risk map"
    >
      <p
        id="map-description"
        className="sr-only"
      >
        Interactive environmental risk map showing current environmental risk hotspots.
      </p>

      <Map
        center={[20, 20]}
        zoom={1.3}
        aria-label="Global environmental risk map"
      >
        <MapControls
          position="top-right"
          showZoom
          showCompass
          showFullscreen
          aria-label="Map navigation controls"
        />

        <HotspotMarkers
          hotspots={hotspots}
          getRiskColor={getRiskColor}
          selectHotspot={selectHotspot}
        />
      </Map>
    </div>
  )
}

function HotspotMarkers({
  hotspots,
  getRiskColor,
  selectHotspot,
}: {
  hotspots: Hotspot[]
  getRiskColor: (riskLevel: string) => string
  selectHotspot: (spot: Hotspot) => void
}) {
  const { map } = useMap()

  const handleHotspotClick = (spot: Hotspot) => {
    selectHotspot(spot)

    map?.flyTo({
      center: [spot.longitude, spot.latitude],
      zoom: 7,
      duration: 1200,
      essential: true,
    })
  }

  return (
    <>
      {hotspots.map((spot) => (
        <MapMarker
          key={spot.id}
          longitude={spot.longitude}
          latitude={spot.latitude}
          aria-label={`${spot.location}, ${spot.riskLevel} risk`}
        >
          <MarkerContent>
            {/* Google Maps-style location pin */}
            <div
              className="relative flex cursor-pointer items-center justify-center transition-transform duration-200 hover:scale-110"
              role="button"
              tabIndex={0}
              aria-label={`${spot.location}. Risk level: ${spot.riskLevel}`}
              onClick={() => handleHotspotClick(spot)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  handleHotspotClick(spot)
                }
              }}
            >
              {/* Pin body */}
              <div
                className={`relative flex size-8 items-center justify-center rounded-full border-2 border-white ${getRiskColor(
                  spot.riskLevel
                )} shadow-lg`}
              >
                {/* White center */}
                <div className="size-3 rounded-full bg-white shadow-sm" />
              </div>

              {/* Pin point */}
              <div
                className={`absolute bottom-[-5px] left-1/2 size-3 -translate-x-1/2 rotate-45 ${getRiskColor(
                  spot.riskLevel
                )} border-r-2 border-b-2 border-white`}
              />
            </div>

            <MarkerLabel position="bottom">
              <span className="rounded bg-white/90 px-1.5 py-0.5 text-xs font-medium shadow-sm">
                {spot.location}
              </span>
            </MarkerLabel>
          </MarkerContent>

          <MarkerPopup
            className="w-62 p-0"
            aria-labelledby={`popup-title-${spot.id}`}
            aria-describedby={`popup-desc-${spot.id}`}
          >
            <div className="space-y-2 p-3">
              <div>
                <p className="text-muted-foreground pb-0.5 text-[11px] font-medium tracking-wide uppercase">
                  Environmental Risk
                </p>

                <h3
                  id={`popup-title-${spot.id}`}
                  className="text-foreground leading-tight font-semibold"
                >
                  {spot.location}
                </h3>

                {spot.country && (
                  <p className="text-muted-foreground text-xs">
                    {spot.country}
                  </p>
                )}
              </div>

              <div
                id={`popup-desc-${spot.id}`}
                className="space-y-2"
              >
                <p className="font-semibold">
                  Risk Level: {spot.riskLevel}
                </p>

                <p className="text-sm">
                  {spot.riskType}
                </p>

                <p className="text-sm text-muted-foreground">
                  {spot.riskReason}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      Rainfall
                    </span>

                    <p className="font-medium">
                      {spot.precipitation} mm
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">
                      Temperature
                    </span>

                    <p className="font-medium">
                      {spot.temperature} °C
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">
                      Humidity
                    </span>

                    <p className="font-medium">
                      {spot.humidity}%
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground">
                      Wind Speed
                    </span>

                    <p className="font-medium">
                      {spot.windSpeed} km/h
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    className="flex-1"
                    aria-label={`Get directions to ${spot.location}`}
                  >
                    <Navigation
                      className="size-3.5"
                      aria-hidden="true"
                    />

                    Directions
                  </Button>

                  <Button
                    size="icon-sm"
                    variant="outline"
                    aria-label={`Open ${spot.location}`}
                  >
                    <ExternalLink
                      className="size-3.5"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </MarkerPopup>
        </MapMarker>
      ))}
    </>
  )
}