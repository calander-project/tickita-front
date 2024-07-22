import classNames from "classnames/bind";

import { CreateGroupDataType, GroupLisType } from "@/types/type";

import styles from "./GroupList.module.scss";

const cn = classNames.bind(styles);

interface GroupListProps extends CreateGroupDataType {}

function GroupList({ crewName, labelColor }: GroupListProps) {
  return (
    <div className={cn("box")}>
      <p style={{ backgroundColor: labelColor }} className={cn("groupColor")} />
      <span className={cn("groupTitle")}>{crewName}</span>
    </div>
  );
}

export default GroupList;
