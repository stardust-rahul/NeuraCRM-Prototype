import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Package,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  Target,
  ShoppingCart,
  Receipt,
  Truck,
  Trash,
  MoreHorizontal,
  ArrowUpRight,
  ArrowLeft,
  Building,
  User,
  Tag,
  Clock,
  Check,
  Building2,
  Contact2,
  Crown,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLeads } from "@/context/LeadsContext";
import { useAccounts } from "@/context/AccountsContext";
import { useContacts } from "@/context/ContactsContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import LeadsList from "@/components/LeadsList";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Contacts from "@/pages/Contacts";
import { OpportunitiesList, initialOpportunities as sharedInitialOpportunities } from "./Opportunities";
import { useOpportunities } from "@/context/OpportunitiesContext";
import Accounts from "./Accounts";
import AccountDetail from "./AccountDetail";

const salesMetrics = [
  {
    title: "Total Revenue",
    value: "$847,239",
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Leads",
    value: "342",
    change: "+8.1%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Win Rate",
    value: "67%",
    change: "+5.2%",
    trend: "up",
    icon: Target,
  },
  {
    title: "Deals Closed",
    value: "89",
    change: "+15.4%",
    trend: "up",
    icon: TrendingUp,
  },
];

const initialLeads = [
  {
    id: "L-001",
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    status: "qualified",
    priority: "high",
    value: "$45,000",
    owner: "Sarah Johnson",
    tags: ["Enterprise", "Hot Lead"],
    lastContact: "2 days ago",
  },
  {
    id: "L-002",
    name: "TechFlow Inc",
    contact: "Emily Davis",
    email: "emily@techflow.com",
    phone: "+1 (555) 987-6543",
    status: "contacted",
    priority: "medium",
    value: "$28,000",
    owner: "Mike Chen",
    tags: ["SMB", "Follow-up"],
    lastContact: "1 week ago",
  },
];

const initialProducts = [
  {
    id: "P-001",
    name: "NeuraCRM Enterprise",
    image: "https://via.placeholder.com/150",
    price: "$299/month",
    stock: 50,
    category: "Software",
  },
  {
    id: "P-002",
    name: "Professional Services",
    image: "https://via.placeholder.com/150",
    price: "$150/hour",
    stock: "Unlimited",
    category: "Services",
  },
];

const initialQuotes = [
  {
    id: "Q-001",
    customer: "Acme Corporation",
    amount: "$12,500",
    status: "pending",
    created: "2024-06-01",
    owner: "Sarah Johnson",
  },
  {
    id: "Q-002",
    customer: "TechFlow Inc",
    amount: "$7,800",
    status: "approved",
    created: "2024-06-03",
    owner: "Mike Chen",
  },
];

const initialOrders = [
  {
    id: "O-001",
    customer: "Acme Corporation",
    total: "$12,500",
    status: "processing",
    payment: "paid",
    created: "2024-06-04",
    shipment: "in transit",
  },
  {
    id: "O-002",
    customer: "TechFlow Inc",
    total: "$7,800",
    status: "completed",
    payment: "paid",
    created: "2024-06-05",
    shipment: "delivered",
  },
];

function LeadPipeline({ currentStage, onStageChange, onSelectConvertedStatus }) {
  const stages = ["New", "Contacted", "Nurturing", "Unqualified", "Converted"];
  const currentIdx = stages.findIndex(
    (s) => s.toLowerCase() === (currentStage?.toLowerCase() || "new")
  );
  return (
    <div className="w-full flex flex-col sm:flex-row items-center px-2 sm:px-8 pt-6 pb-2">
      <div className="flex-1 flex items-center w-full overflow-x-auto">
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isFuture = idx > currentIdx;
          let base = "flex-1 flex items-center min-w-[120px] max-w-full";
          let btn =
            "w-full h-12 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none ";
          let bg = isCompleted
            ? "bg-teal-200 text-teal-900"
            : isCurrent
            ? "bg-white border-2 border-blue-500 text-blue-900 font-semibold"
            : "bg-gray-200 text-gray-600";
          let border = isCurrent ? "border-blue-500" : "border-transparent";
          let hover = isFuture ? "hover:bg-gray-200" : isCompleted ? "hover:bg-teal-700" : "hover:bg-blue-50";
          let ring = isCurrent ? "ring-2 ring-blue-400" : "";
          return (
            <div key={stage} className={base}>
              <button
                className={`${btn} ${bg} ${border} ${hover} ${ring}`}
                style={{ minWidth: 120 }}
                onClick={() => onStageChange(stage)}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? <Check className="w-4 h-4 mr-2" /> : null}
                <span>{stage}</span>
              </button>
              {idx < stages.length - 1 && (
                <div className="w-4 h-1 bg-gray-300 mx-1 rounded hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>
      {currentIdx === stages.length - 1 && (
        <button className="ml-0 sm:ml-4 mt-2 sm:mt-0 px-5 py-2 rounded-full bg-blue-500 text-white font-semibold flex items-center gap-2 hover:bg-blue-600 transition whitespace-nowrap shadow" onClick={onSelectConvertedStatus}>
          <Check className="w-5 h-5" /> Mark Status as Complete
        </button>
      )}
    </div>
  );
}

export default function Sales({ defaultTab = "analytics" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { leads, addLead, removeLead, updateLead } = useLeads();
  const { addAccount } = useAccounts();
  const { contacts, addContact, updateContact, removeContact } = useContacts();

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    status: "qualified",
    priority: "medium",
    value: "",
    owner: "",
    tags: "",
    lastContact: "today",
    company: "",
    title: "",
    source: "",
    score: "",
    created: "",
    updated: "",
    notes: "",
  });
  const [leadFilter, setLeadFilter] = useState("All Open Leads");
  const [leadSearch, setLeadSearch] = useState("");
  const leadFilterOptions = ["All Open Leads", "My Leads", "Qualified", "Hot", "Cold"];
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
    lead.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
    lead.company?.toLowerCase().includes(leadSearch.toLowerCase())
  );
  const [showContactForm, setShowContactForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    title: "",
    account: "",
    email: "",
    phone: "",
    status: "active",
    lastContact: "",
  });
  const [quotes, setQuotes] = useState(initialQuotes);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [newQuote, setNewQuote] = useState({
    customer: "",
    amount: "",
    status: "pending",
    created: "",
    owner: "",
    shipment: "",
  });
  const [orders, setOrders] = useState(initialOrders);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    total: "",
    status: "processing",
    payment: "unpaid",
    created: "",
    shipment: "pending",
  });
  const { opportunities, addOpportunity, removeOpportunity, updateOpportunity } = useOpportunities();
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [newOpportunity, setNewOpportunity] = useState({
    id: "",
    title: "",
    company: "",
    value: "",
    stage: "prospect",
    probability: 0,
    closeDate: "",
    owner: "",
    notes: "",
    created: "",
  });
  const [products, setProducts] = useState(initialProducts);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "https://via.placeholder.com/150",
    price: "",
    stock: "",
    category: "Software",
  });
  const [contactSearch, setContactSearch] = useState("");
  const [quoteSearch, setQuoteSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [leadsView, setLeadsView] = useState(10);
  const [leadsPage, setLeadsPage] = useState(1);
  const [contactsView, setContactsView] = useState(10);
  const [contactsPage, setContactsPage] = useState(1);
  const [quotesView, setQuotesView] = useState(10);
  const [quotesPage, setQuotesPage] = useState(1);
  const [ordersView, setOrdersView] = useState(10);
  const [ordersPage, setOrdersPage] = useState(1);
  const [productsView, setProductsView] = useState(10);
  const [productsPage, setProductsPage] = useState(1);
  const [viewLead, setViewLead] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertStep, setConvertStep] = useState("form");
  const [leadToConvert, setLeadToConvert] = useState(null);
  const [viewContact, setViewContact] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [viewQuote, setViewQuote] = useState(null);
  const [editQuote, setEditQuote] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [localStatus, setLocalStatus] = useState(null);
  const [convertForm, setConvertForm] = useState({
    accountType: "new",
    accountName: "",
    existingAccount: "",
    contactType: "new",
    contactName: "",
    existingContact: "",
    opportunityType: "new",
    opportunityName: "",
    dontCreateOpportunity: false,
    recordOwner: "Vishal Paswan",
    convertedStatus: "Qualified",
    opportunityValue: "",
  });

  // Add delete functions for contacts, quotes, and orders
  const handleDeleteContact = (id) => {
    removeContact(id);
  };
  const handleDeleteQuote = (id) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };
  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };
  // Add selection state for bulk actions
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const filteredContacts = (contacts || []).filter(c => !contactSearch || c.name.toLowerCase().includes(contactSearch.toLowerCase()) || c.email.toLowerCase().includes(contactSearch.toLowerCase()) || c.account.toLowerCase().includes(contactSearch.toLowerCase()));
  const filteredQuotes = (quotes || []).filter(q => !quoteSearch || q.customer.toLowerCase().includes(quoteSearch.toLowerCase()));
  const filteredOrders = (orders || []).filter(o => !orderSearch || o.customer.toLowerCase().includes(orderSearch.toLowerCase()));
  const filteredProducts = (products || []).filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()));

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleLeadInput = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    if (editLead) {
      updateLead({ ...editLead, ...newLead });
      toast({
        title: "Lead Updated",
        description: `Lead '${newLead.name}' was updated successfully!`,
      });
    } else {
      addLead(newLead);
      toast({
        title: "Lead Added",
        description: `Lead '${newLead.name}' was added successfully!`,
      });
    }
    setShowLeadForm(false);
    setEditLead(null);
    setNewLead({
      name: "",
      contact: "",
      email: "",
      phone: "",
      status: "qualified",
      priority: "medium",
      value: "",
      owner: "",
      tags: "",
      lastContact: "today",
      company: "",
      title: "",
      source: "",
      score: "",
      created: "",
      updated: "",
      notes: "",
    });
  };

  const handleContactInput = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (editContact) {
      updateContact({ ...editContact, ...newContact });
      toast({
        title: "Contact updated",
        description: `Contact '${newContact.name}' was updated successfully!`,
      });
    } else {
      addContact(newContact);
      toast({
        title: "Contact added",
        description: `The contact '${newContact.name}' was added successfully!`,
      });
    }
    setShowContactForm(false);
    setEditContact(null);
    setNewContact({
      name: "",
      title: "",
      account: "",
      email: "",
      phone: "",
      status: "active",
      lastContact: "",
    });
  };

  const handleQuoteInput = (e) => {
    const { name, value } = e.target;
    setNewQuote((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuote = (e) => {
    e.preventDefault();
    if (editQuote) {
      setQuotes((prev) => prev.map((q) => q.id === editQuote.id ? { ...editQuote, ...newQuote } : q));
      toast({
        title: "Quote updated",
        description: `Quote for '${newQuote.customer}' was updated successfully!`,
      });
    } else {
      setQuotes((prev) => [
        {
          ...newQuote,
          id: `Q-${(prev.length + 1).toString().padStart(3, "0")}`,
          created: newQuote.created || new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
      toast({
        title: "Quote created",
        description: `Quote for '${newQuote.customer}' was created successfully!`,
      });
    }
    setShowQuoteForm(false);
    setEditQuote(null);
    setNewQuote({
      customer: "",
      amount: "",
      status: "pending",
      created: "",
      owner: "",
      shipment: "",
    });
  };

  const handleOrderInput = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (editOrder) {
      setOrders((prev) => prev.map((o) => o.id === editOrder.id ? { ...editOrder, ...newOrder } : o));
      toast({
        title: "Order updated",
        description: `Order for '${newOrder.customer}' was updated successfully!`,
      });
    } else {
      setOrders((prev) => [
        {
          ...newOrder,
          id: `O-${(prev.length + 1).toString().padStart(3, "0")}`,
          created: newOrder.created || new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
      toast({
        title: "Order created",
        description: `Order for '${newOrder.customer}' was created successfully!`,
      });
    }
    setShowOrderForm(false);
    setEditOrder(null);
    setNewOrder({
      customer: "",
      total: "",
      status: "processing",
      payment: "unpaid",
      created: "",
      shipment: "pending",
    });
  };

  const handleOpportunityInput = (e) => {
    const { name, value } = e.target;
    setNewOpportunity((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOpportunity = (e) => {
    e.preventDefault();
    if (editingOpportunity) {
      updateOpportunity({ ...editingOpportunity, ...newOpportunity, probability: Number(newOpportunity.probability) });
      toast({ title: "Opportunity updated", description: `Opportunity '${newOpportunity.title}' updated successfully!` });
    } else {
      addOpportunity(newOpportunity);
      toast({ title: "Opportunity added", description: `Opportunity '${newOpportunity.title}' added successfully!` });
    }
    setShowOpportunityForm(false);
    setEditingOpportunity(null);
    setNewOpportunity({
      id: "",
      title: "",
      company: "",
      value: "",
      stage: "prospect",
      probability: 0,
      closeDate: "",
      owner: "",
      notes: "",
      created: "",
    });
  };

  const handleEditOpportunity = (opp) => {
    setEditingOpportunity(opp);
    setNewOpportunity({
      id: opp.id || "",
      title: opp.title || "",
      company: opp.company || "",
      value: opp.value || "",
      stage: opp.stage || "prospect",
      probability: opp.probability || 0,
      closeDate: opp.closeDate || "",
      owner: opp.owner || "",
      notes: opp.notes || "",
      created: opp.created || "",
    });
    setShowOpportunityForm(true);
  };

  const handleDeleteOpportunity = (id) => {
    removeOpportunity(id);
    toast({ title: "Opportunity deleted", description: `Opportunity deleted successfully!` });
  };

  const handleStageChange = (id, newStage) => {
    updateOpportunity({ ...opportunities.find(opp => opp.id === id), stage: newStage });
    toast({ title: "Stage changed", description: `Opportunity moved to '${newStage.charAt(0).toUpperCase() + newStage.slice(1)}' stage.` });
  };

  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...newProduct } : p
        )
      );
      toast({ title: "Product updated", description: `Product '${newProduct.name}' updated successfully!` });
    } else {
      setProducts((prev) => [
        {
          ...newProduct,
          id: `P-${(prev.length + 1).toString().padStart(3, "0")}`,
        },
        ...prev,
      ]);
      toast({ title: "Product added", description: `Product '${newProduct.name}' added successfully!` });
    }
    setShowProductForm(false);
    setEditingProduct(null);
    setNewProduct({
      name: "",
      image: "https://via.placeholder.com/150",
      price: "",
      stock: "",
      category: "Software",
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
    setShowProductForm(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Product deleted", description: `Product deleted successfully!` });
  };

  const handleDeleteLead = (id) => {
    removeLead(id);
  };

  // Utility to close all modals
  const resetAllModals = () => {
    setViewLead(null);
    setEditLead(null);
    setShowLeadForm(false);
    setViewContact(null);
    setEditContact(null);
    setShowContactForm(false);
    setViewQuote(null);
    setEditQuote(null);
    setShowQuoteForm(false);
    setViewOrder(null);
    setEditOrder(null);
    setShowOrderForm(false);
    setViewProduct(null);
    setEditingProduct(null);
    setShowProductForm(false);
    setShowConvertModal(false);
  };

  const handleLeadClick = (lead, idx) => {
    // Mock/placeholder data for missing fields (same as Leads.tsx)
    const company = lead.name || "-";
    const title = lead.title || [
      "CTO", "CEO", "Director of Marketing", "Product Manager", "VP of Technology", "Digital Marketing", "IT Director", "Senior Consultant", "Founder", "VP of Marketing"
    ][idx % 10];
    const source = lead.source || [
      "referral", "social", "email", "event", "cold-call", "website", "referral", "social", "website", "website"
    ][idx % 10];
    const score = lead.score || [92, 78, 65, 88, 45, 72, 81, 58, 90, 85][idx % 10];
    const status = lead.status || [
      "qualified", "qualified", "new", "hot", "cold", "qualified", "qualified", "new", "hot", "hot"
    ][idx % 10];
    const created = lead.created || "06/26/25";
    const updated = lead.updated || "06/26/25";
    const notes = lead.notes || [
      "Referred by existing customer", "Connected via LinkedIn", "Downloaded whitepaper", "Met at conference, urgent follow-up", "Initial contact made, awaiting reply", "Completed demo recently", "Needs integration with ERP", "Early stage inquiry, exploring options", "Ready to purchase, just needs approval", "Interested in enterprise plan"
    ][idx % 10];

    setSelectedLead({
      ...lead,
      company,
      title,
      source,
      score,
      status,
      created,
      updated,
      notes,
    });
  };

  const [localLeads, setLocalLeads] = useState(initialLeads);

  const handleLeadConversion = () => {
    // 1. Create Account
    if (convertForm.accountType === 'new' && convertForm.accountName) {
      addAccount({
        name: convertForm.accountName,
        owner: convertForm.recordOwner,
        created: new Date().toLocaleDateString(),
      });
    }
    // 2. Create Contact
    if (convertForm.contactType === 'new' && convertForm.contactName) {
      addContact({
        name: convertForm.contactName,
        account: convertForm.accountName,
        email: selectedLead?.email || '',
        phone: selectedLead?.phone || '',
        owner: convertForm.recordOwner,
      });
    }
    // 3. (Optional) Create Opportunity - already handled in form
    // 4. Set success step
    setConvertStep("success");
  };
  const handleConversionAndReturn = () => {
    if (selectedLead) {
      removeLead(selectedLead.id);
      setShowConvertModal(false);
      setSelectedLead(null);
    }
  };
  const resetConvertForm = () => {
    setConvertForm({
      accountType: "new",
      accountName: selectedLead?.company || "",
      existingAccount: "",
      contactType: "new",
      contactName: selectedLead?.contact || selectedLead?.name || "",
      existingContact: "",
      opportunityType: "new",
      opportunityName: selectedLead?.company ? `${selectedLead.company}-` : "",
      dontCreateOpportunity: false,
      recordOwner: "Vishal Paswan",
      convertedStatus: "Qualified",
      opportunityValue: "",
    });
  };

  const handleEditContact = (contact) => {
    setEditContact(contact);
    setNewContact(contact);
    setShowContactForm(true);
  };

  const [viewOpportunity, setViewOpportunity] = useState(null);
  const [viewAccount, setViewAccount] = useState(null);
  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            Sales
          </h1>
          
          <p className="text-muted-foreground mt-1">
            {activeTab === "leads"
              ? "Manage your leads and track their progress"
              : activeTab === "contacts"
              ? "All your contacts in one place"
              : activeTab === "opportunities"
              ? "Visualize and manage your sales pipeline"
              : activeTab === "quotes"
              ? "Create and manage sales quotes"
              : activeTab === "products"
              ? "Manage your products and services"
              : activeTab === "orders"
              ? "Track and fulfill customer orders"
              : "Manage your sales pipeline and track performance"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Sales Modules Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="flex w-full">
          <TabsTrigger className="flex-1" value="leads">Leads</TabsTrigger>
          <TabsTrigger className="flex-1" value="accounts">Accounts</TabsTrigger>
          <TabsTrigger className="flex-1" value="contacts">Contacts</TabsTrigger>
          <TabsTrigger className="flex-1" value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger className="flex-1" value="quotes">Quotes</TabsTrigger>
          <TabsTrigger className="flex-1" value="orders">Orders</TabsTrigger>
          <TabsTrigger className="flex-1" value="products">Products</TabsTrigger>
        </TabsList>

        {/* Leads Management */}
        <TabsContent value="leads" className="space-y-6">
          {selectedLead ? (
            <div className="min-h-screen bg-background ">
              {/* Pipeline/Progress Bar */}
              <LeadPipeline
                currentStage={localStatus || selectedLead.status}
                onStageChange={(stage) => setLocalStatus(stage)}
                onSelectConvertedStatus={() => setShowConvertModal(true)}
              />
              {/* Header */}
              <div className="border-b bg-white px-8 py-4 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedLead(null)}
                      className="flex items-center space-x-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Leads</span>
                    </Button>
                    <div className="h-6 w-px bg-border" />
                    <h1 className="text-xl font-semibold">{selectedLead.contact || selectedLead.name}</h1>
                    <Badge variant="outline">{selectedLead.company}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" onClick={() => setShowConvertModal(true)}>
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Convert
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lead Details */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Information */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Contact Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <User className="w-5 h-5" />
                          <span>Contact Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                            <p className="text-lg font-semibold">{selectedLead.contact || selectedLead.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                            <p className="text-lg">{selectedLead.title}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">
                                {selectedLead.email}
                              </a>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <a href={`tel:${selectedLead.phone}`} className="text-blue-600 hover:underline">
                                {selectedLead.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Company Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Building className="w-5 h-5" />
                          <span>Company Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Company Name</Label>
                            <p className="text-lg font-semibold">{selectedLead.company}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Source</Label>
                            <p className="text-lg capitalize">{selectedLead.source}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Deal Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5" />
                          <span>Deal Information</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Deal Value</Label>
                            <p className="text-lg font-semibold">{selectedLead.value || "$0"}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Owner</Label>
                            <p className="text-lg">{selectedLead.owner || "Unassigned"}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Priority</Label>
                            <Badge variant={selectedLead.priority === 'high' ? 'destructive' : selectedLead.priority === 'medium' ? 'secondary' : 'outline'}>
                              {selectedLead.priority}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                            <Badge variant={selectedLead.status === 'qualified' ? 'default' : selectedLead.status === 'hot' ? 'secondary' : selectedLead.status === 'cold' ? 'destructive' : 'outline'}>
                              {selectedLead.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Notes */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <FileText className="w-5 h-5" />
                          <span>Notes</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{selectedLead.notes}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Lead Score */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Lead Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">{selectedLead.score}</div>
                          <p className="text-sm text-muted-foreground">out of 100</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Tags */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Tag className="w-5 h-5" />
                          <span>Tags</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedLead.tags && typeof selectedLead.tags === 'string' && selectedLead.tags.trim() ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedLead.tags.split(',').map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No tags assigned</p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Clock className="w-5 h-5" />
                          <span>Timeline</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">Lead Updated</p>
                              <p className="text-xs text-muted-foreground">{selectedLead.updated}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">Lead Created</p>
                              <p className="text-xs text-muted-foreground">{selectedLead.created}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">Last Contact</p>
                              <p className="text-xs text-muted-foreground">{selectedLead.lastContact}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button className="w-full justify-start" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Lead
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Meeting
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <ArrowUpRight className="w-4 h-4 mr-2" />
                          Convert to Opportunity
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
          {/* Page Title and Filter Bar */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Leads</h1>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">View</label>
              <select className="border rounded px-2 py-1 text-sm" value={leadsView} onChange={e => { setLeadsView(Number(e.target.value)); setLeadsPage(1); }}>
                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <Button variant="outline" size="sm" disabled={leadsPage === 1} onClick={() => setLeadsPage(p => Math.max(1, p - 1))}>&lt;</Button>
              <span className="text-xs">Page {leadsPage} of {Math.max(1, Math.ceil(filteredLeads.length / leadsView))}</span>
              <Button variant="outline" size="sm" disabled={leadsPage === Math.ceil(filteredLeads.length / leadsView) || filteredLeads.length === 0} onClick={() => setLeadsPage(p => Math.min(Math.ceil(filteredLeads.length / leadsView), p + 1))}>&gt;</Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="w-56 pl-10"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">Import</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    selectedContacts.forEach(id => removeContact(id));
                    setSelectedContacts([]);
                    toast({ title: 'Contacts deleted', description: 'Selected contacts deleted successfully!' });
                  }}>Bulk Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setShowLeadForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Lead
              </Button>
            </div>
          </div>
          {/* New Lead Modal */}
          <Dialog open={showLeadForm} onOpenChange={open => { if (!open) resetAllModals(); else setShowLeadForm(true); }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Enter details for a new lead.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddLead} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" name="name" value={newLead.name} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Name</Label>
                    <Input id="contact" name="contact" value={newLead.contact} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={newLead.email} onChange={handleLeadInput} required type="email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={newLead.phone} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="value">Deal Value</Label>
                    <Input id="value" name="value" value={newLead.value} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="owner">Owner</Label>
                    <Input id="owner" name="owner" value={newLead.owner} onChange={handleLeadInput} required />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select id="priority" name="priority" value={newLead.priority} onChange={handleLeadInput} className="w-full border rounded px-2 py-1">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select id="status" name="status" value={newLead.status} onChange={handleLeadInput} className="w-full border rounded px-2 py-1">
                      <option value="qualified">Qualified</option>
                      <option value="contacted">Contacted</option>
                      <option value="new">New</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" name="tags" value={newLead.tags} onChange={handleLeadInput} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Lead</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {/* Leads Table */}
              <LeadsList leads={filteredLeads.slice((leadsPage-1)*leadsView, leadsPage*leadsView)} onLeadClick={handleLeadClick} />
            </>
          )}
        </TabsContent>
        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
           {viewAccount ? (
             <AccountDetail accountId={viewAccount.id} />
           ) : (
             <Accounts onAccountClick={setViewAccount} />
           )}
        </TabsContent>

        {/* Contacts */}
        <TabsContent value="contacts" className="space-y-6">
          <Contacts />
        </TabsContent>

        {/* Opportunities Pipeline */}
        <TabsContent value="opportunities" className="space-y-6">
          <OpportunitiesList
            opportunities={opportunities}
            onSelect={() => {}}
            onAddOpportunity={addOpportunity}
            accounts={[]}
            contacts={[]}
          />
        </TabsContent>

        {/* Quotes */}
        <TabsContent value="quotes" className="space-y-6">
          {/* Page Title and Filter Bar */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Quotes</h1>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">View</label>
              <select className="border rounded px-2 py-1 text-sm" value={quotesView} onChange={e => { setQuotesView(Number(e.target.value)); setQuotesPage(1); }}>
                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <Button variant="outline" size="sm" disabled={quotesPage === 1} onClick={() => setQuotesPage(p => Math.max(1, p - 1))}>&lt;</Button>
              <span className="text-xs">Page {quotesPage} of {Math.max(1, Math.ceil(filteredQuotes.length / quotesView))}</span>
              <Button variant="outline" size="sm" disabled={quotesPage === Math.ceil(filteredQuotes.length / quotesView) || filteredQuotes.length === 0} onClick={() => setQuotesPage(p => Math.min(Math.ceil(filteredQuotes.length / quotesView), p + 1))}>&gt;</Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="     Search quotes..."
                  className="w-56 pl-10"
                  value={quoteSearch || ''}
                  onChange={e => setQuoteSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">Import</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setQuotes(prev => prev.filter(q => !selectedQuotes.includes(q.id)));
                    setSelectedQuotes([]);
                    toast({ title: 'Quotes deleted', description: 'Selected quotes deleted successfully!' });
                  }}>Bulk Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setShowQuoteForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Quote
              </Button>
            </div>
          </div>
          {/* Add Quote Modal */}
          <Dialog open={showQuoteForm} onOpenChange={open => { if (!open) resetAllModals(); else setShowQuoteForm(true); }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Quote</DialogTitle>
                <DialogDescription>
                  Enter details for a new quote.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddQuote} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quote-customer">Customer</Label>
                    <Input id="quote-customer" name="customer" value={newQuote.customer} onChange={handleQuoteInput} required />
                  </div>
                  <div>
                    <Label htmlFor="quote-amount">Amount</Label>
                    <Input id="quote-amount" name="amount" value={newQuote.amount} onChange={handleQuoteInput} required />
                  </div>
                  <div>
                    <Label htmlFor="quote-owner">Owner</Label>
                    <Input id="quote-owner" name="owner" value={newQuote.owner} onChange={handleQuoteInput} required />
                  </div>
                  <div>
                    <Label htmlFor="quote-status">Status</Label>
                    <select id="quote-status" name="status" value={newQuote.status} onChange={handleQuoteInput} className="w-full border rounded px-2 py-1">
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="quote-created">Created Date</Label>
                    <Input id="quote-created" name="created" value={newQuote.created} onChange={handleQuoteInput} type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">New Quote</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {/* Quotes Table (Grid View) */}
          <div className="overflow-x-auto rounded border border-border/50 bg-white shadow-sm">
            <Table className="min-w-full border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-300">
                  <TableHead className="w-[40px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100"><input type="checkbox" checked={selectedQuotes.length === filteredQuotes.slice((quotesPage-1)*quotesView, quotesPage*quotesView).length && filteredQuotes.length > 0} onChange={e => {
                    if (e.target.checked) {
                      setSelectedQuotes(filteredQuotes.slice((quotesPage-1)*quotesView, quotesPage*quotesView).map(q => q.id));
                    } else {
                      setSelectedQuotes([]);
                    }
                  }} /></TableHead>
                  <TableHead className="w-[50px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">#</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Customer</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Amount</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Status</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Created</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Owner</TableHead>
                  <TableHead className="text-left px-2 py-2 font-bold text-gray-700 bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.slice((quotesPage-1)*quotesView, quotesPage*quotesView).map((quote, idx) => (
                  <TableRow key={quote.id || idx} className="border-b border-gray-300 text-sm group hover:bg-blue-50 transition-colors">
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                      <input type="checkbox" checked={selectedQuotes.includes(quote.id)} onChange={e => {
                        if (e.target.checked) setSelectedQuotes([...selectedQuotes, quote.id]);
                        else setSelectedQuotes(selectedQuotes.filter(id => id !== quote.id));
                      }} />
                    </TableCell>
                    <TableCell className="px-2 py-1 text-muted-foreground border-r border-gray-200 bg-white group-hover:bg-blue-50">{idx + 1}</TableCell>
                    <TableCell className="px-2 py-1 font-medium border-r border-gray-200 bg-white group-hover:bg-blue-50">
                      <a href="#" className="text-blue-600 hover:underline">{quote.customer}</a>
                    </TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{quote.amount}</TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                      <Badge variant={quote.status === "approved" ? "default" : quote.status === "rejected" ? "destructive" : "secondary"}>{quote.status}</Badge>
                    </TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{quote.created}</TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{quote.owner}</TableCell>
                    <TableCell className="px-2 py-1 text-left bg-white group-hover:bg-blue-50">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { resetAllModals(); setViewQuote({ ...quote }); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { resetAllModals(); setEditQuote({ ...quote }); setShowQuoteForm(true); setNewQuote({ ...quote, shipment: '' }); }}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Quote
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteQuote(quote.id)}>
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders" className="space-y-6">
          {/* Page Title and Filter Bar */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Orders</h1>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">View</label>
              <select className="border rounded px-2 py-1 text-sm" value={ordersView} onChange={e => { setOrdersView(Number(e.target.value)); setOrdersPage(1); }}>
                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <Button variant="outline" size="sm" disabled={ordersPage === 1} onClick={() => setOrdersPage(p => Math.max(1, p - 1))}>&lt;</Button>
              <span className="text-xs">Page {ordersPage} of {Math.max(1, Math.ceil(filteredOrders.length / ordersView))}</span>
              <Button variant="outline" size="sm" disabled={ordersPage === Math.ceil(filteredOrders.length / ordersView) || filteredOrders.length === 0} onClick={() => setOrdersPage(p => Math.min(Math.ceil(filteredOrders.length / ordersView), p + 1))}>&gt;</Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="     Search orders..."
                  className="w-56 pl-10"
                  value={orderSearch || ''}
                  onChange={e => setOrderSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">Import</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setOrders(prev => prev.filter(o => !selectedOrders.includes(o.id)));
                    setSelectedOrders([]);
                    toast({ title: 'Orders deleted', description: 'Selected orders deleted successfully!' });
                  }}>Bulk Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setShowOrderForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </div>
          </div>
          {/* New Order Modal */}
          <Dialog open={showOrderForm} onOpenChange={open => { if (!open) resetAllModals(); else setShowOrderForm(true); }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Order</DialogTitle>
                <DialogDescription>
                  Enter details for a new order.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddOrder} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="order-customer">Customer</Label>
                    <Input id="order-customer" name="customer" value={newOrder.customer} onChange={handleOrderInput} required />
                  </div>
                  <div>
                    <Label htmlFor="order-total">Total</Label>
                    <Input id="order-total" name="total" value={newOrder.total} onChange={handleOrderInput} required />
                  </div>
                  <div>
                    <Label htmlFor="order-status">Status</Label>
                    <select id="order-status" name="status" value={newOrder.status} onChange={handleOrderInput} className="w-full border rounded px-2 py-1">
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="order-payment">Payment</Label>
                    <select id="order-payment" name="payment" value={newOrder.payment} onChange={handleOrderInput} className="w-full border rounded px-2 py-1">
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="order-shipment">Shipment</Label>
                    <Input id="order-shipment" name="shipment" value={newOrder.shipment} onChange={handleOrderInput} required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="order-created">Created Date</Label>
                    <Input id="order-created" name="created" value={newOrder.created} onChange={handleOrderInput} type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Order</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {/* Orders Table (Grid View) */}
          <div className="overflow-x-auto rounded border border-border/50 bg-white shadow-sm">
            <Table className="min-w-full border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-300">
                  <TableHead className="w-[40px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100"><input type="checkbox" checked={selectedOrders.length === filteredOrders.slice((ordersPage-1)*ordersView, ordersPage*ordersView).length && filteredOrders.length > 0} onChange={e => {
                    if (e.target.checked) {
                      setSelectedOrders(filteredOrders.slice((ordersPage-1)*ordersView, ordersPage*ordersView).map(o => o.id));
                    } else {
                      setSelectedOrders([]);
                    }
                  }} /></TableHead>
                  <TableHead className="w-[50px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">#</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Customer</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Total</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Status</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Payment</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Shipment</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Created</TableHead>
                  <TableHead className="text-left px-2 py-2 font-bold text-gray-700 bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.slice((ordersPage-1)*ordersView, ordersPage*ordersView).map((order, idx) => (
                  <TableRow key={order.id || idx} className="border-b border-gray-300 text-sm group hover:bg-blue-50 transition-colors">
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                      <input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={e => {
                        if (e.target.checked) setSelectedOrders([...selectedOrders, order.id]);
                        else setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                      }} />
                    </TableCell>
                    <TableCell className="px-2 py-1 text-muted-foreground border-r border-gray-200 bg-white group-hover:bg-blue-50">{idx + 1}</TableCell>
                    <TableCell className="px-2 py-1 font-medium border-r border-gray-200 bg-white group-hover:bg-blue-50">
                      <a href="#" className="text-blue-600 hover:underline">{order.customer}</a>
                    </TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{order.total}</TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                      <Badge variant={order.status === "completed" ? "default" : order.status === "cancelled" ? "destructive" : "secondary"}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                      <Badge variant={order.payment === "paid" ? "default" : order.payment === "refunded" ? "destructive" : "secondary"}>{order.payment}</Badge>
                    </TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{order.shipment}</TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{order.created}</TableCell>
                    <TableCell className="px-2 py-1 text-left bg-white group-hover:bg-blue-50">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { resetAllModals(); setViewOrder({ ...order }); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { resetAllModals(); setEditOrder({ ...order }); setShowOrderForm(true); setNewOrder({ ...order }); }}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteOrder(order.id)}>
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        {/* Products Catalog */}
        <TabsContent value="products" className="space-y-6">
          {/* Page Title and Filter Bar */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Products</h1>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">View</label>
              <select className="border rounded px-2 py-1 text-sm" value={productsView} onChange={e => { setProductsView(Number(e.target.value)); setProductsPage(1); }}>
                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <Button variant="outline" size="sm" disabled={productsPage === 1} onClick={() => setProductsPage(p => Math.max(1, p - 1))}>&lt;</Button>
              <span className="text-xs">Page {productsPage} of {Math.max(1, Math.ceil(filteredProducts.length / productsView))}</span>
              <Button variant="outline" size="sm" disabled={productsPage === Math.ceil(filteredProducts.length / productsView) || filteredProducts.length === 0} onClick={() => setProductsPage(p => Math.min(Math.ceil(filteredProducts.length / productsView), p + 1))}>&gt;</Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="     Search products..."
                  className="w-56 pl-10"
                  value={productSearch || ''}
                  onChange={e => setProductSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">Import</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
                    setSelectedProducts([]);
                    toast({ title: 'Products deleted', description: 'Selected products deleted successfully!' });
                  }}>Bulk Delete</DropdownMenuItem>
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => { setShowProductForm(true); setEditingProduct(null); }}>
                <Plus className="w-4 h-4 mr-2" />
                New Product
              </Button>
            </div>
          </div>
          {/* Add/Edit Product Modal */}
          <Dialog open={showProductForm} onOpenChange={open => { if (!open) resetAllModals(); else setShowProductForm(true); }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Product</DialogTitle>
                <DialogDescription>
                  Enter details for a new product.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product-name">Name</Label>
                    <Input id="product-name" name="name" value={newProduct.name} onChange={handleProductInput} required />
                  </div>
                  <div>
                    <Label htmlFor="product-image">Image URL</Label>
                    <Input id="product-image" name="image" value={newProduct.image} onChange={handleProductInput} required />
                  </div>
                  <div>
                    <Label htmlFor="product-price">Price</Label>
                    <Input id="product-price" name="price" value={newProduct.price} onChange={handleProductInput} required />
                  </div>
                  <div>
                    <Label htmlFor="product-stock">Stock</Label>
                    <Input id="product-stock" name="stock" value={newProduct.stock} onChange={handleProductInput} required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Input id="product-category" name="category" value={newProduct.category} onChange={handleProductInput} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">New Product</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {/* Products Table (Grid View) */}
          <div className="overflow-x-auto rounded border border-border/50 bg-white shadow-sm">
            <Table className="min-w-full border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-300">
                  <TableHead className="w-[40px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100"><input type="checkbox" checked={selectedProducts.length === filteredProducts.slice((productsPage-1)*productsView, productsPage*productsView).length && filteredProducts.length > 0} onChange={e => {
                    if (e.target.checked) {
                      setSelectedProducts(filteredProducts.slice((productsPage-1)*productsView, productsPage*productsView).map(p => p.id));
                    } else {
                      setSelectedProducts([]);
                    }
                  }} /></TableHead>
                  <TableHead className="w-[50px] px-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">#</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Image</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Name</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Price</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Stock</TableHead>
                  <TableHead className="px-2 py-2 border-r border-gray-300 font-bold text-gray-700 bg-gray-100">Category</TableHead>
                  <TableHead className="text-left px-2 py-2 font-bold text-gray-700 bg-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.slice((productsPage-1)*productsView, productsPage*productsView).map((product, idx) => (
                  <TableRow key={product.id || idx} className="border-b border-gray-300 text-sm group hover:bg-blue-50 transition-colors">
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">
                      <input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={e => {
                        if (e.target.checked) setSelectedProducts([...selectedProducts, product.id]);
                        else setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                      }} />
                    </TableCell>
                    <TableCell className="px-2 py-1 text-muted-foreground border-r border-gray-200 bg-white group-hover:bg-blue-50">{idx + 1}</TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50"><img src={product.image} alt={product.name} className="h-8 w-8 object-contain" /></TableCell>
                    <TableCell className="px-2 py-1 font-medium border-r border-gray-200 bg-white group-hover:bg-blue-50">
                      <a href="#" className="text-blue-600 hover:underline">{product.name}</a>
                    </TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{product.price}</TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{product.stock}</TableCell>
                    <TableCell className="px-2 py-1 border-r border-gray-200 bg-white group-hover:bg-blue-50">{product.category}</TableCell>
                    <TableCell className="px-2 py-1 text-left bg-white group-hover:bg-blue-50">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { resetAllModals(); setViewProduct({ ...product, stock: String(product.stock) }); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { resetAllModals(); setEditingProduct({ ...product }); setShowProductForm(true); setNewProduct({ ...product, stock: String(product.stock) }); }}>
                            <Edit className="w-4 h-4 mr-2" /> Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Lead Details Modal */}
      <Dialog open={!!viewLead} onOpenChange={open => { if (!open) resetAllModals(); else setViewLead(viewLead); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected lead.
            </DialogDescription>
          </DialogHeader>
          {viewLead && (
            <div className="space-y-2">
              <div><b>Name:</b> {viewLead.name}</div>
              <div><b>Contact:</b> {viewLead.contact}</div>
              <div><b>Email:</b> {viewLead.email}</div>
              <div><b>Phone:</b> {viewLead.phone}</div>
              <div><b>Company:</b> {viewLead.company}</div>
              <div><b>Title:</b> {viewLead.title}</div>
              <div><b>Status:</b> {viewLead.status}</div>
              <div><b>Priority:</b> {viewLead.priority}</div>
              <div><b>Owner:</b> {viewLead.owner}</div>
              <div><b>Tags:</b> {Array.isArray(viewLead.tags) ? viewLead.tags.join(', ') : viewLead.tags}</div>
              <div><b>Notes:</b> {viewLead.notes}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Convert to Opportunity Modal */}
      <Dialog open={showConvertModal} onOpenChange={setShowConvertModal}>
        <DialogContent className="w-full max-w-screen-lg max-h-[calc(100vh-4rem)] overflow-y-auto p-0 mx-2 sm:mx-4 my-8 sm:my-10 rounded-lg">
          {convertStep === "form" ? (
            <>
              <DialogHeader className="px-8 pt-6 pb-2 mt-6">
                <DialogTitle className="text-2xl font-normal text-center">Convert Lead</DialogTitle>
          </DialogHeader>
              <form className="divide-y divide-gray-200" onSubmit={e => { e.preventDefault(); handleLeadConversion(); }}>
                {/* Account Section */}
                <div className="flex flex-col">
                  <div className="flex items-center border-l-4 border-blue-500 bg-gray-50 px-8 py-3">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    <span className="font-semibold text-base">Account</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-8 py-4">
                    {/* Create New Account */}
                    <div className="pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                      <label className="flex items-center gap-2 mb-2">
                        <input type="radio" name="accountType" checked={convertForm.accountType === 'new'} onChange={() => setConvertForm(f => ({ ...f, accountType: 'new' }))} />
                        <span className="font-semibold">Create New Account</span>
                      </label>
                      <div className="bg-white border rounded-lg p-4 mt-2">
                        <label className="block text-xs font-semibold mb-1 text-red-600">* Account Name</label>
                        <input className="w-full border rounded px-3 py-2" value={convertForm.accountName} onChange={e => setConvertForm(f => ({ ...f, accountName: e.target.value }))} required />
                      </div>
                    </div>
                    {/* Choose Existing Account */}
                    <div className="pl-0 md:pl-4 flex flex-col">
                      <label className="flex items-center gap-2 mb-2">
                        <input type="radio" name="accountType" checked={convertForm.accountType === 'existing'} onChange={() => setConvertForm(f => ({ ...f, accountType: 'existing' }))} />
                        <span className="font-semibold">Choose Existing Account</span>
                      </label>
                      <div className="bg-white border rounded-lg p-4 mt-2">
                        <label className="block text-xs font-semibold mb-1">Account Search</label>
                        <div className="flex items-center border rounded px-2">
                          <input className="flex-1 py-2 outline-none" placeholder="Search for matching accounts" />
                          <Search className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="border rounded mt-2 p-2 text-xs text-gray-500 h-16">0 Account Matches</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Contact Section */}
                <div className="flex flex-col">
                  <div className="flex items-center border-l-4 border-blue-500 bg-gray-50 px-8 py-3">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    <span className="font-semibold text-base">Contact</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-8 py-4">
                    {/* Create New Contact */}
                    <div className="pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                      <label className="flex items-center gap-2 mb-2">
                        <input type="radio" name="contactType" checked={convertForm.contactType === 'new'} onChange={() => setConvertForm(f => ({ ...f, contactType: 'new' }))} />
                        <span className="font-semibold">Create New Contact</span>
                      </label>
                      <div className="bg-white border rounded-lg p-4 mt-2">
                        <input className="w-full border rounded px-3 py-2" value={convertForm.contactName} onChange={e => setConvertForm(f => ({ ...f, contactName: e.target.value }))} required />
                      </div>
                    </div>
                    {/* Choose Existing Contact */}
                    <div className="pl-0 md:pl-4 flex flex-col">
                      <label className="flex items-center gap-2 mb-2">
                        <input type="radio" name="contactType" checked={convertForm.contactType === 'existing'} onChange={() => setConvertForm(f => ({ ...f, contactType: 'existing' }))} />
                        <span className="font-semibold">Choose Existing Contact</span>
                      </label>
                      <div className="bg-white border rounded-lg p-4 mt-2">
                        <label className="block text-xs font-semibold mb-1">0 Contact Matches detected</label>
                        <input className="w-full border rounded px-3 py-2" disabled />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Opportunity Section */}
                <div className="flex flex-col">
                  <div className="flex items-center border-l-4 border-blue-500 bg-gray-50 px-8 py-3">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    <span className="font-semibold text-base">Opportunity</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-8 py-4">
                    {/* Create New Opportunity */}
                    <div className="pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                      <label className="flex items-center gap-2 mb-2">
                        <input type="radio" name="opportunityType" checked={convertForm.opportunityType === 'new'} onChange={() => setConvertForm(f => ({ ...f, opportunityType: 'new' }))} />
                        <span className="font-semibold">Create New Opportunity</span>
                      </label>
                      <div className="bg-white border rounded-lg p-4 mt-2">
                        <input className="w-full border rounded px-3 py-2" value={convertForm.opportunityName} onChange={e => setConvertForm(f => ({ ...f, opportunityName: e.target.value }))} />
                        <label className="flex items-center gap-2 mt-2 text-xs">
                          <input type="checkbox" checked={convertForm.dontCreateOpportunity} onChange={e => setConvertForm(f => ({ ...f, dontCreateOpportunity: e.target.checked }))} />
                          Don't create an opportunity upon conversion
                        </label>
                      </div>
                    </div>
                    {/* Choose Existing Opportunity */}
                    <div className="pl-0 md:pl-4 flex flex-col">
                      <label className="flex items-center gap-2 mb-2">
                        <input type="radio" name="opportunityType" checked={convertForm.opportunityType === 'existing'} onChange={() => setConvertForm(f => ({ ...f, opportunityType: 'existing' }))} />
                        <span className="font-semibold">Choose Existing Opportunity</span>
                      </label>
                      <div className="bg-white border rounded-lg p-4 mt-2">
                        <label className="block text-xs font-semibold mb-1">To find opportunity, choose an existing account</label>
                        <input className="w-full border rounded px-3 py-2" disabled />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Record Owner & Converted Status */}
                <div className="flex flex-col px-8 py-6 mb-6 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-red-600">* Record Owner</label>
                      <div className="flex items-center border rounded px-3 py-2 bg-white">
                        <Search className="w-4 h-4 mr-2 text-gray-400" />
                        <input className="flex-1 outline-none" placeholder="Search User..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-red-600">* Converted Status</label>
                      <select className="w-full border rounded px-3 py-2" value={convertForm.convertedStatus} onChange={e => setConvertForm(f => ({ ...f, convertedStatus: e.target.value }))}>
                        <option value="Qualified">Qualified</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-8">
                    <button type="button" className="px-4 py-2 rounded border bg-white text-gray-700 hover:bg-gray-100" onClick={() => setShowConvertModal(false)}>Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Convert</button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            // Success Page (styled like the provided image)
            <div className="relative flex flex-col items-center justify-center py-8 px-4">
              <button onClick={handleConversionAndReturn} className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-2xl font-normal text-center mt-4 mb-2">Your lead has been converted</div>
              {/* Flag/achievement illustration (SVG or placeholder) */}
              <div className="my-4">
                <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
                  <circle cx="60" cy="50" r="40" fill="#E0E7FF" />
                  <rect x="52" y="30" width="16" height="40" rx="2" fill="#F87171" />
                  <polygon points="68,32 100,40 68,48" fill="#FBBF24" />
                  <ellipse cx="60" cy="80" rx="28" ry="8" fill="#A3A3A3" />
                  <polygon points="60,70 70,90 50,90" fill="#78716C" />
                </svg>
              </div>
              <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-stretch gap-6 mt-2 mb-8">
                {/* Account Card */}
                <div className="flex-1 bg-white border rounded-lg shadow p-5 flex flex-col items-start min-w-[220px]">
                  <div className="flex items-center mb-2">
                    <Building2 className="w-6 h-6 text-blue-600 mr-2" />
                    <span className="font-semibold text-lg">{convertForm.accountName || 'Account Name'}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">Phone: <span className="text-gray-900">{'—'}</span></div>
                  <div className="text-sm text-gray-700 mb-1">Website: <a href="#" className="text-blue-600 underline">{'—'}</a></div>
                  <div className="text-sm text-gray-700 mb-1">Billing Address: <span className="text-gray-900">{'—'}</span></div>
                  <div className="text-sm text-gray-700">Account Owner: <span className="text-blue-700 underline">{convertForm.recordOwner || '—'}</span></div>
                </div>
                {/* Contact Card */}
                <div className="flex-1 bg-white border rounded-lg shadow p-5 flex flex-col items-start min-w-[220px]">
                  <div className="flex items-center mb-2">
                    <Contact2 className="w-6 h-6 text-purple-600 mr-2" />
                    <span className="font-semibold text-lg">{convertForm.contactName || 'Contact Name'}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">Account Name: <span className="text-blue-700 underline">{convertForm.accountName || '—'}</span></div>
                  <div className="text-sm text-gray-700 mb-1">Title: <span className="text-gray-900">{'—'}</span></div>
                  <div className="text-sm text-gray-700 mb-1">Phone: <span className="text-gray-900">{'—'}</span></div>
                  <div className="text-sm text-gray-700">Email: <a href="#" className="text-blue-600 underline">{'—'}</a></div>
                </div>
                {/* Opportunity Card */}
                <div className="flex-1 bg-white border rounded-lg shadow p-5 flex flex-col items-start min-w-[220px]">
                  <div className="flex items-center mb-2">
                    <Crown className="w-6 h-6 text-orange-500 mr-2" />
                    <span className="font-semibold text-lg">{convertForm.opportunityName || 'Opportunity Name'}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">Account Name: <span className="text-blue-700 underline">{convertForm.accountName || '—'}</span></div>
                  <div className="text-sm text-gray-700 mb-1">Close Date: <span className="text-gray-900">{'—'}</span></div>
                  <div className="text-sm text-gray-700 mb-1">Amount: <span className="text-gray-900">{'—'}</span></div>
                  <div className="text-sm text-gray-700">Opportunity Owner: <span className="text-blue-700 underline">{convertForm.recordOwner || '—'}</span></div>
                </div>
              </div>
              <div className="w-full flex justify-end items-center gap-3 px-8 pb-4">
                <button className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100">New Task</button>
                <button className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700" onClick={() => { handleConversionAndReturn(); resetConvertForm(); }}>Go to Leads</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Contact Details Modal */}
      <Dialog open={!!viewContact} onOpenChange={open => { if (!open) resetAllModals(); else setViewContact(viewContact); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected contact.
            </DialogDescription>
          </DialogHeader>
          {viewContact && (
            <div className="space-y-2">
              <div><b>Name:</b> {viewContact.name}</div>
              <div><b>Title:</b> {viewContact.title}</div>
              <div><b>Account:</b> {viewContact.account}</div>
              <div><b>Email:</b> {viewContact.email}</div>
              <div><b>Phone:</b> {viewContact.phone}</div>
              <div><b>Status:</b> {viewContact.status}</div>
              <div><b>Last Contact:</b> {viewContact.lastContact}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Quote Details Modal */}
      <Dialog open={!!viewQuote} onOpenChange={open => { if (!open) resetAllModals(); else setViewQuote(viewQuote); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quote Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected quote.
            </DialogDescription>
          </DialogHeader>
          {viewQuote && (
            <div className="space-y-2">
              <div><b>Customer:</b> {viewQuote.customer}</div>
              <div><b>Amount:</b> {viewQuote.amount}</div>
              <div><b>Status:</b> {viewQuote.status}</div>
              <div><b>Created:</b> {viewQuote.created}</div>
              <div><b>Owner:</b> {viewQuote.owner}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Order Details Modal */}
      <Dialog open={!!viewOrder} onOpenChange={open => { if (!open) resetAllModals(); else setViewOrder(viewOrder); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected order.
            </DialogDescription>
          </DialogHeader>
          {viewOrder && (
            <div className="space-y-2">
              <div><b>Customer:</b> {viewOrder.customer}</div>
              <div><b>Total:</b> {viewOrder.total}</div>
              <div><b>Status:</b> {viewOrder.status}</div>
              <div><b>Payment:</b> {viewOrder.payment}</div>
              <div><b>Shipment:</b> {viewOrder.shipment}</div>
              <div><b>Created:</b> {viewOrder.created}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Product Details Modal */}
      <Dialog open={!!viewProduct} onOpenChange={open => { if (!open) resetAllModals(); else setViewProduct(viewProduct); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected product.
            </DialogDescription>
          </DialogHeader>
          {viewProduct && (
            <div className="space-y-2">
              <div><b>Name:</b> {viewProduct.name}</div>
              <div><b>Image:</b> {viewProduct.image}</div>
              <div><b>Price:</b> {viewProduct.price}</div>
              <div><b>Stock:</b> {viewProduct.stock}</div>
              <div><b>Category:</b> {viewProduct.category}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
