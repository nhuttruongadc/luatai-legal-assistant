export type MessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  metadata?: {
    conclusion?: string;
    legalBasis?: Array<{
      title: string;
      article: string;
      summary: string;
      source?: string;
    }>;
    riskLevel?: string;
    questions?: string[];
  };
};

export type LegalCategory = {
  name: string;
  summary: string;
};

export type DocumentAnalysis = {
  fileName: string;
  fileType: string;
  summary: string;
  legalIssues: string[];
  importantClauses: string[];
  obligations: string[];
  missingEvidence: string[];
  recommendations: string[];
};
