import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEvent, useUpdateEvent } from "@/hooks/useEvents";
import { ScheduleEvent } from "@/types/calendar";
import { toast } from "sonner";
import {
  eventSchema,
  EventFormData,
} from "@/lib/form-validator/event-form-validator";
import { Calendar, Clock, FileText, Save, X } from "lucide-react";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  editEvent?: ScheduleEvent | null;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  editEvent,
}) => {
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      time: "",
    },
  });

  useEffect(() => {
    if (editEvent) {
      form.reset({
        title: editEvent.title,
        description: editEvent.description,
        time: editEvent.time,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        time: "",
      });
    }
  }, [editEvent, isOpen, form]);

  const handleSubmit = async (data: EventFormData) => {
    try {
      if (editEvent) {
        await updateEventMutation.mutateAsync({
          ...editEvent,
          title: data.title,
          description: data.description,
          time: data.time,
        });
        toast("Success", {
          description: "Schedule has been updated",
        });
      } else {
        await createEventMutation.mutateAsync({
          title: data.title,
          description: data.description,
          date: selectedDate,
          time: data.time,
        });
        toast("Success", {
          description: "Event created successfully.",
        });
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast("Error", {
        description: "An error occurs when saving a schedule",
      });
    }
  };

  const isLoading =
    createEventMutation.isPending || updateEventMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            {editEvent ? "Edit Schedule" : "Add new schedule"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-1 bg-primary/10 rounded-sm">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the title of the activity"
                      disabled={isLoading}
                      className="h-12 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-1 bg-primary/10 rounded-sm">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the description"
                      disabled={isLoading}
                      rows={4}
                      className="text-base resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2 text-base font-semibold">
                    <div className="p-1 bg-primary/10 rounded-sm">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    Time
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      disabled={isLoading}
                      className="h-12 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex items-center gap-2 h-11 sm:order-last"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 h-11"
              >
                <Save className="h-4 w-4" />
                {isLoading
                  ? "Saving..."
                  : editEvent
                  ? "Update schedule"
                  : "Save schedule"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
