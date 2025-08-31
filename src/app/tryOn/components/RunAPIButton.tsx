"use client";

export type RunAPIButtonProps = {
  loading: boolean;
  onClick: () => void;
};

export default function RunAPIButton({ loading, onClick }: RunAPIButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 font-semibold text-[var(--button-text)] rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--button-ring)] ${
        loading
          ? "bg-gray-400 cursor-wait"
          : "bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] active:bg-[var(--button-bg-active)] hover:shadow-lg active:scale-95"
      }`}
      disabled={loading}
    >
      {loading ? "Generating..." : "Generate Image"}
    </button>
  );
}