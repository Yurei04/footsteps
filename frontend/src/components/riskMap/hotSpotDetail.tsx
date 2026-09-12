"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ShieldAlert } from "lucide-react";

import ChatMessages from "../aiComp/chatMessage";
import ChatInput from "../aiComp/chatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface RiskHotspotMapData {
  id: string;
  location: string;
  country?: string;
  latitude: number;
  longitude: number;
  riskLevel: string;
  riskType: string;
  riskReason: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  analyzedAt: string;
}

// Initialize messages from localStorage on first render
const initializeMessages = (): Message[] => {
  try {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  } catch (err) {
    console.error("Failed to load chat history:", err);
    return [];
  }
};

// Initialize theme from localStorage on first render
const initializeTheme = (): boolean => {
  try {
    const savedTheme = localStorage.getItem("chatTheme");
    return savedTheme !== "light";
  } catch {
    return true;
  }
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>(initializeMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(initializeTheme);
  const reportInitializedRef = useRef(false);

  // Generate formatted report prompt
  const generatePrompt = useCallback(
    (hotspot: RiskHotspotMapData): string => {
      return `Generate a comprehensive environmental risk report for the following location:

📍 **LOCATION DETAILS:**
Location: ${hotspot.location}
Country: ${hotspot.country || "Unknown"}
Coordinates: ${hotspot.latitude.toFixed(4)}°N, ${hotspot.longitude.toFixed(4)}°E

⚠️ **RISK ASSESSMENT:**
Risk Level: ${hotspot.riskLevel}
Risk Type: ${hotspot.riskType}
Assessment Details: ${hotspot.riskReason}

🌡️ **CURRENT ENVIRONMENTAL CONDITIONS:**
Temperature: ${hotspot.temperature.toFixed(1)}°C
Humidity: ${Math.round(hotspot.humidity)}%
Rainfall: ${hotspot.precipitation.toFixed(1)} mm
Wind Speed: ${hotspot.windSpeed.toFixed(1)} km/h
Last Updated: ${new Date(hotspot.analyzedAt).toLocaleString()}

Please provide a detailed and comprehensive environmental risk report that includes:
1. Executive Summary of environmental risks at this location
2. Current threat assessment and severity level
3. Contributing environmental factors based on weather conditions
4. Recommended immediate and long-term mitigation strategies
5. Critical alerts and warnings for this location
6. Population and infrastructure impact assessment
7. Response recommendations and action plans
8. Timeline of expected risk progression`;
    },
    []
  );

  // Handle sending messages
  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        console.log("📤 Sending message to API...");

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              ...messages,
              { role: "user", content },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("✅ API Response received");

        if (!data.content) {
          throw new Error("No content in API response");
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";

        setError(errorMessage);
        console.error("❌ Chat error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("chatTheme", isDark ? "dark" : "light");
  }, [isDark]);

  // Auto-generate report from hotspot data
  useEffect(() => {
    if (reportInitializedRef.current) return;

    const checkAndGenerateReport = async () => {
      const reportHotspot = localStorage.getItem("reportHotspot");

      if (reportHotspot) {
        try {
          const hotspot: RiskHotspotMapData = JSON.parse(reportHotspot);
          console.log("✅ Hotspot data found:", hotspot.location);

          // Generate the report prompt
          const prompt = generatePrompt(hotspot);

          // Clear the stored data immediately
          localStorage.removeItem("reportHotspot");

          // Send the message
          await handleSendMessage(prompt);
        } catch (err) {
          console.error("❌ Failed to parse hotspot data:", err);
        }
      }

      reportInitializedRef.current = true;
    };

    // Use setTimeout to ensure state is ready
    const timer = setTimeout(checkAndGenerateReport, 300);
    return () => clearTimeout(timer);
  }, [generatePrompt, handleSendMessage]);

  // Listen for quick question events
  useEffect(() => {
    const handleQuickQuestion = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const question = customEvent.detail;
      if (question) {
        handleSendMessage(question);
      }
    };

    window.addEventListener("quickQuestion", handleQuickQuestion);
    return () =>
      window.removeEventListener("quickQuestion", handleQuickQuestion);
  }, [handleSendMessage]);

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-xl"
      role="application"
      aria-label="Environmental AI Assistant chatbot"
    >
      <header className="flex shrink-0 items-center gap-3 border-b border-border bg-card px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <ShieldAlert className="h-5 w-5 text-accent" />
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground">
            Agentic AI
          </h2>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <p className="text-xs text-muted-foreground">
              Environmental Intelligence Assistant
            </p>
          </div>
        </div>
      </header>

      {error && (
        <div
          className="shrink-0 border-b border-destructive/50 bg-destructive/10 px-5 py-3 text-sm text-destructive"
          role="alert"
          aria-live="assertive"
        >
          Error: {error}
        </div>
      )}

      <main className="flex min-h-0 flex-1 flex-col">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          isDark={isDark}
        />

        <ChatInput
          onSend={handleSendMessage}
          isLoading={isLoading}
          isDark={isDark}
        />
      </main>
    </div>
  );
}