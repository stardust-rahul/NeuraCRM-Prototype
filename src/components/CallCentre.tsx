import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CallCentre({ lead }) {
    return (
        <Card className="border-none shadow-none">
            <CardContent className="space-y-4 pt-6">
                <div>
                    <p className="font-semibold text-sm">Contact Info:</p>
                    <p className="text-sm">{lead.contact || lead.name} - {lead.phone}</p>
                </div>
                <div>
                    <p className="font-semibold text-sm">Your Number:</p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                </div>
                <div>
                    <p className="font-semibold text-sm">Call History:</p>
                    <p className="text-sm text-muted-foreground">No recent calls.</p>
                </div>
                <Button className="w-full">Start Call</Button>
            </CardContent>
        </Card>
    )
} 