// InfoHomeCard.tsx (PRESENTATION - no hooks needed)
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ArrowRight, Dot } from "lucide-react"
import { Separator } from "../ui/separator"

interface InfoCardData {
  id: number
  title: string
  description: string
  href: string
  location: string
  level: number
}

interface InfoCardDataProps {
  data: InfoCardData[]
}

const numLevel: Record<number, {
  label: string
  bg: string
  border: string
  text: string
}> = {
  1: {
    label: "LOW RISK",
    bg: "bg-green-100",
    border: "border border-green-500",
    text: "text-green-800",
  },

  2: {
    label: "MEDIUM RISK",
    bg: "bg-yellow-100",
    border: "border border-yellow-500",
    text: "text-yellow-800",
  },

  3: {
    label: "HIGH RISK",
    bg: "bg-red-100",
    border: "border border-red-500",
    text: "text-red-800",
  },
}

const getRiskDescription = (level: number) => {
  const descriptions: Record<number, string> = {
    1: "Low risk level. Situation is stable.",
    2: "Medium risk level. Monitor closely.",
    3: "High risk level. Immediate action may be needed.",
  };
  return descriptions[level] || "Unknown risk level";
};

export default function InfoHomeCard({ data }: InfoCardDataProps) {
  return (
    <div 
      className="w-full"
      role="region"
      aria-labelledby="info-cards-heading"
      aria-describedby="info-cards-description"
    >
      <h2 id="info-cards-heading" className="sr-only">Live Risk Alerts</h2>
      <p id="info-cards-description" className="sr-only">
        List of current environmental alerts with risk levels and suggested response plans.
      </p>

      <div 
        role="list"
        aria-label="Risk alerts"
      >
        {data.map((card) => (
          <article 
            key={card.id} 
            role="listitem"
            aria-labelledby={`card-title-${card.id}`}
            aria-describedby={`card-desc-${card.id}`}
          >
            <Card 
              className="p-8 bg-[#FFF9F9] hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
              role="article"
            >
              <div className="grid grid-cols-[2fr_.9fr] gap-2 justify-between mb-4">
                <div className="flex flex-col gap-2">
                  <CardHeader 
                    className="flex text-black/50 text-md p-0 tracking-widest"
                    aria-label="Status indicator"
                  >
                    LIVE 
                    <Dot 
                      aria-hidden="true"
                      className="mx-1"
                    />
                    <span aria-label={`Location: ${card.location}`}>
                      {card.location}
                    </span>
                  </CardHeader>
                  <CardTitle 
                    className="text-2xl"
                    id={`card-title-${card.id}`}
                  >
                    {card.title}
                  </CardTitle>
                  <CardDescription 
                    id={`card-desc-${card.id}`}
                  >
                    {card.description}
                  </CardDescription>
                </div>
                <div className="flex justify-end">
                  <Badge 
                    className={`
                      text-[10px]
                      px-4 py-3 
                      ${numLevel[card.level].bg}
                      ${numLevel[card.level].text}
                    `}
                    aria-label={`Risk level: ${numLevel[card.level].label}. ${getRiskDescription(card.level)}`}
                    role="status"
                  >
                    {numLevel[card.level].label}
                  </Badge>
                </div>
              </div>

              <Separator 
                className="border border-black/10"
                role="presentation"
                aria-hidden="true"
              />

              <div className="flex justify-between gap-2 mt-4">
                <p className="text-sm text-gray-600">
                  Suggested Response
                </p>
                <Link 
                  href={card.href}
                  aria-label={`Open response plan for ${card.title}`}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  <Button 
                    className="cursor-pointer focus:outline-none"
                    variant="ghost"
                    aria-label={`Open plan for ${card.title}: ${numLevel[card.level].label}`}
                  >
                    Open Plan 
                    <ArrowRight 
                      aria-hidden="true"
                      className="ml-2"
                    />
                  </Button>
                </Link>
              </div>
            </Card>
          </article>
        ))}
      </div>
    </div>
  )
}