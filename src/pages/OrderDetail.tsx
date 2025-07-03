import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dummy data for demonstration
const orders = [
  {
    id: "O-001",
    customer: "Acme Corporation",
    total: "$12,500",
    status: "processing",
    payment: "paid",
    created: "2024-06-04",
    shipment: "in transit",
    accountName: "Amazon India",
    orderStartDate: "01/08/2025",
    orderAmount: "£0.00",
    shippingAddress: "Village Telmunga PS kasmar district bokaro, Bokaro, 827302, Albania",
    orderOwner: "Vishal Paswan",
    customerAuthorizedBy: "Ankit Chandan",
    companyAuthorizedBy: "Vishal Paswan",
    orderNumber: "00000100",
    statusLabel: "Draft",
  },
  {
    id: "O-002",
    customer: "TechFlow Inc",
    total: "$7,800",
    status: "completed",
    payment: "paid",
    created: "2024-06-05",
    shipment: "delivered",
    accountName: "Amazon India",
    orderStartDate: "01/08/2025",
    orderAmount: "£0.00",
    shippingAddress: "Village Telmunga PS kasmar district bokaro, Bokaro, 827302, Albania",
    orderOwner: "Vishal Paswan",
    customerAuthorizedBy: "Ankit Chandan",
    companyAuthorizedBy: "Vishal Paswan",
    orderNumber: "00000101",
    statusLabel: "Draft",
  },
];

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = new URLSearchParams(location.search).get("edit") === "true";
  const order = orders.find((o) => o.id === orderId) || orders[0];
  const [editMode, setEditMode] = useState(isEdit);
  const [form, setForm] = useState({ ...order });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save logic here (API call or context update)
    setEditMode(false);
  };

  return (
    <div className="p-8 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-lg text-muted-foreground">
            <span>Order</span>
            <span className="font-mono text-xl text-blue-900 font-bold">{form.orderNumber || order.orderNumber}</span>
          </div>
          <div className="flex space-x-8 mt-2 text-sm text-muted-foreground">
            <div>
              <span className="font-semibold">Account Name:</span> {form.accountName}
            </div>
            <div>
              <span className="font-semibold">Order Start Date:</span> {form.orderStartDate}
            </div>
            <div>
              <span className="font-semibold">Status:</span> {form.statusLabel}
            </div>
            <div>
              <span className="font-semibold">Order Amount:</span> {form.orderAmount}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setEditMode(true)} disabled={editMode}>Edit</Button>
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-6 flex items-center">
        <div className="bg-blue-900 h-6 rounded-full flex items-center justify-center text-white font-semibold px-8" style={{ width: "40%" }}>
          Draft
        </div>
        <div className="flex-1 text-center text-gray-600">Activated</div>
      </div>
      {/* Tabs */}
      <Tabs defaultValue="related" className="mt-4">
        <TabsList>
          <TabsTrigger value="related">Related</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="related">
          {/* Related Tab Content (placeholders) */}
          <div className="space-y-4 mt-4">
            <Card className="p-4">
              <div className="font-semibold text-lg mb-2">Order Delivery Groups (0)</div>
              <Button variant="outline" size="sm">New</Button>
            </Card>
            <Card className="p-4">
              <div className="font-semibold text-lg mb-2">Order Products (0)</div>
              <Button variant="outline" size="sm">Add Products</Button>
              <Button variant="outline" size="sm" className="ml-2">Edit Products</Button>
            </Card>
            <Card className="p-4">
              <div className="font-semibold text-lg mb-2">Order History (1)</div>
              <div className="text-sm">03/07/2025, 06:09 - Created by Vishal Paswan</div>
            </Card>
            <Card className="p-4">
              <div className="font-semibold text-lg mb-2">Notes & Attachments (0)</div>
              <Button variant="outline" size="sm">Upload Files</Button>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="details">
          {/* Details Tab Content */}
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-2 font-semibold">Order Owner</div>
                {editMode ? (
                  <Input name="orderOwner" value={form.orderOwner} onChange={handleChange} />
                ) : (
                  <div>{form.orderOwner}</div>
                )}
              </div>
              <div>
                <div className="mb-2 font-semibold">Order Amount</div>
                {editMode ? (
                  <Input name="orderAmount" value={form.orderAmount} onChange={handleChange} />
                ) : (
                  <div>{form.orderAmount}</div>
                )}
              </div>
              <div>
                <div className="mb-2 font-semibold">Order Type</div>
                {editMode ? (
                  <Input name="orderType" value={form.orderType || ""} onChange={handleChange} />
                ) : (
                  <div>{form.orderType || "-"}</div>
                )}
              </div>
              <div>
                <div className="mb-2 font-semibold">Status</div>
                {editMode ? (
                  <Input name="statusLabel" value={form.statusLabel} onChange={handleChange} />
                ) : (
                  <div>{form.statusLabel}</div>
                )}
              </div>
              <div className="md:col-span-2">
                <div className="mb-2 font-semibold">Shipping Address</div>
                {editMode ? (
                  <Input name="shippingAddress" value={form.shippingAddress} onChange={handleChange} />
                ) : (
                  <div>{form.shippingAddress}</div>
                )}
              </div>
              <div>
                <div className="mb-2 font-semibold">Customer Authorized By</div>
                {editMode ? (
                  <Input name="customerAuthorizedBy" value={form.customerAuthorizedBy} onChange={handleChange} />
                ) : (
                  <div>{form.customerAuthorizedBy}</div>
                )}
              </div>
              <div>
                <div className="mb-2 font-semibold">Company Authorized By</div>
                {editMode ? (
                  <Input name="companyAuthorizedBy" value={form.companyAuthorizedBy} onChange={handleChange} />
                ) : (
                  <div>{form.companyAuthorizedBy}</div>
                )}
              </div>
            </div>
            {editMode && (
              <div className="flex justify-end mt-6">
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" className="ml-2" onClick={() => setEditMode(false)}>Cancel</Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 