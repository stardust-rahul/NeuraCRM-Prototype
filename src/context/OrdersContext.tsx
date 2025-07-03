import React, { createContext, useContext, useState, useEffect } from "react";

// Order structure: id, quoteId, customer, amount, owner, contactName, company, status, stage, createdDate, quantity, finalizedPrice
const initialOrders = [];

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem("orders");
    return stored ? JSON.parse(stored) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: getNewOrderId(orders),
      createdDate: new Date().toISOString(),
      status: order.status || "Pending",
      quantity: order.quantity || 1,
      finalizedPrice: order.finalizedPrice || order.amount || 0,
    };
    setOrders((prev) => [...prev, newOrder]);
    return newOrder;
  };

  const updateOrder = (updatedOrder) => {
    setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? { ...o, ...updatedOrder } : o)));
  };

  const removeOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const getNewOrderId = (orders) => {
    const maxId = orders.reduce((max, o) => {
      if (o.id && o.id.startsWith("O-")) {
        const idNum = parseInt(o.id.substring(2), 10);
        if (!isNaN(idNum) && idNum > max) {
          return idNum;
        }
      }
      return max;
    }, 0);
    return `O-${(maxId + 1).toString().padStart(3, "0")}`;
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrder, removeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
