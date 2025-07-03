import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MoreVertical, ArrowLeft } from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuotes } from "@/context/QuotesContext";
import ProgressTimeline from "@/components/OpportunityStageIndicator";
import { LineItems } from '@/components/LineItems';
import { ActivityHistory } from '@/components/ActivityHistory';

export default function QuoteDetail() {
  const { quoteId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { quotes, updateQuote } = useQuotes();

  // --- Data Loading Logic ---
  const quoteFromContext = quotes.find(q => q.id === quoteId);
  const quote = quoteFromContext || state?.quote;

  // --- Event Handlers ---
  const handleStageChange = (newStage: string) => {
    if (quote) {
      let newStatus = 'pending';
      if (newStage === 'Closed Won') {
        newStatus = 'approved';
      } else if (newStage === 'Closed Lost') {
        newStatus = 'rejected';
      }
      
      const updatedQuote = { ...quote, stage: newStage, status: newStatus };
      updateQuote(updatedQuote);
    }
  };

  // --- Render Logic ---
  if (!quote) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-lg text-red-600">Quote not found.</h1>
        <Button onClick={() => navigate('/quotes')} className="mt-4">Go Back to Quotes</Button>
      </div>
    );
  }

  return (
    <div className="p-0 bg-background min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">
            {quote.customer || 'No Customer'} 
            <span className="text-muted-foreground font-normal"> - {quote.amount || 'N/A'}</span>
          </h1>
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
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-background">
          {/* Interactive Stage Bar */}
          <div className="mb-6">
            <div className="grid grid-cols-1 overflow-hidden">
              <ProgressTimeline
                stages={[
                  "Qualification",
                  "Proposal",
                  "Negotiation",
                  "Closed Won",
                  "Closed Lost",
                ]}
                currentStage={quote.stage}
                onStageChange={handleStageChange}
              />
            </div>
          </div>
          
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader><CardTitle>Quote Information</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Owner:</strong> {quote.owner || 'Unassigned'}</p>
                <p><strong>Amount:</strong> {quote.amount || 'N/A'}</p>
                <p><strong>Closing Date:</strong> {quote.closingDate || 'Not set'}</p>
                <p><strong>Probability:</strong> {quote.probability || 0}%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
              <CardContent className="flex items-center space-x-4">
                <img src={quote.contact?.avatar || 'https://via.placeholder.com/48'} alt="contact" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{quote.contact?.name || 'No Contact Name'}</p>
                  <p className="text-xs text-muted-foreground">{quote.contact?.company || 'No Company'}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Deal Owner</CardTitle></CardHeader>
              <CardContent>
                <p>{quote.dealOwner || 'Unassigned'}</p>
              </CardContent>
            </Card>
          </div>

          {/* New Modules */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineItems items={quote.lineItems} />
            <ActivityHistory activities={quote.activityHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}