'use client';

import React from 'react';

interface LoadingOverlayProps {
  show: boolean;
}

export function LoadingOverlay({ show }: LoadingOverlayProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="text-white mt-4">Uploading...</p>
      </div>
    </div>
  );
}
