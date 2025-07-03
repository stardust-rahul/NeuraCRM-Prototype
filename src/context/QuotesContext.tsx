import React, { createContext, useContext, useState, useEffect } from "react";

const initialQuotes = [];

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

const defaultQuoteFields = {
  stage: "Qualification",
  dealOwner: "Unassigned",
  probability: 0,
  expectedRevenue: "-",
  closingDate: "",
  contact: {
    name: "-",
    company: "-",
    email: "-",
    phone: "-",
    avatar: "https://via.placeholder.com/48",
  },
  nextAction: {
    date: "-",
    action: "-",
  },
  notes: [],
  attachments: [],
  lineItems: [],
  activityHistory: [],
};

const getNewQuoteId = (quotes) => {
  const maxId = quotes.reduce((max, q) => {
    if (q.id && q.id.startsWith("Q-")) {
      const idNum = parseInt(q.id.substring(2), 10);
      if (!isNaN(idNum) && idNum > max) {
        return idNum;
      }
    }
    return max;
  }, 0);
  return `Q-${(maxId + 1).toString().padStart(3, "0")}`;
};

const QuotesContext = createContext(null);

export function QuotesProvider({ children }) {
  const [quotes, setQuotes] = useState(() => {
    const stored = localStorage.getItem("quotes");
    return stored ? JSON.parse(stored) : initialQuotes;
  });

  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  const addQuote = (quote) => {
    const newId = getNewQuoteId(quotes);
    const newQuote = {
      ...defaultQuoteFields,
      ...quote,
      id: newId,
      dealOwner: quote.owner || 'Unassigned',
      created: quote.created || new Date().toISOString().slice(0, 10),
      contact: { // Correctly merge contact details
        ...defaultQuoteFields.contact,
        ...quote.contact,
        avatar: `https://i.pravatar.cc/48?u=${newId}` // Assign a unique dummy avatar
      },
      lineItems: [
        { id: 'LI-001', product: 'Standard CRM Package', description: 'Includes sales, marketing, and service modules.', quantity: 1, unitPrice: 8500, total: 8500 },
        { id: 'LI-002', product: 'Onboarding & Training', description: '2-day remote training for up to 10 users.', quantity: 1, unitPrice: 4000, total: 4000 },
      ],
      activityHistory: [
        { id: 'AH-001', type: 'call', user: quote.owner, date: new Date().toISOString().slice(0, 10), details: 'Initial discovery call.' },
      ]
    };
    setQuotes((prev) => [newQuote, ...prev]);
    return newQuote;
  };
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