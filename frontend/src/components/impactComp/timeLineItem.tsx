"use client";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  status: string;
  statusColor: string;
}

export default function TimelineItem({
  date,
  title,
  description,
  status,
  statusColor,
}: TimelineItemProps) {
  const getStatusStyles = (color: string) => {
    const styles: Record<string, string> = {
      blue: "bg-blue-100 text-blue-700",
      gray: "bg-gray-200 text-gray-700",
      green: "bg-green-100 text-green-700",
    };
    return styles[color] || "bg-gray-100 text-gray-700";
  };

  const getStatusLabel = (color: string) => {
    const labels: Record<string, string> = {
      blue: "In progress",
      gray: "Pending",
      green: "Completed",
    };
    return labels[color] || "Unknown status";
  };

  return (
    <article 
      className="border border-gray-300 rounded-xl p-6 bg-white hover:bg-gray-50 transition-colors"
      role="listitem"
      aria-labelledby={`timeline-title-${date}`}
      aria-describedby={`timeline-desc-${date}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <time 
              className="text-xs font-medium text-gray-500"
              dateTime={date}
              aria-label={`Date: ${date}`}
            >
              {date}
            </time>
            <span 
              className="text-xs font-medium text-gray-400"
              aria-hidden="true"
            >
              •
            </span>
          </div>
          <h3 
            className="text-base font-medium text-black mb-1"
            id={`timeline-title-${date}`}
          >
            {title}
          </h3>
          <p 
            className="text-sm text-gray-600"
            id={`timeline-desc-${date}`}
          >
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
              statusColor
            )}`}
            aria-label={`Status: ${status}. ${getStatusLabel(statusColor)}`}
            role="status"
          >
            {status}
          </span>
        </div>
      </div>
    </article>
  );
}