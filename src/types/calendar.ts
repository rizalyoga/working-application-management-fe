export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  date: string; // format YYYY-MM-DD
  time: string; // format HH:mm
  createdAt: Date;
}

export interface CalendarDay {
  date: number;
  fullDate: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: ScheduleEvent[];
}
