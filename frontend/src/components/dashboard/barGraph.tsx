'use client'

import { HistoricalItem } from '@/lib/api'

interface BarGraphProps {
  data: HistoricalItem[]
  dataKey: 'rainfall' | 'temperature' | 'windSpeed'
  unit: string
  description: string
  type: 'rainfall' | 'temperature' | 'wind'
}

export function BarGraph({
  data,
  dataKey,
  unit,
  description,
  type,
}: BarGraphProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-sm text-muted-foreground">
        Historical data unavailable.
      </div>
    )
  }

  const values = data.map((item) => Number(item[dataKey] ?? 0))

  let minValue = Math.min(...values)
  let maxValue = Math.max(...values)

  if (type === 'rainfall' || type === 'wind') {
    minValue = 0
  }

  if (minValue === maxValue) {
    maxValue = minValue + 1
  }

  const range = maxValue - minValue

  const formatDate = (date: string) => {
    try {
      const parsed = new Date(`${date}T00:00:00`)

      if (Number.isNaN(parsed.getTime())) return date

      return parsed.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return date
    }
  }

  function getTemperatureColor(value: number) {
    if (value < 15) return 'bg-blue-500 dark:bg-blue-400'
    if (value < 20) return 'bg-cyan-500 dark:bg-cyan-400'
    if (value < 25) return 'bg-emerald-500 dark:bg-emerald-400'
    if (value < 30) return 'bg-yellow-400 dark:bg-yellow-300'
    if (value < 35) return 'bg-orange-500 dark:bg-orange-400'
    return 'bg-red-500 dark:bg-red-400'
  }

  function getBarColor(value: number) {
    if (type === 'temperature') {
      return getTemperatureColor(value)
    }

    if (type === 'rainfall') {
      if (value >= 50) return 'bg-blue-700 dark:bg-blue-600'
      if (value >= 20) return 'bg-blue-500 dark:bg-blue-400'
      return 'bg-sky-400 dark:bg-sky-300'
    }

    if (value >= 40) return 'bg-purple-700 dark:bg-purple-600'
    if (value >= 20) return 'bg-purple-500 dark:bg-purple-400'
    return 'bg-violet-400 dark:bg-violet-300'
  }

  return (
    <div>
      <div className="mb-6 rounded-lg bg-muted/50 border border-border p-4">
        <p className="text-sm leading-6 text-foreground/80">
          {description}
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[750px]">
          <div className="flex h-80">
            <div
              className="w-14 flex flex-col justify-between text-xs text-muted-foreground pb-8 pr-2 text-right"
              role="presentation"
            >
              <span aria-hidden="true">
                {maxValue.toFixed(type === 'temperature' ? 1 : 0)}
              </span>

              <span aria-hidden="true">
                {(minValue + range * 0.75).toFixed(
                  type === 'temperature' ? 1 : 0
                )}
              </span>

              <span aria-hidden="true">
                {(minValue + range * 0.5).toFixed(
                  type === 'temperature' ? 1 : 0
                )}
              </span>

              <span aria-hidden="true">
                {(minValue + range * 0.25).toFixed(
                  type === 'temperature' ? 1 : 0
                )}
              </span>

              <span aria-hidden="true">
                {minValue.toFixed(type === 'temperature' ? 1 : 0)}
              </span>
            </div>

            <div
              className="relative flex-1 border-l border-b border-border"
              role="img"
              aria-label={`${type} chart over time`}
            >
              <div
                className="absolute inset-0 flex flex-col justify-between pointer-events-none"
                aria-hidden="true"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={i === 4 ? '' : 'border-t border-border/50'}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex items-end gap-0.5 px-2">
                {data.map((item, index) => {
                  const value = Number(item[dataKey] ?? 0)
                  const height =
                    ((value - minValue) / (maxValue - minValue)) * 100

                  return (
                    <div
                      key={`${item.date}-${index}`}
                      className="relative flex h-full flex-1 items-end group"
                      role="presentation"
                    >
                      <div
                        className="absolute bottom-full left-1/2 z-30 mb-2 hidden -translate-x-1/2 group-hover:block"
                        role="tooltip"
                      >
                        <div className="rounded-lg bg-foreground text-background px-3 py-2 text-xs font-medium shadow-xl whitespace-nowrap">
                          <p>{formatDate(item.date)}</p>
                          <p className="mt-1 opacity-80">
                            {value.toFixed(1)}
                            {unit}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`
                          w-full
                          rounded-t-sm
                          transition-all
                          duration-200
                          group-hover:opacity-80
                          group-hover:scale-x-110
                          cursor-pointer
                          ${getBarColor(value)}
                        `}
                        style={{
                          height: `${Math.max(height, 1)}%`,
                        }}
                        aria-label={`${formatDate(item.date)}: ${value.toFixed(1)}${unit}`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div
            className="ml-14 flex justify-between px-2 mt-3 text-xs text-muted-foreground"
            aria-hidden="true"
          >
            <span>{formatDate(data[0].date)}</span>

            {data.length > 2 && (
              <span>
                {formatDate(data[Math.floor(data.length / 2)].date)}
              </span>
            )}

            <span>{formatDate(data[data.length - 1].date)}</span>
          </div>

          <p
            className="mt-3 text-center text-xs text-muted-foreground"
            aria-hidden="true"
          >
            {unit}
          </p>
        </div>
      </div>

      {type === 'temperature' && (
        <div className="mt-6">
          <p className="text-xs font-medium text-muted-foreground mb-3">
            Temperature Guide
          </p>

          <div className="flex flex-wrap gap-3 text-xs">
            <LegendItem color="bg-blue-500" label="<15°C (Cool)" />
            <LegendItem color="bg-cyan-500" label="15-20°C (Mild)" />
            <LegendItem
              color="bg-emerald-500"
              label="20-25°C (Comfortable)"
            />
            <LegendItem color="bg-yellow-400" label="25-30°C (Warm)" />
            <LegendItem color="bg-orange-500" label="30-35°C (Hot)" />
            <LegendItem color="bg-red-500" label=">35°C (Very Hot)" />
          </div>
        </div>
      )}
    </div>
  )
}

interface LegendItemProps {
  color: string
  label: string
}

function LegendItem({ color, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-3 h-3 rounded-sm ${color}`}
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  )
}