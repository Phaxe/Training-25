"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, FileSearch, ChevronRight, ChevronLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { removeHttpsPrefix } from "@/lib/utils";
import Link from "next/link";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Table header type
type TableHeaderType = { key: string; label: string };
// Table row type
type TableRowType = { [key: string]: any };
// Table props type
type OrdersTableProps = {
  tableHeaders: TableHeaderType[];
  tableRows: TableRowType[];
  loading?: boolean;
  error?: string | null;
  tableClassName: string;
  onToggleActive?: (id: string) => void;
  onDecisionChange?: (id: string, decision: "reject" | "accept" | "escalate") => void;
  deleteOrder?: (id: string) => void;
  totalPages: number;
  maxItems: number;
};

export default function OrdersTable({
  tableHeaders,
  tableRows,
  loading = false,
  error,
  onToggleActive,
  onDecisionChange,
  deleteOrder,
  tableClassName,
  totalPages,
  maxItems,
}: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * maxItems;
  const paginatedRows = tableRows.slice(startIndex, startIndex + maxItems);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [tableRows]);


  const getDecisionStyles = (decision: string | null) => {
    switch (decision) {
      case "reject":
        return "text-red-600";
      case "accept":
        return "text-green-600";
      case "escalate":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(maxItems)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className={`overflow-x-auto w-full rounded-lg ${tableClassName}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header.key}>{header.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedRows.map((row) => (
            <TableRow key={row.id}>
              {tableHeaders.map((header) => (
                <TableCell key={header.key}>
                  {header.key === "actions" && onDecisionChange ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                      <Button
                          variant="outline"
                          size="lg"
                          className={`w-[100px] p-2 h-10 flex items-center justify-start ${getDecisionStyles(row.decision)}`}
                        >
                          {row.decision ? row.decision : "Change"}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onDecisionChange(row.id, "reject")} className="text-red-600">Reject</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDecisionChange(row.id, "accept")} className="text-green-600">Accept</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDecisionChange(row.id, "escalate")} className="text-yellow-600">Escalate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : header.key === "store_logo" ? (
                    <Image src={row[header.key]} width={40} height={40} alt="Store Logo" className="rounded-full" />
                  ) : header.key === "store_url" ? (
                    <Link href={row[header.key]} className="text-blue-500 hover:underline">{removeHttpsPrefix(row[header.key])}</Link>
                  ) : header.key === "active" && onToggleActive ? (
                    <Switch checked={row.active} onCheckedChange={() => onToggleActive(row.id)} />
                  ) : header.key === "view" ? (
                    <Link href={`/orders/${row.id}`}>
                      <FileSearch className="w-5 h-5 text-gray-600" />
                    </Link>
                  ) : header.key === "delete" ? (
                    <Trash2 className="text-red-500 cursor-pointer" onClick={() => deleteOrder?.(row.id)} />
                  ) : (
                    row[header.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <Button variant={currentPage === index + 1 ? "default" : "outline"} onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </Button>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}