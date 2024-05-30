import { useState } from "react";
import styles from "./datePicker.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface DatePickerProps {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
  hasArrowButton: boolean;
}

export default function DatePicker({
  selectedDay,
  setSelectedDay,
  hasArrowButton,
}: DatePickerProps) {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (toDay: Date, compareDay?: Date | null) => {
    if (
      toDay.getFullYear() === compareDay?.getFullYear() &&
      toDay.getMonth() === compareDay?.getMonth() &&
      toDay.getDate() === compareDay?.getDate()
    ) {
      return true;
    }
    return false;
  };

  const onClickDay = (day: Date) => {
    setSelectedDay(day);
    setCurrentMonth(day);
  };

  const prevCalendar = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, currentMonth.getDate()),
    );
  };

  const nextCalendar = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate()),
    );
  };

  const buildCalendarDays = () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const startDay = startOfMonth.getDay();
    const endDay = endOfMonth.getDate();

    const prevMonthEndDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    const days: Date[] = [];

    for (let i = startDay - 1; i >= 0; i--) {
      days.push(
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() - 1,
          prevMonthEndDate.getDate() - i,
        ),
      );
    }

    for (let i = 1; i <= endDay; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    const nextMonthStartDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    while (days.length < 42) {
      days.push(new Date(nextMonthStartDate));
      nextMonthStartDate.setDate(nextMonthStartDate.getDate() + 1);
    }

    return days;
  };

  const buildCalendarTag = (calendarDays: Date[]) => {
    return calendarDays.map((day: Date, i: number) => {
      const isToday = day === currentMonth;
      return (
        <td key={i} className={cn("date")} onClick={() => onClickDay(day)}>
          {day.getDate()}
        </td>
      );
    });
  };

  const divideWeek = (calendarTags: JSX.Element[]) => {
    return calendarTags.reduce((acc: JSX.Element[][], day: JSX.Element, i: number) => {
      if (i % 7 === 0) acc.push([day]);
      else acc[acc.length - 1].push(day);
      return acc;
    }, []);
  };

  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTag(calendarDays);
  const calendarRows = divideWeek(calendarTags);

  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <span className={cn("month")}>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </span>
        {hasArrowButton && (
          <div className={cn("navigation")}>
            <button onClick={prevCalendar} className={cn("arrow-button")}>
              &lt;
            </button>
            <button onClick={nextCalendar} className={cn("arrow-button")}>
              &gt;
            </button>
          </div>
        )}
      </div>
      <table className={cn("calendar-table")}>
        <thead>
          <tr>
            {daysOfWeek.map((day, i) => (
              <th key={i} className={cn("day")}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarRows.map((row, i) => (
            <tr key={i}>{row}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
