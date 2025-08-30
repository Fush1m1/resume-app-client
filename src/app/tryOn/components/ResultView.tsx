import { useState } from "react";
import Image from "next/image";
import { RunAPIProps } from "./RunAPIButton";

export function ResultView({ selectedPerson, selectedDress }: RunAPIProps) {
  const [exists, setExists] = useState(true);

  if (!selectedPerson || !selectedDress) {
    return null;
  }

  const resultFileName = `/results/vton_${selectedPerson}_${selectedDress}_0.png`;
  // 画像読み込み失敗時に非表示
  if (!exists) return null;

  return (
    <div>
      <h2>生成結果</h2>
      <Image
        src={resultFileName}
        alt="試着結果"
        width={192}
        height={288}
        className="rounded-lg shadow"
        onError={() => setExists(false)} // 読み込めなかったら非表示に
      />
    </div>
  );
}