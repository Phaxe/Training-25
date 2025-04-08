import React from "react";

interface Columns<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}
interface Table<T> {
  columns: Columns<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

function NewTable<T>({ columns, data }: Table<T>) {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Age</th>
            <th className="border px-4 py-2 text-left">Country</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t">
              {columns.map((col) => (
                <td className="border px-4 py-2" key={String(col.key)}>
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewTable;
