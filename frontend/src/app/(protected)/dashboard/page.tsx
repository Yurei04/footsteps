"use client"

import { useState } from "react"
import SearchedLocationMap from "@/components/dashboard/searchedLocationMap"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type HistoricalItem = {
  date: string
  rainfall: number
  temperature: number
  max_temperature: number
  wind_speed: number
}

/* -------------------------------------------------------
   BAR GRAPH
------------------------------------------------------- */

function BarGraph({
  data,
  dataKey,
  unit,
  description,
  type,
}: {
  data: HistoricalItem[]
  dataKey: "rainfall" | "temperature" | "wind_speed"
  unit: string
  description: string
  type: "rainfall" | "temperature" | "wind"
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-sm text-slate-500">
        Historical data unavailable.
      </div>
    )
  }

  const values = data.map((item) =>
    Number(item[dataKey] ?? 0)
  )

  let minValue = Math.min(...values)
  let maxValue = Math.max(...values)

  if (type === "rainfall" || type === "wind") {
    minValue = 0
  }

  if (minValue === maxValue) {
    maxValue = minValue + 1
  }

  const range = maxValue - minValue

  const formatDate = (date: string) => {
    const parsed = new Date(`${date}T00:00:00`)

    if (Number.isNaN(parsed.getTime())) {
      return date
    }

    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  /* -------------------------------------------------------
     TEMPERATURE COLOR
  ------------------------------------------------------- */

  function getTemperatureColor(value: number) {
    if (value < 15) {
      return "bg-blue-500"
    }

    if (value < 20) {
      return "bg-cyan-500"
    }

    if (value < 25) {
      return "bg-emerald-500"
    }

    if (value < 30) {
      return "bg-yellow-400"
    }

    if (value < 35) {
      return "bg-orange-500"
    }

    return "bg-red-500"
  }

  /* -------------------------------------------------------
     OTHER GRAPH COLORS
  ------------------------------------------------------- */

  function getBarColor(value: number) {
    if (type === "temperature") {
      return getTemperatureColor(value)
    }

    if (type === "rainfall") {
      if (value >= 50) {
        return "bg-blue-700"
      }

      if (value >= 20) {
        return "bg-blue-500"
      }

      return "bg-sky-400"
    }

    if (value >= 40) {
      return "bg-purple-700"
    }

    if (value >= 20) {
      return "bg-purple-500"
    }

    return "bg-violet-400"
  }

  return (
    <div>

      {/* EXPLANATION */}
      <div className="mb-6 rounded-lg bg-slate-50 border border-slate-100 p-4">
        <p className="text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      {/* GRAPH */}
      <div className="w-full overflow-x-auto">

        <div className="min-w-[750px]">

          <div className="flex h-[320px]">

            {/* Y AXIS */}
            <div className="w-14 flex flex-col justify-between text-xs text-slate-400 pb-8 pr-2 text-right">

              <span>
                {maxValue.toFixed(
                  type === "temperature" ? 1 : 0
                )}
              </span>

              <span>
                {(minValue + range * 0.75).toFixed(
                  type === "temperature" ? 1 : 0
                )}
              </span>

              <span>
                {(minValue + range * 0.5).toFixed(
                  type === "temperature" ? 1 : 0
                )}
              </span>

              <span>
                {(minValue + range * 0.25).toFixed(
                  type === "temperature" ? 1 : 0
                )}
              </span>

              <span>
                {minValue.toFixed(
                  type === "temperature" ? 1 : 0
                )}
              </span>

            </div>

            {/* GRAPH */}
            <div className="relative flex-1 border-l border-b border-slate-200">

              {/* GRID LINES */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">

                <div className="border-t border-slate-100" />

                <div className="border-t border-slate-100" />

                <div className="border-t border-slate-100" />

                <div className="border-t border-slate-100" />

                <div />

              </div>

              {/* BARS */}
              <div className="absolute inset-0 flex items-end gap-[4px] px-2">

                {data.map((item, index) => {

                  const value = Number(
                    item[dataKey] ?? 0
                  )

                  const height =
                    ((value - minValue) /
                      (maxValue - minValue)) *
                    100

                  return (
                    <div
                      key={`${item.date}-${index}`}
                      className="relative flex h-full flex-1 items-end group"
                    >

                      {/* HOVER TOOLTIP */}
                      <div className="absolute bottom-full left-1/2 z-30 mb-2 hidden -translate-x-1/2 group-hover:block">

                        <div className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-xl whitespace-nowrap">

                          <p className="font-semibold">
                            {formatDate(item.date)}
                          </p>

                          <p className="mt-1 text-slate-300">
                            {value.toFixed(1)}
                            {unit}
                          </p>

                        </div>

                      </div>

                      {/* BAR */}
                      <div
                        className={`
                          w-full
                          rounded-t-md
                          transition-all
                          duration-200
                          group-hover:opacity-80
                          group-hover:scale-x-110
                          ${getBarColor(value)}
                        `}
                        style={{
                          height: `${Math.max(height, 1)}%`,
                        }}
                      />

                    </div>
                  )
                })}

              </div>

            </div>

          </div>

          {/* DATE LABELS */}
          <div className="ml-14 flex justify-between px-2 mt-3 text-xs text-slate-400">

            <span>
              {formatDate(data[0].date)}
            </span>

            {data.length > 2 && (
              <span>
                {formatDate(
                  data[Math.floor(data.length / 2)].date
                )}
              </span>
            )}

            <span>
              {formatDate(
                data[data.length - 1].date
              )}
            </span>

          </div>

          {/* UNIT */}
          <p className="mt-3 text-center text-xs text-slate-400">
            {unit}
          </p>

        </div>

      </div>

      {/* TEMPERATURE LEGEND */}
      {type === "temperature" && (
        <div className="mt-6">

          <p className="text-xs font-medium text-slate-500 mb-3">
            Temperature guide
          </p>

          <div className="flex flex-wrap gap-3 text-xs">

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-blue-500" />
              Cool
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-cyan-500" />
              Mild
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              Comfortable
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-yellow-400" />
              Warm
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-orange-500" />
              Hot
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-red-500" />
              Very hot
            </div>

          </div>

        </div>
      )}

    </div>
  )
}

/* -------------------------------------------------------
   MAIN DASHBOARD
------------------------------------------------------- */

export default function DashboardPage() {

  const [location, setLocation] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function analyzeLocation() {

    if (!location.trim()) {
      setError("Please enter a location.")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {

      const response = await fetch(
        "http://localhost:5678/webhook/environmental-analysis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: location.trim(),
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to analyze location."
        )
      }

      const data = await response.json()

      setResult(data)

    } catch (err) {

      setError(
        "Unable to analyze this location. Please make sure n8n is running."
      )

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="space-y-10">

      {/* PAGE INTRO */}
      <section>

        <p className="text-xs tracking-widest uppercase text-[#00C8B3] mb-3">
          Environmental Intelligence
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Understand the risk before it becomes an impact.
        </h1>

        <p className="mt-3 text-slate-600 max-w-2xl">
          Search a location to understand its current
          environmental conditions, recent weather patterns,
          potential risks, and recommended actions.
        </p>

      </section>

      {/* SEARCH */}
      <section>

        <div className="mb-4">

          <h2 className="text-xl font-semibold">
            Search a location
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Enter a city or location to begin an environmental analysis.
          </p>

        </div>

        <div className="border rounded-xl p-6 bg-white">

          <div className="flex flex-col md:flex-row gap-3">

            <div className="flex-1">

              <Input
                type="text"
                placeholder="Enter a city or location..."
                aria-label="Search environmental location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    analyzeLocation()
                  }

                }}
              />

            </div>

            <Button
              onClick={analyzeLocation}
              disabled={loading}
            >
              {loading
                ? "Analyzing..."
                : "Analyze Location"}
            </Button>

          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

        </div>

      </section>

      {/* RESULTS */}
      {result && (

        <section className="space-y-10">

          {/* MAP */}
          <SearchedLocationMap
            latitude={result.latitude}
            longitude={result.longitude}
            location={result.location}
            country={result.country}
          />

          {/* ENVIRONMENTAL ASSESSMENT */}
          <section>

            <div className="mb-4">

              <p className="text-xs tracking-widest uppercase text-[#00C8B3] mb-2">
                Environmental Assessment
              </p>

              <h2 className="text-2xl font-semibold">
                Current environmental conditions
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                A quick assessment of the current conditions
                and environmental risk for this location.
              </p>

            </div>

            <div className="border rounded-xl p-6 bg-white">

              {/* RISK */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                <div className="flex-1">

                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Overall Risk
                  </p>

                  <h3 className="text-4xl font-semibold mt-2">
                    {result.risk_level}
                  </h3>

                  <p className="text-xl font-medium mt-2">
                    {result.risk_type}
                  </p>

                  <p className="text-sm text-slate-600 mt-3 max-w-2xl">
                    {result.risk_reason}
                  </p>

                </div>

                <div className="border rounded-lg px-6 py-4 min-w-[150px]">

                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Historical Risk
                  </p>

                  <p className="text-2xl font-semibold mt-2">
                    {result.historical_risk ?? "LOW"}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Based on recent weather patterns
                  </p>

                </div>

              </div>

              {/* CURRENT FACTORS */}
              <div className="mt-6 pt-6 border-t">

                <p className="text-sm font-medium mb-4">
                  Current environmental factors
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* RAIN */}
                  <div className="rounded-lg bg-sky-50 p-4 border border-sky-100">

                    <p className="text-xs uppercase tracking-widest text-sky-600">
                      Rain Probability
                    </p>

                    <p className="text-xl font-semibold mt-2 text-sky-900">
                      {result.precipitation_probability ?? 0}%
                    </p>

                    <p className="text-xs text-sky-600 mt-1">
                      Chance of precipitation
                    </p>

                  </div>

                  {/* TEMPERATURE */}
                  <div className="rounded-lg bg-orange-50 p-4 border border-orange-100">

                    <p className="text-xs uppercase tracking-widest text-orange-600">
                      Temperature
                    </p>

                    <p className="text-xl font-semibold mt-2 text-orange-900">
                      {result.temperature}°C
                    </p>

                    <p className="text-xs text-orange-600 mt-1">
                      Current temperature
                    </p>

                  </div>

                  {/* HUMIDITY */}
                  <div className="rounded-lg bg-teal-50 p-4 border border-teal-100">

                    <p className="text-xs uppercase tracking-widest text-teal-600">
                      Humidity
                    </p>

                    <p className="text-xl font-semibold mt-2 text-teal-900">
                      {result.humidity}%
                    </p>

                    <p className="text-xs text-teal-600 mt-1">
                      Relative humidity
                    </p>

                  </div>

                  {/* WIND */}
                  <div className="rounded-lg bg-violet-50 p-4 border border-violet-100">

                    <p className="text-xs uppercase tracking-widest text-violet-600">
                      Wind
                    </p>

                    <p className="text-xl font-semibold mt-2 text-violet-900">
                      {result.wind_speed} km/h
                    </p>

                    <p className="text-xs text-violet-600 mt-1">
                      Current wind speed
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ENVIRONMENTAL TRENDS */}
          <section>

            <div className="mb-6">

              <p className="text-xs tracking-widest uppercase text-[#00C8B3] mb-2">
                Environmental Trends
              </p>

              <h2 className="text-2xl font-semibold">
                Recent environmental patterns
              </h2>

              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                These graphs make it easier to understand how
                weather conditions have changed over the last
                30 days and identify unusual patterns.
              </p>

            </div>

            <div className="space-y-6">

              {/* RAINFALL */}
              <div className="border rounded-xl p-6 bg-white shadow-sm">

                <div className="flex items-start justify-between mb-5">

                  <div>

                    <h3 className="text-lg font-semibold">
                      🌧️ Rainfall
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Daily rainfall over the last 30 days
                    </p>

                  </div>

                  <div className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600">
                    mm/day
                  </div>

                </div>

                <BarGraph
                  data={result.historical_data ?? []}
                  dataKey="rainfall"
                  unit=" mm"
                  type="rainfall"
                  description="Each bar represents rainfall recorded on a day. Taller blue bars mean more rain. Large spikes may indicate periods of heavier rainfall that deserve closer monitoring."
                />

              </div>

              {/* TEMPERATURE */}
              <div className="border rounded-xl p-6 bg-white shadow-sm">

                <div className="flex items-start justify-between mb-5">

                  <div>

                    <h3 className="text-lg font-semibold">
                      🌡️ Temperature
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Daily average temperature over the last 30 days
                    </p>

                  </div>

                  <div className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                    °C
                  </div>

                </div>

                <BarGraph
                  data={result.historical_data ?? []}
                  dataKey="temperature"
                  unit="°C"
                  type="temperature"
                  description="The colors show how warm or cool each day was. Blue represents cooler conditions, green represents comfortable temperatures, and yellow to red represents increasingly warmer conditions."
                />

              </div>

              {/* WIND */}
              <div className="border rounded-xl p-6 bg-white shadow-sm">

                <div className="flex items-start justify-between mb-5">

                  <div>

                    <h3 className="text-lg font-semibold">
                      💨 Wind Speed
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Maximum daily wind speed over the last 30 days
                    </p>

                  </div>

                  <div className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">
                    km/h
                  </div>

                </div>

                <BarGraph
                  data={result.historical_data ?? []}
                  dataKey="wind_speed"
                  unit=" km/h"
                  type="wind"
                  description="Each purple bar represents the strongest wind recorded that day. Taller bars indicate stronger winds and can help identify periods of increased weather activity."
                />

              </div>

            </div>

          </section>

          {/* AI ACTION PLAN */}
          <section>

            <div className="border rounded-xl p-6 bg-white">

              <p className="text-xs tracking-widest uppercase text-[#00C8B3] mb-2">
                AI Action Plan
              </p>

              <h2 className="text-2xl font-semibold">
                Recommended Response
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Practical guidance based on the environmental
                assessment and available weather data.
              </p>

              <div className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {result.ai_action_plan}
              </div>

            </div>

          </section>

          {/* UPDATED */}
          <p className="text-xs text-slate-400">
            Analysis updated: {result.date}
          </p>

        </section>

      )}

    </div>
  )
}
