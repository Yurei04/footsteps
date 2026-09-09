"use client"

export default function Settings() {
    return (
        <div className="w-full">
            <div className="flex-col p-4 pl-8 mb-4 justify-between">
                <h2 className=" font-thin text-md text-[var(--text-muted)]"> SETTINGS </h2>
                <h1 className="text-4xl text-black "> System configuration. </h1>
                <p className="line-clamp-3"> Configure alert thresholds, data connectors, notification channels, and display preferences. </p>
            </div>
            
        </div>
    )
}