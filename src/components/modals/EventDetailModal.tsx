import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScheduleEvent } from "@/types/calendar";
import { useDeleteEvent } from "@/hooks/useEvents";
import { toast } from "sonner";
import { formatDisplayDate } from "@/lib/calendar";
import { Calendar, Clock, FileText, Edit, Trash, X } from "lucide-react";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ScheduleEvent | null;
  onEdit: (event: ScheduleEvent) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  event,
  onEdit,
}) => {
  const deleteEventMutation = useDeleteEvent();

  if (!event) return null;

  const handleDelete = async () => {
    try {
      await deleteEventMutation.mutateAsync(event.id);
      toast("Success", {
        description: "Jadwal berhasil dihapus",
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast("Error", {
        description: "Terjadi kesalahan saat menghapus jadwal",
      });
    }
  };

  const handleEdit = () => {
    onEdit(event);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            Schedule Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-accent/50 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold text-base flex items-center gap-3 mb-3">
                <div className="p-1.5 bg-primary/10 rounded-md">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                {event.title}
              </h3>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-1.5 bg-muted rounded-md">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">
                  {formatDisplayDate(event.date)} • {event.time}
                </span>
              </div>
            </div>
          </div>

          {event.description && (
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Description
              </h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2 sm:order-last"
            >
              <X className="h-4 w-4" />
              Close
            </Button>
            <Button
              variant="outline"
              onClick={handleEdit}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Schedule
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteEventMutation.isPending}
              className="flex items-center gap-2"
            >
              <Trash className="h-4 w-4" />
              {deleteEventMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
