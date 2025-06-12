"use client";
import { useState } from 'react';

type Entry = {
  site_name: string;
  k_value: string;
  date_column: string;
  level_column: string;
  pipe_diameter_mm: string;
  roughness: string;
};

type Sites = {
    
}

export default function CsvDetails() {
  const [entries, setEntries] = useState<Entry[]>([{
    site_name: '', k_value: '1', date_column: '', level_column: '', pipe_diameter_mm: '250', roughness: '0.1'
  }]);

  const handleChange = (index: number, field: keyof Entry, value: string) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, {
      site_name: '', k_value: '1', date_column: '', level_column: '', pipe_diameter_mm: '250', roughness: '0.1'
    }]);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {entries.map((entry, i) => (
        <div key={i} className="border rounded-xl p-4 space-y-2 bg-gray-50">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Entry {i + 1}</h4>
            <button onClick={() => removeEntry(i)} className="text-red-500 text-sm">Remove</button>
          </div>
          {Object.keys(entry).map((field) => (
            <div key={field} className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <label className="text-sm font-medium capitalize">{field}</label>
              <input
                className="border rounded px-2 py-1 w-full"
                type="text"
                value={entry[field as keyof Entry]}
                onChange={(e) => handleChange(i, field as keyof Entry, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={addEntry}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        + Add Site
      </button>
    </div>
  );
}
