import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal } from "lucide-react";

export interface Deal {
  company: string;
  amount: string;
  stage: string;
  probability: number;
  owner: string;
  daysInStage: number;
  status: string;
}

export function DealsWidget({ recentDeals }: { recentDeals: Deal[] }) {
  return (
    <Card className="border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Pipeline Overview</CardTitle>
          <CardDescription>Your most active deals</CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentDeals.map((deal, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="font-medium text-foreground">{deal.company}</h4>
                <Badge
                  variant={
                    deal.status === "hot"
                      ? "destructive"
                      : deal.status === "warm"
                      ? "default"
                      : "secondary"
                  }
                  className="text-xs"
                >
                  {deal.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{deal.amount}</span>
                <span>•</span>
                <span>{deal.stage}</span>
                <span>•</span>
                <span>{deal.owner}</span>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Probability</span>
                  <span>{deal.probability}%</span>
                </div>
                <Progress value={deal.probability} className="h-1" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 