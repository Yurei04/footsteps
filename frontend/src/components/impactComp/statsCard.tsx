"use client";

interface StatsCardProps {
  label: string;
  value: string;
  subtext: string;
}

export default function StatsCard({ label, value, subtext }: StatsCardProps) {
  return (
    <div className="border border-gray-300 rounded-2xl p-6 bg-white">
      <div className="mb-4">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="mb-4">
        <h3 className="text-5xl font-light text-black">{value}</h3>
      </div>
      <div>
        <p className="text-sm text-gray-500">{subtext}</p>
      </div>
    </div>
  );
}