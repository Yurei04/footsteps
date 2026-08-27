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
} > = {
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


export default function InfoHomeCard({ data }: InfoCardDataProps) {
  return (
    <div className="w-full">
      {data.map((card) => (
        <Card key={card.id} className="p-4 bg-emerald-100/90">
            
          <div className="grid grid-cols-[2fr_.9fr] gap-2 justify-between">
            <div className="flex flex-col gap-2">
                <CardHeader className="flex text-black/50 text-xl p-0 tracking-widest"> LIVE <Dot/> {card.location} </CardHeader>
                <CardTitle className="text-4xl">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
            </div>
            <div className="flex justify-end ">
                <Badge className={`
                text-[10px]
                px-4 py-3 
                  ${numLevel[card.level].bg}
                  ${numLevel[card.level].text}
                `}> {numLevel[card.level].label} </Badge>
            </div>
          </div>

          <Separator className="border border-black/20" />

          <div className="flex justify-between gap-2 px-4">
            <p>
              Suggestion Response  
            </p>
            <Link href={card.href}>
              <Button className="cursor-pointer" variant="ghost">Open Plan <ArrowRight/></Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  )
}

