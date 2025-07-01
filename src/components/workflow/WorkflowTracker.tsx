import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  MessageSquare,
  Eye,
  FileText,
  Package,
  Wrench,
  RotateCcw,
  Recycle,
  XCircle,
} from "lucide-react";

export type WorkflowStatus =
  | "intake"
  | "assessment"
  | "quote-pending"
  | "quote-approved"
  | "quote-rejected"
  | "parts-ordered"
  | "repair-in-progress"
  | "testing"
  | "quality-check"
  | "completed"
  | "returned"
  | "recycled"
  | "on-hold"
  | "cancelled";

interface WorkflowStage {
  id: string;
  name: string;
  status: "completed" | "current" | "pending" | "skipped";
  icon: any;
  timestamp?: string;
  assignee?: string;
  notes?: string;
  duration?: string;
  substages?: WorkflowStage[];
}

interface WorkflowItem {
  id: string;
  workflowId: string;
  customerName: string;
  deviceType: string;
  deviceModel: string;
  issueDescription: string;
  priority: "urgent" | "high" | "medium" | "low";
  currentStatus: WorkflowStatus;
  progress: number;
  estimatedCompletion: string;
  createdAt: string;
  stages: WorkflowStage[];
  decisionPoints: {
    [key: string]: {
      question: string;
      decision: "yes" | "no" | "pending";
      timestamp?: string;
      notes?: string;
    };
  };
}

const workflowStages: WorkflowStage[] = [
  {
    id: "intake",
    name: "Job Intake",
    status: "completed",
    icon: FileText,
    timestamp: "2024-01-15T09:00:00Z",
    assignee: "Sarah Johnson",
    duration: "15 mins",
    substages: [
      {
        id: "customer-info",
        name: "Customer Information",
        status: "completed",
        icon: User,
        timestamp: "2024-01-15T09:05:00Z",
      },
      {
        id: "device-details",
        name: "Device Details",
        status: "completed",
        icon: Package,
        timestamp: "2024-01-15T09:10:00Z",
      },
      {
        id: "issue-description",
        name: "Issue Description",
        status: "completed",
        icon: MessageSquare,
        timestamp: "2024-01-15T09:15:00Z",
      },
    ],
  },
  {
    id: "assessment",
    name: "Device Assessment",
    status: "completed",
    icon: Eye,
    timestamp: "2024-01-15T10:30:00Z",
    assignee: "Mike Chen",
    duration: "45 mins",
    notes: "Screen damage confirmed, no internal damage detected",
    substages: [
      {
        id: "condition-check",
        name: "Condition Check",
        status: "completed",
        icon: CheckCircle,
        timestamp: "2024-01-15T10:35:00Z",
      },
      {
        id: "parts-evaluation",
        name: "Parts Evaluation",
        status: "completed",
        icon: Package,
        timestamp: "2024-01-15T10:50:00Z",
      },
      {
        id: "quote-generation",
        name: "Quote Generation",
        status: "completed",
        icon: FileText,
        timestamp: "2024-01-15T11:15:00Z",
      },
    ],
  },
  {
    id: "quote-approval",
    name: "Quote Approval",
    status: "completed",
    icon: CheckCircle,
    timestamp: "2024-01-15T14:20:00Z",
    assignee: "Customer",
    duration: "3.5 hours",
    notes: "Customer approved $180 quote",
  },
  {
    id: "repair",
    name: "Repair Process",
    status: "current",
    icon: Wrench,
    timestamp: "2024-01-15T15:00:00Z",
    assignee: "John Doe",
    substages: [
      {
        id: "parts-ordered",
        name: "Parts Ordered",
        status: "completed",
        icon: Package,
        timestamp: "2024-01-15T15:05:00Z",
      },
      {
        id: "parts-received",
        name: "Parts Received",
        status: "completed",
        icon: CheckCircle,
        timestamp: "2024-01-16T08:30:00Z",
      },
      {
        id: "repair-execution",
        name: "Repair Execution",
        status: "current",
        icon: Wrench,
        timestamp: "2024-01-16T09:00:00Z",
      },
    ],
  },
  {
    id: "testing",
    name: "Quality Testing",
    status: "pending",
    icon: CheckCircle,
    assignee: "Quality Team",
  },
  {
    id: "completion",
    name: "Completion",
    status: "pending",
    icon: CheckCircle,
  },
];

const sampleWorkflow: WorkflowItem = {
  id: "WF-001",
  workflowId: "WF-2024-001",
  customerName: "John Smith",
  deviceType: "Smartphone",
  deviceModel: "iPhone 14 Pro",
  issueDescription: "Cracked screen, touch not responsive in top-right corner",
  priority: "high",
  currentStatus: "repair-in-progress",
  progress: 65,
  estimatedCompletion: "2024-01-16T17:00:00Z",
  createdAt: "2024-01-15T09:00:00Z",
  stages: workflowStages,
  decisionPoints: {
    repairViable: {
      question: "Is device repair economically viable?",
      decision: "yes",
      timestamp: "2024-01-15T10:45:00Z",
      notes: "Repair cost $180 vs device value $600",
    },
    customerApproval: {
      question: "Customer approved repair quote?",
      decision: "yes",
      timestamp: "2024-01-15T14:20:00Z",
      notes: "Customer approved via email",
    },
    qualityCheck: {
      question: "Device passes quality check?",
      decision: "pending",
    },
  },
};

interface WorkflowTrackerProps {
  workflow?: WorkflowItem;
  compact?: boolean;
}

export default function WorkflowTracker({
  workflow = sampleWorkflow,
  compact = false,
}: WorkflowTrackerProps) {
  const [selectedStage, setSelectedStage] = useState<WorkflowStage | null>(
    null,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "current":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-gray-600 bg-gray-100";
      case "skipped":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

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

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "yes":
        return "text-green-700 bg-green-100";
      case "no":
        return "text-red-700 bg-red-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  if (compact) {
    return (
      <Card className="border border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{workflow.workflowId}</CardTitle>
            <Badge className={getPriorityColor(workflow.priority)}>
              {workflow.priority.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {workflow.deviceModel} • {workflow.customerName}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{workflow.progress}%</span>
            </div>
            <Progress value={workflow.progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Current: {workflow.currentStatus.replace("-", " ")}</span>
              <span>
                ETA:{" "}
                {new Date(workflow.estimatedCompletion).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Workflow Header */}
      <Card className="border border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3">
                <span>{workflow.workflowId}</span>
                <Badge className={getPriorityColor(workflow.priority)}>
                  {workflow.priority.toUpperCase()}
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {workflow.deviceType} • {workflow.deviceModel} •{" "}
                {workflow.customerName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {workflow.progress}% Complete
              </p>
              <p className="text-xs text-muted-foreground">
                ETA:{" "}
                {new Date(workflow.estimatedCompletion).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Progress value={workflow.progress} className="h-2 mt-4" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {workflow.issueDescription}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Created: {new Date(workflow.createdAt).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Decision Points */}
      {Object.keys(workflow.decisionPoints).length > 0 && (
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Decision Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(workflow.decisionPoints).map(
                ([key, decision]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {decision.question}
                      </p>
                      {decision.notes && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {decision.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {decision.timestamp && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(decision.timestamp).toLocaleDateString()}
                        </span>
                      )}
                      <Badge className={getDecisionColor(decision.decision)}>
                        {decision.decision.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Timeline */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Workflow Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {workflow.stages.map((stage, index) => (
              <div key={stage.id} className="relative">
                {/* Connector Line */}
                {index < workflow.stages.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                )}

                <div className="flex items-start space-x-4">
                  {/* Stage Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      stage.status === "completed"
                        ? "bg-green-100 border-green-300 text-green-700"
                        : stage.status === "current"
                          ? "bg-blue-100 border-blue-300 text-blue-700"
                          : "bg-gray-100 border-gray-300 text-gray-500"
                    }`}
                  >
                    <stage.icon className="w-5 h-5" />
                  </div>

                  {/* Stage Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">
                        {stage.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(stage.status)}>
                          {stage.status.toUpperCase()}
                        </Badge>
                        {stage.substages && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {stage.name} - Detailed Steps
                                </DialogTitle>
                                <DialogDescription>
                                  Breakdown of substages within this workflow
                                  stage
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-3">
                                {stage.substages.map((substage) => (
                                  <div
                                    key={substage.id}
                                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50"
                                  >
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        substage.status === "completed"
                                          ? "bg-green-100 text-green-600"
                                          : substage.status === "current"
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-gray-100 text-gray-500"
                                      }`}
                                    >
                                      <substage.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium">
                                        {substage.name}
                                      </p>
                                      {substage.timestamp && (
                                        <p className="text-xs text-muted-foreground">
                                          {new Date(
                                            substage.timestamp,
                                          ).toLocaleString()}
                                        </p>
                                      )}
                                    </div>
                                    <Badge
                                      className={getStatusColor(
                                        substage.status,
                                      )}
                                    >
                                      {substage.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      {stage.timestamp && (
                        <div>
                          <span className="font-medium">Completed:</span>{" "}
                          {new Date(stage.timestamp).toLocaleString()}
                        </div>
                      )}
                      {stage.assignee && (
                        <div>
                          <span className="font-medium">Assignee:</span>{" "}
                          {stage.assignee}
                        </div>
                      )}
                      {stage.duration && (
                        <div>
                          <span className="font-medium">Duration:</span>{" "}
                          {stage.duration}
                        </div>
                      )}
                      {stage.substages && (
                        <div>
                          <span className="font-medium">Substages:</span>{" "}
                          {stage.substages.length}
                        </div>
                      )}
                    </div>

                    {stage.notes && (
                      <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                        <span className="font-medium">Notes:</span>{" "}
                        {stage.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { sampleWorkflow };
export type { WorkflowItem, WorkflowStage };
