import classNames from "classnames/bind";

import { CreateGroupDataType } from "@/types/type";

import GroupList from "./GroupList";
import styles from "./ListButton.module.scss";

const cn = classNames.bind(styles);

interface ListButtonProps extends CreateGroupDataType {
  onClick: () => void;
}

function ListButton({ crewName, labelColor, onClick }: ListButtonProps) {
  return (
    <li className={cn("list")}>
      <button type="button" className={cn("button")} onClick={onClick}>
        <GroupList labelColor={labelColor} crewName={crewName} />
      </button>
    </li>
  );
}

export default ListButton;
