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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Package,
  Truck,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Warehouse() {
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
            <BreadcrumbPage>Warehouse</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Package className="w-8 h-8 text-primary" />
            <span>Warehouse Operations</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage inventory, parts, and dispatch operations
          </p>
        </div>
      </div>

      {/* Content Placeholder */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Inventory Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Warehouse Management Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Complete warehouse management system for inventory tracking, parts
            management, and dispatch coordination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-muted/50">
              <Package className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Inventory Control</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Dispatch Tracking</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <BarChart3 className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Stock Analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
