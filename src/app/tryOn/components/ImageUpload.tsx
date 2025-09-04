'use client';

import React, { ChangeEvent } from 'react';

interface ImageUploadProps {
  onImageSelected: (imageUrl: string | null) => void;
  ref?: React.Ref<HTMLInputElement>;
}

export function ImageUpload({ onImageSelected, ref }: ImageUploadProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    } else {
      onImageSelected(null);
    }
  };

  return (
    <input
      ref={ref}
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      style={{ display: 'none' }}
    />
  );
};