import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  Building2,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useContacts } from "@/context/ContactsContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

export default function Contacts() {
  const { contacts, addContact } = useContacts();
  const [filter, setFilter] = useState("All Contacts");
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const filterOptions = ["All Contacts", "My Contacts", "New Last Week"];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.account.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (newContact) => {
    addContact({
      ...newContact,
      lastContact: newContact.lastContact || "Today",
      status: newContact.status || "active",
    });
    setAddOpen(false);
  };

  return (
    <div className="p-0 bg-background min-h-screen">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <select
            className="border rounded px-2 py-1 text-sm bg-background"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="w-56 pl-10 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">Import</Button>
          <Button variant="outline" size="sm">Actions</Button>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="overflow-x-auto rounded border border-border/50 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-[40px] px-2">
                  <input type="checkbox" />
                </TableHead>
                <TableHead className="w-[50px] px-2">#</TableHead>
                <TableHead className="px-2 py-2">Name</TableHead>
                <TableHead className="px-2 py-2">Email</TableHead>
                <TableHead className="px-2 py-2">Phone</TableHead>
                <TableHead className="px-2 py-2">Account</TableHead>
                <TableHead className="px-2 py-2">Last Contact</TableHead>
                <TableHead className="px-2 py-2">Status</TableHead>
                <TableHead className="text-right px-2 py-2">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact, idx) => (
                <TableRow key={contact.id || idx} className="border-b hover:bg-muted/30 text-sm">
                  <TableCell className="px-2 py-1">
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell className="px-2 py-1 text-muted-foreground">{idx + 1}</TableCell>
                  <TableCell className="px-2 py-1 font-medium">
                    <Link to={`/contacts/${contact.id}`} className="text-blue-600 hover:underline">
                      {contact.name}
                    </Link>
                  </TableCell>
                  <TableCell className="px-2 py-1">{contact.email}</TableCell>
                  <TableCell className="px-2 py-1">{contact.phone}</TableCell>
                  <TableCell className="px-2 py-1 font-bold">{contact.account}</TableCell>
                  <TableCell className="px-2 py-1">{contact.lastContact || 'N/A'}</TableCell>
                  <TableCell className="px-2 py-1">
                    <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>{contact.status || 'unknown'}</Badge>
                  </TableCell>
                  <TableCell className="px-2 py-1 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Contact</DropdownMenuItem>
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

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Contact</DialogTitle>
            <DialogDescription>Enter details for a new contact.</DialogDescription>
          </DialogHeader>
          <AddContactForm onAdd={handleAdd} onCancel={() => setAddOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddContactForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    account: "",
    email: "",
    phone: "",
    lastContact: "",
    status: "active",
    owner: "Current User",
  });
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(form);
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Name" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Title" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Account</label>
          <Input value={form.account} onChange={(e) => setForm((f) => ({ ...f, account: e.target.value }))} placeholder="Account Name" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="Email" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="Phone" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Contact</label>
          <Input value={form.lastContact} onChange={(e) => setForm((f) => ({ ...f, lastContact: e.target.value }))} placeholder="Last contact date" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="w-full border rounded px-2 py-2 text-sm"
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <DialogFooter className="mt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-primary text-white">Add Contact</Button>
      </DialogFooter>
    </form>
  );
}
