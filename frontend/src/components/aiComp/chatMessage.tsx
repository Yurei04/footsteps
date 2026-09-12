"use client";

import { useEffect, useRef } from "react";

import { ShieldAlert } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isDark?: boolean;
}

const QUICK_QUESTIONS = [
  "Current flood risk?",
  "Which barangays to evacuate?",
  "How much time do we have?",
  "Generate SMS advisory",
];

export default function ChatMessages({
  messages,
  isLoading,
  isDark = true,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickQuestion = (question: string) => {
    const event = new CustomEvent("quickQuestion", { detail: question });
    window.dispatchEvent(event);
  };

  return (
    <div
      className="flex-1 space-y-6 overflow-y-auto bg-background p-6 text-foreground transition-colors duration-300"
      role="region"
      aria-label="Chat message history"
      aria-live="polite"
      aria-atomic="false"
      aria-describedby="chat-description"
    >
      <p id="chat-description" className="sr-only">
        Conversation history with the environmental AI assistant. Messages
        appear in chronological order with user messages on the right and
        assistant responses on the left.
      </p>

      {messages.length === 0 && !isLoading && (
        <div
          className="flex h-full items-center justify-center text-center"
          role="status"
          aria-label="Chat starting state"
        >
          <div>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary transition-colors duration-300">
              <ShieldAlert
                className="text-accent transition-colors duration-300"
                size={32}
              />
            </div>

            <h3 className="mb-2 text-xl font-light text-foreground transition-colors duration-300">
              Start a conversation
            </h3>

            <p className="max-w-sm text-muted-foreground transition-colors duration-300">
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
          aria-label={`${
            message.role === "user" ? "Your" : "Assistant"
          } message`}
        >
          <div className="flex max-w-xl gap-3">
            {message.role === "assistant" && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary transition-colors duration-300">
                <div className="text-sm text-accent transition-colors duration-300">
                  🔒
                </div>
              </div>
            )}

            <div
              className={`rounded-lg border px-4 py-3 transition-colors duration-300 ${
                message.role === "user"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-secondary-foreground"
              }`}
              role="region"
              aria-label={`${
                message.role === "user" ? "User" : "Assistant"
              } message: ${message.content}`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>

            {message.role === "user" && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent transition-colors duration-300">
                <div className="text-sm text-accent-foreground">👤</div>
              </div>
            )}
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
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary transition-colors duration-300">
              <div className="text-sm text-accent transition-colors duration-300">
                🔒
              </div>
            </div>

            <div className="rounded-lg border border-border bg-secondary px-4 py-3 transition-colors duration-300">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-accent transition-colors duration-300"
                  aria-hidden="true"
                />

                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-accent transition-colors duration-300"
                  style={{ animationDelay: "0.2s" }}
                  aria-hidden="true"
                />

                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-accent transition-colors duration-300"
                  style={{ animationDelay: "0.4s" }}
                  aria-hidden="true"
                />
              </div>

              <span className="sr-only">Assistant is typing...</span>
            </div>
          </div>
        </div>
      )}

      {messages.length === 0 && !isLoading && (
        <div className="mt-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors duration-300">
            Quick Questions
          </p>

          <div className="grid grid-cols-2 gap-3">
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => handleQuickQuestion(question)}
                className="cursor-pointer rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`Ask: ${question}`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}