import { Dispatch, SetStateAction, useRef } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import { HOURS } from "@/constants/calendarConstants";
import useVoteDateDrag from "@/hooks/useVoteDateDrag";
import { isImpossibleTimeInRange, isVoteTimeInRange } from "@/utils/calculateCalendarDates";

import styles from "./ScheduleDatePicker.module.scss";
import { participantTimesType } from "../Modal/Test";
import { VoteDateListType } from "../Modal/Test/Components/SelectDate";

const cn = classNames.bind(styles);

interface ScheduleDatePickerProps {
  date: string;
  selectedDate: VoteDateListType[];
  setSelectedDate: Dispatch<SetStateAction<VoteDateListType[]>>;
  participantTimes: participantTimesType[];
}

function ScheduleDatePicker({
  date,
  selectedDate,
  setSelectedDate,
  participantTimes,
}: ScheduleDatePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, dragItems } = useVoteDateDrag({
    date,
    selectedDate,
    setSelectedDate,
  });

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
            <p>{date}</p>
            <p>{dayjs(date).format("dddd")}</p>
          </div>

          {HOURS.map((hourNum, idx) => {
            const hour0Min = `${String(hourNum).padStart(2, "0")}:00`;
            const hour30Min = `${String(hourNum).padStart(2, "0")}:30`;
            const isBetween0Min = isVoteTimeInRange(selectedDate, date, hour0Min);
            const isBetween30Min = isVoteTimeInRange(selectedDate, date, hour30Min);
            const isImpossibleTime0Min = isImpossibleTimeInRange(participantTimes, date, hour0Min);
            const isImpossibleTime30Min = isImpossibleTimeInRange(
              participantTimes,
              date,
              hour30Min,
            );

            return (
              <li key={hourNum} className={cn("hour")}>
                <p
                  className={cn("item", {
                    dragItem: dragItems.includes(hour0Min),
                    selectedItem: isBetween0Min,
                    impossibleTime: isImpossibleTime0Min,
                  })}
                  data-time={!isImpossibleTime0Min && hour0Min}
                />

                <p
                  className={cn("item", {
                    dragItem: dragItems.includes(hour30Min),
                    lastIdx: idx === HOURS.length - 1,
                    selectedItem: isBetween30Min,
                    impossibleTime: isImpossibleTime30Min,
                  })}
                  data-time={!isImpossibleTime30Min && hour30Min}
                />
              </li>
            );
          })}
          <div className={cn("gap")} />
        </ul>
      </div>
    </div>
  );
}

export default ScheduleDatePicker;
