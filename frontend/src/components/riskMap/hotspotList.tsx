'use client'

import { useEffect, useState } from 'react'
import { RiskHotspotMapData } from '@/types/hotspots'
import { fetchAllHotspots } from '@/lib/hotspots-api'
import { MapPin, AlertTriangle, Droplets, Wind, Gauge } from 'lucide-react'

export function HotspotsList() {
  const [hotspots, setHotspots] = useState<RiskHotspotMapData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('ALL')

  useEffect(() => {
    const loadHotspots = async () => {
      try {
        setLoading(true)
        const data = await fetchAllHotspots()
        // Sort by risk level
        const sorted = data.sort((a, b) => {
          const riskOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
          return riskOrder[a.riskLevel as keyof typeof riskOrder] - 
                 riskOrder[b.riskLevel as keyof typeof riskOrder]
        })
        setHotspots(sorted)
      } catch (error) {
        console.error('Failed to load hotspots:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHotspots()
  }, [])

  const filteredHotspots = 
    filter === 'ALL' 
      ? hotspots 
      : hotspots.filter(h => h.riskLevel === filter)

  const getRiskColor = (level: string) => {
    const colors: Record<string, string> = {
      CRITICAL: 'bg-red-900 text-red-100',
      HIGH: 'bg-red-600 text-white',
      MEDIUM: 'bg-yellow-600 text-white',
      LOW: 'bg-green-600 text-white',
    }
    return colors[level] || 'bg-gray-600 text-white'
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((riskLevel) => (
          <button
            key={riskLevel}
            onClick={() => setFilter(riskLevel)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              filter === riskLevel
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {riskLevel}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary mb-2" />
            <p>Loading hotspots...</p>
          </div>
        ) : filteredHotspots.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hotspots found</p>
          </div>
        ) : (
          filteredHotspots.map((hotspot) => (
            <div 
              key={hotspot.id}
              className="bg-card border border-border rounded-lg p-3 hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {hotspot.location}
                  </h4>
                  {hotspot.country && (
                    <p className="text-xs text-muted-foreground">{hotspot.country}</p>
                  )}
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${getRiskColor(hotspot.riskLevel)}`}>
                  {hotspot.riskLevel}
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-2">{hotspot.riskReason}</p>

              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-red-500" />
                  <span>{hotspot.temperature.toFixed(1)}°C</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  <span>{Math.round(hotspot.humidity)}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-sky-500" />
                  <span>{hotspot.precipitation.toFixed(1)}mm</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-3 h-3 text-purple-500" />
                  <span>{hotspot.windSpeed.toFixed(1)}km/h</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}