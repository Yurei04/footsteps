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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
         const fetchResource = async () => {
            try {
                console.log("Fetching resources...")
                const res = await fetch("/api/resources")
                const data = await res.json()
                console.log("Fetched resources:", data)
                setResources(data)
                setError(null)
            } catch (error) {
                console.error("Failed to fetch resources:", error)
                setError("Failed to load resources")
            } finally {
                setLoading(false)
            }
        }
        fetchResource()
    }, [])

    return (       
        <div 
          className="p-4"
          role="region"
          aria-labelledby="resources-section-heading"
          aria-describedby="resources-description"
        >
            <h2 
              id="resources-section-heading"
              className="sr-only"
            >
                Reference Materials and Resources
            </h2>
            
            <p 
              id="resources-description"
              className="sr-only"
            >
                Grid of reference materials, protocols, and technical resources for field teams and system operators.
            </p>

            {loading ? (
                <div 
                  role="status"
                  aria-live="polite"
                  aria-label="Loading resources"
                  className="text-center py-12 text-gray-500"
                >
                    Loading resources...
                </div>
            ) : error ? (
                <div 
                  role="alert"
                  aria-live="assertive"
                  className="text-center py-12 text-red-500"
                >
                    {error}
                </div>
            ) : resource.length === 0 ? (
                <div 
                  role="status"
                  aria-live="polite"
                  className="text-center py-12 text-gray-500"
                >
                    No resources available at this time.
                </div>
            ) : (
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 contain-content content-visibility-auto"
                  role="list"
                  aria-label="Resources list"
                >
                    {resource.map((resource) => (
                        <div
                            key={resource.id}
                            className="contain-layout contain-paint"
                            role="listitem"
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
            )}
        </div>
    )
}