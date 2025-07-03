import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Edit, Check, Crown, Mail, Calendar, Clock, RefreshCw, Settings2, Info, FileText } from 'lucide-react';
import { useOpportunities } from '@/context/OpportunitiesContext';
import { useContacts } from '@/context/ContactsContext';
import { useAccounts } from '@/context/AccountsContext';
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import OpportunityQuotes from '@/components/opportunities/OpportunityQuotes';

const stages = ["Qualify", "Meet & Present", "Propose", "Negotiate", "Closed"];

function StageIndicator({ currentStage, onStageChange }) {
  // If currentStage is Closed Won or Closed Lost, treat as Closed for index
  const closedTypes = ["Closed Won", "Closed Lost"];
  const isClosedType = closedTypes.includes(currentStage);
  const currentIndex = isClosedType ? stages.length - 1 : stages.indexOf(currentStage);
  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" className="border rounded-full mr-2">
        <ChevronDown className="h-4 w-4 rotate-90" />
      </Button>
      <div className="flex items-center w-full bg-gray-200 rounded-full h-8">
        {stages.map((stage, index) => {
          if (!stage) return null;
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isClickable = index !== currentIndex && (stage !== 'Closed' || !isClosedType);
          // Show Closed Won/Lost in place of Closed if selected
          const displayStage = (stage === 'Closed' && isClosedType) ? currentStage : stage;
          return (
            <button
              key={stage}
              className={`relative flex items-center justify-center h-8 px-8 min-w-[120px] text-sm font-medium transition-all duration-200 focus:outline-none ${isActive ? 'bg-[#001A3A] text-white' : isCompleted ? 'bg-teal-200 text-black' : 'bg-gray-200 text-black'} ${index === 0 ? 'rounded-l-full' : ''} ${index === stages.length - 1 ? 'rounded-r-full' : ''} ${isClickable ? 'hover:bg-blue-100 cursor-pointer' : 'cursor-default'}`}
              style={{ zIndex: 2 }}
              onClick={() => isClickable && onStageChange(stage)}
              disabled={!isClickable}
              type="button"
            >
              {isCompleted && !isActive ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{displayStage}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}


export default function OpportunityDetail() {
  const { updateOpportunity } = useOpportunities();
  const { contacts } = useContacts();
  const { accounts } = useAccounts();
  const { opportunityId } = useParams();
  const navigate = useNavigate();
  const { opportunities } = useOpportunities();
  const opportunity = opportunities.find(o => o.id === opportunityId);

  // Provide fallback values for missing fields
  const safeOpportunity = {
    ...opportunity,
    probability: opportunity?.probability ?? '-',
    forecastCategory: opportunity?.forecastCategory ?? '-',
    createdBy: opportunity?.createdBy ?? 'User',
    createdDate: opportunity?.createdDate ?? opportunity?.created ?? '-',
    amount: opportunity?.amount ?? '-',
    title: opportunity?.title ?? '-',
    account: opportunity?.account ?? '-',
    closeDate: opportunity?.closeDate ?? '-',
    owner: opportunity?.owner ?? '-',
    stage: opportunity?.stage ?? '-',
  };

  // Find full account info
  const accountObj = accounts?.find(a => a.name === safeOpportunity.account);
  // Find main contact info
  const mainContact = contacts?.find(c => c.name === opportunity?.contact);

  // State for closed dialog
  const [showClosedDialog, setShowClosedDialog] = useState(false);

  if (!opportunity) {
    return <div className="p-8 text-center text-lg text-red-600">Opportunity not found</div>;
  }

  const DetailRow = ({ label, value, isLink = false, to = "#", hasIcon = false }) => (
    <div className="flex justify-between items-center py-2 border-b">
      <span className="text-gray-500">{label}</span>
      <div className="flex items-center">
        {hasIcon && (
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback>{value && value.charAt ? value.charAt(0) : '?'} </AvatarFallback>
          </Avatar>
        )}
        {isLink ? (
          <Link to={to} className="text-blue-600 hover:underline font-medium text-right">{value}</Link>
        ) : (
          <span className="font-medium text-right">{value}</span>
        )}
        <Button variant="ghost" size="icon" className="ml-2 h-7 w-7"><Edit className="h-4 w-4 text-gray-400" /></Button>
      </div>
    </div>
  );

  // Handler to update the stage of the opportunity
  const handleStageChange = (newStage) => {
    if (!opportunity) return;
    if (newStage === 'Closed') {
      setShowClosedDialog(true);
    } else {
      updateOpportunity({ ...opportunity, stage: newStage });
    }
  };

  // Handler for selecting closed type
  const handleClosedTypeSelect = (type) => {
    setShowClosedDialog(false);
    updateOpportunity({ ...opportunity, stage: type });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Crown className="h-6 w-6 text-orange-500" />
          </div>
          <div>
             <p className="text-sm text-gray-500">Opportunity</p>
             <h1 className="text-2xl font-bold">{safeOpportunity.title}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">New Event</Button>
          <Button variant="outline">New Task</Button>
          <Button variant="outline">Edit</Button>
          <Button variant="outline" size="icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Stage Tracker */}
      <div className="bg-white border-b p-4 flex flex-col md:flex-row md:justify-between items-center">
        <div className="flex justify-center w-full md:w-auto mb-2 md:mb-0">
          <div className="max-w-3xl w-full">
            <StageIndicator currentStage={safeOpportunity.stage} onStageChange={stage => handleStageChange(stage)} />
          </div>
        </div>
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            if (safeOpportunity.stage !== 'Closed' && safeOpportunity.stage !== 'Closed Won' && safeOpportunity.stage !== 'Closed Lost') {
              // Move to Closed, which will trigger dialog
              handleStageChange('Closed');
            } else {
              // Already at Closed, just open dialog
              setShowClosedDialog(true);
            }
          }}
        >
          <Check className="h-4 w-4 mr-2" />
          Mark Stage as Complete
        </Button>
      </div>

      {/* Closed Stage Dialog */}
      <Dialog open={showClosedDialog} onOpenChange={setShowClosedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Closed Stage</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button variant="outline" className="w-full" onClick={() => handleClosedTypeSelect('Closed Won')}>Closed Won</Button>
            <Button variant="outline" className="w-full" onClick={() => handleClosedTypeSelect('Closed Lost')}>Closed Lost</Button>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowClosedDialog(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-base font-semibold">
                <span>About</span>
                <ChevronDown className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <DetailRow label="Opportunity Name" value={safeOpportunity.title} />
              {accountObj ? (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-500">Account Name</span>
                  <Link to={`/account/${accountObj.id}`} className="text-blue-600 hover:underline font-medium text-right">{accountObj.name}</Link>
                </div>
              ) : (
                <DetailRow label="Account Name" value={safeOpportunity.account} />
              )}
              {accountObj && (
                <>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-500">Industry</span>
                    <span className="font-medium text-right">{accountObj.industry || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-500">Website</span>
                    <a href={`http://${accountObj.website}`} className="text-blue-600 hover:underline font-medium text-right" target="_blank" rel="noopener noreferrer">{accountObj.website}</a>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-500">Account Owner</span>
                    <span className="font-medium text-right">{accountObj.owner || '-'}</span>
                  </div>
                </>
              )}
              <DetailRow label="Close Date" value={safeOpportunity.closeDate} />
              <DetailRow label="Amount" value={safeOpportunity.amount} />
              <DetailRow label="Description" value="-" />
              <DetailRow label="Opportunity Owner" value={safeOpportunity.owner} hasIcon />
            </CardContent>
          </Card>
          <Card>
             <CardHeader>
              <CardTitle className="flex justify-between items-center text-base font-semibold">
                <span>Status</span>
                <ChevronDown className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
               <DetailRow label="Stage" value={safeOpportunity.stage} />
               <DetailRow label="Probability (%)" value={safeOpportunity.probability !== '-' ? `${safeOpportunity.probability}%` : '-'} />
               <DetailRow label="Forecast Category" value={safeOpportunity.forecastCategory} />
               <DetailRow label="Next Step" value="-" />
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-base font-semibold">
                <span>History</span>
                <ChevronDown className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{safeOpportunity.createdBy.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p>Created By <span className="font-semibold">{safeOpportunity.createdBy}</span></p>
                  <p className="text-xs text-gray-500">{safeOpportunity.createdDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <OpportunityQuotes opportunity={safeOpportunity} />
        </div>

        {/* Middle Column */}
        <div className="md:col-span-1 bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" className="bg-gray-200"><Mail className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm"><Calendar className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm"><Clock className="h-4 w-4" /></Button>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="insights-toggle" />
              <label htmlFor="insights-toggle" className="text-sm">Only show activities with insights</label>
            </div>
          </div>
          <div className="text-xs text-gray-500 mb-4 flex justify-between items-center">
            <span>Filters: Within 2 months • All activities • All types</span>
            <div className="flex items-center">
              <Button variant="link" size="sm" className="text-blue-600"><RefreshCw className="h-3 w-3 mr-1"/>Refresh</Button>
              <span className="mx-1">•</span>
              <Button variant="link" size="sm" className="text-blue-600">Expand All</Button>
              <Button variant="ghost" size="icon" className="h-7 w-7"><Settings2 className="h-4 w-4"/></Button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
            <h3 className="font-semibold text-base mb-2">Upcoming & Overdue</h3>
            <p className="text-sm">No activities to show.</p>
            <p className="text-xs">Get started by sending an email, scheduling a task, and more.</p>
            <div className="mt-4 flex items-center justify-center bg-blue-50 text-blue-700 p-2 rounded-md text-xs">
              <Info className="h-4 w-4 mr-2"/>
              To change what's shown, try changing your filters.
            </div>
            <Button variant="default" className="mt-4 bg-blue-600 hover:bg-blue-700">Show All Activities</Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-base font-semibold">
                <span>Contact Roles ({opportunity.contactRoles ? opportunity.contactRoles.length : 0})</span>
                <ChevronDown className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(opportunity.contactRoles && opportunity.contactRoles.length > 0) ? (
                opportunity.contactRoles.map((role) => {
                  const fullContact = contacts?.find(c => c.id === role.id);
                  return (
                    <div key={role.id} className="text-sm space-y-2 py-2 border-b last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{role.name ? role.name.charAt(0) : '?'}</AvatarFallback>
                          </Avatar>
                          <Link to={`/contacts/${role.id}`} className="font-semibold text-blue-600 hover:underline">{role.name || (fullContact?.name) || '-'}</Link>
                          <Badge variant="secondary" className="ml-2">{role.role ? role.role.toUpperCase() : '-'}</Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronDown className="h-5 w-5"/></Button>
                      </div>
                      <div className="text-xs text-muted-foreground pl-10">
                        Role: {role.title || fullContact?.title || '-'}<br/>
                        {fullContact?.email && (<span>Email: {fullContact.email}<br/></span>)}
                        {fullContact?.phone && (<span>Phone: {fullContact.phone}</span>)}
                      </div>
                    </div>
                  );
                })
              ) : (
                (() => {
                  if (mainContact) {
                    return (
                      <div className="text-sm space-y-2 py-2 border-b last:border-b-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>{mainContact.name ? mainContact.name.charAt(0) : '?'}</AvatarFallback>
                            </Avatar>
                            <Link to={`/contacts/${mainContact.id}`} className="font-semibold text-blue-600 hover:underline">{mainContact.name}</Link>
                            <Badge variant="secondary" className="ml-2">MAIN</Badge>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground pl-10">
                          Title: {mainContact.title || '-'}<br/>
                          Email: {mainContact.email || '-'}<br/>
                          Phone: {mainContact.phone || '-'}
                        </div>
                      </div>
                    );
                  } else if (opportunity.contact) {
                    // Show just the name if not found in contacts
                    return (
                      <div className="text-sm space-y-2 py-2 border-b last:border-b-0">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{opportunity.contact.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{opportunity.contact}</span>
                          <Badge variant="secondary" className="ml-2">MAIN</Badge>
                        </div>
                      </div>
                    );
                  } else {
                    return <p className="text-sm text-gray-500">No contact roles.</p>;
                  }
                })()
              )}
               <Button variant="link" className="p-0 h-auto mt-2 text-sm text-blue-600">View All</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-base font-semibold">
                <span>Files (0)</span>
                 <Button variant="ghost" size="icon"><ChevronDown className="h-5 w-5" /></Button>
              </CardTitle>
            </CardHeader>
             <CardContent>
               <div className="text-center py-6 border-2 border-dashed rounded-lg">
                <Button variant="outline"><FileText className="h-4 w-4 mr-2"/>Upload Files</Button>
                <p className="text-sm text-gray-500 mt-2">Or drop files</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-base font-semibold">
                <span>Products (0)</span>
                 <Button variant="ghost" size="icon"><ChevronDown className="h-5 w-5" /></Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-gray-500">No products.</p>
               <Button variant="outline" className="mt-2 w-full">Add Products</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 