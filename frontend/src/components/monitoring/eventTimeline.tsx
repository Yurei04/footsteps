// components/EventTimeline.tsx
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

const initialEvents: Event[] = [
    {
        id: "1",
        title: "Rainfall threshold crossed",
        time: "08:42",
        status: "High",
        severity: "High",
        timestamp: Date.now(),
        description: "Rainfall monitoring alert",
        details: "Rainfall has exceeded safe threshold levels in monitoring zone. Action required for population alert.",
    },
    {
        id: "2",
        title: "Doppler radar validates intensity",
        time: "08:37",
        status: "Verified",
        severity: "Verified",
        timestamp: Date.now() - 300000,
        description: "Radar validation complete",
        details: "Doppler radar systems have verified the intensity of rainfall patterns across the region.",
    },
    {
        id: "3",
        title: "River level +12 cm in 30 min",
        time: "08:18",
        status: "Watch",
        severity: "Watch",
        timestamp: Date.now() - 1440000,
        description: "River level monitoring alert",
        details: "River levels have risen 12 cm within a 30-minute window. Close monitoring recommended.",
    },
    {
        id: "4",
        title: "AI action plan refreshed",
        time: "07:59",
        status: "Ready",
        severity: "Ready",
        timestamp: Date.now() - 2700000,
        description: "System status update",
        details: "AI-generated action plan has been updated based on latest environmental data.",
    },
]

export default function EventTimeline() {
    const [events, setEvents] = useState<Event[]>(initialEvents)
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Auto-update: Remove events older than 24 hours
    useEffect(() => {
        const interval = setInterval(() => {
            setEvents((prevEvents) => {
                const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000
                const filtered = prevEvents.filter(
                    (event) => event.timestamp > twentyFourHoursAgo
                )
                return filtered.length > 0 ? filtered : initialEvents
            })
        }, 60000) // Check every minute

        return () => clearInterval(interval)
    }, [])

    // Real data fetching function (ready to use)
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/events")
                const data = await res.json()
                setEvents(data)
            } catch (error) {
                console.error("Failed to fetch events:", error)
                // Keep using fake data
            }
        }

        // Uncomment to fetch from API
        // fetchEvents()

        // Optional: Polling every 30 seconds
        // const interval = setInterval(fetchEvents, 30000)
        // return () => clearInterval(interval)
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

    return (
        <div className="w-full h-1/2 m-2">
            <div className="border rounded-2xl p-6 ">
                <p className="text-xs tracking-widest font-thin mb-2">
                    EVENT TIMELINE
                </p>
                <h2 className="text-xl font-bold mb-8">
                    National picture monitoring stream
                </h2>

                <div className="space-y-2">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <div
                                key={event.id}
                                className="flex gap-4 cursor-pointer group"
                                onClick={() => handleEventClick(event)}
                            >
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-4 h-4 rounded-full ${getSeverityColor(
                                            event.severity
                                        )} mb-2 group-hover:scale-125 transition-transform`}
                                    />
                                    {index !== events.length - 1 && (
                                        <div className="w-0.5 h-20 bg-black" />
                                    )}
                                </div>

                                <div className="pb-4 group-hover:translate-x-2 transition-transform">
                                    <h3 className="text-lg font-semibold mb-1">
                                        {event.title}
                                    </h3>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs ">
                                            {event.time}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            {event.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center py-8">
                            No recent events. Monitoring active.
                        </p>
                    )}
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            {selectedEvent?.title}
                        </DialogTitle>
                        <DialogDescription>
                            Event Details & Information
                        </DialogDescription>
                    </DialogHeader>

                    {selectedEvent && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">
                                        Time
                                    </p>
                                    <p className="font-semibold">
                                        {selectedEvent.time}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">
                                        Status
                                    </p>
                                    <Badge className="w-fit">
                                        {selectedEvent.status}
                                    </Badge>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-2">
                                    Description
                                </p>
                                <p className="text-sm">
                                    {selectedEvent.description}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-2">
                                    Full Details
                                </p>
                                <p className="text-sm">
                                    {selectedEvent.details}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 mb-1">
                                    Logged At
                                </p>
                                <p className="text-xs font-mono">
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