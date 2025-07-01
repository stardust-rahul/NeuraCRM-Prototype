import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Phone, Mail, Calendar, TrendingUp } from "lucide-react";

export interface Task {
  task: string;
  type: string;
  time: string;
  priority: string;
  contact: string;
}

export function TasksWidget({ upcomingTasks }: { upcomingTasks: Task[] }) {
  return (
    <Card className="border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Today's Tasks</CardTitle>
          <CardDescription>Your upcoming activities</CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingTasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {task.type === "Call" && <Phone className="w-4 h-4 text-primary" />}
              {task.type === "Email" && <Mail className="w-4 h-4 text-primary" />}
              {task.type === "Meeting" && <Calendar className="w-4 h-4 text-primary" />}
              {task.type === "Document" && <TrendingUp className="w-4 h-4 text-primary" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-foreground">{task.task}</h4>
                <Badge
                  variant={
                    task.priority === "high"
                      ? "destructive"
                      : task.priority === "medium"
                      ? "default"
                      : "secondary"
                  }
                  className="text-xs"
                >
                  {task.priority}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{task.contact}</span>
                <span>•</span>
                <span>{task.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 