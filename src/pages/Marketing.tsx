import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  Mail,
  BarChart3,
  Plus,
  Play,
  Pause,
  Edit,
  Eye,
  TrendingUp,
  Target,
  MessageSquare,
  Send,
  Trash,
  MoreVertical,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const initialCampaigns = [
  {
    id: "C-001",
    name: "Q1 Product Launch",
    type: "Email",
    status: "active",
    sent: 15420,
    opened: 8934,
    clicked: 2145,
    scheduled: "2025-01-15",
    budget: "$5,000",
  },
  {
    id: "C-002",
    name: "Customer Retention",
    type: "Email",
    status: "draft",
    sent: 0,
    opened: 0,
    clicked: 0,
    scheduled: "2025-01-20",
    budget: "$3,500",
  },
];

export default function Marketing() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [form, setForm] = useState({
    name: "",
    type: "",
    audience: "",
    schedule: "",
    budget: "",
    subject: "",
    content: "",
    tracking: false,
    analytics: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [editCampaign, setEditCampaign] = useState(null);
  const [viewCampaign, setViewCampaign] = useState(null);
  const [deleteCampaign, setDeleteCampaign] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selected, setSelected] = useState({});
  const filteredCampaigns = campaigns.filter(c =>
    (!search || c.name.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatus === "all" || !filterStatus || c.status === filterStatus)
  );
  const allSelected = filteredCampaigns.length > 0 && filteredCampaigns.every(c => selected[c.id]);
  const toggleSelect = id => setSelected(sel => ({ ...sel, [id]: !sel[id] }));
  const toggleAll = () => {
    if (allSelected) {
      const newSel = { ...selected };
      filteredCampaigns.forEach(c => { newSel[c.id] = false; });
      setSelected(newSel);
    } else {
      const newSel = { ...selected };
      filteredCampaigns.forEach(c => { newSel[c.id] = true; });
      setSelected(newSel);
    }
  };

  const resetForm = () => setForm({
    name: "",
    type: "",
    audience: "",
    schedule: "",
    budget: "",
    subject: "",
    content: "",
    tracking: false,
    analytics: false,
  });

  const handleFormChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleScheduleCampaign = () => {
    const newId = `C-${(campaigns.length + 1).toString().padStart(3, "0")}`;
    setCampaigns([
      ...campaigns,
      {
        id: newId,
        name: form.name,
        type: form.type ? form.type.charAt(0).toUpperCase() + form.type.slice(1) : "Email",
        status: "active",
        sent: 0,
        opened: 0,
        clicked: 0,
        scheduled: form.schedule ? form.schedule.split("T")[0] : "",
        budget: form.budget ? `$${Number(form.budget).toLocaleString()}` : "$0",
      },
    ]);
    resetForm();
    setShowModal(false);
  };

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <MessageSquare className="w-8 h-8 text-primary" />
            <span>Marketing</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage marketing campaigns
          </p>
        </div>
      </div>

      {/* Modal for New Campaign */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Campaign</DialogTitle>
            <DialogDescription>
              Create a new marketing campaign with content editor and scheduling.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="Enter campaign name"
                  value={form.name}
                  onChange={e => handleFormChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="campaignType">Campaign Type</Label>
                <Select
                  value={form.type}
                  onValueChange={val => handleFormChange("type", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Marketing</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="sms">SMS Campaign</SelectItem>
                    <SelectItem value="push">Push Notifications</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select
                  value={form.audience}
                  onValueChange={val => handleFormChange("audience", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="customers">Existing Customers</SelectItem>
                    <SelectItem value="prospects">Prospects</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="scheduleDate">Schedule Date</Label>
                <Input
                  id="scheduleDate"
                  type="datetime-local"
                  value={form.schedule}
                  onChange={e => handleFormChange("schedule", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  placeholder="$0.00"
                  type="number"
                  value={form.budget}
                  onChange={e => handleFormChange("budget", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  value={form.subject}
                  onChange={e => handleFormChange("subject", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="content">Content Editor</Label>
                <Textarea
                  id="content"
                  placeholder="Write your campaign content here..."
                  rows={8}
                  value={form.content}
                  onChange={e => handleFormChange("content", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="tracking"
                  checked={form.tracking}
                  onChange={e => handleFormChange("tracking", e.target.checked)}
                />
                <Label htmlFor="tracking">Enable click tracking</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="analytics"
                  checked={form.analytics}
                  onChange={e => handleFormChange("analytics", e.target.checked)}
                />
                <Label htmlFor="analytics">Enable detailed analytics</Label>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={resetForm}>Reset</Button>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleScheduleCampaign} disabled={!form.name || !form.type || !form.audience || !form.schedule}>
              <Send className="w-4 h-4 mr-2" />
              Schedule Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal for Analytics */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Analytics</DialogTitle>
            <DialogDescription>
              View marketing campaign performance and audience engagement.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-border/50 rounded bg-background">
              <div className="p-4">
                <h3 className="font-semibold mb-1">Campaign Performance</h3>
                <p className="text-sm text-muted-foreground mb-2">Track campaign effectiveness over time</p>
                <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                  <svg width="90%" height="80%" viewBox="0 0 300 120">
                    <polyline
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3"
                      points="0,100 40,80 80,60 120,70 160,40 200,50 240,30 280,40"
                    />
                    <circle cx="0" cy="100" r="4" fill="#6366f1" />
                    <circle cx="40" cy="80" r="4" fill="#6366f1" />
                    <circle cx="80" cy="60" r="4" fill="#6366f1" />
                    <circle cx="120" cy="70" r="4" fill="#6366f1" />
                    <circle cx="160" cy="40" r="4" fill="#6366f1" />
                    <circle cx="200" cy="50" r="4" fill="#6366f1" />
                    <circle cx="240" cy="30" r="4" fill="#6366f1" />
                    <circle cx="280" cy="40" r="4" fill="#6366f1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="border border-border/50 rounded bg-background">
              <div className="p-4">
                <h3 className="font-semibold mb-1">Audience Engagement</h3>
                <p className="text-sm text-muted-foreground mb-2">Breakdown of user interactions</p>
                <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle r="50" cx="60" cy="60" fill="#e5e7eb" />
                    <path d="M60 60 L60 10 A50 50 0 0 1 110 60 Z" fill="#6366f1" />
                    <path d="M60 60 L110 60 A50 50 0 0 1 60 110 Z" fill="#22d3ee" />
                    <path d="M60 60 L60 110 A50 50 0 0 1 10 60 Z" fill="#f59e42" />
                    <path d="M60 60 L10 60 A50 50 0 0 1 60 10 Z" fill="#a3e635" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Modal */}
      <Dialog open={!!editCampaign} onOpenChange={val => { if (!val) setEditCampaign(null); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update the details of your marketing campaign.
            </DialogDescription>
          </DialogHeader>
          {editCampaign && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editCampaignName">Campaign Name</Label>
                  <Input
                    id="editCampaignName"
                    value={editCampaign.name}
                    onChange={e => setEditCampaign({ ...editCampaign, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="editCampaignType">Campaign Type</Label>
                  <Select
                    value={editCampaign.type.toLowerCase()}
                    onValueChange={val => setEditCampaign({ ...editCampaign, type: val.charAt(0).toUpperCase() + val.slice(1) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Marketing</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="sms">SMS Campaign</SelectItem>
                      <SelectItem value="push">Push Notifications</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editScheduleDate">Schedule Date</Label>
                  <Input
                    id="editScheduleDate"
                    type="datetime-local"
                    value={editCampaign.scheduled}
                    onChange={e => setEditCampaign({ ...editCampaign, scheduled: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="editBudget">Budget</Label>
                  <Input
                    id="editBudget"
                    type="number"
                    value={editCampaign.budget.replace(/[^\d.]/g, "")}
                    onChange={e => setEditCampaign({ ...editCampaign, budget: `$${Number(e.target.value).toLocaleString()}` })}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editSubject">Subject Line</Label>
                  <Input
                    id="editSubject"
                    value={editCampaign.subject || ""}
                    onChange={e => setEditCampaign({ ...editCampaign, subject: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="editContent">Content Editor</Label>
                  <Textarea
                    id="editContent"
                    rows={8}
                    value={editCampaign.content || ""}
                    onChange={e => setEditCampaign({ ...editCampaign, content: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={() => setEditCampaign(null)}>Cancel</Button>
            <Button
              onClick={() => {
                setCampaigns(campaigns.map(c => c.id === editCampaign.id ? { ...c, ...editCampaign } : c));
                setEditCampaign(null);
              }}
              disabled={!editCampaign || !editCampaign.name || !editCampaign.type || !editCampaign.scheduled}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Campaign Modal */}
      <Dialog open={!!viewCampaign} onOpenChange={val => { if (!val) setViewCampaign(null); }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
            <DialogDescription>View all details of this campaign.</DialogDescription>
          </DialogHeader>
          {viewCampaign && (
            <div className="space-y-4">
              <div><b>Name:</b> {viewCampaign.name}</div>
              <div><b>Type:</b> {viewCampaign.type}</div>
              <div><b>Status:</b> {viewCampaign.status}</div>
              <div><b>Scheduled:</b> {viewCampaign.scheduled}</div>
              <div><b>Budget:</b> {viewCampaign.budget}</div>
              <div><b>Subject:</b> {viewCampaign.subject || "-"}</div>
              <div><b>Content:</b> <div className="whitespace-pre-line border rounded p-2 bg-muted/50">{viewCampaign.content || "-"}</div></div>
              <div className="flex space-x-4">
                <div><b>Sent:</b> {viewCampaign.sent}</div>
                <div><b>Opened:</b> {viewCampaign.opened}</div>
                <div><b>Clicked:</b> {viewCampaign.clicked}</div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-end pt-6 border-t">
            <Button variant="outline" onClick={() => setViewCampaign(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Campaign Modal */}
      <Dialog open={!!deleteCampaign} onOpenChange={val => { if (!val) setDeleteCampaign(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the campaign "{deleteCampaign?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end pt-6 border-t">
            <Button variant="outline" onClick={() => setDeleteCampaign(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                setCampaigns(campaigns.filter(c => c.id !== deleteCampaign.id));
                setDeleteCampaign(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Marketing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Active Campaigns", value: "12", icon: Target },
          { title: "Total Reach", value: "45.2K", icon: Users },
          { title: "Engagement Rate", value: "18.7%", icon: TrendingUp },
          { title: "Conversion Rate", value: "4.2%", icon: BarChart3 },
        ].map((metric) => (
          <Card key={metric.title} className="border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {metric.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign Directory Section (New UI) */}
      <Card className="border border-border/50 mt-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Campaign Directory</CardTitle>
              <CardDescription>Manage your marketing campaigns and performance</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowAnalytics(true)}>
                <BarChart3 className="w-4 h-4 mr-2" /> Analytics
              </Button>
              <Button onClick={() => setShowModal(true)}>
                <Plus className="w-4 h-4 mr-2" /> Add Campaign
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="shrink-0">Filter</Button>
              <Input
                placeholder="Search campaigns..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full md:w-64"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><input type="checkbox" checked={allSelected} onChange={toggleAll} /></TableHead>
                <TableHead>#</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Opened</TableHead>
                <TableHead>Clicked</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign, idx) => (
                <TableRow key={campaign.id}>
                  <TableCell><input type="checkbox" checked={selected[campaign.id] || false} onChange={() => toggleSelect(campaign.id)} /></TableCell>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{campaign.id}</TableCell>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell><Badge variant="outline">{campaign.type}</Badge></TableCell>
                  <TableCell><Badge className={campaign.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>{campaign.status}</Badge></TableCell>
                  <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                  <TableCell>{campaign.opened.toLocaleString()}</TableCell>
                  <TableCell>{campaign.clicked.toLocaleString()}</TableCell>
                  <TableCell>{campaign.scheduled}</TableCell>
                  <TableCell>{campaign.budget}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewCampaign(campaign)}>
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditCampaign(campaign)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        {campaign.status === "active" ? (
                          <DropdownMenuItem>
                            <Pause className="w-4 h-4 mr-2" /> Pause
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" /> Start
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => setDeleteCampaign(campaign)} className="text-red-600">
                          <Trash className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCampaigns.length === 0 && (
            <div className="text-center text-muted-foreground py-8">No campaigns found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
