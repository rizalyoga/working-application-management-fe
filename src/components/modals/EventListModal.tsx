import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScheduleEvent } from "@/types/calendar";
import { formatDisplayDate } from "@/lib/calendar";
import { Clock, FileText, List } from "lucide-react";

interface EventListModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: ScheduleEvent[];
  date: string;
  onEventClick: (event: ScheduleEvent) => void;
}

export const EventListModal: React.FC<EventListModalProps> = ({
  isOpen,
  onClose,
  events,
  date,
  onEventClick,
}) => {
  if (events.length === 0) return null;

  const handleEventClick = (event: ScheduleEvent) => {
    onEventClick(event);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <List size={20} className="text-primary" />
            </div>
            {formatDisplayDate(date)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative p-5 border border-border rounded-xl hover:border-primary/50 hover:bg-accent/50 cursor-pointer transition-all duration-200 hover:shadow-md"
              onClick={() => handleEventClick(event)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="p-1.5 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors flex items-center gap-2">
                      <FileText size={18} className="text-primary" />
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                    </span>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="p-1 bg-muted/70 rounded-sm">
                        <Clock className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm font-medium">{event.time}</span>
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed pl-8">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Subtle indicator for clickable item */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Total {events.length} schedule today
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
