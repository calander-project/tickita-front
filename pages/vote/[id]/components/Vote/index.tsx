import { ChangeEvent, useEffect, useRef, useState } from "react";

import classNames from "classnames/bind";
import dayjs from "dayjs";

import { VoteInfoType } from "@/types/type";

import DeleteButton from "./DeleteButton";
import RemainTime from "./RemainTime";
import SubmitButton from "./SubmitButton";
import styles from "./Vote.module.scss";

const cn = classNames.bind(styles);

export interface SelectedDateType {
  [key: string]: {
    date: string;
    isSelected: boolean;
  };
}

interface VoteProps {
  voteInfo: VoteInfoType;
  isCreator: boolean;
  isVote: boolean;
}

function Vote({ voteInfo, isCreator, isVote }: VoteProps) {
  const { voteListResponses, remainTime, endDate, endTime, voteDateListResponses } = voteInfo;

  const [selectedDate, setSelectedDate] = useState<SelectedDateType>(() => {
    return voteDateListResponses.reduce<SelectedDateType>((acc, dateInfo) => {
      const { voteStateId, voteDate, voteStartTime, voteEndTime } = dateInfo;

      acc[voteStateId] = {
        date: `${dayjs(voteDate).format("YYYY년 MM월 DD일")} ${voteStartTime.slice(0, -3)} ~ ${voteEndTime.slice(0, -3)}`,
        isSelected: false,
      };
      return acc;
    }, {});
  });

  const defaultSelectedDate = useRef<SelectedDateType | null>(null);

  useEffect(() => {
    defaultSelectedDate.current = selectedDate;
  }, []);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setSelectedDate((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          isSelected: checked,
        },
      };
    });
  };

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <RemainTime remainTime={remainTime} endTime={endTime} endDate={endDate} />
        {isCreator ? (
          <DeleteButton />
        ) : (
          <SubmitButton
            selectedDate={selectedDate}
            defaultSelectedDate={defaultSelectedDate}
            isVote={isVote}
          />
        )}
      </div>
      <ul className={cn("listBox")}>
        {voteDateListResponses.map((dateInfo) => {
          const { voteStateId, voteDate, voteStartTime, voteEndTime, voteCount } = dateInfo;

          return (
            <li key={voteStateId} className={cn("list")}>
              <div className={cn("inputBox")}>
                <input
                  id={`${voteStateId}`}
                  type="checkbox"
                  className={cn("input")}
                  name={`${voteStateId}`}
                  checked={selectedDate[voteStateId].isSelected}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`${voteStateId}`} className={cn("label")}>
                  {`${dayjs(voteDate).format("YYYY년 MM월 DD일")} ${voteStartTime.slice(0, -3)} ~ ${voteEndTime.slice(0, -3)}`}
                </label>
              </div>
              <div className={cn("progressBox")}>
                <p
                  className={cn("progressBar")}
                  style={{ width: `${(480 / (voteListResponses.length + 1)) * voteCount}px` }}
                />
                <span>{`${voteCount}표`}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Vote;
