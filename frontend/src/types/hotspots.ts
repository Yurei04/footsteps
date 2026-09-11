// types/hotspots.ts

export interface RiskHotspotMapData {
  id: string
  location: string
  country?: string
  latitude: number
  longitude: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  riskType: string
  temperature: number
  humidity: number
  precipitation: number
  windSpeed: number
  riskReason: string
  analyzedAt?: string
}

export interface MapPopupData {
  id: string
  coordinates: [number, number]
  properties: RiskHotspotMapData
}

export const RISK_LEVEL_COLORS: Record<string, string> = {
  LOW: '#22c55e',
  MEDIUM: '#eab308',
  HIGH: '#ef4444',
  CRITICAL: '#991b1b',
}

export const RISK_LEVEL_SIZES: Record<string, number> = {
  LOW: 8,
  MEDIUM: 10,
  HIGH: 12,
  CRITICAL: 14,
}