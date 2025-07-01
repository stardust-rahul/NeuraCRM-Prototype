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
  Recycle,
  Trash2,
  Leaf,
  Shield,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function Recycling() {
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
            <BreadcrumbPage>Recycling</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Recycle className="w-8 h-8 text-primary" />
            <span>EOL Device Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage end-of-life devices and recycling processes
          </p>
        </div>
      </div>

      {/* Content Placeholder */}
      <Card className="border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Recycle className="w-5 h-5" />
            <span>Recycling & Disposal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Recycle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Recycling Management Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Environmentally responsible end-of-life device management with
            secure data destruction and recycling coordination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-muted/50">
              <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Data Destruction</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <Leaf className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Eco Recycling</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Compliance Tracking</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
