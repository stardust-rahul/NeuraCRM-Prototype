import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, ChevronDown, Mail, Calendar, Clock, Check, Users, FileText, Crown, Info, RefreshCw, Settings2, ChevronLeft } from 'lucide-react';
import { findOpportunityById } from '@/data/mock-data';
import { Switch } from "@/components/ui/switch";

const stages = ["", "Propose", "Negotiate", "Closed"];

const StageIndicator = ({ currentStage }) => {
  const currentIndex = stages.indexOf(currentStage);

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
          
          return (
            <div
              key={stage}
              className={`h-full flex items-center justify-center flex-1 first:rounded-l-full last:rounded-r-full relative
                ${isActive ? 'bg-primary text-primary-foreground' : isCompleted ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-500'}
                ${!isActive && !isCompleted ? 'hover:bg-gray-300' : ''}
                transition-all duration-300`}
              style={{ clipPath: index < stages.length -1 && index > 0 ? 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)' : ''}}
            >
              <div className={`absolute w-full h-full ${index < stages.length -1 && index > 0 ? 'bg-inherit' : ''}`} style={{zIndex: -1, right: '-1px',  clipPath: index < stages.length - 1 && index > 0 ? 'polygon(calc(100% - 10px) 0, 100% 0, 100% 100%, calc(100% - 10px) 100%)' : ''}}></div>
              {isCompleted && <Check className="h-5 w-5 mr-1" />}
              <span className="font-semibold text-sm">{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default function OpportunityDetail() {
  const { opportunityId } = useParams();
  const navigate = useNavigate();
  // Fetch opportunity data based on ID. Using mock data for now.
  const opportunity = findOpportunityById(opportunityId);

  if (!opportunity) {
    return <div>Opportunity not found</div>;
  }

  const DetailRow = ({ label, value, isLink = false, to = "#", hasIcon = false }) => (
    <div className="flex justify-between items-center py-2 border-b">
      <span className="text-gray-500">{label}</span>
      <div className="flex items-center">
        {hasIcon && (
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback>{value.charAt(0)}</AvatarFallback>
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

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2 flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Crown className="h-6 w-6 text-orange-500" />
          </div>
          <div>
             <p className="text-sm text-gray-500">Opportunity</p>
             <h1 className="text-2xl font-bold">{opportunity.name}</h1>
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
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <div className="w-full md:w-2/3 lg:w-3/4">
          <StageIndicator currentStage={opportunity.stage} />
        </div>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          <Check className="h-4 w-4 mr-2" />
          Mark Stage as Complete
        </Button>
      </div>

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
              <DetailRow label="Opportunity Name" value={opportunity.name} />
              <DetailRow label="Account Name" value={opportunity.accountName} isLink to="/account/1" />
              <DetailRow label="Close Date" value={opportunity.closeDate} />
              <DetailRow label="Amount" value={opportunity.amount || '-'} />
              <DetailRow label="Description" value="-" />
              <DetailRow label="Opportunity Owner" value={opportunity.owner} hasIcon />
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
               <DetailRow label="Stage" value={opportunity.stage} />
               <DetailRow label="Probability (%)" value={`${opportunity.probability}%`} />
               <DetailRow label="Forecast Category" value={opportunity.forecastCategory} />
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
                  <AvatarFallback>{opportunity.createdBy.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p>Created By <span className="font-semibold">{opportunity.createdBy}</span></p>
                  <p className="text-xs text-gray-500">{opportunity.createdDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                <span>Contact Roles ({opportunity.contactRoles?.length || 0})</span>
                <ChevronDown className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {opportunity.contactRoles && opportunity.contactRoles.length > 0 ? (
                opportunity.contactRoles.map((contact) => (
                  <div key={contact.id} className="text-sm space-y-2 py-2 border-b last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                         <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        <Link to={`/contacts/${contact.id}`} className="font-semibold text-blue-600 hover:underline">{contact.name}</Link>
                         <Badge variant="secondary" className="ml-2">{contact.role.toUpperCase()}</Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronDown className="h-5 w-5"/></Button>
                    </div>
                     <div className="text-xs text-muted-foreground pl-10">Role: {contact.title}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No contact roles.</p>
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