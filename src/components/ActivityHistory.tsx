import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Calendar } from 'lucide-react';

const ICONS = {
  call: <Phone className="w-4 h-4 text-white" />,
  email: <Mail className="w-4 h-4 text-white" />,
  meeting: <Calendar className="w-4 h-4 text-white" />,
};

const BG_COLORS = {
  call: 'bg-blue-500',
  email: 'bg-green-500',
  meeting: 'bg-purple-500',
};

export const ActivityHistory = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No activities recorded for this quote.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200" style={{ transform: 'translateX(11.5px)' }}></div>
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative flex items-start pb-8">
              <div className={`absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full ${BG_COLORS[activity.type] || 'bg-gray-500'}`}>
                {ICONS[activity.type] || null}
              </div>
              <div className="ml-10">
                <p className="font-semibold">{activity.details}</p>
                <p className="text-sm text-muted-foreground">{activity.user} on {activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
