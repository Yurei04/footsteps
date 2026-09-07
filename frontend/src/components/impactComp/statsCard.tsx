"use client";

interface StatsCardProps {
  label: string;
  value: string;
  subtext: string;
}

export default function StatsCard({ label, value, subtext }: StatsCardProps) {
  return (
    <article 
      className="border border-gray-300 rounded-2xl p-6 bg-white hover:shadow-md transition-shadow"
      role="region"
      aria-labelledby={`stat-label-${label}`}
      aria-describedby={`stat-subtext-${label}`}
    >
      <div className="mb-4">
        <span 
          className="text-xs font-medium text-gray-500 uppercase tracking-wide"
          id={`stat-label-${label}`}
          aria-label="Metric label"
        >
          {label}
        </span>
      </div>
      <div className="mb-4">
        <h3 
          className="text-5xl font-light text-black"
          aria-label={`Value: ${value}`}
          role="doc-subtitle"
        >
          {value}
        </h3>
      </div>
      <div>
        <p 
          className="text-sm text-gray-500"
          id={`stat-subtext-${label}`}
          aria-label={`Additional information: ${subtext}`}
        >
          {subtext}
        </p>
      </div>
    </article>
  );
}