import { useState } from "react";

import classNames from "classnames/bind";
import { useFormContext } from "react-hook-form";

import { useGetUserInfo } from "@/hooks/useGetUserInfo";

import { GroupMemberInfoType } from "@/types/type";

import styles from "./Participant.module.scss";
import Label from "../../Label";

const cn = classNames.bind(styles);

interface ParticipantProps {
  participantList: GroupMemberInfoType[];
}

function Participant({ participantList }: ParticipantProps) {
  const [selectedList, setSelectedList] = useState<number[]>([]);

  const { setValue } = useFormContext();

  const { data: userInfo } = useGetUserInfo();

  const memberList = participantList.filter((info) => userInfo?.accountId !== info.accountId);

  const handleParticipantSelect = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedList((prev) => {
        const result = prev.filter((prevNum) => prevNum !== id);
        setValue("accountIds", result);
        return result;
      });
      return;
    }

    setSelectedList((prev) => {
      const result = [...prev, id];
      setValue("accountIds", result);
      return result;
    });
  };

  return (
    <div className={cn("box")}>
      <Label htmlFor="" text="참석자 선택" />
      <ul className={cn("list")}>
        {Boolean(memberList.length) ? (
          memberList.map((info) => {
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
          <li className={cn("empty")}>⛔️ 그룹에 멤버가 존재하지 않습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default Participant;
