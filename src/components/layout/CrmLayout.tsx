import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LeftNavbar from "./LeftNavbar";
import RightAppsPanel from "./RightAppsPanel";
import AIAssistantPanel from "./AIAssistantPanel";
import { Bot, Menu, X, Grid3X3, Target, LayoutDashboard, FileText } from "lucide-react";
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

const MODULE_NAMES = [
  "Leads",
  "Contacts",
  "Accounts",
  "Deals",
  "Opportunities",
  "Tasks",
  "Reports",
  "Pipelines"
];
const APP_NAMES = [
  "Dashboard",
  "Sales",
  "Marketing",
  // "Email",
  // "Chat",
  // "VoIP"
];
const initialApps = [
  { name: "Leads", icon: TrendingUp, description: "Manage potential customers", href: "/leads", count: 7, status: "active", color: "bg-blue-600", type: "module" },
  { name: "Deals", icon: BarChart2, description: "Track sales opportunities", href: "/deals", count: 4, status: "active", color: "bg-green-600", type: "module" },
  { name: "Tasks", icon: ListChecks, description: "Organize your to-dos", href: "/tasks", count: 10, status: "active", color: "bg-yellow-600", type: "module" },
  { name: "Reports", icon: BarChart2, description: "View analytics & insights", href: "/reports", count: 2, status: "active", color: "bg-purple-600", type: "module" },
  { name: "Pipelines", icon: ListChecks, description: "Visualize sales stages", href: "/pipelines", count: 3, status: "active", color: "bg-pink-600", type: "module" },
  { name: "Contacts", icon: Users, description: "All your contacts", href: "/contacts", count: 12, status: "active", color: "bg-indigo-600", type: "module" },
  { name: "Accounts", icon: Building2, description: "Manage accounts", href: "/accounts", count: 5, status: "active", color: "bg-cyan-600", type: "module" },
  { name: "Products", icon: Building2, description: "Manage accounts", href: "/products", count: 6, status: "active", color: "bg-cyan-600", type: "module" },
  { name: "Analytics", icon: Building2, description: "Manage accounts", href: "/analytics", count: 7, status: "active", color: "bg-cyan-600", type: "module" },
  { name: "Cases", icon: Building2, description: "Manage accounts", href: "/cases", count: 8, status: "active", color: "bg-cyan-600", type: "module" },
  { name: "Calls", icon: Building2, description: "Manage accounts", href: "/call", count: 8, status: "active", color: "bg-cyan-300", type: "module" },
  { name: "Campaigns", icon: Building2, description: "Manage accounts", href: "/campaigns", count: 14, status: "active", color: "bg-cyan-600", type: "module" },
  { name: "Opportunities", icon: Target, description: "Manage your sales pipeline", href: "/opportunities", count: 2, status: "active", color: "bg-teal-600", type: "module" },
  { name: "Email", icon: Mail, description: "Unified inbox", href: "/email", count: 12, status: "active", color: "bg-blue-500", type: "app" },
  { name: "Finance", icon: MessageSquare, description: "Team messaging", href: "/chat", count: 3, status: "active", color: "bg-green-500", type: "app" },
  { name: "Service", icon: Phone, description: "service", href: "/service", count: 32, status: "busy", color: "bg-orange-500", type: "app" },
  { name: "Legal", icon: Phone, description: "Business calls", href: "/voip", count: 2, status: "busy", color: "bg-orange-500", type: "app" },
  { name: "Quotes", icon: FileText, description: "Manage sales quotes", href: "/quotes", count: 2, status: "active", color: "bg-orange-600", type: "module" },
];

// Define all possible apps in one place
const baseApps = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Main dashboard", color: "bg-gray-600", count: 0, status: "active", type: "app" },
  { name: "Sales", href: "/sales", icon: TrendingUp, description: "Sales pipeline", color: "bg-blue-700", count: 0, status: "active", type: "app" },
  { name: "Marketing", href: "/marketing", icon: BarChart2, description: "Marketing campaigns", color: "bg-pink-700", count: 0, status: "active", type: "app" },
  { name: "Settings", href: "/settings", icon: Zap, description: "App settings", color: "bg-gray-400", count: 0, status: "active", type: "module" },
];

const allApps = [
    ...baseApps,
    ...initialApps.filter(initialApp => !baseApps.some(app => app.name === initialApp.name))
];

export default function CrmLayout() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(true);
  // Start with the default visible apps
  const [visibleApps, setVisibleApps] = useState<string[]>(() => {
    // Try to load from localStorage and clean up any legacy/incorrect entries
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('visibleApps');
      let arr = saved ? JSON.parse(saved) : [
        "Dashboard",
        "Sales",
        "Marketing",
        "Accounts",
        "Settings",
      ];
      // Remove any modules not in MODULE_NAMES, and only allow correct apps
      arr = arr.filter(
        name => MODULE_NAMES.includes(name) || APP_NAMES.includes(name) || name === "Settings"
      );
      // Add any missing required base apps/modules (for first run)
      APP_NAMES.concat(["Settings"]).forEach(name => {
        if (!arr.includes(name)) arr.unshift(name);
      });
      // Remove duplicates
      arr = Array.from(new Set(arr));
      localStorage.setItem('visibleApps', JSON.stringify(arr));
      return arr;
    }
    return [
      "Dashboard",
      "Sales",
      "Marketing",
      "Accounts",
      "Settings",
    ];
  });

  // Track added items for RightAppsPanel
  const [addedItems, setAddedItems] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('addedItems');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  // Sync addedItems with visibleApps (except Settings)
  useEffect(() => {
    const newAddedItems = new Set(addedItems);
    const currentApps = new Set(visibleApps.filter(app => app !== 'Settings'));
    
    // Remove items that are no longer in visibleApps
    Array.from(addedItems).forEach(item => {
      if (!currentApps.has(item) && item !== 'Settings') {
        newAddedItems.delete(item);
      }
    });
    
    // Add new items from visibleApps
    currentApps.forEach(app => {
      newAddedItems.add(app);
    });

    if (JSON.stringify(Array.from(newAddedItems)) !== JSON.stringify(Array.from(addedItems))) {
      setAddedItems(newAddedItems);
      localStorage.setItem('addedItems', JSON.stringify(Array.from(newAddedItems)));
    }
  }, [visibleApps]);

  // Compute available apps as those not in visibleApps (except Settings)
  const availableApps = allApps.filter(
    (app) => !visibleApps.includes(app.name) && app.name !== "Settings"
  );

  // For RightAppsPanel, filter allApps into apps and modules
  const rightPanelApps = allApps.filter(app => app.type === "app");
  const rightPanelModules = allApps.filter(app => app.type === "module" && app.name !== "Settings");

  // For LeftNavbar, pass the app objects for visibleApps
  const visibleAppObjects = visibleApps
    .map((name) => allApps.find((app) => app.name === name))
    .filter((app): app is typeof allApps[number] => Boolean(app));

  const addAppToNavbar = (app) => {
    if (!visibleApps.includes(app.name)) {
      setVisibleApps([...visibleApps, app.name]);
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.add(app.name);
        localStorage.setItem('addedItems', JSON.stringify(Array.from(newSet)));
        return newSet;
      });
    }
  };

  const removeAppFromNavbar = (name) => {
    if (name === "Settings") return;
    if (visibleApps.includes(name)) {
      setVisibleApps(visibleApps.filter((n) => n !== name));
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(name);
        localStorage.setItem('addedItems', JSON.stringify(Array.from(newSet)));
        return newSet;
      });
    }
  };

  return (
    <>
      {/* Fixed Left Sidebar */}
      <div className="hidden lg:block">
        <div className="fixed left-0 top-0 h-screen z-30 transition-all duration-300"
             style={{ width: 'var(--sidebar-width, 4rem)' }} // fallback to 16 (w-16)
             id="fixed-left-navbar-wrapper">
          <LeftNavbar navigation={visibleAppObjects} onDelete={removeAppFromNavbar} />
        </div>
      </div>

      {/* Fixed Right Sidebar */}
      {isAppsOpen && (
        <div className="hidden xl:block">
          <div className="fixed right-0 top-0 h-screen z-30 w-80 border-l border-border bg-card"
               id="fixed-right-apps-panel-wrapper">
            <RightAppsPanel 
              apps={rightPanelApps}
              modules={rightPanelModules}
              onAddApp={addAppToNavbar}
              addedItems={addedItems}
            />
          </div>
        </div>
      )}

      {/* Main Content Area with margins for fixed sidebars */}
      <main
        className="flex-1 flex flex-col min-w-0"
        style={{
          marginLeft: 'var(--sidebar-width, 4rem)', // 4rem = 64px = w-16
          marginRight: isAppsOpen ? '20rem' : 0 // 20rem = 320px = w-80
        }}
      >
        <Outlet />
      </main>

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
    </>
  );
}
