"use client";

import { useState } from "react";
import RunAPIButton from "./components/RunAPIButton";
import Link from "next/link";
import Image from "next/image";
import { ResultView } from "./components/ResultView";

export default function TryOn() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const runScript = async () => {
    if (!selectedPerson || !selectedDress) {
      alert("人物と服を選択してください");
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
        const errorMessage = data.error || "不明なエラー";
        setError(errorMessage);
        alert(`エラー: ${errorMessage}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      alert(`Fetch エラー: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
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
      <RunAPIButton loading={loading} onClick={runScript} />
      <ResultView loading={loading} error={error} resultImage={resultImage} />
      <BackHomeButton />
      {/* 選択状態を確認するUI（デバッグ用） */}
      <div className="mt-6 p-4 border rounded">
        <p>選択された人物: {selectedPerson ?? "なし"}</p>
        <p>選択された服: {selectedDress ?? "なし"}</p>
      </div>
    </div>
  );
}

function BackHomeButton() {
  return (
    <Link
      href="/"
      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
    >
      ホームへ戻る
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
    { id: "person1", src: "/png/person1.png", alt: "全身画像1" },
    { id: "person2", src: "/png/person2.png", alt: "全身画像2" },
  ];

  return (
    <div>
      <p className="mb-4">全身画像を選んでください</p>
      <div className="flex gap-4">
        {persons.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            disabled={disabled}
            className={`border-4 rounded-lg ${
              selected === p.id ? "border-blue-600" : "border-transparent"
            } ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={192}
              height={288}
              className="rounded-lg shadow"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Dress({ selected, onSelect, disabled }: SelectProps) {
  const dresses = [
    { id: "dress1", src: "/png/dress1.png", alt: "服1" },
    { id: "dress2", src: "/png/dress2.png", alt: "服2" },
    { id: "dress3", src: "/png/dress3.png", alt: "服3" },
  ];

  return (
    <div>
      <p className="mb-4">服を選んでください</p>
      <div className="flex gap-4">
        {dresses.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelect(d.id)}
            disabled={disabled}
            className={`border-4 rounded-lg ${
              selected === d.id ? "border-blue-600" : "border-transparent"
            } ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Image
              src={d.src}
              alt={d.alt}
              width={192}
              height={288}
              className="rounded-lg shadow"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
