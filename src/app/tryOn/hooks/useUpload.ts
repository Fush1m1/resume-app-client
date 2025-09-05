"use client";

import { useState } from "react";

type UseUploadProps = {
  setSelectedPerson: (person: string | null) => void;
};

export function useUpload({ setSelectedPerson }: UseUploadProps) {
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePersonImageUpload = async(imageDataUrl: string | null) => {
    if (imageDataUrl) {
      setError(null);
      try {
        // Save the image data URL to localStorage
        localStorage.setItem("userImage", imageDataUrl);
        
        // Update state with the imageDataUrl
        setUserImageUrl(imageDataUrl);
        setSelectedPerson(imageDataUrl);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
        alert(`Save Error: ${errorMessage}`);
        setUserImageUrl(null);
        setSelectedPerson(null);
      } finally {
      }
    } else {
      setUserImageUrl(null);
      setSelectedPerson(null);
      // Optionally, remove the item from localStorage if imageDataUrl is null
      localStorage.removeItem("userImage");
    }
  };

  return {
    userImageUrl,
    error,
    handlePersonImageUpload,
  };
};
