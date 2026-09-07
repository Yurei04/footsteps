import ChatBot from "@/components/aiComp/chatBot";
import UpperNav from "@/components/dashboard/upperNav";

import { pageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = pageMetadata(
  "Agentic AI",
  "Ask our AI agent about environmental conditions, response strategies, community impact, and data-driven insights",
  ["ai", "pollution", "earth"]
)

export default function ChatbotPage() {
  return (
    <div 
      className="w-full h-screen"
      role="application"
      aria-label="Agentic AI assistant for environmental intelligence"
    >
        <UpperNav />

        <main 
          role="main"
          aria-label="AI chatbot interface for environmental queries"
          className="h-[calc(100vh-var(--nav-height))]"
        >
          <section 
            aria-labelledby="chatbot-heading"
            role="region"
            aria-describedby="chatbot-description"
            className="h-full"
          >
            <h1 
              className="sr-only"
              id="chatbot-heading"
            >
              Agentic AI Assistant
            </h1>
            <p 
              className="sr-only"
              id="chatbot-description"
            >
              Ask our AI agent about environmental conditions, response strategies, community impact, and data-driven insights.
            </p>
            <ChatBot />
          </section>
        </main>
    </div>
  )
}