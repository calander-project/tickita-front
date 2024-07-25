import { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";

import DatePicker from "@/components/DatePicker/DatePicker";
import { MODAL_TYPE } from "@/constants/modalType";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useDateStore } from "@/store/useDateStore";
import { useModalStore } from "@/store/useModalStore";

import styles from "./CalendarSideBar.module.scss";
import CalendarGroupList from "../CalendarGroupList";

const cn = classNames.bind(styles);

interface CalendarSideBarProps {
  setSelectedCrewIdList: Dispatch<SetStateAction<number[] | []>>;
}

export default function CalendarSideBar({ setSelectedCrewIdList }: CalendarSideBarProps) {
  const { focusDate, setScheduleStart, setScheduleEnd } = useDateStore(
    useShallow((state) => ({
      focusDate: state.focusDate,
      setScheduleStart: state.setScheduleStart,
      setScheduleEnd: state.setScheduleEnd,
    })),
  );
  const { openModal } = useModalStore();
  const [isCreateListVisible, setIsCreateListVisible] = useState(false);
  const scheduleContainerRef = useOutsideClick<HTMLDivElement>(() => setIsCreateListVisible(false));

  const handleListVisibleToggle = () => {
    setIsCreateListVisible((prev) => !prev);
  };

  const handleCreateModalOpen = () => {
    setScheduleStart(dayjs(focusDate).startOf("day"));
    setScheduleEnd(dayjs(focusDate).add(1, "day").startOf("day"));
    openModal(MODAL_TYPE.SCHEDULE_CREATE);
  };

  const handleCoordinationModalOpen = () => {
    openModal(MODAL_TYPE.SCHEDULE_COORDINATION);
  };

  return (
    <aside className={cn("container")}>
      <div
        className={cn("schedule-create-container")}
        ref={scheduleContainerRef}
        onClick={handleListVisibleToggle}
      >
        <div className={cn("schedule-create")}>
          <Image src="/icons/schedule-icon.svg" alt="일정 생성" width={20} height={20} />
          일정 잡기
        </div>
        {isCreateListVisible && (
          <ul className={cn("create-list-container")}>
            <li onClick={handleCreateModalOpen}>일정 만들기</li>
            <li onClick={handleCoordinationModalOpen}>일정 조율하기</li>
          </ul>
        )}
      </div>

      <DatePicker />
      <CalendarGroupList setSelectedCrewIdList={setSelectedCrewIdList} />
    </aside>
  );
}
