import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import { useOrders } from "@/context/OrdersContext";

export default function OrdersSplitView({ orders }) {
  const { removeOrder } = useOrders();
  return (
    <div className="flex flex-col gap-6 mt-4">
      {orders.map(order => (
        <Card key={order.id} className="relative bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-md">
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
              className="text-blue-600 hover:text-blue-900 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-100 bg-white shadow-sm"
              title="Edit Order"
              onClick={() => window.location.assign(`/orders/${order.id}?edit=true`)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 012-2z" />
              </svg>
            </button>
            <button
              className="text-red-600 hover:text-red-900 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-red-400 border border-red-100 bg-white shadow-sm"
              title="Delete Order"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm('Are you sure you want to delete this order?')) {
                  removeOrder(order.id);
                }
              }}
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-900 text-lg font-bold">
              {order.customer ? order.customer : `Order #${order.id}`}
            </CardTitle>
            {order.company && <div className="text-xs text-blue-700 font-medium mt-1">{order.company}</div>}
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}>{order.status || '-'}</Badge>
              <Badge variant={order.payment === 'Paid' ? 'default' : order.payment === 'Refunded' ? 'destructive' : 'secondary'}>{order.payment || 'Unpaid'}</Badge>
              <Badge variant={order.shipment === 'Delivered' ? 'default' : order.shipment === 'Returned' ? 'destructive' : 'secondary'}>{order.shipment || 'Pending'}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div><span className="font-semibold text-blue-800">Created:</span> <span>{order.createdDate ? new Date(order.createdDate).toLocaleString() : '-'}</span></div>
              <div><span className="font-semibold text-blue-800">Finalized Price:</span> <span>{typeof order.finalizedPrice === 'number' ? `₹${order.finalizedPrice.toLocaleString()}` : typeof order.amount === 'number' ? `₹${order.amount.toLocaleString()}` : order.amount || '-'}</span></div>
              <div><span className="font-semibold text-blue-800">Quantity:</span> <span>{order.quantity || 1}</span></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

