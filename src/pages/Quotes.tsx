import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import ProgressTimeline from "@/components/OpportunityStageIndicator";
import { useQuotes } from "@/context/QuotesContext";

const stages = [
  "Qualification",
  "Needs Analysis",
  "Value Proposition",
  "Identify Decision Makers",
  "Proposal/Price Quote",
  "Negotiation/Review",
  "Closed Won",
  "Closed Lost",
  "Closed Lost to Competition",
];



export default function Quotes() {
  const { quotes, addQuote, updateQuote, removeQuote } = useQuotes();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [newQuote, setNewQuote] = useState({
    customer: "",
    amount: "",
    status: "pending",
    created: new Date().toISOString().split("T")[0],
    owner: "",
    contactName: "",
    contactCompany: "",
    stage: stages[0],
  });
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [editQuote, setEditQuote] = useState(null);
  const [viewQuote, setViewQuote] = useState(null);

  const filteredQuotes = quotes.filter(
    (q) =>
      q.customer.toLowerCase().includes(search.toLowerCase()) ||
      q.amount.toLowerCase().includes(search.toLowerCase()) ||
      q.owner.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (editQuote) {
      updateQuote({ ...editQuote, ...newQuote });
    } else {
      const quoteToAdd = {
        customer: newQuote.customer,
        amount: newQuote.amount,
        owner: newQuote.owner,
        contact: {
          name: newQuote.contactName,
          company: newQuote.contactCompany,
        },
        stage: newQuote.stage,
      };
      const addedQuote = addQuote(quoteToAdd);
      if (addedQuote && addedQuote.id) {
        navigate(`/quotes/${addedQuote.id}`, { state: { quote: addedQuote } });
      }
    }

    setAddOpen(false);
    setEditQuote(null);
    setNewQuote({
      customer: "",
      amount: "",
      status: "pending",
      created: new Date().toISOString().split("T")[0],
      owner: "",
      contactName: "",
      contactCompany: "",
      stage: stages[0],
    });
  };

  const handleDelete = (id) => {
    removeQuote(id);
  };

  return (
    <div className="p-0 bg-background min-h-screen">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Quotes</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="     Search quotes..."
              className="w-56 pl-10 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            Import
          </Button>
          <Button variant="outline" size="sm">
            Actions
          </Button>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Quote
          </Button>
        </div>
      </div>

      <div className="px-8 py-8">
        <div className="overflow-x-auto rounded border border-border/50 bg-white shadow-sm">
          <Table className="min-w-full border-separate border-spacing-0">
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-300">
                <TableHead className="w-[40px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">
                  <input
                    type="checkbox"
                    checked={
                      selectedQuotes.length === filteredQuotes.length &&
                      filteredQuotes.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedQuotes(filteredQuotes.map((q) => q.id));
                      } else {
                        setSelectedQuotes([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead className="w-[50px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">
                  #
                </TableHead>
                <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">
                  Customer
                </TableHead>
                <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">
                  Amount
                </TableHead>
                <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">
                  Status
                </TableHead>
                <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">
                  Created
                </TableHead>
                <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">
                  Owner
                </TableHead>
                <TableHead className="text-left px-2 py-2 font-bold text-gray-700 bg-gray-100">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote, idx) => (
                <TableRow
                  key={quote.id || idx}
                  className="border-b border-gray-300 text-sm group hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() =>
                    navigate(`/quotes/${quote.id}`, { state: { quote } })
                  }
                >
                  <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                    <input
                      type="checkbox"
                      checked={selectedQuotes.includes(quote.id)}
                      onChange={(e) => {
                        if (e.target.checked)
                          setSelectedQuotes([...selectedQuotes, quote.id]);
                        else
                          setSelectedQuotes(
                            selectedQuotes.filter((id) => id !== quote.id)
                          );
                      }}
                    />
                  </TableCell>
                  <TableCell className="px-2 py-1 text-muted-foreground border-r border-gray-200 bg-white group-hover:bg-blue-50">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="px-2 py-1 font-medium border-r border-gray-200 bg-white group-hover:bg-blue-50 text-blue-600">
                    {quote.customer}
                  </TableCell>
                  <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                    {quote.amount}
                  </TableCell>
                  <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
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
                  <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                    {quote.created}
                  </TableCell>
                  <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                    {quote.owner}
                  </TableCell>
                  <TableCell className="px-2 py-1 text-left bg-white group-hover:bg-blue-50">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setViewQuote(quote)}
                        >
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditQuote(quote);
                            setNewQuote(quote);
                            setAddOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" /> Edit Quote
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(quote.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Quote Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editQuote ? "Edit Quote" : "Add Quote"}</DialogTitle>
            <DialogDescription>Enter details for a quote.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAdd}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer</label>
                <Input
                  value={newQuote.customer}
                  onChange={(e) =>
                    setNewQuote((q) => ({ ...q, customer: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <Input
                  value={newQuote.amount}
                  onChange={(e) =>
                    setNewQuote((q) => ({ ...q, amount: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Owner</label>
                <Input
                  id="owner"
                  value={newQuote.owner}
                  onChange={(e) =>
                    setNewQuote({ ...newQuote, owner: e.target.value })
                  }
                  placeholder="Owner ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Name
                </label>
                <Input
                  id="contactName"
                  value={newQuote.contactName}
                  onChange={(e) =>
                    setNewQuote({ ...newQuote, contactName: e.target.value })
                  }
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company
                </label>
                <Input
                  id="contactCompany"
                  value={newQuote.contactCompany}
                  onChange={(e) =>
                    setNewQuote({ ...newQuote, contactCompany: e.target.value })
                  }
                  placeholder="e.g. Acme Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newQuote.status}
                  onChange={(e) =>
                    setNewQuote((q) => ({ ...q, status: e.target.value }))
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stage</label>
                <select className="w-full border rounded px-2 py-1" value={newQuote.stage} onChange={e => setNewQuote(q => ({ ...q, stage: e.target.value }))}>
                  {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Created Date</label>
                <Input type="date" value={newQuote.created} onChange={e => setNewQuote(q => ({ ...q, created: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editQuote ? "Update Quote" : "Add Quote"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Quote Modal */}
      <Dialog open={!!viewQuote} onOpenChange={open => { if (!open) setViewQuote(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quote Details</DialogTitle>
            <DialogDescription>Detailed information about the selected quote.</DialogDescription>
          </DialogHeader>
          {viewQuote && (
            <div className="space-y-2">
              <div><b>Customer:</b> {viewQuote.customer}</div>
              <div><b>Amount:</b> {viewQuote.amount}</div>
              <div><b>Status:</b> {viewQuote.status}</div>
              <div><b>Created:</b> {viewQuote.created}</div>
              <div><b>Owner:</b> {viewQuote.owner}</div>
              <div>
                <label className="block text-sm font-medium mb-1">Stage</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={viewQuote.stage || stages[0]}
                  onChange={e => {
                    const updated = { ...viewQuote, stage: e.target.value };
                    setViewQuote(updated);
                    updateQuote(updated);
                  }}
                >
                  {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>
              <ProgressTimeline
                stages={stages}
                currentStage={viewQuote.stage || stages[0]}
                startDate={viewQuote.created}
                onStageChange={stage => {
                  const updated = { ...viewQuote, stage };
                  setViewQuote(updated);
                  updateQuote(updated);
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 