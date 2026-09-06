"use client"

import { useEffect, useState } from "react"

interface Hotspot {
    id: string
    location: string
    rating: number
    riskType: string
    time: number
    rainfallTrigger: number
    groundSaturation: number
    populationExposure: number
}

export default function HotSpotDetails() {
    const [hotspot, setHotSpots] = useState<Hotspot[]>([])

    useEffect(() => {
         const fetchHotspots = async () => {
            try {
                console.log("Fetching data...")
                const res = await fetch("/api/risk")
                const data = await res.json()
                console.log("Fetched data:", data)
                setHotSpots(data)
            } catch (error) {
                console.error("Failed to fetch data:", error)
            }
        }
        fetchHotspots()
    }, [])

    return (
        <div className="p-4">
            {hotspot.map((hotspot) => (
                <div 
                    key={hotspot.id} 
                    className=""
                >
                    <h2 className="font-thin tracking-tight text-xs">HOSTSPOT DETAIL</h2>
                    <h1 className="font-bold text-4xl mb-3">{hotspot.location}</h1>
                    <p className="text-lg"><span className="font-semibold text-4xl">{hotspot.rating}</span>  /100</p>
                    <p className="font-thin tracking-widest text-xs mb-4"> <span>{hotspot.riskType}</span> · next {hotspot.rainfallTrigger} hours</p>
                
                    <div className="grid grid-cols-2 gap-4">
                        <p className="font-semibold text-gray-600">Ground Saturation</p>
                        <p className="text-right">{hotspot.groundSaturation}%</p>
                        
                        <p className="font-semibold text-gray-600">Population Exposure</p>
                        <p className="text-right">{hotspot.populationExposure.toLocaleString()}</p>
                        
                        <p className="font-semibold text-gray-600">Year</p>
                        <p className="text-right">{hotspot.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}