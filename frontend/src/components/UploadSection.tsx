import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface UploadSectionProps {
  onUpload: (file: File) => void;
}

export default function UploadSection({ onUpload }: UploadSectionProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  }, [onUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload Brain Scan</h1>
        <p className="text-gray-600">Upload your brain scan image for analysis</p>
      </div>

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="mb-4">
          <Upload className="mx-auto text-gray-400" size={48} />
        </div>
        <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Select File
        </label>
      </div>
    </div>
  );
}