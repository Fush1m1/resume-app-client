type ToggleThemeButtonProps = {
  isGrayscale: boolean;
  onClick: () => void;
  className?: string;
};

export function ToggleThemeButton({ isGrayscale: isGrayscale, onClick, className }: ToggleThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      {isGrayscale ? "Switch to color" : "Switch to grayscale"}
    </button>
  );
}
