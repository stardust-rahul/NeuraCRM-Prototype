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
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Modules - Core business entities
const modules = [
  {
    name: "Leads",
    icon: TrendingUp,
    count: 7,
    status: "active",
    color: "bg-blue-600",
    category: "Sales",
    href: "/leads",
  },
  {
    name: "Contacts",
    icon: Users,
    count: 12,
    status: "active",
    color: "bg-indigo-600",
    category: "CRM",
    href: "/contacts",
  },
  {
    name: "Accounts",
    icon: Building2,
    count: 5,
    status: "active",
    color: "bg-cyan-600",
    category: "CRM",
    href: "/companies",
  },
  {
    name: "Deals",
    icon: BarChart2,
    count: 4,
    status: "active",
    color: "bg-green-600",
    category: "Sales",
    href: "/deals",
  },
  {
    name: "Opportunities",
    icon: Target,
    count: 2,
    status: "active",
    color: "bg-teal-600",
    category: "Sales",
    href: "/opportunities",
  },
  {
    name: "Tasks",
    icon: ListChecks,
    count: 10,
    status: "active",
    color: "bg-yellow-600",
    category: "Productivity",
    href: "/tasks",
  },
  {
    name: "Reports",
    icon: PieChart,
    count: 2,
    status: "active",
    color: "bg-purple-600",
    category: "Analytics",
    href: "/reports",
  },
  {
    name: "Pipelines",
    icon: Filter,
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
    count: 8,
    status: "active",
    color: "bg-purple-500",
    category: "Marketing",
    href: "/marketing",
  },
  {
    name: "Sales",
    icon: DollarSign,
    count: 6,
    status: "active",
    color: "bg-green-500",
    category: "Sales",
    href: "/sales",
  },
  {
    name: "Email",
    icon: Mail,
    count: 12,
    status: "active",
    color: "bg-blue-500",
    category: "Communication",
    href: "/email",
  },
  {
    name: "Chat",
    icon: MessageSquare,
    count: 3,
    status: "active",
    color: "bg-emerald-500",
    category: "Communication",
    href: "/chat",
  },
  {
    name: "VoIP",
    icon: Phone,
    count: 2,
    status: "busy",
    color: "bg-orange-500",
    category: "Communication",
    href: "/voip",
  },
  {
    name: "Calendar",
    icon: Calendar,
    count: 5,
    status: "active",
    color: "bg-violet-500",
    category: "Productivity",
    href: "/calendar",
  },
  {
    name: "Automation",
    icon: Zap,
    count: 8,
    status: "active",
    color: "bg-amber-500",
    category: "Productivity",
    href: "/automation",
  },
  {
    name: "E-commerce",
    icon: ShoppingCart,
    count: 4,
    status: "active",
    color: "bg-rose-500",
    category: "Sales",
    href: "/ecommerce",
  },
  {
    name: "Support",
    icon: Headphones,
    count: 3,
    status: "active",
    color: "bg-sky-500",
    category: "Service",
    href: "/support",
  },
  {
    name: "Design",
    icon: Palette,
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
  addedItems?: Set<string>;
}

export default function RightAppsPanel({ apps: propApps, onAddApp, addedItems = new Set() }: RightAppsPanelProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'modules' | 'apps'>("modules");

  const toggleItem = (item: { name: string }) => {
    onAddApp?.(item);
  };

  const availableModules = modules.filter(module => !addedItems.has(module.name));
  const availableApps = propApps.filter(app => !addedItems.has(app.name));

  const filteredModules = availableModules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredApps = availableApps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      
      {/* Search Bar */}
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
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-4 flex flex-col min-h-0 h-full">
          <div className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1">
            {activeTab === "modules" ? (
              filteredModules.length > 0 ? (
                filteredModules.map((module) => (
                  <div
                    key={module.name}
                    className="bg-white rounded-lg shadow-sm border border-border/40 p-3 flex items-center justify-between hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-md flex items-center justify-center", module.color)}>
                        <module.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">{module.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs px-2"
                      onClick={() => toggleItem(module)}
                    >
                      {addedItems.has(module.name) ? 'Added' : 'Add'}
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  {searchTerm ? 'No matching modules found' : 'All modules have been added'}
                </div>
              )
            ) : filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <div
                  key={app.name}
                  className="bg-white rounded-lg shadow-sm border border-border/40 p-3 flex items-center justify-between hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-md flex items-center justify-center", app.color)}>
                      <app.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-sm">{app.name}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs px-2"
                    onClick={() => toggleItem(app)}
                  >
                    {addedItems.has(app.name) ? 'Added' : 'Add'}
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground text-sm">
                {searchTerm ? 'No matching apps found' : 'All apps have been added'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
