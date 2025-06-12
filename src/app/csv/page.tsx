"use client";
import CsvUploader from '@/components/csv/csvUploader';
import CsvDetails from '@/components/csv/csvDetails';

import { useState } from 'react';

export default function Home() {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (newValue: boolean) => {
    setFileUploaded(newValue);
  };

  return (
    <main className="min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Upload a CSV File</h1>
      <div className="flex">
        <div className="w-49% py-10 px-4 bg-gray-200 border-r border-gray-200 rounded-2xl shadow-lg border-black-400">
          <CsvUploader fileUploaded={handleFileUpload} />
        </div>
        <div className="w-2% bg-auto px-2"></div>
        {fileUploaded && (
          <div className="w-49% py-10 px-4 bg-gray-200 border-r border-gray-200 rounded-2xl shadow-lg border-black-400">
            <CsvDetails />
          </div>
        )}
        {/* <div className="w-49% py-10 px-4 bg-gray-200 border-r border-gray-200 rounded-2xl shadow-lg border-black-400">
          <CsvDetails />
        </div> */}
      </div>
    </main>
  );
}
