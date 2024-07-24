import classNames from "classnames/bind";
import { createPortal } from "react-dom";

import { ModalType } from "@/constants/modalType";
import { MODAL_TYPE } from "@/constants/modalType";
import { useModalStore } from "@/store/useModalStore";

import styles from "./Portal.module.scss";
import CancelInviteModal from "../CancelInvite";
import ChangeLeaderModal from "../ChangeLeader";
import CoordinationScheduleModal from "../CoordinationSchedule";
import CreateGroupModal from "../CreateGroup";
import DeleteGroupModal from "../DeleteGroup";
import ExitGroupModal from "../ExitGroup";
import ExportMemberModal from "../ExportMember";
import ScheduleCreateModal from "../Schedule/ScheduleCreate";
import ScheduleDetailModal from "../Schedule/ScheduleDetail";

const cn = classNames.bind(styles);

const MODAL_COMPONENTS: Record<ModalType, JSX.Element> = {
  [MODAL_TYPE.CREATE_GROUP]: <CreateGroupModal />,
  [MODAL_TYPE.SCHEDULE_COORDINATION]: <CoordinationScheduleModal />, // 타입때문에 임시로 ScheduleDetailModal 사용, 추후 변경 필요
  [MODAL_TYPE.SCHEDULE_DETAILS]: <ScheduleDetailModal />, // 타입때문에 임시로 ScheduleDetailModal 사용, 추후 변경 필요
  [MODAL_TYPE.SCHEDULE_CREATE]: <ScheduleCreateModal />, // 타입때문에 임시로 ScheduleDetailModal 사용, 추후 변경 필요
  [MODAL_TYPE.SCHEDULE_EDIT]: <ScheduleDetailModal />, // 타입때문에 임시로 ScheduleDetailModal 사용, 추후 변경 필요
  [MODAL_TYPE.DELETE_GROUP]: <DeleteGroupModal />,
  [MODAL_TYPE.EXPORT_MEMBER]: <ExportMemberModal />,
  [MODAL_TYPE.CHANGE_LEADER]: <ChangeLeaderModal />,
  [MODAL_TYPE.EXIT_GROUP]: <ExitGroupModal />,
  [MODAL_TYPE.CANCEL_INVITE]: <CancelInviteModal />,
} as const;

export default function Portal() {
  const { isOpen, type } = useModalStore();

  if (!isOpen || !type) {
    return null;
  }

  return createPortal(
    <div className={cn("background")}>{MODAL_COMPONENTS[type]}</div>,
    document.body,
  );
}
