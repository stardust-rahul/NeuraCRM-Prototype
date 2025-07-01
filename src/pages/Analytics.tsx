import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  PieChart,
  LineChart,
  X,
  Plus,
  CloudSun,
  RefreshCw,
  Box,
  GripVertical,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const AVAILABLE_WIDGETS = [
  {
    type: "sales",
    name: "Sales Analytics",
    icon: BarChart3,
  },
  {
    type: "revenue",
    name: "Revenue Breakdown",
    icon: PieChart,
  },
  {
    type: "performance",
    name: "Performance Trends",
    icon: LineChart,
  },
  {
    type: "growth",
    name: "Growth Metrics",
    icon: TrendingUp,
  },
  {
    type: "weather",
    name: "Weather",
    icon: CloudSun,
  },
  {
    type: "custom",
    name: "Custom Box",
    icon: Box,
  },
];

function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          // TODO: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
          const apiKey = "YOUR_API_KEY";
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to fetch weather");
          const data = await res.json();
          setWeather(data);
        } catch (e) {
          setError("Could not fetch weather data.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location.");
        setLoading(false);
      },
    );
  }, []);

  if (loading) return <div className="py-8 text-center">Loading weather...</div>;
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>;
  if (!weather) return null;
  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex items-center space-x-2 mb-2">
        <CloudSun className="w-8 h-8 text-primary" />
        <span className="text-lg font-semibold">{weather.name}</span>
      </div>
      <div className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</div>
      <div className="text-sm text-muted-foreground mb-2 capitalize">
        {weather.weather[0].description}
      </div>
      <div className="flex space-x-4 text-xs text-muted-foreground">
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {weather.wind.speed} m/s</span>
      </div>
    </div>
  );
}

function CustomBoxWidget({ value, onChange }: { value: { title: string; content: string }; onChange: (v: { title: string; content: string }) => void }) {
  return (
    <div className="flex flex-col items-center py-8 w-full">
      <Box className="w-8 h-8 text-primary mb-2" />
      <input
        className="text-lg font-semibold text-center bg-transparent border-b border-border mb-2 focus:outline-none focus:border-primary w-full"
        value={value.title}
        onChange={e => onChange({ ...value, title: e.target.value })}
        placeholder="Custom Title"
      />
      <textarea
        className="text-sm text-muted-foreground text-center bg-transparent border border-border rounded p-2 w-full min-h-[60px] focus:outline-none focus:border-primary"
        value={value.content}
        onChange={e => onChange({ ...value, content: e.target.value })}
        placeholder="Add your own content here!"
      />
    </div>
  );
}

const WIDGETS_LOCALSTORAGE_KEY = "dashboard_widgets_v1";

export default function Analytics() {
  const [widgets, setWidgets] = useState<any[]>(() => {
    const saved = localStorage.getItem(WIDGETS_LOCALSTORAGE_KEY);
    if (saved) return JSON.parse(saved);
    // Default widgets
    return [
      { type: "sales" },
      { type: "revenue" },
      { type: "performance" },
      { type: "growth" },
      { type: "weather" },
    ];
  });
  const [showAdd, setShowAdd] = useState(false);

  // Persist widgets in localStorage
  useEffect(() => {
    localStorage.setItem(WIDGETS_LOCALSTORAGE_KEY, JSON.stringify(widgets));
  }, [widgets]);

  function removeWidget(idx: number) {
    setWidgets((w) => w.filter((_, i) => i !== idx));
  }

  function addWidget(type: string) {
    if (type === "custom") {
      setWidgets((w) => [...w, { type, value: { title: "Custom Box", content: "" } }]);
    } else {
      setWidgets((w) => [...w, { type }]);
    }
    setShowAdd(false);
  }

  function availableToAdd() {
    // Now allow multiple of any widget
    return AVAILABLE_WIDGETS;
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const reordered = Array.from(widgets);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setWidgets(reordered);
  }

  function updateCustom(idx: number, value: { title: string; content: string }) {
    setWidgets((w) => w.map((item, i) => (i === idx ? { ...item, value } : item)));
  }

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Fully customizable dashboard. Add, remove, reorder, or edit widgets as you like.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setShowAdd((v) => !v)}>
            <Plus className="w-4 h-4 mr-2" /> Add Widget
          </Button>
        </div>
      </div>

      {/* Add Widget Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Widget</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {availableToAdd().map((w) => (
                <Button
                  key={w.type}
                  variant="outline"
                  className="flex flex-col items-center py-6"
                  onClick={() => addWidget(w.type)}
                >
                  <w.icon className="w-8 h-8 mb-2 text-primary" />
                  {w.name}
                </Button>
              ))}
            </div>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Widgets Grid */}
      {widgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="text-lg font-semibold mb-2">No widgets on your dashboard.</div>
          <Button onClick={() => setShowAdd(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Widget
          </Button>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dashboard-widgets" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {widgets.map((widget, idx) => (
                  <Draggable key={idx} draggableId={"widget-" + idx} index={idx}>
                    {(dragProvided, dragSnapshot) => (
                      <Card
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        className={
                          "relative border border-border/50 transition-shadow " +
                          (dragSnapshot.isDragging ? "shadow-lg ring-2 ring-primary" : "")
                        }
                      >
                        <div
                          {...dragProvided.dragHandleProps}
                          className="absolute left-2 top-2 cursor-grab text-muted-foreground"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 z-10"
                          onClick={() => removeWidget(idx)}
                          aria-label="Remove widget"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            {(() => {
                              const found = AVAILABLE_WIDGETS.find((w) => w.type === widget.type);
                              if (found) {
                                const Icon = found.icon;
                                return <Icon className="w-5 h-5" />;
                              }
                              return null;
                            })()}
                            <span>
                              {AVAILABLE_WIDGETS.find((w) => w.type === widget.type)?.name || "Widget"}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {widget.type === "sales" && (
                            <div className="text-center py-8">
                              <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4" />
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                Sales Analytics
                              </h3>
                              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                Get deep insights into your sales performance, customer behavior, and revenue trends with powerful analytics and reporting tools.
                              </p>
                            </div>
                          )}
                          {widget.type === "revenue" && (
                            <div className="flex flex-col items-center py-8">
                              <PieChart className="w-8 h-8 text-primary mb-2" />
                              <div className="text-lg font-semibold">Revenue Breakdown</div>
                              <div className="text-sm text-muted-foreground">Pie chart of revenue sources</div>
                            </div>
                          )}
                          {widget.type === "performance" && (
                            <div className="flex flex-col items-center py-8">
                              <LineChart className="w-8 h-8 text-primary mb-2" />
                              <div className="text-lg font-semibold">Performance Trends</div>
                              <div className="text-sm text-muted-foreground">Line chart of performance over time</div>
                            </div>
                          )}
                          {widget.type === "growth" && (
                            <div className="flex flex-col items-center py-8">
                              <TrendingUp className="w-8 h-8 text-primary mb-2" />
                              <div className="text-lg font-semibold">Growth Metrics</div>
                              <div className="text-sm text-muted-foreground">Key growth indicators</div>
                            </div>
                          )}
                          {widget.type === "weather" && <WeatherWidget />}
                          {widget.type === "custom" && (
                            <CustomBoxWidget
                              value={widget.value || { title: "Custom Box", content: "" }}
                              onChange={(v) => updateCustom(idx, v)}
                            />
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
