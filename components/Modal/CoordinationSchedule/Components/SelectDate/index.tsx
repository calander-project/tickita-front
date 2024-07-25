import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import ScheduleDatePicker from "@/components/ScheduleDatePicker";
import { HOURS, MINUTES } from "@/constants/calendarConstants";
import { useCreateVote } from "@/hooks/useCreateVote";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useToast from "@/hooks/useToast";

import { StepViewType } from "@/types/type";

import styles from "./SelectDate.module.scss";
import { CreateVoteDataType } from "../..";
import Label from "../Label";
import StepView from "../StepView";
import SubTitle from "../SubTitle";

const cn = classNames.bind(styles);

const GUIDE_LIST = [
  {
    boxColor: "#696969",
    text: "선택 불가",
    textColor: "#000",
  },
  {
    boxColor: "#fff",
    borderColor: "#BBB",
    text: "선택 가능",
    textColor: "#000",
  },
  {
    boxColor: "#3360FF",
    text: "선택 완료",
    textColor: "#3360FF",
  },
];

interface SelectDateProps {
  step: StepViewType;
  setStep: Dispatch<SetStateAction<StepViewType>>;
  createVoteData: CreateVoteDataType;
}

export interface VoteDateListType {
  voteDate: string;
  voteStartTime: string;
  voteEndTime: string;
}

export interface DeadlineDateType {
  date: string;
  time: string;
}

function SelectDate({ step, setStep, createVoteData }: SelectDateProps) {
  const [selectedDate, setSelectedDate] = useState<VoteDateListType[]>([]);
  const [voteDeadlineTime, setVoteDeadlineTime] = useState({
    isOpen: false,
    time: "시간 선택",
  });
  const voteDeadlineDateRef = useRef<HTMLInputElement>(null);

  const voteDeadlineTimeButtonRef = useOutsideClick(() =>
    setVoteDeadlineTime((prev) => ({
      ...prev,
      isOpen: false,
    })),
  ) as RefObject<HTMLButtonElement>;
  const { mutate } = useCreateVote();
  const { errorToast } = useToast();

  const handleVoteDeadlineTimeButtonClick = () => {
    setVoteDeadlineTime((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const handleSetVoteDeadlineTime = (time: string) => {
    setVoteDeadlineTime((prev) => ({
      ...prev,
      time,
    }));
  };

  const handlePrevButtonClick = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  const handleVoteButtonClick = async () => {
    const { participantTimes, selectedDateList, ...rest } = createVoteData;
    const payload = {
      ...rest,
      voteDateLists: selectedDate,
      endDate: voteDeadlineDateRef.current?.value as string,
      endTime: voteDeadlineTime.time,
    };

    mutate(payload, {
      onSuccess: () => {
        setStep((prev) => ({
          ...prev,
          currentStep: prev.currentStep + 1,
        }));
      },
      onError: () => {
        errorToast("투표 생성에 실패하였습니다.");
      },
    });
  };

  return (
    <div className={cn("container")}>
      <div className={cn("header")}>
        <SubTitle title="일정 조율 설정" color="#213EA3" backgroundColor="#E5EBFF" />
        <StepView maxStep={step.maxStep} currentStep={step.currentStep} />
      </div>
      <Label text="희망 시간 선택" />
      <div className={cn("guideBox")}>
        <p className={cn("text")}>
          일정의 원하는 시간대를 드래그하여 최대 3개까지 선택할 수 있습니다.
        </p>
        <ul className={cn("list")}>
          {GUIDE_LIST.map((item) => (
            <li key={item.text} className={cn("item")}>
              <p
                className={cn("colorBox")}
                style={{
                  backgroundColor: item.boxColor,
                  border: `1px solid ${item.borderColor}`,
                }}
              />
              :
              <span className={cn("colorText")} style={{ color: item.textColor }}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn("datePickerBox")}>
        {selectedDate.length === 3 && (
          <div className={cn("disableBox")}>⛔️ 최대 3개까지 선택 가능합니다.</div>
        )}
        {createVoteData.selectedDateList.map((date) => (
          <ScheduleDatePicker
            key={date}
            date={date}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            participantTimes={createVoteData.participantTimes}
          />
        ))}
      </div>
      <ul className={cn("selectedList")}>
        {selectedDate.map((date, idx) => (
          <li key={idx} className={cn("selectedTime")}>
            {date.voteDate} {date.voteStartTime} ~ {date.voteEndTime}
            <Image
              src="/icons/close-icon.svg"
              alt="선택한 시간 삭제"
              width={20}
              height={20}
              onClick={() => setSelectedDate((prev) => prev.filter((item) => item !== date))}
            />
          </li>
        ))}
      </ul>
      <div className={cn("deadLineBox")}>
        <div className={cn("deadlineText")}>투표 마감 시간 설정</div>
        <div className={cn("deadlineDateBox")}>
          <label htmlFor="투표마감날짜">
            <input
              id="투표마감날짜"
              ref={voteDeadlineDateRef}
              type="date"
              className={cn("deadlineDate")}
            />
          </label>
          <div className={cn("deadlineTimeBox")}>
            <button
              type="button"
              ref={voteDeadlineTimeButtonRef}
              className={cn("deadlineTimeButton")}
              onClick={handleVoteDeadlineTimeButtonClick}
            >
              {voteDeadlineTime.time}
            </button>
            {voteDeadlineTime.isOpen && (
              <ul className={cn("deadlineTimeList")}>
                {HOURS.map((hour) => {
                  return MINUTES.map((minute) => {
                    const time = `${String(hour).padStart(2, "0")}:${minute}`;
                    return (
                      <li
                        onClick={() => handleSetVoteDeadlineTime(time)}
                        key={`${hour}${minute}`}
                        className={cn("deadlineTime")}
                      >
                        {time}
                      </li>
                    );
                  });
                })}
              </ul>
            )}{" "}
            까지 투표가 가능합니다.
          </div>
        </div>
      </div>
      <div className={cn("buttonBox")}>
        <button type="button" className={cn("prevButton")} onClick={handlePrevButtonClick}>
          이전
        </button>
        <button
          type="button"
          className={cn("voteButton")}
          onClick={handleVoteButtonClick}
          disabled={
            Boolean(!selectedDate.length) ||
            voteDeadlineTime.time === "시간 선택" ||
            !voteDeadlineDateRef.current?.value
          }
        >
          투표 진행하기
        </button>
      </div>
    </div>
  );
}
export default SelectDate;
