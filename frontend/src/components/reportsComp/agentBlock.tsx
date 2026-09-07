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

  const progressRounded = Math.round(progress);

  return (
    <div 
      className="border border-gray-300 rounded-2xl p-6 bg-white w-full max-w-sm"
      role="region"
      aria-labelledby="agent-heading"
      aria-describedby="agent-description"
    >
      <div className="mb-6">
        <span 
          className="text-xs font-medium text-gray-500 uppercase tracking-wide"
          aria-label="Section label"
        >
          Agent Status
        </span>
      </div>

      <div className="mb-8">
        <h3 
          className="text-2xl font-light text-black mb-6"
          id="agent-heading"
        >
          Collection in progress
        </h3>

        <p 
          id="agent-description"
          className="sr-only"
        >
          AI agent is gathering data from environmental sources. Progress shown as percentage complete.
        </p>

        <div 
          className="bg-gray-100 rounded-lg p-6 mb-6 min-h-40 flex flex-col items-center justify-center"
          role="region"
          aria-label="Progress indicator"
        >
          <div className="relative w-24 h-24 mb-4">
            <svg 
              className="w-full h-full"
              viewBox="0 0 100 100"
              role="img"
              aria-labelledby="progress-label"
            >
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
            <div 
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden="false"
            >
              <span 
                className="text-sm font-medium text-black"
                aria-live="polite"
                aria-atomic="true"
                role="status"
              >
                <span aria-label={`${progressRounded} percent`}>
                  {progressRounded}%
                </span>
              </span>
            </div>
          </div>

          <p 
            className="text-sm text-gray-600"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            id="progress-label"
          >
            {isCollecting ? "Gathering data..." : "Collection complete"}
          </p>
        </div>

        <div 
          className="sr-only"
          role="progressbar"
          aria-valuenow={progressRounded}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Data collection progress"
          aria-describedby="agent-description"
        />
      </div>

      <button
        onClick={handleRefresh}
        className="w-full py-3 px-4 border border-gray-300 rounded-lg text-black font-medium text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`Refresh data collection. Currently at ${progressRounded}% complete.`}
        aria-pressed="false"
      >
        Refresh Collection
      </button>
    </div>
  );
}