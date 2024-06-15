import React from "react";

import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { DAYS, HOURS } from "@/constants/calendarConstants";
import { useDateStore } from "@/store/useDateStore";
import { calculateWeekDates } from "@/utils/calculateCalendarDates";

import styles from "./WeeklyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function WeeklyCalendar() {
  const { focusDate } = useDateStore(useShallow((state) => ({ focusDate: state.focusDate })));

  const dates = calculateWeekDates(focusDate);

  return (
    <div className={cn("container")}>
      <div className={cn("week-dates")}>
        {dates.map((date, idx) => (
          <div key={idx} className={cn("date-container")}>
            <p className={cn("day")}>{DAYS[date.day()]}</p>
            <p className={cn("date", { today: date.isSame(dayjs(), "date") })}>{date.date()}</p>
          </div>
        ))}
      </div>
      <div className={cn("time-scroll-container")}>
        <div className={cn("label-container")}>
          {HOURS.map((hour) => (
            <p key={hour} className={cn("label")}>
              {hour.toString().padStart(2, "0")}
            </p>
          ))}
        </div>
        <div className={cn("time-container")}>
          {dates.map((date, idx) => (
            <div key={idx} className={cn("time-column")}>
              {HOURS.map((hour) => (
                <div key={hour} className={cn("time-block")}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
