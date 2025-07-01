export const mockAccounts = [
  {
    id: "ACC-001",
    name: "Amazon India",
    contacts: [
      {
        id: "C-002",
        name: "Ankit Chandan",
        title: "Decision Maker",
        opportunities: [
          {
            id: "Eire-",
            name: "Eire-",
            accountName: "Amazon India",
            closeDate: "30/06/2025",
            amount: "500,000",
            description: "Initial discovery call completed. High interest.",
            owner: "Vishal Paswan",
            stage: "Propose",
            probability: 50,
            forecastCategory: "Pipeline",
            nextStep: "Send proposal and schedule follow-up",
            createdBy: "Vishal Paswan",
            createdDate: "28/06/2025, 07:51",
            contactRoles: [
              {
                id: "C-002",
                name: "Ankit Chandan",
                role: "Primary",
                title: "Decision Maker"
              }
            ]
          }
        ]
      },
      {
        id: "C-003",
        name: "Sunil Kumar",
        title: "Technical Lead",
        opportunities: [
          {
            id: "OPP-002",
            name: "Cloud Services Contract",
            accountName: "Amazon India",
            closeDate: "15/08/2025",
            amount: "1,200,000",
            description: "Negotiating terms for a 3-year cloud service contract.",
            owner: "Vishal Paswan",
            stage: "Negotiate",
            probability: 75,
            forecastCategory: "Best Case",
            nextStep: "Finalize legal review",
            createdBy: "Vishal Paswan",
            createdDate: "15/07/2025, 11:00",
            contactRoles: [
              {
                id: "C-003",
                name: "Sunil Kumar",
                role: "Technical Buyer",
                title: "Technical Lead"
              },
              {
                id: "C-002",
                name: "Ankit Chandan",
                role: "Decision Maker",
                title: "Decision Maker"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const findOpportunityById = (id: string | undefined) => {
  if (!id) return undefined;
  for (const account of mockAccounts) {
    for (const contact of account.contacts) {
      const opportunity = contact.opportunities.find(opp => opp.id === id);
      if (opportunity) {
        return opportunity;
      }
    }
  }
  return undefined;
}; 