import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export const LineItems = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No line items for this quote.</p>
        </CardContent>
      </Card>
    );
  }

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Product</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="font-medium">{item.product}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-semibold">Subtotal</TableCell>
              <TableCell className="text-right font-semibold">{formatCurrency(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right">Tax (8%)</TableCell>
              <TableCell className="text-right">{formatCurrency(tax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold text-lg">Total</TableCell>
              <TableCell className="text-right font-bold text-lg">{formatCurrency(total)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};
