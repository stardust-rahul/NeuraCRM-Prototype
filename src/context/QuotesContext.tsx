import React, { createContext, useContext, useState, useEffect } from "react";

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

const QuotesContext = createContext(null);

export function QuotesProvider({ children }) {
  const [quotes, setQuotes] = useState(() => {
    const stored = localStorage.getItem("quotes");
    return stored ? JSON.parse(stored) : initialQuotes;
  });

  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  const addQuote = (quote) => setQuotes((prev) => [quote, ...prev]);
  const updateQuote = (updated) => setQuotes((prev) => prev.map(q => q.id === updated.id ? { ...q, ...updated } : q));
  const removeQuote = (id) => setQuotes((prev) => prev.filter(q => q.id !== id));

  return (
    <QuotesContext.Provider value={{ quotes, addQuote, updateQuote, removeQuote }}>
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const ctx = useContext(QuotesContext);
  if (!ctx) throw new Error("useQuotes must be used within a QuotesProvider");
  return ctx;
} 