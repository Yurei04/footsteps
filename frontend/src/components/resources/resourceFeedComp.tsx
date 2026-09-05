"use client"
import { useEffect, useState } from "react"
import ResourceCard from "./resourceCard"

interface ResourceData {
    id: string
    title: string
    desc: string
    type: string
    link: string
}

export default function ResourceFeedComp () {
    const [resource, setResources] = useState<ResourceData[]>([])

    useEffect(() => {
         const fetchResource = async () => {
            try {
                console.log("Fetching news...")
                const res = await fetch("/api/resources")
                const data = await res.json()
                console.log("Fetched news:", data)
                setResources(data)
            } catch (error) {
                console.error("Failed to fetch resources:", error)
            }
        }
        fetchResource()
    }, [])

    return (       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 contain-content content-visibility-auto">
            {resource.map((resource) => (
                <div
                    key={resource.id}
                    className="contain-layout contain-paint"
                >
                    <ResourceCard
                        title={resource.title}
                        desc={resource.desc}
                        type={resource.type}
                        link={resource.link}
                    />
                </div>
            ))}
        </div>
    )
}