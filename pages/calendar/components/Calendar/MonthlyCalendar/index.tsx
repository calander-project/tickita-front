import { useEffect, useRef } from "react";

import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";

import { DAYS } from "@/constants/calendarConstants";
import { MODAL_TYPE } from "@/constants/modalType";
import useDebounce from "@/hooks/useDebounce";
import useDragSelect from "@/hooks/useDragSelect";
import useScroll from "@/hooks/useScroll";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";
import { calculateMonthDates } from "@/utils/calculateCalendarDates";

import styles from "./MonthlyCalendar.module.scss";

const cn = classNames.bind(styles);

interface MonthlyCalendarProps {
  scheduleData: any;
}

export default function MonthlyCalendar({ scheduleData }: MonthlyCalendarProps) {
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const { focusDate, setFocusDate, setViewDate, setScheduleStart, setScheduleEnd } = useDateStore(
    useShallow((state) => ({
      focusDate: state.focusDate,
      setFocusDate: state.setFocusDate,
      setViewDate: state.setViewDate,
      setScheduleStart: state.setScheduleStart,
      setScheduleEnd: state.setScheduleEnd,
    })),
  );
  const { openModal } = useModalStore();

  const dates = calculateMonthDates(focusDate);

  const handleScrollUpDebounced = useDebounce(
    () => {
      setFocusDate(focusDate.subtract(1, "month").date(1));
      setViewDate(focusDate.subtract(1, "month"));
    },
    300,
    true,
  );

  const handleScrollDownDebounced = useDebounce(
    () => {
      setFocusDate(focusDate.add(1, "month").date(1));
      setViewDate(focusDate.add(1, "month"));
    },
    300,
    true,
  );

  const handleDragEnd = (draggedIndex: number[]) => {
    const startDate = dates[draggedIndex[0]].add(0, "hour");
    const endDate = dates[draggedIndex[draggedIndex.length - 1]].add(24, "hour");
    setScheduleStart(startDate);
    setScheduleEnd(endDate);
    openModal(MODAL_TYPE.SCHEDULE_CREATE, () => setDraggedIndex([]));
  };

  const { draggedIndex, setDraggedIndex } = useDragSelect(dragContainerRef, handleDragEnd);
  const scrollRef = useScroll<HTMLDivElement>(handleScrollDownDebounced, handleScrollUpDebounced);

  return (
    <div className={cn("container")} ref={scrollRef}>
      <div className={cn("month-header")}>
        {DAYS.map((day, i) => (
          <div key={i} className={cn("day")}>
            {day}
          </div>
        ))}
      </div>
      <div className={cn("month-content")} ref={dragContainerRef}>
        {dates.map((date, i) => {
          const isThisMonthDay = date.isSame(focusDate, "month");
          const isToday = date.isSame(dayjs(), "date");
          const isSelected = draggedIndex.includes(i);
          return (
            <div key={i} className={cn("date-container", { selected: isSelected })} data-index={i}>
              <p className={cn("date", { today: isToday, "other-month": !isThisMonthDay })}>
                {date.date()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
