import React from 'react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import {
    Trash2,
    ChevronDown,
    FileSearch,
    ChevronRight,
    ChevronLeft,
    CheckCircle,
    XCircle,
    AlertTriangle,
  } from "lucide-react";
import { OrderActionsProps } from './types';

function OrdersActions({currentDesision, handleDecisionChange} : OrderActionsProps) {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="lg"
        className={`w-[100px] p-2 h-10 flex items-center justify-start `}
      >
            {    currentDesision ?? "change"}
        <ChevronDown className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem className="text-red-600"  onClick={() => handleDecisionChange( "reject")} >Reject</DropdownMenuItem>
      <DropdownMenuItem className="text-green-600" onClick={() => handleDecisionChange( "accept")}>
        Accept
      </DropdownMenuItem>
      <DropdownMenuItem className="text-yellow-600" onClick={() => handleDecisionChange( "escalate")}>
        Escalate
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default OrdersActions