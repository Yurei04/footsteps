"use client";

import { useState, useEffect } from "react";

interface Report {
  id: number;
  category: string;
  title: string;
  timestamp: string;
  icon: string;
  description: string;
  details: string;
}

export default function ReportsBlock() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports");
        const data = await response.json();
        setReports(data.reports);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        setError("Failed to load reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleOpenReport = (report: Report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedReport(null), 300);
  };

  const getCategoryColor = (category: string): { bg: string; text: string } => {
    const colors: Record<string, { bg: string; text: string }> = {
      Weather: {
        bg: "bg-blue-900/20",
        text: "text-primary",
      },
      News: {
        bg: "bg-orange-900/20",
        text: "text-accent",
      },
      Location: {
        bg: "bg-cyan-900/20",
        text: "text-primary",
      },
      History: {
        bg: "bg-red-900/20",
        text: "text-destructive",
      },
    };
    return colors[category] || {
      bg: "bg-muted",
      text: "text-muted-foreground",
    };
  };

  const getIcon = (icon: string) => {
    const icons: Record<string, string> = {
      cloud: "◐",
      alert: "⚠",
      map: "◈",
      history: "⟲",
    };
    return icons[icon] || "•";
  };

  return (
    <>
      <div 
        className="border border-border rounded-[var(--radius)] p-6 bg-card text-card-foreground"
        role="region"
        aria-labelledby="reports-heading"
        aria-describedby="reports-description"
      >
        <div className="mb-6">
          <span 
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
            aria-label="Section label"
          >
            News Feed - Our Intelligence
          </span>
        </div>

        <h2 
          className="text-2xl font-light mb-6 text-card-foreground"
          id="reports-heading"
        >
          Location: National picture
        </h2>

        <p 
          id="reports-description"
          className="sr-only"
        >
          List of news reports and intelligence updates. Click any report to view full details.
        </p>

        <div 
          className="space-y-3"
          role="list"
          aria-label="Reports list"
        >
          {loading ? (
            <div 
              className="text-center py-8 text-muted-foreground"
              role="status"
              aria-live="polite"
              aria-label="Loading reports"
            >
              Loading reports...
            </div>
          ) : error ? (
            <div 
              className="text-center py-8 text-destructive"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          ) : reports.length === 0 ? (
            <div 
              className="text-center py-8 text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              No reports available
            </div>
          ) : (
            reports.map((report) => {
              const categoryColor = getCategoryColor(report.category);
              return (
                <button
                  key={report.id}
                  onClick={() => handleOpenReport(report)}
                  className="w-full border border-border rounded-lg p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-card-foreground hover:bg-muted"
                  role="listitem"
                  aria-label={`${report.title}: ${report.category}. Click to view details.`}
                  aria-expanded={selectedReport?.id === report.id}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 pt-1">
                      <span 
                        className="text-lg text-muted-foreground"
                        aria-hidden="true"
                      >
                        {getIcon(report.icon)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${categoryColor.bg} ${categoryColor.text}`}
                          aria-label={`Category: ${report.category}`}
                        >
                          {report.category}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-card-foreground">
                        {report.title}
                      </p>
                      <p 
                        className="text-xs mt-1 text-muted-foreground"
                        aria-label={`Time: ${report.timestamp}`}
                      >
                        {report.timestamp}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {isDialogOpen && selectedReport && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50"
          onClick={handleCloseDialog}
          role="presentation"
          aria-hidden="false"
        >
          <div
            className="rounded-[var(--radius)] p-8 max-w-2xl w-full shadow-lg focus:outline-none focus:ring-2 focus:ring-ring bg-card text-card-foreground"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            tabIndex={-1}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                {selectedReport && (
                  <>
                    {(() => {
                      const categoryColor = getCategoryColor(selectedReport.category);
                      return (
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded mb-3 inline-block ${categoryColor.bg} ${categoryColor.text}`}
                          aria-label={`Category: ${selectedReport.category}`}
                        >
                          {selectedReport.category}
                        </span>
                      );
                    })()}
                  </>
                )}
                <h2 
                  className="text-2xl font-light mt-2 text-card-foreground"
                  id="dialog-title"
                >
                  {selectedReport.title}
                </h2>
              </div>
              <button
                onClick={handleCloseDialog}
                className="text-2xl leading-none p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ring text-muted-foreground hover:bg-muted hover:text-card-foreground"
                aria-label="Close dialog"
                aria-pressed="false"
              >
                ×
              </button>
            </div>

            <div 
              className="space-y-6"
              id="dialog-description"
            >
              <div>
                <h3 
                  className="text-sm font-semibold uppercase tracking-wide mb-2 text-muted-foreground"
                >
                  Description
                </h3>
                <p className="text-base text-card-foreground">
                  {selectedReport.description}
                </p>
              </div>

              <div>
                <h3 
                  className="text-sm font-semibold uppercase tracking-wide mb-2 text-muted-foreground"
                >
                  Details
                </h3>
                <p className="text-base text-card-foreground">
                  {selectedReport.details}
                </p>
              </div>
            </div>

            <div 
              className="flex items-center justify-between pt-6 border-t border-border"
            >
              <span 
                className="text-xs text-muted-foreground"
                aria-label={`Report timestamp: ${selectedReport.timestamp}`}
              >
                {selectedReport.timestamp}
              </span>
              <button
                onClick={handleCloseDialog}
                className="px-6 py-2 border border-border rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring text-card-foreground hover:bg-muted"
                aria-label="Close report details"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}