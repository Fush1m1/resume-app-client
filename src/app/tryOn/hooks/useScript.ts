"use client";

import { useState } from "react";

type UseScriptProps = {
  selectedPerson: string | null;
  selectedDress: string | null;
};

export function useScript ({
  selectedPerson,
  selectedDress,
}: UseScriptProps)  {
  const [isScriptRunning, setIsScriptRunning] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runScript = async () => {
    if (!selectedPerson || !selectedDress) {
      alert("Please select a person and a dress.");
      return;
    }

    setIsScriptRunning(true);
    setError(null);
    setResultImage(null);

    try {
      const apiUrl = new URL("/api/vton", window.location.origin).href;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person: selectedPerson, dress: selectedDress }),
      });

      const data = await res.json();

      if (data.success) {
        setResultImage(data.resultImage);
      } else {
        const errorMessage = data.error || "An unknown error occurred.";
        setError(errorMessage);
        alert(`Error: ${errorMessage}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      alert(`Fetch Error: ${errorMessage}`);
    } finally {
      setIsScriptRunning(false);
    }
  };

  return {
    isScriptRunning,
    resultImage,
    error,
    runScript,
  };
};