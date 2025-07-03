import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrdersContext";

export default function OrdersTableView({ orders, selectedOrders, setSelectedOrders, page, pageSize }) {
  const { removeOrder } = useOrders();
  const navigate = useNavigate();
  const pagedOrders = orders.slice((page-1)*pageSize, page*pageSize);
  return (
    <div className="overflow-x-auto rounded border border-border/50 bg-white shadow-sm">
      <Table className="min-w-full border-separate border-spacing-0">
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-300">
            <TableHead className="w-[40px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100"><input type="checkbox" checked={selectedOrders.length === pagedOrders.length && pagedOrders.length > 0} onChange={e => {
              if (e.target.checked) {
                setSelectedOrders(pagedOrders.map(o => o.id));
              } else {
                setSelectedOrders([]);
              }
            }} /></TableHead>
            <TableHead className="w-[50px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">#</TableHead>
            <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Customer</TableHead>
            <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Total</TableHead>
            <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Status</TableHead>
            <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Payment</TableHead>
            <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Shipment</TableHead>
            <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Created</TableHead>
            <TableHead className="text-left px-2 py-2 font-bold text-gray-700 bg-gray-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedOrders.map((order, idx) => (
            <TableRow key={order.id || idx} className="border-b border-gray-300 text-sm group hover:bg-blue-50 transition-colors">
              <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                <input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={e => {
                  if (e.target.checked) setSelectedOrders([...selectedOrders, order.id]);
                  else setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                }} />
              </TableCell>
              <TableCell className="px-2 py-1 text-muted-foreground border-r border-gray-200 bg-white group-hover:bg-blue-50">{idx + 1}</TableCell>
              <TableCell className="px-2 py-1 font-medium border-r border-gray-200 bg-white group-hover:bg-blue-50">
                <button
                  className="text-blue-600 hover:underline cursor-pointer bg-transparent border-none p-0 m-0"
                  style={{ background: 'none' }}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  {order.customer || '-'}
                </button>
              </TableCell>
              <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                {typeof order.finalizedPrice === 'number' ? `₹${order.finalizedPrice.toLocaleString()}` :
                  typeof order.amount === 'number' ? `₹${order.amount.toLocaleString()}` :
                  order.amount ? order.amount : '-'}
              </TableCell>
              <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                <Badge variant={order.status === "Completed" ? "default" : order.status === "Cancelled" ? "destructive" : "secondary"}>{order.status || 'Pending'}</Badge>
              </TableCell>
              <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                <Badge variant={order.payment === "Paid" ? "default" : order.payment === "Refunded" ? "destructive" : "secondary"}>{order.payment || 'Unpaid'}</Badge>
              </TableCell>
              <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{order.shipment || 'Pending'}</TableCell>
              <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{order.createdDate ? new Date(order.createdDate).toLocaleDateString() : '-'}</TableCell>
              <TableCell className="px-2 py-1 text-left bg-white group-hover:bg-blue-50">
                <Button size="icon" variant="ghost" onClick={() => navigate(`/orders/${order.id}`)} title="View Details"><Eye className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => navigate(`/orders/${order.id}?edit=true`)} title="Edit"><Edit className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" title="Delete" onClick={() => {
                  if (window.confirm('Are you sure you want to delete this order?')) {
                    removeOrder(order.id);
                  }
                }}><Trash className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
