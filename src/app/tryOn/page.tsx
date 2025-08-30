"use client";

import { useState } from "react";
import RunAPIButton from "./components/RunAPIButton";
import Link from "next/link";
import Image from "next/image";
import { ResultView } from "./components/ResultView";

export default function TryOn() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <Person selected={selectedPerson} onSelect={setSelectedPerson} />
      <Dress selected={selectedDress} onSelect={setSelectedDress} />
      <RunAPIButton selectedPerson={selectedPerson} selectedDress={selectedDress} />
      <ResultView selectedPerson={selectedPerson} selectedDress={selectedDress} />
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
};

function Person({ selected, onSelect }: SelectProps) {
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
            className={`border-4 rounded-lg ${
              selected === p.id ? "border-blue-600" : "border-transparent"
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

function Dress({ selected, onSelect }: SelectProps) {
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
            className={`border-4 rounded-lg ${
              selected === d.id ? "border-blue-600" : "border-transparent"
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
