"use client";

export type RunAPIButtonProps = {
  loading: boolean;
  onClick: () => void;
};

export default function RunAPIButton({ loading, onClick }: RunAPIButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 font-semibold text-white rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
        loading
          ? "bg-gray-400 cursor-wait"
          : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg active:scale-95"
      }`}
      disabled={loading}
    >
      {loading ? "Generating..." : "Generate Image"}
    </button>
  );
}
