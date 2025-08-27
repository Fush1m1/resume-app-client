"use client";

import { useState } from "react";
import Image from "next/image";

export type RunPythonButtonProps = {
  selectedPerson: string | null;
  selectedDress: string | null;
};

export default function RunPythonButton({ selectedPerson, selectedDress }: RunPythonButtonProps) {
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

  const runScript = async() => {
    if (!selectedPerson || !selectedDress) {
      alert("人物と服を選択してください");
      return;
    }

    setLoading(true);
    setResultImage(null);
    try{
      const res = await fetch(`${apiBaseUrl}/api/vton`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person: selectedPerson, dress: selectedDress }),
      });

      const data = await res.json();

      if (data.success) {
        setResultImage(data.resultImage);
      } else {
        alert(`エラー: ${data.error}`);
      }
    } catch (err) {
      alert(`Fetch エラー: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <div className="space-y-4">
      <button
        onClick={runScript}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "実行中..." : "試着処理実行"}
      </button>

      {resultImage && (
        <div className="mt-4">
          <p>試着結果:</p>
          <Image
            src={resultImage} // base64 文字列でもOK
            alt="試着結果"
            width={192}
            height={288}
            className="rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
}
