import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ScheduleEvent } from "@/types/calendar";

// Simulasi storage lokal (dalam aplikasi nyata, ini akan menjadi API calls)
const STORAGE_KEY = "schedule-events";

const getStoredEvents = (): ScheduleEvent[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredEvents = (events: ScheduleEvent[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => {
      // Simulasi delay API
      return new Promise<ScheduleEvent[]>((resolve) => {
        setTimeout(() => {
          resolve(getStoredEvents());
        }, 100);
      });
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEvent: Omit<ScheduleEvent, "id" | "createdAt">) => {
      return new Promise<ScheduleEvent>((resolve) => {
        setTimeout(() => {
          const event: ScheduleEvent = {
            ...newEvent,
            id: Date.now().toString(),
            createdAt: new Date(),
          };

          const events = getStoredEvents();
          const updatedEvents = [...events, event];
          setStoredEvents(updatedEvents);

          resolve(event);
        }, 100);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedEvent: ScheduleEvent) => {
      return new Promise<ScheduleEvent>((resolve) => {
        setTimeout(() => {
          const events = getStoredEvents();
          const updatedEvents = events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          );
          setStoredEvents(updatedEvents);

          resolve(updatedEvent);
        }, 100);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const events = getStoredEvents();
          const updatedEvents = events.filter((event) => event.id !== eventId);
          setStoredEvents(updatedEvents);

          resolve();
        }, 100);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
