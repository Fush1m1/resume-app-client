"use client";

import { useState, useEffect, useRef } from "react";
import RunAPIButton from "./components/RunAPIButton";
import Link from "next/link";
import Image from "next/image";
import { ResultView } from "./components/ResultView";
import { SectionWrapper } from "./components/SectionWrapper";

export default function TryOn() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const resultViewRef = useRef<HTMLDivElement>(null);

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
      resultViewRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [resultImage]);

  return (
    <div className="w-full max-w-5xl space-y-10">
      <header className="text-center space-y-2 bg-purple-100 border border-purple-200 rounded-2xl p-8">
        <h1 className="text-4xl font-bold tracking-tight text-purple-900 sm:text-5xl">
          釈迦遺 Virtual Try-On
        </h1>
        <p className="text-lg text-purple-700">
          Choose a person and a dress to generate a virtual try-on image.
        </p>
      </header>

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

      <footer className="text-center pt-10">
        <BackHomeButton />
      </footer>
    </div>
  );
}

function BackHomeButton() {
  return (
    <Link
      href="/"
      className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
    >
      &larr; Back to Home
    </Link>
  );
}

type SelectProps = {
  selected: string | null;
  onSelect: (value: string) => void;
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
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            disabled={disabled}
            className={`rounded-xl overflow-hidden transition-all duration-200 focus:outline-none ring-offset-4 ring-offset-gray-50 ${
              selected === p.id
                ? "ring-2 ring-blue-500"
                : "ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-400"
            } ${
              disabled ? "opacity-60 cursor-not-allowed" : "active:scale-95"
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={192}
              height={288}
              className="bg-white"
            />
          </button>
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
          <button
            key={d.id}
            onClick={() => onSelect(d.id)}
            disabled={disabled}
            className={`rounded-xl overflow-hidden transition-all duration-200 focus:outline-none ring-offset-4 ring-offset-gray-50 ${
              selected === d.id
                ? "ring-2 ring-blue-500"
                : "ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-400"
            } ${
              disabled ? "opacity-60 cursor-not-allowed" : "active:scale-95"
            }`}
          >
            <Image
              src={d.src}
              alt={d.alt}
              width={192}
              height={288}
              className="bg-white"
            />
          </button>
        ))}
      </div>
    </SectionWrapper>
  );
}