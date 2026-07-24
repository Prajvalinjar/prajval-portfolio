import { useState, useCallback } from 'react';

export type AIResponseType = 'project' | 'technology' | 'certification' | 'experience' | 'contact' | 'resume' | 'availability' | 'general' | 'unknown' | 'error';

export interface AIResponse {
  type: AIResponseType;
  summary: string;
  data?: any;
  action?: {
    label: string;
    targetId: string;
  };
  related?: string[];
}

export function usePortfolioAi() {
  const [isTyping, setIsTyping] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);

  const processQuery = useCallback(async (query: string) => {
    setIsTyping(true);
    setResponse(null);
    
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data: AIResponse = await res.json();
      
      // Simulate slight processing delay for feel
      await new Promise(r => setTimeout(r, 600));
      
      setResponse(data);
    } catch (err) {
      setResponse({
        type: 'error',
        summary: "I'm having trouble connecting to the knowledge base. Please try again later.",
      });
    } finally {
      setIsTyping(false);
    }

  }, []);

  return { isTyping, response, processQuery };
}
