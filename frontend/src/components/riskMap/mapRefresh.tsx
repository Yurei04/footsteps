import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"


interface MapRefreshProps {
    refresh?: boolean
    onRefresh?: () => void
}

export default function MapRefresh ({ refresh = false, onRefresh }: MapRefreshProps) {
    return (
        <section 
          className="w-full h-full flex flex-col justify-evenly gap-4"
          role="region"
          aria-label="Map update notification"
          aria-describedby="refresh-description"
        >
            <h2 
              className="text-[#00C8B3] text-xs tracking-widest uppercase"
              id="refresh-title"
              aria-label="Section label"
            >
                Map Refresh
            </h2>
            
            <h3 
              className="text-2xl font-semibold"
              id="refresh-description"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
                New satellite moisture layer available.
            </h3>

            <p className="sr-only">
                An updated satellite imagery moisture layer is available for the environmental risk map. 
                Click the Apply Update button to load the latest data.
            </p>
            
            <Button
                onClick={onRefresh}
                variant="ghost"
                className="text-md tracking-wider flex justify-start hover:bg-gray-100 transition-colors"
                aria-label={`Apply map update. Currently showing ${refresh ? 'updated' : 'standard'} data.`}
                aria-describedby="update-info"
                role="button"
            >
                Apply Update 
                <ArrowRight 
                  aria-hidden="true"
                  className="ml-2"
                />
            </Button>

            <p 
              id="update-info"
              className="sr-only"
            >
                Clicking this button will update the map with the latest satellite moisture data to improve risk assessment accuracy.
            </p>
        </section>
    )
}