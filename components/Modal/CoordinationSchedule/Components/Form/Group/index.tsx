import classNames from "classnames/bind";

import Dropdown from "@/components/Dropdown";

import { CrewInfo } from "@/types/type";

import styles from "./Group.module.scss";
import Label from "../../Label";

const cn = classNames.bind(styles);

interface GroupProps {
  groupList: CrewInfo[];
}

function Group({ groupList }: GroupProps) {
  return (
    <div className={cn("container")}>
      <Label htmlFor="" text="그룹 선택" />
      <Dropdown groupList={groupList} />
    </div>
  );
}

export default Group;
