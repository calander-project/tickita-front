import { useState } from "react";

import classNames from "classnames/bind";

import { GroupMemberInfoType } from "@/types/type";

import styles from "./Participant.module.scss";
import Label from "../../Label";

const cn = classNames.bind(styles);

interface ParticipantProps {
  participantList: GroupMemberInfoType[];
}

function Participant({ participantList }: ParticipantProps) {
  const [selectedList, setSelectedList] = useState<number[]>([]);

  const handleParticipantSelect = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedList((prev) => prev.filter((prevNum) => prevNum !== id));
      return;
    }

    setSelectedList((prev) => [...prev, id]);
  };

  return (
    <div className={cn("box")}>
      <Label htmlFor="" text="참석자 선택" />
      <ul className={cn("list")}>
        {Boolean(participantList.length) ? (
          participantList.map((info) => {
            const isSelected = selectedList.includes(info.accountId);
            return (
              <li key={info.accountId}>
                <button
                  type="button"
                  onClick={() => handleParticipantSelect(info.accountId, isSelected)}
                  className={cn("item", { selected: isSelected })}
                >
                  {info.nickName}
                </button>
              </li>
            );
          })
        ) : (
          <li className={cn("empty")}>그룹에 멤버가 존재하지 않습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default Participant;
