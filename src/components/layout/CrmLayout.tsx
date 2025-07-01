import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import LeftNavbar from "./LeftNavbar";
import RightAppsPanel from "./RightAppsPanel";
import AIAssistantPanel from "./AIAssistantPanel";
import { Bot, Menu, X, Grid3X3, Target, LayoutDashboard } from "lucide-react";
import {
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Zap,
  Users,
  Building2,
  TrendingUp,
  ListChecks,
  BarChart2,
} from "lucide-react";
import { LeadsProvider } from "@/context/LeadsContext";

interface CrmLayoutProps {
  children: ReactNode;
}

const initialApps = [
  {
    name: "Leads",
    icon: TrendingUp,
    description: "Manage potential customers",
    href: "/leads",
    count: 7,
    status: "active",
    color: "bg-blue-600",
  },
  {
    name: "Deals",
    icon: BarChart2,
    description: "Track sales opportunities",
    href: "/deals",
    count: 4,
    status: "active",
    color: "bg-green-600",
  },
  {
    name: "Tasks",
    icon: ListChecks,
    description: "Organize your to-dos",
    href: "/tasks",
    count: 10,
    status: "active",
    color: "bg-yellow-600",
  },
  {
    name: "Reports",
    icon: BarChart2,
    description: "View analytics & insights",
    href: "/reports",
    count: 2,
    status: "active",
    color: "bg-purple-600",
  },
  {
    name: "Pipelines",
    icon: ListChecks,
    description: "Visualize sales stages",
    href: "/pipelines",
    count: 3,
    status: "active",
    color: "bg-pink-600",
  },
  {
    name: "Contacts",
    icon: Users,
    description: "All your contacts",
    href: "/contacts",
    count: 12,
    status: "active",
    color: "bg-indigo-600",
  },
  {
    name: "Email",
    icon: Mail,
    description: "Unified inbox",
    href: "/email",
    count: 12,
    status: "active",
    color: "bg-blue-500",
  },
  {
    name: "Chat",
    icon: MessageSquare,
    description: "Team messaging",
    href: "/chat",
    count: 3,
    status: "active",
    color: "bg-green-500",
  },
  {
    name: "VoIP",
    icon: Phone,
    description: "Business calls",
    href: "/voip",
    count: 2,
    status: "busy",
    color: "bg-orange-500",
  },
  {
    name: "Calendar",
    icon: Calendar,
    description: "Schedule events",
    href: "/calendar",
    count: 5,
    status: "active",
    color: "bg-purple-500",
  },
  {
    name: "Automation",
    icon: Zap,
    description: "Workflow engine",
    href: "/automation",
    count: 8,
    status: "active",
    color: "bg-yellow-500",
  },
  {
    name: "Opportunities",
    icon: Target,
    description: "Manage your sales pipeline",
    href: "/opportunities",
    count: 2,
    status: "active",
    color: "bg-teal-600",
  },
];

// Define all possible apps in one place
const allApps = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Main dashboard", color: "bg-gray-600", count: 0, status: "active" },
  { name: "Sales", href: "/sales", icon: TrendingUp, description: "Sales pipeline", color: "bg-blue-700", count: 0, status: "active" },
  { name: "Marketing", href: "/marketing", icon: BarChart2, description: "Marketing campaigns", color: "bg-pink-700", count: 0, status: "active" },
  { name: "Accounts", href: "/accounts", icon: Building2, description: "Manage accounts", color: "bg-cyan-600", count: 0, status: "active" },
  { name: "Settings", href: "/settings", icon: Zap, description: "App settings", color: "bg-gray-400", count: 0, status: "active" },
  { name: "Opportunities", href: "/opportunities", icon: Target, description: "Manage your sales pipeline", color: "bg-teal-600", count: 2, status: "active" },
  // All initialApps (excluding duplicates)
  ...initialApps.filter(app => !["Dashboard", "Sales", "Marketing", "Accounts", "Settings", "Opportunities"].includes(app.name)),
];

export default function CrmLayout({ children }: CrmLayoutProps) {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(true);
  // Start with the default visible apps
  const [visibleApps, setVisibleApps] = useState([
    "Dashboard",
    "Sales",
    "Marketing",
    "Accounts",
    "Settings",
  ]);

  // Compute available apps as those not in visibleApps (except Settings)
  const availableApps = allApps.filter(
    (app) => !visibleApps.includes(app.name) && app.name !== "Settings"
  );

  // For LeftNavbar, pass the app objects for visibleApps
  const visibleAppObjects = visibleApps
    .map((name) => allApps.find((app) => app.name === name))
    .filter(Boolean);

  const addAppToNavbar = (app) => {
    if (!visibleApps.includes(app.name)) {
      setVisibleApps([...visibleApps, app.name]);
    }
  };

  const removeAppFromNavbar = (name) => {
    if (name === "Settings") return;
    if (visibleApps.includes(name)) {
      setVisibleApps(visibleApps.filter((n) => n !== name));
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <LeftNavbar navigation={visibleAppObjects} onDelete={removeAppFromNavbar} />
          </div>
        </div>
      )}

      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <LeftNavbar navigation={visibleAppObjects} onDelete={removeAppFromNavbar} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar for Mobile */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">NeuraCRM</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAppsOpen(!isAppsOpen)}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAIOpen(!isAIOpen)}
            >
              <Bot className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* AI Assistant Panel */}
          <AIAssistantPanel
            isOpen={isAIOpen}
            onClose={() => setIsAIOpen(false)}
          />
        </div>
      </main>

      {/* Right Apps Panel - Hidden on tablets and mobile */}
      {isAppsOpen && (
        <div className="hidden xl:block">
          <RightAppsPanel apps={availableApps} onAddApp={addAppToNavbar} />
        </div>
      )}

      {/* Toggle Buttons for Desktop */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          <Button
            onClick={() => setIsAppsOpen(!isAppsOpen)}
            className="rounded-full w-12 h-12 shadow-lg"
            size="icon"
            variant={isAppsOpen ? "default" : "outline"}
          >
            <Grid3X3 className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setIsAIOpen(!isAIOpen)}
            className="rounded-full w-12 h-12 shadow-lg"
            size="icon"
            variant={isAIOpen ? "default" : "outline"}
          >
            <Bot className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
