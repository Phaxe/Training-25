"use client"
import React from 'react'
import {
    useDeleteOrderMutation,
    useGetOrdersQuery,
    useToggleActiveStatusMutation,
    useUpdateDecisionMutation,
  } from "@/Redux/slices/ordersApiSlice";
  import { toast } from "react-toastify";
  import {  Order, OrderDecision } from "./types";
  import { OrdersTable } from "./OrdersTable";
  import { useCallback } from "react";
  
function page() {
    const {
        data: orders = [] as Order[],
        isLoading: loading,
        error,
      } = useGetOrdersQuery();
    
      // Handle deleting an order
      const [deleteOrderMutation] = useDeleteOrderMutation();
      const handleDeleteOrder = async (id: string) => {
        try {
          await deleteOrderMutation(id).unwrap();
          toast.success("Order deleted successfully!");
        } catch {
          toast.error("Failed to delete order.");
        }
      };
    
      // Handle toggle an order
      const [toggleActiveStatus] = useToggleActiveStatusMutation();
      const handleToggleActive = useCallback(async (id: string) => {
        try {
          const order = orders.find((order) => order.id === id);
          if (!order) {
            toast.error("Order not found.");
            return;
          }
    
          await toggleActiveStatus({ id, active: !order.active }).unwrap();
          toast.success("Order status updated successfully!");
        } catch {
          toast.error("Failed to update order status.");
        }
      },[orders, toggleActiveStatus]) 
    
    
      // Handle decision change
    
      const [updateDecisionMutation] = useUpdateDecisionMutation();
      const handleDecisionChange = async (id: string, decision: OrderDecision) => {
        try {
          await updateDecisionMutation({ id, decision }).unwrap();
          toast.success(`Order decision updated to ${decision}!`);
        } catch {
          toast.error("Failed to update order decision.");
        }
      };
    
    
      console.log(orders);
  return (
      <OrdersTable orders={orders} onDecisionChange={handleDecisionChange} onDelete={handleDeleteOrder} onStatusChange={handleToggleActive} loading={loading} error={error}/> 

  )
}

export default page