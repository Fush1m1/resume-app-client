type ToggleThemeButtonProps = {
  isGrayscale: boolean;
  onClick: () => void;
};

export function ToggleThemeButton({ isGrayscale: isGrayscale, onClick }: ToggleThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
    >
      {isGrayscale ? "Switch to color" : "Switch to grayscale"}
    </button>
  );
}
