import React, { createContext, useState, useContext } from 'react';

const initialAccounts = [
  {
    id: "A-001",
    name: "Acme Corp",
    owner: "Sarah Johnson",
    created: "3 days ago",
    industry: "Technology",
    website: "acme.com",
  },
  {
    id: "A-002",
    name: "Amazon",
    owner: "Vishal Paswan",
    created: "07/06/2025, 06:42",
    industry: "e-commerce",
    website: "amazon.com",
  },
];

const AccountsContext = createContext(null);

export function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState(initialAccounts);

  const addAccount = (account) => {
    setAccounts((prev) => [
      {
        ...account,
        id: `A-${(prev.length + 1).toString().padStart(3, "0")}`,
      },
      ...prev,
    ]);
  };

  const updateAccount = (updatedAccount) => {
    setAccounts(prev => prev.map(account => account.id === updatedAccount.id ? updatedAccount : account));
  };

  return (
    <AccountsContext.Provider value={{ accounts, addAccount, updateAccount }}>
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccounts() {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error('useAccounts must be used within an AccountsProvider');
  }
  return context;
} 