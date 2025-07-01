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
import { Progress } from "@/components/ui/progress";
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
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Wrench,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  MessageSquare,
  PlayCircle,
  PauseCircle,
  XCircle,
  Eye,
} from "lucide-react";

interface RepairItem {
  id: string;
  workflowId: string;
  customerName: string;
  deviceType: string;
  deviceModel: string;
  issueDescription: string;
  priority: "urgent" | "high" | "medium" | "low";
  stage:
    | "parts-ordered"
    | "parts-received"
    | "diagnosis"
    | "repair-in-progress"
    | "testing"
    | "quality-check"
    | "completed"
    | "on-hold";
  progress: number;
  assignedTechnician: string;
  estimatedCompletion: string;
  partsRequired: string[];
  laborHours: number;
  notes: string[];
  startedAt: string;
  lastUpdate: string;
}

interface RepairAction {
  type: "start" | "pause" | "complete" | "hold" | "update";
  item: RepairItem | null;
}

const repairQueue: RepairItem[] = [
  {
    id: "REP-001",
    workflowId: "WF-2024-001",
    customerName: "John Smith",
    deviceType: "Smartphone",
    deviceModel: "iPhone 14 Pro",
    issueDescription: "Cracked screen replacement",
    priority: "high",
    stage: "repair-in-progress",
    progress: 65,
    assignedTechnician: "Mike Chen",
    estimatedCompletion: "2024-01-16T15:00:00Z",
    partsRequired: ["iPhone 14 Pro Screen Assembly", "Adhesive Strips"],
    laborHours: 2.5,
    notes: [
      "Customer approved quote of $180",
      "Parts received and verified",
      "Started screen replacement process",
    ],
    startedAt: "2024-01-15T10:00:00Z",
    lastUpdate: "2024-01-15T14:30:00Z",
  },
  {
    id: "REP-002",
    workflowId: "WF-2024-002",
    customerName: "Sarah Johnson",
    deviceType: "Laptop",
    deviceModel: "MacBook Pro 16-inch",
    issueDescription: "Battery replacement",
    priority: "medium",
    stage: "parts-ordered",
    progress: 20,
    assignedTechnician: "Emily Davis",
    estimatedCompletion: "2024-01-18T12:00:00Z",
    partsRequired: ["MacBook Pro 16-inch Battery", "Pentalobe Screws"],
    laborHours: 3.0,
    notes: [
      "Battery swelling confirmed",
      "Parts ordered from supplier",
      "Waiting for delivery",
    ],
    startedAt: "2024-01-15T09:00:00Z",
    lastUpdate: "2024-01-15T09:30:00Z",
  },
  {
    id: "REP-003",
    workflowId: "WF-2024-003",
    customerName: "Tech Solutions Inc",
    deviceType: "Smartphone",
    deviceModel: "Samsung Galaxy S23",
    issueDescription: "Water damage repair",
    priority: "urgent",
    stage: "testing",
    progress: 85,
    assignedTechnician: "John Doe",
    estimatedCompletion: "2024-01-16T09:00:00Z",
    partsRequired: [
      "Motherboard Cleaning Kit",
      "Charging Port",
      "Speaker Assembly",
    ],
    laborHours: 4.5,
    notes: [
      "Motherboard cleaned and dried",
      "Charging port replaced",
      "Currently running functionality tests",
    ],
    startedAt: "2024-01-14T13:00:00Z",
    lastUpdate: "2024-01-15T16:00:00Z",
  },
];

const stageLabels = {
  "parts-ordered": "Parts Ordered",
  "parts-received": "Parts Received",
  diagnosis: "Diagnosis",
  "repair-in-progress": "Repair in Progress",
  testing: "Testing",
  "quality-check": "Quality Check",
  completed: "Completed",
  "on-hold": "On Hold",
};

export default function Repair() {
  const [repairs, setRepairs] = useState<RepairItem[]>(repairQueue);
  const [selectedRepair, setSelectedRepair] = useState<RepairItem | null>(null);
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    action: RepairAction;
  }>({
    isOpen: false,
    action: { type: "start", item: null },
  });
  const [filterStage, setFilterStage] = useState<string>("all");

  const handleRepairAction = (
    action: RepairAction["type"],
    item: RepairItem,
    notes?: string,
  ) => {
    setRepairs((prev) =>
      prev.map((repair) => {
        if (repair.id === item.id) {
          let newStage = repair.stage;
          let newProgress = repair.progress;

          switch (action) {
            case "start":
              newStage = "repair-in-progress";
              newProgress = Math.max(repair.progress, 40);
              break;
            case "pause":
              newStage = "on-hold";
              break;
            case "complete":
              newStage = "completed";
              newProgress = 100;
              break;
            case "update":
              newProgress = Math.min(repair.progress + 15, 95);
              break;
          }

          return {
            ...repair,
            stage: newStage,
            progress: newProgress,
            notes: notes ? [...repair.notes, notes] : repair.notes,
            lastUpdate: new Date().toISOString(),
          };
        }
        return repair;
      }),
    );

    setActionModal({ isOpen: false, action: { type: "start", item: null } });
  };

  const openActionModal = (action: RepairAction["type"], item: RepairItem) => {
    setActionModal({ isOpen: true, action: { type: action, item } });
  };

  const filteredRepairs = repairs.filter(
    (repair) => filterStage === "all" || repair.stage === filterStage,
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "parts-ordered":
        return "bg-blue-100 text-blue-800";
      case "parts-received":
        return "bg-purple-100 text-purple-800";
      case "diagnosis":
        return "bg-yellow-100 text-yellow-800";
      case "repair-in-progress":
        return "bg-orange-100 text-orange-800";
      case "testing":
        return "bg-indigo-100 text-indigo-800";
      case "quality-check":
        return "bg-cyan-100 text-cyan-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "on-hold":
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
            <BreadcrumbPage>Repair</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Wrench className="w-8 h-8 text-primary" />
            <span>Repair Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage device repair processes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={filterStage} onValueChange={setFilterStage}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {Object.entries(stageLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Active Repairs",
            count: repairs.filter((r) => r.stage === "repair-in-progress")
              .length,
            icon: Wrench,
            color: "text-orange-600",
          },
          {
            title: "Awaiting Parts",
            count: repairs.filter((r) => r.stage === "parts-ordered").length,
            icon: Package,
            color: "text-blue-600",
          },
          {
            title: "In Testing",
            count: repairs.filter((r) => r.stage === "testing").length,
            icon: CheckCircle,
            color: "text-purple-600",
          },
          {
            title: "On Hold",
            count: repairs.filter((r) => r.stage === "on-hold").length,
            icon: PauseCircle,
            color: "text-red-600",
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

      {/* Repair Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Active Repairs</CardTitle>
              <CardDescription>
                Repairs currently in progress or queued
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {filteredRepairs.map((repair) => (
                <div
                  key={repair.id}
                  className="p-6 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${getPriorityColor(repair.priority)}`}
                      />
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {repair.deviceModel}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {repair.customerName} • ID: {repair.workflowId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStageColor(repair.stage)}>
                        {stageLabels[repair.stage]}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRepair(repair)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {repair.issueDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Technician
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {repair.assignedTechnician}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Est. Completion
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(
                          repair.estimatedCompletion,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">
                        {repair.progress}%
                      </span>
                    </div>
                    <Progress value={repair.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>
                        Last update:{" "}
                        {new Date(repair.lastUpdate).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {repair.stage === "parts-received" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openActionModal("start", repair)}
                        >
                          <PlayCircle className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      )}
                      {repair.stage === "repair-in-progress" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openActionModal("update", repair)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openActionModal("pause", repair)}
                          >
                            <PauseCircle className="w-4 h-4 mr-1" />
                            Hold
                          </Button>
                        </>
                      )}
                      {repair.stage === "testing" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openActionModal("complete", repair)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>

                  {repair.notes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        Latest Note:
                      </p>
                      <p className="text-sm text-foreground">
                        {repair.notes[repair.notes.length - 1]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {selectedRepair && (
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Repair Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Device & Customer
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Device:</span>{" "}
                      {selectedRepair.deviceModel}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Customer:</span>{" "}
                      {selectedRepair.customerName}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Technician:</span>{" "}
                      {selectedRepair.assignedTechnician}
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Labor Hours:
                      </span>{" "}
                      {selectedRepair.laborHours}h
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Parts Required
                  </h4>
                  <div className="space-y-1">
                    {selectedRepair.partsRequired.map((part, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <Package className="w-3 h-3 text-muted-foreground" />
                        <span>{part}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Repair Timeline
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Started:</span>{" "}
                      {new Date(selectedRepair.startedAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Est. Completion:
                      </span>{" "}
                      {new Date(
                        selectedRepair.estimatedCompletion,
                      ).toLocaleString()}
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Last Update:
                      </span>{" "}
                      {new Date(selectedRepair.lastUpdate).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Repair Notes
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedRepair.notes.map((note, index) => (
                      <div
                        key={index}
                        className="p-2 bg-muted/50 rounded text-sm"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Repair Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div>
                <p className="font-medium text-foreground mb-1">
                  Quality Standards:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Test all functions before completion</li>
                  <li>• Use only approved parts and tools</li>
                  <li>• Document all steps and findings</li>
                  <li>• Follow manufacturer guidelines</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">
                  Safety Protocols:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Anti-static procedures required</li>
                  <li>• Proper tool handling and storage</li>
                  <li>• Component verification before assembly</li>
                  <li>• Clean workspace maintenance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Modal */}
      <Dialog
        open={actionModal.isOpen}
        onOpenChange={(open) =>
          setActionModal({ ...actionModal, isOpen: open })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionModal.action.type === "start" && "Start Repair"}
              {actionModal.action.type === "pause" && "Put Repair On Hold"}
              {actionModal.action.type === "complete" && "Complete Repair"}
              {actionModal.action.type === "update" && "Update Repair Progress"}
            </DialogTitle>
            <DialogDescription>
              {actionModal.action.type === "start" &&
                "Begin the repair process for this device"}
              {actionModal.action.type === "pause" &&
                "Temporarily pause this repair"}
              {actionModal.action.type === "complete" &&
                "Mark this repair as completed"}
              {actionModal.action.type === "update" &&
                "Update the repair progress and add notes"}
            </DialogDescription>
          </DialogHeader>

          {actionModal.action.item && (
            <div className="space-y-4">
              <div className="p-3 bg-muted/50 rounded">
                <p className="font-medium">
                  {actionModal.action.item.deviceModel}
                </p>
                <p className="text-sm text-muted-foreground">
                  Customer: {actionModal.action.item.customerName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {actionModal.action.type === "update"
                    ? "Progress Notes"
                    : "Action Notes"}
                </label>
                <Textarea
                  placeholder={
                    actionModal.action.type === "start"
                      ? "Started repair process..."
                      : actionModal.action.type === "complete"
                        ? "Repair completed successfully..."
                        : actionModal.action.type === "pause"
                          ? "Reason for hold..."
                          : "Progress update..."
                  }
                  rows={3}
                />
              </div>

              {actionModal.action.type === "complete" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Quality Check Results
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passed">All Tests Passed</SelectItem>
                      <SelectItem value="minor-issues">
                        Minor Issues Found
                      </SelectItem>
                      <SelectItem value="failed">
                        Failed Quality Check
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setActionModal({ ...actionModal, isOpen: false })}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleRepairAction(
                  actionModal.action.type,
                  actionModal.action.item!,
                  "Action completed",
                )
              }
            >
              {actionModal.action.type === "start" && "Start Repair"}
              {actionModal.action.type === "pause" && "Put On Hold"}
              {actionModal.action.type === "complete" && "Mark Complete"}
              {actionModal.action.type === "update" && "Update Progress"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
