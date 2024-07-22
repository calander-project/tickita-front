import classNames from "classnames/bind";
import { UseFormSetValue } from "react-hook-form";

import Dropdown from "@/components/Dropdown";

import { CoordinateScheduleDefaultInformationType, CrewInfo } from "@/types/type";

import styles from "./Group.module.scss";
import Label from "../../Label";

const cn = classNames.bind(styles);

interface GroupProps {
  groupList: CrewInfo[];
  setValue: UseFormSetValue<CoordinateScheduleDefaultInformationType>;
}

function Group({ groupList, setValue }: GroupProps) {
  return (
    <div className={cn("container")}>
      <Label htmlFor="" text="그룹 선택" />
      <Dropdown groupList={groupList} setValue={setValue} />
    </div>
  );
}

export default Group;
