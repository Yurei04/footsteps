"use client"

import { useEffect, useRef } from "react"
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  useMap,
} from "@/components/ui/map"

interface SearchedLocationMapProps {
  latitude?: number
  longitude?: number
  location?: string
  country?: string
}

function MapUpdater({
  latitude,
  longitude,
}: {
  latitude?: number
  longitude?: number
}) {
  const { map } = useMap()

  useEffect(() => {
    if (!map || latitude === undefined || longitude === undefined) {
      return
    }

    map.flyTo({
      center: [longitude, latitude],
      zoom: 9,
      duration: 1200,
      essential: true,
    })
  }, [map, latitude, longitude])

  return null
}

export default function SearchedLocationMap({
  latitude,
  longitude,
  location,
  country,
}: SearchedLocationMapProps) {
  const mapRef = useRef<any>(null)

  const hasLocation =
    latitude !== undefined &&
    longitude !== undefined &&
    !Number.isNaN(latitude) &&
    !Number.isNaN(longitude)

  if (!hasLocation) {
    return (
      <section className="border rounded-xl bg-white p-6 h-[450px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs tracking-widest uppercase text-[#00C8B3] mb-2">
            Location Map
          </p>

          <p className="text-lg font-medium text-slate-700">
            Search a location to view it on the map.
          </p>

          <p className="text-sm text-slate-500 mt-2">
            The map will automatically focus on the searched location.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="border rounded-xl overflow-hidden bg-white">
      <div className="px-6 py-4 border-b">
        <p className="text-xs tracking-widest uppercase text-[#00C8B3] mb-1">
          Location Map
        </p>

        <h2 className="text-xl font-semibold">
          {location}, {country}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </p>
      </div>

      <div className="h-[450px]">
        <Map
          ref={mapRef}
          center={[longitude, latitude]}
          zoom={9}
        >
          <MapUpdater
            latitude={latitude}
            longitude={longitude}
          />

          <MapMarker
            longitude={longitude}
            latitude={latitude}
          >
            <MarkerContent
              className="cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute w-8 h-8 rounded-full bg-[#00C8B3]/20 animate-ping" />

                <div className="relative w-5 h-5 rounded-full border-2 border-white bg-[#00C8B3] shadow-lg" />
              </div>
            </MarkerContent>

            <MarkerLabel>
              {location}
            </MarkerLabel>
          </MapMarker>

          <MapControls
            showZoom
            showCompass
            showFullscreen
          />
        </Map>
      </div>
    </section>
  )
}