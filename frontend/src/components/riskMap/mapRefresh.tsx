import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

interface MapRefreshProps {
  actionPlan?: string
  onViewActionPlan?: () => void
}

export default function MapRefresh({
  actionPlan,
  onViewActionPlan,
}: MapRefreshProps) {
  return (
    <section
      className="w-full h-full flex flex-col justify-evenly gap-4"
      role="region"
      aria-label="AI action plan"
      aria-describedby="action-plan-description"
    >
      <h2
        className="text-[#00C8B3] text-xs tracking-widest uppercase"
        id="action-plan-title"
      >
        AI Action Plan
      </h2>

      <h3
        className="text-2xl font-semibold"
        id="action-plan-description"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {actionPlan ||
          "Select a risk hotspot to generate an AI recommended action plan."}
      </h3>

      <p className="sr-only">
        The AI analyzes the selected environmental risk hotspot and provides
        recommended response actions.
      </p>

      <Button
        onClick={onViewActionPlan}
        variant="ghost"
        className="text-md tracking-wider flex justify-start hover:bg-gray-100 transition-colors"
        aria-label="View AI action plan"
      >
        View Action Plan
        <ArrowRight
          aria-hidden="true"
          className="ml-2"
        />
      </Button>
    </section>
  )
}