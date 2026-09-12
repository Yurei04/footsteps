"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  isDark?: boolean;
}

export default function ChatInput({
  onSend,
  isLoading,
  isDark = true,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  useEffect(() => {
    const handleQuickQuestion = (event: Event) => {
      const customEvent = event as CustomEvent;
      const question = customEvent.detail;

      setInput(question);

      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    };

    window.addEventListener("quickQuestion", handleQuickQuestion);

    return () =>
      window.removeEventListener("quickQuestion", handleQuickQuestion);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div
      className="border-t border-border bg-background p-6 transition-colors duration-300"
      role="region"
      aria-label="Chat input area"
    >
      <form
        onSubmit={handleSubmit}
        className="flex gap-3"
        role="search"
        aria-label="Send message form"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="min-h-12 max-h-32 flex-1 resize-none rounded-lg border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          aria-label="Message input field"
          aria-describedby="input-hint"
          aria-disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Send message${isLoading ? " (Loading)" : ""}`}
          aria-busy={isLoading}
        >
          <span className="hidden sm:inline">Send</span>
          <Send size={18} className="sm:hidden" />

          {isLoading && (
            <div className="ml-1 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
          )}
        </button>
      </form>

      <p
        className="mt-3 text-xs text-muted-foreground transition-colors duration-300"
        id="input-hint"
      >
        Press Enter to send, Shift + Enter for new line
      </p>
    </div>
  );
}