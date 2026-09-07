"use client";

import { useState, useEffect } from "react";
import ChatMessages from "./chatMessage";
import ChatInput from "./chatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessages(JSON.parse(savedMessages));
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
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
        throw new Error("Failed to get response from chatbot");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm("Clear all messages? This action cannot be undone.")) {
      setMessages([]);
      localStorage.removeItem("chatMessages");
      setError(null);
    }
  };

  return (
    <div 
      className="flex flex-col h-screen bg-white"
      role="application"
      aria-label="Environmental AI Assistant chatbot"
    >
      <header 
        className="border-b border-gray-300 px-6 py-6 bg-white"
        role="banner"
        aria-labelledby="chat-title"
      >
        <div className="mb-2">
          <h2 
            className="text-xs font-medium text-gray-500 uppercase tracking-wide"
            aria-label="Section label"
          >
            AI Agent
          </h2>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 
              className="text-4xl font-light text-black mb-2"
              id="chat-title"
            >
              Environmental Assistant
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Ask our AI agent about environmental conditions, response
              strategies, community impact, and data-driven insights
            </p>
          </div>
          <button
            onClick={handleClearChat}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Clear chat history. Currently have ${messages.length} messages.`}
          >
            Clear
          </button>
        </div>
      </header>

      {error && (
        <div 
          className="px-6 py-3 bg-red-50 border-b border-red-200 text-red-700 text-sm"
          role="alert"
          aria-live="assertive"
          aria-label={`Error: ${error}`}
        >
          Error: {error}
        </div>
      )}

      <ChatMessages 
        messages={messages} 
        isLoading={isLoading}
      />

      <ChatInput 
        onSend={handleSendMessage} 
        isLoading={isLoading}
      />
    </div>
  );
}