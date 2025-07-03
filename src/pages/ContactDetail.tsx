import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Building, User, Calendar, Edit, Plus, CaseSensitive, Briefcase, File, ChevronDown, MessageSquare, Video, PhoneCall, Clock } from 'lucide-react';
import { useContacts } from '@/context/ContactsContext';
import { useOpportunities } from '@/context/OpportunitiesContext';
import { OpportunityModal, OpportunitiesList } from '@/components/opportunities';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function ContactDetail({ contactId: propContactId, onBack }) {
  const params = useParams();
  const contactId = propContactId || params.contactId;
  const { contacts } = useContacts();
  const { fetchOpportunities, opportunities } = useOpportunities();
  const [showOppModal, setShowOppModal] = useState(false);

  const contact = contacts.find(c => c.id === contactId);

  useEffect(() => {
    // Fetch opportunities when the contact changes
    fetchOpportunities && fetchOpportunities();
  }, [contactId, fetchOpportunities]);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const accountName = contact.account?.toLowerCase().replace(/\s+/g, '');
  const relatedOpportunities = opportunities.filter(
    o =>
      o.contactId === contact.id ||
      o.contact === contact.name ||
      (o.account && o.account.toLowerCase().replace(/\s+/g, '') === accountName) ||
      (o.accountName && o.accountName.toLowerCase().replace(/\s+/g, '') === accountName) ||
      (o.company && o.company.toLowerCase().replace(/\s+/g, '') === accountName)
  );

  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="border-b bg-white px-8 py-4 mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${contact.name}&background=random`} />
              <AvatarFallback>{contact.name?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold">{contact.name}</h1>
            {contact.account && (
              <Badge variant="outline">{contact.account}</Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {onBack && (
              <Button variant="outline" onClick={onBack}>Back to Contacts</Button>
            )}
            <Button variant="outline" onClick={() => setShowOppModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Opportunity
            </Button>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>
      {/* New Opportunity Modal */}
      <OpportunityModal open={showOppModal} onClose={() => setShowOppModal(false)} initialData={{ contact: contact.name, account: contact.account }} />
      {/* Main Content Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info (Left, 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                    <p className="text-lg font-semibold">{contact.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Title</span>
                    <p className="text-lg">{contact.title || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Email</span>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Phone</span>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>Company Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Company Name</span>
                    <p className="text-lg font-semibold">{contact.account}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Contact Owner</span>
                    <p className="text-lg">{contact.owner}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Notes (optional, placeholder) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <File className="w-5 h-5" />
                  <span>Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">No notes available.</p>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar (Right, 1/3) */}
          <div className="space-y-6">
            {/* Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OpportunitiesList
                  opportunities={relatedOpportunities}
                  onAddOpportunity={() => setShowOppModal(true)}
                />
              </CardContent>
            </Card>
            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CaseSensitive className="w-5 h-5" />
                  <span>Tags</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No tags assigned</p>
              </CardContent>
            </Card>
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Contact Created</p>
                      <p className="text-xs text-muted-foreground">28/06/2025</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-muted-foreground">28/06/2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />Send Email
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <PhoneCall className="w-4 h-4 mr-2" />Call
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />Message
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Video className="w-4 h-4 mr-2" />Video Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 