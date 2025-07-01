import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  User,
  Wrench,
  Package,
  Eye,
  Settings,
  BarChart3,
} from "lucide-react";

export type UserRole =
  | "admin"
  | "manager"
  | "customer-service"
  | "technician"
  | "warehouse-staff"
  | "quality-control";

interface UserRoleData {
  id: UserRole;
  name: string;
  description: string;
  icon: any;
  color: string;
  permissions: string[];
  dashboardFeatures: string[];
}

const userRoles: UserRoleData[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access and configuration",
    icon: Shield,
    color: "bg-red-500",
    permissions: [
      "Full system access",
      "User management",
      "System configuration",
      "All workflow access",
      "Financial reporting",
    ],
    dashboardFeatures: [
      "Complete workflow overview",
      "User role management",
      "System health monitoring",
      "Financial dashboards",
      "Audit logs",
    ],
  },
  {
    id: "manager",
    name: "Manager",
    description: "Operations oversight and reporting",
    icon: BarChart3,
    color: "bg-purple-500",
    permissions: [
      "View all workflows",
      "Approve high-value repairs",
      "Access reporting",
      "Manage assignments",
      "Quality oversight",
    ],
    dashboardFeatures: [
      "Performance analytics",
      "Team workload view",
      "Revenue tracking",
      "Quality metrics",
      "Customer satisfaction",
    ],
  },
  {
    id: "customer-service",
    name: "Customer Service",
    description: "Customer interaction and intake management",
    icon: User,
    color: "bg-blue-500",
    permissions: [
      "Create new jobs",
      "Customer communication",
      "Quote approval",
      "Status updates",
      "Basic reporting",
    ],
    dashboardFeatures: [
      "Job intake forms",
      "Customer communication tools",
      "Quote management",
      "Status tracking",
      "Customer history",
    ],
  },
  {
    id: "technician",
    name: "Technician",
    description: "Device repair and technical assessment",
    icon: Wrench,
    color: "bg-orange-500",
    permissions: [
      "Device assessment",
      "Repair execution",
      "Parts ordering",
      "Quality testing",
      "Technical documentation",
    ],
    dashboardFeatures: [
      "Active repair queue",
      "Technical documentation",
      "Parts availability",
      "Repair progress tracking",
      "Quality check tools",
    ],
  },
  {
    id: "warehouse-staff",
    name: "Warehouse Staff",
    description: "Inventory and parts management",
    icon: Package,
    color: "bg-green-500",
    permissions: [
      "Inventory management",
      "Parts receiving",
      "Stock updates",
      "Shipping coordination",
      "Supplier management",
    ],
    dashboardFeatures: [
      "Inventory levels",
      "Parts ordering system",
      "Receiving queue",
      "Shipping tracker",
      "Stock alerts",
    ],
  },
  {
    id: "quality-control",
    name: "Quality Control",
    description: "Final inspection and quality assurance",
    icon: Eye,
    color: "bg-teal-500",
    permissions: [
      "Quality inspections",
      "Final testing",
      "Approval workflows",
      "Quality reporting",
      "Standards compliance",
    ],
    dashboardFeatures: [
      "Quality inspection queue",
      "Testing protocols",
      "Compliance tracking",
      "Quality metrics",
      "Approval workflows",
    ],
  },
];

interface UserRoleSelectorProps {
  onRoleChange?: (role: UserRole) => void;
  currentRole?: UserRole;
  showDetails?: boolean;
}

export default function UserRoleSelector({
  onRoleChange,
  currentRole = "customer-service",
  showDetails = true,
}: UserRoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);

  const handleRoleChange = (roleId: string) => {
    const role = roleId as UserRole;
    setSelectedRole(role);
    onRoleChange?.(role);
  };

  const currentRoleData = userRoles.find((role) => role.id === selectedRole);

  return (
    <div className="space-y-6">
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>User Role Selection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Current User Role
              </label>
              <Select value={selectedRole} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      <div className="flex items-center space-x-2">
                        <role.icon className="w-4 h-4" />
                        <span>{role.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentRoleData && (
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentRoleData.color}`}
                >
                  <currentRoleData.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    {currentRoleData.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentRoleData.description}
                  </p>
                </div>
                <Badge variant="outline">{selectedRole}</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showDetails && currentRoleData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentRoleData.permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Dashboard Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentRoleData.dashboardFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border border-border/50 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Role-Based Access Control
              </h4>
              <p className="text-sm text-blue-800">
                Each role has specific permissions and sees a customized
                dashboard view tailored to their responsibilities. This ensures
                security, efficiency, and proper workflow management across all
                team members.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { userRoles };
export type { UserRoleData };
