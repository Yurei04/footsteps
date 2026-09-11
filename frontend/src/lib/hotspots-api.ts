// lib/hotspots-api.ts

import { RiskHotspotMapData } from '@/types/hotspots'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://footsteps-1.onrender.com/api'

/**
 * Fetch all risk hotspots from backend
 */
export async function fetchAllHotspots(): Promise<RiskHotspotMapData[]> {
  try {
    const url = `${API_BASE_URL}/risk`
    console.log('📍 Fetching hotspots from:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch hotspots: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ Fetched', Array.isArray(data) ? data.length : 0, 'hotspots')

    // Transform backend data to map format
    return (Array.isArray(data) ? data : []).map((hotspot: any) => ({
      id: hotspot.id,
      location: hotspot.location,
      country: hotspot.country,
      latitude: hotspot.latitude,
      longitude: hotspot.longitude,
      riskLevel: hotspot.riskLevel || 'LOW',
      riskType: hotspot.riskType,
      temperature: hotspot.temperature,
      humidity: hotspot.humidity,
      precipitation: hotspot.precipitation,
      windSpeed: hotspot.windSpeed,
      riskReason: hotspot.riskReason,
      analyzedAt: hotspot.analyzedAt,
    }))
  } catch (error) {
    console.error('❌ Error fetching hotspots:', error)
    return []
  }
}

/**
 * Convert hotspots to GeoJSON format for clustering
 */
export function hotspotsToGeoJSON(hotspots: RiskHotspotMapData[]) {
  return {
    type: 'FeatureCollection',
    features: hotspots.map((hotspot) => ({
      type: 'Feature',
      id: hotspot.id,
      geometry: {
        type: 'Point',
        coordinates: [hotspot.longitude, hotspot.latitude],
      },
      properties: hotspot,
    })),
  }
}