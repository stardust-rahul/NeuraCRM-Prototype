import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const STAGES = ["Draft", "Pending", "Activated", "Completed", "Cancelled"];

export default function OrdersKanbanView({ orders, onStatusChange }) {
  const navigate = useNavigate();
  // Local state for drag-and-drop
  const [columns, setColumns] = useState(() => {
    const colObj = {};
    STAGES.forEach(stage => {
      colObj[stage] = orders.filter(o => (o.status || "Draft") === stage);
    });
    return colObj;
  });

  // If orders prop changes, update columns
  // eslint-disable-next-line
  if (orders.length !== Object.values(columns).flat().length) {
    const colObj = {};
    STAGES.forEach(stage => {
      colObj[stage] = orders.filter(o => (o.status || "Draft") === stage);
    });
    setColumns(colObj);
  }

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const sourceStage = source.droppableId;
    const destStage = destination.droppableId;
    const movedOrder = columns[sourceStage][source.index];
    // Remove from source
    const newSource = Array.from(columns[sourceStage]);
    newSource.splice(source.index, 1);
    // Add to dest
    const newDest = Array.from(columns[destStage]);
    movedOrder.status = destStage;
    newDest.splice(destination.index, 0, movedOrder);
    setColumns({
      ...columns,
      [sourceStage]: newSource,
      [destStage]: newDest
    });
    if (onStatusChange) onStatusChange(movedOrder, destStage);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto py-4 min-h-[350px]">
        {STAGES.map(stage => (
          <Droppable droppableId={stage} key={stage}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-1 min-w-[260px] bg-gradient-to-b from-blue-50 to-white rounded-xl shadow p-4 border border-blue-100 transition-all ${snapshot.isDraggingOver ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="font-bold text-blue-900 mb-2 flex items-center justify-between">
                  <span>{stage}</span>
                  <Badge variant="secondary">{columns[stage]?.length || 0}</Badge>
                </div>
                <div className="space-y-3 min-h-[40px]">
                  {columns[stage]?.length === 0 && <div className="text-xs text-muted-foreground">No orders</div>}
                  {columns[stage]?.map((order, idx) => (
                    <Draggable draggableId={String(order.id)} index={idx} key={order.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`rounded-lg bg-white shadow border border-blue-100 p-3 flex flex-col space-y-1 hover:bg-blue-50 transition cursor-pointer ${snapshot.isDragging ? 'ring-2 ring-blue-500' : ''}`}
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-blue-800 truncate">{order.customer || '-'}</span>
                            <Badge variant="secondary">{order.amount ? `₹${order.amount}` : '-'}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">{order.company || ''}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Button size="icon" variant="ghost" onClick={e => {e.stopPropagation();navigate(`/orders/${order.id}`);}} title="View"><Eye className="w-4 h-4" /></Button>
                            <Button size="icon" variant="ghost" onClick={e => {e.stopPropagation();navigate(`/orders/${order.id}?edit=true`);}} title="Edit"><Edit className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
