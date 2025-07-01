import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  MessageSquare,
  DollarSign,
  Wrench,
  RotateCcw,
  Search,
  Filter,
} from "lucide-react";

interface AssessmentItem {
  id: string;
  workflowId: string;
  customerName: string;
  deviceType: string;
  deviceModel: string;
  issueDescription: string;
  priority: "urgent" | "high" | "medium" | "low";
  submittedAt: string;
  estimatedValue: number;
  status: "pending" | "in-review" | "quoted" | "approved" | "rejected";
  assignedTo?: string;
  notes?: string;
  photos?: string[];
}

interface DecisionModal {
  isOpen: boolean;
  type: "condition" | "quote" | "repair" | "return";
  item: AssessmentItem | null;
}

const assessmentQueue: AssessmentItem[] = [
  {
    id: "ASS-001",
    workflowId: "WF-2024-001",
    customerName: "John Smith",
    deviceType: "Smartphone",
    deviceModel: "iPhone 14 Pro",
    issueDescription:
      "Cracked screen, touch not responsive in top-right corner",
    priority: "high",
    submittedAt: "2024-01-15T09:30:00Z",
    estimatedValue: 180,
    status: "pending",
    photos: ["photo1.jpg", "photo2.jpg"],
  },
  {
    id: "ASS-002",
    workflowId: "WF-2024-002",
    customerName: "Sarah Johnson",
    deviceType: "Laptop",
    deviceModel: "MacBook Pro 16-inch",
    issueDescription: "Battery not charging, system randomly shutting down",
    priority: "medium",
    submittedAt: "2024-01-15T08:15:00Z",
    estimatedValue: 220,
    status: "in-review",
    assignedTo: "Mike Chen",
    notes: "Battery swelling detected, needs immediate attention",
  },
  {
    id: "ASS-003",
    workflowId: "WF-2024-003",
    customerName: "Tech Solutions Inc",
    deviceType: "Smartphone",
    deviceModel: "Samsung Galaxy S23",
    issueDescription: "Water damage after accidental drop in pool",
    priority: "urgent",
    submittedAt: "2024-01-15T07:00:00Z",
    estimatedValue: 320,
    status: "quoted",
    assignedTo: "Emily Davis",
    notes: "Extensive water damage, motherboard affected",
  },
];

const technicians = [
  "Mike Chen",
  "Emily Davis",
  "John Doe",
  "Lisa Wong",
  "Sarah Kim",
];

export default function Assessment() {
  const [items, setItems] = useState<AssessmentItem[]>(assessmentQueue);
  const [selectedItem, setSelectedItem] = useState<AssessmentItem | null>(null);
  const [decisionModal, setDecisionModal] = useState<DecisionModal>({
    isOpen: false,
    type: "condition",
    item: null,
  });
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleDecision = (
    item: AssessmentItem,
    decision: string,
    notes?: string,
  ) => {
    // Update item status based on decision
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? {
              ...i,
              status: decision as any,
              notes: notes || i.notes,
            }
          : i,
      ),
    );
    setDecisionModal({ isOpen: false, type: "condition", item: null });
  };

  const openDecisionModal = (
    type: DecisionModal["type"],
    item: AssessmentItem,
  ) => {
    setDecisionModal({ isOpen: true, type, item });
  };

  const filteredItems = items.filter(
    (item) => filterStatus === "all" || item.status === filterStatus,
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "in-review":
        return "bg-blue-100 text-blue-800";
      case "quoted":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/workflow">Workflow</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Assessment</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-primary" />
            <span>Device Assessment</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Evaluate device condition and generate repair quotes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Pending Assessment",
            count: items.filter((i) => i.status === "pending").length,
            icon: Clock,
            color: "text-yellow-600",
          },
          {
            title: "In Review",
            count: items.filter((i) => i.status === "in-review").length,
            icon: Eye,
            color: "text-blue-600",
          },
          {
            title: "Quotes Sent",
            count: items.filter((i) => i.status === "quoted").length,
            icon: DollarSign,
            color: "text-purple-600",
          },
          {
            title: "Approved",
            count: items.filter((i) => i.status === "approved").length,
            icon: CheckCircle,
            color: "text-green-600",
          },
        ].map((stat) => (
          <Card key={stat.title} className="border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.count}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assessment Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Assessment Queue</CardTitle>
              <CardDescription>
                Devices waiting for evaluation and quotes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="outline"
                        className={getPriorityColor(item.priority)}
                      >
                        {item.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {item.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDecisionModal("condition", item)}
                        >
                          Start Assessment
                        </Button>
                      )}
                      {item.status === "in-review" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDecisionModal("quote", item)}
                        >
                          Generate Quote
                        </Button>
                      )}
                      {item.status === "quoted" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDecisionModal("repair", item)}
                        >
                          Process Decision
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.deviceType} • {item.deviceModel}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        ID: {item.workflowId}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Est. Value: ${item.estimatedValue}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {item.issueDescription}
                  </p>

                  {item.assignedTo && (
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>Assigned to:</span>
                      <Badge variant="secondary">{item.assignedTo}</Badge>
                    </div>
                  )}

                  {item.notes && (
                    <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                      <span className="font-medium">Notes:</span> {item.notes}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {selectedItem && (
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Assessment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Device Information
                  </h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Type: {selectedItem.deviceType}</p>
                    <p>Model: {selectedItem.deviceModel}</p>
                    <p>Customer: {selectedItem.customerName}</p>
                    <p>Workflow ID: {selectedItem.workflowId}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Issue Description
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.issueDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Assessment Progress
                  </h4>
                  <div className="space-y-2">
                    {[
                      { stage: "Initial Review", completed: true },
                      {
                        stage: "Condition Check",
                        completed: selectedItem.status !== "pending",
                      },
                      {
                        stage: "Quote Generation",
                        completed: ["quoted", "approved", "rejected"].includes(
                          selectedItem.status,
                        ),
                      },
                      {
                        stage: "Customer Approval",
                        completed: ["approved", "rejected"].includes(
                          selectedItem.status,
                        ),
                      },
                    ].map((stage, index) => (
                      <div
                        key={stage.stage}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className={`w-4 h-4 rounded-full ${
                            stage.completed ? "bg-green-500" : "bg-muted"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            stage.completed
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {stage.stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Assessment Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div>
                <p className="font-medium text-foreground mb-1">
                  Condition Assessment:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Physical damage inspection</li>
                  <li>• Functional testing</li>
                  <li>• Part availability check</li>
                  <li>• Repair complexity evaluation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">
                  Quote Factors:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Parts cost + labor</li>
                  <li>• Warranty coverage</li>
                  <li>• Repair time estimate</li>
                  <li>• Device age/value ratio</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Decision Modals */}
      <Dialog
        open={decisionModal.isOpen}
        onOpenChange={(open) =>
          setDecisionModal({ ...decisionModal, isOpen: open })
        }
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {decisionModal.type === "condition" &&
                "Device Condition Assessment"}
              {decisionModal.type === "quote" && "Generate Repair Quote"}
              {decisionModal.type === "repair" && "Customer Decision"}
              {decisionModal.type === "return" && "Return Processing"}
            </DialogTitle>
            <DialogDescription>
              {decisionModal.type === "condition" &&
                "Evaluate the device condition and determine next steps"}
              {decisionModal.type === "quote" &&
                "Create a detailed repair quote for the customer"}
              {decisionModal.type === "repair" &&
                "Process customer decision on the repair quote"}
              {decisionModal.type === "return" &&
                "Handle device return and refund process"}
            </DialogDescription>
          </DialogHeader>

          {decisionModal.item && (
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">
                  {decisionModal.item.deviceModel}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {decisionModal.item.issueDescription}
                </p>
              </div>

              {decisionModal.type === "condition" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Device Condition
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">
                          Excellent - Minor issue only
                        </SelectItem>
                        <SelectItem value="good">
                          Good - Repairable damage
                        </SelectItem>
                        <SelectItem value="fair">
                          Fair - Significant damage
                        </SelectItem>
                        <SelectItem value="poor">
                          Poor - Extensive damage
                        </SelectItem>
                        <SelectItem value="unrepairable">
                          Unrepairable - Total loss
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Assessment Notes
                    </label>
                    <Textarea
                      placeholder="Detailed assessment notes..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Assign Technician
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select technician" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map((tech) => (
                          <SelectItem key={tech} value={tech}>
                            {tech}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {decisionModal.type === "quote" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Parts Cost
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Labor Cost
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Estimated Repair Time
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="same-day">Same Day</SelectItem>
                        <SelectItem value="1-2-days">1-2 Days</SelectItem>
                        <SelectItem value="3-5-days">3-5 Days</SelectItem>
                        <SelectItem value="1-week">1 Week</SelectItem>
                        <SelectItem value="2-weeks">2+ Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quote Notes
                    </label>
                    <Textarea
                      placeholder="Additional quote information..."
                      rows={2}
                    />
                  </div>
                </div>
              )}

              {decisionModal.type === "repair" && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Customer Decision Required
                    </h4>
                    <p className="text-sm text-blue-800">
                      Quote: $180 • Estimated time: 2-3 days
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Customer Response
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">
                          Approved - Proceed with repair
                        </SelectItem>
                        <SelectItem value="rejected">
                          Rejected - Return device
                        </SelectItem>
                        <SelectItem value="pending">
                          Still pending response
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setDecisionModal({ ...decisionModal, isOpen: false })
              }
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleDecision(
                  decisionModal.item!,
                  decisionModal.type === "condition"
                    ? "in-review"
                    : decisionModal.type === "quote"
                      ? "quoted"
                      : "approved",
                )
              }
            >
              {decisionModal.type === "condition" && "Start Review"}
              {decisionModal.type === "quote" && "Send Quote"}
              {decisionModal.type === "repair" && "Process Decision"}
              {decisionModal.type === "return" && "Process Return"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
