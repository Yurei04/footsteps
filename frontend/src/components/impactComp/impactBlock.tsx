"use client";

import { useState, useEffect } from "react";
import StatsCard from "./statsCard";
import TimelineItem from "./timeLineItem";

interface StatItem {
  id: number;
  label: string;
  value: string;
  subtext: string;
}

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  status: string;
  statusColor: string;
}

interface ImpactData {
  stats: StatItem[];
  timeline: TimelineEvent[];
}

export default function ImpactBlock() {
  const [data, setData] = useState<ImpactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        const response = await fetch("/api/impact");
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch impact data:", error);
        setError("Failed to load impact data");
      } finally {
        setLoading(false);
      }
    };

    fetchImpactData();
  }, []);

  if (loading) {
    return (
      <div 
        className="text-center py-12 text-gray-500"
        role="status"
        aria-live="polite"
        aria-label="Loading impact data"
      >
        Loading impact data...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div 
        className="text-center py-12 text-red-500"
        role="alert"
        aria-live="assertive"
      >
        {error || "Failed to load impact data"}
      </div>
    );
  }

  return (
    <div 
      className="space-y-12"
      role="region"
      aria-labelledby="impact-main-heading"
      aria-describedby="impact-description"
    >
      <p id="impact-description" className="sr-only">
        Impact dashboard showing key metrics and timeline of response outcomes over the last 30 days.
      </p>

      {/* Stats Section */}
      <section aria-labelledby="stats-heading">
        <h2 
          id="stats-heading"
          className="sr-only"
        >
          Key Impact Metrics
        </h2>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="Impact statistics"
        >
          {data.stats.map((stat) => (
            <div key={stat.id} role="listitem">
              <StatsCard
                label={stat.label}
                value={stat.value}
                subtext={stat.subtext}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section aria-labelledby="timeline-main-heading">
        <header className="mb-8">
          <p 
            className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4"
            aria-label="Section context"
          >
            Impact Timeline
          </p>
          <h2 
            className="text-3xl font-light text-black"
            id="timeline-main-heading"
          >
            Response outcomes over 30 days
          </h2>
        </header>

        <div 
          className="space-y-3"
          role="list"
          aria-label="Timeline events"
          aria-describedby="timeline-description"
        >
          <p 
            id="timeline-description"
            className="sr-only"
          >
            Chronological list of environmental response outcomes and actions taken over the past 30 days.
          </p>
          
          {data.timeline.map((event) => (
            <TimelineItem
              key={event.id}
              date={event.date}
              title={event.title}
              description={event.description}
              status={event.status}
              statusColor={event.statusColor}
            />
          ))}
        </div>
      </section>
    </div>
  );
}