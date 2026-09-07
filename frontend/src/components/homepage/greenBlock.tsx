// GreenBlock.tsx (CLIENT COMPONENT - has interactivity)
"use client"

import { useEffect, useState } from "react"
import InfoHomeCard from "./infoHomeCard"

const cardDataList = [
  {
    id: 1,
    title: "Rain Alert Verified",
    description: "Four sources agree on rainfall though the afternoon",
    location: "MARIKINA BASIN",
    href: "/analytics",
    level: 3
  },
  // ... rest of data
]

export default function GreenBlock() {
  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    // fetch weather or other side effects here
  }, [])

  return (
    <section 
      className="flex flex-col rounded-4xl border w-[80%] h-[500px] justify-end p-16 m-4 bg-[#D5FAD6]"
      role="region"
      aria-labelledby="green-block-heading"
      aria-describedby="green-block-description"
    >
      <h2 
        id="green-block-heading"
        className="sr-only"
      >
        Live Environmental Alerts
      </h2>
      
      <p 
        id="green-block-description"
        className="sr-only"
      >
        Real-time environmental risk alerts with suggested response plans for active conditions.
      </p>

      <InfoHomeCard data={cardDataList} />
    </section>
  )
}