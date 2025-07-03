import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrdersContext";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash, Plus, Search, Download } from "lucide-react";
import { useOrders } from "@/context/OrdersContext";
import { Input } from "@/components/ui/input";
import OrdersTableView from "@/modules/OrdersTableView";
import OrdersKanbanView from "@/modules/OrdersKanbanView";
import OrdersChartView from "@/modules/OrdersChartView";
import OrdersTimelineView from "@/modules/OrdersTimelineView";
import OrdersSplitView from "@/modules/OrdersSplitView";

export default function Orders() {
  const { orders, removeOrder } = useOrders();
  const [orderSearch, setOrderSearch] = useState("");
  const [ordersView, setOrdersView] = useState(10);
  const [ordersPage, setOrdersPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const navigate = useNavigate();

  const filteredOrders = orders.filter(o => !orderSearch || o.customer.toLowerCase().includes(orderSearch.toLowerCase()));

  const [viewMode, setViewMode] = useState('card');
  const viewOptions = [
    { key: 'card', label: 'Cards' },
    { key: 'table', label: 'Table' },
    { key: 'kanban', label: 'Kanban' },
    { key: 'chart', label: 'Chart' },
    { key: 'timeline', label: 'Timeline' },
    { key: 'split', label: 'Split' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
        <div className="flex items-center space-x-2">
          {/* View Switch */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-2">
            {viewOptions.map(opt => (
              <button
                key={opt.key}
                className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${viewMode === opt.key ? 'bg-blue-700 text-white' : 'text-blue-700 hover:bg-blue-200'}`}
                onClick={() => setViewMode(opt.key)}
                style={{outline: 'none', border: 'none'}}
                type="button"
              >
                {opt.label}
              </button>
            ))}
          </div>
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
      {/* Orders View Switchable */}
      {viewMode === 'card' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredOrders.slice((ordersPage-1)*ordersView, ordersPage*ordersView).map((order, idx) => (
              <div key={order.id || idx} className="relative group rounded-xl shadow-lg border border-blue-100 bg-gradient-to-br from-white to-blue-50 hover:shadow-2xl transition-all p-6 flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-blue-700 font-bold">#{order.id || idx+1}</span>
                  <Badge variant={order.status === "Completed" ? "default" : order.status === "Cancelled" ? "destructive" : "secondary"}>{order.status || 'Pending'}</Badge>
                </div>
                <div className="mb-2">
                  <div className="text-lg font-bold text-blue-900 truncate">{order.customer || '-'}</div>
                  <div className="text-xs text-muted-foreground">{order.company || ''}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-sm font-semibold">Amount:</span>
                  <span className="text-blue-800">{typeof order.finalizedPrice === 'number' ? `₹${order.finalizedPrice.toLocaleString()}` : typeof order.amount === 'number' ? `₹${order.amount.toLocaleString()}` : order.amount || '-'}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-sm font-semibold">Payment:</span>
                  <Badge variant={order.payment === "Paid" ? "default" : order.payment === "Refunded" ? "destructive" : "secondary"}>{order.payment || 'Unpaid'}</Badge>
                  <span className="text-sm font-semibold ml-4">Shipment:</span>
                  <Badge variant={order.shipment === "Delivered" ? "default" : order.shipment === "Returned" ? "destructive" : "secondary"}>{order.shipment || 'Pending'}</Badge>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-muted-foreground">{order.createdDate ? new Date(order.createdDate).toLocaleDateString() : '-'}</span>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost" onClick={() => navigate(`/orders/${order.id}`)} title="View Details"><Eye className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => navigate(`/orders/${order.id}?edit=true`)} title="Edit"><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" title="Delete" onClick={() => {
  if (window.confirm('Are you sure you want to delete this order?')) {
    removeOrder(order.id);
  }
}}><Trash className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Floating Action Button */}
          <button
            className="fixed bottom-8 right-8 z-50 bg-blue-700 hover:bg-blue-900 text-white rounded-full p-4 shadow-lg transition-all flex items-center space-x-2"
            onClick={() => navigate("/orders/new")}
            title="New Order"
          >
            <Plus className="w-5 h-5" />
          </button>
        </>
      )}
      {viewMode === 'table' && (
        <OrdersTableView
          orders={filteredOrders}
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
          page={ordersPage}
          pageSize={ordersView}
        />
      )}
      {viewMode === 'kanban' && (
        <OrdersKanbanView orders={filteredOrders} />
      )}
      {viewMode === 'chart' && (
        <OrdersChartView orders={filteredOrders} />
      )}
      {viewMode === 'timeline' && (
        <OrdersTimelineView orders={filteredOrders} />
      )}
      {viewMode === 'split' && (
        <OrdersSplitView orders={filteredOrders} />
      )}
    </div>
  );
}