import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Building2,
  Plus,
  Search,
  Filter,
  Upload,
  MoreHorizontal,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useAccounts } from "@/context/AccountsContext";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useContacts } from "@/context/ContactsContext";

export default function Accounts() {
  const { accounts, addAccount } = useAccounts();
  const { contacts } = useContacts();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [accountSearch, setAccountSearch] = useState("");
  const [filter, setFilter] = useState("All Accounts");

  const filterOptions = ["All Accounts", "My Accounts", "Recently Added"];

  const [newAccount, setNewAccount] = useState({
    name: "",
    industry: "",
    website: "",
    owner: "Current User",
    created: new Date().toLocaleDateString(),
  });

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    addAccount(newAccount);
    setNewAccount({
      name: "",
      industry: "",
      website: "",
      owner: "Current User",
      created: new Date().toLocaleDateString(),
    });
    setIsCreateDialogOpen(false);
    toast({
      title: "Account added",
      description: `The company '${newAccount.name}' was added successfully.`,
    });
  };

  // Merge accounts from context and any new account names from contacts
  const contactAccountNames = Array.from(new Set(contacts.map(c => c.account).filter(Boolean)));
  const allAccounts = [
    ...accounts,
    ...contactAccountNames
      .filter(name => !accounts.some(a => a.name === name))
      .map(name => ({
        id: `A-dynamic-${String(name).replace(/\s+/g, '').toLowerCase()}`,
        name,
        owner: "Imported from Contact",
        created: new Date().toLocaleDateString(),
        industry: "",
        website: ""
      }))
  ];

  const filteredAccounts = allAccounts.filter(c => c.name.toLowerCase().includes(accountSearch.toLowerCase()));

  const contactsByAccount = contacts.reduce((acc, contact) => {
    if (contact.account && contact.name) {
      if (!acc[contact.account]) acc[contact.account] = [];
      if (!acc[contact.account].includes(contact.name)) acc[contact.account].push(contact.name);
    }
    return acc;
  }, {});

  return (
    <div className="p-0 bg-background min-h-screen">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Accounts</h1>
          <select
            className="border rounded px-2 py-1 text-sm bg-background"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search accounts..."
              className="w-56 pl-10 h-9"
              value={accountSearch}
              onChange={(e) => setAccountSearch(e.target.value)}
            />
          </div>
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Accounts</DialogTitle>
                <DialogDescription>Upload a CSV file to import accounts.</DialogDescription>
              </DialogHeader>
              <Input type="file" accept=".csv" />
              <DialogFooter>
                <Button onClick={() => setIsImportDialogOpen(false)}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm">Actions</Button>
          <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>
      </div>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCompany} className="space-y-4 py-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
              <Input id="name" name="name" value={newAccount.name} onChange={handleCompanyChange} required />
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
              <Input id="industry" name="industry" value={newAccount.industry} onChange={handleCompanyChange} />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
              <Input id="website" name="website" value={newAccount.website} onChange={handleCompanyChange} />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Add Account</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <div className="px-6 py-6">
        <div className="overflow-x-auto rounded border border-border/50 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-[40px] px-2"><input type="checkbox" /></TableHead>
                <TableHead className="w-[50px] px-2">#</TableHead>
                <TableHead className="px-2 py-2">Name</TableHead>
                <TableHead className="px-2 py-2">Industry</TableHead>
                <TableHead className="px-2 py-2">Website</TableHead>
                <TableHead className="px-2 py-2">Owner</TableHead>
                <TableHead className="px-2 py-2">Created</TableHead>
                <TableHead className="text-right px-2 py-2">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account, idx) => (
                <TableRow key={account.id} className="border-b hover:bg-muted/30 text-sm">
                  <TableCell className="px-2 py-1"><input type="checkbox" /></TableCell>
                  <TableCell className="px-2 py-1 text-muted-foreground">{idx + 1}</TableCell>
                  <TableCell className="px-2 py-1 font-medium">
                    <Link to={`/accounts/${account.id}`} className="text-blue-600 hover:underline">{account.name}</Link>
                  </TableCell>
                  <TableCell className="px-2 py-1">{account.industry}</TableCell>
                  <TableCell className="px-2 py-1">
                    <a
                      href={
                        account.website.startsWith("http://") || account.website.startsWith("https://")
                          ? account.website
                          : `http://${account.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {account.website}
                    </a>
                  </TableCell>
                  <TableCell className="px-2 py-1">{account.owner}</TableCell>
                  <TableCell className="px-2 py-1">{account.created}</TableCell>
                  <TableCell className="px-2 py-1 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Account</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
