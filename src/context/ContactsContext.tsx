import React, { createContext, useContext, useState } from "react";

const initialContacts = [
  {
    id: "C-001",
    name: "John Smith",
    account: "Acme Corp",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    owner: "Sarah Johnson",
    title: "Director"
  },
  {
    id: "C-002",
    name: "Goyal Kumar",
    account: "Amazon",
    email: "vishal@kumar.com",
    phone: "7896453651",
    owner: "Vishal Paswan",
    title: "Director"
  },
  {
    id: "C-003",
    name: "Nidhi Sharma",
    account: "Amazon",
    email: "nidhi@sharma.com",
    phone: "6587412589",
    owner: "Vishal Paswan",
    title: "Developer"
  },
  // Dummy contacts
  ...Array.from({ length: 17 }, (_, i) => ({
    id: `C-${(i + 4).toString().padStart(3, "0")}`,
    name: `Contact ${i + 4}`,
    account: `Company ${i + 4}`,
    email: `contact${i + 4}@company.com`,
    phone: `+1 (555) 111-${(2000 + i).toString().padStart(4, "0")}`,
    owner: ["Sarah Johnson", "Mike Chen", "Alex Lee", "Priya Patel"][i % 4],
    title: ["Manager", "Director", "VP", "Engineer"][i % 4],
  })),
];

const ContactsContext = createContext(null);

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(initialContacts);

  const addContact = (contact) => {
    setContacts((prev) => [
      {
        ...contact,
        id: `C-${(prev.length + 1).toString().padStart(3, "0")}`,
      },
      ...prev,
    ]);
  };

  const updateContact = (updatedContact) => {
    setContacts(prev => prev.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
  };

  const removeContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <ContactsContext.Provider value={{ contacts, addContact, updateContact, removeContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) throw new Error("useContacts must be used within a ContactsProvider");
  return context;
} 