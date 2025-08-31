type ToggleClearOnGenerateButtonProps = {
  clearOnGenerate: boolean;
  onClick: () => void;
};

export function ToggleClearOnGenerateButton({ clearOnGenerate, onClick }: ToggleClearOnGenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
    >
      {clearOnGenerate ? "Switch to retain on generate" : "Switch to clear on generate"}
    </button>
  );
}