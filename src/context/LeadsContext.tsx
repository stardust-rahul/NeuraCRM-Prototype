import React, { createContext, useContext, useState } from "react";

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

const LeadsContext = createContext(null);

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState(initialLeads);

  const addLead = (lead) => {
    const newLead = {
      ...lead,
      id: `L-${Math.random().toString(36).substr(2, 9)}`,
      created: new Date().toLocaleDateString(),
      updated: new Date().toLocaleDateString(),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const removeLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const updateLead = (updatedLead) => {
    setLeads(prev => prev.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
  };

  return (
    <LeadsContext.Provider value={{ leads, addLead, removeLead, updateLead }}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadsContext);
  if (!context) throw new Error("useLeads must be used within a LeadsProvider");
  return context;
} 