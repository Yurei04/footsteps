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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Weather: "bg-blue-100 text-blue-600",
      News: "bg-orange-100 text-orange-600",
      Location: "bg-green-100 text-green-600",
      History: "bg-red-100 text-red-600",
    };
    return colors[category] || "bg-gray-100 text-gray-600";
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
        className="border border-gray-300 rounded-2xl p-6 bg-white"
        role="region"
        aria-labelledby="reports-heading"
        aria-describedby="reports-description"
      >
        <div className="mb-6">
          <span 
            className="text-xs font-medium text-gray-500 uppercase tracking-wide"
            aria-label="Section label"
          >
            News Feed - Our Intelligence
          </span>
        </div>

        <h2 
          className="text-2xl font-light text-black mb-6"
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
              className="text-center py-8 text-gray-500"
              role="status"
              aria-live="polite"
              aria-label="Loading reports"
            >
              Loading reports...
            </div>
          ) : error ? (
            <div 
              className="text-center py-8 text-red-500"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          ) : reports.length === 0 ? (
            <div 
              className="text-center py-8 text-gray-500"
              role="status"
              aria-live="polite"
            >
              No reports available
            </div>
          ) : (
            reports.map((report) => (
              <button
                key={report.id}
                onClick={() => handleOpenReport(report)}
                className="w-full border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="listitem"
                aria-label={`${report.title}: ${report.category}. Click to view details.`}
                aria-expanded={selectedReport?.id === report.id}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <span 
                      className="text-lg text-gray-400"
                      aria-hidden="true"
                    >
                      {getIcon(report.icon)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getCategoryColor(
                          report.category
                        )}`}
                        aria-label={`Category: ${report.category}`}
                      >
                        {report.category}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-black">
                      {report.title}
                    </p>
                    <p 
                      className="text-xs text-gray-500 mt-1"
                      aria-label={`Time: ${report.timestamp}`}
                    >
                      {report.timestamp}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {isDialogOpen && selectedReport && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseDialog}
          role="presentation"
          aria-hidden="false"
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            tabIndex={-1}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded mb-3 inline-block ${getCategoryColor(
                    selectedReport.category
                  )}`}
                  aria-label={`Category: ${selectedReport.category}`}
                >
                  {selectedReport.category}
                </span>
                <h2 
                  className="text-2xl font-light text-black mt-2"
                  id="dialog-title"
                >
                  {selectedReport.title}
                </h2>
              </div>
              <button
                onClick={handleCloseDialog}
                className="text-gray-400 hover:text-black text-2xl leading-none p-2 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Description
                </h3>
                <p className="text-base text-gray-700">
                  {selectedReport.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Details
                </h3>
                <p className="text-base text-gray-700">
                  {selectedReport.details}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <span 
                className="text-xs text-gray-500"
                aria-label={`Report timestamp: ${selectedReport.timestamp}`}
              >
                {selectedReport.timestamp}
              </span>
              <button
                onClick={handleCloseDialog}
                className="px-6 py-2 border border-gray-300 rounded-lg text-black font-medium text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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