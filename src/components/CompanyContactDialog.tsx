import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Field {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  as?: "input" | "select";
  options?: { value: string; label: string }[];
}

interface CompanyContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  fields: Field[];
  values: Record<string, any>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  title: string;
  submitLabel?: string;
}

const CompanyContactDialog: React.FC<CompanyContactDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  fields,
  values,
  onChange,
  title,
  submitLabel = "Add",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {fields.map((field) => (
              <div key={field.name}>
                <Label>{field.label}</Label>
                {field.as === "select" ? (
                  <select
                    name={field.name}
                    value={values[field.name] || ""}
                    onChange={onChange}
                    className="w-full border rounded px-2 py-1"
                    required={field.required}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    name={field.name}
                    type={field.type || "text"}
                    value={values[field.name] || ""}
                    onChange={onChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">{submitLabel}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyContactDialog; 