import { useState } from "react";
import Image from "next/image";
import { RunPythonButtonProps } from "./RunPythonButton";

export function ResultView({ selectedPerson, selectedDress }: RunPythonButtonProps) {
  const resultFileName = `/results/vton_${selectedPerson}_${selectedDress}_0.png`;
  const [exists, setExists] = useState(true);
  // 画像読み込み失敗時に非表示
  if (!exists) return;

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