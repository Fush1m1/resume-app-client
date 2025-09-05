import React, { useRef } from "react";
import { ImageUpload } from "./ImageUpload";

export function SectionWrapper({
  children,
  disabled,
  handlePersonImageUpload,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  handlePersonImageUpload?: (value: string | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (handlePersonImageUpload && !disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`
        bg-[var(--header-bg)] border border-[var(--header-border)] rounded-2xl p-6 sm:p-8
        ${(handlePersonImageUpload && !disabled) ? "cursor-pointer" : ""}
        ${(handlePersonImageUpload && disabled) ? "cursor-not-allowed" : ""}
      `}
      onClick={handleClick}
    >
      {handlePersonImageUpload && (
        <ImageUpload ref={fileInputRef} onImageSelected={handlePersonImageUpload} />
      )}
      {children}
    </div>
  );
}