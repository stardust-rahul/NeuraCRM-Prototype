import React, { createContext, useContext, useState } from "react";
import { initialOpportunities } from "../data/initialOpportunities";

const OpportunitiesContext = createContext(null);

export function OpportunitiesProvider({ children }) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);

  const addOpportunity = (opportunity) => {
    const newOpportunity = {
      ...opportunity,
      id: `O-${Math.random().toString(36).substr(2, 9)}`,
      created: new Date().toLocaleDateString(),
    };
    setOpportunities((prev) => [newOpportunity, ...prev]);
  };

  const removeOpportunity = (id) => {
    setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
  };

  const updateOpportunity = (updatedOpportunity) => {
    setOpportunities(prev => prev.map(opp => opp.id === updatedOpportunity.id ? updatedOpportunity : opp));
  };

  return (
    <OpportunitiesContext.Provider value={{ opportunities, addOpportunity, removeOpportunity, updateOpportunity }}>
      {children}
    </OpportunitiesContext.Provider>
  );
}

export function useOpportunities() {
  const context = useContext(OpportunitiesContext);
  if (!context) throw new Error("useOpportunities must be used within an OpportunitiesProvider");
  return context;
} 