"use client";

import { useState, useEffect } from "react";

export default function AgentBlock() {
  const [isCollecting, setIsCollecting] = useState(true);
  const [progress, setProgress] = useState(45);

  useEffect(() => {
    if (!isCollecting) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsCollecting(false);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isCollecting]);

  const handleRefresh = () => {
    setProgress(0);
    setIsCollecting(true);
  };

  return (
    <div className="border border-gray-300 rounded-2xl p-6 bg-white w-full max-w-sm">
      <div className="mb-6">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Agent Status
        </span>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-light text-black mb-6">
          Collection in progress
        </h3>

        <div className="bg-gray-100 rounded-lg p-6 mb-6 min-h-40 flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#000"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.3s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-black">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {isCollecting ? "Gathering data..." : "Collection complete"}
          </p>
        </div>
      </div>

      <button
        onClick={handleRefresh}
        className="w-full py-3 px-4 border border-gray-300 rounded-lg text-black font-medium text-sm hover:bg-gray-50 transition-colors"
      >
        Refresh Collection
      </button>
    </div>
  );
}