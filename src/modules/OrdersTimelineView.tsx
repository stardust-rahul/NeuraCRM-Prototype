import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const STATUS_ORDER = ["Draft", "Pending", "Activated", "Completed", "Cancelled"];
const STATUS_COLORS = {
  Draft: "#64748B",
  Pending: "#F59E42",
  Activated: "#3B82F6",
  Completed: "#22C55E",
  Cancelled: "#EF4444"
};

export default function OrdersTimelineView({ orders }) {
  // Sort by createdDate desc
  const sorted = [...orders].sort((a, b) => {
    const ad = a.createdDate ? new Date(a.createdDate).getTime() : 0;
    const bd = b.createdDate ? new Date(b.createdDate).getTime() : 0;
    return bd - ad;
  });

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Order Progress Timeline</CardTitle>
        <CardDescription>See each order's journey through all stages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-col gap-10">
          {sorted.map(order => {
            const currentIdx = STATUS_ORDER.indexOf(order.status || 'Draft');
            return (
              <div key={order.id} className="flex items-start gap-6 group">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-white shadow"
                    style={{ background: STATUS_COLORS[order.status || 'Draft'] }}
                  ></div>
                  <div className="w-1 bg-blue-200 flex-1 mt-1" style={{ minHeight: 48, opacity: 0.6 }}></div>
                </div>
                {/* Order Card */}
                <div className="flex-1 bg-gradient-to-br from-white to-blue-50 rounded-xl border border-blue-100 shadow p-4 relative">
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-blue-900 text-lg">{order.customer || '-'}</span>
                      <span className="text-xs text-muted-foreground">{order.company || ''}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Badge variant="secondary">{order.status || 'Draft'}</Badge>
                      <span className="text-xs text-muted-foreground">{order.createdDate ? new Date(order.createdDate).toLocaleString() : '-'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-semibold text-blue-800">Amount:</span>
                    <span className="text-blue-700">{typeof order.finalizedPrice === 'number' ? `₹${order.finalizedPrice.toLocaleString()}` : typeof order.amount === 'number' ? `₹${order.amount.toLocaleString()}` : order.amount || '-'}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 mt-2">
                    {STATUS_ORDER.map((status, idx) => (
                      <div key={status} className="flex items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-150 ${idx < currentIdx ? 'border-green-400 bg-green-100' : idx === currentIdx ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 bg-gray-50'}`}
                              style={{ background: idx <= currentIdx ? STATUS_COLORS[status] : '#F3F4F6', color: idx === currentIdx ? '#fff' : '#64748B' }}
                            >
                              <span className="text-xs font-bold">{idx + 1}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center">
                            {status}
                          </TooltipContent>
                        </Tooltip>
                        {idx < STATUS_ORDER.length - 1 && (
                          <div className={`h-1 w-10 ${idx < currentIdx ? 'bg-green-400' : 'bg-gray-200'} rounded`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    {STATUS_ORDER.map((status, idx) => (
                      <span key={status} className="flex-1 text-center text-xs text-muted-foreground" style={{ minWidth: 32 }}>{status}</span>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      className="text-blue-600 hover:text-blue-900 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-100 bg-white shadow-sm"
                      title="Edit Order"
                      onClick={() => window.location.assign(`/orders/${order.id}?edit=true`)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 012-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
