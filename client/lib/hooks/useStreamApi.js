"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";

const useStreamApi = () => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const streamApi = useCallback(
    async (personaId, linkedinPost, promptId, accessToken) => {
      setIsLoading(true);
      setResponse("");
      setError(null);

      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/ai/comment`;

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'text/event-stream',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ personaId, linkedinPost, promptId })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        const readChunk = async () => {
          const { done, value } = await reader.read();
          if (done) {
            setIsLoading(false);
            return;
          }
          const chunk = decoder.decode(value);
          setResponse(prevResponse => prevResponse + chunk);
          return readChunk();
        };

        await readChunk();
      } catch (error) {
        toast.error("See your profile. You might have reached the limit.");
        setError(error.message);
        setIsLoading(false);
      }
    },
    []
  );

  return { response, isLoading, error, streamApi };
};

export default useStreamApi;