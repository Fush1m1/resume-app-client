"use client";

import { useState } from "react";

type UseUploadProps = {
  setSelectedPerson: (person: string | null) => void;
};

export function useUpload({ setSelectedPerson }: UseUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePersonImageUpload = async(imageDataUrl: string | null) => {
    if (imageDataUrl) {
      setIsUploading(true);
      setError(null);
      try {
        const response = await fetch("/api/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData: imageDataUrl }),
        });
        const data = await response.json();
        if (data.success) {
          setUserImageUrl(data.filePath);
          setSelectedPerson(data.filePath);
        } else {
          setError(data.error || "Failed to upload image.");
          alert(`Upload Error: ${data.error || "Failed to upload image."}`);
          setUserImageUrl(null);
          setSelectedPerson(null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
        alert(`Upload Fetch Error: ${errorMessage}`);
        setUserImageUrl(null);
        setSelectedPerson(null);
      } finally {
        setIsUploading(false);
      }
    } else {
      setUserImageUrl(null);
      setSelectedPerson(null);
    }
  };

  return {
    isUploading,
    userImageUrl,
    error,
    handlePersonImageUpload,
  };
};