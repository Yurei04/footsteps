import { RefreshCw, Clock3 } from "lucide-react"
import { Button } from "../ui/button"

interface MapRefreshProps {
  lastUpdated?: string
  onRefresh?: () => void
  isRefreshing?: boolean
}

export default function MapRefresh({
  lastUpdated,
  onRefresh,
  isRefreshing = false,
}: MapRefreshProps) {
  return (
    <section
      className="w-full h-full flex flex-col justify-evenly gap-4"
      role="region"
      aria-label="Environmental monitoring"
    >
      <h2 className="text-[#00C8B3] text-xs tracking-widest uppercase">
        Environmental Monitoring
      </h2>

      <div>
        <h3 className="text-2xl font-semibold">
          Risk Map Monitoring
        </h3>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Monitor environmental conditions and risk changes
          across locations using continuously updated data.
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock3 aria-hidden="true" className="size-4" />

        <span>
          {lastUpdated
            ? `Last updated: ${lastUpdated}`
            : "Monitoring current environmental conditions"}
        </span>
      </div>

      <Button
        onClick={onRefresh}
        variant="ghost"
        disabled={isRefreshing}
        className="text-md tracking-wider flex justify-start hover:bg-gray-100 transition-colors"
        aria-label="Refresh environmental risk map"
      >
        <RefreshCw
          aria-hidden="true"
          className={`mr-2 size-4 ${
            isRefreshing ? "animate-spin" : ""
          }`}
        />

        {isRefreshing ? "Refreshing..." : "Refresh Risk Map"}
      </Button>
    </section>
  )
}