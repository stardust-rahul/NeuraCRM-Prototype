import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash, Plus, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

// Dummy initial orders (replace with context or props as needed)
const initialOrders = [
  {
    id: "O-001",
    customer: "Acme Corporation",
    total: "$12,500",
    status: "processing",
    payment: "paid",
    created: "2024-06-04",
    shipment: "in transit",
  },
  {
    id: "O-002",
    customer: "TechFlow Inc",
    total: "$7,800",
    status: "completed",
    payment: "paid",
    created: "2024-06-05",
    shipment: "delivered",
  },
];

export default function Orders() {
  const [orders] = useState(initialOrders);
  const [orderSearch, setOrderSearch] = useState("");
  const [ordersView, setOrdersView] = useState(10);
  const [ordersPage, setOrdersPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const navigate = useNavigate();

  const filteredOrders = orders.filter(o => !orderSearch || o.customer.toLowerCase().includes(orderSearch.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm text-muted-foreground">View</label>
          <select className="border rounded px-2 py-1 text-sm" value={ordersView} onChange={e => { setOrdersView(Number(e.target.value)); setOrdersPage(1); }}>
            {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <Button variant="outline" size="sm" disabled={ordersPage === 1} onClick={() => setOrdersPage(p => Math.max(1, p - 1))}>&lt;</Button>
          <span className="text-xs">Page {ordersPage} of {Math.max(1, Math.ceil(filteredOrders.length / ordersView))}</span>
          <Button variant="outline" size="sm" disabled={ordersPage === Math.ceil(filteredOrders.length / ordersView) || filteredOrders.length === 0} onClick={() => setOrdersPage(p => Math.min(Math.ceil(filteredOrders.length / ordersView), p + 1))}>&gt;</Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="     Search orders..."
              className="w-56 pl-10"
              value={orderSearch || ''}
              onChange={e => setOrderSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">Import</Button>
          <Button onClick={() => navigate("/orders/new")}>
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded border border-border/50 bg-white shadow-sm">
        <Table className="min-w-full border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-300">
              <TableHead className="w-[40px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100"><input type="checkbox" checked={selectedOrders.length === filteredOrders.slice((ordersPage-1)*ordersView, ordersPage*ordersView).length && filteredOrders.length > 0} onChange={e => {
                if (e.target.checked) {
                  setSelectedOrders(filteredOrders.slice((ordersPage-1)*ordersView, ordersPage*ordersView).map(o => o.id));
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
            {filteredOrders.slice((ordersPage-1)*ordersView, ordersPage*ordersView).map((order, idx) => (
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
                    {order.customer}
                  </button>
                </TableCell>
                <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{order.total}</TableCell>
                <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                  <Badge variant={order.status === "completed" ? "default" : order.status === "cancelled" ? "destructive" : "secondary"}>{order.status}</Badge>
                </TableCell>
                <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                  <Badge variant={order.payment === "paid" ? "default" : order.payment === "refunded" ? "destructive" : "secondary"}>{order.payment}</Badge>
                </TableCell>
                <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{order.shipment}</TableCell>
                <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{order.created}</TableCell>
                <TableCell className="px-2 py-1 text-left bg-white group-hover:bg-blue-50">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/orders/${order.id}`)}>
                        <Eye className="w-4 h-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/orders/${order.id}?edit=true`)}>
                        <Edit className="w-4 h-4 mr-2" /> Edit Order
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 focus:text-red-600" disabled>
                        <Trash className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 