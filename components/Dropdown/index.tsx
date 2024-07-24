import { useState, RefObject, useEffect } from "react";

import Image from "next/image";

import classNames from "classnames/bind";
import { useFormContext } from "react-hook-form";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import { CrewInfo, GroupColorType } from "@/types/type";

import styles from "./Dropdown.module.scss";
import ListButton from "./ListButton";
import GroupList from "./ListButton/GroupList";

const cn = classNames.bind(styles);

interface DropdownProps {
  groupList: CrewInfo[];
}

function Dropdown({ groupList }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectGroupInfo, setSelectGroupInfo] = useState<Omit<CrewInfo, "crewId">>({
    crewName: "",
    labelColor: "" as GroupColorType,
  });

  const { setValue, watch } = useFormContext();

  const buttonRef = useOutsideClick(() => setIsOpen(false)) as RefObject<HTMLButtonElement>;

  const crewIdField = watch("crewId");

  const handleGroupSelect = (crewId: number) => {
    setValue("crewId", crewId);
  };

  useEffect(() => {
    const result = groupList.find((list) => list.crewId === crewIdField);

    if (!result) {
      return;
    }

    setSelectGroupInfo({
      crewName: result.crewName,
      labelColor: result.labelColor,
    });
  }, [crewIdField]);

  return (
    <div>
      <div className={cn("box")}>
        <button
          ref={buttonRef}
          disabled={!Boolean(groupList.length)}
          type="button"
          className={cn("button")}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {Boolean(groupList.length) ? (
            <>
              {
                <GroupList
                  crewName={selectGroupInfo.crewName}
                  labelColor={selectGroupInfo.labelColor}
                />
              }
              <Image src="./icons/dropdown.svg" width={26} height={26} alt="드롭다운 버튼" />
            </>
          ) : (
            "가입된 그룹이 없습니다."
          )}
        </button>
        {isOpen && (
          <ul className={cn("dropdownList")}>
            {groupList?.map((info) => (
              <ListButton
                key={info.crewId}
                onClick={() => handleGroupSelect(info.crewId)}
                crewName={info.crewName}
                labelColor={info.labelColor}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
