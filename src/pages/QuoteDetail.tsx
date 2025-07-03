import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Eye, Edit, Trash2, MoreVertical, Mail, Phone } from "lucide-react";
import { useParams } from "react-router-dom";
import ProgressTimeline from "@/components/OpportunityStageIndicator";
import { useQuotes } from "@/context/QuotesContext";

const initialQuotes = [
  {
    id: "Q-001",
    customer: "Acme Corporation",
    amount: "$12,500",
    status: "pending",
    created: "2024-06-01",
    owner: "Sarah Johnson",
    dealOwner: "Sarah Johnson",
    stage: "Needs Analysis",
    probability: 20,
    expectedRevenue: "-",
    closingDate: "17/05/2025",
    contact: {
      name: "Sage Wieser (Sample)",
      company: "Acme Corporation",
      email: "sage-wieser@noemail.invalid",
      phone: "555-555-5555",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    nextAction: {
      date: "MAY 18",
      action: "Refer CRM Videos",
    },
    notes: [],
    attachments: [],
  },
  {
    id: "Q-002",
    customer: "TechFlow Inc",
    amount: "$7,800",
    status: "approved",
    created: "2024-06-03",
    owner: "Mike Chen",
    dealOwner: "Mike Chen",
    stage: "Value Proposition",
    probability: 50,
    expectedRevenue: "$7,800",
    closingDate: "20/06/2025",
    contact: {
      name: "Alex Smith (Sample)",
      company: "TechFlow Inc",
      email: "alex-smith@noemail.invalid",
      phone: "555-555-1234",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    nextAction: {
      date: "JUN 01",
      action: "Send Proposal",
    },
    notes: [],
    attachments: [],
  },
];

export default function QuoteDetail() {
  const { quoteId } = useParams();
  const { quotes } = useQuotes();
  const quote = quotes.find(q => q.id === quoteId);
  if (!quote) {
    return <div className="p-8 text-center text-lg text-red-600">Quote not found.</div>;
  }

  return (
    <div className="p-0 bg-background min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="mr-2">←</Button>
          <h1 className="text-xl font-bold">{quote.customer} <span className="text-muted-foreground font-normal">- {quote.amount}</span></h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Send Email</Button>
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
        </div>
      </div>
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r p-4 flex flex-col gap-4">
          <div>
            <div className="font-semibold mb-2">Related List</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Notes</li>
              <li>Attachments</li>
              <li>Stage History</li>
              <li>Competitors</li>
              <li>Open Activities</li>
              <li>Closed Activities</li>
              <li>Contact Roles</li>
              <li>Emails</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Sales Summary</div>
            <div className="text-xs text-muted-foreground">Lead Conversion Time: <b>NA</b></div>
            <div className="text-xs text-muted-foreground">Sales Cycle Duration: <b>1 day(s)</b></div>
            <div className="text-xs text-muted-foreground">Overall Sales Duration: <b>1 day(s)</b></div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-8 bg-background">
          {/* Stage Bar */}
          <div className="mb-6">
            <ProgressTimeline
              stages={[
                "Qualification",
                "Needs Analysis",
                "Value Proposition",
                "Identify Decision Makers",
                "Proposal/Price Quote",
                "Negotiation/Review",
                "Closed Won",
                "Closed Lost",
                "Closed Lost to Competition",
              ]}
              currentStage={quote.stage}
              startDate={quote.created}
            />
          </div>
          {/* Deal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><b>Deal Owner:</b> {quote.dealOwner}</div>
                <div><b>Stage:</b> {quote.stage}</div>
                <div><b>Probability (%):</b> {quote.probability}</div>
                <div><b>Expected Revenue:</b> {quote.expectedRevenue}</div>
                <div><b>Closing Date:</b> {quote.closingDate}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contact Person</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <img src={quote.contact.avatar} alt="avatar" className="w-12 h-12 rounded-full border" />
                <div>
                  <div className="font-semibold">{quote.contact.name}</div>
                  <div className="text-xs text-muted-foreground">at {quote.contact.company}</div>
                  <div className="flex items-center text-xs mt-1">
                    <Mail className="w-4 h-4 mr-1" /> {quote.contact.email}
                  </div>
                  <div className="flex items-center text-xs mt-1">
                    <Phone className="w-4 h-4 mr-1" /> {quote.contact.phone}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Next Action */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Next Action</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <Badge variant="destructive">{quote.nextAction.date}</Badge>
                <span className="font-medium">{quote.nextAction.action}</span>
              </CardContent>
            </Card>
          </div>
          {/* Notes & Attachments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">No notes yet.</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">No attachments yet.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 