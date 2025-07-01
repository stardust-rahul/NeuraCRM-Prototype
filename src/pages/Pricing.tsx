import "../Pricing.css";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

export default function Pricing() {
  return (
    <div>
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
                  <Button variant="contained" color="primary">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="pricing-container">
          <Typography variant="h3" align="center" gutterBottom>
            Our Pricing Plans
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            paragraph
          >
            Choose the plan that fits your needs. Simple and transparent
            pricing.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan) => (
              <Grid item xs={12} sm={6} md={4} key={plan.title}>
                <Card className="pricing-card">
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {plan.title}
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {plan.price}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {plan.description}
                    </Typography>
                    <ul className="feature-list">
                      {plan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" fullWidth color="primary">
                      Choose {plan.title}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

const plans = [
  {
    title: "Basic",
    price: "$19/mo",
    description: "Great for small teams and starters.",
    features: ["1 project", "Basic analytics", "Email support"],
  },
  {
    title: "Pro",
    price: "$49/mo",
    description: "Perfect for growing teams.",
    features: ["10 projects", "Advanced analytics", "Priority support"],
  },
  {
    title: "Enterprise",
    price: "$99/mo",
    description: "Best for large scale solutions.",
    features: [
      "Unlimited projects",
      "Custom integrations",
      "Dedicated support",
    ],
  },
];
