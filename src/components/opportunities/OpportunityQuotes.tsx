import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuotes } from "@/context/QuotesContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function OpportunityQuotes({ opportunity }) {
  const { quotes, addQuote } = useQuotes();
  const [addOpen, setAddOpen] = useState(false);
  const [newQuote, setNewQuote] = useState({
    customer: opportunity.title || opportunity.account || '',
    amount: '',
    status: 'pending',
    created: new Date().toISOString().split("T")[0],
    owner: '',
    contactName: '',
    contactCompany: opportunity.account || '',
    stage: 'Qualification',
    opportunityId: opportunity.id,
  });

  if (!opportunity) return null;
  // Match quotes by opportunityId (deal)
  const relatedQuotes = quotes.filter(q => q.opportunityId === opportunity.id);

  const handleAdd = (e) => {
    e.preventDefault();
    const quoteToAdd = {
      customer: opportunity.title || newQuote.customer, // Always use deal name for customer field
      amount: newQuote.amount,
      owner: newQuote.owner,
      contact: {
        name: newQuote.contactName,
        company: newQuote.contactCompany,
      },
      stage: newQuote.stage,
      status: newQuote.status,
      created: newQuote.created,
      opportunityId: opportunity.id,
    };
    addQuote(quoteToAdd);
    setAddOpen(false);
    setNewQuote({
      customer: opportunity.title || opportunity.account || '',
      amount: '',
      status: 'pending',
      created: new Date().toISOString().split("T")[0],
      owner: '',
      contactName: '',
      contactCompany: opportunity.account || '',
      stage: 'Qualification',
      opportunityId: opportunity.id,
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-base font-semibold">
          <span>Quotes ({relatedQuotes.length})</span>
          <div className="flex gap-2 items-center">
            <Button size="sm" onClick={() => setAddOpen(true)}>
              Add Quote
            </Button>
            <Button asChild variant="link" className="p-0 h-auto text-sm text-blue-600">
              <Link to="/quotes">View All</Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {relatedQuotes.length === 0 ? (
          <div className="text-gray-500 text-sm">No quotes for this opportunity's account.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-full border-separate border-spacing-0">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-2 py-2">#</TableHead>
                  <TableHead className="px-2 py-2">Deal</TableHead>
                  <TableHead className="px-2 py-2">Amount</TableHead>
                  <TableHead className="px-2 py-2">Status</TableHead>
                  <TableHead className="px-2 py-2">Created</TableHead>
                  <TableHead className="px-2 py-2">Owner</TableHead>
                  <TableHead className="px-2 py-2">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relatedQuotes.map((quote, idx) => (
                  <TableRow key={quote.id || idx}>
                    <TableCell className="px-2 py-1">{idx + 1}</TableCell>
                    <TableCell className="px-2 py-1 font-medium text-blue-600">
                      <Link to={`/quotes/${quote.id}`}>{quote.customer}</Link>
                    </TableCell>
                    <TableCell className="px-2 py-1">{quote.amount}</TableCell>
                    <TableCell className="px-2 py-1">
                      <Badge
                        variant={
                          quote.status === "approved"
                            ? "default"
                            : quote.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-2 py-1">{quote.created}</TableCell>
                    <TableCell className="px-2 py-1">{quote.owner}</TableCell>
                    <TableCell className="px-2 py-1">
                      <Button asChild variant="link" size="sm" className="p-0 h-auto text-blue-600">
                        <Link to={`/quotes/${quote.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      {/* Add Quote Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Quote</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAdd}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Deal</label>
                <Input
                  value={newQuote.customer}
                  onChange={(e) => setNewQuote((q) => ({ ...q, customer: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <Input
                  value={newQuote.amount}
                  onChange={(e) => setNewQuote((q) => ({ ...q, amount: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Owner</label>
                <Input
                  value={newQuote.owner}
                  onChange={(e) => setNewQuote((q) => ({ ...q, owner: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Name</label>
                <Input
                  value={newQuote.contactName}
                  onChange={(e) => setNewQuote((q) => ({ ...q, contactName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <Input
                  value={newQuote.contactCompany}
                  onChange={(e) => setNewQuote((q) => ({ ...q, contactCompany: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newQuote.status}
                  onChange={(e) => setNewQuote((q) => ({ ...q, status: e.target.value }))}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stage</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newQuote.stage}
                  onChange={(e) => setNewQuote((q) => ({ ...q, stage: e.target.value }))}
                >
                  <option value="Qualification">Qualification</option>
                  <option value="Needs Analysis">Needs Analysis</option>
                  <option value="Value Proposition">Value Proposition</option>
                  <option value="Identify Decision Makers">Identify Decision Makers</option>
                  <option value="Proposal/Price Quote">Proposal/Price Quote</option>
                  <option value="Negotiation/Review">Negotiation/Review</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                  <option value="Closed Lost to Competition">Closed Lost to Competition</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Created Date</label>
                <Input
                  type="date"
                  value={newQuote.created}
                  onChange={(e) => setNewQuote((q) => ({ ...q, created: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Quote</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
} 