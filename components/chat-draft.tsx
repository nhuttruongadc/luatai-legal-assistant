import { useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  metadata?: {
    conclusion?: string;
    legalBasis?: Array<{
      title: string;
      article: string;
      summary: string;
      source: string;
    }>;
    riskLevel?: string;
    questions?: string[];
  };
};

export function useChatDraft() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return { input, setInput, messages, setMessages };
}
