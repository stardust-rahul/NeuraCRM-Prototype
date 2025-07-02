import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Palette,
  Key,
  Users,
  Database,
  Globe,
  Lock,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

const users = [
  {
    id: "U-001",
    name: "John Doe",
    email: "john@company.com",
    role: "Admin",
    status: "active",
    lastLogin: "2 hours ago",
  },
  {
    id: "U-002",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Sales Manager",
    status: "active",
    lastLogin: "1 day ago",
  },
  {
    id: "U-003",
    name: "Mike Chen",
    email: "mike@company.com",
    role: "Sales Rep",
    status: "inactive",
    lastLogin: "3 days ago",
  },
];

const apiKeys = [
  {
    id: "API-001",
    name: "Production API Key",
    key: "sk-1234*********************",
    permissions: ["read", "write"],
    created: "2024-12-01",
    lastUsed: "2 hours ago",
  },
  {
    id: "API-002",
    name: "Development API Key",
    key: "sk-5678*********************",
    permissions: ["read"],
    created: "2024-11-15",
    lastUsed: "1 week ago",
  },
];

const presetColors = [
  { value: "blue", label: "Blue", hex: "#3b82f6" },
  { value: "purple", label: "Purple", hex: "#a21caf" },
  { value: "green", label: "Green", hex: "#22c55e" },
  { value: "orange", label: "Orange", hex: "#f59e42" },
  { value: "custom", label: "Custom", hex: "" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("user");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("blue");
  const [customColor, setCustomColor] = useState("#3b82f6");
  const [fontSize, setFontSize] = useState("medium");
  const [sidebarBg, setSidebarBg] = useState("#1e293b");
  const [sidebarIconColor, setSidebarIconColor] = useState("#94a3b8");
  const [screenRatio, setScreenRatio] = useState("85");
  const [isCompactView, setIsCompactView] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (primaryColor === "custom") {
      document.documentElement.style.setProperty("--primary", customColor);
    } else {
      const preset = presetColors.find((c) => c.value === primaryColor);
      document.documentElement.style.setProperty("--primary", preset?.hex || "#3b82f6");
    }
  }, [primaryColor, customColor]);

  useEffect(() => {
    let size = "16px";
    if (fontSize === "small") size = "14px";
    if (fontSize === "large") size = "18px";
    document.documentElement.style.setProperty("--font-size-base", size);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-bg", sidebarBg);
  }, [sidebarBg]);

  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-icon-color", sidebarIconColor);
  }, [sidebarIconColor]);

  useEffect(() => {
    // Convert percentage to decimal scale factor
    const scaleFactor = parseInt(screenRatio) / 100;
    
    // Apply proportional scaling to different aspects
    document.documentElement.style.setProperty("--font-scale", scaleFactor.toString());
    document.documentElement.style.setProperty("--spacing-scale", scaleFactor.toString());
    document.documentElement.style.setProperty("--icon-scale", scaleFactor.toString());
    document.documentElement.style.setProperty("--element-scale", scaleFactor.toString());
  }, [screenRatio]);

  useEffect(() => {
    // Apply compact view settings
    const compactMultiplier = isCompactView ? 0.75 : 1;
    document.documentElement.style.setProperty("--compact-scale", compactMultiplier.toString());
    
    // Apply compact view class to body for global styling
    if (isCompactView) {
      document.body.classList.add("compact-view");
    } else {
      document.body.classList.remove("compact-view");
    }
  }, [isCompactView]);

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <span>Settings</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and system preferences
          </p>
        </div>
      </div>

      {/* Settings Modules */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="user">User Settings</TabsTrigger>
          <TabsTrigger value="admin">Admin Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* User Settings */}
        <TabsContent value="user" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">JD</span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@company.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">
                        Pacific Standard Time (PST)
                      </SelectItem>
                      <SelectItem value="est">
                        Eastern Standard Time (EST)
                      </SelectItem>
                      <SelectItem value="cst">
                        Central Standard Time (CST)
                      </SelectItem>
                      <SelectItem value="mst">
                        Mountain Standard Time (MST)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Change Password</span>
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Password requirements:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>At least 8 characters long</li>
                    <li>Contains uppercase and lowercase letters</li>
                    <li>Contains at least one number</li>
                    <li>Contains at least one special character</li>
                  </ul>
                </div>

                <Button>Update Password</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Admin Settings */}
        <TabsContent value="admin" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>User Management</span>
                </CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Team Members</h4>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Invite User
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              user.status === "active" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>API Keys</span>
                </CardTitle>
                <CardDescription>
                  Manage API keys for system integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">API Keys</h4>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Generate Key
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {apiKeys.map((apiKey) => (
                      <div
                        key={apiKey.id}
                        className="p-3 rounded-lg border border-border/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-sm">{apiKey.name}</h5>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setShowApiKey(
                                  showApiKey === apiKey.id ? null : apiKey.id,
                                )
                              }
                            >
                              {showApiKey === apiKey.id ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs font-mono bg-muted p-2 rounded">
                          {showApiKey === apiKey.id
                            ? "sk-1234567890abcdef1234567890abcdef"
                            : apiKey.key}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <span>Created: {apiKey.created}</span>
                          <span>Last used: {apiKey.lastUsed}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: "Email Notifications",
                  description: "Receive notifications via email",
                  options: [
                    "New leads assigned to me",
                    "Deal status updates",
                    "Weekly summary reports",
                    "System maintenance alerts",
                  ],
                },
                {
                  title: "Push Notifications",
                  description: "Receive browser push notifications",
                  options: [
                    "Real-time chat messages",
                    "Task reminders",
                    "Meeting reminders",
                    "Urgent system alerts",
                  ],
                },
                {
                  title: "SMS Notifications",
                  description: "Receive notifications via SMS",
                  options: [
                    "High-priority leads",
                    "Deal closures",
                    "Emergency alerts",
                  ],
                },
              ].map((section) => (
                <div key={section.title} className="space-y-4">
                  <div>
                    <h4 className="font-medium">{section.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {section.options.map((option) => (
                      <div
                        key={option}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{option}</span>
                        <Switch />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="appearance-settings-card border border-border/50 w-full max-w-none">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Appearance Settings</span>
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Theme</h4>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant={!isDarkMode ? "default" : "outline"}
                      onClick={() => setIsDarkMode(false)}
                    >
                      Light Mode
                    </Button>
                    <Button
                      variant={isDarkMode ? "default" : "outline"}
                      onClick={() => setIsDarkMode(true)}
                    >
                      Dark Mode
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Select value={primaryColor} onValueChange={setPrimaryColor}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {presetColors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {primaryColor === "custom" && (
                    <div className="mt-2 flex items-center space-x-2">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="w-8 h-8 border rounded"
                        aria-label="Pick custom color"
                      />
                      <span className="text-xs">{customColor}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="screenRatio">Screen Zoom</Label>
                  <Select value={screenRatio} onValueChange={setScreenRatio}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50% - Compact</SelectItem>
                      <SelectItem value="70">70% - Small</SelectItem>
                      <SelectItem value="85">85% - Default</SelectItem>
                      <SelectItem value="100">100% - Standard</SelectItem>
                      <SelectItem value="115">115% - Medium Large</SelectItem>
                      <SelectItem value="135">135% - Large</SelectItem>
                      <SelectItem value="150">150% - Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Adjust the overall size of the interface elements
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact View</p>
                    <p className="text-sm text-muted-foreground">
                      Reduce spacing for more content
                    </p>
                  </div>
                  <Switch 
                    checked={isCompactView}
                    onCheckedChange={setIsCompactView}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-collapse Sidebar</p>
                    <p className="text-sm text-muted-foreground">
                      Sidebar collapses automatically on small screens
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                {/* Sidebar Appearance Settings */}
                <div>
                  <Label htmlFor="sidebarBg">Sidebar Background</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="color"
                      id="sidebarBg"
                      value={sidebarBg}
                      onChange={e => setSidebarBg(e.target.value)}
                      className="w-8 h-8 border rounded"
                      aria-label="Pick sidebar background color"
                    />
                    <span className="text-xs">{sidebarBg}</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="sidebarIconColor">Sidebar Icon Color</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="color"
                      id="sidebarIconColor"
                      value={sidebarIconColor}
                      onChange={e => setSidebarIconColor(e.target.value)}
                      className="w-8 h-8 border rounded"
                      aria-label="Pick sidebar icon color"
                    />
                    <span className="text-xs">{sidebarIconColor}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your account security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified of new login attempts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-muted-foreground">
                      Auto-logout after inactivity
                    </p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15m</SelectItem>
                      <SelectItem value="30">30m</SelectItem>
                      <SelectItem value="60">1h</SelectItem>
                      <SelectItem value="120">2h</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  View Login History
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Data & Privacy</span>
                </CardTitle>
                <CardDescription>
                  Control your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Export</p>
                    <p className="text-sm text-muted-foreground">
                      Download your data
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Tracking</p>
                    <p className="text-sm text-muted-foreground">
                      Help improve our service
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Communications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive product updates
                    </p>
                  </div>
                  <Switch />
                </div>

                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
