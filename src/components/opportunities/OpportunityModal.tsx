import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOpportunities } from "@/context/OpportunitiesContext";

interface OpportunityModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<{
    title: string;
    account: string;
    contact: string;
    stage: string;
    closeDate: string;
    owner: string;
  }>;
}

const defaultForm = {
  title: '',
  account: '',
  contact: '',
  stage: 'Qualify',
  closeDate: '',
  owner: '',
};

export default function OpportunityModal({ open, onClose, initialData }: OpportunityModalProps) {
  const { addOpportunity } = useOpportunities();
  const [form, setForm] = useState({ ...defaultForm, ...initialData });

  useEffect(() => {
    setForm({ ...defaultForm, ...initialData });
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOpportunity({
      id: `O-${Math.floor(Math.random() * 100000)}`,
      ...form,
      ownerAlias: form.owner,
    });
    onClose();
    setForm(defaultForm);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Opportunity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" label="Title" placeholder="Opportunity Title" value={form.title} onChange={handleChange} required />
          <Input name="account" label="Account" placeholder="Account Name" value={form.account} onChange={handleChange} />
          <Input name="contact" label="Contact" placeholder="Contact Name" value={form.contact} onChange={handleChange} />
          <Input name="stage" label="Stage" placeholder="Stage" value={form.stage} onChange={handleChange} />
          <Input name="closeDate" label="Close Date" type="date" value={form.closeDate} onChange={handleChange} />
          <Input name="owner" label="Owner" placeholder="Owner" value={form.owner} onChange={handleChange} />
          <DialogFooter>
            <Button type="submit">Create</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
