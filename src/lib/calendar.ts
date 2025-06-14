import { CalendarDay, ScheduleEvent } from "@/types/calendar";

export const getMonthDays = (
  year: number,
  month: number,
  events: ScheduleEvent[]
): CalendarDay[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = firstDay.getDay();

  const days: CalendarDay[] = [];
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Add days from previous month
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  for (let i = startWeekday - 1; i >= 0; i--) {
    const date = daysInPrevMonth - i;
    const fullDate = `${prevYear}-${String(prevMonth + 1).padStart(
      2,
      "0"
    )}-${String(date).padStart(2, "0")}`;
    const dayEvents = events.filter((event) => event.date === fullDate);

    days.push({
      date,
      fullDate,
      isCurrentMonth: false,
      isToday: fullDate === todayString,
      events: dayEvents,
    });
  }

  // Add days from current month
  for (let date = 1; date <= daysInMonth; date++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
    const dayEvents = events.filter((event) => event.date === fullDate);

    days.push({
      date,
      fullDate,
      isCurrentMonth: true,
      isToday: fullDate === todayString,
      events: dayEvents,
    });
  }

  // Add days from next month
  const remainingDays = 42 - days.length; // 6 weeks * 7 days
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  for (let date = 1; date <= remainingDays; date++) {
    const fullDate = `${nextYear}-${String(nextMonth + 1).padStart(
      2,
      "0"
    )}-${String(date).padStart(2, "0")}`;
    const dayEvents = events.filter((event) => event.date === fullDate);

    days.push({
      date,
      fullDate,
      isCurrentMonth: false,
      isToday: fullDate === todayString,
      events: dayEvents,
    });
  }

  return days;
};

export const formatDateForInput = (dateString: string): string => {
  return dateString;
};

export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
