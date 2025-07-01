import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash, ArrowUpRight, MoreHorizontal } from "lucide-react";

export default function LeadsList({ leads, onLeadClick }) {
  return (
    <div className="overflow-x-auto rounded border border-border/50 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-[40px] px-2">
              <input type="checkbox" />
            </TableHead>
            <TableHead className="w-[50px] px-2">#</TableHead>
            <TableHead className="px-2 py-2">Name</TableHead>
            <TableHead className="px-2 py-2">Email</TableHead>
            <TableHead className="px-2 py-2">Phone</TableHead>
            <TableHead className="px-2 py-2">Company</TableHead>
            <TableHead className="px-2 py-2">Title</TableHead>
            <TableHead className="px-2 py-2">Source</TableHead>
            <TableHead className="px-2 py-2">Score</TableHead>
            <TableHead className="px-2 py-2">Status</TableHead>
            <TableHead className="px-2 py-2">Created</TableHead>
            <TableHead className="px-2 py-2">Updated</TableHead>
            <TableHead className="px-2 py-2">Notes</TableHead>
            <TableHead className="text-right px-2 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead, idx) => {
            const company = lead.name || "-";
            const title =
              lead.title ||
              [
                "CTO",
                "CEO",
                "Director of Marketing",
                "Product Manager",
                "VP of Technology",
                "Digital Marketing",
                "IT Director",
                "Senior Consultant",
                "Founder",
                "VP of Marketing",
              ][idx % 10];
            const source =
              lead.source ||
              [
                "referral",
                "social",
                "email",
                "event",
                "cold-call",
                "website",
                "referral",
                "social",
                "website",
                "website",
              ][idx % 10];
            const score =
              lead.score || [92, 78, 65, 88, 45, 72, 81, 58, 90, 85][idx % 10];
            const status =
              lead.status ||
              [
                "qualified",
                "qualified",
                "new",
                "hot",
                "cold",
                "qualified",
                "qualified",
                "new",
                "hot",
                "hot",
              ][idx % 10];
            const created = lead.created || "06/26/25";
            const updated = lead.updated || "06/26/25";
            const notes =
              lead.notes ||
              [
                "Referred by existing customer",
                "Connected via LinkedIn",
                "Downloaded whitepaper",
                "Met at conference, urgent follow-up",
                "Initial contact made, awaiting reply",
                "Completed demo recently",
                "Needs integration with ERP",
                "Early stage inquiry, exploring options",
                "Ready to purchase, just needs approval",
                "Interested in enterprise plan",
              ][idx % 10];
            // Score badge color
            let scoreColor: "default" | "destructive" | "outline" | "secondary" =
              "secondary";
            if (score >= 85) scoreColor = "default";
            else if (score >= 70) scoreColor = "secondary";
            else scoreColor = "destructive";
            // Status badge color
            let statusVariant: "default" | "destructive" | "outline" | "secondary" =
              "outline";
            if (status === "qualified") statusVariant = "default";
            else if (status === "hot") statusVariant = "secondary";
            else if (status === "cold") statusVariant = "destructive";
            else if (status === "new") statusVariant = "outline";

            return (
              <TableRow
                key={lead.id || idx}
                className="border-b hover:bg-muted/30 text-sm"
              >
                <TableCell className="px-2 py-1">
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="px-2 py-1 text-muted-foreground">
                  {idx + 1}
                </TableCell>
                <TableCell className="px-2 py-1 font-medium">
                  <button
                    onClick={() => onLeadClick(lead, idx)}
                    className="text-blue-600 hover:underline text-left"
                  >
                    {lead.contact || lead.name}
                  </button>
                </TableCell>
                <TableCell className="px-2 py-1">{lead.email}</TableCell>
                <TableCell className="px-2 py-1">{lead.phone}</TableCell>
                <TableCell className="px-2 py-1 font-bold">{company}</TableCell>
                <TableCell className="px-2 py-1">{title}</TableCell>
                <TableCell className="px-2 py-1">{source}</TableCell>
                <TableCell className="px-2 py-1">
                  <Badge variant={scoreColor}>{score}</Badge>
                </TableCell>
                <TableCell className="px-2 py-1">
                  <Badge variant={statusVariant}>{status}</Badge>
                </TableCell>
                <TableCell className="px-2 py-1">{created}</TableCell>
                <TableCell className="px-2 py-1">{updated}</TableCell>
                <TableCell className="px-2 py-1 max-w-xs truncate" title={notes}>
                  {notes}
                </TableCell>
                <TableCell className="px-2 py-1 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onLeadClick(lead, idx)}>
                        <Eye className="w-4 h-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" /> Edit Lead
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowUpRight className="w-4 h-4 mr-2" /> Convert to
                        Opportunity
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 focus:text-red-600">
                        <Trash className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
} 