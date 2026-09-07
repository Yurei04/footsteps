"use client";

import { useEffect, useRef } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({
  messages,
  isLoading,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div 
      className="flex-1 overflow-y-auto p-6 space-y-4"
      role="region"
      aria-label="Chat message history"
      aria-live="polite"
      aria-atomic="false"
      aria-describedby="chat-description"
    >
      <p id="chat-description" className="sr-only">
        Conversation history with the environmental AI assistant. Messages appear in chronological order with user messages on the right and assistant responses on the left.
      </p>

      {messages.length === 0 && !isLoading && (
        <div 
          className="flex items-center justify-center h-full text-center"
          role="status"
          aria-label="Chat starting state"
        >
          <div>
            <h3 className="text-xl font-light text-black mb-2">
              Start a conversation
            </h3>
            <p className="text-gray-500 max-w-sm">
              Ask questions about environmental conditions, response plans, or
              community impact
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
          role="article"
          aria-label={`${message.role === "user" ? "Your" : "Assistant"} message`}
        >
          <div
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
              message.role === "user"
                ? "bg-black text-white"
                : "bg-gray-100 text-black border border-gray-300"
            }`}
            role="region"
            aria-label={`${message.role === "user" ? "User" : "Assistant"} message: ${message.content}`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div 
          className="flex justify-start"
          role="status"
          aria-label="Assistant is typing"
          aria-live="polite"
        >
          <div className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                aria-hidden="true"
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
                aria-hidden="true"
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
                aria-hidden="true"
              ></div>
            </div>
            <span className="sr-only">Assistant is typing...</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}