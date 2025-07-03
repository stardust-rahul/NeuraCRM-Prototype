import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrders } from "@/context/OrdersContext";
import OrderDetailsModule from "@/modules/OrderDetailsModule";
import OrderEditLog from "@/modules/OrderEditLog";

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrder } = useOrders();
  const order = orders.find(o => o.id === orderId);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(order ? { ...order } : {});

  useEffect(() => {
    if (order) setForm({ ...order });
  }, [order]);

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-lg text-red-600">Order not found.</h1>
        <Button onClick={() => navigate('/orders')} className="mt-4">Go Back to Orders</Button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateOrder(form);
    setEditMode(false);
  };

  return (
    <div className="p-8 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-lg text-muted-foreground">
            <span>Order</span>
            <span className="font-mono text-xl text-blue-900 font-bold">{form.id}</span>
            <Badge variant="outline" className="ml-2">{form.status}</Badge>
          </div>
          <div className="flex space-x-8 mt-2 text-sm text-muted-foreground">
            <div>
              <span className="font-semibold">Customer:</span> {form.customer}
            </div>
            <div>
              <span className="font-semibold">Company:</span> {form.company}
            </div>
            <div>
              <span className="font-semibold">Contact Name:</span> {form.contactName}
            </div>
            <div>
              <span className="font-semibold">Owner:</span> {form.owner}
            </div>
            <div>
              <span className="font-semibold">Created:</span> {form.createdDate ? new Date(form.createdDate).toLocaleDateString() : '-'}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setEditMode(true)} disabled={editMode}>Edit</Button>
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>

      {/* Quote Summary Card */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Quote Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
          <div>
            <div><span className="font-semibold">Quote ID:</span> {form.quoteId}</div>
            <div><span className="font-semibold">Amount:</span> {form.amount}</div>
            <div><span className="font-semibold">Stage:</span> {form.stage}</div>
          </div>
        </CardContent>
      </Card>

      {/* Editable Order Details (Modular) */}
      <OrderDetailsModule
        form={form}
        editMode={editMode}
        handleChange={handleChange}
        handleSave={handleSave}
        setEditMode={setEditMode}
      />

      {/* Order Edit Log */}
      <OrderEditLog
        log={[
          { date: '2025-07-03T17:21:00+05:30', user: 'Vishal Paswan', changes: 'Created order from quote.' },
          { date: '2025-07-03T17:23:00+05:30', user: 'Vishal Paswan', changes: 'Changed status from Draft to Activated.' },
          { date: '2025-07-03T17:25:00+05:30', user: 'Vishal Paswan', changes: 'Updated quantity from 1 to 3.' },
        ]}
      />
    </div>
  );
}