import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Opportunity {
  id: string;
  title: string;
  account: string;
  contact: string;
  stage: string;
  closeDate: string;
  owner: string;
  ownerAlias?: string;
}

interface OpportunitiesListProps {
  opportunities: Opportunity[];
  onSelect?: (opportunity: Opportunity) => void;
  onAddOpportunity?: () => void;
}

export default function OpportunitiesList({ opportunities, onSelect, onAddOpportunity }: OpportunitiesListProps) {
  return (
    <Card className="border border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Opportunities</CardTitle>
        {onAddOpportunity && (
          <Button variant="outline" size="sm" onClick={onAddOpportunity}>
            New Opportunity
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {opportunities.length === 0 ? (
          <div className="text-gray-500">No opportunities found.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left">Title</th>
                <th className="px-2 py-1 text-left">Account</th>
                <th className="px-2 py-1 text-left">Contact</th>
                <th className="px-2 py-1 text-left">Stage</th>
                <th className="px-2 py-1 text-left">Close Date</th>
                <th className="px-2 py-1 text-left">Owner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => onSelect && onSelect(opp)}>
                  <td className="px-2 py-1">{opp.title}</td>
                  <td className="px-2 py-1">{opp.account}</td>
                  <td className="px-2 py-1">{opp.contact}</td>
                  <td className="px-2 py-1">{opp.stage}</td>
                  <td className="px-2 py-1">{opp.closeDate}</td>
                  <td className="px-2 py-1">{opp.owner}</td>
                  <td className="px-2 py-1 text-right">
                    <Button variant="ghost" size="icon">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
