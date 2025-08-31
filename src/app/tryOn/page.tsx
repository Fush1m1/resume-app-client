"use client";

import { useState, useEffect, useRef } from "react";
import RunAPIButton from "./components/RunAPIButton";

import { PhotoCard } from "./components/PhotoCard";
import { SectionWrapper } from "./components/SectionWrapper";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ResultView } from "./components/ResultView";
import ImageUpload from "./components/ImageUpload";

export default function TryOn() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const resultViewRef = useRef<HTMLDivElement>(null);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);

  const handleImageSelected = async(imageDataUrl: string | null) => {
    if (imageDataUrl) {
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
      }
    } else {
      setUserImageUrl(null);
      setSelectedPerson(null);
    }
  };

  const runScript = async() => {
    if (!selectedPerson || !selectedDress) {
      alert("Please select a person and a dress.");
      return;
    }

    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resultImage && resultViewRef.current) {
      resultViewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [resultImage]);

  return (
    <div className={`w-full max-w-5xl space-y-10 pb-10 ${isGrayscale ? 'gray' : ''}`}>
      <Header />
      <ImageUpload onImageSelected={handleImageSelected} />
      <Person
        selected={selectedPerson}
        onSelect={setSelectedPerson}
        disabled={loading}
        userImageUrl={userImageUrl}
      />
      <Dress
        selected={selectedDress}
        onSelect={setSelectedDress}
        disabled={loading}
      />
      <div className="flex justify-center pt-4">
        <RunAPIButton loading={loading} onClick={runScript} />
      </div>
      <div ref={resultViewRef} className="pt-4">
        <ResultView loading={loading} error={error} resultImage={resultImage} />
      </div>
      <Footer isGrayscale={isGrayscale} setIsGrayscale={setIsGrayscale} />
    </div>
  );
}

type SelectProps = {
  selected: string | null;
  onSelect: (value: string | null) => void;
  disabled: boolean;
  userImageUrl?: string | null;
};

function Person({ selected, onSelect, disabled, userImageUrl }: SelectProps) {
  const persons = [
    { id: "person1", src: "/png/person1.png", alt: "Person 1" },
    { id: "person2", src: "/png/person2.png", alt: "Person 2" },
  ];

  return (
    <SectionWrapper>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {userImageUrl && (
          <PhotoCard
            key={userImageUrl} // Use the URL as the key for the uploaded person
            id={userImageUrl} // Use the URL as the ID for the uploaded person
            src={userImageUrl}
            alt="Your Uploaded Photo"
            selected={selected === userImageUrl}
            onSelect={() => onSelect(selected === userImageUrl ? null : userImageUrl)}
            disabled={disabled}
          />
        )}
        {persons.map((p) => (
          <PhotoCard
            key={p.id}
            id={p.id}
            src={p.src}
            alt={p.alt}
            selected={selected === p.id}
            onSelect={() => onSelect(selected === p.id ? null : p.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function Dress({ selected, onSelect, disabled }: SelectProps) {
  const dresses = [
    { id: "dress1", src: "/png/dress1.png", alt: "Dress 1" },
    { id: "dress2", src: "/png/dress2.png", alt: "Dress 2" },
    { id: "dress3", src: "/png/dress3.png", alt: "Dress 3" },
  ];

  return (
    <SectionWrapper>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {dresses.map((d) => (
          <PhotoCard
            key={d.id}
            id={d.id}
            src={d.src}
            alt={d.alt}
            selected={selected === d.id}
            onSelect={() => onSelect(selected === d.id ? null : d.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
