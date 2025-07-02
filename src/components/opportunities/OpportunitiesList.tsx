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
  amount?: number;
  probability?: number;
  forecastCategory?: string;
  createdBy?: string;
  createdDate?: string;
  accountName?: string;
  name?: string;
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
          <div className="space-y-3">
            {opportunities.map((opp) => (
              <Card key={opp.id} className="border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition" onClick={() => onSelect && onSelect(opp)}>
                <CardContent className="py-3 px-4 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-700 text-base">{opp.title || opp.name}</span>
                    <span className="px-2 py-1 rounded bg-gray-100 text-xs font-medium border border-gray-200">{opp.stage}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500">Amount:</span>
                    <span className="font-medium">{opp.amount != null ? opp.amount : '-'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Close Date:</span>
                    <span className="font-medium">{opp.closeDate || '-'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
