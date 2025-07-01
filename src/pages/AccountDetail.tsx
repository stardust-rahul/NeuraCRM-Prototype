import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Edit,
  Globe,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash,
  ChevronDown,
  Paperclip,
  Upload,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useAccounts } from "@/context/AccountsContext";
import { useContacts } from "@/context/ContactsContext";
import { initialOpportunities } from "./Opportunities";

export default function AccountDetail() {
  const { accountId } = useParams();
  const { accounts } = useAccounts();
  const { contacts } = useContacts();

  // For now, we'll find the account from the context.
  // In a real app, you'd likely fetch this from an API.
  const account = accounts.find((acc) => acc.id === accountId);
  let dynamicAccount = null;
  if (!account) {
    // Try to build a dynamic account from contacts
    const contactWithAccount = contacts.find(c => `A-dynamic-${c.account.replace(/\s+/g, '').toLowerCase()}` === accountId);
    if (contactWithAccount) {
      dynamicAccount = {
        id: accountId,
        name: contactWithAccount.account,
        owner: "Imported from Contact",
        created: new Date().toLocaleDateString(),
        industry: "",
        website: ""
      };
    }
  }
  const accountToShow = account || dynamicAccount;
  const accountContacts = contacts.filter(contact => contact.account === accountToShow?.name);

  // Find related opportunities for this account
  const relatedOpportunities = (initialOpportunities || []).filter(
    (opp) => opp.account === accountToShow?.name
  );

  if (!accountToShow) {
    return <div>Account not found</div>;
  }

  return (
    <div className="p-4 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Building2 className="w-8 h-8 text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">Account</p>
            <h1 className="text-2xl font-bold">{accountToShow.name}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">New Contact</Button>
          <Button variant="outline">New Opportunity</Button>
          <Button variant="default">
            Edit
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Account Name</span>
                <span className="font-medium text-right">{accountToShow.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Website</span>
                <a href={`http://${accountToShow.website}`} className="text-blue-600">{accountToShow.website}</a>
              </div>
              <div className="flex justify-between">
                <span>Type</span>
                <span></span>
              </div>
              <div className="flex justify-between">
                <span>Description</span>
                <span></span>
              </div>
              <div className="flex justify-between">
                <span>Parent Account</span>
                <span></span>
              </div>
              <div className="flex justify-between">
                <span>Account Owner</span>
                <span className="font-medium">{accountToShow.owner}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">6587412589</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Billing Address</p>
                <p className="font-medium">Siliguri<br/>Darjeeling<br/>West Bengal<br/>734001<br/>India</p>
              </div>
              {/* Placeholder for map */}
              <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center">
                <p>Map Placeholder</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shipping Address</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <p className="text-gray-500">Created By</p>
                    <p>{accountToShow.owner} on {accountToShow.created}</p>
                </div>
                <div>
                    <p className="text-gray-500">Last Modified By</p>
                    <p>{accountToShow.owner} on {accountToShow.created}</p>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-around">
                  <Button variant="outline" size="icon"><Mail className="h-4 w-4"/></Button>
                  <Button variant="outline" size="icon">Icon2</Button>
                  <Button variant="outline" size="icon">Icon3</Button>
                  <Button variant="outline" size="icon">Icon4</Button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span>Only show activities with insights</span>
                {/* Switch component would go here */}
              </div>
              <div className="text-center py-10">
                <p>No activities to show.</p>
                <Button className="mt-4">Show All Activities</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Contacts ({accountContacts.length})</CardTitle>
              <ChevronDown/>
            </CardHeader>
            <CardContent>
              {accountContacts.map(contact => (
                <div key={contact.id} className="flex items-center space-x-4 py-2 border-b last:border-b-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-blue-600">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.title}</p>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Opportunities ({relatedOpportunities.length})</CardTitle>
              <ChevronDown/>
            </CardHeader>
            <CardContent>
              {relatedOpportunities.length === 0 ? (
                <p className="text-gray-500">No opportunities found.</p>
              ) : (
                relatedOpportunities.map(opp => (
                  <div key={opp.id} className="mb-2">
                    <div className="font-semibold text-blue-600">{opp.title}</div>
                    <div className="text-sm text-gray-500">Stage: {opp.stage}</div>
                    <div className="text-sm text-gray-500">Close Date: {opp.closeDate}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Cases (0)</CardTitle>
              <ChevronDown/>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Files (0)</CardTitle>
              <ChevronDown/>
            </CardHeader>
            <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                        <Button variant="link">Upload Files</Button> or drop files
                    </p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 