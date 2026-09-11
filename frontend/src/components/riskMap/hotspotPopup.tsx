'use client'

import { MapPopup } from '@/components/ui/map'
import { RiskHotspotMapData, RISK_LEVEL_COLORS } from "@/types/hotspots"
import { AlertTriangle, Droplets, Wind, Gauge, MapPin, Calendar } from 'lucide-react'

interface HotspotPopupProps {
  hotspot: RiskHotspotMapData
  longitude: number
  latitude: number
  onClose: () => void
}

export function HotspotPopup({
  hotspot,
  longitude,
  latitude,
  onClose,
}: HotspotPopupProps) {
  const getRiskColor = (level: string) => {
    const colors: Record<string, string> = {
      LOW: 'text-green-600',
      MEDIUM: 'text-yellow-600',
      HIGH: 'text-red-600',
      CRITICAL: 'text-red-700',
    }
    return colors[level] || 'text-gray-600'
  }

  return (
    <MapPopup
      key={`popup-${hotspot.id}`}
      longitude={longitude}
      latitude={latitude}
      onClose={onClose}
      closeOnClick={false}
      focusAfterOpen={false}
      closeButton
      className="w-72"
    >
      <div className="space-y-3 text-sm">
        {/* Header */}
        <div className="border-b pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{hotspot.location}</h3>
              {hotspot.country && (
                <p className="text-xs text-muted-foreground">{hotspot.country}</p>
              )}
            </div>
            <div
              className={`px-2 py-1 rounded text-xs font-bold ${getRiskColor(
                hotspot.riskLevel
              )}`}
            >
              {hotspot.riskLevel}
            </div>
          </div>
        </div>

        {/* Risk Reason */}
        <div className="flex gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs">{hotspot.riskReason}</p>
        </div>

        {/* Risk Type */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
            Risk Type
          </p>
          <p className="text-foreground font-medium">{hotspot.riskType}</p>
        </div>

        {/* Weather Data Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* Temperature */}
          <div className="bg-muted/50 rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Gauge className="w-3.5 h-3.5 text-red-500" />
              <p className="text-xs text-muted-foreground">Temperature</p>
            </div>
            <p className="font-semibold text-sm">{hotspot.temperature.toFixed(1)}°C</p>
          </div>

          {/* Humidity */}
          <div className="bg-muted/50 rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
            <p className="font-semibold text-sm">{Math.round(hotspot.humidity)}%</p>
          </div>

          {/* Precipitation */}
          <div className="bg-muted/50 rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <p className="text-xs text-muted-foreground">Rainfall</p>
            </div>
            <p className="font-semibold text-sm">{hotspot.precipitation.toFixed(1)} mm</p>
          </div>

          {/* Wind Speed */}
          <div className="bg-muted/50 rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Wind className="w-3.5 h-3.5 text-purple-500" />
              <p className="text-xs text-muted-foreground">Wind Speed</p>
            </div>
            <p className="font-semibold text-sm">{hotspot.windSpeed.toFixed(1)} km/h</p>
          </div>
        </div>

        {/* Coordinates & Time */}
        <div className="border-t pt-2 space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{hotspot.latitude.toFixed(4)}°N, {hotspot.longitude.toFixed(4)}°E</span>
          </div>
          {hotspot.analyzedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(hotspot.analyzedAt).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </MapPopup>
  )
}