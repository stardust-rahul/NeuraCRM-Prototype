import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface OpportunityDetailProps {
  opportunity: {
    id: string;
    title: string;
    account: string;
    contact: string;
    stage: string;
    closeDate: string;
    owner: string;
    ownerAlias?: string;
  };
}

export default function OpportunityDetail({ opportunity }: OpportunityDetailProps) {
  if (!opportunity) return <div>Opportunity not found.</div>;
  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>{opportunity.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div><b>Account:</b> {opportunity.account}</div>
        <div><b>Contact:</b> {opportunity.contact}</div>
        <div><b>Stage:</b> {opportunity.stage}</div>
        <div><b>Close Date:</b> {opportunity.closeDate}</div>
        <div><b>Owner:</b> {opportunity.owner}</div>
      </CardContent>
    </Card>
  );
}
