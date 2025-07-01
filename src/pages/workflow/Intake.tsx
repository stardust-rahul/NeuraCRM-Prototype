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
import { Checkbox } from "@/components/ui/checkbox";
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
  FileText,
  Upload,
  Camera,
  User,
  Phone,
  Mail,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  issueDescription: string;
  urgency: string;
  warrantyStatus: string;
  previousRepairs: boolean;
  customerNotes: string;
}

const deviceTypes = [
  "Smartphone",
  "Tablet",
  "Laptop",
  "Desktop",
  "Gaming Console",
  "Smartwatch",
  "Headphones",
  "Other",
];

const brands = {
  Smartphone: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Other"],
  Tablet: ["Apple", "Samsung", "Microsoft", "Amazon", "Lenovo", "Other"],
  Laptop: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "Other"],
  Desktop: ["Dell", "HP", "Lenovo", "Custom Build", "Other"],
};

const urgencyLevels = [
  { value: "low", label: "Low - Within 7 days", color: "text-green-600" },
  {
    value: "medium",
    label: "Medium - Within 3 days",
    color: "text-yellow-600",
  },
  { value: "high", label: "High - Within 24 hours", color: "text-orange-600" },
  { value: "urgent", label: "Urgent - Same day", color: "text-red-600" },
];

export default function Intake() {
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deviceType: "",
    deviceBrand: "",
    deviceModel: "",
    issueDescription: "",
    urgency: "",
    warrantyStatus: "",
    previousRepairs: false,
    customerNotes: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Process form submission
    console.log("Form submitted:", formData);
    // Redirect to assessment workflow
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.customerName &&
          formData.customerEmail &&
          formData.customerPhone
        );
      case 2:
        return (
          formData.deviceType && formData.deviceBrand && formData.deviceModel
        );
      case 3:
        return formData.issueDescription && formData.urgency;
      default:
        return false;
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
            <BreadcrumbPage>Job Intake</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <FileText className="w-8 h-8 text-primary" />
            <span>Job Intake</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Create new repair request and start workflow
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Step {currentStep} of 4
        </Badge>
      </div>

      {/* Progress Steps */}
      <Card className="border border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: "Customer Info", icon: User },
              { step: 2, title: "Device Details", icon: Package },
              { step: 3, title: "Issue Details", icon: AlertCircle },
              { step: 4, title: "Review & Submit", icon: CheckCircle },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= item.step
                        ? "bg-primary text-primary-foreground"
                        : isStepComplete(item.step)
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium mt-2 text-center">
                    {item.title}
                  </span>
                  {isStepComplete(item.step) && currentStep > item.step && (
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  )}
                </div>
                {index < 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > item.step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Customer Information"}
                {currentStep === 2 && "Device Details"}
                {currentStep === 3 && "Issue Description"}
                {currentStep === 4 && "Review & Submit"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 &&
                  "Enter customer contact and identification details"}
                {currentStep === 2 &&
                  "Specify device type, brand, and model information"}
                {currentStep === 3 &&
                  "Describe the issue and set priority level"}
                {currentStep === 4 &&
                  "Review all information before submitting"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Customer Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="customerName"
                          placeholder="John Smith"
                          className="pl-10"
                          value={formData.customerName}
                          onChange={(e) =>
                            handleInputChange("customerName", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerPhone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="customerPhone"
                          placeholder="+1 (555) 123-4567"
                          className="pl-10"
                          value={formData.customerPhone}
                          onChange={(e) =>
                            handleInputChange("customerPhone", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="customerEmail"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={formData.customerEmail}
                        onChange={(e) =>
                          handleInputChange("customerEmail", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Device Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Device Type *</Label>
                      <Select
                        value={formData.deviceType}
                        onValueChange={(value) =>
                          handleInputChange("deviceType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select device type" />
                        </SelectTrigger>
                        <SelectContent>
                          {deviceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Brand *</Label>
                      <Select
                        value={formData.deviceBrand}
                        onValueChange={(value) =>
                          handleInputChange("deviceBrand", value)
                        }
                        disabled={!formData.deviceType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.deviceType &&
                            brands[
                              formData.deviceType as keyof typeof brands
                            ]?.map((brand) => (
                              <SelectItem key={brand} value={brand}>
                                {brand}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deviceModel">Model *</Label>
                    <Input
                      id="deviceModel"
                      placeholder="e.g., iPhone 14 Pro, MacBook Pro 16-inch"
                      value={formData.deviceModel}
                      onChange={(e) =>
                        handleInputChange("deviceModel", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Warranty Status</Label>
                    <Select
                      value={formData.warrantyStatus}
                      onValueChange={(value) =>
                        handleInputChange("warrantyStatus", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select warranty status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-warranty">In Warranty</SelectItem>
                        <SelectItem value="out-of-warranty">
                          Out of Warranty
                        </SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="previousRepairs"
                      checked={formData.previousRepairs}
                      onCheckedChange={(checked) =>
                        handleInputChange("previousRepairs", checked)
                      }
                    />
                    <Label htmlFor="previousRepairs">
                      Device has had previous repairs
                    </Label>
                  </div>
                </div>
              )}

              {/* Step 3: Issue Details */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueDescription">
                      Issue Description *
                    </Label>
                    <Textarea
                      id="issueDescription"
                      placeholder="Describe the problem in detail..."
                      rows={4}
                      value={formData.issueDescription}
                      onChange={(e) =>
                        handleInputChange("issueDescription", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority Level *</Label>
                    <Select
                      value={formData.urgency}
                      onValueChange={(value) =>
                        handleInputChange("urgency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <span className={level.color}>{level.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerNotes">Additional Notes</Label>
                    <Textarea
                      id="customerNotes"
                      placeholder="Any additional information..."
                      rows={3}
                      value={formData.customerNotes}
                      onChange={(e) =>
                        handleInputChange("customerNotes", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop files here or click to upload
                      </p>
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Add Photos
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">
                        Customer Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Name:</span>{" "}
                          {formData.customerName}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span>{" "}
                          {formData.customerEmail}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span>{" "}
                          {formData.customerPhone}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">
                        Device Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Type:</span>{" "}
                          {formData.deviceType}
                        </div>
                        <div>
                          <span className="font-medium">Brand:</span>{" "}
                          {formData.deviceBrand}
                        </div>
                        <div>
                          <span className="font-medium">Model:</span>{" "}
                          {formData.deviceModel}
                        </div>
                        <div>
                          <span className="font-medium">Warranty:</span>{" "}
                          {formData.warrantyStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Issue Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Description:</span>{" "}
                        {formData.issueDescription}
                      </div>
                      <div>
                        <span className="font-medium">Priority:</span>{" "}
                        <Badge
                          variant={
                            formData.urgency === "urgent" ||
                            formData.urgency === "high"
                              ? "destructive"
                              : formData.urgency === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {
                            urgencyLevels.find(
                              (level) => level.value === formData.urgency,
                            )?.label
                          }
                        </Badge>
                      </div>
                      {formData.customerNotes && (
                        <div>
                          <span className="font-medium">Notes:</span>{" "}
                          {formData.customerNotes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                    disabled={!isStepComplete(currentStep)}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit & Start Workflow
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Workflow Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    stage: "Intake",
                    status: "current",
                    icon: FileText,
                    description: "Collecting request details",
                  },
                  {
                    stage: "Assessment",
                    status: "pending",
                    icon: Clock,
                    description: "Device evaluation",
                  },
                  {
                    stage: "Repair",
                    status: "pending",
                    icon: Package,
                    description: "Fix implementation",
                  },
                  {
                    stage: "Quality Check",
                    status: "pending",
                    icon: CheckCircle,
                    description: "Final verification",
                  },
                ].map((stage, index) => (
                  <div
                    key={stage.stage}
                    className="flex items-center space-x-3"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stage.status === "current"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <stage.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {stage.stage}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Help & Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div>
                <p className="font-medium text-foreground mb-1">
                  Priority Levels:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Urgent: Critical business impact</li>
                  <li>• High: Significant impact</li>
                  <li>• Medium: Moderate impact</li>
                  <li>• Low: Minor impact</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">
                  Required Information:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Customer contact details</li>
                  <li>• Complete device information</li>
                  <li>• Detailed issue description</li>
                  <li>• Photos if applicable</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
