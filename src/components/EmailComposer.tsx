import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EmailComposer({ lead }) {
    return (
        <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="from" className="text-xs">From:</Label>
                    <Input id="from" defaultValue="john@company.com" />
                </div>
                <div>
                    <Label htmlFor="to" className="text-xs">To:</Label>
                    <Input id="to" defaultValue={lead.email} />
                </div>
            </div>
            <div>
                <Label htmlFor="cc" className="text-xs">Cc:</Label>
                <Input id="cc" />
            </div>
            <div>
                <Label htmlFor="bcc" className="text-xs">Bcc:</Label>
                <Input id="bcc" />
            </div>
            <div>
                <Label htmlFor="subject" className="text-xs">Subject:</Label>
                <Input id="subject" placeholder="Regarding your inquiry..." />
            </div>
            <div>
                <Textarea placeholder="Compose your email..." rows={6} />
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <Button variant="outline" size="sm">Attach Files</Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Cancel</Button>
                    <Button variant="secondary" size="sm">Save as Draft</Button>
                    <Button size="sm">Send Email</Button>
                </div>
            </div>
        </div>
    )
} 