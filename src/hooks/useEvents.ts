import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ScheduleEvent } from "@/types/calendar";
import { fetchAPI } from "@/lib/API/auth";
import { APIResponse } from "@/types/API-types";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAllEvents = async () => {
  const data = await fetchAPI<APIResponse>(
    `${BASE_URL}/schedule/my-shedules`,
    "GET",
    true
  );

  const events: ScheduleEvent[] = await data.data;
  return events;
};

const createEvents = async (
  newEvent: Omit<ScheduleEvent, "id" | "createdAt">
) => {
  const data = await fetchAPI<APIResponse>(
    `${BASE_URL}/schedule/my-shedules`,
    "POST",
    true,
    {
      body: JSON.stringify(newEvent),
    }
  );
  return data;
};

const updateEvents = async (
  newEvent: Omit<ScheduleEvent, "id" | "createdAt">,
  id: string
) => {
  const data = await fetchAPI<APIResponse>(
    `${BASE_URL}/schedule/${id}`,
    "PUT",
    true,
    {
      body: JSON.stringify(newEvent),
    }
  );
  return data;
};

const deleteEvents = async (id: string) => {
  const data = await fetchAPI<APIResponse>(
    `${BASE_URL}/schedule/${id}`,
    "DELETE",
    true
  );
  return data;
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEvent: Omit<ScheduleEvent, "id" | "createdAt">) => {
      return createEvents(newEvent);
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
      return updateEvents(updatedEvent, updatedEvent.id);
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
      return deleteEvents(eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
