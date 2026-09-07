import ChatBot from "@/components/aiComp/chatBot";
import UpperNav from "@/components/dashboard/upperNav";

import { pageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = pageMetadata(
  "Agentic AI ",
  "The system reassesses each risk as new observations arrive, updating confidence and recommended actions in real time. ",
  ["news", "pollution", "earth"]
)

export default function ChatbotPage() {
  return (
    <div className="w-full h-screen">
        <UpperNav />
        <ChatBot />
    </div>
  )
}