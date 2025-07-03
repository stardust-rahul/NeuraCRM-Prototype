import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OrderEditLog({ log }) {
  // log: Array<{ date: string, user: string, changes: string }>
  return (
    <Card className="mt-6 bg-gradient-to-r from-blue-50 to-white border-blue-200">
      <CardHeader>
        <CardTitle>Edit Log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {log && log.length > 0 ? (
          log.map((entry, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center md:space-x-4 border-b last:border-b-0 pb-2">
              <span className="text-xs text-muted-foreground w-32">{new Date(entry.date).toLocaleString()}</span>
              <span className="font-semibold text-blue-900">{entry.user}</span>
              <span className="text-sm text-gray-700">{entry.changes}</span>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">No edits yet.</div>
        )}
      </CardContent>
    </Card>
  );
}
