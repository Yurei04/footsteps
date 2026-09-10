import { NextResponse } from "next/server"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

function getFirebaseAdmin() {
    if (getApps().length > 0) {
        return getApps()[0]
    }

    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")

    if (
        !process.env.FIREBASE_PROJECT_ID ||
        !process.env.FIREBASE_CLIENT_EMAIL ||
        !privateKey
    ) {
        throw new Error("Firebase environment variables are missing")
    }

    return initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey,
        }),
    })
}

export async function GET() {
    try {
        getFirebaseAdmin()

        const db = getFirestore()
        const snapshot = await db.collection("riskAnalysis").get()

        // Keep only the latest record for each location.
        // This prevents duplicate documents from appearing on the map
        // because the n8n workflow currently creates a new document each run.
        const latestByLocation = new Map<string, FirebaseFirestore.DocumentData>()

        snapshot.docs.forEach((doc) => {
            const data = doc.data()
            const location = String(data.location ?? "Unknown")

            const existing = latestByLocation.get(location)

            if (!existing) {
                latestByLocation.set(location, {
                    ...data,
                    id: doc.id,
                })
                return
            }

            const existingDate = new Date(
                existing.analyzed_at ?? existing.date ?? 0
            ).getTime()

            const currentDate = new Date(
                data.analyzed_at ?? data.date ?? 0
            ).getTime()

            if (currentDate >= existingDate) {
                latestByLocation.set(location, {
                    ...data,
                    id: doc.id,
                })
            }
        })

        const hotspots = Array.from(latestByLocation.values()).map((data) => {
            return {
                id: data.id,

                location: data.location ?? "Unknown",
                country: data.country ?? "Unknown",

                latitude: Number(data.latitude ?? 0),
                longitude: Number(data.longitude ?? 0),

                riskLevel: data.risk_level ?? "LOW",
                riskType: data.risk_type ?? "Normal Weather",

                precipitation: Number(data.precipitation ?? 0),
                temperature: Number(data.temperature ?? 0),
                humidity: Number(data.humidity ?? 0),
                windSpeed: Number(data.wind_speed ?? 0),

                weatherCode:
                    data.weather_code !== null &&
                    data.weather_code !== undefined
                        ? Number(data.weather_code)
                        : null,

                riskReason:
                    data.risk_reason ??
                    "Weather conditions are currently within normal levels.",

                date: data.date ?? null,
                analyzedAt: data.analyzed_at ?? null,
            }
        })

        return NextResponse.json(hotspots)
    } catch (error) {
        console.error("Risk API error:", error)

        return NextResponse.json(
            { error: "Failed to fetch environmental risk data" },
            { status: 500 }
        )
    }
}