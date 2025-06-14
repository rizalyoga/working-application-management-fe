import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { EventModal } from "../modals/EventModal";
import { EventDetailsModal } from "../modals/EventDetailModal";
import { EventListModal } from "../modals/EventListModal";
import { CalendarDay, ScheduleEvent } from "@/types/calendar";
import { getMonthDays } from "@/lib/calendar";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Generate years from 10 years ago to 10 years in the future
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 10; year <= currentYear + 10; year++) {
    years.push(year);
  }
  return years;
};

export const CalendarScheduler: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEventListModalOpen, setIsEventListModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(
    null
  );
  const [selectedDateEvents, setSelectedDateEvents] = useState<ScheduleEvent[]>(
    []
  );
  const [editEvent, setEditEvent] = useState<ScheduleEvent | null>(null);

  const { data: events = [], isLoading } = useEvents();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const years = generateYears();

  const monthDays = getMonthDays(year, month, events);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleYearChange = (selectedYear: string) => {
    setCurrentDate(new Date(parseInt(selectedYear), month, 1));
  };

  const handleDayClick = (day: CalendarDay) => {
    console.log("Ini day type any line 81 in CalendarScheduler.tsx", day);

    setSelectedDate(day.fullDate);
    setEditEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event: ScheduleEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleMoreEventsClick = (
    dayEvents: ScheduleEvent[],
    date: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedDateEvents(dayEvents);
    setSelectedDate(date);
    setIsEventListModalOpen(true);
  };

  const handleEventFromListClick = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleEditEvent = (event: ScheduleEvent) => {
    setEditEvent(event);
    setSelectedDate(event.date);
    setIsEventModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-[700px] boder border-slate-400 animate-pulse w-full">
        <div className="grid grid-cols-7 grid-rows-6 gap-2 mb-2">
          <div className="h-[100px] bg-slate-300 animate-pulse"></div>
          <div className="h-[100px] bg-slate-300 animate-pulse"></div>
          <div className="h-[100px] bg-slate-300 animate-pulse"></div>
          <div className="h-[100px] bg-slate-300 animate-pulse"></div>
          <div className="h-[100px] bg-slate-300 animate-pulse"></div>
          <div className="h-[100px] bg-slate-300 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{MONTHS[month]}</h2>
              <Select value={year.toString()} onValueChange={handleYearChange}>
                <SelectTrigger className="w-20 h-8 text-xl font-bold border-none shadow-none p-0 hover:bg-accent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((yearOption) => (
                    <SelectItem key={yearOption} value={yearOption.toString()}>
                      {yearOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Container with Horizontal Scroll */}
        <ScrollArea className="w-full">
          <div className="min-w-[700px]">
            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {monthDays.map((day, index) => (
                <div
                  key={`${day.fullDate}-${index}`}
                  className={`
                    relative min-h-24 p-2 border border-border hover:bg-accent cursor-pointer
                    ${
                      !day.isCurrentMonth
                        ? "text-muted-foreground bg-muted/20"
                        : ""
                    }
                    ${day.isToday ? "bg-primary/10 border-primary" : ""}
                  `}
                  onClick={() => day.isCurrentMonth && handleDayClick(day)}
                >
                  <div className="text-sm font-medium mb-1">{day.date}</div>

                  {/* Events */}
                  <div className="space-y-1">
                    {day.events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1 bg-primary text-primary-foreground rounded truncate hover:bg-primary/80"
                        onClick={(e) => handleEventClick(event, e)}
                        title={`${event.time} - ${event.title}`}
                      >
                        {event.time} {event.title}
                      </div>
                    ))}

                    {day.events.length > 2 && (
                      <div
                        className="text-xs text-muted-foreground hover:text-primary cursor-pointer"
                        onClick={(e) =>
                          handleMoreEventsClick(day.events, day.fullDate, e)
                        }
                      >
                        +{day.events.length - 2} lainnya
                      </div>
                    )}
                  </div>

                  {/* Add button for current month days */}
                  {day.isCurrentMonth && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute bottom-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDayClick(day);
                      }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>

      {/* Modals */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        selectedDate={selectedDate}
        editEvent={editEvent}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={selectedEvent}
        onEdit={handleEditEvent}
      />

      <EventListModal
        isOpen={isEventListModalOpen}
        onClose={() => setIsEventListModalOpen(false)}
        events={selectedDateEvents}
        date={selectedDate}
        onEventClick={handleEventFromListClick}
      />
    </div>
  );
};
