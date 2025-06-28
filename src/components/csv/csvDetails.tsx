"use client";
import { useState } from 'react';

type Props = {
  csvData: string[];
};

type Entry = {
  site_name: string;
  k_value: number;
  date_column: number;
  level_column: number;
  pipe_diameter_mm: number;
  roughness: number;
};

interface DataRow {
  dateTime: string;
  level: string;
}

type DataProcessingRequest = {
  name: string;
  k: number;
  slope: number;
  diameter: number;
  roughness: number;
  measurements: DataRow[];
}

export default function CsvDetails({ csvData }: Props) {
  const [entries, setEntries] = useState<Entry[]>([{
    site_name: '', k_value: 1, date_column: 0, level_column: 0, pipe_diameter_mm: 250, roughness: 0.1
  }]);
  const [firstDataRow, setFirstDataRow] = useState<number>(0);

  const handleChange = (index: number, field: keyof Entry, value: string) => {
    const updated = [...entries];
    (updated[index] as any)[field] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, {
      site_name: '', k_value: 1, date_column: 0, level_column: 0, pipe_diameter_mm: 250, roughness: 0.1
    }]);
  };

  const handleSubmit = () => {
    console.log('Starting Row:', firstDataRow);
    // Handle form submission logic here
    console.log('Submitted entries:', entries);

    const dataRows = csvData.slice(firstDataRow -1);

    const dataProcessingRequestBodies: DataProcessingRequest[] = entries.map((entry) => {
      const measurements: DataRow[] = dataRows.map((row) => ({
        dateTime: row[entry.date_column] || '',
        level: row[entry.level_column] || ''
      }));

      return {
        name: entry.site_name,
        k: entry.k_value,
        slope: 0,
        diameter: entry.pipe_diameter_mm,
        roughness: entry.roughness,
        measurements
      };
    });

    console.log('Data Processing Request Bodies:', dataProcessingRequestBodies);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
        <div className="border rounded-xl p-4 bg-gray-50">
        <label className="text-sm font-medium mr-2">Data Starting Row</label>
        <input
          className="border rounded px-2 py-1 w-32"
          type="number"
          min={0}
          value={firstDataRow}
          onChange={e => setFirstDataRow(Number(e.target.value))}
        />
      </div>
      {entries.map((entry, i) => (
        <div key={i} className="border rounded-xl p-4 space-y-2 bg-gray-50">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Site {i + 1}</h4>
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
      <div>
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Submit
        </button>
      </div>
    </div>
  );
}
