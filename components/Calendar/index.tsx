import { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import { DAYS as KOR_MONTHS } from "@/constants/calendarConstants";
import { generateCalendar, isTargetNumberWithin31Days } from "@/utils/generateCalendar";

import styles from "./Calendar.module.scss";

const cn = classNames.bind(styles);

interface CalendarProps {
  selectedDate: Date[];
  setSelectedData: Dispatch<SetStateAction<Date[]>>;
}

function Calendar({ selectedDate, setSelectedData }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = generateCalendar(dayjs(currentDate).year(), dayjs(currentDate).month());

  const handlePrevMonthButtonClick = () => {
    setCurrentDate(dayjs(currentDate).subtract(1, "month").toDate());
  };

  const handleNextMonthButtonClick = () => {
    setCurrentDate(dayjs(currentDate).add(1, "month").toDate());
  };

  const test = (day: number) => {
    setSelectedData((prev) =>
      [...prev, new Date(`${dayjs(currentDate).format("YYYY-MM")} ${day}`)].sort(
        (a, b) => a.getTime() - b.getTime(),
      ),
    );
  };

  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <button type="button" onClick={handlePrevMonthButtonClick}>
          <Image src="/icons/arrow-left-icon.svg" alt="이전달 보기" width={20} height={20} />
        </button>
        <div className={cn("currentBox")}>
          <span>{dayjs(currentDate).format("YYYY")}</span>
          <span>{dayjs(currentDate).format("MM")}</span>
        </div>
        <button type="button" onClick={handleNextMonthButtonClick}>
          <Image src="/icons/arrow-right-icon.svg" alt="다음달 보기" width={20} height={20} />
        </button>
      </div>

      <ul className={cn("calendar")}>
        {KOR_MONTHS.map((month) => (
          <li key={month} className={cn("month")}>
            {month}
          </li>
        ))}

        {days.map((day, index) => {
          const isFullSelectCount = selectedDate.length >= 3; // 날짜를 3개 이상 클릭
          const isCurrentMonthSelected = !day.currentMonth; // 이번달이 아닌 경우
          const targetDate = `${dayjs(currentDate).format("YYYY-MM")}-${String(day.date).padStart(2, "0")}`;
          const isStartDateWithTargetDate31DaysDiff = isTargetNumberWithin31Days(
            selectedDate[0],
            new Date(targetDate),
          ); // 시작 날짜랑 31일 이상 차이 나면 true

          const isDateChecked = selectedDate
            .map((date) => dayjs(date).format("YYYY-MM-DD"))
            .includes(targetDate);

          const isButtonDisable =
            isFullSelectCount ||
            isCurrentMonthSelected ||
            isStartDateWithTargetDate31DaysDiff ||
            isDateChecked;

          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => test(day.date)}
                className={cn("dateButton")}
                disabled={isButtonDisable}
              >
                {day.date}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Calendar;
