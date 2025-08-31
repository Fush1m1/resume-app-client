'use client';

import React, { ChangeEvent } from 'react';

interface ImageUploadProps {
  onImageSelected: (imageUrl: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
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
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg shadow-md">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
};

export default ImageUpload;
