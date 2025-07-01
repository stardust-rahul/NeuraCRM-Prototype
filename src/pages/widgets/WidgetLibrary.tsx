import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, GripVertical, StickyNote } from "lucide-react";
import React, { useState } from "react";
import { DndContext, closestCenter, useDroppable, useDraggable } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface WidgetLibraryWidget {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  size: string;
  section: string;
  color?: string; // For accent or status
  stats?: { label: string; value: string | number }[]; // For KPI/stat widgets
  actions?: { label: string; onClick: () => void }[]; // For action widgets
}

interface WidgetLibraryProps {
  availableWidgets: WidgetLibraryWidget[];
  onAddWidget: (id: string) => void;
}

function DraggableWidget({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  return (
    <div ref={setNodeRef} style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}>
      <div {...attributes} {...listeners} className="cursor-move">
        <GripVertical className="inline-block mr-2" />
      </div>
      {children}
    </div>
  );
}

export default function WidgetLibrary({ availableWidgets, onAddWidget }: WidgetLibraryProps) {
  const [widgets, setWidgets] = useState<WidgetLibraryWidget[]>([]);
  const [editingWidget, setEditingWidget] = useState<WidgetLibraryWidget | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    size: "",
    section: "",
    color: ""
  });
  const [error, setError] = useState("");

  // Group widgets by section
  const kpiWidgets = availableWidgets.filter(w => w.section === "KPI");
  const activityWidgets = availableWidgets.filter(w => w.section === "Activity");
  const actionWidgets = availableWidgets.filter(w => w.section === "Action");

  // Open edit modal
  const handleEdit = (widget: WidgetLibraryWidget) => {
    setEditingWidget(widget);
    setEditForm({
      title: widget.title,
      description: widget.description,
      size: widget.size,
      section: widget.section,
      color: widget.color || ""
    });
    setError("");
  };

  // Save changes
  const handleSave = () => {
    if (!editForm.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!editingWidget) return;
    setWidgets(widgets.map(w =>
      w.id === editingWidget.id ? { ...w, ...editForm } : w
    ));
    setEditingWidget(null);
    setError("");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center mb-2">
        <span className="mr-2 text-xl">🗂️</span>
        <h2 className="text-2xl font-bold">Widget Library</h2>
      </div>
      <p className="text-muted-foreground mb-6">Choose from available widgets to customize your dashboard</p>
      {/* Render availableWidgets as cards with an Add button */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {availableWidgets.map((w) => (
          <Card key={w.id}>
            <CardHeader>
              <CardTitle>{w.title}</CardTitle>
              <CardDescription>{w.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => onAddWidget(w.id)}>Add Widget</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function NotesWidget({ notes }) {
  return (
    <Card className="border border-border/50 shadow-lg rounded-xl bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
          <StickyNote className="w-6 h-6" />
        </div>
        <div>
          <CardTitle className="text-lg font-semibold">Notes</CardTitle>
          <CardDescription className="text-sm">Quick notes for your day</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ul className="space-y-2">
          {notes && notes.length > 0 ? (
            notes.map((n, i) => (
              <li key={i} className="text-sm text-blue-900 bg-blue-50 rounded px-3 py-2 border border-blue-100">
                {n.note}
              </li>
            ))
          ) : (
            <div className="text-muted-foreground text-sm">
              You can jot down reminders, ideas, or anything important here.
            </div>
          )}
        </ul>
      </CardContent>
    </Card>
  );
} 