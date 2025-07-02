import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Building, User, Calendar, Edit, Plus, CaseSensitive, Briefcase, File, ChevronDown, MessageSquare, Video, PhoneCall, Clock } from 'lucide-react';
import { useContacts } from '@/context/ContactsContext';
import { useOpportunities } from '@/context/OpportunitiesContext';
import { OpportunityModal, OpportunitiesList } from '@/components/opportunities';

export default function ContactDetail() {
  const { contactId } = useParams();
  const { contacts } = useContacts();
  const { opportunities } = useOpportunities();
  const [showOppModal, setShowOppModal] = useState(false);

  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  // Filter opportunities related to this contact
  const relatedOpportunities = opportunities.filter(o => o.contact === contact.name);

  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${contact.name}&background=random`} />
            <AvatarFallback>{contact.name?.charAt(0) || 'A'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-gray-500">Contact</p>
            <h1 className="text-2xl font-bold">Mr. {contact.name}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowOppModal(true)}>New Opportunity</Button>
          <Button variant="outline">Edit</Button>
          <Button variant="outline" size="icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* New Opportunity Modal */}
      <OpportunityModal open={showOppModal} onClose={() => setShowOppModal(false)} initialData={{ contact: contact.name, account: contact.account }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>About</span>
                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div className="flex justify-between"><span>Name</span><span className="font-medium text-right">{contact.name}</span></div>
              <div className="flex justify-between"><span>Account Name</span><Link to="/account/1" className="text-blue-600 hover:underline font-medium text-right">{contact.account}</Link></div>
              <div className="flex justify-between"><span>Title</span><span className="font-medium text-right">{contact.title || 'N/A'}</span></div>
              <div className="flex justify-between"><span>Reports To</span><span className="font-medium text-right">-</span></div>
              <div className="flex justify-between"><span>Description</span><span className="font-medium text-right">-</span></div>
              <div className="flex justify-between"><span>Contact Owner</span><span className="font-medium text-right">{contact.owner}</span></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Get in Touch</span>
                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
               <div className="flex justify-between"><span>Phone</span><span className="font-medium text-right">{contact.phone}</span></div>
               <div className="flex justify-between"><span>Email</span><span className="font-medium text-right">{contact.email}</span></div>
               <div className="flex justify-between"><span>Mailing Address</span><span className="font-medium text-right">-</span></div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>Created By {contact.owner}, 28/06/2025, 07:51</p>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" className="bg-gray-200"><Mail className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm"><Calendar className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm"><Clock className="h-4 w-4" /></Button>
            </div>
            <div>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="toggle-switch"/>
                <span>Only show activities with insights</span>
              </label>
            </div>
          </div>
          <div className="text-center text-gray-500 py-10">
            <p>No activities to show.</p>
            <p className="text-xs">Get started by sending an email, scheduling a task, and more.</p>
            <Button className="mt-4">Show All Activities</Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <OpportunitiesList
            opportunities={relatedOpportunities}
            onAddOpportunity={() => setShowOppModal(true)}
          />
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Cases (0)</span>
                 <Button variant="ghost" size="icon"><ChevronDown className="h-4 w-4" /></Button>
              </CardTitle>
            </CardHeader>
             <CardContent>
               <p className="text-sm text-gray-500">No cases.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Files (0)</span>
                 <Button variant="ghost" size="icon"><ChevronDown className="h-4 w-4" /></Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 border-2 border-dashed rounded-lg">
                <Button variant="outline">Upload Files</Button>
                <p className="text-sm text-gray-500 mt-2">Or drop files</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 