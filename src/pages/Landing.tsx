import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Zap,
  Shield,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  Globe,
  Smartphone,
  Wrench,
  Package,
  RotateCcw,
  Recycle,
  Eye,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Intelligent Workflow Automation",
    description:
      "AI-powered workflow management that streamlines your processes from intake to completion.",
    color: "text-blue-600",
  },
  {
    icon: Users,
    title: "Multi-Role Management",
    description:
      "Role-based access control for administrators, technicians, customer service, and warehouse staff.",
    color: "text-green-600",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Comprehensive dashboards and reporting tools to track performance and identify bottlenecks.",
    color: "text-purple-600",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with SOC 2 compliance, data encryption, and secure access controls.",
    color: "text-red-600",
  },
  {
    icon: Globe,
    title: "Cloud-Native Platform",
    description:
      "Scalable cloud infrastructure with 99.9% uptime and global accessibility.",
    color: "text-orange-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description:
      "Fully responsive design that works seamlessly across all devices and screen sizes.",
    color: "text-teal-600",
  },
];

const workflowSteps = [
  {
    step: 1,
    title: "Job Intake",
    description: "Customer submits request with device details",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    step: 2,
    title: "Assessment",
    description: "Technical evaluation and quote generation",
    icon: Eye,
    color: "bg-yellow-500",
  },
  {
    step: 3,
    title: "Request Process",
    description: "Professional repair with quality tracking",
    icon: Wrench,
    color: "bg-orange-500",
  },
  {
    step: 4,
    title: "Quality Check",
    description: "Final testing and customer delivery",
    icon: CheckCircle,
    color: "bg-green-500",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Operations Manager",
    company: "TechFix Solutions",
    content:
      "NeuraCRM transformed our workflow. We've seen a 40% increase in efficiency and our customers love the transparency.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "CEO",
    company: "QuickRepair Inc",
    content:
      "The role-based access and real-time tracking features have made managing our team so much easier. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Customer Service Lead",
    company: "Device Care Pro",
    content:
      "Our customer satisfaction scores improved dramatically after implementing NeuraCRM's workflow system.",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Request Processed" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "50+", label: "Happy Businesses" },
  { value: "24/7", label: "Support Available" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <img
                      src="https://cdn.builder.io/api/v1/assets/9f16d040d92d49b8a8434e2ea64b576d/lopo-bad227?format=webp&width=800"
                      alt="NeuraCRM Logo"
                      className="w-8 h-8 rounded-lg"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">
                      NeuraCRM
                    </h1>
                  </div>
                </div>
              </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </a>
              <Link to="/pricing">Pricing</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6" variant="secondary">
              <p>Now with AI-Powered CRM Platform</p>
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Transform Your <span className="text-primary">Business</span> with
              Intelligent Workflows
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              NeuraCRM streamlines your entire process from customer intake to
              completion with AI-powered workflow automation, real-time
              tracking, and comprehensive analytics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto cursor-pointer"
                asChild
              >
                <a
                  href="https://drive.google.com/file/d/19tkY43_3gvcGHIlQ4iw5zgJr-Ux62bX9/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border border-border/50 shadow-2xl bg-gradient-to-br from-background via-background to-muted/20">
            <CardContent className="p-8">
              {/* Stats */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground text-center">
                  Trusted by Industry Leaders
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-bold text-primary">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Scale Your Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools and features designed specifically for
              shops and service centers of all sizes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border/50 h-full">
                <CardHeader>
                  <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Loved by Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers have to say about NeuraCRM
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-border/50">
                <CardHeader>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border border-border/50 bg-gradient-to-r from-primary/5 via-background to-accent/5">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who trust NeuraCRM to streamline
                their operations and delight their customers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Your Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Sign In to Dashboard
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                No setup fees • 14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <img
                    src="https://cdn.builder.io/api/v1/assets/9f16d040d92d49b8a8434e2ea64b576d/lopo-bad227?format=webp&width=800"
                    alt="NeuraCRM Logo"
                    className="w-8 h-8 rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">NeuraCRM</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering businesses with intelligent workflow
                automation and comprehensive management tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 NeuraCRM. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
