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

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports");
        const data = await response.json();
        setReports(data.reports);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
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
      <div className="border border-gray-300 rounded-2xl p-6 bg-white">
        <div className="mb-6">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            News Feed - Our Intelligence
          </span>
        </div>

        <h2 className="text-2xl font-light text-black mb-6">
          Location: National picture
        </h2>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading reports...
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reports available
            </div>
          ) : (
            reports.map((report) => (
              <button
                key={report.id}
                onClick={() => handleOpenReport(report)}
                className="w-full border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <span className="text-lg text-gray-400">
                      {getIcon(report.icon)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getCategoryColor(
                          report.category
                        )}`}
                      >
                        {report.category}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-black">
                      {report.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
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
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded mb-3 inline-block ${getCategoryColor(
                    selectedReport.category
                  )}`}
                >
                  {selectedReport.category}
                </span>
                <h2 className="text-2xl font-light text-black mt-2">
                  {selectedReport.title}
                </h2>
              </div>
              <button
                onClick={handleCloseDialog}
                className="text-gray-400 hover:text-black text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Description
              </h3>
              <p className="text-base text-gray-700">
                {selectedReport.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Details
              </h3>
              <p className="text-base text-gray-700">
                {selectedReport.details}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                {selectedReport.timestamp}
              </span>
              <button
                onClick={handleCloseDialog}
                className="px-6 py-2 border border-gray-300 rounded-lg text-black font-medium text-sm hover:bg-gray-50 transition-colors"
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