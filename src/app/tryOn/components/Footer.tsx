import React from 'react';
import { ToggleThemeButton } from "./ToggleThemeButton";
import { BackHomeButton } from "./BackHomeButton";
import { Author } from "./Author";

type FooterProps = {
  isGrayscale: boolean;
  setIsGrayscale: (value: boolean) => void;
};

const commonClassName = "text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors";

export function Footer({ isGrayscale, setIsGrayscale }: FooterProps) {
  return (
    <footer className="text-center pt-80">
      <div className="flex flex-col justify-center items-center space-y-4">
          <ToggleThemeButton
            isGrayscale={isGrayscale}
            onClick={() => setIsGrayscale(!isGrayscale)}
            className={commonClassName}
          />
          <BackHomeButton className={commonClassName} />
          <Author className={commonClassName} />
      </div>
    </footer>
  );
}
