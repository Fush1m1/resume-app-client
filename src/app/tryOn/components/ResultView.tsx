import Image from "next/image";

export type ResultViewProps = {
  loading: boolean;
  error: string | null;
  resultImage: string | null;
};

export function ResultView({ loading, error, resultImage }: ResultViewProps) {
  if (loading) {
    return (
      <div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>エラーが発生しました: {error}</p>
      </div>
    );
  }

  if (!resultImage) {
    return null;
  }

  return (
    <div>
      <h2>生成結果</h2>
      <Image
        src={resultImage}
        alt="試着結果"
        width={192}
        height={288}
        className="rounded-lg shadow"
      />
    </div>
  );
}
