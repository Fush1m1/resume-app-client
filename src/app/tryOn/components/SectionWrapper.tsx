import React, { useRef } from "react";
import { ImageUpload } from "./ImageUpload";

export function SectionWrapper({
  children,
  handlePersonImageUpload,
}: {
  children: React.ReactNode;
  handlePersonImageUpload?: (value: string | null) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (handlePersonImageUpload) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`bg-[var(--header-bg)] border border-[var(--header-border)] rounded-2xl p-6 sm:p-8 ${
        handlePersonImageUpload ? "cursor-pointer" : ""
      }`}
      onClick={handleClick}
    >
      {handlePersonImageUpload && (
        <ImageUpload ref={fileInputRef} onImageSelected={handlePersonImageUpload} />
      )}
      {children}
    </div>
  );
}