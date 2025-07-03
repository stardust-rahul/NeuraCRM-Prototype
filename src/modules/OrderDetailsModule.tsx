import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderDetailsModule({ form, editMode, handleChange, handleSave, setEditMode }) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
          <div>
            <label className="block font-semibold mb-1">Quantity</label>
            <Input
              name="quantity"
              type="number"
              min={1}
              value={form.quantity}
              disabled={!editMode}
              onChange={handleChange}
              className="w-32"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Finalized Price</label>
            <Input
              name="finalizedPrice"
              type="number"
              min={0}
              value={form.finalizedPrice}
              disabled={!editMode}
              onChange={handleChange}
              className="w-32"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Payment</label>
            {editMode ? (
              <select
                name="payment"
                value={form.payment || ''}
                onChange={handleChange}
                className="w-32 border rounded px-2 py-1"
              >
                <option value="">Select</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                <option value="Refunded">Refunded</option>
              </select>
            ) : (
              <div className="w-32 px-2 py-1 border rounded bg-gray-50">{form.payment || '-'}</div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Shipment</label>
            {editMode ? (
              <select
                name="shipment"
                value={form.shipment || ''}
                onChange={handleChange}
                className="w-32 border rounded px-2 py-1"
              >
                <option value="">Select</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Returned">Returned</option>
              </select>
            ) : (
              <div className="w-32 px-2 py-1 border rounded bg-gray-50">{form.shipment || '-'}</div>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
          <div>
            <label className="block font-semibold mb-1">Status</label>
            {editMode ? (
              <select
                name="status"
                value={form.status || ''}
                onChange={handleChange}
                className="w-32 border rounded px-2 py-1"
              >
                <option value="">Select</option>
                <option value="Pending">Pending</option>
                <option value="Draft">Draft</option>
                <option value="Activated">Activated</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            ) : (
              <div className="w-32 px-2 py-1 border rounded bg-gray-50">{form.status || '-'}</div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Created Date</label>
            {editMode ? (
              <Input
                name="createdDate"
                type="date"
                value={form.createdDate ? form.createdDate.slice(0, 10) : ''}
                onChange={handleChange}
                className="w-48"
              />
            ) : (
              <div className="w-48 px-2 py-1 border rounded bg-gray-50">{form.createdDate ? new Date(form.createdDate).toLocaleDateString() : '-'}</div>
            )}
          </div>
        </div>
        {editMode && (
          <div className="flex space-x-2 mt-6">
            <Button variant="default" onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
