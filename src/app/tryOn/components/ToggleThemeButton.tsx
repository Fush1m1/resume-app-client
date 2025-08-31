type ToggleThemeButtonProps = {
  isBlackAndWhite: boolean;
  onClick: () => void;
};

export function ToggleThemeButton({ isBlackAndWhite, onClick }: ToggleThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
    >
      {isBlackAndWhite ? "Switch to Color" : "Switch to Grayscale"}
    </button>
  );
}
