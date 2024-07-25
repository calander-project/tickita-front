import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

import { VoteDateListType } from "@/components/Modal/CoordinationSchedule/Components/SelectDate";
import { compareTimestamps } from "@/utils/calculateCalendarDates";

import useToast from "./useToast";

interface useVoteDateDragProps {
  date: any;
  selectedDate: VoteDateListType[];
  setSelectedDate: Dispatch<SetStateAction<VoteDateListType[]>>;
}

function useVoteDateDrag({ date, selectedDate, setSelectedDate }: useVoteDateDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [dragItems, setDragItems] = useState<string[]>([]);

  const { errorToast } = useToast();

  const handleMouseDown = (e: MouseEvent) => {
    if (selectedDate.length >= 3) {
      return;
    }

    const targetElement = e.target as HTMLElement;
    const time = targetElement.dataset.time!;

    if (!time) {
      return;
    }

    setStartTime(time);
    setDragItems([...dragItems, time]);
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }

    const targetElement = e.target as HTMLElement;
    const time = targetElement.dataset.time!;

    if (!time) {
      handleMouseUp();
      return;
    }

    setEndTime(time);
    setDragItems((prev) => {
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

    setIsDragging(false);
    setDragItems([]);

    if (!startTime || !endTime || startTime === endTime) {
      setStartTime(null);
      setEndTime(null);
      return;
    }

    const result = compareTimestamps(startTime, endTime);

    setSelectedDate((prev) => {
      const isSameCheck = prev.some(
        (item) =>
          JSON.stringify(item) ===
          JSON.stringify({
            voteDate: date,
            voteStartTime: result.startTime,
            voteEndTime: result.endTime,
          }),
      );

      if (isSameCheck) {
        errorToast("이미 선택한 시간입니다.");
        return prev;
      }

      return [
        ...prev,
        {
          voteDate: date,
          voteStartTime: result.startTime,
          voteEndTime: result.endTime,
        },
      ];
    });
    setStartTime(null);
    setEndTime(null);
  };

  return {
    selectedDate,
    setSelectedDate,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    dragItems,
  };
}

export default useVoteDateDrag;
