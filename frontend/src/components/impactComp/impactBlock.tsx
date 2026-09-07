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

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        const response = await fetch("/api/impact");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch impact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpactData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">Loading impact data...</div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-gray-500">
        Failed to load impact data
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.stats.map((stat) => (
            <StatsCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              subtext={stat.subtext}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-8">
          <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
            Impact Timeline
          </h2>
          <h1 className="text-3xl font-light text-black">
            Response outcomes over 30 days
          </h1>
        </div>

        <div className="space-y-3">
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
      </div>
    </div>
  );
}