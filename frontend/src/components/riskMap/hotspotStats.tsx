'use client'

import { useEffect, useState } from 'react'
import { RiskHotspotMapData } from '@/types/hotspots'
import { fetchAllHotspots } from '@/lib/hotspots-api'
import { AlertTriangle, TrendingUp, MapPin } from 'lucide-react'

export function HotspotStats() {
  const [hotspots, setHotspots] = useState<RiskHotspotMapData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHotspots = async () => {
      try {
        setLoading(true)
        const data = await fetchAllHotspots()
        setHotspots(data)
      } catch (error) {
        console.error('Failed to load hotspots:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHotspots()
  }, [])

  const criticalCount = hotspots.filter((h) => h.riskLevel === 'CRITICAL').length
  const highCount = hotspots.filter((h) => h.riskLevel === 'HIGH').length
  const mediumCount = hotspots.filter((h) => h.riskLevel === 'MEDIUM').length
  const lowCount = hotspots.filter((h) => h.riskLevel === 'LOW').length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Hotspots */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Hotspots</p>
            <p className="text-3xl font-bold text-foreground">
              {loading ? '-' : hotspots.length}
            </p>
          </div>
          <MapPin className="w-8 h-8 text-primary opacity-50" />
        </div>
      </div>

      {/* Critical */}
      <div className="bg-card border border-border rounded-lg p-4 border-red-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Critical</p>
            <p className="text-3xl font-bold text-red-700">
              {loading ? '-' : criticalCount}
            </p>
          </div>
          <AlertTriangle className="w-8 h-8 text-red-700 opacity-50" />
        </div>
      </div>

      {/* High */}
      <div className="bg-card border border-border rounded-lg p-4 border-red-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">High Risk</p>
            <p className="text-3xl font-bold text-red-600">
              {loading ? '-' : highCount}
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-red-600 opacity-50" />
        </div>
      </div>

      {/* Medium + Low */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Medium + Low</p>
            <p className="text-3xl font-bold text-foreground">
              {loading ? '-' : mediumCount + lowCount}
            </p>
          </div>
          <div className="text-2xl">✓</div>
        </div>
      </div>
    </div>
  )
}