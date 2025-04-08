import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface Order {
    id: string;
    reason: string;
    store_name: string;
    store_logo: string;
    store_url: string;
    amount: number;
    active: boolean;
    decision?: OrderDecision | null;
    view?: string;
    delete?: string;
  }
  
  export type OrderDecision = "reject" | "accept" | "escalate";
  
  export interface OrderActionsProps {
    currentDesision:string,
    handleDecisionChange:(decision: OrderDecision) => void
  }
  export interface Column<T> {
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;

  }

  export type TableData<TableInfo> = {
    columns: Column<TableInfo>[];
    data: TableInfo[];
    loading:boolean
    error:FetchBaseQueryError | SerializedError | undefined
  };