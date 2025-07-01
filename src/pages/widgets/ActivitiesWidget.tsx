import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export interface Activity {
  action: string;
  details: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

export function ActivitiesWidget({ activities }: { activities: Activity[] }) {
  return (
    <Card className="border border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activities</CardTitle>
        <CardDescription>Latest updates across your CRM</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 