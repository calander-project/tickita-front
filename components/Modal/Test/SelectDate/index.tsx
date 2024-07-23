import { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import ScheduleDatePicker from "@/components/ScheduleDatePicker";

import { StepViewType } from "@/types/type";

import styles from "./SelectDate.module.scss";
import { CreateVoteDataType } from "..";
import Label from "../Components/Label";
import StepView from "../Components/StepView";
import SubTitle from "../Components/SubTitle";

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

const date = [
  {
    date: "12월 30일",
    day: "수",
  },
  {
    date: "12월 31일",
    day: "목",
  },
  {
    date: "1월 1일",
    day: "금",
  },
];

export interface VoteDateListType {
  voteDate: string;
  voteStartTime: string;
  voteEndTime: string;
}

function SelectDate({ step, setStep }: SelectDateProps) {
  const [selectedDate, setSelectedDate] = useState<VoteDateListType[]>([]);

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
      {date.map((v) => (
        <ScheduleDatePicker
          key={v.date}
          date={v}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ))}
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
      <div>투표 마감 시간 설정</div>
    </div>
  );
}
export default SelectDate;
