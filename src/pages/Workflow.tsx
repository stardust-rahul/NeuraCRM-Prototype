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
import UserRoleSelector, {
  UserRole,
} from "@/components/workflow/UserRoleSelector";
import WorkflowTracker from "@/components/workflow/WorkflowTracker";
import {
  Play,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Package,
  Wrench,
  RotateCcw,
  Recycle,
  Users,
  BarChart3,
  ArrowRight,
  Plus,
  Eye,
} from "lucide-react";

interface WorkflowMetric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
  color: string;
}

interface ActiveWorkflow {
  id: string;
  title: string;
  customer: string;
  stage: string;
  priority: "high" | "medium" | "low";
  daysInStage: number;
  progress: number;
  nextAction: string;
  assignee: string;
}

const workflowMetrics: WorkflowMetric[] = [
  {
    title: "Active Workflows",
    value: "247",
    change: "+12.3%",
    trend: "up",
    icon: Play,
    color: "text-blue-600",
  },
  {
    title: "Pending Assessment",
    value: "43",
    change: "+8.7%",
    trend: "up",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "In Repair",
    value: "89",
    change: "-2.1%",
    trend: "down",
    icon: Wrench,
    color: "text-orange-600",
  },
  {
    title: "Completed Today",
    value: "28",
    change: "+15.4%",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
  },
];

const activeWorkflows: ActiveWorkflow[] = [
  {
    id: "WF-2024-001",
    title: "iPhone 14 Screen Repair",
    customer: "John Smith",
    stage: "Assessment",
    priority: "high",
    daysInStage: 1,
    progress: 25,
    nextAction: "Device condition check",
    assignee: "Mike Chen",
  },
  {
    id: "WF-2024-002",
    title: "MacBook Pro Battery Replacement",
    customer: "Sarah Johnson",
    stage: "Quote Approval",
    priority: "medium",
    daysInStage: 3,
    progress: 60,
    nextAction: "Awaiting customer approval",
    assignee: "Emily Davis",
  },
  {
    id: "WF-2024-003",
    title: "Samsung Galaxy Water Damage",
    customer: "Tech Solutions Inc",
    stage: "Repair in Progress",
    priority: "high",
    daysInStage: 2,
    progress: 75,
    nextAction: "Parts installation",
    assignee: "John Doe",
  },
  {
    id: "WF-2024-004",
    title: "iPad Screen Replacement",
    customer: "Global Corp",
    stage: "Quality Check",
    priority: "low",
    daysInStage: 1,
    progress: 90,
    nextAction: "Final testing",
    assignee: "Lisa Wong",
  },
];

const workflowModules = [
  {
    name: "Job Intake",
    description: "Start new repair workflow",
    icon: FileText,
    color: "bg-blue-500",
    link: "/workflow/intake",
    count: 15,
    status: "New requests today",
  },
  {
    name: "Assessment",
    description: "Device evaluation & quotes",
    icon: CheckCircle,
    color: "bg-yellow-500",
    link: "/workflow/assessment",
    count: 43,
    status: "Pending assessment",
  },
  {
    name: "Repair Flow",
    description: "Repair process management",
    icon: Wrench,
    color: "bg-orange-500",
    link: "/workflow/repair",
    count: 89,
    status: "Active repairs",
  },
  {
    name: "Returns",
    description: "Return & refund processing",
    icon: RotateCcw,
    color: "bg-purple-500",
    link: "/workflow/returns",
    count: 12,
    status: "Processing returns",
  },
  {
    name: "Warehouse",
    description: "Inventory & dispatch",
    icon: Package,
    color: "bg-green-500",
    link: "/workflow/warehouse",
    count: 156,
    status: "Items in stock",
  },
  {
    name: "Recycling",
    description: "EOL device management",
    icon: Recycle,
    color: "bg-teal-500",
    link: "/workflow/recycling",
    count: 8,
    status: "For disposal",
  },
];

export default function Workflow() {
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [currentUserRole, setCurrentUserRole] =
    useState<UserRole>("customer-service");
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Workflow Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your repair workflows from intake to completion
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowRoleSelector(!showRoleSelector)}
          >
            <Users className="w-4 h-4 mr-2" />
            Role: {currentUserRole.replace("-", " ")}
          </Button>
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflowMetrics.map((metric) => (
          <Card key={metric.title} className="border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {metric.value}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span
                  className={
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {metric.change}
                </span>
                <span className="ml-1">vs last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Flow Trigger */}
      <Card className="border border-border/50 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center space-x-3">
            <Play className="w-8 h-8 text-primary" />
            <span>Main Workflow Trigger</span>
          </CardTitle>
          <CardDescription className="text-lg">
            Start new repair workflows or continue existing processes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowModules.map((module) => (
              <Link key={module.name} to={module.link}>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-border/50 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${module.color}`}
                      >
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {module.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {module.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-foreground">
                          {module.count}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {module.status}
                        </span>
                      </div>
                      <Badge variant="secondary">{module.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Selector */}
      {showRoleSelector && (
        <UserRoleSelector
          currentRole={currentUserRole}
          onRoleChange={setCurrentUserRole}
          showDetails={true}
        />
      )}

      {/* Sample Workflow Tracker */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Sample Workflow Tracking</CardTitle>
          <CardDescription>
            Detailed workflow progress with decision points and timeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WorkflowTracker compact={false} />
        </CardContent>
      </Card>

      {/* Active Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                Active Workflows
              </CardTitle>
              <CardDescription>Currently in progress</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="text-sm border border-border rounded px-2 py-1"
              >
                <option value="all">All Priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeWorkflows
              .filter(
                (workflow) =>
                  selectedPriority === "all" ||
                  workflow.priority === selectedPriority,
              )
              .map((workflow) => (
                <div
                  key={workflow.id}
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-foreground">
                        {workflow.title}
                      </h4>
                      <Badge
                        variant={
                          workflow.priority === "high"
                            ? "destructive"
                            : workflow.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {workflow.priority}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                    <div>
                      <span className="font-medium">ID:</span> {workflow.id}
                    </div>
                    <div>
                      <span className="font-medium">Customer:</span>{" "}
                      {workflow.customer}
                    </div>
                    <div>
                      <span className="font-medium">Stage:</span>{" "}
                      {workflow.stage}
                    </div>
                    <div>
                      <span className="font-medium">Assignee:</span>{" "}
                      {workflow.assignee}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Next: {workflow.nextAction}
                      </span>
                      <span className="text-muted-foreground">
                        {workflow.daysInStage} days in stage
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{workflow.progress}%</span>
                    </div>
                    <Progress value={workflow.progress} className="h-1" />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Quick Actions
            </CardTitle>
            <CardDescription>Common workflow operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Process Pending Assessments",
                description: "Review 43 devices awaiting evaluation",
                icon: Clock,
                action: "Review Now",
                color: "text-yellow-600",
                count: 43,
              },
              {
                title: "Approve Repair Quotes",
                description: "15 quotes waiting for approval",
                icon: CheckCircle,
                action: "Approve",
                color: "text-green-600",
                count: 15,
              },
              {
                title: "Update Warehouse Stock",
                description: "Low stock alerts for 8 parts",
                icon: AlertTriangle,
                action: "Update",
                color: "text-red-600",
                count: 8,
              },
              {
                title: "Schedule Recycling Pickup",
                description: "12 EOL devices ready for disposal",
                icon: Recycle,
                action: "Schedule",
                color: "text-teal-600",
                count: 12,
              },
            ].map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {action.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{action.count}</Badge>
                  <Button variant="outline" size="sm">
                    {action.action}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
