'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { RiskHotspotMapData } from '@/types/hotspots'
import { fetchAllHotspots } from '@/lib/hotspots-api' 
import { MapPin, Droplets, Wind, Gauge, Calendar, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HotSpotDetails() {
  const [selectedHotspot, setSelectedHotspot] = useState<RiskHotspotMapData | null>(null)
  const [allHotspots, setAllHotspots] = useState<RiskHotspotMapData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load all hotspots and auto-select the first one
    const loadHotspots = async () => {
      try {
        const data = await fetchAllHotspots()
        setAllHotspots(data)
        // ✅ Auto-select first hotspot - no click needed
        if (data.length > 0) {
          setSelectedHotspot(data[0])
          console.log('✅ Auto-selected hotspot:', data[0].location)
        }
      } catch (error) {
        console.error('Failed to load hotspots:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHotspots()
  }, [])

  const getRiskColor = (level: string) => {
    const colors: Record<string, string> = {
      CRITICAL: 'text-red-700 bg-red-50 dark:bg-red-950',
      HIGH: 'text-red-600 bg-red-50 dark:bg-red-950',
      MEDIUM: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950',
      LOW: 'text-green-600 bg-green-50 dark:bg-green-950',
    }
    return colors[level] || 'text-gray-600'
  }

  const handleViewFullReport = () => {
    // Store hotspot data in localStorage for the chatbot to use
    if (selectedHotspot) {
      try {
        const hotspotData = JSON.stringify(selectedHotspot)
        localStorage.setItem('reportHotspot', hotspotData)
        console.log('✅ Hotspot stored in localStorage:', selectedHotspot.location)
        console.log('📍 Data:', selectedHotspot)
      } catch (error) {
        console.error('❌ Failed to store hotspot data:', error)
        alert('Error: Could not prepare report. Please try again.')
        return
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-20 bg-muted rounded animate-pulse" />
      </div>
    )
  }

  if (!selectedHotspot) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No hotspots available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 bg-background">
      {/* Location Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />

            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-2xl text-foreground">
                {selectedHotspot.location}
              </h3>

              {selectedHotspot.country && (
                <p className="text-xs text-muted-foreground">
                  {selectedHotspot.country}
                </p>
              )}

              <div className="flex gap-2 text-xs text-muted-foreground items-center">
                <Compass className="w-3 h-3" />
                <span>
                  {selectedHotspot.latitude.toFixed(4)}°N,{" "}
                  {selectedHotspot.longitude.toFixed(4)}°E
                </span>
              </div>
            </div>
          </div>
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getRiskColor(
              selectedHotspot.riskLevel
            )}`}
          >
            {selectedHotspot.riskLevel}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className='mb-2'>
          <p className="text-[10px] text-muted-foreground uppercase mb-1">
            Risk Type
          </p>
          <p className="text-lg font-medium text-foreground">{selectedHotspot.riskType}</p>
        </div>

        <div>
          <p className="text-[10px] text-muted-foreground tracking-wide uppercase mb-1">
            Assessment
          </p>
          <p className="text-md text-muted-foreground leading-relaxed">{selectedHotspot.riskReason}</p>
        </div>
      </div>

      {/* Weather Data */}
      <div className="space-y-2">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
          Current Conditions
        </p>
        <div className="grid grid-cols-2 gap-2">
          {/* Temperature */}
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs text-muted-foreground">Temperature</span>
            </div>
            <p className="font-bold text-sm text-foreground">{selectedHotspot.temperature.toFixed(1)}°C</p>
          </div>

          {/* Humidity */}
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs text-muted-foreground">Humidity</span>
            </div>
            <p className="font-bold text-sm text-foreground">{Math.round(selectedHotspot.humidity)}%</p>
          </div>

          {/* Precipitation */}
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-xs text-muted-foreground">Rainfall</span>
            </div>
            <p className="font-bold text-sm text-foreground">{selectedHotspot.precipitation.toFixed(1)} mm</p>
          </div>

          {/* Wind */}
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2">
              <Wind className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs text-muted-foreground">Wind Speed</span>
            </div>
            <p className="font-bold text-sm text-foreground">{selectedHotspot.windSpeed.toFixed(1)} km/h</p>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      {selectedHotspot.analyzedAt && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
          <Calendar className="w-3 h-3" />
          <span>Last analyzed: {new Date(selectedHotspot.analyzedAt).toLocaleString()}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Link href="/aiAgent" onClick={handleViewFullReport} className="w-full">
          <Button 
            variant="outline" 
            size="lg"
            className="text-sm h-8 w-full"
          >
            View Full Report
          </Button>
        </Link>
        <Button 
          variant="outline" 
          size="lg"
          className="text-sm h-8"
          onClick={() => {
            const coords = `${selectedHotspot.latitude}, ${selectedHotspot.longitude}`
            navigator.clipboard.writeText(coords)
          }}
        >
          Copy Coords
        </Button>
      </div>

      {/* Quick Navigation - Switch Between Hotspots */}
      {allHotspots.length > 1 && (
        <div className="space-y-2 pt-2 border-t border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Other Hotspots ({allHotspots.length})
          </p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {allHotspots.slice(0, 10).map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => {
                  setSelectedHotspot(hotspot)
                  console.log('🔄 Switched to:', hotspot.location)
                }}
                className={`w-full text-left text-md px-2 py-4 transition-colors ${
                  selectedHotspot.id === hotspot.id
                    ? 'bg-card/80 text-primary'
                    : 'bg-background hover:bg-muted/80 text-foreground'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium truncate">{hotspot.location}</span>
                  <span className={`text-[10px] font-bold ${getRiskColor(hotspot.riskLevel)} shrink-0`}>{hotspot.riskLevel}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}