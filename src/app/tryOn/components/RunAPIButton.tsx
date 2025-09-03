"use client";

export type RunAPIButtonProps = {
  isScriptRunning: boolean;
  onClick: () => void;
  disabled: boolean;
};

export default function RunAPIButton({ isScriptRunning: isScriptRunning, onClick, disabled }: RunAPIButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 font-semibold text-[var(--button-text)] rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--button-ring)] ${
        disabled
          ? "bg-gray-400 cursor-wait"
          : "bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] active:bg-[var(--button-bg-active)] hover:shadow-lg active:scale-95"
      }`}
      disabled={disabled}
    >
      {isScriptRunning ? "Generating..." : "Generate Image"}
    </button>
  );
}