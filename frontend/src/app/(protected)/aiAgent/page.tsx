import ChatBot from "@/components/aiComp/chatBot";
import UpperNav from "@/components/dashboard/upperNav";

export default function ChatbotPage() {
  return (
    <div className="w-full h-screen">
        <UpperNav />
        <ChatBot />
    </div>
  )
}