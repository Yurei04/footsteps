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
  className: string
  description: string
}> = {
  1: {
    label: "LOW RISK",
    className: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-500",
    description: "Low risk level. Situation is stable.",
  },
  2: {
    label: "MEDIUM RISK",
    className: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 border-yellow-500",
    description: "Medium risk level. Monitor closely.",
  },
  3: {
    label: "HIGH RISK",
    className: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border-red-500",
    description: "High risk level. Immediate action may be needed.",
  },
}

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
              className="p-8 bg-card hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary border border-border"
              role="article"
            >
              <div className="grid grid-cols-[2fr_.9fr] gap-2 justify-between mb-4">
                <div className="flex flex-col gap-2">
                  <CardHeader 
                    className="flex text-muted-foreground text-md p-0 tracking-widest"
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
                    className="text-2xl text-foreground"
                    id={`card-title-${card.id}`}
                  >
                    {card.title}
                  </CardTitle>
                  <CardDescription 
                    id={`card-desc-${card.id}`}
                    className="text-muted-foreground"
                  >
                    {card.description}
                  </CardDescription>
                </div>
                <div className="flex justify-end">
                  <Badge 
                    className={`
                      text-[10px]
                      px-4 py-3 
                      border
                      ${numLevel[card.level].className}
                    `}
                    aria-label={`Risk level: ${numLevel[card.level].label}. ${numLevel[card.level].description}`}
                    role="status"
                  >
                    {numLevel[card.level].label}
                  </Badge>
                </div>
              </div>

              <Separator 
                className="border-border"
                role="presentation"
                aria-hidden="true"
              />

              <div className="flex justify-between gap-2 mt-4">
                <p className="text-sm text-muted-foreground">
                  Suggested Response
                </p>
                <Link 
                  href={card.href}
                  aria-label={`Open response plan for ${card.title}`}
                  className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card rounded transition-all"
                >
                  <Button 
                    className="cursor-pointer focus:outline-none hover:bg-muted transition-colors text-foreground"
                    variant="ghost"
                    aria-label={`Open plan for ${card.title}: ${numLevel[card.level].label}`}
                  >
                    Open Plan 
                    <ArrowRight 
                      aria-hidden="true"
                      className="ml-2 w-4 h-4 transition-transform hover:translate-x-1"
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