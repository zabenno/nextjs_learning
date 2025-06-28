'use client';

import { useState, useCallback } from 'react';
import Papa from 'papaparse';

type Props = {
  fileUploaded: (val: boolean) => boolean;
  setCsvData: (data: string[]) => void;
};

export default function CsvUploader({ fileUploaded, setCsvData }: Props) {
  const [csvData, setCsvDataLocal] = useState<string[]>([]);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;

      const parsed = Papa.parse<string[]>(text, {
        header: false,
        skipEmptyLines: true,
      });

      if (parsed.errors.length) {
        console.error(parsed.errors);
        alert('Error parsing CSV');
        return;
      }

      const data = parsed.data as string[];
      setCsvDataLocal(data);
      setCsvData(data);

      fileUploaded(true);
    };

    reader.readAsText(file);
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getMaxColumns = () => {
    return Math.max(...csvData.map((row) => row.length));
  };

  return (
    <div className=" mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={preventDefaults}
        onDragEnter={preventDefaults}
        onDragLeave={preventDefaults}
        onClick={() => document.getElementById('fileInput')?.click()}
        className="border-2 border-dashed border-gray-400 rounded-2xl text-center text-gray-600 cursor-pointer hover:border-blue-400 transition"
      >
        <p className="text-lg">Drag & drop your CSV file here,<br />or click to select</p>
      </div>

      <input
        id="fileInput"
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="hidden"
      />

      {csvData.length > 0 && (
        <div className="overflow-auto mt-6">
          <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 bg-gray-50 text-left font-semibold">#</th>
                {Array.from({ length: getMaxColumns() }).map((_, index) => (
                  <th key={index} className="border px-2 py-1 bg-gray-50 font-semibold text-left">
                    {index}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
                {csvData.slice(0, 20).map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-gray-50">
                  <td className="border px-2 py-1 font-mono text-gray-500">{rowIndex + 1}</td>
                  {Array.from({ length: getMaxColumns() }).map((_, colIndex) => (
                  <td key={colIndex} className="border px-2 py-1 whitespace-pre-wrap">
                    {row[colIndex] ?? ''}
                  </td>
                  ))}
                </tr>
                ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
}
