"use client";

import { useState, useEffect, useRef } from "react";
import RunAPIButton from "./components/RunAPIButton";

import { PhotoCard } from "./components/PhotoCard";
import { SectionWrapper } from "./components/SectionWrapper";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ResultView } from "./components/ResultView";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { useUpload } from "./hooks/useUpload";
import { useScript } from "./hooks/useScript";

export default function TryOn() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState<string | null>(null);

  const {
    userImageUrl,
    error: uploadError,
    handlePersonImageUpload,
  } = useUpload({ setSelectedPerson });

  const {
    isScriptRunning,
    resultImage,
    error: scriptError,
    runScript,
  } = useScript({ selectedPerson, selectedDress });

  const resultViewRef = useRef<HTMLDivElement>(null);
  const [isGrayscale, setIsGrayscale] = useState(false);

  useEffect(() => {
    if (resultImage && resultViewRef.current) {
      resultViewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [resultImage]);

  const error = uploadError || scriptError;

  return (
    <div
      className={`w-full max-w-5xl space-y-10 pb-10 ${
        isGrayscale ? "gray" : ""
      }`}
    >
      <LoadingOverlay show={isScriptRunning} />
      <Header />
      <Person
        selected={selectedPerson}
        onSelect={setSelectedPerson}
        disabled={isScriptRunning}
        userImageUrl={userImageUrl}
        handlePersonImageUpload={handlePersonImageUpload}
      />
      <Dress
        selected={selectedDress}
        onSelect={setSelectedDress}
        disabled={isScriptRunning}
      />
      <div className="flex justify-center pt-4">
        <RunAPIButton isScriptRunning={isScriptRunning} onClick={runScript} disabled={isScriptRunning}/>
      </div>
      {resultImage && (
        <div ref={resultViewRef} className="pt-4">
          <ResultView
            loading={isScriptRunning}
            error={error}
            resultImage={resultImage}
          />
        </div>
      )}
      <Footer isGrayscale={isGrayscale} setIsGrayscale={setIsGrayscale} />
    </div>
  );
}

type SelectPersonProps = {
  selected: string | null;
  onSelect: (value: string | null) => void;
  disabled: boolean;
  userImageUrl?: string | null;
  handlePersonImageUpload: (value: string | null) => void;
};

type SelectDressProps = {
  selected: string | null;
  onSelect: (value: string | null) => void;
  disabled: boolean;
  userImageUrl?: string | null;
};

function Person({
  selected,
  onSelect,
  disabled,
  userImageUrl,
  handlePersonImageUpload,
}: SelectPersonProps) {
  const persons = [
    { id: "person1", src: "/png/person1.png", alt: "Person 1" },
    { id: "person2", src: "/png/person2.png", alt: "Person 2" },
  ];

  return (
    <SectionWrapper handlePersonImageUpload={disabled ? undefined : handlePersonImageUpload}>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {userImageUrl && (
          <PhotoCard
            key={userImageUrl} // Use the URL as the key for the uploaded person
            id={userImageUrl} // Use the URL as the ID for the uploaded person
            src={userImageUrl}
            alt="Your Uploaded Photo"
            selected={selected === userImageUrl}
            onSelect={() =>
              onSelect(selected === userImageUrl ? null : userImageUrl)
            }
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

function Dress({ selected, onSelect, disabled }: SelectDressProps) {
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
