import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Clock,
  Zap,
  Plus,
  ExternalLink,
  Users,
  Building2,
  TrendingUp,
  ListChecks,
  BarChart2,
  Target,
  Briefcase,
  FileText,
  Settings,
  PieChart,
  DollarSign,
  ShoppingCart,
  Headphones,
  Palette,
  Megaphone,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Modules - Core business entities
const modules = [
  {
    name: "Leads",
    icon: TrendingUp,
    description: "Manage potential customers and prospects",
    count: 7,
    status: "active",
    color: "bg-blue-600",
    category: "Sales",
    href: "/leads",
  },
  {
    name: "Contacts",
    icon: Users,
    description: "All your customer and prospect contacts",
    count: 12,
    status: "active",
    color: "bg-indigo-600",
    category: "CRM",
    href: "/contacts",
  },
  {
    name: "Accounts",
    icon: Building2,
    description: "Manage organizations and companies",
    count: 5,
    status: "active",
    color: "bg-cyan-600",
    category: "CRM",
    href: "/companies",
  },
  {
    name: "Deals",
    icon: BarChart2,
    description: "Track sales opportunities and pipelines",
    count: 4,
    status: "active",
    color: "bg-green-600",
    category: "Sales",
    href: "/deals",
  },
  {
    name: "Opportunities",
    icon: Target,
    description: "Manage your sales pipeline stages",
    count: 2,
    status: "active",
    color: "bg-teal-600",
    category: "Sales",
    href: "/opportunities",
  },
  {
    name: "Tasks",
    icon: ListChecks,
    description: "Organize and track your to-dos",
    count: 10,
    status: "active",
    color: "bg-yellow-600",
    category: "Productivity",
    href: "/tasks",
  },
  {
    name: "Reports",
    icon: PieChart,
    description: "View analytics, insights and performance",
    count: 2,
    status: "active",
    color: "bg-purple-600",
    category: "Analytics",
    href: "/reports",
  },
  {
    name: "Pipelines",
    icon: Filter,
    description: "Visualize and manage sales stages",
    count: 3,
    status: "active",
    color: "bg-pink-600",
    category: "Sales",
    href: "/pipelines",
  },
  {
    name: "Pipelines",
    icon: Filter,
    description: "Visualize and manage sales stages",
    count: 3,
    status: "active",
    color: "bg-pink-600",
    category: "Sales",
    href: "/pipelines",
  },
  {
    name: "Pipelines",
    icon: Filter,
    description: "Visualize and manage sales stages",
    count: 3,
    status: "active",
    color: "bg-pink-600",
    category: "Sales",
    href: "/pipelines",
  },
  {
    name: "Pipelines",
    icon: Filter,
    description: "Visualize and manage sales stages",
    count: 3,
    status: "active",
    color: "bg-pink-600",
    category: "Sales",
    href: "/pipelines",
  },
  {
    name: "Pipelines",
    icon: Filter,
    description: "Visualize and manage sales stages",
    count: 3,
    status: "active",
    color: "bg-pink-600",
    category: "Sales",
    href: "/pipelines",
  },
  {
    name: "Pipelines",
    icon: Filter,
    description: "Visualize and manage sales stages",
    count: 3,
    status: "active",
    color: "bg-pink-600",
    category: "Sales",
    href: "/pipelines",
  },
  {
    name: "Pipelines",
    icon: Filter,
    description: "Visualize and manage sales stages",
    count: 3,
    status: "active",
    color: "bg-pink-600",
    category: "Sales",
    href: "/pipelines",
  },
  {
    name: "Pipelines",
    icon: Filter,
    description: "Visualize and manage sales stages",
    count: 3,
    status: "active",
    color: "bg-pink-600",
    category: "Sales",
    href: "/pipelines",
  },
];

// Apps - Business tools and integrations
const apps = [
  {
    name: "Marketing",
    icon: Megaphone,
    description: "Campaign management and automation",
    count: 8,
    status: "active",
    color: "bg-purple-500",
    category: "Marketing",
    href: "/marketing",
  },
  {
    name: "Sales",
    icon: DollarSign,
    description: "Sales process and forecasting tools",
    count: 6,
    status: "active",
    color: "bg-green-500",
    category: "Sales",
    href: "/sales",
  },
  {
    name: "Email",
    icon: Mail,
    description: "Unified inbox and email management",
    count: 12,
    status: "active",
    color: "bg-blue-500",
    category: "Communication",
    href: "/email",
  },
  {
    name: "Chat",
    icon: MessageSquare,
    description: "Team messaging and collaboration",
    count: 3,
    status: "active",
    color: "bg-emerald-500",
    category: "Communication",
    href: "/chat",
  },
  {
    name: "VoIP",
    icon: Phone,
    description: "Business calls and telephony",
    count: 2,
    status: "busy",
    color: "bg-orange-500",
    category: "Communication",
    href: "/voip",
  },
  {
    name: "Calendar",
    icon: Calendar,
    description: "Schedule events and meetings",
    count: 5,
    status: "active",
    color: "bg-violet-500",
    category: "Productivity",
    href: "/calendar",
  },
  {
    name: "Automation",
    icon: Zap,
    description: "Workflow automation engine",
    count: 8,
    status: "active",
    color: "bg-amber-500",
    category: "Productivity",
    href: "/automation",
  },
  {
    name: "E-commerce",
    icon: ShoppingCart,
    description: "Online store management",
    count: 4,
    status: "active",
    color: "bg-rose-500",
    category: "Sales",
    href: "/ecommerce",
  },
  {
    name: "Support",
    icon: Headphones,
    description: "Customer support and helpdesk",
    count: 3,
    status: "active",
    color: "bg-sky-500",
    category: "Service",
    href: "/support",
  },
  {
    name: "Design",
    icon: Palette,
    description: "Creative tools and design assets",
    count: 2,
    status: "active",
    color: "bg-fuchsia-500",
    category: "Creative",
    href: "/design",
  },
];

const recentActivities = [
  {
    action: "Meeting scheduled",
    target: "Acme Corp Demo",
    time: "2 mins ago",
    icon: Calendar,
    category: "Calendar",
  },
  {
    action: "Email sent",
    target: "Follow-up: Q4 Proposal",
    time: "5 mins ago",
    icon: Mail,
    category: "Email",
  },
  {
    action: "Call logged",
    target: "Sarah Johnson",
    time: "12 mins ago",
    icon: Phone,
    category: "VoIP",
  },
  {
    action: "Deal updated",
    target: "Enterprise License",
    time: "25 mins ago",
    icon: Zap,
    category: "Sales",
  },
  ];

interface RightAppsPanelProps {
  apps?: Array<any>;
  onAddApp?: (app: any) => void;
}

export default function RightAppsPanel({ apps: propApps, onAddApp }: RightAppsPanelProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'modules' | 'apps'>("modules");

  let filteredModules: typeof modules = [];
  let filteredApps: typeof apps = [];
  if (activeTab === "modules") {
    filteredModules = modules.filter(module =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else if (activeTab === "apps") {
    filteredApps = apps.filter(app =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col -ml-1 h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Business Tools</h2>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex-shrink-0 px-4 pt-2">
        <Tabs value={activeTab} onValueChange={(v: 'modules' | 'apps') => setActiveTab(v)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="modules" className="text-sm font-medium">
              Modules
            </TabsTrigger>
            <TabsTrigger value="apps" className="text-sm font-medium">
              Apps
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* Search Bar - now below tabs */}
      <div className="flex-shrink-0 px-4 pt-2">
        <OutlinedInput
          size="small"
          placeholder={activeTab === "modules" ? "Search modules..." : "Search apps..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          }
          sx={{ width: '100%', mb: 2 }}
        />
      </div>
      {/* Main content: tab panel + recent activity */}
      <div className="flex-1 flex flex-col min-h-0">
        <Tabs value={activeTab} className="w-full h-full">
          {/* Only render the active tab's content */}
          {activeTab === "modules" && (
            <div className="mt-0 h-full flex flex-col min-h-0">
              <div className="p-4 flex flex-col min-h-0 h-full">
                {/* <div className="mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Business Modules ({filteredModules.length})
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Core business entities and data management
                  </p>
                </div> */}
                <div className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-200 scrollbar-track-transparent">
                  {filteredModules.map((module) => (
                    <div
                      key={module.name}
                      className="bg-white rounded-lg shadow-sm border border-border/40 p-2 flex flex-col gap-1 transition hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-7 h-7 rounded-md flex items-center justify-center", module.color)}>
                            <module.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-sm text-foreground">{module.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 font-medium rounded-full border border-border/60 bg-muted/60 text-foreground/80">
                            {module.category}
                          </Badge>
                          <button
                            className="ml-1 p-0.5 rounded-full hover:bg-muted transition-colors border border-border/60"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddApp?.(module);
                            }}
                            title="Add to Navigation"
                          >
                            <Plus className="w-3 h-3 text-primary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "apps" && (
            <div className="mt-0 h-full flex flex-col min-h-0">
              <div className="p-4 flex flex-col min-h-0 h-full">
                {/* <div className="mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Business Applications ({filteredApps.length})
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Tools and integrations for business operations
                  </p>
                </div> */}
                <div className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-200 scrollbar-track-transparent">
                  {filteredApps.map((app) => (
                    <div
                      key={app.name}
                      className="bg-white rounded-lg shadow-sm border border-border/40 p-2 flex flex-col gap-1 transition hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-7 h-7 rounded-md flex items-center justify-center", app.color)}>
                            <app.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-sm text-foreground">{app.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 font-medium rounded-full border border-border/60 bg-muted/60 text-foreground/80">
                            {app.category}
                          </Badge>
                          <button
                            className="ml-1 p-0.5 rounded-full hover:bg-muted transition-colors border border-border/60"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddApp?.(app);
                            }}
                            title="Add to Navigation"
                          >
                            <Plus className="w-3 h-3 text-primary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Tabs>
        {/* Recent Activity Section - always at the bottom */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Recent Activity
            </h3>
            <p className="text-xs text-muted-foreground">
              Latest updates across your workspace
            </p>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {activity.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {activity.target}
                  </p>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
