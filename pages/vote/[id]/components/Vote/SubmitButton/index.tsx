import { RefObject, useEffect, useState } from "react";

import Image from "next/image";

import classNames from "classnames/bind";

import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import styles from "./SubmitButton.module.scss";
import { SelectedDateType } from "..";

const cn = classNames.bind(styles);

interface SubmitButtonProps {
  selectedDate: SelectedDateType;
  defaultSelectedDate: RefObject<SelectedDateType | null>;
}

function SubmitButton({ selectedDate, defaultSelectedDate }: SubmitButtonProps) {
  const [isDirty, setIsDirty] = useState(false);
  const { openModal } = useModalStore();

  useEffect(() => {
    if (defaultSelectedDate.current === null) {
      return;
    }

    let trigger = true;
    for (const key in selectedDate) {
      if (selectedDate[key].isSelected !== defaultSelectedDate.current[key].isSelected) {
        setIsDirty(true);
        trigger = false;
        return;
      }
    }
    if (!trigger) {
      return;
    }

    setIsDirty(false);
  }, [selectedDate, defaultSelectedDate]);

  const handleSubmitButtonClick = () => {
    const data = [];

    for (const key in selectedDate) {
      if (!selectedDate[key].isSelected) {
        continue;
      }

      data.push({ key, ...selectedDate[key] });
    }

    openModal(MODAL_TYPE.SUBMIT_VOTE, data);
  };

  return (
    <button
      type="button"
      className={cn("button")}
      disabled={!isDirty}
      onClick={handleSubmitButtonClick}
    >
      <Image src="/icons/vote-box.svg" width={12} height={12} alt="투표 상자 아이콘" />
      투표 제출하기
    </button>
  );
}

export default SubmitButton;
