'use client'

import { LocationAnalysis } from '@/lib/api'
import { AlertTriangle, Droplets, Wind, Gauge, FileWarning } from 'lucide-react'
import { BarGraph } from './barGraph'

interface SearchResultsProps {
  result: LocationAnalysis
}

export function SearchResults({ result }: SearchResultsProps) {
  // Provide defaults for potentially null values
  const temperature = result.temperature ?? 0
  const humidity = result.humidity ?? 0
  const windSpeed = result.windSpeed ?? 0
  const precipitationProbability = result.precipitationProbability ?? 0

  const getRiskColor = (level: string) => {
    switch (level?.toUpperCase?.() || 'LOW') {
      case 'CRITICAL':
      case 'HIGH':
        return 'text-red-600 dark:text-red-400'
      case 'MEDIUM':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'LOW':
        return 'text-green-600 dark:text-green-400'
      default:
        return 'text-muted-foreground'
    }
  }

  const getRiskBgColor = (level: string) => {
    switch (level?.toUpperCase?.() || 'LOW') {
      case 'CRITICAL':
      case 'HIGH':
        return 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
      case 'MEDIUM':
        return 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800'
      case 'LOW':
        return 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
      default:
        return 'bg-card border-border'
    }
  }

  const getRiskPercentage = (level: string) => {
    switch (level?.toUpperCase?.() || 'LOW') {
      case 'CRITICAL':
        return 100
      case 'HIGH':
        return 75
      case 'MEDIUM':
        return 50
      case 'LOW':
        return 25
      default:
        return 0
    }
  }

  const getRiskBarColor = (level: string) => {
    switch (level?.toUpperCase?.() || 'LOW') {
      case 'CRITICAL':
        return 'bg-red-600 dark:bg-red-500'
      case 'HIGH':
        return 'bg-orange-600 dark:bg-orange-500'
      case 'MEDIUM':
        return 'bg-yellow-600 dark:bg-yellow-500'
      case 'LOW':
        return 'bg-green-600 dark:bg-green-500'
      default:
        return 'bg-muted'
    }
  }

  return (
    <section className="w-full border-t py-8 px-3 sm:px-4 md:px-6 lg:px-8 sm:pb-12">
      <div className="mx-auto space-y-6 sm:space-y-8">
        {/* Location Header */}
        <div className="space-y-3 sm:space-y-4">
          <p className="text-[11px] text-primary uppercase tracking-widest mb-2">
            Analysis Result
          </p>
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl wrap-break-word">
              {result.location || 'Unknown Location'}
            </h2>
            {result.country && (
              <p className="text-sm sm:text-base text-muted-foreground">{result.country}</p>
            )}
            <p className="text-[9px] tracking-widest sm:text-sm text-muted-foreground">
              {result.latitude?.toFixed(4) || 'N/A'}°N, {result.longitude?.toFixed(4) || 'N/A'}°E
              {result.date && ` • Updated ${new Date(result.date).toLocaleString()}`}
            </p>
          </div>
        </div>

        {/* Current Weather Section */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Gauge className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" aria-hidden="true" />
            <h3 
              className="text-[11px] text-muted-foreground uppercase tracking-widest"
              id="weather-section"
            >
              Current Weather • {result.riskType || 'Normal Conditions'}
            </h3>
          </div>

          <div 
            className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4"
            role="region"
            aria-labelledby="weather-section"
          >
            {/* Temperature Card */}
            <WeatherCard
              icon="🌡️"
              label="Temperature"
              value={`${temperature.toFixed(1)}°C`}
              sublabel="Current"
            />

            {/* Humidity Card */}
            <WeatherCard
              icon="💧"
              label="Humidity"
              value={`${Math.round(humidity)}%`}
              sublabel="Relative"
            />

            {/* Precipitation Card */}
            <WeatherCard
              icon="🌧️"
              label="Precipitation"
              value={`${Math.round(precipitationProbability)}%`}
              sublabel="Rain Chance"
            />

            {/* Wind Speed Card */}
            <WeatherCard
              icon="💨"
              label="Wind Speed"
              value={`${windSpeed.toFixed(1)} km/h`}
              sublabel="Current"
            />
          </div>
        </div>

        {/* Environmental Risks Section */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">

            <h3 
              className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold"
              id="risks-section"
            >
              Environmental Risks
            </h3>
          </div>

          <div 
            className="bg-card/50 border rounded-xl sm:rounded-2xl p-4 max-w-4xl sm:p-6"
            role="region"
            aria-labelledby="risks-section"
          >
            <div className="w-full flex gap-3 sm:gap-4 md:gap-6">
              <div className="text-2xl sm:text-3xl flex-shrink-0" aria-hidden="true"><FileWarning /> </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold mb-2">
                  {result.riskType || 'Unknown Risk'}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4 text-foreground/90 break-words">
                  {result.riskReason || 'No additional information available'}
                </p>
                
                {/* Risk Progress Bar */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-1">
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getRiskBarColor(result.riskLevel)} transition-all`}
                        style={{ width: `${getRiskPercentage(result.riskLevel)}%` }}
                        role="progressbar"
                        aria-valuenow={getRiskPercentage(result.riskLevel)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Risk level: ${result.riskLevel}`}
                      />
                    </div>
                  </div>
                  <span 
                    className={`text-xs sm:text-sm font-bold uppercase tracking-wide flex-shrink-0 ${getRiskColor(result.riskLevel)}`}
                    aria-label={`Risk level is ${result.riskLevel}`}
                  >
                    {result.riskLevel || 'LOW'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <h3
              className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold"
              id="trends-section"
            >
              30-Day Environmental Trends
            </h3>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
            role="region"
            aria-labelledby="trends-section"
          >
            {/* Rainfall Chart */}
            <div className="bg-card/50 border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-5 gap-2">
                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-semibold">🌧️ Rainfall Trends</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Daily rainfall over the last 30 days
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit flex-shrink-0">
                  mm/day
                </div>
              </div>

              {result.historicalData && result.historicalData.length > 0 ? (
                <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <BarGraph
                    data={result.historicalData}
                    dataKey="rainfall"
                    unit=" mm"
                    type="rainfall"
                    description="Blue bars show daily rainfall. Taller bars indicate heavier rain events."
                  />
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
                  <p>Generating historical rainfall data...</p>
                </div>
              )}
            </div>

            {/* Temperature Chart */}
            <div className="bg-card/50 border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-5 gap-2">
                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-semibold">🌡️ Temperature Trends</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Daily average temperature over the last 30 days
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit flex-shrink-0">
                  °C
                </div>
              </div>

              {result.historicalData && result.historicalData.length > 0 ? (
                <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
                  <BarGraph
                    data={result.historicalData}
                    dataKey="temperature"
                    unit="°C"
                    type="temperature"
                    description="Color-coded by temperature: blue (cool) → red (hot). Shows temperature patterns and extremes."
                  />
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
                  <p>Generating historical temperature data...</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* AI Action Plan Section */}
        <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <h3
                className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold"
                id="actions-section"
              >
                Recommended Response
              </h3>
            </div>

            <div
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6"
              role="region"
              aria-labelledby="actions-section"
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                  {result.aiActionPlan || 'No action plan available'}
                </p>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

interface WeatherCardProps {
  icon: string
  label: string
  value: string
  sublabel: string
}

function WeatherCard({ icon, label, value, sublabel }: WeatherCardProps) {
  return (
    <div 
      className="bg-card/50 border border-border rounded-lg sm:rounded-xl px-6 py-4 sm:p-4 md:p-6"
      role="region"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-center gap-2 mb-1 sm:mb-2">
        <span className="text-lg sm:text-2xl flex-shrink-0" aria-hidden="true">{icon}</span>
        <p className="text-[11px] text-muted-foreground uppercase tracking-widest ">
          {label}
        </p>
      </div>
      <p className="text-lg sm:text-2xl md:text-3xl mb-0.5 sm:mb-1 break-words">{value}</p>
      <p className="text-[12px] text-muted-foreground">{sublabel}</p>
    </div>
  )
}