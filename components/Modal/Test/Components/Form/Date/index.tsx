import { Dispatch, SetStateAction } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import Calendar from "@/components/Calendar";

import styles from "./Date.module.scss";
import Label from "../../Label";

const cn = classNames.bind(styles);

interface DateProps {
  selectedDate: Date[];
  setSelectedDate: Dispatch<SetStateAction<Date[]>>;
}

function Date({ selectedDate, setSelectedDate }: DateProps) {
  const handleClearDateButtonClick = (date: Date) => {
    setSelectedDate((prev) => {
      const result = prev.filter((prevDate) => prevDate !== date);
      return result;
    });
  };

  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <Label htmlFor="" text="날짜 선택" />
        <span className={cn("guide")}>일정을 진행할 날짜를 최대 3개까지 정할 수 있어요.</span>
      </div>
      <p className={cn("caution")}>⚠️ 시작 날짜로부터 31일 이내의 날짜만 선택 가능합니다.</p>
      <div className={cn("datePicker")}>
        <div className={cn("calendar")}>
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>

        <ul className={cn("selectedList")}>
          {selectedDate.map((date) => (
            <li key={String(date)}>
              <button
                type="button"
                className={cn("selectedDate")}
                onClick={() => handleClearDateButtonClick(date)}
              >
                {dayjs(date).format("YYYY-MM-DD")}
                <Image
                  className={cn("clear")}
                  src="/icons/close-icon.svg"
                  alt="모달 닫기"
                  width={26}
                  height={26}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Date;
