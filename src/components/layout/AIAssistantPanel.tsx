import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Send,
  Zap,
  TrendingUp,
  Users,
  MessageSquare,
  Lightbulb,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Slack,
  Calendar,
  Video,
  Mail,
  Plus,
  Settings,
  X,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

interface InsightCard {
  id: string;
  title: string;
  description: string;
  type: "success" | "warning" | "info";
  action?: string;
}

interface ConnectedApp {
  id: string;
  name: string;
  icon: any;
  status: "connected" | "disconnected";
  description: string;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    type: "user",
    content: "Show me recent lost leads",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    type: "ai",
    content:
      "I found 5 leads lost in the past week. The main reasons were: pricing concerns (40%), timeline mismatch (30%), and feature gaps (30%). Would you like me to create a detailed report?",
    timestamp: "10:32 AM",
  },
];

const insights: InsightCard[] = [
  {
    id: "1",
    title: "Revenue Spike Detected",
    description:
      "Your revenue increased by 25% this week compared to last week.",
    type: "success",
    action: "View Details",
  },
  {
    id: "2",
    title: "Follow-up Needed",
    description: "12 leads haven't been contacted in over 3 days.",
    type: "warning",
    action: "Review Leads",
  },
  {
    id: "3",
    title: "Pipeline Health",
    description: "Your pipeline is 15% above target for this quarter.",
    type: "info",
    action: "View Pipeline",
  },
];

const connectedApps: ConnectedApp[] = [
  {
    id: "slack",
    name: "Slack",
    icon: Slack,
    status: "connected",
    description: "Team communication and notifications",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    icon: Calendar,
    status: "connected",
    description: "Schedule meetings and events",
  },
  {
    id: "zoom",
    name: "Zoom",
    icon: Video,
    status: "connected",
    description: "Video conferencing and recordings",
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: Mail,
    status: "disconnected",
    description: "Email integration and tracking",
  },
];

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistantPanel({
  isOpen,
  onClose,
}: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "insights" | "apps">(
    "chat",
  );

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I'm processing your request. This is a demo response.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "info":
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
      default:
        return <Lightbulb className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-96 bg-card border-l border-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">AI Assistant</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="p-4 border-b border-border">
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "chat"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "insights"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Insights</span>
          </button>
          <button
            onClick={() => setActiveTab("apps")}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "apps"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Apps</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {/* Chat Tab */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.type === "ai" && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="w-4 h-4" />
                          <span className="text-xs font-medium">
                            AI Assistant
                          </span>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {[
                  "Show lost leads",
                  "Revenue trends",
                  "Top performers",
                  "Pipeline health",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setInputValue(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === "insights" && (
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">
                  Smart Insights
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI-generated insights from your data
                </p>
              </div>

              {insights.map((insight) => (
                <Card key={insight.id} className="border border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">
                          {insight.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {insight.description}
                        </p>
                        {insight.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 text-xs"
                          >
                            {insight.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                Generate More Insights
              </Button>
            </div>
          </ScrollArea>
        )}

        {/* Apps Tab */}
        {activeTab === "apps" && (
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">
                  App Integrations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect and manage your apps
                </p>
              </div>

              <div className="space-y-3">
                {connectedApps.map((app) => (
                  <Card key={app.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                          <app.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-sm">{app.name}</h4>
                            <Badge
                              variant={
                                app.status === "connected"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {app.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {app.description}
                          </p>
                        </div>
                        <Button
                          variant={
                            app.status === "connected" ? "outline" : "default"
                          }
                          size="sm"
                          className="text-xs"
                        >
                          {app.status === "connected" ? "Configure" : "Connect"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Browse More Apps
              </Button>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
