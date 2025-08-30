"use client";

export type RunAPIButtonProps = {
  loading: boolean;
  onClick: () => void;
};

export default function RunAPIButton({
  loading,
  onClick,
}: RunAPIButtonProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "実行中..." : "試着処理実行"}
      </button>
    </div>
  );
}