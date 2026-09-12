import ChatBot from "@/components/aiComp/chatBot";
import { pageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = pageMetadata(
  "Agentic AI",
  "Ask our AI agent about environmental conditions, response strategies, community impact, and data-driven insights",
  ["ai", "pollution", "earth"]
);

export default function ChatbotPage() {
  return (
    <div
      className="flex min-h-screen flex-col w-full"
      role="application"
      aria-label="Agentic AI assistant for environmental intelligence"
    >
      <header 
        className="flex-col p-4 pl-8 my-4 border-b "
        aria-describedby="resources-description"
      >
          <p 
            className="font-thin text-[11px] text-primary uppercase tracking-widest"
            aria-label="Page section"
          >
            AI AGENT
          </p>
          <h1 
            className="text-4xl text-foregroun"
            id="page-title"
          >
            Ask anything. Act on what matters.
          </h1>
          <p 
            className="line-clamp-3 w-1/2 text-muted-foreground mt-2"
            id="resources-description"
          >
            Ask the AI about current conditions, risks, and recommended steps — or work through the generated response plan below.
          </p>
      </header>

      <main
        className="h-[calc(100vh-7rem)] min-h-[600px] w-full max-w-7xl p-4"
        role="main"
        aria-label="AI chatbot interface for environmental queries"
      >
        <section
          className="h-full w-full"
          aria-labelledby="chatbot-heading"
          aria-describedby="chatbot-description"
          role="region"
        >
          <ChatBot />
        </section>
      </main>
    </div>
  );
}