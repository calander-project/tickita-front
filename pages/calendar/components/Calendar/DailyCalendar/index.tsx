import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import { useShallow } from "zustand/react/shallow";

import { DAYS, HOURS } from "@/constants/calendarConstants";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import styles from "./DailyCalendar.module.scss";

const cn = classNames.bind(styles);

export default function DailyCalendar() {
  const { focusDate } = useDateStore(useShallow((state) => ({ focusDate: state.focusDate })));
  const { openModal } = useModalStore();

  return (
    <div className={cn("container")}>
      <p className={cn("date")}>
        {focusDate.date()} <span>{DAYS[focusDate.day()]}</span>
      </p>
      <div className={cn("all-day-schedules")}></div>
      <div className={cn("time-scroll-container")}>
        {HOURS.map((hour) => (
          <div className={cn("time-block")} key={hour}>
            <p className={cn("label")}>{hour.toString().padStart(2, "0")}</p>
            <div key={hour} className={cn("schedule-block")}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
