import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const STATUS_ORDER = ["Draft", "Pending", "Activated", "Completed", "Cancelled"];
const STATUS_COLORS = {
  Draft: "#64748B",
  Pending: "#F59E42",
  Activated: "#3B82F6",
  Completed: "#22C55E",
  Cancelled: "#EF4444"
};

export default function OrdersChartView({ orders }) {
  // Group by status for count, revenue, and avg order value
  const stats = orders.reduce((acc, o) => {
    const status = o.status || 'Draft';
    const amount = typeof o.finalizedPrice === 'number' ? o.finalizedPrice : (typeof o.amount === 'number' ? o.amount : 0);
    if (!acc[status]) acc[status] = { count: 0, revenue: 0 };
    acc[status].count += 1;
    acc[status].revenue += amount;
    return acc;
  }, {});

  const labels = STATUS_ORDER;
  const orderCounts = labels.map(s => stats[s]?.count || 0);
  const revenues = labels.map(s => stats[s]?.revenue || 0);
  const avgOrderValue = labels.map(s => (stats[s]?.count ? stats[s].revenue / stats[s].count : 0));

  // Dynamically build datasets based on actual data
  const datasets = [];
  if (orderCounts.some(count => count > 0)) {
    datasets.push({
      label: "Orders",
      data: orderCounts,
      backgroundColor: labels.map(l => STATUS_COLORS[l] || "#3B82F6"),
      yAxisID: 'y',
      borderRadius: 8,
      barThickness: 32,
      type: 'bar' as const,
    });
  }
  if (revenues.some(rev => rev > 0)) {
    datasets.push({
      label: "Revenue (₹)",
      data: revenues,
      backgroundColor: labels.map(l => STATUS_COLORS[l] + 'BB'),
      yAxisID: 'y1',
      borderRadius: 8,
      barThickness: 24,
      type: 'bar' as const,
    });
  }
  if (avgOrderValue.some(val => val > 0 && !isNaN(val))) {
    datasets.push({
      label: "Avg Order Value (₹)",
      data: avgOrderValue,
      backgroundColor: labels.map(l => STATUS_COLORS[l] + '55'),
      yAxisID: 'y2',
      borderRadius: 8,
      barThickness: 16,
      type: 'bar' as const,
    });
  }
  const data = {
    labels,
    datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { font: { size: 14 } } },
      title: {
        display: true,
        text: "Orders by Status",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            let value = context.parsed.x;
            if (label.toLowerCase().includes('revenue') || label.toLowerCase().includes('avg')) {
              value = `₹${value.toLocaleString()}`;
            }
            return `${label}: ${value}`;
          },
        },
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3B82F6',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Orders / Revenue / Avg Value",
          font: { size: 16, weight: 700 }
        },
        grid: { display: false },
        ticks: {
          callback: function (value) {
            return value;
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Order Status",
          font: { size: 15, weight: 700 }
        },
        beginAtZero: true,
        grid: { color: '#e0e7ef' },
      },
      y1: {
        title: { display: true, text: 'Revenue (₹)', font: { size: 13 } },
        beginAtZero: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { callback: (v: number) => `₹${v}` },
      },
      y2: {
        title: { display: true, text: 'Avg Order Value (₹)', font: { size: 13 } },
        beginAtZero: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { callback: (v: number) => `₹${v}` },
        display: false,
      }
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Order Analytics</CardTitle>
        <CardDescription>Overview of order volume, revenue, and average order value by status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full max-w-4xl mx-auto">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
