'use client';

import React, { useState, ChangeEvent } from 'react';

interface ImageUploadProps {
  onImageSelected: (imageUrl: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onImageSelected(result); // Pass the data URL to the parent component
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
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
      {previewUrl && (
        <div className="mt-4">
          <img src={previewUrl} alt="Image Preview" className="max-w-full h-auto rounded-lg shadow-lg" />
        </div>
      )}
      {!previewUrl && (
        <div className="text-gray-500">No image selected</div>
      )}
    </div>
  );
};

export default ImageUpload;
