'use client'

import { useState, useEffect } from 'react'
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/ui/map'
import { RiskHotspotMapData, RISK_LEVEL_COLORS } from "@/types/hotspots"
import { HotspotPopup } from './hotspotPopup'
import { fetchAllHotspots } from '@/lib/hotspots-api'
import { AlertTriangle } from 'lucide-react'

interface HotspotMapProps {
  center?: [number, number]
  zoom?: number
  height?: string
  onHotspotSelect?: (hotspot: RiskHotspotMapData) => void
}

export function HotspotMap({
  center = [0, 20],
  zoom = 2,
  height = 'h-screen',
  onHotspotSelect,
}: HotspotMapProps) {
  const [hotspots, setHotspots] = useState<RiskHotspotMapData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedHotspot, setSelectedHotspot] = useState<{
    hotspot: RiskHotspotMapData
    coordinates: [number, number]
  } | null>(null)

  useEffect(() => {
    const loadHotspots = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAllHotspots()
        setHotspots(data)

        // Auto-select first hotspot if available
        if (data.length > 0) {
          const firstHotspot = data[0]
          setSelectedHotspot({
            hotspot: firstHotspot,
            coordinates: [firstHotspot.longitude, firstHotspot.latitude],
          })
          // Emit event for sidebar to listen
          window.dispatchEvent(
            new CustomEvent('hotspot-selected', {
              detail: { id: firstHotspot.id },
            })
          )
          onHotspotSelect?.(firstHotspot)
        }
      } catch (err) {
        console.error('Failed to load hotspots:', err)
        setError('Failed to load hotspots. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadHotspots()
  }, [onHotspotSelect])

  const handleMarkerClick = (hotspot: RiskHotspotMapData) => {
    const coordinates: [number, number] = [hotspot.longitude, hotspot.latitude]
    setSelectedHotspot({
      hotspot,
      coordinates,
    })

    // Emit custom event for sidebar components to listen to
    console.log('📍 Hotspot selected:', hotspot.location)
    window.dispatchEvent(
      new CustomEvent('hotspot-selected', {
        detail: { id: hotspot.id },
      })
    )

    // Call callback if provided
    onHotspotSelect?.(hotspot)
  }

  if (error) {
    return (
      <div className={`${height} w-full flex items-center justify-center bg-muted`}>
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-2" />
          <p className="text-foreground font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${height} w-full relative`}>
      <Map center={center} zoom={zoom} fadeDuration={0}>
        {/* Render markers for each hotspot */}
        {hotspots.map((hotspot) => {
          const color = RISK_LEVEL_COLORS[hotspot.riskLevel] || RISK_LEVEL_COLORS.LOW
          const size =
            hotspot.riskLevel === 'CRITICAL'
              ? 'w-6 h-6'
              : hotspot.riskLevel === 'HIGH'
                ? 'w-5 h-5'
                : 'w-4 h-4'
          const isSelected = selectedHotspot?.hotspot.id === hotspot.id

          return (
            <MapMarker
              key={hotspot.id}
              longitude={hotspot.longitude}
              latitude={hotspot.latitude}
              onClick={() => handleMarkerClick(hotspot)}
            >
              <MarkerContent>
                <div
                  className={`${size} cursor-pointer rounded-full border-2 ${
                    isSelected ? 'border-primary scale-125' : 'border-white'
                  } shadow-lg transition-all duration-200 hover:scale-125`}
                  style={{ backgroundColor: color }}
                  title={`${hotspot.location} - ${hotspot.riskLevel}`}
                />
              </MarkerContent>
            </MapMarker>
          )
        })}

        {/* Render popup for selected hotspot */}
        {selectedHotspot && (
          <HotspotPopup
            hotspot={selectedHotspot.hotspot}
            longitude={selectedHotspot.coordinates[0]}
            latitude={selectedHotspot.coordinates[1]}
            onClose={() => setSelectedHotspot(null)}
          />
        )}

        <MapControls 
          position="top-right"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />
      </Map>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3" />
            <p className="text-foreground font-medium">Loading hotspots...</p>
          </div>
        </div>
      )}

      {/* No data message */}
      {!loading && hotspots.length === 0 && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10 pointer-events-none">
          <div className="text-center">
            <p className="text-muted-foreground">No hotspots available</p>
          </div>
        </div>
      )}
    </div>
  )
}