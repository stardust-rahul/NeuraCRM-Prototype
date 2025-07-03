import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Filter, Plus, Search, Eye, Edit, Phone, Mail, Calendar, MoreHorizontal, ArrowUpRight, Trash, ArrowLeft, MapPin, Globe, Building, User, DollarSign, Tag, Clock, FileText, Check, CheckCircle, Building2, Contact2, Crown, Pencil, X } from "lucide-react";
import { useLeads } from "@/context/LeadsContext";
import { useAccounts } from "@/context/AccountsContext";
import { useContacts } from "@/context/ContactsContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LeadsList from "@/components/LeadsList";
import ActivityCentre from "@/components/ActivityCentre";

const CONTACT_SUGGESTIONS = [
  "Ankit", "Rahul", "Deepak", "Vishal", "John Smith", "Goyal Kumar", "Nidhi Sharma", "Emily Davis",
  "Priya Patel", "Amit Singh", "Samantha Lee", "Michael Brown", "Olivia Wilson", "Sophia Martinez", "Liam Johnson",
  "Noah Anderson", "Mia Thomas", "Lucas White", "Emma Harris", "Benjamin Clark", "Ava Lewis", "Elijah Walker",
  "Charlotte Hall", "James Allen", "Amelia Young", "Logan King", "Harper Wright", "Alexander Scott", "Ella Green",
  "Daniel Adams", "Grace Baker", "Matthew Nelson", "Chloe Carter", "Henry Mitchell", "Zoe Perez", "Sebastian Roberts",
  "Layla Turner", "David Phillips", "Lily Campbell", "Jackson Parker", "Scarlett Evans", "Jack Edwards", "Aria Collins",
  "Owen Stewart", "Penelope Morris", "Gabriel Rogers", "Riley Cook", "Julian Morgan", "Nora Reed", "Levi Bailey"
];

const COMPANY_SUGGESTIONS = [
  "Acme Corp", "Amazon", "Ralakde", "RLK", "Google", "Microsoft", "Apple", "Tesla", "Meta", "Netflix",
  "Walmart", "Target", "IBM", "Oracle", "Salesforce", "Adobe", "Intel", "Cisco", "Uber", "Airbnb",
  "Spotify", "Shopify", "Zoom", "Dropbox", "Slack", "Twitter", "LinkedIn", "PayPal", "eBay", "Dell",
  "HP", "Lenovo", "Samsung", "Sony", "Panasonic", "Philips", "Siemens", "Nokia", "Tata", "Infosys",
  "Reliance", "Flipkart", "Snapdeal", "Ola", "Swiggy", "Zomato", "BYJU'S", "Unacademy", "Freshworks", "Zoho"
];

const OPPORTUNITY_SUGGESTIONS = [
  "Iphone", "Macbook", "Ipad", "Apple Watch", "AirPods", "Galaxy S23", "Pixel 8", "Surface Pro", "ThinkPad X1", "Dell XPS",
  "HP Spectre", "Lenovo Yoga", "Asus Zenbook", "Razer Blade", "Alienware Aurora", "PlayStation 5", "Xbox Series X", "Nintendo Switch", "GoPro Hero", "Canon EOS",
  "Nikon D850", "Sony A7", "DJI Mavic", "Bose QC45", "Jabra Elite", "Fitbit Versa", "Garmin Fenix", "Oculus Quest", "Valve Index", "Kindle Oasis",
  "Fire TV", "Echo Dot", "Nest Hub", "Ring Doorbell", "Roku Ultra", "Sonos One", "Tile Pro", "Wyze Cam", "Philips Hue", "Arlo Pro",
  "Logitech MX", "Corsair K95", "SteelSeries Rival", "WD My Passport", "Seagate Backup Plus", "Sandisk Extreme", "Crucial MX500", "Samsung T7", "Kingston A2000", "HyperX Cloud"
];

function LeadPipeline({ currentStage, onStageChange, onSelectConvertedStatus }) {
  const stages = ["New", "Contacted", "Nurturing", "Unqualified", "Converted"];
  const currentIdx = stages.findIndex(
    (s) => s.toLowerCase() === (currentStage?.toLowerCase() || "new")
  );
  // Add state for success message
  const [markMessage, setMarkMessage] = useState("");
  useEffect(() => {
    if (markMessage) {
      const timer = setTimeout(() => setMarkMessage(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [markMessage]);
  // Handler to wrap onStageChange and show message
  const handleStageClick = (stage) => {
    onStageChange(stage);
    setMarkMessage(`Marked as ${stage}`);
  };
  return (
    <div className="w-full flex flex-row items-center justify-center px-2 sm:px-8 pt-6 pb-2 relative gap-2">
      {/* Success message at top right */}
      {markMessage && (
        <div className="fixed right-6 top-4 bg-green-100 text-green-700 px-4 py-2 rounded shadow flex items-center gap-2 z-50 text-sm font-semibold">
          <span className="text-green-600 text-lg">&#10003;</span> {markMessage.replace(/^\u2713\s*/, "")}
        </div>
      )}
      <div className="flex-1 flex items-center w-full flex-nowrap overflow-x-visible">
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isFuture = idx > currentIdx;
          let base = "flex-1 flex items-center min-w-[240px] max-w-full";
          // Arrow SVG dimensions
          const width = 240;
          const height = 48;
          // Arrow points for SVG
          let points =
            idx === 0
              ? `0,0 ${width-18},0 ${width},${height/2} ${width-18},${height} 0,${height} 18,${height/2}`
              : `0,0 ${width-18},0 ${width},${height/2} ${width-18},${height} 0,${height} 18,${height/2}`;
          // Fill and text color logic
          let fill = isCompleted
            ? "#8850f9"
            : isCurrent
            ? "#f3edfd"
            : "#e5e7eb";
          let textColor = isCompleted
            ? "#fff"
            : isCurrent
            ? "#8850f9"
            : "#374151";
          let border = "#8850f9";
          return (
            <div key={stage} className={base} style={{ position: 'relative', marginRight: 0 }}>
              <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                style={{ display: 'block', cursor: 'pointer', minWidth: 240 }}
                onClick={() => handleStageClick(stage)}
              >
                <polygon
                  points={points}
                  fill={fill}
                  stroke={border}
                  strokeWidth={2}
                  style={{ transition: 'fill 0.2s, stroke 0.2s' }}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight={isCurrent || isCompleted ? 'bold' : 'normal'}
                  fontSize="18"
                  fill={textColor}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {isCompleted ? '\u2713 ' : ''}{stage}
                </text>
              </svg>
            </div>
          );
        })}
      </div>
      {currentIdx === stages.length - 1 && (
        <button
          className="px-6 py-2 rounded-full bg-[#22c55e] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#16a34a] transition whitespace-nowrap shadow"
          style={{ height: 44, fontSize: 16, minWidth: 0, alignSelf: 'center' }}
          onClick={onSelectConvertedStatus}
        >
          Mark Status as Complete
        </button>
      )}
    </div>
  );
}

export default function Leads() {
  const { leads, addLead, removeLead } = useLeads();
  const { addAccount } = useAccounts();
  const { addContact } = useContacts();
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertStep, setConvertStep] = useState("form"); // 'form' | 'success'
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

  const handleLeadConversion = () => {
    // 1. Create Account
    if (convertForm.accountType === 'new' && convertForm.accountName) {
      addAccount({
        name: convertForm.accountName,
        owner: convertForm.recordOwner,
        created: new Date().toLocaleDateString(),
        // Add other relevant fields from lead if available
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

  const handleLeadInput = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    addLead(newLead);
    setShowLeadForm(false);
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
    toast({
      title: "Lead Added",
      description: `Lead '${newLead.name}' was added successfully!`,
    });
  };

  const handleLeadClick = (lead, idx) => {
    // Mock/placeholder data for missing fields
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
    });
  };

  // Tab navigation and filter state
  const [activeTab, setActiveTab] = useState("Leads");
  const [activeSubTab, setActiveSubTab] = useState("Leads");
  const [filter, setFilter] = useState("All Open Leads");
  const [search, setSearch] = useState("");

  // Placeholder for filter dropdown options
  const filterOptions = ["All Open Leads", "My Leads", "Qualified", "Hot", "Cold"];

  // Filtered and searched leads
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.company?.toLowerCase().includes(search.toLowerCase())
  );

  // Add local state for status if a lead is selected
  const [localStatus, setLocalStatus] = useState(null);

  // Convert modal form state
  const [convertForm, setConvertForm] = useState({
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
  });

  // Auto-sync convertForm fields with selectedLead when modal opens or selectedLead changes
  useEffect(() => {
    if (showConvertModal && selectedLead) {
      setConvertForm((prev) => ({
        ...prev,
        // Only update if the user hasn't typed something different
        accountName: prev.accountType === 'new' && (!prev.accountName || prev.accountName === '' || prev.accountName === selectedLead.company || prev.accountName === selectedLead.name) ? (selectedLead.company || selectedLead.name || "") : prev.accountName,
        contactName: prev.contactType === 'new' && (!prev.contactName || prev.contactName === '' || prev.contactName === selectedLead.contact || prev.contactName === selectedLead.name) ? (selectedLead.contact || selectedLead.name || "") : prev.contactName,
        // Always autofetch record owner from selectedLead.owner
        recordOwner: selectedLead.owner || "",
      }));
    }
  }, [showConvertModal, selectedLead]);

  // Add inside the Leads component, near other useState hooks
  const [contactSearch, setContactSearch] = useState("");
  const filteredContactSuggestions = CONTACT_SUGGESTIONS.filter(name =>
    name.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const [accountSearch, setAccountSearch] = useState("");
  const filteredAccountSuggestions = COMPANY_SUGGESTIONS.filter(name =>
    name.toLowerCase().includes(accountSearch.toLowerCase())
  );

  const [opportunitySearch, setOpportunitySearch] = useState("");
  const filteredOpportunitySuggestions = OPPORTUNITY_SUGGESTIONS.filter(name =>
    name.toLowerCase().includes(opportunitySearch.toLowerCase())
  );

  // Inside the Leads component, before the return statement for the detail view
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleEditClick = (field, value) => {
    setEditField(field);
    setEditValue(value);
  };
  const handleEditSave = (field) => {
    setSelectedLead((prev) => ({ ...prev, [field]: editValue }));
    setEditField(null);
    setEditValue("");
  };
  const handleEditCancel = () => {
    setEditField(null);
    setEditValue("");
  };

  // Add log state and helper
  const [logs, setLogs] = useState([
    { datetime: selectedLead?.updated || new Date().toLocaleString(), owner: selectedLead?.owner || "Sarah Johnson", action: "Lead Updated" },
    { datetime: selectedLead?.created || new Date().toLocaleString(), owner: selectedLead?.owner || "Sarah Johnson", action: "Lead Created" },
    { datetime: selectedLead?.lastContact || new Date().toLocaleString(), owner: selectedLead?.owner || "Sarah Johnson", action: "Last Contact" },
  ]);

  const addLog = (action) => {
    setLogs((prev) => [
      { datetime: new Date().toLocaleString(), owner: selectedLead?.owner || "Sarah Johnson", action },
      ...prev,
    ]);
  };

  // Add tagInput state at the top of the Leads component
  const [tagInput, setTagInput] = useState("");

  // If a lead is selected, show the detail view
  if (selectedLead) {
    // Use localStatus if set, else selectedLead.status
    const statusToShow = localStatus || selectedLead.status;
    return (
      <div className="min-h-screen bg-background ">
        {/* Page Title at the Top Left */}
        <div className="w-full flex items-center px-2 sm:px-8 pt-6 pb-2">
          <h1 className="text-3xl font-bold text-left">Leads</h1>
        </div>
        {/* Pipeline/Progress Bar */}
        <LeadPipeline
          currentStage={statusToShow}
          onStageChange={(stage) => setLocalStatus(stage)}
          onSelectConvertedStatus={() => { setShowConvertModal(true); setConvertStep("form"); }}
        />
        {/* Convert Lead Modal */}
        <Dialog open={showConvertModal} onOpenChange={setShowConvertModal}>
          <DialogContent className="w-full max-w-screen-lg max-h-[calc(100vh-4rem)] overflow-y-auto p-0 mx-2 sm:mx-4 my-8 sm:my-10 rounded-lg">
            {convertStep === "form" ? (
              <>
                <DialogHeader className="px-8 pt-6 pb-2 mt-6">
                  <DialogTitle className="text-2xl font-normal text-center">Convert Lead</DialogTitle>
                </DialogHeader>
                <form className="divide-y divide-gray-200" onSubmit={e => { e.preventDefault(); handleLeadConversion(); }}>
                  {/* Contact Section (moved above Account Section) */}
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
                        <div className="bg-white border rounded-lg p-4 mt-2 relative">
                          <label className="block text-xs font-semibold mb-1">Contact Search</label>
                          <div className="flex items-center border rounded px-2">
                            <input
                              className="flex-1 py-2 outline-none"
                              placeholder="Search for matching contacts"
                              value={contactSearch}
                              onChange={e => setContactSearch(e.target.value)}
                              onFocus={() => setConvertForm(f => ({ ...f, contactType: 'existing' }))}
                            />
                            <Search className="w-4 h-4 text-gray-400" />
                          </div>
                          {/* Suggestions dropdown */}
                          {contactSearch && filteredContactSuggestions.length > 0 && (
                            <ul className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
                              {filteredContactSuggestions.map((name, idx) => (
                                <li
                                  key={name}
                                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
                                  onClick={() => {
                                    setConvertForm(f => ({ ...f, contactType: 'existing', contactName: name }));
                                    setContactSearch(name);
                                  }}
                                >
                                  {name}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Account Section (now below Contact Section) */}
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
                          <input className="w-full border rounded px-3 py-2" value={convertForm.accountName} onChange={e => setConvertForm(f => ({ ...f, accountName: e.target.value }))} required />
                        </div>
                      </div>
                      {/* Choose Existing Account */}
                      <div className="pl-0 md:pl-4 flex flex-col">
                        <label className="flex items-center gap-2 mb-2">
                          <input type="radio" name="accountType" checked={convertForm.accountType === 'existing'} onChange={() => setConvertForm(f => ({ ...f, accountType: 'existing' }))} />
                          <span className="font-semibold">Choose Existing Account</span>
                        </label>
                        <div className="bg-white border rounded-lg p-4 mt-2 relative">
                          <label className="block text-xs font-semibold mb-1">Account Search</label>
                          <div className="flex items-center border rounded px-2">
                            <input
                              className="flex-1 py-2 outline-none"
                              placeholder="Search for matching accounts"
                              value={accountSearch}
                              onChange={e => setAccountSearch(e.target.value)}
                              onFocus={() => setConvertForm(f => ({ ...f, accountType: 'existing' }))}
                            />
                            <Search className="w-4 h-4 text-gray-400" />
                          </div>
                          {/* Suggestions dropdown */}
                          {accountSearch && filteredAccountSuggestions.length > 0 && (
                            <ul className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
                              {filteredAccountSuggestions.map((name, idx) => (
                                <li
                                  key={name}
                                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
                                  onClick={() => {
                                    setConvertForm(f => ({ ...f, accountType: 'existing', accountName: name }));
                                    setAccountSearch(name);
                                  }}
                                >
                                  {name}
                                </li>
                              ))}
                            </ul>
                          )}
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
                        <div className="bg-white border rounded-lg p-4 mt-2 relative">
                          <label className="block text-xs font-semibold mb-1">Opportunity Search</label>
                          <div className="flex items-center border rounded px-2">
                            <input
                              className="flex-1 py-2 outline-none"
                              placeholder="Search for matching opportunities"
                              value={opportunitySearch}
                              onChange={e => setOpportunitySearch(e.target.value)}
                              onFocus={() => setConvertForm(f => ({ ...f, opportunityType: 'existing' }))}
                            />
                            <Search className="w-4 h-4 text-gray-400" />
                          </div>
                          {/* Suggestions dropdown */}
                          {opportunitySearch && filteredOpportunitySuggestions.length > 0 && (
                            <ul className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
                              {filteredOpportunitySuggestions.map((name, idx) => (
                                <li
                                  key={name}
                                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
                                  onClick={() => {
                                    setConvertForm(f => ({ ...f, opportunityType: 'existing', opportunityName: name }));
                                    setOpportunitySearch(name);
                                  }}
                                >
                                  {name}
                                </li>
                              ))}
                            </ul>
                          )}
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
                          <input className="flex-1 outline-none bg-white" placeholder="Search User..." value={convertForm.recordOwner} onChange={e => setConvertForm(f => ({ ...f, recordOwner: e.target.value }))} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-red-600">* Converted Status</label>
                        <select className="w-full border rounded px-3 py-2" value={convertForm.convertedStatus} onChange={e => setConvertForm(f => ({ ...f, convertedStatus: e.target.value }))}>
                          <option value="Qualified">Qualified</option>
                          {/* <option value="Contacted">Contacted</option>
                          <option value="Nurturing">Nurturing</option>
                          <option value="Unqualified">Unqualified</option>
                          <option value="Converted">Converted</option> */}
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
              <Button variant="outline">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Convert
              </Button>
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
                      <div className="flex items-center gap-2">
                        {editField === "contact" ? (
                          <>
                            <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto" />
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("contact")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-semibold">{selectedLead.contact || selectedLead.name}</p>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("contact", selectedLead.contact || selectedLead.name)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                      <div className="flex items-center gap-2">
                        {editField === "title" ? (
                          <>
                            <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto" />
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("title")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-lg">{selectedLead.title}</p>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("title", selectedLead.title)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                      <div className="flex items-center gap-2">
                        {editField === "email" ? (
                          <>
                            <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto" />
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("email")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">
                                {selectedLead.email}
                              </a>
                            </div>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("email", selectedLead.email)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                      <div className="flex items-center gap-2">
                        {editField === "phone" ? (
                          <>
                            <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto" />
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("phone")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <a href={`tel:${selectedLead.phone}`} className="text-blue-600 hover:underline">
                                {selectedLead.phone}
                              </a>
                            </div>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("phone", selectedLead.phone)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
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
                      <div className="flex items-center gap-2">
                        {editField === "company" ? (
                          <>
                            <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto" />
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("company")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-semibold">{selectedLead.company}</p>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("company", selectedLead.company)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Source</Label>
                      <div className="flex items-center gap-2">
                        {editField === "source" ? (
                          <>
                            <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto" />
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("source")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-lg capitalize">{selectedLead.source}</p>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("source", selectedLead.source)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
                      </div>
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
                      <div className="flex items-center gap-2">
                        {editField === "value" ? (
                          <>
                            <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto" />
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("value")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-semibold">{selectedLead.value || "$0"}</p>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("value", selectedLead.value)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Owner</Label>
                      <div className="flex items-center gap-2">
                        {editField === "owner" ? (
                          <>
                            <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto" />
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("owner")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-lg">{selectedLead.owner || "Unassigned"}</p>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("owner", selectedLead.owner)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Priority</Label>
                      <div className="flex items-center gap-2">
                        {editField === "priority" ? (
                          <>
                            <select value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto">
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                            </select>
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("priority")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <Badge variant={selectedLead.priority === 'high' ? 'destructive' : selectedLead.priority === 'medium' ? 'secondary' : 'outline'}>
                              {selectedLead.priority}
                            </Badge>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("priority", selectedLead.priority)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                      <div className="flex items-center gap-2">
                        {editField === "status" ? (
                          <>
                            <select value={editValue} onChange={e => setEditValue(e.target.value)} className="w-auto">
                              <option value="qualified">Qualified</option>
                              <option value="contacted">Contacted</option>
                              <option value="new">New Lead</option>
                            </select>
                            <Button size="icon" variant="ghost" onClick={() => handleEditSave("status")}> <Check className="w-4 h-4" /> </Button>
                            <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                          </>
                        ) : (
                          <>
                            <Badge variant={selectedLead.status === 'qualified' ? 'default' : selectedLead.status === 'hot' ? 'secondary' : selectedLead.status === 'cold' ? 'destructive' : 'outline'}>
                              {selectedLead.status}
                            </Badge>
                            <Button size="icon" variant="ghost" onClick={() => handleEditClick("status", selectedLead.status)}> <Pencil className="w-4 h-4" /> </Button>
                          </>
                        )}
                      </div>
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
                  <div className="flex items-center gap-2">
                    {editField === "notes" ? (
                      <>
                        <textarea value={editValue} onChange={e => setEditValue(e.target.value)} className="w-full" />
                        <Button size="icon" variant="ghost" onClick={() => handleEditSave("notes")}> <Check className="w-4 h-4" /> </Button>
                        <Button size="icon" variant="ghost" onClick={handleEditCancel}> <X className="w-4 h-4" /> </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 leading-relaxed">{selectedLead.notes}</p>
                        <Button size="icon" variant="ghost" onClick={() => handleEditClick("notes", selectedLead.notes)}> <Pencil className="w-4 h-4" /> </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tags (moved below Notes) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Tag className="w-5 h-5" />
                    <span>Tags</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedLead.tags && typeof selectedLead.tags === 'string' && selectedLead.tags.trim()
                      ? selectedLead.tags.split(',').map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{tag.trim()}</Badge>
                        ))
                      : <p className="text-sm text-muted-foreground">No tags assigned</p>
                    }
                  </div>
                  <form className="flex gap-2" onSubmit={e => {
                    e.preventDefault();
                    if (tagInput.trim()) {
                      const newTags = selectedLead.tags ? selectedLead.tags + ',' + tagInput : tagInput;
                      setSelectedLead(prev => ({ ...prev, tags: newTags }));
                      setTagInput("");
                    }
                  }}>
                    <Input
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      placeholder="Add tag keyword..."
                      className="w-auto flex-1"
                    />
                    <Button type="submit" size="sm">Add</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              {/* Activity Centre */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Centre</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <ActivityCentre lead={selectedLead} />
                </CardContent>
              </Card>

              {/* Logs History */}
              <Card>
                <CardHeader>
                  <CardTitle>Logs History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-3 py-2 border">Date & Time</th>
                          <th className="px-3 py-2 border">Owner Name</th>
                          <th className="px-3 py-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log, idx) => (
                          <tr key={idx}>
                            <td className="px-3 py-2 border whitespace-nowrap">{log.datetime}</td>
                            <td className="px-3 py-2 border whitespace-nowrap">{log.owner}</td>
                            <td className="px-3 py-2 border">{log.action}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

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
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 bg-background min-h-screen">
      {/* Page Title at the Top Left */}
      <div className="w-full flex items-center px-2 sm:px-8 pt-6 pb-2">
        <h1 className="text-3xl font-bold text-left">Leads</h1>
      </div>
      {/* Page details/content below pipeline */}
      {/* Page Title and Filter Bar (now below pipeline) */}
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-4">
          {/* <h1 className="text-2xl font-bold">Leads</h1> */}
          <select
            className="border rounded px-2 py-1 text-sm bg-background"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="w-56 pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">Import</Button>
          <Button variant="outline">Actions</Button>
          <Button onClick={() => setShowLeadForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Lead
          </Button>
        </div>
      </div>
      {/* New Lead Modal */}
      <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
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
                  <option value="new">New Lead</option>
                </select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" name="tags" value={newLead.tags} onChange={handleLeadInput} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">New Lead</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Leads Table */}
      <div className="px-8 pb-8">
        <LeadsList leads={filteredLeads} onLeadClick={handleLeadClick} />
      </div>
    </div>
  );
} 