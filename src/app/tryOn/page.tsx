"use client";

import { useState, useEffect, useRef } from "react";
import RunAPIButton from "./components/RunAPIButton";

import { PhotoCard } from "./components/PhotoCard";
import { SectionWrapper } from "./components/SectionWrapper";
import { Header } from "./components/Header";
import { BackHomeButton } from "./components/BackHomeButton";
import { ToggleThemeButton } from "./components/ToggleThemeButton";
import { ResultView } from "./components/ResultView";

export default function TryOn() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const resultViewRef = useRef<HTMLDivElement>(null);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);

  const runScript = async() => {
    if (!selectedPerson || !selectedDress) {
      alert("Please select a person and a dress.");
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);
    setSelectedPerson(null);
    setSelectedDress(null);
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
    <div className={`w-full max-w-5xl space-y-10 pb-30 ${isBlackAndWhite ? 'black-and-white' : ''}`}>
      <Header />
      <Person
        selected={selectedPerson}
        onSelect={setSelectedPerson}
        disabled={loading}
      />
      <Dress
        selected={selectedDress}
        onSelect={setSelectedDress}
        disabled={loading}
      />
      <div className="flex justify-center pt-4">
        <RunAPIButton loading={loading} onClick={runScript} />
      </div>
      <div ref={resultViewRef} className="pt-6">
        <ResultView loading={loading} error={error} resultImage={resultImage} />
      </div>
      <footer className="text-center pt-50">
        <div className="flex flex-col justify-center items-center space-y-4">
          <ToggleThemeButton
            isBlackAndWhite={isBlackAndWhite}
            onClick={() => setIsBlackAndWhite(!isBlackAndWhite)}
          />
          <BackHomeButton />
        </div>
      </footer>
    </div>
  );
}

type SelectProps = {
  selected: string | null;
  onSelect: (value: string | null) => void;
  disabled: boolean;
};

function Person({ selected, onSelect, disabled }: SelectProps) {
  const persons = [
    { id: "person1", src: "/png/person1.png", alt: "Person 1" },
    { id: "person2", src: "/png/person2.png", alt: "Person 2" },
  ];

  return (
    <SectionWrapper>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
