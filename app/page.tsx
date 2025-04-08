"use client";
import MyComp from "@/components/MyComponent/MyComp";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useToggleActiveStatusMutation,
  useUpdateDecisionMutation,
} from "@/Redux/slices/ordersApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  Order, OrderDecision } from "./(pages)/GenricTable/types";
import { OrdersTable } from "./(pages)/GenricTable/OrdersTable";
import { useCallback } from "react";



export default function Home() {
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
    <div className="flex flex-col items-center justify-center gap-10 h-full mb-10 w-full text-center font-semibold my-1  0">
      <MyComp />
      {/* <OrdersTable orders={orders} onDecisionChange={handleDecisionChange} onDelete={handleDeleteOrder} onStatusChange={handleToggleActive} loading={loading} error={error}/> */}
    </div>
  );
}
