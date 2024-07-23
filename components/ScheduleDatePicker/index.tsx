import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import { HOURS } from "@/constants/calendarConstants";
import { isVoteTimeInRange } from "@/utils/calculateCalendarDates";

import styles from "./ScheduleDatePicker.module.scss";
import { VoteDateListType } from "../Modal/Test/SelectDate";

const cn = classNames.bind(styles);

interface ScheduleDatePickerProps {
  date: any;
  selectedDate: VoteDateListType[];
  setSelectedDate: Dispatch<SetStateAction<VoteDateListType[]>>;
}

function ScheduleDatePicker({ date, selectedDate, setSelectedDate }: ScheduleDatePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleMouseDown = (e: any) => {
    if (selectedDate.length >= 3) {
      return;
    }

    const targetElement = e.target as HTMLElement;
    const time = targetElement.dataset.time!;

    if (!time) {
      return;
    }

    setStartTime(time);
    setSelectedItems([...selectedItems, time]);
    setIsDragging(true);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) {
      return;
    }

    const targetElement = e.target as HTMLElement;
    const time = targetElement.dataset.time!;

    if (!time) {
      console.log("a");
      setIsDragging(false);
      handleMouseUp();
      return;
    }

    setEndTime(time);
    setSelectedItems((prev) => {
      if (prev.includes(time)) {
        return prev;
      }

      return [...prev, time];
    });
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      return;
    }

    setSelectedItems([]);
    setSelectedDate((prev) => [
      ...prev,
      {
        voteDate: date.date,
        voteStartTime: startTime!,
        voteEndTime: endTime!,
      },
    ]);
    console.log("Selected time:", startTime, "-", endTime);
  };

  console.log(selectedItems);

  const handleCarouselNavigationClick = (option: "next" | "prev") => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollBy({
      left: option === "next" ? +128 : -128,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn("datePicker")}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div ref={containerRef} className={cn("header")}>
        <div className={cn("box")}>
          <button
            type="button"
            className={cn("button", "prev")}
            onClick={() => handleCarouselNavigationClick("prev")}
          >
            <Image src="/icons/arrow-left-icon.svg" alt="이전 시간 보기" width={30} height={30} />
          </button>
          <button
            type="button"
            className={cn("button", "next")}
            onClick={() => handleCarouselNavigationClick("next")}
          >
            <Image src="/icons/arrow-right-icon.svg" alt="다음 시간 보기" width={30} height={30} />
          </button>

          <ul className={cn("hourList")}>
            {HOURS.map((hour) => (
              <li key={hour} className={cn("hour")}>{`${String(hour).padStart(2, "0")}시`}</li>
            ))}
          </ul>
        </div>

        <ul className={cn("picker")}>
          <div className={cn("date")}>
            <p>{date.date}</p>
            <p>{date.day}</p>
          </div>

          {HOURS.map((hourNum, idx) => {
            const hour0Min = `${String(hourNum).padStart(2, "0")}:00`;
            const hour30Min = `${String(hourNum).padStart(2, "0")}:30`;
            const isBetween = isVoteTimeInRange(selectedDate, date.date, hour0Min);
            console.log(isBetween);

            return (
              <li key={hourNum} className={cn("hour")}>
                <p
                  className={cn("item", {
                    selectedItem: selectedItems.includes(hour0Min),
                    //   selectedDate.includes(`${String(hourNum).padStart(2, "0")}:00`),
                  })}
                  data-time={hour0Min}
                />

                <p
                  className={cn("item", {
                    selectedItem: selectedItems.includes(hour30Min),
                    lastIdx: idx === HOURS.length - 1,
                  })}
                  data-time={hour30Min}
                />
              </li>
            );
          })}
          <div className={cn("gap")} style={{ height: `${date.length * 96}px` }} />
        </ul>
      </div>
    </div>
  );
}

export default ScheduleDatePicker;
