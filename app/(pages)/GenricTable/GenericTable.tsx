import React, { memo } from "react";
import { TableData } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

function GenericTableComponent<TableInfo>({
  data,
  columns,
  loading,
  error,
}: TableData<TableInfo>) {
  if (loading) {
    return <div className="space-y-4">Loading...</div>;
  }
  if (error) return <p className="text-red-500">Error: {error as any}</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={String(col.key)}> {col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>   
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="border">
            {columns.map((col) => (
              <TableCell key={String(col.key)} className="px-4 py-2">
                {col.render
                  ? col.render(row[col.key] as TableInfo[keyof TableInfo], row)
                  : (row[col.key] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const GenericTable = memo(
  GenericTableComponent
) as typeof GenericTableComponent;
