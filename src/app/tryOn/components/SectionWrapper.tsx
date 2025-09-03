import React, { useRef } from "react";
import { ImageUpload } from "./ImageUpload";

export function SectionWrapper({
  children,
  handleImageSelected,
}: {
  children: React.ReactNode;
  handleImageSelected?: (value: string | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (handleImageSelected) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`bg-[var(--header-bg)] border border-[var(--header-border)] rounded-2xl p-6 sm:p-8 ${
        handleImageSelected ? "cursor-pointer" : ""
      }`}
      onClick={handleClick}
    >
      {handleImageSelected && (
        <ImageUpload ref={fileInputRef} onImageSelected={handleImageSelected} />
      )}
      {children}
    </div>
  );
}