"use client";

import { useState, useEffect, useRef } from "react";
import RunAPIButton from "./components/RunAPIButton";

import { Header } from "./components/Header";
import { ResultView } from "./components/ResultView";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { useUpload } from "./hooks/useUpload";
import { useScript } from "./hooks/useScript";
import { Footer } from "./components/footer/Footer";
import { Person } from "./components/Person";
import { Dress } from "./components/Dress";

export default function TryOn() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState<string | null>(null);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const resultViewRef = useRef<HTMLDivElement>(null);

  const {
    userImageUrl,
    handlePersonImageUpload,
  } = useUpload({ setSelectedPerson });

  const {
    isScriptRunning,
    resultImage,
    runScript,
  } = useScript({ selectedPerson, selectedDress });

  useEffect(() => {
    if (resultImage && resultViewRef.current) {
      resultViewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [resultImage]);

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
      <RunAPIButton isScriptRunning={isScriptRunning} onClick={runScript} disabled={isScriptRunning}/>
      <div ref={resultViewRef}>
        <ResultView resultImage={resultImage}/>
      </div>
      <Footer isGrayscale={isGrayscale} setIsGrayscale={setIsGrayscale} />
    </div>
  );
}
