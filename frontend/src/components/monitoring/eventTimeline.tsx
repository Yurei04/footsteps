"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Event {
    id: string
    title: string
    time: string
    status: string
    severity: "High" | "Verified" | "Watch" | "Ready"
    timestamp: number
    description: string
    details: string
}

export default function EventTimeline() {
    const [events, setEvents] = useState<Event[]>([])
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch events on mount and set up polling
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/eventTimeline")
                const data = await res.json()
                setEvents(data)
                setError(null)
            } catch (error) {
                console.error("Failed to fetch events:", error)
                setError("Failed to load events")
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()

        // Poll every 30 seconds for new events
        const interval = setInterval(fetchEvents, 30000)
        return () => clearInterval(interval)
    }, [])

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event)
        setIsDialogOpen(true)
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "High":
                return "bg-red-500"
            case "Verified":
                return "bg-blue-500"
            case "Watch":
                return "bg-yellow-500"
            case "Ready":
                return "bg-green-500"
            default:
                return "bg-gray-500"
        }
    }

    const getSeverityLabel = (severity: string) => {
        const labels: Record<string, string> = {
            "High": "High severity",
            "Verified": "Verified event",
            "Watch": "Watch status",
            "Ready": "Ready status"
        }
        return labels[severity] || severity
    }

    return (
        <div 
          className="w-full h-1/2 m-2"
          role="region"
          aria-labelledby="timeline-heading"
          aria-describedby="timeline-description"
        >
            <div 
              className="border rounded-2xl p-6"
              role="region"
              aria-label="Event timeline"
            >
                <p 
                  className="text-xs tracking-widest font-thin mb-2 uppercase"
                  aria-label="Section context"
                >
                    EVENT TIMELINE
                </p>
                <h2 
                  className="text-xl font-bold mb-8"
                  id="timeline-heading"
                >
                    National picture monitoring stream
                </h2>

                <p 
                  id="timeline-description"
                  className="sr-only"
                >
                  Timeline of environmental monitoring events. Click any event to view detailed information.
                </p>

                {loading ? (
                    <div 
                      role="status"
                      aria-live="polite"
                      aria-label="Loading events"
                      className="text-center py-8 text-gray-400"
                    >
                        Loading events...
                    </div>
                ) : error ? (
                    <div 
                      role="alert"
                      aria-live="assertive"
                      className="text-center py-8 text-red-500"
                    >
                        {error}
                    </div>
                ) : (
                    <div 
                      className="space-y-2"
                      role="list"
                      aria-label="Events list"
                      aria-live="polite"
                      aria-atomic="false"
                    >
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <button
                                    key={event.id}
                                    className="w-full flex gap-4 cursor-pointer group hover:bg-gray-50 rounded-lg p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={() => handleEventClick(event)}
                                    role="listitem"
                                    aria-label={`${event.title}. Severity: ${getSeverityLabel(event.severity)}. Status: ${event.status}. Time: ${event.time}. Click to view details.`}
                                    aria-expanded={selectedEvent?.id === event.id}
                                >
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-4 h-4 rounded-full ${getSeverityColor(
                                                event.severity
                                            )} mb-2 group-hover:scale-125 transition-transform`}
                                            aria-hidden="true"
                                            role="presentation"
                                        />
                                        {index !== events.length - 1 && (
                                            <div 
                                              className="w-0.5 h-20 bg-black"
                                              aria-hidden="true"
                                              role="presentation"
                                            />
                                        )}
                                    </div>

                                    <div className="pb-4 group-hover:translate-x-2 transition-transform">
                                        <h3 className="text-lg font-semibold mb-1">
                                            {event.title}
                                        </h3>
                                        <div 
                                          className="flex gap-2 items-center"
                                          aria-label={`Event metadata`}
                                        >
                                            <span 
                                              className="text-xs"
                                              aria-label={`Time: ${event.time}`}
                                            >
                                                {event.time}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                                aria-label={`Status: ${event.status}`}
                                            >
                                                {event.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <p 
                              className="text-gray-400 text-center py-8"
                              role="status"
                            >
                                No recent events. Monitoring active.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <Dialog 
              open={isDialogOpen} 
              onOpenChange={setIsDialogOpen}
            >
                <DialogContent 
                  className="max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  role="dialog"
                  aria-labelledby="event-dialog-title"
                  aria-describedby="event-dialog-description"
                >
                    <DialogHeader>
                        <DialogTitle 
                          className="text-2xl"
                          id="event-dialog-title"
                        >
                            {selectedEvent?.title}
                        </DialogTitle>
                        <DialogDescription 
                          id="event-dialog-description"
                          aria-label="Event details modal"
                        >
                            Event Details & Information
                        </DialogDescription>
                    </DialogHeader>

                    {selectedEvent && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p 
                                      className="text-xs text-gray-500 mb-1"
                                      id="event-time-label"
                                    >
                                        Time
                                    </p>
                                    <p 
                                      className="font-semibold"
                                      aria-labelledby="event-time-label"
                                    >
                                        {selectedEvent.time}
                                    </p>
                                </div>
                                <div>
                                    <p 
                                      className="text-xs text-gray-500 mb-1"
                                      id="event-status-label"
                                    >
                                        Status
                                    </p>
                                    <Badge 
                                      className="w-fit"
                                      aria-labelledby="event-status-label"
                                    >
                                        {selectedEvent.status}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <p 
                                  className="text-xs text-gray-500 mb-2"
                                  id="event-description-label"
                                >
                                    Description
                                </p>
                                <p 
                                  className="text-sm"
                                  aria-labelledby="event-description-label"
                                >
                                    {selectedEvent.description}
                                </p>
                            </div>

                            <div>
                                <p 
                                  className="text-xs text-gray-500 mb-2"
                                  id="event-details-label"
                                >
                                    Full Details
                                </p>
                                <p 
                                  className="text-sm"
                                  aria-labelledby="event-details-label"
                                >
                                    {selectedEvent.details}
                                </p>
                            </div>

                            <div>
                                <p 
                                  className="text-xs text-gray-500 mb-1"
                                  id="event-logged-label"
                                >
                                    Logged At
                                </p>
                                <p 
                                  className="text-xs font-mono"
                                  aria-labelledby="event-logged-label"
                                >
                                    {new Date(
                                        selectedEvent.timestamp
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}