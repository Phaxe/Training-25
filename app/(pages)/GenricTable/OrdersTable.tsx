"use client";
import Image from "next/image";
import Link from "next/link";
import { FileSearch, Trash2 } from "lucide-react";
import { Order, Column, OrderDecision } from "./types";


import {GenericTable} from "./GenericTable";
import OrdersActions from "./OrdersActions";
import {OrderStatusSwitcher} from "./OrderStatusSwitcher";
import { useMemo } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface OrdersTableProps {
  orders: Order[];
  onDecisionChange: (id: string, decision: OrderDecision) => void;
  onStatusChange: (id: string) => void;
  onDelete: (id: string) => void;
  loading:boolean
  error:FetchBaseQueryError | SerializedError | undefined
}

export const OrdersTable = ({ 
  orders, 
  onDecisionChange, 
  onStatusChange,
  onDelete,
  loading,
  error
  
}: OrdersTableProps) => {
    const tableHeaders: Column<Order>[] = useMemo(() => [
        { key: "id", label: "ID" },
        { key: "reason", label: "Reason" },
        { key: "store_name", label: "Store Name" },
        {
          key: "store_logo",
          label: "Store Logo",
          render: (value) => (
            <div className="relative h-10 w-10">
              <Image
                src={value as string}
                alt="Store Logo"
                fill
                className="object-contain"
              />
            </div>
          ),
        },
        {
          key: "store_url",
          label: "Store URL",
          render: (value) => <Link href={value as string}>{value}</Link>,
        },
        { key: "amount", label: "Amount" },
        {
          key: "active",
          label: "Active",
          render: (value, row) => (
            <OrderStatusSwitcher
              checked={value as boolean}
              onChange={() => onStatusChange(row.id)}
            />
          ),
        },
        {
          key: "decision",
          label: "Actions",
          render: (value, row) => (
            <OrdersActions
              currentDesision={value as OrderDecision}
              handleDecisionChange={(decision) =>
                onDecisionChange(row.id, decision)
              }
            />
          ),
        },
        {
          key: "view",
          label: "View",
          render: (_, row) => (
            <Link href={`/orders/${row.id}`}>
              <FileSearch className="w-10 h-10 text-gray-600" />
            </Link>
          ),
        },
        {
          key: "delete",
          label: "Delete",
          render: (_, row) => (
            <Trash2
              className="text-red-500 cursor-pointer"
              onClick={() => onDelete(row.id)}
            />
          ),
        },
      ] , [onDecisionChange, onStatusChange, onDelete]) 

  return <GenericTable columns={tableHeaders} data={orders} loading={loading} error={error} />;
};