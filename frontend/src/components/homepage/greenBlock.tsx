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
    <div className="flex flex-col rounded-4xl border w-[80%] h-[500px] justify-end p-16 m-4 bg-[#D5FAD6]">
      <InfoHomeCard data={cardDataList} />
    </div>
  )
}